const encoder = new TextEncoder();
const decoder = new TextDecoder();
const SIGNATURE_LENGTH = 43;

export interface AuthUser {
  readonly userId: string;
  readonly tenantId: string;
  readonly roles: readonly string[];
  readonly email: string;
}

interface SessionClaims extends AuthUser {
  readonly expiresAt: number;
}

export const SESSION_COOKIE_NAME = 'michishirube-session';
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;
export const REMEMBERED_SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

function getSessionSecret(): string {
  const secret = process.env.DASHBOARD_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error('DASHBOARD_SESSION_SECRET must contain at least 32 characters');
  }
  return secret;
}

function toBase64Url(bytes: Uint8Array): string {
  return Buffer.from(bytes).toString('base64url');
}

function fromBase64Url(value: string): Uint8Array {
  return Buffer.from(value, 'base64url');
}

function isAuthUser(value: unknown): value is AuthUser {
  if (typeof value !== 'object' || value === null) return false;
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.userId === 'string' &&
    candidate.userId.length > 0 &&
    candidate.userId.length <= 128 &&
    typeof candidate.tenantId === 'string' &&
    candidate.tenantId.length > 0 &&
    candidate.tenantId.length <= 128 &&
    Array.isArray(candidate.roles) &&
    candidate.roles.length > 0 &&
    candidate.roles.length <= 20 &&
    candidate.roles.every(
      (role) => typeof role === 'string' && role.length > 0 && role.length <= 64,
    ) &&
    typeof candidate.email === 'string' &&
    candidate.email.length <= 254
  );
}

async function sign(value: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(getSessionSecret()),
    { hash: 'SHA-256', name: 'HMAC' },
    false,
    ['sign'],
  );
  return toBase64Url(new Uint8Array(await crypto.subtle.sign('HMAC', key, encoder.encode(value))));
}

export async function createSessionToken(user: AuthUser, remember = false): Promise<string> {
  if (!isAuthUser(user) || !user.roles.includes('admin')) {
    throw new Error('Invalid dashboard administrator');
  }
  const maxAge = remember ? REMEMBERED_SESSION_MAX_AGE_SECONDS : SESSION_MAX_AGE_SECONDS;
  const claims: SessionClaims = {
    ...user,
    expiresAt: Math.floor(Date.now() / 1000) + maxAge,
  };
  const payload = toBase64Url(encoder.encode(JSON.stringify(claims)));
  return `${payload}.${await sign(payload)}`;
}

export async function verifySessionToken(token: string | undefined): Promise<AuthUser | null> {
  if (!token) return null;
  const [payload, signature, extra] = token.split('.');
  if (!payload || !signature || extra || signature.length !== SIGNATURE_LENGTH) return null;

  const expected = await sign(payload);
  if (signature.length !== expected.length) return null;
  let difference = 0;
  for (let index = 0; index < expected.length; index += 1) {
    difference |= expected.charCodeAt(index) ^ signature.charCodeAt(index);
  }
  if (difference !== 0) return null;

  try {
    const claims: unknown = JSON.parse(decoder.decode(fromBase64Url(payload)));
    if (typeof claims !== 'object' || claims === null) return null;
    const record = claims as Record<string, unknown>;
    if (typeof record.expiresAt !== 'number' || record.expiresAt <= Math.floor(Date.now() / 1000)) {
      return null;
    }
    const user: AuthUser = {
      userId: String(record.userId),
      tenantId: String(record.tenantId),
      roles: Array.isArray(record.roles) ? record.roles.map(String) : [],
      email: String(record.email),
    };
    return isAuthUser(user) && user.roles.includes('admin') ? user : null;
  } catch {
    return null;
  }
}

export function sessionCookie(token: string, remember = false): string {
  const maxAge = remember ? REMEMBERED_SESSION_MAX_AGE_SECONDS : SESSION_MAX_AGE_SECONDS;
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  return `${SESSION_COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${maxAge}${secure}`;
}

export function clearSessionCookie(): string {
  return `${SESSION_COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`;
}
