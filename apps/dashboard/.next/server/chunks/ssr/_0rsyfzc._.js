module.exports = [
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
  20434,
  (a) => {
    'use strict';
    let b;
    var c = a.i(48326);
    let d = (a) => {
        let b,
          c = new Set(),
          d = (a, d) => {
            let e = 'function' == typeof a ? a(b) : a;
            if (!Object.is(e, b)) {
              let a = b;
              ((b = (null != d ? d : 'object' != typeof e || null === e)
                ? e
                : Object.assign({}, b, e)),
                c.forEach((c) => c(b, a)));
            }
          },
          e = () => b,
          f = {
            setState: d,
            getState: e,
            getInitialState: () => g,
            subscribe: (a) => (c.add(a), () => c.delete(a)),
          },
          g = (b = a(d, e, f));
        return f;
      },
      e = (a) => {
        let b = a ? d(a) : d,
          e = (a) =>
            (function (a, b = (a) => a) {
              let d = c.default.useSyncExternalStore(
                a.subscribe,
                c.default.useCallback(() => b(a.getState()), [a, b]),
                c.default.useCallback(() => b(a.getInitialState()), [a, b]),
              );
              return (c.default.useDebugValue(d), d);
            })(b, a);
        return (Object.assign(e, b), e);
      };
    var f = a.i(12670);
    let g = f.z.object({
      userId: f.z.string().min(1).max(128),
      tenantId: f.z.string().min(1).max(128),
      roles: f.z.array(f.z.string().min(1).max(64)).min(1).max(20),
      email: f.z.string().max(254),
    });
    async function h() {
      let a = await fetch('/api/auth/session', { credentials: 'same-origin', cache: 'no-store' });
      if (!a.ok) return null;
      let b = await a.json(),
        c = f.z.object({ user: g }).safeParse(b);
      return c.success ? c.data.user : null;
    }
    let i = (b = (a, b) => ({
      user: null,
      status: 'checking',
      hasRole: (a) => b().user?.roles.includes(a) === !0,
      hydrate: async () => {
        try {
          let b = await h();
          a({ user: b, status: b ? 'authenticated' : 'anonymous' });
        } catch {
          a({ user: null, status: 'anonymous' });
        }
      },
      login: (b) => a({ user: b, status: 'authenticated' }),
      logout: async () => {
        try {
          await fetch('/api/auth/logout', {
            method: 'POST',
            credentials: 'same-origin',
            cache: 'no-store',
          });
        } finally {
          a({ user: null, status: 'anonymous' });
        }
      },
    }))
      ? e(b)
      : e;
    a.s(['useAuth', 0, i], 20434);
  },
  78585,
  (a) => {
    'use strict';
    let b = (0, a.i(10641).default)('CircleAlert', [
      ['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
      ['line', { x1: '12', x2: '12', y1: '8', y2: '12', key: '1pkeuh' }],
      ['line', { x1: '12', x2: '12.01', y1: '16', y2: '16', key: '4dfq90' }],
    ]);
    a.s(['AlertCircle', 0, b], 78585);
  },
];

//# sourceMappingURL=_0rsyfzc._.js.map
