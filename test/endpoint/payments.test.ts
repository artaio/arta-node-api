import { RestClient } from '../../lib/net/RestClient';
import { PaymentsEndpoint } from '../../lib/endpoint/payments';
import * as helper from './helper';

describe('tests payments Arta endpoint', () => {
  const paymentId = 123;
  const paidOnStr = '2022-04-05';
  const amountStr = '3.45';

  const responseMock = {
    id: paymentId,
    amount: amountStr,
    amount_currency: 'USD',
    context: 'hosted_checkout',
    created_at: '2020-10-22T21:12:48.839165',
    paid_on: paidOnStr,
    updated_at: '2020-10-22T21:12:48.839165',
  };

  const path = 'payments';
  let clientMock: RestClient;
  let endpoint: PaymentsEndpoint;

  beforeEach(() => {
    jest.resetAllMocks();
    clientMock = helper.getRestMock(responseMock);
    endpoint = new PaymentsEndpoint(clientMock);
  });

  it('should have get and list methods', async () => {
    const requestConfig = { path, clientMock, endpoint };
    await helper.testGet(requestConfig);
    await helper.testList(responseMock, requestConfig);
  });

  it('should parse amount and paid_on fields', async () => {
    const requestConfig = { path, clientMock, endpoint };
    const result = await requestConfig.endpoint.getById(paymentId);

    expect(result.amount).toEqual(Number(amountStr));
    expect(result.paid_on).toEqual(new Date(paidOnStr));
  });
});
