import type { RestClient } from '../net/RestClient';
import type { Endpoint } from './endpoint';
import { DefaultEndpoint } from './endpoint';
import type { Page } from '../pagination';
import type { Tag } from '../types';

export type TagCreateBody = Omit<Tag, 'id' | 'created_at' | 'updated_at'>;

export interface TagCreate {
  tag: TagCreateBody;
}

export class TagsEndpoint {
  private readonly defaultEndpoint: Endpoint<Tag, TagCreate>;
  private readonly path = '/tags';
  constructor(private readonly artaClient: RestClient) {
    this.defaultEndpoint = new DefaultEndpoint<Tag, TagCreate>(
      this.path,
      this.artaClient,
    );
  }

  public getByName(name: Tag['name'], auth?: string): Promise<Tag> {
    return this.defaultEndpoint.getById(name, auth);
  }

  public list(page = 1, pageSize = 20, auth?: string): Promise<Page<Tag>> {
    return this.defaultEndpoint.list({ page, page_size: pageSize }, auth);
  }

  public create(payload: TagCreateBody, auth?: string): Promise<Tag> {
    return this.defaultEndpoint.create({ tag: payload }, auth);
  }

  public update(
    name: Tag['name'],
    payload: Partial<TagCreateBody>,
    auth?: string,
  ): Promise<Tag> {
    return this.defaultEndpoint.update(
      name,
      { tag: payload } as Partial<TagCreate>,
      auth,
    );
  }
}
