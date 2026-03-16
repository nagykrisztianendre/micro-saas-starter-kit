export type AppErrorCode =
  | 'VALIDATION_ERROR'
  | 'AUTH_REQUIRED'
  | 'AUTH_INVALID_CREDENTIALS'
  | 'AUTH_DUPLICATE_EMAIL'
  | 'ACCESS_DENIED'
  | 'NOT_FOUND'
  | 'BILLING_CONFIG_MISSING'
  | 'UNKNOWN_ERROR';

export class AppError extends Error {
  constructor(
    public readonly code: AppErrorCode,
    message: string,
    public readonly status = 400,
    public readonly expose = true,
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super('VALIDATION_ERROR', message, 400, true);
  }
}

export class AccessDeniedError extends AppError {
  constructor(message = 'You do not have access to this resource.') {
    super('ACCESS_DENIED', message, 403, true);
  }
}

export class AuthRequiredError extends AppError {
  constructor(message = 'Please log in to continue.') {
    super('AUTH_REQUIRED', message, 401, true);
  }
}

export function toUserMessage(error: unknown): string {
  if (error instanceof AppError && error.expose) return error.message;
  return 'Something went wrong. Please try again.';
}

export function toLogMessage(error: unknown): string {
  if (error instanceof Error) return `${error.name}: ${error.message}`;
  return String(error);
}
