export const createPayload = {
  internal_reference: 'Accession ID: 823',
  public_reference: 'Order #42',
  quote_id: 42,
  shipping_notes: 'Collector is a new customer from the West LA gallery',
};

export const responseMock = {
  created_at: '2021-01-21T21:00:58.403150',
  destination: {
    access_restrictions: [],
    address_line_1: '87 Richardson St',
    address_line_2: null,
    address_line_3: null,
    city: 'New York',
    contacts: [
      {
        email_address: 'al@example.com',
        name: 'Alfred Barr',
        phone_number: '(222) 222-2222',
      },
    ],
    country: 'US',
    postal_code: '11249',
    region: 'NY',
    title: 'Home',
  },
  eei_form_status: null,
  id: '6b12c76a-5217-4cd6-82d8-7aa5265ebaad',
  insurance_policy: null,
  internal_reference: null,
  object_count: 1,
  origin: {
    access_restrictions: [],
    address_line_1: '11 W 53rd St',
    address_line_2: null,
    address_line_3: null,
    city: 'New York',
    contacts: [
      {
        email_address: 'mary@example.com',
        name: 'Mary Quinn Sullivan',
        phone_number: '(333) 333-3333',
      },
    ],
    country: 'US',
    postal_code: '10019',
    region: 'NY',
    title: 'Warehouse',
  },
  package_count: 1,
  packages: [
    {
      depth: '6.0',
      eta: '05/09/2022',
      handle_with_care: false,
      height: '14.5',
      id: 131,
      is_sufficiently_packed: false,
      objects: [
        {
          current_packing: [],
          depth: '2',
          details: {
            creation_date: null,
            creator: 'Robert Irwin',
            is_cites: false,
            is_fragile: false,
            materials: [],
            title: 'All That Jazz',
          },
          height: '10.5',
          images: [],
          internal_reference: null,
          public_reference: null,
          subtype: 'painting_unframed',
          type: 'art',
          unit_of_measurement: 'in',
          value: '1500',
          value_currency: 'USD',
          weight: '3.5',
          weight_unit: 'lb',
          width: '10',
        },
      ],
      packing_materials: ['strongbox'],
      status: 'pending',
      weight: '3.5',
      weight_unit: 'lb',
      width: '14.0',
    },
  ],
  payment_process: 'invoicing',
  public_reference: null,
  quote_type: 'parcel',
  schedule: {
    delivery_end: null,
    delivery_start: null,
    delivery_window_modifier: '',
    pickup_end: null,
    pickup_start: null,
    pickup_window_modifier: '',
  },
  services: [
    {
      amount: '1',
      amount_currency: 'USD',
      included_services: [],
      is_requested: false,
      is_required: true,
      name: 'UPS Next Day Air',
      sub_subtype: 'parcel',
      subtype: 'parcel',
      type: 'transport',
    },
    {
      amount: '1.1',
      amount_currency: 'USD',
      included_services: [],
      is_requested: false,
      is_required: true,
      name: 'Strongbox',
      sub_subtype: 'strongbox',
      subtype: 'packing_materials',
      type: 'packing',
    },
    {
      amount: '2',
      amount_currency: 'USD',
      included_services: [],
      is_requested: false,
      is_required: true,
      name: 'Collection',
      sub_subtype: 'collection',
      subtype: 'collection',
      type: 'location',
    },
    {
      amount: '999.99',
      amount_currency: 'USD',
      included_services: [],
      is_requested: false,
      is_required: true,
      name: 'Fuel Surcharge',
      sub_subtype: 'fuel_surcharge',
      subtype: 'fees',
      type: 'taxes_duties_fees',
    },
  ],
  shipping_notes: null,
  shortcode: 'MA-452144',
  status: 'pending',
  total: '4',
  total_currency: 'USD',
  tracking: [],
  updated_at: '2021-01-21T21:00:58.579870',
  url: 'https://connect.shiparta.com/shipments/6b12c76a-5217-4cd6-82d8-7aa5265egood/5xTRnCvYkdMFdcFFMWUZaCmXz',
};
