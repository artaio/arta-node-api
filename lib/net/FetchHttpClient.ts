import type { Logger } from '../logging';
import { getLogger } from '../logging';
import type {
  HttpClient,
  HttpClientHeaders,
  HttpClientResponse,
  HttpRequestParameters,
} from './HttpClient';

export class FetchHttpClientResponse implements HttpClientResponse {
  public statusCode?: number;
  public headers: HttpClientHeaders = {};

  constructor(private readonly res: Response) {
    this.statusCode = res.status;
    res.headers.forEach((value, key) => {
      this.headers[key] = value;
    });
  }

  async json<T>(): Promise<T> {
    return await this.res.json();
  }
}

function initParams(
  params?: Partial<HttpRequestParameters>,
): HttpRequestParameters {
  const defaultParams = {
    protocol: 'https' as const,
    port: 443,
    path: '/',
    method: 'GET' as const,
    headers: {},
    requestData: null,
    timeout: 30000,
  };

  return {
    ...defaultParams,
    ...params,
  };
}

export class FetchHttpClient implements HttpClient {
  private readonly logger: Logger;

  constructor() {
    this.logger = getLogger();
  }

  async request(
    host: string,
    params?: Partial<HttpRequestParameters>,
  ): Promise<HttpClientResponse> {
    const {
      protocol,
      port,
      path,
      method,
      timeout,
      headers,
      requestData,
    } = initParams(params);

    const url = `${protocol}://${host}:${port}${path}`;

    this.logger.debug(`[${method}] ${url}`);

    const fetchUrl = fetch(url, {
      method,
      headers,
      body: requestData,
    });

    let setTimeoutId: ReturnType<typeof setTimeout> | null = null;
    const rejectTimeout = new Promise((_, reject) => {
      setTimeoutId = setTimeout(() => {
        reject(new Error(`Request timed out to ${host}:${port}`));
      }, timeout);
    });
    try {
      const response = await Promise.race([fetchUrl, rejectTimeout]) as Response;

      return new FetchHttpClientResponse(response);
    } finally {
      setTimeoutId != null && clearTimeout(setTimeoutId);
    }
  }
}
