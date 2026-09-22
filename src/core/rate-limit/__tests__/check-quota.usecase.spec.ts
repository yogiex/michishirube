import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { CheckQuotaUseCase } from '../application/check-quota.usecase.js';
import type { RateLimiterPort } from '../domain/rate-limiter.port.js';
import { RateLimitExceededError } from '@/shared/errors/index.js';
import { createPrincipal } from '@/core/auth/domain/principal.entity.js';
import { createTenantId } from '@/core/tenant/domain/tenant-id.vo.js';

type CheckMany = RateLimiterPort['checkMany'];

function makeLimiter(): {
  check: Mock<RateLimiterPort['check']>;
  checkMany: Mock<CheckMany>;
} {
  return {
    check: vi.fn(),
    checkMany: vi.fn().mockResolvedValue({
      allowed: true,
      limit: 100,
      remaining: 99,
      resetAt: 1758448800,
      retryAfter: 0,
    }),
  };
}

describe('CheckQuotaUseCase', () => {
  let limiter: ReturnType<typeof makeLimiter>;
  let uc: CheckQuotaUseCase;

  beforeEach(() => {
    limiter = makeLimiter();
    uc = new CheckQuotaUseCase(limiter);
  });

  it('allowed → return result', async () => {
    const result = await uc.execute({
      ip: '1.2.3.4',
      route: 'GET /orders',
      policy: { ip: { limit: 100, windowSec: 60 } },
    });
    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(99);
  });

  it('builds checks: ip + user + tenant + route', async () => {
    const principal = createPrincipal({
      userId: 'u_001',
      tenantId: 'acme',
      roles: [],
      scopes: [],
      expiresAt: new Date(Date.now() + 3600_000),
    });

    await uc.execute({
      ip: '1.2.3.4',
      principal,
      tenantId: createTenantId('acme'),
      route: 'GET /orders',
      policy: {
        ip: { limit: 100, windowSec: 60 },
        user: { limit: 1000, windowSec: 60 },
        tenant: { limit: 10000, windowSec: 60 },
        route: { limit: 500, windowSec: 60 },
      },
    });

    const checks = limiter.checkMany.mock.calls[0][0];
    expect(checks).toHaveLength(4);
    expect(checks[0].dimension).toBe('ip:1.2.3.4');
    expect(checks[1].dimension).toBe('user:u_001');
    expect(checks[2].dimension).toBe('tenant:acme');
    expect(checks[3].dimension).toBe('route:GET /orders');
  });

  it('skip user/tenant jika tidak ada', async () => {
    await uc.execute({
      ip: '1.2.3.4',
      route: 'GET /x',
      policy: {
        ip: { limit: 100, windowSec: 60 },
        user: { limit: 1000, windowSec: 60 },
        tenant: { limit: 10000, windowSec: 60 },
      },
    });

    const checks = limiter.checkMany.mock.calls[0][0];
    expect(checks).toHaveLength(1);
    expect(checks[0].dimension).toMatch(/^ip:/);
  });

  it('throw RateLimitExceededError jika tidak allowed', async () => {
    limiter.checkMany.mockResolvedValue({
      allowed: false,
      limit: 100,
      remaining: 0,
      resetAt: Math.floor(Date.now() / 1000) + 30,
      retryAfter: 30,
    });

    await expect(
      uc.execute({
        ip: '1.2.3.4',
        route: 'GET /x',
        policy: { ip: { limit: 100, windowSec: 60 } },
      }),
    ).rejects.toThrow(RateLimitExceededError);
  });

  it('error menyertakan retryAfter', async () => {
    limiter.checkMany.mockResolvedValue({
      allowed: false,
      limit: 100,
      remaining: 0,
      resetAt: 1758448830,
      retryAfter: 30,
    });

    try {
      await uc.execute({
        ip: '1.2.3.4',
        route: 'GET /x',
        policy: { ip: { limit: 100, windowSec: 60 } },
      });
    } catch (err) {
      expect((err as RateLimitExceededError).retryAfter).toBe(30);
    }
  });

  it('allowed jika policy kosong', async () => {
    const result = await uc.execute({
      ip: '1.2.3.4',
      route: 'GET /x',
      policy: { ip: { limit: 100, windowSec: 60 } },
    });
    expect(result.allowed).toBe(true);
  });
});
