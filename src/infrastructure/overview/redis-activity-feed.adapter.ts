import { Inject, Injectable, Logger } from '@nestjs/common';
import type { Redis } from 'ioredis';
import { z } from 'zod';
import { REDIS_CLIENT } from '@/infrastructure/redis/redis.constants.js';
import type { ActivityFeedPort } from '@/core/overview/domain/overview-stats.port.js';
import { ACTIVITY_STATUSES, type ActivityItem } from '@/core/overview/domain/overview.entity.js';
import { AUDIT_RECENT_KEY, MAX_LATENCY_SAMPLES } from './overview.constants.js';

const ActivitySchema = z.object({
  id: z.string().min(1).max(128),
  timestamp: z.string().min(1).max(64),
  actor: z.string().min(1).max(128),
  action: z.string().min(1).max(128),
  target: z.string().max(256),
  status: z.enum(ACTIVITY_STATUSES),
});

@Injectable()
export class RedisActivityFeedAdapter implements ActivityFeedPort {
  private readonly logger = new Logger(RedisActivityFeedAdapter.name);

  constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) {}

  async listRecentActivity(limit: number): Promise<readonly ActivityItem[]> {
    try {
      const bounded = Math.max(0, Math.min(limit, MAX_LATENCY_SAMPLES));
      const raw = await this.redis.lrange(AUDIT_RECENT_KEY, 0, bounded - 1);
      const items: ActivityItem[] = [];
      for (const entry of raw) {
        const parsed = ActivitySchema.safeParse(decode(entry));
        if (parsed.success) items.push(parsed.data);
      }
      return items;
    } catch (cause) {
      this.logger.warn({ err: cause }, 'Failed to read recent activity');
      return [];
    }
  }
}

function decode(entry: string): unknown {
  try {
    return JSON.parse(entry) as unknown;
  } catch {
    return undefined;
  }
}
