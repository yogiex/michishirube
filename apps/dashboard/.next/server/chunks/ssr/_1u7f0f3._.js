module.exports = [
  35180,
  (a) => {
    'use strict';
    var b = a.i(68508),
      c = a.i(48741),
      d = a.i(41542);
    a.s([
      'default',
      0,
      function ({ error: a, reset: e }) {
        let f = a.digest ?? 'Digest tidak tersedia';
        return (0, b.jsx)('html', {
          lang: 'id',
          children: (0, b.jsx)('body', {
            className: 'flex min-h-screen items-center justify-center bg-white p-6 text-slate-950',
            children: (0, b.jsxs)('main', {
              className:
                'w-full max-w-lg rounded-xl border border-slate-200 p-8 text-center shadow-sm',
              role: 'alert',
              children: [
                (0, b.jsx)('h1', {
                  className: 'text-xl font-semibold',
                  children: 'Terjadi kesalahan aplikasi',
                }),
                (0, b.jsx)('p', {
                  className: 'mt-2 text-sm text-slate-600',
                  children:
                    'Dashboard tidak dapat dilanjutkan. Coba lagi atau hubungi administrator.',
                }),
                (0, b.jsxs)('div', {
                  className:
                    'mt-4 flex items-center justify-between gap-3 rounded-md bg-slate-100 p-3 text-left',
                  children: [
                    (0, b.jsxs)('p', {
                      className: 'min-w-0 truncate font-mono text-xs text-slate-600',
                      children: ['Ref: ', f],
                    }),
                    (0, b.jsx)(d.CopyButton, { value: f, label: 'Salin referensi' }),
                  ],
                }),
                (0, b.jsx)(c.Button, { className: 'mt-6', onClick: e, children: 'Coba lagi' }),
              ],
            }),
          }),
        });
      },
    ]);
  },
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
  67406,
  (a) => {
    'use strict';
    let b = (0, a.i(10641).default)('Check', [['path', { d: 'M20 6 9 17l-5-5', key: '1gmf2c' }]]);
    a.s(['Check', 0, b], 67406);
  },
];

//# sourceMappingURL=_1u7f0f3._.js.map
