module.exports = [
  46957,
  (a) => {
    'use strict';
    var b = a.i(68508),
      c = a.i(60301),
      d = a.i(2768),
      e = a.i(49257),
      f = a.i(33354),
      g = a.i(32537),
      h = a.i(33104),
      i = a.i(38890),
      j = a.i(60970),
      k = a.i(43134),
      l = a.i(50489),
      m = a.i(82255),
      n = a.i(17275),
      o = (0, l.generateCategoricalChart)({
        chartName: 'BarChart',
        GraphicalChild: m.Bar,
        defaultTooltipEventType: 'axis',
        validateTooltipEventTypes: ['axis', 'item'],
        axisComponents: [
          { axisType: 'xAxis', AxisComp: g.XAxis },
          { axisType: 'yAxis', AxisComp: h.YAxis },
        ],
        formatAxisMap: n.formatAxisMap,
      });
    a.s(
      [
        'default',
        0,
        function () {
          let a = (0, d.generateMetricSeries)(24);
          return (0, b.jsxs)('div', {
            className: 'space-y-6',
            children: [
              (0, b.jsxs)('div', {
                children: [
                  (0, b.jsx)('h2', {
                    className: 'text-2xl font-semibold tracking-tight',
                    children: 'Metrics',
                  }),
                  (0, b.jsx)('p', {
                    className: 'text-sm text-muted-foreground',
                    children: 'Analytics performa gateway',
                  }),
                ],
              }),
              (0, b.jsxs)('div', {
                className: 'grid gap-4 lg:grid-cols-2',
                children: [
                  (0, b.jsxs)(c.Card, {
                    children: [
                      (0, b.jsx)(c.CardHeader, {
                        children: (0, b.jsx)(c.CardTitle, { children: 'Requests (24 jam)' }),
                      }),
                      (0, b.jsx)(c.CardContent, {
                        children: (0, b.jsx)(j.ResponsiveContainer, {
                          width: '100%',
                          height: 240,
                          children: (0, b.jsxs)(e.LineChart, {
                            data: a,
                            children: [
                              (0, b.jsx)(k.CartesianGrid, {
                                strokeDasharray: '3 3',
                                className: 'opacity-30',
                              }),
                              (0, b.jsx)(g.XAxis, { dataKey: 'time', fontSize: 11 }),
                              (0, b.jsx)(h.YAxis, { fontSize: 11 }),
                              (0, b.jsx)(i.Tooltip, {}),
                              (0, b.jsx)(f.Line, {
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
                  (0, b.jsxs)(c.Card, {
                    children: [
                      (0, b.jsx)(c.CardHeader, {
                        children: (0, b.jsx)(c.CardTitle, { children: 'p95 Latency (ms)' }),
                      }),
                      (0, b.jsx)(c.CardContent, {
                        children: (0, b.jsx)(j.ResponsiveContainer, {
                          width: '100%',
                          height: 240,
                          children: (0, b.jsxs)(o, {
                            data: a,
                            children: [
                              (0, b.jsx)(k.CartesianGrid, {
                                strokeDasharray: '3 3',
                                className: 'opacity-30',
                              }),
                              (0, b.jsx)(g.XAxis, { dataKey: 'time', fontSize: 11 }),
                              (0, b.jsx)(h.YAxis, { fontSize: 11 }),
                              (0, b.jsx)(i.Tooltip, {}),
                              (0, b.jsx)(m.Bar, {
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
      46957,
    );
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
];

//# sourceMappingURL=apps_dashboard_1j95jpz._.js.map
