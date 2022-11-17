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

export class TrackingsEndpoint {
  private readonly path = '/trackings';
  constructor(private readonly artaClient: RestClient) {}

  public async getById(id: ArtaID, auth?: string): Promise<Tracking> {
    const tracking = await this.artaClient.get(`${this.path}/${id}`, auth);
    tracking.events.forEach((e: any) => {
      e.date = createDateAsUTC(e.date);
    });
    return tracking as Tracking;
  }
}
