# ADR-0001: Use NestJS + Fastify

| Field      | Value                |
| ---------- | -------------------- |
| Status     | Accepted             |
| Date       | 2026-09-23           |
| Deciders   | Platform Engineering |
| Supersedes | —                    |

## Context

Michishirube adalah API Gateway yang harus:

- Handle high-traffic (5.000+ RPS per instance)
- Support plugin architecture (auth, rate limit, routing, dll)
- Mudah dites dan dimaintain
- Produktif untuk developer

Kami butuh framework yang:

- Modular & testable
- Performa tinggi (bukan hanya Express default)
- TypeScript-first
- Ekosistem luas (middleware, DI, guard, interceptor)

## Decision

Gunakan **NestJS 12** sebagai framework utama + **Fastify 5** sebagai HTTP adapter.

- NestJS: DI, module system, guard, interceptor, pipe, decorator
- Fastify: HTTP server performa tinggi (2-3x Express)
- `@nestjs/platform-fastify` sebagai bridge

## Consequences

### Positive

- **Performa**: Fastify ~2-3x lebih cepat dari Express untuk JSON serialization
- **Modular**: setiap kapabilitas = module, mudah di-test
- **DI bawaan**: constructor injection, mudah mock
- **Decorator**: `@Controller`, `@Get`, `@Roles`, dll
- **Ekosistem**: `@nestjs/terminus`, `@nestjs/config`, `@nestjs/swagger` resmi
- **TypeScript native**: type safety full

### Negative

- **Learning curve**: developer harus paham DI, decorator, module
- **Bootstrap overhead**: NestJS punya startup ~200ms lebih lambat dari Express polos
- **Bundle size**: dependency lebih banyak

### Neutral

- Cold start tetap < 2 detik (acceptable untuk container)
- Bisa ganti ke Express kalau perlu (NestJS adapter pattern)

## Alternatives Considered

| Alternatif        | Alasan Ditolak                                            |
| ----------------- | --------------------------------------------------------- |
| **Express polos** | Tidak ada DI, guard, interceptor — semua manual           |
| **Fastify polos** | Sama seperti Express, tapi tanpa struktur                 |
| **Hono**          | Ringan, tapi ekosistem NestJS lebih kaya untuk enterprise |
| **tRPC**          | Bukan untuk API Gateway publik                            |
| **Go/Gin**        | Rewrite total, tim TS                                     |

## References

- https://nestjs.com
- https://fastify.dev
- `docs/TECHSTACK.md`
