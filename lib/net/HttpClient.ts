export type HttpMethod = 'get' | 'post' | 'patch' | 'put' | 'delete';

export interface HttpClientHeaders {
  [key: string]: string | string[] | undefined;
}

export interface HttpClientResponse {
  statusCode?: number;
  headers?: HttpClientHeaders;
  body: () => Promise<string>;
  json: <T>() => Promise<T>;
}

export interface HttpRequestParameters {
  protocol: 'http' | 'https';
  port: number;
  path: string;
  method: HttpMethod;
  headers: HttpClientHeaders;
  requestData: string;
  timeout: number;
}

export interface HttpClient {
  request: (
    host: string,
    params?: Partial<HttpRequestParameters>,
  ) => Promise<HttpClientResponse>;
}
