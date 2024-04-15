import type { ArtaID } from '../ArtaClient';
import type { RestClient } from '../net/RestClient';
import type { Page } from '../pagination';
import type {
  AdditionalService,
  ArtaLocation,
  ArtaObject,
  Insurance,
  PaymentProcessType,
  QuoteType,
  QuoteRequestStatus,
} from '../MetadataTypes';
import {
  convertDatesToUtc,
  type DatedInterface,
  type NotDateParsed,
  type Nullable,
  type NullableString,
} from '../utils';
import type { Endpoint } from './endpoint';
import { DefaultEndpoint } from './endpoint';
import type { HostedSessionsSearch } from '../search';

export interface HostedSession extends DatedInterface {
  id: ArtaID;
  additional_services?: Nullable<AdditionalService[]>;
  cancel_url?: NullableString;
  destination?: Nullable<ArtaLocation>;
  insurance?: Nullable<Insurance>;
  internal_reference?: NullableString;
  objects: ArtaObject[];
  origin: ArtaLocation;
  preferred_quote_types?: Nullable<QuoteType[]>;
  public_reference?: NullableString;
  shipping_notes?: NullableString;
  success_url?: NullableString;
  payment_process: PaymentProcessType;
  private_token: string;
  shortcode: string;
  status: QuoteRequestStatus;
  url?: NullableString;
  cancel: (auth?: string) => Promise<HostedSession>;
}

export interface HostedSessionCreateBody {
  additional_services?: Nullable<AdditionalService[]>;
  cancel_url?: NullableString;
  destination?: Nullable<ArtaLocation>;
  insurance?: Nullable<Insurance>;
  internal_reference?: NullableString;
  objects: ArtaObject[];
  origin: ArtaLocation;
  preferred_quote_types?: Nullable<QuoteType[]>;
  public_reference?: NullableString;
  shipping_notes?: NullableString;
  success_url?: NullableString;
}

export interface HostedSessionCreate {
  hosted_session: HostedSessionCreateBody;
}

export class HostedSessionsEndpoint {
  private readonly defaultEndpoint: Endpoint<
    HostedSession,
    HostedSessionCreate
  >;
  private readonly path = '/hosted_sessions';
  constructor(private readonly artaClient: RestClient) {
    this.defaultEndpoint = new DefaultEndpoint<
      HostedSession,
      HostedSessionCreate
    >(this.path, this.artaClient, this.withFunctionCalls.bind(this));
  }

  private withFunctionCalls(hostedSession: HostedSession): HostedSession {
    hostedSession.cancel = (auth?: string) =>
      this.cancel(hostedSession.id, auth);
    return hostedSession;
  }

  public getById(id: ArtaID, auth?: string): Promise<HostedSession> {
    return this.defaultEndpoint.getById(id, auth);
  }

  public list(
    search?: HostedSessionsSearch,
    page = 1,
    pageSize = 20,
    auth?: string,
  ): Promise<Page<HostedSession>> {
    return this.defaultEndpoint.list(
      { page, page_size: pageSize, search },
      auth,
    );
  }

  public create(
    payload: HostedSessionCreateBody,
    auth?: string,
  ): Promise<HostedSession> {
    return this.defaultEndpoint.create({ hosted_session: payload }, auth);
  }

  public async cancel(id: ArtaID, auth?: string): Promise<HostedSession> {
    const rawSession = await this.artaClient.patch<
      undefined,
      NotDateParsed<HostedSession>
    >(`${this.path}/${id}/cancel`, undefined, auth);
    return this.withFunctionCalls(convertDatesToUtc(rawSession));
  }
}
