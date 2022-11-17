import { RestClient } from '../../lib/net/RestClient';
import { TrackingEvent, TrackingsEndpoint } from '../../lib/endpoint/trackings';
import * as helper from './helper';

describe('tests trackings Arta endpoint', () => {
  const responseMock = {
    carrier: {
      code: 'ups',
      name: 'UPS',
      phone_number: '+1 800-742-5877',
      url: 'https://www.ups.com/us/en/Home.page',
    },
    events: [
      {
        date: '2020-10-20 13:53',
        location: 'BROOKLYN,NY,11249,US',
        summary: 'DELIVERED',
      },
      {
        date: '2020-10-20 00:42',
        location: 'Saddle Brook,NJ,US',
        summary: 'Arrived at Facility',
      },
      {
        date: '2020-10-19 21:17',
        location: 'Carlisle,PA,US',
        summary: 'Departed from Facility',
      },
      {
        date: '2020-10-19 18:04',
        location: 'Carlisle,PA,US',
        summary: 'Origin Scan',
      },
      {
        date: '2020-10-19 10:34',
        location: 'US',
        summary: 'Order Processed: Ready for UPS',
      },
    ],
    status: 'DELIVERED',
    tracking_number: '1Z06************',
  };
  const path = 'trackings';
  let clientMock: RestClient;
  let endpoint: TrackingsEndpoint;

  beforeAll(() => {
    jest.resetAllMocks();
    clientMock = helper.getRestMock(responseMock);
    endpoint = new TrackingsEndpoint(clientMock);
  });

  it('should be able to get and update a single org', async () => {
    const res = await helper.testGet({ path, clientMock, endpoint });
    const isoDates = res.events.map((e: TrackingEvent) => e.date.toISOString());
    expect(isoDates).toStrictEqual([
      '2020-10-20T13:53:00.000Z',
      '2020-10-20T00:42:00.000Z',
      '2020-10-19T21:17:00.000Z',
      '2020-10-19T18:04:00.000Z',
      '2020-10-19T10:34:00.000Z'
    ]);
  });
});
