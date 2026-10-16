import { SetMetadata } from '@nestjs/common';

export const CACHEABLE_KEY = 'cacheableConfig';

export type CacheableScope = 'public' | 'user' | 'tenant';

export interface CacheableOptions {
  readonly ttlSec?: number;
  readonly scope?: CacheableScope;
  readonly varyHeaders?: readonly string[];
  readonly staleWhileRevalidateSec?: number;
  readonly staleIfErrorSec?: number;
}

export const Cacheable = (options: CacheableOptions = {}): MethodDecorator & ClassDecorator =>
  SetMetadata(CACHEABLE_KEY, options);
