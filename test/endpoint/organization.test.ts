import { OrganizationApi } from '../../lib/generated';
import { OrganizationEndpoint } from '../../lib/endpoint/organization';
jest.mock('../../lib/generated');

const mockOrgResponse = {
  data: {
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
  },
};

const OrganizationApiMocked =
  jest.mocked<typeof OrganizationApi>(OrganizationApi);

describe('tests default Arta endpoint', () => {
  let get: jest.Mock, patch: jest.Mock;

  beforeAll(() => {
    jest.resetAllMocks();
    get = jest.fn().mockResolvedValue(mockOrgResponse);
    patch = jest.fn().mockResolvedValue(mockOrgResponse);
    OrganizationApiMocked.mockImplementation(() => {
      return {
        organizationGet: get,
        organizationPatch: patch,
      } as unknown as OrganizationApi;
    });
  });

  it('should be able to get a single org', async () => {
    const orgnizationsEndpoint = new OrganizationEndpoint('test');
    const org = await orgnizationsEndpoint.get();

    expect(get).toBeCalledWith('ARTA_APIKey test');
    expect(org).toEqual(mockOrgResponse.data);
  });

  it('should be able to patch own org', async () => {
    const orgnizationsEndpoint = new OrganizationEndpoint('test');
    const updateMock = {
      ...mockOrgResponse,
      name: 'other_test',
      updated_at: new Date(),
      created_at: new Date(),
    };
    const org = await orgnizationsEndpoint.update(updateMock);
    expect(patch).toBeCalledWith('ARTA_APIKey test', {
      organization: updateMock,
    });
    expect(org).toEqual(mockOrgResponse.data);
  });

  it('should forward auth request on get', async () => {
    const orgnizationsEndpoint = new OrganizationEndpoint('test');
    const org = await orgnizationsEndpoint.get('other-auth');
    expect(get).toBeCalledWith('ARTA_APIKey other-auth');
    expect(org).toEqual(mockOrgResponse.data);
  });

  it('should forward auth request on patch', async () => {
    const orgnizationsEndpoint = new OrganizationEndpoint('test');
    const updateMock = {
      ...mockOrgResponse,
      name: 'other_test',
      updated_at: new Date(),
      created_at: new Date(),
    };
    const org = await orgnizationsEndpoint.update(updateMock, 'other-auth');
    expect(patch).toBeCalledWith('ARTA_APIKey other-auth', {
      organization: updateMock,
    });
    expect(org).toEqual(mockOrgResponse.data);
  });
});
