module.exports = [
  93695,
  (a, b, c) => {
    b.exports = a.x('next/dist/shared/lib/no-fallback-error.external.js', () =>
      require('next/dist/shared/lib/no-fallback-error.external.js'),
    );
  },
  11955,
  (a) => {
    'use strict';
    a.s(['LoginForm', () => c, 'loginSchema', () => d]);
    var b = a.i(62293);
    let c = (0, b.registerClientReference)(
        function () {
          throw Error(
            "Attempted to call LoginForm() from the server but LoginForm is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
          );
        },
        '[project]/apps/dashboard/components/auth/login-form.tsx',
        'LoginForm',
      ),
      d = (0, b.registerClientReference)(
        function () {
          throw Error(
            "Attempted to call loginSchema() from the server but loginSchema is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
          );
        },
        '[project]/apps/dashboard/components/auth/login-form.tsx',
        'loginSchema',
      );
  },
  1850,
  (a) => {
    'use strict';
    var b = a.i(11955);
    a.n(b);
  },
  17006,
  (a) => {
    'use strict';
    var b = a.i(30545),
      c = a.i(1850);
    async function d({ searchParams: a }) {
      let f = await a,
        g = 'string' == typeof f.returnTo ? f.returnTo : void 0;
      return (0, b.jsxs)('div', {
        className: 'grid min-h-screen lg:grid-cols-[55%_45%]',
        children: [
          (0, b.jsxs)('aside', {
            className:
              'relative hidden overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-12 text-white lg:flex lg:flex-col lg:justify-between lg:p-16 kanji-watermark',
            children: [
              (0, b.jsx)('div', {
                className:
                  'pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl',
              }),
              (0, b.jsx)('div', {
                className:
                  'pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl',
              }),
              (0, b.jsxs)('div', {
                className: 'relative',
                children: [
                  (0, b.jsxs)('div', {
                    className: 'flex items-center gap-3',
                    children: [
                      (0, b.jsx)('span', { className: 'text-4xl', children: '⛩️' }),
                      (0, b.jsxs)('div', {
                        className: 'flex flex-col leading-none',
                        children: [
                          (0, b.jsx)('span', {
                            className: 'text-xl font-semibold',
                            children: '道しるべ',
                          }),
                          (0, b.jsx)('span', {
                            className: 'text-sm text-white/60 tracking-widest',
                            children: 'MICHISHIRUBE',
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, b.jsxs)('div', {
                    className: 'mt-16 max-w-md',
                    children: [
                      (0, b.jsxs)('h1', {
                        className: 'text-4xl font-bold leading-tight',
                        children: [
                          'Enterprise Multi-Tenant',
                          (0, b.jsx)('br', {}),
                          (0, b.jsx)('span', {
                            className: 'text-blue-400',
                            children: 'API Gateway',
                          }),
                        ],
                      }),
                      (0, b.jsx)('p', {
                        className: 'mt-4 text-base text-white/70',
                        children: 'Menuntun setiap request ke tujuan yang tepat.',
                      }),
                    ],
                  }),
                  (0, b.jsxs)('div', {
                    className: 'mt-12 space-y-5',
                    children: [
                      (0, b.jsx)(e, {
                        icon: '🔐',
                        title: 'Authentication & Authorization',
                        description: 'JWT RS256 via JWKS, API Key, RBAC multi-tenant',
                      }),
                      (0, b.jsx)(e, {
                        icon: '⚡',
                        title: 'Distributed Rate Limiting',
                        description: 'Sliding window atomic di Redis, per IP/user/tenant',
                      }),
                      (0, b.jsx)(e, {
                        icon: '🔄',
                        title: 'Idempotency Guard',
                        description: 'Cegah duplikasi transaksi dengan distributed lock',
                      }),
                      (0, b.jsx)(e, {
                        icon: '🛡️',
                        title: 'Circuit Breaker',
                        description: 'Isolasi kegagalan upstream + fallback response',
                      }),
                      (0, b.jsx)(e, {
                        icon: '📊',
                        title: 'Full Observability',
                        description: 'Metrics, distributed tracing, structured logs',
                      }),
                    ],
                  }),
                ],
              }),
              (0, b.jsxs)('blockquote', {
                className:
                  'relative mt-12 max-w-md rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm',
                children: [
                  (0, b.jsx)('p', {
                    className: 'text-sm italic text-white/80',
                    children: '“Menuntun setiap request ke tujuan yang tepat.”',
                  }),
                  (0, b.jsx)('footer', {
                    className: 'mt-3 text-xs text-white/50',
                    children: '— 道しるべ (Michishirube)',
                  }),
                ],
              }),
            ],
          }),
          (0, b.jsx)('main', {
            className: 'flex items-center justify-center bg-background p-6 lg:p-12',
            children: (0, b.jsxs)('div', {
              className: 'w-full max-w-sm',
              children: [
                (0, b.jsxs)('div', {
                  className: 'mb-8 flex items-center gap-3 lg:hidden',
                  children: [
                    (0, b.jsx)('span', { className: 'text-3xl', children: '⛩️' }),
                    (0, b.jsxs)('div', {
                      className: 'flex flex-col leading-none',
                      children: [
                        (0, b.jsx)('span', {
                          className: 'text-lg font-semibold',
                          children: 'Michishirube',
                        }),
                        (0, b.jsx)('span', {
                          className: 'text-xs text-muted-foreground',
                          children: '道しるべ',
                        }),
                      ],
                    }),
                  ],
                }),
                (0, b.jsx)(c.LoginForm, { returnTo: g }),
                (0, b.jsx)('p', {
                  className: 'mt-8 text-center text-xs text-muted-foreground',
                  children: '© 2026 Michishirube · v0.1.0',
                }),
              ],
            }),
          }),
        ],
      });
    }
    function e({ icon: a, title: c, description: d }) {
      return (0, b.jsxs)('div', {
        className: 'flex gap-4',
        children: [
          (0, b.jsx)('div', {
            className:
              'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-lg',
            children: a,
          }),
          (0, b.jsxs)('div', {
            children: [
              (0, b.jsx)('h3', { className: 'text-sm font-medium', children: c }),
              (0, b.jsx)('p', { className: 'mt-0.5 text-xs text-white/60', children: d }),
            ],
          }),
        ],
      });
    }
    a.s(['default', 0, d, 'metadata', 0, { title: 'Sign In' }]);
  },
  35451,
  function (a) {
    a.n(a.i(17006));
  },
  90968,
  (a) => {
    'use strict';
    var b = a.i(46909),
      c = a.i(2281),
      d = a.i(63682);
    a.i(99045);
    let e = (0, b.instrumentModuleGetter)(() => a.r(68686)),
      f = (0, b.instrumentModuleGetter)(() => a.r(65783)),
      g = (0, b.instrumentModuleGetter)(() => a.r(44154)),
      h = (0, b.instrumentModuleGetter)(() => a.r(23475)),
      i = (0, b.instrumentModuleGetter)(() => a.r(56939)),
      j = (0, b.instrumentModuleGetter)(() => a.r(79969)),
      k = (0, b.instrumentModuleGetter)(() => a.r(65783)),
      l = (0, b.instrumentModuleGetter)(() => a.r(44154)),
      m = (0, b.instrumentModuleGetter)(() => a.r(23475)),
      n = [
        '',
        {
          children: [
            '(auth)',
            {
              children: [
                'login',
                {
                  children: [
                    '__PAGE__',
                    {},
                    {
                      metadata: {},
                      page: [
                        (0, b.instrumentModuleGetter)(() => a.r(35451)),
                        '[project]/apps/dashboard/app/(auth)/login/page.tsx',
                      ],
                    },
                    [],
                  ],
                },
                { metadata: {} },
                [],
              ],
            },
            {
              metadata: {},
              layout: [j, '[project]/apps/dashboard/app/(auth)/layout.tsx'],
              'not-found': [
                k,
                '[project]/node_modules/.pnpm/next@16.3.5_@babel+core@7.29.7_supports-color@7.2.0__@opentelemetry+api@1.9.1_@types+no_377338e3c3defcc59864ccaad93ce5f0/node_modules/next/dist/client/components/builtin/not-found.js',
              ],
              forbidden: [
                l,
                '[project]/node_modules/.pnpm/next@16.3.5_@babel+core@7.29.7_supports-color@7.2.0__@opentelemetry+api@1.9.1_@types+no_377338e3c3defcc59864ccaad93ce5f0/node_modules/next/dist/client/components/builtin/forbidden.js',
              ],
              unauthorized: [
                m,
                '[project]/node_modules/.pnpm/next@16.3.5_@babel+core@7.29.7_supports-color@7.2.0__@opentelemetry+api@1.9.1_@types+no_377338e3c3defcc59864ccaad93ce5f0/node_modules/next/dist/client/components/builtin/unauthorized.js',
              ],
            },
            [],
          ],
        },
        {
          layout: [e, '[project]/apps/dashboard/app/layout.tsx'],
          'not-found': [
            f,
            '[project]/node_modules/.pnpm/next@16.3.5_@babel+core@7.29.7_supports-color@7.2.0__@opentelemetry+api@1.9.1_@types+no_377338e3c3defcc59864ccaad93ce5f0/node_modules/next/dist/client/components/builtin/not-found.js',
          ],
          forbidden: [
            g,
            '[project]/node_modules/.pnpm/next@16.3.5_@babel+core@7.29.7_supports-color@7.2.0__@opentelemetry+api@1.9.1_@types+no_377338e3c3defcc59864ccaad93ce5f0/node_modules/next/dist/client/components/builtin/forbidden.js',
          ],
          unauthorized: [
            h,
            '[project]/node_modules/.pnpm/next@16.3.5_@babel+core@7.29.7_supports-color@7.2.0__@opentelemetry+api@1.9.1_@types+no_377338e3c3defcc59864ccaad93ce5f0/node_modules/next/dist/client/components/builtin/unauthorized.js',
          ],
          'global-error': [i, '[project]/apps/dashboard/app/global-error.tsx'],
        },
        [],
      ],
      o = a.r.bind(a),
      p = a.l.bind(a),
      q = (0, c.createAppPageEntrypoint)({
        tree: n,
        page: '/(auth)/login/page',
        pathname: '/login',
        require: o,
        loadChunk: p,
        interopDefault: d.interopDefault,
      }),
      r = q.__next_app__,
      s = q.routeModule,
      t = q.handler;
    (a.s(['__next_app__', 0, r, 'handler', 0, t, 'routeModule', 0, s], 81257), a.i(81257));
    var u = a.i(21244);
    a.s(
      [
        'ClientPageRoot',
        () => u.ClientPageRoot,
        'ClientSegmentRoot',
        () => u.ClientSegmentRoot,
        'Fragment',
        () => u.Fragment,
        'HTTPAccessFallbackBoundary',
        () => u.HTTPAccessFallbackBoundary,
        'InstantValidation',
        () => u.InstantValidation,
        'LayoutRouter',
        () => u.LayoutRouter,
        'LoadingBoundaryProvider',
        () => u.LoadingBoundaryProvider,
        'Postpone',
        () => u.Postpone,
        'RenderFromTemplateContext',
        () => u.RenderFromTemplateContext,
        'RootLayoutBoundary',
        () => u.RootLayoutBoundary,
        'SegmentViewNode',
        () => u.SegmentViewNode,
        'SegmentViewStateNode',
        () => u.SegmentViewStateNode,
        '__next_app__',
        0,
        r,
        'captureOwnerStack',
        () => u.captureOwnerStack,
        'collectPrefetchHints',
        () => u.collectPrefetchHints,
        'collectSegmentData',
        () => u.collectSegmentData,
        'createElement',
        () => u.createElement,
        'createMetadataComponents',
        () => u.createMetadataComponents,
        'createPrerenderParamsForClientSegment',
        () => u.createPrerenderParamsForClientSegment,
        'createPrerenderSearchParamsForClientPage',
        () => u.createPrerenderSearchParamsForClientPage,
        'createServerParamsForServerSegment',
        () => u.createServerParamsForServerSegment,
        'createServerSearchParamsForServerPage',
        () => u.createServerSearchParamsForServerPage,
        'createTemporaryReferenceSet',
        () => u.createTemporaryReferenceSet,
        'decodeAction',
        () => u.decodeAction,
        'decodeFormState',
        () => u.decodeFormState,
        'decodeReply',
        () => u.decodeReply,
        'handler',
        0,
        t,
        'isEmptyHTMLPrelude',
        () => u.isEmptyHTMLPrelude,
        'patchFetch',
        () => u.patchFetch,
        'preconnect',
        () => u.preconnect,
        'preloadFont',
        () => u.preloadFont,
        'preloadStyle',
        () => u.preloadStyle,
        'prerender',
        () => u.prerender,
        'prerenderToNodeStream',
        () => u.prerenderToNodeStream,
        'renderToPipeableStream',
        () => u.renderToPipeableStream,
        'renderToReadableStream',
        () => u.renderToReadableStream,
        'routeModule',
        0,
        s,
        'serverHooks',
        () => u.serverHooks,
        'taintObjectReference',
        () => u.taintObjectReference,
      ],
      90968,
    );
  },
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0p2uejh._.js.map
