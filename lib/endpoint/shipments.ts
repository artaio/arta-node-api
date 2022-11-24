import { ArtaID } from '../ArtaClient';
import {
  ArtaLocation,
  ArtaObject,
  ArtaService,
  EEIFormStatus,
  InsurancePolicy,
  PackageStatus,
  PackingSubType,
  PaymentProcessType,
  QuoteType,
  ShipmentStatus,
  SupportedCurrency,
} from '../MetadataTypes';
import { RestClient } from '../net/RestClient';
import { Page } from '../pagination';
import { ShipmentsSearch } from '../search';
import {
  DatedInterface,
  Nullable,
  NullableString,
  parseService,
} from '../utils';
import { DefaultEndpoint, Endpoint } from './endpoint';

export interface Package {
  depth: number;
  eta: string;
  handle_with_care: boolean;
  height: number;
  id: number;
  is_sufficiently_packed: boolean;
  objects: ArtaObject[];
  packing_materials: PackingSubType[];
  status: Nullable<PackageStatus>;
  unit_of_measurement?: NullableString;
  weight: number;
  weight_unit: string;
  width: number;
}

export interface ShipmentSchedule {
  delivery_end: Nullable<Date>;
  delivery_start: Nullable<Date>;
  delivery_window_modifier: string;
  pickup_end: Nullable<Date>;
  pickup_start: Nullable<Date>;
  pickup_window_modifier: string;
}

export interface ShipmentTracking {
  carrier_name: string;
  label_url?: NullableString;
  package_id: number;
  tracking_number: string;
  url: string;
}

export interface Shipment extends DatedInterface {
  id: ArtaID;
  destination: ArtaLocation;
  eei_form_status?: Nullable<EEIFormStatus>;
  hosted_session_id?: Nullable<number>;
  insurance_policy?: Nullable<InsurancePolicy>;
  internal_reference?: NullableString;
  log_request_id?: NullableString;
  object_count: number;
  origin: ArtaLocation;
  package_count: number;
  packages?: Nullable<Package[]>;
  payment_process?: Nullable<PaymentProcessType>;
  public_reference?: NullableString;
  quote_type: QuoteType;
  schedule?: Nullable<ShipmentSchedule>;
  services?: Nullable<ArtaService[]>;
  shipping_notes?: NullableString;
  shortcode: string;
  status: ShipmentStatus;
  total: number;
  total_currency: SupportedCurrency;
  url?: NullableString;
  tracking?: Nullable<ShipmentTracking[]>;
}

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
      this.enrichFields.bind(this)
    );
  }

  private enrichFields(r: any): Shipment {
    r.total = Number(r.total);
    if (r.schedule) {
      r.schedule.delivery_end = new Date(r.schedule.delivery_end);
      r.schedule.delivery_start = new Date(r.schedule.delivery_start);
      r.schedule.pickup_end = new Date(r.schedule.pickup_end);
      r.schedule.pickup_start = new Date(r.schedule.pickup_start);
    }

    if (r.packages) {
      r.packages.forEach((p: any) => {
        p.depth = Number(p.depth);
        p.height = Number(p.height);
        p.weight = Number(p.weight);
        p.width = Number(p.width);
      });
    }
    r.services && r.services.forEach(parseService);
    return r;
  }

  public getById(id: ArtaID, auth?: string): Promise<Shipment> {
    return this.defaultEndpoint.getById(id, auth);
  }

  public list(
    search?: ShipmentsSearch,
    page = 1,
    pageSize = 20,
    auth?: string
  ): Promise<Page<Shipment>> {
    return this.defaultEndpoint.list(
      { page, page_size: pageSize, search },
      auth
    );
  }

  public create(payload: ShipmentCreateBody, auth?: string): Promise<Shipment> {
    return this.defaultEndpoint.create({ shipment: payload }, auth);
  }
}
