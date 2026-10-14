(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  'object' == typeof document ? document.currentScript : void 0,
  64872,
  (e) => {
    'use strict';
    var a = e.i(24830),
      t = e.i(54815),
      s = e.i(36023),
      r = e.i(59915),
      d = e.i(32155);
    let i = (0, d.default)('Save', [
        [
          'path',
          {
            d: 'M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z',
            key: '1c8476',
          },
        ],
        ['path', { d: 'M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7', key: '1ydtos' }],
        ['path', { d: 'M7 3v4a1 1 0 0 0 1 1h7', key: 't51u73' }],
      ]),
      l = (0, d.default)('Download', [
        ['path', { d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', key: 'ih7n3h' }],
        ['polyline', { points: '7 10 12 15 17 10', key: '2ggqvy' }],
        ['line', { x1: '12', x2: '12', y1: '15', y2: '3', key: '1vk2je' }],
      ]);
    e.s(
      [
        'default',
        0,
        function () {
          return (0, a.jsxs)('div', {
            className: 'space-y-6',
            children: [
              (0, a.jsxs)('div', {
                className: 'flex items-center justify-between',
                children: [
                  (0, a.jsxs)('div', {
                    children: [
                      (0, a.jsx)('h2', {
                        className: 'text-2xl font-semibold tracking-tight',
                        children: 'Config',
                      }),
                      (0, a.jsx)('p', {
                        className: 'text-sm text-muted-foreground',
                        children: 'Edit konfigurasi YAML gateway',
                      }),
                    ],
                  }),
                  (0, a.jsxs)('div', {
                    className: 'flex gap-2',
                    children: [
                      (0, a.jsxs)(s.Button, {
                        variant: 'outline',
                        size: 'sm',
                        children: [
                          (0, a.jsx)(r.RefreshCw, { className: 'mr-2 h-4 w-4' }),
                          'Reload',
                        ],
                      }),
                      (0, a.jsxs)(s.Button, {
                        variant: 'outline',
                        size: 'sm',
                        children: [(0, a.jsx)(l, { className: 'mr-2 h-4 w-4' }), 'Export'],
                      }),
                      (0, a.jsxs)(s.Button, {
                        size: 'sm',
                        children: [(0, a.jsx)(i, { className: 'mr-2 h-4 w-4' }), 'Save'],
                      }),
                    ],
                  }),
                ],
              }),
              (0, a.jsxs)(t.Card, {
                children: [
                  (0, a.jsx)(t.CardHeader, {
                    className: 'border-b',
                    children: (0, a.jsx)('div', {
                      className: 'flex items-center justify-between',
                      children: (0, a.jsxs)('div', {
                        children: [
                          (0, a.jsx)(t.CardTitle, {
                            className: 'text-sm font-mono',
                            children: 'config/routes.yaml',
                          }),
                          (0, a.jsx)(t.CardDescription, {
                            className: 'text-xs',
                            children: 'Hot reload · auto-save',
                          }),
                        ],
                      }),
                    }),
                  }),
                  (0, a.jsx)(t.CardContent, {
                    className: 'p-0',
                    children: (0, a.jsx)('pre', {
                      className: 'overflow-x-auto p-4 text-xs font-mono leading-relaxed',
                      children: `routes:
  - id: r_001
    path: /api/v1/orders
    method: GET
    upstream: http://order-svc.internal
    enabled: true
    requireAuth: true
    rateLimit:
      limit: 100
      window: 60
    roles: [admin, user]

  - id: r_002
    path: /api/v1/orders
    method: POST
    upstream: http://order-svc.internal
    enabled: true
    requireAuth: true
    requireIdempotency: true`,
                    }),
                  }),
                ],
              }),
              (0, a.jsx)('p', {
                className: 'text-xs text-muted-foreground',
                children: 'Editor YAML interaktif akan ditambahkan setelah Admin API siap.',
              }),
            ],
          });
        },
      ],
      64872,
    );
  },
  54815,
  (e) => {
    'use strict';
    var a = e.i(24830),
      t = e.i(39380),
      s = e.i(59992);
    let r = t.forwardRef(({ className: e, ...t }, r) =>
      (0, a.jsx)('div', {
        ref: r,
        className: (0, s.cn)(
          'rounded-[8px] border border-border bg-background text-foreground shadow-sm',
          e,
        ),
        ...t,
      }),
    );
    r.displayName = 'Card';
    let d = t.forwardRef(({ className: e, ...t }, r) =>
      (0, a.jsx)('div', { ref: r, className: (0, s.cn)('flex flex-col space-y-2 p-6', e), ...t }),
    );
    d.displayName = 'CardHeader';
    let i = t.forwardRef(({ className: e, ...t }, r) =>
      (0, a.jsx)('h3', {
        ref: r,
        className: (0, s.cn)('font-semibold leading-none tracking-tight', e),
        ...t,
      }),
    );
    i.displayName = 'CardTitle';
    let l = t.forwardRef(({ className: e, ...t }, r) =>
      (0, a.jsx)('p', { ref: r, className: (0, s.cn)('text-sm text-muted-foreground', e), ...t }),
    );
    l.displayName = 'CardDescription';
    let n = t.forwardRef(({ className: e, ...t }, r) =>
      (0, a.jsx)('div', { ref: r, className: (0, s.cn)('p-6 pt-0', e), ...t }),
    );
    ((n.displayName = 'CardContent'),
      (t.forwardRef(({ className: e, ...t }, r) =>
        (0, a.jsx)('div', { ref: r, className: (0, s.cn)('flex items-center p-6 pt-0', e), ...t }),
      ).displayName = 'CardFooter'),
      e.s([
        'Card',
        0,
        r,
        'CardContent',
        0,
        n,
        'CardDescription',
        0,
        l,
        'CardHeader',
        0,
        d,
        'CardTitle',
        0,
        i,
      ]));
  },
  59915,
  (e) => {
    'use strict';
    let a = (0, e.i(32155).default)('RefreshCw', [
      ['path', { d: 'M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8', key: 'v9h5vc' }],
      ['path', { d: 'M21 3v5h-5', key: '1q7to0' }],
      ['path', { d: 'M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16', key: '3uifl3' }],
      ['path', { d: 'M8 16H3v5', key: '1cv678' }],
    ]);
    e.s(['RefreshCw', 0, a], 59915);
  },
]);
