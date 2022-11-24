import { ArtaID } from '../ArtaClient';
import { RestClient } from '../net/RestClient';
import { Page } from '../pagination';
import { DatedInterface, NullableString, createDateAsUTC } from '../utils';
import { DefaultEndpoint, Endpoint } from './endpoint';

export interface Log extends DatedInterface {
  api_key_id: number;
  arta_version: string;
  end_at: Date;
  id: ArtaID;
  created_at: Date;
  method: string;
  path: string;
  query_params: string;
  request_body?: NullableString;
  request_id: string;
  response_body?: NullableString;
  start_at: Date;
  status: number;
  updated_at: Date;
}

export class LogsEndpoint {
  private readonly defaultEndpoint: Endpoint<Log, never>;
  private readonly path = '/logs';
  constructor(private readonly artaClient: RestClient) {
    this.defaultEndpoint = new DefaultEndpoint<Log, never>(
      this.path,
      this.artaClient,
      this.enrichFields
    );
  }

  public getById(id: ArtaID, auth?: string): Promise<Log> {
    return this.defaultEndpoint.getById(id, auth);
  }

  public list(page = 1, pageSize = 20, auth?: string): Promise<Page<Log>> {
    return this.defaultEndpoint.list({ page, page_size: pageSize }, auth);
  }

  private enrichFields(resource: any): Log {
    resource.start_at = createDateAsUTC(resource.start_at);
    resource.end_at = createDateAsUTC(resource.end_at);
    return resource;
  }
}
