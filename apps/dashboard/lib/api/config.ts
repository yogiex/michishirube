const DEFAULT_DEVELOPMENT_API_URL = 'http://localhost:7300';

function isLocalHostname(hostname: string): boolean {
  return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]';
}

export function resolveApiBaseUrl(
  rawUrl: string | undefined,
  environment: string = process.env.NODE_ENV ?? 'production',
): string {
  if (rawUrl === undefined) {
    return environment === 'production' ? '' : DEFAULT_DEVELOPMENT_API_URL;
  }

  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    throw new Error('NEXT_PUBLIC_API_URL must be a valid absolute URL');
  }

  if (url.username !== '' || url.password !== '') {
    throw new Error('NEXT_PUBLIC_API_URL must not include credentials');
  }

  const allowHttp = environment !== 'production' && isLocalHostname(url.hostname);
  if (url.protocol !== 'https:' && !(allowHttp && url.protocol === 'http:')) {
    throw new Error('NEXT_PUBLIC_API_URL must use HTTPS outside local development');
  }

  return url.toString().replace(/\/$/, '');
}
