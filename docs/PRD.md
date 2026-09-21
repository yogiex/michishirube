# Product Requirements Document (PRD)

## Enterprise Multi-Tenant API Gateway

| Field               | Value                |
| ------------------- | -------------------- |
| Nama Produk         | API Gateway NestJS   |
| Versi Dokumen       | 1.0.0                |
| Status              | Draft                |
| Pemilik             | Platform Engineering |
| Terakhir Diperbarui | 2026-09-21           |

---

## 1. Latar Belakang

Organisasi memiliki banyak microservice (Auth, Order, Billing, Notification) yang
saat ini diekspos langsung ke klien. Hal ini menimbulkan masalah:

- Autentikasi & otorisasi terduplikasi di setiap service.
- Tidak ada rate limiting terpusat → rawan abuse.
- Tidak ada idempotency → duplikasi transaksi saat retry.
- Tidak ada circuit breaker → satu service down menjatuhkan klien.
- Tidak ada observability terpusat (trace, metric, log).
- Routing multi-tenant dilakukan manual dan tidak konsisten.

API Gateway ini hadir sebagai **single entry point** yang menangani cross-cutting
concern tersebut, sehingga microservice dapat fokus pada domain bisnisnya.

---

## 2. Tujuan (Goals)

1. Menyediakan **single entry point** untuk semua trafik klien.
2. Menyediakan **autentikasi & otorisasi terpusat** (JWT + API Key + RBAC).
3. Menyediakan **dynamic routing** berbasis tenant/project.
4. Menjamin **reliability**: rate limit, idempotency, circuit breaker, retry, timeout.
5. Menyediakan **observability**: metrics, tracing, structured logging.
6. Mendukung **horizontal scaling** tanpa state lokal.
7. Menyediakan **kontrak API yang stabil** dan terdokumentasi (OpenAPI).

## 3. Non-Tujuan (Non-Goals)

Hal berikut secara eksplisit **bukan** tanggung jawab gateway:

- Menyimpan data bisnis (order, user profile, transaksi).
- Menjalankan business logic microservice.
- Menjadi message broker / event bus.
- Menjadi database gateway (kecuali cache & config tenant).
- Menangani SSL termination (dilakukan edge proxy seperti Nginx/Cloudflare).

---

## 4. Persona & Use Case

### Persona

- **Klien Eksternal**: Web, mobile, partner API.
- **Developer Internal**: memanggil service via gateway.
- **Platform Engineer**: mengoperasikan gateway.
- **Security Engineer**: mengaudit akses.

### Use Case Utama

| ID    | Use Case                                                | Aktor    |
| ----- | ------------------------------------------------------- | -------- |
| UC-01 | Klien mengirim request ke `/api/v1/orders`              | Klien    |
| UC-02 | Gateway memvalidasi JWT dan meneruskan ke Order Service | Gateway  |
| UC-03 | Klien mengirim ulang request dengan `Idempotency-Key`   | Klien    |
| UC-04 | Tenant A melebihi kuota → ditolak 429                   | Gateway  |
| UC-05 | Order Service down → gateway mengembalikan fallback     | Gateway  |
| UC-06 | Engineer melihat metric latency di Grafana              | Engineer |

---

## 5. Functional Requirements

### FR-01 Autentikasi

- Validasi JWT (RS256/ES256) via JWKS.
- Validasi API Key (hashed) untuk partner.
- Tolak request tanpa kredensial valid dengan `401`.
- Sertakan `X-Request-ID` dan `X-Tenant-ID` yang sudah tervalidasi ke upstream.

### FR-02 Otorisasi (RBAC)

- Role & permission dievaluasi dari JWT claim.
- Dukungan scope per tenant/project.
- Tolak dengan `403` jika tidak berwenang.

### FR-03 Tenant Resolution

- Prioritas resolusi: JWT claim → Subdomain → Header `X-Tenant-ID`.
- Tenant tidak dikenal → `404` atau `403`.
- Semua cache key, rate limit key, idempotency key **wajib** di-prefix tenant.

### FR-04 Dynamic Routing

- Routing berbasis konfigurasi (file + Redis) yang bisa di-reload tanpa restart.
- Mendukung path rewrite, header injection, query forwarding.
- Mendukung upstream HTTP dan gRPC (ZeroMQ opsional, lihat ADR).

### FR-05 Rate Limiting

- Sliding window berbasis Redis (atomic Lua script).
- Dimensi: per IP, per user, per tenant, per endpoint.
- Tier: free, standard, enterprise.
- Response `429` dengan header `Retry-After`, `X-RateLimit-Limit`,
  `X-RateLimit-Remaining`, `X-RateLimit-Reset`.

### FR-06 Idempotency

- Header `Idempotency-Key` untuk request non-idempotent (POST/PUT/PATCH).
- Lock via `SET NX PX` + Lua.
- Simpan response (status, header, body) dengan TTL (default 24 jam).
- Request concurrent dengan key sama → `409 Conflict` atau tunggu.

### FR-07 Circuit Breaker

- Per upstream service (dan opsional per route).
- State: Closed → Open → Half-Open.
- Fallback response dapat dikonfigurasi.
- Emit metric saat state berubah.

### FR-08 Timeout & Retry

- Timeout default per upstream (configurable).
- Retry hanya untuk idempotent method (GET, HEAD, OPTIONS).
- Retry dengan exponential backoff + jitter.

### FR-09 Caching

- Cache response untuk endpoint `GET` yang ditandai cacheable.
- Cache key = tenant + method + path + query + vary header.
- Invalidasi via TTL dan purge endpoint (internal).

### FR-10 Observability

- Metrics Prometheus: `http_requests_total`, `http_request_duration_seconds`,
  `gateway_upstream_errors_total`, `gateway_circuit_state`.
- Tracing OpenTelemetry dengan propagasi W3C Trace Context.
- Structured logging JSON (Pino) dengan `requestId`, `tenantId`, `userId`.

### FR-11 Health Check

- `GET /health/live` → liveness (proses hidup).
- `GET /health/ready` → readiness (Redis, upstream config siap).
- `GET /health` → ringkasan dependency.

### FR-12 API Documentation

- OpenAPI 3.1 di `/docs` (Swagger UI).
- Spesifikasi error response standar.

---

## 6. Non-Functional Requirements

| Kategori                 | Target                               |
| ------------------------ | ------------------------------------ |
| Latency overhead gateway | < 10 ms (p95)                        |
| Throughput per instance  | ≥ 5.000 RPS                          |
| Availability             | 99.95%                               |
| Skala horizontal         | Stateless, bisa scale ke N instance  |
| Cold start               | < 2 detik                            |
| Memory                   | < 512 MB per instance (steady state) |
| Keamanan                 | OWASP API Top 10                     |
| Observability            | 100% request punya trace + requestId |
| Deployment               | Zero-downtime rolling update         |

---

## 7. Arsitektur Tingkat Tinggi

```text
[Client] → [Edge LB / WAF] → [Gateway Cluster (N instance)]
                                     │
                     ┌───────────────┼───────────────┐
                     ▼               ▼               ▼
                 [Redis HA]     [Upstream HTTP]  [Upstream gRPC]
                                (Auth, Order)    (Internal)
```

Gateway **stateless**. Semua state (rate limit, idempotency, cache, route config)
disimpan di Redis HA.

---

## 8. Batasan & Asumsi

- Gateway tidak menyimpan data bisnis.
- Gateway tidak mengakses database bisnis secara langsung.
- Redis adalah dependency kritis → wajib HA.
- Upstream service sudah punya observability sendiri.
- Konfigurasi route disimpan di file YAML + Redis untuk override dinamis.

---

## 9. Risiko

| Risiko                    | Dampak                               | Mitigasi                               |
| ------------------------- | ------------------------------------ | -------------------------------------- |
| Redis down                | Semua rate limit & idempotency gagal | Redis Sentinel/Cluster, fallback lokal |
| Overengineering ZeroMQ    | Maintenance tinggi                   | ADR: default gRPC, ZeroMQ opsional     |
| Tenant leakage            | Kebocoran data                       | Prefix tenant di semua key & log       |
| Cardinality metric tinggi | Prometheus berat                     | Batasi label, hindari tenant_id mentah |
| JWT key compromise        | Akses tidak sah                      | RS256 + rotasi key + JWKS              |

---

## 10. Metrik Keberhasilan (KPI)

- p95 latency overhead gateway < 10 ms.
- Error rate gateway (5xx) < 0.1%.
- Rate limit akurat lintas instance (deviasi < 1%).
- Idempotency mencegah 100% duplicate transaksi pada retry.
- MTTR insiden < 15 menit berkat observability.

---

## 11. Roadmap

### Fase 1 — MVP

- Auth JWT + API Key
- Tenant resolution
- Dynamic routing HTTP
- Rate limit Redis
- Health check
- Logging + metrics dasar

### Fase 2 — Reliability

- Idempotency
- Circuit breaker
- Retry & timeout
- Tracing OpenTelemetry
- OpenAPI

### Fase 3 — Advanced

- gRPC transport
- Caching
- Canary routing
- Admin API untuk route management
- Multi-region

---

## 12. Pertanyaan Terbuka

1. Apakah gateway perlu menyimpan konfigurasi route di database?
2. Apakah ZeroMQ benar-benar dibutuhkan?
3. Siapa yang mengelola JWKS dan rotasi key?
4. Bagaimana kebijakan retensi log & PII?
5. Apakah perlu WebSocket/SSE di fase awal?
