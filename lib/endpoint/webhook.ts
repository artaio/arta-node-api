import { convertDatesToUtc, Dated, listAsync } from '../utils';
import { Page } from '../pagination';
import {
  WebhooksApi,
  WebhooksCreateRequestWebhook,
  WebhooksPatchRequestWebhook,
} from '../generated';
import { Webhook as GeneratedWebhook } from '../generated';
import { Endpoint } from './endpoints';

export interface Webhook extends Dated<GeneratedWebhook> {
  ping: (auth?: string) => Promise<void>;
  getSecret: (auth?: string) => Promise<string | undefined>;
  resetSecret: (auth?: string) => Promise<string | undefined>;
}

export class WebhookEndpoint extends Endpoint {
  private readonly webhooksApi: WebhooksApi;
  constructor(apiKey: string) {
    super(apiKey);
    this.webhooksApi = new WebhooksApi();
  }

  private withFunctionCalls(webhook: Dated<GeneratedWebhook>): Webhook {
    const newWebhook = webhook as Webhook;
    newWebhook.ping = (auth?: string) => this.ping(newWebhook.id, auth);
    newWebhook.getSecret = (auth?: string) =>
      this.getSecret(newWebhook.id, auth);
    newWebhook.resetSecret = (auth?: string) =>
      this.resetSecret(newWebhook.id, auth);
    return newWebhook;
  }

  private withDateAndCalls(webhook: GeneratedWebhook): Webhook {
    return this.withFunctionCalls(convertDatesToUtc<GeneratedWebhook>(webhook));
  }

  public async getById(id: number, auth?: string): Promise<Webhook> {
    const request = await this.webhooksApi.webhooksGet(
      this.getAuthHeader(auth),
      id
    );
    return this.withDateAndCalls(request.data);
  }

  public async list(
    page = 1,
    pageSize = 20,
    auth?: string
  ): Promise<Page<Webhook>> {
    const listPage = await this.webhooksApi.webhooksList(
      this.getAuthHeader(auth),
      pageSize,
      page
    );

    const items = listPage.data.items.map((hook) =>
      this.withDateAndCalls(hook)
    );

    return { items, metadata: listPage.data.metadata };
  }

  public listAll(auth?: string): AsyncGenerator<Webhook> {
    return listAsync<Webhook>(this.list.bind(this), auth);
  }

  public async create(
    payload: WebhooksCreateRequestWebhook,
    auth?: string
  ): Promise<Webhook> {
    const createdHook = await this.webhooksApi.webhooksCreate(
      this.getAuthHeader(auth),
      { webhook: payload }
    );

    return this.withDateAndCalls(createdHook.data);
  }

  public async update(
    id: number,
    payload: WebhooksPatchRequestWebhook,
    auth?: string
  ): Promise<Webhook> {
    const updatedHook = await this.webhooksApi.webhooksPatch(
      this.getAuthHeader(auth),
      id,
      { webhook: payload }
    );

    return this.withDateAndCalls(updatedHook.data);
  }

  public async remove(id: number, auth?: string): Promise<void> {
    await this.webhooksApi.webhooksDelete(this.getAuthHeader(auth), id);
  }

  public async ping(id: number, auth?: string): Promise<void> {
    await this.webhooksApi.webhooksPing(this.getAuthHeader(auth), id);
    return;
  }

  public async getSecret(id: number, auth?: string): Promise<string> {
    const secret = await this.webhooksApi.webhooksSecretTokenGet(
      this.getAuthHeader(auth),
      id
    );
    return secret.data.secret_token as string;
  }

  public async resetSecret(id: number, auth?: string): Promise<string> {
    const secret = await this.webhooksApi.webhooksSecretTokenResetPatch(
      this.getAuthHeader(auth),
      id
    );
    return secret.data.secret_token as string;
  }
}
