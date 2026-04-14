import type { RestClient } from '../../lib/net/RestClient';
import {
  type ShipmentExceptionCreateBody,
  ShipmentExceptionsEndpoint,
} from '../../lib/endpoint/shipmentExceptions';
import * as helper from './helper';

describe('tests shipment exceptions Arta endpoint', () => {
  const responseMock = {
    id: 'd686ad3b-33fd-454c-a7aa-94b1ecbc539f',
    created_at: '2023-05-26T19:33:19.693833',
    updated_at: '2023-05-26T19:33:19.693833',
    exception_type_label: null,
    hold_until: null,
    object_id: null,
    package_id: null,
    resolution: null,
    shipment_id: 'a5cbb58c-43ab-4658-9999-98a33b0070d5',
    source: 'api',
    status: 'new',
    type: 'requested_hold_to_collect',
    user_notes: [],
  };
  const path = 'shipment_exceptions';
  let clientMock: RestClient;
  let endpoint: ShipmentExceptionsEndpoint;

  beforeEach(() => {
    jest.resetAllMocks();
    clientMock = helper.getRestMock(responseMock);
    endpoint = new ShipmentExceptionsEndpoint(clientMock);
  });

  it('should have get, create, update and list methods', async () => {
    const requestConfig = { path, clientMock, endpoint };
    const createPayload = {
      type: 'requested_hold_to_collect',
      shipment_id: 'a5cbb58c-43ab-4658-9999-98a33b0070d5',
      hold_until: '2023-08-15',
    } satisfies ShipmentExceptionCreateBody;

    await helper.testGet(requestConfig);
    await helper.testCreate(createPayload, 'shipment_exception', requestConfig);
    await helper.testList(responseMock, requestConfig);
    await helper.testUpdate(
      { status: 'resolved' },
      'shipment_exception',
      requestConfig,
    );
  });
});
