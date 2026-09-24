import { ApiError } from './client';

export type ErrorAction = 'login' | 'retry';

export interface ErrorActionHandlers {
  readonly onLogin?: () => void;
  readonly onRetry?: () => void;
}

export interface MappedApiError {
  readonly title: string;
  readonly message: string;
  readonly action?: ErrorAction;
}

const STATUS_MESSAGES: Readonly<Record<number, string>> = {
  400: 'Permintaan tidak valid. Periksa kembali data yang dikirim.',
  401: 'Sesi Anda telah berakhir. Silakan masuk kembali.',
  403: 'Anda tidak memiliki izin untuk melakukan tindakan ini.',
  404: 'Data yang diminta tidak ditemukan.',
  408: 'Permintaan terlalu lama. Silakan coba kembali.',
  409: 'Data sudah diperbarui oleh pengguna lain.',
  413: 'Data yang dikirim terlalu besar.',
  429: 'Terlalu banyak permintaan. Silakan coba kembali nanti.',
  500: 'Terjadi kesalahan internal. Silakan coba kembali.',
  502: 'Gateway tidak tersedia. Silakan coba kembali.',
  503: 'Layanan sedang tidak tersedia. Silakan coba kembali.',
  504: 'Waktu respons gateway habis. Silakan coba kembali.',
};

function getStatus(error: unknown): number | undefined {
  return error instanceof ApiError && Number.isInteger(error.status) ? error.status : undefined;
}

function getTitle(status: number | undefined): string {
  if (status === 401) return 'Unauthorized';
  if (status !== undefined && status >= 400 && status < 500) return 'Permintaan gagal';
  if (status !== undefined && status >= 500) return 'Layanan tidak tersedia';
  return 'Terjadi kesalahan';
}

function getMessage(error: unknown, status: number | undefined): string {
  if (status !== undefined && STATUS_MESSAGES[status]) return STATUS_MESSAGES[status];
  if (status === 0) return 'Tidak dapat terhubung ke API. Periksa koneksi Anda.';
  if (error instanceof Error && error.message) return error.message;
  return 'Permintaan tidak dapat diproses. Silakan coba kembali.';
}

function getAction(
  error: unknown,
  status: number | undefined,
  handlers: ErrorActionHandlers,
): ErrorAction | undefined {
  if (status === 401) return handlers.onLogin ? 'login' : undefined;
  if (
    handlers.onRetry &&
    (status === 0 || status === 408 || status === 429 || (status !== undefined && status >= 500))
  ) {
    return 'retry';
  }
  if (handlers.onRetry && error instanceof ApiError && error.problem?.retryable) return 'retry';
  return undefined;
}

export function mapApiError(error: unknown, handlers: ErrorActionHandlers = {}): MappedApiError {
  const status = getStatus(error);
  const action = getAction(error, status, handlers);

  return {
    title: getTitle(status),
    message: getMessage(error, status),
    ...(action ? { action } : {}),
  };
}

export function executeErrorAction(
  action: ErrorAction | undefined,
  handlers: ErrorActionHandlers,
): void {
  if (action === 'login') handlers.onLogin?.();
  if (action === 'retry') handlers.onRetry?.();
}
