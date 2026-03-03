import type { RestClient } from '../../lib/net/RestClient';
import { SelfShipCollectionAvailabilityChecksEndpoint } from '../../lib/endpoint/selfShipCollectionAvailabilityChecks';
import * as helper from './helper';

describe('tests self ship collection availability checks Arta endpoint', () => {
  const responseMock = {
    location: {
      address_line_1: '123 Main St',
      address_line_2: null,
      city: 'New York',
      region: 'NY',
      postal_code: '10001',
      country: 'US',
      close_time: '17:00',
    },
    service: {
      carrier: 'fedex',
      code: 'ground',
      route: 'domestic',
    },
    collection_date: '2026-03-10',
    availabilities: [
      {
        collection_date: '2026-03-10',
        collection_times: ['09:00', '10:00', '11:00'],
        residential_available: true,
      },
    ],
  };
  let clientMock: RestClient;
  let endpoint: SelfShipCollectionAvailabilityChecksEndpoint;

  beforeEach(() => {
    jest.resetAllMocks();
    clientMock = helper.getRestMock(responseMock);
    endpoint = new SelfShipCollectionAvailabilityChecksEndpoint(clientMock);
  });

  it('should create an availability check', async () => {
    const createPayload = {
      location: {
        address_line_1: '123 Main St',
        city: 'New York',
        region: 'NY',
        postal_code: '10001',
        country: 'US',
        close_time: '17:00',
      },
      service: {
        carrier: 'fedex' as const,
        code: 'ground' as const,
        route: 'domestic' as const,
      },
      collection_date: '2026-03-10',
    };

    const result = await endpoint.create(createPayload);
    expect(clientMock.post).toHaveBeenCalledWith(
      '/self_ship_collection_availability_checks',
      { self_ship_collection_availability_check: createPayload },
      undefined,
    );
    expect(result).toEqual(responseMock);
  });
});
