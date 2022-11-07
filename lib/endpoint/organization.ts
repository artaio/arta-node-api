import { ArtaID } from '../ArtaClient';
import { RestClient } from '../net/RestClient';
import { convertDatesToUtc, DatedInterface, NullableString } from '../utils';

export interface Organization extends DatedInterface {
  api_version: string;
  id: ArtaID;
  name: string;
  billing_terms?: NullableString;
  company_name?: NullableString;
  display_name?: NullableString;
  shortcode?: NullableString;
  status?: NullableString;
  stripe_customer_id?: NullableString;
}

export class OrganizationsEndpoint {
  private readonly path = '/organization';
  constructor(private readonly artaClient: RestClient) {}

  /** Retrieves the Organization associated with the API Key
   * @param [auth] An optional API key.
   * @returns The Organization
   * @throws ArtaSDKError thrown if some problem happened while communicating with the API.
   */
  async get(auth?: string): Promise<Organization> {
    const artaResponse = await this.artaClient.get(this.path, auth);
    return convertDatesToUtc(artaResponse) as Organization;
  }

  /** Updates the Organization associated with the API Key
   * @param [auth] An optional API key.
   * @returns The Organization
   * @throws ArtaSDKError thrown if some problem happened while communicating with the API.
   */
  async update(
    organization: Partial<Organization>,
    auth?: string
  ): Promise<Organization> {
    const artaResponse = await this.artaClient.patch(
      this.path,
      { organization },
      auth
    );
    return convertDatesToUtc(artaResponse) as Organization;
  }
}
