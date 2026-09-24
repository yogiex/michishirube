import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Redis } from 'ioredis';
import { z } from 'zod';
import type { CircuitBreakerConfig } from '@/core/circuit-breaker/domain/circuit-breaker-config.vo.js';
import type { CircuitBreakerPort } from '@/core/circuit-breaker/domain/circuit-breaker.port.js';
import type { CircuitState } from '@/core/circuit-breaker/domain/circuit-state.entity.js';
import type { CircuitBreakerResult } from '@/core/circuit-breaker/domain/circuit-breaker-result.type.js';
import { REDIS_CLIENT } from '@/infrastructure/redis/redis.constants.js';

const __dirname_esm = dirname(fileURLToPath(import.meta.url));
const KeySchema = z
  .string()
  .min(1)
  .max(160)
  .regex(/^[A-Za-z0-9._~-]+$/);
const StateResultSchema = z.object({
  status: z.enum(['closed', 'open', 'half_open']),
  failureCount: z.number().int().min(0),
  openedAtMs: z.number().int().min(0).optional(),
  successCount: z.number().int().min(0).optional(),
  inFlight: z.boolean().optional(),
});
interface Client {
  script(command: 'LOAD', script: string): Promise<unknown>;
  evalsha(
    sha: string,
    keys: number,
    key: string,
    operation: string,
    threshold: string,
    reset: string,
    now: string,
  ): Promise<unknown>;
}

@Injectable()
export class RedisCircuitBreakerAdapter implements CircuitBreakerPort, OnModuleInit {
  private sha: string | undefined;
  constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis | Client) {}

  async onModuleInit(): Promise<void> {
    const source = await readFile(resolve(__dirname_esm, 'lua', 'circuit-breaker.lua'), 'utf8');
    const sha = z
      .string()
      .length(40)
      .regex(/^[a-f0-9]+$/)
      .safeParse(await this.redis.script('LOAD', source));
    if (sha.success) this.sha = sha.data;
  }

  async acquire(
    circuitKey: string,
    nowMs: number,
    config: CircuitBreakerConfig,
  ): Promise<CircuitBreakerResult> {
    const state = await this.state(circuitKey, config, nowMs, 'acquire');
    if (state.status === 'open' && nowMs < state.openedAtMs + config.resetTimeoutMs)
      return {
        kind: 'rejected',
        reason: 'circuit_open',
        retryAtMs: state.openedAtMs + config.resetTimeoutMs,
      };
    if (state.status === 'half_open' && state.inFlight)
      return { kind: 'rejected', reason: 'half_open_in_flight', retryAtMs: nowMs };
    const next =
      state.status === 'open'
        ? { ...state, status: 'half_open' as const, successCount: 0, inFlight: true }
        : state.status === 'half_open'
          ? { ...state, inFlight: true }
          : state;
    await this.write(circuitKey, config, next);
    return { kind: 'allowed', state: next };
  }

  recordSuccess(state: CircuitState, config: CircuitBreakerConfig): Promise<CircuitState> {
    const next =
      state.status === 'closed'
        ? { status: 'closed' as const, failureCount: 0 }
        : state.status === 'open'
          ? { status: 'closed' as const, failureCount: 0 }
          : state.successCount + 1 >= config.successThreshold
            ? { status: 'closed' as const, failureCount: 0 }
            : { ...state, successCount: state.successCount + 1, inFlight: false };
    return Promise.resolve(next);
  }

  recordFailure(
    state: CircuitState,
    nowMs: number,
    config: CircuitBreakerConfig,
  ): Promise<CircuitState> {
    const failures = state.failureCount + 1;
    return Promise.resolve(
      state.status === 'closed' && failures < config.failureThreshold
        ? { status: 'closed', failureCount: failures }
        : { status: 'open', failureCount: failures, openedAtMs: nowMs },
    );
  }

  getState(circuitKey: string): Promise<CircuitState> {
    return this.state(
      circuitKey,
      { failureThreshold: 1, successThreshold: 1, resetTimeoutMs: 1 },
      Date.now(),
      'getState',
    );
  }

  private async state(
    circuitKey: string,
    config: CircuitBreakerConfig,
    nowMs: number,
    operation: string,
  ): Promise<CircuitState> {
    try {
      const sha = this.sha;
      if (sha === undefined) throw new Error('unavailable');
      const raw = await this.redis.evalsha(
        sha,
        1,
        this.key(circuitKey),
        operation,
        String(config.failureThreshold),
        String(config.resetTimeoutMs),
        String(nowMs),
      );
      const parsed = StateResultSchema.safeParse(raw);
      if (!parsed.success) return { status: 'closed', failureCount: 0 };
      const value = parsed.data;
      if (value.status === 'open')
        return {
          status: 'open',
          failureCount: value.failureCount,
          openedAtMs: value.openedAtMs ?? 0,
        };
      if (value.status === 'half_open')
        return {
          status: 'half_open',
          failureCount: value.failureCount,
          successCount: value.successCount ?? 0,
          inFlight: value.inFlight ?? false,
        };
      return { status: 'closed', failureCount: value.failureCount };
    } catch {
      return { status: 'closed', failureCount: 0 };
    }
  }

  private async write(
    circuitKey: string,
    config: CircuitBreakerConfig,
    state: CircuitState,
  ): Promise<void> {
    const sha = this.sha;
    if (sha !== undefined)
      await this.redis.evalsha(
        sha,
        1,
        this.key(circuitKey),
        'write',
        String(config.failureThreshold),
        String(config.resetTimeoutMs),
        String(Date.now()),
      );
  }
  private key(value: string): string {
    const key = KeySchema.safeParse(value);
    if (!key.success) throw new TypeError('CIRCUIT_BREAKER_INVALID_KEY');
    return `gateway:circuit-breaker:${key.data}`;
  }
}

export type { CircuitBreakerConfig, CircuitBreakerPort, CircuitBreakerResult, CircuitState };
