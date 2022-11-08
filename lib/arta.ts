import { ArtaClient } from './ArtaClient';
import { NodeHttpClient } from './net/NodeHttpClient';
import { RestClient } from './net/RestClient';
import { OrganizationsEndpoint } from './endpoint/organization';
import { WebhooksEndpoint } from './endpoint/webhook';
import { initLogger, Logger, LoggerVerbosity } from './logging';
import { KeysEndpoint } from './endpoint/keys';

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

  public organizations: OrganizationsEndpoint;
  public webhooks: WebhooksEndpoint;
  public keys: KeysEndpoint;

  constructor(apiKey: string, config?: Partial<ArtaConfig>) {
    this.config = Object.assign(defaultConfig, config);

    initLogger(this.config.logger, this.config.verbosity);

    this.artaClient = new ArtaClient(new NodeHttpClient(), {
      apiKey,
      host: this.config.host,
    });

    this.organizations = new OrganizationsEndpoint(this.artaClient);
    this.webhooks = new WebhooksEndpoint(this.artaClient);
    this.keys = new KeysEndpoint(this.artaClient);
  }
}
