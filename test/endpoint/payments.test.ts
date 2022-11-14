import { RestClient } from '../../lib/net/RestClient';
import { PaymentsEndpoint } from '../../lib/endpoint/payments';
import * as helper from './helper';

describe('tests webhook deliveries Arta endpoint', () => {
  const responseMock = {
    id: 123,
    amount: '3.45',
    amount_currency: 'USD',
    context: 'hosted_checkout',
    created_at: '2020-10-22T21:12:48.839165',
    paid_on: '2022-04-05',
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
});
