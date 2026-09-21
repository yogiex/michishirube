# ADR-0003: Redis as Only State Store

| Field   | Value                |
| ------- | -------------------- |
| Status  | Accepted             |
| Tanggal | 2026-09-21           |
| Decider | Platform Engineering |

---

## Context

API Gateway perlu menyimpan beberapa jenis state:

- **Rate limit counter** — berapa request dari suatu tenant/IP dalam window tertentu.
- **Idempotency record** — apakah request dengan key tertentu sudah diproses.
- **Response cache** — cache hasil upstream untuk latency lebih rendah.
- **Circuit breaker state** — apakah upstream sedang down.
- **Route config** — resolved routes untuk hot reload.

Pilihan state storage:

1. **Redis** — distributed, atomic ops, TTL built-in, widely supported.
2. **PostgreSQL** — ACID, tapi overkill untuk counter dan cache.
3. **In-memory (per-pod)** — cepat, tapi tidak shared antar instance.
4. **File-based (YAML)** — hanya cocok untuk route config, bukan runtime state.

---

## Decision

**Redis adalah satu-satunya state store runtime.**

- Rate limit, idempotency, cache → Redis.
- Circuit breaker → in-memory (lokal) + Redis pub/sub (sinkronisasi antar pod).
- Route config → YAML file (source of truth) + Redis (cache untuk hot reload).
- JWKS → in-memory (dikelola oleh `jose` library, auto-rotate).
- Gateway sendiri **stateless** — tidak ada state yang harus survive restart.

---

## Consequences

### Positif

- **Stateless pods**: gateway bisa di-scale horizontal tanpa state migration.
- **Single dependency**: hanya perlu operasional Redis, bukan 3+ storage.
- **Atomic operations**: Redis SETNX, INCR, pipeline cocok untuk rate limit & idempotency.
- **TTL built-in**: otomatis bersihkan data lama tanpa cron job.
- **Shared state**: semua pod melihat data yang sama.

### Negatif

- **Single point of failure**: Redis down → rate limit & idempotency tidak berfungsi.
- **Latency**: setiap request melibatkan Redis call (rate limit check).
- **Memory limit**: Redis memory terbatas, tidak cocok untuk cache raksasa.

### Mitigasi

- **Redis HA**: minimal Redis Sentinel, idealnya Redis Cluster.
- **Fail-open** untuk rate limit: jika Redis down, allow request (toleransi false negative).
- **Fail-closed** untuk idempotency: jika Redis down, reject duplicate request (toleransi false positive lebih baik daripada double-process).
- **Circuit breaker lokal**: state in-memory tetap berfungsi meskipun Redis pub/sub down.
- **Monitoring**: alert jika Redis latency > threshold atau memory > 80%.

---

## State Detail

| State          | Redis Structure                        | TTL          | Failure Mode     |
| -------------- | -------------------------------------- | ------------ | ---------------- |
| Rate limit     | `RATE:{tenant}:{window}` (sorted set)  | window       | Fail-open        |
| Idempotency    | `IDEMP:{key}` (string, value=response) | 24h          | Fail-closed      |
| Response cache | `CACHE:{key}` (string, value=body)     | configurable | Skip cache       |
| Circuit state  | `CIRCUIT:{service}` (hash) + pub/sub   | -            | Local fallback   |
| Route config   | `ROUTE:{tenant}:{path}` (hash)         | -            | Fallback ke YAML |

---

## Alternatives yang Ditolak

| Alternatives                 | Alasan Ditolak                                |
| ---------------------------- | --------------------------------------------- |
| PostgreSQL untuk rate limit  | Overkill untuk counter, latency lebih tinggi  |
| In-memory (per-pod)          | Tidak shared, rate limit per-pod tidak akurat |
| Memcached                    | Tidak ada atomic ops, tidak ada pub/sub       |
| File-based untuk semua state | Tidak distributed, race condition             |
