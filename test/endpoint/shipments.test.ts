import { ShipmentsEndpoint } from '../../lib/endpoint/shipments';
import { ArtaService } from '../../lib/MetadataTypes';
import { RestClient } from '../../lib/net/RestClient';
import * as helper from './helper';
import { createPayload, responseMock } from './shipments.mock';

describe('tests quote requests Arta endpoint', () => {
  const path = 'shipments';
  let clientMock: RestClient;
  let endpoint: ShipmentsEndpoint;

  beforeEach(() => {
    jest.resetAllMocks();
    clientMock = helper.getRestMock(responseMock);
    endpoint = new ShipmentsEndpoint(clientMock);
  });

  it('should have get, create, list and list with search methods', async () => {
    const requestConfig = { path, clientMock, endpoint };
    const result = await helper.testGet(requestConfig);
    await helper.testCreate(createPayload, 'shipment', requestConfig);
    await helper.testList(responseMock, requestConfig);
    await helper.testListWithSearch(responseMock, requestConfig);

    expect(result.packages[0].depth).toBe(6);
    expect(result.packages[0].height).toBe(14.5);
    expect(result.packages[0].weight).toBe(3.5);
    expect(result.packages[0].width).toBe(14);

    expect(result.services.map((s: ArtaService) => s.amount)).toStrictEqual([
      1, 1.1, 2.0, 999.99,
    ]);

    expect(result.total).toBe(4);
  });
});
