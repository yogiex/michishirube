# AGENTS.md — Aturan Penulisan Kode untuk AI Agent

| Field                | Value                                                                        |
| -------------------- | ---------------------------------------------------------------------------- |
| Versi                | 1.0.0                                                                        |
| Berlaku untuk        | Semua AI agent yang menulis kode di repo ini                                 |
| Wajib dibaca sebelum | Menulis, mengubah, atau me-review kode                                       |
| Dokumen Terkait      | `PRD.md`, `ARCHITECTURE.md`, `STRUCTURE.md`, `TECHSTACK.md`, `RESILIENCE.md` |

---

## 0. Perintah Dasar

1. **Baca dokumen dulu** — `ARCHITECTURE.md`, `STRUCTURE.md`, `RESILIENCE.md`, dan ADR terkait sebelum menulis kode.
2. **Ikuti Hexagonal** — dependency hanya boleh ke dalam (§1).
3. **TypeScript strict + generic** — tanpa `any`, tanpa `as unknown as` (§3).
4. **Secure by design** — validasi, sanitasi, fail-closed (§4).
5. **Test wajib** — setiap usecase & adapter punya test (§7).
6. **Tidak ada `console.log`** — pakai `Logger` (§6).
7. **Tidak ada DB di gateway** — state hanya Redis + YAML (§1.4).
8. **Berpikir dulu, tulis kemudian** — jelaskan rencana sebelum kode.

---

## 1. Aturan Arsitektur (Hexagonal)

### 1.1 Dependency Direction (KERAS)

```
modules/ ─────► core/ ◄───── infrastructure/
   │              ▲
   └──────────────┘
   shared/ (dipakai semua, tidak import balik)
```

| Layer                                        | Boleh import                          | Dilarang import                     |
| -------------------------------------------- | ------------------------------------- | ----------------------------------- |
| `core/*/domain`                              | — (pure TS saja)                      | NestJS, Redis, HTTP, Zod            |
| `core/*/application`                         | `core/*/domain`                       | NestJS, infrastructure              |
| `infrastructure/*`                           | `core/*/domain` (implement Port)      | `core/*/application`, `modules`     |
| `modules/*`                                  | `core/*/application`, `core/*/domain` | `infrastructure` langsung           |
| `shared/*`                                   | —                                     | `core`, `modules`, `infrastructure` |
| `guards/*`, `interceptors/*`, `middleware/*` | `core/*`, `shared/*`                  | —                                   |

**Pelanggaran = tolak PR.**

### 1.2 Setiap Bounded Context Punya Struktur

```
core/<context>/
├── domain/
│   ├── <entity>.entity.ts
│   ├── <value>.vo.ts
│   └── <name>.port.ts        # interface, NO implementation
├── application/
│   └── <action>.usecase.ts
└── <context>.module.ts
```

### 1.3 Core Tidak Boleh Tahu Infra

```ts
// ✅ BENAR — core hanya tahu interface
export interface RateLimiterPort {
  check(
    key: string,
    limit: number,
    windowSec: number,
  ): Promise<RateLimitResult>;
}

// ❌ SALAH — core import Redis
import { Redis } from 'ioredis';
```

### 1.4 Tidak Ada Database di Gateway

```ts
// ❌ DILARANG di gateway
import { PrismaClient } from '@prisma/client';
import { DataSource } from 'typeorm';

// ✅ DIIZINKAN
import Redis from 'ioredis';
```

Gateway hanya akses **Redis** dan **file YAML**. DB adalah tanggung jawab upstream.

---

## 2. Aturan Naming

| Tipe      | Format                     | Contoh                          |
| --------- | -------------------------- | ------------------------------- |
| File      | `kebab-case` + suffix      | `resolve-route.usecase.ts`      |
| Class     | `PascalCase`               | `ResolveRouteUseCase`           |
| Interface | `PascalCase` + suffix      | `RouteRepositoryPort`           |
| Type      | `PascalCase`               | `RouteConfig`                   |
| Function  | `camelCase`                | `resolveRoute`                  |
| Constant  | `SCREAMING_SNAKE`          | `DEFAULT_TIMEOUT_MS`            |
| Enum      | `PascalCase` + `SCREAMING` | `ErrorCode.AUTH_MISSING`        |
| Test      | `*.spec.ts`                | `resolve-route.usecase.spec.ts` |

Suffix wajib:

- `.usecase.ts` — use case
- `.port.ts` — interface port
- `.adapter.ts` — implementasi port
- `.entity.ts` — entity
- `.vo.ts` — value object
- `.dto.ts` — DTO
- `.guard.ts` — NestJS guard
- `.interceptor.ts` — NestJS interceptor
- `.middleware.ts` — middleware
- `.module.ts` — NestJS module
- `.filter.ts` — exception filter
- `.decorator.ts` — custom decorator
- `.spec.ts` — test

---

## 3. Aturan TypeScript

### 3.1 Strict Mode Wajib

`tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitOverride": true,
    "noFallthroughCasesInSwitch": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "verbatimModuleSyntax": true
  }
}
```

### 3.2 Dilarang

```ts
// ❌ any
function foo(x: any) {}

// ❌ as unknown as
const user = data as unknown as User;

// ❌ non-null assertion tanpa alasan
const val = map.get(key)!;

// ❌ @ts-ignore
// @ts-ignore
someCall();

// ❌ enum runtime (kecuali string enum untuk error code)
enum Status {
  Active,
  Inactive,
}

// ❌ default export
export default class Foo {}
```

### 3.3 Wajib

```ts
// ✅ unknown + type guard
function isUser(x: unknown): x is User {
  return typeof x === 'object' && x !== null && 'id' in x;
}

// ✅ readonly untuk immutability
interface Route {
  readonly id: string;
  readonly upstream: Upstream;
}

// ✅ const assertion
const MODES = ['read', 'write'] as const;
type Mode = (typeof MODES)[number];

// ✅ exhaustive check
function assertNever(x: never): never {
  throw new Error(`Unexpected: ${JSON.stringify(x)}`);
}
```

### 3.4 Generic Wajib untuk Abstraksi

**Port & adapter wajib generic jika menangani tipe berbeda:**

```ts
// ✅ Port generic
export interface RepositoryPort<TEntity, TId = string> {
  findById(id: TId): Promise<TEntity | null>;
  save(entity: TEntity): Promise<void>;
  delete(id: TId): Promise<void>;
}

// ✅ Use case generic
export interface UseCase<TInput, TOutput> {
  execute(input: TInput): Promise<TOutput>;
}

// ✅ Result generic
export type Result<T, E = Error> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly error: E };

// ✅ Adapter generic
export class RedisRepositoryAdapter<
  TEntity extends { id: string },
> implements RepositoryPort<TEntity> {
  constructor(
    private readonly redis: Redis,
    private readonly prefix: string,
    private readonly codec: Codec<TEntity>,
  ) {}

  async findById(id: string): Promise<TEntity | null> {
    const raw = await this.redis.get(`${this.prefix}:${id}`);
    return raw ? this.codec.decode(raw) : null;
  }

  async save(entity: TEntity): Promise<void> {
    await this.redis.set(
      `${this.prefix}:${entity.id}`,
      this.codec.encode(entity),
    );
  }

  async delete(id: string): Promise<void> {
    await this.redis.del(`${this.prefix}:${id}`);
  }
}

// ✅ Codec untuk serialisasi type-safe
export interface Codec<T> {
  encode(value: T): string;
  decode(raw: string): T;
}
```

**Aturan generic:**

1. Gunakan `<T>` untuk tipe utama, `<K, V>` untuk map, `<TInput, TOutput>` untuk transform.
2. Selalu beri constraint jika perlu: `<T extends object>`.
3. Jangan pakai generic kalau tidak ada variasi tipe — over-engineering.
4. Hindari generic lebih dari 3 parameter tanpa alasan kuat.

### 3.5 Prefer Union & Discriminated Union

```ts
// ✅ Discriminated union
type RouteResult =
  | { kind: 'found'; route: Route }
  | { kind: 'not_found' }
  | { kind: 'disabled'; reason: string };

function handle(result: RouteResult) {
  switch (result.kind) {
    case 'found':
      return result.route;
    case 'not_found':
      return null;
    case 'disabled':
      return result.reason;
  }
}
```

### 3.6 No `null` Return — Pakai `Result` atau `Option`

```ts
// ❌ null ambigu — error atau tidak ada?
async function findUser(id: string): Promise<User | null> {}

// ✅ Result eksplisit
async function findUser(id: string): Promise<Result<User, 'NOT_FOUND'>> {}
```

---

## 4. Secure by Design

### 4.1 Prinsip Wajib

| #   | Prinsip                   | Aturan                                                 |
| --- | ------------------------- | ------------------------------------------------------ |
| 1   | **Input validation**      | Semua input dari luar = `unknown`, validasi pakai Zod  |
| 2   | **Output sanitization**   | Jangan bocorkan stack trace, SQL, URL internal         |
| 3   | **Least privilege**       | Setiap fungsi hanya akses yang perlu                   |
| 4   | **Fail-closed**           | Default tolak jika ragu (kecuali rate limit fail-open) |
| 5   | **Defense in depth**      | Multiple layer validasi                                |
| 6   | **No secret in code/log** | Secret hanya dari env / secret manager                 |
| 7   | **No implicit trust**     | Header, query, body = tidak dipercaya                  |
| 8   | **Constant-time compare** | Untuk API key, token, signature                        |
| 9   | **Rate limit everything** | Tidak ada endpoint tanpa rate limit                    |
| 10  | **Audit everything**      | Setiap akses tercatat                                  |

### 4.2 Validasi Input Wajib dengan Zod

```ts
// ✅ BENAR
import { z } from 'zod';

const CreateOrderSchema = z.object({
  items: z
    .array(
      z.object({
        sku: z.string().min(1).max(64),
        qty: z.number().int().positive().max(1000),
      }),
    )
    .min(1)
    .max(100),
  idempotencyKey: z.string().uuid(),
});

type CreateOrderInput = z.infer<typeof CreateOrderSchema>;

export class CreateOrderUseCase {
  async execute(raw: unknown): Promise<Result<Order>> {
    const parsed = CreateOrderSchema.safeParse(raw);
    if (!parsed.success) {
      return err('VALIDATION_FAILED', {
        fieldErrors: parsed.error.issues.map((i) => ({
          field: i.path.join('.'),
          code: i.code,
          message: i.message,
        })),
      });
    }
    // parsed.data sudah aman
  }
}
```

### 4.3 Header & Tenant — Jangan Percaya

```ts
// ❌ SALAH — trust header mentah
const tenantId = req.headers['x-tenant-id'];

// ✅ BENAR — validasi & cross-check dengan JWT
const headerTenant = req.headers['x-tenant-id'];
const jwtTenant = req.user?.tenantId;

if (headerTenant && jwtTenant && headerTenant !== jwtTenant) {
  throw new TenantMismatchError('Header ≠ JWT claim');
}

const tenantId = jwtTenant ?? headerTenant;
if (!tenantId || !isValidTenantId(tenantId)) {
  throw new TenantMissingError('Tenant tidak teridentifikasi');
}
```

### 4.4 Jangan Log Secret & PII

```ts
// ❌ SALAH
logger.info({ user, token, password }, 'Login');

// ✅ BENAR
logger.info(
  {
    userId: user.id,
    tenantId: user.tenantId,
    // token, password: TIDAK DILOG
  },
  'Login',
);
```

**Field yang dilarang di log:**
`password`, `token`, `secret`, `apiKey`, `authorization`, `cookie`,
`creditCard`, `ssn`, `nik`, `email` (kecuali hashed), `phone`.

### 4.5 Sanitasi Header ke Upstream

```ts
const FORBIDDEN_HEADERS = new Set([
  'authorization',
  'cookie',
  'x-tenant-id',
  'x-user-id',
  'x-forwarded-for',
  'x-forwarded-host',
  'x-real-ip',
  'host',
  'connection',
  'content-length',
  'transfer-encoding',
]);

function sanitizeHeaders(
  headers: Record<string, string>,
): Record<string, string> {
  const clean: Record<string, string> = {};
  for (const [key, value] of Object.entries(headers)) {
    if (FORBIDDEN_HEADERS.has(key.toLowerCase())) continue;
    clean[key] = value;
  }
  return clean;
}
```

### 4.6 Constant-Time Compare

```ts
import { timingSafeEqual } from 'node:crypto';

// ❌ SALAH — timing attack
if (apiKey === storedKey) {
}

// ✅ BENAR
function safeCompare(a: string, b: string): boolean {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) return false;
  return timingSafeEqual(aBuf, bBuf);
}
```

### 4.7 Error Jangan Bocorkan Internal

```ts
// ❌ SALAH — bocorkan detail internal
throw new Error(`DB connection failed at 10.0.0.5:5432`);

// ✅ BENAR — pakai error code terstandar
throw new InternalDependencyError('Dependency unavailable', {
  meta: { dependency: 'redis' }, // meta internal, tidak dikirim ke klien
});
```

### 4.8 Rate Limit Wajib untuk Setiap Route

```ts
// Setiap route wajib punya rate limit
@UseGuards(RateLimitGuard)
@RateLimit({ ttl: 60, max: 100 })
@Post('/orders')
async createOrder() {}
```

### 4.9 Timeout Wajib untuk Semua I/O

```ts
// ✅ BENAR
const controller = new AbortController();
const timer = setTimeout(() => controller.abort(), 5000);

try {
  const res = await fetch(url, { signal: controller.signal });
} finally {
  clearTimeout(timer);
}
```

### 4.10 Secrets

```ts
// ❌ SALAH
const JWT_SECRET = 'super-secret-key';

// ✅ BENAR — dari config yang divalidasi
const secret = this.config.get<string>('jwt.secret');
if (!secret || secret.length < 32) {
  throw new InternalConfigError('JWT secret tidak valid');
}
```

---

## 5. Aturan Error Handling

### 5.1 Selalu Lempar DomainError, Bukan Error Generik

```ts
// ❌ SALAH
throw new Error('Not found');

// ✅ BENAR
throw new RouteNotFoundError('Route tidak ditemukan', {
  meta: { path: '/api/v1/unknown' },
});
```

### 5.2 Error Code Wajib dari Katalog

Semua error code **harus** ada di `src/shared/errors/error-codes.ts`. Jika perlu kode baru:

1. Tambah ke `ErrorCode` enum
2. Tambah ke `ERROR_CATALOG`
3. Buat class di `gateway-error.ts`
4. Update dokumentasi

### 5.3 Jangan Catch dan Diam

```ts
// ❌ SALAH
try {
  await foo();
} catch {}

// ❌ SALAH
try {
  await foo();
} catch (e) {
  console.log(e);
}

// ✅ BENAR
try {
  await foo();
} catch (cause) {
  throw new UpstreamError('Upstream failed', { cause });
}
```

### 5.4 Detail vs Internal

```ts
throw new UpstreamTimeoutError('Upstream timeout setelah 5s', {
  detail: 'Request ke order-svc timeout', // dikirim ke klien
  meta: { upstream: 'order-svc', durationMs: 5000 }, // internal saja
  cause: originalError, // untuk logging
});
```

---

## 6. Aturan Logging

### 6.1 Wajib Pakai Logger, Bukan console

```ts
// ❌ SALAH
console.log('User logged in');

// ✅ BENAR
private readonly logger = new Logger(MyService.name);
this.logger.log({ userId, tenantId }, 'User logged in');
```

### 6.2 Field Wajib di Setiap Log Request

```ts
{
  requestId: string;
  tenantId?: string;
  userId?: string;
  route: string;
  method: string;
  status: number;
  latencyMs: number;
}
```

### 6.3 Level Log

| Level   | Kapan                                |
| ------- | ------------------------------------ |
| `error` | 5xx, exception tak terduga           |
| `warn`  | 4xx, degradasi, fallback             |
| `info`  | Request sukses penting, state change |
| `debug` | Detail untuk debugging (dev only)    |
| `trace` | Sangat detail (jarang dipakai)       |

---

## 7. Aturan Testing

### 7.1 Coverage Minimum

| Layer             | Coverage |
| ----------------- | -------- |
| `core/`           | ≥ 90%    |
| `infrastructure/` | ≥ 70%    |
| `modules/`        | ≥ 70%    |

### 7.2 Setiap Use Case Wajib Punya Test

```ts
describe('ResolveRouteUseCase', () => {
  it('return route jika ditemukan', async () => {
    const repo = mockRepo({ find: async () => route });
    const uc = new ResolveRouteUseCase(repo);
    const result = await uc.execute({ path: '/orders', method: 'GET' });
    expect(result.kind).toBe('found');
  });

  it('return not_found jika tidak ada', async () => {
    const repo = mockRepo({ find: async () => null });
    const uc = new ResolveRouteUseCase(repo);
    const result = await uc.execute({ path: '/unknown', method: 'GET' });
    expect(result.kind).toBe('not_found');
  });
});
```

### 7.3 Test Security

Setiap use case **wajib** punya test untuk:

- Input invalid → error yang tepat
- Input berbahaya (SQL injection, XSS, path traversal) → ditolak
- Boundary (empty, max length, negative)
- Concurrency (jika relevan)

---

## 8. Aturan Commit & PR

### 8.1 Conventional Commits

```
feat(proxy): add dynamic route resolution
fix(rate-limit): handle Redis timeout
docs(architecture): add resilience section
test(auth): add JWT expiration cases
refactor(core): extract tenant value object
chore(deps): upgrade NestJS to 12.0.1
```

### 8.2 Setiap PR Wajib

- [ ] Test lulus (`pnpm test`)
- [ ] Lint lulus (`pnpm lint`)
- [ ] Type check lulus (`pnpm typecheck`)
- [ ] Coverage tidak turun
- [ ] Tidak ada `console.log`
- [ ] Tidak ada `any`
- [ ] Tidak ada secret
- [ ] Dokumentasi di-update jika perlu
- [ ] ADR dibuat jika keputusan arsitektural

---

## 9. Checklist Sebelum Kirim Kode

### Arsitektur

- [ ] Dependency sesuai aturan Hexagonal
- [ ] Core tidak import infra
- [ ] Setiap context punya domain/application/adapter

### TypeScript

- [ ] Tidak ada `any`
- [ ] Tidak ada `as unknown as`
- [ ] Generic dipakai untuk abstraksi
- [ ] Discriminated union untuk variant
- [ ] `readonly` untuk immutable

### Security

- [ ] Input divalidasi dengan Zod
- [ ] Output tidak bocorkan internal
- [ ] Tidak ada secret di code/log
- [ ] Header disanitasi
- [ ] Constant-time compare untuk secret
- [ ] Timeout untuk semua I/O
- [ ] Rate limit untuk semua route

### Error

- [ ] Pakai DomainError, bukan Error generik
- [ ] Error code dari katalog
- [ ] Tidak catch-and-silent

### Logging

- [ ] Pakai Logger, bukan console
- [ ] Tidak log secret/PII
- [ ] Field wajib lengkap

### Test

- [ ] Use case punya test
- [ ] Security test ada
- [ ] Coverage memenuhi minimum

---

## 10. Larangan Keras

| #   | Larangan                         | Alasan                         |
| --- | -------------------------------- | ------------------------------ |
| 1   | `any`                            | Hilangkan type safety          |
| 2   | `as unknown as`                  | Bypass type system             |
| 3   | `console.log`                    | Bukan structured log           |
| 4   | Import infra di core             | Langgar Hexagonal              |
| 5   | Akses DB di gateway              | Langgar boundary               |
| 6   | `process.env` di luar config     | Susah dilacak                  |
| 7   | Secret hardcoded                 | Security                       |
| 8   | `catch {}` kosong                | Sembunyikan error              |
| 9   | Default export                   | Sulit di-refactor              |
| 10  | `enum` runtime                   | Kecuali string enum error code |
| 11  | Mutasi parameter                 | Side effect                    |
| 12  | Nested callback > 2 level        | Susah dibaca                   |
| 13  | Fungsi > 50 baris                | Susah dites                    |
| 14  | File > 300 baris                 | Pecah jadi modul               |
| 15  | `!` non-null assertion tanpa cek | Runtime error                  |

---

## 11. Contoh Kode Referensi

### 11.1 Use Case Lengkap

```ts
// core/routing/application/resolve-route.usecase.ts
import { Injectable } from '@nestjs/common';
import type { Route, RouteMatch } from '../domain/route.entity';
import type { RouteRepositoryPort } from '../domain/route.repository.port';

export interface ResolveRouteInput {
  readonly path: string;
  readonly method: string;
  readonly tenantId: string;
}

export type ResolveRouteOutput =
  | { readonly kind: 'found'; readonly route: Route }
  | { readonly kind: 'not_found' }
  | { readonly kind: 'disabled'; readonly reason: string };

@Injectable()
export class ResolveRouteUseCase {
  constructor(private readonly routes: RouteRepositoryPort) {}

  async execute(input: ResolveRouteInput): Promise<ResolveRouteOutput> {
    const matches = await this.routes.findByPath(input.path, input.tenantId);

    const match = matches.find((r) => r.method === input.method);
    if (!match) return { kind: 'not_found' };
    if (!match.enabled)
      return { kind: 'disabled', reason: match.disabledReason ?? 'unknown' };

    return { kind: 'found', route: match };
  }
}
```

### 11.2 Port & Adapter

```ts
// core/routing/domain/route.repository.port.ts
import type { Route } from './route.entity';

export interface RouteRepositoryPort {
  findByPath(path: string, tenantId: string): Promise<readonly Route[]>;
  findByTenant(tenantId: string): Promise<readonly Route[]>;
  save(route: Route): Promise<void>;
  reload(): Promise<void>;
}
```

```ts
// infrastructure/config-repository/yaml-route.repository.ts
import { Injectable } from '@nestjs/common';
import { readFile } from 'node:fs/promises';
import { parse } from 'yaml';
import { z } from 'zod';
import type { Route } from '../../core/routing/domain/route.entity';
import type { RouteRepositoryPort } from '../../core/routing/domain/route.repository.port';

const RouteSchema = z.object({
  id: z.string(),
  path: z.string(),
  method: z.string(),
  upstream: z.string().url(),
  enabled: z.boolean().default(true),
});
const RoutesSchema = z.array(RouteSchema);

@Injectable()
export class YamlRouteRepository implements RouteRepositoryPort {
  private cache: readonly Route[] = [];

  constructor(private readonly filePath: string) {}

  async reload(): Promise<void> {
    const raw = await readFile(this.filePath, 'utf8');
    const parsed = RoutesSchema.safeParse(parse(raw));
    if (!parsed.success) {
      throw new RouteConfigInvalidError('Config route tidak valid', {
        fieldErrors: parsed.error.issues.map((i) => ({
          field: i.path.join('.'),
          code: i.code,
          message: i.message,
        })),
      });
    }
    this.cache = parsed.data;
  }

  async findByPath(path: string, tenantId: string): Promise<readonly Route[]> {
    return this.cache.filter((r) => r.path === path);
  }

  async findByTenant(tenantId: string): Promise<readonly Route[]> {
    return this.cache;
  }

  async save(route: Route): Promise<void> {
    throw new InternalNotImplementedError('YAML repo read-only');
  }
}
```

---

## 12. Ringkasan Satu Baris

> **Hexagonal, TypeScript strict + generic, Zod validation, DomainError, structured log, secure by design, fail-closed, test ≥ 90% — tanpa `any`, tanpa `console.log`, tanpa DB.**

---

## 13. Jika Ragu

1. **Baca** `ARCHITECTURE.md` dan `RESILIENCE.md`.
2. **Lihat** contoh di §11.
3. **Cek** checklist §9.
4. **Tanya** sebelum menebak.
5. **Konsisten** dengan kode yang sudah ada.
