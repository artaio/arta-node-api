import { ArtaID } from '../ArtaClient';
import { RestClient } from '../net/RestClient';
import { DatedInterface } from '../utils';
import { DefaultEndpoint, Endpoint } from './endpoint';
import { Page } from '../pagination';

export interface Webhook extends DatedInterface {
  id: ArtaID;
  name: string;
  url: string;
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

export class WebhookEndpoint {
  private readonly defaultEndpoint: Endpoint<Webhook, WebhookCreate>;
  private readonly path = '/webhooks';
  constructor(private readonly artaClient: RestClient) {
    this.defaultEndpoint = new DefaultEndpoint<Webhook, WebhookCreate>(
      this.path,
      this.artaClient
    );
  }

  private withFunctionCalls(webhook: Webhook): Webhook {
    webhook.ping = (auth?: string) => this.ping(webhook.id, auth);
    webhook.getSecret = (auth?: string) => this.getSecret(webhook.id, auth);
    webhook.resetSecret = (auth?: string) => this.resetSecret(webhook.id, auth);
    return webhook;
  }

  public async getById(id: ArtaID, auth?: string): Promise<Webhook> {
    const baseHook = await this.defaultEndpoint.getById(id, auth);
    return this.withFunctionCalls(baseHook);
  }

  public async list(
    page = 1,
    pageSize = 20,
    auth?: string
  ): Promise<Page<Webhook>> {
    const { items, metadata } = await this.defaultEndpoint.list(
      page,
      pageSize,
      auth
    );
    return { items: items.map(this.withFunctionCalls), metadata };
  }

  public listAll(auth?: string): AsyncGenerator<Webhook> {
    return this.defaultEndpoint.listAll(
      auth,
      this.withFunctionCalls.bind(this)
    );
  }

  public async create(
    payload: WebhookCreateBody,
    auth?: string
  ): Promise<Webhook> {
    const baseHook = await this.defaultEndpoint.create(
      { webhook: payload },
      auth
    );
    return this.withFunctionCalls(baseHook);
  }

  public async update(
    id: ArtaID,
    payload: Partial<WebhookCreateBody> | Partial<Webhook>,
    auth?: string
  ): Promise<Webhook> {
    const webhookUpdate = { webhook: payload } as Partial<WebhookCreate>;
    const baseHook = await this.defaultEndpoint.update(id, webhookUpdate, auth);
    return this.withFunctionCalls(baseHook);
  }

  public remove(id: ArtaID, auth?: string): Promise<void> {
    return this.defaultEndpoint.remove(id, auth);
  }

  public async ping(id: ArtaID, auth?: string): Promise<void> {
    await this.artaClient.get(`${this.path}/${id}/ping`, auth);
    return;
  }

  public async getSecret(id: ArtaID, auth?: string): Promise<string> {
    const secret = await this.artaClient.get(
      `${this.path}/${id}/secret_token`,
      auth
    );
    return secret.secret_token;
  }

  public async resetSecret(id: ArtaID, auth?: string): Promise<string> {
    const newSecret = await this.artaClient.patch(
      `${this.path}/${id}/secret_token/reset`,
      auth
    );
    return newSecret.secret_token;
  }
}
