import { PaginationMetadata } from './generated';

export interface Page<T> {
  items: T[];
  metadata: PaginationMetadata;
}
