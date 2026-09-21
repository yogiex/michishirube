import { describe, it, expect } from 'vitest';
import { RequestContextHolder } from '../request-context.js';

describe('RequestContextHolder', () => {
  it('menyimpan context saat run()', () => {
    RequestContextHolder.run({ requestId: 'req-1', startedAt: Date.now() }, () => {
      expect(RequestContextHolder.get()?.requestId).toBe('req-1');
      expect(RequestContextHolder.getOrThrow().requestId).toBe('req-1');
    });
  });

  it('get() undefined dan getOrThrow() throw di luar run()', () => {
    expect(RequestContextHolder.get()).toBeUndefined();
    expect(RequestContextHolder.getRequestId()).toBeUndefined();
    expect(RequestContextHolder.getTenantId()).toBeUndefined();
    expect(() => RequestContextHolder.getOrThrow()).toThrow();
  });

  it('setTenantId / setUserId set di context', () => {
    RequestContextHolder.run({ requestId: 'req-3', startedAt: Date.now() }, () => {
      RequestContextHolder.setTenantId('acme');
      RequestContextHolder.setUserId('u_1');
      expect(RequestContextHolder.getTenantId()).toBe('acme');
      expect(RequestContextHolder.get()?.userId).toBe('u_1');
    });
  });

  it('setTenantId di luar run() adalah no-op', () => {
    expect(() => RequestContextHolder.setTenantId('acme')).not.toThrow();
    expect(RequestContextHolder.getTenantId()).toBeUndefined();
  });

  it('run() tidak memutasi objek input', () => {
    const input = { requestId: 'x', startedAt: 1 };
    RequestContextHolder.run(input, () => RequestContextHolder.setTenantId('acme'));
    expect('tenantId' in input).toBe(false);
  });

  it('context terisolasi antar run()', () => {
    RequestContextHolder.run({ requestId: 'a', startedAt: 1 }, () => {
      RequestContextHolder.setTenantId('ta');
      expect(RequestContextHolder.getRequestId()).toBe('a');
    });
    RequestContextHolder.run({ requestId: 'b', startedAt: 2 }, () => {
      expect(RequestContextHolder.getRequestId()).toBe('b');
      expect(RequestContextHolder.getTenantId()).toBeUndefined();
    });
  });

  it('context terbawa ke async call dan paralel terisolasi', async () => {
    await Promise.all(
      ['p1', 'p2', 'p3'].map((id) =>
        RequestContextHolder.run({ requestId: id, startedAt: Date.now() }, async () => {
          await new Promise((r) => setTimeout(r, Math.random() * 5));
          expect(RequestContextHolder.getRequestId()).toBe(id);
        }),
      ),
    );
  });
});
