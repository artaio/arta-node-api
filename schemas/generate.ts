
import { createTypeAlias, printNode, zodToTs } from 'zod-to-ts';
import { additionalServiceSchema, artaLocationSchema, artaObjectSchema, attatchmentSchema, contactSchema, emailNotificationIdSchema, emailRuleSchema, emailSubscriptionSchema, hostedSessionSchema, insurancePolicySchema, insuranceSchema, invoicePaymentSchema, invoiceSchema, keySchema, logSchema, packageSchema, packageStatusSechema, paymentSchema, quoteSchema, quoteTypeSchema, recipientSchema, requestListItemSchema, requestSchema, shipmentExceptionSchema, shipmentExceptionStatusSchema, shipmentExceptionTypeIdSchema, shipmentScheduleSchema, shipmentSchema, shipmentTrackingSchema, supportedCurrencySchema } from '.';
import type { Schema } from 'zod';

const generate = (schema: Schema, identifier: string) => {
    const { node } = zodToTs(schema, identifier);
    const typeAlias = createTypeAlias(node, identifier);
    console.log('export ' + printNode(typeAlias));
};

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


generate(additionalServiceSchema, 'AdditionalService');
generate(supportedCurrencySchema, 'SupportedCurrency');
generate(artaLocationSchema, 'ArtaLocation');
generate(insuranceSchema, 'Insurance');
generate(artaObjectSchema, 'ArtaObject');
generate(quoteTypeSchema, 'QuoteType');
generate(contactSchema, 'Contact');
generate(paymentSchema, 'Payment');
generate(shipmentExceptionStatusSchema, 'ShipmentExceptionStatus');
generate(packageStatusSechema, 'PackageStatus');
generate(packageSchema, 'Package');
generate(shipmentExceptionTypeIdSchema, 'ShipmentExceptionTypeId');
generate(shipmentExceptionSchema, 'ShipmentException');
generate(shipmentScheduleSchema, 'ShipmentSchedule');
generate(shipmentTrackingSchema, 'ShipmentTracking');
generate(insurancePolicySchema, 'InsurancePolicy');
generate(quoteSchema, 'Quote');
generate(requestListItemSchema, 'QuoteRequestListItem');
generate(emailNotificationIdSchema, 'EmailNotificationId');
generate(recipientSchema, 'Recipient');

