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

const api = vi.hoisted(() => ({
  get: vi.fn(),
  post: vi.fn(),
  patch: vi.fn(),
  delete: vi.fn(),
}));

vi.mock('../client', () => ({ api }));

beforeEach(() => {
  api.get.mockReset();
  api.post.mockReset();
  api.patch.mockReset();
  api.delete.mockReset();
});

describe('admin API endpoint contracts', () => {
  it('lists routes through the admin collection with query options', () => {
    listRoutes({ page: 2, search: 'orders' });
    expect(api.get).toHaveBeenCalledWith('/admin/routes', { query: { page: 2, search: 'orders' } });
  });

  it('encodes route IDs for item operations and uses the expected methods', () => {
    getRoute('route/with space');
    createRoute({ path: '/orders', method: 'POST', upstream: 'http://orders' });
    updateRoute('route-1', { enabled: false });
    deleteRoute('route-2');
    reloadRoutes();

    expect(api.get).toHaveBeenCalledWith('/admin/routes/route%2Fwith%20space', undefined);
    expect(api.post).toHaveBeenCalledWith(
      '/admin/routes',
      { path: '/orders', method: 'POST', upstream: 'http://orders' },
      undefined,
    );
    expect(api.patch).toHaveBeenCalledWith('/admin/routes/route-1', { enabled: false }, undefined);
    expect(api.delete).toHaveBeenCalledWith('/admin/routes/route-2', undefined);
    expect(api.post).toHaveBeenCalledWith('/admin/routes/reload', undefined, undefined);
  });

  it('uses the RFC problem-details-compatible admin overview path', () => {
    getOverview();
    expect(api.get).toHaveBeenCalledWith('/admin/overview', undefined);
  });
});
