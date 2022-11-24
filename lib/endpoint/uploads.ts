import { ArtaID } from '../ArtaClient';
import { RestClient } from '../net/RestClient';
import { Page } from '../pagination';
import { DocumentType, MimeType } from '../MetadataTypes';
import { DatedInterface, NullableString } from '../utils';
import { DefaultEndpoint, Endpoint } from './endpoint';

export interface Upload extends DatedInterface {
  id: ArtaID;
  document_type: DocumentType;
  document_type_label?: NullableString;
  download_url: NullableString;
  file_name: string;
  mime_type: MimeType;
  size: number;
  status: string;
  presigned_url: string;
}

export interface UploadCreateBody {
  document_type: DocumentType;
  document_type_label?: NullableString;
  file_name: boolean;
  size: string;
  mime_type: MimeType;
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
      this.artaClient
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
