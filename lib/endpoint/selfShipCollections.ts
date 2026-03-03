import type { ArtaID } from '../ArtaClient';
import type { RestClient } from '../net/RestClient';
import type { Endpoint } from './endpoint';
import { DefaultEndpoint } from './endpoint';
import type { Page } from '../pagination';
import type { SelfShipCollection } from '../types';

export interface SelfShipCollectionCreateBody {
  location: {
    address_line_1: string;
    address_line_2?: string | null;
    city: string;
    region: string;
    postal_code: string;
    country: string;
    close_time: string;
    package_location: 'front' | 'none' | 'rear' | 'side';
    contact: {
      name: string;
      phone_number: string;
      email_address: string;
    };
  };
  service: {
    carrier: 'fedex';
    code: 'express' | 'ground';
    route: 'domestic' | 'international';
  };
  collection_date: string;
  collection_time: string;
}

export interface SelfShipCollectionCreate {
  self_ship_collection: SelfShipCollectionCreateBody;
}

export class SelfShipCollectionsEndpoint {
  private readonly defaultEndpoint: Endpoint<
    SelfShipCollection,
    SelfShipCollectionCreate
  >;
  private readonly path = '/self_ship_collections';
  constructor(private readonly artaClient: RestClient) {
    this.defaultEndpoint = new DefaultEndpoint<
      SelfShipCollection,
      SelfShipCollectionCreate
    >(this.path, this.artaClient);
  }

  public getById(id: ArtaID, auth?: string): Promise<SelfShipCollection> {
    return this.defaultEndpoint.getById(id, auth);
  }

  public list(
    page = 1,
    pageSize = 20,
    auth?: string,
  ): Promise<Page<SelfShipCollection>> {
    return this.defaultEndpoint.list({ page, page_size: pageSize }, auth);
  }

  public listAll(auth?: string): AsyncGenerator<SelfShipCollection> {
    return this.defaultEndpoint.listAll(auth);
  }

  public create(
    payload: SelfShipCollectionCreateBody,
    auth?: string,
  ): Promise<SelfShipCollection> {
    return this.defaultEndpoint.create({ self_ship_collection: payload }, auth);
  }
}
