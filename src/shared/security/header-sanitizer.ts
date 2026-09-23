const HOP_BY_HOP = new Set([
  'connection',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailer',
  'transfer-encoding',
  'upgrade',
]);

const INTERNAL_HEADERS = new Set([
  'host',
  'authorization',
  'cookie',
  'x-forwarded-for',
  'x-forwarded-host',
  'x-forwarded-proto',
  'x-forwarded-port',
  'x-real-ip',
  'x-tenant-id',
  'x-user-id',
  'x-api-key',
  'content-length',
]);

const RESPONSE_BLOCKLIST = new Set([
  'connection',
  'keep-alive',
  'transfer-encoding',
  'upgrade',
  'server',
  'x-powered-by',
  'set-cookie',
  'strict-transport-security',
  'content-security-policy',
  'x-frame-options',
  'x-content-type-options',
]);

const MAX_HEADER_VALUE = 8192;
const MAX_HEADERS = 100;

function isValidHeaderName(name: string): boolean {
  return /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/.test(name);
}

function isValidHeaderValue(value: string): boolean {
  if (value.length > MAX_HEADER_VALUE) return false;
  if (value.includes('\r') || value.includes('\n') || value.includes('\0')) return false;
  return true;
}

export function sanitizeRequestHeaders(
  headers: Readonly<Record<string, string | string[] | undefined>>,
  overrides: Readonly<Record<string, string>> = {},
): Record<string, string> {
  const result: Record<string, string> = {};
  let count = 0;

  for (const [key, value] of Object.entries(headers)) {
    if (count >= MAX_HEADERS) break;
    const lower = key.toLowerCase();

    if (HOP_BY_HOP.has(lower) || INTERNAL_HEADERS.has(lower)) continue;
    if (!isValidHeaderName(lower)) continue;

    const v = Array.isArray(value) ? value.join(', ') : value;
    if (typeof v !== 'string') continue;
    if (!isValidHeaderValue(v)) continue;

    result[lower] = v;
    count++;
  }

  for (const [key, value] of Object.entries(overrides)) {
    const lower = key.toLowerCase();
    if (!isValidHeaderName(lower)) continue;
    if (!isValidHeaderValue(value)) continue;
    result[lower] = value;
  }

  return result;
}

export function sanitizeResponseHeaders(
  headers: Readonly<Record<string, string | string[] | undefined>>,
): Record<string, string> {
  const result: Record<string, string> = {};

  for (const [key, value] of Object.entries(headers)) {
    const lower = key.toLowerCase();

    if (HOP_BY_HOP.has(lower) || RESPONSE_BLOCKLIST.has(lower)) continue;
    if (!isValidHeaderName(lower)) continue;

    const v = Array.isArray(value) ? value.join(', ') : value;
    if (typeof v !== 'string') continue;
    if (!isValidHeaderValue(v)) continue;

    result[lower] = v;
  }

  return result;
}
