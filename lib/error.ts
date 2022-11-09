export interface ArtaAPIError {
  errors: {
    [key: string]: string | string[];
  };
}

const parseArtaError = (apiError: ArtaAPIError): string => {
  let formattedArtaError = '';
  for (const key of Object.keys(apiError.errors)) {
    if (key === 'detail') {
      return `${apiError.errors['detail']}, `;
    } else if (Array.isArray(apiError.errors[key])) {
      for (const error of apiError.errors[key]) {
        formattedArtaError += `${key} ${error}, `;
      }
    } else {
      formattedArtaError += `${key} ${apiError.errors[key]}, `;
    }
  }

  return formattedArtaError;
};

export class ArtaSDKError extends Error {
  constructor(apiError: ArtaAPIError, status: number) {
    const keys = Object.keys(apiError.errors);

    if (keys.length === 0) {
      super(`Unknwon API error, HTTP status: ${status}`);
    } else {
      super(`${parseArtaError(apiError)}HTTP status: ${status}`);
    }

    Object.setPrototypeOf(this, ArtaSDKError.prototype);
  }
}
