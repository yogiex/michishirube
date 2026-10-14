module.exports = [
  93695,
  (a, b, c) => {
    b.exports = a.x('next/dist/shared/lib/no-fallback-error.external.js', () =>
      require('next/dist/shared/lib/no-fallback-error.external.js'),
    );
  },
  87532,
  (a) => {
    'use strict';
    a.s(['default', () => b]);
    let b = (0, a.i(62293).registerClientReference)(
      function () {
        throw Error(
          "Attempted to call the default export of [project]/apps/dashboard/app/global-error.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
        );
      },
      '[project]/apps/dashboard/app/global-error.tsx',
      'default',
    );
  },
  50613,
  (a) => {
    'use strict';
    var b = a.i(87532);
    a.n(b);
  },
  56939,
  function (a) {
    a.n(a.i(50613));
  },
  81819,
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
      j = [
        '',
        {
          children: [
            '/_not-found',
            {
              children: [
                '__PAGE__',
                {},
                {
                  metadata: {},
                  page: [
                    (0, b.instrumentModuleGetter)(() => a.r(65783)),
                    '[project]/node_modules/.pnpm/next@16.3.5_@babel+core@7.29.7_supports-color@7.2.0__@opentelemetry+api@1.9.1_@types+no_377338e3c3defcc59864ccaad93ce5f0/node_modules/next/dist/client/components/builtin/not-found.js',
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
      k = a.r.bind(a),
      l = a.l.bind(a),
      m = (0, c.createAppPageEntrypoint)({
        tree: j,
        page: '/_not-found/page',
        pathname: '/_not-found',
        require: k,
        loadChunk: l,
        interopDefault: d.interopDefault,
      }),
      n = m.__next_app__,
      o = m.routeModule,
      p = m.handler;
    (a.s(['__next_app__', 0, n, 'handler', 0, p, 'routeModule', 0, o], 22593), a.i(22593));
    var q = a.i(21244);
    a.s(
      [
        'ClientPageRoot',
        () => q.ClientPageRoot,
        'ClientSegmentRoot',
        () => q.ClientSegmentRoot,
        'Fragment',
        () => q.Fragment,
        'HTTPAccessFallbackBoundary',
        () => q.HTTPAccessFallbackBoundary,
        'InstantValidation',
        () => q.InstantValidation,
        'LayoutRouter',
        () => q.LayoutRouter,
        'LoadingBoundaryProvider',
        () => q.LoadingBoundaryProvider,
        'Postpone',
        () => q.Postpone,
        'RenderFromTemplateContext',
        () => q.RenderFromTemplateContext,
        'RootLayoutBoundary',
        () => q.RootLayoutBoundary,
        'SegmentViewNode',
        () => q.SegmentViewNode,
        'SegmentViewStateNode',
        () => q.SegmentViewStateNode,
        '__next_app__',
        0,
        n,
        'captureOwnerStack',
        () => q.captureOwnerStack,
        'collectPrefetchHints',
        () => q.collectPrefetchHints,
        'collectSegmentData',
        () => q.collectSegmentData,
        'createElement',
        () => q.createElement,
        'createMetadataComponents',
        () => q.createMetadataComponents,
        'createPrerenderParamsForClientSegment',
        () => q.createPrerenderParamsForClientSegment,
        'createPrerenderSearchParamsForClientPage',
        () => q.createPrerenderSearchParamsForClientPage,
        'createServerParamsForServerSegment',
        () => q.createServerParamsForServerSegment,
        'createServerSearchParamsForServerPage',
        () => q.createServerSearchParamsForServerPage,
        'createTemporaryReferenceSet',
        () => q.createTemporaryReferenceSet,
        'decodeAction',
        () => q.decodeAction,
        'decodeFormState',
        () => q.decodeFormState,
        'decodeReply',
        () => q.decodeReply,
        'handler',
        0,
        p,
        'isEmptyHTMLPrelude',
        () => q.isEmptyHTMLPrelude,
        'patchFetch',
        () => q.patchFetch,
        'preconnect',
        () => q.preconnect,
        'preloadFont',
        () => q.preloadFont,
        'preloadStyle',
        () => q.preloadStyle,
        'prerender',
        () => q.prerender,
        'prerenderToNodeStream',
        () => q.prerenderToNodeStream,
        'renderToPipeableStream',
        () => q.renderToPipeableStream,
        'renderToReadableStream',
        () => q.renderToReadableStream,
        'routeModule',
        0,
        o,
        'serverHooks',
        () => q.serverHooks,
        'taintObjectReference',
        () => q.taintObjectReference,
      ],
      81819,
    );
  },
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0_fz5o3._.js.map
