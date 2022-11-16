import { ArtaID } from '../ArtaClient';
import { RestClient } from '../net/RestClient';
import { DatedInterface, NullableString } from '../utils';
import { DefaultEndpoint, Endpoint } from './endpoint';
import { Page } from '../pagination';

export interface Key extends DatedInterface {
  id: ArtaID;
  is_testing: boolean;
  name?: NullableString;
  token: string;
}

export interface KeyCreateBody {
  is_testing: boolean;
  name?: NullableString;
}

export interface KeyCreate {
  api_key: KeyCreateBody;
}

export class KeysEndpoint {
  private readonly defaultEndpoint: Endpoint<Key, KeyCreate>;
  private readonly path = '/api_keys';
  constructor(private readonly artaClient: RestClient) {
    this.defaultEndpoint = new DefaultEndpoint<Key, KeyCreate>(
      this.path,
      this.artaClient
    );
  }

  public getById(id: ArtaID, auth?: string): Promise<Key> {
    return this.defaultEndpoint.getById(id, auth);
  }

  public list(page = 1, pageSize = 20, auth?: string): Promise<Page<Key>> {
    return this.defaultEndpoint.list(page, pageSize, auth);
  }

  public listAll(auth?: string): AsyncGenerator<Key> {
    return this.defaultEndpoint.listAll(auth);
  }

  public create(payload: KeyCreateBody, auth?: string): Promise<Key> {
    return this.defaultEndpoint.create({ api_key: payload }, auth);
  }

  public remove(id: ArtaID, auth?: string): Promise<void> {
    return this.defaultEndpoint.remove(id, auth);
  }
}
