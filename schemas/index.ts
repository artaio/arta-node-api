import { z } from 'zod';

export const datedSchema = z.object({
  updated_at: z.date(),
  created_at: z.date(),
});

export function createPaginatedResponseSchema<T extends z.ZodTypeAny>(
  itemSchema: T,
) {
  return z.object({
    metadata: z.object({
      page: z.number(),
      page_size: z.number(),
      total_count: z.number(),
    }),
    items: z.array(itemSchema),
  });
}

const numId = z.number().int().positive();

export const keySchema = datedSchema.extend({
  id: numId,
  name: z.string().nullable(),
  is_testing: z.boolean(),
  token: z.string(),
});

export const supportedCurrencySchema = z.enum([
  'CAD',
  'CHF',
  'EUR',
  'GBP',
  'HKD',
  'USD',
]);
export const additionalServiceSchema = z.enum([
  'assembly',
  'debris_disposal',
  'deinstallation',
  'destination_additional_labor',
  'destination_building_coi',
  'destination_condition_check',
  'destination_full_condition_report',
  'destination_unpacking',
  'double_blind_bols',
  'installation',
  'origin_building_coi',
  'origin_condition_check',
  'origin_full_condition_report',
  'placement',
  'signature_delivery',
  'tarmac_supervision',
]);

export const accessRetrictionSchema = z.enum([
  'elevator_only',
  'freight_elevator',
  'loading_dock',
  'loading_dock_low',
  'low_clearance',
  'non_paved',
  'stairs_only',
  'steep_gradient',
]);

const packingSubTypeSchema = z.enum([
  'alcohol_case',
  'lay_flat_wine_box',
  'blanket',
  'wardrobe_box',
  'cardboard_box',
  'chandelier_box',
  'chair_box',
  'cbin_closed',
  'cbin_open',
  'ply_box',
  'fine_art_econo_crate',
  'fine_art_international_crate',
  'econo_crate',
  'international_econo_crate',
  'furniture_crate',
  'international_furniture_crate',
  'parcel_crate',
  'museum_crate',
  'international_museum_crate',
  'foam_lined_box',
  'cavity_box',
  'strongbox',
  'double_box',
  'travel_frame',
  'travel_frame_art',
  'travel_frame_other',
  'a_frame',
  'slat_crate',
  'tri_wall_crate',
  'lockbox',
  'no_packing',
  'pallet',
  'international_pallet',
  'portfolio',
  'rug_rolled',
  'shadow_box',
  'slipcase',
  'slipcase_glass_tape',
  'poly_cardboard',
  'bubble_cardboard',
  'garment_bag',
  'poly_only',
  'dartek_only',
  'bubble_only',
  'cling_wrap',
  'cbin_communal',
  'sonotube',
  'stabilizing_box',
  'shipping_tube_small',
  'shipping_tube_large',
]);

const objectMaterialSchema = z.enum([
  'stone_marble',
  'precious_stones',
  'fiber_synthetic',
  'fabric_natural',
  'taxidermy',
  'carbon_fiber',
  'live_animal',
  'paper',
  'glass',
  'presious_metals',
  'particleboard',
  'styrofoam',
  'wood',
  'photo_film',
  'sand',
  'metal',
  'plexiglass',
  'aquatic_life',
  'canvas',
  'drywall',
  'hard_plastic',
  'vinyl',
  'soft_plastic',
  'leather',
  'rubber',
  'concreate',
  'paint',
  'electronics',
  'fiber_natural',
  'gas',
  'fabric_synthetic',
  'CITES',
  'liquids',
  'salts',
]);

const objectSubTypeSchema = z.enum([
  'painting_unframed',
  'painting_framed',
  'painting_framed_plexi',
  'painting_framed_glass',
  'work_on_paper_unframed',
  'work_on_paper_framed',
  'work_on_paper_framed_plexi',
  'work_on_paper_framed_glass',
  'mixed_media_unframed',
  'mixed_media_framed',
  'mixed_media_framed_plexi',
  'mixed_media_framed_glass',
  'photograph_unframed',
  'photograph_framed',
  'photograph_framed_plexi',
  'photograph_framed_glass',
  'new_media',
  'sculpture',
  'pedestal',
  'pedestal_case_glass',
  'pedestal_case_plexi',
  'ceramic',
  'neon',
  'tapestry',
  'other_art',
  'table',
  'chair',
  'sofa_loveseat_chaise',
  'floor_lamp',
  'floor_lamp_shade',
  'table_lamp',
  'table_lamp_shade',
  'sconce',
  'ottoman',
  'bookcase_storage',
  'nightstand',
  'armoire_dresser',
  'carpet_rug',
  'mirror',
  'chandelier',
  'bedframe',
  'headboard',
  'desk_vanity',
  'media_console',
  'other_furniture',
  'earrings',
  'necklace',
  'bracelet',
  'ring',
  'brooch',
  'watch',
  'cufflinks',
  'eyeglasses',
  'set',
  'precious_stones',
  'snuff_box_cigarette_case',
  'other_jewelry',
  'vase_vessel',
  'bowl',
  'plaque',
  'object_of_vertu',
  'candelabra_candlestick',
  'dinnerware',
  'flatware',
  'glassware',
  'serveware',
  'porcelain_plate',
  'porcelain_bowl',
  'tabletop_accessory',
  'clock',
  'other_decorative_arts',
  'stamp',
  'book',
  'coin',
  'document_manuscript',
  'toy',
  'miniature_model',
  'figurine_doll',
  'neon_sign',
  'memorabilia',
  'camera_electrical',
  'other_collectibles',
  'wine_bottle',
  'spirits_bottle',
  'beer_bottle',
  'wine_case',
  'spirits_case',
  'beer_case',
  'wine_barrel',
  'spirits_barrel',
  'beer_barrel',
  'other_alcohols',
  'car',
  'motorcycle',
  'bus',
  'van',
  'limousine',
  'carriage',
  'trailer',
  'sidecar',
  'other_automotive',
  'clothing',
  'footwear',
  'handbag',
  'accessories',
  'other_fashion',
  'musical_instrument',
  'firearm_weapon',
  'hunting_fishing',
  'medical_equipment',
  'other',
]);

export const quoteTypeSchema = z.enum([
  'parcel',
  'premium',
  'select',
  'self_ship',
]);
export const disqualificationResonSchema = z.enum([
  'cannot_be_packed',
  'client_timeout_reached',
  'external_service_unavailable',
  'object_not_supported',
  'out_of_network',
  'over_size',
  'over_value',
  'over_volume',
  'over_weight',
  'requested_service_unavailable',
  'too_many_items',
  'under_value',
  'under_volume',
  'under_weight',
]);
export const insuranceSchema = z.enum([
  'arta_transit_insurance',
  'no_arta_insurance',
]);
export const paymentProcessSchema = z.enum([
  'checkout',
  'checkout_direct',
  'invoicing',
]);
export const quoteRequestStatusSchema = z.enum([
  'cancelled',
  'closed',
  'disqualified',
  'expired',
  'in_progress',
  'pending',
  'quoted',
]);

export const contactSchema = z.object({
  name: z.string(),
  email_address: z.string().nullish(),
  phone_number: z.string().nullish(),
});

export const detailsSchema = z.object({
  materials: z.array(objectMaterialSchema).nullish(),
  creation_date: z.string().nullish(),
  creator: z.string().nullish(),
  notes: z.string().nullish(),
  title: z.string().nullish(),
  is_fragile: z.boolean().nullish(),
  is_cites: z.boolean().nullish(),
});

const zodNumberOrString = z.union([z.number(), z.string()]);

export const artaObjectSchema = z.object({
  internal_reference: z.string().nullish(),
  current_packing: z.array(packingSubTypeSchema).nullish(),
  details: detailsSchema.nullish(),
  height: zodNumberOrString,
  width: zodNumberOrString,
  weight: zodNumberOrString.nullish(),
  value: zodNumberOrString,
  depth: zodNumberOrString.nullish(),
  images: z.array(z.string()).nullish(),
  public_reference: z.string().nullish(),
  subtype: objectSubTypeSchema,
  unit_of_measurement: z.string().nullish(),
  weight_unit: z.string().nullish(),
  value_currency: supportedCurrencySchema,
});

export const artaLocationSchema = z.object({
  access_restrictions: z.array(accessRetrictionSchema).nullish(),
  address_line_1: z.string().nullish(),
  address_line_2: z.string().nullish(),
  address_line_3: z.string().nullish(),
  city: z.string().nullish(),
  region: z.string().nullish(),
  postal_code: z.string().nullish(),
  country: z.string(),
  title: z.string().nullish(),
  contacts: z.array(contactSchema).nullish(),
  estimated_country: z.string().optional(),
  estimated_region: z.string().optional(),
  estimated_city: z.string().optional(),
});

export const disqualificationSchema = z.object({
  quote_types: z.array(quoteTypeSchema),
  reason: z.string().nullish(),
  reason_code: disqualificationResonSchema,
});

export const artaTrackingServiceSubSubTypeSchema = z.string();

const artaTrackingServiceTypeSchema = z.enum([
  'transport',
  'location',
  'handling',
  'packing',
  'storage',
  'administration',
  'taxes_duties_fees',
  'security',
  'equipment',
]);

const artaTrackingServiceSubTypeSchema = z.enum([
  'specialized',
  'consolidated',
  'freight',
  'parcel',
  'collection',
  'delivery',
  'location',
  'unpacking',
  'condition',
  'installation',
  'deinstallation',
  'debris_disposal',
  'site_visit',
  'handling',
  'packing',
  'packing_materials',
  'receive_release',
  'warehouse',
  'customs',
  'coi',
  'administration',
  'taxes_duties',
  'fees',
  'security',
  'equipment',
]);

export const insurancePolicySchema = z.object({
  amount: z.number(),
  amount_currency: supportedCurrencySchema,
  id: z.string(),
  insured_value: z.number(),
  insured_value_currency: supportedCurrencySchema,
});

export const artaServiceSchema = z.object({
  amount: z.number(),
  amount_currency: supportedCurrencySchema,
  is_requested: z.boolean().optional(),
  is_required: z.boolean().optional(),
  name: z.string(),
  sub_subtype: artaTrackingServiceSubSubTypeSchema,
  subtype: artaTrackingServiceSubTypeSchema,
  type: artaTrackingServiceTypeSchema,
  included_services: z.array(z.any()),
});

export const quoteSchema = z.object({
  id: z.number(),
  included_services: z.array(artaServiceSchema),
  included_insurance_policy: insurancePolicySchema.nullish(),
  optional_services: z.array(artaServiceSchema),
  quote_type: quoteTypeSchema,
  status: z.string(),
  total: z.number(),
  total_currency: supportedCurrencySchema,
});

export const tagSchema = datedSchema.extend({
  id: z.string().uuid(),
  created_by: z.number().nullish(),
  description: z.string().nullish(),
  name: z.string(),
  updated_by: z.number().nullish(),
  color: z.string(),
  is_active: z.boolean(),
});

export const requestListItemSchema = datedSchema.extend({
  id: z.string().uuid(),
  bookable: z.object({
    missing: z.array(z.string()),
    ready: z.boolean(),
  }),
  destination: artaLocationSchema,
  hosted_session_id: z.number().nullable(),
  insurance: insuranceSchema.nullable(),
  internal_reference: z.string().nullable(),
  log_request_id: z.string(),
  object_count: z.number().nullable(),
  origin: artaLocationSchema,
  public_reference: z.string().nullish(),
  quote_types: z.array(quoteTypeSchema),
  shortcode: z.string(),
  status: quoteRequestStatusSchema,
  tags: z.array(tagSchema),
});

export const requestSchema = requestListItemSchema.extend({
  currency: supportedCurrencySchema,
  additional_services: z.array(additionalServiceSchema),
  disqualifications: z.array(disqualificationSchema),
  objects: z.array(artaObjectSchema),
  payment_process: paymentProcessSchema,
  preferred_quote_types: z.array(quoteTypeSchema).nullish(),
  shipping_notes: z.string().nullish(),
  quotes: z.array(quoteSchema),
});

export const paymentContextSchema = z.enum(['hosted_checkout', 'invoiced']);

export const paymentSchema = datedSchema.extend({
  id: numId,
  amount: z.number(),
  amount_currency: supportedCurrencySchema,
  context: paymentContextSchema,
  paid_on: z.date(),
});

export const shipmentExceptionStatusSchema = z.enum([
  'in_progress',
  'new',
  'resolved',
]);

export const packageStatusSechema = z.enum([
  'pending',
  'transit',
  'out_for_delivery',
  'delivered',
  'unknown',
  'notfound',
  'undelivered',
  'exception',
  'expired',
]);

export const packageSchema = z.object({
  depth: z.number(),
  eta: z.string().nullish(),
  handle_with_care: z.boolean(),
  height: z.number(),
  id: numId,
  is_sufficiently_packed: z.boolean(),
  objects: z.array(artaObjectSchema),
  packing_materials: z.array(packingSubTypeSchema),
  status: packageStatusSechema.nullish(),
  unit_of_measurement: z.string().nullish(),
  weight: z.number(),
  weight_unit: z.string(),
  width: z.number(),
});

export const shipmentExceptionTypeIdSchema = z.enum([
  'change_of_address_request',
  'customs_information_required',
  'damaged_items',
  'direct_payment_required',
  'held_at_customs',
  'inaccurate_object_details',
  'incorrect_address',
  'lost_in_transit',
  'not_ready_for_delivery',
  'not_ready_for_release',
  'other',
  'prepayment_required',
  'requested_hold_to_collect',
  'requested_hold_to_deliver',
  'wrong_item',
]);

export const shipmentExceptionSchema = datedSchema.extend({
  exception_type_label: z.string().nullish(),
  id: z.string().uuid(),
  package_id: z.number().nullish(),
  resolution: z.string().nullish(),
  status: shipmentExceptionStatusSchema,
  type: shipmentExceptionTypeIdSchema,
});

export const shipmentScheduleSchema = z.object({
  delivery_end: z.date().nullish(),
  delivery_start: z.date().nullish(),
  delivery_window_modifier: z.string(),
  pickup_end: z.date().nullish(),
  pickup_start: z.date().nullish(),
  pickup_window_modifier: z.string(),
});

export const shipmentTrackingSchema = z.object({
  carrier_name: z.string(),
  label_url: z.string().nullish(),
  package_id: z.number(),
  tracking_number: z.string(),
  url: z.string(),
});

export const eeiFormStatusSchema = z.enum([
  'pending',
  'cleared',
  'approved',
  'rejected',
  'submitted',
]);

export const shipmentStatusSchema = z.enum([
  'pending',
  'confirmed',
  'collected',
  'in_transit',
  'completed',
]);

export const shipmentSchema = datedSchema.extend({
  id: z.string().uuid(),
  destination: artaLocationSchema,
  eei_form_status: eeiFormStatusSchema.nullish(),
  eei_form_url: z.string().nullish(),
  emissions: z.number().nullish(),
  emissions_unit: z.string().nullish(),
  exceptions: z.array(shipmentExceptionSchema).nullish(),
  hosted_session_id: z.number().nullish(),
  insurance_policy: insurancePolicySchema.nullish(),
  internal_reference: z.string().nullish(),
  log_request_id: z.string().nullish(),
  object_count: z.number(),
  origin: artaLocationSchema,
  package_count: z.number(),
  packages: z.array(packageSchema).nullish(),
  payment_process: paymentProcessSchema.nullish(),
  public_reference: z.string().nullish(),
  quote_type: quoteTypeSchema,
  schedule: shipmentScheduleSchema.nullish(),
  services: z.array(artaServiceSchema).nullish(),
  shipping_notes: z.string().nullish(),
  shortcode: z.string(),
  status: shipmentStatusSchema,
  total: z.number(),
  total_currency: supportedCurrencySchema,
  url: z.string().nullish(),
  tracking: z.array(shipmentTrackingSchema).nullish(),
});

export const attatchmentSchema = datedSchema.extend({
  id: numId,
  upload_id: numId,
  request_id: z.string().nullish(),
  shipment_id: z.string().nullish(),
});

export const emailNotificationIdSchema = z.enum([
  'booking',
  'cancelled',
  'collected',
  'collection',
  'complete',
  'custom_quoted_dashboard',
  'in_transit',
  'invoice',
  'self_ship_label',
  'payment',
  'scheduling',
  'eei',
]);

export const recipientSchema = z.enum(['payer', 'origin', 'destination']);

export const emailRuleSchema = datedSchema.extend({
  id: numId,
  email_notification_id: emailNotificationIdSchema,
  recipients: z.array(recipientSchema),
});

export const emailSubscriptionSchema = datedSchema.extend({
  id: numId,
  email_notification_ids: z.array(emailNotificationIdSchema),
  email_address: z.string(),
  name: z.string().nullish(),
});

export const hostedSessionSchema = datedSchema.extend({
  id: numId,
  additional_services: z.array(additionalServiceSchema).nullish(),
  cancel_url: z.string().nullish(),
  destination: artaLocationSchema.nullish(),
  insurance: insuranceSchema.nullish(),
  internal_reference: z.string().nullish(),
  objects: z.array(artaObjectSchema),
  origin: artaLocationSchema,
  preferred_quote_types: z.array(quoteTypeSchema).nullish(),
  public_reference: z.string().nullish(),
  shipping_notes: z.string().nullish(),
  success_url: z.string().nullish(),
  payment_process: paymentProcessSchema,
  private_token: z.string(),
  shortcode: z.string(),
  status: quoteRequestStatusSchema,
  url: z.string().nullish(),
});

export const invoicePaymentSchema = datedSchema.extend({
  id: numId,
  amount: z.number(),
  amount_currency: supportedCurrencySchema,
  credit_id: z.string().nullish(),
  invoice_id: z.string().nullish(),
  paid_on: z.date(),
  payment_id: z.string().nullish(),
  shipment_id: z.string().nullish(),
});

export const invoiceSchema = datedSchema.extend({
  id: numId,
  amount_owed: z.number(),
  amount_owed_currency: supportedCurrencySchema,
  amount_paid: z.number(),
  amount_paid_currency: supportedCurrencySchema,
  issued_on: z.date().nullish(),
  shipment_id: z.string().nullish(),
  status: z.string(),
  updated_at: z.date(),
  invoice_url: z.string().nullish(),
});

export const logSchema = datedSchema.extend({
  id: numId,
  api_key_id: numId,
  arta_version: z.string(),
  end_at: z.date(),
  method: z.string(),
  path: z.string(),
  query_params: z.string(),
  request_body: z.string().nullish(),
  request_id: z.string(),
  response_body: z.string().nullish(),
  start_at: z.date(),
  status: z.number(),
});

export const organizationSchema = datedSchema.extend({
  api_version: z.string(),
  id: numId,
  name: z.string(),
  billing_terms: z.string().nullish(),
  company_name: z.string().nullish(),
  display_name: z.string().nullish(),
  shortcode: z.string().nullish(),
  status: z.string().nullish(),
  stripe_customer_id: z.string().nullish(),
});

export const carrierSchema = z.object({
  code: z.string(),
  name: z.string(),
  phone_number: z.string(),
  url: z.string(),
});

export const trackingEventSchema = z.object({
  date: z.date(),
  location: z.string(),
  summary: z.string(),
});

export const trackingSchema = z.object({
  carrier: carrierSchema,
  events: z.array(trackingEventSchema),
  status: z.string(),
  tracking_number: z.string(),
});

export const documentTypeSchema = z.enum([
  'bill_of_lading',
  'certificate_of_insurance',
  'certificate_of_insurance_template',
  'condition_report',
  'condition_check',
  'image',
  'instructions',
  'airway_bill',
  'commercial_invoice',
  'power_of_attorney',
  'proof_of_export',
  'proof_of_delivery',
  'quote',
  'shipping_label',
  'other',
]);

export const mimeTypeSchema = z.enum([
  'application/pdf',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/png',
  'text/csv',
  'video/mp4',
  'video/quicktime',
  'application/msword',
]);

export const uploadSchema = datedSchema.extend({
  id: numId,
  document_type: documentTypeSchema,
  document_type_label: z.string().nullish(),
  download_url: z.string().nullish(),
  file_name: z.string(),
  mime_type: mimeTypeSchema,
  size: z.number(),
  status: z.string(),
  presigned_url: z.string(),
});

export const webhookResourceTypeSchema = z.enum([
  'ping',
  'request',
  'shipment',
]);
export const webhookDeliveryStatusSchema = z.enum(['delivered', 'failed']);

export const webhookDeliveryTypeSchema = z.enum([
  'request.created',
  'request.status.updated',
  'shipment.created',
  'shipment.eei_form_status.updated',
  'shipment.schedule.updated',
  'shipment.status.updated',
  'shipment.tracking.updated',
  'ping',
]);

export const webhookDeliverySchema = datedSchema.extend({
  id: z.string().uuid(),
  resource_id: numId,
  resource_type: webhookResourceTypeSchema,
  response_status_code: z.number(),
  status: webhookDeliveryStatusSchema,
  type: webhookDeliveryTypeSchema,
  webhook_id: numId,
  webhook_url: z.string(),
  next_retry: z.string().nullish(),
  request_body: z.string().nullish(),
  response_body: z.string().nullish(),
});

export const webhookSchema = datedSchema.extend({
  id: numId,
  name: z.string(),
  url: z.string(),
});
