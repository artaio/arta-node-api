import type { RestClient } from '../../lib/net/RestClient';
import { type TagCreateBody, TagsEndpoint } from '../../lib/endpoint/tags';
import * as helper from './helper';

describe('tests tags Arta endpoint', () => {
  const responseMock = {
    id: 123,
    created_at: '2020-10-22T21:12:48.839165',
    updated_at: '2020-10-22T21:12:48.839165',
    name: 'akey',
    api_key: 'test_key',
  };
  const path = 'tags';
  let clientMock: RestClient;
  let endpoint: TagsEndpoint;

  beforeEach(() => {
    jest.resetAllMocks();
    clientMock = helper.getRestMock(responseMock);
    endpoint = new TagsEndpoint(clientMock);
  });

  it('should have get, create, update and list methods', async () => {
    const requestConfig = { path, clientMock, endpoint };
    const createPayload = {
      name: 'my-tag',
      description: 'test description',
      color: 'D7D6D0',
      is_active: true,
    } satisfies TagCreateBody;

    await endpoint.getByName('my-tag');
    expect(clientMock.get).toHaveBeenCalledWith(`/${path}/my-tag`, undefined);

    await helper.testCreate(createPayload, 'tag', requestConfig);
    await helper.testList(responseMock, requestConfig);
    await helper.testListWithSearch(responseMock, requestConfig);
    await helper.testUpdate({ color: 'D7D6D1' }, 'tag', requestConfig);
  });
});
