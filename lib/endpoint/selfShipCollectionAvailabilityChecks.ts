import type { RestClient } from '../net/RestClient';
import type { SelfShipCollectionAvailabilityCheck } from '../types';

export interface SelfShipCollectionAvailabilityCheckCreateBody {
  location: {
    address_line_1: string;
    address_line_2?: string | null;
    city: string;
    region: string;
    postal_code: string;
    country: string;
    close_time: string;
  };
  service: {
    carrier: 'fedex';
    code: 'express' | 'ground';
    route: 'domestic' | 'international';
  };
  collection_date: string;
}

export interface SelfShipCollectionAvailabilityCheckCreate {
  self_ship_collection_availability_check: SelfShipCollectionAvailabilityCheckCreateBody;
}

export class SelfShipCollectionAvailabilityChecksEndpoint {
  private readonly path = '/self_ship_collection_availability_checks';
  constructor(private readonly artaClient: RestClient) {}

  public async create(
    payload: SelfShipCollectionAvailabilityCheckCreateBody,
    auth?: string,
  ): Promise<SelfShipCollectionAvailabilityCheck> {
    return this.artaClient.post<
      SelfShipCollectionAvailabilityCheckCreate,
      SelfShipCollectionAvailabilityCheck
    >(this.path, { self_ship_collection_availability_check: payload }, auth);
  }
}
