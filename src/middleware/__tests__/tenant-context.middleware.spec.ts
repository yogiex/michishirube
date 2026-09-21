import { NextFunction, Request, Response } from 'express';
import { TenantContextMiddleware } from '../tenant-context.middleware.js';

function makeReq(overrides: Partial<Request> = {}): Request {
  return { headers: {}, ...overrides } as Request;
}

describe('TenantContextMiddleware', () => {
  let middleware: TenantContextMiddleware;

  beforeEach(() => {
    middleware = new TenantContextMiddleware();
  });

  it('sets tenantId from X-Tenant-ID header', () => {
    const req = makeReq({ headers: { 'x-tenant-id': 't_123' } });

    middleware.use(req, {} as Response, (() => {}) as NextFunction);

    expect(req.tenantId).toBe('t_123');
  });

  it('leaves tenantId undefined when header is absent', () => {
    const req = makeReq();

    middleware.use(req, {} as Response, (() => {}) as NextFunction);

    expect(req.tenantId).toBeUndefined();
  });

  it('ignores duplicate headers', () => {
    const req = makeReq({
      headers: { 'x-tenant-id': ['t_1', 't_2'] } as unknown as Record<string, string>,
    });

    middleware.use(req, {} as Response, (() => {}) as NextFunction);

    expect(req.tenantId).toBeUndefined();
  });
});