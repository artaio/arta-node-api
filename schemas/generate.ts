
import { createTypeAlias, printNode, zodToTs } from 'zod-to-ts';
import { additionalServiceSchema, artaLocationSchema, artaObjectSchema, contactSchema, insurancePolicySchema, insuranceSchema, keySchema, packageSchema, packageStatusSechema, paymentSchema, quoteSchema, quoteTypeSchema, requestListItemSchema, requestSchema, shipmentExceptionSchema, shipmentExceptionStatusSchema, shipmentExceptionTypeIdSchema, shipmentScheduleSchema, shipmentSchema, shipmentTrackingSchema, supportedCurrencySchema } from '.';
import type { Schema } from 'zod';

const generate = (schema: Schema, identifier: string) => {
    const { node } = zodToTs(schema, identifier);
    const typeAlias = createTypeAlias(node, identifier);
    console.log('export ' + printNode(typeAlias));
};

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
generate(shipmentSchema, 'Shipment');
generate(insurancePolicySchema, 'InsurancePolicy');
generate(quoteSchema, 'Quote');
generate(keySchema, 'Key');
generate(requestListItemSchema, 'QuoteRequestListItem');
generate(requestSchema, 'QuoteRequest');






