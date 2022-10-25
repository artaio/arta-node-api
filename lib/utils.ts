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

export type Nullable<T> = T | null;
export type NullableString = Nullable<string>;
