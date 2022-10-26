export interface ArtaAPIError {
  errors: {
    detail: string;
  };
}

export class ArtaSDKError extends Error {
  constructor(apiError: ArtaAPIError, status: number) {
    super(
      `API communication error: ${apiError.errors.detail}, HTTP status: ${status}`
    );
    Object.setPrototypeOf(this, ArtaSDKError.prototype);
  }
}
