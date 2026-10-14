(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  'object' == typeof document ? document.currentScript : void 0,
  91051,
  (e) => {
    'use strict';
    var t = e.i(24830),
      r = e.i(39380),
      s = e.i(84151),
      a = e.i(32155);
    let i = (0, a.default)('Activity', [
      [
        'path',
        {
          d: 'M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2',
          key: '169zse',
        },
      ],
    ]);
    var n = e.i(54815),
      o = e.i(59992);
    function l({ className: e, ...r }) {
      return (0, t.jsx)('div', {
        className: (0, o.cn)('animate-pulse rounded-md bg-muted', e),
        ...r,
      });
    }
    let u = (0, a.default)('TriangleAlert', [
        [
          'path',
          {
            d: 'm21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3',
            key: 'wmoenq',
          },
        ],
        ['path', { d: 'M12 9v4', key: 'juzpu7' }],
        ['path', { d: 'M12 17h.01', key: 'p32p05' }],
      ]),
      c = (0, a.default)('Clock', [
        ['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
        ['polyline', { points: '12 6 12 12 16 14', key: '68esgv' }],
      ]),
      d = (0, a.default)('TrendingUp', [
        ['polyline', { points: '22 7 13.5 15.5 8.5 10.5 2 17', key: '126l90' }],
        ['polyline', { points: '16 7 22 7 22 13', key: 'kwv8wd' }],
      ]),
      h = (0, a.default)('Users', [
        ['path', { d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', key: '1yyitq' }],
        ['circle', { cx: '9', cy: '7', r: '4', key: 'nufk8' }],
        ['path', { d: 'M22 21v-2a4 4 0 0 0-3-3.87', key: 'kshegd' }],
        ['path', { d: 'M16 3.13a4 4 0 0 1 0 7.75', key: '1da9ce' }],
      ]);
    function p({ metrics: e }) {
      let r = [
        { title: 'Requests/min', value: (0, o.formatNumber)(e.requestsPerMin), icon: d },
        { title: 'Error Rate', value: `${e.errorRate}%`, icon: u },
        { title: 'p95 Latency', value: `${e.p95Latency} ms`, icon: c },
        { title: 'Active Tenants', value: (0, o.formatNumber)(e.activeTenants), icon: h },
      ];
      return (0, t.jsx)('section', {
        className: 'grid gap-4 sm:grid-cols-2 lg:grid-cols-4',
        'aria-label': 'Key performance indicators',
        children: r.map(({ title: e, value: r, icon: s }) =>
          (0, t.jsx)(
            n.Card,
            {
              children: (0, t.jsx)(n.CardContent, {
                className: 'p-5',
                children: (0, t.jsxs)('div', {
                  className: 'flex items-start justify-between',
                  children: [
                    (0, t.jsxs)('div', {
                      children: [
                        (0, t.jsx)('p', {
                          className: 'text-xs font-medium text-muted-foreground',
                          children: e,
                        }),
                        (0, t.jsx)('p', {
                          className: 'mt-1.5 text-2xl font-semibold tracking-tight',
                          children: r,
                        }),
                      ],
                    }),
                    (0, t.jsx)('div', {
                      className: 'rounded-lg bg-primary/10 p-2',
                      children: (0, t.jsx)(s, {
                        className: 'h-4 w-4 text-primary',
                        'aria-hidden': 'true',
                      }),
                    }),
                  ],
                }),
              }),
            },
            e,
          ),
        ),
      });
    }
    var m = e.i(11744),
      f = e.i(59915),
      y = e.i(36023),
      v = e.i(13829),
      g = e.i(70925),
      x = e.i(77829);
    let b = x.z.object({ field: x.z.string(), code: x.z.string(), message: x.z.string() }),
      R = x.z.object({
        type: x.z.string().url(),
        title: x.z.string().min(1),
        status: x.z.number().int().min(400).max(599),
        code: x.z.string().min(1),
        detail: x.z.string().optional(),
        instance: x.z.string(),
        requestId: x.z.string().min(1),
        tenantId: x.z.string().optional(),
        timestamp: x.z.iso.datetime(),
        retryable: x.z.boolean(),
        retryAfter: x.z.number().nonnegative().optional(),
        errors: x.z.array(b).optional(),
        traceId: x.z.string().optional(),
      });
    class j extends Error {
      status;
      code;
      problem;
      retryAfterSeconds;
      constructor(e, t, r, s, a, i) {
        (super(r, i),
          (this.status = e),
          (this.code = t),
          (this.problem = s),
          (this.retryAfterSeconds = a),
          (this.name = 'ApiError'));
      }
    }
    function k(e) {
      return Number.isFinite(e) ? Math.min(3e4, Math.max(1, Math.trunc(e))) : 1e4;
    }
    async function C(e) {
      if (e.headers.get('content-type')?.includes('application/problem+json'))
        try {
          let t = await e.json();
          return R.safeParse(t).success ? t : void 0;
        } catch {
          return;
        }
    }
    async function w(e, t) {
      if (204 === e.status || 205 === e.status || t?.toUpperCase() === 'HEAD') return;
      let r = e.headers.get('content-type') ?? '';
      return r.includes('application/json') || r.includes('+json')
        ? await e.json()
        : await e.text();
    }
    let T = (function (e = {}) {
      let t = (function (e, t = 'production') {
          var r;
          let s;
          if (void 0 === e) return 'production' === t ? '' : 'http://localhost:7300';
          try {
            s = new URL(e);
          } catch {
            throw Error('NEXT_PUBLIC_API_URL must be a valid absolute URL');
          }
          if ('' !== s.username || '' !== s.password)
            throw Error('NEXT_PUBLIC_API_URL must not include credentials');
          let a =
            'production' !== t &&
            ('localhost' === (r = s.hostname) || '127.0.0.1' === r || '[::1]' === r);
          if ('https:' !== s.protocol && !(a && 'http:' === s.protocol))
            throw Error('NEXT_PUBLIC_API_URL must use HTTPS outside local development');
          return s.toString().replace(/\/$/, '');
        })(e.baseUrl ?? g.default.env.NEXT_PUBLIC_API_URL),
        r = k(e.defaultTimeoutMs ?? 1e4),
        s = e.fetcher ?? fetch,
        a = e.getToken ?? (() => null);
      async function i(e, n = {}) {
        let { body: o, token: l, timeoutMs: u = r, query: c, signal: d, ...h } = n,
          p = k(u),
          m = new Headers(h.headers),
          f = new AbortController(),
          y = !1;
        try {
          if (d?.aborted) throw new j(0, 'REQUEST_ABORTED', 'API request was aborted');
          let r = void 0 === l ? a() : l;
          (void 0 === o || o instanceof FormData || m.set('Content-Type', 'application/json'),
            null !== r && m.set('Authorization', `Bearer ${r}`));
          let i = () => f.abort();
          d?.addEventListener('abort', i, { once: !0 });
          let n = setTimeout(() => {
            ((y = !0), f.abort());
          }, p);
          try {
            let r = await s(
              (function (e, t, r) {
                let s = e.replace(/\/+$/, ''),
                  a = t.startsWith('/') ? t : `/${t}`,
                  i = new URL(`${s}${a}`);
                for (let [e, t] of Object.entries(r ?? {}))
                  void 0 !== t && i.searchParams.set(e, String(t));
                return i.toString();
              })(t, e, c),
              {
                ...h,
                headers: m,
                signal: f.signal,
                credentials: 'include',
                body: void 0 === o ? void 0 : o instanceof FormData ? o : JSON.stringify(o),
              },
            );
            if (!r.ok) {
              let e = await C(r);
              throw new j(
                r.status,
                e?.code ?? 'UNKNOWN_ERROR',
                e?.detail ?? e?.title ?? r.statusText ?? 'API request failed',
                e,
                (function (e, t) {
                  let r = e.headers.get('retry-after');
                  if (null === r) return t?.retryAfter;
                  let s = Number(r);
                  if (Number.isFinite(s) && s >= 0) return s;
                  let a = Date.parse(r);
                  return Number.isNaN(a)
                    ? t?.retryAfter
                    : Math.max(0, Math.ceil((a - Date.now()) / 1e3));
                })(r, e),
              );
            }
            return { ok: !0, data: await w(r, h.method) };
          } finally {
            (clearTimeout(n), d?.removeEventListener('abort', i));
          }
        } catch (e) {
          var v;
          return {
            ok: !1,
            error:
              ((v = y),
              e instanceof j
                ? e
                : v
                  ? new j(
                      408,
                      'REQUEST_TIMEOUT',
                      `API request timed out after ${p}ms`,
                      void 0,
                      void 0,
                      { cause: e },
                    )
                  : new j(0, 'NETWORK_ERROR', 'Unable to reach the API', void 0, void 0, {
                      cause: e,
                    })),
          };
        }
      }
      return {
        request: i,
        get: (e, t) => i(e, { ...t, method: 'GET' }),
        post: (e, t, r) => i(e, { ...r, method: 'POST', body: t }),
        put: (e, t, r) => i(e, { ...r, method: 'PUT', body: t }),
        patch: (e, t, r) => i(e, { ...r, method: 'PATCH', body: t }),
        delete: (e, t) => i(e, { ...t, method: 'DELETE' }),
      };
    })();
    function Q({ error: e, onRetry: r }) {
      let s = e instanceof j ? e.problem?.requestId : void 0,
        a = e instanceof Error && 'digest' in e ? e.digest : void 0,
        i = s ?? ('string' == typeof a ? a : void 0);
      return (0, t.jsxs)('div', {
        className: 'flex min-h-80 flex-col items-center justify-center gap-4 p-8 text-center',
        role: 'alert',
        children: [
          (0, t.jsx)(m.AlertCircle, {
            className: 'h-8 w-8 text-destructive',
            'aria-hidden': 'true',
          }),
          (0, t.jsxs)('div', {
            children: [
              (0, t.jsx)('h2', {
                className: 'text-lg font-semibold',
                children: 'Data overview tidak dapat dimuat',
              }),
              (0, t.jsx)('p', {
                className: 'mt-1 text-sm text-muted-foreground',
                children: 'Periksa koneksi Anda lalu coba muat ulang data.',
              }),
            ],
          }),
          i &&
            (0, t.jsxs)('div', {
              className:
                'flex max-w-full items-center justify-between gap-3 rounded-md bg-muted p-3 text-left',
              children: [
                (0, t.jsxs)('div', {
                  className: 'min-w-0',
                  children: [
                    (0, t.jsx)('p', {
                      className: 'text-xs text-muted-foreground',
                      children: 'Request ID',
                    }),
                    (0, t.jsx)('p', { className: 'truncate font-mono text-xs', children: i }),
                  ],
                }),
                (0, t.jsx)(v.CopyButton, { value: i, label: 'Salin' }),
              ],
            }),
          (0, t.jsxs)(y.Button, {
            type: 'button',
            onClick: r,
            children: [
              (0, t.jsx)(f.RefreshCw, { className: 'mr-2 h-4 w-4', 'aria-hidden': 'true' }),
              'Coba lagi',
            ],
          }),
        ],
      });
    }
    var N = e.i(85092);
    let E = {
        400: 'Permintaan tidak valid. Periksa kembali data yang dikirim.',
        401: 'Sesi Anda telah berakhir. Silakan masuk kembali.',
        403: 'Anda tidak memiliki izin untuk melakukan tindakan ini.',
        404: 'Data yang diminta tidak ditemukan.',
        408: 'Permintaan terlalu lama. Silakan coba kembali.',
        409: 'Data sudah diperbarui oleh pengguna lain.',
        413: 'Data yang dikirim terlalu besar.',
        429: 'Terlalu banyak permintaan. Silakan coba kembali nanti.',
        500: 'Terjadi kesalahan internal. Silakan coba kembali.',
        502: 'Gateway tidak tersedia. Silakan coba kembali.',
        503: 'Layanan sedang tidak tersedia. Silakan coba kembali.',
        504: 'Waktu respons gateway habis. Silakan coba kembali.',
      },
      S = x.z.object({
        timestamp: x.z.string(),
        requests: x.z.number().int().nonnegative(),
        errors: x.z.number().int().nonnegative(),
        p95: x.z.number().nonnegative(),
      }),
      z = x.z.object({
        requestsPerMin: x.z.number().int().nonnegative(),
        errorRate: x.z.number().nonnegative(),
        p95Latency: x.z.number().nonnegative(),
        activeTenants: x.z.number().int().nonnegative(),
        series: x.z.array(S),
      }),
      O = x.z.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'ALL']),
      I = x.z.object({
        name: x.z.string().min(1).max(128),
        status: x.z.enum(['healthy', 'degraded', 'down']),
        latencyMs: x.z.number().int().nonnegative().nullable(),
      }),
      A = x.z.object({
        id: x.z.string().min(1),
        timestamp: x.z.iso.datetime(),
        actor: x.z.string().min(1).max(128),
        action: x.z.string().min(1).max(128),
        target: x.z.string().min(1).max(256),
        status: x.z.enum(['success', 'warning', 'error']),
        ip: x.z.string().optional(),
        details: x.z.record(x.z.string(), x.z.unknown()).optional(),
      }),
      P = x.z.object({
        path: x.z.string().min(1).max(500),
        method: O,
        requests: x.z.number().int().nonnegative(),
      }),
      U = x.z.object({
        metrics: z,
        health: x.z.array(I),
        activity: x.z.array(A),
        topRoutes: x.z.array(P),
      });
    function D(e) {
      return new j(
        500,
        'GW_FRONTEND_MALFORMED_RESPONSE',
        'Endpoint overview tidak valid',
        void 0,
        void 0,
        { cause: e instanceof Error ? e : void 0 },
      );
    }
    async function M(e) {
      let t = await T.get('/admin/overview', e);
      if (!t || !t.ok) return t ?? { ok: !1, error: D('API request failed') };
      let r = U.safeParse(t.data);
      return r.success ? { ok: !0, data: r.data } : { ok: !1, error: D(r.error) };
    }
    var q = e.i(22919),
      L = e.i(94531),
      F = e.i(87308),
      _ = e.i(61991),
      V = e.i(76492),
      H = e.i(89581),
      B = e.i(86771);
    let W = ['overview'];
    function $() {
      return (0, t.jsxs)('div', {
        className: 'space-y-6',
        'aria-label': 'Memuat overview',
        role: 'status',
        children: [
          (0, t.jsx)('div', {
            className: 'grid gap-4 sm:grid-cols-2 lg:grid-cols-4',
            children: Array.from({ length: 4 }).map((e, r) =>
              (0, t.jsx)(
                n.Card,
                {
                  children: (0, t.jsxs)(n.CardContent, {
                    className: 'p-5',
                    children: [
                      (0, t.jsx)(l, { className: 'h-3 w-20' }),
                      (0, t.jsx)(l, { className: 'mt-2 h-8 w-24' }),
                    ],
                  }),
                },
                r,
              ),
            ),
          }),
          (0, t.jsx)(l, { className: 'h-80' }),
        ],
      });
    }
    e.s(
      [
        'OverviewContent',
        0,
        function () {
          let e = (0, s.useQuery)({
            queryKey: W,
            queryFn: async ({ signal: e }) => {
              let t = await M({ signal: e });
              if (!t.ok) throw t.error;
              return t.data;
            },
          });
          if (
            ((0, r.useEffect)(() => {
              e.error &&
                (function (e, t = {}) {
                  let r = (function (e, t = {}) {
                    let r = e instanceof j && Number.isInteger(e.status) ? e.status : void 0,
                      s =
                        401 === r
                          ? t.onLogin
                            ? 'login'
                            : void 0
                          : (t.onRetry &&
                                (0 === r ||
                                  408 === r ||
                                  429 === r ||
                                  (void 0 !== r && r >= 500))) ||
                              (t.onRetry && e instanceof j && e.problem?.retryable)
                            ? 'retry'
                            : void 0;
                    return {
                      title:
                        401 === r
                          ? 'Unauthorized'
                          : void 0 !== r && r >= 400 && r < 500
                            ? 'Permintaan gagal'
                            : void 0 !== r && r >= 500
                              ? 'Layanan tidak tersedia'
                              : 'Terjadi kesalahan',
                      message:
                        void 0 !== r && E[r]
                          ? E[r]
                          : 0 === r
                            ? 'Tidak dapat terhubung ke API. Periksa koneksi Anda.'
                            : e instanceof Error && e.message
                              ? e.message
                              : 'Permintaan tidak dapat diproses. Silakan coba kembali.',
                      ...(s ? { action: s } : {}),
                    };
                  })(e, t);
                  'retry' === r.action && t.onRetry
                    ? N.toast.error(r.title, {
                        description: r.message,
                        action: { label: 'Coba lagi', onClick: t.onRetry },
                      })
                    : 'login' === r.action && t.onLogin
                      ? N.toast.error(r.title, {
                          description: r.message,
                          action: { label: 'Masuk', onClick: t.onLogin },
                        })
                      : N.toast.error(r.title, { description: r.message });
                })(e.error, { onRetry: () => void e.refetch() });
            }, [e.error, e.refetch]),
            e.isPending)
          )
            return (0, t.jsx)($, {});
          if (e.isError) return (0, t.jsx)(Q, { error: e.error, onRetry: () => void e.refetch() });
          let { metrics: a, health: l, activity: u, topRoutes: c } = e.data,
            d = Math.max(...c.map((e) => e.requests), 1);
          return (0, t.jsxs)('div', {
            className: 'space-y-6',
            children: [
              (0, t.jsx)(p, { metrics: a }),
              (0, t.jsxs)('div', {
                className: 'grid gap-4 lg:grid-cols-3',
                children: [
                  (0, t.jsxs)(n.Card, {
                    className: 'lg:col-span-2',
                    children: [
                      (0, t.jsxs)(n.CardHeader, {
                        children: [
                          (0, t.jsx)(n.CardTitle, { children: 'Requests (24 jam)' }),
                          (0, t.jsx)(n.CardDescription, { children: 'Total request per jam' }),
                        ],
                      }),
                      (0, t.jsx)(n.CardContent, {
                        children: (0, t.jsx)(_.ResponsiveContainer, {
                          width: '100%',
                          height: 280,
                          children: (0, t.jsxs)(F.LineChart, {
                            data: a.series.map((e) => ({ ...e })),
                            children: [
                              (0, t.jsx)(q.CartesianGrid, {
                                strokeDasharray: '3 3',
                                className: 'opacity-30',
                              }),
                              (0, t.jsx)(H.XAxis, {
                                dataKey: 'timestamp',
                                fontSize: 11,
                                stroke: 'hsl(var(--muted-foreground))',
                              }),
                              (0, t.jsx)(B.YAxis, {
                                fontSize: 11,
                                stroke: 'hsl(var(--muted-foreground))',
                              }),
                              (0, t.jsx)(V.Tooltip, {}),
                              (0, t.jsx)(L.Line, {
                                type: 'monotone',
                                dataKey: 'requests',
                                stroke: 'hsl(var(--primary))',
                                strokeWidth: 2,
                                dot: !1,
                              }),
                            ],
                          }),
                        }),
                      }),
                    ],
                  }),
                  (0, t.jsxs)(n.Card, {
                    children: [
                      (0, t.jsxs)(n.CardHeader, {
                        children: [
                          (0, t.jsx)(n.CardTitle, { children: 'Top Routes' }),
                          (0, t.jsx)(n.CardDescription, { children: 'Berdasarkan jumlah request' }),
                        ],
                      }),
                      (0, t.jsx)(n.CardContent, {
                        children: (0, t.jsx)('ul', {
                          className: 'space-y-3',
                          children: c.map((e) =>
                            (0, t.jsxs)(
                              'li',
                              {
                                className: 'space-y-1.5',
                                children: [
                                  (0, t.jsxs)('div', {
                                    className: 'flex items-center justify-between gap-3 text-xs',
                                    children: [
                                      (0, t.jsxs)('span', {
                                        className: 'truncate font-mono',
                                        children: [e.method, ' ', e.path],
                                      }),
                                      (0, t.jsx)('span', {
                                        children: (0, o.formatNumber)(e.requests),
                                      }),
                                    ],
                                  }),
                                  (0, t.jsx)('div', {
                                    className: 'h-1.5 overflow-hidden rounded-full bg-muted',
                                    children: (0, t.jsx)('div', {
                                      className: 'h-full bg-primary',
                                      style: { width: `${(e.requests / d) * 100}%` },
                                    }),
                                  }),
                                ],
                              },
                              `${e.method} ${e.path}`,
                            ),
                          ),
                        }),
                      }),
                    ],
                  }),
                ],
              }),
              (0, t.jsxs)('div', {
                className: 'grid gap-4 lg:grid-cols-2',
                children: [
                  (0, t.jsxs)(n.Card, {
                    children: [
                      (0, t.jsxs)(n.CardHeader, {
                        children: [
                          (0, t.jsx)(n.CardTitle, { children: 'Service Health' }),
                          (0, t.jsx)(n.CardDescription, {
                            children: 'Status upstream dan dependency',
                          }),
                        ],
                      }),
                      (0, t.jsx)(n.CardContent, {
                        children: (0, t.jsx)('ul', {
                          className: 'space-y-3',
                          children: l.map((e) =>
                            (0, t.jsxs)(
                              'li',
                              {
                                className: 'flex items-center justify-between gap-4 text-sm',
                                children: [
                                  (0, t.jsx)('span', {
                                    className: 'font-medium',
                                    children: e.name,
                                  }),
                                  (0, t.jsxs)('span', {
                                    className: 'text-xs text-muted-foreground',
                                    children: [e.status, ' · ', e.latencyMs, ' ms'],
                                  }),
                                ],
                              },
                              e.name,
                            ),
                          ),
                        }),
                      }),
                    ],
                  }),
                  (0, t.jsxs)(n.Card, {
                    children: [
                      (0, t.jsxs)(n.CardHeader, {
                        children: [
                          (0, t.jsx)(n.CardTitle, { children: 'Recent Activity' }),
                          (0, t.jsx)(n.CardDescription, {
                            children: 'Perubahan konfigurasi terakhir',
                          }),
                        ],
                      }),
                      (0, t.jsx)(n.CardContent, {
                        children: (0, t.jsx)('ul', {
                          className: 'space-y-3',
                          children: u.map((e) =>
                            (0, t.jsxs)(
                              'li',
                              {
                                className: 'flex items-start gap-3 text-sm',
                                children: [
                                  (0, t.jsx)(i, {
                                    className: 'mt-0.5 h-4 w-4 shrink-0 text-muted-foreground',
                                    'aria-hidden': 'true',
                                  }),
                                  (0, t.jsxs)('div', {
                                    children: [
                                      (0, t.jsxs)('p', {
                                        children: [
                                          (0, t.jsx)('span', {
                                            className: 'text-primary',
                                            children: e.actor,
                                          }),
                                          ' ',
                                          e.action,
                                          ' ',
                                          e.target,
                                        ],
                                      }),
                                      (0, t.jsx)('p', {
                                        className: 'mt-0.5 text-xs text-muted-foreground',
                                        children: (0, o.relativeTime)(e.timestamp),
                                      }),
                                    ],
                                  }),
                                ],
                              },
                              e.id,
                            ),
                          ),
                        }),
                      }),
                    ],
                  }),
                ],
              }),
            ],
          });
        },
        'overviewQueryKey',
        0,
        W,
      ],
      91051,
    );
  },
  13829,
  (e) => {
    'use strict';
    var t = e.i(24830),
      r = e.i(39380),
      s = e.i(86304);
    let a = (0, e.i(32155).default)('Copy', [
      ['rect', { width: '14', height: '14', x: '8', y: '8', rx: '2', ry: '2', key: '17jyea' }],
      ['path', { d: 'M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2', key: 'zix9uf' }],
    ]);
    var i = e.i(36023);
    e.s(
      [
        'CopyButton',
        0,
        function ({ value: e, label: n = 'Salin' }) {
          let [o, l] = (0, r.useState)(!1);
          (0, r.useEffect)(() => {
            if (!o) return;
            let e = window.setTimeout(() => l(!1), 2e3);
            return () => window.clearTimeout(e);
          }, [o]);
          let u = (0, r.useCallback)(async () => {
            navigator.clipboard && (await navigator.clipboard.writeText(e), l(!0));
          }, [e]);
          return (0, t.jsxs)(i.Button, {
            type: 'button',
            variant: 'outline',
            size: 'sm',
            onClick: () => void u(),
            'aria-label': o ? 'Disalin' : n,
            children: [
              o
                ? (0, t.jsx)(s.Check, { className: 'h-4 w-4', 'aria-hidden': 'true' })
                : (0, t.jsx)(a, { className: 'h-4 w-4', 'aria-hidden': 'true' }),
              o ? 'Disalin' : n,
            ],
          });
        },
      ],
      13829,
    );
  },
  54815,
  (e) => {
    'use strict';
    var t = e.i(24830),
      r = e.i(39380),
      s = e.i(59992);
    let a = r.forwardRef(({ className: e, ...r }, a) =>
      (0, t.jsx)('div', {
        ref: a,
        className: (0, s.cn)(
          'rounded-[8px] border border-border bg-background text-foreground shadow-sm',
          e,
        ),
        ...r,
      }),
    );
    a.displayName = 'Card';
    let i = r.forwardRef(({ className: e, ...r }, a) =>
      (0, t.jsx)('div', { ref: a, className: (0, s.cn)('flex flex-col space-y-2 p-6', e), ...r }),
    );
    i.displayName = 'CardHeader';
    let n = r.forwardRef(({ className: e, ...r }, a) =>
      (0, t.jsx)('h3', {
        ref: a,
        className: (0, s.cn)('font-semibold leading-none tracking-tight', e),
        ...r,
      }),
    );
    n.displayName = 'CardTitle';
    let o = r.forwardRef(({ className: e, ...r }, a) =>
      (0, t.jsx)('p', { ref: a, className: (0, s.cn)('text-sm text-muted-foreground', e), ...r }),
    );
    o.displayName = 'CardDescription';
    let l = r.forwardRef(({ className: e, ...r }, a) =>
      (0, t.jsx)('div', { ref: a, className: (0, s.cn)('p-6 pt-0', e), ...r }),
    );
    ((l.displayName = 'CardContent'),
      (r.forwardRef(({ className: e, ...r }, a) =>
        (0, t.jsx)('div', { ref: a, className: (0, s.cn)('flex items-center p-6 pt-0', e), ...r }),
      ).displayName = 'CardFooter'),
      e.s([
        'Card',
        0,
        a,
        'CardContent',
        0,
        l,
        'CardDescription',
        0,
        o,
        'CardHeader',
        0,
        i,
        'CardTitle',
        0,
        n,
      ]));
  },
  49515,
  (e) => {
    'use strict';
    var t = e.i(50955),
      r = e.i(39380),
      s = e.i(78356);
    function a(e, t, r) {
      let a = e.getMutationCache(),
        i = e.getQueryCache(),
        n = r?.defaultOptions?.deserializeData ?? e.getDefaultOptions().hydrate?.deserializeData;
      (t.mutations?.forEach(({ state: t, ...s }) => {
        a.build(
          e,
          { ...e.getDefaultOptions().hydrate?.mutations, ...r?.defaultOptions?.mutations, ...s },
          t,
        );
      }),
        t.queries?.forEach(
          ({
            queryKey: t,
            state: a,
            queryHash: o,
            meta: l,
            promise: u,
            dehydratedAt: c,
            queryType: d,
          }) => {
            let h = u
                ? (function (e) {
                    let t;
                    if ((e.then((e) => ((t = e), e), s.noop)?.catch?.(s.noop), void 0 !== t))
                      return { data: t };
                  })(u)
                : void 0,
              p = void 0 === a.data ? h?.data : a.data,
              m = void 0 === p ? p : n ? n(p) : p,
              f = i.get(o),
              y = f?.state.status === 'pending',
              v = f?.state.fetchStatus === 'fetching';
            if (f) {
              let e = h && c > f.state.dataUpdatedAt;
              if (a.dataUpdatedAt > f.state.dataUpdatedAt || e) {
                let { fetchStatus: e, ...t } = a;
                f.setState({
                  ...t,
                  data: m,
                  ...('pending' === a.status &&
                    void 0 !== m && {
                      status: 'success',
                      dataUpdatedAt: c,
                      ...(!v && { fetchStatus: 'idle' }),
                    }),
                });
              }
            } else
              f = i.build(
                e,
                {
                  ...e.getDefaultOptions().hydrate?.queries,
                  ...r?.defaultOptions?.queries,
                  queryKey: t,
                  queryHash: o,
                  meta: l,
                  _type: d,
                },
                {
                  ...a,
                  data: m,
                  fetchStatus: 'idle',
                  status: 'pending' === a.status && void 0 !== m ? 'success' : a.status,
                  ...('pending' === a.status && void 0 !== m && { dataUpdatedAt: c }),
                },
              );
            !u ||
              h ||
              y ||
              v ||
              !(c > f.state.dataUpdatedAt) ||
              f.fetch(void 0, { initialPromise: Promise.resolve(u).then(n) }).catch(s.noop);
          },
        ));
    }
    e.s(
      [
        'HydrationBoundary',
        0,
        ({ children: e, options: s = {}, state: i, queryClient: n }) => {
          let o = (0, t.useQueryClient)(n),
            l = r.useRef(s);
          r.useEffect(() => {
            l.current = s;
          });
          let u = r.useMemo(() => {
            if (i) {
              if ('object' != typeof i) return;
              let e = o.getQueryCache(),
                t = i.queries || [],
                r = [],
                s = [];
              for (let a of t) {
                let t = e.get(a.queryHash);
                t
                  ? (a.state.dataUpdatedAt > t.state.dataUpdatedAt ||
                      (a.promise &&
                        'pending' !== t.state.status &&
                        'fetching' !== t.state.fetchStatus &&
                        a.dehydratedAt > t.state.dataUpdatedAt)) &&
                    s.push(a)
                  : r.push(a);
              }
              if ((r.length > 0 && a(o, { queries: r }, l.current), s.length > 0)) return s;
            }
          }, [o, i]);
          return (
            r.useEffect(() => {
              u && a(o, { queries: u }, l.current);
            }, [o, u]),
            e
          );
        },
      ],
      49515,
    );
  },
  84151,
  (e) => {
    'use strict';
    let t;
    var r = e.i(50955),
      s = e.i(39380);
    let a = s.createContext(!1);
    (a.Provider, e.i(24830));
    let i = s.createContext(
      ((t = !1),
      {
        clearReset: () => {
          t = !1;
        },
        reset: () => {
          t = !0;
        },
        isReset: () => t,
      }),
    );
    var n = e.i(78356),
      o = e.i(70508),
      l = e.i(68550),
      u = e.i(7934),
      c = e.i(77288),
      d = e.i(53094),
      h = e.i(40741),
      p = class extends c.Subscribable {
        #e;
        #t = void 0;
        #r = void 0;
        #s = void 0;
        #a;
        #i;
        #n;
        #o;
        #l;
        #u;
        #c;
        #d;
        #h;
        #p = new Set();
        constructor(e, t) {
          (super(),
            (this.options = t),
            (this.#e = e),
            (this.#n = null),
            this.bindMethods(),
            this.setOptions(t));
        }
        bindMethods() {
          this.refetch = this.refetch.bind(this);
        }
        onSubscribe() {
          1 === this.listeners.size &&
            (this.#t.addObserver(this),
            m(this.#t, this.options) ? this.#m() : this.updateResult(),
            this.#f());
        }
        onUnsubscribe() {
          this.hasListeners() || this.destroy();
        }
        shouldFetchOnReconnect() {
          return f(this.#t, this.options, this.options.refetchOnReconnect);
        }
        shouldFetchOnWindowFocus() {
          return f(this.#t, this.options, this.options.refetchOnWindowFocus);
        }
        destroy() {
          ((this.listeners = new Set()), this.#y(), this.#v(), this.#t.removeObserver(this));
        }
        setOptions(e) {
          let t = this.options,
            r = this.#t;
          if (
            ((this.options = this.#e.defaultQueryOptions(e)),
            void 0 !== this.options.enabled &&
              'boolean' != typeof this.options.enabled &&
              'function' != typeof this.options.enabled &&
              'boolean' != typeof (0, n.resolveQueryValue)(this.options.enabled, this.#t))
          )
            throw Error('Expected enabled to be a boolean or a callback that returns a boolean');
          (this.#g(),
            this.#t.setOptions(this.options),
            t._defaulted &&
              !(0, n.shallowEqualObjects)(this.options, t) &&
              this.#e
                .getQueryCache()
                .notify({ type: 'observerOptionsUpdated', query: this.#t, observer: this }));
          let s = this.hasListeners();
          (s && y(this.#t, r, this.options, t) && this.#m(),
            this.updateResult(),
            s &&
              (this.#t !== r ||
                (0, n.resolveQueryValue)(this.options.enabled, this.#t) !==
                  (0, n.resolveQueryValue)(t.enabled, this.#t) ||
                (0, n.resolveQueryValue)(this.options.staleTime, this.#t) !==
                  (0, n.resolveQueryValue)(t.staleTime, this.#t)) &&
              this.#x());
          let a = this.#b();
          s &&
            (this.#t !== r ||
              (0, n.resolveQueryValue)(this.options.enabled, this.#t) !==
                (0, n.resolveQueryValue)(t.enabled, this.#t) ||
              a !== this.#h) &&
            this.#R(a);
        }
        getOptimisticResult(e) {
          let t = this.#e.getQueryCache().build(this.#e, e),
            r = this.createResult(t, e);
          return (
            (0, n.shallowEqualObjects)(this.getCurrentResult(), r) ||
              ((this.#s = r), (this.#i = this.options), (this.#a = this.#t.state)),
            r
          );
        }
        getCurrentResult() {
          return this.#s;
        }
        trackResult(e, t) {
          return new Proxy(e, { get: (e, r) => (this.trackProp(r), t?.(r), Reflect.get(e, r)) });
        }
        trackProp(e) {
          this.#p.add(e);
        }
        getCurrentQuery() {
          return this.#t;
        }
        refetch({ ...e } = {}) {
          return this.fetch({ ...e });
        }
        fetchOptimistic(e) {
          let t,
            r = this.#e.defaultQueryOptions(e),
            s = this.#e.getQueryCache().build(this.#e, r),
            a = () => {},
            i = new Promise((e) => {
              ((t = e),
                (a = this.#e.getQueryCache().subscribe((t) => {
                  'updated' === t.type &&
                    t.query.queryHash === s.queryHash &&
                    void 0 !== s.state.data &&
                    (a(), e(this.createResult(s, r)));
                })));
            });
          return Promise.race([
            s
              .fetch()
              .then(() => {
                let e = this.createResult(s, r);
                return (t?.(e), e);
              })
              .finally(() => {
                a();
              }),
            i,
          ]);
        }
        fetch(e) {
          return this.#m({ ...e, cancelRefetch: e.cancelRefetch ?? !0 }).then(
            () => (this.updateResult(), this.#s),
          );
        }
        #m(e) {
          this.#g();
          let t = this.#t.fetch(this.options, e);
          return (e?.throwOnError || (t = t.catch(n.noop)), t);
        }
        #j(e) {
          return (
            !(0, u.isServer)() &&
            !1 !== (0, n.resolveQueryValue)(this.options.enabled, this.#t) &&
            (0, n.isValidTimeout)(e)
          );
        }
        #x() {
          this.#y();
          let e = (0, n.resolveQueryValue)(this.options.staleTime, this.#t);
          if (this.#s.isStale || !this.#j(e)) return;
          let t = (0, n.timeUntilStale)(this.#s.dataUpdatedAt, e) + 1;
          this.#c = l.timeoutManager.setTimeout(() => {
            this.#s.isStale || this.updateResult();
          }, t);
        }
        #b() {
          return (0, n.resolveQueryValue)(this.options.refetchInterval, this.#t) ?? !1;
        }
        #R(e) {
          (this.#v(),
            (this.#h = e),
            0 !== this.#h &&
              this.#j(this.#h) &&
              (this.#d = l.timeoutManager.setInterval(() => {
                (this.options.refetchIntervalInBackground || d.focusManager.isFocused()) &&
                  this.#m();
              }, this.#h)));
        }
        #f() {
          (this.#x(), this.#R(this.#b()));
        }
        #y() {
          void 0 !== this.#c && (l.timeoutManager.clearTimeout(this.#c), (this.#c = void 0));
        }
        #v() {
          void 0 !== this.#d && (l.timeoutManager.clearInterval(this.#d), (this.#d = void 0));
        }
        createResult(e, t) {
          let r,
            s = this.#t,
            a = this.options,
            i = this.#s,
            o = this.#a,
            l = this.#i,
            u = e !== s ? e.state : this.#r,
            { state: c } = e,
            d = { ...c },
            p = !1;
          if (t._optimisticResults) {
            let r = this.hasListeners(),
              i = !r && m(e, t),
              n = r && y(e, s, t, a);
            ((i || n) && (d = { ...d, ...(0, h.fetchState)(c.data, e.options) }),
              'isRestoring' === t._optimisticResults && (d.fetchStatus = 'idle'));
          }
          let { error: f, errorUpdatedAt: g, status: x } = d;
          r = d.data;
          let b = !1;
          if (void 0 !== t.placeholderData && void 0 === r && 'pending' === x) {
            let e;
            (i?.isPlaceholderData && t.placeholderData === l?.placeholderData
              ? ((e = i.data), (b = !0))
              : (e =
                  'function' == typeof t.placeholderData
                    ? t.placeholderData(this.#u?.state.data, this.#u)
                    : t.placeholderData),
              void 0 !== e && ((x = 'success'), (r = (0, n.replaceData)(i?.data, e, t)), (p = !0)));
          }
          if (t.select && void 0 !== r && !b)
            if (i && r === o?.data && t.select === this.#o) r = this.#l;
            else
              try {
                ((this.#o = t.select),
                  (r = t.select(r)),
                  (r = (0, n.replaceData)(i?.data, r, t)),
                  (this.#l = r),
                  (this.#n = null));
              } catch (e) {
                this.#n = e;
              }
          else void 0 === r && (this.#n = null);
          this.#n && ((f = this.#n), (r = this.#l), (g = Date.now()), (x = 'error'), (p = !1));
          let R = 'fetching' === d.fetchStatus,
            j = 'pending' === x,
            k = 'error' === x,
            C = j && R,
            w = void 0 !== r;
          return {
            status: x,
            fetchStatus: d.fetchStatus,
            isPending: j,
            isSuccess: 'success' === x,
            isError: k,
            isInitialLoading: C,
            isLoading: C,
            data: r,
            dataUpdatedAt: d.dataUpdatedAt,
            error: f,
            errorUpdatedAt: g,
            failureCount: d.fetchFailureCount,
            failureReason: d.fetchFailureReason,
            errorUpdateCount: d.errorUpdateCount,
            isFetched: e.isFetched(),
            isFetchedAfterMount:
              d.dataUpdateCount > u.dataUpdateCount || d.errorUpdateCount > u.errorUpdateCount,
            isFetching: R,
            isRefetching: R && !j,
            isLoadingError: k && !w,
            isPaused: 'paused' === d.fetchStatus,
            isPlaceholderData: p,
            isRefetchError: k && w,
            isStale: v(e, t),
            refetch: this.refetch,
            isEnabled: !1 !== (0, n.resolveQueryValue)(t.enabled, e),
          };
        }
        updateResult() {
          let e = this.#s,
            t = this.createResult(this.#t, this.options);
          if (
            ((this.#a = this.#t.state),
            (this.#i = this.options),
            void 0 !== this.#a.data && (this.#u = this.#t),
            (0, n.shallowEqualObjects)(t, e))
          )
            return;
          this.#s = t;
          let r = (() => {
            if (!e) return !0;
            let { notifyOnChangeProps: t } = this.options,
              r = 'function' == typeof t ? t() : t;
            if ('all' === r || (!r && !this.#p.size)) return !0;
            let s = new Set(r ?? this.#p);
            return (
              this.options.throwOnError && s.add('error'),
              Object.keys(this.#s).some((t) => this.#s[t] !== e[t] && s.has(t))
            );
          })();
          o.notifyManager.batch(() => {
            (r &&
              this.listeners.forEach((e) => {
                e(this.#s);
              }),
              this.#e.getQueryCache().notify({ query: this.#t, type: 'observerResultsUpdated' }));
          });
        }
        #g() {
          let e = this.#e.getQueryCache().build(this.#e, this.options);
          if (e === this.#t) return;
          let t = this.#t;
          ((this.#t = e),
            (this.#r = e.state),
            this.hasListeners() && (t?.removeObserver(this), e.addObserver(this)));
        }
        onQueryUpdate() {
          (this.updateResult(), this.hasListeners() && this.#f());
        }
      };
    function m(e, t) {
      return (
        (!1 !== (0, n.resolveQueryValue)(t.enabled, e) &&
          void 0 === e.state.data &&
          ('error' !== e.state.status || !1 !== (0, n.resolveQueryValue)(t.retryOnMount, e))) ||
        (void 0 !== e.state.data && f(e, t, t.refetchOnMount))
      );
    }
    function f(e, t, r) {
      if (
        !1 !== (0, n.resolveQueryValue)(t.enabled, e) &&
        'static' !== (0, n.resolveQueryValue)(t.staleTime, e)
      ) {
        let s = (0, n.resolveQueryValue)(r, e);
        return 'always' === s || (!1 !== s && v(e, t));
      }
      return !1;
    }
    function y(e, t, r, s) {
      return (
        (e !== t || !1 === (0, n.resolveQueryValue)(s.enabled, e)) &&
        (!r.suspense || 'error' !== e.state.status) &&
        v(e, r)
      );
    }
    function v(e, t) {
      return (
        !1 !== (0, n.resolveQueryValue)(t.enabled, e) &&
        e.isStaleByTime((0, n.resolveQueryValue)(t.staleTime, e))
      );
    }
    e.s(
      [
        'useQuery',
        0,
        function (e, t) {
          return (function (e, t, l) {
            let u,
              c = s.useContext(a),
              d = s.useContext(i),
              h = (0, r.useQueryClient)(l),
              p = h.defaultQueryOptions(e),
              m = h.getQueryCache().get(p.queryHash),
              f = !1 !== e.subscribed;
            if (
              ((p._optimisticResults = c ? 'isRestoring' : f ? 'optimistic' : void 0), p.suspense)
            ) {
              let e = (e) => ('static' === e ? e : Math.max(e ?? 1e3, 1e3)),
                t = p.staleTime;
              ((p.staleTime = 'function' == typeof t ? (...r) => e(t(...r)) : e(t)),
                'number' == typeof p.gcTime && (p.gcTime = Math.max(p.gcTime, 1e3)));
            }
            ((u =
              m?.state.error && 'function' == typeof p.throwOnError
                ? (0, n.shouldThrowError)(p.throwOnError, [m.state.error, m])
                : p.throwOnError),
              (p.suspense || u) && !d.isReset() && (p.retryOnMount = !1),
              s.useEffect(() => {
                d.clearReset();
              }, [d]));
            let [y] = s.useState(() => new t(h, p)),
              v = y.getOptimisticResult(p),
              g = !c && f;
            if (
              (s.useSyncExternalStore(
                s.useCallback(
                  (e) => {
                    let t = g ? y.subscribe(o.notifyManager.batchCalls(e)) : n.noop;
                    return (y.updateResult(), t);
                  },
                  [y, g],
                ),
                () => y.getCurrentResult(),
                () => y.getCurrentResult(),
              ),
              s.useEffect(() => {
                y.setOptions(p);
              }, [p, y]),
              p?.suspense && v.isPending)
            )
              throw y.fetchOptimistic(p).catch(() => {
                d.clearReset();
              });
            if (
              (({ result: e, errorResetBoundary: t, throwOnError: r, query: s, suspense: a }) =>
                e.isError &&
                !t.isReset() &&
                !e.isFetching &&
                s &&
                ((a && void 0 === e.data) || (0, n.shouldThrowError)(r, [e.error, s])))({
                result: v,
                errorResetBoundary: d,
                throwOnError: p.throwOnError,
                query: m,
                suspense: p.suspense,
              })
            )
              throw v.error;
            return p.notifyOnChangeProps ? v : y.trackResult(v);
          })(e, p, t);
        },
      ],
      84151,
    );
  },
  11744,
  (e) => {
    'use strict';
    let t = (0, e.i(32155).default)('CircleAlert', [
      ['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
      ['line', { x1: '12', x2: '12', y1: '8', y2: '12', key: '1pkeuh' }],
      ['line', { x1: '12', x2: '12.01', y1: '16', y2: '16', key: '4dfq90' }],
    ]);
    e.s(['AlertCircle', 0, t], 11744);
  },
  59915,
  (e) => {
    'use strict';
    let t = (0, e.i(32155).default)('RefreshCw', [
      ['path', { d: 'M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8', key: 'v9h5vc' }],
      ['path', { d: 'M21 3v5h-5', key: '1q7to0' }],
      ['path', { d: 'M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16', key: '3uifl3' }],
      ['path', { d: 'M8 16H3v5', key: '1cv678' }],
    ]);
    e.s(['RefreshCw', 0, t], 59915);
  },
]);
