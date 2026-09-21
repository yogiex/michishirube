# ADR-0002: Hexagonal Architecture over Full DDD

| Field | Value |
|---|---|
| Status | Accepted |
| Tanggal | 2026-09-21 |
| Decider | Platform Engineering |

---

## Context

API Gateway berfungsi sebagai **routing proxy** — menerima request, melakukan auth/rate-limit, lalu meneruskan ke upstream. Bukan domain bisnis.

Dua pendekatan yang layak dipertimbangkan:

1. **Domain-Driven Design (DDD)** — rich domain model, aggregates, domain events, repositories.
2. **Hexagonal (Ports & Adapters)** — core murni, adapter bisa ditukar, fokus pada boundary.

DDD cocok untuk aplikasi dengan domain bisnis kompleks (e.g., order management, billing). Gateway tidak memiliki domain seperti itu.

---

## Decision

**Gunakan Hexagonal (Ports & Adapters), bukan DDD penuh.**

- Domain layer berisi **entity, value object, dan port** (interface).
- Application layer berisi **use case** yang orchestrate port.
- Infrastructure layer berisi **adapter** yang implement port.
- Interface layer (NestJS modules, guards, middleware) menangani HTTP.

Tidak ada aggregate root, domain event, atau repository pattern klasik. Port langsung merepresentasikan kebutuhan infra (Redis, HTTP client, JWKS).

---

## Consequences

### Positif
- **Testability**: core bisa dites tanpa Redis, HTTP, atau NestJS (mock port).
- **Replaceability**: ganti ioredis → Redisson tinggal ganti adapter, core tidak berubah.
- **Simplicity**: tidak perlu belajar DDD untuk gateway yang本质上 adalah proxy.
- **Sejalan NestJS**: NestJS secara natural mendukung dependency injection yang cocok untuk port/adapter.

### Negatif
- **Tidak ada bahasa ubiquitous language**: tidak ada domain model untuk "talking about" — karena memang tidak ada domain.
- **Overhead mental**: developer yang terbiasa DDD mungkin merasa kurang "_STRUCTURED".
- **Tidak scale ke domain kompleks**: jika gateway berkembang menjadi lebih dari proxy, mungkin perlu DDD.

### Mitigasi
- Dokumentasikan di `ARCHITECTURE.md` §2 dengan aturan dependency yang jelas.
- Gunakan `dependency-cruiser` di CI untuk enforce layer boundaries.
- Jika scope berkembang, re-evaluasi dengan ADR baru.

---

## Alternatives yang Ditolak

| Alternatives | Alasan Ditolak |
|---|---|
| Full DDD | Overkill — gateway bukan domain bisnis |
| Layered tanpa hexagonal | Kurang jelas boundary, infra bisa bocor ke core |
| Clean Architecture murni | Terlalu rigid untuk NestJS ecosystem |