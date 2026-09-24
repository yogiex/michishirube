import { describe, expect, it, vi } from 'vitest';
import { createApiClient, MAX_TIMEOUT_MS } from './client';

const problem = {
  type: 'https://michishirube.dev/problems/rate-limit',
  title: 'Rate limit exceeded',
  status: 429,
  code: 'GW_RATE_LIMIT_TENANT_EXCEEDED',
  detail: 'Quota exceeded',
  instance: '/admin/routes',
  requestId: 'request-1',
  timestamp: '2026-09-24T12:00:00.000Z',
  retryable: true,
  retryAfter: 15,
} as const;

function jsonResponse(body: unknown, status = 200, headers?: HeadersInit): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', ...headers },
  });
}

describe('createApiClient', () => {
  it('returns successful JSON as an ApiResult', async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(jsonResponse({ id: 'route-1' }));
    const client = createApiClient({ baseUrl: 'https://api.example.com', fetcher });

    const result = await client.get<{ id: string }>('/admin/routes/route-1');

    expect(result).toEqual({ ok: true, data: { id: 'route-1' } });
    expect(fetcher).toHaveBeenCalledWith(
      'https://api.example.com/admin/routes/route-1',
      expect.objectContaining({ method: 'GET' }),
    );
  });

  it.each([204, 205])('returns no data for RFC no-content status %i', async (status) => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response(null, { status }));
    const client = createApiClient({ fetcher });

    await expect(client.delete<void>('/admin/routes/1')).resolves.toEqual({
      ok: true,
      data: undefined,
    });
  });

  it('returns problem details and Retry-After without throwing', async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(
      jsonResponse(problem, 429, {
        'content-type': 'application/problem+json',
        'retry-after': '30',
      }),
    );
    const client = createApiClient({ fetcher });

    const result = await client.get('/admin/routes');

    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.error.status).toBe(429);
    expect(result.error.code).toBe('GW_RATE_LIMIT_TENANT_EXCEEDED');
    expect(result.error.retryAfterSeconds).toBe(30);
    expect(result.error.problem).toEqual(problem);
  });

  it('parses an HTTP-date Retry-After value', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-09-24T12:00:00.000Z'));
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(
      jsonResponse(problem, 503, {
        'content-type': 'application/problem+json',
        'retry-after': 'Fri, 24 Sep 2026 12:00:45 GMT',
      }),
    );
    const client = createApiClient({ fetcher });

    const result = await client.get('/admin/routes');

    vi.useRealTimers();
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.retryAfterSeconds).toBe(45);
  });

  it('returns network errors as ApiResult failures', async () => {
    const fetcher = vi.fn<typeof fetch>().mockRejectedValue(new TypeError('connection failed'));
    const client = createApiClient({ fetcher });

    const result = await client.get('/admin/routes');

    expect(result).toMatchObject({
      ok: false,
      error: { status: 0, code: 'NETWORK_ERROR' },
    });
  });

  it('bounds timeout requests to the maximum duration', async () => {
    vi.useFakeTimers();
    const fetcher = vi.fn<typeof fetch>(
      (_input, init) =>
        new Promise((_resolve, reject) => {
          init?.signal?.addEventListener('abort', () =>
            reject(new DOMException('Aborted', 'AbortError')),
          );
        }),
    );
    const client = createApiClient({ fetcher });

    const request = client.get('/admin/routes', { timeoutMs: MAX_TIMEOUT_MS * 2 });
    await vi.advanceTimersByTimeAsync(MAX_TIMEOUT_MS);
    const result = await request;

    vi.useRealTimers();
    expect(result).toMatchObject({
      ok: false,
      error: { status: 408, code: 'REQUEST_TIMEOUT' },
    });
  });

  it('returns an aborted caller request without throwing', async () => {
    const controller = new AbortController();
    const fetcher = vi
      .fn<typeof fetch>()
      .mockRejectedValue(new DOMException('Aborted', 'AbortError'));
    const client = createApiClient({ fetcher });
    controller.abort();

    const result = await client.get('/admin/routes', { signal: controller.signal });

    expect(result).toMatchObject({
      ok: false,
      error: { status: 0, code: 'REQUEST_ABORTED' },
    });
    expect(fetcher).not.toHaveBeenCalled();
  });
});
