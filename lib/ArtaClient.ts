import { ArtaAPIError, ArtaSDKError } from './error';
import {
  HttpClient,
  HttpMethod,
  HttpRequestParameters,
} from './net/HttpClient';
import { RestClient } from './net/RestClient';

export type ArtaID = number | string;
interface ArtaClientConfig {
  apiKey: string;
  host: string;
}
export class ArtaClient implements RestClient {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly config: ArtaClientConfig
  ) {}

  private async request(params: Partial<HttpRequestParameters>): Promise<any> {
    const authValue = this.makeArtaAuthHeader(this.config.apiKey);

    if (params.headers == null) {
      params.headers = { Authorization: authValue };
    } else if (params.headers.Authorization == null) {
      params.headers.Authorization = authValue;
    }

    const req = await this.httpClient.request(this.config.host, params);
    if (req.statusCode && req.statusCode > 400) {
      throw new ArtaSDKError(
        (await req.json()) as ArtaAPIError,
        req.statusCode
      );
    }
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
    };

    if (auth) {
      reqParams.headers = {
        Authorization: this.makeArtaAuthHeader(auth),
      };
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
