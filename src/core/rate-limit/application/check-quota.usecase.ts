import { Inject, Injectable, Logger } from '@nestjs/common';
import { RateLimitExceededError } from '@/shared/errors/index.js';
import type { TenantId } from '@/core/tenant/domain/tenant-id.vo.js';
import type { Principal } from '@/core/auth/domain/principal.entity.js';
import {
  RATE_LIMITER,
  type RateLimiterPort,
  type RateLimitResult,
} from '../domain/rate-limiter.port.js';
import type { Quota } from '../domain/quota.vo.js';

export interface RateLimitPolicy {
  readonly ip: Quota;
  readonly user?: Quota;
  readonly tenant?: Quota;
  readonly route?: Quota;
}

export interface CheckQuotaInput {
  readonly ip: string;
  readonly principal?: Principal;
  readonly tenantId?: TenantId;
  readonly route: string;
  readonly policy: RateLimitPolicy;
}

export interface CheckQuotaOutput {
  readonly allowed: boolean;
  readonly limit: number;
  readonly remaining: number;
  readonly resetAt: number;
  readonly retryAfter: number;
}

@Injectable()
export class CheckQuotaUseCase {
  private readonly logger = new Logger(CheckQuotaUseCase.name);

  constructor(@Inject(RATE_LIMITER) private readonly limiter: RateLimiterPort) {}

  async execute(input: CheckQuotaInput): Promise<CheckQuotaOutput> {
    const checks = this.buildChecks(input);
    if (checks.length === 0) {
      return { allowed: true, limit: 0, remaining: 0, resetAt: 0, retryAfter: 0 };
    }

    const result = await this.limiter.checkMany(checks);

    if (!result.allowed) {
      this.logger.warn(
        {
          ip: input.ip,
          userId: input.principal?.userId,
          tenantId: input.tenantId,
          route: input.route,
          limit: result.limit,
          resetAt: result.resetAt,
        },
        'Rate limit exceeded',
      );

      throw new RateLimitExceededError('Rate limit terlampaui', {
        detail: `Limit ${result.limit} request per window, coba lagi dalam ${result.retryAfter}s`,
        retryAfter: result.retryAfter,
        meta: {
          limit: result.limit,
          remaining: result.remaining,
          resetAt: result.resetAt,
          route: input.route,
        },
      });
    }

    return result;
  }

  private buildChecks(input: CheckQuotaInput) {
    const checks: { dimension: string; quota: Quota }[] = [];

    checks.push({
      dimension: `ip:${input.ip}`,
      quota: input.policy.ip,
    });

    if (input.policy.user && input.principal) {
      checks.push({
        dimension: `user:${input.principal.userId}`,
        quota: input.policy.user,
      });
    }

    if (input.policy.tenant && input.tenantId) {
      checks.push({
        dimension: `tenant:${input.tenantId}`,
        quota: input.policy.tenant,
      });
    }

    if (input.policy.route) {
      checks.push({
        dimension: `route:${input.route}`,
        quota: input.policy.route,
      });
    }

    return checks;
  }
}
