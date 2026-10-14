module.exports = [
  8588,
  (a) => {
    'use strict';
    var b = a.i(68508),
      c = a.i(60301),
      d = a.i(48741),
      e = a.i(12616),
      f = a.i(10641);
    let g = (0, f.default)('Save', [
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
      h = (0, f.default)('Download', [
        ['path', { d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', key: 'ih7n3h' }],
        ['polyline', { points: '7 10 12 15 17 10', key: '2ggqvy' }],
        ['line', { x1: '12', x2: '12', y1: '15', y2: '3', key: '1vk2je' }],
      ]);
    a.s(
      [
        'default',
        0,
        function () {
          return (0, b.jsxs)('div', {
            className: 'space-y-6',
            children: [
              (0, b.jsxs)('div', {
                className: 'flex items-center justify-between',
                children: [
                  (0, b.jsxs)('div', {
                    children: [
                      (0, b.jsx)('h2', {
                        className: 'text-2xl font-semibold tracking-tight',
                        children: 'Config',
                      }),
                      (0, b.jsx)('p', {
                        className: 'text-sm text-muted-foreground',
                        children: 'Edit konfigurasi YAML gateway',
                      }),
                    ],
                  }),
                  (0, b.jsxs)('div', {
                    className: 'flex gap-2',
                    children: [
                      (0, b.jsxs)(d.Button, {
                        variant: 'outline',
                        size: 'sm',
                        children: [
                          (0, b.jsx)(e.RefreshCw, { className: 'mr-2 h-4 w-4' }),
                          'Reload',
                        ],
                      }),
                      (0, b.jsxs)(d.Button, {
                        variant: 'outline',
                        size: 'sm',
                        children: [(0, b.jsx)(h, { className: 'mr-2 h-4 w-4' }), 'Export'],
                      }),
                      (0, b.jsxs)(d.Button, {
                        size: 'sm',
                        children: [(0, b.jsx)(g, { className: 'mr-2 h-4 w-4' }), 'Save'],
                      }),
                    ],
                  }),
                ],
              }),
              (0, b.jsxs)(c.Card, {
                children: [
                  (0, b.jsx)(c.CardHeader, {
                    className: 'border-b',
                    children: (0, b.jsx)('div', {
                      className: 'flex items-center justify-between',
                      children: (0, b.jsxs)('div', {
                        children: [
                          (0, b.jsx)(c.CardTitle, {
                            className: 'text-sm font-mono',
                            children: 'config/routes.yaml',
                          }),
                          (0, b.jsx)(c.CardDescription, {
                            className: 'text-xs',
                            children: 'Hot reload · auto-save',
                          }),
                        ],
                      }),
                    }),
                  }),
                  (0, b.jsx)(c.CardContent, {
                    className: 'p-0',
                    children: (0, b.jsx)('pre', {
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
              (0, b.jsx)('p', {
                className: 'text-xs text-muted-foreground',
                children: 'Editor YAML interaktif akan ditambahkan setelah Admin API siap.',
              }),
            ],
          });
        },
      ],
      8588,
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

//# sourceMappingURL=_1s5jd4u._.js.map
