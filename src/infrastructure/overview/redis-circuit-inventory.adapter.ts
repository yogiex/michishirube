import { Inject, Injectable, Logger } from '@nestjs/common';
import type { Redis } from 'ioredis';
import { z } from 'zod';
import { REDIS_CLIENT } from '@/infrastructure/redis/redis.constants.js';
import type { CircuitOverviewPort } from '@/core/overview/domain/overview-stats.port.js';
import { CIRCUIT_STATUSES, type CircuitEntry } from '@/core/overview/domain/overview.entity.js';
import { CIRCUIT_KEY_PREFIX, SCAN_COUNT, SCAN_PATTERN } from './overview.constants.js';

const StateSchema = z.object({
  state: z.enum(CIRCUIT_STATUSES).default('closed'),
  failures: z.coerce.number().int().min(0).default(0),
  openedAt: z.coerce.number().int().min(0).default(0),
});

@Injectable()
export class RedisCircuitInventoryAdapter implements CircuitOverviewPort {
  private readonly logger = new Logger(RedisCircuitInventoryAdapter.name);

  constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) {}

  async listCircuits(): Promise<readonly CircuitEntry[]> {
    try {
      const keys = await this.scanKeys();
      const entries: CircuitEntry[] = [];
      for (const key of keys) {
        const entry = await this.readEntry(key);
        if (entry !== undefined) entries.push(entry);
      }
      return entries.sort((left, right) => left.key.localeCompare(right.key));
    } catch (cause) {
      this.logger.warn({ err: cause }, 'Failed to list circuit inventory');
      return [];
    }
  }

  private async scanKeys(): Promise<string[]> {
    const keys: string[] = [];
    let cursor = '0';
    do {
      const [next, found] = await this.redis.scan(
        cursor,
        'MATCH',
        SCAN_PATTERN,
        'COUNT',
        SCAN_COUNT,
      );
      cursor = next;
      keys.push(...found);
    } while (cursor !== '0');
    return keys;
  }

  private async readEntry(key: string): Promise<CircuitEntry | undefined> {
    const raw = await this.redis.hgetall(key);
    const parsed = StateSchema.safeParse(raw);
    if (!parsed.success) return undefined;
    const circuitKey = key.slice(CIRCUIT_KEY_PREFIX.length);
    if (circuitKey.length === 0) return undefined;
    return {
      key: circuitKey,
      status: parsed.data.state,
      failureCount: parsed.data.failures,
      openedAtMs: parsed.data.openedAt,
    };
  }
}
