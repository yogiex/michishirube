import { randomUUID } from 'node:crypto';
import { ErrorCodeValue } from './error-codes.js';
import { ERROR_CATALOG } from './error-catalog.js';
import { DomainError } from './domain-error.js';
import { ProblemDetailsDto } from './error-response.dto.js';

export interface BuildProblemOptions {
  instance: string;
  requestId: string;
  tenantId?: string;
  traceId?: string;
  baseUrl?: string;
  isProduction: boolean;
  /** Override pesan detail dari error */
  detailOverride?: string;
  /** Retry after dari header upstream */
  retryAfter?: number;
}

const ERROR_BASE_URL = 'https://api.example.com/errors';

export function buildProblemDetails(
  error: DomainError,
  options: BuildProblemOptions,
): ProblemDetailsDto {
  const entry = ERROR_CATALOG[error.code as ErrorCodeValue];
  if (!entry) {
    throw new Error(`Unknown error code: ${error.code}`);
  }

  const baseUrl = options.baseUrl ?? ERROR_BASE_URL;
  const hideDetail = !!entry.hideDetailInProd && options.isProduction;

  const detail = hideDetail ? undefined : (options.detailOverride ?? error.detail ?? error.message);

  const retryAfter = options.retryAfter ?? error.retryAfter;

  const dto: ProblemDetailsDto = {
    type: `${baseUrl}/${error.code}`,
    title: entry.title,
    status: entry.status,
    code: error.code as ErrorCodeValue,
    instance: options.instance,
    requestId: options.requestId,
    timestamp: new Date().toISOString(),
    retryable: entry.retryable,
  };

  if (detail) dto.detail = detail;
  if (options.tenantId) dto.tenantId = options.tenantId;
  if (options.traceId) dto.traceId = options.traceId;
  if (retryAfter !== undefined) dto.retryAfter = retryAfter;
  if (error.fieldErrors.length > 0) dto.errors = error.fieldErrors;

  return dto;
}

/** Fallback untuk error yang tidak dikenal (bukan DomainError). */
export function buildUnknownProblem(
  options: BuildProblemOptions & { error: unknown },
): ProblemDetailsDto {
  const requestId = options.requestId || randomUUID();
  const dto: ProblemDetailsDto = {
    type: `${options.baseUrl ?? ERROR_BASE_URL}/GW_INTERNAL_ERROR`,
    title: 'Internal server error',
    status: 500,
    code: 'GW_INTERNAL_ERROR' as ErrorCodeValue,
    instance: options.instance,
    requestId,
    timestamp: new Date().toISOString(),
    retryable: false,
  };
  if (options.tenantId) dto.tenantId = options.tenantId;
  if (options.traceId) dto.traceId = options.traceId;
  if (!options.isProduction && options.error instanceof Error) {
    dto.detail = options.error.message;
  }
  return dto;
}
