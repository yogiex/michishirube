import { Inject, Injectable, Logger } from '@nestjs/common';
import { CacheKeyInvalidError } from '@/shared/errors/index.js';
import { CACHE_STORE, type CacheStorePort } from '../domain/cache-store.port.js';

export interface InvalidateCacheInput {
  readonly key?: string;
  readonly tenantId?: string;
  readonly pattern?: string;
}

const VALID_PATTERN = /^[A-Za-z0-9._:*?-]+$/;

@Injectable()
export class InvalidateCacheUseCase {
  private readonly logger = new Logger(InvalidateCacheUseCase.name);

  constructor(@Inject(CACHE_STORE) private readonly store: CacheStorePort) {}

  async execute(input: InvalidateCacheInput): Promise<number> {
    if (input.key) {
      await this.store.invalidate(input.key);
      return 1;
    }

    if (input.tenantId) {
      const count = await this.store.invalidateByTenant(input.tenantId);
      this.logger.log({ tenantId: input.tenantId, count }, 'Invalidated by tenant');
      return count;
    }

    if (input.pattern) {
      if (!VALID_PATTERN.test(input.pattern)) {
        throw new CacheKeyInvalidError('Pola invalidasi cache tidak valid');
      }
      const count = await this.store.invalidateByPattern(input.pattern);
      this.logger.log({ pattern: input.pattern, count }, 'Invalidated by pattern');
      return count;
    }

    return 0;
  }
}
