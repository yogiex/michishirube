import { Global, Module } from '@nestjs/common';
import { CacheModule } from '@/core/cache/cache.module.js';
import { RedisCacheAdapter } from './redis-cache.adapter.js';

@Global()
@Module({
  imports: [CacheModule.register({ store: RedisCacheAdapter })],
  exports: [CacheModule],
})
export class CacheInfrastructureModule {}
