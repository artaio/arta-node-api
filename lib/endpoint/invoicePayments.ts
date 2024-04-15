import type { ArtaID } from '../ArtaClient';
import type { SupportedCurrency } from '../MetadataTypes';
import type { RestClient } from '../net/RestClient';
import type { Page } from '../pagination';
import type { DatedInterface, NullableString} from '../utils';
import { createDateAsUTC } from '../utils';
import type { Endpoint } from './endpoint';
import { DefaultEndpoint } from './endpoint';

export interface InvoicePayment extends DatedInterface {
  id: ArtaID;
  amount: number;
  amount_currency: SupportedCurrency;
  credit_id: NullableString;
  invoice_id: NullableString;
  paid_on: Date;
  payment_id?: NullableString;
  shipment_id?: NullableString;
}

export interface UnparsedInvoicePayment
  extends Omit<InvoicePayment, 'paid_on' | 'amount'> {
  paid_on: string;
  amount: string;
}

export class InvoicePaymentsEndpoint {
  private readonly defaultEndpoint: Endpoint<InvoicePayment, never>;
  private readonly path = '/invoice_payments';

  constructor(private readonly artaClient: RestClient) {
    this.defaultEndpoint = new DefaultEndpoint<InvoicePayment, never>(
      this.path,
      this.artaClient,
      this.enrichFields,
    );
  }

  public getById(id: ArtaID, auth?: string): Promise<InvoicePayment> {
    return this.defaultEndpoint.getById(id, auth);
  }

  public list(
    page = 1,
    pageSize = 20,
    auth?: string,
  ): Promise<Page<InvoicePayment>> {
    return this.defaultEndpoint.list({ page, page_size: pageSize }, auth);
  }

  private enrichFields(resource: UnparsedInvoicePayment): InvoicePayment {
    return {
      ...resource,
      amount: Number(resource.amount),
      paid_on: createDateAsUTC(resource.paid_on),
    };
  }
}
