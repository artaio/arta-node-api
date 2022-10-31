import { ArtaID } from '../ArtaClient';
import { RestClient } from '../net/RestClient';
import { convertDatesToUtc, DatedInterface } from '../utils';

export interface Endpoint<T, U> {
  list: (page?: number, pageSize?: number, auth?: string) => Promise<T[]>;
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
  constructor(path: string, private readonly artaClient: RestClient) {
    this.path = path.startsWith('/') ? path : `/${path}`;
  }

  public async getById(id: ArtaID, auth?: string): Promise<T> {
    const req = await this.artaClient.get(`${this.path}/${id}`, auth);
    return convertDatesToUtc(req) as T;
  }

  public async list(page = 1, pageSize = 20, auth?: string): Promise<T[]> {
    const body = await this.artaClient.get(
      `${this.path}?page=${page}&page_size=${pageSize}`,
      auth
    );
    return body.items.map((item: T) => convertDatesToUtc(item));
  }

  public async create(payload: U, auth?: string): Promise<T> {
    const body = await this.artaClient.post(this.path, payload, auth);
    return convertDatesToUtc(body) as T;
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
    return convertDatesToUtc(body) as T;
  }

  public async remove(id: ArtaID, auth?: string): Promise<void> {
    return await this.artaClient.delete(`${this.path}/${id}`, auth);
  }
}
