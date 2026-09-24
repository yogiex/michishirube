import { SetMetadata } from '@nestjs/common';

export const IDEMPOTENT_KEY = 'idempotency';

export interface IdempotencyOptions {
  readonly ttlSeconds?: number;
  readonly maxResponseBytes?: number;
}

export const Idempotent = (options: IdempotencyOptions = {}): MethodDecorator & ClassDecorator =>
  SetMetadata(IDEMPOTENT_KEY, options);
