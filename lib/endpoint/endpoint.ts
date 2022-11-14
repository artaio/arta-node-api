import { ArtaID } from '../ArtaClient';
import { RestClient } from '../net/RestClient';
import { convertDatesToUtc, DatedInterface } from '../utils';
import { Page } from '../pagination';

export interface Endpoint<T, U> {
  list: (page?: number, pageSize?: number, auth?: string) => Promise<Page<T>>;
  listAll: (auth?: string, onReturn?: (params: any) => T) => AsyncGenerator<T>;
  getById: (id: ArtaID, auth?: string) => Promise<T>;
  create: (payload: U, auth?: string) => Promise<T>;
  update: (
    id: ArtaID,
    payload: Partial<U> | Partial<T>,
    auth?: string
  ) => Promise<T>;
  remove: (id: ArtaID, auth?: string) => Promise<void>;
}

export class DefaultEndpoint<T extends DatedInterface, U>
  implements Endpoint<T, U>
{
  private readonly path: string;
  constructor(
    path: string,
    private readonly artaClient: RestClient,
    private readonly onReturn?: (params: any) => T
  ) {
    this.path = path.startsWith('/') ? path : `/${path}`;
  }

  public async getById(id: ArtaID, auth?: string): Promise<T> {
    const req = await this.artaClient.get(`${this.path}/${id}`, auth);
    return this.processBody(req);
  }

  public async list(page = 1, pageSize = 20, auth?: string): Promise<Page<T>> {
    const body = await this.artaClient.get(
      `${this.path}?page=${page}&page_size=${pageSize}`,
      auth
    );
    const items: T[] = body.items.map(this.processBody.bind(this));

    return { items, metadata: body.metadata };
  }

  public async *listAll(auth?: string): AsyncGenerator<T> {
    let page = 1;
    let returned_elements = 0;
    let body;
    do {
      body = await this.artaClient.get(`${this.path}?page=${page}`, auth);
      page = body.metadata.page + 1;
      for (const item of body.items) {
        returned_elements++;
        yield this.processBody(item);
      }
    } while (body.metadata.total_count > returned_elements);
  }

  public async create(payload: U, auth?: string): Promise<T> {
    const body = await this.artaClient.post(this.path, payload, auth);
    return this.processBody(body);
  }

  public async update(
    id: ArtaID,
    payload: Partial<U> | Partial<T>,
    auth?: string
  ): Promise<T> {
    const body = await this.artaClient.patch(
      `${this.path}/${id}`,
      payload,
      auth
    );
    return this.processBody(body);
  }

  public async remove(id: ArtaID, auth?: string): Promise<void> {
    return await this.artaClient.delete(`${this.path}/${id}`, auth);
  }

  private processBody(payload: Partial<U> | Partial<T>): T {
    let resource = convertDatesToUtc(payload);
    resource = this.onReturn ? this.onReturn(resource) : resource;
    return resource as T;
  }
}
