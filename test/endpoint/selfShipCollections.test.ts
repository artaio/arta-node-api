import type { RestClient } from '../../lib/net/RestClient';
import { SelfShipCollectionsEndpoint } from '../../lib/endpoint/selfShipCollections';
import * as helper from './helper';

describe('tests self ship collections Arta endpoint', () => {
  const responseMock = {
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    status: 'scheduled',
    shortcode: 'ACME-SSC123',
    closed_at: null,
    collection_date: '2026-03-10',
    collection_time: '09:00',
    location: {
      address_line_1: '123 Main St',
      address_line_2: null,
      city: 'New York',
      region: 'NY',
      postal_code: '10001',
      country: 'US',
      close_time: '17:00',
      package_location: 'front',
      contact: {
        name: 'Jane Doe',
        phone_number: '555-1234',
        email_address: 'jane@example.com',
      },
    },
    service: {
      carrier: 'fedex',
      code: 'ground',
      route: 'domestic',
    },
    created_at: '2026-03-03T12:00:00.000000',
    updated_at: '2026-03-03T12:00:00.000000',
  };
  const path = 'self_ship_collections';
  let clientMock: RestClient;
  let endpoint: SelfShipCollectionsEndpoint;

  beforeEach(() => {
    jest.resetAllMocks();
    clientMock = helper.getRestMock(responseMock);
    endpoint = new SelfShipCollectionsEndpoint(clientMock);
  });

  it('should have get, create, list and list all methods', async () => {
    const requestConfig = { path, clientMock, endpoint };
    const createPayload = {
      location: {
        address_line_1: '123 Main St',
        city: 'New York',
        region: 'NY',
        postal_code: '10001',
        country: 'US',
        close_time: '17:00',
        package_location: 'front' as const,
        contact: {
          name: 'Jane Doe',
          phone_number: '555-1234',
          email_address: 'jane@example.com',
        },
      },
      service: {
        carrier: 'fedex' as const,
        code: 'ground' as const,
        route: 'domestic' as const,
      },
      collection_date: '2026-03-10',
      collection_time: '09:00',
    };
    await helper.testGet(requestConfig);
    await helper.testCreate(
      createPayload,
      'self_ship_collection',
      requestConfig,
    );
    await helper.testList(responseMock, requestConfig);
    await helper.testListAll(responseMock, requestConfig);
  });
});
