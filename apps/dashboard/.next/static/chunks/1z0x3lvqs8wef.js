(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  'object' == typeof document ? document.currentScript : void 0,
  82134,
  (e) => {
    'use strict';
    var t = e.i(24830),
      a = e.i(36023),
      i = e.i(13829);
    e.s([
      'default',
      0,
      function ({ error: e, reset: s }) {
        let l = e.digest ?? 'Digest tidak tersedia';
        return (0, t.jsx)('html', {
          lang: 'id',
          children: (0, t.jsx)('body', {
            className: 'flex min-h-screen items-center justify-center bg-white p-6 text-slate-950',
            children: (0, t.jsxs)('main', {
              className:
                'w-full max-w-lg rounded-xl border border-slate-200 p-8 text-center shadow-sm',
              role: 'alert',
              children: [
                (0, t.jsx)('h1', {
                  className: 'text-xl font-semibold',
                  children: 'Terjadi kesalahan aplikasi',
                }),
                (0, t.jsx)('p', {
                  className: 'mt-2 text-sm text-slate-600',
                  children:
                    'Dashboard tidak dapat dilanjutkan. Coba lagi atau hubungi administrator.',
                }),
                (0, t.jsxs)('div', {
                  className:
                    'mt-4 flex items-center justify-between gap-3 rounded-md bg-slate-100 p-3 text-left',
                  children: [
                    (0, t.jsxs)('p', {
                      className: 'min-w-0 truncate font-mono text-xs text-slate-600',
                      children: ['Ref: ', l],
                    }),
                    (0, t.jsx)(i.CopyButton, { value: l, label: 'Salin referensi' }),
                  ],
                }),
                (0, t.jsx)(a.Button, { className: 'mt-6', onClick: s, children: 'Coba lagi' }),
              ],
            }),
          }),
        });
      },
    ]);
  },
  13829,
  (e) => {
    'use strict';
    var t = e.i(24830),
      a = e.i(39380),
      i = e.i(86304);
    let s = (0, e.i(32155).default)('Copy', [
      ['rect', { width: '14', height: '14', x: '8', y: '8', rx: '2', ry: '2', key: '17jyea' }],
      ['path', { d: 'M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2', key: 'zix9uf' }],
    ]);
    var l = e.i(36023);
    e.s(
      [
        'CopyButton',
        0,
        function ({ value: e, label: n = 'Salin' }) {
          let [r, c] = (0, a.useState)(!1);
          (0, a.useEffect)(() => {
            if (!r) return;
            let e = window.setTimeout(() => c(!1), 2e3);
            return () => window.clearTimeout(e);
          }, [r]);
          let d = (0, a.useCallback)(async () => {
            navigator.clipboard && (await navigator.clipboard.writeText(e), c(!0));
          }, [e]);
          return (0, t.jsxs)(l.Button, {
            type: 'button',
            variant: 'outline',
            size: 'sm',
            onClick: () => void d(),
            'aria-label': r ? 'Disalin' : n,
            children: [
              r
                ? (0, t.jsx)(i.Check, { className: 'h-4 w-4', 'aria-hidden': 'true' })
                : (0, t.jsx)(s, { className: 'h-4 w-4', 'aria-hidden': 'true' }),
              r ? 'Disalin' : n,
            ],
          });
        },
      ],
      13829,
    );
  },
  86304,
  (e) => {
    'use strict';
    let t = (0, e.i(32155).default)('Check', [['path', { d: 'M20 6 9 17l-5-5', key: '1gmf2c' }]]);
    e.s(['Check', 0, t], 86304);
  },
]);
