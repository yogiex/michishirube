const UNSAFE_PATH_CHARS = /[\x00-\x1f\x7f-\x9f]/;

export function safeReturnTo(value: string | null | undefined): string {
  if (!value || !value.startsWith('/') || value.startsWith('//') || value.startsWith('/\\')) {
    return '/';
  }

  if (UNSAFE_PATH_CHARS.test(value)) return '/';

  try {
    const parsed = new URL(value, 'https://dashboard.invalid');
    if (parsed.origin !== 'https://dashboard.invalid') return '/';
    return `${parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return '/';
  }
}

export function isSameOriginRequest(request: Request): boolean {
  const origin = request.headers.get('origin');
  return origin === null || origin === new URL(request.url).origin;
}
