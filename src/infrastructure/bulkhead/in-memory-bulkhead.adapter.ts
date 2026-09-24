import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import type {
  BulkheadConfig,
  BulkheadLease,
} from '@/core/bulkhead/application/execute-with-bulkhead.usecase.js';
import {
  BulkheadRejectedError,
  InternalConfigError,
  InternalMaintenanceError,
} from '@/shared/errors/index.js';
import {
  BULKHEAD_DEFAULTS,
  BULKHEAD_KEY_MAX_LENGTH,
  BULKHEAD_KEY_MIN_LENGTH,
  BULKHEAD_KEY_PATTERN,
  BULKHEAD_MAX_CONCURRENT,
  BULKHEAD_MAX_QUEUE,
  BULKHEAD_MAX_QUEUE_TIMEOUT_MS,
} from './bulkhead.constants.js';

interface Waiter {
  readonly resolve: (lease: BulkheadLease) => void;
  readonly reject: (error: Error) => void;
  readonly abort: () => void;
  readonly timeout: () => void;
}

interface KeyState {
  active: number;
  maxConcurrent: number;
  readonly queue: Waiter[];
  rejected: number;
  lastUsedAt: number;
}

export interface InMemoryBulkheadOptions {
  readonly maxKeys?: number;
  readonly idleTtlMs?: number;
  readonly cleanupIntervalMs?: number;
  readonly now?: () => number;
}

export interface InMemoryBulkheadStats {
  readonly activeCount: number;
  readonly queuedCount: number;
  readonly rejectedCount: number;
}

@Injectable()
export class InMemoryBulkheadAdapter implements OnApplicationShutdown {
  private readonly states = new Map<string, KeyState>();
  private readonly maxKeys: number;
  private readonly idleTtlMs: number;
  private readonly now: () => number;
  private readonly cleanup: NodeJS.Timeout;
  private destroyed = false;
  private nextLeaseId = 1;

  constructor(options: InMemoryBulkheadOptions = {}) {
    this.maxKeys = options.maxKeys ?? BULKHEAD_DEFAULTS.maxKeys;
    this.idleTtlMs = options.idleTtlMs ?? BULKHEAD_DEFAULTS.idleTtlMs;
    this.now = options.now ?? Date.now;
    const intervalMs = options.cleanupIntervalMs ?? BULKHEAD_DEFAULTS.cleanupIntervalMs;
    this.validateOptions(intervalMs);
    this.cleanup = setInterval(() => this.cleanupIdle(), intervalMs);
    this.cleanup.unref();
  }

  async acquire(
    keyInput: string,
    config: BulkheadConfig,
    signal?: AbortSignal,
  ): Promise<BulkheadLease> {
    const key = this.sanitizeKey(keyInput);
    this.validateConfig(config);
    this.cleanupIdle();
    if (this.destroyed) throw new InternalMaintenanceError('Bulkhead sedang dihentikan');
    if (signal?.aborted) throw new BulkheadRejectedError('Permintaan bulkhead dibatalkan');

    let state = this.states.get(key);
    if (state === undefined) {
      if (this.states.size >= this.maxKeys) {
        throw new BulkheadRejectedError('Jumlah key bulkhead mencapai batas');
      }
      state = {
        active: 0,
        maxConcurrent: config.maxConcurrent,
        queue: [],
        rejected: 0,
        lastUsedAt: this.now(),
      };
      this.states.set(key, state);
    }

    state.lastUsedAt = this.now();
    if (state.active < state.maxConcurrent && state.queue.length === 0) {
      return this.grant(key, state);
    }
    if (state.queue.length >= config.maxQueue) {
      state.rejected += 1;
      throw new BulkheadRejectedError('Antrean bulkhead penuh');
    }

    return this.enqueue(key, state, config.queueTimeoutMs, signal);
  }

  getStats(keyInput: string): InMemoryBulkheadStats {
    this.cleanupIdle();
    const state = this.states.get(this.sanitizeKey(keyInput));
    if (state === undefined) return { activeCount: 0, queuedCount: 0, rejectedCount: 0 };
    return Object.freeze({
      activeCount: state.active,
      queuedCount: state.queue.length,
      rejectedCount: state.rejected,
    });
  }

  listAll(): ReadonlyMap<string, InMemoryBulkheadStats> {
    this.cleanupIdle();
    return new Map([...this.states.keys()].map((key) => [key, this.getStats(key)]));
  }

  reset(keyInput: string): void {
    const key = this.sanitizeKey(keyInput);
    const state = this.states.get(key);
    if (state === undefined) return;
    this.rejectQueue(state, new BulkheadRejectedError('Bulkhead key di-reset'));
    this.states.delete(key);
  }

  destroy(): void {
    if (this.destroyed) return;
    this.destroyed = true;
    clearInterval(this.cleanup);
    for (const state of this.states.values()) {
      this.rejectQueue(state, new InternalMaintenanceError('Bulkhead sedang dihentikan'));
      state.active = 0;
    }
    this.states.clear();
  }

  onApplicationShutdown(): void {
    this.destroy();
  }

  private enqueue(
    key: string,
    state: KeyState,
    timeoutMs: number,
    signal: AbortSignal | undefined,
  ): Promise<BulkheadLease> {
    return new Promise<BulkheadLease>((resolve, reject) => {
      const timer = setTimeout(() => {
        state.rejected += 1;
        this.remove(key, state.queue.indexOf(waiter));
        reject(new BulkheadRejectedError('Timeout menunggu slot bulkhead'));
      }, timeoutMs);

      const waiter: Waiter = {
        resolve,
        reject,
        abort: () => {
          state.rejected += 1;
          this.remove(key, state.queue.indexOf(waiter));
          reject(new BulkheadRejectedError('Permintaan bulkhead dibatalkan'));
        },
        timeout: () => clearTimeout(timer),
      };
      state.queue.push(waiter);
      signal?.addEventListener('abort', waiter.abort, { once: true });
    });
  }

  private grant(key: string, state: KeyState): BulkheadLease {
    state.active += 1;
    const leaseId = this.nextLeaseId;
    this.nextLeaseId += 1;
    let released = false;
    return Object.freeze({
      queued: false,
      release: async (): Promise<void> => {
        if (released) return;
        released = true;
        this.release(key, state, leaseId);
      },
    });
  }

  private release(key: string, state: KeyState, leaseId: number): void {
    if (this.states.get(key) !== state) return;
    state.active = Math.max(0, state.active - 1);
    state.lastUsedAt = this.now();
    const waiter = state.queue.shift();
    if (waiter === undefined) return;
    waiter.timeout();
    state.active += 1;
    waiter.resolve(this.grantForLease(key, state, leaseId));
  }

  private grantForLease(key: string, state: KeyState, previousLeaseId: number): BulkheadLease {
    const leaseId = previousLeaseId;
    let released = false;
    return Object.freeze({
      queued: true,
      release: async (): Promise<void> => {
        if (released) return;
        released = true;
        this.release(key, state, leaseId);
      },
    });
  }

  private remove(key: string, index: number): void {
    const state = this.states.get(key);
    if (state === undefined || index < 0) return;
    const waiter = state.queue[index];
    if (waiter === undefined) return;
    waiter.timeout();
    state.queue.splice(index, 1);
  }

  private rejectQueue(state: KeyState, error: Error): void {
    for (const waiter of state.queue.splice(0)) {
      waiter.timeout();
      waiter.reject(error);
    }
  }

  private cleanupIdle(): void {
    if (this.idleTtlMs === 0) return;
    const threshold = this.now() - this.idleTtlMs;
    for (const [key, state] of this.states) {
      if (state.active === 0 && state.queue.length === 0 && state.lastUsedAt <= threshold) {
        this.states.delete(key);
      }
    }
  }

  private validateOptions(cleanupIntervalMs: number): void {
    if (!Number.isSafeInteger(this.maxKeys) || this.maxKeys < 1) {
      throw new InternalConfigError('Bulkhead maxKeys tidak valid');
    }
    if (!Number.isSafeInteger(this.idleTtlMs) || this.idleTtlMs < 0) {
      throw new InternalConfigError('Bulkhead idleTtlMs tidak valid');
    }
    if (!Number.isSafeInteger(cleanupIntervalMs) || cleanupIntervalMs < 1) {
      throw new InternalConfigError('Bulkhead cleanupIntervalMs tidak valid');
    }
  }

  private validateConfig(config: BulkheadConfig): void {
    if (
      !Number.isSafeInteger(config.maxConcurrent) ||
      config.maxConcurrent < 1 ||
      config.maxConcurrent > BULKHEAD_MAX_CONCURRENT
    ) {
      throw new InternalConfigError('Bulkhead maxConcurrent tidak valid');
    }
    if (
      !Number.isSafeInteger(config.maxQueue) ||
      config.maxQueue < 0 ||
      config.maxQueue > BULKHEAD_MAX_QUEUE
    ) {
      throw new InternalConfigError('Bulkhead maxQueue tidak valid');
    }
    if (
      !Number.isSafeInteger(config.queueTimeoutMs) ||
      config.queueTimeoutMs < 1 ||
      config.queueTimeoutMs > BULKHEAD_MAX_QUEUE_TIMEOUT_MS
    ) {
      throw new InternalConfigError('Bulkhead queueTimeoutMs tidak valid');
    }
  }

  private sanitizeKey(key: string): string {
    const keyValue = key.trim();
    if (
      keyValue.length < BULKHEAD_KEY_MIN_LENGTH ||
      keyValue.length > BULKHEAD_KEY_MAX_LENGTH ||
      !BULKHEAD_KEY_PATTERN.test(keyValue)
    ) {
      throw new InternalConfigError('Bulkhead key tidak valid');
    }
    return keyValue;
  }
}
