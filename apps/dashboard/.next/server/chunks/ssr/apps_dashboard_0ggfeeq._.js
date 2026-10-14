module.exports = [
  95064,
  (a) => {
    'use strict';
    var b = a.i(68508),
      c = a.i(60301),
      d = a.i(75414),
      e = a.i(88878),
      f = a.i(48741),
      g = a.i(48326),
      h = a.i(96265),
      i = a.i(91321),
      j = a.i(35962),
      k = a.i(18920),
      l = a.i(36102),
      m = a.i(33877),
      n = a.i(41151),
      o = a.i(35163),
      p = Object.defineProperty,
      q = (a, b) => p(a, 'name', { value: b, configurable: !0 }),
      r = 'Tabs',
      [s, t] = (0, i.createContextScope)(r, [j.createRovingFocusGroupScope]),
      u = (0, j.createRovingFocusGroupScope)(),
      [v, w] = s(r),
      x = g.forwardRef(
        q(function (a, c) {
          let {
              __scopeTabs: d,
              value: e,
              onValueChange: f,
              defaultValue: g,
              orientation: h = 'horizontal',
              dir: i,
              activationMode: j = 'automatic',
              ...k
            } = a,
            p = (0, m.useDirection)(i),
            [q, s] = (0, n.useControllableState)({
              prop: e,
              onChange: f,
              defaultProp: g ?? '',
              caller: r,
            });
          return (0, b.jsx)(v, {
            scope: d,
            baseId: (0, o.useId)(),
            value: q,
            onValueChange: s,
            orientation: h,
            dir: p,
            activationMode: j,
            children: (0, b.jsx)(l.Primitive.div, { dir: p, 'data-orientation': h, ...k, ref: c }),
          });
        }, 'Tabs'),
      ),
      y = g.forwardRef(
        q(function (a, c) {
          let { __scopeTabs: d, loop: e = !0, ...f } = a,
            g = w('TabsList', d),
            h = u(d);
          return (0, b.jsx)(j.Root, {
            asChild: !0,
            ...h,
            orientation: g.orientation,
            dir: g.dir,
            loop: e,
            children: (0, b.jsx)(l.Primitive.div, {
              role: 'tablist',
              'aria-orientation': g.orientation,
              ...f,
              ref: c,
            }),
          });
        }, 'TabsList'),
      ),
      z = g.forwardRef(
        q(function (a, c) {
          let { __scopeTabs: d, value: e, disabled: f = !1, ...g } = a,
            i = w('TabsTrigger', d),
            k = u(d),
            m = B(i.baseId, e),
            n = C(i.baseId, e),
            o = e === i.value;
          return (0, b.jsx)(j.Item, {
            asChild: !0,
            ...k,
            focusable: !f,
            active: o,
            children: (0, b.jsx)(l.Primitive.button, {
              type: 'button',
              role: 'tab',
              'aria-selected': o,
              'aria-controls': n,
              'data-state': o ? 'active' : 'inactive',
              'data-disabled': f ? '' : void 0,
              disabled: f,
              id: m,
              ...g,
              ref: c,
              onMouseDown: (0, h.composeEventHandlers)(a.onMouseDown, (a) => {
                f || 0 !== a.button || !1 !== a.ctrlKey ? a.preventDefault() : i.onValueChange(e);
              }),
              onKeyDown: (0, h.composeEventHandlers)(a.onKeyDown, (a) => {
                !f &&
                  a.target === a.currentTarget &&
                  [' ', 'Enter'].includes(a.key) &&
                  i.onValueChange(e);
              }),
              onFocus: (0, h.composeEventHandlers)(a.onFocus, () => {
                let a = 'manual' !== i.activationMode;
                o || f || !a || i.onValueChange(e);
              }),
            }),
          });
        }, 'TabsTrigger'),
      ),
      A = g.forwardRef(
        q(function (a, c) {
          let { __scopeTabs: d, value: e, forceMount: f, children: h, ...i } = a,
            j = w('TabsContent', d),
            m = B(j.baseId, e),
            n = C(j.baseId, e),
            o = e === j.value,
            p = g.useRef(o);
          return (
            g.useEffect(() => {
              let a = requestAnimationFrame(() => (p.current = !1));
              return () => cancelAnimationFrame(a);
            }, []),
            (0, b.jsx)(k.Presence, {
              present: f || o,
              children: ({ present: d }) =>
                (0, b.jsx)(l.Primitive.div, {
                  'data-state': o ? 'active' : 'inactive',
                  'data-orientation': j.orientation,
                  role: 'tabpanel',
                  'aria-labelledby': m,
                  hidden: !d,
                  id: n,
                  tabIndex: 0,
                  ...i,
                  ref: c,
                  style: { ...a.style, animationDuration: p.current ? '0s' : void 0 },
                  children: d && h,
                }),
            })
          );
        }, 'TabsContent'),
      );
    function B(a, b) {
      return `${a}-trigger-${b}`;
    }
    function C(a, b) {
      return `${a}-content-${b}`;
    }
    (q(B, 'makeTriggerId'), q(C, 'makeContentId'));
    var D = a.i(35147);
    let E = g.forwardRef(({ className: a, ...c }, d) =>
      (0, b.jsx)(y, {
        ref: d,
        className: (0, D.cn)(
          'inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground',
          a,
        ),
        ...c,
      }),
    );
    E.displayName = y.displayName;
    let F = g.forwardRef(({ className: a, ...c }, d) =>
      (0, b.jsx)(z, {
        ref: d,
        className: (0, D.cn)(
          'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow',
          a,
        ),
        ...c,
      }),
    );
    F.displayName = z.displayName;
    let G = g.forwardRef(({ className: a, ...c }, d) =>
      (0, b.jsx)(A, {
        ref: d,
        className: (0, D.cn)(
          'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
          a,
        ),
        ...c,
      }),
    );
    G.displayName = A.displayName;
    var H = a.i(20434);
    a.s(
      [
        'default',
        0,
        function () {
          let { user: a } = (0, H.useAuth)();
          return (0, b.jsxs)('div', {
            className: 'space-y-6',
            children: [
              (0, b.jsxs)('div', {
                children: [
                  (0, b.jsx)('h2', {
                    className: 'text-2xl font-semibold tracking-tight',
                    children: 'Settings',
                  }),
                  (0, b.jsx)('p', {
                    className: 'text-sm text-muted-foreground',
                    children: 'Pengaturan akun dan gateway',
                  }),
                ],
              }),
              (0, b.jsxs)(x, {
                defaultValue: 'profile',
                children: [
                  (0, b.jsxs)(E, {
                    children: [
                      (0, b.jsx)(F, { value: 'profile', children: 'Profile' }),
                      (0, b.jsx)(F, { value: 'security', children: 'Security' }),
                      (0, b.jsx)(F, { value: 'general', children: 'General' }),
                    ],
                  }),
                  (0, b.jsx)(G, {
                    value: 'profile',
                    className: 'space-y-4',
                    children: (0, b.jsxs)(c.Card, {
                      children: [
                        (0, b.jsxs)(c.CardHeader, {
                          children: [
                            (0, b.jsx)(c.CardTitle, { children: 'Profile' }),
                            (0, b.jsx)(c.CardDescription, { children: 'Informasi akun Anda' }),
                          ],
                        }),
                        (0, b.jsxs)(c.CardContent, {
                          className: 'space-y-4 max-w-md',
                          children: [
                            (0, b.jsxs)('div', {
                              className: 'space-y-2',
                              children: [
                                (0, b.jsx)(e.Label, { children: 'Email' }),
                                (0, b.jsx)(d.Input, { value: a?.email ?? '', readOnly: !0 }),
                              ],
                            }),
                            (0, b.jsxs)('div', {
                              className: 'space-y-2',
                              children: [
                                (0, b.jsx)(e.Label, { children: 'Role' }),
                                (0, b.jsx)(d.Input, { value: a?.roles?.[0] ?? '', readOnly: !0 }),
                              ],
                            }),
                            (0, b.jsxs)('div', {
                              className: 'space-y-2',
                              children: [
                                (0, b.jsx)(e.Label, { children: 'Tenant' }),
                                (0, b.jsx)(d.Input, { value: a?.tenantId ?? '', readOnly: !0 }),
                              ],
                            }),
                            (0, b.jsx)(f.Button, { children: 'Save Changes' }),
                          ],
                        }),
                      ],
                    }),
                  }),
                  (0, b.jsx)(G, {
                    value: 'security',
                    children: (0, b.jsxs)(c.Card, {
                      children: [
                        (0, b.jsxs)(c.CardHeader, {
                          children: [
                            (0, b.jsx)(c.CardTitle, { children: 'Security' }),
                            (0, b.jsx)(c.CardDescription, { children: 'Password dan 2FA' }),
                          ],
                        }),
                        (0, b.jsx)(c.CardContent, {
                          children: (0, b.jsx)('p', {
                            className: 'text-sm text-muted-foreground',
                            children: 'Fitur ini akan tersedia setelah backend siap.',
                          }),
                        }),
                      ],
                    }),
                  }),
                  (0, b.jsx)(G, {
                    value: 'general',
                    children: (0, b.jsxs)(c.Card, {
                      children: [
                        (0, b.jsxs)(c.CardHeader, {
                          children: [
                            (0, b.jsx)(c.CardTitle, { children: 'General' }),
                            (0, b.jsx)(c.CardDescription, { children: 'Konfigurasi gateway' }),
                          ],
                        }),
                        (0, b.jsx)(c.CardContent, {
                          children: (0, b.jsx)('p', {
                            className: 'text-sm text-muted-foreground',
                            children: 'Konfigurasi gateway tersedia di halaman Config.',
                          }),
                        }),
                      ],
                    }),
                  }),
                ],
              }),
            ],
          });
        },
      ],
      95064,
    );
  },
  60301,
  (a) => {
    'use strict';
    var b = a.i(68508),
      c = a.i(48326),
      d = a.i(35147);
    let e = c.forwardRef(({ className: a, ...c }, e) =>
      (0, b.jsx)('div', {
        ref: e,
        className: (0, d.cn)(
          'rounded-[8px] border border-border bg-background text-foreground shadow-sm',
          a,
        ),
        ...c,
      }),
    );
    e.displayName = 'Card';
    let f = c.forwardRef(({ className: a, ...c }, e) =>
      (0, b.jsx)('div', { ref: e, className: (0, d.cn)('flex flex-col space-y-2 p-6', a), ...c }),
    );
    f.displayName = 'CardHeader';
    let g = c.forwardRef(({ className: a, ...c }, e) =>
      (0, b.jsx)('h3', {
        ref: e,
        className: (0, d.cn)('font-semibold leading-none tracking-tight', a),
        ...c,
      }),
    );
    g.displayName = 'CardTitle';
    let h = c.forwardRef(({ className: a, ...c }, e) =>
      (0, b.jsx)('p', { ref: e, className: (0, d.cn)('text-sm text-muted-foreground', a), ...c }),
    );
    h.displayName = 'CardDescription';
    let i = c.forwardRef(({ className: a, ...c }, e) =>
      (0, b.jsx)('div', { ref: e, className: (0, d.cn)('p-6 pt-0', a), ...c }),
    );
    ((i.displayName = 'CardContent'),
      (c.forwardRef(({ className: a, ...c }, e) =>
        (0, b.jsx)('div', { ref: e, className: (0, d.cn)('flex items-center p-6 pt-0', a), ...c }),
      ).displayName = 'CardFooter'),
      a.s([
        'Card',
        0,
        e,
        'CardContent',
        0,
        i,
        'CardDescription',
        0,
        h,
        'CardHeader',
        0,
        f,
        'CardTitle',
        0,
        g,
      ]));
  },
  75414,
  (a) => {
    'use strict';
    var b = a.i(68508),
      c = a.i(48326),
      d = a.i(35147);
    let e = c.forwardRef(({ className: a, type: c, ...e }, f) =>
      (0, b.jsx)('input', {
        type: c,
        className: (0, d.cn)(
          'flex h-9 w-full rounded-[4px] border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive',
          a,
        ),
        ref: f,
        ...e,
      }),
    );
    ((e.displayName = 'Input'), a.s(['Input', 0, e]));
  },
  88878,
  (a) => {
    'use strict';
    var b = a.i(68508),
      c = a.i(48326),
      d = a.i(36102),
      e = Object.defineProperty,
      f = c.forwardRef(
        e(
          function (a, c) {
            return (0, b.jsx)(d.Primitive.label, {
              ...a,
              ref: c,
              onMouseDown: (b) => {
                b.target.closest('button, input, select, textarea') ||
                  (a.onMouseDown?.(b), !b.defaultPrevented && b.detail > 1 && b.preventDefault());
              },
            });
          },
          'name',
          { value: 'Label', configurable: !0 },
        ),
      ),
      g = a.i(42261),
      h = a.i(35147);
    let i = (0, g.cva)(
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      ),
      j = c.forwardRef(({ className: a, ...c }, d) =>
        (0, b.jsx)(f, { ref: d, className: (0, h.cn)(i(), a), ...c }),
      );
    ((j.displayName = f.displayName), a.s(['Label', 0, j], 88878));
  },
];

//# sourceMappingURL=apps_dashboard_0ggfeeq._.js.map
