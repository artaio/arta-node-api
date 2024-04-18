import type { ArtaID } from '../ArtaClient';
import type { RestClient } from '../net/RestClient';
import type { Tracking, TrackingEvent } from '../types';
import { createDateAsUTC } from '../utils';
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
