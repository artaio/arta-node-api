import type { RestClient } from '../../lib/net/RestClient';

interface RequestTestConfig {
  path: string;
  clientMock: RestClient;
  forwadedAuth?: string;
  endpoint: any;
}

export async function testGet(testConfig: RequestTestConfig) {
  const result = await testConfig.endpoint.getById(
    123,
    testConfig.forwadedAuth,
  );
  expect(testConfig.clientMock.get).toHaveBeenCalledWith(
    `/${testConfig.path}/123`,
    testConfig.forwadedAuth,
  );
  return result;
}

export async function testCreate(
  payload: any,
  insertKey: string,
  testConfig: RequestTestConfig,
) {
  const result = await testConfig.endpoint.create(
    payload,
    testConfig.forwadedAuth,
  );
  expect(testConfig.clientMock.post).toHaveBeenCalledWith(
    `/${testConfig.path}`,
    { [insertKey]: payload },
    testConfig.forwadedAuth,
  );
  return result;
}

export async function testUpdateSingle(
  payload: any,
  insertKey: string,
  testConfig: RequestTestConfig,
) {
  const result = await testConfig.endpoint.update(payload);
  expect(testConfig.clientMock.patch).toBeCalledWith(
    `/${testConfig.path}`,
    { [insertKey]: payload },
    testConfig.forwadedAuth,
  );
  return result;
}

export async function testUpdate(
  payload: any,
  insertKey: string,
  testConfig: RequestTestConfig,
) {
  const result = await testConfig.endpoint.update(
    123,
    payload,
    testConfig.forwadedAuth,
  );
  expect(testConfig.clientMock.patch).toBeCalledWith(
    `/${testConfig.path}/123`,
    { [insertKey]: payload },
    testConfig.forwadedAuth,
  );
  return result;
}

export async function testDelete(testConfig: RequestTestConfig) {
  await testConfig.endpoint.getById(123, testConfig.forwadedAuth);

  expect(
    await testConfig.endpoint.remove(123, testConfig.forwadedAuth),
  ).toBeUndefined();
  expect(testConfig.clientMock.delete).toHaveBeenCalledWith(
    `/${testConfig.path}/123`,
    testConfig.forwadedAuth,
  );
}

export async function testList(payload: any, testConfig: RequestTestConfig) {
  const apiResponse = {
    items: [payload],
    metadata: { page: 1, page_size: 5, total_size: 6 },
  };

  testConfig.clientMock.get = jest.fn().mockReturnValueOnce(apiResponse);
  const result = await testConfig.endpoint.list();
  expect(result.items.length).toBeGreaterThan(0);
  expect(testConfig.clientMock.get).toHaveBeenCalledWith(
    `/${testConfig.path}?page=1&page_size=20`,
    undefined,
  );
}

export async function testListWithSearch(
  payload: any,
  testConfig: RequestTestConfig,
) {
  const apiResponse = {
    items: [payload],
    metadata: { page: 1, page_size: 5, total_size: 6 },
  };
  testConfig.clientMock.get = jest.fn().mockReturnValueOnce(apiResponse);
  await testConfig.endpoint.list('my-search');
  expect(testConfig.clientMock.get).toHaveBeenCalledWith(
    `/${testConfig.path}?page=1&page_size=20&search=my-search`,
    undefined,
  );
}

testListWithSearch;

export async function testListAll(payload: any, testConfig: RequestTestConfig) {
  testConfig.clientMock.get = jest
    .fn()
    .mockResolvedValueOnce({
      items: [payload, payload],
      metadata: { page: 1, total_count: 5 },
    })
    .mockResolvedValueOnce({
      items: [payload, payload],
      metadata: { page: 2, total_count: 5 },
    })
    .mockResolvedValue({
      items: [payload],
      metadata: { page: 3, total_count: 5 },
    });

  let totalEndpoints = 0;
  for await (const test of testConfig.endpoint.listAll()) {
    expect(test.id).toEqual(payload.id);
    totalEndpoints++;
  }
  expect(totalEndpoints).toBe(5);

  testConfig.clientMock.get = jest.fn().mockResolvedValueOnce({
    items: [],
    metadata: { page: 1, total_count: 0 },
  });

  totalEndpoints = 0;
  for await (const test of testConfig.endpoint.listAll()) {
    expect(test).toEqual(testConfig.endpoint);
    totalEndpoints++;
  }
  expect(totalEndpoints).toBe(0);
}

export async function testGetSingle(
  expectedResponse: any,
  testConfig: RequestTestConfig,
) {
  const single = await testConfig.endpoint.get();
  expect(testConfig.clientMock.get).toBeCalledWith(
    `/${testConfig.path}`,
    testConfig.forwadedAuth,
  );
  expect(single.id).toEqual(expectedResponse.id);
}

export function getRestMock(response: any): RestClient {
  return {
    get: jest.fn().mockReturnValue(response),
    post: jest.fn().mockReturnValue(response),
    patch: jest.fn().mockReturnValue(response),
    delete: jest.fn(),
  };
}
