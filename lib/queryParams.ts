export interface QueryParameters {
  page?: number;
  page_size?: number;
  search?: string;
}

export const defaultQueryParams: QueryParameters = {
  page: 1,
  page_size: 20,
};

export const parseQueryParams = (params: QueryParameters) => {
  let parsedParams = '';
  for (const [key, value] of Object.entries(params)) {
    if (key && value) {
      if (parsedParams === '') {
        parsedParams = `?${key}=${value}`;
      } else {
        parsedParams += `&${key}=${value}`;
      }
    }
  }

  return parsedParams;
};
