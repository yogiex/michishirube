export const AUTH_COOKIE_NAME = 'michishirube-auth';
export const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

export function setAuthCookie(token: string, remember: boolean): void {
  if (typeof document === 'undefined') return;

  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  const maxAge = remember ? `; Max-Age=${AUTH_COOKIE_MAX_AGE}` : '';
  document.cookie = `${AUTH_COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; SameSite=Lax${maxAge}${secure}`;
}

export function clearAuthCookie(): void {
  if (typeof document === 'undefined') return;
  document.cookie = `${AUTH_COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax`;
}

export function readAuthCookie(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;

  const value = cookieHeader
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${AUTH_COOKIE_NAME}=`))
    ?.slice(AUTH_COOKIE_NAME.length + 1);

  return value ? decodeURIComponent(value) : null;
}
