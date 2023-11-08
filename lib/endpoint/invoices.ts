import { ArtaID } from '../ArtaClient';
import { SupportedCurrency } from '../MetadataTypes';
import { RestClient } from '../net/RestClient';
import { Page } from '../pagination';
import { DatedInterface, Nullable, NullableString } from '../utils';
import { DefaultEndpoint, Endpoint } from './endpoint';

export interface Invoice extends DatedInterface {
  amount_owed: number;
  amount_owed_currency: SupportedCurrency;
  amount_paid: number;
  amount_paid_currency: SupportedCurrency;
  created_at: Date;
  invoice_url?: NullableString;
  id: ArtaID;
  issued_on: Nullable<Date>;
  shipment_id: NullableString;
  status: string;
  updated_at: Date;
}

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
