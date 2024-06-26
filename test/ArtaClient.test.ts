import { ArtaClient } from '../lib/ArtaClient';
import { initLogger } from '../lib/logging';
import type { HttpClient, HttpRequestParameters } from '../lib/net/HttpClient';
import { version } from '../package.json';

const ARTA_DOMAIN = 'domain.test';

describe('tests ArtaClient', () => {
  const request = jest.fn();
  const mockHttpClient: HttpClient = { request };

  initLogger(console, 'NONE');

  const artaClient = new ArtaClient(mockHttpClient, {
    apiKey: 'test',
    host: ARTA_DOMAIN,
  });

  const expectRequestCalledWith = (
    domain: string,
    params: Partial<HttpRequestParameters>,
  ) => {
    expect(request).toHaveBeenCalledTimes(1);
    params.headers = {
      ...params.headers,
      'User-Agent': `ARTA/v1 arta-node/${version}`,
      'Content-Type': 'application/json',
    };
    expect(request).toHaveBeenCalledWith(domain, params);
  };

  const mockJsonResponse = (response: any) => {
    request.mockReturnValueOnce({
      json: jest.fn().mockReturnValueOnce(response),
    });
  };

  beforeEach(() => {
    mockJsonResponse({ testResponse: 'ok' });
    jest.clearAllMocks();
  });

  it('should use default api key and domain', async () => {
    const res = await artaClient.get('/a_path?page=1&page_size=20');
    expect(res).toEqual({ testResponse: 'ok' });
    expectRequestCalledWith(ARTA_DOMAIN, {
      headers: { Authorization: 'ARTA_APIKey test' },
      method: 'GET',
      path: '/a_path?page=1&page_size=20',
    });
  });

  it('should forward body on post', async () => {
    await artaClient.post('/a_path', { req: 'payload' }, 'another-auth');
    expectRequestCalledWith(ARTA_DOMAIN, {
      headers: { Authorization: 'ARTA_APIKey another-auth' },
      method: 'POST',
      path: '/a_path',
      requestData: JSON.stringify({ req: 'payload' }),
    });
  });

  it('should forward body on patch with proper path', async () => {
    await artaClient.patch('/a/longer/path/a-id', { req: 'payload' });
    expectRequestCalledWith(ARTA_DOMAIN, {
      headers: { Authorization: 'ARTA_APIKey test' },
      method: 'PATCH',
      path: '/a/longer/path/a-id',
      requestData: JSON.stringify({ req: 'payload' }),
    });
  });

  it('should return empty promise on delete', async () => {
    const res = await artaClient.delete('/a/longer/path/a-id');
    expect(res).toBeUndefined();
    expectRequestCalledWith(ARTA_DOMAIN, {
      headers: { Authorization: 'ARTA_APIKey test' },
      method: 'DELETE',
      path: '/a/longer/path/a-id',
    });
  });

  it('should throw error if API respond with error status code', async () => {
    request.mockReset();
    request.mockReturnValueOnce({
      statusCode: 401,
      json: jest
        .fn()
        .mockReturnValueOnce({ errors: { detail: 'Unauthorized' } }),
    });

    await expect(artaClient.get('/a_path')).rejects.toThrowError(
      'Unauthorized, HTTP status: 401',
    );
  });

  it('should throw error if API respond with # tag in error', async () => {
    request.mockReset();
    request.mockReturnValueOnce({
      statusCode: 400,
      json: jest
        .fn()
        .mockReturnValueOnce({ errors: { '#': ['a error', 'another error'] } }),
    });

    await expect(artaClient.get('/a_path')).rejects.toThrowError(
      '# a error, # another error, HTTP status: 400',
    );
  });

  it('should throw error if API respond with single error', async () => {
    request.mockReset();
    request.mockReturnValueOnce({
      statusCode: 4222,
      json: jest.fn().mockReturnValueOnce({
        errors: { property: 'is not in correct format' },
      }),
    });

    await expect(artaClient.get('/a_path')).rejects.toThrow(
      'property is not in correct format, HTTP status: 422',
    );
  });

  it('should throw error if API respond with uknown error', async () => {
    request.mockReset();
    request.mockReturnValueOnce({
      statusCode: 503,
      json: jest.fn().mockReturnValueOnce({ errors: {} }),
    });

    await expect(artaClient.get('/a_path')).rejects.toThrow(
      'Unknwon API error, HTTP status: 503',
    );
  });
});
