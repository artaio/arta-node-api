export type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

export type HttpClientHeaders = Record<string, string>;

export interface HttpClientResponse {
  statusCode?: number;
  headers?: HttpClientHeaders;
  json: <T>() => Promise<T>;
}

export interface HttpRequestParameters {
  protocol: 'http' | 'https';
  port: number;
  path: string;
  method: HttpMethod;
  headers: HttpClientHeaders;
  requestData: string | null;
  timeout: number;
}

export interface HttpClient {
  request: (
    host: string,
    params?: Partial<HttpRequestParameters>,
  ) => Promise<HttpClientResponse>;
}
