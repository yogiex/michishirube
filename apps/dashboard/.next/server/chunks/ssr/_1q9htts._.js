module.exports = [
  6015,
  (a) => {
    'use strict';
    var b = a.i(68508),
      c = a.i(48326),
      d = a.i(7104),
      e = a.i(91178),
      f = a.i(72031),
      g = a.i(44198),
      h = a.i(12616),
      i = a.i(48741),
      j = a.i(75414),
      k = a.i(60301),
      l = a.i(45614),
      m = a.i(86458),
      n = a.i(2768);
    function o({ route: a }) {
      return (0, b.jsxs)(m.TableRow, {
        children: [
          (0, b.jsx)(m.TableCell, { className: 'font-mono text-xs', children: a.path }),
          (0, b.jsx)(m.TableCell, {
            children: (0, b.jsx)(l.Badge, {
              variant: 'outline',
              className: 'font-mono',
              children: a.method,
            }),
          }),
          (0, b.jsx)(m.TableCell, { className: 'text-sm', children: a.upstream }),
          (0, b.jsx)(m.TableCell, {
            children: a.requireAuth
              ? (0, b.jsx)(l.Badge, { variant: 'secondary', children: 'Required' })
              : (0, b.jsx)('span', {
                  className: 'text-xs text-muted-foreground',
                  children: 'Public',
                }),
          }),
          (0, b.jsx)(m.TableCell, {
            children: (0, b.jsxs)('div', {
              className: 'flex items-center gap-2',
              children: [
                (0, b.jsx)('span', {
                  className: `h-2 w-2 rounded-full ${a.enabled ? 'bg-green-500' : 'bg-gray-400'}`,
                }),
                (0, b.jsx)('span', {
                  className: 'text-xs',
                  children: a.enabled ? 'Enabled' : 'Disabled',
                }),
              ],
            }),
          }),
          (0, b.jsx)(m.TableCell, {
            className: 'text-right',
            children: (0, b.jsx)(i.Button, {
              variant: 'ghost',
              size: 'sm',
              asChild: !0,
              children: (0, b.jsx)(e.default, { href: `/routes/${a.id}`, children: 'Edit' }),
            }),
          }),
        ],
      });
    }
    a.s([
      'default',
      0,
      function () {
        let [a, e] = (0, c.useState)(''),
          { data: l = [], isLoading: p } = (0, d.useQuery)({
            queryKey: ['routes'],
            queryFn: async () => (await new Promise((a) => setTimeout(a, 300)), n.mockRoutes),
          }),
          q = l.filter(
            (b) =>
              b.path.toLowerCase().includes(a.toLowerCase()) ||
              b.upstream.toLowerCase().includes(a.toLowerCase()),
          );
        return (0, b.jsxs)('div', {
          className: 'space-y-6',
          children: [
            (0, b.jsxs)('div', {
              className: 'flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between',
              children: [
                (0, b.jsxs)('div', {
                  children: [
                    (0, b.jsx)('h2', {
                      className: 'text-2xl font-semibold tracking-tight',
                      children: 'Routes',
                    }),
                    (0, b.jsx)('p', {
                      className: 'text-sm text-muted-foreground',
                      children: 'Kelola routing request ke upstream service',
                    }),
                  ],
                }),
                (0, b.jsxs)('div', {
                  className: 'flex gap-2',
                  children: [
                    (0, b.jsxs)(i.Button, {
                      variant: 'outline',
                      size: 'sm',
                      children: [
                        (0, b.jsx)(h.RefreshCw, { className: 'mr-2 h-4 w-4' }),
                        'Reload Config',
                      ],
                    }),
                    (0, b.jsxs)(i.Button, {
                      size: 'sm',
                      children: [(0, b.jsx)(f.Plus, { className: 'mr-2 h-4 w-4' }), 'New Route'],
                    }),
                  ],
                }),
              ],
            }),
            (0, b.jsx)('div', {
              className: 'flex items-center gap-2',
              children: (0, b.jsxs)('div', {
                className: 'relative flex-1 max-w-sm',
                children: [
                  (0, b.jsx)(g.Search, {
                    className:
                      'absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground',
                  }),
                  (0, b.jsx)(j.Input, {
                    placeholder: 'Search routes...',
                    value: a,
                    onChange: (a) => e(a.target.value),
                    className: 'pl-9',
                  }),
                ],
              }),
            }),
            (0, b.jsx)(k.Card, {
              children: (0, b.jsx)(k.CardContent, {
                className: 'p-0',
                children: (0, b.jsxs)(m.Table, {
                  children: [
                    (0, b.jsx)(m.TableHeader, {
                      children: (0, b.jsxs)(m.TableRow, {
                        children: [
                          (0, b.jsx)(m.TableHead, { children: 'Path' }),
                          (0, b.jsx)(m.TableHead, { children: 'Method' }),
                          (0, b.jsx)(m.TableHead, { children: 'Upstream' }),
                          (0, b.jsx)(m.TableHead, { children: 'Auth' }),
                          (0, b.jsx)(m.TableHead, { children: 'Status' }),
                          (0, b.jsx)(m.TableHead, { className: 'text-right', children: 'Actions' }),
                        ],
                      }),
                    }),
                    (0, b.jsx)(m.TableBody, {
                      children: p
                        ? (0, b.jsx)(m.TableRow, {
                            children: (0, b.jsx)(m.TableCell, {
                              colSpan: 6,
                              className: 'text-center py-8 text-muted-foreground',
                              children: 'Loading...',
                            }),
                          })
                        : 0 === q.length
                          ? (0, b.jsx)(m.TableRow, {
                              children: (0, b.jsx)(m.TableCell, {
                                colSpan: 6,
                                className: 'text-center py-8 text-muted-foreground',
                                children: 'Tidak ada route ditemukan',
                              }),
                            })
                          : q.map((a) => (0, b.jsx)(o, { route: a }, a.id)),
                    }),
                  ],
                }),
              }),
            }),
          ],
        });
      },
    ]);
  },
  45614,
  (a) => {
    'use strict';
    var b = a.i(68508),
      c = a.i(42261),
      d = a.i(35147);
    let e = (0, c.cva)(
      'inline-flex items-center gap-1 rounded-[4px] border px-2 py-0.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
      {
        variants: {
          variant: {
            default:
              'border-transparent bg-primary text-primary-foreground shadow-sm hover:bg-primary/80',
            secondary: 'border-transparent bg-muted text-foreground hover:bg-muted/80',
            destructive:
              'border-transparent bg-destructive text-primary-foreground shadow-sm hover:bg-destructive/80',
            outline: 'border-border text-foreground',
          },
        },
        defaultVariants: { variant: 'default' },
      },
    );
    a.s([
      'Badge',
      0,
      function ({ className: a, variant: c, ...f }) {
        return (0, b.jsx)('div', { className: (0, d.cn)(e({ variant: c }), a), ...f });
      },
    ]);
  },
  60301,
  (a) => {
    'use strict';
    var b = a.i(68508),
      c = a.i(48326),
      d = a.i(35147);
    let e = c.forwardRef(({ className: a, ...c }, e) =>
      (0, b.jsx)('div', {
        ref: e,
        className: (0, d.cn)(
          'rounded-[8px] border border-border bg-background text-foreground shadow-sm',
          a,
        ),
        ...c,
      }),
    );
    e.displayName = 'Card';
    let f = c.forwardRef(({ className: a, ...c }, e) =>
      (0, b.jsx)('div', { ref: e, className: (0, d.cn)('flex flex-col space-y-2 p-6', a), ...c }),
    );
    f.displayName = 'CardHeader';
    let g = c.forwardRef(({ className: a, ...c }, e) =>
      (0, b.jsx)('h3', {
        ref: e,
        className: (0, d.cn)('font-semibold leading-none tracking-tight', a),
        ...c,
      }),
    );
    g.displayName = 'CardTitle';
    let h = c.forwardRef(({ className: a, ...c }, e) =>
      (0, b.jsx)('p', { ref: e, className: (0, d.cn)('text-sm text-muted-foreground', a), ...c }),
    );
    h.displayName = 'CardDescription';
    let i = c.forwardRef(({ className: a, ...c }, e) =>
      (0, b.jsx)('div', { ref: e, className: (0, d.cn)('p-6 pt-0', a), ...c }),
    );
    ((i.displayName = 'CardContent'),
      (c.forwardRef(({ className: a, ...c }, e) =>
        (0, b.jsx)('div', { ref: e, className: (0, d.cn)('flex items-center p-6 pt-0', a), ...c }),
      ).displayName = 'CardFooter'),
      a.s([
        'Card',
        0,
        e,
        'CardContent',
        0,
        i,
        'CardDescription',
        0,
        h,
        'CardHeader',
        0,
        f,
        'CardTitle',
        0,
        g,
      ]));
  },
  75414,
  (a) => {
    'use strict';
    var b = a.i(68508),
      c = a.i(48326),
      d = a.i(35147);
    let e = c.forwardRef(({ className: a, type: c, ...e }, f) =>
      (0, b.jsx)('input', {
        type: c,
        className: (0, d.cn)(
          'flex h-9 w-full rounded-[4px] border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive',
          a,
        ),
        ref: f,
        ...e,
      }),
    );
    ((e.displayName = 'Input'), a.s(['Input', 0, e]));
  },
  86458,
  (a) => {
    'use strict';
    var b = a.i(68508),
      c = a.i(48326),
      d = a.i(35147);
    let e = c.forwardRef(({ className: a, ...c }, e) =>
      (0, b.jsx)('div', {
        className: 'relative w-full overflow-auto',
        children: (0, b.jsx)('table', {
          ref: e,
          className: (0, d.cn)('w-full caption-bottom text-sm text-foreground', a),
          ...c,
        }),
      }),
    );
    e.displayName = 'Table';
    let f = c.forwardRef(({ className: a, ...c }, e) =>
      (0, b.jsx)('thead', {
        ref: e,
        className: (0, d.cn)('border-b border-border [&_tr]:border-b', a),
        ...c,
      }),
    );
    f.displayName = 'TableHeader';
    let g = c.forwardRef(({ className: a, ...c }, e) =>
      (0, b.jsx)('tbody', { ref: e, className: (0, d.cn)('[&_tr:last-child]:border-0', a), ...c }),
    );
    g.displayName = 'TableBody';
    let h = c.forwardRef(({ className: a, ...c }, e) =>
      (0, b.jsx)('tr', {
        ref: e,
        className: (0, d.cn)(
          'border-b border-border transition-colors hover:bg-muted/50 focus-within:bg-muted data-[state=selected]:bg-muted',
          a,
        ),
        ...c,
      }),
    );
    h.displayName = 'TableRow';
    let i = c.forwardRef(({ className: a, ...c }, e) =>
      (0, b.jsx)('th', {
        ref: e,
        className: (0, d.cn)(
          'h-10 px-3 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
          a,
        ),
        ...c,
      }),
    );
    i.displayName = 'TableHead';
    let j = c.forwardRef(({ className: a, ...c }, e) =>
      (0, b.jsx)('td', {
        ref: e,
        className: (0, d.cn)(
          'p-3 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
          a,
        ),
        ...c,
      }),
    );
    ((j.displayName = 'TableCell'),
      a.s([
        'Table',
        0,
        e,
        'TableBody',
        0,
        g,
        'TableCell',
        0,
        j,
        'TableHead',
        0,
        i,
        'TableHeader',
        0,
        f,
        'TableRow',
        0,
        h,
      ]));
  },
  2768,
  (a) => {
    'use strict';
    a.s([
      'generateMetricSeries',
      0,
      function (a = 24) {
        return Array.from({ length: a }, (a, b) => {
          let c = b.toString().padStart(2, '0'),
            d = 3e3 + 1500 * Math.sin(b / 3) + 500 * Math.random();
          return {
            time: `${c}:00`,
            requests: Math.round(d),
            errors: Math.round(0.001 * d * Math.random()),
            p95: Math.round(40 + 20 * Math.random()),
          };
        });
      },
      'mockActivity',
      0,
      [
        {
          id: 'a_1',
          timestamp: '2026-09-22T12:34:21Z',
          actor: 'admin',
          action: 'config.reload',
          target: 'routes',
          status: 'success',
        },
        {
          id: 'a_2',
          timestamp: '2026-09-22T12:30:02Z',
          actor: 'admin',
          action: 'api_key.create',
          target: 'partner-acme',
          status: 'success',
        },
        {
          id: 'a_3',
          timestamp: '2026-09-22T12:15:44Z',
          actor: 'system',
          action: 'circuit.open',
          target: 'billing-svc',
          status: 'warning',
        },
        {
          id: 'a_4',
          timestamp: '2026-09-22T12:10:11Z',
          actor: 'admin',
          action: 'tenant.update',
          target: 'beta',
          status: 'success',
        },
      ],
      'mockApiKeys',
      0,
      [
        {
          id: 'k_001',
          name: 'partner-acme',
          tenantId: 'acme',
          scopes: ['order:read'],
          status: 'active',
          usageCount: 4200,
          createdAt: '2026-08-20T10:00:00Z',
          lastUsedAt: '2026-09-22T12:32:00Z',
        },
        {
          id: 'k_002',
          name: 'prod-acme-01',
          tenantId: 'acme',
          scopes: ['*:*'],
          status: 'active',
          usageCount: 12e5,
          createdAt: '2026-08-15T10:00:00Z',
          lastUsedAt: '2026-09-22T12:34:00Z',
        },
        {
          id: 'k_003',
          name: 'prod-beta-01',
          tenantId: 'beta',
          scopes: ['order:*'],
          status: 'active',
          usageCount: 456e3,
          createdAt: '2026-08-20T10:00:00Z',
          lastUsedAt: '2026-09-22T11:15:00Z',
        },
        {
          id: 'k_004',
          name: 'staging-old',
          tenantId: 'acme',
          scopes: ['order:read'],
          status: 'revoked',
          usageCount: 0,
          createdAt: '2026-06-01T10:00:00Z',
        },
      ],
      'mockRoutes',
      0,
      [
        {
          id: 'r_001',
          path: '/api/v1/orders',
          method: 'GET',
          upstream: 'order-svc',
          enabled: !0,
          requireAuth: !0,
          createdAt: '2026-08-15T10:00:00Z',
        },
        {
          id: 'r_002',
          path: '/api/v1/orders',
          method: 'POST',
          upstream: 'order-svc',
          enabled: !0,
          requireAuth: !0,
          requireIdempotency: !0,
          createdAt: '2026-08-15T10:00:00Z',
        },
        {
          id: 'r_003',
          path: '/api/v1/orders/:id',
          method: 'GET',
          upstream: 'order-svc',
          enabled: !0,
          requireAuth: !0,
          createdAt: '2026-08-15T10:00:00Z',
        },
        {
          id: 'r_004',
          path: '/api/v1/users',
          method: 'GET',
          upstream: 'auth-svc',
          enabled: !0,
          requireAuth: !0,
          createdAt: '2026-08-15T10:00:00Z',
        },
        {
          id: 'r_005',
          path: '/api/v1/users/:id',
          method: 'GET',
          upstream: 'auth-svc',
          enabled: !0,
          requireAuth: !0,
          createdAt: '2026-08-15T10:00:00Z',
        },
        {
          id: 'r_006',
          path: '/api/v1/billing',
          method: 'GET',
          upstream: 'billing-svc',
          enabled: !1,
          requireAuth: !0,
          createdAt: '2026-08-20T10:00:00Z',
        },
        {
          id: 'r_007',
          path: '/api/v1/webhooks',
          method: 'POST',
          upstream: 'notif-svc',
          enabled: !0,
          requireAuth: !1,
          createdAt: '2026-09-01T10:00:00Z',
        },
        {
          id: 'r_008',
          path: '/api/v1/legacy/*',
          method: 'ALL',
          upstream: 'legacy-svc',
          enabled: !1,
          requireAuth: !1,
          createdAt: '2026-09-10T10:00:00Z',
        },
      ],
      'mockTenants',
      0,
      [
        {
          id: 't_001',
          slug: 'acme',
          name: 'Acme Corporation',
          tier: 'enterprise',
          status: 'active',
          createdAt: '2026-08-15T10:00:00Z',
          requests: 1245231,
        },
        {
          id: 't_002',
          slug: 'beta',
          name: 'Beta Inc',
          tier: 'pro',
          status: 'active',
          createdAt: '2026-08-20T10:00:00Z',
          requests: 456102,
        },
        {
          id: 't_003',
          slug: 'gamma',
          name: 'Gamma LLC',
          tier: 'free',
          status: 'suspended',
          createdAt: '2026-08-25T10:00:00Z',
          requests: 12003,
        },
        {
          id: 't_004',
          slug: 'delta',
          name: 'Delta Co',
          tier: 'pro',
          status: 'active',
          createdAt: '2026-09-01T10:00:00Z',
          requests: 89441,
        },
        {
          id: 't_005',
          slug: 'epsilon',
          name: 'Epsilon Ltd',
          tier: 'free',
          status: 'inactive',
          createdAt: '2026-09-10T10:00:00Z',
          requests: 0,
        },
      ],
    ]);
  },
  72031,
  44198,
  (a) => {
    'use strict';
    var b = a.i(10641);
    let c = (0, b.default)('Plus', [
      ['path', { d: 'M5 12h14', key: '1ays0h' }],
      ['path', { d: 'M12 5v14', key: 's699le' }],
    ]);
    a.s(['Plus', 0, c], 72031);
    let d = (0, b.default)('Search', [
      ['circle', { cx: '11', cy: '11', r: '8', key: '4ej97u' }],
      ['path', { d: 'm21 21-4.3-4.3', key: '1qie3q' }],
    ]);
    a.s(['Search', 0, d], 44198);
  },
  12616,
  (a) => {
    'use strict';
    let b = (0, a.i(10641).default)('RefreshCw', [
      ['path', { d: 'M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8', key: 'v9h5vc' }],
      ['path', { d: 'M21 3v5h-5', key: '1q7to0' }],
      ['path', { d: 'M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16', key: '3uifl3' }],
      ['path', { d: 'M8 16H3v5', key: '1cv678' }],
    ]);
    a.s(['RefreshCw', 0, b], 12616);
  },
];

//# sourceMappingURL=_1q9htts._.js.map
