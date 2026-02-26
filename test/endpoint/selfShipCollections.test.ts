import type { RestClient } from '../../lib/net/RestClient';
import { SelfShipCollectionsEndpoint } from '../../lib/endpoint/selfShipCollections';
import { getRestMock } from './helper';
import {
  selfShipCollectionMock,
  pickupAvailabilityMock,
  createPayloadMock,
} from './selfShipCollections.mock';

const MOCK_ID = 'b3e37b37-4be3-4474-a34d-93e8f1d03be3';

describe('tests self_ship_collections Arta endpoint', () => {
  let clientMock: RestClient;
  let endpoint: SelfShipCollectionsEndpoint;

  beforeEach(() => {
    jest.resetAllMocks();
    clientMock = getRestMock(selfShipCollectionMock);
    endpoint = new SelfShipCollectionsEndpoint(clientMock);
  });

  describe('getById', () => {
    it('should call the correct path and parse dates', async () => {
      const result = await endpoint.getById(MOCK_ID);
      expect(clientMock.get).toHaveBeenCalledWith(
        `/self_ship_collections/${MOCK_ID}`,
        undefined,
      );
      expect(result.id).toBe(MOCK_ID);
      expect(result.created_at).toBeInstanceOf(Date);
      expect(result.updated_at).toBeInstanceOf(Date);
    });

    it('should forward auth', async () => {
      await endpoint.getById(MOCK_ID, 'test-key');
      expect(clientMock.get).toHaveBeenCalledWith(
        `/self_ship_collections/${MOCK_ID}`,
        'test-key',
      );
    });
  });

  describe('create', () => {
    it('should wrap payload and parse dates', async () => {
      const result = await endpoint.create(createPayloadMock);
      expect(clientMock.post).toHaveBeenCalledWith(
        '/self_ship_collections',
        { self_ship_collection: createPayloadMock },
        undefined,
      );
      expect(result.created_at).toBeInstanceOf(Date);
      expect(result.updated_at).toBeInstanceOf(Date);
    });

    it('should forward auth', async () => {
      await endpoint.create(createPayloadMock, 'test-key');
      expect(clientMock.post).toHaveBeenCalledWith(
        '/self_ship_collections',
        { self_ship_collection: createPayloadMock },
        'test-key',
      );
    });
  });

  describe('list', () => {
    const listResponse = {
      items: [selfShipCollectionMock],
      metadata: { page: 1, page_size: 20, total_count: 1 },
    };

    beforeEach(() => {
      clientMock.get = jest.fn().mockReturnValue(listResponse);
      endpoint = new SelfShipCollectionsEndpoint(clientMock);
    });

    it('should use default pagination when no params provided', async () => {
      const result = await endpoint.list();
      expect(clientMock.get).toHaveBeenCalledWith(
        '/self_ship_collections?page=1&page_size=20',
        undefined,
      );
      expect(result.items.length).toBe(1);
      expect(result.items[0].created_at).toBeInstanceOf(Date);
    });

    it('should build filter query params with [equal_to] syntax', async () => {
      await endpoint.list({
        page: 2,
        page_size: 10,
        status: 'scheduled',
        carrier: 'fedex',
        city: 'Miami Lakes',
      });
      expect(clientMock.get).toHaveBeenCalledWith(
        '/self_ship_collections?page=2&page_size=10&status[equal_to]=scheduled&carrier[equal_to]=fedex&city[equal_to]=Miami%20Lakes',
        undefined,
      );
    });

    it('should forward auth', async () => {
      await endpoint.list(undefined, 'test-key');
      expect(clientMock.get).toHaveBeenCalledWith(
        '/self_ship_collections?page=1&page_size=20',
        'test-key',
      );
    });
  });

  describe('getPickupAvailability', () => {
    beforeEach(() => {
      clientMock.post = jest.fn().mockReturnValue(pickupAvailabilityMock);
      endpoint = new SelfShipCollectionsEndpoint(clientMock);
    });

    it('should call correct path with payload', async () => {
      const payload = {
        address_line_1: '14422 Rosewood Road',
        city: 'Miami Lakes',
        region: 'FL',
        country: 'US',
        postal_code: '33014',
        customer_close_time: '18:00:00',
        collection_date: '08/27/2025',
        country_relationships: 'domestic' as const,
        service_level: 'ground' as const,
      };
      const result = await endpoint.getPickupAvailability(payload);
      expect(clientMock.post).toHaveBeenCalledWith(
        '/self_ship_collections/pickup_availability',
        payload,
        undefined,
      );
      expect(result).toEqual(pickupAvailabilityMock);
    });

    it('should forward auth', async () => {
      const payload = {
        address_line_1: '14422 Rosewood Road',
        city: 'Miami Lakes',
        region: 'FL',
        country: 'US',
        postal_code: '33014',
        customer_close_time: '18:00:00',
        collection_date: '08/27/2025',
        country_relationships: 'domestic' as const,
        service_level: 'ground' as const,
      };
      await endpoint.getPickupAvailability(payload, 'test-key');
      expect(clientMock.post).toHaveBeenCalledWith(
        '/self_ship_collections/pickup_availability',
        payload,
        'test-key',
      );
    });
  });

});
