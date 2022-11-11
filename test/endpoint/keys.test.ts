import { RestClient } from '../../lib/net/RestClient';
import { KeysEndpoint } from '../../lib/endpoint/keys';
import * as helper from './helper';

describe('tests keys Arta endpoint', () => {
  const responseMock = {
    id: 123,
    created_at: '2020-10-22T21:12:48.839165',
    updated_at: '2020-10-22T21:12:48.839165',
    name: 'akey',
    api_key: 'test_key',
  };
  const path = 'api_keys';
  let clientMock: RestClient;
  let endpoint: KeysEndpoint;

  beforeEach(() => {
    jest.resetAllMocks();
    clientMock = helper.getRestMock(responseMock);
    endpoint = new KeysEndpoint(clientMock);
  });

  it('should have get, create, delete, list and list all methods', async () => {
    const requestConfig = { path, clientMock, endpoint };
    const createPayload = { is_testing: true, name: 'my-key' };
    await helper.testGet(requestConfig);
    await helper.testCreate(createPayload, 'api_key', requestConfig);
    await helper.testDelete(requestConfig);
    await helper.testList(responseMock, requestConfig);
    await helper.testListAll(responseMock, requestConfig);
  });
});
