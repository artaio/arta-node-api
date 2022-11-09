import { ArtaAPIError, ArtaSDKError } from './error';
import {
  HttpClient,
  HttpMethod,
  HttpRequestParameters,
} from './net/HttpClient';
import { RestClient } from './net/RestClient';
import { version } from '../package.json';
import { getLogger, Logger } from './logging';

export type ArtaID = number | string;
interface ArtaClientConfig {
  apiKey: string;
  host: string;
}
export class ArtaClient implements RestClient {
  private readonly logger: Logger;
  constructor(
    private readonly httpClient: HttpClient,
    private readonly config: ArtaClientConfig
  ) {
    this.logger = getLogger();
  }

  private async request(params: Partial<HttpRequestParameters>): Promise<any> {
    const authValue = this.makeArtaAuthHeader(this.config.apiKey);

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
    body?: string
  ): Partial<HttpRequestParameters> {
    const reqParams: Partial<HttpRequestParameters> = {
      path,
      method,
      headers: {
        'User-Agent': `ARTA/v1 arta-node/${version}`,
      },
    };

    if (auth) {
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

  public async get(path: string, auth?: string): Promise<any> {
    const reqParams = this.makeReqParams(path, 'get', auth);
    const res = await this.request(reqParams);
    return res.json();
  }

  public async post(path: string, payload: any, auth?: string): Promise<any> {
    const reqParams = this.makeReqParams(
      path,
      'post',
      auth,
      JSON.stringify(payload)
    );
    const res = await this.request(reqParams);
    return res.json();
  }

  public async patch(path: string, payload: any, auth?: string): Promise<any> {
    const reqParams = this.makeReqParams(
      path,
      'patch',
      auth,
      JSON.stringify(payload)
    );
    const res = await this.request(reqParams);
    return res.json();
  }

  public async delete(path: string, auth?: string): Promise<void> {
    await this.request(this.makeReqParams(path, 'delete', auth));
    return Promise.resolve();
  }
}
