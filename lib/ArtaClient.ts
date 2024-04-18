import { type ArtaAPIError, ArtaSDKError } from './error';
import type {
  HttpClient,
  HttpClientResponse,
  HttpMethod,
  HttpRequestParameters,
} from './net/HttpClient';
import type { RestClient } from './net/RestClient';
import { version } from '../package.json';
import { getLogger, type Logger } from './logging';

export type ArtaID = number | string;
interface ArtaClientConfig {
  apiKey: string;
  host: string;
}
export class ArtaClient implements RestClient {
  private readonly logger: Logger;
  constructor(
    private readonly httpClient: HttpClient,
    private readonly config: ArtaClientConfig,
  ) {
    this.logger = getLogger();
  }

  private async request(
    params: Partial<HttpRequestParameters>,
  ): Promise<HttpClientResponse> {
    const authValue = this.makeArtaAuthHeader(this.config.apiKey);

    if (params.headers == null) {
      params.headers = {
        'Content-Type': 'application/json',
        'User-Agent': `ARTA/v1 arta-node/${version}`,
      };
    }

    if (params.headers.Authorization == null) {
      params.headers.Authorization = authValue;
    }

    const req = await this.httpClient.request(this.config.host, params);
    const message = `[${req.statusCode}] ${params.method} ${params.path}`;
    if (req.statusCode && req.statusCode >= 400) {
      const errorResponse = await req.json();
      this.logger.error(message);
      this.logger.debug('Error body', errorResponse);
      throw new ArtaSDKError(errorResponse as ArtaAPIError, req.statusCode);
    }

    this.logger.info(message);

    return req;
  }

  private makeReqParams(
    path: string,
    method: HttpMethod,
    auth?: string,
    body?: string,
  ): Partial<HttpRequestParameters> {
    const reqParams: Partial<HttpRequestParameters> = {
      path,
      method,
      headers: {
        'User-Agent': `ARTA/v1 arta-node/${version}`,
        'Content-Type': 'application/json'
      },
    };

    if (auth) {
      if (reqParams.headers == null) {
        reqParams.headers = {
          'User-Agent': `ARTA/v1 arta-node/${version}`,
          'Content-Type': 'application/json'
        };
      }
      reqParams.headers.Authorization = this.makeArtaAuthHeader(auth);
    }

    if (body) {
      reqParams.requestData = body;
    }

    return reqParams;
  }

  private makeArtaAuthHeader(apiKey: string) {
    return `ARTA_APIKey ${apiKey}`;
  }

  public async get<T>(path: string, auth?: string): Promise<T> {
    const reqParams = this.makeReqParams(path, 'GET', auth);
    const res = await this.request(reqParams);
    return res.json<T>();
  }

  public async post<U, T>(path: string, payload: U, auth?: string): Promise<T> {
    const reqParams = this.makeReqParams(
      path,
      'POST',
      auth,
      JSON.stringify(payload),
    );
    const res = await this.request(reqParams);
    return res.json<T>();
  }

  public async patch<U, T>(
    path: string,
    payload: U,
    auth?: string,
  ): Promise<T> {
    const reqParams = this.makeReqParams(
      path,
      'PATCH',
      auth,
      JSON.stringify(payload),
    );
    const res = await this.request(reqParams);
    return res.json<T>();
  }

  public async delete(path: string, auth?: string): Promise<void> {
    await this.request(this.makeReqParams(path, 'DELETE', auth));
    return Promise.resolve();
  }
}
