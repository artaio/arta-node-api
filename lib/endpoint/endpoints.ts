import { makeAuthHeader } from '../makeAuthHeader';

export class Endpoint {
  private readonly authHeader: string;

  constructor(apiKey: string) {
    this.authHeader = makeAuthHeader(apiKey);
  }

  protected getAuthHeader(auth?: string) {
    return auth ? makeAuthHeader(auth) : this.authHeader;
  }
}
