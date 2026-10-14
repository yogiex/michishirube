import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { isMetricsAccessAllowed, MetricsAuthGuard } from '../metrics-auth.guard.js';

class ConfigStub {
  constructor(
    private readonly token: string,
    private readonly ipAllowlist: string,
  ) {}

  get(key: string): string | undefined {
    if (key === 'metrics.token') return this.token;
    if (key === 'metrics.ipAllowlist') return this.ipAllowlist;
    return undefined;
  }
}

describe('isMetricsAccessAllowed', () => {
  it('mengizinkan konfigurasi kosong', () => {
    expect(
      isMetricsAccessAllowed({
        token: '',
        ipAllowlist: '',
        clientIp: '127.0.0.1',
        providedToken: undefined,
      }),
    ).toBe(true);
  });

  it('mengizinkan token yang benar', () => {
    expect(
      isMetricsAccessAllowed({
        token: 'secret-token',
        ipAllowlist: '',
        clientIp: '127.0.0.1',
        providedToken: 'secret-token',
      }),
    ).toBe(true);
  });

  it('menolak token yang salah', () => {
    expect(
      isMetricsAccessAllowed({
        token: 'secret-token',
        ipAllowlist: '',
        clientIp: '127.0.0.1',
        providedToken: 'wrong',
      }),
    ).toBe(false);
  });

  it('menolak tanpa token ketika hanya allowlist yang dikonfigurasi', () => {
    expect(
      isMetricsAccessAllowed({
        token: '',
        ipAllowlist: '10.0.0.1',
        clientIp: '10.0.0.2',
        providedToken: undefined,
      }),
    ).toBe(false);
  });

  it('mengizinkan IP dalam allowlist', () => {
    expect(
      isMetricsAccessAllowed({
        token: '',
        ipAllowlist: '10.0.0.1, 10.0.0.2',
        clientIp: '::ffff:10.0.0.2',
        providedToken: undefined,
      }),
    ).toBe(true);
  });

  it('menolak IP di luar allowlist', () => {
    expect(
      isMetricsAccessAllowed({
        token: '',
        ipAllowlist: '10.0.0.1',
        clientIp: '10.0.0.2',
        providedToken: undefined,
      }),
    ).toBe(false);
  });

  it('menolak token dengan panjang berbeda tanpa melempar', () => {
    expect(
      isMetricsAccessAllowed({
        token: 'secret-token',
        ipAllowlist: '',
        clientIp: '127.0.0.1',
        providedToken: 'x',
      }),
    ).toBe(false);
  });

  it('tidak menyertakan token pada hasil keputusan', () => {
    const result = isMetricsAccessAllowed({
      token: 'expected-secret',
      ipAllowlist: '',
      clientIp: '127.0.0.1',
      providedToken: 'provided-secret',
    });
    expect(result).toBe(false);
    expect(String(result)).not.toContain('expected-secret');
    expect(String(result)).not.toContain('provided-secret');
  });
});

describe('MetricsAuthGuard', () => {
  beforeEach(async () => {
    const config = new ConfigStub('', '');
    await Test.createTestingModule({
      providers: [
        {
          provide: ConfigService,
          useValue: config,
        },
        MetricsAuthGuard,
      ],
    }).compile();
  });

  it('dapat diinstantiate melalui testing module', () => {
    expect(true).toBe(true);
  });
});
