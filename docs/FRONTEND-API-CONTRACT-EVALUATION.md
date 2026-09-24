# Evaluasi `docs/FRONTEND-API-CONTRACT.md`

## Verdict Cepat

| Aspek                  |     Skor | Catatan                                        |
| ---------------------- | -------: | ---------------------------------------------- |
| Coverage endpoint      |     9/10 | 21 endpoint komprehensif untuk Sprint 1–2      |
| Konsistensi dokumen    |     5/10 | Enam inkonsistensi kritis                      |
| TypeScript types       |     7/10 | Bagus, perlu `readonly`                        |
| Security documentation |     7/10 | Ada gap response/auth headers                  |
| Error handling         |     6/10 | ProblemDetail perlu dilengkapi                 |
| Example flows          |     8/10 | Jelas dan mudah diikuti                        |
| **Overall**            | **7/10** | Draft bagus, revisi wajib sebelum implementasi |

## 🔴 Inkonsistensi Kritis

### 1. Shape response list

API contract memakai `{ items, total }`, sedangkan `FRONTEND-PATTERNS.md` memakai `{ data, page, total }`. Gunakan satu envelope untuk semua list:

```json
{
  "data": [],
  "page": 1,
  "limit": 20,
  "total": 24,
  "totalPages": 2
}
```

Single resource:

```json
{ "data": { "id": "r_xxx" } }
```

Action response:

```json
{ "ok": true, "data": {} }
```

### 2. ProblemDetail belum lengkap

Setiap error wajib mengikuti RFC 7807 dan contract frontend:

```json
{
  "type": "https://api.michishirube.dev/errors/GW_ROUTE_NOT_FOUND",
  "title": "Route not found",
  "status": 404,
  "code": "GW_ROUTE_NOT_FOUND",
  "detail": "Route tidak ditemukan",
  "instance": "/admin/routes/r_xxx",
  "requestId": "01HX8Z...",
  "tenantId": "t_system",
  "timestamp": "2026-09-24T10:00:05Z",
  "retryable": false
}
```

Tambahkan contoh `errors[]` untuk 400/422 dan `retryAfter` untuk 429. Frontend tidak boleh menampilkan `detail` mentah.

### 3. Jumlah endpoint

`STRUCTURE.md` menyebut 13 endpoint, sedangkan contract memiliki 21 endpoint. Jelaskan bahwa 13 adalah MVP core dan 21 adalah scope lengkap, atau update struktur menjadi 21 setelah contract disetujui.

### 4. `openUntil` tidak konsisten

Pilih satu representasi. Rekomendasi: Unix epoch milliseconds agar konsisten dengan timestamp numerik lainnya:

```json
{ "openUntil": 1758700800000 }
```

### 5. Pagination tidak konsisten

Semua list wajib mengembalikan `data`, `page`, `limit`, `total`, dan `totalPages`. Jangan ada endpoint yang hanya mengembalikan `items` dan `total`.

### 6. Status domain berbeda

Tenant menggunakan `active | suspended | inactive`; `suspended` bersifat sementara dan `inactive` permanen. API key menggunakan `active | revoked`; `revoked` tidak dapat dipakai lagi. Dokumentasikan perbedaan ini pada type.

## 🟠 Masalah Serius

### 7. Endpoint auth belum lengkap

Tambahkan:

```text
POST /admin/auth/login
POST /admin/auth/logout
GET  /admin/auth/me
```

Dengan ini total menjadi 24 endpoint.

### 8. Response headers

Dokumentasikan:

| Header                  | Fungsi                       |
| ----------------------- | ---------------------------- |
| `X-Request-ID`          | korelasi request dan support |
| `Retry-After`           | countdown 429/503            |
| `WWW-Authenticate`      | invalid/expired Bearer token |
| `X-RateLimit-Limit`     | quota tenant                 |
| `X-RateLimit-Remaining` | sisa request                 |
| `X-RateLimit-Reset`     | reset quota                  |
| `Location`              | URL resource hasil create    |

### 9. Status 500

Tambahkan `500 GW_INTERNAL_*` dengan pesan aman dan `requestId` untuk support.

### 10. Request ID pada action endpoint

Untuk response action, prefer header `X-Request-ID`. Jika body membutuhkan korelasi langsung, tambahkan `requestId` secara konsisten pada action response.

### 11. API key secret

Ganti `plaintext` menjadi `secret` atau `keyValue`. Secret hanya ditampilkan sekali dan tidak pernah masuk response berikutnya.

### 12. ID pada create

`id` sebaiknya di-generate server. Jika migration membutuhkan client-supplied ID, jadikan optional dan validasi format ketat.

## 🟡 Style dan Konsistency

- Gunakan `half-open` untuk circuit state, bukan `half_open`.
- Tambahkan `readonly` pada semua field contract TypeScript.
- Batasi `AuditEntry.action` menggunakan union `AuditAction`, bukan `string`.
- Dokumentasikan bahwa `auth.failed` memiliki status `error`.
- Naikkan polling overview menjadi 30 detik; circuit breaker 10 detik.
- Tambahkan `Location` pada create resource.
- ETag dan `If-Match` dicatat sebagai future enhancement untuk optimistic concurrency.

## 🟢 Yang Sudah Bagus

- Coverage endpoint dan circuit breaker/bulkhead komprehensif.
- Error code reference cukup luas.
- CRUD flow mudah diikuti.
- `keyHash` tidak dikembalikan.
- API key secret hanya ditampilkan sekali.
- SSRF guard pada `upstream`.
- Idempotency key didokumentasikan.
- Rekomendasi polling dan rate-limit headers tersedia.

## 📋 Checklist Perbaikan

### Blocker sebelum implementasi

- [ ] Gunakan envelope `data` untuk semua list.
- [ ] Lengkapi ProblemDetail dengan `errors`, `retryAfter`, `tenantId`.
- [ ] Sinkronkan jumlah endpoint dengan `STRUCTURE.md`.
- [ ] Pilih representasi `openUntil` secara tunggal.
- [ ] Konsistenkan pagination.
- [ ] Tambahkan tiga endpoint auth.
- [ ] Dokumentasikan response headers.
- [ ] Tambahkan status 500.

### Sebelum Sprint F1 selesai

- [ ] Tambahkan request ID pada action response atau gunakan header.
- [ ] Rename `plaintext` menjadi `secret`/`keyValue`.
- [ ] Jadikan ID create opsional bila migration membutuhkannya.
- [ ] Tambahkan `readonly` pada types.
- [ ] Batasi `AuditAction` dengan union.

### Sebelum Sprint F2 selesai

- [ ] Dokumentasikan status tenant dan API key.
- [ ] Gunakan `half-open`.
- [ ] Naikkan polling overview menjadi 30 detik.
- [ ] Tambahkan header `Location`.

### Future enhancement

- [ ] ETag + `If-Match` untuk concurrency.
- [ ] `POST /admin/api-keys/:id/rotate`.
- [ ] SSE `/admin/events/stream`.
- [ ] WebSocket `/admin/ws`.

## ProblemDetail Contract

Semua error response/content type:

```text
Content-Type: application/problem+json
```

| Field        | Tipe            | Wajib |
| ------------ | --------------- | ----: |
| `type`       | URI/string      |    ya |
| `title`      | string          |    ya |
| `status`     | number          |    ya |
| `code`       | `GW_*` string   |    ya |
| `detail`     | string          | tidak |
| `instance`   | string          | tidak |
| `requestId`  | string          |    ya |
| `tenantId`   | string          | tidak |
| `timestamp`  | ISO 8601 string |    ya |
| `retryable`  | boolean         |    ya |
| `retryAfter` | number detik    | tidak |
| `errors`     | `FieldError[]`  | tidak |

## Rekomendasi Keputusan

1. Tetapkan `data` sebagai envelope tunggal.
2. Update semua contoh endpoint dan Zod schema.
3. Tambahkan auth endpoints dan response headers.
4. Tambahkan `readonly` dan union types.
5. Buat ADR response envelope sebelum backend dan frontend mengimplementasikan contract.
6. Dokumentasikan ETag/If-Match sebagai future enhancement.

> Contract harus menjadi single source of truth: satu envelope, satu ProblemDetail contract, satu pagination shape, dan type readonly.
