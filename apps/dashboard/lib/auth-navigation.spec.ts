import { describe, expect, it } from 'vitest';
import { safeReturnTo } from './auth-navigation';

describe('safeReturnTo', () => {
  it.each([
    ['/routes?tab=active', '/routes?tab=active'],
    ['/settings#profile', '/settings#profile'],
    ['//evil.example/path', '/'],
    ['/\\evil.example/path', '/'],
    ['https://evil.example/path', '/'],
    ['javascript:alert(1)', '/'],
  ])('normalizes %s', (input, expected) => {
    expect(safeReturnTo(input)).toBe(expected);
  });
});
