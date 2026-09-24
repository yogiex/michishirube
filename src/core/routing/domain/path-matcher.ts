export interface PathMatchResult {
  readonly matched: boolean;
  readonly params: Readonly<Record<string, string>>;
  readonly wildcard?: string;
}

const PARAM_PREFIX = ':';
const WILDCARD = '*';
const MAX_SEGMENTS = 32;
const MAX_SEGMENT_LENGTH = 128;

function splitPath(path: string): string[] {
  return path
    .split('/')
    .filter((s) => s.length > 0)
    .slice(0, MAX_SEGMENTS);
}

function isSafeSegment(seg: string): boolean {
  if (seg.length > MAX_SEGMENT_LENGTH) return false;
  if (seg === '.' || seg === '..') return false;
  if (seg.includes('\0')) return false;
  const lower = seg.toLowerCase();
  if (lower.includes('%2f') || lower.includes('%5c')) return false;
  return true;
}

export function matchPath(pattern: string, actual: string): PathMatchResult {
  const patternSegs = splitPath(pattern);
  const actualSegs = splitPath(actual);

  const params: Record<string, string> = {};
  let wildcard: string | undefined;
  let i = 0;

  for (; i < patternSegs.length; i++) {
    const pSeg = patternSegs[i];

    if (pSeg === WILDCARD) {
      wildcard = '/' + actualSegs.slice(i).join('/');
      return { matched: true, params, wildcard };
    }

    const aSeg = actualSegs[i];
    if (aSeg === undefined) return { matched: false, params: {} };
    if (!isSafeSegment(aSeg)) return { matched: false, params: {} };

    if (pSeg.startsWith(PARAM_PREFIX)) {
      const name = pSeg.slice(1);
      if (!name) return { matched: false, params: {} };
      params[name] = aSeg;
      continue;
    }

    if (pSeg !== aSeg) return { matched: false, params: {} };
  }

  if (i !== actualSegs.length) return { matched: false, params: {} };

  return { matched: true, params };
}

export function isWildcardPattern(pattern: string): boolean {
  const segs = splitPath(pattern);
  return segs[segs.length - 1] === WILDCARD;
}
