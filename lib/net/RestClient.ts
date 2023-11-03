export interface RestClient {
  get<T>(path: string, auth?: string): Promise<T>;
  post<U, T>(path: string, payload: U, auth?: string): Promise<T>;
  patch<U, T>(path: string, payload: U, auth?: string): Promise<T>;
  delete(path: string, auth?: string): Promise<void>;
}
