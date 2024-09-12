import { FetchHttpClient } from '../../lib/net/FetchHttpClient';
import nock from 'nock';

describe('tests FetchHttpClient wrapper', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should do an https request by default', async () => {
    const mockResponse = { ok: 'ok' };
    nock('https://mytestdomain.com').get('/test').reply(200, mockResponse);

    const httpClient = new FetchHttpClient();
    const response = await httpClient.request('mytestdomain.com', {
      path: '/test',
    });

    const jsonBody = await response.json();

    expect(jsonBody).toEqual(mockResponse);
    expect(response.statusCode).toBe(200);
  });

  it('should be able to handle post requests with body and http protocol', async () => {
    const mockResponse = { ok: 'ok' };
    const mockBody = {
      data: ['test'],
      filter: {
        another: 'test',
      },
    };

    nock('http://otherdomain.com').post('/test').reply(201, mockResponse);

    const httpClient = new FetchHttpClient();

    const response = await httpClient.request('otherdomain.com', {
      path: '/test',
      method: 'POST',
      protocol: 'http',
      port: 80,
      requestData: JSON.stringify(mockBody),
      headers: { Authorization: 'example', 'Content-Type': 'applcation/json' },
    });

    const jsonBody = await response.json<unknown>();

    expect(jsonBody).toEqual(mockResponse);
    expect(response.statusCode).toBe(201);
  });

  it('should be able to handle error status codes', async () => {
    const mockResponse = { error: 'not-found' };
    const mockHeaders = { aheader: 'should-be-there' };

    nock('https://otherdomain.com')
      .get('/test')
      .reply(404, mockResponse, mockHeaders);

    const httpClient = new FetchHttpClient();

    const response = await httpClient.request('otherdomain.com', {
      path: '/test',
    });

    const jsonBody = await response.json();

    expect(jsonBody).toEqual(mockResponse);
    expect(response.statusCode).toBe(404);
    expect(response.headers).toEqual({
      ...mockHeaders,
      'content-type': 'application/json',
    });
  });

  it('should be able to handle request with error', async () => {
    const errMsg = 'something awful happened';
    nock('https://otherdomain.com').get('/').replyWithError(errMsg);

    const httpClient = new FetchHttpClient();

    await expect(httpClient.request('otherdomain.com')).rejects.toEqual(
      new Error(errMsg),
    );
  });

  it('should be able to handle request with error', async () => {
    const errMsg = 'something awful happened';
    nock('https://otherdomain.com').get('/').replyWithError(errMsg);

    const httpClient = new FetchHttpClient();

    await expect(httpClient.request('otherdomain.com')).rejects.toEqual(
      new Error(errMsg),
    );
  });

  it('should be able to handle timeouts', async () => {
    nock('https://otherdomain.com')
      .get('/')
      .delayConnection(1100)
      .reply(200, { ok: 'ok' });

    const httpClient = new FetchHttpClient();
    const req = httpClient.request('otherdomain.com', { timeout: 1000 });
    await expect(req).rejects.toEqual(
      new Error('Request timed out to otherdomain.com:443'),
    );
  });
});
