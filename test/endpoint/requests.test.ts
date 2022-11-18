import { QuoteRequestsEndpoint } from '../../lib/endpoint/requests';
import { RestClient } from '../../lib/net/RestClient';
import * as helper from './helper';
import { createPayload, responseMock } from './request.mock';

describe('tests quote requests Arta endpoint', () => {
  const path = 'requests';
  let clientMock: RestClient;
  let endpoint: QuoteRequestsEndpoint;

  beforeEach(() => {
    jest.resetAllMocks();
    clientMock = helper.getRestMock(responseMock);
    endpoint = new QuoteRequestsEndpoint(clientMock);
  });

  it('should have get, create, and list methods', async () => {
    const requestConfig = { path, clientMock, endpoint };
    const result = await helper.testGet(requestConfig);
    await helper.testCreate(createPayload, 'request', requestConfig);
    await helper.testList(responseMock, requestConfig);

    expect(result.quotes[0].optional_services[0].amount).toBe(1.0);
    expect(result.quotes[0].optional_services[0].included_services[0].amount).toBe(11.0);
    expect(result.quotes[0].optional_services[0].included_services[0].included_services[0].amount).toBe(12.0);
  });
});
