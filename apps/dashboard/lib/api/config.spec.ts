import { describe, expect, it } from 'vitest';
import { resolveApiBaseUrl } from './config';

describe('resolveApiBaseUrl', () => {
  it('uses the local gateway only outside production', () => {
    expect(resolveApiBaseUrl(undefined, 'development')).toBe('http://localhost:7300');
    expect(resolveApiBaseUrl(undefined, 'production')).toBe('');
  });

  it('accepts HTTPS and removes a trailing slash', () => {
    expect(resolveApiBaseUrl('https://api.example.com/', 'production')).toBe(
      'https://api.example.com',
    );
  });

  it('accepts loopback HTTP only outside production', () => {
    expect(resolveApiBaseUrl('http://127.0.0.1:7300', 'development')).toBe('http://127.0.0.1:7300');
    expect(() => resolveApiBaseUrl('http://127.0.0.1:7300', 'production')).toThrow(
      'must use HTTPS',
    );
  });

  it('rejects invalid, credentialed, and non-HTTPS production URLs', () => {
    expect(() => resolveApiBaseUrl('not-a-url', 'production')).toThrow('valid absolute URL');
    expect(() => resolveApiBaseUrl('https://user:pass@api.example.com', 'production')).toThrow(
      'must not include credentials',
    );
    expect(() => resolveApiBaseUrl('http://api.example.com', 'production')).toThrow(
      'must use HTTPS',
    );
  });
});
