import { Page } from './pagination';

export interface DatedInterface {
  updated_at: Date;
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

export function convertDatesToUtc<T>(artaResponse: any): T & DatedInterface {
  artaResponse.updated_at = createDateAsUTC(artaResponse.updated_at);
  artaResponse.created_at = createDateAsUTC(artaResponse.created_at);
  return artaResponse;
}

export type Dated<T> = Omit<T, keyof DatedInterface> & DatedInterface;

type ListFunction<T> = (
  page?: number,
  pageSize?: number,
  auth?: string
) => Promise<Page<T>>;

export async function* listAsync<T>(list: ListFunction<T>, auth?: string) {
  let page = 1;
  let returned_elements = 0;
  let body: Page<T>;
  do {
    body = await list(page, 20, auth);
    page = (body.metadata.page as number) + 1;

    for (const item of body.items as T[]) {
      returned_elements++;
      yield item;
    }
  } while ((body.metadata.total_count as number) > returned_elements);
}
