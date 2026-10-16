import { Inject, Injectable, Logger } from '@nestjs/common';
import type { CacheConfig } from '../domain/cache-config.vo.js';
import { isCacheableMethod, isCacheableStatus } from '../domain/cache-config.vo.js';
import type { CachedResponse } from '../domain/cache-entry.entity.js';
import { CACHE_STORE, type CacheStorePort } from '../domain/cache-store.port.js';

export interface SaveToCacheInput {
  readonly key: string;
  readonly config: CacheConfig;
  readonly method: string;
  readonly status: number;
  readonly response: CachedResponse;
}

@Injectable()
export class SaveToCacheUseCase {
  private readonly logger = new Logger(SaveToCacheUseCase.name);

  constructor(@Inject(CACHE_STORE) private readonly store: CacheStorePort) {}

  async execute(input: SaveToCacheInput): Promise<void> {
    if (!isCacheableMethod(input.method)) return;
    if (!isCacheableStatus(input.status)) return;

    const bodySize = Buffer.byteLength(input.response.body, 'base64');
    if (input.config.skipIfLarger && bodySize > input.config.maxBodySize) {
      this.logger.debug(
        { key: input.key, size: bodySize, max: input.config.maxBodySize },
        'Response too large to cache — skipped',
      );
      return;
    }

    try {
      await this.store.save({
        key: input.key,
        config: input.config,
        response: input.response,
      });
    } catch (cause) {
      this.logger.warn({ err: cause, key: input.key }, 'Cache save failed');
    }
  }
}
