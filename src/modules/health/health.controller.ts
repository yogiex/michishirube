import { Controller, Get, Inject } from '@nestjs/common';
import { HealthCheck, HealthCheckService, HealthIndicatorResult } from '@nestjs/terminus';
import { Redis } from 'ioredis';
import { REDIS_CLIENT } from '@/infrastructure/redis/redis.constants.js';

type RedisInstance = InstanceType<typeof Redis>;

@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    @Inject(REDIS_CLIENT) private readonly redis: RedisInstance,
  ) {}

  @Get('live')
  @HealthCheck()
  live() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }

  @Get('ready')
  @HealthCheck()
  ready() {
    return this.health.check([() => this.checkRedis()]);
  }

  @Get()
  @HealthCheck()
  full() {
    return this.health.check([() => this.checkRedis()]);
  }

  private async checkRedis(): Promise<HealthIndicatorResult> {
    try {
      const pong = await this.redis.ping();
      const ok = pong === 'PONG';
      return { redis: { status: ok ? 'up' : 'down' } };
    } catch (err) {
      return { redis: { status: 'down', message: (err as Error).message } };
    }
  }
}
