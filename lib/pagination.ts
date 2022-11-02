export interface PageMetada {
  page: number;
  page_size: number;
  total_count: number;
}

export interface Page<T> {
  items: T[];
  metadata: PageMetada;
}
