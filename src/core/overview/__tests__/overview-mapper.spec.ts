import { describe, it, expect } from 'vitest';
import {
  computeCircuits,
  computeDeltaPercent,
  computeErrors,
  computeLatency,
  computeRequests,
  computeServiceHealth,
} from '../application/overview-mapper.js';
import { emptyRawCounters, type CircuitEntry } from '../domain/overview.entity.js';

describe('overview-mapper', () => {
  describe('computeDeltaPercent', () => {
    it('mengembalikan 100 saat previous nol dan current positif', () => {
      expect(computeDeltaPercent(10, 0)).toBe(100);
    });

    it('mengembalikan 0 saat keduanya nol', () => {
      expect(computeDeltaPercent(0, 0)).toBe(0);
    });

    it('menghitung delta relatif', () => {
      expect(computeDeltaPercent(1123, 1000)).toBe(12.3);
    });

    it('menghasilkan delta negatif', () => {
      expect(computeDeltaPercent(500, 1000)).toBe(-50);
    });
  });

  describe('computeRequests', () => {
    it('menghitung perMinute dari total 24 jam', () => {
      const stats = computeRequests({ ...emptyRawCounters(), requests24h: 6_936_000 });
      expect(stats.perMinute).toBe(4_817);
      expect(stats.total24h).toBe(6_936_000);
    });
  });

  describe('computeErrors', () => {
    it('menghitung rate sebagai persen', () => {
      const stats = computeErrors({
        ...emptyRawCounters(),
        requests24h: 6_936_000,
        errors24h: 5_548,
      });
      expect(stats.rate).toBeCloseTo(0.08, 2);
    });

    it('menghitung delta rate terhadap periode sebelumnya', () => {
      const stats = computeErrors({
        ...emptyRawCounters(),
        requests24h: 1_000,
        errors24h: 100,
        requestsPrev24h: 1_000,
        errorsPrev24h: 10,
      });
      expect(stats.deltaVsYesterday).toBe(9);
    });

    it('rate nol saat tidak ada request', () => {
      expect(computeErrors(emptyRawCounters()).rate).toBe(0);
    });
  });

  describe('computeLatency', () => {
    it('membulatkan persentil dan delta', () => {
      const stats = computeLatency({
        ...emptyRawCounters(),
        latencyP95: 45.4,
        latencyP99: 128.6,
        latencyP95Prev: 42,
      });
      expect(stats).toEqual({ p95Ms: 45, p99Ms: 129, deltaVsYesterday: 3 });
    });
  });

  describe('computeCircuits', () => {
    it('menghitung jumlah per state', () => {
      expect(computeCircuits(circuits())).toEqual({ open: 1, halfOpen: 1, closed: 1 });
    });

    it('mengembalikan nol saat tidak ada circuit', () => {
      expect(computeCircuits([])).toEqual({ open: 0, halfOpen: 0, closed: 0 });
    });
  });

  describe('computeServiceHealth', () => {
    it('memetakan state ke status kesehatan', () => {
      expect(computeServiceHealth(circuits())).toEqual([
        { name: 'a', status: 'healthy', latencyMs: null },
        { name: 'b', status: 'degraded', latencyMs: null },
        { name: 'c', status: 'down', latencyMs: null },
      ]);
    });
  });
});

function circuits(): readonly CircuitEntry[] {
  return [
    { key: 'a', status: 'closed', failureCount: 0, openedAtMs: 0 },
    { key: 'b', status: 'half_open', failureCount: 0, openedAtMs: 0 },
    { key: 'c', status: 'open', failureCount: 5, openedAtMs: 1 },
  ];
}
