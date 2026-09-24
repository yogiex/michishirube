import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Redis } from 'ioredis';
import { z } from 'zod';
import type {
  RetryBudgetAcquireResult,
  RetryBudgetPort,
  RetryBudgetSnapshot,
} from '@/core/retry/domain/retry-budget.port.js';
import { REDIS_CLIENT } from '@/infrastructure/redis/redis.constants.js';

const moduleDirectory = dirname(fileURLToPath(import.meta.url));
const DEFAULT_TTL_MS = 60_000;
const CAPACITY = 10;
const ShaSchema = z
  .string()
  .length(40)
  .regex(/^[a-f0-9]+$/);
const KeySchema = z
  .string()
  .min(1)
  .max(160)
  .regex(/^[\x21-\x7e]+$/);
const NowSchema = z.number().int().nonnegative();
const TtlSchema = z.number().int().positive().max(86_400_000);
const ScriptResultSchema = z.tuple([
  z.number().int().min(0).max(2),
  z.string().regex(/^(0|[1-9]\d*)$/),
  z.string().regex(/^(0|[1-9]\d*)$/),
  z.string().regex(/^(0|[1-9]\d*)$/),
]);

export interface RedisRetryBudgetClient {
  script(command: 'LOAD', script: string): Promise<unknown>;
  evalsha(
    sha: string,
    numberOfKeys: number,
    key: string,
    operation: string,
    nowMs: string,
    ttlMs: string,
    capacity: string,
  ): Promise<unknown>;
}

@Injectable()
export class RedisRetryBudgetAdapter implements RetryBudgetPort, OnModuleInit {
  private readonly logger = new Logger(RedisRetryBudgetAdapter.name);
  private scriptSha: string | undefined;

  constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis | RedisRetryBudgetClient) {}

  async onModuleInit(): Promise<void> {
    try {
      const source = await readFile(resolve(moduleDirectory, 'lua', 'token-bucket.lua'), 'utf8');
      const sha = ShaSchema.safeParse(await this.redis.script('LOAD', source));
      if (!sha.success) throw new TypeError('RETRY_BUDGET_INVALID_SCRIPT_SHA');
      this.scriptSha = sha.data;
    } catch (error: unknown) {
      this.logger.error({ error }, 'Retry budget script unavailable; fail-open enabled');
    }
  }

  async tryAcquire(key: string, nowMs: number, ttlMs: number): Promise<RetryBudgetAcquireResult> {
    const input = this.parseInput(key, nowMs, ttlMs);
    try {
      const result = await this.execute('acquire', input);
      return { kind: result.status === 1 ? 'acquired' : 'exhausted', snapshot: result.snapshot };
    } catch (error: unknown) {
      this.logger.warn({ error }, 'Retry budget unavailable; retry allowed');
      return { kind: 'unavailable' };
    }
  }

  async refund(key: string, nowMs: number): Promise<RetryBudgetSnapshot> {
    return this.refundOrReset(key, nowMs, 'refund');
  }

  async reset(key: string, nowMs: number): Promise<RetryBudgetSnapshot> {
    return this.refundOrReset(key, nowMs, 'reset');
  }

  private async refundOrReset(
    key: string,
    nowMs: number,
    operation: 'refund' | 'reset',
  ): Promise<RetryBudgetSnapshot> {
    const input = this.parseInput(key, nowMs, DEFAULT_TTL_MS);
    try {
      return (await this.execute(operation, input)).snapshot;
    } catch (error: unknown) {
      this.logger.warn({ error }, 'Retry budget refund failed; local reset applied');
      return {
        key,
        capacity: CAPACITY,
        consumed: 0,
        resetsAtMs: input.nowMs + DEFAULT_TTL_MS,
      };
    }
  }

  private parseInput(key: string, nowMs: number, ttlMs: number): ParsedInput {
    return {
      key: this.key(key),
      nowMs: this.parseNow(nowMs),
      ttlMs: this.parseTtl(ttlMs),
    };
  }

  private key(value: string): string {
    const parsed = KeySchema.safeParse(value);
    if (!parsed.success) throw new TypeError('RETRY_BUDGET_INVALID_KEY');
    return `gateway:retry-budget:${parsed.data}`;
  }

  private parseNow(value: number): number {
    const parsed = NowSchema.safeParse(value);
    if (!parsed.success) throw new TypeError('RETRY_BUDGET_INVALID_NOW');
    return parsed.data;
  }

  private parseTtl(value: number): number {
    const parsed = TtlSchema.safeParse(value);
    if (!parsed.success) throw new TypeError('RETRY_BUDGET_INVALID_TTL');
    return parsed.data;
  }

  private async execute(
    operation: 'acquire' | 'refund' | 'reset',
    input: ParsedInput,
  ): Promise<RetryBudgetExecutionResult> {
    const sha = this.scriptSha;
    if (sha === undefined) throw new TypeError('RETRY_BUDGET_SCRIPT_NOT_LOADED');
    const raw = await this.redis.evalsha(
      sha,
      1,
      input.key,
      operation,
      String(input.nowMs),
      String(input.ttlMs),
      String(CAPACITY),
    );
    const parsed = ScriptResultSchema.safeParse(raw);
    if (!parsed.success) throw new TypeError('RETRY_BUDGET_INVALID_RESULT');
    const [status, capacity, consumed, resetsAtMs] = parsed.data;
    const normalizedStatus: 0 | 1 | 2 = status === 1 ? 1 : status === 2 ? 2 : 0;
    return {
      status: normalizedStatus,
      snapshot: {
        key: input.key.slice('gateway:retry-budget:'.length),
        capacity: Number(capacity),
        consumed: Number(consumed),
        resetsAtMs: Number(resetsAtMs),
      },
    };
  }
}

interface ParsedInput {
  readonly key: string;
  readonly nowMs: number;
  readonly ttlMs: number;
}

interface RetryBudgetExecutionResult {
  readonly status: 0 | 1 | 2;
  readonly snapshot: RetryBudgetSnapshot;
}
