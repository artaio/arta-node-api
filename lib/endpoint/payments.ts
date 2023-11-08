import { ArtaID } from '../ArtaClient';
import { PaymentContext, SupportedCurrency } from '../MetadataTypes';
import { RestClient } from '../net/RestClient';
import { Page } from '../pagination';
import { DatedInterface, createDateAsUTC } from '../utils';
import { DefaultEndpoint, Endpoint } from './endpoint';

export interface Payment extends DatedInterface {
  id: ArtaID;
  amount: number;
  amount_currency: SupportedCurrency;
  context: PaymentContext;
  paid_on: Date;
}

export interface UnparsedPayment extends Omit<Payment, 'paid_on' | 'amount'> {
  paid_on: string;
  amount: string;
}

export class PaymentsEndpoint {
  private readonly defaultEndpoint: Endpoint<Payment, never>;
  private readonly path = '/payments';
  constructor(private readonly artaClient: RestClient) {
    this.defaultEndpoint = new DefaultEndpoint<Payment, never>(
      this.path,
      this.artaClient,
      this.enrichFields,
    );
  }

  public getById(id: ArtaID, auth?: string): Promise<Payment> {
    return this.defaultEndpoint.getById(id, auth);
  }

  public list(page = 1, pageSize = 20, auth?: string): Promise<Page<Payment>> {
    return this.defaultEndpoint.list({ page, page_size: pageSize }, auth);
  }

  private enrichFields(resource: UnparsedPayment): Payment {
    return {
      ...resource,
      amount: Number(resource.amount),
      paid_on: createDateAsUTC(resource.paid_on),
    };
  }
}
