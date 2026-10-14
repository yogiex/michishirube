(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  'object' == typeof document ? document.currentScript : void 0,
  69587,
  (e) => {
    'use strict';
    var t = e.i(24830),
      a = e.i(54815),
      r = e.i(93265),
      s = e.i(87308),
      i = e.i(94531),
      d = e.i(89581),
      n = e.i(86771),
      o = e.i(76492),
      c = e.i(61991),
      l = e.i(22919),
      m = e.i(49220),
      p = e.i(82342),
      u = e.i(24723),
      h = (0, m.generateCategoricalChart)({
        chartName: 'BarChart',
        GraphicalChild: p.Bar,
        defaultTooltipEventType: 'axis',
        validateTooltipEventTypes: ['axis', 'item'],
        axisComponents: [
          { axisType: 'xAxis', AxisComp: d.XAxis },
          { axisType: 'yAxis', AxisComp: n.YAxis },
        ],
        formatAxisMap: u.formatAxisMap,
      });
    e.s(
      [
        'default',
        0,
        function () {
          let e = (0, r.generateMetricSeries)(24);
          return (0, t.jsxs)('div', {
            className: 'space-y-6',
            children: [
              (0, t.jsxs)('div', {
                children: [
                  (0, t.jsx)('h2', {
                    className: 'text-2xl font-semibold tracking-tight',
                    children: 'Metrics',
                  }),
                  (0, t.jsx)('p', {
                    className: 'text-sm text-muted-foreground',
                    children: 'Analytics performa gateway',
                  }),
                ],
              }),
              (0, t.jsxs)('div', {
                className: 'grid gap-4 lg:grid-cols-2',
                children: [
                  (0, t.jsxs)(a.Card, {
                    children: [
                      (0, t.jsx)(a.CardHeader, {
                        children: (0, t.jsx)(a.CardTitle, { children: 'Requests (24 jam)' }),
                      }),
                      (0, t.jsx)(a.CardContent, {
                        children: (0, t.jsx)(c.ResponsiveContainer, {
                          width: '100%',
                          height: 240,
                          children: (0, t.jsxs)(s.LineChart, {
                            data: e,
                            children: [
                              (0, t.jsx)(l.CartesianGrid, {
                                strokeDasharray: '3 3',
                                className: 'opacity-30',
                              }),
                              (0, t.jsx)(d.XAxis, { dataKey: 'time', fontSize: 11 }),
                              (0, t.jsx)(n.YAxis, { fontSize: 11 }),
                              (0, t.jsx)(o.Tooltip, {}),
                              (0, t.jsx)(i.Line, {
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
                  (0, t.jsxs)(a.Card, {
                    children: [
                      (0, t.jsx)(a.CardHeader, {
                        children: (0, t.jsx)(a.CardTitle, { children: 'p95 Latency (ms)' }),
                      }),
                      (0, t.jsx)(a.CardContent, {
                        children: (0, t.jsx)(c.ResponsiveContainer, {
                          width: '100%',
                          height: 240,
                          children: (0, t.jsxs)(h, {
                            data: e,
                            children: [
                              (0, t.jsx)(l.CartesianGrid, {
                                strokeDasharray: '3 3',
                                className: 'opacity-30',
                              }),
                              (0, t.jsx)(d.XAxis, { dataKey: 'time', fontSize: 11 }),
                              (0, t.jsx)(n.YAxis, { fontSize: 11 }),
                              (0, t.jsx)(o.Tooltip, {}),
                              (0, t.jsx)(p.Bar, {
                                dataKey: 'p95',
                                fill: 'hsl(var(--primary))',
                                radius: [4, 4, 0, 0],
                              }),
                            ],
                          }),
                        }),
                      }),
                    ],
                  }),
                ],
              }),
            ],
          });
        },
      ],
      69587,
    );
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
    let i = a.forwardRef(({ className: e, ...a }, s) =>
      (0, t.jsx)('div', { ref: s, className: (0, r.cn)('flex flex-col space-y-2 p-6', e), ...a }),
    );
    i.displayName = 'CardHeader';
    let d = a.forwardRef(({ className: e, ...a }, s) =>
      (0, t.jsx)('h3', {
        ref: s,
        className: (0, r.cn)('font-semibold leading-none tracking-tight', e),
        ...a,
      }),
    );
    d.displayName = 'CardTitle';
    let n = a.forwardRef(({ className: e, ...a }, s) =>
      (0, t.jsx)('p', { ref: s, className: (0, r.cn)('text-sm text-muted-foreground', e), ...a }),
    );
    n.displayName = 'CardDescription';
    let o = a.forwardRef(({ className: e, ...a }, s) =>
      (0, t.jsx)('div', { ref: s, className: (0, r.cn)('p-6 pt-0', e), ...a }),
    );
    ((o.displayName = 'CardContent'),
      (a.forwardRef(({ className: e, ...a }, s) =>
        (0, t.jsx)('div', { ref: s, className: (0, r.cn)('flex items-center p-6 pt-0', e), ...a }),
      ).displayName = 'CardFooter'),
      e.s([
        'Card',
        0,
        s,
        'CardContent',
        0,
        o,
        'CardDescription',
        0,
        n,
        'CardHeader',
        0,
        i,
        'CardTitle',
        0,
        d,
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
