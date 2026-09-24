import { createHash, randomBytes } from 'node:crypto';
import argon2 from 'argon2';
import type { ApiKeyHashService } from '@/core/api-key/domain/api-key-hash.service.js';
import { API_KEY_PREFIX } from '@/core/api-key/domain/api-key.entity.js';

const HASH_OPTIONS = {
  type: argon2.argon2id,
  memoryCost: 19_456,
  timeCost: 2,
  parallelism: 1,
} as const;
const SECRET_LENGTH = 32;
const DISPLAY_LENGTH = 8;

export class Argon2ApiKeyHashService implements ApiKeyHashService {
  generatePlaintext(): string {
    return `${API_KEY_PREFIX}${randomBytes(SECRET_LENGTH).toString('base64url')}`;
  }

  async hash(plaintextKey: string): Promise<string> {
    if (!this.isValidFormat(plaintextKey)) {
      throw new TypeError('Invalid API key format');
    }
    return argon2.hash(plaintextKey, HASH_OPTIONS);
  }

  async verify(keyHash: string, plaintextKey: string): Promise<boolean> {
    if (!this.isValidFormat(plaintextKey)) return false;
    try {
      return await argon2.verify(keyHash, plaintextKey);
    } catch (cause) {
      if (cause instanceof Error) return false;
      throw cause;
    }
  }

  indexHash(plaintextKey: string): string {
    return createHash('sha256').update(plaintextKey, 'utf8').digest('hex');
  }

  displayPrefix(plaintextKey: string): string {
    return plaintextKey.slice(0, API_KEY_PREFIX.length + DISPLAY_LENGTH);
  }

  isValidFormat(plaintextKey: string): boolean {
    if (!plaintextKey.startsWith(API_KEY_PREFIX)) return false;
    const secret = plaintextKey.slice(API_KEY_PREFIX.length);
    return /^[A-Za-z0-9_-]{32,256}$/.test(secret);
  }
}
