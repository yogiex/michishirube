# FRONTEND-NAMING.md — Michishirube Dashboard

| Field           | Value                                                                     |
| --------------- | ------------------------------------------------------------------------- |
| Versi           | 1.0.0                                                                     |
| Status          | Approved                                                                  |
| Berlaku untuk   | `apps/dashboard/`                                                         |
| Dokumen Terkait | `AGENTS.md`, `FRONTEND-PATTERNS.md`, `FRONTEND-COMPONENTS.md`, `RULES.md` |
| Tujuan          | Konvensi penamaan konsisten untuk seluruh kode dashboard                  |

---

## 0. Prinsip Dasar

### 0.1 Lima Aturan Emas

1. Konsisten lebih penting daripada nama kreatif.
2. Nama menjelaskan apa, bukan bagaimana implementasinya.
3. Nama yang jelas dan singkat lebih baik daripada nama panjang.
4. Ikuti konvensi repository, bukan preferensi pribadi.
5. Saat nama berubah, refactor seluruh referensi secara konsisten.

Referensi: Next.js App Router, TypeScript, React, TanStack Query, dan konvensi NestJS backend.

---

## 1. File Naming

### Aturan Umum

| Aturan    | Nilai                              |
| --------- | ---------------------------------- |
| Case      | `kebab-case`                       |
| Extension | `.tsx` untuk JSX, `.ts` tanpa JSX  |
| Suffix    | Sesuai tipe file                   |
| Panjang   | Prefer maksimal empat kata         |
| Singkatan | Hindari singkatan yang tidak jelas |

### Suffix File

| Tipe         | Format             | Contoh                   | Lokasi               |
| ------------ | ------------------ | ------------------------ | -------------------- |
| Page         | `page.tsx`         | `page.tsx`               | `app/**/`            |
| Layout       | `layout.tsx`       | `layout.tsx`             | `app/**/`            |
| Loading      | `loading.tsx`      | `loading.tsx`            | `app/**/`            |
| Error        | `error.tsx`        | `error.tsx`              | `app/**/`            |
| Global error | `global-error.tsx` | `global-error.tsx`       | `app/`               |
| Middleware   | `middleware.ts`    | `middleware.ts`          | dashboard root       |
| Config       | `next.config.ts`   | `next.config.ts`         | dashboard root       |
| Component    | kebab-case         | `route-table.tsx`        | `components/**/`     |
| Hook         | `use-*.ts`         | `use-routes.ts`          | `hooks/`             |
| API endpoint | domain file        | `routes.ts`              | `lib/api/endpoints/` |
| Zod schema   | `*.schema.ts`      | `create-route.schema.ts` | `lib/schemas/`       |
| Store        | concern            | `auth.ts`                | `lib/`               |
| Utility      | kebab-case         | `formatters.ts`          | `lib/utils/`         |
| Constant     | kebab-case         | `headers.ts`             | `lib/constants/`     |
| Test         | `*.spec.ts(x)`     | `route-table.spec.tsx`   | `__tests__/`         |
| Fixture      | `*.fixture.ts`     | `routes.fixture.ts`      | `test/fixtures/`     |

### Contoh Salah

| Salah                  | Benar             |
| ---------------------- | ----------------- |
| `RouteTable.tsx`       | `route-table.tsx` |
| `route_table.tsx`      | `route-table.tsx` |
| `routeTable.tsx`       | `route-table.tsx` |
| `routes.component.tsx` | `route-table.tsx` |
| `useRoutes.ts`         | `use-routes.ts`   |
| `useRoutesHook.ts`     | `use-routes.ts`   |
| `apiClient.ts`         | `api-client.ts`   |
| `RT.tsx`               | `route-table.tsx` |
| `utils.tsx` tanpa JSX  | `utils.ts`        |

### Struktur Standar

```text
apps/dashboard/
├── app/
│   ├── (auth)/login/page.tsx
│   ├── (dashboard)/layout.tsx
│   ├── (dashboard)/routes/page.tsx
│   ├── (dashboard)/routes/_components/routes-client.tsx
│   ├── global-error.tsx
│   └── layout.tsx
├── components/
│   ├── ui/{button,input,skeleton,badge}.tsx
│   ├── layout/{shell,sidebar,nav-item}.tsx
│   ├── shared/{error-state,empty-state,data-table}.tsx
│   ├── banners/{banner-stack,degradation-banner}.tsx
│   └── features/{routes,api-keys}/
├── hooks/
├── lib/
│   ├── api/{client,problem-detail,error-mapper,query-keys}.ts
│   ├── api/endpoints/
│   ├── schemas/
│   ├── banners/
│   └── design/
├── types/
└── middleware.ts
```

---

## 2. Component Naming

- Export component menggunakan `PascalCase`.
- File menggunakan `kebab-case.tsx`.
- Props named `<ComponentName>Props`.
- Named export wajib, kecuali file Next.js.
- Suffix generic `Component`, `Container`, `View`, `Widget` dilarang.

| File                  | Export          | Props                |
| --------------------- | --------------- | -------------------- |
| `button.tsx`          | `Button`        | `ButtonProps`        |
| `route-table.tsx`     | `RouteTable`    | `RouteTableProps`    |
| `issue-key-modal.tsx` | `IssueKeyModal` | `IssueKeyModalProps` |
| `request-id-copy.tsx` | `RequestIdCopy` | `RequestIdCopyProps` |

### Suffix Bermakna

`Item`, `List`, `Table`, `Form`, `Modal`, `Drawer`, `Card`, `Panel`, `Banner`, `Skeleton`, `Empty`, `Client`, dan `Provider` digunakan hanya jika memang merepresentasikan pola tersebut.

Contoh yang benar: `RouteTable`, `CreateRouteModal`, `AuditDetailDrawer`, `KpiStripSkeleton`, `RoutesClient`.

---

## 3. Hook Naming

- File: `use-kebab-case.ts`.
- Export: `useCamelCase`.
- Hook wajib diawali `use`.
- Return berupa object, kecuali hook yang secara langsung membungkus `useState`.

| File                   | Export            | Fungsi      |
| ---------------------- | ----------------- | ----------- |
| `use-routes.ts`        | `useRoutes`       | Data fetch  |
| `use-tenants.ts`       | `useTenants`      | Data fetch  |
| `use-create-route.ts`  | `useCreateRoute`  | Mutation    |
| `use-online.ts`        | `useOnline`       | Browser API |
| `use-debounce.ts`      | `useDebounce`     | Utility     |
| `use-local-storage.ts` | `useLocalStorage` | Storage     |

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

Gunakan `useSyncExternalStore` untuk browser external store seperti online status. Jangan memberi suffix `Hook` pada nama hook.

---

## 4. Type dan Interface Naming

- Type/interface menggunakan `PascalCase`.
- Prefix `I` dilarang.
- Hindari suffix redundan `Type`, `Interface`, dan `DTO`.
- Props/Input/Response/Filters harus bermakna.

| Suffix     | Contoh               |
| ---------- | -------------------- |
| `Props`    | `RouteTableProps`    |
| `Input`    | `CreateRouteInput`   |
| `Output`   | `ResolveRouteOutput` |
| `Response` | `LoginResponse`      |
| `Request`  | `LoginRequest`       |
| `Params`   | `PaginationParams`   |
| `Filters`  | `RouteFilters`       |
| `Options`  | `RequestOptions`     |
| `State`    | `AuthState`          |
| `Store`    | `BannerStore`        |
| `Config`   | `BulkheadConfig`     |
| `Result`   | `ApiResult<T>`       |
| `Kind`     | `BannerKind`         |
| `Action`   | `UiAction`           |
| `Severity` | `BannerSeverity`     |
| `Status`   | `CircuitStatus`      |
| `Entry`    | `AuditEntry`         |
| `Snapshot` | `CircuitSnapshot`    |

```ts
export type Route = Readonly<{
  id: string;
  path: string;
  method: HttpMethod;
}>;

export type CreateRouteInput = Readonly<{
  path: string;
  method: HttpMethod;
  upstream: string;
}>;

export type ApiResult<T> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly error: ProblemDetail };
```

---

## 5. Variable dan Function Naming

| Tipe          | Format               | Contoh          |
| ------------- | -------------------- | --------------- |
| Variable      | `camelCase`          | `routeList`     |
| Function      | `camelCase` + verb   | `handleSubmit`  |
| Boolean       | `is/has/can/should`  | `isLoading`     |
| Constant      | `SCREAMING_SNAKE`    | `MAX_PAGE_SIZE` |
| Parameter     | `camelCase`          | `userId`        |
| Private field | `#field` bila sesuai | `#cache`        |

### Verb Function

| Verb                   | Contoh                             |
| ---------------------- | ---------------------------------- |
| `get*`                 | `getUserName`                      |
| `fetch*`               | `fetchRoutes` untuk async internal |
| `create*`              | `createRoute`                      |
| `update*`              | `updateRoute`                      |
| `remove*`              | `removeItem`                       |
| `is*/has*/can*`        | `isValid`, `hasPermission`         |
| `validate*` / `parse*` | `validateInput`, `parseDate`       |
| `format*`              | `formatNumber`                     |
| `handle*`              | `handleSubmit`                     |
| `on*`                  | `onSelect`                         |
| `render*`              | `renderEmpty`                      |
| `use*`                 | `useRoutes`                        |
| `build*`               | `buildQuery`                       |
| `resolve*`             | `resolveRoute`                     |
| `compute*`             | `computeTotal`                     |
| `map*`                 | `mapProblemToActions`              |

Gunakan nama domain yang spesifik: `routeList`, bukan `data`; `filteredRoutes`, bukan `temp`; `transformRoutes`, bukan `processData`.

---

## 6. Zod Schema Naming

- File: `<action>-<domain>.schema.ts`.
- Schema variable: `<Name>Schema`.
- Inferred input: `<Name>Input`.
- Jangan gunakan `ZodSchema`, `Validation`, atau prefix `I`.

```ts
export const LoginSchema = z.object({
  email: z.string().email().max(254),
  password: z.string().min(8).max(128),
});

export type LoginInput = z.infer<typeof LoginSchema>;

export const CreateRouteSchema = z.object({
  path: z.string().min(1).max(256),
  method: z.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']),
  upstream: z.string().url(),
  timeoutMs: z.coerce.number().int().min(100).max(60_000),
  enabled: z.boolean().default(true),
});

export type CreateRouteInput = z.infer<typeof CreateRouteSchema>;
```

---

## 7. Query Key Naming

- Semua key berada di `lib/api/query-keys.ts`.
- Root domain berupa camelCase plural.
- Sub-key menggunakan `all`, `list`, dan `detail`.
- Filter berupa object.
- Gunakan `as const`.

```ts
export const queryKeys = {
  overview: ['overview'] as const,
  routes: {
    all: ['routes'] as const,
    list: (filters: RouteFilters) => ['routes', 'list', filters] as const,
    detail: (id: string) => ['routes', 'detail', id] as const,
  },
  tenants: {
    all: ['tenants'] as const,
    list: (filters: TenantFilters) => ['tenants', 'list', filters] as const,
  },
  apiKeys: {
    all: ['api-keys'] as const,
    list: (filters: ApiKeyFilters) => ['api-keys', 'list', filters] as const,
  },
} as const;
```

Gunakan `queryKeys.routes.list({ page, q })`, bukan beberapa positional argument. Jangan membuat key inline di komponen.

---

## 8. API Endpoint Naming

- File: `<domain>.ts`.
- Export: `<domain>Api`.
- Method: `list`, `get`, `create`, `update`, `remove`, atau action spesifik.
- URL path memakai kebab-case.

```ts
export const routesApi = {
  list(filters: RouteFilters): Promise<ApiResult<RouteList>> {},
  get(id: string): Promise<ApiResult<Route>> {},
  create(input: CreateRouteInput): Promise<ApiResult<Route>> {},
  update(id: string, input: UpdateRouteInput): Promise<ApiResult<Route>> {},
  remove(id: string): Promise<ApiResult<null>> {},
  reload(): Promise<ApiResult<ReloadResult>> {},
};
```

Gunakan `remove`, bukan `delete`, untuk method API domain. Jangan menamai API singular (`routeApi`) atau menggunakan `getRoutes()` untuk domain endpoint.

---

## 9. Zustand Store Naming

- File: `<concern>.ts`.
- Store export: `use<Concern>Store`.
- State: `<Concern>State`.
- Actions menggunakan verb.

```ts
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  setSession: (token, user) => {},
  clearSession: () => {},
}));

export const useBannerStore = create<BannerState>((set) => ({
  banners: [],
  push: (banner) => {},
  dismiss: (id) => {},
  clear: () => {},
}));
```

Jangan menaruh server data di Zustand. Jangan menamai store sebagai `authStore` tanpa prefix `use`.

---

## 10. Test File Naming

- File: `<source>.spec.ts` atau `.spec.tsx`.
- Lokasi: `__tests__/` di folder yang relevan.
- `describe` menggunakan nama unit.
- `it` menjelaskan perilaku, bukan `should work`.

```text
lib/api/__tests__/problem-detail.spec.ts
lib/schemas/__tests__/login.schema.spec.ts
hooks/__tests__/use-routes.spec.ts
components/ui/__tests__/button.spec.tsx
components/features/routes/__tests__/route-table.spec.tsx
```

```ts
describe('isProblemDetail', () => {
  it('accepts valid problem detail', () => {
    expect(isProblemDetail(VALID)).toBe(true);
  });

  it('rejects missing requestId', () => {
    expect(isProblemDetail({ type: 'about:blank' })).toBe(false);
  });
});
```

---

## 11. CSS Class dan Token Naming

- Tailwind utility-first.
- CSS variable: `--kebab-case`.
- Gunakan semantic token, bukan hardcoded hex.
- Custom class jarang; utamakan composition.

```tsx
<div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-4" />
```

```css
:root {
  --surface-base: var(--neutral-50);
}
```

Dilarang `--SurfaceBase`, `--surface_base`, class `RouteTable`, dan custom class jika utility Tailwind adequate.

---

## 12. Branch dan Commit Naming

Branch: `<type>/<kebab-case>`.

```text
feat/routes-crud
fix/error-boundary
docs/frontend-api
test/route-table
chore/update-deps
```

Commit menggunakan Conventional Commits:

```text
feat(dashboard): add routes CRUD page
fix(dashboard): handle session expiry redirect
docs(dashboard): add frontend documentation
refactor(dashboard): extract query keys
test(dashboard): add problem-detail tests
chore(dashboard): update Next.js
```

Type: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `perf`, `style`.

---

## 13. Environment Variable Naming

- Client: `NEXT_PUBLIC_<SCREAMING_SNAKE>`.
- Server: `<SCREAMING_SNAKE>` tanpa `NEXT_PUBLIC_`.
- Secret tidak boleh memiliki prefix public.

```bash
NEXT_PUBLIC_API_URL=http://localhost:7300
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_ENVIRONMENT=development
JWT_SECRET=...
DATABASE_URL=...
```

`NEXT_PUBLIC_JWT_SECRET`, `NEXT_PUBLIC_DB_PASSWORD`, dan nama secret public lainnya dilarang.

---

## 14. HTTP Header Naming

- Standard header: Title-Case.
- Custom header: `X-Title-Case`.
- Constant object: `SCREAMING_SNAKE` keys.

```ts
export const HEADERS = {
  REQUEST_ID: 'X-Request-ID',
  TENANT_ID: 'X-Tenant-ID',
  RATE_LIMIT_LIMIT: 'X-RateLimit-Limit',
  RATE_LIMIT_REMAINING: 'X-RateLimit-Remaining',
  RATE_LIMIT_RESET: 'X-RateLimit-Reset',
  IDEMPOTENCY_KEY: 'Idempotency-Key',
  AUTHORIZATION: 'Authorization',
  CONTENT_TYPE: 'Content-Type',
} as const;
```

---

## 15. Cheat Sheet

| Tipe           | Format              | Contoh                        |
| -------------- | ------------------- | ----------------------------- |
| Component file | `kebab-case.tsx`    | `route-table.tsx`             |
| Hook file      | `use-kebab-case.ts` | `use-routes.ts`               |
| Schema file    | `*.schema.ts`       | `create-route.schema.ts`      |
| Test file      | `*.spec.tsx`        | `route-table.spec.tsx`        |
| Component      | `PascalCase`        | `RouteTable`                  |
| Hook           | `useCamelCase`      | `useRoutes`                   |
| Type           | `PascalCase`        | `RouteTableProps`             |
| Variable       | `camelCase`         | `routeList`                   |
| Boolean        | `is/has/can/should` | `isLoading`                   |
| Function       | `camelCase` + verb  | `handleSubmit`                |
| Event prop     | `on*`               | `onSelect`                    |
| Constant       | `SCREAMING_SNAKE`   | `MAX_PAGE_SIZE`               |
| Schema         | `PascalCaseSchema`  | `LoginSchema`                 |
| Query key      | `queryKeys.routes`  | `queryKeys.routes.all`        |
| API            | `<domain>Api`       | `routesApi`                   |
| Store          | `use<Concern>Store` | `useAuthStore`                |
| CSS variable   | `--kebab-case`      | `--surface-base`              |
| Branch         | `type/kebab-case`   | `feat/routes-crud`            |
| Commit         | `type(scope): desc` | `feat(dashboard): add routes` |

### Dilarang

| Anti-pattern                            | Ganti                                          |
| --------------------------------------- | ---------------------------------------------- |
| `IRoute`                                | `Route`                                        |
| `RouteType` / `RouteDTO`                | `Route` atau `CreateRouteInput`                |
| `Component`, `Container`, `View` suffix | Suffix bermakna                                |
| `data`, `obj`, `temp`, `x`              | Nama domain spesifik                           |
| `RoutesTable`                           | `RouteTable`                                   |
| `routeApi`                              | `routesApi`                                    |
| `Route_table`                           | `route-table` atau `RouteTable` sesuai konteks |
| `route1`, `route2`                      | Nama bermakna                                  |
| `class` sebagai variable                | `className` atau `remove`                      |
| `CreateRoute` sebagai type              | `CreateRouteInput`                             |
| Noun sebagai function                   | Verb yang jelas                                |

---

## 16. Contoh Konversi

### Sebelum

```tsx
// components/RoutesTable.tsx
export function RoutesTable({ data }: any) {
  const [selectedRoute, setSelectedRoute] = useState();
  function handleOnClick(id: string) {}
}
```

### Sesudah

```tsx
// components/features/routes/route-table.tsx
export type RouteTableProps = Readonly<{
  data: readonly Route[];
  onSelect: (id: string) => void;
}>;

export function RouteTable({ data, onSelect }: RouteTableProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleRowClick(id: string): void {
    onSelect(id);
  }
}
```

| Sebelum              | Sesudah                           |
| -------------------- | --------------------------------- |
| `RoutesTable.tsx`    | `route-table.tsx`                 |
| `RoutesTable`        | `RouteTable`                      |
| `any`                | `RouteTableProps`                 |
| `selectedRoute`      | `selectedId`                      |
| `setLoading`         | `setIsLoading`                    |
| `handleOnClick`      | `handleRowClick`                  |
| `routes_api`         | `routesApi`                       |
| `process.env.apiUrl` | `process.env.NEXT_PUBLIC_API_URL` |
| `routesResponse`     | `RouteResponse`                   |

---

## 17. Checklist Sebelum Commit

### File dan component

- [ ] File `kebab-case` dengan extension benar.
- [ ] Suffix dan lokasi sesuai.
- [ ] Component `PascalCase` dan named export.
- [ ] Props type `<ComponentName>Props`.
- [ ] Tidak ada suffix `Component`, `Container`, `View`.

### Hook dan type

- [ ] Hook berawalan `use` dan file `use-kebab-case.ts`.
- [ ] Type `PascalCase` tanpa prefix `I`.
- [ ] Suffix `Input`, `Response`, `Filters`, atau `Props` bermakna.
- [ ] Property immutable menggunakan `readonly`.

### Value dan API

- [ ] Variable `camelCase`.
- [ ] Boolean diawali `is/has/can/should`.
- [ ] Function memiliki verb.
- [ ] Constant `SCREAMING_SNAKE`.
- [ ] API export `<domain>Api` dan method konsisten.
- [ ] Query key berasal dari `queryKeys`.

### Store, schema, dan test

- [ ] Zustand export `use<Concern>Store`.
- [ ] Action berupa verb.
- [ ] Zod schema berakhiran `Schema`.
- [ ] Test berakhiran `.spec.ts(x)` dan berada di `__tests__/`.

### Repository hygiene

- [ ] Branch mengikuti `<type>/<kebab-case>`.
- [ ] Commit mengikuti Conventional Commits.
- [ ] Environment variable public tidak menyimpan secret.
- [ ] Tidak ada `I<Type>`, `any`, atau nama generik.

---

## 18. Referensi

- `AGENTS.md`
- `FRONTEND-PATTERNS.md`
- `FRONTEND-COMPONENTS.md`
- `FRONTEND-DATA-FLOW.md`
- `RULES.md`
- TypeScript Handbook: https://www.typescriptlang.org/docs/handbook/
- Next.js Docs: https://nextjs.org/docs
- Conventional Commits: https://www.conventionalcommits.org/

---

## 19. Ringkasan Satu Baris

> **File `kebab-case`, Component `PascalCase`, Hook `use*`, Type `PascalCase` tanpa prefix `I`, Variable `camelCase`, Boolean `is/has/can/should`, Constant `SCREAMING_SNAKE`, Zod `*Schema`, Query key plural, API `*Api`, Zustand `use*Store`, dan Test `*.spec.ts`.**

---

**FRONTEND-NAMING.md v1.0.0 — Approved**

## Status Dokumen

| Dokumen                      | Status   |
| ---------------------------- | -------- |
| `FRONTEND-API-CONTRACT.md`   | Approved |
| `FRONTEND-ERROR-HANDLING.md` | Approved |
| `FRONTEND-DATA-FLOW.md`      | Approved |
| `FRONTEND-SECURITY.md`       | Approved |
| `FRONTEND-COMPONENTS.md`     | Approved |
| `FRONTEND-NAMING.md`         | Approved |
| `FRONTEND-TESTING.md`        | Next     |
| `FRONTEND-PERFORMANCE.md`    | Next     |
| `FRONTEND-ACCESSIBILITY.md`  | Next     |
