import { ArtaID } from './ArtaClient';
import { RestClient } from './net/RestClient';
import { createDateAsUTC, NullableString } from './utils';

export interface Organization {
  api_version: string;
  id: ArtaID;
  created_at: Date;
  name: string;
  updated_at: Date;
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

  private convertDatesToUtc(artaResponse: any): Organization {
    artaResponse.updated_at = createDateAsUTC(artaResponse.updated_at);
    artaResponse.created_at = createDateAsUTC(artaResponse.created_at);
    return artaResponse;
  }

  async get(auth?: string): Promise<Organization> {
    const artaResponse = await this.artaClient.get(this.path, auth);
    return this.convertDatesToUtc(artaResponse);
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
    return this.convertDatesToUtc(artaResponse);
  }
}
