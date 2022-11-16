import { ArtaID } from '../ArtaClient';
import { PaymentContext } from '../MetadataTypes';
import { RestClient } from '../net/RestClient';
import { Page } from '../pagination';
import { DatedInterface } from '../utils';
import { DefaultEndpoint, Endpoint } from './endpoint';

export interface Payment extends DatedInterface {
  id: ArtaID;
  amount: number;
  amount_currency: string;
  context: PaymentContext;
  paid_on: Date;
}

export class PaymentsEndpoint {
  private readonly defaultEndpoint: Endpoint<Payment, never>;
  private readonly path = '/payments';
  constructor(private readonly artaClient: RestClient) {
    this.defaultEndpoint = new DefaultEndpoint<Payment, never>(
      this.path,
      this.artaClient,
      this.enrichFields
    );
  }

  public getById(id: ArtaID, auth?: string): Promise<Payment> {
    return this.defaultEndpoint.getById(id, auth);
  }

  public list(page = 1, pageSize = 20, auth?: string): Promise<Page<Payment>> {
    return this.defaultEndpoint.list(page, pageSize, auth);
  }

  private enrichFields(resource: Payment): Payment {
    resource.amount = Number(resource.amount);
    resource.paid_on = new Date(resource.paid_on);
    return resource;
  }
}