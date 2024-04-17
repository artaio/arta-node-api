import type { RestClient } from '../net/RestClient';
import type { Organization } from '../types';
import type { NotDateParsed } from '../utils';
import {
  convertDatesToUtc
} from '../utils';

export class OrganizationsEndpoint {
  private readonly path = '/organization';
  constructor(private readonly artaClient: RestClient) {}

  /** Retrieves the Organization associated with the API Key
   * @param [auth] An optional API key.
   * @returns The Organization
   * @throws ArtaSDKError thrown if some problem happened while communicating with the API.
   */
  async get(auth?: string): Promise<Organization> {
    const artaResponse = await this.artaClient.get<NotDateParsed<Organization>>(
      this.path,
      auth,
    );
    return convertDatesToUtc(artaResponse);
  }

  /** Updates the Organization associated with the API Key
   * @param [auth] An optional API key.
   * @returns The Organization
   * @throws ArtaSDKError thrown if some problem happened while communicating with the API.
   */
  async update(
    organization: Partial<Organization>,
    auth?: string,
  ): Promise<Organization> {
    const artaResponse = await this.artaClient.patch<
      { organization: Partial<Organization> },
      NotDateParsed<Organization>
    >(this.path, { organization }, auth);
    return convertDatesToUtc(artaResponse);
  }
}
