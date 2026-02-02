import type { ArtaID } from '../ArtaClient';
import type { RestClient } from '../net/RestClient';
import type { Page } from '../pagination';
import type {
  AdditionalService,
  ArtaInboundObject,
  ArtaLocation,
  ArtaObject,
  HostedSession,
  Insurance,
  ParcelTransportServices,
  QuoteType,
  QuotingStrategy,
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

export type HostedSessionCreateBody =
  | {
      additional_services?: Nullable<AdditionalService[]>;
      cancel_url?: NullableString;
      destination?: Nullable<ArtaLocation>;
      insurance?: Nullable<Insurance>;
      internal_reference?: NullableString;
      objects: ArtaObject[];
      origin: ArtaLocation;
      preferred_quote_types?: Nullable<QuoteType[]>;
      preferred_parcel_transport_services?: Nullable<ParcelTransportServices[]>;
      public_reference?: NullableString;
      shipping_notes?: NullableString;
      success_url?: NullableString;
      public_instructions_location_quotes?: HostedSession['public_instructions_location_quotes'];
      public_instructions_payment?: HostedSession['public_instructions_payment'];
      public_instructions_booking_review?: HostedSession['public_instructions_booking_review'];
      public_instructions_confirmation?: HostedSession['public_instructions_confirmation'];
      quoting_strategy?: QuotingStrategy;
      type?: 'booking';
    }
  | {
      request_id: string;
    }
  | {
      additional_services?: Nullable<AdditionalService[]>;
      cancel_url?: NullableString;
      destination: ArtaLocation;
      insurance?: Nullable<Insurance>;
      internal_reference?: NullableString;
      objects: ArtaInboundObject[];
      origin?: Nullable<ArtaLocation>;
      preferred_quote_types?: Nullable<QuoteType[]>;
      preferred_parcel_transport_services?: Nullable<ParcelTransportServices[]>;
      public_reference?: NullableString;
      shipping_notes?: NullableString;
      success_url?: NullableString;
      can_user_confirm_object_dimensions?: HostedSession['can_user_confirm_object_dimensions'];
      public_instructions_object_details?: HostedSession['public_instructions_object_details'];
      public_instructions_location_quotes?: HostedSession['public_instructions_location_quotes'];
      public_instructions_payment?: HostedSession['public_instructions_payment'];
      public_instructions_booking_review?: HostedSession['public_instructions_booking_review'];
      public_instructions_confirmation?: HostedSession['public_instructions_confirmation'];
      quoting_strategy?: QuotingStrategy;
      type: 'inbound_booking';
    };

type HostedSessionListItem = Omit<
  HostedSession,
  | 'public_instructions_object_details'
  | 'public_instructions_location_quotes'
  | 'public_instructions_payment'
  | 'public_instructions_booking_review'
  | 'public_instructions_confirmation'
>;

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
  ): Promise<Page<HostedSessionListItem>> {
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
