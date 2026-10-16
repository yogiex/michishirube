import { Module, type DynamicModule, type Provider, type Type } from '@nestjs/common';
import { GetFromCacheUseCase } from './application/get-from-cache.usecase.js';
import { InvalidateCacheUseCase } from './application/invalidate-cache.usecase.js';
import { SaveToCacheUseCase } from './application/save-to-cache.usecase.js';
import { CACHE_STORE, type CacheStorePort } from './domain/cache-store.port.js';

export interface CacheModuleOptions {
  readonly store: Type<CacheStorePort>;
}

@Module({})
export class CacheModule {
  static register(options: CacheModuleOptions): DynamicModule {
    const providers: Provider[] = [
      options.store,
      { provide: CACHE_STORE, useExisting: options.store },
      GetFromCacheUseCase,
      SaveToCacheUseCase,
      InvalidateCacheUseCase,
    ];
    return {
      module: CacheModule,
      providers,
      exports: [CACHE_STORE, GetFromCacheUseCase, SaveToCacheUseCase, InvalidateCacheUseCase],
    };
  }
}
