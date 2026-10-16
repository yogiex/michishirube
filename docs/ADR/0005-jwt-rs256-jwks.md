# ADR-0005: JWT Verification via RS256 and JWKS

| Field      | Value                |
| ---------- | -------------------- |
| Status     | Accepted             |
| Date       | 2026-09-24           |
| Deciders   | Platform Engineering |
| Supersedes | —                    |

## Context

Gateway perlu memverifikasi JWT dari issuer eksternal (Keycloak/IdP) tanpa akses DB
dan tanpa membagi shared secret dengan upstream.

## Decision

- Gunakan algoritma **RS256** saja (`JWT_ALGORITHMS = ['RS256']`).
- Verifikasi signature melalui **remote JWKS** (`createRemoteJWKSet` dari `jose`)
  dengan timeout/cooldown/cache max age yang bisa dikonfigurasi.
- Issuer dan audience divalidasi jika dikonfigurasi.
- Claim wajib: `sub`, `exp`, dan tenant id (`tenantId`/`tenant_id`/`tid`).

## Consequences

### Positive

- Kunci publik diambil dinamis dari issuer; rotasi key tidak butuh deploy.
- RS256 asimetris menghindari shared-secret leakage.
- Fail-closed: token tanpa issuer/audience valid ditolak.

### Negative

- Tergantung ketersediaan JWKS endpoint (mitigasi: cooldown + cache).

## References

- `src/infrastructure/jwt/jwt.constants.ts`
- `src/infrastructure/jwt/jwks.client.ts`
- `src/infrastructure/jwt/jwt-verifier.adapter.ts`
- `src/core/auth/application/verify-token.usecase.ts`
