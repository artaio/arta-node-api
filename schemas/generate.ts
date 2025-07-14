import { createTypeAlias, printNode, zodToTs } from 'zod-to-ts';
import {
  additionalServiceSchema,
  artaLocationSchema,
  artaObjectSchema,
  artaServiceSchema,
  attatchmentSchema,
  carrierSchema,
  componentSchema,
  contactSchema,
  detailsSchema,
  disqualificationSchema,
  documentTypeSchema,
  emailNotificationIdSchema,
  emailRuleSchema,
  emailSubscriptionSchema,
  hostedSessionSchema,
  insurancePolicySchema,
  insuranceSchema,
  invoicePaymentSchema,
  invoiceSchema,
  keySchema,
  logSchema,
  mimeTypeSchema,
  objectComponentsSchema,
  organizationSchema,
  packageSchema,
  packageStatusSechema,
  parcelTransportServicesSchema,
  paymentSchema,
  quoteSchema,
  quoteTypeSchema,
  quotingStrategySchema,
  recipientSchema,
  requestListItemSchema,
  requestSchema,
  shipmentExceptionSchema,
  shipmentExceptionStatusSchema,
  shipmentExceptionTypeIdSchema,
  shipmentScheduleSchema,
  shipmentSchema,
  shipmentTrackingSchema,
  supportedCurrencySchema,
  tagSchema,
  trackingEventSchema,
  trackingSchema,
  uploadSchema,
  webhookDeliverySchema,
  webhookSchema,
} from '.';
import type { Schema } from 'zod';

const generate = (schema: Schema, identifier: string) => {
  const { node } = zodToTs(schema, identifier);
  const typeAlias = createTypeAlias(node, identifier);
  console.log('export ' + printNode(typeAlias));
};

generate(tagSchema, 'Tag');
generate(attatchmentSchema, 'Attachment');
generate(requestSchema, 'QuoteRequest');
generate(keySchema, 'Key');
generate(shipmentSchema, 'Shipment');
generate(emailRuleSchema, 'EmailRule');
generate(emailSubscriptionSchema, 'EmailSubscription');
generate(hostedSessionSchema, 'HostedSession');
generate(invoicePaymentSchema, 'InvoicePayment');
generate(invoiceSchema, 'Invoice');
generate(logSchema, 'Log');
generate(organizationSchema, 'Organization');
generate(paymentSchema, 'Payment');
generate(carrierSchema, 'Carrier');
generate(trackingEventSchema, 'TrackingEvent');
generate(trackingSchema, 'Tracking');
generate(uploadSchema, 'Upload');
generate(webhookDeliverySchema, 'WebhookDelivery');
generate(webhookSchema, 'Webhook');

generate(artaServiceSchema, 'ArtaService');
generate(disqualificationSchema, 'Disqualification');
generate(detailsSchema, 'Detail');

generate(additionalServiceSchema, 'AdditionalService');
generate(supportedCurrencySchema, 'SupportedCurrency');
generate(artaLocationSchema, 'ArtaLocation');
generate(insuranceSchema, 'Insurance');
generate(artaObjectSchema, 'ArtaObject');
generate(quoteTypeSchema, 'QuoteType');
generate(contactSchema, 'Contact');
generate(shipmentExceptionStatusSchema, 'ShipmentExceptionStatus');
generate(packageStatusSechema, 'PackageStatus');
generate(packageSchema, 'Package');
generate(shipmentExceptionTypeIdSchema, 'ShipmentExceptionTypeId');
generate(shipmentExceptionSchema, 'ShipmentException');
generate(shipmentScheduleSchema, 'ShipmentSchedule');
generate(shipmentTrackingSchema, 'ShipmentTracking');
generate(insurancePolicySchema, 'InsurancePolicy');
generate(quoteSchema, 'Quote');
generate(quotingStrategySchema, 'QuotingStrategy');
generate(requestListItemSchema, 'QuoteRequestListItem');
generate(emailNotificationIdSchema, 'EmailNotificationId');
generate(recipientSchema, 'Recipient');
generate(mimeTypeSchema, 'ArtaMimeType');
generate(documentTypeSchema, 'ArtaDocumentType');
generate(parcelTransportServicesSchema, 'ParcelTransportServices');
generate(componentSchema, 'ArtaComponent');
generate(objectComponentsSchema, 'ArtaComponentType');
