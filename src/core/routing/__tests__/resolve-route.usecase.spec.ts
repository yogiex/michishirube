import { describe, it, expect, vi, type Mock } from 'vitest';
import { ResolveRouteUseCase } from '../application/resolve-route.usecase.js';
import type { RouteRepositoryPort } from '../domain/route.repository.port.js';
import type { Route } from '../domain/route.entity.js';
import { RouteNotFoundError, RouteDisabledError } from '@/shared/errors/index.js';

function makeRoute(over: Partial<Route> = {}): Route {
  return {
    id: 'r_1',
    path: '/api/v1/orders',
    method: 'GET',
    upstream: 'http://upstream.local',
    enabled: true,
    requireAuth: false,
    requireIdempotency: false,
    roles: [],
    timeoutMs: 5000,
    createdAt: '2026-01-01T00:00:00Z',
    ...over,
  };
}

type MockedRepo = { [K in keyof RouteRepositoryPort]: Mock<RouteRepositoryPort[K]> };

function makeRepo(routes: Route[]): MockedRepo {
  return {
    findAll: vi.fn<RouteRepositoryPort['findAll']>().mockResolvedValue(routes),
    reload: vi.fn<RouteRepositoryPort['reload']>().mockResolvedValue(undefined),
  };
}

describe('ResolveRouteUseCase', () => {
  it('exact match returns route', async () => {
    const routes = [makeRoute()];
    const uc = new ResolveRouteUseCase(makeRepo(routes));
    const out = await uc.execute({ path: '/api/v1/orders', method: 'GET' });
    expect(out.route.id).toBe('r_1');
  });

  it('empty repo throws RouteNotFoundError', async () => {
    const uc = new ResolveRouteUseCase(makeRepo([]));
    await expect(uc.execute({ path: '/x', method: 'GET' })).rejects.toThrow(RouteNotFoundError);
  });

  it('disabled route throws RouteDisabledError', async () => {
    const routes = [makeRoute({ enabled: false })];
    const uc = new ResolveRouteUseCase(makeRepo(routes));
    await expect(uc.execute({ path: '/api/v1/orders', method: 'GET' })).rejects.toThrow(
      RouteDisabledError,
    );
  });

  it('literal beats param', async () => {
    const routes = [
      makeRoute({ id: 'r_param', path: '/api/v1/orders/:id', method: 'GET' }),
      makeRoute({ id: 'r_lit', path: '/api/v1/orders/special', method: 'GET' }),
    ];
    const uc = new ResolveRouteUseCase(makeRepo(routes));
    const out = await uc.execute({ path: '/api/v1/orders/special', method: 'GET' });
    expect(out.route.id).toBe('r_lit');
  });

  it('param beats wildcard', async () => {
    const routes = [
      makeRoute({ id: 'r_wild', path: '/api/v1/orders/*', method: 'GET' }),
      makeRoute({ id: 'r_param', path: '/api/v1/orders/:id', method: 'GET' }),
    ];
    const uc = new ResolveRouteUseCase(makeRepo(routes));
    const out = await uc.execute({ path: '/api/v1/orders/42', method: 'GET' });
    expect(out.route.id).toBe('r_param');
  });

  it('method ALL matches POST', async () => {
    const routes = [makeRoute({ method: 'ALL' })];
    const uc = new ResolveRouteUseCase(makeRepo(routes));
    const out = await uc.execute({ path: '/api/v1/orders', method: 'POST' });
    expect(out.route.id).toBe('r_1');
  });

  it('GET beats ALL', async () => {
    const routes = [
      makeRoute({ id: 'r_all', method: 'ALL' }),
      makeRoute({ id: 'r_get', method: 'GET' }),
    ];
    const uc = new ResolveRouteUseCase(makeRepo(routes));
    const out = await uc.execute({ path: '/api/v1/orders', method: 'GET' });
    expect(out.route.id).toBe('r_get');
  });

  it('returns params', async () => {
    const routes = [makeRoute({ path: '/api/v1/orders/:id', method: 'GET' })];
    const uc = new ResolveRouteUseCase(makeRepo(routes));
    const out = await uc.execute({ path: '/api/v1/orders/42', method: 'GET' });
    expect(out.params).toEqual({ id: '42' });
  });

  it('returns wildcard', async () => {
    const routes = [makeRoute({ path: '/api/v1/*', method: 'GET' })];
    const uc = new ResolveRouteUseCase(makeRepo(routes));
    const out = await uc.execute({ path: '/api/v1/foo/bar', method: 'GET' });
    expect(out.wildcard).toBe('/foo/bar');
  });
});
