import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';
import type { Redis } from 'ioredis';
import { REDIS_CLIENT } from '@/infrastructure/redis/redis.constants.js';
import type {
  RateLimitCheck,
  RateLimiterPort,
  RateLimitResult,
} from '@/core/rate-limit/domain/rate-limiter.port.js';

const __dirname_esm = dirname(fileURLToPath(import.meta.url));

@Injectable()
export class RedisSlidingWindowAdapter implements RateLimiterPort, OnModuleInit {
  private readonly logger = new Logger(RedisSlidingWindowAdapter.name);
  private readonly prefix = 'rl';
  private scriptSha = '';
  private scriptSource = '';

  constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) {}

  async onModuleInit(): Promise<void> {
    try {
      const path = resolve(__dirname_esm, 'lua', 'sliding-window.lua');
      this.scriptSource = await readFile(path, 'utf8');
      this.scriptSha = (await this.redis.script('LOAD', this.scriptSource)) as string;
      this.logger.log('Sliding window Lua script loaded');
    } catch (err) {
      this.logger.error({ err }, 'Gagal load Lua script — rate limit akan fail-open');
    }
  }

  async check(check: RateLimitCheck): Promise<RateLimitResult> {
    try {
      return await this.eval(check);
    } catch (err) {
      this.logger.error({ err, dimension: check.dimension }, 'Rate limiter error — fail-open');
      return {
        allowed: true,
        limit: check.quota.limit,
        remaining: check.quota.limit,
        resetAt: Math.floor(Date.now() / 1000) + check.quota.windowSec,
        retryAfter: 0,
      };
    }
  }

  async checkMany(checks: readonly RateLimitCheck[]): Promise<RateLimitResult> {
    for (const check of checks) {
      const result = await this.check(check);
      if (!result.allowed) return result;
    }
    if (checks.length === 0) {
      return { allowed: true, limit: 0, remaining: 0, resetAt: 0, retryAfter: 0 };
    }
    return this.check(checks[checks.length - 1]!);
  }

  private async eval(check: RateLimitCheck): Promise<RateLimitResult> {
    const nowMs = Date.now();
    const windowMs = check.quota.windowSec * 1000;
    const key = `${this.prefix}:${check.dimension}`;
    const member = `${nowMs}-${randomUUID()}`;

    const raw = (await this.redis.evalsha(
      this.scriptSha,
      1,
      key,
      String(nowMs),
      String(windowMs),
      String(check.quota.limit),
      member,
    )) as [number, number, number];

    const [allowedNum, remaining, resetAtMs] = raw;
    const resetAt = Math.floor(resetAtMs / 1000);
    const nowSec = Math.floor(nowMs / 1000);
    const retryAfter = allowedNum === 1 ? 0 : Math.max(1, resetAt - nowSec);

    return {
      allowed: allowedNum === 1,
      limit: check.quota.limit,
      remaining,
      resetAt,
      retryAfter,
    };
  }
}
