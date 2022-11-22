export interface DatedInterface {
  updated_at?: Date;
  created_at: Date;
}

export function createDateAsUTC(dateStr: string) {
  const date = new Date(dateStr);
  const timestamp = Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds()
  );
  return new Date(timestamp);
}

export function convertDatesToUtc(artaResponse: any): any {
  if (artaResponse.updated_at) {
    artaResponse.updated_at = createDateAsUTC(artaResponse.updated_at);
  }
  artaResponse.created_at = createDateAsUTC(artaResponse.created_at);
  return artaResponse;
}

export type Nullable<T> = T | null;
export type NullableString = Nullable<string>;

export const parseService = (s: any): void => {
  s.amount = Number(s.amount);
  if (s.included_services) {
    s.included_services.forEach(parseService);
  }
};
