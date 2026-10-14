import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { jwtVerify, type JWTPayload } from 'jose';
import { createPrincipal, type Principal } from '@/core/auth/domain/principal.entity.js';
import type { TokenVerifierPort } from '@/core/auth/domain/token-verifier.port.js';
import { JwksClient } from './jwks.client.js';
import { JWT_ALGORITHMS, TENANT_CLAIM_KEYS } from './jwt.constants.js';
import {
  AuthAudienceInvalidError,
  AuthInvalidError,
  AuthIssuerInvalidError,
  AuthJwksUnavailableError,
  AuthSignatureInvalidError,
  AuthTokenExpiredError,
} from '@/shared/errors/index.js';

function isJwksClient(value: unknown): value is JwksClient {
  return (
    value instanceof JwksClient ||
    (typeof value === 'object' &&
      value !== null &&
      'getJwks' in value &&
      typeof (value as { getJwks?: unknown }).getJwks === 'function')
  );
}

function isConfigService(value: unknown): value is ConfigService {
  return (
    value instanceof ConfigService ||
    (typeof value === 'object' &&
      value !== null &&
      'get' in value &&
      typeof (value as { get?: unknown }).get === 'function')
  );
}

@Injectable()
export class JwtVerifierAdapter implements TokenVerifierPort {
  private readonly logger = new Logger(JwtVerifierAdapter.name);
  private readonly client: JwksClient;
  private readonly config: ConfigService;

  constructor(first: unknown, second?: unknown) {
    if (isJwksClient(first) && isConfigService(second)) {
      this.client = first;
      this.config = second;
    } else if (isConfigService(first) && isJwksClient(second)) {
      this.config = first;
      this.client = second as JwksClient;
    } else {
      // Fallbacks for partially-constructed test doubles.
      if (isConfigService(first)) {
        this.config = first;
        this.client = second as JwksClient;
      } else if (isJwksClient(first)) {
        this.client = first;
        this.config = second as ConfigService;
      } else {
        throw new Error('JwtVerifierAdapter requires JwksClient and ConfigService');
      }
    }
  }

  async verify(token: string): Promise<Principal> {
    const issuer = this.config.get<string>('jwt.issuer') ?? '';
    const audience = this.config.get<string>('jwt.audience') ?? '';
    const jwksUri = this.config.get<string>('jwt.jwksUri') ?? '';

    if (jwksUri.trim().length === 0) {
      this.logger.error('JWKS URI belum dikonfigurasi');
      throw new AuthJwksUnavailableError('JWKS URI belum dikonfigurasi');
    }

    let jwks: ReturnType<JwksClient['getJwks']>;
    try {
      jwks = this.client.getJwks();
    } catch (error) {
      throw new AuthJwksUnavailableError('JWKS URI tidak valid', {
        cause: error instanceof Error ? error : undefined,
      });
    }

    try {
      const { payload } = await jwtVerify(token, jwks, {
        algorithms: [...JWT_ALGORITHMS],
        issuer: issuer.trim().length > 0 ? issuer : undefined,
        audience: audience.trim().length > 0 ? audience : undefined,
      });

      const expiresAt = this.toDate(payload.exp);
      if (!expiresAt) {
        throw new AuthInvalidError('Claim exp tidak valid');
      }

      const userId = this.toString(payload.sub);
      if (userId.length === 0) {
        throw new AuthInvalidError('Claim sub tidak valid');
      }

      const tenantId = this.readClaim(payload, TENANT_CLAIM_KEYS);
      if (tenantId.length === 0) {
        throw new AuthInvalidError('Claim tenant tidak valid');
      }

      const roles = this.toStringArray(
        this.readOptionalClaim(payload, ['roles', 'role', 'groups']),
      );
      const scopes = this.toScopes(payload);

      return createPrincipal({
        kind: 'user',
        userId,
        tenantId,
        roles,
        scopes,
        issuedAt: this.toDate(payload.iat) ?? undefined,
        expiresAt,
        claims: { ...payload },
      });
    } catch (error) {
      throw this.mapError(error);
    }
  }

  private readClaim(payload: JWTPayload, keys: readonly string[]): string {
    for (const key of keys) {
      const value = payload[key as keyof JWTPayload];
      const normalized = this.toString(value);
      if (normalized.length > 0) return normalized;
    }
    return '';
  }

  private readOptionalClaim(payload: JWTPayload, keys: readonly string[]): unknown {
    for (const key of keys) {
      if (Object.prototype.hasOwnProperty.call(payload, key)) {
        return payload[key as keyof JWTPayload];
      }
    }
    return undefined;
  }

  private mapError(error: unknown): Error {
    if (
      error instanceof AuthInvalidError ||
      error instanceof AuthTokenExpiredError ||
      error instanceof AuthSignatureInvalidError ||
      error instanceof AuthIssuerInvalidError ||
      error instanceof AuthAudienceInvalidError ||
      error instanceof AuthJwksUnavailableError
    ) {
      return error;
    }

    if (error instanceof Error) {
      switch (error.name) {
        case 'JWTExpired':
          return new AuthTokenExpiredError('Token sudah kadaluarsa');
        case 'JWSSignatureVerificationFailed':
        case 'JWSInvalid':
          return new AuthSignatureInvalidError('Signature token tidak valid');
        case 'JWTClaimValidationFailed': {
          const claim = (error as { claim?: string }).claim;
          if (claim === 'iss') return new AuthIssuerInvalidError('Issuer token tidak valid');
          if (claim === 'aud') return new AuthAudienceInvalidError('Audience token tidak valid');
          return new AuthInvalidError('Claim token tidak valid');
        }
        case 'JWKSNoMatchingKey':
        case 'JWKSMultipleMatchingKeys':
          return new AuthJwksUnavailableError('Kunci JWKS tidak ditemukan');
        default:
          if (/fetch|network|ECONN/i.test(error.message)) {
            return new AuthJwksUnavailableError('JWKS tidak dapat diakses');
          }
          return new AuthInvalidError('Token tidak valid');
      }
    }

    return new AuthInvalidError('Token tidak valid');
  }

  private toDate(value: unknown): Date | null {
    if (typeof value !== 'number' || !Number.isFinite(value)) return null;
    return new Date(value * 1000);
  }

  private toString(value: unknown): string {
    if (typeof value === 'string') return value;
    if (typeof value === 'number') return String(value);
    return '';
  }

  private toStringArray(value: unknown): string[] {
    if (!Array.isArray(value)) return [];
    return value.map((entry) => String(entry));
  }

  private toScopes(payload: JWTPayload): string[] {
    const candidate =
      payload.scope ?? payload.scopes ?? (payload as Record<string, unknown>)['permissions'];
    if (Array.isArray(candidate)) return candidate.map(String);
    if (typeof candidate === 'string') {
      return candidate.split(/\s+/).filter((s) => s.length > 0);
    }
    return [];
  }
}
