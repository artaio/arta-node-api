import { ArtaID } from '../ArtaClient';
import { RestClient } from '../net/RestClient';
import { Page } from '../pagination';
import { DatedInterface, NullableString } from '../utils';
import { DefaultEndpoint, Endpoint } from './endpoint';

export interface InvoicePayment extends DatedInterface {
  id: ArtaID;
  amount: number;
  amount_currency: string;
  credit_id: NullableString;
  invoice_id: NullableString;
  paid_on: Date;
  payment_id?: NullableString;
  shipment_id?: NullableString;
}

export class InvoicePaymentsEndpoint {
  private readonly defaultEndpoint: Endpoint<InvoicePayment, never>;
  private readonly path = '/invoice_payments';

  constructor(private readonly artaClient: RestClient) {
    this.defaultEndpoint = new DefaultEndpoint<InvoicePayment, never>(
      this.path,
      this.artaClient,
      this.enrichFields
    );
  }

  public getById(id: ArtaID, auth?: string): Promise<InvoicePayment> {
    return this.defaultEndpoint.getById(id, auth);
  }

  public list(
    page = 1,
    pageSize = 20,
    auth?: string
  ): Promise<Page<InvoicePayment>> {
    return this.defaultEndpoint.list(page, pageSize, auth);
  }
  private enrichFields(resource: InvoicePayment): InvoicePayment {
    resource.amount = Number(resource.amount);
    resource.paid_on = new Date(resource.paid_on);
    return resource;
  }
}
