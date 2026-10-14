import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  createRoute,
  deleteRoute,
  getRoute,
  listRoutes,
  reloadRoutes,
  updateRoute,
} from './routes';
import { getOverview } from './overview';
import { getMetrics } from './metrics';

const api = vi.hoisted(() => ({
  get: vi.fn(),
  post: vi.fn(),
  patch: vi.fn(),
  delete: vi.fn(),
}));

vi.mock('../client', async (importOriginal) => {
  const actual = await importOriginal();
  return { ...(actual as Record<string, unknown>), api };
});

beforeEach(() => {
  api.get.mockReset();
  api.post.mockReset();
  api.patch.mockReset();
  api.delete.mockReset();
});

describe('malformed response rejection', () => {
  it('rejects overview with missing fields', async () => {
    api.get.mockResolvedValue({ ok: true, data: { invalid: true } });
    const result = await getOverview();
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.code).toBe('GW_FRONTEND_MALFORMED_RESPONSE');
      expect(result.error.status).toBe(500);
    }
  });

  it('rejects overview with wrong types', async () => {
    api.get.mockResolvedValue({
      ok: true,
      data: {
        metrics: {
          requestsPerMin: 'not-a-number',
          errorRate: 0,
          p95Latency: 0,
          activeTenants: 0,
          series: [],
        },
        health: [],
        activity: [],
        topRoutes: [],
      },
    });
    const result = await getOverview();
    expect(result.ok).toBe(false);
  });

  it('rejects routes list with invalid items', async () => {
    api.get.mockResolvedValue({
      ok: true,
      data: {
        items: [
          {
            id: 'r_001',
            path: '/test',
            method: 'GET',
            upstream: 'not-a-url',
            enabled: true,
            requireAuth: false,
            createdAt: '2026-01-01T00:00:00Z',
          },
        ],
        total: 1,
        page: 1,
        limit: 20,
        totalPages: 1,
        hasNext: false,
        hasPrev: false,
      },
    });
    const result = await listRoutes();
    expect(result.ok).toBe(false);
  });

  it('rejects metrics with malformed series', async () => {
    api.get.mockResolvedValue({
      ok: true,
      data: {
        requestsPerMin: 100,
        errorRate: 0.1,
        p95Latency: 50,
        activeTenants: 5,
        series: [{ timestamp: 'invalid', requests: -1, errors: 0, p95: 0 }],
      },
    });
    const result = await getMetrics();
    expect(result.ok).toBe(false);
  });

  it('accepts valid overview response', async () => {
    const validOverview = {
      metrics: {
        requestsPerMin: 100,
        errorRate: 0.1,
        p95Latency: 50,
        activeTenants: 5,
        series: [],
      },
      health: [{ name: 'test', status: 'healthy', latencyMs: 1, endpoint: 'http://localhost' }],
      activity: [],
      topRoutes: [],
    };
    api.get.mockResolvedValue({ ok: true, data: validOverview });
    const result = await getOverview();
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.metrics.requestsPerMin).toBe(100);
    }
  });
});

describe('API error passthrough', () => {
  it('passes through API errors unchanged', async () => {
    api.get.mockResolvedValue({
      ok: false,
      error: Object.assign(new Error('Unauthorized'), { status: 401, code: 'UNAUTHORIZED' }),
    });
    const result = await getOverview();
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.status).toBe(401);
    }
  });

  it('handles null API response gracefully', async () => {
    api.get.mockResolvedValue(null);
    const result = await getOverview();
    expect(result.ok).toBe(false);
  });
});
