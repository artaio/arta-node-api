export const selfShipCollectionMock = {
  id: 'b3e37b37-4be3-4474-a34d-93e8f1d03be3',
  address_line_1: '14422 Rosewood Road',
  carrier: 'fedex',
  city: 'Miami Lakes',
  contact_email: 'john@example.com',
  contact_name: 'John Doe',
  contact_phone: '+1-555-123-4567',
  country: 'US',
  country_relationships: 'domestic',
  customer_close_time: '18:00:00',
  package_location: 'front',
  postal_code: '33014',
  ready_at: '2030-12-31T19:00:00',
  region: 'FL',
  service_level: 'ground',
  status: 'scheduled',
  created_at: '2023-01-01T00:00:00.000Z',
  updated_at: '2023-01-02T00:00:00.000Z',
};

export const pickupAvailabilityMock = [
  {
    available: true,
    carrier: 'fedex',
    close_time: '18:00:00',
    collection_date: '08/27/2025',
    country_relationships: 'domestic',
    ready_time: '12:00:00',
    service_level: 'ground',
  },
];

export const createPayloadMock = {
  contact_name: 'John Doe',
  contact_email: 'john@example.com',
  contact_phone: '+1-555-123-4567',
  ready_at: '2030-12-31T19:00:00',
  address_line_1: '14422 Rosewood Road',
  city: 'Miami Lakes',
  region: 'FL',
  country: 'US',
  postal_code: '33014',
  customer_close_time: '18:00:00',
  service_level: 'ground' as const,
  package_location: 'front' as const,
  country_relationships: 'domestic' as const,
  carrier: 'fedex' as const,
};
