import type { ArtaID } from '../ArtaClient';
import type { RestClient } from '../net/RestClient';
import type { NullableString } from '../utils';
import type { Endpoint } from './endpoint';
import { DefaultEndpoint } from './endpoint';
import type { Page } from '../pagination';
import type { EmailNotificationId, EmailSubscription } from '../types';

export interface EmailSubscriptionCreateBody {
  email_notification_ids: EmailNotificationId[];
  email_address: string;
  name?: NullableString;
}

export interface EmailSubscriptionCreate {
  email_subscription: EmailSubscriptionCreateBody;
}

export class EmailSubscriptionsEndpoint {
  private readonly defaultEndpoint: Endpoint<
    EmailSubscription,
    EmailSubscriptionCreate
  >;
  private readonly path = '/email_subscriptions';
  constructor(private readonly artaClient: RestClient) {
    this.defaultEndpoint = new DefaultEndpoint<
      EmailSubscription,
      EmailSubscriptionCreate
    >(this.path, this.artaClient);
  }

  public getById(id: ArtaID, auth?: string): Promise<EmailSubscription> {
    return this.defaultEndpoint.getById(id, auth);
  }

  public list(
    page = 1,
    pageSize = 20,
    auth?: string,
  ): Promise<Page<EmailSubscription>> {
    return this.defaultEndpoint.list({ page, page_size: pageSize }, auth);
  }

  public update(
    id: ArtaID,
    payload: { email_notification_ids: EmailNotificationId[] },
    auth?: string,
  ): Promise<EmailSubscription> {
    const emailNotificationPayload = {
      email_subscription: payload,
    } as Partial<EmailSubscriptionCreateBody>;
    return this.defaultEndpoint.update(id, emailNotificationPayload, auth);
  }

  public create(
    payload: EmailSubscriptionCreateBody,
    auth?: string,
  ): Promise<EmailSubscription> {
    return this.defaultEndpoint.create({ email_subscription: payload }, auth);
  }

  public remove(id: ArtaID, auth?: string): Promise<void> {
    return this.defaultEndpoint.remove(id, auth);
  }
}
