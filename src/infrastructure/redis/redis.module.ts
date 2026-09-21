import { Global, Module, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';
import { REDIS_CLIENT } from './redis.constants.js';

type RedisInstance = InstanceType<typeof Redis>;

@Global()
@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      inject: [ConfigService],
      useFactory: (config: ConfigService): RedisInstance => {
        const logger = new Logger('Redis');
        const client = new Redis({
          host: config.getOrThrow<string>('redis.host'),
          port: config.getOrThrow<number>('redis.port'),
          password: config.get<string>('redis.password') || undefined,
          db: config.get<number>('redis.db') ?? 0,
          keyPrefix: `${config.get<string>('redis.keyPrefix') ?? 'gw'}:`,
          lazyConnect: false,
          maxRetriesPerRequest: 3,
          enableReadyCheck: true,
          connectTimeout: 5_000,
          commandTimeout: 100,
          retryStrategy: (times: number) => Math.min(times * 200, 2_000),
        });

        client.on('connect', () => logger.log('Redis connected'));
        client.on('error', (err: Error) => logger.error({ err }, 'Redis error'));
        client.on('reconnecting', () => logger.warn('Redis reconnecting'));

        return client;
      },
    },
  ],
  exports: [REDIS_CLIENT],
})
export class RedisModule {}
