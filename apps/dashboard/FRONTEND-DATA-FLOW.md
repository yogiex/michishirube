# FRONTEND-DATA-FLOW.md — Michishirube Dashboard

| Field           | Value                                                                                         |
| --------------- | --------------------------------------------------------------------------------------------- |
| Versi           | 1.0.0                                                                                         |
| Status          | Approved                                                                                      |
| Berlaku untuk   | `apps/dashboard/`                                                                             |
| Dokumen Terkait | `AGENTS.md`, `FRONTEND-PATTERNS.md`, `FRONTEND-API-CONTRACT.md`, `FRONTEND-ERROR-HANDLING.md` |
| OWASP           | A01, A08, A09                                                                                 |

---

## 0. Prinsip Dasar

### 0.1 Lima Aturan Emas

| #   | Aturan                                    | Konsekuensi                                            |
| --- | ----------------------------------------- | ------------------------------------------------------ |
| 1   | **Server first, client only when needed** | Default Server Component, `'use client'` di leaf       |
| 2   | **Server state ≠ UI state**               | TanStack Query untuk server, Zustand/useState untuk UI |
| 3   | **URL adalah state**                      | Filter, pagination, dan search di `searchParams`       |
| 4   | **Satu sumber kebenaran**                 | Setiap state punya satu owner                          |
| 5   | **Derive, don't duplicate**               | Jika dapat dihitung, jangan disimpan                   |

### 0.2 Klasifikasi State

| Tipe State      | Contoh                               | Owner           |
| --------------- | ------------------------------------ | --------------- |
| Server state    | Routes, tenants, audit, metrics      | TanStack Query  |
| Global UI state | Auth user, sidebar collapsed, banner | Zustand         |
| Local UI state  | Modal, dropdown, hover               | `useState`      |
| URL state       | Filter, page, search query           | `searchParams`  |
| Form state      | Input dan validation error           | React Hook Form |
| Derived state   | Filtered list, formatted date        | Compute inline  |

### 0.3 Hierarki Keputusan

1. Jika data berasal dari server dan render pertama kali di server, gunakan Server Component.
2. Jika server data membutuhkan interaksi, polling, refetch, atau mutasi, gunakan TanStack Query.
3. Jika state dipakai lintas halaman, gunakan Zustand.
4. Jika state dapat di-bookmark atau dibagikan, gunakan URL/search params.
5. Jika state merupakan bagian dari form, gunakan React Hook Form.
6. Jika state dapat dihitung dari data lain, derive inline.

---

## 1. Decision Tree — Kapan Pakai Apa

| Task                     | Tool                        | Alasan                             |
| ------------------------ | --------------------------- | ---------------------------------- |
| Initial data halaman     | Server Component            | Cache Next.js, client JS minimal   |
| Filter/pagination        | TanStack Query atau URL     | Refetch dan bookmarkability        |
| Metrics/cb polling       | TanStack Query + interval   | Polling bawaan                     |
| Create/update/delete     | TanStack Query mutation     | Invalidation dan optimistic update |
| Auth user                | Zustand atau session server | Global state                       |
| Sidebar/banner           | Zustand                     | Cross-page state                   |
| Modal/dropdown           | `useState`                  | Local UI state                     |
| Filter/pagination/search | `searchParams`              | URL sebagai source of truth        |
| Form input               | React Hook Form             | Validation dan dirty state         |
| Derived list/date        | Inline compute              | Hindari state duplikat             |

---

## 2. Server Component — Default

### Kapan Pakai

- Halaman read-only seperti Overview dan Metrics viewer.
- Initial data yang tidak sering berubah.
- Data yang mengurangi client bundle.

### Kapan Tidak Pakai

- Membutuhkan event handler, browser API, React hooks, atau library client-only.

### Aturan

- Default untuk `page.tsx`.
- Fetch langsung dari `lib/api/endpoints/*`.
- Handle error dengan `ErrorState`.
- Jangan gunakan `'use client'`, `useState`, atau `useEffect` di `page.tsx`.

```tsx
export default async function TenantsPage() {
  const result = await tenantsApi.list({ page: 1, limit: 20 });
  if (!result.ok) return <ErrorState problem={result.error} />;
  return <TenantList initialData={result.value} />;
}
```

---

## 3. Client Component — Hanya Jika Butuh

Gunakan untuk form, chart interaktif, drawer/modal, live search, dan real-time update.

```text
app/(dashboard)/<halaman>/
├── page.tsx
└── _components/
    └── <halaman>-client.tsx
```

`'use client'` harus berada sedekat mungkin dengan leaf component. Terima data dari parent server dan gunakan local state hanya untuk UI interaktif. Jangan fetch langsung di client component; gunakan TanStack Query.

---

## 4. TanStack Query — Server State Client-Side

### Kapan Pakai

- Data yang sering berubah, membutuhkan polling, mutation, refetch, atau optimistic update.

### Kapan Tidak Pakai

- Data statis atau yang dapat dirender sepenuhnya di server.

### Flow

```text
Component mount → cache check → cache hit render
                              └→ miss/stale → apiRequest → cache atau ProblemDetail
```

```ts
export function useRoutes(filters: RouteFilters = {}) {
  return useQuery<RouteList, ProblemDetail>({
    queryKey: queryKeys.routes.list(filters),
    queryFn: async () => {
      const result = await routesApi.list(filters);
      if (!result.ok) throw result.error;
      return result.value;
    },
    staleTime: 30_000,
  });
}
```

Mutation wajib:

- Throw `ProblemDetail` dari `queryFn`.
- Invalidate query key terkait setelah sukses.
- Mapping error ke toast/banner/field errors.
- Gunakan `refetchIntervalInBackground: false` untuk polling.

```ts
export function useCreateRoute() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: CreateRouteInput) => {
      const result = await routesApi.create(input);
      if (!result.ok) throw result.error;
      return result.value;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.routes.all });
      void queryClient.invalidateQueries({ queryKey: queryKeys.audit.all });
    },
  });
}
```

---

## 5. Zustand — Global UI State

Gunakan untuk state lintas halaman/persist, seperti auth, theme, sidebar, dan banner. Jangan gunakan untuk server data, local state, form state, atau URL state.

| Store  | File                          | Isi                               |
| ------ | ----------------------------- | --------------------------------- |
| Auth   | `lib/auth.ts`                 | User, token, authentication state |
| Banner | `lib/banners/banner-store.ts` | Active banners                    |
| UI     | future                        | Sidebar collapsed, theme          |

### Selective Subscribe

```tsx
const user = useAuthStore((state) => state.user);
```

Jangan subscribe seluruh store karena menyebabkan re-render berlebihan. Token tidak boleh disimpan长期 di localStorage; gunakan httpOnly cookie sebagai target keamanan.

---

## 6. `useState` — Local UI State

Gunakan untuk modal, dropdown, selected row, drawer, hover, atau tab yang tidak perlu di-bookmark. Jangan gunakan untuk server data, URL state, atau state persisten.

```tsx
const [selectedId, setSelectedId] = useState<string | null>(null);
const [isCreateOpen, setCreateOpen] = useState(false);
```

Reset state saat komponen unmount dilakukan secara otomatis oleh React.

---

## 7. URL State — Filter, Pagination, Search

Gunakan untuk filter, pagination, search, sort, dan tab yang dapat di-bookmark.

```tsx
const searchParams = useSearchParams();
const page = Number(searchParams.get('page') ?? '1');
const q = searchParams.get('q') ?? '';
```

Saat filter berubah:

1. Salin `searchParams` dengan `URLSearchParams`.
2. Set/delete parameter.
3. Reset `page=1`.
4. Gunakan `router.push` agar tombol back bekerja.
5. Jangan simpan filter di Zustand, `useState`, atau localStorage.

---

## 8. Form State — React Hook Form

Gunakan untuk semua form, dengan schema Zod di `lib/schemas/`.

```tsx
const form = useForm<CreateRouteInput>({
  resolver: zodResolver(CreateRouteSchema),
  mode: 'onBlur',
  defaultValues: { method: 'GET', enabled: true, timeoutMs: 5000 },
});
```

- Gunakan `noValidate` pada `<form>`.
- Mapping RFC 7807 field errors ke `form.setError`.
- Fokus field pertama yang error.
- Jangan validasi manual atau menyimpan form state di Zustand.

---

## 9. State Ownership Matrix

| State                     | Owner           | Persist              | Refetch |
| ------------------------- | --------------- | -------------------- | ------- |
| Auth user                 | Session/Zustand | Session/localStorage | Tidak   |
| Route/tenant/audit list   | TanStack Query  | Cache                | Ya      |
| Metrics/circuit breaker   | TanStack Query  | Cache                | Poll    |
| Banner/sidebar            | Zustand         | Tergantung concern   | Tidak   |
| Modal/drawer/selected row | `useState`      | Tidak                | Tidak   |
| Filter/pagination/search  | URL             | URL                  | Ya      |
| Form input/error          | React Hook Form | Tidak                | Tidak   |
| Derived list/date         | Compute         | Tidak                | Tidak   |

Setiap state harus memiliki tepat satu owner.

---

## 10. Data Flow Diagrams

### 10.1 Load Overview

```text
Navigation → Server Component → overviewApi.get()
                         ├─ success → render overview components
                         └─ error → ErrorState
```

### 10.2 Create Route

```text
Open modal → RHF + Zod validation → useCreateRoute().mutateAsync
                                      ├─ 201 → invalidate routes/audit + toast
                                      └─ 4xx/5xx → field errors/banner/toast
```

### 10.3 Filter Routes

```text
Input → updateFilter → router.push('/routes?q=orders&page=1')
      → Server Component → routesApi.list({ q, page: 1 })
      → render data baru
```

### 10.4 Session Expired

```text
API 401 → ProblemDetail → clear session → log safe metadata
        → redirect /login?from=<path>
```

Jangan log token, password, atau detail internal upstream.

---

## 11. Cache Invalidation Rules

| Mutation                    | Invalidate                                      |
| --------------------------- | ----------------------------------------------- |
| Create/update/delete route  | `routes.all`, detail bila relevan, `audit.all`  |
| Create/update/delete tenant | `tenants.all`, detail bila relevan, `audit.all` |
| Issue/revoke API key        | `apiKeys.all`, `audit.all`                      |
| Reload config               | `routes.all`, `audit.all`                       |
| Reset circuit               | `circuitBreakers.all`, `audit.all`              |

Setiap mutation backend yang tercatat di audit harus meng-invalidate `audit.all`.

---

## 12. Anti-Pattern

| Anti-pattern                            | Ganti dengan                |
| --------------------------------------- | --------------------------- |
| `useEffect` + `fetch` untuk server data | TanStack Query              |
| Server data di Zustand                  | TanStack Query              |
| Filter di `useState`                    | `searchParams`              |
| Form input di Zustand                   | React Hook Form             |
| `'use client'` di `page.tsx`            | Client component di leaf    |
| Subscribe seluruh Zustand store         | Selective subscribe         |
| Derived state disimpan                  | Compute inline              |
| Fetch client tanpa TanStack Query       | TanStack Query              |
| Beberapa owner untuk satu state         | Satu owner                  |
| Token di URL                            | Header atau httpOnly cookie |
| Server data di `useState`               | TanStack Query              |

---

## 13. Testing

| State/tool       | Test                                  |
| ---------------- | ------------------------------------- |
| Server Component | Vitest dengan fetch mock              |
| TanStack Query   | Testing Library + QueryClientProvider |
| Zustand          | Unit test actions dan persistence     |
| `useState`       | Testing Library interaction           |
| URL state        | Mock `next/navigation`                |
| Form RHF         | Validation dan submit                 |
| Query key        | Shape/unit test                       |

---

## 14. Checklist Sebelum Commit

- [ ] Server data berada di TanStack Query.
- [ ] Global UI state berada di Zustand.
- [ ] Local state menggunakan `useState`.
- [ ] URL state menggunakan `searchParams`.
- [ ] Form state menggunakan React Hook Form.
- [ ] `page.tsx` tetap Server Component.
- [ ] `'use client'` hanya di leaf.
- [ ] Error server ditangani sebagai ProblemDetail.
- [ ] Query key berasal dari `queryKeys`.
- [ ] Mutation meng-invalidate cache terkait.
- [ ] Filter melakukan reset `page=1`.
- [ ] Tidak ada token, secret, atau data sensitif di log.
- [ ] Test, lint, typecheck, dan formatting lulus.

---

## 15. Referensi

- `AGENTS.md`
- `FRONTEND-PATTERNS.md`
- `FRONTEND-API-CONTRACT.md`
- `FRONTEND-ERROR-HANDLING.md`
- `FRONTEND-DESIGN.md`
- TanStack Query: https://tanstack.com/query
- Next.js App Router: https://nextjs.org/docs/app
- Zustand: https://github.com/pmndrs/zustand

---

## 16. Ringkasan Satu Baris

> **Server Component default, TanStack Query untuk server state client-side, Zustand untuk global UI state, `useState` untuk local UI, `searchParams` untuk URL state, dan React Hook Form untuk form — satu state, satu owner, derive don't duplicate.**

---

**FRONTEND-DATA-FLOW.md v1.0.0 — Approved**

## 🚧 File Berikutnya

| Dokumen                     | Status |
| --------------------------- | ------ |
| `FRONTEND-SECURITY.md`      | ⏳     |
| `FRONTEND-COMPONENTS.md`    | ⏳     |
| `FRONTEND-NAMING.md`        | ⏳     |
| `FRONTEND-TESTING.md`       | ⏳     |
| `FRONTEND-PERFORMANCE.md`   | ⏳     |
| `FRONTEND-ACCESSIBILITY.md` | ⏳     |
| `examples/`                 | ⏳     |
