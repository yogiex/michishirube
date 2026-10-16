# ADR-0004: No Database Access from Gateway

| Field      | Value                |
| ---------- | -------------------- |
| Status     | Accepted             |
| Date       | 2026-09-23           |
| Deciders   | Platform Engineering |
| Supersedes | —                    |

## Context

API Gateway harus:

- Stateless (scale horizontal bebas)
- Cepat (p95 < 10ms overhead)
- Tidak menjadi bottleneck
- Tidak menjadi SPOF jika DB down

Ada temptasi untuk:

- Simpan config tenant di PostgreSQL
- Simpan API key di PostgreSQL
- Simpan route di PostgreSQL

Namun, ini melanggar prinsip gateway.

## Decision

**Gateway TIDAK PERNAH akses database.**

- State runtime: **Redis** (rate limit, idempotency, cache, revocation)
- State config: **YAML file** (routes.yaml, tenants.yaml)
- Database: **tanggung jawab upstream microservice**

Gateway hanya:

1. Terima request HTTP
2. Auth, rate limit, route resolve
3. Forward ke upstream via HTTP/gRPC
4. Kembalikan response

## Consequences

### Positive

- **Stateless**: scale horizontal bebas tanpa session affinity
- **Isolasi kegagalan**: DB down tidak menjatuhkan gateway
- **Latency rendah**: tidak ada query DB di critical path
- **Security**: gateway tidak punya kredensial DB
- **Boundary jelas**: DB = domain bisnis, bukan gateway

### Negative

- **Config update**: butuh hot reload via admin API (bukan langsung update DB)
- **API key storage**: di Redis (bukan relational), tidak bisa JOIN
- **Audit log**: di Redis (bukan SQL), kurang powerful untuk query kompleks
- **Reporting**: butuh export ke sistem lain untuk analitik

### Neutral

- Config di YAML → GitOps-friendly (audit trail via git)
- Redis persistence: AOF + RDB (durability acceptable)

## Alternatives Considered

| Alternatif                   | Alasan Ditolak                           |
| ---------------------------- | ---------------------------------------- |
| **PostgreSQL untuk config**  | Menjadikan gateway stateful, sulit scale |
| **PostgreSQL untuk API key** | Sama, + latency query                    |
| **SQLite embedded**          | Tidak bisa share antar instance          |
| **MongoDB untuk audit**      | Overhead, tidak perlu document store     |

## References

- `docs/ARCHITECTURE.md` §10 (Aliran Data ke Database)
- `docs/RESILIENCE.md` §8 (Slow Query & Prisma)
- ADR-0003 (Redis as only state)
