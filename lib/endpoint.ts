import { ArtaID } from './ArtaClient';
import { RestClient } from './net/RestClient';

export interface Endpoint<T, U> {
  list: (page?: number, pageSize?: number) => Promise<T[]>;
  getById: (id: ArtaID) => Promise<T>;
  create: (payload: U) => Promise<T>;
  update: (id: ArtaID, payload: Partial<U> | Partial<T>) => Promise<T>;
  remove: (id: ArtaID) => Promise<void>;
}

export class DefaultEndpoint<T, U> implements Endpoint<T, U> {
  private readonly path: string;
  constructor(path: string, private readonly artaClient: RestClient) {
    this.path = path.startsWith('/') ? path : `/${path}`;
  }

  public async getById(id: ArtaID): Promise<T> {
    const req = await this.artaClient.get(`${this.path}/${id}`);
    return req as T;
  }

  public async list(page = 1, pageSize = 20): Promise<T[]> {
    const body = await this.artaClient.get(
      `${this.path}?page=${page}&page_size=${pageSize}`
    );
    return body.items as T[];
  }

  public async create(payload: U): Promise<T> {
    const body = await this.artaClient.post(this.path, payload);
    return body as T;
  }

  public async update(
    id: ArtaID,
    payload: Partial<U> | Partial<T>
  ): Promise<T> {
    const body = await this.artaClient.patch(`${this.path}/${id}`, payload);
    return body as T;
  }

  public async remove(id: ArtaID): Promise<void> {
    return await this.artaClient.delete(`${this.path}/${id}`);
  }
}
