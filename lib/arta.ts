import { ArtaClient } from './ArtaClient';
import { NodeHttpClient } from './net/NodeHttpClient';
import { RestClient } from './net/RestClient';
import { OrganizationEndpoint } from './endpoint/organization';
import { WebhookEndpoint } from './endpoint/webhook';
import { initLogger, Logger, LoggerVerbosity } from './logging';

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

  public organization: OrganizationEndpoint;
  public webhook: WebhookEndpoint;

  constructor(apiKey: string, config?: Partial<ArtaConfig>) {
    this.config = Object.assign(defaultConfig, config);

    initLogger(this.config.logger, this.config.verbosity);

    this.artaClient = new ArtaClient(new NodeHttpClient(), {
      apiKey,
      host: this.config.host,
    });

    this.organization = new OrganizationEndpoint(this.artaClient);
    this.webhook = new WebhookEndpoint(this.artaClient);
  }
}
