import { DefaultEndpoint } from '../lib/endpoint';
import { RestClient } from '../lib/net/RestClient';

interface T1 {
  t1: string;
}

interface T2 {
  t2: string;
  t3: string;
}

describe('tests default Arta endpoint', () => {
  let artaClientMock: RestClient;
  beforeAll(() => {
    artaClientMock = {
      get: jest.fn(),
      post: jest.fn(),
      patch: jest.fn(),
      delete: jest.fn(),
    };
    jest.resetAllMocks();
  });

  it('should be able to get element by ID', async () => {
    artaClientMock.get = jest.fn().mockReturnValueOnce({
      t1: 'a-test',
    });
    const endpoint = new DefaultEndpoint<T1, T2>('test', artaClientMock);
    const myElement = await endpoint.getById('an-id');
    expect(artaClientMock.get).toHaveBeenCalledTimes(1);
    expect(artaClientMock.get).toHaveBeenCalledWith('/test/an-id');
    expect(myElement).toEqual({ t1: 'a-test' });
  });

  it('should be able to list a page', async () => {
    artaClientMock.get = jest.fn().mockReturnValueOnce([
      {
        t1: 'a-test',
      },
    ]);
    const endpoint = new DefaultEndpoint<T1, T2>('/test', artaClientMock);
    await endpoint.list(2, 10);
    expect(artaClientMock.get).toHaveBeenCalledWith(
      `/test?page=2&page_size=10`
    );
  });

  it('should be able to list the default page if none selected', async () => {
    artaClientMock.get = jest.fn().mockReturnValueOnce([
      {
        t1: 'a-test',
      },
    ]);
    const endpoint = new DefaultEndpoint<T1, T2>('/test', artaClientMock);
    await endpoint.list();
    expect(artaClientMock.get).toHaveBeenCalledWith(
      `/test?page=1&page_size=20`
    );
  });

  it('should be able to create a new resource', async () => {
    artaClientMock.post = jest.fn().mockReturnValueOnce({
      t1: 'a-test',
    });
    const createPayload = { t2: 'test', t3: 'test2' };
    const endpoint = new DefaultEndpoint<T1, T2>('/test', artaClientMock);
    await endpoint.create(createPayload);
    expect(artaClientMock.post).toHaveBeenCalledWith(`/test`, createPayload);
  });

  it('should be able to update an existing resource', async () => {
    artaClientMock.patch = jest.fn().mockReturnValueOnce({
      t1: 'a-test',
    });
    const updatePayload = { t2: 'test' };
    const endpoint = new DefaultEndpoint<T1, T2>('/test', artaClientMock);
    await endpoint.update('an-id', updatePayload);
    expect(artaClientMock.patch).toHaveBeenCalledWith(
      `/test/an-id`,
      updatePayload
    );
  });

  it('should be able to delete an existing resource', async () => {
    const endpoint = new DefaultEndpoint<T1, T2>('/test', artaClientMock);
    const res = await endpoint.remove('an-id');
    expect(artaClientMock.delete).toHaveBeenCalledWith(`/test/an-id`);
    expect(res).toBe(undefined);
  });
});
