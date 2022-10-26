import { RestClient } from '../lib/net/RestClient';
import { OrganizationEndpoint } from '../lib/organization';

describe('tests default Arta endpoint', () => {
  let artaClientMock: RestClient;
  const mockOrg = {
    api_version: '2021-01-01',
    billing_terms: 'prepaid',
    company_name: 'otavio org',
    created_at: new Date(),
    display_name: null,
    id: 867,
    name: 'test org',
    shortcode: 'test',
    status: 'active',
    stripe_customer_id: 'test',
    updated_at: new Date(),
  };

  beforeAll(() => {
    artaClientMock = {
      get: jest.fn(),
      post: jest.fn(),
      patch: jest.fn(),
      delete: jest.fn(),
    };
    jest.resetAllMocks();
  });

  it('should be get a single org', async () => {
    artaClientMock.get = jest.fn().mockReturnValueOnce(mockOrg);

    const orgnizationsEndpoint = new OrganizationEndpoint(artaClientMock);
    const org = await orgnizationsEndpoint.get();
    expect(artaClientMock.get).toBeCalledWith('/organization', undefined);
    expect(org).toEqual(mockOrg);
  });

  it('should be patch own org', async () => {
    artaClientMock.patch = jest.fn().mockReturnValueOnce(mockOrg);

    const orgnizationsEndpoint = new OrganizationEndpoint(artaClientMock);
    const updateMock = { ...mockOrg, name: 'other_test' };
    const org = await orgnizationsEndpoint.update(updateMock);
    expect(artaClientMock.patch).toBeCalledWith(
      '/organization',
      { organization: updateMock },
      undefined
    );
    expect(org).toEqual(mockOrg);
  });

  it('should forward auth request on get', async () => {
    artaClientMock.get = jest.fn().mockReturnValueOnce(mockOrg);

    const orgnizationsEndpoint = new OrganizationEndpoint(artaClientMock);
    const org = await orgnizationsEndpoint.get('other-auth');
    expect(artaClientMock.get).toBeCalledWith('/organization', 'other-auth');
    expect(org).toEqual(mockOrg);
  });

  it('should forward auth request on patch', async () => {
    artaClientMock.patch = jest.fn().mockReturnValueOnce(mockOrg);

    const orgnizationsEndpoint = new OrganizationEndpoint(artaClientMock);
    const updateMock = { ...mockOrg, name: 'other_test' };
    const org = await orgnizationsEndpoint.update(updateMock, 'other-auth');
    expect(artaClientMock.patch).toBeCalledWith(
      '/organization',
      { organization: updateMock },
      'other-auth'
    );
    expect(org).toEqual(mockOrg);
  });
});
