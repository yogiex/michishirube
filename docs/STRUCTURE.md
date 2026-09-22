# Project Structure

## Michishirube — Hexagonal + Modular Monolith

| Field               | Value                                                                |
| ------------------- | -------------------------------------------------------------------- |
| Versi               | 1.1.0                                                                |
| Status              | Approved                                                             |
| Pendekatan          | Hexagonal (Ports & Adapters) + Modular Monolith                      |
| Terakhir Diperbarui | 2026-09-22                                                           |
| Dokumen Terkait     | `PRD.md`, `ARCHITECTURE.md`, `TECHSTACK.md`, `RULES.md`, `AGENTS.md` |

---

## 1. Filosofi Struktur

Michishirube adalah **infrastruktur**, bukan domain bisnis. Karena itu:

- **DDD penuh tidak diterapkan** — tidak ada Aggregate bisnis, Domain Event
- **Hexagonal (Ports & Adapters)** — core murni, adapter bisa ditukar
- Setiap **kapabilitas gateway** = satu module (bounded context ringan)
- **Stateless** — tidak ada state lokal yang penting; semua di Redis + YAML

---

## 2. Struktur Folder (Sprint 0 + Sprint 1 #1-3)

```text
michishirube/
├── docs/
│   ├── ARCHITECTURE.md
│   ├── PRD.md
│   ├── STRUCTURE.md
│   └── ADR/
│       ├── 0002-hexagonal-over-ddd.md
│       └── 0003-redis-as-only-state.md
│
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   │
│   ├── config/
│   │   ├── config.module.ts
│   │   ├── configuration.ts
│   │   ├── env.validation.ts
│   │   └── __tests__/
│   │       └── env.validation.spec.ts
│   │
│   ├── core/
│   │   ├── auth/
│   │   │   ├── domain/
│   │   │   │   ├── principal.entity.ts
│   │   │   │   └── role.vo.ts
│   │   │   ├── application/              # (belum, Sprint 1 #2)
│   │   │   └── __tests__/
│   │   │       └── principal.entity.spec.ts
│   │   │
│   │   ├── rbac/
│   │   │   ├── domain/
│   │   │   │   ├── permission.vo.ts
│   │   │   │   ├── policy.entity.ts
│   │   │   │   └── policy-evaluator.port.ts
│   │   │   ├── application/
│   │   │   │   └── check-permission.usecase.ts
│   │   │   ├── __tests__/
│   │   │   │   ├── check-permission.usecase.spec.ts
│   │   │   │   ├── permission.vo.spec.ts
│   │   │   │   └── policy.entity.spec.ts
│   │   │   └── rbac.module.ts
│   │   │
│   │   ├── tenant/
│   │   │   ├── domain/
│   │   │   │   ├── tenant.entity.ts
│   │   │   │   ├── tenant-id.vo.ts
│   │   │   │   └── tenant.repository.port.ts
│   │   │   ├── application/
│   │   │   │   └── resolve-tenant.usecase.ts
│   │   │   ├── __tests__/
│   │   │   │   ├── resolve-tenant.usecase.spec.ts
│   │   │   │   └── tenant-id.vo.spec.ts
│   │   │   └── tenant.module.ts
│   │   │
│   │   ├── rate-limit/                   # (Sprint 1 #4 — stub)
│   │   │   ├── domain/
│   │   │   └── application/
│   │   │
│   │   ├── routing/                      # (Sprint 1 #5 — stub)
│   │   │   ├── domain/
│   │   │   └── application/
│   │   │
│   │   ├── idempotency/                  # (Sprint 2 — stub)
│   │   ├── circuit-breaker/              # (Sprint 2 — stub)
│   │   └── cache/                        # (Sprint 2 — stub)
│   │
│   ├── infrastructure/
│   │   ├── redis/
│   │   │   ├── redis.constants.ts
│   │   │   └── redis.module.ts
│   │   │
│   │   ├── rbac/
│   │   │   ├── default-policy-evaluator.adapter.ts
│   │   │   ├── rbac-infrastructure.module.ts
│   │   │   └── __tests__/
│   │   │       └── default-policy-evaluator.adapter.spec.ts
│   │   │
│   │   ├── config-repository/
│   │   │   ├── config-repository.module.ts
│   │   │   ├── yaml-tenant.repository.ts
│   │   │   └── __tests__/
│   │   │       └── yaml-tenant.repository.spec.ts
│   │   │
│   │   ├── observability/
│   │   │   └── logger.module.ts
│   │   │
│   │   ├── jwt/                          # (Sprint 1 #2 — stub)
│   │   ├── http/                         # (Sprint 1 #5 — stub)
│   │   └── grpc/                         # (Sprint 4 — stub)
│   │
│   ├── modules/
│   │   ├── health/
│   │   │   ├── health.controller.ts
│   │   │   └── health.module.ts
│   │   ├── proxy/                        # (Sprint 1 #5 — stub)
│   │   ├── metrics/                      # (Sprint 3 — stub)
│   │   └── admin/                        # (Sprint 3 — stub)
│   │
│   ├── guards/
│   │   ├── rbac.guard.ts
│   │   └── __tests__/
│   │       └── rbac.guard.spec.ts
│   │
│   ├── interceptors/                     # (Sprint 2 — empty)
│   │
│   ├── middleware/
│   │   ├── middleware.module.ts
│   │   ├── request-id.middleware.ts
│   │   ├── tenant-context.middleware.ts
│   │   └── __tests__/
│   │       ├── request-id.middleware.spec.ts
│   │       └── tenant-context.middleware.spec.ts
│   │
│   └── shared/
│       ├── context/
│       │   ├── index.ts
│       │   ├── request-context.ts
│       │   ├── request-context.module.ts
│       │   └── __tests__/
│       │       └── request-context.spec.ts
│       │
│       ├── decorators/
│       │   ├── current-tenant.decorator.ts
│       │   ├── current-user.decorator.ts
│       │   ├── permissions.decorator.ts
│       │   ├── public.decorator.ts
│       │   ├── roles.decorator.ts
│       │   ├── scopes.decorator.ts
│       │   └── index.ts
│       │
│       ├── errors/
│       │   ├── domain-error.ts
│       │   ├── error-catalog.ts
│       │   ├── error-codes.ts
│       │   ├── error.factory.ts
│       │   ├── error-response.dto.ts
│       │   ├── gateway-error.ts
│       │   ├── http-exception.filter.ts
│       │   ├── index.ts
│       │   └── __tests__/
│       │       └── http-exception.filter.spec.ts
│       │
│       ├── pipes/
│       │   ├── zod-validation.pipe.ts
│       │   └── index.ts
│       │
│       ├── types/
│       │   ├── branded.type.ts
│       │   ├── codec.port.ts
│       │   ├── entity.type.ts
│       │   ├── mapper.port.ts
│       │   ├── option.type.ts
│       │   ├── pagination.type.ts
│       │   ├── repository.port.ts
│       │   ├── request-context.type.ts
│       │   ├── result.type.ts
│       │   ├── use-case.port.ts
│       │   ├── value-object.ts
│       │   ├── index.ts
│       │   └── __tests__/
│       │       ├── branded.spec.ts
│       │       ├── misc.spec.ts
│       │       ├── option.spec.ts
│       │       ├── pagination.spec.ts
│       │       ├── result.spec.ts
│       │       └── value-object.spec.ts
│       │
│       ├── constants/                    # (empty)
│       └── utils/                        # (empty)
│
├── test/
│   └── app.e2e-spec.ts
│
├── config/
│   └── tenants.yaml
│
├── deploy/
│   ├── docker-compose.yml
│   ├── docker-compose.dev.yml
│   ├── docker-compose.staging.yml
│   ├── docker-compose.prod.yml
│   ├── .env.docker.example
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── README.md
│   ├── prometheus/
│   │   └── prometheus.yml
│   ├── grafana/
│   │   └── provisioning/
│   │       └── datasources/
│   │           └── prometheus.yml
│   └── k8s/
│
├── scripts/
│   ├── checkpoints.sh
│   ├── compose.sh
│   ├── dev.sh
│   ├── p0-fix.sh
│   └── setup-folders.sh
│
├── AGENTS.md
├── RULES.md
├── CONTRIBUTING.md
├── LICENSE
├── README.md
├── checkpoint-report.txt
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
├── pnpm-workspace.yaml
├── tsconfig.build.json
├── tsconfig.json
├── vitest.config.e2e.ts
└── vitest.config.ts
```

---

## 3. Statistik (Sprint 0 + 1 #1-3)

| Metrik                  | Jumlah                                                           |
| ----------------------- | ---------------------------------------------------------------- |
| Source file (`.ts`)     | 62                                                               |
| Test file (`.spec.ts`)  | 20                                                               |
| Total test              | 161                                                              |
| Core domain dirs        | 5 (`auth`, `rbac`, `tenant`, `rate-limit`, `routing`)            |
| Core application dirs   | 5                                                                |
| Infrastructure adapters | 2 (`yaml-tenant.repository`, `default-policy-evaluator.adapter`) |
| Error codes             | 114 (semua domain)                                               |
| Coverage                | Statements 97.5%, Branches 89.8%, Functions 95.9%, Lines 98.3%   |

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
| `core/*/domain`                              | `shared/types` saja                   | NestJS, Redis, HTTP           |
| `core/*/application`                         | `core/*/domain`, `shared/*`           | infrastructure, modules       |
| `infrastructure/*`                           | `core/*/domain` (implement Port)      | `core/*/application`, modules |
| `modules/*`                                  | `core/*/application`, `core/*/domain` | infrastructure langsung       |
| `guards/*`, `interceptors/*`, `middleware/*` | `core/*`, `shared/*`                  | —                             |
| `shared/*`                                   | —                                     | core, modules, infrastructure |

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
[AuthGuard]                        (Sprint 1 #2)
   │
   ▼
[RbacGuard]                        check role / scope
   │
   ▼
[RateLimitGuard]                   (Sprint 1 #4)
   │
   ▼
[Controller]                       proxy / health / metrics
```

---

## 6. Yang Sudah Dikerjakan vs Belum

### Sprint 0 — Done

- [x] Bootstrap NestJS 12 + Fastify + ESM
- [x] Shared types (Result, Option, Brand, RepositoryPort, UseCase, Codec, Mapper)
- [x] Error framework (DomainError, error codes, RFC 7807 DTO)
- [x] Config module (Zod validation, env)
- [x] Redis module
- [x] Logger module
- [x] Health controller
- [x] Middleware module (RequestId + TenantContext)
- [x] Lefthook + commitlint
- [x] P0 fixes

### Sprint 1 #1 — Tenant Resolution — Done

- [x] TenantId VO (branded, slug validation)
- [x] Tenant entity + repository port
- [x] ResolveTenantUseCase (subdomain → header → JWT)
- [x] YamlTenantRepository + ConfigRepositoryModule
- [x] RequestContextHolder (AsyncLocalStorage)
- [x] @CurrentTenant decorator

### Sprint 1 #2 — Auth Guard JWT — Belum

- [ ] TokenVerifierPort
- [ ] JwksClient + JwtVerifierAdapter
- [ ] VerifyTokenUseCase
- [ ] AuthGuard (global)
- [ ] @CurrentUser decorator (sudah ada, butuh Principal)
- [ ] AuthModule

### Sprint 1 #3 — RBAC Guard — Done

- [x] Permission VO (resource:action, wildcard)
- [x] Policy entity (allow/deny rules)
- [x] PolicyEvaluatorPort
- [x] CheckPermissionUseCase
- [x] DefaultPolicyEvaluatorAdapter
- [x] RbacGuard
- [x] @Roles, @Scopes, @RequirePermissions decorators

### Sprint 1 #4 — Rate Limit — Belum

- [ ] RateLimit entity
- [ ] RateLimitStorePort
- [ ] SlidingWindowRateLimiter
- [ ] RedisRateLimitAdapter
- [ ] RateLimitGuard

### Sprint 1 #5 — Proxy Engine — Belum

- [ ] Route entity + RouteRepositoryPort
- [ ] ResolveRouteUseCase
- [ ] YamlRouteRepository
- [ ] ProxyAdapter (undici)
- [ ] CircuitBreaker (core circuit-breaker)

### Sprint 2 — Belum

- [ ] Idempotency interceptor
- [ ] Cache interceptor
- [ ] Observability interceptors

### Sprint 3 — Belum

- [ ] Metrics endpoint
- [ ] Admin endpoint

### Sprint 4 — Belum

- [ ] gRPC upstream support

---

## 7. Referensi

- `docs/ARCHITECTURE.md` — arsitektur sistem
- `docs/PRD.md` — product requirements
- `AGENTS.md` — aturan kode untuk AI
- `RULES.md` — clean code & error handling
