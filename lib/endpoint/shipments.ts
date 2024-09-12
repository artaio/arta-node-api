import type { ArtaID } from '../ArtaClient';
import type { RestClient } from '../net/RestClient';
import type { Page } from '../pagination';
import type { ShipmentsSearch } from '../search';
import type { NullableString } from '../utils';
import { createDateAsUTC, parseService } from '../utils';
import type { Shipment } from '../types';
import type { Endpoint } from './endpoint';
import { DefaultEndpoint } from './endpoint';
export interface ShipmentCreateBody {
  internal_reference?: NullableString;
  public_reference?: NullableString;
  quote_id: number;
  shipping_notes?: NullableString;
}

export interface ShipmentCreate {
  shipment: ShipmentCreateBody;
}

export class ShipmentsEndpoint {
  private readonly defaultEndpoint: Endpoint<Shipment, ShipmentCreate>;
  private readonly path = '/shipments';
  constructor(private readonly artaClient: RestClient) {
    this.defaultEndpoint = new DefaultEndpoint<Shipment, ShipmentCreate>(
      this.path,
      this.artaClient,
      this.enrichFields.bind(this),
    );
  }

  private enrichFields(s: any): Shipment {
    s.total = Number(s.total);

    if (s.emissions) {
      s.emissions = Number(s.emissions);
    }

    if (s.schedule) {
      s.schedule.delivery_end = createDateAsUTC(s.schedule.delivery_end);
      s.schedule.delivery_start = createDateAsUTC(s.schedule.delivery_start);
      s.schedule.pickup_end = createDateAsUTC(s.schedule.pickup_end);
      s.schedule.pickup_start = createDateAsUTC(s.schedule.pickup_start);
    }

    if (s.packages) {
      s.packages.forEach((p: any) => {
        p.depth = Number(p.depth);
        p.height = Number(p.height);
        p.weight = Number(p.weight);
        p.width = Number(p.width);
      });
    }
    if (s.exceptions) {
      s.exceptions.forEach((e: any) => {
        e.created_at = createDateAsUTC(e.created_at);
        e.updated_at = createDateAsUTC(e.updated_at);
      });
    }

    s.services && s.services.forEach(parseService);
    return s;
  }

  public getById(id: ArtaID, auth?: string): Promise<Shipment> {
    return this.defaultEndpoint.getById(id, auth);
  }

  public list(
    search?: ShipmentsSearch,
    page = 1,
    pageSize = 20,
    auth?: string,
  ): Promise<Page<Shipment>> {
    return this.defaultEndpoint.list(
      { page, page_size: pageSize, search },
      auth,
    );
  }

  public create(payload: ShipmentCreateBody, auth?: string): Promise<Shipment> {
    return this.defaultEndpoint.create({ shipment: payload }, auth);
  }
}
