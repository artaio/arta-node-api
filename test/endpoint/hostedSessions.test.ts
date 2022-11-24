import { RestClient } from '../../lib/net/RestClient';
import { HostedSessionsEndpoint } from '../../lib/endpoint/hostedSessions';
import * as helper from './helper';
import { createPayload, responseMock } from './hostedSessions.mock';

describe('tests hosted session Arta endpoint', () => {
  const path = 'hosted_sessions';
  let clientMock: RestClient;
  let endpoint: HostedSessionsEndpoint;

  beforeEach(() => {
    jest.resetAllMocks();
    clientMock = helper.getRestMock(responseMock);
    endpoint = new HostedSessionsEndpoint(clientMock);
  });

  it('should have get, create, list and list with search methods ', async () => {
    const requestConfig = { path, clientMock, endpoint };
    await helper.testGet(requestConfig);
    await helper.testCreate(createPayload, 'hosted_session', requestConfig);
    await helper.testList(responseMock, requestConfig);
    await helper.testListWithSearch(responseMock, requestConfig);
  });

  it('should have a cancel method', async () => {
    await endpoint.cancel(123);
    expect(clientMock.patch).toHaveBeenCalledWith(
      `/${path}/123/cancel`,
      undefined,
      undefined
    );
  });

  it('cancel method should be callable from instance', async () => {
    const cancel = jest.spyOn(endpoint, 'cancel');
    const session = await endpoint.getById(4);

    await session.cancel();
    expect(cancel).toHaveBeenCalledWith(session.id, undefined);
  });
});
