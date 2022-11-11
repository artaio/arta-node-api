import { RestClient } from '../../lib/net/RestClient';
import { AttachmentsEndpoint } from '../../lib/endpoint/attachment';
import * as helper from './helper';

describe('tests attachments Arta endpoint', () => {
  const responseMock = {
    id: 123,
    created_at: '2020-10-22T21:12:48.839165',
    updated_at: '2020-10-22T21:12:48.839165',
    upload_id: 1234,
    shipment_id: 'an-uuid',
  };
  const path = 'attachments';
  let clientMock: RestClient;
  let endpoint: AttachmentsEndpoint;

  beforeEach(() => {
    jest.resetAllMocks();
    clientMock = helper.getRestMock(responseMock);
    endpoint = new AttachmentsEndpoint(clientMock);
  });

  it('should have get, create, delete and list methods', async () => {
    const requestConfig = { path, clientMock, endpoint };
    const createPayload = { upload_id: 1234, shipment_id: 'an-uuid' };
    await helper.testGet(requestConfig);
    await helper.testCreate(createPayload, 'attachment', requestConfig);
    await helper.testDelete(requestConfig);
    await helper.testList(responseMock, requestConfig);
  });
});
