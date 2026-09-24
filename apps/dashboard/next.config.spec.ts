import { afterEach, describe, expect, it, vi } from 'vitest';
import type { NextConfig } from 'next';

async function loadConfig(environment: 'development' | 'production', apiUrl?: string) {
  vi.stubEnv('NODE_ENV', environment);
  if (apiUrl === undefined) vi.stubEnv('NEXT_PUBLIC_API_URL', undefined);
  else vi.stubEnv('NEXT_PUBLIC_API_URL', apiUrl);
  vi.resetModules();
  return (await import('./next.config')).default;
}

async function headerValue(config: NextConfig, key: string): Promise<string | undefined> {
  const rules = await config.headers?.();
  return rules?.[0]?.headers.find((header) => header.key === key)?.value;
}

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('dashboard security configuration', () => {
  it('uses report-only CSP and omits HSTS in development', async () => {
    const config = await loadConfig('development');
    const headers = await config.headers?.();

    expect(await headerValue(config, 'Content-Security-Policy')).toBeUndefined();
    expect(await headerValue(config, 'Content-Security-Policy-Report-Only')).toContain(
      "default-src 'self'",
    );
    expect(await headerValue(config, 'Strict-Transport-Security')).toBeUndefined();
    expect(headers?.[0]?.source).toBe('/:path*');
  });

  it('enforces CSP and HSTS with a validated HTTPS API origin in production', async () => {
    const config = await loadConfig('production', 'https://api.example.com');

    expect(await headerValue(config, 'Content-Security-Policy-Report-Only')).toBeUndefined();
    expect(await headerValue(config, 'Content-Security-Policy')).toContain(
      "connect-src 'self' https://api.example.com",
    );
    expect(await headerValue(config, 'Strict-Transport-Security')).toContain('max-age=63072000');
    expect(config.poweredByHeader).toBe(false);
    expect(config.productionBrowserSourceMaps).toBe(false);
    expect(await config.redirects?.()).toEqual([]);
  });
});
