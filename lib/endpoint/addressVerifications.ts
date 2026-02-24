import type { ArtaID } from '../ArtaClient';
import type { RestClient } from '../net/RestClient';
import type { Endpoint } from './endpoint';
import { DefaultEndpoint } from './endpoint';
import type { Page } from '../pagination';
import type { AddressVerification } from '../types';

export interface AddressVerificationCreateBodyInput {
  address_line_1: string;
  address_line_2?: string | null;
  address_line_3?: string | null;
  city?: string | null;
  region?: string | null;
  postal_code?: string | null;
  country: string;
}

export interface AddressVerificationCreateBody {
  input: AddressVerificationCreateBodyInput;
  reference?: string | null;
}

export interface AddressVerificationCreate {
  address_verification: AddressVerificationCreateBody;
}

export class AddressVerificationsEndpoint {
  private readonly defaultEndpoint: Endpoint<
    AddressVerification,
    AddressVerificationCreate
  >;
  private readonly path = '/address_verifications';
  constructor(private readonly artaClient: RestClient) {
    this.defaultEndpoint = new DefaultEndpoint<
      AddressVerification,
      AddressVerificationCreate
    >(this.path, this.artaClient);
  }

  public getById(id: ArtaID, auth?: string): Promise<AddressVerification> {
    return this.defaultEndpoint.getById(id, auth);
  }

  public list(
    page = 1,
    pageSize = 20,
    auth?: string,
  ): Promise<Page<AddressVerification>> {
    return this.defaultEndpoint.list({ page, page_size: pageSize }, auth);
  }

  public listAll(auth?: string): AsyncGenerator<AddressVerification> {
    return this.defaultEndpoint.listAll(auth);
  }

  public create(
    payload: AddressVerificationCreateBody,
    auth?: string,
  ): Promise<AddressVerification> {
    return this.defaultEndpoint.create({ address_verification: payload }, auth);
  }
}
