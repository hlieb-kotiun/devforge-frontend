export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export const isUnauthorizedError = (error: unknown): boolean =>
  error instanceof ApiError && error.status === 401;
