import type { RestClient } from '../../lib/net/RestClient';
import { OrganizationsEndpoint } from '../../lib/endpoint/organization';
import * as helper from './helper';

describe('tests organization Arta endpoint', () => {
  const responseMock = {
    id: 867,
    created_at: '2020-10-22T21:12:48.839165',
    updated_at: '2020-10-22T21:12:48.839165',
    api_version: '2021-01-01',
    billing_terms: 'prepaid',
    company_name: 'otavio org',
    display_name: null,
    name: 'test org',
    shortcode: 'test',
    status: 'active',
    stripe_customer_id: 'test',
  };
  const path = 'organization';
  let clientMock: RestClient;
  let endpoint: OrganizationsEndpoint;

  beforeAll(() => {
    jest.resetAllMocks();
    clientMock = helper.getRestMock(responseMock);
    endpoint = new OrganizationsEndpoint(clientMock);
  });

  it('should be able to get and update a single org', async () => {
    const requestConfig = { path, clientMock, endpoint };
    const updateMock = {
      ...responseMock,
      name: 'other_test',
      updated_at: new Date(),
      created_at: new Date(),
    };
    await helper.testGetSingle(responseMock, requestConfig);
    await helper.testUpdateSingle(updateMock, 'organization', requestConfig);
  });
});
