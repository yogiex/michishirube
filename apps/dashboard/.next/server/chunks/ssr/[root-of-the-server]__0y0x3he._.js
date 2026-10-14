module.exports = [
  93695,
  (a, b, c) => {
    b.exports = a.x('next/dist/shared/lib/no-fallback-error.external.js', () =>
      require('next/dist/shared/lib/no-fallback-error.external.js'),
    );
  },
  3233,
  (a) => {
    'use strict';
    a.s(['default', () => b]);
    let b = (0, a.i(62293).registerClientReference)(
      function () {
        throw Error(
          "Attempted to call the default export of [project]/apps/dashboard/app/(dashboard)/routes/page.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
        );
      },
      '[project]/apps/dashboard/app/(dashboard)/routes/page.tsx',
      'default',
    );
  },
  73168,
  (a) => {
    'use strict';
    var b = a.i(3233);
    a.n(b);
  },
  45579,
  function (a) {
    a.n(a.i(73168));
  },
  53598,
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
      j = (0, b.instrumentModuleGetter)(() => a.r(23524)),
      k = (0, b.instrumentModuleGetter)(() => a.r(37694)),
      l = (0, b.instrumentModuleGetter)(() => a.r(65783)),
      m = (0, b.instrumentModuleGetter)(() => a.r(44154)),
      n = (0, b.instrumentModuleGetter)(() => a.r(23475)),
      o = [
        '',
        {
          children: [
            '(dashboard)',
            {
              children: [
                'routes',
                {
                  children: [
                    '__PAGE__',
                    {},
                    {
                      metadata: {},
                      page: [
                        (0, b.instrumentModuleGetter)(() => a.r(45579)),
                        '[project]/apps/dashboard/app/(dashboard)/routes/page.tsx',
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
              layout: [j, '[project]/apps/dashboard/app/(dashboard)/layout.tsx'],
              error: [k, '[project]/apps/dashboard/app/(dashboard)/error.tsx'],
              'not-found': [
                l,
                '[project]/node_modules/.pnpm/next@16.3.5_@babel+core@7.29.7_supports-color@7.2.0__@opentelemetry+api@1.9.1_@types+no_377338e3c3defcc59864ccaad93ce5f0/node_modules/next/dist/client/components/builtin/not-found.js',
              ],
              forbidden: [
                m,
                '[project]/node_modules/.pnpm/next@16.3.5_@babel+core@7.29.7_supports-color@7.2.0__@opentelemetry+api@1.9.1_@types+no_377338e3c3defcc59864ccaad93ce5f0/node_modules/next/dist/client/components/builtin/forbidden.js',
              ],
              unauthorized: [
                n,
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
      p = a.r.bind(a),
      q = a.l.bind(a),
      r = (0, c.createAppPageEntrypoint)({
        tree: o,
        page: '/(dashboard)/routes/page',
        pathname: '/routes',
        require: p,
        loadChunk: q,
        interopDefault: d.interopDefault,
      }),
      s = r.__next_app__,
      t = r.routeModule,
      u = r.handler;
    (a.s(['__next_app__', 0, s, 'handler', 0, u, 'routeModule', 0, t], 82942), a.i(82942));
    var v = a.i(21244);
    a.s(
      [
        'ClientPageRoot',
        () => v.ClientPageRoot,
        'ClientSegmentRoot',
        () => v.ClientSegmentRoot,
        'Fragment',
        () => v.Fragment,
        'HTTPAccessFallbackBoundary',
        () => v.HTTPAccessFallbackBoundary,
        'InstantValidation',
        () => v.InstantValidation,
        'LayoutRouter',
        () => v.LayoutRouter,
        'LoadingBoundaryProvider',
        () => v.LoadingBoundaryProvider,
        'Postpone',
        () => v.Postpone,
        'RenderFromTemplateContext',
        () => v.RenderFromTemplateContext,
        'RootLayoutBoundary',
        () => v.RootLayoutBoundary,
        'SegmentViewNode',
        () => v.SegmentViewNode,
        'SegmentViewStateNode',
        () => v.SegmentViewStateNode,
        '__next_app__',
        0,
        s,
        'captureOwnerStack',
        () => v.captureOwnerStack,
        'collectPrefetchHints',
        () => v.collectPrefetchHints,
        'collectSegmentData',
        () => v.collectSegmentData,
        'createElement',
        () => v.createElement,
        'createMetadataComponents',
        () => v.createMetadataComponents,
        'createPrerenderParamsForClientSegment',
        () => v.createPrerenderParamsForClientSegment,
        'createPrerenderSearchParamsForClientPage',
        () => v.createPrerenderSearchParamsForClientPage,
        'createServerParamsForServerSegment',
        () => v.createServerParamsForServerSegment,
        'createServerSearchParamsForServerPage',
        () => v.createServerSearchParamsForServerPage,
        'createTemporaryReferenceSet',
        () => v.createTemporaryReferenceSet,
        'decodeAction',
        () => v.decodeAction,
        'decodeFormState',
        () => v.decodeFormState,
        'decodeReply',
        () => v.decodeReply,
        'handler',
        0,
        u,
        'isEmptyHTMLPrelude',
        () => v.isEmptyHTMLPrelude,
        'patchFetch',
        () => v.patchFetch,
        'preconnect',
        () => v.preconnect,
        'preloadFont',
        () => v.preloadFont,
        'preloadStyle',
        () => v.preloadStyle,
        'prerender',
        () => v.prerender,
        'prerenderToNodeStream',
        () => v.prerenderToNodeStream,
        'renderToPipeableStream',
        () => v.renderToPipeableStream,
        'renderToReadableStream',
        () => v.renderToReadableStream,
        'routeModule',
        0,
        t,
        'serverHooks',
        () => v.serverHooks,
        'taintObjectReference',
        () => v.taintObjectReference,
      ],
      53598,
    );
  },
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0y0x3he._.js.map
