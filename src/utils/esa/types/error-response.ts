export interface errorResponse {
  error: string
  message: string
}

export const implementsErrorResponse = (arg: unknown): arg is errorResponse => arg !== null &&
  arg !== undefined &&
  (arg as errorResponse).error !== undefined &&
  (arg as errorResponse).message !== undefined;
