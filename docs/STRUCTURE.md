# Project Structure

## Michishirube — Hexagonal + Modular Monolith

| Field               | Value                                                                                 |
| ------------------- | ------------------------------------------------------------------------------------- |
| Versi               | 2.0.0                                                                                 |
| Status              | Approved                                                                              |
| Pendekatan          | Hexagonal (Ports & Adapters) + Modular Monolith                                       |
| Terakhir Diperbarui | 2026-09-23                                                                            |
| Sprint Terakhir     | Sprint 3A (Admin API) + Dashboard + Security Hardening                                |
| Dokumen Terkait     | `PRD.md`, `ARCHITECTURE.md`, `TECHSTACK.md`, `RULES.md`, `AGENTS.md`, `RESILIENCE.md` |

---

## 1. Filosofi Struktur

Michishirube adalah **infrastruktur gateway**, bukan domain bisnis. Karena itu:

- **DDD penuh tidak diterapkan** — tidak ada Aggregate bisnis, Domain Event
- **Hexagonal (Ports & Adapters)** — core murni, adapter bisa ditukar
- Setiap **kapabilitas gateway** = satu module (bounded context ringan)
- **Stateless** — state di Redis + YAML config, bukan di memory
- **Monorepo** — gateway (backend) + dashboard (frontend) dalam satu repo

### Aturan Emas

1. `core/` **tidak boleh** import infra, NestJS HTTP, atau driver DB
2. `core/` = pure TypeScript + interface (Port)
3. `infrastructure/` mengimplementasikan Port dari `core/`
4. `modules/` = adapter HTTP (controller)
5. `shared/` = cross-cutting, tidak boleh import `core/`

---

## 2. Struktur Folder Lengkap

```text
michishirube/
│
├── apps/
│   └── dashboard/                        # Next.js Admin Dashboard
│       ├── app/
│       │   ├── (auth)/
│       │   │   ├── layout.tsx
│       │   │   └── login/
│       │   │       └── page.tsx          # Login 2 kolom (info + form)
│       │   ├── (dashboard)/
│       │   │   ├── layout.tsx            # Shell + AuthGuard redirect
│       │   │   ├── page.tsx              # Overview
│       │   │   ├── routes/page.tsx       # Routes list
│       │   │   ├── tenants/page.tsx      # Tenants list
│       │   │   ├── api-keys/page.tsx     # API Keys + modal
│       │   │   ├── config/page.tsx       # YAML viewer
│       │   │   ├── metrics/page.tsx      # Charts
│       │   │   ├── audit/page.tsx        # Audit log
│       │   │   └── settings/page.tsx     # Settings tabs
│       │   ├── globals.css
│       │   ├── layout.tsx
│       │   └── providers.tsx             # QueryClient + ThemeProvider
│       ├── components/
│       │   ├── auth/login-form.tsx       # Form login + Zod
│       │   ├── layout/
│       │   │   ├── sidebar.tsx           # Navigation sidebar
│       │   │   ├── topbar.tsx            # Top bar + user menu
│       │   │   └── shell.tsx             # Layout wrapper
│       │   └── ui/                       # shadcn/ui components
│       ├── lib/
│       │   ├── api-client.ts             # HTTP client + adminApi
│       │   ├── auth.ts                   # Zustand auth store
│       │   ├── mock-data.ts              # Mock data (dev)
│       │   └── utils.ts                  # cn, formatters
│       ├── types/index.ts                # Shared types
│       ├── middleware.ts                 # Route protection
│       ├── next.config.ts                # standalone output
│       ├── package.json
│       ├── tailwind.config.ts
│       ├── tsconfig.json
│       ├── Dockerfile                    # Multi-stage (dev/build/prod)
│       ├── .dockerignore
│       └── .env.example
│
├── docs/
│   ├── PRD.md                            # Product Requirements
│   ├── ARCHITECTURE.md                   # Arsitektur sistem
│   ├── STRUCTURE.md                      # Dokumen ini
│   ├── TECHSTACK.md                      # Tech stack
│   ├── RESILIENCE.md                     # Race condition, deadlock, SPOF
│   └── ADR/                              # Architecture Decision Records
│       ├── 0002-hexagonal-over-ddd.md
│       ├── 0003-redis-as-only-state.md
│       └── 0004-no-db-in-gateway.md
│
├── src/                                  # Gateway (NestJS)
│   ├── main.ts                           # Bootstrap Fastify + Helmet + CORS
│   ├── app.module.ts                     # Root module
│   │
│   ├── config/                           # Konfigurasi & validasi env
│   │   ├── config.module.ts              # Global ConfigModule
│   │   ├── configuration.ts              # Map env → typed config
│   │   ├── env.validation.ts             # Zod schema + prod guard
│   │   └── __tests__/env.validation.spec.ts
│   │
│   ├── core/                             # Domain inti (pure, no infra)
│   │   │
│   │   ├── tenant/                       # Sprint 1 #1
│   │   │   ├── domain/
│   │   │   │   ├── tenant.entity.ts
│   │   │   │   ├── tenant-id.vo.ts       # Branded string
│   │   │   │   └── tenant.repository.port.ts
│   │   │   ├── application/
│   │   │   │   ├── resolve-tenant.usecase.ts
│   │   │   │   ├── list-tenants.usecase.ts
│   │   │   │   ├── create-tenant.usecase.ts
│   │   │   │   ├── update-tenant.usecase.ts
│   │   │   │   └── delete-tenant.usecase.ts
│   │   │   ├── __tests__/
│   │   │   └── tenant.module.ts
│   │   │
│   │   ├── auth/                         # Sprint 1 #2
│   │   │   ├── domain/
│   │   │   │   ├── principal.entity.ts   # userId, tenantId, roles, scopes
│   │   │   │   ├── role.vo.ts            # Role + Scope VO
│   │   │   │   └── token-verifier.port.ts
│   │   │   ├── application/
│   │   │   │   └── verify-token.usecase.ts
│   │   │   ├── __tests__/
│   │   │   └── auth.module.ts
│   │   │
│   │   ├── rbac/                         # Sprint 1 #3
│   │   │   ├── domain/
│   │   │   │   ├── permission.vo.ts      # resource:action + wildcard
│   │   │   │   ├── policy.entity.ts
│   │   │   │   └── policy-evaluator.port.ts
│   │   │   ├── application/
│   │   │   │   └── check-permission.usecase.ts
│   │   │   ├── __tests__/
│   │   │   └── rbac.module.ts
│   │   │
│   │   ├── rate-limit/                   # Sprint 1 #4
│   │   │   ├── domain/
│   │   │   │   ├── quota.vo.ts           # limit + windowSec
│   │   │   │   └── rate-limiter.port.ts
│   │   │   ├── application/
│   │   │   │   └── check-quota.usecase.ts
│   │   │   ├── __tests__/
│   │   │   └── rate-limit.module.ts
│   │   │
│   │   ├── routing/                      # Sprint 1 #5 + Admin API
│   │   │   ├── domain/
│   │   │   │   ├── route.entity.ts       # Route + Zod schema
│   │   │   │   └── route.repository.port.ts
│   │   │   ├── application/
│   │   │   │   ├── list-routes.usecase.ts
│   │   │   │   ├── create-route.usecase.ts
│   │   │   │   ├── update-route.usecase.ts
│   │   │   │   ├── delete-route.usecase.ts
│   │   │   │   └── reload-routes.usecase.ts
│   │   │   ├── __tests__/
│   │   │   └── routing.module.ts
│   │   │
│   │   ├── api-key/                      # Sprint 3A (Admin API)
│   │   │   ├── domain/
│   │   │   │   ├── api-key.entity.ts     # IssuedApiKey + Zod
│   │   │   │   └── api-key.repository.port.ts
│   │   │   ├── application/
│   │   │   │   ├── list-api-keys.usecase.ts
│   │   │   │   ├── issue-api-key.usecase.ts   # Argon2id hashing
│   │   │   │   └── revoke-api-key.usecase.ts
│   │   │   ├── __tests__/
│   │   │   └── api-key.module.ts
│   │   │
│   │   ├── audit/                        # Sprint 3A
│   │   │   ├── domain/
│   │   │   │   ├── audit-entry.entity.ts
│   │   │   │   └── audit.repository.port.ts
│   │   │   ├── application/
│   │   │   │   ├── list-audit.usecase.ts
│   │   │   │   └── record-audit.usecase.ts
│   │   │   ├── __tests__/
│   │   │   └── audit.module.ts
│   │   │
│   │   ├── idempotency/                  # Sprint 2 (stub)
│   │   ├── circuit-breaker/              # Sprint 2 (stub)
│   │   └── cache/                        # Sprint 2 (stub)
│   │
│   ├── infrastructure/                   # Adapter (implement Port)
│   │   ├── redis/
│   │   │   ├── redis.constants.ts
│   │   │   ├── redis.module.ts
│   │   │   ├── redis-api-key.repository.ts    # RedisApiKeyRepository
│   │   │   └── redis-audit.repository.ts      # RedisAuditRepository
│   │   │
│   │   ├── jwt/
│   │   │   ├── jwt.constants.ts
│   │   │   ├── jwks.client.ts            # createRemoteJWKSet
│   │   │   ├── jwt-verifier.adapter.ts   # jose + JWKS
│   │   │   └── __tests__/
│   │   │
│   │   ├── rbac/
│   │   │   ├── default-policy-evaluator.adapter.ts
│   │   │   ├── rbac-infrastructure.module.ts
│   │   │   └── __tests__/
│   │   │
│   │   ├── rate-limit/
│   │   │   ├── rate-limit.constants.ts
│   │   │   ├── redis-sliding-window.adapter.ts
│   │   │   ├── lua/sliding-window.lua    # Atomic INCR + EXPIRE
│   │   │   └── __tests__/
│   │   │
│   │   ├── config-repository/
│   │   │   ├── config-repository.module.ts
│   │   │   ├── yaml-tenant.repository.ts # CRUD + hot reload
│   │   │   ├── yaml-route.repository.ts  # CRUD + hot reload
│   │   │   └── __tests__/
│   │   │
│   │   ├── security/
│   │   │   └── token-revocation.service.ts   # JTI + user blacklist
│   │   │
│   │   ├── observability/
│   │   │   └── logger.module.ts          # Pino + redact
│   │   │
│   │   ├── http/                         # Sprint 1 #5 (stub)
│   │   └── grpc/                         # Sprint 4 (stub)
│   │
│   ├── modules/                          # Entry point HTTP
│   │   ├── health/
│   │   │   ├── health.controller.ts      # /health, /health/live, /health/ready
│   │   │   └── health.module.ts
│   │   │
│   │   ├── admin/                        # Sprint 3A
│   │   │   ├── routes-admin.controller.ts
│   │   │   ├── tenants-admin.controller.ts
│   │   │   ├── api-keys-admin.controller.ts
│   │   │   ├── audit-admin.controller.ts
│   │   │   ├── admin.module.ts
│   │   │   ├── dto/
│   │   │   │   ├── route.dto.ts
│   │   │   │   ├── tenant.dto.ts
│   │   │   │   ├── api-key.dto.ts
│   │   │   │   ├── common.dto.ts
│   │   │   │   └── index.ts
│   │   │   └── __tests__/
│   │   │
│   │   ├── proxy/                        # Sprint 1 #5 (stub)
│   │   └── metrics/                      # Sprint 3 (stub)
│   │
│   ├── guards/                           # Global guards
│   │   ├── auth.guard.ts                 # Global, urutan #1
│   │   ├── rbac.guard.ts                 # Global, urutan #2
│   │   ├── ip-allowlist.guard.ts         # Global, urutan #3 (admin)
│   │   ├── rate-limit.guard.ts           # Global, urutan #4
│   │   └── __tests__/
│   │
│   ├── interceptors/                     # Sprint 2 (empty)
│   │
│   ├── middleware/
│   │   ├── middleware.module.ts
│   │   ├── request-id.middleware.ts      # X-Request-ID
│   │   ├── tenant-context.middleware.ts  # Resolve tenant
│   │   └── __tests__/
│   │
│   └── shared/                           # Cross-cutting
│       ├── context/
│       │   ├── request-context.ts        # AsyncLocalStorage
│       │   ├── request-context.module.ts
│       │   ├── index.ts
│       │   └── __tests__/
│       │
│       ├── decorators/
│       │   ├── current-tenant.decorator.ts
│       │   ├── current-user.decorator.ts
│       │   ├── public.decorator.ts       # @Public()
│       │   ├── roles.decorator.ts        # @Roles()
│       │   ├── scopes.decorator.ts       # @Scopes()
│       │   ├── permissions.decorator.ts  # @RequirePermissions()
│       │   ├── rate-limit.decorator.ts   # @RateLimit()
│       │   └── index.ts
│       │
│       ├── errors/
│       │   ├── error-codes.ts            # 114 kode GW_*
│       │   ├── error-catalog.ts          # Kode → HTTP + retryable
│       │   ├── domain-error.ts           # Base error class
│       │   ├── gateway-error.ts          # Semua error kelas
│       │   ├── error-response.dto.ts     # RFC 7807
│       │   ├── error.factory.ts          # Build problem+json
│       │   ├── http-exception.filter.ts  # Global filter
│       │   ├── index.ts
│       │   └── __tests__/
│       │
│       ├── pipes/
│       │   ├── zod-validation.pipe.ts
│       │   └── index.ts
│       │
│       ├── security/                     # Sprint 3A hardening
│       │   ├── ssrf-guard.ts             # SSRF + DNS rebinding
│       │   ├── redact.ts                 # Log redact paths
│       │   └── __tests__/ssrf-guard.spec.ts
│       │
│       ├── types/                        # Generic reusable
│       │   ├── result.type.ts            # Result<T, E>
│       │   ├── option.type.ts            # Option<T>
│       │   ├── branded.type.ts           # Brand<T, B>
│       │   ├── entity.type.ts
│       │   ├── value-object.ts
│       │   ├── codec.port.ts
│       │   ├── mapper.port.ts
│       │   ├── repository.port.ts
│       │   ├── use-case.port.ts
│       │   ├── pagination.type.ts
│       │   ├── request-context.type.ts
│       │   ├── index.ts
│       │   └── __tests__/
│       │
│       ├── constants/
│       │   └── headers.ts                # X-Request-ID, X-Tenant-ID, dll
│       │
│       └── utils/                        # (empty, siap diisi)
│
├── test/
│   ├── app.e2e-spec.ts
│   ├── fixtures/jwt.fixture.ts           # generateTestKeys, signTestToken
│   ├── unit/                             # (siap diisi)
│   ├── functional/                       # (siap diisi)
│   └── security/                         # (siap diisi)
│
├── config/                               # Runtime config (YAML)
│   ├── tenants.yaml                      # Tenant definitions
│   └── routes.yaml                       # Route definitions
│
├── deploy/
│   ├── Dockerfile                        # Gateway multi-stage
│   ├── .dockerignore
│   ├── .env.docker.example
│   ├── README.md                         # Port map + usage
│   ├── docker-compose.yml                # Base
│   ├── docker-compose.dev.yml            # Dev override
│   ├── docker-compose.staging.yml
│   ├── docker-compose.prod.yml
│   ├── prometheus/prometheus.yml
│   ├── grafana/provisioning/datasources/prometheus.yml
│   └── k8s/                              # (siap diisi)
│
├── scripts/
│   ├── checkpoints.sh                    # Audit kesehatan project
│   ├── compose.sh                        # Wrapper docker compose
│   ├── dev.sh                            # Start Redis + gateway
│   ├── docker-cleanup.sh                 # Soft/aggressive/nuclear
│   ├── docker-rollback.sh                # Rollback image tag
│   ├── docker-stats.sh                   # Disk usage report
│   ├── p0-fix.sh                         # Auto-fix P0
│   └── setup-folders.sh
│
├── .github/workflows/
│   └── security.yml                      # Audit + Trivy + Gitleaks
│
├── AGENTS.md                             # Aturan untuk AI agent
├── RULES.md                              # Clean code & error handling
├── CONTRIBUTING.md
├── LICENSE
├── README.md
├── checkpoint-report.txt                 # (gitignored)
├── commitlint.config.cjs
├── .dependency-cruiser.cjs
├── .editorconfig
├── .env.example
├── .env.development
├── .env.production
├── .env.test
├── .gitignore
├── .lefthook.yml
├── .npmrc
├── .oxlintrc.json
├── .prettierignore
├── .prettierrc
├── nest-cli.json
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml                   # Monorepo workspace
├── tsconfig.build.json
├── tsconfig.json
├── vitest.config.e2e.ts
└── vitest.config.ts
```

---

## 3. Detail Per Folder — Konteks untuk AI

### `apps/dashboard/`

**Tujuan:** Admin UI untuk konfigurasi gateway.

| Aspek       | Detail                                                  |
| ----------- | ------------------------------------------------------- |
| Framework   | Next.js 16 (App Router)                                 |
| Styling     | Tailwind CSS v4 + shadcn/ui                             |
| State       | Zustand (auth) + TanStack Query (server state)          |
| Port        | **7400**                                                |
| Auth        | JWT di localStorage (⚠️ pindah ke httpOnly cookie = P1) |
| Demo login  | `admin@michishirube.dev` / `admin12345`                 |
| Data source | Saat ini mock, akan pindah ke Admin API                 |

**Aturan AI saat edit dashboard:**

- Gunakan **server components** untuk data fetching jika memungkinkan
- `'use client'` hanya jika butuh interaktivitas (form, chart, state)
- Semua API call lewat `lib/api-client.ts` — jangan `fetch()` langsung
- Form wajib pakai React Hook Form + Zod
- Tabel wajib pakai TanStack Table
- Toast pakai `sonner`

### `src/core/*/domain/`

**Aturan KERAS:**

- Pure TypeScript — **JANGAN** import `@nestjs/*`, `ioredis`, `undici`
- Entity = `interface`, immutable, `readonly` untuk semua field
- Value Object = class dengan validasi di constructor
- Port = interface tanpa implementasi
- Zod schema untuk validasi input (`RouteSchema`, `IssueApiKeySchema`)

### `src/core/*/application/`

**Aturan:**

- 1 file = 1 use case
- Class + `@Injectable()` dari NestJS (boleh)
- Return `Result<T, E>` atau throw `DomainError`
- **Tidak** akses infra langsung — lewat Port
- Constructor injection untuk Port

### `src/infrastructure/*/`

**Aturan:**

- Implement Port dari `core/`
- Boleh import `jose`, `ioredis`, `undici`, `yaml`, `argon2`
- Prefix: `redis-*`, `yaml-*`, `*-adapter.ts`
- Semua adapter punya test dengan mock
- **JANGAN** akses `core/*/application` langsung

### `src/modules/*/`

**Aturan:**

- Controller HTTP (NestJS)
- Semua endpoint admin **wajib** `@Roles('admin')` + `@Scopes('admin:*')`
- Validasi input pakai `@Body(new ZodValidationPipe(schema))`
- Audit setiap mutation via `RecordAuditUseCase`
- Rate limit admin: `@RateLimit({ ip: { limit: 30, windowSec: 60 } })`

### `src/guards/`

**Urutan WAJIB (di `app.module.ts`):**

```
1. AuthGuard         → verify JWT, attach principal
2. RbacGuard         → check role + scope
3. IpAllowlistGuard  → admin IP whitelist (production)
4. RateLimitGuard    → cek kuota (butuh tenant + user)
```

**JANGAN** ubah urutan — dependency antar guard.

### `src/shared/security/`

**Fungsi:**

- `ssrf-guard.ts` — validasi URL upstream, block private IP, DNS rebinding
- `redact.ts` — daftar path yang di-redact di log

**Aturan:** setiap kali tambah field sensitif (password, token, key), update `REDACT_PATHS`.

### `src/shared/errors/`

**Aturan:**

- Semua error code ada di `ErrorCode` enum (114 kode)
- Format: `GW_<DOMAIN>_<REASON>`
- Response: **RFC 7807** (`application/problem+json`)
- **JANGAN** `throw new Error()` langsung — pakai `DomainError` subclass
- 5xx critical punya `hideDetailInProd: true`

### `config/`

**Runtime config, bukan kode:**

- `tenants.yaml` — daftar tenant
- `routes.yaml` — daftar route

**Aturan:**

- Hot reload via `POST /admin/routes/reload`
- Validasi Zod saat load
- **JANGAN** hardcode nilai di kode

### `deploy/`

**Port map (uncommon 73xx/74xx):**

| Service         |     Port |
| --------------- | -------: |
| Gateway HTTP    |     7300 |
| Gateway Debug   |     7329 |
| Gateway Metrics |     7301 |
| **Dashboard**   | **7400** |
| Redis           |     7380 |
| Redis Commander |     7381 |
| PgBouncer       |     7382 |
| PostgreSQL      |     7383 |
| Prometheus      |     7390 |
| Grafana         |     7391 |
| Jaeger          |     7392 |
| OTel gRPC       |     7317 |
| OTel HTTP       |     7318 |

---

## 4. Aturan Dependency (KERAS)

```
modules/ ─────► core/ ◄───── infrastructure/
   │              ▲
   └──────────────┘
   shared/ (dipakai semua, tidak import balik)
   guards/, interceptors/, middleware/ → core + shared
```

| Layer                                        | Boleh import                          | Dilarang import               |
| -------------------------------------------- | ------------------------------------- | ----------------------------- |
| `core/*/domain`                              | `shared/types`, `shared/errors`       | NestJS, Redis, HTTP, Zod (*)  |
| `core/*/application`                         | `core/*/domain`, `shared/*`           | infrastructure, modules       |
| `infrastructure/*`                           | `core/*/domain` (implement Port)      | `core/*/application`, modules |
| `modules/*`                                  | `core/*/application`, `core/*/domain` | infrastructure langsung       |
| `guards/*`, `interceptors/*`, `middleware/*` | `core/*`, `shared/*`                  | —                             |
| `shared/*`                                   | `shared/*` saja                       | core, modules, infrastructure |

(*) Zod **diizinkan** di `core/*/domain` untuk schema validasi value object.

**Penegakan:** `pnpm deps:check` (dependency-cruiser).

---

## 5. Alur Request

```
HTTP Request
   │
   ▼
[RequestIdMiddleware]              set X-Request-ID
   │
   ▼
[TenantContextMiddleware]          resolve tenant → AsyncLocalStorage
   │
   ▼
[AuthGuard]                        verify JWT → attach principal
   │
   ▼
[RbacGuard]                        check role / scope
   │
   ▼
[IpAllowlistGuard]                 admin IP check (production)
   │
   ▼
[RateLimitGuard]                   Redis sliding window
   │
   ▼
[Controller]                       admin / proxy / health / metrics
   │
   ▼
[UseCase]                          logic inti
   │
   ▼
[Port] ──► [Adapter: Redis / YAML / HTTP]
```

---

## 6. Alur Admin API

```
Dashboard (Next.js :7400)
   │
   │ HTTP + JWT (role: admin)
   ▼
Admin API (:7300/admin/*)
   │
   ├─► RoutesAdminController   → RoutingModule → YamlRouteRepository → routes.yaml
   ├─► TenantsAdminController  → TenantModule → YamlTenantRepository → tenants.yaml
   ├─► ApiKeysAdminController  → ApiKeyModule → RedisApiKeyRepository → Redis
   ├─► AuditAdminController    → AuditModule → RedisAuditRepository → Redis
   └─► Setiap mutation → RecordAuditUseCase → audit log
```

---

## 7. Statistik (Setelah Sprint 3A + F2 + API Contract v2)

### 7.1 Gateway (Backend)

| Metrik                      |                                                                            Jumlah |
| --------------------------- | --------------------------------------------------------------------------------: |
| Source file gateway (`.ts`) |                                                                               ~90 |
| Test file gateway           |                                                                               ~30 |
| Total test                  |                                                                              ~200 |
| Core domain context         | 8 (`auth`, `rbac`, `tenant`, `rate-limit`, `routing`, `api-key`, `audit`, + stub) |
| Infrastructure adapter      |                           6 (redis, jwt, rbac, rate-limit, config-repo, security) |
| Error codes                 |                                                                               114 |
| Guards                      |                                          4 (auth, rbac, ip-allowlist, rate-limit) |
| Middleware                  |                                                    2 (request-id, tenant-context) |

### 7.2 Admin API

| Group                | Endpoint | Status       |
| -------------------- | -------: | ------------ |
| **Auth**             |        3 | ⏳ Sprint 3B |
| **Routes**           |        6 | ✅ Sprint 3A |
| **Tenants**          |        4 | ✅ Sprint 3A |
| **API Keys**         |        4 | ✅ Sprint 3A |
| **Audit**            |        1 | ✅ Sprint 3A |
| **Circuit Breakers** |        3 | ⏳ Sprint 2  |
| **Bulkheads**        |        2 | ⏳ Sprint 2  |
| **Overview**         |        1 | ⏳ Sprint 3B |
| **Total**            |   **24** | —            |

**Referensi kontrak:** `docs/FRONTEND-API-CONTRACT.md` v2.0.0

### 7.3 Dashboard (Frontend)

| Metrik                                |                                             Jumlah |
| ------------------------------------- | -------------------------------------------------: |
| Source file dashboard (`.tsx`, `.ts`) |                                                ~30 |
| Halaman                               |                                                  9 |
| Design system tokens                  |                   15 (color, spacing, radius, dll) |
| Komponen UI primitive                 |        5 (button, badge, skeleton, input, tooltip) |
| Komponen layout                       |  5 (shell, sidebar, topbar, breadcrumb, user-menu) |
| Komponen shared                       | 8 (error-state, error-toast, request-id-copy, dll) |
| Komponen feature                      |                  ~12 (kpi-strip, route-table, dll) |
| Banner kind                           |      5 (redis, upstream, jwks, config, rate-limit) |
| Query hooks                           |                  ~6 (use-routes, use-tenants, dll) |

### 7.4 Dokumentasi

| Dokumen                                     | Status           |
| ------------------------------------------- | ---------------- |
| `docs/PRD.md`                               | ✅               |
| `docs/ARCHITECTURE.md`                      | ✅               |
| `docs/STRUCTURE.md`                         | ✅ (dokumen ini) |
| `docs/TECHSTACK.md`                         | ✅               |
| `docs/RESILIENCE.md`                        | ✅               |
| `docs/SPRINT.md`                            | ✅               |
| `docs/FRONTEND-API-CONTRACT.md`             | ✅ v2.0.0        |
| `AGENTS.md`                                 | ✅               |
| `RULES.md`                                  | ✅               |
| `apps/dashboard/AGENTS.md`                  | ✅               |
| `apps/dashboard/FRONTEND-DESIGN.md`         | ✅               |
| `apps/dashboard/FRONTEND-PATTERNS.md`       | ✅               |
| `apps/dashboard/FRONTEND-ERROR-HANDLING.md` | ✅               |
| `docs/FRONTEND-DATA-FLOW.md`                | ⏳               |
| `docs/FRONTEND-SECURITY.md`                 | ⏳               |

### 7.5 Perubahan Statistik

| Sebelum                     | Sesudah                  | Alasan                               |
| --------------------------- | ------------------------ | ------------------------------------ |
| Endpoint admin: 13          | 24                       | Sesuai `FRONTEND-API-CONTRACT.md` v2 |
| Satu tabel besar            | Dipecah 4 kategori       | Lebih mudah dibaca                   |
| Tidak ada status            | Ada status per group     | Traceability                         |
| Tidak ada referensi kontrak | Ada link ke API contract | Single source of truth               |

---

## 8. Status Sprint

### Sprint 0 — Done ✅

- Bootstrap NestJS 12 + Fastify + ESM
- Shared types (Result, Option, Brand, Repository, UseCase)
- Error framework (RFC 7807)
- Config module + Zod validation
- Redis module
- Logger (Pino + redact)
- Health controller
- Middleware (RequestId + TenantContext)
- Lefthook + commitlint + CI

### Sprint 1 #1 — Tenant Resolution ✅

### Sprint 1 #2 — Auth Guard JWT ✅

### Sprint 1 #3 — RBAC Guard ✅

### Sprint 1 #4 — Rate Limit ✅

### Sprint 1 #5 — Dynamic Routing ✅ (partial — proxy handler belum)

### Sprint 3A — Admin API ✅

### Dashboard (Next.js) ✅

### Security Hardening (OWASP) ✅

### Belum Dikerjakan:

- **Sprint 1 #5 lanjutan** — Proxy handler (undici forward)
- **Sprint 1 #6** — API Key Auth (verifikasi di request)
- **Sprint 2** — Idempotency, Circuit Breaker, Cache
- **Sprint 3** — Metrics endpoint, Tracing
- **Sprint 4** — gRPC upstream
- **P1 Security** — JWT httpOnly cookie, MFA admin, approval workflow

---

## 9. Konteks untuk AI Agent

### Saat menulis kode baru:

1. **Baca dulu**: `AGENTS.md`, `RULES.md`, `docs/ARCHITECTURE.md`
2. **Cek boundary**: `pnpm deps:check` sebelum commit
3. **Ikuti pola**: lihat use case / adapter yang sudah ada
4. **Tulis test**: setiap use case wajib punya test
5. **Error handling**: pakai `DomainError` + kode `GW_*`
6. **Validasi input**: selalu pakai Zod
7. **Logging**: pakai `Logger`, redact field sensitif
8. **Jangan**:
   - `any`, `as unknown as`, `@ts-ignore`
   - `console.log`
   - Import infra di `core/`
   - Hardcode secret / URL
   - Query DB dari gateway
   - Bypass guard

### Saat menambah fitur:

1. Buat folder `core/<nama>/domain/` + `application/`
2. Buat Port (interface) di `domain/`
3. Buat UseCase di `application/`
4. Buat Adapter di `infrastructure/<nama>/`
5. Buat Controller di `modules/<nama>/`
6. Register di `app.module.ts`
7. Tambah test + dokumentasi

### Saat menambah error code:

1. Tambah di `error-codes.ts` (enum)
2. Tambah di `error-catalog.ts` (status + title + retryable)
3. Buat class di `gateway-error.ts`
4. Update dokumentasi

### Saat menambah endpoint admin:

1. Controller di `modules/admin/`
2. **Wajib** `@Roles('admin')` + `@Scopes('admin:*')`
3. `@RateLimit({ ip: { limit: 30, windowSec: 60 } })`
4. DTO dengan Zod di `dto/`
5. Record audit setiap mutation

---

## 10. Referensi

- `docs/ARCHITECTURE.md` — arsitektur sistem
- `docs/PRD.md` — product requirements
- `docs/TECHSTACK.md` — tech stack
- `docs/RESILIENCE.md` — race condition, deadlock, SPOF
- `AGENTS.md` — aturan kode untuk AI
- `RULES.md` — clean code & error handling
