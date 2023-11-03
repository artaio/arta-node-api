import { ArtaID } from '../ArtaClient';
import { RestClient } from '../net/RestClient';
import { DatedInterface, NullableString } from '../utils';
import { DefaultEndpoint, Endpoint } from './endpoint';
import { Page } from '../pagination';

export interface Attachment extends DatedInterface {
  id: ArtaID;
  upload_id: number;
  request_id?: NullableString;
  shipment_id?: NullableString;
}

export interface AttachmentCreateBodyRequest {
  upload_id: number;
  request_id: string;
}
export interface AttachmentCreateBodyShipment {
  upload_id: number;
  shipment_id: string;
}

export type AttachmentCreateBody =
  | AttachmentCreateBodyRequest
  | AttachmentCreateBodyShipment;
export interface AttachmentCreate {
  attachment: AttachmentCreateBody;
}

export class AttachmentsEndpoint {
  private readonly defaultEndpoint: Endpoint<Attachment, AttachmentCreate>;
  private readonly path = '/attachments';
  constructor(private readonly artaClient: RestClient) {
    this.defaultEndpoint = new DefaultEndpoint<Attachment, AttachmentCreate>(
      this.path,
      this.artaClient,
    );
  }

  public getById(id: ArtaID, auth?: string): Promise<Attachment> {
    return this.defaultEndpoint.getById(id, auth);
  }

  public list(
    page = 1,
    pageSize = 20,
    auth?: string,
  ): Promise<Page<Attachment>> {
    return this.defaultEndpoint.list({ page, page_size: pageSize }, auth);
  }

  public create(
    payload: AttachmentCreateBody,
    auth?: string,
  ): Promise<Attachment> {
    return this.defaultEndpoint.create({ attachment: payload }, auth);
  }

  public remove(id: ArtaID, auth?: string): Promise<void> {
    return this.defaultEndpoint.remove(id, auth);
  }
}
