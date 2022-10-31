import { RestClient } from '../../lib/net/RestClient';
import { OrganizationEndpoint } from '../../lib/endpoint/organization';

describe('tests default Arta endpoint', () => {
  let artaClientMock: RestClient;
  const mockOrgResponse = {
    api_version: '2021-01-01',
    billing_terms: 'prepaid',
    company_name: 'otavio org',
    created_at: '2020-10-22T21:12:48.839165',
    display_name: null,
    id: 867,
    name: 'test org',
    shortcode: 'test',
    status: 'active',
    stripe_customer_id: 'test',
    updated_at: '2020-10-22T21:12:48.839165',
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

  it('should be able to get a single org', async () => {
    artaClientMock.get = jest.fn().mockReturnValueOnce(mockOrgResponse);

    const orgnizationsEndpoint = new OrganizationEndpoint(artaClientMock);
    const org = await orgnizationsEndpoint.get();

    expect(artaClientMock.get).toBeCalledWith('/organization', undefined);
    expect(org).toEqual(mockOrgResponse);
  });

  it('should be able to patch own org', async () => {
    artaClientMock.patch = jest.fn().mockReturnValueOnce(mockOrgResponse);

    const orgnizationsEndpoint = new OrganizationEndpoint(artaClientMock);
    const updateMock = {
      ...mockOrgResponse,
      name: 'other_test',
      updated_at: new Date(),
      created_at: new Date(),
    };
    const org = await orgnizationsEndpoint.update(updateMock);
    expect(artaClientMock.patch).toBeCalledWith(
      '/organization',
      { organization: updateMock },
      undefined
    );
    expect(org).toEqual(mockOrgResponse);
  });

  it('should forward auth request on get', async () => {
    artaClientMock.get = jest.fn().mockReturnValueOnce(mockOrgResponse);

    const orgnizationsEndpoint = new OrganizationEndpoint(artaClientMock);
    const org = await orgnizationsEndpoint.get('other-auth');
    expect(artaClientMock.get).toBeCalledWith('/organization', 'other-auth');
    expect(org).toEqual(mockOrgResponse);
  });

  it('should forward auth request on patch', async () => {
    artaClientMock.patch = jest.fn().mockReturnValueOnce(mockOrgResponse);

    const orgnizationsEndpoint = new OrganizationEndpoint(artaClientMock);
    const updateMock = {
      ...mockOrgResponse,
      name: 'other_test',
      updated_at: new Date(),
      created_at: new Date(),
    };
    const org = await orgnizationsEndpoint.update(updateMock, 'other-auth');
    expect(artaClientMock.patch).toBeCalledWith(
      '/organization',
      { organization: updateMock },
      'other-auth'
    );
    expect(org).toEqual(mockOrgResponse);
  });
});
