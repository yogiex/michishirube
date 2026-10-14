module.exports = [
  20021,
  (a) => {
    'use strict';
    var b = a.i(68508),
      c = a.i(48326),
      d = a.i(7104),
      e = a.i(10641);
    let f = (0, e.default)('Activity', [
      [
        'path',
        {
          d: 'M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2',
          key: '169zse',
        },
      ],
    ]);
    var g = a.i(60301),
      h = a.i(35147);
    function i({ className: a, ...c }) {
      return (0, b.jsx)('div', {
        className: (0, h.cn)('animate-pulse rounded-md bg-muted', a),
        ...c,
      });
    }
    let j = (0, e.default)('TriangleAlert', [
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
      k = (0, e.default)('Clock', [
        ['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
        ['polyline', { points: '12 6 12 12 16 14', key: '68esgv' }],
      ]),
      l = (0, e.default)('TrendingUp', [
        ['polyline', { points: '22 7 13.5 15.5 8.5 10.5 2 17', key: '126l90' }],
        ['polyline', { points: '16 7 22 7 22 13', key: 'kwv8wd' }],
      ]),
      m = (0, e.default)('Users', [
        ['path', { d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', key: '1yyitq' }],
        ['circle', { cx: '9', cy: '7', r: '4', key: 'nufk8' }],
        ['path', { d: 'M22 21v-2a4 4 0 0 0-3-3.87', key: 'kshegd' }],
        ['path', { d: 'M16 3.13a4 4 0 0 1 0 7.75', key: '1da9ce' }],
      ]);
    function n({ metrics: a }) {
      let c = [
        { title: 'Requests/min', value: (0, h.formatNumber)(a.requestsPerMin), icon: l },
        { title: 'Error Rate', value: `${a.errorRate}%`, icon: j },
        { title: 'p95 Latency', value: `${a.p95Latency} ms`, icon: k },
        { title: 'Active Tenants', value: (0, h.formatNumber)(a.activeTenants), icon: m },
      ];
      return (0, b.jsx)('section', {
        className: 'grid gap-4 sm:grid-cols-2 lg:grid-cols-4',
        'aria-label': 'Key performance indicators',
        children: c.map(({ title: a, value: c, icon: d }) =>
          (0, b.jsx)(
            g.Card,
            {
              children: (0, b.jsx)(g.CardContent, {
                className: 'p-5',
                children: (0, b.jsxs)('div', {
                  className: 'flex items-start justify-between',
                  children: [
                    (0, b.jsxs)('div', {
                      children: [
                        (0, b.jsx)('p', {
                          className: 'text-xs font-medium text-muted-foreground',
                          children: a,
                        }),
                        (0, b.jsx)('p', {
                          className: 'mt-1.5 text-2xl font-semibold tracking-tight',
                          children: c,
                        }),
                      ],
                    }),
                    (0, b.jsx)('div', {
                      className: 'rounded-lg bg-primary/10 p-2',
                      children: (0, b.jsx)(d, {
                        className: 'h-4 w-4 text-primary',
                        'aria-hidden': 'true',
                      }),
                    }),
                  ],
                }),
              }),
            },
            a,
          ),
        ),
      });
    }
    var o = a.i(78585),
      p = a.i(12616),
      q = a.i(48741),
      r = a.i(41542),
      s = a.i(12670);
    let t = s.z.object({ field: s.z.string(), code: s.z.string(), message: s.z.string() }),
      u = s.z.object({
        type: s.z.string().url(),
        title: s.z.string().min(1),
        status: s.z.number().int().min(400).max(599),
        code: s.z.string().min(1),
        detail: s.z.string().optional(),
        instance: s.z.string(),
        requestId: s.z.string().min(1),
        tenantId: s.z.string().optional(),
        timestamp: s.z.iso.datetime(),
        retryable: s.z.boolean(),
        retryAfter: s.z.number().nonnegative().optional(),
        errors: s.z.array(t).optional(),
        traceId: s.z.string().optional(),
      });
    class v extends Error {
      status;
      code;
      problem;
      retryAfterSeconds;
      constructor(a, b, c, d, e, f) {
        (super(c, f),
          (this.status = a),
          (this.code = b),
          (this.problem = d),
          (this.retryAfterSeconds = e),
          (this.name = 'ApiError'));
      }
    }
    function w(a) {
      return Number.isFinite(a) ? Math.min(3e4, Math.max(1, Math.trunc(a))) : 1e4;
    }
    async function x(a) {
      if (a.headers.get('content-type')?.includes('application/problem+json'))
        try {
          let b = await a.json();
          return u.safeParse(b).success ? b : void 0;
        } catch {
          return;
        }
    }
    async function y(a, b) {
      if (204 === a.status || 205 === a.status || b?.toUpperCase() === 'HEAD') return;
      let c = a.headers.get('content-type') ?? '';
      return c.includes('application/json') || c.includes('+json')
        ? await a.json()
        : await a.text();
    }
    let z = (function (a = {}) {
      let b = (function (a, b = 'production') {
          var c;
          let d;
          if (void 0 === a) return 'production' === b ? '' : 'http://localhost:7300';
          try {
            d = new URL(a);
          } catch {
            throw Error('NEXT_PUBLIC_API_URL must be a valid absolute URL');
          }
          if ('' !== d.username || '' !== d.password)
            throw Error('NEXT_PUBLIC_API_URL must not include credentials');
          let e =
            'production' !== b &&
            ('localhost' === (c = d.hostname) || '127.0.0.1' === c || '[::1]' === c);
          if ('https:' !== d.protocol && !(e && 'http:' === d.protocol))
            throw Error('NEXT_PUBLIC_API_URL must use HTTPS outside local development');
          return d.toString().replace(/\/$/, '');
        })(a.baseUrl ?? process.env.NEXT_PUBLIC_API_URL),
        c = w(a.defaultTimeoutMs ?? 1e4),
        d = a.fetcher ?? fetch,
        e = a.getToken ?? (() => null);
      async function f(a, g = {}) {
        let { body: h, token: i, timeoutMs: j = c, query: k, signal: l, ...m } = g,
          n = w(j),
          o = new Headers(m.headers),
          p = new AbortController(),
          q = !1;
        try {
          if (l?.aborted) throw new v(0, 'REQUEST_ABORTED', 'API request was aborted');
          let c = void 0 === i ? e() : i;
          (void 0 === h || h instanceof FormData || o.set('Content-Type', 'application/json'),
            null !== c && o.set('Authorization', `Bearer ${c}`));
          let f = () => p.abort();
          l?.addEventListener('abort', f, { once: !0 });
          let g = setTimeout(() => {
            ((q = !0), p.abort());
          }, n);
          try {
            let c = await d(
              (function (a, b, c) {
                let d = a.replace(/\/+$/, ''),
                  e = b.startsWith('/') ? b : `/${b}`,
                  f = new URL(`${d}${e}`);
                for (let [a, b] of Object.entries(c ?? {}))
                  void 0 !== b && f.searchParams.set(a, String(b));
                return f.toString();
              })(b, a, k),
              {
                ...m,
                headers: o,
                signal: p.signal,
                credentials: 'include',
                body: void 0 === h ? void 0 : h instanceof FormData ? h : JSON.stringify(h),
              },
            );
            if (!c.ok) {
              let a = await x(c);
              throw new v(
                c.status,
                a?.code ?? 'UNKNOWN_ERROR',
                a?.detail ?? a?.title ?? c.statusText ?? 'API request failed',
                a,
                (function (a, b) {
                  let c = a.headers.get('retry-after');
                  if (null === c) return b?.retryAfter;
                  let d = Number(c);
                  if (Number.isFinite(d) && d >= 0) return d;
                  let e = Date.parse(c);
                  return Number.isNaN(e)
                    ? b?.retryAfter
                    : Math.max(0, Math.ceil((e - Date.now()) / 1e3));
                })(c, a),
              );
            }
            return { ok: !0, data: await y(c, m.method) };
          } finally {
            (clearTimeout(g), l?.removeEventListener('abort', f));
          }
        } catch (a) {
          var r;
          return {
            ok: !1,
            error:
              ((r = q),
              a instanceof v
                ? a
                : r
                  ? new v(
                      408,
                      'REQUEST_TIMEOUT',
                      `API request timed out after ${n}ms`,
                      void 0,
                      void 0,
                      { cause: a },
                    )
                  : new v(0, 'NETWORK_ERROR', 'Unable to reach the API', void 0, void 0, {
                      cause: a,
                    })),
          };
        }
      }
      return {
        request: f,
        get: (a, b) => f(a, { ...b, method: 'GET' }),
        post: (a, b, c) => f(a, { ...c, method: 'POST', body: b }),
        put: (a, b, c) => f(a, { ...c, method: 'PUT', body: b }),
        patch: (a, b, c) => f(a, { ...c, method: 'PATCH', body: b }),
        delete: (a, b) => f(a, { ...b, method: 'DELETE' }),
      };
    })();
    function A({ error: a, onRetry: c }) {
      let d = a instanceof v ? a.problem?.requestId : void 0,
        e = a instanceof Error && 'digest' in a ? a.digest : void 0,
        f = d ?? ('string' == typeof e ? e : void 0);
      return (0, b.jsxs)('div', {
        className: 'flex min-h-80 flex-col items-center justify-center gap-4 p-8 text-center',
        role: 'alert',
        children: [
          (0, b.jsx)(o.AlertCircle, {
            className: 'h-8 w-8 text-destructive',
            'aria-hidden': 'true',
          }),
          (0, b.jsxs)('div', {
            children: [
              (0, b.jsx)('h2', {
                className: 'text-lg font-semibold',
                children: 'Data overview tidak dapat dimuat',
              }),
              (0, b.jsx)('p', {
                className: 'mt-1 text-sm text-muted-foreground',
                children: 'Periksa koneksi Anda lalu coba muat ulang data.',
              }),
            ],
          }),
          f &&
            (0, b.jsxs)('div', {
              className:
                'flex max-w-full items-center justify-between gap-3 rounded-md bg-muted p-3 text-left',
              children: [
                (0, b.jsxs)('div', {
                  className: 'min-w-0',
                  children: [
                    (0, b.jsx)('p', {
                      className: 'text-xs text-muted-foreground',
                      children: 'Request ID',
                    }),
                    (0, b.jsx)('p', { className: 'truncate font-mono text-xs', children: f }),
                  ],
                }),
                (0, b.jsx)(r.CopyButton, { value: f, label: 'Salin' }),
              ],
            }),
          (0, b.jsxs)(q.Button, {
            type: 'button',
            onClick: c,
            children: [
              (0, b.jsx)(p.RefreshCw, { className: 'mr-2 h-4 w-4', 'aria-hidden': 'true' }),
              'Coba lagi',
            ],
          }),
        ],
      });
    }
    var B = a.i(86435);
    let C = {
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
      D = s.z.object({
        timestamp: s.z.string(),
        requests: s.z.number().int().nonnegative(),
        errors: s.z.number().int().nonnegative(),
        p95: s.z.number().nonnegative(),
      }),
      E = s.z.object({
        requestsPerMin: s.z.number().int().nonnegative(),
        errorRate: s.z.number().nonnegative(),
        p95Latency: s.z.number().nonnegative(),
        activeTenants: s.z.number().int().nonnegative(),
        series: s.z.array(D),
      }),
      F = s.z.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'ALL']),
      G = s.z.object({
        name: s.z.string().min(1).max(128),
        status: s.z.enum(['healthy', 'degraded', 'down']),
        latencyMs: s.z.number().int().nonnegative().nullable(),
      }),
      H = s.z.object({
        id: s.z.string().min(1),
        timestamp: s.z.iso.datetime(),
        actor: s.z.string().min(1).max(128),
        action: s.z.string().min(1).max(128),
        target: s.z.string().min(1).max(256),
        status: s.z.enum(['success', 'warning', 'error']),
        ip: s.z.string().optional(),
        details: s.z.record(s.z.string(), s.z.unknown()).optional(),
      }),
      I = s.z.object({
        path: s.z.string().min(1).max(500),
        method: F,
        requests: s.z.number().int().nonnegative(),
      }),
      J = s.z.object({
        metrics: E,
        health: s.z.array(G),
        activity: s.z.array(H),
        topRoutes: s.z.array(I),
      });
    function K(a) {
      return new v(
        500,
        'GW_FRONTEND_MALFORMED_RESPONSE',
        'Endpoint overview tidak valid',
        void 0,
        void 0,
        { cause: a instanceof Error ? a : void 0 },
      );
    }
    async function L(a) {
      let b = await z.get('/admin/overview', a);
      if (!b || !b.ok) return b ?? { ok: !1, error: K('API request failed') };
      let c = J.safeParse(b.data);
      return c.success ? { ok: !0, data: c.data } : { ok: !1, error: K(c.error) };
    }
    var M = a.i(43134),
      N = a.i(33354),
      O = a.i(49257),
      P = a.i(60970),
      Q = a.i(38890),
      R = a.i(32537),
      S = a.i(33104);
    let T = ['overview'];
    function U() {
      return (0, b.jsxs)('div', {
        className: 'space-y-6',
        'aria-label': 'Memuat overview',
        role: 'status',
        children: [
          (0, b.jsx)('div', {
            className: 'grid gap-4 sm:grid-cols-2 lg:grid-cols-4',
            children: Array.from({ length: 4 }).map((a, c) =>
              (0, b.jsx)(
                g.Card,
                {
                  children: (0, b.jsxs)(g.CardContent, {
                    className: 'p-5',
                    children: [
                      (0, b.jsx)(i, { className: 'h-3 w-20' }),
                      (0, b.jsx)(i, { className: 'mt-2 h-8 w-24' }),
                    ],
                  }),
                },
                c,
              ),
            ),
          }),
          (0, b.jsx)(i, { className: 'h-80' }),
        ],
      });
    }
    a.s(
      [
        'OverviewContent',
        0,
        function () {
          let a = (0, d.useQuery)({
            queryKey: T,
            queryFn: async ({ signal: a }) => {
              let b = await L({ signal: a });
              if (!b.ok) throw b.error;
              return b.data;
            },
          });
          if (
            ((0, c.useEffect)(() => {
              a.error &&
                (function (a, b = {}) {
                  let c = (function (a, b = {}) {
                    let c = a instanceof v && Number.isInteger(a.status) ? a.status : void 0,
                      d =
                        401 === c
                          ? b.onLogin
                            ? 'login'
                            : void 0
                          : (b.onRetry &&
                                (0 === c ||
                                  408 === c ||
                                  429 === c ||
                                  (void 0 !== c && c >= 500))) ||
                              (b.onRetry && a instanceof v && a.problem?.retryable)
                            ? 'retry'
                            : void 0;
                    return {
                      title:
                        401 === c
                          ? 'Unauthorized'
                          : void 0 !== c && c >= 400 && c < 500
                            ? 'Permintaan gagal'
                            : void 0 !== c && c >= 500
                              ? 'Layanan tidak tersedia'
                              : 'Terjadi kesalahan',
                      message:
                        void 0 !== c && C[c]
                          ? C[c]
                          : 0 === c
                            ? 'Tidak dapat terhubung ke API. Periksa koneksi Anda.'
                            : a instanceof Error && a.message
                              ? a.message
                              : 'Permintaan tidak dapat diproses. Silakan coba kembali.',
                      ...(d ? { action: d } : {}),
                    };
                  })(a, b);
                  'retry' === c.action && b.onRetry
                    ? B.toast.error(c.title, {
                        description: c.message,
                        action: { label: 'Coba lagi', onClick: b.onRetry },
                      })
                    : 'login' === c.action && b.onLogin
                      ? B.toast.error(c.title, {
                          description: c.message,
                          action: { label: 'Masuk', onClick: b.onLogin },
                        })
                      : B.toast.error(c.title, { description: c.message });
                })(a.error, { onRetry: () => void a.refetch() });
            }, [a.error, a.refetch]),
            a.isPending)
          )
            return (0, b.jsx)(U, {});
          if (a.isError) return (0, b.jsx)(A, { error: a.error, onRetry: () => void a.refetch() });
          let { metrics: e, health: i, activity: j, topRoutes: k } = a.data,
            l = Math.max(...k.map((a) => a.requests), 1);
          return (0, b.jsxs)('div', {
            className: 'space-y-6',
            children: [
              (0, b.jsx)(n, { metrics: e }),
              (0, b.jsxs)('div', {
                className: 'grid gap-4 lg:grid-cols-3',
                children: [
                  (0, b.jsxs)(g.Card, {
                    className: 'lg:col-span-2',
                    children: [
                      (0, b.jsxs)(g.CardHeader, {
                        children: [
                          (0, b.jsx)(g.CardTitle, { children: 'Requests (24 jam)' }),
                          (0, b.jsx)(g.CardDescription, { children: 'Total request per jam' }),
                        ],
                      }),
                      (0, b.jsx)(g.CardContent, {
                        children: (0, b.jsx)(P.ResponsiveContainer, {
                          width: '100%',
                          height: 280,
                          children: (0, b.jsxs)(O.LineChart, {
                            data: e.series.map((a) => ({ ...a })),
                            children: [
                              (0, b.jsx)(M.CartesianGrid, {
                                strokeDasharray: '3 3',
                                className: 'opacity-30',
                              }),
                              (0, b.jsx)(R.XAxis, {
                                dataKey: 'timestamp',
                                fontSize: 11,
                                stroke: 'hsl(var(--muted-foreground))',
                              }),
                              (0, b.jsx)(S.YAxis, {
                                fontSize: 11,
                                stroke: 'hsl(var(--muted-foreground))',
                              }),
                              (0, b.jsx)(Q.Tooltip, {}),
                              (0, b.jsx)(N.Line, {
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
                  (0, b.jsxs)(g.Card, {
                    children: [
                      (0, b.jsxs)(g.CardHeader, {
                        children: [
                          (0, b.jsx)(g.CardTitle, { children: 'Top Routes' }),
                          (0, b.jsx)(g.CardDescription, { children: 'Berdasarkan jumlah request' }),
                        ],
                      }),
                      (0, b.jsx)(g.CardContent, {
                        children: (0, b.jsx)('ul', {
                          className: 'space-y-3',
                          children: k.map((a) =>
                            (0, b.jsxs)(
                              'li',
                              {
                                className: 'space-y-1.5',
                                children: [
                                  (0, b.jsxs)('div', {
                                    className: 'flex items-center justify-between gap-3 text-xs',
                                    children: [
                                      (0, b.jsxs)('span', {
                                        className: 'truncate font-mono',
                                        children: [a.method, ' ', a.path],
                                      }),
                                      (0, b.jsx)('span', {
                                        children: (0, h.formatNumber)(a.requests),
                                      }),
                                    ],
                                  }),
                                  (0, b.jsx)('div', {
                                    className: 'h-1.5 overflow-hidden rounded-full bg-muted',
                                    children: (0, b.jsx)('div', {
                                      className: 'h-full bg-primary',
                                      style: { width: `${(a.requests / l) * 100}%` },
                                    }),
                                  }),
                                ],
                              },
                              `${a.method} ${a.path}`,
                            ),
                          ),
                        }),
                      }),
                    ],
                  }),
                ],
              }),
              (0, b.jsxs)('div', {
                className: 'grid gap-4 lg:grid-cols-2',
                children: [
                  (0, b.jsxs)(g.Card, {
                    children: [
                      (0, b.jsxs)(g.CardHeader, {
                        children: [
                          (0, b.jsx)(g.CardTitle, { children: 'Service Health' }),
                          (0, b.jsx)(g.CardDescription, {
                            children: 'Status upstream dan dependency',
                          }),
                        ],
                      }),
                      (0, b.jsx)(g.CardContent, {
                        children: (0, b.jsx)('ul', {
                          className: 'space-y-3',
                          children: i.map((a) =>
                            (0, b.jsxs)(
                              'li',
                              {
                                className: 'flex items-center justify-between gap-4 text-sm',
                                children: [
                                  (0, b.jsx)('span', {
                                    className: 'font-medium',
                                    children: a.name,
                                  }),
                                  (0, b.jsxs)('span', {
                                    className: 'text-xs text-muted-foreground',
                                    children: [a.status, ' · ', a.latencyMs, ' ms'],
                                  }),
                                ],
                              },
                              a.name,
                            ),
                          ),
                        }),
                      }),
                    ],
                  }),
                  (0, b.jsxs)(g.Card, {
                    children: [
                      (0, b.jsxs)(g.CardHeader, {
                        children: [
                          (0, b.jsx)(g.CardTitle, { children: 'Recent Activity' }),
                          (0, b.jsx)(g.CardDescription, {
                            children: 'Perubahan konfigurasi terakhir',
                          }),
                        ],
                      }),
                      (0, b.jsx)(g.CardContent, {
                        children: (0, b.jsx)('ul', {
                          className: 'space-y-3',
                          children: j.map((a) =>
                            (0, b.jsxs)(
                              'li',
                              {
                                className: 'flex items-start gap-3 text-sm',
                                children: [
                                  (0, b.jsx)(f, {
                                    className: 'mt-0.5 h-4 w-4 shrink-0 text-muted-foreground',
                                    'aria-hidden': 'true',
                                  }),
                                  (0, b.jsxs)('div', {
                                    children: [
                                      (0, b.jsxs)('p', {
                                        children: [
                                          (0, b.jsx)('span', {
                                            className: 'text-primary',
                                            children: a.actor,
                                          }),
                                          ' ',
                                          a.action,
                                          ' ',
                                          a.target,
                                        ],
                                      }),
                                      (0, b.jsx)('p', {
                                        className: 'mt-0.5 text-xs text-muted-foreground',
                                        children: (0, h.relativeTime)(a.timestamp),
                                      }),
                                    ],
                                  }),
                                ],
                              },
                              a.id,
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
        T,
      ],
      20021,
    );
  },
  38951,
  (a) => {
    'use strict';
    var b = a.i(73304),
      c = a.i(48326),
      d = a.i(91385);
    function e(a, b, c) {
      let e = a.getMutationCache(),
        f = a.getQueryCache(),
        g = c?.defaultOptions?.deserializeData ?? a.getDefaultOptions().hydrate?.deserializeData;
      (b.mutations?.forEach(({ state: b, ...d }) => {
        e.build(
          a,
          { ...a.getDefaultOptions().hydrate?.mutations, ...c?.defaultOptions?.mutations, ...d },
          b,
        );
      }),
        b.queries?.forEach(
          ({
            queryKey: b,
            state: e,
            queryHash: h,
            meta: i,
            promise: j,
            dehydratedAt: k,
            queryType: l,
          }) => {
            let m = j
                ? (function (a) {
                    let b;
                    if ((a.then((a) => ((b = a), a), d.noop)?.catch?.(d.noop), void 0 !== b))
                      return { data: b };
                  })(j)
                : void 0,
              n = void 0 === e.data ? m?.data : e.data,
              o = void 0 === n ? n : g ? g(n) : n,
              p = f.get(h),
              q = p?.state.status === 'pending',
              r = p?.state.fetchStatus === 'fetching';
            if (p) {
              let a = m && k > p.state.dataUpdatedAt;
              if (e.dataUpdatedAt > p.state.dataUpdatedAt || a) {
                let { fetchStatus: a, ...b } = e;
                p.setState({
                  ...b,
                  data: o,
                  ...('pending' === e.status &&
                    void 0 !== o && {
                      status: 'success',
                      dataUpdatedAt: k,
                      ...(!r && { fetchStatus: 'idle' }),
                    }),
                });
              }
            } else
              p = f.build(
                a,
                {
                  ...a.getDefaultOptions().hydrate?.queries,
                  ...c?.defaultOptions?.queries,
                  queryKey: b,
                  queryHash: h,
                  meta: i,
                  _type: l,
                },
                {
                  ...e,
                  data: o,
                  fetchStatus: 'idle',
                  status: 'pending' === e.status && void 0 !== o ? 'success' : e.status,
                  ...('pending' === e.status && void 0 !== o && { dataUpdatedAt: k }),
                },
              );
            !j ||
              m ||
              q ||
              r ||
              !(k > p.state.dataUpdatedAt) ||
              p.fetch(void 0, { initialPromise: Promise.resolve(j).then(g) }).catch(d.noop);
          },
        ));
    }
    a.s(
      [
        'HydrationBoundary',
        0,
        ({ children: a, options: d = {}, state: f, queryClient: g }) => {
          let h = (0, b.useQueryClient)(g),
            i = c.useRef(d);
          c.useEffect(() => {
            i.current = d;
          });
          let j = c.useMemo(() => {
            if (f) {
              if ('object' != typeof f) return;
              let a = h.getQueryCache(),
                b = f.queries || [],
                c = [],
                d = [];
              for (let e of b) {
                let b = a.get(e.queryHash);
                b
                  ? (e.state.dataUpdatedAt > b.state.dataUpdatedAt ||
                      (e.promise &&
                        'pending' !== b.state.status &&
                        'fetching' !== b.state.fetchStatus &&
                        e.dehydratedAt > b.state.dataUpdatedAt)) &&
                    d.push(e)
                  : c.push(e);
              }
              if ((c.length > 0 && e(h, { queries: c }, i.current), d.length > 0)) return d;
            }
          }, [h, f]);
          return (
            c.useEffect(() => {
              j && e(h, { queries: j }, i.current);
            }, [h, j]),
            a
          );
        },
      ],
      38951,
    );
  },
];

//# sourceMappingURL=_1ytgron._.js.map
