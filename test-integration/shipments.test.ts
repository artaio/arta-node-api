import { arta } from '.';
import type { Page } from '../lib/pagination';
import type { QuoteRequest, Shipment } from '../lib/types';
import { createPaginatedResponseSchema, shipmentSchema } from '../schemas';

describe('tests shipments Arta endpoint', () => {
  let request: QuoteRequest;

  beforeAll(async () => {
    request = await arta.requests.create({
      destination: {
        postal_code: '10019',
        country: 'US',
        address_line_1: '11 W 53rd St',
        contacts: [
          {
            name: 'John Doe',
            email_address: 'johndoe@test.test',
            phone_number: '1234567890',
          },
        ],
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
        address_line_1: '87 Richardson St',
        city: 'brooklyn',
        contacts: [
          {
            name: 'John Doe',
            email_address: 'johndoe@test.test',
            phone_number: '1234567890',
          },
        ],
      },
    });
  });

  it('should be able to CRUD shipments', async () => {
    const shipment = await arta.shipments.create({
      quote_id: request.quotes[0].id,
    });

    const parsedShipment = shipmentSchema.parse(shipment) satisfies Shipment;
    expect(parsedShipment.status).toBe('pending');

    const shipments = await arta.shipments.list();
    const parsedShipmentList = createPaginatedResponseSchema(
      shipmentSchema,
    ).parse(shipments) satisfies Page<Shipment>;
    expect(parsedShipmentList.items.length).toBeGreaterThanOrEqual(1);

    const shipmentItem = await arta.shipments.getById(parsedShipment.id);
    const parsedShipmentItem = shipmentSchema.parse(
      shipmentItem,
    ) satisfies Shipment;

    expect(parsedShipmentItem.id).toBe(parsedShipment.id);
  });

  it('should be able to cancel a Self Ship shipment', async () => {
    // Needs an integration org with Self Ship quoting and the
    // self_ship_cancellations_api feature. Skips when the org can't quote it.
    const selfShipRequest = await arta.requests.create({
      destination: request.destination,
      objects: request.objects,
      origin: request.origin,
      preferred_quote_types: ['self_ship'],
    });
    const selfShipQuote = selfShipRequest.quotes.find(
      (q) => q.quote_type === 'self_ship',
    );
    if (!selfShipQuote) {
      console.warn('No Self Ship quote for the integration org; skipping');
      return;
    }

    const shipment = await arta.shipments.create({
      quote_id: selfShipQuote.id,
    });
    expect(shipment.status).toBe('pending');

    const cancelled = await shipment.cancel();
    const parsedCancelled = shipmentSchema.parse(cancelled) satisfies Shipment;
    expect(parsedCancelled.id).toBe(shipment.id);
    expect(parsedCancelled.status).toBe('cancelled');
  });
});
