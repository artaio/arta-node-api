import type { RestClient } from '../../lib/net/RestClient';
import * as helper from './helper';
import { MetadataEndpoint } from '../../lib/endpoint/metadata';

describe('tests logs Arta endpoint', () => {
  const path = 'metadata';
  let clientMock: RestClient;
  let endpoint: MetadataEndpoint;

  beforeEach(() => {
    jest.resetAllMocks();
    clientMock = helper.getRestMock({});
    endpoint = new MetadataEndpoint(clientMock);
  });

  it('should have metadata methods', async () => {
    await endpoint.apiVersions();
    expect(clientMock.get).lastCalledWith(`/${path}/api_versions`, undefined);

    await endpoint.currencies();
    expect(clientMock.get).lastCalledWith(`/${path}/currencies`, undefined);

    await endpoint.emailNotifications();
    expect(clientMock.get).lastCalledWith(
      `/${path}/email_notifications`,
      undefined,
    );

    await endpoint.insurances();
    expect(clientMock.get).lastCalledWith(`/${path}/insurances`, undefined);

    await endpoint.locationAccessRestrictions();
    expect(clientMock.get).lastCalledWith(
      `/${path}/location_access_restrictions`,
      undefined,
    );

    await endpoint.objectMaterials();
    expect(clientMock.get).lastCalledWith(
      `/${path}/object_materials`,
      undefined,
    );

    await endpoint.objects();
    expect(clientMock.get).lastCalledWith(`/${path}/objects`, undefined);

    await endpoint.packageStatuses();
    expect(clientMock.get).lastCalledWith(
      `/${path}/package_statuses`,
      undefined,
    );

    await endpoint.packings();
    expect(clientMock.get).lastCalledWith(`/${path}/packings`, undefined);

    await endpoint.parcelTransportServices();
    expect(clientMock.get).lastCalledWith(
      `/${path}/parcel_transport_services`,
      undefined,
    );

    await endpoint.paymentProcessTypes();
    expect(clientMock.get).lastCalledWith(
      `/${path}/payment_process_types`,
      undefined,
    );

    await endpoint.quotes();
    expect(clientMock.get).lastCalledWith(`/${path}/quotes`, undefined);

    await endpoint.requestStatuses();
    expect(clientMock.get).lastCalledWith(
      `/${path}/request_statuses`,
      undefined,
    );

    await endpoint.services();
    expect(clientMock.get).lastCalledWith(`/${path}/services`, undefined);

    await endpoint.shipmentExceptionTypes();
    expect(clientMock.get).lastCalledWith(
      `/${path}/shipment_exception_types`,
      undefined,
    );

    await endpoint.shipmentStatuses();
    expect(clientMock.get).lastCalledWith(
      `/${path}/shipment_statuses`,
      undefined,
    );
  });
});
