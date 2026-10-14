import { describe, expect, it } from 'vitest';
import { safeReturnTo, isSameOriginRequest } from './auth-navigation';

describe('safeReturnTo', () => {
  it.each([
    ['/routes?tab=active', '/routes?tab=active'],
    ['/settings#profile', '/settings#profile'],
    ['//evil.example/path', '/'],
    ['/\\evil.example/path', '/'],
    ['https://evil.example/path', '/'],
    ['javascript:alert(1)', '/'],
    ['data:text/html,<script>alert(1)</script>', '/'],
    ['vbscript:alert(1)', '/'],
    ['', '/'],
    [null, '/'],
    [undefined, '/'],
  ])('normalizes %s', (input, expected) => {
    expect(safeReturnTo(input as string | null | undefined)).toBe(expected);
  });

  it('rejects paths with embedded newlines', () => {
    expect(safeReturnTo('/routes\nhttps://evil.com')).toBe('/');
  });

  it('rejects paths with control characters', () => {
    expect(safeReturnTo('/routes\x00')).toBe('/');
  });
});

describe('isSameOriginRequest', () => {
  it('returns true when origin header is null', () => {
    const request = new Request('http://localhost:3000/api/test');
    expect(isSameOriginRequest(request)).toBe(true);
  });

  it('returns true when origin matches request URL', () => {
    const request = new Request('http://localhost:3000/api/test', {
      headers: { origin: 'http://localhost:3000' },
    });
    expect(isSameOriginRequest(request)).toBe(true);
  });

  it('returns false when origin does not match', () => {
    const request = new Request('http://localhost:3000/api/test', {
      headers: { origin: 'http://evil.example' },
    });
    expect(isSameOriginRequest(request)).toBe(false);
  });
});
