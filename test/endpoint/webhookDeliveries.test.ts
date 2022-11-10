import { RestClient } from '../../lib/net/RestClient';
import { WebhookDeliveriesEndpoint } from '../../lib/endpoint/webhookDeliveries';
import * as helper from './helper';

describe('tests webhook deliveries Arta endpoint', () => {
  const responseMock = {
    id: 123,
    created_at: '2020-10-22T21:12:48.839165',
    updated_at: '2020-10-22T21:12:48.839165',
    resource_id: '123',
    response_status_code: 202,
    status: 'delivered',
    type: 'ping',
    webhook_id: 123,
    webhook_url: 'https://webhookdeliveries.io/',
  };

  const path = 'webhook_deliveries';
  let clientMock: RestClient;
  let endpoint: WebhookDeliveriesEndpoint;

  beforeEach(() => {
    jest.resetAllMocks();
    clientMock = helper.getRestMock(responseMock);
    endpoint = new WebhookDeliveriesEndpoint(clientMock);
  });

  it('should have get and list methods', async () => {
    const requestConfig = { path, clientMock, endpoint };
    await helper.testGet(requestConfig);
    await helper.testList(responseMock, requestConfig);
  });
});
