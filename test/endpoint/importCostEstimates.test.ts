import type { RestClient } from '../../lib/net/RestClient';
import {
  type ImportCostEstimateCreateBody,
  ImportCostEstimatesEndpoint,
} from '../../lib/endpoint/importCostEstimates';
import * as helper from './helper';
import type { ImportCostEstimate } from '../../lib';

describe('tests keys Arta endpoint', () => {
  const responseMock = {
    created_at: new Date('2025-05-09T14:01:40.889788'),
    currency: 'USD',
    destination: {
      city: null,
      country: 'CA',
      postal_code: null,
      region: 'ON',
    },
    end_use: 'for_resale',
    estimate: {
      line_items: [
        {
          amount: '5.49',
          description: 'GST (Goods and Services Tax)',
          subtype: 'advancement',
          type: 'tax',
        },
        {
          amount: '8.79',
          description: 'HST (Harmonized Sales Tax)',
          subtype: 'advancement',
          type: 'tax',
        },
      ],
      summary: {
        duties: '2119.53',
        fees: '109.89',
        taxes: '1750.68',
      },
    },
    id: '8395a470-58df-4c2d-b5b5-7b76e5acdb61',
    objects: [
      {
        country_of_origin: null,
        hs_code: '691390',
        quantity: 1,
        reference: 'ceramic-vase-maria-lundqvist',
        value: '10869.45',
        value_currency: 'USD',
      },
    ],
    origin: {
      country: 'BR',
    },
    reference: null,
    shortcode: 'TEST-1234',
    status: 'success',
    transport: {
      amount: '20000.00',
      amount_currency: 'USD',
      service_level: 'fedex_regional_economy',
    },
    updated_at: new Date('2025-05-09T14:01:40.889788'),
  } satisfies ImportCostEstimate;
  const path = 'import_cost_estimates';
  let clientMock: RestClient;
  let endpoint: ImportCostEstimatesEndpoint;

  beforeEach(() => {
    jest.resetAllMocks();
    clientMock = helper.getRestMock(responseMock);
    endpoint = new ImportCostEstimatesEndpoint(clientMock);
  });

  it('should have get, create and list', async () => {
    const requestConfig = { path, clientMock, endpoint };
    const createPayload = {
      currency: 'USD',
      objects: [
        {
          reference: 'ceramic-vase-maria-lundqvist',
          value: '10869.45',
          value_currency: 'USD',
          hs_code: '691390',
        },
      ],
      destination: {
        country: 'CA',
        region: 'ON',
      },
      origin: {
        country: 'BR',
      },
      transport: {
        amount: '20000',
        amount_currency: 'USD',
        service_level: 'fedex_regional_economy',
      },
    } satisfies ImportCostEstimateCreateBody;
    await helper.testGet(requestConfig);
    await helper.testCreate(
      createPayload,
      'import_cost_estimate',
      requestConfig,
    );
    await helper.testList(responseMock, requestConfig);
  });
});
