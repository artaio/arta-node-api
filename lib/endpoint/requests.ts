import type {
  AdditionalService,
  ArtaLocation,
  ArtaObject,
  Contact,
  Insurance,
  ParcelTransportServices,
  QuoteRequest,
  QuoteRequestListItem,
  QuoteType,
  QuotingStrategy,
  SupportedCurrency,
} from '../types';
import type { RestClient } from '../net/RestClient';
import type { Page } from '../pagination';
import type { RequestsSearch } from '../search';
import type { Nullable, NullableString } from '../utils';
import { createDateAsUTC, parseService } from '../utils';
import type { Endpoint } from './endpoint';
import { DefaultEndpoint } from './endpoint';

export type EnrichRequest<T> = T & {
  updateContacts: (
    contacts: UpdateRequestsContactsBody,
    auth?: string,
  ) => Promise<T>;
  requireCustomQuotes: (
    customQuote: CustomQuotePayload,
    auth?: string,
  ) => Promise<T>;
  cancel: (auth?: string) => Promise<T>;
};

export interface QuoteRequestCreateBody {
  additional_services?: Nullable<AdditionalService[]>;
  currency?: Nullable<SupportedCurrency>;
  destination: ArtaLocation;
  insurance?: Nullable<Insurance>;
  internal_reference?: NullableString;
  objects: ArtaObject[];
  origin: ArtaLocation;
  preferred_parcel_transport_services?: Nullable<ParcelTransportServices[]>;
  preferred_quote_types?: Nullable<QuoteType[]>;
  quoting_strategy?: QuotingStrategy;
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
  private readonly defaultEndpoint: Endpoint<
    EnrichRequest<QuoteRequestListItem | QuoteRequest>,
    QuoteRequestCreate
  >;
  private readonly path = '/requests';
  constructor(private readonly artaClient: RestClient) {
    this.defaultEndpoint = new DefaultEndpoint<
      EnrichRequest<QuoteRequestListItem | QuoteRequest>,
      QuoteRequestCreate
    >(this.path, this.artaClient, this.enrichFields.bind(this));
  }

  private enrichFields(
    resource: QuoteRequestListItem | QuoteRequest,
  ): EnrichRequest<QuoteRequestListItem | QuoteRequest> {
    if (Object.prototype.hasOwnProperty.call(resource, 'quotes')) {
      (resource as QuoteRequest).quotes.forEach((q: any) => {
        q.total = Number(q.total);
        q.included_services.forEach(parseService);
        q.optional_services.forEach(parseService);
        if (q.tags) {
          q.tags.forEach((t: any) => {
            q.created_at = createDateAsUTC(t.created_at);
            q.updated_at = createDateAsUTC(t.updated_at);
          });
        }
      });

      if (resource.tags) {
        resource.tags.forEach((t: any) => {
          t.created_at = createDateAsUTC(t.created_at);
          t.updated_at = createDateAsUTC(t.updated_at);
        });
      }
    }

    const updateContacts = (
      contacts: UpdateRequestsContactsBody,
      auth?: string,
    ) => this.updateContacts(resource.id, contacts, auth);

    const requireCustomQuotes = (
      customQuote: CustomQuotePayload,
      auth?: string,
    ) => this.requireCustomQuotes(resource.id, customQuote, auth);

    const cancel = (auth?: string) => this.cancel(resource.id, auth);

    return { ...resource, updateContacts, requireCustomQuotes, cancel };
  }

  public getById(
    id: string,
    auth?: string,
  ): Promise<EnrichRequest<QuoteRequest>> {
    return this.defaultEndpoint.getById(id, auth) as Promise<
      EnrichRequest<QuoteRequest>
    >;
  }

  public list(
    search?: RequestsSearch,
    page = 1,
    pageSize = 20,
    auth?: string,
  ): Promise<Page<EnrichRequest<QuoteRequestListItem>>> {
    return this.defaultEndpoint.list(
      { page, page_size: pageSize, search },
      auth,
    );
  }

  public create(
    payload: QuoteRequestCreateBody,
    auth?: string,
  ): Promise<EnrichRequest<QuoteRequest>> {
    return this.defaultEndpoint.create({ request: payload }, auth) as Promise<
      EnrichRequest<QuoteRequest>
    >;
  }

  public update(
    id: QuoteRequest['id'],
    payload: Partial<
      Pick<
        QuoteRequest,
        | 'destination'
        | 'internal_reference'
        | 'origin'
        | 'payment_process'
        | 'public_reference'
      > & { tags: Array<string> }
    >,
    auth?: string,
  ): Promise<EnrichRequest<QuoteRequest>> {
    return this.defaultEndpoint.update(
      id,
      { request: payload } as Partial<QuoteRequestCreateBody>,
      auth,
    ) as Promise<EnrichRequest<QuoteRequest>>;
  }

  public async updateContacts(
    id: string,
    contacts: UpdateRequestsContactsBody,
    auth?: string,
  ): Promise<EnrichRequest<QuoteRequest>> {
    const rawReq = (await this.artaClient.patch(
      `${this.path}/${id}/contacts`,
      contacts,
      auth,
    )) as QuoteRequest;
    return this.enrichFields(rawReq) as EnrichRequest<QuoteRequest>;
  }

  public async requireCustomQuotes(
    id: string,
    customQuote: CustomQuotePayload,
    auth?: string,
  ): Promise<QuoteRequest> {
    const rawReq = (await this.artaClient.patch(
      `${this.path}/${id}/custom`,
      customQuote,
      auth,
    )) as QuoteRequest;
    return this.enrichFields(rawReq) as EnrichRequest<QuoteRequest>;
  }

  public async cancel(id: string, auth?: string): Promise<QuoteRequest> {
    const rawReq = (await this.artaClient.patch(
      `${this.path}/${id}/cancel`,
      undefined,
      auth,
    )) as QuoteRequest;
    return this.enrichFields(rawReq) as EnrichRequest<QuoteRequest>;
  }
}
