import { ArtaClient } from './ArtaClient';
import { NodeHttpClient } from './net/NodeHttpClient';
import { RestClient } from './net/RestClient';
import { OrganizationEndpoint } from './endpoint/organization';
import { WebhookEndpoint } from './endpoint/webhook';

export class Arta {
  private readonly artaClient: RestClient;

  public organization: OrganizationEndpoint;
  public webhook: WebhookEndpoint;

  constructor(apiKey: string, host = 'api.arta.io') {
    this.artaClient = new ArtaClient(new NodeHttpClient(), { apiKey, host });

    this.organization = new OrganizationEndpoint(this.artaClient);
    this.webhook = new WebhookEndpoint(this.artaClient);
  }
}
