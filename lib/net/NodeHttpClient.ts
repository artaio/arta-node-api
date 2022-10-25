import * as http from 'http';
import * as https from 'https';
import {
  HttpClient,
  HttpClientResponse,
  HttpRequestParameters,
} from './HttpClient';
const defaultHttpAgent = new http.Agent({ keepAlive: true });
const defaultHttpsAgent = new https.Agent({ keepAlive: true });

export class NodeHttpClientResponse implements HttpClientResponse {
  public statusCode?: number;
  public headers?: http.IncomingHttpHeaders;
  private rawBody = '';

  constructor(private readonly res: http.IncomingMessage) {
    this.statusCode = res.statusCode;
    this.headers = res.headers;
  }

  async body(): Promise<string> {
    if (this.rawBody !== '') {
      return await Promise.resolve(this.rawBody);
    }

    const bodyPromise: Promise<string> = new Promise((resolve) => {
      this.rawBody = '';
      this.res.setEncoding('utf8');
      this.res.on('data', (chunk: string) => {
        this.rawBody += chunk;
      });
      this.res.once('end', () => {
        resolve(this.rawBody);
      });
    });

    return await bodyPromise;
  }

  async json(): Promise<any> {
    const body = await this.body();
    return JSON.parse(body);
  }
}

function initParams(
  params?: Partial<HttpRequestParameters>
): HttpRequestParameters {
  const defaultParams = {
    protocol: 'https' as const,
    port: 443,
    path: '/',
    method: 'get' as const,
    headers: {},
    requestData: '',
    timeout: 30000,
  };

  return {
    ...defaultParams,
    ...params,
  };
}

export class NodeHttpClient implements HttpClient {
  constructor(private readonly agent?: http.Agent | https.Agent) {}
  async request(
    host: string,
    params?: Partial<HttpRequestParameters>
  ): Promise<HttpClientResponse> {
    const { protocol, port, path, method, timeout, headers, requestData } =
      initParams(params);

    const isInsecureConnection = protocol === 'http';
    let agent = this.agent;
    if (agent == null) {
      agent = isInsecureConnection ? defaultHttpAgent : defaultHttpsAgent;
    }
    const requestPromise: Promise<HttpClientResponse> = new Promise(
      (resolve, reject) => {
        const req = (isInsecureConnection ? http : https).request({
          host,
          port,
          path,
          method,
          agent,
          headers,
          ciphers: 'DEFAULT:!aNULL:!eNULL:!LOW:!EXPORT:!SSLv2:!MD5',
        });

        req.setTimeout(timeout, () => {
          const err = new Error(`Request timed out to ${host}:${port}`);
          req.destroy(err);
          reject(err);
        });

        req.on('response', (res) => {
          resolve(new NodeHttpClientResponse(res));
        });

        req.on('error', (error) => {
          reject(error);
        });

        req.once('socket', (socket) => {
          if (socket.connecting) {
            socket.once(
              isInsecureConnection ? 'connect' : 'secureConnect',
              () => {
                // Send payload; we're safe:
                req.write(requestData);
                req.end();
              }
            );
          } else {
            // we're already connected
            req.write(requestData);
            req.end();
          }
        });
      }
    );

    return await requestPromise;
  }
}
