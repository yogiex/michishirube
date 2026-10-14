import { describe, it, expect } from 'vitest';
import { JwksClient } from '../jwks.client.js';

describe('JwksClient', () => {
  it('creates remote jwks for a valid uri', () => {
    const client = new JwksClient('https://example.com/.well-known/jwks.json');
    const jwks = client.getJwks();
    expect(typeof jwks).toBe('function');
    expect(client.getJwksUri()).toBe('https://example.com/.well-known/jwks.json');
  });

  it('reuses cached instance until reset', () => {
    const client = new JwksClient('https://example.com/.well-known/jwks.json');
    const first = client.getJwks();
    const second = client.getJwks();
    expect(first).toBe(second);

    client.reset();
    const third = client.getJwks();
    expect(third).not.toBe(first);
  });

  it('throws on invalid uri', () => {
    const client = new JwksClient('not a url');
    expect(() => client.getJwks()).toThrow();
  });

  it('supports object input and aliases', () => {
    const client = new JwksClient({ jwksUri: 'https://example.com/jwks' });
    expect(client.getRemoteJWKSet()).toBe(client.getJwks());
    client.resetCache();
    expect(() => client.jwks()).not.toThrow();
  });
});
