import { ShipmentsEndpoint } from '../../lib/endpoint/shipments';
import type { RestClient } from '../../lib/net/RestClient';
import * as helper from './helper';
import { createPayload, responseMock } from './shipments.mock';

describe('tests shipments Arta endpoint', () => {
  const path = 'shipments';
  let clientMock: RestClient;
  let endpoint: ShipmentsEndpoint;

  beforeEach(() => {
    jest.resetAllMocks();
    clientMock = helper.getRestMock(responseMock);
    endpoint = new ShipmentsEndpoint(clientMock);
  });

  it('should have get, create, update, list and list with search methods', async () => {
    const requestConfig = { path, clientMock, endpoint };
    const result = await helper.testGet(requestConfig);
    await helper.testCreate(createPayload, 'shipment', requestConfig);
    await helper.testList(responseMock, requestConfig);
    await helper.testUpdate({ tags: ['abc'] }, 'shipment', requestConfig);
    await helper.testListWithSearch(responseMock, requestConfig);

    expect(result.emissions).toBe(19.35);
    expect(result.tracking[0].carrier_name).toBe('FedEx');
    expect(result.tracking[0].label_url).toBe(
      'https://api.arta.io/labels/42/rSmdi49ONI9JbY2UrtH8C4Od',
    );
    expect(result.tracking[0].label_format_urls.zpl_12dpmm).toBe(
      'https://api.arta.io/labels/42/rSmdi49ONI9JbY2UrtH8C4Od?format=zpl_12dpmm',
    );

    expect(result.exceptions[0].type).toBe('customs_information_required');

    expect(result.packages[0].depth).toBe(6);
    expect(result.packages[0].height).toBe(14.5);
    expect(result.packages[0].weight).toBe(3.5);
    expect(result.packages[0].width).toBe(14);

    expect(result.services.map((s: any) => s.amount)).toEqual([
      1, 1.1, 2.0, 999.99,
    ]);

    expect(result.total).toBe(4);

    expect(result.cancelled_at).toBeNull();
    expect(result.completed_at).toBeNull();
    expect(result.collected_at).toEqual(new Date('2021-01-22T10:00:00.000Z'));
    expect(result.confirmed_at).toEqual(new Date('2021-01-21T22:00:00.000Z'));
    expect(result.in_transit_at).toEqual(new Date('2021-01-23T08:00:00.000Z'));
  });
});
