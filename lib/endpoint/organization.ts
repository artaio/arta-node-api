import {
  Organization as GeneratedOrganization,
  OrganizationApi,
  OrganizationPatchRequestOrganization,
} from '../generated';
import { convertDatesToUtc, Dated } from '../utils';
import { Endpoint } from './endpoints';

export type Organization = Dated<GeneratedOrganization>;
export class OrganizationEndpoint extends Endpoint {
  private readonly organizationApi: OrganizationApi;
  constructor(apiKey: string) {
    super(apiKey);
    this.organizationApi = new OrganizationApi();
  }

  /** Retrieves the Organization associated with the API Key
   * @param [auth] An optional API key.
   * @returns The Organization
   * @throws ArtaSDKError thrown if some problem happened while communicating with the API.
   */
  async get(auth?: string): Promise<Organization> {
    const response = await this.organizationApi.organizationGet(
      this.getAuthHeader(auth)
    );
    return convertDatesToUtc(response.data);
  }

  /** Updates the Organization associated with the API Key
   * @param [auth] An optional API key.
   * @returns The Organization
   * @throws ArtaSDKError thrown if some problem happened while communicating with the API.
   */
  async update(
    organization: OrganizationPatchRequestOrganization,
    auth?: string
  ): Promise<Organization> {
    const response = await this.organizationApi.organizationPatch(
      this.getAuthHeader(auth),
      { organization }
    );
    return convertDatesToUtc(response.data);
  }
}
