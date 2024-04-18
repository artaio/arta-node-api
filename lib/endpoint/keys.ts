import type { RestClient } from '../net/RestClient';
import type { Endpoint } from './endpoint';
import { DefaultEndpoint } from './endpoint';
import type { Page } from '../pagination';
import type { Key } from '../types';

export type KeyCreateBody = Pick<Key, 'is_testing' | 'name'>;

export interface KeyCreate {
  api_key: KeyCreateBody;
}

export class KeysEndpoint {
  private readonly defaultEndpoint: Endpoint<Key, KeyCreate>;
  private readonly path = '/api_keys';
  constructor(private readonly artaClient: RestClient) {
    this.defaultEndpoint = new DefaultEndpoint<Key, KeyCreate>(
      this.path,
      this.artaClient,
    );
  }

  public getById(id: Key['id'], auth?: string): Promise<Key> {
    return this.defaultEndpoint.getById(id, auth);
  }

  public list(page = 1, pageSize = 20, auth?: string): Promise<Page<Key>> {
    return this.defaultEndpoint.list({ page, page_size: pageSize }, auth);
  }

  public listAll(auth?: string): AsyncGenerator<Key> {
    return this.defaultEndpoint.listAll(auth);
  }

  public create(payload: KeyCreateBody, auth?: string): Promise<Key> {
    return this.defaultEndpoint.create({ api_key: payload }, auth);
  }

  public remove(id: Key['id'], auth?: string): Promise<void> {
    return this.defaultEndpoint.remove(id, auth);
  }
}
