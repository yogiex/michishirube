module.exports = [
  84142,
  (a) => {
    'use strict';
    var b = a.i(68508),
      c = a.i(48326),
      d = a.i(12616),
      e = a.i(48741),
      f = a.i(41542);
    a.s([
      'default',
      0,
      function ({ error: a, reset: g }) {
        let [h, i] = (0, c.useState)(null);
        (0, c.useEffect)(() => {
          i(new URLSearchParams(window.location.search).get('requestId'));
        }, []);
        let j = [a.digest, h].filter(Boolean).join(' · ');
        return (0, b.jsx)('div', {
          className: 'flex min-h-screen items-center justify-center bg-muted/30 p-6',
          children: (0, b.jsxs)('div', {
            className: 'w-full max-w-lg rounded-xl border bg-background p-8 text-center shadow-sm',
            role: 'alert',
            children: [
              (0, b.jsx)('h1', {
                className: 'text-xl font-semibold',
                children: 'Halaman tidak dapat dimuat',
              }),
              (0, b.jsx)('p', {
                className: 'mt-2 text-sm text-muted-foreground',
                children:
                  'Data dashboard gagal dimuat. Coba lagi atau hubungi administrator jika masalah berlanjut.',
              }),
              j &&
                (0, b.jsxs)('div', {
                  className:
                    'mt-4 flex items-center justify-between gap-3 rounded-md bg-muted p-3 text-left',
                  children: [
                    (0, b.jsx)('p', {
                      className: 'min-w-0 truncate font-mono text-xs text-muted-foreground',
                      children: j,
                    }),
                    (0, b.jsx)(f.CopyButton, { value: j, label: 'Salin detail' }),
                  ],
                }),
              (0, b.jsxs)(e.Button, {
                className: 'mt-6',
                onClick: g,
                children: [
                  (0, b.jsx)(d.RefreshCw, { className: 'mr-2 h-4 w-4', 'aria-hidden': 'true' }),
                  'Coba lagi',
                ],
              }),
            ],
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

//# sourceMappingURL=_0gtbmd9._.js.map
