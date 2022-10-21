type HttpMethod = 'get'
| 'post'
| 'patch'
| 'put'
| 'delete';

export interface HttpClientResponse {
  statusCode?: number
  headers?: any
  body: () => Promise<string>
  json: () => Promise<any>
}

export interface HttpRequestParameters {
  protocol: 'http' | 'https'
  port: number
  path: string
  method: HttpMethod
  headers: any
  requestData: string
  timeout: number
}

export interface HttpClient {
  request: (host: string, params?: Partial<HttpRequestParameters>) => Promise<HttpClientResponse>
}
