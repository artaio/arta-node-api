import type { ArtaID } from '../ArtaClient';
import type { RestClient } from '../net/RestClient';
import type {
  PickupAvailability,
  SelfShipCollection,
  SelfShipCollectionCarrier,
  SelfShipCollectionCountryRelationships,
  SelfShipCollectionPackageLocation,
  SelfShipCollectionServiceLevel,
  SelfShipCollectionStatus,
} from '../types';
import type { NotDateParsed } from '../utils';
import { convertDatesToUtc } from '../utils';
import type { Page } from '../pagination';

export interface GetPickupAvailabilityPayload {
  address_line_1: string;
  city: string;
  region: string;
  country: string;
  postal_code: string;
  customer_close_time: string;
  collection_date: string;
  country_relationships: SelfShipCollectionCountryRelationships;
  service_level: SelfShipCollectionServiceLevel;
}

export interface SelfShipCollectionCreateBody {
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  ready_at: string;
  address_line_1: string;
  city: string;
  region: string;
  country: string;
  postal_code: string;
  customer_close_time: string;
  service_level: SelfShipCollectionServiceLevel;
  package_location: SelfShipCollectionPackageLocation;
  country_relationships: SelfShipCollectionCountryRelationships;
  carrier: SelfShipCollectionCarrier;
  payment_type?: string;
}

export interface SelfShipCollectionListParams {
  page?: number;
  page_size?: number;
  status?: SelfShipCollectionStatus;
  carrier?: SelfShipCollectionCarrier;
  city?: string;
  region?: string;
  country?: string;
  postal_code?: string;
}

export class SelfShipCollectionsEndpoint {
  private readonly path = '/self_ship_collections';
  constructor(private readonly artaClient: RestClient) {}

  public async getPickupAvailability(
    payload: GetPickupAvailabilityPayload,
    auth?: string,
  ): Promise<PickupAvailability[]> {
    return this.artaClient.post<
      GetPickupAvailabilityPayload,
      PickupAvailability[]
    >(`${this.path}/pickup_availability`, payload, auth);
  }

  public async create(
    payload: SelfShipCollectionCreateBody,
    auth?: string,
  ): Promise<SelfShipCollection> {
    const body = await this.artaClient.post<
      { self_ship_collection: SelfShipCollectionCreateBody },
      NotDateParsed<SelfShipCollection>
    >(this.path, { self_ship_collection: payload }, auth);

    return this.parseCollection(body);
  }

  public async list(
    params?: SelfShipCollectionListParams,
    auth?: string,
  ): Promise<Page<SelfShipCollection>> {
    const queryString = this.buildQueryString(params);
    const body = await this.artaClient.get<
      Page<NotDateParsed<SelfShipCollection>>
    >(`${this.path}${queryString}`, auth);

    const items = body.items.map((item) => this.parseCollection(item));
    return { items, metadata: body.metadata };
  }

  public async getById(id: ArtaID, auth?: string): Promise<SelfShipCollection> {
    const body = await this.artaClient.get<NotDateParsed<SelfShipCollection>>(
      `${this.path}/${id}`,
      auth,
    );

    return this.parseCollection(body);
  }

  private parseCollection(
    raw: NotDateParsed<SelfShipCollection>,
  ): SelfShipCollection {
    return convertDatesToUtc<SelfShipCollection>(raw);
  }

  private buildQueryString(params?: SelfShipCollectionListParams): string {
    if (!params) {
      return '?page=1&page_size=20';
    }

    const parts: string[] = [];
    const page = params.page ?? 1;
    const pageSize = params.page_size ?? 20;
    parts.push(`page=${page}`);
    parts.push(`page_size=${pageSize}`);

    const filterFields = [
      'status',
      'carrier',
      'city',
      'region',
      'country',
      'postal_code',
    ] as const;

    for (const field of filterFields) {
      if (params[field] != null) {
        parts.push(`${field}[equal_to]=${encodeURIComponent(params[field]!)}`);
      }
    }

    return `?${parts.join('&')}`;
  }
}
