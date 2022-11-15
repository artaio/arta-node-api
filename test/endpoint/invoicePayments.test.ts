import { RestClient } from '../../lib/net/RestClient';
import { InvoicePaymentsEndpoint } from '../../lib/endpoint/invoicePayments';
import * as helper from './helper';

describe('tests payments Arta endpoint', () => {
  const invoicePaymentId = 123;
  const paymentId = 456;
  const paidOnStr = '2022-04-05';
  const amountStr = '3.45';

  const responseMock = {
    id: invoicePaymentId,
    amount: amountStr,
    amount_currency: 'USD',
    invoice_id:  'an-uuid',
    payment_id: paymentId,
    shipment_id: 'an-uuid',
    created_at: '2020-10-22T21:12:48.839165',
    paid_on: paidOnStr,
    updated_at: '2020-10-22T21:12:48.839165',
  };
  const listResponseMock = { items: [responseMock] };

  const path = 'invoice_payments';
  let clientMock: RestClient;
  let endpoint: InvoicePaymentsEndpoint;

  describe('getById', () => {
    beforeEach(() => {
      jest.resetAllMocks();
      clientMock = helper.getRestMock(responseMock);
      endpoint = new InvoicePaymentsEndpoint(clientMock);
    });

    it('should configure the getById method', async () => {
      const requestConfig = { path, clientMock, endpoint };
      await helper.testGet(requestConfig);
    });
  });

  describe('list', () => {
    beforeEach(() => {
      jest.resetAllMocks();
      clientMock = helper.getRestMock(listResponseMock);
      endpoint = new InvoicePaymentsEndpoint(clientMock);
    });

    it('should configure the list method', async () => {
      const requestConfig = { path, clientMock, endpoint };
      await helper.testList(listResponseMock, requestConfig);
    });

  });
});