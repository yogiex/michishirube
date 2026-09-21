import { ErrorCodeValue } from './error-codes.js';

export interface FieldError {
  field: string;
  code: string;
  message: string;
}

export interface DomainErrorOptions {
  detail?: string;
  cause?: unknown;
  fieldErrors?: FieldError[];
  retryAfter?: number;
  meta?: Record<string, unknown>;
}

/**
 * Base error untuk semua error domain gateway.
 * TIDAK bergantung pada NestJS / HTTP agar core tetap pure.
 */
export class DomainError extends Error {
  public readonly code: ErrorCodeValue;
  public readonly detail?: string;
  public readonly fieldErrors: FieldError[];
  public readonly retryAfter?: number;
  public readonly meta?: Record<string, unknown>;

  constructor(code: ErrorCodeValue, message: string, options: DomainErrorOptions = {}) {
    super(message);
    this.name = 'DomainError';
    this.code = code;
    this.detail = options.detail;
    this.fieldErrors = options.fieldErrors ?? [];
    this.retryAfter = options.retryAfter;
    this.meta = options.meta;

    if (options.cause instanceof Error) {
      (this as Error & { cause?: unknown }).cause = options.cause;
    }

    Error.captureStackTrace?.(this, DomainError);
  }

  toJSON(): Record<string, unknown> {
    return {
      code: this.code,
      message: this.message,
      detail: this.detail,
      fieldErrors: this.fieldErrors,
      retryAfter: this.retryAfter,
      meta: this.meta,
    };
  }
}
