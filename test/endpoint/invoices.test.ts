import { RestClient } from '../../lib/net/RestClient';
import * as helper from './helper';
import { InvoicesEndpoint } from '../../lib/endpoint/invoices';

describe('tests logs Arta endpoint', () => {
  const responseMock = {
    amount_owed: '276.91',
    amount_owed_currency: 'USD',
    amount_paid: '276.91',
    amount_paid_currency: 'USD',
    created_at: '2021-03-10T20:15:34.096258',
    invoice_url: null,
    id: 2216,
    issued_on: '2021-03-10',
    shipment_id: '53d6bdec-1eae-46e2-97c2-3e56b1a1095d',
    status: 'closed',
    updated_at: '2021-03-10T20:16:10.202836'
  };
  const path = 'invoices';
  let clientMock: RestClient;
  let endpoint: InvoicesEndpoint;

  beforeEach(() => {
    jest.resetAllMocks();
    clientMock = helper.getRestMock(responseMock);
    endpoint = new InvoicesEndpoint(clientMock);
  });

  it('should have get and list methods', async () => {
    const requestConfig = { path, clientMock, endpoint };
    const getResult = await helper.testGet(requestConfig);
    await helper.testList(responseMock, requestConfig);

    expect(getResult.amount_owed).toBe(276.91);
    expect(getResult.amount_paid).toBe(276.91);
    expect(getResult.issued_on.toISOString()).toBe('2021-03-10T00:00:00.000Z');

  });
});
