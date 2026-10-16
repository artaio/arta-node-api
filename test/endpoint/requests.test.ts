import type { QuoteRequestCreateBody } from '../../lib/endpoint/requests';
import { QuoteRequestsEndpoint } from '../../lib/endpoint/requests';
import type { RestClient } from '../../lib/net/RestClient';
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

  it('should have get, create, update and list methods', async () => {
    const requestConfig = { path, clientMock, endpoint };
    const result = await helper.testGet(requestConfig);
    await helper.testCreate(createPayload, 'request', requestConfig);
    await helper.testList(responseMock, requestConfig);
    await helper.testListWithSearch(responseMock, requestConfig);
    await helper.testUpdate({ tags: ['abc'] }, 'request', requestConfig);

    expect(result.quoting_strategy).toBe('best_rate');
    expect(result.quotes[0].optional_services[0].amount).toBe(1.0);
    expect(
      result.quotes[0].optional_services[0].included_services[0].amount,
    ).toBe(11.0);
    expect(
      result.quotes[0].optional_services[0].included_services[0]
        .included_services[0].amount,
    ).toBe(12.0);
  });

  it('should send EU product identifiers on objects and components', async () => {
    const euCustoms = {
      merchant_product_id: 'SKU-123/A',
      manufacturer_product_id: '0012345678905',
      manufacturer_product_id_standardized: true,
      eu_exempt_category: false,
    };
    // Typed, so the test fails to compile if the fields drop out of the generated types.
    const payload: QuoteRequestCreateBody = {
      origin: { country: 'US', postal_code: '11249' },
      destination: { country: 'FR', postal_code: '75001' },
      objects: [
        {
          subtype: 'painting_unframed',
          width: 36,
          height: 24,
          value: 100,
          value_currency: 'USD',
          customs: { ...euCustoms, eu_exempt_category: true },
        },
        {
          subtype: 'prepacked_box',
          width: 12,
          height: 12,
          value: 100,
          value_currency: 'USD',
          components: [
            { type: 'trading_card', value: 100, customs: euCustoms },
          ],
        },
      ],
    };

    await helper.testCreate(payload, 'request', {
      path,
      clientMock,
      endpoint,
    });
  });

  it('should have a custom methods', async () => {
    await endpoint.cancel('123');
    expect(clientMock.patch).toHaveBeenCalledWith(
      `/${path}/123/cancel`,
      undefined,
      undefined,
    );

    await endpoint.requireCustomQuotes('123', { note: 'test note' });
    expect(clientMock.patch).toHaveBeenCalledWith(
      `/${path}/123/custom`,
      { note: 'test note' },
      undefined,
    );

    await endpoint.updateContacts('123', {
      origin: { contacts: [{ name: 'test' }] },
    });
    expect(clientMock.patch).toHaveBeenCalledWith(
      `/${path}/123/contacts`,
      { origin: { contacts: [{ name: 'test' }] } },
      undefined,
    );
  });

  it('custom methods should be callable from instance', async () => {
    const cancel = jest.spyOn(endpoint, 'cancel');
    const custom = jest.spyOn(endpoint, 'requireCustomQuotes');
    const contacts = jest.spyOn(endpoint, 'updateContacts');

    const req = await endpoint.getById('4');

    await req.cancel();
    expect(cancel).toHaveBeenCalledWith(req.id, undefined);

    await req.requireCustomQuotes({ note: 'test note' });
    expect(custom).toHaveBeenCalledWith(
      req.id,
      { note: 'test note' },
      undefined,
    );

    await req.updateContacts({ origin: { contacts: [{ name: 'test' }] } });
    expect(contacts).toHaveBeenCalledWith(
      req.id,
      { origin: { contacts: [{ name: 'test' }] } },
      undefined,
    );
  });
});
