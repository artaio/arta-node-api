import type { ArtaID } from '../ArtaClient';
import type { RestClient } from '../net/RestClient';
import type { Page } from '../pagination';
import type {
  AdditionalService,
  ArtaLocation,
  ArtaObject,
  HostedSession,
  Insurance,
  QuoteType,
} from '../MetadataTypes';
import {
  convertDatesToUtc,
  type NotDateParsed,
  type Nullable,
  type NullableString,
} from '../utils';
import type { Endpoint } from './endpoint';
import { DefaultEndpoint } from './endpoint';
import type { HostedSessionsSearch } from '../search';

export type EnrichedHostedSession = HostedSession & {
  cancel: (auth?: string) => Promise<HostedSession>;
};

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
    EnrichedHostedSession,
    HostedSessionCreate
  >;
  private readonly path = '/hosted_sessions';
  constructor(private readonly artaClient: RestClient) {
    this.defaultEndpoint = new DefaultEndpoint<
      EnrichedHostedSession,
      HostedSessionCreate
    >(this.path, this.artaClient, this.withFunctionCalls.bind(this));
  }

  private withFunctionCalls(
    hostedSession: EnrichedHostedSession,
  ): EnrichedHostedSession {
    hostedSession.cancel = (auth?: string) =>
      this.cancel(hostedSession.id, auth);
    return hostedSession;
  }

  public getById(id: ArtaID, auth?: string): Promise<EnrichedHostedSession> {
    return this.defaultEndpoint.getById(id, auth);
  }

  public list(
    search?: HostedSessionsSearch,
    page = 1,
    pageSize = 20,
    auth?: string,
  ): Promise<Page<EnrichedHostedSession>> {
    return this.defaultEndpoint.list(
      { page, page_size: pageSize, search },
      auth,
    );
  }

  public create(
    payload: HostedSessionCreateBody,
    auth?: string,
  ): Promise<EnrichedHostedSession> {
    return this.defaultEndpoint.create({ hosted_session: payload }, auth);
  }

  public async cancel(
    id: ArtaID,
    auth?: string,
  ): Promise<EnrichedHostedSession> {
    const rawSession = await this.artaClient.patch<
      undefined,
      NotDateParsed<EnrichedHostedSession>
    >(`${this.path}/${id}/cancel`, undefined, auth);
    return this.withFunctionCalls(convertDatesToUtc(rawSession));
  }
}
