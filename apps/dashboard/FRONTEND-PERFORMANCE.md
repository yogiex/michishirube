# FRONTEND-PERFORMANCE.md — Michishirube Dashboard

| Field           | Value                                                                                                        |
| --------------- | ------------------------------------------------------------------------------------------------------------ |
| Versi           | 1.0.0                                                                                                        |
| Status          | Approved                                                                                                     |
| Berlaku untuk   | `apps/dashboard/`                                                                                            |
| Dokumen Terkait | `AGENTS.md`, `FRONTEND-DESIGN.md`, `FRONTEND-PATTERNS.md`, `FRONTEND-DATA-FLOW.md`, `FRONTEND-COMPONENTS.md` |
| Target          | Core Web Vitals hijau, first-load bundle < 200 KB                                                            |
| Standar         | Web Vitals, Lighthouse 90+, HTTP Archive                                                                     |

---

## 0. Prinsip Dasar

### 0.1 Lima Pilar Performance

1. **Server-first**: render HTML di server, kirim JS seminimal mungkin.
2. **Ship less JS**: setiap KB memiliki biaya parse dan execute.
3. **Cache aggressively**: static lebih diutamakan daripada dynamic.
4. **Measure, don't guess**: gunakan data, bukan opini.
5. **Budget-driven**: setiap perubahan harus memenuhi budget atau punya justifikasi.

### 0.2 Performance Budget

| Metrik                 |   Target |    Hard Limit |
| ---------------------- | -------: | ------------: |
| LCP                    |   < 2.0s |        < 2.5s |
| INP                    |  < 150ms |       < 200ms |
| CLS                    |   < 0.05 |         < 0.1 |
| TTFB                   |  < 500ms |       < 800ms |
| FCP                    |   < 1.5s |        < 1.8s |
| TBT                    |  < 200ms |       < 300ms |
| First-load bundle      | < 150 KB | < 200 KB gzip |
| Per-route bundle       |  < 50 KB |  < 80 KB gzip |
| Lighthouse Performance |     ≥ 95 |          ≥ 90 |
| Image per page         | < 500 KB |        < 1 MB |
| Total font             | < 100 KB |      < 150 KB |

PR yang melewati hard limit wajib menyertakan justifikasi dan rencana perbaikan.

### 0.3 Measurement Tools

| Tool                            | Kapan        | Metrik                         |
| ------------------------------- | ------------ | ------------------------------ |
| Lighthouse                      | CI dan local | Lab metrics dan best practices |
| `@next/bundle-analyzer`         | Build        | Komposisi bundle               |
| Chrome DevTools Performance     | Manual       | Runtime profiling              |
| `useReportWebVitals`            | Production   | RUM                            |
| Vercel Analytics/Speed Insights | Production   | RUM dan Web Vitals             |
| WebPageTest                     | Manual       | Waterfall dan filmstrip        |

---

## 1. Core Web Vitals

### 1.1 LCP — Largest Contentful Paint

Target < 2.0s, hard limit < 2.5s. LCP mengukur elemen terbesar seperti heading, hero, atau chart.

Strategi:

- Render above-fold dengan Server Component.
- Gunakan `next/font` dengan preload.
- Gunakan `next/image` dengan `priority` hanya untuk above-fold image.
- Hindari client fetch untuk LCP element.
- Gunakan streaming SSR dan Suspense dengan fallback cepat.

```tsx
export default async function OverviewPage() {
  const result = await overviewApi.get();
  if (!result.ok) return <ErrorState problem={result.error} />;
  return <KpiStrip data={result.value} />;
}
```

### 1.2 INP — Interaction to Next Paint

Target < 150ms, hard limit < 200ms. Hindari long task lebih dari 50ms.

- Pecah pekerjaan berat menjadi chunk.
- Gunakan `startTransition` untuk update non-urgent.
- Debounce search/filter.
- Gunakan `useDeferredValue` untuk list besar.
- Virtualisasi list lebih dari 100 row.
- Web Worker untuk komputasi berat.

```tsx
const [isPending, startTransition] = useTransition();

function handleChange(value: string): void {
  setQuery(value);
  startTransition(() => updateFilter('q', value));
}
```

### 1.3 CLS — Cumulative Layout Shift

Target < 0.05, hard limit < 0.1.

| Penyebab            | Solusi                               |
| ------------------- | ------------------------------------ |
| Image tanpa dimensi | `next/image` dengan width/height     |
| Font swap           | `next/font` dengan `display: 'swap'` |
| Dynamic content     | Skeleton dengan ukuran sama          |
| Banner mendadak     | Reserve space atau fixed region      |
| Iframe/embed        | Dimensi eksplisit                    |

Skeleton harus match layout konten asli untuk mencegah layout shift.

---

## 2. Server-First Rendering

Semua `page.tsx` default Server Component. Client Component hanya untuk event handler, browser API, hooks, chart/editor client-only, atau interaksi.

```tsx
export default async function TenantsPage() {
  const result = await tenantsApi.list({ page: 1 });
  if (!result.ok) return <ErrorState problem={result.error} />;
  return <TenantTable data={result.value.data} />;
}
```

Jangan menaruh `'use client'` di page, layout root, atau komponen yang hanya merender data. Letakkan boundary di leaf interaktif.

---

## 3. Code Splitting

Next.js App Router melakukan route-based splitting secara otomatis. Dynamic import digunakan untuk chart, editor, dan komponen berat yang jarang digunakan.

```tsx
const TrafficChart = dynamic(
  () => import('./traffic-chart').then((module) => module.TrafficChart),
  { ssr: false, loading: () => <ChartSkeleton /> },
);
```

Jangan dynamic-import komponen kecil atau komponen above-fold yang kecil. Gunakan named import agar tree-shaking tetap bekerja.

```ts
experimental: {
  optimizePackageImports: ['lucide-react', '@radix-ui/react-icons', 'date-fns'],
}
```

Jalankan bundle analyzer setiap sprint dan investigasi dependency lebih dari 20 KB. Jangan commit folder hasil analyzer.

---

## 4. Caching

### 4.1 Server Cache

| Data          | Strategi                      |
| ------------- | ----------------------------- |
| Config statis | `force-cache`                 |
| Routes        | `revalidate: 60`              |
| Tenants       | `revalidate: 300`             |
| Metrics live  | `no-store`                    |
| Static assets | Immutable, max-age satu tahun |

```ts
const response = await fetch(`${baseUrl}/admin/routes`, {
  next: { revalidate: 60 },
});
```

### 4.2 TanStack Query

```ts
export function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000,
        gcTime: 5 * 60_000,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        retry: shouldRetry,
        retryDelay,
      },
      mutations: { retry: false },
    },
  });
}
```

| Endpoint                   | `staleTime` |
| -------------------------- | ----------: |
| Overview                   |         30s |
| Routes/tenants/API keys    |         60s |
| Audit                      |         15s |
| Circuit breakers/bulkheads |         10s |

Invalidate query key spesifik setelah mutation. Jangan `queryClient.clear()` karena menghapus seluruh cache dan memicu request berlebihan.

---

## 5. Image Optimization

- Format: AVIF > WebP > PNG/JPG.
- Lazy load by default; `priority` hanya above-fold.
- Width/height wajib.
- Gunakan `sizes` untuk responsive image.
- Gunakan `next/image`, bukan `<img>` mentah.
- SVG inline untuk icon; component logo preferred.

```tsx
<Image
  src="/logo.png"
  alt="Michishirube"
  width={120}
  height={40}
  priority
  sizes="120px"
/>
```

---

## 6. Font Optimization

Gunakan `next/font`, bukan link manual. Maksimal dua family, empat weight, dan format `.woff2`/subset Latin. Gunakan `display: 'swap'` dan preload hanya untuk font above-fold.

```tsx
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
});
```

Hindari semua weight dan subset yang tidak dipakai. Font swap harus tidak menggeser layout.

---

## 7. JavaScript Optimization

### Bundle Rules

| Aset              |        Budget |
| ----------------- | ------------: |
| First-load JS     | < 150 KB gzip |
| Per route         |  < 50 KB gzip |
| Shared chunks     | < 100 KB gzip |
| Single dependency |  < 30 KB gzip |

Audit dependency secara berkala. Pertimbangkan `date-fns`/`dayjs`, native `fetch`, `uPlot` atau chart ringan, serta `shadcn/ui` + Radix untuk Material UI.

Gunakan `useMemo` hanya untuk komputasi mahal dan `useCallback` hanya bila mencegah render mahal. Hindari barrel import; import langsung dari file tujuan.

`'use client'` harus berada di leaf. Jangan menaruhnya di `page.tsx` hanya karena satu child interaktif.

---

## 8. Rendering Strategies

| Route        | Strategi                    |
| ------------ | --------------------------- |
| `/login`     | Static                      |
| `/` overview | Dynamic/real-time           |
| `/routes`    | Dynamic                     |
| `/tenants`   | Dynamic                     |
| `/api-keys`  | Dynamic                     |
| `/metrics`   | Dynamic                     |
| `/audit`     | Dynamic                     |
| `/settings`  | Static shell + dynamic data |

Gunakan Suspense untuk streaming section independen. PPR menjadi target Sprint F4 bila stabil di environment aplikasi.

```tsx
<PageHeader title="Overview" />
<Suspense fallback={<KpiStripSkeleton />}>
  <KpiStrip />
</Suspense>
<Suspense fallback={<ChartSkeleton />}>
  <TrafficChart />
</Suspense>
```

---

## 9. Runtime Performance

- Selective Zustand subscription agar context/state tidak re-render seluruh halaman.
- Virtualisasi list lebih dari 100 rows dengan TanStack Virtual.
- Debounce input dan gunakan deferred value.
- Pecah context berdasarkan concern.
- Web Worker untuk agregasi chart/data yang benar-benar berat.
- Hapus timer, listener, dan subscription saat unmount.

```tsx
const user = useAuthStore((state) => state.user);
const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
```

---

## 10. Monitoring

### Web Vitals Reporting

```tsx
export function WebVitals() {
  useReportWebVitals((metric) => {
    if (process.env.NODE_ENV === 'production') {
      navigator.sendBeacon(
        '/api/vitals',
        JSON.stringify({
          name: metric.name,
          value: metric.value,
          rating: metric.rating,
          id: metric.id,
        }),
      );
    }
  });
  return null;
}
```

Jangan kirim PII atau URL sensitif. Endpoint vitals wajib tervalidasi dan memiliki rate limit.

### CI Budget

```json
{
  "ci": {
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "first-contentful-paint": ["error", { "maxNumericValue": 1800 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }],
        "total-blocking-time": ["error", { "maxNumericValue": 300 }]
      }
    }
  }
}
```

---

## 11. Performance Testing

| Test            | Tool            | Kapan      |
| --------------- | --------------- | ---------- |
| Lighthouse      | `lhci`          | Setiap PR  |
| Bundle size     | Bundle analyzer | Build      |
| LCP/INP/CLS     | Speed Insights  | Production |
| E2E performance | Playwright      | CI         |
| Memory leak     | Chrome DevTools | Manual     |
| Waterfall       | WebPageTest     | Manual     |

Playwright smoke test minimal memverifikasi halaman Overview selesai memuat dalam budget dan tidak menghasilkan console error. CLS dapat diukur melalui `PerformanceObserver` dengan threshold budget.

---

## 12. Checklist Sebelum Commit

### Web Vitals

- [ ] Above-fold memakai Server Component.
- [ ] Font memakai `next/font` dan preload seperlunya.
- [ ] Image above-fold memiliki dimensi dan priority.
- [ ] Handler berat dipecah atau di-transition.
- [ ] List besar memakai virtualisasi.

### Layout stability

- [ ] Semua image memiliki dimensi.
- [ ] Skeleton match layout asli.
- [ ] Font memakai swap/size adjustment.
- [ ] Banner tidak menggeser above-fold content.

### Bundle

- [ ] Dynamic import hanya untuk library/component berat.
- [ ] Tidak ada barrel import.
- [ ] Named import digunakan.
- [ ] `'use client'` hanya di leaf.
- [ ] First-load dan route bundle memenuhi budget.

### Cache dan runtime

- [ ] `staleTime` sesuai endpoint.
- [ ] Invalidation spesifik setelah mutation.
- [ ] Static asset memakai immutable cache.
- [ ] Zustand selector sempit dan terarah.
- [ ] Tidak ada memory leak.

### Release

- [ ] `pnpm build` lulus.
- [ ] Lighthouse performance ≥ 90, target ≥ 95.
- [ ] Tidak ada console error.
- [ ] Tidak ada request waterfall yang tidak perlu.
- [ ] Bundle analyzer direview.
- [ ] RUM dan Web Vitals aktif di production.

---

## 13. Anti-Pattern

| Anti-pattern                           | Dampak             | Ganti dengan                 |
| -------------------------------------- | ------------------ | ---------------------------- |
| `'use client'` di `page.tsx`           | Bundle besar       | Client leaf                  |
| `useEffect` + fetch untuk initial data | Waterfall          | Server Component             |
| Barrel import                          | Bundle besar       | Direct import                |
| `import * as`                          | Tree-shaking buruk | Named import                 |
| `<img>` mentah                         | Tidak optimize     | `next/image`                 |
| Manual font link                       | Render-blocking    | `next/font`                  |
| Dynamic import komponen kecil          | Overhead           | Static import                |
| `useMemo` untuk compute trivial        | Overhead           | Inline compute               |
| Subscribe seluruh Zustand              | Re-render          | Selective selector           |
| List besar tanpa virtualisasi          | Lag/inp tinggi     | TanStack Virtual             |
| Image tanpa dimensi                    | CLS                | Width/height                 |
| Heavy sync compute                     | Blocking           | Memo/Worker                  |
| `queryClient.clear()`                  | Cache hilang       | Specific invalidation        |
| `staleTime: 0` default                 | Refetch berlebihan | Endpoint-specific stale time |

---

## 14. Budget Table

### Route Budget

| Route       | First-load JS |   Shared |
| ----------- | ------------: | -------: |
| `/login`    |       < 80 KB |        — |
| `/`         |      < 120 KB | < 100 KB |
| `/routes`   |      < 130 KB | < 100 KB |
| `/tenants`  |      < 130 KB | < 100 KB |
| `/api-keys` |      < 120 KB | < 100 KB |
| `/config`   |      < 200 KB | < 100 KB |
| `/metrics`  |      < 180 KB | < 100 KB |
| `/audit`    |      < 140 KB | < 100 KB |
| `/settings` |      < 110 KB | < 100 KB |

### Asset Budget

| Asset          |        Budget |
| -------------- | ------------: |
| Total font     |      < 100 KB |
| Packed icon    |       < 10 KB |
| Image per page |      < 500 KB |
| CSS            |  < 30 KB gzip |
| First-load JS  | < 150 KB gzip |

### Time Budget

| Metrik |     Dev | Staging | Production |
| ------ | ------: | ------: | ---------: |
| TTFB   | < 200ms | < 300ms |    < 500ms |
| FCP    |  < 1.0s |  < 1.5s |     < 1.8s |
| LCP    |  < 1.5s |  < 2.0s |     < 2.5s |
| INP    | < 100ms | < 150ms |    < 200ms |
| CLS    |  < 0.03 |  < 0.05 |      < 0.1 |

---

## 15. Referensi

- `AGENTS.md`
- `FRONTEND-DESIGN.md`
- `FRONTEND-PATTERNS.md`
- `FRONTEND-DATA-FLOW.md`
- `FRONTEND-COMPONENTS.md`
- `FRONTEND-SECURITY.md`
- Web Vitals: https://web.dev/vitals/
- Next.js optimization: https://nextjs.org/docs/app/building-your-application/optimizing
- Lighthouse CI: https://github.com/GoogleChrome/lighthouse-ci
- Bundle Analyzer: https://www.npmjs.com/package/@next/bundle-analyzer
- Vercel Speed Insights: https://vercel.com/docs/speed-insights
- Chrome DevTools Performance: https://developer.chrome.com/docs/devtools/performance/
- WebPageTest: https://www.webpagetest.org/

---

## 16. Ringkasan Satu Baris

> **Server Component default, ship less JS, cache aggressively, ukur dengan Lighthouse dan RUM, dynamic import untuk library berat, `next/image` dan `next/font`, query cache sesuai frekuensi, dan seluruh perubahan dibatasi oleh performance budget.**

---

**FRONTEND-PERFORMANCE.md v1.0.0 — Approved**

## Status Dokumen

| Dokumen                      | Status   |
| ---------------------------- | -------- |
| `FRONTEND-API-CONTRACT.md`   | Approved |
| `FRONTEND-ERROR-HANDLING.md` | Approved |
| `FRONTEND-DATA-FLOW.md`      | Approved |
| `FRONTEND-SECURITY.md`       | Approved |
| `FRONTEND-COMPONENTS.md`     | Approved |
| `FRONTEND-NAMING.md`         | Approved |
| `FRONTEND-PERFORMANCE.md`    | Approved |
| `FRONTEND-TESTING.md`        | Next     |
| `FRONTEND-ACCESSIBILITY.md`  | Next     |
