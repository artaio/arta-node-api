import { RestClient } from '../../lib/net/RestClient';
import { WebhooksEndpoint } from '../../lib/endpoint/webhooks';
import * as helper from './helper';

describe('tests webhook Arta endpoint', () => {
  const responseMock = {
    id: 4,
    created_at: '2020-10-22T21:12:48.839165',
    name: 'Notifications Endpoint',
    updated_at: '2020-10-22T21:12:48.839165',
    url: 'https://notifications.example.com/hooks/',
  };
  const path = 'webhooks';
  let clientMock: RestClient;
  let endpoint: WebhooksEndpoint;

  beforeEach(() => {
    jest.resetAllMocks();
    clientMock = helper.getRestMock(responseMock);
    endpoint = new WebhooksEndpoint(clientMock);
  });

  it('should have get, create, delete, list, list all and update methods', async () => {
    const requestConfig = { path, clientMock, endpoint };
    const createPayload = { url: 'test', name: 'my-hook' };
    await helper.testGet(requestConfig);
    await helper.testCreate(createPayload, 'webhook', requestConfig);
    await helper.testDelete(requestConfig);
    await helper.testList(responseMock, requestConfig);
    await helper.testListAll(responseMock, requestConfig);
    await helper.testUpdate({ url: 'another-url' }, 'webhook', requestConfig);
  });

  it('should be able to call actions from client', async () => {
    await endpoint.ping(4);
    expect(clientMock.get).toHaveBeenCalledWith('/webhooks/4/ping', undefined);
    await endpoint.getSecret(4);
    expect(clientMock.get).toHaveBeenCalledWith(
      '/webhooks/4/secret_token',
      undefined
    );
    await endpoint.resetSecret(4, 'another-auth');
    expect(clientMock.patch).toHaveBeenCalledWith(
      '/webhooks/4/secret_token/reset',
      'another-auth'
    );
  });

  it('should be able to call actions from fetched hook', async () => {
    const ping = jest.spyOn(endpoint, 'ping');
    const getSecret = jest.spyOn(endpoint, 'getSecret');
    const resetSecret = jest.spyOn(endpoint, 'resetSecret');
    const webhook = await endpoint.getById(4);

    await webhook.ping();
    expect(ping).toHaveBeenCalledWith(webhook.id, undefined);

    await webhook.getSecret('another-key');
    expect(getSecret).toHaveBeenCalledWith(webhook.id, 'another-key');

    await webhook.resetSecret();
    expect(resetSecret).toHaveBeenCalledWith(webhook.id, undefined);
  });
});
