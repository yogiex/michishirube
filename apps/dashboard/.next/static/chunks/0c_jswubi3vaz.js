(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  'object' == typeof document ? document.currentScript : void 0,
  31823,
  (e) => {
    'use strict';
    var a = e.i(24830),
      r = e.i(54815),
      i = e.i(2863),
      t = e.i(50123),
      n = e.i(36023),
      s = e.i(39380),
      d = e.i(43836),
      l = e.i(64145),
      o = e.i(60065),
      c = e.i(97611),
      u = e.i(78238),
      f = e.i(877),
      m = e.i(15671),
      x = e.i(32567),
      p = Object.defineProperty,
      b = (e, a) => p(e, 'name', { value: a, configurable: !0 }),
      v = 'Tabs',
      [g, h] = (0, l.createContextScope)(v, [o.createRovingFocusGroupScope]),
      j = (0, o.createRovingFocusGroupScope)(),
      [y, C] = g(v),
      N = s.forwardRef(
        b(function (e, r) {
          let {
              __scopeTabs: i,
              value: t,
              onValueChange: n,
              defaultValue: s,
              orientation: d = 'horizontal',
              dir: l,
              activationMode: o = 'automatic',
              ...c
            } = e,
            p = (0, f.useDirection)(l),
            [b, g] = (0, m.useControllableState)({
              prop: t,
              onChange: n,
              defaultProp: s ?? '',
              caller: v,
            });
          return (0, a.jsx)(y, {
            scope: i,
            baseId: (0, x.useId)(),
            value: b,
            onValueChange: g,
            orientation: d,
            dir: p,
            activationMode: o,
            children: (0, a.jsx)(u.Primitive.div, { dir: p, 'data-orientation': d, ...c, ref: r }),
          });
        }, 'Tabs'),
      ),
      w = s.forwardRef(
        b(function (e, r) {
          let { __scopeTabs: i, loop: t = !0, ...n } = e,
            s = C('TabsList', i),
            d = j(i);
          return (0, a.jsx)(o.Root, {
            asChild: !0,
            ...d,
            orientation: s.orientation,
            dir: s.dir,
            loop: t,
            children: (0, a.jsx)(u.Primitive.div, {
              role: 'tablist',
              'aria-orientation': s.orientation,
              ...n,
              ref: r,
            }),
          });
        }, 'TabsList'),
      ),
      R = s.forwardRef(
        b(function (e, r) {
          let { __scopeTabs: i, value: t, disabled: n = !1, ...s } = e,
            l = C('TabsTrigger', i),
            c = j(i),
            f = I(l.baseId, t),
            m = P(l.baseId, t),
            x = t === l.value;
          return (0, a.jsx)(o.Item, {
            asChild: !0,
            ...c,
            focusable: !n,
            active: x,
            children: (0, a.jsx)(u.Primitive.button, {
              type: 'button',
              role: 'tab',
              'aria-selected': x,
              'aria-controls': m,
              'data-state': x ? 'active' : 'inactive',
              'data-disabled': n ? '' : void 0,
              disabled: n,
              id: f,
              ...s,
              ref: r,
              onMouseDown: (0, d.composeEventHandlers)(e.onMouseDown, (e) => {
                n || 0 !== e.button || !1 !== e.ctrlKey ? e.preventDefault() : l.onValueChange(t);
              }),
              onKeyDown: (0, d.composeEventHandlers)(e.onKeyDown, (e) => {
                !n &&
                  e.target === e.currentTarget &&
                  [' ', 'Enter'].includes(e.key) &&
                  l.onValueChange(t);
              }),
              onFocus: (0, d.composeEventHandlers)(e.onFocus, () => {
                let e = 'manual' !== l.activationMode;
                x || n || !e || l.onValueChange(t);
              }),
            }),
          });
        }, 'TabsTrigger'),
      ),
      T = s.forwardRef(
        b(function (e, r) {
          let { __scopeTabs: i, value: t, forceMount: n, children: d, ...l } = e,
            o = C('TabsContent', i),
            f = I(o.baseId, t),
            m = P(o.baseId, t),
            x = t === o.value,
            p = s.useRef(x);
          return (
            s.useEffect(() => {
              let e = requestAnimationFrame(() => (p.current = !1));
              return () => cancelAnimationFrame(e);
            }, []),
            (0, a.jsx)(c.Presence, {
              present: n || x,
              children: ({ present: i }) =>
                (0, a.jsx)(u.Primitive.div, {
                  'data-state': x ? 'active' : 'inactive',
                  'data-orientation': o.orientation,
                  role: 'tabpanel',
                  'aria-labelledby': f,
                  hidden: !i,
                  id: m,
                  tabIndex: 0,
                  ...l,
                  ref: r,
                  style: { ...e.style, animationDuration: p.current ? '0s' : void 0 },
                  children: i && d,
                }),
            })
          );
        }, 'TabsContent'),
      );
    function I(e, a) {
      return `${e}-trigger-${a}`;
    }
    function P(e, a) {
      return `${e}-content-${a}`;
    }
    (b(I, 'makeTriggerId'), b(P, 'makeContentId'));
    var k = e.i(59992);
    let D = s.forwardRef(({ className: e, ...r }, i) =>
      (0, a.jsx)(w, {
        ref: i,
        className: (0, k.cn)(
          'inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground',
          e,
        ),
        ...r,
      }),
    );
    D.displayName = w.displayName;
    let F = s.forwardRef(({ className: e, ...r }, i) =>
      (0, a.jsx)(R, {
        ref: i,
        className: (0, k.cn)(
          'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow',
          e,
        ),
        ...r,
      }),
    );
    F.displayName = R.displayName;
    let S = s.forwardRef(({ className: e, ...r }, i) =>
      (0, a.jsx)(T, {
        ref: i,
        className: (0, k.cn)(
          'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
          e,
        ),
        ...r,
      }),
    );
    S.displayName = T.displayName;
    var H = e.i(53119);
    e.s(
      [
        'default',
        0,
        function () {
          let { user: e } = (0, H.useAuth)();
          return (0, a.jsxs)('div', {
            className: 'space-y-6',
            children: [
              (0, a.jsxs)('div', {
                children: [
                  (0, a.jsx)('h2', {
                    className: 'text-2xl font-semibold tracking-tight',
                    children: 'Settings',
                  }),
                  (0, a.jsx)('p', {
                    className: 'text-sm text-muted-foreground',
                    children: 'Pengaturan akun dan gateway',
                  }),
                ],
              }),
              (0, a.jsxs)(N, {
                defaultValue: 'profile',
                children: [
                  (0, a.jsxs)(D, {
                    children: [
                      (0, a.jsx)(F, { value: 'profile', children: 'Profile' }),
                      (0, a.jsx)(F, { value: 'security', children: 'Security' }),
                      (0, a.jsx)(F, { value: 'general', children: 'General' }),
                    ],
                  }),
                  (0, a.jsx)(S, {
                    value: 'profile',
                    className: 'space-y-4',
                    children: (0, a.jsxs)(r.Card, {
                      children: [
                        (0, a.jsxs)(r.CardHeader, {
                          children: [
                            (0, a.jsx)(r.CardTitle, { children: 'Profile' }),
                            (0, a.jsx)(r.CardDescription, { children: 'Informasi akun Anda' }),
                          ],
                        }),
                        (0, a.jsxs)(r.CardContent, {
                          className: 'space-y-4 max-w-md',
                          children: [
                            (0, a.jsxs)('div', {
                              className: 'space-y-2',
                              children: [
                                (0, a.jsx)(t.Label, { children: 'Email' }),
                                (0, a.jsx)(i.Input, { value: e?.email ?? '', readOnly: !0 }),
                              ],
                            }),
                            (0, a.jsxs)('div', {
                              className: 'space-y-2',
                              children: [
                                (0, a.jsx)(t.Label, { children: 'Role' }),
                                (0, a.jsx)(i.Input, { value: e?.roles?.[0] ?? '', readOnly: !0 }),
                              ],
                            }),
                            (0, a.jsxs)('div', {
                              className: 'space-y-2',
                              children: [
                                (0, a.jsx)(t.Label, { children: 'Tenant' }),
                                (0, a.jsx)(i.Input, { value: e?.tenantId ?? '', readOnly: !0 }),
                              ],
                            }),
                            (0, a.jsx)(n.Button, { children: 'Save Changes' }),
                          ],
                        }),
                      ],
                    }),
                  }),
                  (0, a.jsx)(S, {
                    value: 'security',
                    children: (0, a.jsxs)(r.Card, {
                      children: [
                        (0, a.jsxs)(r.CardHeader, {
                          children: [
                            (0, a.jsx)(r.CardTitle, { children: 'Security' }),
                            (0, a.jsx)(r.CardDescription, { children: 'Password dan 2FA' }),
                          ],
                        }),
                        (0, a.jsx)(r.CardContent, {
                          children: (0, a.jsx)('p', {
                            className: 'text-sm text-muted-foreground',
                            children: 'Fitur ini akan tersedia setelah backend siap.',
                          }),
                        }),
                      ],
                    }),
                  }),
                  (0, a.jsx)(S, {
                    value: 'general',
                    children: (0, a.jsxs)(r.Card, {
                      children: [
                        (0, a.jsxs)(r.CardHeader, {
                          children: [
                            (0, a.jsx)(r.CardTitle, { children: 'General' }),
                            (0, a.jsx)(r.CardDescription, { children: 'Konfigurasi gateway' }),
                          ],
                        }),
                        (0, a.jsx)(r.CardContent, {
                          children: (0, a.jsx)('p', {
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
      31823,
    );
  },
  54815,
  (e) => {
    'use strict';
    var a = e.i(24830),
      r = e.i(39380),
      i = e.i(59992);
    let t = r.forwardRef(({ className: e, ...r }, t) =>
      (0, a.jsx)('div', {
        ref: t,
        className: (0, i.cn)(
          'rounded-[8px] border border-border bg-background text-foreground shadow-sm',
          e,
        ),
        ...r,
      }),
    );
    t.displayName = 'Card';
    let n = r.forwardRef(({ className: e, ...r }, t) =>
      (0, a.jsx)('div', { ref: t, className: (0, i.cn)('flex flex-col space-y-2 p-6', e), ...r }),
    );
    n.displayName = 'CardHeader';
    let s = r.forwardRef(({ className: e, ...r }, t) =>
      (0, a.jsx)('h3', {
        ref: t,
        className: (0, i.cn)('font-semibold leading-none tracking-tight', e),
        ...r,
      }),
    );
    s.displayName = 'CardTitle';
    let d = r.forwardRef(({ className: e, ...r }, t) =>
      (0, a.jsx)('p', { ref: t, className: (0, i.cn)('text-sm text-muted-foreground', e), ...r }),
    );
    d.displayName = 'CardDescription';
    let l = r.forwardRef(({ className: e, ...r }, t) =>
      (0, a.jsx)('div', { ref: t, className: (0, i.cn)('p-6 pt-0', e), ...r }),
    );
    ((l.displayName = 'CardContent'),
      (r.forwardRef(({ className: e, ...r }, t) =>
        (0, a.jsx)('div', { ref: t, className: (0, i.cn)('flex items-center p-6 pt-0', e), ...r }),
      ).displayName = 'CardFooter'),
      e.s([
        'Card',
        0,
        t,
        'CardContent',
        0,
        l,
        'CardDescription',
        0,
        d,
        'CardHeader',
        0,
        n,
        'CardTitle',
        0,
        s,
      ]));
  },
  2863,
  (e) => {
    'use strict';
    var a = e.i(24830),
      r = e.i(39380),
      i = e.i(59992);
    let t = r.forwardRef(({ className: e, type: r, ...t }, n) =>
      (0, a.jsx)('input', {
        type: r,
        className: (0, i.cn)(
          'flex h-9 w-full rounded-[4px] border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive',
          e,
        ),
        ref: n,
        ...t,
      }),
    );
    ((t.displayName = 'Input'), e.s(['Input', 0, t]));
  },
  50123,
  (e) => {
    'use strict';
    var a = e.i(24830),
      r = e.i(39380),
      i = e.i(78238),
      t = Object.defineProperty,
      n = r.forwardRef(
        t(
          function (e, r) {
            return (0, a.jsx)(i.Primitive.label, {
              ...e,
              ref: r,
              onMouseDown: (a) => {
                a.target.closest('button, input, select, textarea') ||
                  (e.onMouseDown?.(a), !a.defaultPrevented && a.detail > 1 && a.preventDefault());
              },
            });
          },
          'name',
          { value: 'Label', configurable: !0 },
        ),
      ),
      s = e.i(94237),
      d = e.i(59992);
    let l = (0, s.cva)(
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      ),
      o = r.forwardRef(({ className: e, ...r }, i) =>
        (0, a.jsx)(n, { ref: i, className: (0, d.cn)(l(), e), ...r }),
      );
    ((o.displayName = n.displayName), e.s(['Label', 0, o], 50123));
  },
]);
