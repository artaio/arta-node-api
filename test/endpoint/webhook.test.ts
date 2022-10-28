import { RestClient } from '../../lib/net/RestClient';
import { WebhookEndpoint } from '../../lib/endpoint/webhook';

describe('tests default Arta endpoint', () => {
  let artaClientMock: RestClient;
  const webhookMock = {
    id: 4,
    created_at: '2020-10-22T21:12:48.839165',
    name: 'Notifications Endpoint',
    updated_at: '2020-10-22T21:12:48.839165',
    url: 'https://notifications.example.com/hooks/',
  };

  beforeEach(() => {
    jest.resetAllMocks();
    artaClientMock = {
      get: jest.fn().mockReturnValue(webhookMock),
      post: jest.fn().mockReturnValue(webhookMock),
      patch: jest.fn().mockReturnValue(webhookMock),
      delete: jest.fn(),
    };
  });

  it('should have all CRUD endpoints', async () => {
    const webhookEndpoint = new WebhookEndpoint(artaClientMock);

    await webhookEndpoint.getById('test');
    expect(artaClientMock.get).toHaveBeenCalledWith('/webhooks/test', undefined);

    await webhookEndpoint.create(
      { url: 'test', name: 'my-hook' },
      'other-auth'
    );
    expect(artaClientMock.post).toHaveBeenCalledWith(
      '/webhooks',
      { webhook: { url: 'test', name: 'my-hook' } },
      'other-auth'
    );

    await webhookEndpoint.update('test', { name: 'other-hook' });

    expect(artaClientMock.patch).toHaveBeenCalledWith(
      '/webhooks/test',
      { webhook: { name: 'other-hook' } },
      undefined
    );

    expect(await webhookEndpoint.remove('test')).toBeUndefined();
    expect(artaClientMock.delete).toHaveBeenCalledWith('/webhooks/test', undefined);

    const apiResponse = { items: [webhookMock] };
    artaClientMock.get = jest.fn().mockReturnValueOnce(apiResponse);
    expect(await webhookEndpoint.list()).toEqual([webhookMock]);
    expect(artaClientMock.get).toHaveBeenCalledWith(
      '/webhooks?page=1&page_size=20',
      undefined
    );
  });

  it('should be able to call actions from client', async () => {
    const webhookEndpoint = new WebhookEndpoint(artaClientMock);
    await webhookEndpoint.ping('test');
    expect(artaClientMock.get).toHaveBeenCalledWith('/webhooks/test/ping', undefined);
    await webhookEndpoint.getSecret('test');
    expect(artaClientMock.get).toHaveBeenCalledWith('/webhooks/test/secret_token', undefined);
    await webhookEndpoint.resetSecret('test', 'another-auth');
    expect(artaClientMock.patch).toHaveBeenCalledWith('/webhooks/test/secret_token/reset', 'another-auth');
  });

  it('should be able to call actions from fetched hook', async () => {
    const webhookEndpoint = new WebhookEndpoint(artaClientMock);
    const ping = jest.spyOn(webhookEndpoint, 'ping');
    const getSecret = jest.spyOn(webhookEndpoint, 'getSecret');
    const resetSecret = jest.spyOn(webhookEndpoint, 'resetSecret');
    const webhook = await webhookEndpoint.getById('test');

    await webhook.ping();
    expect(ping).toHaveBeenCalledWith(webhook.id, undefined);

    await webhook.getSecret('another-key');
    expect(getSecret).toHaveBeenCalledWith(webhook.id, 'another-key');

    await webhook.resetSecret();
    expect(resetSecret).toHaveBeenCalledWith(webhook.id, undefined);
  });
});
