import { Inject, Injectable, Logger } from '@nestjs/common';
import type { CacheConfig } from '../domain/cache-config.vo.js';
import type { CachedResponse } from '../domain/cache-entry.entity.js';
import { CACHE_STORE, type CacheStorePort } from '../domain/cache-store.port.js';

export interface GetFromCacheInput {
  readonly key: string;
  readonly config: CacheConfig;
}

export type GetFromCacheOutput =
  | { readonly kind: 'hit'; readonly response: CachedResponse; readonly stale: boolean }
  | { readonly kind: 'miss' };

@Injectable()
export class GetFromCacheUseCase {
  private readonly logger = new Logger(GetFromCacheUseCase.name);

  constructor(@Inject(CACHE_STORE) private readonly store: CacheStorePort) {}

  async execute(input: GetFromCacheInput): Promise<GetFromCacheOutput> {
    const result = await this.store.get(input);

    if (result.kind === 'error') {
      this.logger.warn({ reason: result.reason }, 'Cache lookup error — treating as miss');
      return { kind: 'miss' };
    }

    if (result.kind === 'miss') return { kind: 'miss' };

    return { kind: 'hit', response: result.entry, stale: result.stale };
  }
}
