import type { ArtaID } from '../ArtaClient';
import type {
  WebhookDeliveryStatus,
  WebhookDeliveryType,
  WebhookResourceType,
} from '../MetadataTypes';
import type { RestClient } from '../net/RestClient';
import type { Page } from '../pagination';
import type { DatedInterface, NullableString } from '../utils';
import type { Endpoint } from './endpoint';
import { DefaultEndpoint } from './endpoint';

export interface WebhookDelivery extends DatedInterface {
  id: ArtaID;
  resource_id: number;
  resource_type: WebhookResourceType;
  response_status_code: number;
  status: WebhookDeliveryStatus;
  type: WebhookDeliveryType;
  webhook_id: number;
  webhook_url: string;
  next_retry?: NullableString;
  request_body?: NullableString;
  response_body?: NullableString;
}

export class WebhookDeliveriesEndpoint {
  private readonly defaultEndpoint: Endpoint<WebhookDelivery, never>;
  private readonly path = '/webhook_deliveries';
  constructor(private readonly artaClient: RestClient) {
    this.defaultEndpoint = new DefaultEndpoint<WebhookDelivery, never>(
      this.path,
      this.artaClient,
    );
  }

  public getById(id: ArtaID, auth?: string): Promise<WebhookDelivery> {
    return this.defaultEndpoint.getById(id, auth);
  }

  public list(
    page = 1,
    pageSize = 20,
    auth?: string,
  ): Promise<Page<WebhookDelivery>> {
    return this.defaultEndpoint.list({ page, page_size: pageSize }, auth);
  }
}
