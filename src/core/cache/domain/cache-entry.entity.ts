export interface CachedResponse {
  readonly status: number;
  readonly headers: Readonly<Record<string, string>>;
  readonly body: string;
  readonly createdAt: number;
  readonly expiresAt: number;
  readonly etag?: string;
  readonly age: number;
}

export type CacheLookupResult =
  | { readonly kind: 'hit'; readonly entry: CachedResponse; readonly stale: boolean }
  | { readonly kind: 'miss' }
  | { readonly kind: 'error'; readonly reason: string };
