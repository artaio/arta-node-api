import type { ArtaID } from '../ArtaClient';
import type { RestClient } from '../net/RestClient';
import type { Endpoint } from './endpoint';
import { DefaultEndpoint } from './endpoint';
import type { Page } from '../pagination';
import type { Webhook } from '../types';

export interface ExtendedWebhook extends Webhook {
  ping: (auth?: string) => Promise<void>;
  getSecret: (auth?: string) => Promise<string>;
  resetSecret: (auth?: string) => Promise<string>;
}

export interface WebhookCreateBody {
  name: string;
  url: string;
}
export interface WebhookCreate {
  webhook: WebhookCreateBody;
}

export class WebhooksEndpoint {
  private readonly defaultEndpoint: Endpoint<ExtendedWebhook, WebhookCreate>;
  private readonly path = '/webhooks';
  constructor(private readonly artaClient: RestClient) {
    this.defaultEndpoint = new DefaultEndpoint<ExtendedWebhook, WebhookCreate>(
      this.path,
      this.artaClient,
      this.withFunctionCalls.bind(this),
    );
  }

  private withFunctionCalls(webhook: ExtendedWebhook): ExtendedWebhook {
    webhook.ping = (auth?: string) => this.ping(webhook.id, auth);
    webhook.getSecret = (auth?: string) => this.getSecret(webhook.id, auth);
    webhook.resetSecret = (auth?: string) => this.resetSecret(webhook.id, auth);
    return webhook;
  }

  public async getById(id: ArtaID, auth?: string): Promise<ExtendedWebhook> {
    return this.defaultEndpoint.getById(id, auth);
  }

  public list(
    page = 1,
    pageSize = 20,
    auth?: string,
  ): Promise<Page<ExtendedWebhook>> {
    return this.defaultEndpoint.list({ page, page_size: pageSize }, auth);
  }

  public listAll(auth?: string): AsyncGenerator<ExtendedWebhook> {
    return this.defaultEndpoint.listAll(auth);
  }

  public create(
    payload: WebhookCreateBody,
    auth?: string,
  ): Promise<ExtendedWebhook> {
    return this.defaultEndpoint.create({ webhook: payload }, auth);
  }

  public async update(
    id: ArtaID,
    payload: Partial<WebhookCreateBody> | Partial<ExtendedWebhook>,
    auth?: string,
  ): Promise<ExtendedWebhook> {
    const webhookUpdate = { webhook: payload } as Partial<WebhookCreate>;
    return this.defaultEndpoint.update(id, webhookUpdate, auth);
  }

  public remove(id: ArtaID, auth?: string): Promise<void> {
    return this.defaultEndpoint.remove(id, auth);
  }

  public async ping(id: ArtaID, auth?: string): Promise<void> {
    await this.artaClient.post(`${this.path}/${id}/ping`, auth);
    return;
  }

  public async getSecret(id: ArtaID, auth?: string): Promise<string> {
    const secret = await this.artaClient.get<{ secret_token: string }>(
      `${this.path}/${id}/secret_token`,
      auth,
    );
    return secret.secret_token;
  }

  public async resetSecret(id: ArtaID, auth?: string): Promise<string> {
    const newSecret = await this.artaClient.patch<
      string | undefined,
      { secret_token: string }
    >(`${this.path}/${id}/secret_token/reset`, auth);
    return newSecret.secret_token;
  }
}
