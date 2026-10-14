(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  'object' == typeof document ? document.currentScript : void 0,
  83528,
  (e) => {
    'use strict';
    var t = e.i(24830),
      r = e.i(39380),
      s = e.i(84151),
      a = e.i(82939),
      i = e.i(46799),
      l = e.i(68281),
      n = e.i(59915),
      u = e.i(36023),
      o = e.i(2863),
      c = e.i(54815),
      d = e.i(6773),
      h = e.i(40720),
      p = e.i(93265);
    function f({ route: e }) {
      return (0, t.jsxs)(h.TableRow, {
        children: [
          (0, t.jsx)(h.TableCell, { className: 'font-mono text-xs', children: e.path }),
          (0, t.jsx)(h.TableCell, {
            children: (0, t.jsx)(d.Badge, {
              variant: 'outline',
              className: 'font-mono',
              children: e.method,
            }),
          }),
          (0, t.jsx)(h.TableCell, { className: 'text-sm', children: e.upstream }),
          (0, t.jsx)(h.TableCell, {
            children: e.requireAuth
              ? (0, t.jsx)(d.Badge, { variant: 'secondary', children: 'Required' })
              : (0, t.jsx)('span', {
                  className: 'text-xs text-muted-foreground',
                  children: 'Public',
                }),
          }),
          (0, t.jsx)(h.TableCell, {
            children: (0, t.jsxs)('div', {
              className: 'flex items-center gap-2',
              children: [
                (0, t.jsx)('span', {
                  className: `h-2 w-2 rounded-full ${e.enabled ? 'bg-green-500' : 'bg-gray-400'}`,
                }),
                (0, t.jsx)('span', {
                  className: 'text-xs',
                  children: e.enabled ? 'Enabled' : 'Disabled',
                }),
              ],
            }),
          }),
          (0, t.jsx)(h.TableCell, {
            className: 'text-right',
            children: (0, t.jsx)(u.Button, {
              variant: 'ghost',
              size: 'sm',
              asChild: !0,
              children: (0, t.jsx)(a.default, { href: `/routes/${e.id}`, children: 'Edit' }),
            }),
          }),
        ],
      });
    }
    e.s([
      'default',
      0,
      function () {
        let [e, a] = (0, r.useState)(''),
          { data: d = [], isLoading: m } = (0, s.useQuery)({
            queryKey: ['routes'],
            queryFn: async () => (await new Promise((e) => setTimeout(e, 300)), p.mockRoutes),
          }),
          b = d.filter(
            (t) =>
              t.path.toLowerCase().includes(e.toLowerCase()) ||
              t.upstream.toLowerCase().includes(e.toLowerCase()),
          );
        return (0, t.jsxs)('div', {
          className: 'space-y-6',
          children: [
            (0, t.jsxs)('div', {
              className: 'flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between',
              children: [
                (0, t.jsxs)('div', {
                  children: [
                    (0, t.jsx)('h2', {
                      className: 'text-2xl font-semibold tracking-tight',
                      children: 'Routes',
                    }),
                    (0, t.jsx)('p', {
                      className: 'text-sm text-muted-foreground',
                      children: 'Kelola routing request ke upstream service',
                    }),
                  ],
                }),
                (0, t.jsxs)('div', {
                  className: 'flex gap-2',
                  children: [
                    (0, t.jsxs)(u.Button, {
                      variant: 'outline',
                      size: 'sm',
                      children: [
                        (0, t.jsx)(n.RefreshCw, { className: 'mr-2 h-4 w-4' }),
                        'Reload Config',
                      ],
                    }),
                    (0, t.jsxs)(u.Button, {
                      size: 'sm',
                      children: [(0, t.jsx)(i.Plus, { className: 'mr-2 h-4 w-4' }), 'New Route'],
                    }),
                  ],
                }),
              ],
            }),
            (0, t.jsx)('div', {
              className: 'flex items-center gap-2',
              children: (0, t.jsxs)('div', {
                className: 'relative flex-1 max-w-sm',
                children: [
                  (0, t.jsx)(l.Search, {
                    className:
                      'absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground',
                  }),
                  (0, t.jsx)(o.Input, {
                    placeholder: 'Search routes...',
                    value: e,
                    onChange: (e) => a(e.target.value),
                    className: 'pl-9',
                  }),
                ],
              }),
            }),
            (0, t.jsx)(c.Card, {
              children: (0, t.jsx)(c.CardContent, {
                className: 'p-0',
                children: (0, t.jsxs)(h.Table, {
                  children: [
                    (0, t.jsx)(h.TableHeader, {
                      children: (0, t.jsxs)(h.TableRow, {
                        children: [
                          (0, t.jsx)(h.TableHead, { children: 'Path' }),
                          (0, t.jsx)(h.TableHead, { children: 'Method' }),
                          (0, t.jsx)(h.TableHead, { children: 'Upstream' }),
                          (0, t.jsx)(h.TableHead, { children: 'Auth' }),
                          (0, t.jsx)(h.TableHead, { children: 'Status' }),
                          (0, t.jsx)(h.TableHead, { className: 'text-right', children: 'Actions' }),
                        ],
                      }),
                    }),
                    (0, t.jsx)(h.TableBody, {
                      children: m
                        ? (0, t.jsx)(h.TableRow, {
                            children: (0, t.jsx)(h.TableCell, {
                              colSpan: 6,
                              className: 'text-center py-8 text-muted-foreground',
                              children: 'Loading...',
                            }),
                          })
                        : 0 === b.length
                          ? (0, t.jsx)(h.TableRow, {
                              children: (0, t.jsx)(h.TableCell, {
                                colSpan: 6,
                                className: 'text-center py-8 text-muted-foreground',
                                children: 'Tidak ada route ditemukan',
                              }),
                            })
                          : b.map((e) => (0, t.jsx)(f, { route: e }, e.id)),
                    }),
                  ],
                }),
              }),
            }),
          ],
        });
      },
    ]);
  },
  6773,
  (e) => {
    'use strict';
    var t = e.i(24830),
      r = e.i(94237),
      s = e.i(59992);
    let a = (0, r.cva)(
      'inline-flex items-center gap-1 rounded-[4px] border px-2 py-0.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
      {
        variants: {
          variant: {
            default:
              'border-transparent bg-primary text-primary-foreground shadow-sm hover:bg-primary/80',
            secondary: 'border-transparent bg-muted text-foreground hover:bg-muted/80',
            destructive:
              'border-transparent bg-destructive text-primary-foreground shadow-sm hover:bg-destructive/80',
            outline: 'border-border text-foreground',
          },
        },
        defaultVariants: { variant: 'default' },
      },
    );
    e.s([
      'Badge',
      0,
      function ({ className: e, variant: r, ...i }) {
        return (0, t.jsx)('div', { className: (0, s.cn)(a({ variant: r }), e), ...i });
      },
    ]);
  },
  54815,
  (e) => {
    'use strict';
    var t = e.i(24830),
      r = e.i(39380),
      s = e.i(59992);
    let a = r.forwardRef(({ className: e, ...r }, a) =>
      (0, t.jsx)('div', {
        ref: a,
        className: (0, s.cn)(
          'rounded-[8px] border border-border bg-background text-foreground shadow-sm',
          e,
        ),
        ...r,
      }),
    );
    a.displayName = 'Card';
    let i = r.forwardRef(({ className: e, ...r }, a) =>
      (0, t.jsx)('div', { ref: a, className: (0, s.cn)('flex flex-col space-y-2 p-6', e), ...r }),
    );
    i.displayName = 'CardHeader';
    let l = r.forwardRef(({ className: e, ...r }, a) =>
      (0, t.jsx)('h3', {
        ref: a,
        className: (0, s.cn)('font-semibold leading-none tracking-tight', e),
        ...r,
      }),
    );
    l.displayName = 'CardTitle';
    let n = r.forwardRef(({ className: e, ...r }, a) =>
      (0, t.jsx)('p', { ref: a, className: (0, s.cn)('text-sm text-muted-foreground', e), ...r }),
    );
    n.displayName = 'CardDescription';
    let u = r.forwardRef(({ className: e, ...r }, a) =>
      (0, t.jsx)('div', { ref: a, className: (0, s.cn)('p-6 pt-0', e), ...r }),
    );
    ((u.displayName = 'CardContent'),
      (r.forwardRef(({ className: e, ...r }, a) =>
        (0, t.jsx)('div', { ref: a, className: (0, s.cn)('flex items-center p-6 pt-0', e), ...r }),
      ).displayName = 'CardFooter'),
      e.s([
        'Card',
        0,
        a,
        'CardContent',
        0,
        u,
        'CardDescription',
        0,
        n,
        'CardHeader',
        0,
        i,
        'CardTitle',
        0,
        l,
      ]));
  },
  2863,
  (e) => {
    'use strict';
    var t = e.i(24830),
      r = e.i(39380),
      s = e.i(59992);
    let a = r.forwardRef(({ className: e, type: r, ...a }, i) =>
      (0, t.jsx)('input', {
        type: r,
        className: (0, s.cn)(
          'flex h-9 w-full rounded-[4px] border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive',
          e,
        ),
        ref: i,
        ...a,
      }),
    );
    ((a.displayName = 'Input'), e.s(['Input', 0, a]));
  },
  40720,
  (e) => {
    'use strict';
    var t = e.i(24830),
      r = e.i(39380),
      s = e.i(59992);
    let a = r.forwardRef(({ className: e, ...r }, a) =>
      (0, t.jsx)('div', {
        className: 'relative w-full overflow-auto',
        children: (0, t.jsx)('table', {
          ref: a,
          className: (0, s.cn)('w-full caption-bottom text-sm text-foreground', e),
          ...r,
        }),
      }),
    );
    a.displayName = 'Table';
    let i = r.forwardRef(({ className: e, ...r }, a) =>
      (0, t.jsx)('thead', {
        ref: a,
        className: (0, s.cn)('border-b border-border [&_tr]:border-b', e),
        ...r,
      }),
    );
    i.displayName = 'TableHeader';
    let l = r.forwardRef(({ className: e, ...r }, a) =>
      (0, t.jsx)('tbody', { ref: a, className: (0, s.cn)('[&_tr:last-child]:border-0', e), ...r }),
    );
    l.displayName = 'TableBody';
    let n = r.forwardRef(({ className: e, ...r }, a) =>
      (0, t.jsx)('tr', {
        ref: a,
        className: (0, s.cn)(
          'border-b border-border transition-colors hover:bg-muted/50 focus-within:bg-muted data-[state=selected]:bg-muted',
          e,
        ),
        ...r,
      }),
    );
    n.displayName = 'TableRow';
    let u = r.forwardRef(({ className: e, ...r }, a) =>
      (0, t.jsx)('th', {
        ref: a,
        className: (0, s.cn)(
          'h-10 px-3 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
          e,
        ),
        ...r,
      }),
    );
    u.displayName = 'TableHead';
    let o = r.forwardRef(({ className: e, ...r }, a) =>
      (0, t.jsx)('td', {
        ref: a,
        className: (0, s.cn)(
          'p-3 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
          e,
        ),
        ...r,
      }),
    );
    ((o.displayName = 'TableCell'),
      e.s([
        'Table',
        0,
        a,
        'TableBody',
        0,
        l,
        'TableCell',
        0,
        o,
        'TableHead',
        0,
        u,
        'TableHeader',
        0,
        i,
        'TableRow',
        0,
        n,
      ]));
  },
  93265,
  (e) => {
    'use strict';
    e.s([
      'generateMetricSeries',
      0,
      function (e = 24) {
        return Array.from({ length: e }, (e, t) => {
          let r = t.toString().padStart(2, '0'),
            s = 3e3 + 1500 * Math.sin(t / 3) + 500 * Math.random();
          return {
            time: `${r}:00`,
            requests: Math.round(s),
            errors: Math.round(0.001 * s * Math.random()),
            p95: Math.round(40 + 20 * Math.random()),
          };
        });
      },
      'mockActivity',
      0,
      [
        {
          id: 'a_1',
          timestamp: '2026-09-22T12:34:21Z',
          actor: 'admin',
          action: 'config.reload',
          target: 'routes',
          status: 'success',
        },
        {
          id: 'a_2',
          timestamp: '2026-09-22T12:30:02Z',
          actor: 'admin',
          action: 'api_key.create',
          target: 'partner-acme',
          status: 'success',
        },
        {
          id: 'a_3',
          timestamp: '2026-09-22T12:15:44Z',
          actor: 'system',
          action: 'circuit.open',
          target: 'billing-svc',
          status: 'warning',
        },
        {
          id: 'a_4',
          timestamp: '2026-09-22T12:10:11Z',
          actor: 'admin',
          action: 'tenant.update',
          target: 'beta',
          status: 'success',
        },
      ],
      'mockApiKeys',
      0,
      [
        {
          id: 'k_001',
          name: 'partner-acme',
          tenantId: 'acme',
          scopes: ['order:read'],
          status: 'active',
          usageCount: 4200,
          createdAt: '2026-08-20T10:00:00Z',
          lastUsedAt: '2026-09-22T12:32:00Z',
        },
        {
          id: 'k_002',
          name: 'prod-acme-01',
          tenantId: 'acme',
          scopes: ['*:*'],
          status: 'active',
          usageCount: 12e5,
          createdAt: '2026-08-15T10:00:00Z',
          lastUsedAt: '2026-09-22T12:34:00Z',
        },
        {
          id: 'k_003',
          name: 'prod-beta-01',
          tenantId: 'beta',
          scopes: ['order:*'],
          status: 'active',
          usageCount: 456e3,
          createdAt: '2026-08-20T10:00:00Z',
          lastUsedAt: '2026-09-22T11:15:00Z',
        },
        {
          id: 'k_004',
          name: 'staging-old',
          tenantId: 'acme',
          scopes: ['order:read'],
          status: 'revoked',
          usageCount: 0,
          createdAt: '2026-06-01T10:00:00Z',
        },
      ],
      'mockRoutes',
      0,
      [
        {
          id: 'r_001',
          path: '/api/v1/orders',
          method: 'GET',
          upstream: 'order-svc',
          enabled: !0,
          requireAuth: !0,
          createdAt: '2026-08-15T10:00:00Z',
        },
        {
          id: 'r_002',
          path: '/api/v1/orders',
          method: 'POST',
          upstream: 'order-svc',
          enabled: !0,
          requireAuth: !0,
          requireIdempotency: !0,
          createdAt: '2026-08-15T10:00:00Z',
        },
        {
          id: 'r_003',
          path: '/api/v1/orders/:id',
          method: 'GET',
          upstream: 'order-svc',
          enabled: !0,
          requireAuth: !0,
          createdAt: '2026-08-15T10:00:00Z',
        },
        {
          id: 'r_004',
          path: '/api/v1/users',
          method: 'GET',
          upstream: 'auth-svc',
          enabled: !0,
          requireAuth: !0,
          createdAt: '2026-08-15T10:00:00Z',
        },
        {
          id: 'r_005',
          path: '/api/v1/users/:id',
          method: 'GET',
          upstream: 'auth-svc',
          enabled: !0,
          requireAuth: !0,
          createdAt: '2026-08-15T10:00:00Z',
        },
        {
          id: 'r_006',
          path: '/api/v1/billing',
          method: 'GET',
          upstream: 'billing-svc',
          enabled: !1,
          requireAuth: !0,
          createdAt: '2026-08-20T10:00:00Z',
        },
        {
          id: 'r_007',
          path: '/api/v1/webhooks',
          method: 'POST',
          upstream: 'notif-svc',
          enabled: !0,
          requireAuth: !1,
          createdAt: '2026-09-01T10:00:00Z',
        },
        {
          id: 'r_008',
          path: '/api/v1/legacy/*',
          method: 'ALL',
          upstream: 'legacy-svc',
          enabled: !1,
          requireAuth: !1,
          createdAt: '2026-09-10T10:00:00Z',
        },
      ],
      'mockTenants',
      0,
      [
        {
          id: 't_001',
          slug: 'acme',
          name: 'Acme Corporation',
          tier: 'enterprise',
          status: 'active',
          createdAt: '2026-08-15T10:00:00Z',
          requests: 1245231,
        },
        {
          id: 't_002',
          slug: 'beta',
          name: 'Beta Inc',
          tier: 'pro',
          status: 'active',
          createdAt: '2026-08-20T10:00:00Z',
          requests: 456102,
        },
        {
          id: 't_003',
          slug: 'gamma',
          name: 'Gamma LLC',
          tier: 'free',
          status: 'suspended',
          createdAt: '2026-08-25T10:00:00Z',
          requests: 12003,
        },
        {
          id: 't_004',
          slug: 'delta',
          name: 'Delta Co',
          tier: 'pro',
          status: 'active',
          createdAt: '2026-09-01T10:00:00Z',
          requests: 89441,
        },
        {
          id: 't_005',
          slug: 'epsilon',
          name: 'Epsilon Ltd',
          tier: 'free',
          status: 'inactive',
          createdAt: '2026-09-10T10:00:00Z',
          requests: 0,
        },
      ],
    ]);
  },
  84151,
  (e) => {
    'use strict';
    let t;
    var r = e.i(50955),
      s = e.i(39380);
    let a = s.createContext(!1);
    (a.Provider, e.i(24830));
    let i = s.createContext(
      ((t = !1),
      {
        clearReset: () => {
          t = !1;
        },
        reset: () => {
          t = !0;
        },
        isReset: () => t,
      }),
    );
    var l = e.i(78356),
      n = e.i(70508),
      u = e.i(68550),
      o = e.i(7934),
      c = e.i(77288),
      d = e.i(53094),
      h = e.i(40741),
      p = class extends c.Subscribable {
        #e;
        #t = void 0;
        #r = void 0;
        #s = void 0;
        #a;
        #i;
        #l;
        #n;
        #u;
        #o;
        #c;
        #d;
        #h;
        #p = new Set();
        constructor(e, t) {
          (super(),
            (this.options = t),
            (this.#e = e),
            (this.#l = null),
            this.bindMethods(),
            this.setOptions(t));
        }
        bindMethods() {
          this.refetch = this.refetch.bind(this);
        }
        onSubscribe() {
          1 === this.listeners.size &&
            (this.#t.addObserver(this),
            f(this.#t, this.options) ? this.#f() : this.updateResult(),
            this.#m());
        }
        onUnsubscribe() {
          this.hasListeners() || this.destroy();
        }
        shouldFetchOnReconnect() {
          return m(this.#t, this.options, this.options.refetchOnReconnect);
        }
        shouldFetchOnWindowFocus() {
          return m(this.#t, this.options, this.options.refetchOnWindowFocus);
        }
        destroy() {
          ((this.listeners = new Set()), this.#b(), this.#y(), this.#t.removeObserver(this));
        }
        setOptions(e) {
          let t = this.options,
            r = this.#t;
          if (
            ((this.options = this.#e.defaultQueryOptions(e)),
            void 0 !== this.options.enabled &&
              'boolean' != typeof this.options.enabled &&
              'function' != typeof this.options.enabled &&
              'boolean' != typeof (0, l.resolveQueryValue)(this.options.enabled, this.#t))
          )
            throw Error('Expected enabled to be a boolean or a callback that returns a boolean');
          (this.#v(),
            this.#t.setOptions(this.options),
            t._defaulted &&
              !(0, l.shallowEqualObjects)(this.options, t) &&
              this.#e
                .getQueryCache()
                .notify({ type: 'observerOptionsUpdated', query: this.#t, observer: this }));
          let s = this.hasListeners();
          (s && b(this.#t, r, this.options, t) && this.#f(),
            this.updateResult(),
            s &&
              (this.#t !== r ||
                (0, l.resolveQueryValue)(this.options.enabled, this.#t) !==
                  (0, l.resolveQueryValue)(t.enabled, this.#t) ||
                (0, l.resolveQueryValue)(this.options.staleTime, this.#t) !==
                  (0, l.resolveQueryValue)(t.staleTime, this.#t)) &&
              this.#x());
          let a = this.#g();
          s &&
            (this.#t !== r ||
              (0, l.resolveQueryValue)(this.options.enabled, this.#t) !==
                (0, l.resolveQueryValue)(t.enabled, this.#t) ||
              a !== this.#h) &&
            this.#R(a);
        }
        getOptimisticResult(e) {
          let t = this.#e.getQueryCache().build(this.#e, e),
            r = this.createResult(t, e);
          return (
            (0, l.shallowEqualObjects)(this.getCurrentResult(), r) ||
              ((this.#s = r), (this.#i = this.options), (this.#a = this.#t.state)),
            r
          );
        }
        getCurrentResult() {
          return this.#s;
        }
        trackResult(e, t) {
          return new Proxy(e, { get: (e, r) => (this.trackProp(r), t?.(r), Reflect.get(e, r)) });
        }
        trackProp(e) {
          this.#p.add(e);
        }
        getCurrentQuery() {
          return this.#t;
        }
        refetch({ ...e } = {}) {
          return this.fetch({ ...e });
        }
        fetchOptimistic(e) {
          let t,
            r = this.#e.defaultQueryOptions(e),
            s = this.#e.getQueryCache().build(this.#e, r),
            a = () => {},
            i = new Promise((e) => {
              ((t = e),
                (a = this.#e.getQueryCache().subscribe((t) => {
                  'updated' === t.type &&
                    t.query.queryHash === s.queryHash &&
                    void 0 !== s.state.data &&
                    (a(), e(this.createResult(s, r)));
                })));
            });
          return Promise.race([
            s
              .fetch()
              .then(() => {
                let e = this.createResult(s, r);
                return (t?.(e), e);
              })
              .finally(() => {
                a();
              }),
            i,
          ]);
        }
        fetch(e) {
          return this.#f({ ...e, cancelRefetch: e.cancelRefetch ?? !0 }).then(
            () => (this.updateResult(), this.#s),
          );
        }
        #f(e) {
          this.#v();
          let t = this.#t.fetch(this.options, e);
          return (e?.throwOnError || (t = t.catch(l.noop)), t);
        }
        #T(e) {
          return (
            !(0, o.isServer)() &&
            !1 !== (0, l.resolveQueryValue)(this.options.enabled, this.#t) &&
            (0, l.isValidTimeout)(e)
          );
        }
        #x() {
          this.#b();
          let e = (0, l.resolveQueryValue)(this.options.staleTime, this.#t);
          if (this.#s.isStale || !this.#T(e)) return;
          let t = (0, l.timeUntilStale)(this.#s.dataUpdatedAt, e) + 1;
          this.#c = u.timeoutManager.setTimeout(() => {
            this.#s.isStale || this.updateResult();
          }, t);
        }
        #g() {
          return (0, l.resolveQueryValue)(this.options.refetchInterval, this.#t) ?? !1;
        }
        #R(e) {
          (this.#y(),
            (this.#h = e),
            0 !== this.#h &&
              this.#T(this.#h) &&
              (this.#d = u.timeoutManager.setInterval(() => {
                (this.options.refetchIntervalInBackground || d.focusManager.isFocused()) &&
                  this.#f();
              }, this.#h)));
        }
        #m() {
          (this.#x(), this.#R(this.#g()));
        }
        #b() {
          void 0 !== this.#c && (u.timeoutManager.clearTimeout(this.#c), (this.#c = void 0));
        }
        #y() {
          void 0 !== this.#d && (u.timeoutManager.clearInterval(this.#d), (this.#d = void 0));
        }
        createResult(e, t) {
          let r,
            s = this.#t,
            a = this.options,
            i = this.#s,
            n = this.#a,
            u = this.#i,
            o = e !== s ? e.state : this.#r,
            { state: c } = e,
            d = { ...c },
            p = !1;
          if (t._optimisticResults) {
            let r = this.hasListeners(),
              i = !r && f(e, t),
              l = r && b(e, s, t, a);
            ((i || l) && (d = { ...d, ...(0, h.fetchState)(c.data, e.options) }),
              'isRestoring' === t._optimisticResults && (d.fetchStatus = 'idle'));
          }
          let { error: m, errorUpdatedAt: v, status: x } = d;
          r = d.data;
          let g = !1;
          if (void 0 !== t.placeholderData && void 0 === r && 'pending' === x) {
            let e;
            (i?.isPlaceholderData && t.placeholderData === u?.placeholderData
              ? ((e = i.data), (g = !0))
              : (e =
                  'function' == typeof t.placeholderData
                    ? t.placeholderData(this.#o?.state.data, this.#o)
                    : t.placeholderData),
              void 0 !== e && ((x = 'success'), (r = (0, l.replaceData)(i?.data, e, t)), (p = !0)));
          }
          if (t.select && void 0 !== r && !g)
            if (i && r === n?.data && t.select === this.#n) r = this.#u;
            else
              try {
                ((this.#n = t.select),
                  (r = t.select(r)),
                  (r = (0, l.replaceData)(i?.data, r, t)),
                  (this.#u = r),
                  (this.#l = null));
              } catch (e) {
                this.#l = e;
              }
          else void 0 === r && (this.#l = null);
          this.#l && ((m = this.#l), (r = this.#u), (v = Date.now()), (x = 'error'), (p = !1));
          let R = 'fetching' === d.fetchStatus,
            T = 'pending' === x,
            Q = 'error' === x,
            w = T && R,
            C = void 0 !== r;
          return {
            status: x,
            fetchStatus: d.fetchStatus,
            isPending: T,
            isSuccess: 'success' === x,
            isError: Q,
            isInitialLoading: w,
            isLoading: w,
            data: r,
            dataUpdatedAt: d.dataUpdatedAt,
            error: m,
            errorUpdatedAt: v,
            failureCount: d.fetchFailureCount,
            failureReason: d.fetchFailureReason,
            errorUpdateCount: d.errorUpdateCount,
            isFetched: e.isFetched(),
            isFetchedAfterMount:
              d.dataUpdateCount > o.dataUpdateCount || d.errorUpdateCount > o.errorUpdateCount,
            isFetching: R,
            isRefetching: R && !T,
            isLoadingError: Q && !C,
            isPaused: 'paused' === d.fetchStatus,
            isPlaceholderData: p,
            isRefetchError: Q && C,
            isStale: y(e, t),
            refetch: this.refetch,
            isEnabled: !1 !== (0, l.resolveQueryValue)(t.enabled, e),
          };
        }
        updateResult() {
          let e = this.#s,
            t = this.createResult(this.#t, this.options);
          if (
            ((this.#a = this.#t.state),
            (this.#i = this.options),
            void 0 !== this.#a.data && (this.#o = this.#t),
            (0, l.shallowEqualObjects)(t, e))
          )
            return;
          this.#s = t;
          let r = (() => {
            if (!e) return !0;
            let { notifyOnChangeProps: t } = this.options,
              r = 'function' == typeof t ? t() : t;
            if ('all' === r || (!r && !this.#p.size)) return !0;
            let s = new Set(r ?? this.#p);
            return (
              this.options.throwOnError && s.add('error'),
              Object.keys(this.#s).some((t) => this.#s[t] !== e[t] && s.has(t))
            );
          })();
          n.notifyManager.batch(() => {
            (r &&
              this.listeners.forEach((e) => {
                e(this.#s);
              }),
              this.#e.getQueryCache().notify({ query: this.#t, type: 'observerResultsUpdated' }));
          });
        }
        #v() {
          let e = this.#e.getQueryCache().build(this.#e, this.options);
          if (e === this.#t) return;
          let t = this.#t;
          ((this.#t = e),
            (this.#r = e.state),
            this.hasListeners() && (t?.removeObserver(this), e.addObserver(this)));
        }
        onQueryUpdate() {
          (this.updateResult(), this.hasListeners() && this.#m());
        }
      };
    function f(e, t) {
      return (
        (!1 !== (0, l.resolveQueryValue)(t.enabled, e) &&
          void 0 === e.state.data &&
          ('error' !== e.state.status || !1 !== (0, l.resolveQueryValue)(t.retryOnMount, e))) ||
        (void 0 !== e.state.data && m(e, t, t.refetchOnMount))
      );
    }
    function m(e, t, r) {
      if (
        !1 !== (0, l.resolveQueryValue)(t.enabled, e) &&
        'static' !== (0, l.resolveQueryValue)(t.staleTime, e)
      ) {
        let s = (0, l.resolveQueryValue)(r, e);
        return 'always' === s || (!1 !== s && y(e, t));
      }
      return !1;
    }
    function b(e, t, r, s) {
      return (
        (e !== t || !1 === (0, l.resolveQueryValue)(s.enabled, e)) &&
        (!r.suspense || 'error' !== e.state.status) &&
        y(e, r)
      );
    }
    function y(e, t) {
      return (
        !1 !== (0, l.resolveQueryValue)(t.enabled, e) &&
        e.isStaleByTime((0, l.resolveQueryValue)(t.staleTime, e))
      );
    }
    e.s(
      [
        'useQuery',
        0,
        function (e, t) {
          return (function (e, t, u) {
            let o,
              c = s.useContext(a),
              d = s.useContext(i),
              h = (0, r.useQueryClient)(u),
              p = h.defaultQueryOptions(e),
              f = h.getQueryCache().get(p.queryHash),
              m = !1 !== e.subscribed;
            if (
              ((p._optimisticResults = c ? 'isRestoring' : m ? 'optimistic' : void 0), p.suspense)
            ) {
              let e = (e) => ('static' === e ? e : Math.max(e ?? 1e3, 1e3)),
                t = p.staleTime;
              ((p.staleTime = 'function' == typeof t ? (...r) => e(t(...r)) : e(t)),
                'number' == typeof p.gcTime && (p.gcTime = Math.max(p.gcTime, 1e3)));
            }
            ((o =
              f?.state.error && 'function' == typeof p.throwOnError
                ? (0, l.shouldThrowError)(p.throwOnError, [f.state.error, f])
                : p.throwOnError),
              (p.suspense || o) && !d.isReset() && (p.retryOnMount = !1),
              s.useEffect(() => {
                d.clearReset();
              }, [d]));
            let [b] = s.useState(() => new t(h, p)),
              y = b.getOptimisticResult(p),
              v = !c && m;
            if (
              (s.useSyncExternalStore(
                s.useCallback(
                  (e) => {
                    let t = v ? b.subscribe(n.notifyManager.batchCalls(e)) : l.noop;
                    return (b.updateResult(), t);
                  },
                  [b, v],
                ),
                () => b.getCurrentResult(),
                () => b.getCurrentResult(),
              ),
              s.useEffect(() => {
                b.setOptions(p);
              }, [p, b]),
              p?.suspense && y.isPending)
            )
              throw b.fetchOptimistic(p).catch(() => {
                d.clearReset();
              });
            if (
              (({ result: e, errorResetBoundary: t, throwOnError: r, query: s, suspense: a }) =>
                e.isError &&
                !t.isReset() &&
                !e.isFetching &&
                s &&
                ((a && void 0 === e.data) || (0, l.shouldThrowError)(r, [e.error, s])))({
                result: y,
                errorResetBoundary: d,
                throwOnError: p.throwOnError,
                query: f,
                suspense: p.suspense,
              })
            )
              throw y.error;
            return p.notifyOnChangeProps ? y : b.trackResult(y);
          })(e, p, t);
        },
      ],
      84151,
    );
  },
  46799,
  68281,
  (e) => {
    'use strict';
    var t = e.i(32155);
    let r = (0, t.default)('Plus', [
      ['path', { d: 'M5 12h14', key: '1ays0h' }],
      ['path', { d: 'M12 5v14', key: 's699le' }],
    ]);
    e.s(['Plus', 0, r], 46799);
    let s = (0, t.default)('Search', [
      ['circle', { cx: '11', cy: '11', r: '8', key: '4ej97u' }],
      ['path', { d: 'm21 21-4.3-4.3', key: '1qie3q' }],
    ]);
    e.s(['Search', 0, s], 68281);
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
