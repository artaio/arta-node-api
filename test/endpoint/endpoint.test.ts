import { DefaultEndpoint } from '../../lib/endpoint/endpoint';
import { RestClient } from '../../lib/net/RestClient';
import { DatedInterface } from '../../lib/utils';

interface T1 extends DatedInterface {
  t1: string;
}

interface T2 {
  t2: string;
  t3: string;
}

describe('tests default Arta endpoint', () => {
  let artaClientMock: RestClient;
  const mockResponse = {
    created_at: new Date(),
    t1: 'a-test',
    updated_at: new Date(),
  };
  beforeEach(() => {
    artaClientMock = {
      get: jest.fn(),
      post: jest.fn(),
      patch: jest.fn(),
      delete: jest.fn(),
    };
    jest.resetAllMocks();
  });

  it('should be able to get element by ID', async () => {
    artaClientMock.get = jest.fn().mockReturnValueOnce(mockResponse);
    const endpoint = new DefaultEndpoint<T1, T2>('test', artaClientMock);
    const myElement = await endpoint.getById('an-id');
    expect(artaClientMock.get).toHaveBeenCalledTimes(1);
    expect(artaClientMock.get).toHaveBeenCalledWith('/test/an-id', undefined);
    expect(myElement).toEqual(mockResponse);
  });

  it('should be able to list a page', async () => {
    artaClientMock.get = jest
      .fn()
      .mockReturnValueOnce({ items: [mockResponse] });
    const endpoint = new DefaultEndpoint<T1, T2>('/test', artaClientMock);
    await endpoint.list({ page: 2, page_size: 10 });
    expect(artaClientMock.get).toHaveBeenCalledWith(
      `/test?page=2&page_size=10`,
      undefined
    );
  });

  it('should be able to list the default page if none selected', async () => {
    artaClientMock.get = jest
      .fn()
      .mockReturnValueOnce({ items: [mockResponse] });
    const endpoint = new DefaultEndpoint<T1, T2>('/test', artaClientMock);
    await endpoint.list();
    expect(artaClientMock.get).toHaveBeenCalledWith(
      `/test?page=1&page_size=20`,
      undefined
    );
  });

  it('should be able to iterate over paginated source', async () => {
    artaClientMock.get = jest
      .fn()
      .mockResolvedValueOnce({
        items: [mockResponse, mockResponse, mockResponse],
        metadata: { page: 1, total_count: 8 },
      })
      .mockResolvedValueOnce({
        items: [mockResponse, mockResponse, mockResponse],
        metadata: { page: 2, total_count: 8 },
      })
      .mockResolvedValue({
        items: [mockResponse, mockResponse],
        metadata: { page: 3, total_count: 8 },
      });

    const endpoint = new DefaultEndpoint<T1, T2>('/test', artaClientMock);
    let totalEndpoints = 0;
    for await (const test of endpoint.listAll()) {
      expect(test).toEqual(mockResponse);
      totalEndpoints++;
    }
    expect(totalEndpoints).toBe(8);
  });

  it('should be able to create a new resource', async () => {
    artaClientMock.post = jest.fn().mockReturnValueOnce(mockResponse);
    const createPayload = { t2: 'test', t3: 'test2' };
    const endpoint = new DefaultEndpoint<T1, T2>('/test', artaClientMock);
    await endpoint.create(createPayload);
    expect(artaClientMock.post).toHaveBeenCalledWith(
      `/test`,
      createPayload,
      undefined
    );
  });

  it('should be able to update an existing resource with custom auth', async () => {
    artaClientMock.patch = jest.fn().mockReturnValueOnce(mockResponse);
    const updatePayload = { t2: 'test' };
    const endpoint = new DefaultEndpoint<T1, T2>('/test', artaClientMock);
    await endpoint.update('an-id', updatePayload, 'custom-auth');
    expect(artaClientMock.patch).toHaveBeenCalledWith(
      `/test/an-id`,
      updatePayload,
      'custom-auth'
    );
  });

  it('should be able to delete an existing resource', async () => {
    const endpoint = new DefaultEndpoint<T1, T2>('/test', artaClientMock);
    const res = await endpoint.remove('an-id');
    expect(artaClientMock.delete).toHaveBeenCalledWith(
      `/test/an-id`,
      undefined
    );
    expect(res).toBe(undefined);
  });
});
