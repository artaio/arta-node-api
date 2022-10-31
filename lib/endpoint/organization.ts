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

export class OrganizationEndpoint {
  private readonly path = '/organization';
  constructor(private readonly artaClient: RestClient) {}

  async get(auth?: string): Promise<Organization> {
    const artaResponse = await this.artaClient.get(this.path, auth);
    return convertDatesToUtc(artaResponse) as Organization;
  }

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
