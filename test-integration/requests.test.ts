import { arta } from '.';
import {
  createPaginatedResponseSchema,
  requestListItemSchema,
  requestSchema,
} from '../schemas';
import type { Page } from '../lib/pagination';
import type { QuoteRequest, QuoteRequestListItem } from '../lib/types';

describe('tests requests Arta endpoint', () => {
  it('should be able to CRUD quote requests', async () => {
    const request = await arta.requests.create({
      destination: {
        postal_code: '90024',
        country: 'US',
      },
      objects: [
        {
          subtype: 'painting_unframed',
          width: 36,
          height: 24,
          weight: 1,
          value: 100,
          value_currency: 'USD',
        },
      ],
      origin: {
        country: 'US',
        postal_code: '11249',
      },
    });
    const parsedRequest = requestSchema.parse(request) satisfies QuoteRequest;
    expect(parsedRequest.status).toBe('quoted');

    const requests = await arta.requests.list();

    const parsedRequests = createPaginatedResponseSchema(
      requestListItemSchema,
    ).parse(requests) satisfies Page<QuoteRequestListItem>;
    expect(parsedRequests.items.length).toBeGreaterThanOrEqual(1);

    await arta.requests.cancel(parsedRequest.id);

    const request2 = await arta.requests.getById(parsedRequest.id);
    const parsedRequest2 = requestSchema.parse(request2) satisfies QuoteRequest;
    expect(parsedRequest2.status).toBe('cancelled');
  });
});
