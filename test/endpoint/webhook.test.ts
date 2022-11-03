import { WebhooksApi } from '../../lib/generated';
import { WebhookEndpoint } from '../../lib/endpoint/webhook';
jest.mock('../../lib/generated');

const mockWebhookResponse = {
  data: {
    id: 4,
    created_at: '2020-10-22T21:12:48.839165',
    name: 'Notifications Endpoint',
    updated_at: '2020-10-22T21:12:48.839165',
    url: 'https://notifications.example.com/hooks/',
  },
};

const WebhooksApiMocked = jest.mocked<typeof WebhooksApi>(WebhooksApi);

describe('tests default Arta endpoint', () => {
  let get: jest.Mock;
  let post: jest.Mock;
  let patch: jest.Mock;
  let del: jest.Mock;

  let webhookEndpoint: WebhookEndpoint;

  beforeEach(() => {
    jest.resetAllMocks();

    get = jest.fn().mockResolvedValue(mockWebhookResponse);
    post = jest.fn().mockResolvedValue(mockWebhookResponse);
    patch = jest.fn().mockResolvedValue(mockWebhookResponse);
    del = jest.fn().mockResolvedValue(mockWebhookResponse);

    WebhooksApiMocked.mockImplementation(() => {
      return {
        webhooksGet: get,
        webhooksCreate: post,
        webhooksPatch: patch,
        webhooksDelete: del,
        webhooksList: get,
        webhooksPing: post,
        webhooksSecretTokenGet: get,
        webhooksSecretTokenResetPatch: patch,
      } as unknown as WebhooksApi;
    });
    webhookEndpoint = new WebhookEndpoint('test');
  });

  it('should have all CRUD endpoints', async () => {
    await webhookEndpoint.getById(123);
    expect(get).toHaveBeenCalledWith('ARTA_APIKey test', 123);

    await webhookEndpoint.create(
      { url: 'test', name: 'my-hook' },
      'other-auth'
    );
    expect(post).toHaveBeenCalledWith('ARTA_APIKey other-auth', {
      webhook: { url: 'test', name: 'my-hook' },
    });

    await webhookEndpoint.update(123, { name: 'other-hook' });

    expect(patch).toHaveBeenCalledWith('ARTA_APIKey test', 123, {
      webhook: { name: 'other-hook' },
    });

    expect(await webhookEndpoint.remove(123)).toBeUndefined();
    expect(del).toHaveBeenCalledWith('ARTA_APIKey test', 123);
  });

  it('should return metadata when calling list', async () => {
    const apiResponse = {
      data: {
        items: [mockWebhookResponse.data],
        metadata: { page: 1, page_size: 5, total_size: 6 },
      },
    };

    get = jest.fn().mockReturnValueOnce(apiResponse);
    WebhooksApiMocked.mockImplementation(() => {
      return {
        webhooksList: get,
      } as unknown as WebhooksApi;
    });
    webhookEndpoint = new WebhookEndpoint('test');

    expect(await webhookEndpoint.list()).toEqual(apiResponse.data);
    expect(get).toHaveBeenCalledWith('ARTA_APIKey test', 20, 1);
  });

  it('should be able to call actions from client', async () => {
    await webhookEndpoint.ping(123);
    expect(post).toHaveBeenCalledWith('ARTA_APIKey test', 123);

    await webhookEndpoint.getSecret(123);
    expect(get).toHaveBeenCalledWith('ARTA_APIKey test', 123);

    await webhookEndpoint.resetSecret(123, 'another-auth');
    expect(patch).toHaveBeenCalledWith('ARTA_APIKey another-auth', 123);
  });

  it('should be able to call actions from fetched hook', async () => {
    const ping = jest.spyOn(webhookEndpoint, 'ping');
    const getSecret = jest.spyOn(webhookEndpoint, 'getSecret');
    const resetSecret = jest.spyOn(webhookEndpoint, 'resetSecret');

    const webhook = await webhookEndpoint.getById(123);

    await webhook.ping();
    expect(ping).toHaveBeenCalledWith(webhook.id, undefined);

    await webhook.getSecret('another-key');
    expect(getSecret).toHaveBeenCalledWith(webhook.id, 'another-key');

    await webhook.resetSecret();
    expect(resetSecret).toHaveBeenCalledWith(webhook.id, undefined);
  });

  it('should be able to list all endpoints', async () => {
    get = jest
      .fn()
      .mockResolvedValueOnce({
        data: {
          items: [mockWebhookResponse.data, mockWebhookResponse.data],
          metadata: { page: 1, total_count: 5 },
        },
      })
      .mockResolvedValueOnce({
        data: {
          items: [mockWebhookResponse.data, mockWebhookResponse.data],
          metadata: { page: 2, total_count: 5 },
        },
      })
      .mockResolvedValue({
        data: {
          items: [mockWebhookResponse.data],
          metadata: { page: 3, total_count: 5 },
        },
      });

    WebhooksApiMocked.mockImplementation(() => {
      return {
        webhooksList: get,
      } as unknown as WebhooksApi;
    });
    webhookEndpoint = new WebhookEndpoint('test');

    let totalEndpoints = 0;
    for await (const test of webhookEndpoint.listAll()) {
      expect(test).toEqual(mockWebhookResponse.data);
      totalEndpoints++;
    }
    expect(totalEndpoints).toBe(5);
  });

  it('should not throw listing empty resources', async () => {
    get = jest.fn().mockResolvedValueOnce({
      data: {
        items: [],
        metadata: { page: 1, total_count: 0 },
      },
    });

    WebhooksApiMocked.mockImplementation(() => {
      return {
        webhooksList: get,
      } as unknown as WebhooksApi;
    });
    webhookEndpoint = new WebhookEndpoint('test');

    let totalEndpoints = 0;
    for await (const test of webhookEndpoint.listAll()) {
      expect(test).toEqual(mockWebhookResponse.data);
      totalEndpoints++;
    }
    expect(totalEndpoints).toBe(0);
  });
});
