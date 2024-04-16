import type { ArtaID } from '../ArtaClient';
import type { RestClient } from '../net/RestClient';
import type { Page } from '../pagination';
import type { Log } from '../types';
import { createDateAsUTC } from '../utils';
import type { Endpoint } from './endpoint';
import { DefaultEndpoint } from './endpoint';

export interface UnparsedLog extends Omit<Log, 'start_at' | 'end_at'> {
  start_at: string;
  end_at: string;
}

export class LogsEndpoint {
  private readonly defaultEndpoint: Endpoint<Log, never>;
  private readonly path = '/logs';
  constructor(private readonly artaClient: RestClient) {
    this.defaultEndpoint = new DefaultEndpoint<Log, never>(
      this.path,
      this.artaClient,
      this.enrichFields,
    );
  }

  public getById(id: ArtaID, auth?: string): Promise<Log> {
    return this.defaultEndpoint.getById(id, auth);
  }

  public list(page = 1, pageSize = 20, auth?: string): Promise<Page<Log>> {
    return this.defaultEndpoint.list({ page, page_size: pageSize }, auth);
  }

  private enrichFields(resource: UnparsedLog): Log {
    return {
      ...resource,
      start_at: createDateAsUTC(resource.start_at),
      end_at: createDateAsUTC(resource.end_at),
    };
  }
}
