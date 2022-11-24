import { parseQueryParams } from '../lib/queryParams';

describe('tests query param parsing', () => {
  it('should parse empty object', () => {
    expect(parseQueryParams({})).toBe('');
  });

  it('should parse with page only', () => {
    expect(parseQueryParams({ page_size: 20 })).toBe('?page_size=20');
  });

  it('should parse with page and page size', () => {
    expect(parseQueryParams({ page_size: 20, page: 1 })).toBe(
      '?page_size=20&page=1'
    );
  });

  it('should parse with search only', () => {
    expect(parseQueryParams({ search: 'my-search-param' })).toBe(
      '?search=my-search-param'
    );
  });

  it('should parse with sarch, page and page size', () => {
    expect(
      parseQueryParams({ page_size: 20, page: 1, search: 'my-search-param' })
    ).toBe('?page_size=20&page=1&search=my-search-param');
  });
});
