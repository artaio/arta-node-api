import type { ArtaID } from '../ArtaClient';
import type { RestClient } from '../net/RestClient';
import type { Page } from '../pagination';
import type { Payment } from '../types';
import { createDateAsUTC } from '../utils';
import type { Endpoint } from './endpoint';
import { DefaultEndpoint } from './endpoint';

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
