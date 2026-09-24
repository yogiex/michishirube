# FRONTEND-ERROR-HANDLING.md — Michishirube Dashboard

| Field           | Value                                                                                  |
| --------------- | -------------------------------------------------------------------------------------- |
| Versi           | 1.0.0                                                                                  |
| Status          | Approved                                                                               |
| Berlaku untuk   | `apps/dashboard/`                                                                      |
| Dokumen Terkait | `AGENTS.md`, `FRONTEND-PATTERNS.md`, `docs/PRD.md`, `docs/ARCHITECTURE.md`, `RULES.md` |
| Standar         | RFC 7807, RFC 9110, RFC 6750                                                           |
| OWASP           | A01, A03, A04, A07, A09                                                                |

## 0. Prinsip Dasar

1. **Never silent** — setiap error memiliki jalur UI yang sesuai.
2. **Always correlated** — setiap error yang ditampilkan memiliki `requestId`.
3. **Never leak** — jangan menampilkan stack trace, IP internal, SQL, atau detail mentah.
4. **Predictable** — status code menentukan action UI.
5. **Recoverable** — retry, dismiss, atau redirect selalu tersedia bila sesuai.

### Prioritas UI

| Prioritas | Kondisi                   | UI                  |
| --------- | ------------------------- | ------------------- |
| 1         | 401 / auth expired        | redirect login      |
| 2         | 429, 502, 503             | degradation banner  |
| 3         | 400/422 dengan `errors[]` | inline field error  |
| 4         | Error umum                | toast               |
| 5         | Server/page fetch gagal   | inline `ErrorState` |

Satu error boleh menghasilkan banner dan toast, tetapi tidak boleh menghasilkan dua instance dari UI yang sama.

## 1. RFC 7807 Problem Details

### 1.1 Format

```json
{
  "type": "https://api.michishirube.dev/errors/GW_RATE_LIMIT_EXCEEDED",
  "title": "Rate limit exceeded",
  "status": 429,
  "code": "GW_RATE_LIMIT_EXCEEDED",
  "detail": "Quota terlampaui",
  "instance": "/api/v1/orders",
  "requestId": "01HX8Z...",
  "tenantId": "t_123",
  "timestamp": "2026-09-21T10:00:05Z",
  "retryable": true,
  "retryAfter": 30,
  "errors": []
}
```

`application/problem+json` wajib digunakan untuk error API. Client mengirim `Accept: application/json, application/problem+json` dan memvalidasi body sebelum mempercayainya.

### 1.2 Contract

| Field        | Tipe            | Wajib | Catatan UI                                 |
| ------------ | --------------- | ----: | ------------------------------------------ |
| `type`       | URI/string      |    ya | link informasi opsional                    |
| `title`      | string          |    ya | judul, bukan pesan yang ditampilkan mentah |
| `status`     | integer 100–599 |    ya | penentu action                             |
| `code`       | string `GW_*`   |    ya | analytics dan support                      |
| `detail`     | string          | tidak | jangan tampilkan mentah                    |
| `instance`   | string          | tidak | path request                               |
| `requestId`  | string          |    ya | wajib dapat dicopy                         |
| `tenantId`   | string          | tidak | konteks internal                           |
| `timestamp`  | ISO 8601        |    ya | korelasi log                               |
| `retryable`  | boolean         |    ya | retry policy                               |
| `retryAfter` | number ≥ 0      | tidak | detik untuk countdown                      |
| `errors`     | `FieldError[]`  | tidak | map ke form                                |

## 2. Type dan Fallback

```ts
export type FieldError = {
  readonly field: string;
  readonly code: string;
  readonly message: string;
};

export type ProblemDetail = {
  readonly type: string;
  readonly title: string;
  readonly status: number;
  readonly code: string;
  readonly detail?: string;
  readonly instance?: string;
  readonly requestId: string;
  readonly tenantId?: string;
  readonly timestamp: string;
  readonly retryable: boolean;
  readonly retryAfter?: number;
  readonly errors?: readonly FieldError[];
};
```

Response network selalu `unknown`. Gunakan Zod schema atau `isProblemDetail` untuk menolak `null`, array, required field kosong, status invalid, `retryAfter` negatif, dan `errors[]` malformed.

```ts
export function createUnknownProblem(
  status: number,
  detail: string,
): ProblemDetail {
  return {
    type: 'about:blank',
    title: 'Unexpected error',
    status,
    code: 'GW_FRONTEND_UNKNOWN',
    detail,
    requestId: 'unknown',
    timestamp: new Date().toISOString(),
    retryable: status >= 500,
  };
}
```

Fallback dipakai untuk network error, timeout, non-JSON error response, malformed Problem Details, dan success response yang tidak dapat diparse.

## 3. Request Pipeline

```text
apiRequest(path, options)
  → build URL, headers, AbortController, Bearer token
  → fetch dengan timeout bounded dan redirect: 'error'
  → response.ok
      → parse success body atau fallback malformed response
  → response !ok
      → parse body
      → isProblemDetail(payload)
      → ApiResult { ok: true, value } atau { ok: false, error }
```

| Jalur                    | Hasil                           |
| ------------------------ | ------------------------------- |
| 2xx + body valid         | `{ ok: true, value }`           |
| 204                      | `{ ok: true, value: null }`     |
| 4xx/5xx + RFC 7807 valid | `{ ok: false, error: problem }` |
| 4xx/5xx + body invalid   | fallback ProblemDetail          |
| Timeout                  | status 408                      |
| Network/CORS/DNS         | status 0                        |
| Success body invalid     | fallback ProblemDetail          |

Client wajib membatasi timeout antara 1 detik dan 60 detik, menggabungkan `AbortSignal` eksternal dengan controller internal, membersihkan timer di `finally`, dan tidak melakukan retry otomatis untuk request yang tidak repeatable.

```ts
const effectiveTimeout = Math.min(Math.max(timeoutMs, 1_000), 60_000);
const controller = new AbortController();
const timer = setTimeout(() => controller.abort(), effectiveTimeout);
try {
  const response = await fetch(url, {
    signal: controller.signal,
    credentials: 'include',
    redirect: 'error',
    cache: 'no-store',
  });
  return response.ok ? parseSuccess(response) : parseErrorResponse(response);
} catch (cause) {
  const timedOut = cause instanceof DOMException && cause.name === 'AbortError';
  return {
    ok: false,
    error: createUnknownProblem(
      timedOut ? 408 : 0,
      timedOut ? 'Request timeout' : 'Network error',
    ),
  };
} finally {
  clearTimeout(timer);
}
```

## 4. Mapping Status ke Action

|  Status | Code                     | Action                          | Recoverable    |
| ------: | ------------------------ | ------------------------------- | -------------- |
|     400 | `GW_VALIDATION_*`        | field errors                    | perbaiki input |
|     401 | `GW_AUTH_*`              | clear session + redirect        | login ulang    |
|     403 | `GW_RBAC_*`              | toast unauthorized              | tidak          |
|     404 | `GW_*_NOT_FOUND`         | ErrorState/toast + close drawer | tidak          |
|     405 | `GW_METHOD_*`            | toast                           | tidak          |
|     408 | `GW_FRONTEND_UNKNOWN`    | warning toast + retry           | ya             |
|     409 | `GW_IDEMP_*`             | toast operation in progress     | ya             |
| 413/415 | validation               | toast                           | perbaiki input |
|     422 | `GW_VALIDATION_SEMANTIC` | field errors                    | ya             |
|     429 | `GW_RATE_LIMIT_*`        | banner + countdown              | ya             |
|     500 | `GW_INTERNAL_*`          | error toast + requestId         | ya             |
| 502/503 | upstream/maintenance     | critical banner + toast + retry | ya             |
|     504 | timeout                  | warning banner/toast + retry    | ya             |

Kode khusus:

| Code                             | Action                           |
| -------------------------------- | -------------------------------- |
| `GW_AUTH_JWKS_UNAVAILABLE`       | critical `jwks-down` banner      |
| `GW_REDIS_UNAVAILABLE`           | warning `redis-degraded` banner  |
| `GW_CIRCUIT_OPEN`                | critical `upstream-down` banner  |
| `GW_CONFIG_INVALID`              | warning `config-rollback` banner |
| `GW_IDEMP_IN_PROGRESS`           | warning toast                    |
| `GW_FRONTEND_MALFORMED_RESPONSE` | error toast + requestId          |

Prioritas mapping: auth redirect, field errors, rate limit, degradation, kode khusus, fallback toast. Mapping harus pure dan dapat diuji.

## 5. User-Facing Message

Jangan menampilkan `problem.detail`, `problem.title`, stack trace, IP internal, atau jargon backend secara mentah. Gunakan pesan Indonesia yang dipetakan:

```ts
export function getUserMessage(problem: ProblemDetail): string {
  if (problem.status === 401)
    return 'Sesi Anda telah berakhir. Silakan masuk kembali.';
  if (problem.status === 403) return 'Anda tidak berwenang melakukan aksi ini.';
  if (problem.status === 404) return 'Data tidak ditemukan.';
  if (problem.status === 405) return 'Metode tidak diizinkan.';
  if (problem.status === 408) return 'Request timeout. Silakan coba lagi.';
  if (problem.status === 409)
    return 'Operasi sedang berjalan. Coba lagi sebentar.';
  if (problem.status === 413) return 'Data terlalu besar untuk diproses.';
  if (problem.status === 415) return 'Format data tidak didukung.';
  if (problem.status === 422) return 'Data tidak dapat diproses.';
  if (problem.status === 429)
    return 'Terlalu banyak permintaan. Tunggu sebentar.';
  if (problem.status === 501) return 'Fitur belum tersedia.';
  if (problem.status === 502 || problem.status === 503)
    return 'Layanan sedang tidak tersedia. Silakan coba lagi nanti.';
  if (problem.status === 504)
    return 'Layanan tidak merespons. Silakan coba lagi.';
  if (problem.status >= 500)
    return 'Terjadi kesalahan pada server. Silakan coba lagi.';
  return 'Terjadi kesalahan. Silakan coba lagi.';
}
```

## 6. UI Actions

### 6.1 Auth expiry

Untuk 401 atau `GW_AUTH_*`: clear session, log `code` dan `requestId` saja, lalu redirect `/login?from=<encoded-path>`. Jangan melakukan redirect loop jika sudah berada di `/login`. Jangan menaruh token di query string.

### 6.2 Degradation banner

Critical banner tidak dismissible. Warning banner boleh dismiss dan auto-dismiss setelah 30 menit. Deduplicate berdasarkan jenis, maksimal tiga banner terlihat.

| Jenis             | Severity | Dismiss |
| ----------------- | -------- | ------- |
| `jwks-down`       | critical | tidak   |
| `upstream-down`   | critical | tidak   |
| `redis-degraded`  | warning  | ya      |
| `config-rollback` | warning  | ya      |
| `rate-limited`    | warning  | ya      |

### 6.3 Field errors

Untuk `errors[]`, gunakan `form.setError(field, { type: 'server', message })`, set `aria-invalid`, dan fokus field pertama. Jangan mengganti field error dengan toast.

### 6.4 Toast dan ErrorState

Toast error menampilkan pesan aman, `problem.code`, dan `RequestIdCopy`. `ErrorState` untuk page-level fetch menampilkan pesan aman, code, requestId, dan tombol retry bila tersedia. Duration toast 5 detik untuk success, 8 detik untuk critical error, posisi top-right, maksimum tiga toast.

### 6.5 Request ID

`requestId` wajib terlihat pada toast error, degradation banner, dan `ErrorState`. Field error, redirect login, dan success response tidak perlu menampilkannya di UI. Jangan simpan requestId di localStorage atau URL.

## 7. Retry Policy

| Kondisi                               |                Retry | Maksimum |
| ------------------------------------- | -------------------: | -------: |
| 408, network, 5xx retryable           |                   ya |        2 |
| 429                                   | setelah `retryAfter` |        1 |
| 4xx lain                              |                tidak |        0 |
| POST/PUT/DELETE tanpa idempotency key |                tidak |        0 |

Gunakan exponential backoff + jitter, bounded maximum 10 detik. Mutation harus `retry: false` kecuali endpoint memiliki idempotency contract yang eksplisit.

```ts
const MAX_ATTEMPTS = 2;
const BASE_DELAY_MS = 1_000;
const MAX_DELAY_MS = 10_000;

export function shouldRetry(failureCount: number, error: unknown): boolean {
  if (failureCount >= MAX_ATTEMPTS) return false;
  if (isProblemDetail(error)) return error.retryable;
  return error instanceof TypeError;
}

export function retryDelay(attemptIndex: number): number {
  return Math.min(
    BASE_DELAY_MS * 2 ** attemptIndex + Math.random() * 500,
    MAX_DELAY_MS,
  );
}
```

## 8. Network dan Offline

| Error          | Problem status | UI                     |
| -------------- | -------------: | ---------------------- |
| offline        |              0 | offline banner + retry |
| timeout        |            408 | warning + retry        |
| DNS/CORS       |              0 | network toast + retry  |
| offline banner |              — | polite live region     |

Jangan menganggap offline sebagai auth failure. Jangan menyimpan response server ke localStorage sebagai pengganti auth session.

## 9. Fail Mode

| Area              | Fail mode   | Frontend handling                 |
| ----------------- | ----------- | --------------------------------- |
| Auth              | fail-closed | clear session + redirect          |
| Form validation   | fail-closed | submit hanya setelah valid        |
| Critical mutation | fail-closed | banner/retry, jangan sukses palsu |
| Query cache       | fail-open   | fallback ke network               |
| Logging           | fail-open   | UI tetap berjalan                 |
| Clipboard         | fail-open   | user dapat copy manual            |
| Toast             | fail-open   | error handling tidak recursive    |

## 10. Logging A09

Log `code`, `status`, `requestId`, `path`, `timestamp`, dan action. Jangan log token, Authorization, cookie, password, email mentah, phone, full request/response body, `problem.detail`, atau IP address. Logger harus melakukan redaction sebelum serialisasi.

## 11. Testing

Wajib ada test untuk:

- `isProblemDetail`: valid, null, array, missing field, status bounds, negative retryAfter, malformed errors.
- `createUnknownProblem`: retryable 5xx dan non-retryable 4xx.
- `parseErrorResponse`: valid RFC 7807, malformed JSON, malformed shape, network, timeout.
- `mapProblemToActions`: semua status dan kode khusus.
- `getUserMessage`: semua status user-facing.
- retry: max attempts, backoff, retryable flag, mutation disabled.
- auth expiry: clear session, safe encoded `from`, no redirect loop.
- toast/banner: code dan requestId tampil, detail tidak tampil.

```ts
const VALID = {
  type: 'https://api.example.com/errors/GW_X',
  title: 'Error',
  status: 429,
  code: 'GW_RATE_LIMIT_EXCEEDED',
  requestId: '01HX8Z',
  timestamp: '2026-09-21T10:00:05Z',
  retryable: true,
};

expect(isProblemDetail(VALID)).toBe(true);
expect(isProblemDetail({ ...VALID, status: 99 })).toBe(false);
expect(isProblemDetail({ ...VALID, retryAfter: -1 })).toBe(false);
expect(
  mapProblemToActions({ ...VALID, status: 401, code: 'GW_AUTH_EXPIRED' }),
).toEqual([{ kind: 'redirect-login' }]);
```

## 12. Anti-Pattern

| Dilarang                         | Gunakan                   |
| -------------------------------- | ------------------------- |
| `toast.error(problem.detail)`    | `getUserMessage(problem)` |
| `console.log(error)`             | structured logger         |
| empty `catch`                    | fallback + safe log       |
| toast untuk 401                  | auth redirect             |
| toast untuk 429                  | degradation banner        |
| toast untuk field error          | `form.setError`           |
| error tanpa requestId            | `RequestIdCopy`           |
| `any` pada error                 | `ProblemDetail`           |
| infinite retry                   | max 2 attempts            |
| retry mutation tanpa idempotency | contract check            |
| `dangerouslySetInnerHTML`        | plain text                |
| token di URL                     | cookie/header             |
| redirect tanpa safe return path  | encoded `from`            |
| tidak clear session saat 401     | clear first               |
| detail internal ke user          | mapped message            |

## 13. Checklist Commit

### Type safety

- [ ] Semua error path memakai `ProblemDetail`.
- [ ] Response tervalidasi `isProblemDetail`/Zod.
- [ ] Tidak ada `any`.

### Mapping

- [ ] 401 redirect, bukan toast.
- [ ] 429/502/503/504 memakai banner.
- [ ] 400/422 dengan errors memakai field error.
- [ ] Fallback memakai toast/error state.

### Message dan request ID

- [ ] Pesan user aman dan konsisten.
- [ ] `detail` mentah tidak dirender.
- [ ] Toast, banner, dan ErrorState memiliki requestId copyable.

### Retry

- [ ] Maksimum dua attempts.
- [ ] Exponential backoff + jitter.
- [ ] Hormati `retryable` dan `retryAfter`.
- [ ] Mutation tidak retry tanpa idempotency.

### Security

- [ ] Session di-clear sebelum redirect.
- [ ] Tidak ada raw HTML rendering.
- [ ] Tidak ada PII/secret dalam log.
- [ ] Error tetap fail-safe.

## 14. Referensi

RFC 7807 Problem Details, RFC 9110 HTTP Semantics, RFC 6750 Bearer Token, `AGENTS.md`, `FRONTEND-PATTERNS.md`, `docs/ARCHITECTURE.md` fail mode §12, dan `RULES.md`.

> Semua error RFC 7807, type guard ketat, 401 redirect, 429/503 banner, 400/422 field errors, sisanya toast, `requestId` selalu visible, retry bounded max 2, dan detail mentah tidak pernah tampil ke user.
