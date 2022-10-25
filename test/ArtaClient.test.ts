import { ArtaClient } from '../lib/ArtaClient';
import { HttpClient, HttpRequestParameters } from '../lib/net/HttpClient';

const ARTA_DOMAIN = 'domain.test';

describe('tests ArtaClient', () => {
  const request = jest.fn();
  const mockHttpClient: HttpClient = { request };

  const artaClient = new ArtaClient(mockHttpClient, {
    apiKey: 'test',
    host: ARTA_DOMAIN,
  });

  const expectRequestCalledWith = (
    domain: string,
    params: Partial<HttpRequestParameters>
  ) => {
    expect(request).toBeCalledTimes(1);
    expect(request).toBeCalledWith(domain, params);
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
    const res = await artaClient.get('/a_path');
    expect(res).toEqual({ testResponse: 'ok' });
    expectRequestCalledWith(ARTA_DOMAIN, {
      headers: { Authorization: 'ARTA_APIKey test' },
      method: 'get',
      path: '/a_path?page=1&page_size=20',
    });
  });

  it('should overwrite default api key', async () => {
    await artaClient.getOne('/a_path', 'an-id', 'another-key');
    expectRequestCalledWith(ARTA_DOMAIN, {
      headers: { Authorization: 'ARTA_APIKey another-key' },
      method: 'get',
      path: '/a_path/an-id',
    });
  });

  it('should not add id in single get one', async () => {
    await artaClient.getOne('/a_path');
    expectRequestCalledWith(ARTA_DOMAIN, {
      headers: { Authorization: 'ARTA_APIKey test' },
      method: 'get',
      path: '/a_path',
    });
  });

  it('should forward body on post', async () => {
    await artaClient.post('/a_path', { req: 'payload' }, 'another-auth');
    expectRequestCalledWith(ARTA_DOMAIN, {
      headers: { Authorization: 'ARTA_APIKey another-auth' },
      method: 'post',
      path: '/a_path',
      requestData: JSON.stringify({ req: 'payload' }),
    });
  });

  it('should forward body on patch with proper path', async () => {
    await artaClient.patch('/a/longer/path', 'a-id', { req: 'payload' });
    expectRequestCalledWith(ARTA_DOMAIN, {
      headers: { Authorization: 'ARTA_APIKey test' },
      method: 'patch',
      path: '/a/longer/path/a-id',
      requestData: JSON.stringify({ req: 'payload' }),
    });
  });

  it('should return empty promise on delete', async () => {
    const res = await artaClient.delete('/a/longer/path', 'a-id');
    expect(res).toBeUndefined();
    expectRequestCalledWith(ARTA_DOMAIN, {
      headers: { Authorization: 'ARTA_APIKey test' },
      method: 'delete',
      path: '/a/longer/path/a-id',
    });
  });
});
