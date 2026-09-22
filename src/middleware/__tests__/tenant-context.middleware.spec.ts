import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';

type Next = (err?: unknown) => void;
import type { Request, Response } from 'express';
import { TenantContextMiddleware } from '../tenant-context.middleware.js';
import type {
  ResolveTenantOutput,
  ResolveTenantUseCase,
} from '@/core/tenant/application/resolve-tenant.usecase.js';
import { createTenantId } from '@/core/tenant/domain/tenant-id.vo.js';
import type { Tenant } from '@/core/tenant/domain/tenant.entity.js';
import { TenantUnknownError } from '@/shared/errors/index.js';
import { RequestContextHolder } from '@/shared/context/request-context.js';

const tenant: Tenant = {
  id: createTenantId('acme'),
  slug: 'acme',
  name: 'Acme',
  status: 'active',
  tier: 'pro',
  createdAt: new Date(),
  updatedAt: new Date(),
};

function output(source: ResolveTenantOutput['source']): ResolveTenantOutput {
  return { tenant, tenantId: tenant.id, source };
}

function makeReq(over: Partial<Request> = {}): Request {
  return { hostname: 'localhost', headers: {}, id: 'req-1', ...over } as Request;
}

const res = {} as Response;

describe('TenantContextMiddleware', () => {
  let execute: Mock<ResolveTenantUseCase['execute']>;
  let mw: TenantContextMiddleware;

  beforeEach(() => {
    execute = vi.fn<ResolveTenantUseCase['execute']>();
    const uc: Pick<ResolveTenantUseCase, 'execute'> = { execute };
    mw = new TenantContextMiddleware(uc as ResolveTenantUseCase);
  });

  it('memanggil next() dan set req.tenantId jika sukses', async () => {
    execute.mockResolvedValue(output('header'));
    const req = makeReq({ headers: { 'x-tenant-id': 'acme' } });
    const next = vi.fn<Next>();

    await mw.use(req, res, next);

    expect(next).toHaveBeenCalledWith();
    expect(req.tenantId).toBe('acme');
  });

  it('tenantId tersedia di RequestContext selama next()', async () => {
    execute.mockResolvedValue(output('header'));
    let seen: string | undefined;
    const next = vi.fn<Next>(() => {
      seen = RequestContextHolder.getTenantId();
    });

    await mw.use(makeReq({ headers: { 'x-tenant-id': 'acme' } }), res, next);

    expect(seen).toBe('acme');
  });

  it('memanggil next(err) jika gagal', async () => {
    const err = new TenantUnknownError('x');
    execute.mockRejectedValue(err);
    const next = vi.fn<Next>();

    await mw.use(makeReq(), res, next);

    expect(next).toHaveBeenCalledWith(err);
  });

  it('ekstrak subdomain dari header host (dengan port)', async () => {
    execute.mockResolvedValue(output('subdomain'));
    await mw.use(makeReq({ headers: { host: 'ACME.api.example.com:3000' } }), res, vi.fn());
    expect(execute).toHaveBeenCalledWith({ subdomain: 'acme', headerTenantId: undefined });
  });

  it('fallback ke req.hostname jika header host tidak ada', async () => {
    execute.mockResolvedValue(output('subdomain'));
    await mw.use(makeReq({ hostname: 'beta.api.example.com' }), res, vi.fn());
    expect(execute).toHaveBeenCalledWith({ subdomain: 'beta', headerTenantId: undefined });
  });

  it.each(['localhost', '192.168.1.1', 'example.com', '[::1]'])(
    'tidak ekstrak subdomain dari %s',
    async (host) => {
      execute.mockResolvedValue(output('header'));
      await mw.use(makeReq({ headers: { host, 'x-tenant-id': 'acme' } }), res, vi.fn());
      expect(execute).toHaveBeenCalledWith({ subdomain: undefined, headerTenantId: 'acme' });
    },
  );

  it('menolak header terlalu panjang / kosong / duplikat', async () => {
    execute.mockResolvedValue(output('subdomain'));
    const cases: Request['headers'][] = [
      { 'x-tenant-id': 'a'.repeat(65) },
      { 'x-tenant-id': '' },
      { 'x-tenant-id': ['a', 'b'] },
    ];
    for (const headers of cases) {
      execute.mockClear();
      await mw.use(
        makeReq({ headers: { host: 'acme.api.example.com', ...headers } }),
        res,
        vi.fn(),
      );
      expect(execute).toHaveBeenCalledWith({ subdomain: 'acme', headerTenantId: undefined });
    }
  });
});
