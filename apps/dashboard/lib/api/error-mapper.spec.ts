import { describe, expect, it, vi } from 'vitest';
import { ApiError } from './client';
import { executeErrorAction, mapApiError } from './error-mapper';

describe('mapApiError', () => {
  it.each([
    [400, 'Permintaan gagal', 'Permintaan tidak valid. Periksa kembali data yang dikirim.'],
    [401, 'Unauthorized', 'Sesi Anda telah berakhir. Silakan masuk kembali.'],
    [403, 'Permintaan gagal', 'Anda tidak memiliki izin untuk melakukan tindakan ini.'],
    [404, 'Permintaan gagal', 'Data yang diminta tidak ditemukan.'],
    [429, 'Permintaan gagal', 'Terlalu banyak permintaan. Silakan coba kembali nanti.'],
    [500, 'Layanan tidak tersedia', 'Terjadi kesalahan internal. Silakan coba kembali.'],
    [503, 'Layanan tidak tersedia', 'Layanan sedang tidak tersedia. Silakan coba kembali.'],
  ])('maps HTTP %i to a safe status message', (status, title, message) => {
    const result = mapApiError(new ApiError(status, 'TEST_ERROR', 'Internal details'));

    expect(result).toEqual({ title, message });
  });

  it('maps network failures and unknown errors', () => {
    expect(mapApiError(new ApiError(0, 'NETWORK_ERROR', 'socket failed')).message).toBe(
      'Tidak dapat terhubung ke API. Periksa koneksi Anda.',
    );
    expect(mapApiError(new Error('Unexpected failure'))).toEqual({
      title: 'Terjadi kesalahan',
      message: 'Unexpected failure',
    });
  });
});

describe('error UI actions', () => {
  it('offers login only when a login handler is provided', () => {
    const onLogin = vi.fn();

    expect(mapApiError(new ApiError(401, 'AUTH_INVALID', 'Unauthorized')).action).toBeUndefined();
    expect(mapApiError(new ApiError(401, 'AUTH_INVALID', 'Unauthorized'), { onLogin }).action).toBe(
      'login',
    );
  });

  it.each([0, 408, 429, 500, 503])('offers retry for status %i', (status) => {
    expect(
      mapApiError(new ApiError(status, 'TEST_ERROR', 'Failed'), { onRetry: vi.fn() }).action,
    ).toBe('retry');
  });

  it('offers retry for a retryable problem response', () => {
    const error = new ApiError(400, 'TEST_ERROR', 'Failed', {
      type: 'https://michishirube.dev/problems/test',
      title: 'Test',
      status: 400,
      code: 'TEST_ERROR',
      instance: '/admin',
      requestId: 'request-1',
      timestamp: '2026-09-24T12:00:00.000Z',
      retryable: true,
    });

    expect(mapApiError(error, { onRetry: vi.fn() }).action).toBe('retry');
  });

  it('executes the selected UI action', () => {
    const onLogin = vi.fn();
    const onRetry = vi.fn();
    const handlers = { onLogin, onRetry };

    executeErrorAction('login', handlers);
    executeErrorAction('retry', handlers);
    executeErrorAction(undefined, handlers);

    expect(onLogin).toHaveBeenCalledOnce();
    expect(onRetry).toHaveBeenCalledOnce();
  });
});
