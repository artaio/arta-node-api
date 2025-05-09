import type { RestClient } from '../net/RestClient';
import type { Page } from '../pagination';
import type { ImportCostEstimate } from '../types';
import type { Endpoint } from './endpoint';
import { DefaultEndpoint } from './endpoint';

export type ImportCostEstimateCreateBodyFromQuote = Pick<
  ImportCostEstimate,
  'currency' | 'end_use' | 'reference'
> & {
  quote_id: string;
};

export type ImportCostEstimateCreateBodyDirect = Pick<
  ImportCostEstimate,
  | 'currency'
  | 'destination'
  | 'end_use'
  | 'objects'
  | 'origin'
  | 'reference'
  | 'transport'
>;

export type ImportCostEstimateCreateBody =
  | ImportCostEstimateCreateBodyFromQuote
  | ImportCostEstimateCreateBodyDirect;

type ImportCostEstimateCreate = {
  import_cost_estimate: ImportCostEstimateCreateBody;
};

export class ImportCostEstimatesEndpoint {
  private readonly defaultEndpoint: Endpoint<
    ImportCostEstimate,
    ImportCostEstimateCreate
  >;
  private readonly path = '/import_cost_estimates';
  constructor(private readonly artaClient: RestClient) {
    this.defaultEndpoint = new DefaultEndpoint<
      ImportCostEstimate,
      ImportCostEstimateCreate
    >(this.path, this.artaClient);
  }

  public getById(
    id: ImportCostEstimate['id'],
    auth?: string,
  ): Promise<ImportCostEstimate> {
    return this.defaultEndpoint.getById(id, auth);
  }

  public list(
    page = 1,
    pageSize = 20,
    auth?: string,
  ): Promise<Page<ImportCostEstimate>> {
    return this.defaultEndpoint.list({ page, page_size: pageSize }, auth);
  }

  public create(
    payload: ImportCostEstimateCreateBody,
    auth?: string,
  ): Promise<ImportCostEstimate> {
    return this.defaultEndpoint.create({ import_cost_estimate: payload }, auth);
  }
}
