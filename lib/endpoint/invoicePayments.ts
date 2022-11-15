import { ArtaID } from '../ArtaClient';
import { RestClient } from '../net/RestClient';
import { Page } from '../pagination';
import { DatedInterface, NullableString } from '../utils';
import { DefaultEndpoint, Endpoint } from './endpoint';


export interface InvoicePayments extends DatedInterface {
  id: ArtaID;
  amount: number;
  amount_currency: string;
  invoice_id: NullableString;
  paid_on: Date;
  payment_id?: NullableString;
  shipment_id?: NullableString;
}

export class InvoicePaymentsEndpoint {
  private readonly defaultEndpoint: Endpoint<InvoicePayments, never>;
  private readonly path = '/invoice_payments';

  constructor(private readonly artaClient: RestClient) {
    this.defaultEndpoint = new DefaultEndpoint<InvoicePayments, never>(
      this.path,
      this.artaClient
    );
  }

  public getById(id: ArtaID, auth?: string): Promise<InvoicePayments> {
    return this.defaultEndpoint.getById(id, auth);
  }

  public list(page = 1, pageSize = 20, auth?: string): Promise<Page<InvoicePayments>> {
    return this.defaultEndpoint.list(page, pageSize, auth);
  }

}