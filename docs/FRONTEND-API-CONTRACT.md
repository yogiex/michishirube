# Frontend API Contract — Admin API

| Field               | Value                                                                 |
| ------------------- | --------------------------------------------------------------------- |
| Versi               | 1.0.0                                                                 |
| Base URL            | `http://localhost:7300` (dev) · `https://api.michishirube.dev` (prod) |
| Status              | Draft                                                                 |
| Terakhir Diperbarui | 2026-09-24                                                            |
| Konsumen            | Dashboard Next.js                                                     |
| Referensi           | `docs/ARCHITECTURE.md`, `RULES.md`, `docs/SPRINT.md`                  |

---

## 1. Konvensi Umum

### 1.1 Authentication

Semua endpoint `/admin/*` wajib menyertakan JWT:

```http
Authorization: Bearer <jwt>
X-Request-ID: <uuid>
```

`X-Request-ID` opsional; backend membuat UUID bila tidak diberikan. Role wajib `admin` dan scope wajib `admin:*`.

Development claim minimum:

```json
{
  "sub": "u_admin_001",
  "tid": "t_system",
  "roles": ["admin"],
  "scopes": ["admin:*"],
  "iss": "http://localhost:4001",
  "aud": "api.local"
}
```

Login flow, session endpoint, dan logout mengikuti kontrak auth terpisah yang akan ditambahkan pada Sprint 3B.

### 1.2 Response Format

Sukses list:

```json
{
  "data": [],
  "page": 1,
  "limit": 20,
  "total": 0,
  "totalPages": 0
}
```

Sukses single:

```json
{ "data": { "id": "..." } }
```

Sukses action:

```json
{ "ok": true, "data": {} }
```

`204 No Content` tidak memiliki body atau envelope. Error mengikuti RFC 7807 dengan content type `application/problem+json`:

```json
{
  "type": "https://api.michishirube.dev/errors/GW_ROUTE_NOT_FOUND",
  "title": "Route not found",
  "status": 404,
  "code": "GW_ROUTE_NOT_FOUND",
  "detail": "Route tidak ditemukan",
  "instance": "/admin/routes/r_xxx",
  "requestId": "01HX8Z...",
  "timestamp": "2026-09-24T10:00:05Z",
  "retryable": false
}
```

### 1.3 HTTP Status

| Status | Kapan                                   |
| -----: | --------------------------------------- |
|    200 | Read/action sukses                      |
|    201 | Resource dibuat                         |
|    204 | Delete/revoke tanpa body                |
|    400 | Input atau config invalid               |
|    401 | Tidak terautentikasi                    |
|    403 | Role/scope/tenant tidak sesuai          |
|    404 | Resource tidak ditemukan                |
|    409 | Konflik atau idempotency conflict       |
|    429 | Rate limit                              |
|    503 | Dependency/circuit/bulkhead unavailable |
|    504 | Upstream timeout atau retry habis       |

### 1.4 Pagination

`page` default 1 dan 1-indexed. `limit` default 20, maksimum 100. Response list wajib menyertakan `page`, `limit`, `total`, dan `totalPages`.

### 1.5 Filter dan Search

List endpoint dapat mendukung `q`, `tenantId`, `status`, serta filter domain-specific. Semua query value wajib bounded dan divalidasi.

### 1.6 Rate Limit

- Semua `/admin/*`: 300 request/menit per IP.
- Mutation `POST/PATCH/DELETE`: 30 request/menit per IP.
- Header: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`.
- `429` menyertakan `Retry-After` dan RFC 7807.

### 1.7 Idempotency

Mutation `POST` boleh mengirim `Idempotency-Key: <uuid>`. Retry dengan key dan payload yang sama harus mereplay response; payload berbeda menghasilkan `409`.

---

## 2. Ringkasan Endpoint

| Group            | Jumlah | Endpoint                                     |
| ---------------- | -----: | -------------------------------------------- |
| Routes           |      6 | list, detail, create, update, delete, reload |
| Tenants          |      4 | list, create, update, delete                 |
| API Keys         |      3 | list, issue, revoke                          |
| Audit            |      1 | list                                         |
| Circuit Breakers |      3 | list, detail, reset                          |
| Bulkheads        |      2 | list, reset                                  |
| Overview         |      1 | aggregate stats                              |
| **Total**        | **20** | **+ 1 circuit detail = 21 total**            |

### Routes

| Method | Path                   | Deskripsi          |
| ------ | ---------------------- | ------------------ |
| GET    | `/admin/routes`        | List routes        |
| GET    | `/admin/routes/:id`    | Route detail       |
| POST   | `/admin/routes`        | Create route       |
| PATCH  | `/admin/routes/:id`    | Update route       |
| DELETE | `/admin/routes/:id`    | Delete route       |
| POST   | `/admin/routes/reload` | Reload YAML config |

### Tenants

| Method | Path                 | Deskripsi     |
| ------ | -------------------- | ------------- |
| GET    | `/admin/tenants`     | List tenants  |
| POST   | `/admin/tenants`     | Create tenant |
| PATCH  | `/admin/tenants/:id` | Update tenant |
| DELETE | `/admin/tenants/:id` | Delete tenant |

### API Keys

| Method | Path                  | Deskripsi                  |
| ------ | --------------------- | -------------------------- |
| GET    | `/admin/api-keys`     | List keys, never plaintext |
| POST   | `/admin/api-keys`     | Issue key                  |
| DELETE | `/admin/api-keys/:id` | Revoke key                 |

### Audit

| Method | Path           | Deskripsi          |
| ------ | -------------- | ------------------ |
| GET    | `/admin/audit` | List audit entries |

### Circuit Breakers

| Method | Path                                 | Deskripsi       |
| ------ | ------------------------------------ | --------------- |
| GET    | `/admin/circuit-breakers`            | List states     |
| GET    | `/admin/circuit-breakers/:key`       | Circuit detail  |
| POST   | `/admin/circuit-breakers/:key/reset` | Reset to closed |

### Bulkheads

| Method | Path                          | Deskripsi      |
| ------ | ----------------------------- | -------------- |
| GET    | `/admin/bulkheads`            | List stats     |
| POST   | `/admin/bulkheads/:key/reset` | Reset bulkhead |

### Overview

| Method | Path              | Deskripsi           |
| ------ | ----------------- | ------------------- |
| GET    | `/admin/overview` | Dashboard aggregate |

---

## 3. Routes

### GET `/admin/routes`

Query: `q`, `status`, `page`, `limit`, `tenantId` bila applicable. Response list berisi route dengan `id`, `path`, `method`, `upstream`, `enabled`, auth/idempotency flags, roles, rate limit, timeout, dan timestamps.

Errors: `401`, `403`, `429`.

### GET `/admin/routes/:id`

Mengembalikan route detail. Error: `401`, `403`, `404 GW_ROUTE_NOT_FOUND`.

### POST `/admin/routes`

Body create route:

```json
{
  "id": "r_025",
  "path": "/api/v1/analytics",
  "method": "GET",
  "upstream": "https://analytics-svc.internal",
  "enabled": true,
  "requireAuth": true,
  "requireIdempotency": false,
  "roles": ["admin"],
  "rateLimit": { "limit": 50, "windowSec": 60 },
  "timeoutMs": 5000
}
```

Validasi: ID `[a-z0-9_]{1,64}`, path diawali `/` maksimal 500 karakter, method enum HTTP, upstream URL HTTP/HTTPS tanpa private IP, timeout 100–120000 ms, dan rate limit dalam batas konfigurasi. Response `201` dengan route. Audit: `route.create`.

### PATCH `/admin/routes/:id`

Partial update field route yang diizinkan. Response `200` dengan route. Error `400`, `401`, `403`, `404`. Audit: `route.update` tanpa menyimpan secret.

### DELETE `/admin/routes/:id`

Response `204`. Error `401`, `403`, `404`. Audit: `route.delete`.

### POST `/admin/routes/reload`

Membaca ulang `config/routes.yaml`, memvalidasi schema, mengganti cache, dan menulis audit `config.reload`. Response `200`:

```json
{ "ok": true, "data": { "total": 24, "reloadedAt": "2026-09-24T10:00:00Z" } }
```

---

## 4. Tenants

- `GET /admin/tenants`: list dengan pagination/filter.
- `POST /admin/tenants`: create; ID dan slug harus unik, tier enum `free|pro|enterprise`, status default `active`.
- `PATCH /admin/tenants/:id`: update tier/status/name sesuai policy.
- `DELETE /admin/tenants/:id`: response `204`; tidak otomatis revoke API key.

Tenant fields: `id`, `slug`, `name`, `tier`, `status`, `createdAt`, `updatedAt`, dan optional `requests` counter.

---

## 5. API Keys

### GET `/admin/api-keys`

Mendukung `tenantId`, `status`, `page`, `limit`. Response hanya berisi metadata: `id`, `name`, `tenantId`, `keyPrefix`, `scopes`, `status`, usage, timestamps. `keyHash` tidak pernah dikembalikan.

### POST `/admin/api-keys`

Body: `name`, `tenantId`, `scopes`, `expiresInDays` default 90. Scope harus milik tenant dan tervalidasi. Response `201` menyertakan `plaintext` hanya sekali. Dashboard wajib menampilkan modal simpan-secret,_copy, dan acknowledge. Audit: `api_key.create`.

### DELETE `/admin/api-keys/:id`

Revoke key dan response `204`. Cross-tenant operasi menghasilkan `403`; key unknown menghasilkan `404`. Audit: `api_key.revoke`.

---

## 6. Audit

`GET /admin/audit` mendukung `limit`, `actor`, `action`, `from`, dan `to`. Entry memiliki `id`, `timestamp`, `actor`, `action`, `target`, `status`, optional `ip`, dan redacted `details`.

Action yang diharapkan: `auth.failed`, `auth.expired`, `auth.revoked`, route CRUD, tenant CRUD, API key create/revoke, config reload, dan circuit state changes.

---

## 7. Circuit Breaker

- `GET /admin/circuit-breakers`: list `CircuitSnapshot`.
- `GET /admin/circuit-breakers/:key`: detail snapshot.
- `POST /admin/circuit-breakers/:key/reset`: force state ke `closed`; response action `{ ok: true, data: { key } }`.

State enum: `closed`, `open`, `half_open`. Snapshot mencakup counters, consecutive counters, `openedAt`, `openUntil`, dan `lastStateChangeAt`.

Audit event reset adalah `circuit.reset`.

---

## 8. Bulkhead

- `GET /admin/bulkheads`: list stats.
- `POST /admin/bulkheads/:key/reset`: reset dan tolak waiter; response action `{ ok: true, data: { key } }`.

Stats mencakup `active`, `queued`, `maxConcurrent`, `maxQueue`, `totalAcquired`, `totalRejected`, dan `totalTimeout`.

---

## 9. Overview

`GET /admin/overview` mengembalikan aggregate untuk dashboard:

```json
{
  "data": {
    "requests": {
      "perMinute": 4821,
      "deltaVsYesterday": 12.3,
      "total24h": 6936000
    },
    "errors": { "rate": 0.08, "deltaVsYesterday": -0.02, "total24h": 5548 },
    "latency": { "p95Ms": 45, "p99Ms": 128, "deltaVsYesterday": 3 },
    "tenants": { "active": 12, "total": 13 },
    "circuits": { "open": 1, "halfOpen": 0, "closed": 4 },
    "services": [],
    "recentActivity": []
  }
}
```

Metrics berasal dari Prometheus bila tersedia atau Redis fallback. Service health di-cache maksimal 30 detik. Recent activity mengambil 10 audit terbaru.

---

## 10. Error Code Reference

### Auth

`GW_AUTH_MISSING`, `GW_AUTH_INVALID`, `GW_AUTH_TOKEN_MALFORMED`, `GW_AUTH_TOKEN_EXPIRED`, `GW_AUTH_TOKEN_REVOKED`, `GW_AUTH_SIGNATURE_INVALID`, `GW_AUTH_ISSUER_INVALID`, `GW_AUTH_AUDIENCE_INVALID`, `GW_AUTH_JWKS_UNAVAILABLE`.

### RBAC

`GW_RBAC_FORBIDDEN`, `GW_RBAC_ROLE_MISSING`, `GW_RBAC_SCOPE_MISSING`, `GW_RBAC_TENANT_MISMATCH`.

### Validation

`GW_VALIDATION_FAILED`, `GW_VALIDATION_BODY_INVALID`, `GW_VALIDATION_SCHEMA_MISMATCH`.

### Route dan Tenant

`GW_ROUTE_NOT_FOUND`, `GW_ROUTE_CONFIG_INVALID`, `GW_ROUTE_DISABLED`, `GW_TENANT_UNKNOWN`, `GW_TENANT_SUSPENDED`, `GW_TENANT_MISMATCH`.

### Rate limit dan Idempotency

`GW_RATE_LIMIT_EXCEEDED`, `GW_RATE_LIMIT_STORE_UNAVAILABLE`, `GW_IDEMP_KEY_MISSING`, `GW_IDEMP_KEY_INVALID`, `GW_IDEMP_IN_PROGRESS`, `GW_IDEMP_CONFLICT`.

### Upstream, Circuit, Bulkhead

`GW_UPSTREAM_TIMEOUT`, `GW_UPSTREAM_UNAVAILABLE`, `GW_UPSTREAM_RETRY_EXHAUSTED`, `GW_CIRCUIT_OPEN`, `GW_BULKHEAD_REJECTED`.

---

## 11. Polling dan Real-time

Recommended polling:

| Endpoint         | Interval |
| ---------------- | -------: |
| Overview         |      10s |
| Circuit breakers |       5s |
| Bulkheads        |       5s |
| Routes           |      30s |
| Tenants          |      30s |
| Audit            |      15s |

`refetchIntervalInBackground` harus `false`. SSE `/admin/events/stream` dan WebSocket `/admin/ws` merupakan future contract, bukan dependency MVP.

---

## 12. TypeScript Types

```ts
export type ApiResult<T> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly error: ProblemDetail };

export type ListResponse<T> = Readonly<{
  data: readonly T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}>;

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'ALL';

export interface Route {
  readonly id: string;
  readonly path: string;
  readonly method: HttpMethod;
  readonly upstream: string;
  readonly enabled: boolean;
  readonly requireAuth: boolean;
  readonly requireIdempotency: boolean;
  readonly roles: readonly string[];
  readonly rateLimit?: { readonly limit: number; readonly windowSec: number };
  readonly timeoutMs: number;
  readonly createdAt: string;
}

export type CreateRouteInput = Omit<
  Route,
  'createdAt' | 'rateLimit' | 'timeoutMs'
> &
  Partial<Pick<Route, 'rateLimit' | 'timeoutMs'>>;
export type UpdateRouteInput = Partial<CreateRouteInput>;

export interface Tenant {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly tier: 'free' | 'pro' | 'enterprise';
  readonly status: 'active' | 'suspended' | 'inactive';
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly requests: number;
}

export interface ApiKey {
  readonly id: string;
  readonly name: string;
  readonly tenantId: string;
  readonly keyPrefix: string;
  readonly scopes: readonly string[];
  readonly status: 'active' | 'revoked';
  readonly usageCount: number;
  readonly createdAt: string;
  readonly expiresAt: string;
  readonly lastUsedAt?: string;
}

export interface IssuedApiKey extends ApiKey {
  readonly plaintext: string;
}

export interface AuditEntry {
  readonly id: string;
  readonly timestamp: string;
  readonly actor: string;
  readonly action: string;
  readonly target: string;
  readonly status: 'success' | 'warning' | 'error';
  readonly ip?: string;
  readonly details?: Readonly<Record<string, unknown>>;
}

export type CircuitState = 'closed' | 'open' | 'half_open';

export interface CircuitSnapshot {
  readonly key: string;
  readonly state: CircuitState;
  readonly failures: number;
  readonly successes: number;
  readonly consecutiveFailures: number;
  readonly consecutiveSuccesses: number;
  readonly openedAt: number | null;
  readonly openUntil: number | null;
  readonly lastStateChangeAt: number;
}

export interface BulkheadStats {
  readonly key: string;
  readonly active: number;
  readonly queued: number;
  readonly maxConcurrent: number;
  readonly maxQueue: number;
  readonly totalAcquired: number;
  readonly totalRejected: number;
  readonly totalTimeout: number;
}

export interface Overview {
  readonly requests: {
    readonly perMinute: number;
    readonly deltaVsYesterday: number;
    readonly total24h: number;
  };
  readonly errors: {
    readonly rate: number;
    readonly deltaVsYesterday: number;
    readonly total24h: number;
  };
  readonly latency: {
    readonly p95Ms: number;
    readonly p99Ms: number;
    readonly deltaVsYesterday: number;
  };
  readonly tenants: { readonly active: number; readonly total: number };
  readonly circuits: {
    readonly open: number;
    readonly halfOpen: number;
    readonly closed: number;
  };
  readonly services: readonly ServiceHealth[];
  readonly recentActivity: readonly AuditEntry[];
}

export interface ServiceHealth {
  readonly name: string;
  readonly status: 'healthy' | 'degraded' | 'down';
  readonly latencyMs: number | null;
}

export interface ProblemDetail {
  readonly type: string;
  readonly title: string;
  readonly status: number;
  readonly code: string;
  readonly detail?: string;
  readonly instance: string;
  readonly requestId: string;
  readonly timestamp: string;
  readonly retryable: boolean;
  readonly retryAfter?: number;
  readonly errors?: readonly FieldError[];
}

export interface FieldError {
  readonly field: string;
  readonly code: string;
  readonly message: string;
}
```

> Catatan: `readonly` digunakan untuk mencegah mutability. `ProblemDetail` harus divalidasi dari `unknown` sebelum digunakan.

---

## 13. Changelog

| Versi | Tanggal    | Perubahan                                                          |
| ----- | ---------- | ------------------------------------------------------------------ |
| 1.0.0 | 2026-09-24 | Initial contract, 20 endpoint utama/21 total dengan circuit detail |

---

## 14. Referensi

- `docs/ARCHITECTURE.md`
- `docs/STRUCTURE.md`
- `RULES.md` §5
- `docs/SPRINT.md`
