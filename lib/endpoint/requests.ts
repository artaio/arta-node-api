import { ArtaID } from '../ArtaClient';
import {
  AdditionalService,
  ArtaLocation,
  ArtaObject,
  ArtaService,
  Contact,
  Disqualification,
  Insurance,
  InsurancePolicy,
  PaymentProcessType,
  QuoteRequestStatus,
  QuoteType,
  SupportedCurrency,
} from '../MetadataTypes';
import { RestClient } from '../net/RestClient';
import { Page } from '../pagination';
import { RequestsSearch } from '../search';
import {
  DatedInterface,
  Nullable,
  NullableString,
  parseService,
} from '../utils';
import { DefaultEndpoint, Endpoint } from './endpoint';

export interface Quote {
  id: number;
  included_services: ArtaService[];
  included_insurance_policy?: Nullable<InsurancePolicy>;
  optional_services: ArtaService[];
  quote_type: QuoteType;
  status: string;
  total: number;
  total_currency: SupportedCurrency;
}

export interface QuoteRequest extends DatedInterface {
  id: ArtaID;
  currency: SupportedCurrency;
  additional_services: AdditionalService[];
  bookable: {
    missing: string[];
    ready: boolean;
  };
  destination: ArtaLocation;
  disqualifications: Disqualification[];
  insurance: Nullable<Insurance>;
  internal_reference: NullableString;
  log_request_id: string;
  hosted_session_id: Nullable<number>;
  object_count: number;
  objects: ArtaObject[];
  origin: ArtaLocation;
  payment_process: PaymentProcessType;
  preferred_quote_types?: Nullable<QuoteType[]>;
  public_reference?: NullableString;
  quote_types: QuoteType[];
  shipping_notes?: NullableString;
  shortcode: string;
  quotes: Quote[];
  status: QuoteRequestStatus;
  updateContacts: (
    contacts: UpdateRequestsContactsBody,
    auth?: string
  ) => Promise<QuoteRequest>;
  requireCustomQuotes: (
    customQuote: CustomQuotePayload,
    auth?: string
  ) => Promise<QuoteRequest>;
  cancel: (auth?: string) => Promise<QuoteRequest>;
}

export interface QuoteRequestCreateBody {
  additional_services?: Nullable<AdditionalService[]>;
  currency?: Nullable<SupportedCurrency>;
  destination: ArtaLocation;
  insurance?: Nullable<Insurance>;
  internal_reference?: NullableString;
  objects: ArtaObject[];
  origin: ArtaLocation;
  preferred_quote_types?: Nullable<QuoteType[]>;
  public_reference?: NullableString;
  shipping_notes?: NullableString;
}

export interface QuoteRequestCreate {
  request: QuoteRequestCreateBody;
}

export interface UpdateRequestsContactsBody {
  origin?: Nullable<Contact[]>;
  destination?: Nullable<Contact[]>;
}

export interface CustomQuotePayload {
  note: string;
}

export class QuoteRequestsEndpoint {
  private readonly defaultEndpoint: Endpoint<QuoteRequest, QuoteRequestCreate>;
  private readonly path = '/requests';
  constructor(private readonly artaClient: RestClient) {
    this.defaultEndpoint = new DefaultEndpoint<
      QuoteRequest,
      QuoteRequestCreate
    >(this.path, this.artaClient, this.enrichFields.bind(this));
  }

  private enrichFields(resource: any): QuoteRequest {
    resource.quotes &&
      resource.quotes.forEach((q: any) => {
        q.total = Number(q.total);
        q.included_services.forEach(parseService);
        q.optional_services.forEach(parseService);
      });

    resource.updateContacts = (
      contacts: UpdateRequestsContactsBody,
      auth?: string
    ) => this.updateContacts(resource.id, contacts, auth);

    resource.requireCustomQuotes = (
      customQuote: CustomQuotePayload,
      auth?: string
    ) => this.requireCustomQuotes(resource.id, customQuote, auth);

    resource.cancel = (auth?: string) => this.cancel(resource.id, auth);

    return resource;
  }

  public getById(id: ArtaID, auth?: string): Promise<QuoteRequest> {
    return this.defaultEndpoint.getById(id, auth);
  }

  public list(
    search?: RequestsSearch,
    page = 1,
    pageSize = 20,
    auth?: string
  ): Promise<Page<QuoteRequest>> {
    return this.defaultEndpoint.list(
      { page, page_size: pageSize, search },
      auth
    );
  }

  public create(
    payload: QuoteRequestCreateBody,
    auth?: string
  ): Promise<QuoteRequest> {
    return this.defaultEndpoint.create({ request: payload }, auth);
  }

  public async updateContacts(
    id: ArtaID,
    contacts: UpdateRequestsContactsBody,
    auth?: string
  ): Promise<QuoteRequest> {
    const rawReq = await this.artaClient.patch(
      `${this.path}/${id}/contacts`,
      contacts,
      auth
    );
    return this.enrichFields(rawReq);
  }

  public async requireCustomQuotes(
    id: ArtaID,
    customQuote: CustomQuotePayload,
    auth?: string
  ): Promise<QuoteRequest> {
    const rawReq = await this.artaClient.patch(
      `${this.path}/${id}/custom`,
      customQuote,
      auth
    );
    return this.enrichFields(rawReq);
  }

  public async cancel(id: ArtaID, auth?: string): Promise<QuoteRequest> {
    const rawReq = await this.artaClient.patch(
      `${this.path}/${id}/cancel`,
      undefined,
      auth
    );
    return this.enrichFields(rawReq);
  }
}
