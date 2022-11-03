import { OrganizationEndpoint } from './endpoint/organization';
import { WebhookEndpoint } from './endpoint/webhook';

export class Arta {
  public organization: OrganizationEndpoint;
  public webhooks: WebhookEndpoint;

  constructor(apiKey: string) {
    this.organization = new OrganizationEndpoint(apiKey);
    this.webhooks = new WebhookEndpoint(apiKey);
  }
}
