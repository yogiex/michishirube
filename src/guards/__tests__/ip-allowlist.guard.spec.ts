import { describe, it, expect, beforeEach } from 'vitest';
import { ExecutionContext } from '@nestjs/common';
import {
  IpAllowlistGuard,
  ipMatchesAllowlist,
  normalizeIp,
  parseIpAllowlist,
} from '../ip-allowlist.guard.js';
import { OpsForbiddenError } from '@/shared/errors/index.js';

function makeCtx(req: Record<string, unknown>, type = 'http'): ExecutionContext {
  return {
    getType: () => type,
    switchToHttp: () => ({
      getRequest: () => req,
      getResponse: () => ({}),
    }),
    getHandler: () => ({}),
    getClass: () => ({}),
  } as unknown as ExecutionContext;
}

describe('normalizeIp', () => {
  it('normalizes IPv6-mapped IPv4', () => {
    expect(normalizeIp('::ffff:1.2.3.4')).toBe('1.2.3.4');
  });
  it('leaves normal IP unchanged', () => {
    expect(normalizeIp('  10.0.0.1  ')).toBe('10.0.0.1');
  });
});

describe('parseIpAllowlist', () => {
  it('parses comma-separated and normalizes', () => {
    expect(parseIpAllowlist('::ffff:10.0.0.1, 10.0.0.2')).toEqual(['10.0.0.1', '10.0.0.2']);
  });
});

describe('ipMatchesAllowlist', () => {
  it('matches exact IP', () => {
    expect(ipMatchesAllowlist('10.0.0.1', '10.0.0.1')).toBe(true);
    expect(ipMatchesAllowlist('10.0.0.2', '10.0.0.1')).toBe(false);
  });
  it('matches CIDR IPv4', () => {
    expect(ipMatchesAllowlist('192.168.1.50', '192.168.1.0/24')).toBe(true);
    expect(ipMatchesAllowlist('192.168.2.50', '192.168.1.0/24')).toBe(false);
  });
  it('matches CIDR IPv6', () => {
    expect(ipMatchesAllowlist('2001:db8::1', '2001:db8::/32')).toBe(true);
    expect(ipMatchesAllowlist('2001:db9::1', '2001:db8::/32')).toBe(false);
  });
  it('normalizes IPv6-mapped in matching', () => {
    expect(ipMatchesAllowlist('::ffff:10.0.0.1', '10.0.0.1')).toBe(true);
  });
});

describe('IpAllowlistGuard', () => {
  beforeEach(() => {
    process.env.NODE_ENV = 'test';
  });

  it('skips non-HTTP', async () => {
    const guard = new IpAllowlistGuard('', false, 'production');
    const ctx = { getType: () => 'rpc' } as unknown as ExecutionContext;
    expect(await guard.canActivate(ctx)).toBe(true);
  });

  it('allows non-admin paths', async () => {
    const guard = new IpAllowlistGuard('', false, 'production');
    const req = { url: '/proxy/foo', socket: { remoteAddress: '1.2.3.4' } };
    expect(await guard.canActivate(makeCtx(req))).toBe(true);
  });

  it('exact allow', async () => {
    const guard = new IpAllowlistGuard('10.0.0.1', false, 'test');
    const req = { url: '/admin/overview', socket: { remoteAddress: '10.0.0.1' } };
    expect(await guard.canActivate(makeCtx(req))).toBe(true);
  });

  it('CIDR allow', async () => {
    const guard = new IpAllowlistGuard('10.0.0.0/24', false, 'test');
    const req = { url: '/admin/cache', socket: { remoteAddress: '10.0.0.9' } };
    expect(await guard.canActivate(makeCtx(req))).toBe(true);
  });

  it('IPv6 mapped allow', async () => {
    const guard = new IpAllowlistGuard('10.0.0.1', false, 'test');
    const req = { url: '/admin/x', socket: { remoteAddress: '::ffff:10.0.0.1' } };
    expect(await guard.canActivate(makeCtx(req))).toBe(true);
  });

  it('empty dev allow', async () => {
    const guard = new IpAllowlistGuard('', false, 'development');
    const req = {
      url: '/admin/x',
      socket: { remoteAddress: '9.9.9.9' },
    };
    expect(await guard.canActivate(makeCtx(req))).toBe(true);
  });

  it('empty prod deny', async () => {
    const guard = new IpAllowlistGuard('', false, 'production');
    const req = { url: '/admin/x', socket: { remoteAddress: '9.9.9.9' } };
    await expect(guard.canActivate(makeCtx(req))).rejects.toThrow(OpsForbiddenError);
  });

  it('normalizes socket IP', async () => {
    const guard = new IpAllowlistGuard('1.2.3.4', false, 'test');
    const req = { url: '/admin/x', socket: { remoteAddress: '::ffff:1.2.3.4' } };
    expect(await guard.canActivate(makeCtx(req))).toBe(true);
  });

  it('trusted proxy uses first XFF entry', async () => {
    const guard = new IpAllowlistGuard('9.9.9.9', true, 'test');
    const req = {
      url: '/admin/x',
      socket: { remoteAddress: '127.0.0.1' },
      headers: { 'x-forwarded-for': '9.9.9.9, 1.1.1.1' },
    };
    expect(await guard.canActivate(makeCtx(req))).toBe(true);
  });

  it('untrusted proxy ignores XFF', async () => {
    const guard = new IpAllowlistGuard('9.9.9.9', false, 'test');
    const req = {
      url: '/admin/x',
      socket: { remoteAddress: '127.0.0.1' },
      headers: { 'x-forwarded-for': '9.9.9.9' },
    };
    await expect(guard.canActivate(makeCtx(req))).rejects.toThrow(OpsForbiddenError);
  });
});
