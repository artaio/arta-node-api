import { NodeHttpClient } from '../../lib/net/NodeHttpClient';
import nock from 'nock';

describe('tests NodeHttpClient wrapper', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should do an https request by default', async () => {
    const mockResponse = { ok: 'ok' };
    nock('https://mytestdomain.com').get('/test').reply(200, mockResponse);

    const httpClient = new NodeHttpClient();
    const response = await httpClient.request('mytestdomain.com', {
      path: '/test',
    });

    const body = await response.body();
    const jsonBody = await response.json();

    expect(body).toStrictEqual(JSON.stringify(mockResponse));
    expect(jsonBody).toStrictEqual(mockResponse);
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

    const httpClient = new NodeHttpClient();

    const response = await httpClient.request('otherdomain.com', {
      path: '/test',
      method: 'post',
      protocol: 'http',
      port: 80,
      requestData: JSON.stringify(mockBody),
      headers: { Authorization: 'example', 'Content-Type': 'applcation/json' },
    });

    const body = await response.body();
    const jsonBody = await response.json();

    expect(body).toStrictEqual(JSON.stringify(mockResponse));
    expect(jsonBody).toStrictEqual(mockResponse);
    expect(response.statusCode).toBe(201);
  });

  it('should be able to handle error status codes', async () => {
    const mockResponse = { error: 'not-found' };
    const mockHeaders = { aheader: 'should-be-there' };

    nock('https://otherdomain.com')
      .get('/test')
      .reply(404, mockResponse, mockHeaders);

    const httpClient = new NodeHttpClient();

    const response = await httpClient.request('otherdomain.com', {
      path: '/test',
    });

    const body = await response.body();
    const jsonBody = await response.json();

    expect(body).toStrictEqual(JSON.stringify(mockResponse));
    expect(jsonBody).toStrictEqual(mockResponse);
    expect(response.statusCode).toBe(404);
    expect(response.headers).toStrictEqual({
      ...mockHeaders,
      'content-type': 'application/json',
    });
  });

  it('should be able to handle request with error', async () => {
    const errMsg = 'something awful happened';
    nock('https://otherdomain.com').get('/').replyWithError(errMsg);

    const httpClient = new NodeHttpClient();

    await expect(httpClient.request('otherdomain.com')).rejects.toEqual(
      new Error(errMsg),
    );
  });

  it('should be able to handle request with error', async () => {
    const errMsg = 'something awful happened';
    nock('https://otherdomain.com').get('/').replyWithError(errMsg);

    const httpClient = new NodeHttpClient();

    await expect(httpClient.request('otherdomain.com')).rejects.toEqual(
      new Error(errMsg),
    );
  });

  it('should be able to handle timeouts', async () => {
    nock('https://otherdomain.com').get('/').delayConnection(1100).reply(200);

    const httpClient = new NodeHttpClient();
    const req = httpClient.request('otherdomain.com', { timeout: 1000 });

    await expect(req).rejects.toEqual(
      new Error('Request timed out to otherdomain.com:443'),
    );
  });
});
