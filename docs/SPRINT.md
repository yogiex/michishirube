# Sprint Plan — Michishirube API Gateway

| Field               | Value                                                                        |
| ------------------- | ---------------------------------------------------------------------------- |
| Versi               | 1.0.0                                                                        |
| Status              | Living Document                                                              |
| Terakhir Diperbarui | 2026-09-23                                                                   |
| Dokumen Terkait     | `PRD.md`, `ARCHITECTURE.md`, `STRUCTURE.md`, `TECHSTACK.md`, `RESILIENCE.md` |

---

## 1. Overview

| Sprint       | Fokus                | Durasi   | Status                   |
| ------------ | -------------------- | -------- | ------------------------ |
| **Sprint 0** | Foundation           | 1 minggu | ✅ **DONE**              |
| **Sprint 1** | Core Gateway         | 2 minggu | 🚧 **In Progress** (85%) |
| **Sprint 2** | Reliability          | 2 minggu | ⏳ Not Started           |
| **Sprint 3** | Observability        | 2 minggu | ⏳ Not Started           |
| **Sprint 4** | Advanced             | 2 minggu | ⏳ Not Started           |
| **Sprint 5** | API Management       | 3 minggu | ⏳ Not Started           |
| **Sprint 6** | Production Hardening | 2 minggu | ⏳ Not Started           |

**Legend:**

- ✅ Done — selesai & committed
- 🚧 In Progress — sebagian selesai
- ⏳ Not Started — belum mulai
- ❌ Blocked — terhalang dependency

---

## 2. Sprint 0 — Foundation ✅ DONE

**Tujuan:** Bootstrap project, tooling, struktur Hexagonal.

**Durasi:** 1 minggu
**Commit range:** `7ea0263` → `7c6823a`

| #    | Fitur                                   | Deliverable                                   | Status |
| ---- | --------------------------------------- | --------------------------------------------- | ------ |
| 0.1  | Bootstrap NestJS 12 + Fastify + ESM     | `main.ts`, `app.module.ts`                    | ✅     |
| 0.2  | Config module + Zod validation          | `src/config/*`                                | ✅     |
| 0.3  | Error framework (RFC 7807)              | `src/shared/errors/*`                         | ✅     |
| 0.4  | Shared types (Result, Option, Brand)    | `src/shared/types/*`                          | ✅     |
| 0.5  | Redis module (ioredis)                  | `src/infrastructure/redis/*`                  | ✅     |
| 0.6  | Logger (Pino) + redact                  | `src/infrastructure/observability/*`          | ✅     |
| 0.7  | Health check                            | `src/modules/health/*`                        | ✅     |
| 0.8  | Request ID middleware                   | `src/middleware/request-id.middleware.ts`     | ✅     |
| 0.9  | Tenant context middleware               | `src/middleware/tenant-context.middleware.ts` | ✅     |
| 0.10 | AsyncLocalStorage context               | `src/shared/context/*`                        | ✅     |
| 0.11 | Lefthook + commitlint                   | `.lefthook.yml`, `commitlint.config.cjs`      | ✅     |
| 0.12 | Dependency boundary (dep-cruiser)       | `.dependency-cruiser.cjs`                     | ✅     |
| 0.13 | Docker Compose (dev/staging/prod)       | `deploy/*`                                    | ✅     |
| 0.14 | Scripts (checkpoint, cleanup, rollback) | `scripts/*`                                   | ✅     |
| 0.15 | CI security workflow                    | `.github/workflows/security.yml`              | ✅     |

**Output:** Project siap dikembangkan, tooling hijau.

---

## 3. Sprint 1 — Core Gateway 🚧 IN PROGRESS

**Tujuan:** Gateway bisa route, auth, limit, dan forward request ke upstream.

**Durasi:** 2 minggu
**Status:** 85% — 5 dari 6 fitur selesai

### 1.1 Tenant Resolution ✅ DONE

**Commit:** `47301ab`

| #     | Fitur                           | Deliverable                                                  | Status |
| ----- | ------------------------------- | ------------------------------------------------------------ | ------ |
| 1.1.1 | TenantId value object (branded) | `core/tenant/domain/tenant-id.vo.ts`                         | ✅     |
| 1.1.2 | Tenant entity                   | `core/tenant/domain/tenant.entity.ts`                        | ✅     |
| 1.1.3 | TenantRepositoryPort            | `core/tenant/domain/tenant.repository.port.ts`               | ✅     |
| 1.1.4 | ResolveTenantUseCase            | `core/tenant/application/resolve-tenant.usecase.ts`          | ✅     |
| 1.1.5 | YamlTenantRepository            | `infrastructure/config-repository/yaml-tenant.repository.ts` | ✅     |
| 1.1.6 | `@CurrentTenant()` decorator    | `shared/decorators/current-tenant.decorator.ts`              | ✅     |

**Output:** Tenant ter-resolve dari subdomain / header / JWT.

---

### 1.2 Auth Guard JWT ❌ NOT STARTED

**Commit:** —
**Blocker untuk:** Sprint 2.1 (Idempotency)

| #      | Fitur                      | Deliverable                                     | Status                     |
| ------ | -------------------------- | ----------------------------------------------- | -------------------------- |
| 1.2.1  | Principal entity           | `core/auth/domain/principal.entity.ts`          | ✅ (partial)               |
| 1.2.2  | Role + Scope VO            | `core/auth/domain/role.vo.ts`                   | ✅ (partial)               |
| 1.2.3  | TokenVerifierPort          | `core/auth/domain/token-verifier.port.ts`       | ❌                         |
| 1.2.4  | VerifyTokenUseCase         | `core/auth/application/verify-token.usecase.ts` | ❌                         |
| 1.2.5  | AuthModule                 | `core/auth/auth.module.ts`                      | ❌                         |
| 1.2.6  | JwksClient                 | `infrastructure/jwt/jwks.client.ts`             | ❌                         |
| 1.2.7  | JwtVerifierAdapter (jose)  | `infrastructure/jwt/jwt-verifier.adapter.ts`    | ❌                         |
| 1.2.8  | JWT constants              | `infrastructure/jwt/jwt.constants.ts`           | ❌                         |
| 1.2.9  | AuthGuard (global)         | `guards/auth.guard.ts`                          | ❌                         |
| 1.2.10 | `@Public()` decorator      | `shared/decorators/public.decorator.ts`         | ❌                         |
| 1.2.11 | `@CurrentUser()` decorator | `shared/decorators/current-user.decorator.ts`   | ⚠️ (exists, but not wired) |
| 1.2.12 | Test: unit + security      | `core/auth/__tests__/*`                         | ❌                         |

**Estimasi:** 2-3 hari, ~9 file + ~25 test.

**Output:** JWT verification via JWKS, `@Public()` untuk endpoint publik.

---

### 1.3 RBAC Guard ✅ DONE

**Commit:** `9832cf3`

| #     | Fitur                              | Deliverable                                               | Status |
| ----- | ---------------------------------- | --------------------------------------------------------- | ------ |
| 1.3.1 | Permission VO                      | `core/rbac/domain/permission.vo.ts`                       | ✅     |
| 1.3.2 | Policy entity                      | `core/rbac/domain/policy.entity.ts`                       | ✅     |
| 1.3.3 | PolicyEvaluatorPort                | `core/rbac/domain/policy-evaluator.port.ts`               | ✅     |
| 1.3.4 | CheckPermissionUseCase             | `core/rbac/application/check-permission.usecase.ts`       | ✅     |
| 1.3.5 | DefaultPolicyEvaluatorAdapter      | `infrastructure/rbac/default-policy-evaluator.adapter.ts` | ✅     |
| 1.3.6 | RbacGuard (global)                 | `guards/rbac.guard.ts`                                    | ✅     |
| 1.3.7 | `@Roles()`, `@Scopes()` decorators | `shared/decorators/*`                                     | ✅     |

**Output:** Role + scope check, deny by default.

---

### 1.4 Rate Limit ✅ DONE

**Commit:** `9ee7449`

| #     | Fitur                             | Deliverable                                                 | Status |
| ----- | --------------------------------- | ----------------------------------------------------------- | ------ |
| 1.4.1 | Quota VO                          | `core/rate-limit/domain/quota.vo.ts`                        | ✅     |
| 1.4.2 | RateLimiterPort                   | `core/rate-limit/domain/rate-limiter.port.ts`               | ✅     |
| 1.4.3 | CheckQuotaUseCase                 | `core/rate-limit/application/check-quota.usecase.ts`        | ✅     |
| 1.4.4 | RedisSlidingWindowAdapter (Lua)   | `infrastructure/rate-limit/redis-sliding-window.adapter.ts` | ✅     |
| 1.4.5 | RateLimitGuard (global)           | `guards/rate-limit.guard.ts`                                | ✅     |
| 1.4.6 | `@RateLimit()` decorator + header | `shared/decorators/rate-limit.decorator.ts`                 | ✅     |

**Output:** Sliding window rate limit atomic di Redis, multi-dimensi (IP/user/tenant/route).

---

### 1.5 Dynamic Routing + Proxy ✅ DONE

**Commit:** `f20026b`

| #      | Fitur                         | Deliverable                                                 | Status         |
| ------ | ----------------------------- | ----------------------------------------------------------- | -------------- |
| 1.5.1  | Route entity + Zod            | `core/routing/domain/route.entity.ts`                       | ✅             |
| 1.5.2  | RouteRepositoryPort           | `core/routing/domain/route.repository.port.ts`              | ✅             |
| 1.5.3  | Path matcher (param/wildcard) | `core/routing/domain/path-matcher.ts`                       | ✅             |
| 1.5.4  | UpstreamClientPort            | `core/routing/domain/upstream-client.port.ts`               | ✅             |
| 1.5.5  | ResolveRouteUseCase           | `core/routing/application/resolve-route.usecase.ts`         | ✅             |
| 1.5.6  | YamlRouteRepository           | `infrastructure/config-repository/yaml-route.repository.ts` | ⚠️ (perlu cek) |
| 1.5.7  | UndiciProxyAdapter            | `infrastructure/http/undici-proxy.adapter.ts`               | ✅             |
| 1.5.8  | Header sanitizer              | `shared/security/header-sanitizer.ts`                       | ✅             |
| 1.5.9  | SSRF guard                    | `shared/security/ssrf-guard.ts`                             | ✅             |
| 1.5.10 | ProxyController               | `modules/proxy/proxy.controller.ts`                         | ✅             |
| 1.5.11 | ProxyService                  | `modules/proxy/proxy.service.ts`                            | ✅             |

**Output:** Request `/api/*` diteruskan ke upstream dengan sanitasi + SSRF protection.

---

### 1.6 API Key Auth ❌ NOT STARTED

**Commit:** —
**Blocker untuk:** Sprint 3A (Admin API untuk issue key)

| #     | Fitur                            | Deliverable                                          | Status |
| ----- | -------------------------------- | ---------------------------------------------------- | ------ |
| 1.6.1 | ApiKey entity                    | `core/api-key/domain/api-key.entity.ts`              | ❌     |
| 1.6.2 | ApiKeyRepositoryPort             | `core/api-key/domain/api-key.repository.port.ts`     | ❌     |
| 1.6.3 | IssueApiKeyUseCase               | `core/api-key/application/issue-api-key.usecase.ts`  | ❌     |
| 1.6.4 | VerifyApiKeyUseCase              | `core/api-key/application/verify-api-key.usecase.ts` | ❌     |
| 1.6.5 | RevokeApiKeyUseCase              | `core/api-key/application/revoke-api-key.usecase.ts` | ❌     |
| 1.6.6 | ListApiKeysUseCase               | `core/api-key/application/list-api-keys.usecase.ts`  | ❌     |
| 1.6.7 | RedisApiKeyRepository            | `infrastructure/redis/redis-api-key.repository.ts`   | ❌     |
| 1.6.8 | Support `X-API-Key` di AuthGuard | `guards/auth.guard.ts`                               | ❌     |

**Estimasi:** 1-2 hari, ~8 file + ~20 test.

**Output:** Partner bisa pakai API key (Argon2id hash + scopes).

---

### Sprint 1 — Status Summary

| #         | Fitur                   | Progress | Commit    |
| --------- | ----------------------- | -------: | --------- |
| 1.1       | Tenant Resolution       |     100% | `47301ab` |
| 1.2       | Auth Guard JWT          |   **0%** | —         |
| 1.3       | RBAC Guard              |     100% | `9832cf3` |
| 1.4       | Rate Limit              |     100% | `9ee7449` |
| 1.5       | Dynamic Routing + Proxy |     100% | `f20026b` |
| 1.6       | API Key Auth            |       0% | —         |
| **Total** |                         |  **83%** |           |

**Sisa:** Sprint 1 #2 (Auth) + #6 (API Key) → ~4-5 hari

---

## 4. Sprint 2 — Reliability ⏳ NOT STARTED

**Tujuan:** Gateway tahan gagal, cegah duplikasi, cache efisien.

**Durasi:** 2 minggu
**Blocker:** Sprint 1 #2 (Auth Guard) harus selesai

### 2.1 Idempotency ⏳

**Estimasi:** 3 hari

| #      | Fitur                            | Deliverable                                               | Status |
| ------ | -------------------------------- | --------------------------------------------------------- | ------ |
| 2.1.1  | IdempotencyKey VO                | `core/idempotency/domain/idempotency-key.vo.ts`           | ❌     |
| 2.1.2  | IdempotencyRecord entity         | `core/idempotency/domain/idempotency-record.entity.ts`    | ❌     |
| 2.1.3  | IdempotencyStorePort             | `core/idempotency/domain/idempotency-store.port.ts`       | ❌     |
| 2.1.4  | BeginIdempotentRequestUseCase    | `core/idempotency/application/begin-*.usecase.ts`         | ❌     |
| 2.1.5  | CompleteIdempotentRequestUseCase | `core/idempotency/application/complete-*.usecase.ts`      | ❌     |
| 2.1.6  | IdempotencyModule                | `core/idempotency/idempotency.module.ts`                  | ❌     |
| 2.1.7  | Lua script (atomic)              | `infrastructure/idempotency/lua/idempotency.lua`          | ❌     |
| 2.1.8  | RedisIdempotencyAdapter          | `infrastructure/idempotency/redis-idempotency.adapter.ts` | ❌     |
| 2.1.9  | IdempotencyInterceptor           | `interceptors/idempotency.interceptor.ts`                 | ❌     |
| 2.1.10 | `@Idempotent()` decorator        | `shared/decorators/idempotent.decorator.ts`               | ❌     |

**Keputusan final (dari diskusi):**

| Aspek                | Nilai                                     |
| -------------------- | ----------------------------------------- |
| Key format           | UUID v4 / ULID / custom 16-128 char       |
| Key validation       | `[A-Za-z0-9_-]{16,128}`                   |
| Error format invalid | 400 `GW_IDEMP_INVALID_KEY`                |
| Lock TTL             | 30s (`IDEMPOTENCY_LOCK_TTL_SEC`)          |
| Replay TTL           | 24h (`IDEMPOTENCY_REPLAY_TTL_SEC`)        |
| Scope                | Per tenant + method + route + key         |
| Concurrent behavior  | Fast-fail 409 `GW_IDEMP_IN_PROGRESS`      |
| Redis key            | `gw:idem:<tenant>:<method>:<route>:<key>` |

**Output:** POST dengan `Idempotency-Key` yang sama → 1x proses, sisanya replay.

---

### 2.2 Circuit Breaker ⏳

**Estimasi:** 3 hari

| #     | Fitur                     | Deliverable                                             | Status |
| ----- | ------------------------- | ------------------------------------------------------- | ------ |
| 2.2.1 | CircuitState VO           | `core/circuit-breaker/domain/circuit-state.vo.ts`       | ❌     |
| 2.2.2 | CircuitBreakerPort        | `core/circuit-breaker/domain/circuit-breaker.port.ts`   | ❌     |
| 2.2.3 | CircuitConfig VO          | `core/circuit-breaker/domain/circuit-config.vo.ts`      | ❌     |
| 2.2.4 | ExecuteWithBreakerUseCase | `core/circuit-breaker/application/execute-*.usecase.ts` | ❌     |
| 2.2.5 | CockatielAdapter          | `infrastructure/circuit-breaker/cockatiel.adapter.ts`   | ❌     |
| 2.2.6 | Fallback policy per route | —                                                       | ❌     |
| 2.2.7 | Circuit state metrics     | `infrastructure/observability/metrics/*`                | ❌     |

**Output:** Upstream down → circuit open → 503 cepat, tidak hang.

---

### 2.3 Retry + Timeout ⏳

**Estimasi:** 1 hari

| #     | Fitur                         | Deliverable                  | Status |
| ----- | ----------------------------- | ---------------------------- | ------ |
| 2.3.1 | Retry policy (exp + jitter)   | `shared/utils/retry.util.ts` | ❌     |
| 2.3.2 | Retry hanya idempotent method | —                            | ❌     |
| 2.3.3 | Retry budget (max 10%)        | —                            | ❌     |

---

### 2.4 Bulkhead ⏳

**Estimasi:** 1 hari

| #     | Fitur                    | Deliverable                                    | Status |
| ----- | ------------------------ | ---------------------------------------------- | ------ |
| 2.4.1 | BulkheadPort             | `core/circuit-breaker/domain/bulkhead.port.ts` | ❌     |
| 2.4.2 | Cockatiel BulkheadPolicy | —                                              | ❌     |

---

### 2.5 Response Caching ⏳

**Estimasi:** 3 hari

| #     | Fitur                       | Deliverable                                   | Status |
| ----- | --------------------------- | --------------------------------------------- | ------ |
| 2.5.1 | CacheKey VO                 | `core/cache/domain/cache-key.vo.ts`           | ❌     |
| 2.5.2 | CacheEntry entity           | `core/cache/domain/cache-entry.entity.ts`     | ❌     |
| 2.5.3 | CacheStorePort              | `core/cache/domain/cache-store.port.ts`       | ❌     |
| 2.5.4 | GetFromCacheUseCase         | `core/cache/application/get-*.usecase.ts`     | ❌     |
| 2.5.5 | SaveToCacheUseCase          | `core/cache/application/save-*.usecase.ts`    | ❌     |
| 2.5.6 | RedisCacheAdapter           | `infrastructure/cache/redis-cache.adapter.ts` | ❌     |
| 2.5.7 | CacheInterceptor            | `interceptors/cache.interceptor.ts`           | ❌     |
| 2.5.8 | `@Cacheable(ttl)` decorator | `shared/decorators/cacheable.decorator.ts`    | ❌     |

---

### 2.6 Testing ⏳

| #     | Fitur                             | Deliverable          | Status |
| ----- | --------------------------------- | -------------------- | ------ |
| 2.6.1 | Unit test semua use case          | —                    | ❌     |
| 2.6.2 | Integration test Redis (Docker)   | `test/integration/*` | ❌     |
| 2.6.3 | Chaos test (kill upstream)        | `scripts/chaos/*`    | ❌     |
| 2.6.4 | Race condition test (Promise.all) | —                    | ❌     |

**Output Sprint 2:** Gateway tahan gagal + aman dari duplikasi + cache efisien.

---

## 5. Sprint 3 — Observability ⏳ NOT STARTED

**Tujuan:** Gateway bisa dimonitor dan dioperasikan.

**Durasi:** 2 minggu

### 3.1 Metrics (Prometheus) ⏳

### 3.2 Distributed Tracing (OpenTelemetry) ⏳

### 3.3 Structured Logging Enhancement ⏳

### 3.4 OpenAPI / Swagger ⏳

### 3.5 Admin API ⏳

### 3.6 IP Allowlist Guard ⏳

### 3.7 Audit Log ⏳

| #     | Fitur                           | Deliverable                                      | Status |
| ----- | ------------------------------- | ------------------------------------------------ | ------ |
| 3.1.1 | PrometheusModule                | `infrastructure/observability/metrics/*`         | ❌     |
| 3.1.2 | `http_requests_total`           | —                                                | ❌     |
| 3.1.3 | `http_request_duration_seconds` | —                                                | ❌     |
| 3.1.4 | `gateway_upstream_errors_total` | —                                                | ❌     |
| 3.1.5 | `gateway_circuit_state`         | —                                                | ❌     |
| 3.1.6 | Metrics endpoint `/metrics`     | `modules/metrics/*`                              | ❌     |
| 3.2.1 | OTel SDK setup                  | `infrastructure/observability/tracing/*`         | ❌     |
| 3.2.2 | W3C trace context propagation   | —                                                | ❌     |
| 3.4.1 | `@nestjs/swagger` setup         | `main.ts`                                        | ❌     |
| 3.4.2 | Spec untuk Admin API            | —                                                | ❌     |
| 3.5.1 | RoutesAdminController           | `modules/admin/routes-admin.controller.ts`       | ❌     |
| 3.5.2 | TenantsAdminController          | `modules/admin/tenants-admin.controller.ts`      | ❌     |
| 3.5.3 | ApiKeysAdminController          | `modules/admin/api-keys-admin.controller.ts`     | ❌     |
| 3.5.4 | AuditAdminController            | `modules/admin/audit-admin.controller.ts`        | ❌     |
| 3.6.1 | IpAllowlistGuard                | `guards/ip-allowlist.guard.ts`                   | ❌     |
| 3.7.1 | AuditEntry entity               | `core/audit/domain/audit-entry.entity.ts`        | ❌     |
| 3.7.2 | RecordAuditUseCase              | `core/audit/application/record-audit.usecase.ts` | ❌     |

**Output Sprint 3:** Gateway observable — metrics, tracing, OpenAPI, admin API.

---

## 6. Sprint 4 — Advanced ⏳ NOT STARTED

**Tujuan:** Fitur enterprise-grade.

**Durasi:** 2 minggu

| #   | Fitur                      | Estimasi |
| --- | -------------------------- | -------: |
| 4.1 | gRPC Transport             |   3 hari |
| 4.2 | Request/Response Transform |   2 hari |
| 4.3 | Canary / Weighted Routing  |   2 hari |
| 4.4 | API Versioning             |   1 hari |
| 4.5 | WebSocket / SSE Support    |   2 hari |

---

## 7. Sprint 5 — API Management ⏳ NOT STARTED

**Tujuan:** Ubah gateway jadi platform API management.

**Durasi:** 3 minggu

| #   | Fitur                | Estimasi |
| --- | -------------------- | -------: |
| 5.1 | Developer Portal     |   5 hari |
| 5.2 | API Registry         |   3 hari |
| 5.3 | Policy as Code       |   3 hari |
| 5.4 | Analytics & Metering |   3 hari |
| 5.5 | Governance           |   3 hari |

---

## 8. Sprint 6 — Production Hardening ⏳ NOT STARTED

**Tujuan:** Siap production, aman, observable penuh.

**Durasi:** 2 minggu

| #   | Fitur                               | Estimasi |
| --- | ----------------------------------- | -------: |
| 6.1 | P1 Security (JWT cookie, MFA, SBOM) |   3 hari |
| 6.2 | Load Testing (k6, chaos)            |   2 hari |
| 6.3 | Multi-Region                        |   3 hari |
| 6.4 | Deployment (K8s, Helm, HPA)         |   2 hari |
| 6.5 | Runbook & Docs                      |   2 hari |

---

## 9. Timeline

```
Minggu  1-2   │ Sprint 0 (Foundation)                 ✅ DONE
Minggu  3-4   │ Sprint 1 (Core Gateway)               🚧 83%
Minggu  5-6   │ Sprint 2 (Reliability)                ⏳
Minggu  7-8   │ Sprint 3 (Observability)              ⏳
Minggu  9-10  │ Sprint 4 (Advanced)                   ⏳
Minggu 11-13  │ Sprint 5 (API Management)             ⏳
Minggu 14-15  │ Sprint 6 (Production Hardening)       ⏳
```

**Milestone:**

| Milestone      | Sprint | Bisa Dipakai Untuk       |
| -------------- | ------ | ------------------------ |
| **MVP**        | 0-1    | Dev / staging            |
| **Beta**       | 0-3    | Internal production      |
| **GA**         | 0-4    | Public production        |
| **Enterprise** | 0-6    | Multi-region, compliance |

---

## 10. Next Action

**Prioritas #1:** Sprint 1 #2 — Auth Guard JWT

- **Blocker untuk:** Sprint 2.1 (Idempotency)
- **Estimasi:** 2-3 hari
- **Deliverable:** JWT verification via JWKS, `@Public()`, `@CurrentUser()`

**Setelah itu:**

- Sprint 1 #6 — API Key Auth (1-2 hari)
- Sprint 2.1 — Idempotency (3 hari)
- Sprint 2.2 — Circuit Breaker (3 hari)

---

## 11. Statistik

| Metrik               | Sprint 0 | Sprint 1 | Target Sprint 3 |
| -------------------- | -------: | -------: | --------------: |
| Source file `.ts`    |      ~30 |      ~80 |            ~150 |
| Test file `.spec.ts` |       10 |       29 |             ~80 |
| Error codes          |       84 |       84 |            ~120 |
| Core contexts        |        4 |        6 |              10 |
| Infra adapters       |        3 |        6 |              10 |
| Guards               |        0 |        2 |               4 |

---

## 12. Referensi

- `docs/PRD.md` — Product Requirements
- `docs/ARCHITECTURE.md` — Arsitektur sistem
- `docs/STRUCTURE.md` — Struktur folder
- `docs/TECHSTACK.md` — Tech stack
- `docs/RESILIENCE.md` — Race condition, SPOF
- `AGENTS.md` — Aturan kode untuk AI
- `RULES.md` — Clean code & error handling
