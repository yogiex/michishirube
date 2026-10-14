(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  'object' == typeof document ? document.currentScript : void 0,
  50607,
  (e) => {
    'use strict';
    var t = e.i(24830),
      a = e.i(39380),
      i = e.i(59915),
      s = e.i(36023),
      l = e.i(13829);
    e.s([
      'default',
      0,
      function ({ error: e, reset: r }) {
        let [n, d] = (0, a.useState)(null);
        (0, a.useEffect)(() => {
          d(new URLSearchParams(window.location.search).get('requestId'));
        }, []);
        let u = [e.digest, n].filter(Boolean).join(' · ');
        return (0, t.jsx)('div', {
          className: 'flex min-h-screen items-center justify-center bg-muted/30 p-6',
          children: (0, t.jsxs)('div', {
            className: 'w-full max-w-lg rounded-xl border bg-background p-8 text-center shadow-sm',
            role: 'alert',
            children: [
              (0, t.jsx)('h1', {
                className: 'text-xl font-semibold',
                children: 'Halaman tidak dapat dimuat',
              }),
              (0, t.jsx)('p', {
                className: 'mt-2 text-sm text-muted-foreground',
                children:
                  'Data dashboard gagal dimuat. Coba lagi atau hubungi administrator jika masalah berlanjut.',
              }),
              u &&
                (0, t.jsxs)('div', {
                  className:
                    'mt-4 flex items-center justify-between gap-3 rounded-md bg-muted p-3 text-left',
                  children: [
                    (0, t.jsx)('p', {
                      className: 'min-w-0 truncate font-mono text-xs text-muted-foreground',
                      children: u,
                    }),
                    (0, t.jsx)(l.CopyButton, { value: u, label: 'Salin detail' }),
                  ],
                }),
              (0, t.jsxs)(s.Button, {
                className: 'mt-6',
                onClick: r,
                children: [
                  (0, t.jsx)(i.RefreshCw, { className: 'mr-2 h-4 w-4', 'aria-hidden': 'true' }),
                  'Coba lagi',
                ],
              }),
            ],
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
        function ({ value: e, label: r = 'Salin' }) {
          let [n, d] = (0, a.useState)(!1);
          (0, a.useEffect)(() => {
            if (!n) return;
            let e = window.setTimeout(() => d(!1), 2e3);
            return () => window.clearTimeout(e);
          }, [n]);
          let u = (0, a.useCallback)(async () => {
            navigator.clipboard && (await navigator.clipboard.writeText(e), d(!0));
          }, [e]);
          return (0, t.jsxs)(l.Button, {
            type: 'button',
            variant: 'outline',
            size: 'sm',
            onClick: () => void u(),
            'aria-label': n ? 'Disalin' : r,
            children: [
              n
                ? (0, t.jsx)(i.Check, { className: 'h-4 w-4', 'aria-hidden': 'true' })
                : (0, t.jsx)(s, { className: 'h-4 w-4', 'aria-hidden': 'true' }),
              n ? 'Disalin' : r,
            ],
          });
        },
      ],
      13829,
    );
  },
  59915,
  (e) => {
    'use strict';
    let t = (0, e.i(32155).default)('RefreshCw', [
      ['path', { d: 'M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8', key: 'v9h5vc' }],
      ['path', { d: 'M21 3v5h-5', key: '1q7to0' }],
      ['path', { d: 'M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16', key: '3uifl3' }],
      ['path', { d: 'M8 16H3v5', key: '1cv678' }],
    ]);
    e.s(['RefreshCw', 0, t], 59915);
  },
]);
