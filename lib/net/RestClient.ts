export interface RestClient {
  get(path: string, auth?: string): Promise<any>;
  post(path: string, payload: any, auth?: string): Promise<any>;
  patch(path: string, payload: any, auth?: string): Promise<any>;
  delete(path: string, auth?: string): Promise<void>;
}
