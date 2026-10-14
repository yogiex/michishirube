const MAX_LABEL_LENGTH = 64;
const SAFE_PATTERN = /^[A-Za-z0-9._:/-]+$/;

export function sanitizeLabel(value: unknown, fallback = 'unknown'): string {
  if (value === undefined || value === null) return fallback;
  if (typeof value !== 'string' && typeof value !== 'number') return fallback;
  const str = String(value).trim().slice(0, MAX_LABEL_LENGTH);
  if (str.length === 0) return fallback;
  if (!SAFE_PATTERN.test(str)) return fallback;
  return str;
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const NUMERIC_RE = /^\d+$/;
const ULID_RE = /^[0-9A-HJKMNP-TV-Z]{26}$/;
const HEX_RE = /^[0-9a-f]{16,64}$/i;

export function normalizePath(path: unknown, maxSegments = 10): string {
  if (typeof path !== 'string' || path.length === 0) return 'unknown';
  const segments = path.split('/').filter(Boolean).slice(0, maxSegments);
  const normalized = segments.map((segment) => {
    if (NUMERIC_RE.test(segment)) return ':id';
    if (UUID_RE.test(segment)) return ':uuid';
    if (ULID_RE.test(segment)) return ':ulid';
    if (HEX_RE.test(segment)) return ':hex';
    return sanitizeLabel(segment, 'unknown');
  });
  return '/' + normalized.join('/');
}

export class CardinalityLimiter {
  constructor(private readonly maxUnique: number) {}

  check(value: string): string {
    if (this.known.has(value)) return value;
    if (this.known.size >= this.maxUnique) return '__other__';
    this.known.add(value);
    return value;
  }

  get size(): number {
    return this.known.size;
  }

  reset(): void {
    this.known.clear();
  }

  private readonly known = new Set<string>();
}
