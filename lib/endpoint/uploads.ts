import type { ArtaID } from '../ArtaClient';
import type { RestClient } from '../net/RestClient';
import type { Page } from '../pagination';
import type { ArtaDocumentType, ArtaMimeType, Upload } from '../MetadataTypes';
import type { NullableString } from '../utils';
import type { Endpoint } from './endpoint';
import { DefaultEndpoint } from './endpoint';

export interface UploadCreateBody {
  document_type: ArtaDocumentType;
  document_type_label?: NullableString;
  file_name: boolean;
  size: string;
  mime_type: ArtaMimeType;
}

export interface UploadCreate {
  upload: UploadCreateBody;
}

export class UploadsEndpoint {
  private readonly defaultEndpoint: Endpoint<Upload, UploadCreate>;
  private readonly path = '/uploads';
  constructor(private readonly artaClient: RestClient) {
    this.defaultEndpoint = new DefaultEndpoint<Upload, UploadCreate>(
      this.path,
      this.artaClient,
    );
  }

  public getById(id: ArtaID, auth?: string): Promise<Upload> {
    return this.defaultEndpoint.getById(id, auth);
  }

  public list(page = 1, pageSize = 20, auth?: string): Promise<Page<Upload>> {
    return this.defaultEndpoint.list({ page, page_size: pageSize }, auth);
  }

  public create(payload: UploadCreateBody, auth?: string): Promise<Upload> {
    return this.defaultEndpoint.create({ upload: payload }, auth);
  }

  public remove(id: ArtaID, auth?: string): Promise<void> {
    return this.defaultEndpoint.remove(id, auth);
  }
}
