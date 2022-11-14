import { ArtaID } from '../ArtaClient';
import { RestClient } from '../net/RestClient';
import { Page } from '../pagination';
import { DatedInterface } from '../utils';
import { DefaultEndpoint, Endpoint } from './endpoint';

export type PaymentContext =
  | 'hosted_checkout'
  | 'invoiced';

export interface Payments extends DatedInterface {
  id: ArtaID;
  amount: string;
  amount_currency: string;
  context: PaymentContext;
  paid_on: string,
}

export class PaymentsEndpoint {
  private readonly defaultEndpoint: Endpoint<Payments, never>;
  private readonly path = '/payments';
  constructor(private readonly artaClient: RestClient) {
    this.defaultEndpoint = new DefaultEndpoint<Payments, never>(
      this.path,
      this.artaClient
    );
  }

  public getById(id: ArtaID, auth?: string): Promise<Payments> {
    return this.defaultEndpoint.getById(id, auth);
  }

  public list(
    page = 1,
    pageSize = 20,
    auth?: string
  ): Promise<Page<Payments>> {
    return this.defaultEndpoint.list(page, pageSize, auth);
  }
}
