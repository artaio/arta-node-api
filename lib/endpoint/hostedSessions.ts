import { ArtaID } from '../ArtaClient';
import { RestClient } from '../net/RestClient';
import { Page } from '../pagination';
import {
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
  DatedInterface,
  Nullable,
  NullableString,
} from '../utils';
import { DefaultEndpoint, Endpoint } from './endpoint';

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
    page = 1,
    pageSize = 20,
    auth?: string
  ): Promise<Page<HostedSession>> {
    return this.defaultEndpoint.list(page, pageSize, auth);
  }

  public create(
    payload: HostedSessionCreateBody,
    auth?: string
  ): Promise<HostedSession> {
    return this.defaultEndpoint.create({ hosted_session: payload }, auth);
  }

  public async cancel(id: ArtaID, auth?: string): Promise<HostedSession> {
    const rawSession = await this.artaClient.patch(
      `${this.path}/${id}/cancel`,
      undefined,
      auth
    );
    return this.withFunctionCalls(convertDatesToUtc(rawSession));
  }
}
