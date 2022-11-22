export const createPayload = {
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
};

export const responseMock = {
  additional_services: [],
  bookable: {
    missing: [
      'destination_address_line_1',
      'origin_address_line_1',
      'destination_contact',
      'origin_contact',
    ],
    ready: false,
  },
  created_at: '2022-11-18T11:15:37.936828',
  currency: 'USD',
  destination: {
    access_restrictions: [],
    address_line_1: null,
    address_line_2: null,
    address_line_3: null,
    city: null,
    contacts: [],
    country: 'US',
    postal_code: '90024',
    region: null,
    title: null,
  },
  disqualifications: [
    {
      quote_types: ['select'],
      reason: 'The object is not supported',
      reason_code: 'object_not_supported',
    },
    {
      quote_types: ['select'],
      reason: 'One or more requested services are not available',
      reason_code: 'requested_service_unavailable',
    },
  ],
  hosted_session_id: null,
  id: '7601a9c2-9d92-43e3-9755-5f1d9534cdbe',
  insurance: null,
  internal_reference: null,
  log_request_id: 'FyipmU0QcpkMNMAAJ5Hx',
  object_count: 1,
  objects: [
    {
      current_packing: [],
      depth: null,
      details: {
        creation_date: null,
        creator: null,
        is_cites: false,
        is_fragile: false,
        materials: [],
        notes: null,
        title: null,
      },
      height: '24',
      images: [],
      internal_reference: null,
      public_reference: null,
      subtype: 'painting_unframed',
      type: 'art',
      unit_of_measurement: 'in',
      value: '100.00',
      value_currency: 'USD',
      weight: '1',
      weight_unit: 'lb',
      width: '36',
    },
  ],
  origin: {
    access_restrictions: [],
    address_line_1: null,
    address_line_2: null,
    address_line_3: null,
    city: null,
    contacts: [],
    country: 'US',
    postal_code: '11249',
    region: null,
    title: null,
  },
  payment_process: 'checkout',
  preferred_quote_types: [],
  public_reference: null,
  quote_types: ['self_ship', 'parcel', 'premium'],
  quotes: [
    {
      id: 1743970,
      included_insurance_policy: null,
      included_services: [
        {
          amount: '1.00',
          amount_currency: 'USD',
          included_services: [],
          is_requested: false,
          is_required: true,
          name: 'Next Day Air',
          sub_subtype: 'next_day_air',
          subtype: 'parcel',
          type: 'transport',
        },
        {
          amount: '1.00',
          amount_currency: 'USD',
          included_services: [],
          is_requested: false,
          is_required: true,
          name: 'Administrative Fees',
          sub_subtype: 'administrative',
          subtype: 'administration',
          type: 'administration',
        },
      ],
      optional_services: [
        {
          amount: '1.00',
          amount_currency: 'USD',
          included_services: [
            {
              amount: '11.00',
              amount_currency: 'USD',
              included_services: [
                {
                  amount: '12.00',
                  amount_currency: 'USD',
                  included_services: [],
                  is_requested: false,
                  is_required: true,
                  name: 'Second Day Air',
                  sub_subtype: 'second_day_air',
                  subtype: 'parcel',
                  type: 'transport',
                },
              ],
              is_requested: false,
              is_required: true,
              name: 'Second Day Air',
              sub_subtype: 'second_day_air',
              subtype: 'parcel',
              type: 'transport',
            },
          ],
          name: 'Signature Required',
          sub_subtype: 'signature_delivery',
          subtype: 'delivery',
          type: 'location',
        },
      ],
      quote_type: 'self_ship',
      status: 'published',
      total: '2.00',
      total_currency: 'USD',
    },
    {
      id: 1743969,
      included_insurance_policy: null,
      included_services: [
        {
          amount: '1.00',
          amount_currency: 'USD',
          included_services: [],
          is_requested: false,
          is_required: true,
          name: 'Second Day Air',
          sub_subtype: 'second_day_air',
          subtype: 'parcel',
          type: 'transport',
        },
        {
          amount: '1.00',
          amount_currency: 'USD',
          included_services: [],
          is_requested: false,
          is_required: true,
          name: 'Administrative Fees',
          sub_subtype: 'administrative',
          subtype: 'administration',
          type: 'administration',
        },
      ],
      optional_services: [
        {
          amount: '1.00',
          amount_currency: 'USD',
          included_services: [],
          name: 'Signature Required',
          sub_subtype: 'signature_delivery',
          subtype: 'delivery',
          type: 'location',
        },
      ],
      quote_type: 'self_ship',
      status: 'published',
      total: '2.00',
      total_currency: 'USD',
    },
    {
      id: 1743968,
      included_insurance_policy: null,
      included_services: [
        {
          amount: '1.00',
          amount_currency: 'USD',
          included_services: [],
          is_requested: false,
          is_required: true,
          name: 'Ground',
          sub_subtype: 'ground',
          subtype: 'parcel',
          type: 'transport',
        },
        {
          amount: '1.00',
          amount_currency: 'USD',
          included_services: [],
          is_requested: false,
          is_required: true,
          name: 'Administrative Fees',
          sub_subtype: 'administrative',
          subtype: 'administration',
          type: 'administration',
        },
      ],
      optional_services: [
        {
          amount: '1.00',
          amount_currency: 'USD',
          included_services: [],
          name: 'Signature Required',
          sub_subtype: 'signature_delivery',
          subtype: 'delivery',
          type: 'location',
        },
      ],
      quote_type: 'self_ship',
      status: 'published',
      total: '2.00',
      total_currency: 'USD',
    },
    {
      id: 1743967,
      included_insurance_policy: null,
      included_services: [
        {
          amount: '1.00',
          amount_currency: 'USD',
          included_services: [],
          is_requested: false,
          is_required: true,
          name: 'Next Day Air',
          sub_subtype: 'next_day_air',
          subtype: 'parcel',
          type: 'transport',
        },
        {
          amount: '1.00',
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
          amount: '1.00',
          amount_currency: 'USD',
          included_services: [],
          is_requested: false,
          is_required: true,
          name: 'Strongbox',
          sub_subtype: 'strongbox',
          subtype: 'packing_materials',
          type: 'packing',
        },
      ],
      optional_services: [
        {
          amount: '1.00',
          amount_currency: 'USD',
          included_services: [],
          name: 'Signature Required',
          sub_subtype: 'signature_delivery',
          subtype: 'delivery',
          type: 'location',
        },
        {
          amount: '1.00',
          amount_currency: 'USD',
          included_services: [],
          name: 'Building COI (origin)',
          sub_subtype: 'origin_building_coi',
          subtype: 'coi',
          type: 'administration',
        },
        {
          amount: '1.00',
          amount_currency: 'USD',
          included_services: [],
          name: 'Condition Check (origin)',
          sub_subtype: 'origin_condition_check',
          subtype: 'condition',
          type: 'handling',
        },
      ],
      quote_type: 'parcel',
      status: 'published',
      total: '3.00',
      total_currency: 'USD',
    },
    {
      id: 1743966,
      included_insurance_policy: null,
      included_services: [
        {
          amount: '1.00',
          amount_currency: 'USD',
          included_services: [],
          is_requested: false,
          is_required: true,
          name: 'Second Day Air',
          sub_subtype: 'second_day_air',
          subtype: 'parcel',
          type: 'transport',
        },
        {
          amount: '1.00',
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
          amount: '1.00',
          amount_currency: 'USD',
          included_services: [],
          is_requested: false,
          is_required: true,
          name: 'Strongbox',
          sub_subtype: 'strongbox',
          subtype: 'packing_materials',
          type: 'packing',
        },
      ],
      optional_services: [
        {
          amount: '1.00',
          amount_currency: 'USD',
          included_services: [],
          name: 'Signature Required',
          sub_subtype: 'signature_delivery',
          subtype: 'delivery',
          type: 'location',
        },
        {
          amount: '1.00',
          amount_currency: 'USD',
          included_services: [],
          name: 'Building COI (origin)',
          sub_subtype: 'origin_building_coi',
          subtype: 'coi',
          type: 'administration',
        },
        {
          amount: '1.00',
          amount_currency: 'USD',
          included_services: [],
          name: 'Condition Check (origin)',
          sub_subtype: 'origin_condition_check',
          subtype: 'condition',
          type: 'handling',
        },
      ],
      quote_type: 'parcel',
      status: 'published',
      total: '3.00',
      total_currency: 'USD',
    },
    {
      id: 1743965,
      included_insurance_policy: null,
      included_services: [
        {
          amount: '1.00',
          amount_currency: 'USD',
          included_services: [],
          is_requested: false,
          is_required: true,
          name: 'Ground',
          sub_subtype: 'ground',
          subtype: 'parcel',
          type: 'transport',
        },
        {
          amount: '1.00',
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
          amount: '1.00',
          amount_currency: 'USD',
          included_services: [],
          is_requested: false,
          is_required: true,
          name: 'Strongbox',
          sub_subtype: 'strongbox',
          subtype: 'packing_materials',
          type: 'packing',
        },
      ],
      optional_services: [
        {
          amount: '1.00',
          amount_currency: 'USD',
          included_services: [],
          name: 'Signature Required',
          sub_subtype: 'signature_delivery',
          subtype: 'delivery',
          type: 'location',
        },
        {
          amount: '1.00',
          amount_currency: 'USD',
          included_services: [],
          name: 'Building COI (origin)',
          sub_subtype: 'origin_building_coi',
          subtype: 'coi',
          type: 'administration',
        },
        {
          amount: '1.00',
          amount_currency: 'USD',
          included_services: [],
          name: 'Condition Check (origin)',
          sub_subtype: 'origin_condition_check',
          subtype: 'condition',
          type: 'handling',
        },
      ],
      quote_type: 'parcel',
      status: 'published',
      total: '3.00',
      total_currency: 'USD',
    },
    {
      id: 1743964,
      included_insurance_policy: null,
      included_services: [
        {
          amount: '1.00',
          amount_currency: 'USD',
          included_services: [],
          is_requested: false,
          is_required: true,
          name: 'Specialized Shuttle',
          sub_subtype: 'specialized_shuttle',
          subtype: 'specialized',
          type: 'transport',
        },
        {
          amount: '1.00',
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
          amount: '1.00',
          amount_currency: 'USD',
          included_services: [],
          is_requested: false,
          is_required: true,
          name: 'Bubble & Cardboard',
          sub_subtype: 'bubble_cardboard',
          subtype: 'packing_materials',
          type: 'packing',
        },
      ],
      optional_services: [
        {
          amount: '1.00',
          amount_currency: 'USD',
          included_services: [],
          name: 'Building COI (destination)',
          sub_subtype: 'destination_building_coi',
          subtype: 'coi',
          type: 'administration',
        },
        {
          amount: '1.00',
          amount_currency: 'USD',
          included_services: [],
          name: 'Signature Required',
          sub_subtype: 'signature_delivery',
          subtype: 'delivery',
          type: 'location',
        },
        {
          amount: '1.00',
          amount_currency: 'USD',
          included_services: [
            {
              name: 'Soft Packed Disposal',
              sub_subtype: 'soft_packed_disposal',
              subtype: 'debris_disposal',
              type: 'handling',
            },
          ],
          name: 'Debris Disposal',
          sub_subtype: 'debris_disposal',
          subtype: 'debris_disposal',
          type: 'handling',
        },
        {
          amount: '1.00',
          amount_currency: 'USD',
          included_services: [],
          name: 'Installation',
          sub_subtype: 'installation',
          subtype: 'installation',
          type: 'handling',
        },
        {
          amount: '1.00',
          amount_currency: 'USD',
          included_services: [],
          name: 'Condition Report (destination)',
          sub_subtype: 'destination_full_condition_report',
          subtype: 'condition',
          type: 'handling',
        },
        {
          amount: '1.00',
          amount_currency: 'USD',
          included_services: [],
          name: 'Handling (destination)',
          sub_subtype: 'destination_additional_labor',
          subtype: 'handling',
          type: 'handling',
        },
        {
          amount: '1.00',
          amount_currency: 'USD',
          included_services: [],
          name: 'Condition Check (destination)',
          sub_subtype: 'destination_condition_check',
          subtype: 'condition',
          type: 'handling',
        },
        {
          amount: '1.00',
          amount_currency: 'USD',
          included_services: [
            {
              name: 'Unpacking Soft Materials (destination)',
              sub_subtype: 'destination_unpacking_soft',
              subtype: 'unpacking',
              type: 'handling',
            },
          ],
          name: 'Unpacking (destination)',
          sub_subtype: 'destination_unpacking',
          subtype: 'unpacking',
          type: 'handling',
        },
        {
          amount: '1.00',
          amount_currency: 'USD',
          included_services: [],
          name: 'Placement',
          sub_subtype: 'placement',
          subtype: 'installation',
          type: 'handling',
        },
        {
          amount: '1.00',
          amount_currency: 'USD',
          included_services: [],
          name: 'Double Blind BOLs',
          sub_subtype: 'double_blind_bols',
          subtype: 'administration',
          type: 'administration',
        },
        {
          amount: '1.00',
          amount_currency: 'USD',
          included_services: [],
          name: 'Condition Report (origin)',
          sub_subtype: 'origin_full_condition_report',
          subtype: 'condition',
          type: 'handling',
        },
        {
          amount: '1.00',
          amount_currency: 'USD',
          included_services: [],
          name: 'Deinstallation',
          sub_subtype: 'deinstallation',
          subtype: 'deinstallation',
          type: 'handling',
        },
        {
          amount: '1.00',
          amount_currency: 'USD',
          included_services: [],
          name: 'Condition Check (origin)',
          sub_subtype: 'origin_condition_check',
          subtype: 'condition',
          type: 'handling',
        },
        {
          amount: '1.00',
          amount_currency: 'USD',
          included_services: [],
          name: 'Building COI (origin)',
          sub_subtype: 'origin_building_coi',
          subtype: 'coi',
          type: 'administration',
        },
      ],
      quote_type: 'premium',
      status: 'published',
      total: '3.00',
      total_currency: 'USD',
    },
  ],
  shipping_notes: null,
  shortcode: 'TEST-R27ZUW',
  status: 'quoted',
  updated_at: '2022-11-18T11:15:40.706245',
};
