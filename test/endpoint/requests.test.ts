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
    expect(
      result.quotes[0].optional_services[0].included_services[0].amount
    ).toBe(11.0);
    expect(
      result.quotes[0].optional_services[0].included_services[0]
        .included_services[0].amount
    ).toBe(12.0);
  });

  it('should have a custom methods', async () => {
    await endpoint.cancel(123);
    expect(clientMock.patch).toHaveBeenCalledWith(
      `/${path}/123/cancel`,
      undefined,
      undefined
    );

    await endpoint.requireCustomQuotes(123, { note: 'test note' });
    expect(clientMock.patch).toHaveBeenCalledWith(
      `/${path}/123/custom`,
      { note: 'test note' },
      undefined
    );

    await endpoint.updateContacts(123, { origin: [{ name: 'test' }] });
    expect(clientMock.patch).toHaveBeenCalledWith(
      `/${path}/123/contacts`,
      { origin: [{ name: 'test' }] },
      undefined
    );
  });

  it('custom methods should be callable from instance', async () => {
    const cancel = jest.spyOn(endpoint, 'cancel');
    const custom = jest.spyOn(endpoint, 'requireCustomQuotes');
    const contacts = jest.spyOn(endpoint, 'updateContacts');

    const req = await endpoint.getById(4);

    await req.cancel();
    expect(cancel).toHaveBeenCalledWith(req.id, undefined);

    await req.requireCustomQuotes({ note: 'test note' });
    expect(custom).toHaveBeenCalledWith(
      req.id,
      { note: 'test note' },
      undefined
    );

    await req.updateContacts({ origin: [{ name: 'test' }] });
    expect(contacts).toHaveBeenCalledWith(
      req.id,
      { origin: [{ name: 'test' }] },
      undefined
    );
  });
});
