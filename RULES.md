# RULES.md — Aturan Clean Code & Error Handling

| Field           | Value                                                 |
| --------------- | ----------------------------------------------------- |
| Versi           | 1.0.0                                                 |
| Berlaku untuk   | Setiap file yang ditulis di repo ini                  |
| Dokumen Terkait | `AGENTS.md`, `ARCHITECTURE.md`, `RESILIENCE.md`       |
| Standar Error   | RFC 7807 (Problem Details), RFC 9110 (HTTP Semantics) |

---

## 1. Prinsip Clean Code

| #   | Prinsip                          | Aturan Praktis                                          |
| --- | -------------------------------- | ------------------------------------------------------- |
| 1   | **Single Responsibility**        | 1 file = 1 tanggung jawab. 1 fungsi = 1 tugas.          |
| 2   | **Small is beautiful**           | Fungsi ≤ 30 baris. File ≤ 200 baris. Class ≤ 150 baris. |
| 3   | **Meaningful names**             | Nama menjelaskan _apa_, bukan _bagaimana_.              |
| 4   | **No side effects**              | Fungsi tidak mengubah parameter.                        |
| 5   | **Immutability first**           | `readonly`, `const`, hindari mutasi.                    |
| 6   | **Explicit over implicit**       | Tidak ada magic. Semua eksplisit.                       |
| 7   | **Fail fast**                    | Validasi di awal, error di awal.                        |
| 8   | **DRY**                          | Tidak ada duplikasi logika.                             |
| 9   | **KISS**                         | Solusi paling sederhana yang benar.                     |
| 10  | **YAGNI**                        | Jangan buat yang belum dibutuhkan.                      |
| 11  | **Boy Scout Rule**               | Tinggalkan kode lebih bersih dari sebelumnya.           |
| 12  | **Composition over inheritance** | Pakai komposisi, hindari extends.                       |

---

## 2. Struktur File Standar

Setiap file **wajib** mengikuti urutan ini:

```ts
// 1. Imports — dikelompokkan & diurutkan
//    a. Node built-in
import { randomUUID } from 'node:crypto';
import { setTimeout as delay } from 'node:timers/promises';

//    b. External packages
import { Injectable, Logger } from '@nestjs/common';
import { z } from 'zod';

//    c. Internal — absolute import (@/)
import { DomainError } from '@/shared/errors';
import type { RouteRepositoryPort } from '@/core/routing/domain/route.repository.port';

//    d. Type-only imports
import type { FastifyRequest } from 'fastify';

// 2. Constants
const DEFAULT_TIMEOUT_MS = 5_000;

// 3. Types & interfaces
export interface ResolveRouteInput {
  /* ... */
}

// 4. Class / function
@Injectable()
export class ResolveRouteUseCase {
  // 4a. Fields (private first, readonly)
  private readonly logger = new Logger(ResolveRouteUseCase.name);

  // 4b. Constructor
  constructor(private readonly routes: RouteRepositoryPort) {}

  // 4c. Public methods
  async execute(input: ResolveRouteInput): Promise<ResolveRouteOutput> {
    /* ... */
  }

  // 4d. Private methods
  private validate(input: ResolveRouteInput): void {
    /* ... */
  }
}

// 5. Named export only — TIDAK ada default export
```

**Aturan:**

- ✅ Named export saja
- ✅ `import type` untuk type-only
- ✅ Urutan import: built-in → external → internal
- ❌ Tidak ada default export
- ❌ Tidak ada import di tengah file

---

## 3. Aturan Naming

| Elemen        | Format                | Contoh                     | Larangan          |
| ------------- | --------------------- | -------------------------- | ----------------- |
| File          | `kebab-case.type.ts`  | `resolve-route.usecase.ts` | `ResolveRoute.ts` |
| Class         | `PascalCase`          | `ResolveRouteUseCase`      | `resolveRoute`    |
| Interface     | `PascalCase` + suffix | `RouteRepositoryPort`      | `IRoute`          |
| Type          | `PascalCase`          | `RouteConfig`              | `route_config`    |
| Function      | `camelCase` + verb    | `resolveRoute`             | `routeResolver`   |
| Boolean       | `is/has/can/should`   | `isEnabled`, `hasAccess`   | `enabled`         |
| Constant      | `SCREAMING_SNAKE`     | `DEFAULT_TIMEOUT_MS`       | `defaultTimeout`  |
| Enum          | `PascalCase`          | `ErrorCode`                | `ERROR_CODE`      |
| Private field | `#` atau `private`    | `#cache`                   | `_cache`          |

**Verb yang direkomendasikan:**

- `get` / `find` — ambil data
- `create` / `build` — buat baru
- `update` / `apply` — ubah
- `delete` / `remove` — hapus
- `is` / `has` / `can` — boolean
- `to` / `as` — konversi
- `validate` / `parse` — validasi
- `resolve` / `compute` — hitung

---

## 4. Aturan Fungsi

### 4.1 Ukuran & Kompleksitas

| Metrik                | Batas                      |
| --------------------- | -------------------------- |
| Baris per fungsi      | ≤ 30                       |
| Parameter             | ≤ 3 (lebih → pakai object) |
| Cyclomatic complexity | ≤ 10                       |
| Nesting level         | ≤ 3                        |
| Return statement      | ≤ 5                        |

### 4.2 Parameter

```ts
// ❌ SALAH — banyak parameter posisional
function createUser(
  name: string,
  email: string,
  role: string,
  tenant: string,
) {}

// ✅ BENAR — object parameter
interface CreateUserInput {
  readonly name: string;
  readonly email: string;
  readonly role: Role;
  readonly tenantId: TenantId;
}
function createUser(input: CreateUserInput): Promise<User> {}
```

### 4.3 Early Return

```ts
// ❌ SALAH — nesting dalam
function process(req: Request) {
  if (req.user) {
    if (req.user.active) {
      if (req.body) {
        return handle(req);
      }
    }
  }
  return null;
}

// ✅ BENAR — early return
function process(req: Request) {
  if (!req.user) return null;
  if (!req.user.active) return null;
  if (!req.body) return null;
  return handle(req);
}
```

### 4.4 Pure Function Prioritas

```ts
// ✅ Pure — mudah dites
function calculateQuota(used: number, limit: number): number {
  return Math.max(0, limit - used);
}

// ❌ Impure — susah dites
let quota = 0;
function decrementQuota(): void {
  quota--;
}
```

---

## 5. Error Handling — RFC 7807

### 5.1 Standar yang Diikuti

| RFC          | Judul                         | Relevansi                      |
| ------------ | ----------------------------- | ------------------------------ |
| **RFC 7807** | Problem Details for HTTP APIs | Format error response          |
| **RFC 9110** | HTTP Semantics                | Status code & method semantics |
| **RFC 6750** | Bearer Token                  | Format error auth              |
| **RFC 7231** | HTTP/1.1 Semantics            | `Retry-After`, `Allow`         |

### 5.2 Format Error Response (RFC 7807)

Setiap error **wajib** mengembalikan format ini:

```json
{
  "type": "https://api.example.com/errors/GW_RATE_LIMIT_EXCEEDED",
  "title": "Rate limit exceeded",
  "status": 429,
  "code": "GW_RATE_LIMIT_EXCEEDED",
  "detail": "Quota 100 req/min terlampaui",
  "instance": "/api/v1/orders",
  "requestId": "01HX8Z...",
  "tenantId": "t_123",
  "timestamp": "2026-09-21T10:00:05Z",
  "retryable": true,
  "retryAfter": 30,
  "errors": []
}
```

**Field wajib:**

| Field       | Tipe     | Sumber                                  |
| ----------- | -------- | --------------------------------------- |
| `type`      | URI      | `https://api.example.com/errors/{CODE}` |
| `title`     | string   | Dari `ERROR_CATALOG`                    |
| `status`    | integer  | HTTP status                             |
| `code`      | string   | `GW_*` stabil                           |
| `instance`  | string   | Path request                            |
| `requestId` | string   | Dari middleware                         |
| `timestamp` | ISO 8601 | Waktu kejadian                          |
| `retryable` | boolean  | Dari catalog                            |

**Field opsional:**
`detail`, `tenantId`, `retryAfter`, `errors[]`, `traceId`.

### 5.3 Content-Type Wajib

```http
Content-Type: application/problem+json
```

Sesuai **RFC 7807 §3**. Tidak boleh `application/json` biasa untuk error.

### 5.4 Header Wajib untuk Error

| Status | Header                  | Nilai                | RFC              |
| ------ | ----------------------- | -------------------- | ---------------- |
| 401    | `WWW-Authenticate`      | `Bearer realm="api"` | RFC 6750         |
| 405    | `Allow`                 | `GET, POST`          | RFC 9110 §10.2.1 |
| 429    | `Retry-After`           | detik / HTTP-date    | RFC 9110 §10.2.3 |
| 429    | `X-RateLimit-Limit`     | angka                | De facto         |
| 429    | `X-RateLimit-Remaining` | angka                | De facto         |
| 429    | `X-RateLimit-Reset`     | unix ts              | De facto         |
| 503    | `Retry-After`           | detik                | RFC 9110         |

### 5.5 Status Code — Wajib Sesuai RFC 9110

| Kode | Nama                   | Kapan Dipakai                      |
| ---- | ---------------------- | ---------------------------------- |
| 400  | Bad Request            | Validasi input gagal               |
| 401  | Unauthorized           | Belum autentikasi                  |
| 403  | Forbidden              | Sudah autentikasi, tidak berwenang |
| 404  | Not Found              | Resource tidak ada                 |
| 405  | Method Not Allowed     | Method salah untuk resource        |
| 406  | Not Acceptable         | `Accept` tidak didukung            |
| 409  | Conflict               | Konflik state (idempotency)        |
| 410  | Gone                   | Endpoint deprecated                |
| 413  | Payload Too Large      | Body terlalu besar                 |
| 415  | Unsupported Media Type | `Content-Type` salah               |
| 422  | Unprocessable Entity   | Semantik salah                     |
| 429  | Too Many Requests      | Rate limit                         |
| 500  | Internal Server Error  | Bug                                |
| 501  | Not Implemented        | Belum ada                          |
| 502  | Bad Gateway            | Upstream error                     |
| 503  | Service Unavailable    | Down / maintenance                 |
| 504  | Gateway Timeout        | Upstream timeout                   |
| 508  | Loop Detected          | Routing loop (RFC 5842)            |

**Aturan:**

- ❌ Tidak boleh 200 untuk error
- ❌ Tidak boleh 401 untuk masalah otorisasi (harus 403)
- ❌ Tidak boleh 500 untuk error klien (harus 4xx)

### 5.6 Hierarki Error

```ts
// Base — di shared/errors/domain-error.ts
export class DomainError extends Error {
  /* ... */
}

// Spesifik — di shared/errors/gateway-error.ts
export class RateLimitExceededError extends DomainError {
  /* ... */
}
```

**Aturan:**

- ✅ Semua error extends `DomainError`
- ✅ Semua error punya `code` dari katalog
- ❌ Tidak ada `throw new Error()` langsung
- ❌ Tidak ada `throw 'string'`
- ❌ Tidak ada `throw { object }`

### 5.7 Error Code — Format & Aturan

Format: `GW_<DOMAIN>_<REASON>`

```
GW_AUTH_TOKEN_EXPIRED
GW_RATE_LIMIT_TENANT_EXCEEDED
GW_UPSTREAM_TIMEOUT
```

**Aturan:**

- ✅ Uppercase, snake case
- ✅ Prefix `GW_` wajib
- ✅ Satu kode = satu makna
- ✅ Kode **stabil** — tidak berubah setelah publikasi
- ❌ Tidak boleh ada kode duplikat
- ❌ Tidak boleh pesan dinamis di kode

### 5.8 Cara Melempar Error

```ts
// ✅ BENAR — spesifik, dengan konteks
throw new RateLimitExceededError('Quota 100 req/min terlampaui', {
  detail: `Limit: 100, Window: 60s, Remaining: 0`,
  retryAfter: 30,
  meta: { limit: 100, window: 60, remaining: 0 },
  cause: originalError,
});

// ❌ SALAH — generic
throw new Error('Rate limit exceeded');

// ❌ SALAH — tanpa konteks
throw new RateLimitExceededError('');
```

### 5.9 Cara Menangkap Error

```ts
// ✅ BENAR — tangkap, konversi, lempar ulang
try {
  await this.redis.incr(key);
} catch (cause) {
  if (cause instanceof RedisTimeoutError) {
    throw new RateLimitStoreUnavailableError('Redis timeout', { cause });
  }
  throw new InternalDependencyError('Redis error', { cause });
}

// ❌ SALAH — tangkap dan diam
try {
  await foo();
} catch {}

// ❌ SALAH — tangkap dan log saja
try {
  await foo();
} catch (e) {
  console.log(e);
}
```

### 5.10 Error Tidak Boleh Bocorkan Internal

```ts
// ❌ SALAH — bocorkan host, port, stack
throw new Error(`DB failed at 10.0.0.5:5432`);

// ✅ BENAR — pakai meta internal
throw new InternalDependencyError('Dependency unavailable', {
  meta: { host: '10.0.0.5', port: 5432 }, // untuk log saja
  detail: 'Service sementara tidak tersedia', // untuk klien
});
```

**Dilarang di `detail` (yang dikirim ke klien):**

- Stack trace
- Nama host / IP / port internal
- Nama tabel / kolom DB
- Query SQL
- Path file sistem
- Nama library versi

### 5.11 Fail Mode

| Fitur       | Mode            | Alasan                    |
| ----------- | --------------- | ------------------------- |
| Rate limit  | **Fail-open**   | Over-quota < API down     |
| Idempotency | **Fail-closed** | Cegah duplikasi           |
| Auth        | **Fail-closed** | Cegah akses tidak sah     |
| Cache       | **Fail-open**   | Miss → upstream           |
| Logging     | **Fail-open**   | Log tidak boleh ganggu    |
| Metrics     | **Fail-open**   | Metric tidak boleh ganggu |

### 5.12 Retry & Idempotency

```ts
// Hanya retry untuk idempotent method
const IDEMPOTENT_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);

if (IDEMPOTENT_METHODS.has(method)) {
  await retry(() => forward(req), {
    maxAttempts: 3,
    backoff: 'exponential',
    jitter: true,
  });
}
```

**Aturan:**

- ❌ Jangan retry POST/PUT/PATCH tanpa idempotency key
- ✅ Retry dengan exponential backoff + jitter
- ✅ Batasi max attempt (default 3)
- ✅ Retry budget ≤ 10% total request

---

## 6. Aturan Validasi (RFC-aligned)

### 6.1 Wajib Pakai Zod

```ts
// ✅ BENAR
const Schema = z.object({
  email: z.string().email().max(254), // RFC 5321
  name: z.string().min(1).max(100),
  age: z.number().int().min(0).max(150),
});

const parsed = Schema.safeParse(raw);
if (!parsed.success) {
  throw new ValidationFailedError('Input tidak valid', {
    fieldErrors: parsed.error.issues.map((i) => ({
      field: i.path.join('.'),
      code: i.code,
      message: i.message,
    })),
  });
}
```

### 6.2 Header Validation

| Header            | Validasi           | RFC              |
| ----------------- | ------------------ | ---------------- |
| `Content-Type`    | Media type valid   | RFC 9110 §8.3    |
| `Accept`          | Media type valid   | RFC 9110 §12.5.1 |
| `Authorization`   | `Bearer <token>`   | RFC 6750         |
| `Idempotency-Key` | UUID v4 / ULID     | De facto         |
| `X-Request-ID`    | Alfanumerik, ≤ 128 | De facto         |

### 6.3 Body Size Limit

```ts
// Wajib ada limit
const MAX_BODY_SIZE = 1 * 1024 * 1024; // 1 MB
```

Jika melebihi → `413 GW_VALIDATION_PAYLOAD_TOO_LARGE`.

---

## 7. Aturan Logging

### 7.1 Structured Logging Wajib

```ts
// ✅ BENAR
this.logger.log(
  {
    requestId,
    tenantId,
    userId,
    route: '/api/v1/orders',
    method: 'POST',
    status: 200,
    latencyMs: 45,
  },
  'Request completed',
);

// ❌ SALAH
console.log(`Request to /api/v1/orders completed in 45ms`);
```

### 7.2 Field Wajib di Setiap Log Request

```ts
{
  requestId: string;      // wajib
  timestamp: string;      // ISO 8601
  level: string;          // info/warn/error
  service: string;        // 'api-gateway'
  route: string;
  method: string;
  status: number;
  latencyMs: number;
  tenantId?: string;
  userId?: string;
}
```

### 7.3 Yang Dilarang di Log

```
❌ password, token, secret, apiKey
❌ authorization, cookie, set-cookie
❌ creditCard, ssn, nik, passport
❌ email mentah, phone mentah
❌ Full request body (bisa berisi PII)
❌ Stack trace di level info
```

### 7.4 Level Log

| Level   | Kapan                        | Contoh             |
| ------- | ---------------------------- | ------------------ |
| `error` | 5xx, exception tak terduga   | Upstream down      |
| `warn`  | 4xx, degradasi, fallback     | Rate limit hit     |
| `info`  | Request sukses, state change | Config reloaded    |
| `debug` | Debugging (dev only)         | Route matched      |
| `trace` | Sangat detail (jarang)       | Header transformed |

---

## 8. Aturan Komentar

### 8.1 Kapan Menulis Komentar

```ts
// ✅ Komentar menjelaskan MENGAPA, bukan APA
// Gunakan waktu UTC karena upstream tidak handle timezone
const now = new Date().toISOString();

// ❌ Komentar menjelaskan APA (redundan)
// Set variabel now ke waktu sekarang
const now = new Date().toISOString();
```

### 8.2 JSDoc untuk Public API

```ts
/**
 * Resolve route berdasarkan path, method, dan tenant.
 *
 * @param input - Path, method, dan tenant ID
 * @returns Route jika ditemukan, atau discriminated union jika tidak
 * @throws RouteConfigInvalidError jika config rusak
 */
async execute(input: ResolveRouteInput): Promise<ResolveRouteOutput> {}
```

### 8.3 Larangan Komentar

```ts
// ❌ Kode yang di-comment (hapus saja, pakai git)
// const oldImplementation = () => { ... }

// ❌ TODO tanpa tiket
// TODO: fix this later

// ✅ TODO dengan tiket
// TODO(#1234): hapus setelah migrasi v2
```

---

## 9. Aturan Import & Dependency

### 9.1 Absolute Import

```ts
// ✅ BENAR
import { RateLimitExceededError } from '@/shared/errors';

// ❌ SALAH
import { RateLimitExceededError } from '../../../shared/errors';
```

### 9.2 Type-only Import

```ts
// ✅ BENAR
import type { Route } from '@/core/routing/domain/route.entity';

// ❌ SALAH — membawa runtime code
import { Route } from '@/core/routing/domain/route.entity';
```

### 9.3 Circular Dependency — Dilarang

Gunakan `dependency-cruiser` di CI untuk mendeteksi.

---

## 10. Checklist Per File

Sebelum commit, setiap file **wajib** melewati checklist ini:

### Struktur

- [ ] Import terurut (built-in → external → internal)
- [ ] Named export saja
- [ ] File ≤ 200 baris
- [ ] Fungsi ≤ 30 baris
- [ ] Tidak ada default export

### TypeScript

- [ ] Tidak ada `any`
- [ ] Tidak ada `as unknown as`
- [ ] Tidak ada `@ts-ignore`
- [ ] `readonly` untuk immutable
- [ ] Generic untuk abstraksi

### Clean Code

- [ ] Nama jelas & konsisten
- [ ] Tidak ada magic number
- [ ] Tidak ada duplikasi
- [ ] Early return
- [ ] Tidak ada `console.log`

### Error Handling

- [ ] Lempar `DomainError`, bukan `Error`
- [ ] Error code dari katalog
- [ ] Tidak catch-and-silent
- [ ] `detail` tidak bocorkan internal
- [ ] Fail mode sesuai (open/close)

### Validasi

- [ ] Input dari luar divalidasi Zod
- [ ] Header disanitasi
- [ ] Body size limit
- [ ] Timeout untuk semua I/O

### Logging

- [ ] Field wajib lengkap
- [ ] Tidak log secret/PII
- [ ] Level sesuai

### Test

- [ ] Ada test untuk use case
- [ ] Ada test untuk error path
- [ ] Ada test untuk edge case
- [ ] Coverage ≥ 90% (core)

---

## 11. Contoh File Referensi — End-to-End

### 11.1 Error Class

```ts
// src/shared/errors/gateway-error.ts
import { DomainError, type DomainErrorOptions } from './domain-error';
import { ErrorCode } from './error-codes';

type Opts = Omit<DomainErrorOptions, 'cause'>;

export class RateLimitExceededError extends DomainError {
  constructor(message: string, options?: Opts) {
    super(ErrorCode.RATE_LIMIT_EXCEEDED, message, options);
    this.name = 'RateLimitExceededError';
  }
}
```

### 11.2 Use Case

```ts
// src/core/rate-limit/application/check-quota.usecase.ts
import { Injectable, Logger } from '@nestjs/common';
import type { RateLimiterPort } from '../domain/rate-limiter.port';
import { RateLimitExceededError } from '@/shared/errors';

export interface CheckQuotaInput {
  readonly tenantId: string;
  readonly userId: string;
  readonly route: string;
}

export interface CheckQuotaOutput {
  readonly allowed: boolean;
  readonly remaining: number;
  readonly resetAt: number;
}

@Injectable()
export class CheckQuotaUseCase {
  private readonly logger = new Logger(CheckQuotaUseCase.name);

  constructor(private readonly limiter: RateLimiterPort) {}

  async execute(input: CheckQuotaInput): Promise<CheckQuotaOutput> {
    const key = `rl:${input.tenantId}:${input.userId}:${input.route}`;
    const result = await this.limiter.check(key, 100, 60);

    if (!result.allowed) {
      this.logger.warn(
        {
          tenantId: input.tenantId,
          userId: input.userId,
          route: input.route,
          remaining: result.remaining,
        },
        'Rate limit exceeded',
      );

      throw new RateLimitExceededError('Quota terlampaui', {
        detail: `Limit 100 req/min, sisa ${result.remaining}`,
        retryAfter: result.resetAt - Math.floor(Date.now() / 1000),
        meta: { key, remaining: result.remaining, resetAt: result.resetAt },
      });
    }

    return {
      allowed: true,
      remaining: result.remaining,
      resetAt: result.resetAt,
    };
  }
}
```

### 11.3 Test

```ts
// src/core/rate-limit/application/check-quota.usecase.spec.ts
import { describe, it, expect, vi } from 'vitest';
import { CheckQuotaUseCase } from './check-quota.usecase';
import { RateLimitExceededError } from '@/shared/errors';

describe('CheckQuotaUseCase', () => {
  it('returns allowed=true jika kuota tersedia', async () => {
    const limiter = {
      check: vi.fn().mockResolvedValue({
        allowed: true,
        remaining: 99,
        resetAt: 1758448800,
      }),
    };
    const uc = new CheckQuotaUseCase(limiter);

    const result = await uc.execute({
      tenantId: 't_1',
      userId: 'u_1',
      route: '/orders',
    });

    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(99);
  });

  it('throws RateLimitExceededError jika kuota habis', async () => {
    const limiter = {
      check: vi.fn().mockResolvedValue({
        allowed: false,
        remaining: 0,
        resetAt: 1758448800,
      }),
    };
    const uc = new CheckQuotaUseCase(limiter);

    await expect(
      uc.execute({
        tenantId: 't_1',
        userId: 'u_1',
        route: '/orders',
      }),
    ).rejects.toThrow(RateLimitExceededError);
  });
});
```

---

## 12. Anti-Pattern — Dilarang Keras

| #   | Anti-Pattern           | Contoh                        | Ganti Dengan        |
| --- | ---------------------- | ----------------------------- | ------------------- |
| 1   | Magic number           | `if (x > 100)`                | `const LIMIT = 100` |
| 2   | Boolean param          | `create(true, false)`         | Object param        |
| 3   | Nested ternary         | `a ? b ? c : d : e`           | if-else / fungsi    |
| 4   | Long param list        | `f(a,b,c,d,e,f)`              | Object param        |
| 5   | God class              | Class 1000 baris              | Pecah               |
| 6   | Shotgun surgery        | Ubah 1 fitur, edit 10 file    | Perbaiki boundary   |
| 7   | Copy-paste             | Duplikasi logika              | Ekstrak fungsi      |
| 8   | Commented code         | `// oldFunc()`                | Hapus               |
| 9   | Dead code              | Fungsi tidak dipakai          | Hapus               |
| 10  | Catch-all              | `catch (e) {}`                | Tangkap spesifik    |
| 11  | Stringly typed         | `type = "user"`               | Enum / union        |
| 12  | Primitive obsession    | `userId: string`              | Value object        |
| 13  | Feature envy           | Method akses field class lain | Pindah method       |
| 14  | Inappropriate intimacy | Class saling tahu detail      | Interface           |
| 15  | Temporary field        | Field hanya dipakai sesekali  | Lokal variabel      |

---

## 13. Ringkasan

> **File kecil, nama jelas, immutable, early return. Error pakai DomainError + kode GW\_*, response RFC 7807 (`application/problem+json`), status sesuai RFC 9110, header sesuai RFC 6750/9110. Validasi Zod. Log structured tanpa PII. Fail-open/closed sesuai konteks. Test ≥ 90% di core.**

### Golden Rules

1. **Setiap error** → `DomainError` + kode `GW_*`
2. **Setiap response error** → RFC 7807 (`application/problem+json`)
3. **Setiap status code** → sesuai RFC 9110
4. **Setiap header error** → sesuai RFC (401/405/429/503)
5. **Setiap input luar** → validasi Zod
6. **Setiap I/O** → timeout
7. **Setiap file** → ≤ 200 baris, named export
8. **Setiap log** → structured, tanpa PII
9. **Setiap use case** → ada test
10. **Setiap ragu** → fail-closed
