import { ArtaID } from '../ArtaClient';
import { RestClient } from '../net/RestClient';
import { Page } from '../pagination';
import { DatedInterface } from '../utils';
import { DefaultEndpoint, Endpoint } from './endpoint';

export interface WebhookDeliveries extends DatedInterface {
  id: ArtaID;
  resource_id: number;
  resource_type: string;
  response_status_code: number;
  status: string;
  type: string;
  webhook_id: number;
  webhook_url: string;
}

export class WebhookDeliveriesEndpoint {
  private readonly defaultEndpoint: Endpoint<WebhookDeliveries, never>;
  private readonly path = '/webhook_deliveries';
  constructor(private readonly artaClient: RestClient) {
    this.defaultEndpoint = new DefaultEndpoint<WebhookDeliveries, never>(
      this.path,
      this.artaClient
    );
  }

  public getById(id: ArtaID, auth?: string): Promise<WebhookDeliveries> {
    return this.defaultEndpoint.getById(id, auth);
  }

  public list(
    page = 1,
    pageSize = 20,
    auth?: string
  ): Promise<Page<WebhookDeliveries>> {
    return this.defaultEndpoint.list(page, pageSize, auth);
  }

  public listAll(auth?: string): AsyncGenerator<WebhookDeliveries> {
    return this.defaultEndpoint.listAll(auth);
  }
}
