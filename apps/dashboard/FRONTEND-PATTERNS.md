# FRONTEND-PATTERNS.md — Michishirube Dashboard

| Field           | Value                                                                    |
| --------------- | ------------------------------------------------------------------------ |
| Versi           | 1.0.0                                                                    |
| Status          | Approved                                                                 |
| Berlaku untuk   | `apps/dashboard/`                                                        |
| Dokumen Terkait | `AGENTS.md`, `FRONTEND-DESIGN.md`, `docs/PRD.md`, `docs/ARCHITECTURE.md` |
| Tujuan          | Pattern library — salin struktur, jangan improvisasi                     |

## 0. Cara Pakai Dokumen Ini

1. Cari pattern sesuai task.
2. Salin struktur dan ganti nama sesuai domain.
3. Ikuti aturan ✅/❌; jangan mencampur.
4. Periksa Security Note dan Performance Note.

Setiap pattern memiliki satu tanggung jawab. Jika butuh beberapa pattern, komposisi file—jangan menggabungkan seluruh logic ke satu file.

## 1. Page Layout — Server Component

Gunakan untuk setiap halaman read-only atau cacheable di `app/(dashboard)/<nama>/page.tsx`.

```text
app/(dashboard)/<nama>/
├── page.tsx
├── loading.tsx
└── _components/
    ├── <nama>-table.tsx
    └── <nama>-empty.tsx
```

```tsx
import { routesApi } from '@/lib/api/endpoints/routes';
import { ErrorState } from '@/components/shared/error-state';
import { PageHeader } from '@/components/shared/page-header';
import { RoutesTable } from './_components/routes-table';

export default async function RoutesPage() {
  const result = await routesApi.list({ page: 1, limit: 20 });
  if (!result.ok) return <ErrorState problem={result.error} />;
  if (result.value.data.length === 0) return <RoutesEmpty />;
  return (
    <div className="space-y-6">
      <PageHeader title="Routes" description="Konfigurasi routing gateway" />
      <RoutesTable data={result.value.data} total={result.value.total} />
    </div>
  );
}
```

Hindari `'use client'`, `useState`, `useEffect`, dan `fetch` langsung di `page.tsx`. Server component tidak mengirim logic fetch ke browser.

## 2. Client Page — Interaktif

Gunakan untuk filter live, polling, chart, atau state interaktif. `page.tsx` tetap server shell; client berada di `_components/<nama>-client.tsx`.

```tsx
'use client';

import { useState } from 'react';
import { useMetrics } from '@/hooks/use-metrics';
import { QueryErrorBoundary } from '@/components/shared/query-error-boundary';
import { ChartSkeleton } from '@/components/shared/suspense-fallback';

export function MetricsClient() {
  const [range, setRange] = useState<'1h' | '24h' | '7d'>('24h');
  return (
    <div className="space-y-6">
      <RangeSelector value={range} onChange={setRange} />
      <QueryErrorBoundary fallback={<ChartSkeleton />}>
        <MetricsCharts range={range} />
      </QueryErrorBoundary>
    </div>
  );
}
```

## 3. Query — useQuery

Gunakan untuk data client-side, polling, filter, atau cache. Endpoint wajib memakai `ApiResult`, Zod response validation, dan query key terpusat.

```ts
// lib/api/endpoints/tenants.ts
import { z } from 'zod';
import { apiRequest, type ApiResult } from '../client';
import type { ProblemDetail } from '../problem-detail';

const TenantSchema = z.object({
  id: z.string(),
  name: z.string(),
  tier: z.enum(['free', 'pro', 'enterprise']),
  quotaPerMinute: z.number().int().nonnegative(),
  active: z.boolean(),
});
const TenantListSchema = z.object({
  data: z.array(TenantSchema),
  page: z.number().int().positive(),
  limit: z.number().int().positive().max(100),
  total: z.number().int().nonnegative(),
  totalPages: z.number().int().nonnegative(),
});
export type Tenant = z.infer<typeof TenantSchema>;
export type TenantList = z.infer<typeof TenantListSchema>;

export async function listTenants({
  page = 1,
  limit = 20,
}: Readonly<{ page?: number; limit?: number }> = {}): Promise<
  ApiResult<TenantList>
> {
  const result = await apiRequest<unknown>(
    `/admin/tenants?page=${page}&limit=${limit}`,
  );
  if (!result.ok) return result;
  const parsed = TenantListSchema.safeParse(result.value);
  return parsed.success
    ? { ok: true, value: parsed.data }
    : { ok: false, error: malformedResponse('tenants.list') };
}

function malformedResponse(scope: string): ProblemDetail {
  return {
    type: 'about:blank',
    title: 'Response tidak valid',
    status: 500,
    code: 'GW_FRONTEND_MALFORMED_RESPONSE',
    detail: `Endpoint ${scope} tidak valid`,
    requestId: 'unknown',
    timestamp: new Date().toISOString(),
    retryable: false,
  };
}
```

```ts
// hooks/use-tenants.ts
'use client';

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/api/query-keys';
import { listTenants, type TenantList } from '@/lib/api/endpoints/tenants';
import type { ProblemDetail } from '@/lib/api/problem-detail';

export function useTenants(page = 1, limit = 20) {
  return useQuery<TenantList, ProblemDetail>({
    queryKey: queryKeys.tenants.list({ page, limit }),
    queryFn: async () => {
      const result = await listTenants({ page, limit });
      if (!result.ok) throw result.error;
      return result.value;
    },
    staleTime: 30_000,
  });
}
```

```tsx
export function TenantList() {
  const { data, isLoading, error, refetch } = useTenants();
  if (isLoading) return <TableSkeleton rows={8} />;
  if (error) return <ErrorState problem={error} onRetry={refetch} />;
  if (!data)
    return (
      <EmptyState
        title="Tenant belum tersedia"
        description="Belum ada tenant yang terdaftar."
      />
    );
  return <TenantTable data={data.data} />;
}
```

## 4. Mutation — useMutation

Gunakan untuk create, update, delete. Mutation wajib throw `ProblemDetail` pada error, invalidate query terkait, dan menampilkan feedback.

```ts
'use client';

export function useCreateRoute() {
  const queryClient = useQueryClient();
  return useMutation<Route, ProblemDetail, CreateRouteInput>({
    mutationFn: async (input) => {
      const result = await routesApi.create(input);
      if (!result.ok) throw result.error;
      return result.value;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.routes.all });
      void queryClient.invalidateQueries({ queryKey: queryKeys.audit.all });
      toast.success('Route berhasil dibuat');
    },
    onError: (error) => showProblemToast(error),
  });
}
```

Setelah server field errors diterima, map ke React Hook Form dengan `form.setError`; jangan menampilkan field error hanya melalui toast.

## 5. Table — TanStack Table

Gunakan untuk list tabular dengan sorting, filter, atau pagination. Validasi data sebelum masuk tabel. Gunakan `useMemo` untuk columns dan pertimbangkan memoization row bila data besar.

```tsx
'use client';

const table = useReactTable({
  data: [...data],
  columns,
  getCoreRowModel: getCoreRowModel(),
});
```

Gunakan header uppercase `text-xs`, `tracking-wide`, header background semantic, row hover, dan border subtle. Jangan memakai warna hex langsung.

## 6. Error Handling — RFC 7807

Mapping wajib:

| Status             | UI                         |
| ------------------ | -------------------------- |
| 400 + field errors | inline RHF errors          |
| 401                | redirect `/login`          |
| 403                | toast unauthorized         |
| 404                | `ErrorState`               |
| 409                | toast conflict             |
| 429                | banner + retry countdown   |
| 502/503            | degradation banner + retry |
| 504                | warning toast + retry      |
| 5xx                | error toast                |

```ts
export function mapProblemToActions(
  problem: ProblemDetail,
): readonly UiAction[] {
  if (problem.status === 401 || problem.code.startsWith('GW_AUTH_'))
    return [{ kind: 'redirect-login' }];
  if (problem.status === 400 && problem.errors?.length)
    return [
      {
        kind: 'field-errors',
        errors: problem.errors.map(({ field, message }) => ({
          field,
          message,
        })),
      },
    ];
  if (problem.status === 429)
    return [
      { kind: 'banner', banner: 'rate-limited' },
      ...(problem.retryAfter
        ? [{ kind: 'retry', afterSeconds: problem.retryAfter } as const]
        : []),
    ];
  if (problem.status === 502 || problem.status === 503)
    return [
      { kind: 'banner', banner: 'upstream-down' },
      { kind: 'toast', severity: 'error' },
    ];
  return [{ kind: 'toast', severity: 'error' }];
}
```

Setiap error UI menampilkan `requestId` yang dapat dicopy. Jangan pernah menampilkan `problem.detail` mentah atau stack trace.

## 7. Loading — Suspense dan Skeleton

Skeleton harus menyerupai layout akhir untuk mengurangi CLS. Gunakan skeleton untuk fetch yang mungkin lebih dari 200 ms; jangan memakai full-page spinner untuk data kecil.

```tsx
export function TableSkeleton({ rows = 8 }: { readonly rows?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }, (_, index) => (
        <Skeleton key={index} className="h-10 w-full" />
      ))}
    </div>
  );
}
```

## 8. Empty State

Gunakan saat request sukses tetapi data kosong. Bedakan dari error: error memiliki retry dan requestId; empty state memiliki judul, deskripsi, dan CTA.

```tsx
<EmptyState
  icon={Database}
  title="Belum ada data"
  description="Data akan muncul setelah resource dibuat."
  action={{ label: 'Tambah', onClick: openCreate }}
/>
```

## 9. Drawer versus Modal

| Konteks                     | Komponen                     |
| --------------------------- | ---------------------------- |
| Detail/edit item dari table | Drawer                       |
| Create one-shot             | Modal                        |
| Konfirmasi delete           | Modal                        |
| Menampilkan secret sekali   | Modal dengan acknowledgement |

Drawer mempertahankan konteks table. Modal fokus penuh untuk keputusan yang memerlukan persetujuan. Keduanya harus keyboard accessible, dapat ditutup dengan Escape, memiliki focus trap, dan mengembalikan focus ke trigger.

## 10. Auth Guard

Proteksi berlapis: middleware deny-by-default, server verification, backend API verification, dan client fallback saat 401.

```ts
const token = request.cookies.get('michishirube.token')?.value;
if (!token && pathname !== '/login') {
  const url = request.nextUrl.clone();
  url.pathname = '/login';
  return NextResponse.redirect(url);
}
```

Jangan menaruh token pada query string. Jangan mengandalkan client guard saja.

## 11. Degradation Banner

Critical banner tidak dapat dismiss. Warning banner dapat dismiss dan memiliki batas auto-dismiss. Maksimal tiga banner terlihat; sisanya collapsed.

```ts
export function bannerFromProblem(problem: ProblemDetail): Banner | null {
  if (problem.status === 502 || problem.status === 503)
    return {
      kind: 'upstream-down',
      severity: 'critical',
      title: 'Upstream tidak tersedia',
      description: 'Beberapa layanan sedang down.',
      requestId: problem.requestId,
      dismissible: false,
    };
  if (problem.status === 429)
    return {
      kind: 'rate-limited',
      severity: 'warning',
      title: 'Rate limit tercapai',
      description: 'Tunggu sebentar sebelum mencoba lagi.',
      requestId: problem.requestId,
      retryAfter: problem.retryAfter,
      dismissible: true,
    };
  return null;
}
```

## 12. Copy to Clipboard

Untuk requestId dan secret satu kali. Tombol harus memiliki `aria-label`, feedback visual, fallback manual, dan tidak mengekspos secret penuh pada label.

```tsx
'use client';

export function CopyButton({
  value,
  label = 'Copy',
}: {
  readonly value: string;
  readonly label?: string;
}) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      return;
    }
  }
  return (
    <button type="button" onClick={copy} aria-label={label}>
      {copied ? <Check /> : <Copy />}
      {copied ? 'Tersalin' : label}
    </button>
  );
}
```

## 13. Toast

Toast untuk success mutation, generic server error, network error, dan warning. Field error harus inline; degradation harus banner; auth expired harus redirect.

Error toast selalu menampilkan code dan `RequestIdCopy`. Duration default 5 detik, critical 8 detik, posisi top-right, maksimal tiga toast.

## 14. Form — Zod dan React Hook Form

Schema berada di `lib/schemas/<nama>.schema.ts`; form berada di feature component. Gunakan `zodResolver`, `mode: 'onBlur'`, `noValidate`, `aria-invalid`, dan error message di bawah input.

```tsx
const form = useForm<CreateRouteInput>({
  resolver: zodResolver(CreateRouteSchema),
  mode: 'onBlur',
  defaultValues: { method: 'GET', enabled: true, timeoutMs: 5000 },
});
```

Client validation tidak menggantikan server validation.

## 15. Composition

Halaman kompleks dapat memakai page layout, client wrapper, table, drawer, modal, query, mutation, form, empty, loading, dan error state sebagai komposisi. `page.tsx` hanya menangani layout dan initial data; client wrapper mengoordinasikan state; komponen presentasi menerima data atau callback.

## 16. Cheat Sheet

| Task             | Pattern                         |
| ---------------- | ------------------------------- |
| Read-only page   | Server page layout              |
| Interactive page | Server shell + client component |
| Client data      | Query + Zod endpoint            |
| Mutation         | useMutation + invalidate        |
| Table            | TanStack Table                  |
| Form             | Zod + RHF                       |
| Loading          | Skeleton + Suspense             |
| No data          | EmptyState                      |
| Detail           | Drawer                          |
| Create/confirm   | Modal                           |
| Error            | ProblemDetail + requestId       |
| Degradation      | Banner                          |
| Feedback         | Toast                           |

## 16.5 Response Envelope Rules

Semua list endpoint memakai envelope yang sama:

```ts
type ListResponse<T> = Readonly<{
  data: readonly T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}>;
```

Single resource:

```ts
type SingleResponse<T> = Readonly<{ data: T }>;
```

Action non-CRUD:

```ts
type ActionResponse<T = unknown> = Readonly<{ ok: true; data: T }>;
```

Aturan:

- Selalu `data`, bukan `items`, `results`, atau `rows`.
- List wajib memiliki lima field pagination.
- Zod schema wajib memvalidasi envelope lengkap.
- Jangan kirim array langsung atau pagination parsial.

Referensi: `docs/FRONTEND-API-CONTRACT.md` §1.2 dan ADR `docs/ADR/0005-response-envelope.md`.

## 17. Anti-Pattern

| Dilarang                              | Gunakan                   |
| ------------------------------------- | ------------------------- |
| `fetch` langsung di komponen          | endpoint wrapper          |
| `useEffect` + fetch untuk server data | Server Component/useQuery |
| `useState` untuk server data          | TanStack Query            |
| `any` untuk response                  | Zod + inferred type       |
| `console.log` untuk error             | logger                    |
| Toast untuk field error               | inline `setError`         |
| Modal untuk detail table              | Drawer                    |
| Error tanpa requestId                 | `RequestIdCopy`           |
| Empty state sebagai error             | pisahkan Empty/Error      |
| Full-page spinner                     | Skeleton                  |
| `dangerouslySetInnerHTML`             | plain text                |
| Hex langsung di component             | semantic tokens           |
| `'use client'` di page                | client leaf component     |
| Mutation tanpa invalidate             | invalidate query keys     |

## 18. Checklist

- [ ] Pattern sesuai task
- [ ] Struktur folder benar
- [ ] API call melalui endpoint wrapper
- [ ] Response divalidasi Zod
- [ ] List response memakai envelope `{ data, page, limit, total, totalPages }`
- [ ] Single response memakai `{ data: ... }`
- [ ] Action response memakai `{ ok: true, data: ... }`
- [ ] Zod schema memvalidasi envelope lengkap
- [ ] Tidak ada `items` atau `results` di schema
- [ ] Error response sesuai `ProblemDetail` RFC 7807
- [ ] Query key terpusat
- [ ] Mutation meng-invalidate cache
- [ ] Error menggunakan ProblemDetail
- [ ] Field error dipetakan ke RHF
- [ ] RequestId terlihat
- [ ] Loading, empty, dan error state tersedia
- [ ] `aria-*` dan keyboard navigation tersedia
- [ ] Tidak ada `any`, `dangerouslySetInnerHTML`, atau PII di log
- [ ] Server Component menjadi default
- [ ] Chart dan editor berat memakai dynamic import

## 19. Referensi

`AGENTS.md`, `FRONTEND-DESIGN.md`, `docs/FRONTEND-ERROR-HANDLING.md`, `docs/FRONTEND-API-CONTRACT.md`, `docs/ADR/0005-response-envelope.md`, `docs/FRONTEND-DATA-FLOW.md`, `docs/FRONTEND-SECURITY.md`, `docs/PRD.md`, dan `docs/ARCHITECTURE.md`.

> Server component default, `useQuery` untuk client fetch, `useMutation` + invalidate untuk mutation, RFC 7807 untuk error, Zod untuk validasi, Drawer > Modal, Banner untuk degradation, Toast untuk feedback, dan `requestId` selalu terlihat.
