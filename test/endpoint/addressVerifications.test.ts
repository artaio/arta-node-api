import type { RestClient } from '../../lib/net/RestClient';
import { AddressVerificationsEndpoint } from '../../lib/endpoint/addressVerifications';
import * as helper from './helper';

describe('tests address verifications Arta endpoint', () => {
  const responseMock = {
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    shortcode: 'ACME-V1A2B3',
    status: 'success',
    match_level: 'delivery_point',
    reference: 'order-12345',
    input: {
      address_line_1: '123 Main St',
      address_line_2: 'Apt 4B',
      address_line_3: null,
      city: 'New York',
      region: 'NY',
      postal_code: '10001',
      country: 'US',
    },
    recommendation: {
      address_line_1: '123 Main Street',
      address_line_2: 'Apt 4B',
      address_line_3: null,
      city: 'New York',
      region: 'NY',
      postal_code: '10001-1234',
      country: 'US',
      latitude: 40.7128,
      longitude: -74.006,
      is_residential: true,
    },
    created_at: '2025-06-15T12:00:00.000000',
    updated_at: '2025-06-15T12:00:00.000000',
  };
  const path = 'address_verifications';
  let clientMock: RestClient;
  let endpoint: AddressVerificationsEndpoint;

  beforeEach(() => {
    jest.resetAllMocks();
    clientMock = helper.getRestMock(responseMock);
    endpoint = new AddressVerificationsEndpoint(clientMock);
  });

  it('should have get, create, list and list all methods', async () => {
    const requestConfig = { path, clientMock, endpoint };
    const createPayload = {
      input: {
        address_line_1: '123 Main St',
        address_line_2: 'Apt 4B',
        city: 'New York',
        region: 'NY',
        postal_code: '10001',
        country: 'US',
      },
      reference: 'order-12345',
    };
    await helper.testGet(requestConfig);
    await helper.testCreate(
      createPayload,
      'address_verification',
      requestConfig,
    );
    await helper.testList(responseMock, requestConfig);
    await helper.testListAll(responseMock, requestConfig);
  });
});
