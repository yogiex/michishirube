import { Inject, Injectable, Logger } from '@nestjs/common';
import type { Redis } from 'ioredis';
import { REDIS_CLIENT } from '@/infrastructure/redis/redis.constants.js';
import type { OverviewStatsPort } from '@/core/overview/domain/overview-stats.port.js';
import type { RawCounters } from '@/core/overview/domain/overview.entity.js';
import { bucketFor, bucketRange, percentile } from './overview-bucket.js';
import {
  CIRCLE_HISTORY_MS,
  COUNTER_TTL_SEC,
  MAX_LATENCY_SAMPLES,
  MGET_BATCH_SIZE,
  STATS_ERRORS_KEY,
  STATS_LATENCY_SAMPLES_KEY,
  STATS_REQUESTS_KEY,
} from './overview.constants.js';

@Injectable()
export class RedisOverviewStatsAdapter implements OverviewStatsPort {
  private readonly logger = new Logger(RedisOverviewStatsAdapter.name);

  constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) {}

  async recordRequest(durationMs: number, isError: boolean): Promise<void> {
    const bucket = bucketFor(Date.now());
    const requestsKey = `${STATS_REQUESTS_KEY}:${bucket}`;
    const errorsKey = `${STATS_ERRORS_KEY}:${bucket}`;
    const sample = String(Math.max(0, Math.round(durationMs)));
    try {
      const pipeline = this.redis.pipeline();
      pipeline.incr(requestsKey);
      pipeline.expire(requestsKey, COUNTER_TTL_SEC);
      if (isError) {
        pipeline.incr(errorsKey);
        pipeline.expire(errorsKey, COUNTER_TTL_SEC);
      }
      pipeline.lpush(STATS_LATENCY_SAMPLES_KEY, sample);
      pipeline.ltrim(STATS_LATENCY_SAMPLES_KEY, 0, MAX_LATENCY_SAMPLES - 1);
      pipeline.expire(STATS_LATENCY_SAMPLES_KEY, COUNTER_TTL_SEC);
      await pipeline.exec();
    } catch (cause) {
      this.logger.warn({ err: cause }, 'Failed to record request stats');
    }
  }

  async getCounters24h(): Promise<RawCounters> {
    const now = Date.now();
    const current = bucketRange(now - CIRCLE_HISTORY_MS, now);
    const previous = bucketRange(now - 2 * CIRCLE_HISTORY_MS, now - CIRCLE_HISTORY_MS);
    const [requests24h, requestsPrev24h, errors24h, errorsPrev24h, latency] = await Promise.all([
      this.sumCounters(STATS_REQUESTS_KEY, current),
      this.sumCounters(STATS_REQUESTS_KEY, previous),
      this.sumCounters(STATS_ERRORS_KEY, current),
      this.sumCounters(STATS_ERRORS_KEY, previous),
      this.latencyPercentiles(),
    ]);
    return {
      requests24h,
      requestsPrev24h,
      errors24h,
      errorsPrev24h,
      latencyP95: percentile(latency, 0.95),
      latencyP99: percentile(latency, 0.99),
      latencyP95Prev: 0,
    };
  }

  private async sumCounters(prefix: string, buckets: readonly string[]): Promise<number> {
    let total = 0;
    try {
      for (let index = 0; index < buckets.length; index += MGET_BATCH_SIZE) {
        const batch = buckets
          .slice(index, index + MGET_BATCH_SIZE)
          .map((bucket) => `${prefix}:${bucket}`);
        const values = await this.redis.mget(...batch);
        for (const value of values) total += toCounter(value);
      }
    } catch (cause) {
      this.logger.warn({ err: cause, prefix }, 'Failed to sum counters');
      return 0;
    }
    return total;
  }

  private async latencyPercentiles(): Promise<number[]> {
    try {
      const samples = await this.redis.lrange(
        STATS_LATENCY_SAMPLES_KEY,
        0,
        MAX_LATENCY_SAMPLES - 1,
      );
      return samples
        .map((sample) => Number(sample))
        .filter((value) => Number.isFinite(value) && value >= 0)
        .sort((left, right) => left - right);
    } catch (cause) {
      this.logger.warn({ err: cause }, 'Failed to read latency samples');
      return [];
    }
  }
}

function toCounter(value: string | null): number {
  if (value === null) return 0;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}
