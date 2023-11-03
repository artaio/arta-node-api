export interface DatedInterface {
  updated_at?: Date;
  created_at?: Date;
}

export interface UnparsedDatedInterface {
  updated_at?: string;
  created_at?: string;
}

export type NotDateParsed<T> = Omit<T, 'updated_at' | 'created_at'> &
  UnparsedDatedInterface;

export function createDateAsUTC(dateStr: string) {
  const date = new Date(dateStr);
  const timestamp = Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds(),
  );
  return new Date(timestamp);
}

export function convertDatesToUtc<T extends DatedInterface>(
  artaResponse: NotDateParsed<T>,
): T {
  return {
    ...artaResponse,
    created_at: artaResponse.created_at
      ? createDateAsUTC(artaResponse.created_at)
      : undefined,
    updated_at: artaResponse.updated_at
      ? createDateAsUTC(artaResponse.updated_at)
      : undefined,
  } as T;
}

export type Nullable<T> = T | null;
export type NullableString = Nullable<string>;

export const parseService = (s: any): void => {
  s.amount = Number(s.amount);
  if (s.included_services) {
    s.included_services.forEach(parseService);
  }
};
