import { RestClient } from '../../lib/net/RestClient';
import * as helper from './helper';
import { LogsEndpoint } from '../../lib/endpoint/logs';

describe('tests logs Arta endpoint', () => {
  const responseMock = {
    api_key_id: 1,
    arta_version: '2020-10-22',
    end_at: '2020-10-23T20:34:28.816433',
    id: 320,
    created_at: '2020-10-23T20:34:29.066599',
    method: 'POST',
    path: '/requests',
    query_params: '{}',
    request_body: '',
    request_id: 'FkC5WHWtbZuuUtcAArFx',
    response_body: '',
    start_at: '2020-10-23T20:34:16.928374',
    status: 200,
    updated_at: '2020-10-23T20:34:29.066599',
  };
  const path = 'logs';
  let clientMock: RestClient;
  let endpoint: LogsEndpoint;

  beforeEach(() => {
    jest.resetAllMocks();
    clientMock = helper.getRestMock(responseMock);
    endpoint = new LogsEndpoint(clientMock);
  });

  it('should have get and list methods', async () => {
    const requestConfig = { path, clientMock, endpoint };
    const listMock: any = { ...responseMock };
    delete listMock['request_body'];
    delete listMock['response_body'];
    const getResult = await helper.testGet(requestConfig);
    await helper.testList(listMock, requestConfig);

    expect(getResult.start_at.toISOString()).toBe('2020-10-23T20:34:16.928Z');
    expect(getResult.end_at.toISOString()).toBe('2020-10-23T20:34:28.816Z');
  });
});
