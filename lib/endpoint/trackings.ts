import { ArtaID } from '../ArtaClient';
import { RestClient } from '../net/RestClient';
import { createDateAsUTC } from '../utils';

export interface Carrier {
  code: string;
  name: string;
  phone_number: string;
  url: string;
}

export interface TrackingEvent {
  date: Date;
  location: string;
  summary: string;
}

export interface Tracking {
  carrier: Carrier;
  events: TrackingEvent[];
  status: string;
  tracking_number: string;
}

interface UnparsedTrackingEvent extends Omit<TrackingEvent, 'date'> {
  date: string;
}

interface UnparsedTracking extends Omit<Tracking, 'events'> {
  events: UnparsedTrackingEvent[];
}

export class TrackingsEndpoint {
  private readonly path = '/trackings';
  constructor(private readonly artaClient: RestClient) {}

  public async getById(id: ArtaID, auth?: string): Promise<Tracking> {
    const unparsedTracking = await this.artaClient.get<UnparsedTracking>(
      `${this.path}/${id}`,
      auth,
    );

    const parsedEvents = unparsedTracking.events.map((event) => ({
      ...event,
      date: createDateAsUTC(event.date),
    }));

    return { ...unparsedTracking, events: parsedEvents };
  }
}
