import { createHash } from 'node:crypto';

export interface CacheKeyInput {
  readonly tenantId: string;
  readonly userId?: string;
  readonly method: string;
  readonly path: string;
  readonly query: string;
  readonly varyHeaders?: Readonly<Record<string, string>>;
  readonly isAuthenticated: boolean;
}

const MAX_COMPONENT_LENGTH = 500;
const SENSITIVE_PARAMS = new Set([
  'token',
  'api_key',
  'apikey',
  'password',
  'secret',
  'authorization',
  '_ts',
  '_t',
  'timestamp',
]);

function sanitizeComponent(raw: string): string {
  return raw.slice(0, MAX_COMPONENT_LENGTH).replace(/[^A-Za-z0-9._-]/g, '_');
}

function hashComponent(raw: string): string {
  if (raw.length === 0) return '0';
  return createHash('sha256').update(raw).digest('hex').slice(0, 32);
}

function normalizeQuery(query: string): string {
  const raw = query.startsWith('?') ? query.slice(1) : query;
  const entries = [...new URLSearchParams(raw).entries()]
    .filter(([key]) => !SENSITIVE_PARAMS.has(key.toLowerCase()))
    .sort(
      ([keyA, valueA], [keyB, valueB]) => keyA.localeCompare(keyB) || valueA.localeCompare(valueB),
    );
  return entries.map(([key, value]) => `${key}=${value}`).join('&');
}

function buildVaryString(headers?: Readonly<Record<string, string>>): string {
  if (headers === undefined) return '';
  return Object.keys(headers)
    .slice(0, 10)
    .sort()
    .map((key) => `${key.toLowerCase()}=${headers[key] ?? ''}`)
    .join('|');
}

export function buildCacheKey(input: CacheKeyInput): string {
  const userScope =
    input.isAuthenticated && input.userId ? `u:${sanitizeComponent(input.userId)}` : 'anon';
  return `cache:${sanitizeComponent(input.tenantId)}:${userScope}:${input.method.toUpperCase()}:${hashComponent(input.path)}:${hashComponent(normalizeQuery(input.query))}:${hashComponent(buildVaryString(input.varyHeaders))}`;
}

export function cacheKeyForLog(key: string): string {
  return key.length <= 40 ? key : `${key.slice(0, 40)}...`;
}
