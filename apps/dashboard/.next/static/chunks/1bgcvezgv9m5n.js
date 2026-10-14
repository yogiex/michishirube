(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  'object' == typeof document ? document.currentScript : void 0,
  96702,
  (e) => {
    'use strict';
    var t = e.i(24830),
      a = e.i(54815),
      r = e.i(40720),
      s = e.i(6773),
      d = e.i(93265),
      i = e.i(59992);
    e.s([
      'default',
      0,
      function () {
        return (0, t.jsxs)('div', {
          className: 'space-y-6',
          children: [
            (0, t.jsxs)('div', {
              children: [
                (0, t.jsx)('h2', {
                  className: 'text-2xl font-semibold tracking-tight',
                  children: 'Audit Log',
                }),
                (0, t.jsx)('p', {
                  className: 'text-sm text-muted-foreground',
                  children: 'Riwayat perubahan konfigurasi',
                }),
              ],
            }),
            (0, t.jsx)(a.Card, {
              children: (0, t.jsx)(a.CardContent, {
                className: 'p-0',
                children: (0, t.jsxs)(r.Table, {
                  children: [
                    (0, t.jsx)(r.TableHeader, {
                      children: (0, t.jsxs)(r.TableRow, {
                        children: [
                          (0, t.jsx)(r.TableHead, { children: 'Time' }),
                          (0, t.jsx)(r.TableHead, { children: 'Actor' }),
                          (0, t.jsx)(r.TableHead, { children: 'Action' }),
                          (0, t.jsx)(r.TableHead, { children: 'Target' }),
                          (0, t.jsx)(r.TableHead, { children: 'Status' }),
                        ],
                      }),
                    }),
                    (0, t.jsx)(r.TableBody, {
                      children: d.mockActivity.map((e) =>
                        (0, t.jsxs)(
                          r.TableRow,
                          {
                            children: [
                              (0, t.jsx)(r.TableCell, {
                                className: 'text-xs text-muted-foreground',
                                children: (0, i.formatDate)(e.timestamp),
                              }),
                              (0, t.jsx)(r.TableCell, {
                                className: 'font-medium',
                                children: e.actor,
                              }),
                              (0, t.jsx)(r.TableCell, {
                                className: 'font-mono text-xs',
                                children: e.action,
                              }),
                              (0, t.jsx)(r.TableCell, { className: 'text-sm', children: e.target }),
                              (0, t.jsx)(r.TableCell, {
                                children: (0, t.jsx)(s.Badge, {
                                  variant: 'success' === e.status ? 'default' : 'secondary',
                                  children: e.status,
                                }),
                              }),
                            ],
                          },
                          e.id,
                        ),
                      ),
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
  6773,
  (e) => {
    'use strict';
    var t = e.i(24830),
      a = e.i(94237),
      r = e.i(59992);
    let s = (0, a.cva)(
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
    e.s([
      'Badge',
      0,
      function ({ className: e, variant: a, ...d }) {
        return (0, t.jsx)('div', { className: (0, r.cn)(s({ variant: a }), e), ...d });
      },
    ]);
  },
  54815,
  (e) => {
    'use strict';
    var t = e.i(24830),
      a = e.i(39380),
      r = e.i(59992);
    let s = a.forwardRef(({ className: e, ...a }, s) =>
      (0, t.jsx)('div', {
        ref: s,
        className: (0, r.cn)(
          'rounded-[8px] border border-border bg-background text-foreground shadow-sm',
          e,
        ),
        ...a,
      }),
    );
    s.displayName = 'Card';
    let d = a.forwardRef(({ className: e, ...a }, s) =>
      (0, t.jsx)('div', { ref: s, className: (0, r.cn)('flex flex-col space-y-2 p-6', e), ...a }),
    );
    d.displayName = 'CardHeader';
    let i = a.forwardRef(({ className: e, ...a }, s) =>
      (0, t.jsx)('h3', {
        ref: s,
        className: (0, r.cn)('font-semibold leading-none tracking-tight', e),
        ...a,
      }),
    );
    i.displayName = 'CardTitle';
    let o = a.forwardRef(({ className: e, ...a }, s) =>
      (0, t.jsx)('p', { ref: s, className: (0, r.cn)('text-sm text-muted-foreground', e), ...a }),
    );
    o.displayName = 'CardDescription';
    let l = a.forwardRef(({ className: e, ...a }, s) =>
      (0, t.jsx)('div', { ref: s, className: (0, r.cn)('p-6 pt-0', e), ...a }),
    );
    ((l.displayName = 'CardContent'),
      (a.forwardRef(({ className: e, ...a }, s) =>
        (0, t.jsx)('div', { ref: s, className: (0, r.cn)('flex items-center p-6 pt-0', e), ...a }),
      ).displayName = 'CardFooter'),
      e.s([
        'Card',
        0,
        s,
        'CardContent',
        0,
        l,
        'CardDescription',
        0,
        o,
        'CardHeader',
        0,
        d,
        'CardTitle',
        0,
        i,
      ]));
  },
  40720,
  (e) => {
    'use strict';
    var t = e.i(24830),
      a = e.i(39380),
      r = e.i(59992);
    let s = a.forwardRef(({ className: e, ...a }, s) =>
      (0, t.jsx)('div', {
        className: 'relative w-full overflow-auto',
        children: (0, t.jsx)('table', {
          ref: s,
          className: (0, r.cn)('w-full caption-bottom text-sm text-foreground', e),
          ...a,
        }),
      }),
    );
    s.displayName = 'Table';
    let d = a.forwardRef(({ className: e, ...a }, s) =>
      (0, t.jsx)('thead', {
        ref: s,
        className: (0, r.cn)('border-b border-border [&_tr]:border-b', e),
        ...a,
      }),
    );
    d.displayName = 'TableHeader';
    let i = a.forwardRef(({ className: e, ...a }, s) =>
      (0, t.jsx)('tbody', { ref: s, className: (0, r.cn)('[&_tr:last-child]:border-0', e), ...a }),
    );
    i.displayName = 'TableBody';
    let o = a.forwardRef(({ className: e, ...a }, s) =>
      (0, t.jsx)('tr', {
        ref: s,
        className: (0, r.cn)(
          'border-b border-border transition-colors hover:bg-muted/50 focus-within:bg-muted data-[state=selected]:bg-muted',
          e,
        ),
        ...a,
      }),
    );
    o.displayName = 'TableRow';
    let l = a.forwardRef(({ className: e, ...a }, s) =>
      (0, t.jsx)('th', {
        ref: s,
        className: (0, r.cn)(
          'h-10 px-3 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
          e,
        ),
        ...a,
      }),
    );
    l.displayName = 'TableHead';
    let n = a.forwardRef(({ className: e, ...a }, s) =>
      (0, t.jsx)('td', {
        ref: s,
        className: (0, r.cn)(
          'p-3 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
          e,
        ),
        ...a,
      }),
    );
    ((n.displayName = 'TableCell'),
      e.s([
        'Table',
        0,
        s,
        'TableBody',
        0,
        i,
        'TableCell',
        0,
        n,
        'TableHead',
        0,
        l,
        'TableHeader',
        0,
        d,
        'TableRow',
        0,
        o,
      ]));
  },
  93265,
  (e) => {
    'use strict';
    e.s([
      'generateMetricSeries',
      0,
      function (e = 24) {
        return Array.from({ length: e }, (e, t) => {
          let a = t.toString().padStart(2, '0'),
            r = 3e3 + 1500 * Math.sin(t / 3) + 500 * Math.random();
          return {
            time: `${a}:00`,
            requests: Math.round(r),
            errors: Math.round(0.001 * r * Math.random()),
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
]);
