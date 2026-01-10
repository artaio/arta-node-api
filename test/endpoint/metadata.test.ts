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
    expect(clientMock.get).toHaveBeenLastCalledWith(`/${path}/api_versions`, undefined);

    await endpoint.currencies();
    expect(clientMock.get).toHaveBeenLastCalledWith(`/${path}/currencies`, undefined);

    await endpoint.emailNotifications();
    expect(clientMock.get).toHaveBeenLastCalledWith(
      `/${path}/email_notifications`,
      undefined,
    );

    await endpoint.insurances();
    expect(clientMock.get).toHaveBeenLastCalledWith(`/${path}/insurances`, undefined);

    await endpoint.locationAccessRestrictions();
    expect(clientMock.get).toHaveBeenLastCalledWith(
      `/${path}/location_access_restrictions`,
      undefined,
    );

    await endpoint.objectMaterials();
    expect(clientMock.get).toHaveBeenLastCalledWith(
      `/${path}/object_materials`,
      undefined,
    );

    await endpoint.objects();
    expect(clientMock.get).toHaveBeenLastCalledWith(`/${path}/objects`, undefined);

    await endpoint.packageStatuses();
    expect(clientMock.get).toHaveBeenLastCalledWith(
      `/${path}/package_statuses`,
      undefined,
    );

    await endpoint.packings();
    expect(clientMock.get).toHaveBeenLastCalledWith(`/${path}/packings`, undefined);

    await endpoint.parcelTransportServices();
    expect(clientMock.get).toHaveBeenLastCalledWith(
      `/${path}/parcel_transport_services`,
      undefined,
    );

    await endpoint.paymentProcessTypes();
    expect(clientMock.get).toHaveBeenLastCalledWith(
      `/${path}/payment_process_types`,
      undefined,
    );

    await endpoint.quotes();
    expect(clientMock.get).toHaveBeenLastCalledWith(`/${path}/quotes`, undefined);

    await endpoint.quotingStrategies();
    expect(clientMock.get).toHaveBeenLastCalledWith(
      `/${path}/quoting_strategies`,
      undefined,
    );

    await endpoint.objectComponents();
    expect(clientMock.get).toHaveBeenLastCalledWith(
      `/${path}/object_components`,
      undefined,
    );

    await endpoint.requestStatuses();
    expect(clientMock.get).toHaveBeenLastCalledWith(
      `/${path}/request_statuses`,
      undefined,
    );

    await endpoint.services();
    expect(clientMock.get).toHaveBeenLastCalledWith(`/${path}/services`, undefined);

    await endpoint.shipmentExceptionTypes();
    expect(clientMock.get).toHaveBeenLastCalledWith(
      `/${path}/shipment_exception_types`,
      undefined,
    );

    await endpoint.shipmentStatuses();
    expect(clientMock.get).toHaveBeenLastCalledWith(
      `/${path}/shipment_statuses`,
      undefined,
    );
  });
});
