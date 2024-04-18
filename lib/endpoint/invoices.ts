import type { ArtaID } from '../ArtaClient';
import type { RestClient } from '../net/RestClient';
import type { Page } from '../pagination';
import type { Invoice } from '../types';
import type { Endpoint } from './endpoint';
import { DefaultEndpoint } from './endpoint';
export class InvoicesEndpoint {
  private readonly defaultEndpoint: Endpoint<Invoice, never>;
  private readonly path = '/invoices';
  constructor(private readonly artaClient: RestClient) {
    this.defaultEndpoint = new DefaultEndpoint<Invoice, never>(
      this.path,
      this.artaClient,
      this.enrichFields,
    );
  }

  public getById(id: ArtaID, auth?: string): Promise<Invoice> {
    return this.defaultEndpoint.getById(id, auth);
  }

  public list(page = 1, pageSize = 20, auth?: string): Promise<Page<Invoice>> {
    return this.defaultEndpoint.list({ page, page_size: pageSize }, auth);
  }

  private enrichFields(resource: Invoice): Invoice {
    resource.amount_owed = Number(resource.amount_owed);
    resource.amount_paid = Number(resource.amount_paid);
    resource.issued_on = resource.issued_on && new Date(resource.issued_on);
    return resource;
  }
}
