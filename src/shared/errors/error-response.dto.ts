import { ErrorCodeValue } from './error-codes.js';
import { FieldError } from './domain-error.js';

export interface ProblemDetailsDto {
  /** URI referensi error */
  type: string;
  /** Judul singkat */
  title: string;
  /** HTTP status */
  status: number;
  /** Kode error stabil */
  code: ErrorCodeValue;
  /** Detail spesifik request ini */
  detail?: string;
  /** Path request */
  instance: string;
  /** ID unik request */
  requestId: string;
  /** ID tenant (jika ter-resolve) */
  tenantId?: string;
  /** Waktu kejadian (ISO 8601) */
  timestamp: string;
  /** Apakah aman untuk di-retry */
  retryable: boolean;
  /** Detik hingga retry berikutnya (untuk 429/503) */
  retryAfter?: number;
  /** Error per field (untuk validasi) */
  errors?: FieldError[];
  /** Trace ID untuk korelasi (opsional) */
  traceId?: string;
}

export interface ProblemDetailsOptions {
  baseUrl?: string;
  includeStack?: boolean;
}