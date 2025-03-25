import type {
  AccessRestriction,
  APIStatus,
  ArtaTrackingServiceSubSubType,
  ArtaTrackingServiceSubType,
  ArtaTrackingServiceType,
  AuthTypes,
  EmailNotificationId,
  Insurance,
  ObjectMaterial,
  ObjectSubType,
  ObjectType,
  PackageStatus,
  PackingSubType,
  PackingType,
  ParcelTransportServices,
  PaymentProcessType,
  QuoteRequestStatus,
  QuoteType,
  Recipient,
  ShipmentExceptionTypeId,
  ShipmentStatus,
  SupportedCurrency,
} from '../MetadataTypes';
import type { RestClient } from '../net/RestClient';

export interface APIVersionMetadata {
  authentication: AuthTypes[];
  description: string;
  id: string;
  status: APIStatus;
}

export interface CurrencyMetadata {
  symbol: string;
  id: SupportedCurrency;
  name: string;
}

export interface EmailNotificationMetadata {
  description: string;
  optional_recipients: Recipient[];
  id: EmailNotificationId;
}

export interface ShipmentExceptionTypeMetadata {
  id: ShipmentExceptionTypeId;
  name: string;
  resolutions: string[];
}

export interface BaseMetadata<T> {
  description: string;
  id: T;
  name: string;
}

type GenericMetadata = Pick<BaseMetadata<string>, 'id' | 'name'>;

export type InsurancesMetadata = BaseMetadata<Insurance>;
export type LocationAccessRestrictionMetadata = BaseMetadata<AccessRestriction>;
export type ObjectMaterialsMetadata = BaseMetadata<ObjectMaterial>;

export interface ObjectMetadata extends BaseMetadata<ObjectType> {
  subtypes: BaseMetadata<ObjectSubType>[];
}

export type PackageStatusesMetadata = BaseMetadata<PackageStatus>;

export interface PackingMetadata extends BaseMetadata<PackingType> {
  subtypes: BaseMetadata<PackingSubType>[];
}

export type ParcelTransportServicesMetadata =
  BaseMetadata<ParcelTransportServices>;
export type PaymentProcessTypeMetadata = BaseMetadata<PaymentProcessType>;
export type QuotesMetadata = BaseMetadata<QuoteType>;
export type RequestStatusesMetadata = BaseMetadata<QuoteRequestStatus>;

export interface ServiceSubSubTypeMetadata
  extends BaseMetadata<ArtaTrackingServiceSubSubType> {
  is_requestable: boolean;
}

export interface ServicesSubTypeMetadata
  extends BaseMetadata<ArtaTrackingServiceSubType> {
  sub_subtypes: ServiceSubSubTypeMetadata[];
}

export interface ServicesMetadata
  extends BaseMetadata<ArtaTrackingServiceType> {
  subtypes: ServicesSubTypeMetadata[];
}

export type ShipmentStatusesMetadata = BaseMetadata<ShipmentStatus>;

export class MetadataEndpoint {
  private readonly path = '/metadata';
  constructor(private readonly artaClient: RestClient) {}

  public apiVersions(auth?: string): Promise<APIVersionMetadata[]> {
    return this.artaClient.get(`${this.path}/api_versions`, auth);
  }

  public currencies(auth?: string): Promise<CurrencyMetadata[]> {
    return this.artaClient.get(`${this.path}/currencies`, auth);
  }

  public emailNotifications(
    auth?: string,
  ): Promise<EmailNotificationMetadata[]> {
    return this.artaClient.get(`${this.path}/email_notifications`, auth);
  }

  public insurances(auth?: string): Promise<InsurancesMetadata[]> {
    return this.artaClient.get(`${this.path}/insurances`, auth);
  }

  public locationAccessRestrictions(
    auth?: string,
  ): Promise<LocationAccessRestrictionMetadata[]> {
    return this.artaClient.get(
      `${this.path}/location_access_restrictions`,
      auth,
    );
  }

  public objectMaterials(auth?: string): Promise<ObjectMaterialsMetadata[]> {
    return this.artaClient.get(`${this.path}/object_materials`, auth);
  }

  public objects(auth?: string): Promise<ObjectMetadata[]> {
    return this.artaClient.get(`${this.path}/objects`, auth);
  }

  public packageStatuses(auth?: string): Promise<PackageStatusesMetadata[]> {
    return this.artaClient.get(`${this.path}/package_statuses`, auth);
  }

  public packings(auth?: string): Promise<PackingMetadata[]> {
    return this.artaClient.get(`${this.path}/packings`, auth);
  }

  public parcelTransportServices(
    auth?: string,
  ): Promise<ParcelTransportServicesMetadata[]> {
    return this.artaClient.get(`${this.path}/parcel_transport_services`, auth);
  }

  public paymentProcessTypes(
    auth?: string,
  ): Promise<PaymentProcessTypeMetadata[]> {
    return this.artaClient.get(`${this.path}/payment_process_types`, auth);
  }

  public quotes(auth?: string): Promise<QuotesMetadata[]> {
    return this.artaClient.get(`${this.path}/quotes`, auth);
  }

  public referenceRateProviders(auth?: string): Promise<GenericMetadata[]> {
    return this.artaClient.get(`${this.path}/reference_rate_providers`, auth);
  }

  public referenceRateServiceLevels(auth?: string): Promise<GenericMetadata[]> {
    return this.artaClient.get(
      `${this.path}/reference_rate_service_levels`,
      auth,
    );
  }

  public requestStatuses(auth?: string): Promise<RequestStatusesMetadata[]> {
    return this.artaClient.get(`${this.path}/request_statuses`, auth);
  }

  public services(auth?: string): Promise<ServicesMetadata[]> {
    return this.artaClient.get(`${this.path}/services`, auth);
  }

  public shipmentExceptionTypes(
    auth?: string,
  ): Promise<ShipmentExceptionTypeMetadata[]> {
    return this.artaClient.get(`${this.path}/shipment_exception_types`, auth);
  }

  public shipmentStatuses(auth?: string): Promise<ShipmentStatusesMetadata[]> {
    return this.artaClient.get(`${this.path}/shipment_statuses`, auth);
  }
}
