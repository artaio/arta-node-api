import type { RestClient } from '../../lib/net/RestClient';
import * as helper from './helper';
import { EmailRulesEndpoint } from '../../lib/endpoint/emailRules';

describe('tests email_rule Arta endpoint', () => {
  const responseMock = {
    id: 4,
    created_at: '2020-10-22T21:12:48.839165',
    updated_at: '2020-10-22T21:12:48.839165',
    email_notification_id: 'complete',
    recipients: ['destination', 'origin'],
  };
  const path = 'email_rules';
  let clientMock: RestClient;
  let endpoint: EmailRulesEndpoint;

  beforeEach(() => {
    jest.resetAllMocks();
    clientMock = helper.getRestMock(responseMock);
    endpoint = new EmailRulesEndpoint(clientMock);
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
      recipients: ['destination', 'origin'],
    };
    await helper.testGet(requestConfig);
    await helper.testCreate(createPayload, 'email_rule', requestConfig);
    await helper.testDelete(requestConfig);
    await helper.testList(responseMock, requestConfig);
    await helper.testUpdate(
      { recipients: ['destination'] },
      'email_rule',
      requestConfig,
    );
  });
});
