import { RestClient } from '../../lib/net/RestClient';
import * as helper from './helper';
import { EmailSubscriptionsEndpoint } from '../../lib/endpoint/emailSubscriptions';

describe('tests email_subscriptions Arta endpoint', () => {
  const responseMock = {
    id: 4,
    created_at: '2020-10-22T21:12:48.839165',
    updated_at: '2020-10-22T21:12:48.839165',
    email_notification_ids: 'complete',
    email_address: 'email@test.com',
    name: 'John',
  };

  const path = 'email_subscriptions';
  let clientMock: RestClient;
  let endpoint: EmailSubscriptionsEndpoint;

  beforeEach(() => {
    jest.resetAllMocks();
    clientMock = helper.getRestMock(responseMock);
    endpoint = new EmailSubscriptionsEndpoint(clientMock);
  });

  it('should have get, create, delete, list, and update methods', async () => {
    const requestConfig = {
      path,
      clientMock,
      endpoint,
      forwadedAuth: 'test-auth',
    };
    const createPayload = {
      email_notification_id: 'complete',
    };
    await helper.testGet(requestConfig);
    await helper.testCreate(createPayload, 'email_subscription', requestConfig);
    await helper.testDelete(requestConfig);
    await helper.testList(responseMock, requestConfig);
    await helper.testUpdate(
      { email_notification_ids: ['complete'] },
      'email_subscription',
      requestConfig
    );
  });
});
