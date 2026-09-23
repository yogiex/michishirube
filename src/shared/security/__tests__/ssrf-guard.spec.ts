import { describe, it, expect } from 'vitest';
import { UpstreamError } from '@/shared/errors/index.js';
import { assertSafeUpstream, isPrivateIp } from '../ssrf-guard.js';

describe('assertSafeUpstream', () => {
  it('menolak loopback 127.0.0.1', async () => {
    await expect(assertSafeUpstream('http://127.0.0.1/latest')).rejects.toThrow(UpstreamError);
  });

  it('menolak IP privat 10.x', async () => {
    await expect(assertSafeUpstream('http://10.0.0.5/api')).rejects.toThrow(UpstreamError);
  });

  it('menolak cloud metadata 169.254.169.254', async () => {
    await expect(assertSafeUpstream('http://169.254.169.254/latest/meta-data')).rejects.toThrow(
      UpstreamError,
    );
  });

  it('menolak IPv6 loopback', async () => {
    await expect(assertSafeUpstream('http://[::1]:8080/')).rejects.toThrow(UpstreamError);
  });

  it('menolak localhost', async () => {
    await expect(assertSafeUpstream('http://localhost:3000/')).rejects.toThrow(UpstreamError);
  });

  it('menolak hostname .internal', async () => {
    await expect(assertSafeUpstream('http://order-svc.internal/')).rejects.toThrow(UpstreamError);
  });

  it('menolak protokol selain http/https', async () => {
    await expect(assertSafeUpstream('ftp://example.com/')).rejects.toThrow(UpstreamError);
  });

  it('menolak URL berisi kredensial', async () => {
    await expect(assertSafeUpstream('http://user:pass@example.com/')).rejects.toThrow(
      UpstreamError,
    );
  });

  it('menolak URL tidak valid', async () => {
    await expect(assertSafeUpstream('not a url')).rejects.toThrow(UpstreamError);
  });

  it('mengizinkan IP publik literal', async () => {
    await expect(assertSafeUpstream('http://93.184.216.34/')).resolves.toBeUndefined();
  });

  it('mengizinkan hostname yang gagal di-resolve (offline: DNS error → allow)', async () => {
    await expect(
      assertSafeUpstream('https://unresolvable-host-sprint15.invalid/'),
    ).resolves.toBeUndefined();
  });
});

describe('isPrivateIp', () => {
  it('true untuk IPv4 privat/loopback', () => {
    expect(isPrivateIp('192.168.1.1')).toBe(true);
    expect(isPrivateIp('10.0.0.1')).toBe(true);
    expect(isPrivateIp('127.0.0.1')).toBe(true);
    expect(isPrivateIp('169.254.169.254')).toBe(true);
    expect(isPrivateIp('0.0.0.0')).toBe(true);
    expect(isPrivateIp('172.16.0.1')).toBe(true);
    expect(isPrivateIp('100.64.0.1')).toBe(true);
    expect(isPrivateIp('255.255.255.255')).toBe(true);
  });

  it('true untuk IPv4-mapped IPv6', () => {
    expect(isPrivateIp('::ffff:10.0.0.1')).toBe(true);
    expect(isPrivateIp('::ffff:127.0.0.1')).toBe(true);
  });

  it('true untuk IPv6 privat', () => {
    expect(isPrivateIp('::1')).toBe(true);
    expect(isPrivateIp('::')).toBe(true);
    expect(isPrivateIp('fc00::1')).toBe(true);
    expect(isPrivateIp('fd00::1')).toBe(true);
    expect(isPrivateIp('fd12:3456::1')).toBe(true);
    expect(isPrivateIp('fe80::1')).toBe(true);
  });

  it('false untuk IP publik', () => {
    expect(isPrivateIp('8.8.8.8')).toBe(false);
    expect(isPrivateIp('93.184.216.34')).toBe(false);
    expect(isPrivateIp('2001:4860:4860::8888')).toBe(false);
    expect(isPrivateIp('2606:4700:4700::1111')).toBe(false);
  });
});
