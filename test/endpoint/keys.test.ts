import { RestClient } from '../../lib/net/RestClient';
import { KeysEndpoint } from '../../lib/endpoint/keys';

describe('tests keys Arta endpoint', () => {
  let artaClientMock: RestClient;
  let keysEndpoint: KeysEndpoint;
  const keyMock = {
    id: 123,
    created_at: '2020-10-22T21:12:48.839165',
    name: 'akey',
    updated_at: '2020-10-22T21:12:48.839165',
    api_key: 'test_key',
  };

  beforeEach(() => {
    jest.resetAllMocks();
    artaClientMock = {
      get: jest.fn().mockReturnValue(keyMock),
      post: jest.fn().mockReturnValue(keyMock),
      patch: jest.fn().mockReturnValue(keyMock),
      delete: jest.fn(),
    };
    keysEndpoint = new KeysEndpoint(artaClientMock);
  });

  it('should have create, read, delete endpoints', async () => {
    await keysEndpoint.getById(123);
    expect(artaClientMock.get).toHaveBeenCalledWith('/api_keys/123', undefined);

    await keysEndpoint.create(
      { is_testing: true, name: 'my-key' },
      'other-auth'
    );
    expect(artaClientMock.post).toHaveBeenCalledWith(
      '/api_keys',
      { api_key: { is_testing: true, name: 'my-key' } },
      'other-auth'
    );

    expect(await keysEndpoint.remove(123)).toBeUndefined();
    expect(artaClientMock.delete).toHaveBeenCalledWith(
      '/api_keys/123',
      undefined
    );
  });

  it('should return metadata when calling list', async () => {
    const apiResponse = {
      items: [keyMock],
      metadata: { page: 1, page_size: 5, total_size: 6 },
    };
    artaClientMock.get = jest.fn().mockReturnValueOnce(apiResponse);
    expect(await keysEndpoint.list()).toEqual(apiResponse);
    expect(artaClientMock.get).toHaveBeenCalledWith(
      '/api_keys?page=1&page_size=20',
      undefined
    );
  });

  it('should be able to list all keys', async () => {
    artaClientMock.get = jest
      .fn()
      .mockResolvedValueOnce({
        items: [keyMock, keyMock],
        metadata: { page: 1, total_count: 5 },
      })
      .mockResolvedValueOnce({
        items: [keyMock, keyMock],
        metadata: { page: 2, total_count: 5 },
      })
      .mockResolvedValue({
        items: [keyMock],
        metadata: { page: 3, total_count: 5 },
      });

    let totalEndpoints = 0;
    for await (const test of keysEndpoint.listAll()) {
      expect(test).toEqual(keyMock);
      totalEndpoints++;
    }
    expect(totalEndpoints).toBe(5);
  });
});
