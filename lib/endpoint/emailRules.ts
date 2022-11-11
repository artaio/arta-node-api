import { ArtaID } from '../ArtaClient';
import { RestClient } from '../net/RestClient';
import { DatedInterface } from '../utils';
import { DefaultEndpoint, Endpoint } from './endpoint';
import { Page } from '../pagination';

export type EmailNotificationId =
  | 'booking'
  | 'cancelled'
  | 'collected'
  | 'collection'
  | 'complete'
  | 'custom_quoted_dashboard'
  | 'in_transit'
  | 'invoice'
  | 'self_ship_label'
  | 'payment'
  | 'scheduling'
  | 'eei';

export type Recipients = 'payer' | 'origin' | 'destination';

export interface EmailRule extends DatedInterface {
  id: ArtaID;
  email_notification_id: EmailNotificationId;
  recipients: Recipients[];
}

export interface EmailRuleCreateBody {
  email_notification_id: EmailNotificationId;
  recipients: Recipients[];
}

export interface EmailRuleCreate {
  email_rule: EmailRuleCreateBody;
}

export class EmailRulesEndpoint {
  private readonly defaultEndpoint: Endpoint<EmailRule, EmailRuleCreate>;
  private readonly path = '/email_rules';
  constructor(private readonly artaClient: RestClient) {
    this.defaultEndpoint = new DefaultEndpoint<EmailRule, EmailRuleCreate>(
      this.path,
      this.artaClient
    );
  }

  public getById(id: ArtaID, auth?: string): Promise<EmailRule> {
    return this.defaultEndpoint.getById(id, auth);
  }

  public list(
    page = 1,
    pageSize = 20,
    auth?: string
  ): Promise<Page<EmailRule>> {
    return this.defaultEndpoint.list(page, pageSize, auth);
  }

  public update(
    id: ArtaID,
    payload: { recipients: Recipients[] },
    auth?: string
  ): Promise<EmailRule> {
    const emailRulesPayload = {
      email_rule: payload,
    } as Partial<EmailRuleCreateBody>;
    return this.defaultEndpoint.update(id, emailRulesPayload, auth);
  }

  public create(
    payload: EmailRuleCreateBody,
    auth?: string
  ): Promise<EmailRule> {
    return this.defaultEndpoint.create({ email_rule: payload }, auth);
  }

  public remove(id: ArtaID, auth?: string): Promise<void> {
    return this.defaultEndpoint.remove(id, auth);
  }
}
