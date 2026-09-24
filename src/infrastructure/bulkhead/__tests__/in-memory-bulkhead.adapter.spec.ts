import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  BulkheadRejectedError,
  InternalConfigError,
  InternalMaintenanceError,
} from '@/shared/errors/index.js';
import { InMemoryBulkheadAdapter } from '../in-memory-bulkhead.adapter.js';

const config = { maxConcurrent: 1, maxQueue: 2, queueTimeoutMs: 1_000 };
let adapter: InMemoryBulkheadAdapter | undefined;

afterEach(() => {
  adapter?.destroy();
  adapter = undefined;
});

describe('InMemoryBulkheadAdapter', () => {
  it('limits each key independently and grants queued leases in FIFO order', async () => {
    adapter = new InMemoryBulkheadAdapter();
    const first = await adapter.acquire('tenant:one', config);
    const queuedFirst = adapter.acquire('tenant:one', config);
    const queuedSecond = adapter.acquire('tenant:one', config);
    const other = await adapter.acquire('tenant:two', config);

    const order: string[] = [];
    const firstFIFO = queuedFirst.then((lease) => {
      order.push('first');
      return lease;
    });
    const secondFIFO = queuedSecond.then((lease) => {
      order.push('second');
      return lease;
    });

    await first.release();
    const lease = await firstFIFO;
    expect(lease.queued).toBe(true);
    expect(other).toBeDefined();
    await lease.release();
    const secondLease = await secondFIFO;
    await secondLease.release();
    expect(order).toEqual(['first', 'second']);
  });

  it('rejects full queues, queue timeouts, and aborted waiters', async () => {
    vi.useFakeTimers();
    adapter = new InMemoryBulkheadAdapter();
    const lease = await adapter.acquire('queue', config);
    await expect(adapter.acquire('queue', { ...config, maxQueue: 0 })).rejects.toBeInstanceOf(
      BulkheadRejectedError,
    );
    const timed = adapter.acquire('queue', { ...config, maxQueue: 2 });
    const timedExpectation = expect(timed).rejects.toBeInstanceOf(BulkheadRejectedError);
    vi.advanceTimersByTime(1_000);
    await timedExpectation;

    const controller = new AbortController();
    const aborted = adapter.acquire('queue', config, controller.signal);
    const abortExpectation = expect(aborted).rejects.toBeInstanceOf(BulkheadRejectedError);
    controller.abort();
    await abortExpectation;
    await lease.release();
    vi.useRealTimers();
  });

  it('makes release idempotent and reports stats', async () => {
    adapter = new InMemoryBulkheadAdapter();
    const lease = await adapter.acquire('stats', config);
    const queued = adapter.acquire('stats', config);
    expect(adapter.getStats(' stats ')).toEqual({
      activeCount: 1,
      queuedCount: 1,
      rejectedCount: 0,
    });
    expect(adapter.listAll().get('stats')?.queuedCount).toBe(1);

    await lease.release();
    await lease.release();
    const next = await queued;
    expect(adapter.getStats('stats').activeCount).toBe(1);
    await next.release();
    expect(adapter.getStats('stats').activeCount).toBe(0);
  });

  it('validates and sanitizes keys and configuration', async () => {
    adapter = new InMemoryBulkheadAdapter();
    await expect(adapter.acquire('', config)).rejects.toBeInstanceOf(InternalConfigError);
    await expect(adapter.acquire('bad key', config)).rejects.toBeInstanceOf(InternalConfigError);
    await expect(adapter.acquire('x'.repeat(201), config)).rejects.toBeInstanceOf(
      InternalConfigError,
    );
    await expect(adapter.acquire('valid', { ...config, maxConcurrent: 0 })).rejects.toBeInstanceOf(
      InternalConfigError,
    );
  });

  it('bounds keys and cleans idle states', async () => {
    let now = 0;
    adapter = new InMemoryBulkheadAdapter({ maxKeys: 1, idleTtlMs: 10, now: () => now });
    const bulkhead = adapter;
    const first = await bulkhead.acquire('one', config);
    await expect(bulkhead.acquire('two', config)).rejects.toBeInstanceOf(BulkheadRejectedError);
    await first.release();
    now = 11;
    const third = await bulkhead.acquire('three', config);
    expect(bulkhead.listAll().has('three')).toBe(true);
    await third.release();
  });

  it('reset and destroy reject queued waiters and prevent future acquisition', async () => {
    adapter = new InMemoryBulkheadAdapter();
    const active = await adapter.acquire('reset', config);
    const queued = adapter.acquire('reset', config);
    adapter.reset('reset');
    await expect(queued).rejects.toBeInstanceOf(BulkheadRejectedError);
    await active.release();
    expect(adapter.getStats('reset').activeCount).toBe(0);

    const activeOnDestroy = await adapter.acquire('destroy', config);
    const queuedOnDestroy = adapter.acquire('destroy', config);
    adapter.destroy();
    await expect(queuedOnDestroy).rejects.toBeInstanceOf(InternalMaintenanceError);
    await activeOnDestroy.release();
    await expect(adapter.acquire('new', config)).rejects.toBeInstanceOf(InternalMaintenanceError);
  });
});
