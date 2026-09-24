import { describe, expect, it } from 'vitest';
import { Argon2ApiKeyHashService } from '../argon2-api-key-hash.service.js';

describe('Argon2ApiKeyHashService', () => {
  it('generates msh_sk_ plaintext with a non-reversible Argon2id hash', async () => {
    const service = new Argon2ApiKeyHashService();
    const plaintext = service.generatePlaintext();
    const hash = await service.hash(plaintext);

    expect(plaintext).toMatch(/^msh_sk_[A-Za-z0-9_-]{43}$/);
    expect(hash).toMatch(/^\$argon2id\$/);
    expect(hash).not.toContain(plaintext);
    await expect(service.verify(hash, plaintext)).resolves.toBe(true);
  });

  it('uses deterministic SHA-256 indexes independent of Argon2 salts', () => {
    const service = new Argon2ApiKeyHashService();
    const plaintext = service.generatePlaintext();
    const first = service.indexHash(plaintext);

    expect(first).toHaveLength(64);
    expect(first).toBe(service.indexHash(plaintext));
    expect(first).not.toContain(plaintext);
  });

  it('formats and displays keys without revealing the complete secret', () => {
    const service = new Argon2ApiKeyHashService();
    const plaintext = service.generatePlaintext();
    const display = service.displayPrefix(plaintext);

    expect(service.isValidFormat(plaintext)).toBe(true);
    expect(display).toBe(`${plaintext.slice(0, 15)}`);
    expect(display).not.toBe(plaintext);
  });

  it('fails closed for malformed values and invalid Argon2 hashes', async () => {
    const service = new Argon2ApiKeyHashService();
    for (const value of ['', 'invalid', 'msh_sk_short', `msh_sk_${'a'.repeat(257)}`]) {
      expect(service.isValidFormat(value)).toBe(false);
      await expect(service.verify('not-an-argon2-hash', value)).resolves.toBe(false);
    }
    const plaintext = service.generatePlaintext();
    await expect(
      service.verify(await service.hash(plaintext), service.generatePlaintext()),
    ).resolves.toBe(false);
  });
});
