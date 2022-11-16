import { ArtaClient } from './ArtaClient';
import { initLogger, Logger, LoggerVerbosity } from './logging';
import { NodeHttpClient } from './net/NodeHttpClient';
import { RestClient } from './net/RestClient';
import { AttachmentsEndpoint } from './endpoint/attachment';
import { EmailRulesEndpoint } from './endpoint/emailRules';
import { EmailSubscriptionsEndpoint } from './endpoint/emailSubscriptions';
import { KeysEndpoint } from './endpoint/keys';
import { OrganizationsEndpoint } from './endpoint/organization';
import { PaymentsEndpoint } from './endpoint/payments';
import { UploadsEndpoint } from './endpoint/uploads';
import { WebhookDeliveriesEndpoint } from './endpoint/webhookDeliveries';
import { WebhooksEndpoint } from './endpoint/webhooks';

export interface ArtaConfig {
  host: string;
  verbosity: LoggerVerbosity;
  logger: Logger;
}

const defaultConfig: ArtaConfig = {
  host: 'api.arta.io',
  verbosity: 'ERROR',
  logger: console,
};

export class Arta {
  private readonly artaClient: RestClient;
  private readonly config: ArtaConfig;

  public attachments: AttachmentsEndpoint;
  public email_rules: EmailRulesEndpoint;
  public email_subscriptions: EmailSubscriptionsEndpoint;
  public keys: KeysEndpoint;
  public organizations: OrganizationsEndpoint;
  public payments: PaymentsEndpoint;
  public uploads: UploadsEndpoint;
  public webhook_deliveries: WebhookDeliveriesEndpoint;
  public webhooks: WebhooksEndpoint;

  constructor(apiKey: string, config?: Partial<ArtaConfig>) {
    this.config = Object.assign(defaultConfig, config);

    initLogger(this.config.logger, this.config.verbosity);

    this.artaClient = new ArtaClient(new NodeHttpClient(), {
      apiKey,
      host: this.config.host,
    });

    this.attachments = new AttachmentsEndpoint(this.artaClient);
    this.email_rules = new EmailRulesEndpoint(this.artaClient);
    this.email_subscriptions = new EmailSubscriptionsEndpoint(this.artaClient);
    this.keys = new KeysEndpoint(this.artaClient);
    this.organizations = new OrganizationsEndpoint(this.artaClient);
    this.payments = new PaymentsEndpoint(this.artaClient);
    this.uploads = new UploadsEndpoint(this.artaClient);
    this.webhook_deliveries = new WebhookDeliveriesEndpoint(this.artaClient);
    this.webhooks = new WebhooksEndpoint(this.artaClient);
  }
}
