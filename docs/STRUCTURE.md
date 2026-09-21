# Project Structure
## API Gateway NestJS — Hexagonal + Modular Monolith

| Field | Value |
|---|---|
| Versi | 1.0.0 |
| Pendekatan | Hexagonal (Ports & Adapters) + Modular Monolith |
| Alasan | Gateway bukan domain bisnis; DDD penuh overkill |

---

## 1. Filosofi Struktur

API Gateway **bukan** aplikasi domain bisnis. Ia adalah **infrastruktur**.
Karena itu:

- **DDD penuh tidak diterapkan** (tidak ada Aggregate, Entity bisnis, Value Object
  domain kecuali yang relevan seperti `TenantId`, `ApiKey`).
- Digunakan **Hexagonal Architecture (Ports & Adapters)**:
  - **Domain/Core** = logika gateway (routing, auth, rate limit).
  - **Ports** = interface (mis. `RateLimiterPort`, `RouteRepositoryPort`).
  - **Adapters** = implementasi (Redis, HTTP, gRPC, YAML).
- Setiap **kapabilitas gateway** diperlakukan sebagai **module** (bounded context
  ringan): routing, auth, rate-limit, idempotency, circuit-breaker, observability.

Tujuan:
- Testable tanpa infra (mock adapter).
- Bisa ganti Redis → Memcached, HTTP → gRPC, tanpa mengubah core.
- Modul bisa diekstrak jadi service terpisah jika perlu.

---

## 2. Struktur Folder Lengkap

```text
api-gateway/
├── docs/
│   ├── PRD.md
│   ├── STRUCTURE.md
│   ├── ADR/
│   │   ├── 0001-use-nestjs.md
│   │   ├── 0002-hexagonal-over-ddd.md
│   │   ├── 0003-redis-for-state.md
│   │   ├── 0004-grpc-over-zeromq.md
│   │   └── 0005-jwt-rs256-jwks.md
│   └── openapi.yaml
│
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   │
│   ├── config/                          # Konfigurasi & validasi env
│   │   ├── configuration.ts
│   │   ├── env.validation.ts            # Zod / Joi schema
│   │   └── config.module.ts
│   │
│   ├── shared/                          # Cross-cutting, tanpa domain logic
│   │   ├── constants/
│   │   │   ├── headers.ts               # X-Tenant-ID, Idempotency-Key, dll
│   │   │   └── error-codes.ts
│   │   ├── errors/
│   │   │   ├── domain-error.ts
│   │   │   ├── http-error.filter.ts
│   │   │   └── error-response.dto.ts
│   │   ├── decorators/
│   │   │   ├── current-user.decorator.ts
│   │   │   ├── current-tenant.decorator.ts
│   │   │   ├── idempotency-key.decorator.ts
│   │   │   └── public.decorator.ts
│   │   ├── interceptors/
│   │   │   ├── request-context.interceptor.ts
│   │   │   ├── logging.interceptor.ts
│   │   │   └── transform.interceptor.ts
│   │   ├── pipes/
│   │   │   └── zod-validation.pipe.ts
│   │   ├── utils/
│   │   │   ├── hash.util.ts
│   │   │   ├── retry.util.ts
│   │   │   └── backoff.util.ts
│   │   └── types/
│   │       ├── request-context.type.ts
│   │       └── tenant.type.ts
│   │
│   ├── core/                            # Domain inti gateway (pure, no infra)
│   │   ├── tenant/
│   │   │   ├── domain/
│   │   │   │   ├── tenant-id.vo.ts          # Value Object
│   │   │   │   ├── tenant.entity.ts
│   │   │   │   └── tenant.repository.ts     # PORT
│   │   │   ├── application/
│   │   │   │   └── resolve-tenant.usecase.ts
│   │   │   └── tenant.module.ts
│   │   │
│   │   ├── routing/
│   │   │   ├── domain/
│   │   │   │   ├── route.entity.ts
│   │   │   │   ├── upstream.vo.ts
│   │   │   │   └── route.repository.ts      # PORT
│   │   │   ├── application/
│   │   │   │   ├── resolve-route.usecase.ts
│   │   │   │   └── reload-routes.usecase.ts
│   │   │   └── routing.module.ts
│   │   │
│   │   ├── auth/
│   │   │   ├── domain/
│   │   │   │   ├── principal.entity.ts
│   │   │   │   ├── role.vo.ts
│   │   │   │   └── token-verifier.port.ts
│   │   │   ├── application/
│   │   │   │   ├── authenticate.usecase.ts
│   │   │   │   └── authorize.usecase.ts
│   │   │   └── auth.module.ts
│   │   │
│   │   ├── rate-limit/
│   │   │   ├── domain/
│   │   │   │   ├── quota.vo.ts
│   │   │   │   └── rate-limiter.port.ts
│   │   │   ├── application/
│   │   │   │   └── check-quota.usecase.ts
│   │   │   └── rate-limit.module.ts
│   │   │
│   │   ├── idempotency/
│   │   │   ├── domain/
│   │   │   │   ├── idempotency-record.entity.ts
│   │   │   │   └── idempotency-store.port.ts
│   │   │   ├── application/
│   │   │   │   ├── begin-idempotent-request.usecase.ts
│   │   │   │   └── complete-idempotent-request.usecase.ts
│   │   │   └── idempotency.module.ts
│   │   │
│   │   └── circuit-breaker/
│   │       ├── domain/
│   │       │   ├── circuit-state.vo.ts
│   │       │   └── circuit-breaker.port.ts
│   │       ├── application/
│   │       │   └── execute-with-breaker.usecase.ts
│   │       └── circuit-breaker.module.ts
│   │
│   ├── infrastructure/                  # Adapter konkret (mengimplementasi PORT)
│   │   ├── redis/
│   │   │   ├── redis.module.ts
│   │   │   ├── redis.service.ts
│   │   │   └── redis.provider.ts
│   │   ├── jwt/
│   │   │   ├── jwks.client.ts
│   │   │   └── jwt-verifier.adapter.ts
│   │   ├── http/
│   │   │   ├── http-proxy.adapter.ts
│   │   │   └── http-client.module.ts
│   │   ├── grpc/
│   │   │   ├── grpc-proxy.adapter.ts
│   │   │   └── grpc-client.module.ts
│   │   ├── config-repository/
│   │   │   ├── yaml-route.repository.ts
│   │   │   └── redis-route.repository.ts
│   │   ├── rate-limit/
│   │   │   └── redis-sliding-window.adapter.ts
│   │   ├── idempotency/
│   │   │   └── redis-idempotency.adapter.ts
│   │   └── observability/
│   │       ├── pino-logger.adapter.ts
│   │       ├── prometheus-metrics.adapter.ts
│   │       └── otel-tracing.adapter.ts
│   │
│   ├── modules/                         # Entry point HTTP (controllers/guards)
│   │   ├── proxy/
│   │   │   ├── proxy.controller.ts
│   │   │   ├── proxy.service.ts
│   │   │   └── proxy.module.ts
│   │   ├── health/
│   │   │   ├── health.controller.ts
│   │   │   └── health.module.ts
│   │   ├── metrics/
│   │   │   ├── metrics.controller.ts
│   │   │   └── metrics.module.ts
│   │   └── admin/
│   │       ├── routes-admin.controller.ts   # reload routes, dsb
│   │       └── admin.module.ts
│   │
│   ├── guards/
│   │   ├── auth.guard.ts
│   │   ├── rbac.guard.ts
│   │   ├── tenant.guard.ts
│   │   └── rate-limit.guard.ts
│   │
│   └── middleware/
│       ├── request-id.middleware.ts
│       ├── tenant-context.middleware.ts
│       └── security-headers.middleware.ts
│
├── test/
│   ├── unit/
│   ├── integration/
│   ├── e2e/
│   └── fixtures/
│
├── config/
│   ├── routes.yaml                      # Definisi route default
│   └── tenants.yaml                     # (opsional) tenant config awal
│
├── deploy/
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── k8s/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   ├── hpa.yaml
│   │   └── configmap.yaml
│   └── helm/
│
├── scripts/
│   ├── load-test.sh
│   └── seed-redis.ts
│
├── .env.example
├── .dockerignore
├── .gitignore
├── .eslintrc.cjs
├── .prettierrc
├── nest-cli.json
├── package.json
├── tsconfig.json
└── README.md
```

---

## 3. Aturan Dependency (PENTING)

Arah dependency **hanya boleh satu arah**:

```text
modules/  →  core/  →  (tidak boleh import infrastructure)
modules/  →  infrastructure/
infrastructure/  →  core/ (implementasi port)
shared/  ←  dipakai oleh semua, tanpa dependensi ke core/modules
```

Aturan keras:
1. `core/` **tidak boleh** import NestJS HTTP, Redis, Prisma, dsb.
   Core hanya berisi pure TypeScript + interface (Port).
2. `infrastructure/` mengimplementasikan Port dari `core/`.
3. `modules/` adalah adapter HTTP (controller, guard) yang memanggil Use Case.
4. `shared/` tidak boleh import dari `core/` atau `modules/`.

Pelanggaran aturan ini bisa dideteksi dengan `eslint-plugin-boundaries`
atau `dependency-cruiser`.

---

## 4. Contoh Alur Request (End-to-End)

```text
HTTP Request
   │
   ▼
[request-id.middleware]        → set X-Request-ID
   │
   ▼
[tenant-context.middleware]    → resolve tenant (JWT/subdomain/header)
   │
   ▼
[auth.guard]                   → verify JWT / API Key (core/auth)
   │
   ▼
[rbac.guard]                   → cek permission (core/auth)
   │
   ▼
[rate-limit.guard]             → check quota (core/rate-limit → Redis adapter)
   │
   ▼
[proxy.controller]             → resolve route (core/routing)
   │
   ▼
[idempotency interceptor]      → begin/complete (core/idempotency)
   │
   ▼
[circuit-breaker]              → execute (core/circuit-breaker)
   │
   ▼
[http-proxy.adapter / grpc]    → forward ke upstream
   │
   ▼
[response + logging + metrics]
```

---

## 5. Konvensi Penamaan

| Tipe | Contoh | Keterangan |
|---|---|---|
| Use Case | `ResolveRouteUseCase` | Satu file satu use case |
| Port | `RouteRepositoryPort` | Interface di `core/*/domain` |
| Adapter | `RedisRouteRepositoryAdapter` | Implementasi Port |
| Entity | `Tenant`, `Route` | Domain object |
| Value Object | `TenantId`, `Upstream` | Immutable |
| DTO | `ProxyRequestDto` | Hanya di boundary HTTP |
| Guard | `AuthGuard` | NestJS guard |
| Interceptor | `IdempotencyInterceptor` | NestJS interceptor |
| Module | `RoutingModule` | NestJS module |

File naming: `kebab-case` dengan suffix tipe (`*.usecase.ts`, `*.port.ts`,
`*.adapter.ts`, `*.guard.ts`, `*.module.ts`).

---

## 6. Testing Strategy

| Level | Lokasi | Fokus |
|---|---|---|
| Unit | `test/unit/` | Use Case & Value Object (mock Port) |
| Integration | `test/integration/` | Adapter Redis, JWT, HTTP proxy |
| E2E | `test/e2e/` | Alur request penuh via supertest |
| Load | `scripts/load-test.sh` | autocannon / k6 |

Target coverage:
- `core/` ≥ 90%
- `infrastructure/` ≥ 70%
- `modules/` ≥ 70%

---

## 7. Dependency Eksternal yang Disetujui

| Kebutuhan | Library | Alasan |
|---|---|---|
| Framework | `@nestjs/*` v12 | Standar |
| Validasi env | `zod` | Standard Schema di NestJS v12 |
| Redis | `ioredis` | Stabil, cluster-ready |
| JWT | `jose` | Modern, JWKS support |
| Circuit Breaker | `cockatiel` | Ringan, policy-based |
| Logging | `pino` | Cepat, JSON native |
| Metrics | `prom-client` | Standar Prometheus |
| Tracing | `@opentelemetry/*` | Standar industri |
| HTTP Client | `undici` | Cepat, native Node |
| Test | `vitest` + `supertest` | Cepat, ESM-friendly |

Setiap penambahan dependency baru **wajib** melalui ADR.

---

## 8. Yang TIDAK Boleh Dilakukan

- ❌ Import `PrismaService` di `core/`.
- ❌ Akses `process.env` langsung di luar `config/`.
- ❌ Menyimpan state in-memory untuk rate limit / idempotency.
- ❌ Memakai `tenant_id` mentah sebagai Prometheus label.
- ❌ Menaruh business logic microservice di gateway.
- ❌ Import antar module tanpa lewat Port.
- ❌ `console.log` — gunakan logger.