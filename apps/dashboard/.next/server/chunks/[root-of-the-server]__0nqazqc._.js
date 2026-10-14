module.exports = [
  18622,
  (e, t, r) => {
    t.exports = e.x('next/dist/compiled/next-server/app-page-turbo.runtime.prod.js', () =>
      require('next/dist/compiled/next-server/app-page-turbo.runtime.prod.js'),
    );
  },
  20635,
  (e, t, r) => {
    t.exports = e.x('next/dist/server/app-render/action-async-storage.external.js', () =>
      require('next/dist/server/app-render/action-async-storage.external.js'),
    );
  },
  24725,
  (e, t, r) => {
    t.exports = e.x('next/dist/server/app-render/after-task-async-storage.external.js', () =>
      require('next/dist/server/app-render/after-task-async-storage.external.js'),
    );
  },
  56704,
  (e, t, r) => {
    t.exports = e.x('next/dist/server/app-render/work-async-storage.external.js', () =>
      require('next/dist/server/app-render/work-async-storage.external.js'),
    );
  },
  32319,
  (e, t, r) => {
    t.exports = e.x('next/dist/server/app-render/work-unit-async-storage.external.js', () =>
      require('next/dist/server/app-render/work-unit-async-storage.external.js'),
    );
  },
  59043,
  (e, t, r) => {
    t.exports = e.x('next/dist/server/runtime-reacts.external.js', () =>
      require('next/dist/server/runtime-reacts.external.js'),
    );
  },
  93695,
  (e, t, r) => {
    t.exports = e.x('next/dist/shared/lib/no-fallback-error.external.js', () =>
      require('next/dist/shared/lib/no-fallback-error.external.js'),
    );
  },
  81111,
  (e, t, r) => {
    t.exports = e.x('node:stream', () => require('node:stream'));
  },
  66657,
  (e) => {
    'use strict';
    var t = e.i(31151),
      r = e.i(19327),
      a = e.i(27436);
    e.s([
      'POST',
      0,
      function (e) {
        if (!(0, r.isSameOriginRequest)(e))
          return t.NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        let n = t.NextResponse.json({ success: !0 });
        return (
          n.headers.append('Set-Cookie', (0, a.clearSessionCookie)()),
          n.headers.set('Cache-Control', 'no-store'),
          n
        );
      },
    ]);
  },
  55980,
  (e) => {
    'use strict';
    var t = e.i(46973),
      r = e.i(6389),
      a = e.i(23899),
      n = e.i(8057),
      s = e.i(45663),
      i = e.i(61815),
      o = e.i(41577),
      l = e.i(82780),
      u = e.i(89325),
      d = e.i(35241),
      p = e.i(10124),
      c = e.i(43499),
      h = e.i(57307),
      x = e.i(39110),
      R = e.i(26896),
      v = e.i(93695);
    e.i(7348);
    var g = e.i(22486);
    let m = new t.AppRouteRouteModule({
        definition: {
          kind: r.RouteKind.APP_ROUTE,
          page: '/api/auth/logout/route',
          pathname: '/api/auth/logout',
          filename: 'route',
          bundlePath: '',
        },
        distDir: '.next',
        relativeProjectDir: '',
        resolvedPagePath: '[project]/apps/dashboard/app/api/auth/logout/route.ts',
        nextConfigOutput: '',
        userland: () => e.r(66657),
        ...{},
      }),
      { workAsyncStorage: f, workUnitAsyncStorage: w, serverHooks: C } = m;
    async function E(e, t, a) {
      (a.requestMeta && (0, n.setRequestMeta)(e, a.requestMeta),
        m.isDev &&
          (0, n.addRequestMeta)(e, 'devRequestTimingInternalsEnd', process.hrtime.bigint()));
      let f = '/api/auth/logout/route';
      f = f.replace(/\/index$/, '') || '/';
      let w = await m.prepare(e, t, { srcPage: f, multiZoneDraftMode: !1 });
      if (!w)
        return (
          (t.statusCode = 400),
          t.end('Bad Request'),
          null == a.waitUntil || a.waitUntil.call(a, Promise.resolve()),
          null
        );
      let {
          buildId: C,
          deploymentId: E,
          params: y,
          nextConfig: b,
          parsedUrl: A,
          isDraftMode: S,
          prerenderManifest: T,
          routerServerContext: q,
          isOnDemandRevalidate: P,
          revalidateOnlyGenerated: N,
          resolvedPathname: O,
          clientReferenceManifest: j,
          serverActionsManifest: k,
        } = w,
        _ = (0, o.normalizeAppPath)(f),
        H = !!(T.dynamicRoutes[_] || T.routes[O]),
        I = async () => (
          (null == q ? void 0 : q.render404)
            ? await q.render404(e, t, A, !1)
            : t.end('This page could not be found'),
          null
        );
      if (H && !S) {
        let e = !!T.routes[O],
          t = T.dynamicRoutes[_];
        if (t && !1 === t.fallback && !e) {
          if (b.adapterPath) return await I();
          throw new v.NoFallbackError();
        }
      }
      let M = null;
      !H || m.isDev || S || (M = '/index' === (M = O) ? '/' : M);
      let U = !0 === m.isDev || !H,
        D = H && !U;
      k &&
        j &&
        (0, i.setManifestsSingleton)({
          page: f,
          clientReferenceManifest: j,
          serverActionsManifest: k,
        });
      let F = e.method || 'GET',
        K = (0, s.getTracer)(),
        L = K.getActiveScopeSpan(),
        $ = !!(null == q ? void 0 : q.isWrappedByNextServer),
        B = !!(0, n.getRequestMeta)(e, 'minimalMode'),
        G =
          (0, n.getRequestMeta)(e, 'incrementalCache') || (await m.getIncrementalCache(e, b, T, B));
      (null == G || G.resetRequestCache(), (globalThis.__incrementalCache = G));
      let V = {
          params: y,
          previewProps: T.preview,
          renderOpts: {
            experimental: {
              authInterrupts: !!b.experimental.authInterrupts,
              useCacheTimeout: b.experimental.useCacheTimeout,
            },
            cacheComponents: !!b.cacheComponents,
            validationLevel: b.experimental.instantInsights.validationLevel,
            supportsDynamicResponse: U,
            incrementalCache: G,
            hmrRefreshHash: (0, n.getRequestMeta)(e, 'hmrRefreshHash'),
            cacheLifeProfiles: b.cacheLife,
            staticPageGenerationTimeout: b.staticPageGenerationTimeout,
            waitUntil: a.waitUntil,
            onClose: (e) => {
              t.on('close', e);
            },
            onAfterTaskError: void 0,
            onInstrumentationRequestError: (t, r, a, n) => m.onRequestError(e, t, a, n, q),
          },
          sharedContext: { buildId: C, deploymentId: E },
        },
        X = new l.NodeNextRequest(e),
        W = new l.NodeNextResponse(t),
        z = u.NextRequestAdapter.fromNodeNextRequest(X, (0, u.signalFromNodeResponse)(t)),
        Z = async ({ previousCacheEntry: r }) => {
          try {
            if (!B && P && N && !r)
              return (
                (t.statusCode = 404),
                t.setHeader('x-nextjs-cache', 'REVALIDATED'),
                t.end('This page could not be found'),
                null
              );
            let n = await m.handle(z, V);
            e.fetchMetrics = V.renderOpts.fetchMetrics;
            let s = V.renderOpts.pendingWaitUntil;
            s && a.waitUntil && (a.waitUntil(s), (s = void 0));
            let i = V.renderOpts.collectedTags;
            if (!H) return (await (0, c.sendResponse)(X, W, n, s), null);
            {
              let e = await n.blob(),
                t = (0, h.toNodeOutgoingHttpHeaders)(n.headers);
              (i && (t[R.NEXT_CACHE_TAGS_HEADER] = i),
                !t['content-type'] && e.type && (t['content-type'] = e.type));
              let r =
                  void 0 !== V.renderOpts.collectedRevalidate &&
                  !(V.renderOpts.collectedRevalidate >= R.INFINITE_CACHE) &&
                  V.renderOpts.collectedRevalidate,
                a =
                  void 0 === V.renderOpts.collectedExpire ||
                  V.renderOpts.collectedExpire >= R.INFINITE_CACHE
                    ? !1 !== r && r > 0
                      ? b.expireTime
                      : void 0
                    : V.renderOpts.collectedExpire;
              return {
                value: {
                  kind: g.CachedRouteKind.APP_ROUTE,
                  status: n.status,
                  body: Buffer.from(await e.arrayBuffer()),
                  headers: t,
                },
                cacheControl: { revalidate: r, expire: a },
              };
            }
          } catch (t) {
            throw (
              (null == r ? void 0 : r.isStale) &&
                (await m.onRequestError(
                  e,
                  t,
                  {
                    routerKind: 'App Router',
                    routePath: f,
                    routeType: 'route',
                    revalidateReason: (0, p.getRevalidateReason)({
                      isStaticGeneration: D,
                      isOnDemandRevalidate: P,
                    }),
                  },
                  !1,
                  q,
                )),
              t
            );
          }
        },
        J = async (n, i) => {
          try {
            var o, l;
            let n = await m.handleResponse({
              req: e,
              nextConfig: b,
              cacheKey: M,
              routeKind: r.RouteKind.APP_ROUTE,
              isFallback: !1,
              prerenderManifest: T,
              isRoutePPREnabled: !1,
              isOnDemandRevalidate: P,
              revalidateOnlyGenerated: N,
              responseGenerator: Z,
              waitUntil: a.waitUntil,
              isMinimalMode: B,
            });
            if (!H) return;
            if (
              (null == n || null == (o = n.value) ? void 0 : o.kind) !== g.CachedRouteKind.APP_ROUTE
            )
              throw Object.defineProperty(
                Error(
                  `Invariant: app-route received invalid cache entry ${null == n || null == (l = n.value) ? void 0 : l.kind}`,
                ),
                '__NEXT_ERROR_CODE',
                { value: 'E701', enumerable: !1, configurable: !0 },
              );
            (B ||
              t.setHeader(
                'x-nextjs-cache',
                P ? 'REVALIDATED' : n.isMiss ? 'MISS' : n.isStale ? 'STALE' : 'HIT',
              ),
              S &&
                t.setHeader(
                  'Cache-Control',
                  'private, no-cache, no-store, max-age=0, must-revalidate',
                ));
            let s = (0, h.fromNodeOutgoingHttpHeaders)(n.value.headers);
            ((B && H) || s.delete(R.NEXT_CACHE_TAGS_HEADER),
              !n.cacheControl ||
                t.getHeader('Cache-Control') ||
                s.get('Cache-Control') ||
                s.set('Cache-Control', (0, x.getCacheControlHeader)(n.cacheControl)),
              await (0, c.sendResponse)(
                X,
                W,
                new Response(n.value.body, { headers: s, status: n.value.status || 200 }),
              ));
            return;
          } catch (t) {
            if (
              (t instanceof v.NoFallbackError ||
                (await m.onRequestError(
                  e,
                  t,
                  {
                    routerKind: 'App Router',
                    routePath: _,
                    routeType: 'route',
                    revalidateReason: (0, p.getRevalidateReason)({
                      isStaticGeneration: D,
                      isOnDemandRevalidate: P,
                    }),
                  },
                  !1,
                  q,
                )),
              H)
            )
              throw t;
            await (0, c.sendResponse)(X, W, new Response(null, { status: 500 }));
            return;
          } finally {
            (() => {
              if (!n) return;
              let e = t.statusCode;
              (n.setAttributes({ 'http.status_code': e, 'next.rsc': !1 }),
                e &&
                  e >= 500 &&
                  (n.setStatus({ code: s.SpanStatusCode.ERROR }),
                  n.setAttribute('error.type', e.toString())));
              let r = K.getRootSpanAttributes();
              if (!r) return;
              if (r.get('next.span_type') !== d.BaseServerSpan.handleRequest)
                return console.warn(
                  `Unexpected root span type '${r.get('next.span_type')}'. Please report this Next.js issue https://github.com/vercel/next.js`,
                );
              let a = r.get('next.route') || _,
                o = `${F} ${a}`;
              (n.setAttributes({ 'next.route': a, 'http.route': a, 'next.span_name': o }),
                n.updateName(o),
                i && i !== n && (i.setAttribute('http.route', a), i.updateName(o)));
            })();
          }
        };
      if ($ && L) await J(L, void 0);
      else {
        let t = K.getActiveScopeSpan();
        await K.withPropagatedContext(
          e.headers,
          () =>
            K.trace(
              d.BaseServerSpan.handleRequest,
              {
                spanName: `${F} ${f}`,
                kind: s.SpanKind.SERVER,
                attributes: { 'http.method': F, 'http.target': e.url },
              },
              (e) => J(e, t),
            ),
          void 0,
          !$,
        );
      }
    }
    e.s([
      'handler',
      0,
      E,
      'patchFetch',
      0,
      function () {
        return (0, a.patchFetch)({ workAsyncStorage: f, workUnitAsyncStorage: w });
      },
      'routeModule',
      0,
      m,
      'serverHooks',
      0,
      C,
      'workAsyncStorage',
      0,
      f,
      'workUnitAsyncStorage',
      0,
      w,
    ]);
  },
  19327,
  (e) => {
    'use strict';
    e.s([
      'isSameOriginRequest',
      0,
      function (e) {
        let t = e.headers.get('origin');
        return null === t || t === new URL(e.url).origin;
      },
    ]);
  },
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0nqazqc._.js.map
