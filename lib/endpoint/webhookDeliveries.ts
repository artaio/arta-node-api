import type { ArtaID } from '../ArtaClient';
import type { RestClient } from '../net/RestClient';
import type { Page } from '../pagination';
import type { WebhookDelivery } from '../types';
import type { Endpoint } from './endpoint';
import { DefaultEndpoint } from './endpoint';

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
