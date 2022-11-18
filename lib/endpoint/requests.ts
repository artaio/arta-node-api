import { ArtaID } from '../ArtaClient';
import {
  AdditionalService,
  ArtaLocation,
  ArtaObject,
  Disqualification,
  Insurance,
  PaymentProcessType,
  QuoteRequestStatus,
  QuoteType,
  SupportedCurrency,
} from '../MetadataTypes';
import { RestClient } from '../net/RestClient';
import { Page } from '../pagination';
import { DatedInterface, Nullable, NullableString } from '../utils';
import { DefaultEndpoint, Endpoint } from './endpoint';

export interface IncludedInsurancePolicy {
  amount: number;
  amount_currency: SupportedCurrency;
  id: string;
  insured_value: number;
  insured_value_currency: SupportedCurrency;
}

export interface ArtaService {
  amount: number;
  amount_currency: SupportedCurrency;
  included_services: ArtaService[];
  is_requested: boolean;
  is_required: boolean;
  name: string;
  sub_subtype: string;
  subtype: string;
  type: string;
}

export interface Quote {
  id: number;
  included_services: ArtaService[];
  included_insurance_policy?: Nullable<IncludedInsurancePolicy>;
  optional_services: ArtaService[];
  quote_type: QuoteType;
  status: string;
  total: number;
  total_currency: SupportedCurrency;
}

export interface QuoteRequest extends DatedInterface {
  id: ArtaID;
  currency: SupportedCurrency;
  additional_services: AdditionalService[];
  bookable: {
    missing: string[];
    ready: boolean;
  };
  destination: ArtaLocation;
  disqualifications: Disqualification[];
  insurance: Nullable<Insurance>;
  internal_reference: NullableString;
  log_request_id: string;
  hosted_session_id: Nullable<number>;
  object_count: number;
  objects: ArtaObject[];
  origin: ArtaLocation;
  payment_process: PaymentProcessType;
  preferred_quote_types?: Nullable<QuoteType[]>;
  public_reference?: NullableString;
  quote_types: QuoteType[];
  shipping_notes?: NullableString;
  shortcode: string;
  quotes: Quote[];
  status: QuoteRequestStatus;
}

export interface QuoteRequestCreateBody {
  additional_services?: Nullable<AdditionalService[]>;
  currency?: Nullable<SupportedCurrency>;
  destination: ArtaLocation;
  insurance?: Nullable<Insurance>;
  internal_reference?: NullableString;
  objects: ArtaObject[];
  origin: ArtaLocation;
  preferred_quote_types?: Nullable<QuoteType[]>;
  public_reference?: NullableString;
  shipping_notes?: NullableString;
}

export interface QuoteRequestCreate {
  request: QuoteRequestCreateBody;
}

export class QuoteRequestsEndpoint {
  private readonly defaultEndpoint: Endpoint<QuoteRequest, QuoteRequestCreate>;
  private readonly path = '/requests';
  constructor(private readonly artaClient: RestClient) {
    this.defaultEndpoint = new DefaultEndpoint<
      QuoteRequest,
      QuoteRequestCreate
    >(this.path, this.artaClient, this.enrichFields.bind(this));
  }

  private enrichFields(resource: any): QuoteRequest {

    const parseService = (s: any) => {
      s.amount = Number(s.amount);
      if(s.included_services) {
        s.included_services.forEach(parseService);
      }
    };

    resource.quotes && resource.quotes.forEach(
      (q: any) => {
        q.total = Number(q.total);
        q.included_services.forEach(parseService);
        q.optional_services.forEach(parseService);
      }
    );
    return resource;
  }

  public getById(id: ArtaID, auth?: string): Promise<QuoteRequest> {
    return this.defaultEndpoint.getById(id, auth);
  }

  public list(
    page = 1,
    pageSize = 20,
    auth?: string
  ): Promise<Page<QuoteRequest>> {
    return this.defaultEndpoint.list(page, pageSize, auth);
  }

  public create(
    payload: QuoteRequestCreateBody,
    auth?: string
  ): Promise<QuoteRequest> {
    return this.defaultEndpoint.create({ request: payload }, auth);
  }
}
