# FRONTEND-SECURITY.md — Michishirube Dashboard

| Field           | Value                                                                                                                          |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Versi           | 1.0.0                                                                                                                          |
| Status          | Approved                                                                                                                       |
| Berlaku untuk   | `apps/dashboard/`                                                                                                              |
| Dokumen Terkait | `AGENTS.md`, `FRONTEND-PATTERNS.md`, `FRONTEND-ERROR-HANDLING.md`, `FRONTEND-DATA-FLOW.md`, `RULES.md`, `docs/ARCHITECTURE.md` |
| Standar         | OWASP Top 10 2025, OWASP ASVS L2, WCAG 2.1 AA                                                                                  |
| Referensi       | RFC 7807, RFC 6750, RFC 9110                                                                                                   |

---

## 0. Prinsip Dasar

### 0.1 Lima Pilar Security by Design

| Pilar             | Prinsip                                           |
| ----------------- | ------------------------------------------------- |
| Deny by default   | Tolak dulu, buka hanya yang perlu                 |
| Defense in depth  | Gunakan beberapa lapisan kontrol                  |
| Least privilege   | Akses minimum yang dibutuhkan                     |
| Fail closed       | Kalau ragu, tolak kecuali fail-open eksplisit     |
| No implicit trust | Header, query, body, dan response tidak dipercaya |

### 0.2 Aset Kritis

| Aset               | Sensitivitas | Perlakuan                         |
| ------------------ | ------------ | --------------------------------- |
| JWT/session token  | Critical     | HttpOnly cookie, jangan di URL    |
| API key plaintext  | Critical     | Tampilkan sekali, jangan log      |
| Credentials        | Critical     | Validasi, redaction, rate limit   |
| Admin action       | High         | Backend authorization dan audit   |
| Audit log          | High         | Immutable, append-only di backend |
| Config dan metrics | Medium/Low   | Validasi dan batasi akses         |

### 0.3 Trust Boundary

```text
Browser (untrusted) → HTTPS → Network (untrusted) → Gateway (trusted)
```

Frontend adalah kode yang berjalan di perangkat pengguna dan dapat dimodifikasi melalui DevTools. Semua authorization wajib diverifikasi backend. Jangan menyimpan secret di client; cookie session harus `HttpOnly`, `Secure`, dan `SameSite`.

---

## 1. OWASP Top 10 2025

### 1.1 A01: Broken Access Control

Frontend wajib:

- Protect route melalui `middleware.ts`.
- Filter menu berdasarkan role.
- Jangan menganggap menu tersembunyi sebagai authorization.
- Backend wajib memeriksa role, permission, dan tenant pada setiap request.
- Mismatch tenant harus ditolak.

```ts
export function filterNavByRoles(
  items: readonly NavItem[],
  userRoles: readonly string[],
): readonly NavItem[] {
  if (userRoles.length === 0) return [];
  const roles = new Set(userRoles);
  return items.filter((item) => item.roles.some((role) => roles.has(role)));
}
```

Test: route tanpa login diarahkan ke `/login`; user tanpa permission mendapat `403`; cross-tenant request ditolak backend.

### 1.2 A02: Cryptographic Failures

- Gunakan HTTPS, HSTS, dan `upgrade-insecure-requests`.
- Jangan menaruh token di URL.
- Target session memakai cookie `HttpOnly; Secure; SameSite=Lax`.
- Jangan memakai `NEXT_PUBLIC_*` untuk secret, password, signing key, atau private key.
- Scan production bundle untuk secret.

Allowed `NEXT_PUBLIC_*`: URL API dan version aplikasi. Jika ragu, jangan memakai prefix tersebut.

### 1.3 A03: Injection dan XSS

- React harus melakukan escaping default.
- Jangan memakai `dangerouslySetInnerHTML` tanpa sanitasi.
- Dilarang `eval` dan `new Function`.
- Tolak URL `javascript:`.
- Encode redirect/query parameter dengan `encodeURIComponent` atau `searchParams`.
- Gunakan CSP dengan `frame-ancestors 'none'`, `base-uri 'self'`, dan `object-src 'none'`.

### 1.4 A04: Insecure Design

Semua I/O wajib bounded:

- Timeout maksimal 60 detik.
- Retry maksimal dua attempt.
- Retry hanya untuk error retryable/network.
- Auth dan idempotency fail-closed.
- Rate limit dapat fail-open hanya jika policy eksplisit.
- Mutation kritis memakai idempotency key.

### 1.5 A05: Security Misconfiguration

- `reactStrictMode: true`.
- `poweredByHeader: false`.
- `productionBrowserSourceMaps: false`.
- Jangan ada debug endpoint atau default credential di production.
- Error page tidak boleh membocorkan stack, URL internal, atau secret.
- Lockfile wajib di-commit.

### 1.6 A06: Vulnerable and Outdated Components

- Pin exact version production dependency.
- Commit `pnpm-lock.yaml`.
- Jalankan `pnpm audit --audit-level=high` di CI.
- Automated dependency update dengan review untuk major version.
- Generate SBOM untuk release.
- Jangan mengeksekusi postinstall script dari dependency yang tidak dipercaya.

### 1.7 A07: Identification and Authentication Failures

- JWT diverifikasi backend, bukan client.
- Access token target 15 menit; refresh token target 7 hari.
- 401 membersihkan session lalu redirect `/login?from=<encoded-path>`.
- Logout membersihkan server cookie dan seluruh client state.
- Login dibatasi 5 attempt per menit.
- P1: httpOnly cookie, CSRF double-submit, dan MFA admin.

### 1.8 A08: Software and Data Integrity Failures

- Semua input form/query divalidasi Zod.
- Semua response API divalidasi dengan schema/type guard.
- Gunakan `readonly` untuk data yang tidak boleh dimutasi.
- Tolak response malformed dengan error code frontend yang terstandarisasi.
- Jangan memercayai field response tanpa validasi.

```ts
const parsed = RouteSchema.safeParse(result.value);
if (!parsed.success) return malformedResponse('routes.detail');
return parsed.data;
```

### 1.9 A09: Security Logging and Monitoring Failures

- Gunakan structured logger, bukan `console.log`.
- Redact password, token, secret, API key, authorization, cookie, dan PII.
- Log request ID, code, route, method, status, dan latency.
- Tampilkan `requestId` pada error toast dengan tombol copy.
- Track login, logout, session expired, mutation admin, dan security failures.
- Jangan log stack atau response upstream mentah.

### 1.10 A10: Server-Side Request Forgery

SSRF adalah tanggung jawab backend. Frontend tidak melakukan fetch ke URL arbitrer.

- Base URL hanya dari environment yang tervalidasi.
- Jangan menerima URL fetch dari user input.
- Gunakan `redirect: 'error'`.
- Backend memblokir private IP, DNS rebinding, protocol di luar allowlist, dan redirect ke origin lain.

---

## 2. Content Security Policy

### 2.1 Baseline

```text
default-src 'self';
script-src 'self' 'unsafe-inline';
style-src 'self' 'unsafe-inline';
img-src 'self' data: blob:;
font-src 'self' data:;
connect-src 'self' <API_URL>;
frame-ancestors 'none';
base-uri 'self';
form-action 'self';
object-src 'none';
upgrade-insecure-requests;
```

`'unsafe-inline'` pada script hanya transisi. Target P1 menggunakan nonce random per request dan `strict-dynamic`; `unsafe-eval` selalu dilarang.

### 2.2 Rollout

1. Sprint F1: report-only.
2. Sprint F2: report-only plus logging.
3. Setelah violation zero: enforce CSP.
4. Tambahkan nonce dan hapus `unsafe-inline` script.

---

## 3. Authentication & Session

### 3.1 Storage

| Storage          | Status sekarang  | Target                     |
| ---------------- | ---------------- | -------------------------- |
| `localStorage`   | _used sementara_ | Dihapus pada P1            |
| `sessionStorage` | Dilarang         | Dilarang                   |
| httpOnly cookie  | Belum            | Wajib P1                   |
| Memory state     | Digunakan        | Digunakan sebagai cache UI |

Migrasi P1:

1. Backend mengirim `Set-Cookie`.
2. Frontend menggunakan `credentials: 'include'`.
3. Middleware membaca cookie.
4. Hapus pembacaan dan penulisan localStorage token/user.
5. Tambahkan CSRF token untuk mutation.

### 3.2 Logout

```ts
async function handleLogout(): Promise<void> {
  void authApi.logout();
  useAuthStore.getState().clearSession();
  window.location.href = '/login';
}
```

Backend harus menghapus session dan refresh cookie dengan `HttpOnly`, `Secure`, dan `SameSite` yang sesuai.

### 3.3 Login Rate Limit

| Limit             | Window  | Response              |
| ----------------- | ------- | --------------------- |
| 5 failed attempts | 1 menit | `429` + `Retry-After` |

UI menampilkan countdown dan tidak melakukan retry otomatis agresif.

---

## 4. Input Validation

### 4.1 Client Validation

```ts
export const CreateRouteSchema = z.object({
  path: z.string().min(1).max(256).regex(/^\//),
  method: z.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']),
  upstream: z.string().url(),
  timeoutMs: z.coerce.number().int().min(100).max(60_000),
  enabled: z.boolean().default(true),
});
```

Client validation hanya untuk UX. Backend wajib melakukan validation ulang. Schema harus strict dan membatasi panjang, range, enum, serta nested object.

### 4.2 URL Parameters

- Parse `page` sebagai integer dan minimal 1.
- Batasi `q` maksimal 100 karakter.
- Whitelist filter values.
- Default ke nilai aman jika parameter invalid.
- Jangan pernah melakukan cast blind tanpa batas.

### 4.3 Response Validation

Semua response eksternal dianggap `unknown` sampai lolos schema. Error malformed tidak boleh diteruskan ke UI sebagai data tepercaya.

---

## 5. Output Encoding

React melakukan escaping secara default. Render semua user/API data sebagai text.

```tsx
<div>{userMessage}</div>
```

`dangerouslySetInnerHTML` hanya boleh digunakan untuk HTML tepercaya yang sudah disanitasi dengan DOMPurify dan allowlist. Jangan pernah merender `problem.detail` mentah. Semua parameter URL harus di-encode; `searchParams` digunakan untuk query yang sudah'=>'divalidasi.

---

## 6. CSRF Protection

Selama token berada di Authorization header, CSRF tidak berlaku. Saat migrasi ke cookie, gunakan defense berlapis:

- `SameSite=Lax` atau `Strict`.
- Double-submit CSRF cookie/header.
- Backend memvalidasi `Origin`.
- Mutation memakai custom header `X-CSRF-Token`.
- Jangan menerima credential lintas origin secara tidak sengaja.

```ts
const cookieToken = request.cookies.get('csrf-token')?.value;
const headerToken = request.headers.get('x-csrf-token');
if (!cookieToken || cookieToken !== headerToken) throw new CsrfError();
```

---

## 7. Security Headers

| Header                         | Nilai                                               |
| ------------------------------ | --------------------------------------------------- |
| `Strict-Transport-Security`    | `max-age=63072000; includeSubDomains; preload`      |
| `X-Content-Type-Options`       | `nosniff`                                           |
| `X-Frame-Options`              | `DENY`                                              |
| `Referrer-Policy`              | `strict-origin-when-cross-origin`                   |
| `Permissions-Policy`           | `camera=(), microphone=(), geolocation=()`          |
| `Content-Security-Policy`      | Report-only di development, enforce setelah rollout |
| `Cross-Origin-Opener-Policy`   | `same-origin`                                       |
| `Cross-Origin-Resource-Policy` | `same-origin`                                       |

Verifikasi deployment:

```bash
curl -I https://dashboard.michishirube.dev
```

Pastikan HSTS, anti-clickjacking, referrer, permissions, CSP, dan cross-origin isolation headers sesuai environment.

---

## 8. Secure Coding Rules

### Do

- Gunakan `readonly` untuk immutable type.
- Validasi semua input dengan Zod.
- Type guard seluruh response.
- Render error sebagai plain text.
- Encode semua redirect/query value.
- Gunakan `redirect: 'error'` dan timeout untuk fetch.
- Log hanya metadata aman.
- Sediakan `aria-label` pada icon button.
- Gunakan `noValidate` ketika Zod menangani validation.

### Don't

- `dangerouslySetInnerHTML` tanpa sanitasi.
- `eval` atau `new Function`.
- Token di URL atau secret di `NEXT_PUBLIC_*`.
- `any` untuk response.
- `console.log` untuk error.
- Secret, PII, atau token dalam log.
- Toast security error tanpa `requestId`.
- Menonaktifkan security lint rule.

---

## 9. Security Testing

### Automated

| Test           | Command                         |
| -------------- | ------------------------------- |
| Lint           | `pnpm lint`                     |
| Typecheck      | `pnpm typecheck`                |
| Audit          | `pnpm audit --audit-level=high` |
| Unit/component | `pnpm test`                     |
| E2E            | Playwright security suite       |
| Bundle scan    | CI secret scanner               |

### Manual

- Route tanpa login redirect.
- XSS input tampil sebagai text.
- CSP violation tercatat.
- Clickjacking ditolak.
- Response malformed menghasilkan fallback error.
- Expired session mengosongkan state dan redirect.
- Login rate limit menghasilkan 429.
- Production bundle tidak mengandung secret.
- HSTS dan security headers tersedia.
- Cookie P1 memiliki `HttpOnly` dan `Secure`.

---

## 10. Incident Response

| Incident       | Aksi                                                | Target     |
| -------------- | --------------------------------------------------- | ---------- |
| XSS terdeteksi | Audit render/sanitasi, rotate nonce, patch          | < 1 jam    |
| Token bocor    | Revoke session, force re-login, rotate signing key  | < 30 menit |
| Dependency CVE | Patch, update lockfile, deploy                      | < 24 jam   |
| Data breach    | Isolate, audit log analysis, notifikasi stakeholder | < 1 jam    |

Contact: Security Lead `security@michishirube.dev`; Platform Lead `platform@michishirube.dev`; on-call PagerDuty.

---

## 11. Compliance Status

| Kategori             | Status      | Catatan                      |
| -------------------- | ----------- | ---------------------------- |
| A01 Access Control   | Implemented | Middleware + backend RBAC    |
| A02 Cryptography     | Partial     | P1 httpOnly cookie           |
| A03 Injection        | Implemented | CSP + React escaping         |
| A04 Insecure Design  | Implemented | Timeout dan bounded retry    |
| A05 Misconfiguration | Implemented | Headers dan no debug         |
| A06 Components       | Implemented | Lockfile dan CI audit        |
| A07 Auth             | Partial     | P1 MFA dan cookie            |
| A08 Integrity        | Implemented | Zod dan response schema      |
| A09 Logging          | Implemented | Structured log dan requestId |
| A10 SSRF             | Implemented | Backend SSRF guard           |

Target OWASP ASVS L2; chapter authentication, session, dan data protection berstatus partial sampai P1 selesai.

---

## 12. P1 Items

| Item                      | Sprint   | Alasan   |
| ------------------------- | -------- | -------- |
| httpOnly cookie migration | F4       | A02, A07 |
| CSP nonce                 | F4       | A03      |
| CSRF double-submit        | F4       | A07      |
| Admin MFA                 | Sprint 6 | A07      |
| SBOM                      | Sprint 6 | A06      |
| Sentry/GlitchTip          | F5       | A09      |
| Certificate pinning       | Sprint 6 | A02      |
| SRI untuk CDN             | Sprint 6 | A08      |

---

## 13. Checklist Sebelum Commit

### Access control

- [ ] Route diproteksi middleware.
- [ ] Menu difilter role.
- [ ] Backend tetap melakukan authorization.

### Cryptography

- [ ] HTTPS/HSTS aktif.
- [ ] Token tidak ada di URL.
- [ ] Tidak ada secret di `NEXT_PUBLIC_*`.

### Injection

- [ ] Tidak ada unsafe HTML tanpa sanitasi.
- [ ] Tidak ada `eval`/`new Function`.
- [ ] URL parameter di-encode.
- [ ] CSP tersedia.

### Resilience

- [ ] Timeout maksimal 60 detik.
- [ ] Retry maksimal dua attempt.
- [ ] Fail mode terdokumentasi.

### Configuration

- [ ] `poweredByHeader: false`.
- [ ] Source map production nonaktif.
- [ ] Security headers lengkap.

### Auth

- [ ] 401 clear session dan redirect.
- [ ] Logout membersihkan seluruh state.
- [ ] Login rate limit tersedia.

### Integrity

- [ ] Input divalidasi Zod.
- [ ] Response divalidasi schema.
- [ ] Type data immutable.

### Logging dan SSRF

- [ ] Logger terstruktur dan redacted.
- [ ] `requestId` terlihat.
- [ ] API URL dari env.
- [ ] Fetch memakai `redirect: 'error'`.

---

## 14. Referensi

### Internal

- `AGENTS.md`
- `FRONTEND-PATTERNS.md`
- `FRONTEND-ERROR-HANDLING.md`
- `FRONTEND-DATA-FLOW.md`
- `RULES.md`
- `docs/ARCHITECTURE.md`

### External

- OWASP Top 10: https://owasp.org/Top10/
- OWASP ASVS: https://owasp.org/www-project-application-security-verification-standard/
- OWASP Cheat Sheets: https://cheatsheetseries.owasp.org/
- CSP Evaluator: https://csp-evaluator.withgoogle.com/
- MDN Web Security: https://developer.mozilla.org/en-US/docs/Web/Security
- RFC 7807: https://www.rfc-editor.org/rfc/rfc7807
- RFC 6750: https://www.rfc-editor.org/rfc/rfc6750
- RFC 9110: https://www.rfc-editor.org/rfc/rfc9110

---

## 15. Ringkasan Satu Baris

> **Deny by default, defense in depth, fail closed, no implicit trust — CSP, validasi Zod, response type guard, bounded retry, security headers, structured redacted log, dan backend authorization wajib.**

---

**FRONTEND-SECURITY.md v1.0.0 — Approved**

## Status Dokumen

| Dokumen                      | Status   |
| ---------------------------- | -------- |
| `FRONTEND-API-CONTRACT.md`   | Approved |
| `FRONTEND-ERROR-HANDLING.md` | Approved |
| `FRONTEND-DATA-FLOW.md`      | Approved |
| `FRONTEND-SECURITY.md`       | Approved |
| `FRONTEND-COMPONENTS.md`     | Next     |
| `FRONTEND-NAMING.md`         | Next     |
| `FRONTEND-TESTING.md`        | Next     |
| `FRONTEND-PERFORMANCE.md`    | Next     |
| `FRONTEND-ACCESSIBILITY.md`  | Next     |
