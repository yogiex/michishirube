module.exports = [
  41542,
  (a) => {
    'use strict';
    var b = a.i(68508),
      c = a.i(48326),
      d = a.i(67406);
    let e = (0, a.i(10641).default)('Copy', [
      ['rect', { width: '14', height: '14', x: '8', y: '8', rx: '2', ry: '2', key: '17jyea' }],
      ['path', { d: 'M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2', key: 'zix9uf' }],
    ]);
    var f = a.i(48741);
    a.s(
      [
        'CopyButton',
        0,
        function ({ value: a, label: g = 'Salin' }) {
          let [h, i] = (0, c.useState)(!1);
          (0, c.useEffect)(() => {
            if (!h) return;
            let a = window.setTimeout(() => i(!1), 2e3);
            return () => window.clearTimeout(a);
          }, [h]);
          let j = (0, c.useCallback)(async () => {
            navigator.clipboard && (await navigator.clipboard.writeText(a), i(!0));
          }, [a]);
          return (0, b.jsxs)(f.Button, {
            type: 'button',
            variant: 'outline',
            size: 'sm',
            onClick: () => void j(),
            'aria-label': h ? 'Disalin' : g,
            children: [
              h
                ? (0, b.jsx)(d.Check, { className: 'h-4 w-4', 'aria-hidden': 'true' })
                : (0, b.jsx)(e, { className: 'h-4 w-4', 'aria-hidden': 'true' }),
              h ? 'Disalin' : g,
            ],
          });
        },
      ],
      41542,
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
  78585,
  (a) => {
    'use strict';
    let b = (0, a.i(10641).default)('CircleAlert', [
      ['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
      ['line', { x1: '12', x2: '12', y1: '8', y2: '12', key: '1pkeuh' }],
      ['line', { x1: '12', x2: '12.01', y1: '16', y2: '16', key: '4dfq90' }],
    ]);
    a.s(['AlertCircle', 0, b], 78585);
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

//# sourceMappingURL=_14nmn1l._.js.map
