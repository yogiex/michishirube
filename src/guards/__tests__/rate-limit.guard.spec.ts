import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ExecutionContext } from '@nestjs/common';
import type { Reflector } from '@nestjs/core';
import { RateLimitGuard } from '../rate-limit.guard.js';
import { CheckQuotaUseCase } from '@/core/rate-limit/application/check-quota.usecase.js';
import { RateLimitExceededError } from '@/shared/errors/index.js';

function makeCtx(req: unknown, res: unknown): ExecutionContext {
  return {
    getType: () => 'http',
    switchToHttp: () => ({
      getRequest: () => req,
      getResponse: () => res,
    }),
    getHandler: () => ({}),
    getClass: () => ({}),
  } as unknown as ExecutionContext;
}

function makeRes() {
  const headers: Record<string, string> = {};
  return {
    setHeader: vi.fn((k: string, v: string) => {
      headers[k] = v;
    }),
    headersSent: false,
    getHeaders: () => headers,
  };
}

function makeReflector(meta: Record<string, unknown>): Reflector {
  return {
    getAllAndOverride: vi.fn((key: string) => meta[key]),
  } as unknown as Reflector;
}

describe('RateLimitGuard', () => {
  let checkQuota: { execute: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    checkQuota = {
      execute: vi.fn().mockResolvedValue({
        allowed: true,
        limit: 100,
        remaining: 99,
        resetAt: 1758448800,
        retryAfter: 0,
      }),
    };
  });

  it('skip non-HTTP', async () => {
    const guard = new RateLimitGuard(checkQuota as unknown as CheckQuotaUseCase, makeReflector({}));
    const ctx = { getType: () => 'rpc' } as unknown as ExecutionContext;
    expect(await guard.canActivate(ctx)).toBe(true);
  });

  it('skip @Public()', async () => {
    const guard = new RateLimitGuard(
      checkQuota as unknown as CheckQuotaUseCase,
      makeReflector({ isPublic: true }),
    );
    const req = { ip: '1.2.3.4', method: 'GET', path: '/x' };
    expect(await guard.canActivate(makeCtx(req, makeRes()))).toBe(true);
    expect(checkQuota.execute).not.toHaveBeenCalled();
  });

  it('panggil use case untuk non-public', async () => {
    const guard = new RateLimitGuard(checkQuota as unknown as CheckQuotaUseCase, makeReflector({}));
    const req = { ip: '1.2.3.4', method: 'GET', path: '/x' };
    await guard.canActivate(makeCtx(req, makeRes()));
    expect(checkQuota.execute).toHaveBeenCalled();
  });

  it('set header X-RateLimit-*', async () => {
    const guard = new RateLimitGuard(checkQuota as unknown as CheckQuotaUseCase, makeReflector({}));
    const req = { ip: '1.2.3.4', method: 'GET', path: '/x' };
    const res = makeRes();
    await guard.canActivate(makeCtx(req, res));

    expect(res.setHeader).toHaveBeenCalledWith('x-ratelimit-limit', '100');
    expect(res.setHeader).toHaveBeenCalledWith('x-ratelimit-remaining', '99');
    expect(res.setHeader).toHaveBeenCalledWith('x-ratelimit-reset', '1758448800');
  });

  it('normalisasi IPv6-mapped IPv4', async () => {
    const guard = new RateLimitGuard(checkQuota as unknown as CheckQuotaUseCase, makeReflector({}));
    const req = { ip: '::ffff:1.2.3.4', method: 'GET', path: '/x' };
    await guard.canActivate(makeCtx(req, makeRes()));

    const call = checkQuota.execute.mock.calls[0][0];
    expect(call.ip).toBe('1.2.3.4');
  });

  it('propagate error dari use case', async () => {
    checkQuota.execute.mockRejectedValue(new RateLimitExceededError('x'));
    const guard = new RateLimitGuard(checkQuota as unknown as CheckQuotaUseCase, makeReflector({}));
    const req = { ip: '1.2.3.4', method: 'GET', path: '/x' };
    await expect(guard.canActivate(makeCtx(req, makeRes()))).rejects.toThrow(
      RateLimitExceededError,
    );
  });
});
