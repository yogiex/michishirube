import type { Quota } from './quota.vo.js';

export const RATE_LIMITER = Symbol('RATE_LIMITER');

export interface RateLimitCheck {
  readonly dimension: string;
  readonly quota: Quota;
}

export interface RateLimitResult {
  readonly allowed: boolean;
  readonly limit: number;
  readonly remaining: number;
  readonly resetAt: number;
  readonly retryAfter: number;
}

export interface RateLimiterPort {
  check(check: RateLimitCheck): Promise<RateLimitResult>;
  checkMany(checks: readonly RateLimitCheck[]): Promise<RateLimitResult>;
}
