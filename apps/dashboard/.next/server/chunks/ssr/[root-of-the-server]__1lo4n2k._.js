module.exports = [
  21290,
  (a) => {
    a.v({
      className: 'inter_5901b7c6-module__ec5Qua__className',
      variable: 'inter_5901b7c6-module__ec5Qua__variable',
    });
  },
  68985,
  (a) => {
    a.v({
      className: 'jetbrains_mono_8be3b53a-module__CxiPNW__className',
      variable: 'jetbrains_mono_8be3b53a-module__CxiPNW__variable',
    });
  },
  67892,
  (a) => {
    'use strict';
    var b = a.i(30545),
      c = a.i(21290);
    let d = {
      className: c.default.className,
      style: { fontFamily: "'Inter', 'Inter Fallback'", fontStyle: 'normal' },
    };
    null != c.default.variable && (d.variable = c.default.variable);
    var e = a.i(68985);
    let f = {
      className: e.default.className,
      style: { fontFamily: "'JetBrains Mono', 'JetBrains Mono Fallback'", fontStyle: 'normal' },
    };
    null != e.default.variable && (f.variable = e.default.variable);
    var g = a.i(21626),
      h = a.i(39260),
      i = a.i(37705);
    a.s(
      [
        'default',
        0,
        function ({ children: a }) {
          return (0, b.jsx)('html', {
            lang: 'id',
            suppressHydrationWarning: !0,
            children: (0, b.jsx)('body', {
              className: `${d.variable} ${f.variable} antialiased`,
              children: (0, b.jsxs)(i.Providers, {
                children: [
                  (0, b.jsx)(h.WebVitalsReporter, {}),
                  a,
                  (0, b.jsx)(g.Toaster, { position: 'top-right', richColors: !0 }),
                ],
              }),
            }),
          });
        },
        'metadata',
        0,
        {
          title: { default: 'Michishirube — Admin Dashboard', template: '%s · Michishirube' },
          description: 'Enterprise Multi-Tenant API Gateway Dashboard',
        },
      ],
      67892,
    );
  },
  68686,
  function (a) {
    a.n(a.i(67892));
  },
  58942,
  (a) => {
    'use strict';
    a.s(['Providers', () => b]);
    let b = (0, a.i(62293).registerClientReference)(
      function () {
        throw Error(
          "Attempted to call Providers() from the server but Providers is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
        );
      },
      '[project]/apps/dashboard/app/providers.tsx',
      'Providers',
    );
  },
  37705,
  (a) => {
    'use strict';
    var b = a.i(58942);
    a.n(b);
  },
  26,
  (a) => {
    'use strict';
    a.s(['Toaster', () => b]);
    let b = (0, a.i(62293).registerClientReference)(
      function () {
        throw Error(
          "Attempted to call Toaster() from the server but Toaster is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
        );
      },
      '[project]/apps/dashboard/components/ui/sonner.tsx',
      'Toaster',
    );
  },
  21626,
  (a) => {
    'use strict';
    var b = a.i(26);
    a.n(b);
  },
  61069,
  (a) => {
    'use strict';
    a.s(['WebVitalsReporter', () => b]);
    let b = (0, a.i(62293).registerClientReference)(
      function () {
        throw Error(
          "Attempted to call WebVitalsReporter() from the server but WebVitalsReporter is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
        );
      },
      '[project]/apps/dashboard/components/web-vitals-reporter.tsx',
      'WebVitalsReporter',
    );
  },
  39260,
  (a) => {
    'use strict';
    var b = a.i(61069);
    a.n(b);
  },
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1lo4n2k._.js.map
