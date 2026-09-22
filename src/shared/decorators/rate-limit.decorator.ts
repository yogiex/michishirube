import { SetMetadata } from '@nestjs/common';

export const RATE_LIMIT_KEY = 'rateLimitPolicy';

export interface RateLimitOptions {
  readonly ip: { limit: number; windowSec: number };
  readonly user?: { limit: number; windowSec: number };
  readonly tenant?: { limit: number; windowSec: number };
  readonly route?: { limit: number; windowSec: number };
}

export const RateLimit = (options: RateLimitOptions): MethodDecorator & ClassDecorator =>
  SetMetadata(RATE_LIMIT_KEY, options);
