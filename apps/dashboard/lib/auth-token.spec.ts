import { describe, expect, it } from 'vitest';
import { readAuthCookie } from './auth-token';

describe('readAuthCookie', () => {
  it('reads and decodes the auth cookie', () => {
    expect(readAuthCookie('theme=dark; michishirube-auth=token%2B123; other=value')).toBe(
      'token+123',
    );
  });

  it('returns null for missing, empty, and unrelated cookies', () => {
    expect(readAuthCookie(null)).toBeNull();
    expect(readAuthCookie('theme=dark')).toBeNull();
    expect(readAuthCookie('michishirube-auth=')).toBeNull();
  });

  it('does not match a cookie with the same name as a prefix', () => {
    expect(readAuthCookie('michishirube-auth-old=value; michishirube-auth=real')).toBe('real');
  });
});
