import { describe, expect, it } from 'vitest';
import { InternalConfigError } from '@/shared/errors/index.js';
import { createBulkheadConfig, type BulkheadConfigInput } from '../domain/bulkhead-config.vo.js';

const validInput: BulkheadConfigInput = {
  maxConcurrency: 100,
  maxQueueSize: 50,
  timeoutMs: 30_000,
};

describe('BulkheadConfig', () => {
  it('membuat konfigurasi immutable yang valid', () => {
    const config = createBulkheadConfig(validInput);

    expect(config.maxConcurrency).toBe(100);
    expect(config.maxQueueSize).toBe(50);
    expect(config.timeoutMs).toBe(30_000);
    expect(Object.isFrozen(config)).toBe(true);
  });

  it.each([1, 10_000])('menerima maxConcurrency %s', (maxConcurrency) => {
    expect(() => createBulkheadConfig({ ...validInput, maxConcurrency })).not.toThrow();
  });

  it.each([0, -1, 1.5, 10_001, Number.MAX_SAFE_INTEGER])(
    'menolak maxConcurrency %s',
    (maxConcurrency) => {
      expect(() => createBulkheadConfig({ ...validInput, maxConcurrency })).toThrow(
        InternalConfigError,
      );
    },
  );

  it.each([0, 10_000])('menerima maxQueueSize %s', (maxQueueSize) => {
    expect(() => createBulkheadConfig({ ...validInput, maxQueueSize })).not.toThrow();
  });

  it.each([-1, 1.5, 10_001, Number.MAX_SAFE_INTEGER])('menolak maxQueueSize %s', (maxQueueSize) => {
    expect(() => createBulkheadConfig({ ...validInput, maxQueueSize })).toThrow(
      InternalConfigError,
    );
  });

  it.each([100, 300_000])('menerima timeoutMs %s', (timeoutMs) => {
    expect(() => createBulkheadConfig({ ...validInput, timeoutMs })).not.toThrow();
  });

  it.each([99, -1, 100.5, 300_001, Number.MAX_SAFE_INTEGER])(
    'menolak timeoutMs %s',
    (timeoutMs) => {
      expect(() => createBulkheadConfig({ ...validInput, timeoutMs })).toThrow(InternalConfigError);
    },
  );
});
