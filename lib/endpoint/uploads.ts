import { ArtaID } from '../ArtaClient';
import { RestClient } from '../net/RestClient';
import { Page } from '../pagination';
import { DatedInterface, NullableString } from '../utils';
import { DefaultEndpoint, Endpoint } from './endpoint';

type MimeType =
  | 'application/pdf'
  | 'application/vnd.ms-excel'
  | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  | 'image/jpeg'
  | 'image/png'
  | 'text/csv'
  | 'video/mp4'
  | 'video/quicktime'
  | 'application/msword';

type DocumentType =
  | 'bill_of_lading'
  | 'certificate_of_insurance'
  | 'certificate_of_insurance_template'
  | 'condition_report'
  | 'condition_check'
  | 'image'
  | 'instructions'
  | 'airway_bill'
  | 'commercial_invoice'
  | 'power_of_attorney'
  | 'proof_of_export'
  | 'proof_of_delivery'
  | 'quote'
  | 'shipping_label'
  | 'other';

export interface Upload extends DatedInterface {
  id: ArtaID;
  document_type: DocumentType;
  document_type_label: string;
  download_url: NullableString;
  file_name: string;
  mime_type: MimeType;
  size: number;
  status: string;
  presigned_url?: NullableString;
}

export interface UploadCreateBody {
  document_type: DocumentType;
  document_type_label?: string;
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
    return this.defaultEndpoint.list(page, pageSize, auth);
  }

  public create(payload: UploadCreateBody, auth?: string): Promise<Upload> {
    return this.defaultEndpoint.create({ upload: payload }, auth);
  }

  public remove(id: ArtaID, auth?: string): Promise<void> {
    return this.defaultEndpoint.remove(id, auth);
  }
}
