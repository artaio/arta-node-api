import type { ArtaID } from '../ArtaClient';
import type { RestClient } from '../net/RestClient';
import type { Endpoint } from './endpoint';
import { DefaultEndpoint } from './endpoint';
import type { Page } from '../pagination';
import type { ShipmentException } from '../types';

export interface ShipmentExceptionCreateBody {
  type: 'requested_hold_to_collect';
  shipment_id: string;
  hold_until?: string;
}

export interface ShipmentExceptionCreate {
  shipment_exception: ShipmentExceptionCreateBody;
}

export type ShipmentExceptionUpdateBody = Partial<
  Pick<ShipmentException, 'hold_until' | 'status'>
>;

export interface ShipmentExceptionUpdate {
  shipment_exception: ShipmentExceptionUpdateBody;
}

export class ShipmentExceptionsEndpoint {
  private readonly defaultEndpoint: Endpoint<
    ShipmentException,
    ShipmentExceptionCreate
  >;
  private readonly path = '/shipment_exceptions';
  constructor(private readonly artaClient: RestClient) {
    this.defaultEndpoint = new DefaultEndpoint<
      ShipmentException,
      ShipmentExceptionCreate
    >(this.path, this.artaClient);
  }

  public getById(id: ArtaID, auth?: string): Promise<ShipmentException> {
    return this.defaultEndpoint.getById(id, auth);
  }

  public list(
    page = 1,
    pageSize = 20,
    auth?: string,
  ): Promise<Page<ShipmentException>> {
    return this.defaultEndpoint.list({ page, page_size: pageSize }, auth);
  }

  public create(
    payload: ShipmentExceptionCreateBody,
    auth?: string,
  ): Promise<ShipmentException> {
    return this.defaultEndpoint.create({ shipment_exception: payload }, auth);
  }

  public update(
    id: ArtaID,
    payload: ShipmentExceptionUpdateBody,
    auth?: string,
  ): Promise<ShipmentException> {
    return this.defaultEndpoint.update(
      id,
      { shipment_exception: payload } as Partial<ShipmentExceptionCreate>,
      auth,
    );
  }
}
