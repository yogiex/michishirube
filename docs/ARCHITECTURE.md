# Architecture — API Gateway

| Field | Value |
|---|---|
| Versi | 1.0.0 |
| Status | Approved |
| Pemilik | Platform Engineering |
| Terakhir Diperbarui | 2026-09-21 |
| Dokumen Terkait | `PRD.md`, `STRUCTURE.md`, `TECHSTACK.md`, `ADR/` |

---

## 1. Gaya Arsitektur

**Hexagonal (Ports & Adapters) + Modular Monolith**

- **Bukan** microservices (terlalu dini, overhead besar)
- **Bukan** DDD penuh (gateway bukan domain bisnis)
- **Ya** Hexagonal — core murni, adapter bisa ditukar
- **Ya** Modular — siap dipecah jika perlu

Alasan pemilihan: lihat `ADR/0002-hexagonal-over-ddd.md`.

---

## 2. Lapisan (Layers)

```
┌─────────────────────────────────────────────────┐
│  INTERFACE LAYER (modules/, guards/, middleware)│  ← HTTP, Fastify
├─────────────────────────────────────────────────┤
│  APPLICATION LAYER (core/*/application)         │  ← Use Cases
├─────────────────────────────────────────────────┤
│  DOMAIN LAYER (core/*/domain)                   │  ← Entity, VO, Port
├─────────────────────────────────────────────────┤
│  INFRASTRUCTURE LAYER (infrastructure/)         │  ← Redis, HTTP, JWT
└─────────────────────────────────────────────────┘
```

**Aturan dependency:** hanya ke dalam. Core tidak tahu infra.

| Layer | Boleh import | Dilarang import |
|---|---|---|
| Interface | Application, Domain | Infrastructure (langsung) |
| Application | Domain | Infrastructure, Interface |
| Domain | — (pure TS) | Semua layer lain |
| Infrastructure | Domain (implement Port) | Application, Interface |

Penegakan aturan: `dependency-cruiser` di CI.

---

## 3. Komponen Utama

| Komponen | Peran | Lokasi |
|---|---|---|
| **Proxy Controller** | Entry point semua request | `modules/proxy` |
| **Auth Guard** | Verifikasi JWT/API Key | `guards` |
| **RBAC Guard** | Cek role & scope | `guards` |
| **Tenant Guard** | Resolve & validasi tenant | `guards` |
| **Rate Limit Guard** | Cek kuota | `guards` |
| **Idempotency Interceptor** | Lock & replay response | `interceptors` |
| **Circuit Breaker** | Isolasi upstream down | `core/circuit-breaker` |
| **Router** | Resolve route dinamis | `core/routing` |
| **Proxy Adapter** | Forward ke upstream | `infrastructure/http` |
| **Redis Adapter** | Rate limit, idempotency, cache | `infrastructure/redis` |
| **Observability** | Log, metric, trace | `infrastructure/observability` |

---

## 4. Alur Request (End-to-End)

```
Client
  │
  ▼
[Edge LB] ──► [Fastify]
                 │
                 ▼
        [RequestIdMiddleware]        set X-Request-ID
                 │
                 ▼
        [TenantMiddleware]           resolve tenant
                 │
                 ▼
        [AuthGuard]                  JWT / API Key
                 │
                 ▼
        [RbacGuard]                  role + scope
                 │
                 ▼
        [RateLimitGuard]             Redis sliding window
                 │
                 ▼
        [ProxyController]
                 │
                 ▼
        [IdempotencyInterceptor]     lock + replay
                 │
                 ▼
        [RouteResolver]              cari upstream
                 │
                 ▼
        [CircuitBreaker]             cek state
                 │
                 ▼
        [ProxyAdapter] ──► upstream (HTTP/gRPC)
                 │
                 ▼
        [ResponseInterceptor]        transform + log + metric
                 │
                 ▼
              Client
```

Setiap tahap bisa fail-fast dengan error code terstandar (lihat `shared/errors`).

---

## 5. Bounded Context (Core Modules)

| Module | Tanggung Jawab | Port Utama |
|---|---|---|
| `tenant` | Resolusi & validasi tenant | `TenantRepository` |
| `routing` | Resolusi route & upstream | `RouteRepository` |
| `auth` | Verifikasi kredensial | `TokenVerifier` |
| `rbac` | Otorisasi | `PolicyEvaluator` |
| `rate-limit` | Kuota & throttling | `RateLimiter` |
| `idempotency` | Cegah duplikasi | `IdempotencyStore` |
| `circuit-breaker` | Isolasi kegagalan | `CircuitBreaker` |
| `cache` | Cache response | `CacheStore` |
| `observability` | Log, metric, trace | `Logger`, `Metrics`, `Tracer` |

Setiap module punya: **domain** (entity+port) → **application** (usecase) → **adapter** (infra).

---

## 6. Adapter (Infrastructure)

| Adapter | Implementasi Port | Teknologi |
|---|---|---|
| `RedisAdapter` | RateLimiter, IdempotencyStore, CacheStore | ioredis |
| `JwtAdapter` | TokenVerifier | jose + JWKS |
| `HttpProxyAdapter` | UpstreamClient | undici |
| `GrpcProxyAdapter` | UpstreamClient (fase 2) | @grpc/grpc-js |
| `YamlRouteRepository` | RouteRepository | fs + yaml |
| `RedisRouteRepository` | RouteRepository (override) | ioredis |
| `PinoAdapter` | Logger | pino |
| `PrometheusAdapter` | Metrics | prom-client |
| `OtelAdapter` | Tracer | OpenTelemetry |

---

## 7. State Management

| State | Storage | TTL | Alasan |
|---|---|---|---|
| Rate limit counter | Redis | window | atomic, distributed |
| Idempotency record | Redis | 24h | distributed lock |
| Response cache | Redis | configurable | shared antar instance |
| Route config | YAML + Redis | - | GitOps + hot reload |
| Circuit state | In-memory + Redis pub/sub | - | lokal cepat, sinkron antar instance |
| JWKS | Memory (jose cache) | auto | otomatis rotate |

**Gateway stateless.** Semua state di Redis atau file config.

Detail: lihat `ADR/0003-redis-as-only-state.md`.

---

## 8. Deployment Topology

```
                    ┌─────────────┐
                    │  Cloudflare │  ← WAF, DDoS
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │    Nginx    │  ← TLS termination
                    └──────┬──────┘
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
        ┌──────────┐ ┌──────────┐ ┌──────────┐
        │ Gateway  │ │ Gateway  │ │ Gateway  │  ← N replicas
        │  Pod 1   │ │  Pod 2   │ │  Pod N   │
        └────┬─────┘ └────┬─────┘ └────┬─────┘
             │            │            │
             └────────────┼────────────┘
                          ▼
                   ┌─────────────┐
                   │  Redis HA   │  ← Sentinel / Cluster
                   └─────────────┘
                          │
              ┌───────────┼───────────┐
              ▼           ▼           ▼
         [Auth Svc]  [Order Svc]  [Billing Svc]
```

**Karakteristik:**
- Gateway **stateless** → scale horizontal bebas
- Redis **wajib HA** (Sentinel minimal)
- Upstream di-resolve via K8s DNS
- Graceful shutdown untuk zero-downtime deploy

---

## 9. Cross-Cutting Concern

| Concern | Solusi | Lokasi |
|---|---|---|
| Request ID | Middleware | `middleware/request-id` |
| Tenant context | Middleware + AsyncLocalStorage | `middleware/tenant-context` |
| Auth | Guard | `guards/auth` |
| RBAC | Guard | `guards/rbac` |
| Rate limit | Guard | `guards/rate-limit` |
| Idempotency | Interceptor | `interceptors/idempotency` |
| Logging | Interceptor + Pino | `interceptors/logging` |
| Tracing | OpenTelemetry auto | `infrastructure/observability` |
| Metrics | Interceptor + prom-client | `interceptors/metrics` |
| Error | Global filter | `shared/errors` |
| Validation | Pipe + Zod | `shared/pipes` |
| Config | Module global | `config` |

---

## 10. Prinsip Desain

1. **Stateless** — tidak ada state lokal yang penting
2. **Fail-fast** — error cepat, jangan gantung
3. **Fail-safe** — fallback jika upstream down
4. **Idempotent** — request aman di-retry
5. **Observable** — setiap request bisa dilacak
6. **Isolated** — tenant A tidak bisa ganggu tenant B
7. **Replaceable** — adapter bisa ditukar tanpa ubah core
8. **Testable** — core bisa dites tanpa infra

---

## 11. Batasan (Constraints)

| Batasan | Alasan |
|---|---|
| Tidak ada DB di gateway | Gateway stateless |
| Tidak ada business logic | Itu tugas microservice |
| Tidak ada ZeroMQ | Overengineering |
| Tidak ada state lokal | Harus scale horizontal |
| Tidak ada `console.log` | Harus structured log |

---

## 12. Skenario Kegagalan

| Skenario | Dampak | Mitigasi |
|---|---|---|
| Redis down | Rate limit & idempotency gagal | Fail-open untuk rate limit, fail-closed untuk idempotency; alert |
| Upstream down | Request gagal | Circuit breaker + fallback |
| Upstream lambat | Thread pool habis | Timeout + bulkhead |
| JWKS endpoint down | Auth gagal | Cache JWKS di memory + retry |
| Pod crash | Request hilang | Replica ≥ 2 + graceful shutdown |
| Config route invalid | Routing salah | Validasi skema saat load + rollback ke versi sebelumnya |

---

## 13. Observability Contract

Setiap request **wajib** menghasilkan:

- **Log**: JSON terstruktur dengan `requestId`, `tenantId`, `userId`, `route`, `upstream`, `status`, `latencyMs`
- **Metric**: `http_requests_total`, `http_request_duration_seconds`, `gateway_upstream_errors_total`, `gateway_circuit_state`
- **Trace**: span W3C Trace Context yang diteruskan ke upstream

Kardinalitas metric dibatasi: **tidak** memakai `tenant_id` mentah sebagai label.

---

## 14. Testing Strategy

| Level | Fokus | Coverage Target |
|---|---|---|
| Unit | Domain & Use Case (mock Port) | ≥ 90% (`core/`) |
| Integration | Adapter (Redis, JWT, HTTP) | ≥ 70% (`infrastructure/`) |
| E2E | Alur request penuh | ≥ 70% (`modules/`) |
| Load | Throughput & latency | p95 < 10 ms overhead |
| Chaos | Redis down, upstream down | Semua skenario §12 |

---

## 15. Ringkasan

> **Hexagonal + Modular Monolith, NestJS v12 + Fastify, stateless, Redis-only state, 9 bounded context, 9 adapter, deploy di K8s dengan Redis HA.**

---

## 16. Referensi

- `docs/PRD.md` — Product Requirements
- `docs/STRUCTURE.md` — Struktur folder & aturan dependency
- `docs/TECHSTACK.md` — Tech stack final
- `docs/ADR/` — Architecture Decision Records