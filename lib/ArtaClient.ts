import {
  HttpClient,
  HttpMethod,
  HttpRequestParameters,
} from './net/HttpClient';

export type ArtaID = number | string;

interface ArtaClientConfig {
  apiKey: string;
  host: string;
}

export class ArtaClient {
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

    return await this.httpClient.request(this.config.host, params);
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

  public async get(
    path: string,
    auth?: string,
    page = 1,
    pageSize = 20
  ): Promise<any> {
    const paginatedPath = `${path}?page=${page}&page_size=${pageSize}`;
    const reqParams = this.makeReqParams(paginatedPath, 'get', auth);
    const res = await this.request(reqParams);
    return res.json();
  }

  public async getOne(path: string, id?: ArtaID, auth?: string): Promise<any> {
    const pathWithId = id ? `${path}/${id}` : path;
    const reqParams = this.makeReqParams(pathWithId, 'get', auth);
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

  public async patch(
    path: string,
    id: ArtaID,
    payload: any,
    auth?: string
  ): Promise<any> {
    const reqParams = this.makeReqParams(
      `${path}/${id}`,
      'patch',
      auth,
      JSON.stringify(payload)
    );
    const res = await this.request(reqParams);
    return res.json();
  }

  public async delete(path: string, id: ArtaID, auth?: string): Promise<void> {
    await this.request(this.makeReqParams(`${path}/${id}`, 'delete', auth));
    return Promise.resolve();
  }
}
