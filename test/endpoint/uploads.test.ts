import { RestClient } from '../../lib/net/RestClient';
import { UploadsEndpoint } from '../../lib/endpoint/uploads';
import * as helper from './helper';

describe('tests attachments Arta endpoint', () => {
  const responseMock = {
    created_at: '2021-10-27T16:48:38.657228',
    document_type: 'bill_of_lading',
    document_type_label: null,
    download_url: null,
    file_name: 'inventory_list_27148_16.pdf',
    id: 1942,
    mime_type: 'application/pdf',
    presigned_url:
      'https://invaliddomain.test/test/35fc1956-71fc-4b1c-846b-6ea963182a8c',
    size: 58550,
    status: 'pending',
  };
  const path = 'uploads';
  let clientMock: RestClient;
  let endpoint: UploadsEndpoint;

  beforeEach(() => {
    jest.resetAllMocks();
    clientMock = helper.getRestMock(responseMock);
    endpoint = new UploadsEndpoint(clientMock);
  });

  it('should have create, get, delete and list methods', async () => {
    const requestConfig = { path, clientMock, endpoint };
    const createPayload = {
      document_type: 'bill_of_lading',
      document_type_label: 'string',
      file_name: 'my-file.csv',
      mime_type: 'text/csv',
      size: 22,
    };
    await helper.testGet(requestConfig);
    await helper.testCreate(createPayload, 'upload', requestConfig);
    await helper.testDelete(requestConfig);
    await helper.testList(responseMock, requestConfig);
  });
});
