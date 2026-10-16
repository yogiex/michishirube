# FRONTEND-COMPONENTS.md — Michishirube Dashboard

| Field           | Value                                                                                                      |
| --------------- | ---------------------------------------------------------------------------------------------------------- |
| Versi           | 1.0.0                                                                                                      |
| Status          | Approved                                                                                                   |
| Berlaku untuk   | `apps/dashboard/`                                                                                          |
| Dokumen Terkait | `AGENTS.md`, `FRONTEND-DESIGN.md`, `FRONTEND-PATTERNS.md`, `FRONTEND-DATA-FLOW.md`, `FRONTEND-SECURITY.md` |
| Tujuan          | Inventory komponen — gunakan kembali sebelum membuat komponen baru                                         |

---

## 0. Prinsip Komponen

### 0.1 Lima Aturan Emas

| Aturan                             | Konsekuensi                                         |
| ---------------------------------- | --------------------------------------------------- |
| Satu komponen, satu tanggung jawab | Jangan gabung concern berbeda                       |
| Composition over configuration     | Gunakan composition dan props, bukan banyak boolean |
| Server Component default           | `'use client'` hanya bila membutuhkan interaksi     |
| Props `readonly`                   | Immutability sesuai `AGENTS.md`                     |
| Reuse sebelum membuat baru         | Cek inventory komponen terlebih dahulu              |

### 0.2 Struktur dan Dependency

```text
components/
├── ui/         Primitive button, input, badge, dll
├── layout/     Shell-level sidebar, topbar, navigation
├── shared/     Reusable lintas fitur
├── banners/    Degradation dan offline banner
└── features/   Komponen spesifik domain
```

| Layer       | Boleh import                  | Dilarang import                        |
| ----------- | ----------------------------- | -------------------------------------- |
| `ui/`       | `lib/utils`, `lib/design`     | `features`, `shared`, `layout`         |
| `layout/`   | `ui`, `shared`, `lib/*`       | `features`                             |
| `shared/`   | `ui`, `lib/*`                 | `features`, `layout`                   |
| `banners/`  | `ui`, `shared`, `lib/banners` | `features`, `layout`                   |
| `features/` | `ui`, `shared`, `lib/*`       | Feature lain tanpa alasan arsitektural |

### 0.3 Naming

| Tipe        | Format              | Contoh            |
| ----------- | ------------------- | ----------------- |
| File        | `kebab-case.tsx`    | `route-table.tsx` |
| Component   | `PascalCase`        | `RouteTable`      |
| Props       | `PascalCaseProps`   | `RouteTableProps` |
| Boolean     | `is/has/can/should` | `isLoading`       |
| Event       | `on*`               | `onSelect`        |
| Render prop | `render*`           | `renderEmpty`     |

---

## 1. UI Primitives (`components/ui/`)

### Button

**Path:** `components/ui/button.tsx`

```ts
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  readonly variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  readonly size?: 'sm' | 'md' | 'lg';
  readonly loading?: boolean;
};
```

- `primary`: aksi utama.
- `secondary`: aksi sekunder.
- `ghost`: aksi tersier.
- `danger`: delete, revoke, destructive action.
- `loading` otomatis menonaktifkan button dan menambah `aria-busy`.
- Gunakan `Button`, bukan `<div onClick>` atau button style duplikat.

### Input

**Path:** `components/ui/input.tsx`

```ts
export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  readonly invalid?: boolean;
};
```

- Gunakan `aria-invalid` dan `autoComplete` yang sesuai.
- Parent form menggunakan `noValidate` bila validasi Zod.
- Gunakan `Input`, bukan input mentah yang tidak konsisten.

### Skeleton

**Path:** `components/ui/skeleton.tsx`

```ts
export type SkeletonProps = {
  readonly className?: string;
};
```

- Server-compatible.
- Gunakan `role="status"` dan accessible loading label.
- Match ukuran konten agar tidak menyebabkan pergeseran layout.
- Untuk loading singkat, tampilkan teks `Memuat…` sebagai fallback.

### StatusBadge

**Path:** `components/ui/badge.tsx`

```ts
export type StatusBadgeProps = {
  readonly severity: 'healthy' | 'warning' | 'critical' | 'neutral' | 'info';
  readonly label: string;
};
```

Severity:

| Severity   | Warna   | Dot     |
| ---------- | ------- | ------- |
| `healthy`  | emerald | emerald |
| `warning`  | amber   | amber   |
| `critical` | red     | red     |
| `info`     | sky     | sky     |
| `neutral`  | neutral | neutral |

Selalu gunakan dot indicator, `text-xs`, `font-medium`, dan radius penuh.

### Tooltip

**Path:** `components/ui/tooltip.tsx`

```ts
export type TooltipProps = {
  readonly content: string;
  readonly children: React.ReactNode;
  readonly side?: 'top' | 'bottom' | 'left' | 'right';
};
```

Gunakan untuk informasi tambahan yang singkat. Jangan gunakan tooltip untuk informasi penting atau panjang.

---

## 2. Layout Components (`components/layout/`)

### Shell

**Path:** `components/layout/shell.tsx`

- Wrap seluruh dashboard.
- Hydrate auth/sidebar.
- Redirect ke login bila session tidak valid.
- Render sidebar, topbar, banner stack, dan offline banner.
- Jangan mount Shell di root `app/layout.tsx`; pasang pada dashboard layout.

### Sidebar

**Path:** `components/layout/sidebar.tsx`

```ts
export type SidebarProps = {
  readonly collapsed: boolean;
  readonly onToggle: () => void;
};
```

- Navigasi utama dan filter berdasarkan role.
- Persist collapsed state.
- Menu/config dipisah dari JSX.
- `React.memo` untuk render berat.

### NavItem

**Path:** `components/layout/nav-item.tsx`

```ts
export type NavItemLinkProps = {
  readonly item: NavItem;
  readonly collapsed: boolean;
};
```

- `aria-current="page"` untuk active route.
- `React.memo` dan prefetch Next.js.
- Filter role tetap wajib di backend.

### Topbar

**Path:** `components/layout/topbar.tsx`

- Sticky, breadcrumb, user menu, dan future search/notification.
- `React.memo` untuk mengurangi render.

### Breadcrumb

**Path:** `components/layout/breadcrumb.tsx`

- Generate dari pathname.
- Parent link dapat diklik.
- Gunakan `aria-label="Breadcrumb"` dan separator dekoratif yang di-`aria-hidden`.

### UserMenu

**Path:** `components/layout/user-menu.tsx`

```ts
export type UserMenuProps = {
  readonly user: AuthUser;
};
```

- Tampilkan avatar, email, role, dan logout.
- Tutup saat outside click.
- Gunakan `aria-haspopup` dan `aria-expanded`.
- Logout membersihkan session lalu redirect.

---

## 3. Shared Components (`components/shared/`)

### ErrorState

**Path:** `components/shared/error-state.tsx`

```ts
export type ErrorStateProps = {
  readonly problem: ProblemDetail;
  readonly onRetry?: () => void;
};
```

Tampilkan user message yang aman, code, dan `RequestIdCopy`. Retry bersifat opsional. Jangan render `problem.detail` mentah.

### ErrorToast

**Path:** `components/shared/error-toast.tsx`

`showProblemToast(problem)` harus digunakan untuk error transient. Sertakan code dan request ID; jangan melakukan `toast.error(problem.detail)`.

### RequestIdCopy

**Path:** `components/shared/request-id-copy.tsx`

```ts
export type RequestIdCopyProps = {
  readonly id: string;
};
```

Copy request ID ke clipboard, tampilkan feedback singkat, truncate display, dan gagal secara silent jika clipboard tidak tersedia.

### QueryErrorBoundary

**Path:** `components/shared/query-error-boundary.tsx`

```ts
export type QueryErrorBoundaryProps = {
  readonly children: React.ReactNode;
  readonly fallback?: (error: Error) => React.ReactNode;
};
```

Isolasi error per widget, log dengan scope aman, dan tampilkan retry. Jangan membungkus seluruh page karena sudah ada route error boundary.

### SuspenseFallback

**Path:** `components/shared/suspense-fallback.tsx`

| Komponen           | Props           | Gunakan untuk |
| ------------------ | --------------- | ------------- |
| `KpiStripSkeleton` | —               | KPI loading   |
| `TableSkeleton`    | `rows?: number` | Table loading |
| `ChartSkeleton`    | —               | Chart loading |
| `FormSkeleton`     | —               | Form loading  |

Fallback harus match layout, accessible, dan mencegah CLS.

### EmptyState

**Path:** `components/shared/empty-state.tsx`

```ts
export type EmptyStateProps = {
  readonly icon: LucideIcon;
  readonly title: string;
  readonly description: string;
  readonly action?: {
    readonly label: string;
    readonly onClick: () => void;
  };
};
```

Empty state berbeda dari error state. Sertakan CTA bila actionable dan gunakan border dashed.

### PageHeader

**Path:** `components/shared/page-header.tsx`

```ts
export type PageHeaderProps = {
  readonly title: string;
  readonly description?: string;
  readonly action?: {
    readonly label: string;
    readonly href?: string;
    readonly onClick?: () => void;
  };
};
```

Gunakan satu action utama di sisi kanan.

### DataTable

**Path:** `components/shared/data-table.tsx`

```ts
export type DataTableProps<T> = {
  readonly data: readonly T[];
  readonly columns: readonly ColumnDef<T>[];
  readonly onRowClick?: (row: T) => void;
  readonly emptyState?: React.ReactNode;
  readonly isLoading?: boolean;
};
```

Gunakan wrapper TanStack Table untuk seluruh list, termasuk empty/loading state.

### Pagination

**Path:** `components/shared/pagination.tsx`

```ts
export type PaginationProps = {
  readonly page: number;
  readonly totalPages: number;
  readonly onPageChange: (page: number) => void;
};
```

Page dan total pages berasal dari URL/API. Disable prev di halaman pertama dan next di halaman terakhir.

### CopyButton

**Path:** `components/shared/copy-button.tsx`

```ts
export type CopyButtonProps = {
  readonly value: string;
  readonly label?: string;
  readonly display?: string;
};
```

Clipboard error ditangani silent, tampilkan feedback singkat, dan selalu sediakan `aria-label`.

---

## 4. Banner Components (`components/banners/`)

### BannerStack

**Path:** `components/banners/banner-stack.tsx`

Render banner aktif dengan priority critical > warning, maksimum tiga banner, deduplikasi berdasarkan kind, dan `role="region"`.

### DegradationBanner

**Path:** `components/banners/degradation-banner.tsx`

```ts
export type DegradationBannerProps = {
  readonly banner: Banner;
  readonly onDismiss: (id: string) => void;
};
```

- Critical tidak dismissible.
- Warning memiliki auto-dismiss policy.
- Gunakan `role="alert"` dan `aria-live`.
- Tampilkan countdown dan request ID bila tersedia.

### OfflineBanner

**Path:** `components/banners/offline-banner.tsx`

Deteksi status online dengan `useSyncExternalStore`, bukan `useEffect` + `useState`. Gunakan `role="alert"`.

---

## 5. Feature Components (`components/features/`)

### Overview

| Komponen         | Path                                    | Type   | Fungsi                          |
| ---------------- | --------------------------------------- | ------ | ------------------------------- |
| `KpiStrip`       | `features/overview/kpi-strip.tsx`       | Server | RPS, error, p95, Redis, CB open |
| `TrafficChart`   | `features/overview/traffic-chart.tsx`   | Client | Traffic dan anomaly             |
| `AlertsPanel`    | `features/overview/alerts-panel.tsx`    | Server | Alert list                      |
| `UpstreamHealth` | `features/overview/upstream-health.tsx` | Server | Health upstream                 |

`TrafficChart` yang besar harus dynamic import dengan SSR disabled.

### Routes

| Komponen      | Type   | Fungsi                                       |
| ------------- | ------ | -------------------------------------------- |
| `RouteTable`  | Client | Table dengan `DataTable` dan row selection   |
| `RouteDrawer` | Client | Detail, edit, delete                         |
| `RouteForm`   | Client | RHF + Zod, create/edit, server error mapping |

### Tenants

`TenantTable`, `TenantDrawer`, dan `TenantForm` mengikuti pola Routes. Jangan menduplikasi logic validasi atau table.

### API Keys

- `ApiKeyTable`: daftar key dengan status dan metadata aman.
- `IssueKeyModal`: secret hanya tampil sekali setelah issue.
- `RevokeConfirm`: konfirmasi destructive action.

Secret API key wajib diberi warning untuk segera disimpan, tidak ditampilkan lagi, copyable, dan tidak masuk log.

### Config

- `FileTree`: navigasi file konfigurasi.
- `YamlEditor`: dynamic import Monaco/CodeMirror dengan SSR disabled.

### Metrics

- `ChartCard`: server-compatible wrapper untuk title/actions.
- `TimeSeriesChart`: client chart.
- `StateTimeline`: timeline CB dengan warna closed/half-open/open.
- `AutoRefreshToggle`: control polling client-side.

### Audit

- `AuditTable`: list audit.
- `AuditFilters`: filter URL state.
- `AuditDetailDrawer`: detail audit tanpa membocorkan internal data.

### Settings

- `SettingsTabs`: tab navigasi.
- `GeneralForm`: konfigurasi umum.
- `SecurityForm`: security-related settings dengan Zod dan konfirmasi.

---

## 6. Component Decision Matrix

| Butuh           | Gunakan                      | Jangan gunakan                   |
| --------------- | ---------------------------- | -------------------------------- |
| Aksi utama      | `Button variant="primary"`   | `<button>` mentah                |
| Aksi sekunder   | `Button variant="secondary"` | Link yang dipaksa seperti button |
| Status          | `StatusBadge`                | Warna manual                     |
| Loading text    | `Skeleton`                   | Spinner tanpa konteks            |
| Loading action  | `Button loading`             | Spinner terpisah                 |
| Error page      | `ErrorState`                 | Toast                            |
| Error widget    | `QueryErrorBoundary`         | Manual try/catch                 |
| Error transient | `showProblemToast`           | Alert browser                    |
| Data kosong     | `EmptyState`                 | Render `null`                    |
| Detail          | Drawer                       | Modal                            |
| Create          | Modal                        | Drawer                           |
| List            | `DataTable`                  | Table custom                     |
| Pagination      | `Pagination`                 | Button manual                    |
| Copy            | `CopyButton`/`RequestIdCopy` | Clipboard logic manual           |

### Red Flags

- `<button>` langsung → gunakan `Button`.
- `<input>` langsung → gunakan `Input`.
- Manual clipboard → gunakan komponen copy.
- Manual error toast → gunakan `showProblemToast`.
- Table manual → gunakan `DataTable`.
- Modal/drawer custom → gunakan shadcn Dialog/Sheet.

---

## 7. Composition Patterns

### CRUD Page

Server page melakukan initial fetch, lalu client leaf menangani interaksi:

```tsx
export default async function RoutesPage() {
  const result = await routesApi.list({ page: 1 });
  if (!result.ok) return <ErrorState problem={result.error} />;

  return (
    <div className="space-y-6">
      <PageHeader title="Routes" />
      <RoutesClient initialData={result.value} />
    </div>
  );
}
```

`RoutesClient` memiliki local state untuk selected ID, create modal, dan table/drawer composition. Jangan memindahkan server state ke local state.

### Widget Error Boundary

```tsx
<QueryErrorBoundary>
  <Suspense fallback={<ChartSkeleton />}>
    <MetricsCharts range={range} />
  </Suspense>
</QueryErrorBoundary>
```

### Server Error pada Form

```ts
if (!result.ok) {
  for (const fieldError of result.error.errors ?? []) {
    form.setError(fieldError.field as keyof FormInput, {
      type: 'server',
      message: fieldError.message,
    });
  }
  form.setFocus(result.error.errors?.[0]?.field as keyof FormInput);
  return;
}
```

---

## 8. Anti-Pattern

| Anti-pattern                    | Ganti dengan            |
| ------------------------------- | ----------------------- |
| `<button>` langsung             | `<Button>`              |
| `<input>` langsung              | `<Input>`               |
| `<div onClick>`                 | Button accessible       |
| Manual clipboard                | `CopyButton`            |
| Manual error toast              | `showProblemToast`      |
| `dangerouslySetInnerHTML`       | Plain text              |
| Table tanpa wrapper             | `DataTable`             |
| Modal fixed manual              | Dialog                  |
| Drawer transform manual         | Sheet                   |
| `any` di props                  | Explicit type           |
| Banyak boolean props            | Object/composition      |
| Komponen > 150 baris            | Split by responsibility |
| `useEffect` untuk derived state | Compute inline          |

---

## 9. Checklist Sebelum Membuat Komponen Baru

### Reuse

- [ ] `components/ui/` sudah dicek.
- [ ] `components/shared/` sudah dicek.
- [ ] `components/features/` sudah dicek.
- [ ] Komponen existing tidak cukup atau tidak dapat di-extend.

### Struktur dan type

- [ ] File berada pada folder yang tepat.
- [ ] Nama file `kebab-case.tsx`.
- [ ] Export component `PascalCase`.
- [ ] Props `PascalCaseProps` dan `readonly`.
- [ ] Tidak ada `any` atau `as unknown as`.
- [ ] Default value eksplisit.

### Server/client

- [ ] Default Server Component.
- [ ] `'use client'` hanya bila diperlukan.
- [ ] Client boundary berada di leaf.

### Styling dan a11y

- [ ] Tailwind dan semantic token.
- [ ] Spacing konsisten.
- [ ] `aria-*` sesuai kebutuhan.
- [ ] Keyboard accessible dan focus visible.
- [ ] Icon-only control memiliki accessible name.

### Performance

- [ ] `React.memo` untuk komponen berat.
- [ ] `useMemo` hanya untuk compute mahal.
- [ ] `useCallback` hanya bila dapat mencegah rerender mahal.
- [ ] Dynamic import untuk library besar.

---

## 10. Reference Implementation — Button

```tsx
import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

const VARIANT: Record<Variant, string> = {
  primary: 'bg-[var(--action-primary)] text-white',
  secondary: 'border border-[var(--border-default)] bg-[var(--surface-raised)]',
  ghost: 'text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]',
  danger: 'bg-[var(--action-danger)] text-white',
};

const SIZE: Record<Size, string> = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-9 px-4 text-sm',
  lg: 'h-11 px-6 text-base',
};

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  readonly variant?: Variant;
  readonly size?: Size;
  readonly loading?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = 'primary',
      size = 'md',
      loading,
      disabled,
      className,
      children,
      ...rest
    },
    ref,
  ) {
    return (
      <button
        ref={ref}
        disabled={disabled ?? loading}
        aria-busy={loading ? true : undefined}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)]',
          'disabled:cursor-not-allowed disabled:opacity-50',
          VARIANT[variant],
          SIZE[size],
          className,
        )}
        {...rest}
      >
        {loading ? (
          <span
            className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent"
            aria-hidden="true"
          />
        ) : null}
        {children}
      </button>
    );
  },
);
```

---

## 11. Referensi

- `AGENTS.md`
- `FRONTEND-DESIGN.md`
- `FRONTEND-PATTERNS.md`
- `FRONTEND-DATA-FLOW.md`
- `FRONTEND-SECURITY.md`
- shadcn/ui: https://ui.shadcn.com/
- TanStack Table: https://tanstack.com/table
- Radix UI: https://www.radix-ui.com/

---

## 12. Ringkasan Satu Baris

> **UI primitives, layout, shared states, banners, dan feature components harus reusable, typed `readonly`, accessible, server-first, client-only di leaf, dan memakai semantic design tokens.**

---

**FRONTEND-COMPONENTS.md v1.0.0 — Approved**

## Status Dokumen

| Dokumen                      | Status   |
| ---------------------------- | -------- |
| `FRONTEND-API-CONTRACT.md`   | Approved |
| `FRONTEND-ERROR-HANDLING.md` | Approved |
| `FRONTEND-DATA-FLOW.md`      | Approved |
| `FRONTEND-SECURITY.md`       | Approved |
| `FRONTEND-COMPONENTS.md`     | Approved |
| `FRONTEND-NAMING.md`         | Next     |
| `FRONTEND-TESTING.md`        | Next     |
| `FRONTEND-PERFORMANCE.md`    | Next     |
| `FRONTEND-ACCESSIBILITY.md`  | Next     |
