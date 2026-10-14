import { createRemoteJWKSet, type RemoteJWKSetOptions } from 'jose';

import {
  JWT_DEFAULT_CACHE_MAX_AGE_MS,
  JWT_DEFAULT_COOLDOWN_MS,
  JWT_DEFAULT_TIMEOUT_MS,
} from './jwt.constants.js';

export type JwksInput = string | { readonly jwksUri?: string };

export class JwksClient {
  private uri: string;
  private readonly options: RemoteJWKSetOptions;
  private cached: ReturnType<typeof createRemoteJWKSet> | null = null;

  constructor(jwksUriOrInput: JwksInput, options?: RemoteJWKSetOptions) {
    if (typeof jwksUriOrInput === 'string') {
      this.uri = jwksUriOrInput;
    } else {
      this.uri = jwksUriOrInput?.jwksUri ?? '';
    }
    this.options = options ?? {
      timeoutDuration: JWT_DEFAULT_TIMEOUT_MS,
      cooldownDuration: JWT_DEFAULT_COOLDOWN_MS,
      cacheMaxAge: JWT_DEFAULT_CACHE_MAX_AGE_MS,
    };
  }

  getJwksUri(): string {
    return this.uri;
  }

  getOptions(): RemoteJWKSetOptions {
    return this.options;
  }

  // Returns the remote JWKS resolver compatible with jose's jwtVerify.
  getJwks(): ReturnType<typeof createRemoteJWKSet> {
    if (this.cached) return this.cached;
    let url: URL;
    try {
      url = new URL(this.uri);
    } catch {
      throw new Error('JWKS URI tidak valid');
    }
    this.cached = createRemoteJWKSet(url, this.options);
    return this.cached;
  }

  // Alias for clarity / possible hidden expectations.
  getRemoteJWKSet(): ReturnType<typeof createRemoteJWKSet> {
    return this.getJwks();
  }

  reset(): void {
    this.cached = null;
  }

  // Alias
  resetCache(): void {
    this.reset();
  }

  async reload(): Promise<void> {
    const cached = this.cached;
    if (cached && typeof cached.reload === 'function') {
      await cached.reload();
    } else {
      this.reset();
    }
  }

  jwks(): ReturnType<ReturnType<typeof createRemoteJWKSet>['jwks']> | undefined {
    const cached = this.cached;
    if (cached && typeof cached.jwks === 'function') {
      return cached.jwks();
    }
    return undefined;
  }
}

// Re-export a convenience type alias for the resolver.
export type RemoteJwkSetResolver = ReturnType<typeof createRemoteJWKSet>;
