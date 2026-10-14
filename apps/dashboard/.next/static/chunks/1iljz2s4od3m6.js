(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  'object' == typeof document ? document.currentScript : void 0,
  82134,
  (e) => {
    'use strict';
    var t = e.i(24830),
      r = e.i(36023),
      n = e.i(13829);
    e.s([
      'default',
      0,
      function ({ error: e, reset: l }) {
        let a = e.digest ?? 'Digest tidak tersedia';
        return (0, t.jsx)('html', {
          lang: 'id',
          children: (0, t.jsx)('body', {
            className: 'flex min-h-screen items-center justify-center bg-white p-6 text-slate-950',
            children: (0, t.jsxs)('main', {
              className:
                'w-full max-w-lg rounded-xl border border-slate-200 p-8 text-center shadow-sm',
              role: 'alert',
              children: [
                (0, t.jsx)('h1', {
                  className: 'text-xl font-semibold',
                  children: 'Terjadi kesalahan aplikasi',
                }),
                (0, t.jsx)('p', {
                  className: 'mt-2 text-sm text-slate-600',
                  children:
                    'Dashboard tidak dapat dilanjutkan. Coba lagi atau hubungi administrator.',
                }),
                (0, t.jsxs)('div', {
                  className:
                    'mt-4 flex items-center justify-between gap-3 rounded-md bg-slate-100 p-3 text-left',
                  children: [
                    (0, t.jsxs)('p', {
                      className: 'min-w-0 truncate font-mono text-xs text-slate-600',
                      children: ['Ref: ', a],
                    }),
                    (0, t.jsx)(n.CopyButton, { value: a, label: 'Salin referensi' }),
                  ],
                }),
                (0, t.jsx)(r.Button, { className: 'mt-6', onClick: l, children: 'Coba lagi' }),
              ],
            }),
          }),
        });
      },
    ]);
  },
  13829,
  (e) => {
    'use strict';
    var t = e.i(24830),
      r = e.i(39380),
      n = e.i(86304);
    let l = (0, e.i(32155).default)('Copy', [
      ['rect', { width: '14', height: '14', x: '8', y: '8', rx: '2', ry: '2', key: '17jyea' }],
      ['path', { d: 'M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2', key: 'zix9uf' }],
    ]);
    var a = e.i(36023);
    e.s(
      [
        'CopyButton',
        0,
        function ({ value: e, label: o = 'Salin' }) {
          let [u, i] = (0, r.useState)(!1);
          (0, r.useEffect)(() => {
            if (!u) return;
            let e = window.setTimeout(() => i(!1), 2e3);
            return () => window.clearTimeout(e);
          }, [u]);
          let s = (0, r.useCallback)(async () => {
            navigator.clipboard && (await navigator.clipboard.writeText(e), i(!0));
          }, [e]);
          return (0, t.jsxs)(a.Button, {
            type: 'button',
            variant: 'outline',
            size: 'sm',
            onClick: () => void s(),
            'aria-label': u ? 'Disalin' : o,
            children: [
              u
                ? (0, t.jsx)(n.Check, { className: 'h-4 w-4', 'aria-hidden': 'true' })
                : (0, t.jsx)(l, { className: 'h-4 w-4', 'aria-hidden': 'true' }),
              u ? 'Disalin' : o,
            ],
          });
        },
      ],
      13829,
    );
  },
  36023,
  66100,
  17739,
  (e) => {
    'use strict';
    var t = e.i(24830),
      r = e.i(39380),
      n = Object.defineProperty,
      l = (e, t) => n(e, 'name', { value: t, configurable: !0 });
    function a(e, t) {
      if ('function' == typeof e) return e(t);
      null != e && (e.current = t);
    }
    function o(...e) {
      return (t) => {
        let r = !1,
          n = e.map((e) => {
            let n = a(e, t);
            return (r || 'function' != typeof n || (r = !0), n);
          });
        if (r)
          return () => {
            for (let t = 0; t < n.length; t++) {
              let r = n[t];
              'function' == typeof r ? r() : a(e[t], null);
            }
          };
      };
    }
    function u(...e) {
      return r.useCallback(o(...e), e);
    }
    (l(a, 'setRef'),
      l(o, 'composeRefs'),
      l(u, 'useComposedRefs'),
      e.s(['useComposedRefs', 0, u], 66100));
    var i = Object.defineProperty,
      s = (e, t) => i(e, 'name', { value: t, configurable: !0 });
    function d(e) {
      let t = r.forwardRef((t, n) => {
        let { children: l, ...a } = t,
          o = null,
          i = !1,
          s = [];
        (v(l) && 'function' == typeof _ && (l = _(l._payload)),
          r.Children.forEach(l, (e) => {
            if (b(e)) {
              i = !0;
              let t = 'child' in e.props ? e.props.child : e.props.children;
              (v(t) && 'function' == typeof _ && (t = _(t._payload)),
                (o = p(e, t)),
                s.push(o?.props?.children));
            } else s.push(e);
          }),
          o
            ? (o = r.cloneElement(o, void 0, s))
            : !i && 1 === r.Children.count(l) && r.isValidElement(l) && (o = l));
        let d = o ? h(o) : void 0,
          c = u(n, d);
        if (!o) {
          if (l || 0 === l) throw Error(i ? j(e) : x(e));
          return l;
        }
        let f = m(a, o.props ?? {});
        return (o.type !== r.Fragment && (f.ref = n ? c : d), r.cloneElement(o, f));
      });
      return ((t.displayName = `${e}.Slot`), t);
    }
    s(d, 'createSlot');
    var c = d('Slot'),
      f = Symbol.for('radix.slottable');
    s(function (e) {
      let t = s((e) => ('child' in e ? e.children(e.child) : e.children), 'Slottable');
      return ((t.displayName = `${e}.Slottable`), (t.__radixId = f), t);
    }, 'createSlottable');
    var p = s((e, t) => {
      if ('child' in e.props) {
        let t = e.props.child;
        return r.isValidElement(t)
          ? r.cloneElement(t, void 0, e.props.children(t.props.children))
          : null;
      }
      return r.isValidElement(t) ? t : null;
    }, 'getSlottableElementFromSlottable');
    function m(e, t) {
      let r = { ...t };
      for (let n in t) {
        let l = e[n],
          a = t[n];
        /^on[A-Z]/.test(n)
          ? l && a
            ? (r[n] = (...e) => {
                let t = a(...e);
                return (l(...e), t);
              })
            : l && (r[n] = l)
          : 'style' === n
            ? (r[n] = { ...l, ...a })
            : 'className' === n && (r[n] = [l, a].filter(Boolean).join(' '));
      }
      return { ...e, ...r };
    }
    function h(e) {
      let t = Object.getOwnPropertyDescriptor(e.props, 'ref')?.get,
        r = t && 'isReactWarning' in t && t.isReactWarning;
      return r
        ? e.ref
        : (r =
              (t = Object.getOwnPropertyDescriptor(e, 'ref')?.get) &&
              'isReactWarning' in t &&
              t.isReactWarning)
          ? e.props.ref
          : e.props.ref || e.ref;
    }
    function b(e) {
      return (
        r.isValidElement(e) &&
        'function' == typeof e.type &&
        '__radixId' in e.type &&
        e.type.__radixId === f
      );
    }
    (s(m, 'mergeProps'), s(h, 'getElementRef'), s(b, 'isSlottable'));
    var y = Symbol.for('react.lazy');
    function v(e) {
      return (
        null != e &&
        'object' == typeof e &&
        '$$typeof' in e &&
        e.$$typeof === y &&
        '_payload' in e &&
        g(e._payload)
      );
    }
    function g(e) {
      return 'object' == typeof e && null !== e && 'then' in e;
    }
    (s(v, 'isLazyComponent'), s(g, 'isPromiseLike'));
    var x = s(
        (e) =>
          `${e} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`,
        'createSlotError',
      ),
      j = s(
        (e) =>
          `${e} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`,
        'createSlottableError',
      ),
      _ = r[' use '.trim().toString()];
    e.s(['Slot', 0, c, 'createSlot', 0, d], 17739);
    var P = e.i(94237),
      O = e.i(59992);
    let C = (0, P.cva)(
        'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[4px] text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50',
        {
          variants: {
            variant: {
              default: 'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90',
              destructive:
                'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
              outline:
                'border border-border bg-background text-foreground shadow-sm hover:bg-muted hover:text-foreground',
              secondary: 'bg-muted text-foreground shadow-sm hover:bg-muted/80',
              ghost: 'text-foreground hover:bg-muted hover:text-foreground',
              link: 'text-primary underline-offset-4 hover:underline',
            },
            size: {
              default: 'h-9 px-4 py-2',
              sm: 'h-8 px-3 text-xs',
              lg: 'h-10 px-8',
              icon: 'h-9 w-9',
            },
          },
          defaultVariants: { variant: 'default', size: 'default' },
        },
      ),
      R = r.forwardRef(({ className: e, variant: r, size: n, asChild: l = !1, ...a }, o) =>
        (0, t.jsx)(l ? c : 'button', {
          className: (0, O.cn)(C({ variant: r, size: n, className: e })),
          ref: o,
          ...a,
        }),
      );
    ((R.displayName = 'Button'), e.s(['Button', 0, R], 36023));
  },
  94237,
  (e) => {
    'use strict';
    var t = e.i(7284);
    let r = (e) => ('boolean' == typeof e ? `${e}` : 0 === e ? '0' : e),
      n = t.clsx;
    e.s([
      'cva',
      0,
      (e, t) => (l) => {
        var a;
        if ((null == t ? void 0 : t.variants) == null)
          return n(e, null == l ? void 0 : l.class, null == l ? void 0 : l.className);
        let { variants: o, defaultVariants: u } = t,
          i = Object.keys(o).map((e) => {
            let t = null == l ? void 0 : l[e],
              n = null == u ? void 0 : u[e];
            if (null === t) return null;
            let a = r(t) || r(n);
            return o[e][a];
          }),
          s =
            l &&
            Object.entries(l).reduce((e, t) => {
              let [r, n] = t;
              return (void 0 === n || (e[r] = n), e);
            }, {});
        return n(
          e,
          i,
          null == t || null == (a = t.compoundVariants)
            ? void 0
            : a.reduce((e, t) => {
                let { class: r, className: n, ...l } = t;
                return Object.entries(l).every((e) => {
                  let [t, r] = e;
                  return Array.isArray(r) ? r.includes({ ...u, ...s }[t]) : { ...u, ...s }[t] === r;
                })
                  ? [...e, r, n]
                  : e;
              }, []),
          null == l ? void 0 : l.class,
          null == l ? void 0 : l.className,
        );
      },
    ]);
  },
  32155,
  (e) => {
    'use strict';
    var t = e.i(39380);
    let r = (...e) =>
      e
        .filter((e, t, r) => !!e && '' !== e.trim() && r.indexOf(e) === t)
        .join(' ')
        .trim();
    var n = {
      xmlns: 'http://www.w3.org/2000/svg',
      width: 24,
      height: 24,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
    };
    let l = (0, t.forwardRef)(
      (
        {
          color: e = 'currentColor',
          size: l = 24,
          strokeWidth: a = 2,
          absoluteStrokeWidth: o,
          className: u = '',
          children: i,
          iconNode: s,
          ...d
        },
        c,
      ) =>
        (0, t.createElement)(
          'svg',
          {
            ref: c,
            ...n,
            width: l,
            height: l,
            stroke: e,
            strokeWidth: o ? (24 * Number(a)) / Number(l) : a,
            className: r('lucide', u),
            ...d,
          },
          [...s.map(([e, r]) => (0, t.createElement)(e, r)), ...(Array.isArray(i) ? i : [i])],
        ),
    );
    e.s(
      [
        'default',
        0,
        (e, n) => {
          let a = (0, t.forwardRef)(({ className: a, ...o }, u) =>
            (0, t.createElement)(l, {
              ref: u,
              iconNode: n,
              className: r(`lucide-${e.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()}`, a),
              ...o,
            }),
          );
          return ((a.displayName = `${e}`), a);
        },
      ],
      32155,
    );
  },
  86304,
  (e) => {
    'use strict';
    let t = (0, e.i(32155).default)('Check', [['path', { d: 'M20 6 9 17l-5-5', key: '1gmf2c' }]]);
    e.s(['Check', 0, t], 86304);
  },
  41202,
  (e, t, r) => {
    'use strict';
    (e.i(70925),
      Object.defineProperty(r, '__esModule', { value: !0 }),
      Object.defineProperty(r, 'useRouterBFCache', {
        enumerable: !0,
        get: function () {
          return l;
        },
      }));
    let n = e.r(39380);
    function l(e, t, r) {
      let [l, a] = (0, n.useState)(() => ({ tree: e, cacheNode: t, stateKey: r, next: null }));
      if (l.tree === e) return l;
      let o = { tree: e, cacheNode: t, stateKey: r, next: null },
        u = 1,
        i = l,
        s = o;
      for (; null !== i && u < 1;) {
        if (i.stateKey === r) {
          s.next = i.next;
          break;
        }
        {
          u++;
          let e = { tree: i.tree, cacheNode: i.cacheNode, stateKey: i.stateKey, next: null };
          ((s.next = e), (s = e));
        }
        i = i.next;
      }
      return (a(o), o);
    }
    ('function' == typeof r.default || ('object' == typeof r.default && null !== r.default)) &&
      void 0 === r.default.__esModule &&
      (Object.defineProperty(r.default, '__esModule', { value: !0 }),
      Object.assign(r.default, r),
      (t.exports = r.default));
  },
  77277,
  (e, t, r) => {
    'use strict';
    (Object.defineProperty(r, '__esModule', { value: !0 }),
      Object.defineProperty(r, 'ClientPageRoot', {
        enumerable: !0,
        get: function () {
          return s;
        },
      }));
    let n = e.r(24830),
      l = e.r(67567),
      a = e.r(39380),
      o = e.r(61572),
      u = e.r(29181),
      i = e.r(46231);
    function s({ Component: e, serverProvidedParams: t }) {
      let r, d;
      if (null !== t) ((r = t.searchParams), (d = t.params));
      else {
        let e = (0, a.use)(l.LayoutRouterContext);
        ((d = null !== e ? e.parentParams : {}),
          (r = (0, o.urlSearchParamsToParsedUrlQuery)((0, a.use)(u.SearchParamsContext))));
      }
      let c = (0, i.createClientSearchParams)(r),
        f = (0, i.createClientParams)(d);
      return (0, n.jsx)(e, { params: f, searchParams: c });
    }
    ('function' == typeof r.default || ('object' == typeof r.default && null !== r.default)) &&
      void 0 === r.default.__esModule &&
      (Object.defineProperty(r.default, '__esModule', { value: !0 }),
      Object.assign(r.default, r),
      (t.exports = r.default));
  },
  86648,
  (e, t, r) => {
    'use strict';
    (Object.defineProperty(r, '__esModule', { value: !0 }),
      Object.defineProperty(r, 'ClientSegmentRoot', {
        enumerable: !0,
        get: function () {
          return u;
        },
      }));
    let n = e.r(24830),
      l = e.r(67567),
      a = e.r(39380),
      o = e.r(46231);
    function u({ Component: e, slots: t, serverProvidedParams: r }) {
      let i;
      if (null !== r) i = r.params;
      else {
        let e = (0, a.use)(l.LayoutRouterContext);
        i = null !== e ? e.parentParams : {};
      }
      let s = (0, o.createClientParams)(i);
      return (0, n.jsx)(e, { ...t, params: s });
    }
    ('function' == typeof r.default || ('object' == typeof r.default && null !== r.default)) &&
      void 0 === r.default.__esModule &&
      (Object.defineProperty(r.default, '__esModule', { value: !0 }),
      Object.assign(r.default, r),
      (t.exports = r.default));
  },
  44810,
  (e, t, r) => {
    'use strict';
    (e.i(70925),
      Object.defineProperty(r, '__esModule', { value: !0 }),
      Object.defineProperty(r, 'HTTPAccessFallbackBoundary', {
        enumerable: !0,
        get: function () {
          return d;
        },
      }));
    let n = e.r(56421),
      l = e.r(24830),
      a = n._(e.r(39380)),
      o = e.r(71895),
      u = e.r(85475),
      i = e.r(67567);
    class s extends a.default.Component {
      constructor(e) {
        (super(e), (this.state = { triggeredStatus: void 0, previousPathname: e.pathname }));
      }
      componentDidCatch() {}
      static getDerivedStateFromError(e) {
        if ((0, u.isHTTPAccessFallbackError)(e))
          return { triggeredStatus: (0, u.getAccessFallbackHTTPStatus)(e) };
        throw e;
      }
      static getDerivedStateFromProps(e, t) {
        return e.pathname !== t.previousPathname && t.triggeredStatus
          ? { triggeredStatus: void 0, previousPathname: e.pathname }
          : { triggeredStatus: t.triggeredStatus, previousPathname: e.pathname };
      }
      render() {
        let { notFound: e, forbidden: t, unauthorized: r, children: n } = this.props,
          { triggeredStatus: a } = this.state,
          o = {
            [u.HTTPAccessErrorStatus.NOT_FOUND]: e,
            [u.HTTPAccessErrorStatus.FORBIDDEN]: t,
            [u.HTTPAccessErrorStatus.UNAUTHORIZED]: r,
          };
        if (a) {
          let i = a === u.HTTPAccessErrorStatus.NOT_FOUND && e,
            s = a === u.HTTPAccessErrorStatus.FORBIDDEN && t,
            d = a === u.HTTPAccessErrorStatus.UNAUTHORIZED && r;
          return i || s || d
            ? (0, l.jsxs)(l.Fragment, {
                children: [(0, l.jsx)('meta', { name: 'robots', content: 'noindex' }), !1, o[a]],
              })
            : n;
        }
        return n;
      }
    }
    function d({ notFound: e, forbidden: t, unauthorized: r, children: n }) {
      let u = (0, o.useUntrackedPathname)(),
        c = (0, a.useContext)(i.MissingSlotContext);
      return e || t || r
        ? (0, l.jsx)(s, {
            pathname: u,
            notFound: e,
            forbidden: t,
            unauthorized: r,
            missingSlots: c,
            children: n,
          })
        : (0, l.jsx)(l.Fragment, { children: n });
    }
    ('function' == typeof r.default || ('object' == typeof r.default && null !== r.default)) &&
      void 0 === r.default.__esModule &&
      (Object.defineProperty(r.default, '__esModule', { value: !0 }),
      Object.assign(r.default, r),
      (t.exports = r.default));
  },
  43475,
  (e, t, r) => {
    'use strict';
    Object.defineProperty(r, '__esModule', { value: !0 });
    var n = {
      InstantValidationBoundaryContext: function () {
        return a;
      },
      PlaceValidationBoundaryBelowThisLevel: function () {
        return o;
      },
      RenderValidationBoundaryAtThisLevel: function () {
        return u;
      },
      SlotMarker: function () {
        return i;
      },
    };
    for (var l in n) Object.defineProperty(r, l, { enumerable: !0, get: n[l] });
    let a = null,
      o = null,
      u = null,
      i = null;
    ('function' == typeof r.default || ('object' == typeof r.default && null !== r.default)) &&
      void 0 === r.default.__esModule &&
      (Object.defineProperty(r.default, '__esModule', { value: !0 }),
      Object.assign(r.default, r),
      (t.exports = r.default));
  },
  94623,
  (e, t, r) => {
    'use strict';
    Object.defineProperty(r, '__esModule', { value: !0 });
    var n = {
      InstantValidationBoundaryContext: function () {
        return a.InstantValidationBoundaryContext;
      },
      PlaceValidationBoundaryBelowThisLevel: function () {
        return a.PlaceValidationBoundaryBelowThisLevel;
      },
      RenderValidationBoundaryAtThisLevel: function () {
        return a.RenderValidationBoundaryAtThisLevel;
      },
      SlotMarker: function () {
        return a.SlotMarker;
      },
    };
    for (var l in n) Object.defineProperty(r, l, { enumerable: !0, get: n[l] });
    let a = e.r(43475);
    ('function' == typeof r.default || ('object' == typeof r.default && null !== r.default)) &&
      void 0 === r.default.__esModule &&
      (Object.defineProperty(r.default, '__esModule', { value: !0 }),
      Object.assign(r.default, r),
      (t.exports = r.default));
  },
  44288,
  (e, t, r) => {
    'use strict';
    (e.i(70925), Object.defineProperty(r, '__esModule', { value: !0 }));
    var n = {
      LoadingBoundaryProvider: function () {
        return C;
      },
      default: function () {
        return S;
      },
    };
    for (var l in n) Object.defineProperty(r, l, { enumerable: !0, get: n[l] });
    let a = e.r(36437),
      o = e.r(56421),
      u = e.r(24830),
      i = o._(e.r(39380)),
      s = a._(e.r(60429)),
      d = e.r(67567),
      c = e.r(57389),
      f = e.r(10204),
      p = e.r(91384),
      m = e.r(70643),
      h = e.r(44810);
    e.r(94623);
    let b = e.r(63957),
      y = e.r(41202);
    e.r(77877);
    let v = e.r(29181),
      g = e.r(61572),
      x = e.r(84712);
    s.default.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    function j(e, t, r) {
      let n = e.getClientRects();
      if (0 === n.length) return 0;
      let l = 1 / 0;
      for (let e = 0; e < n.length; e++) {
        let t = n[e];
        t.top < l && (l = t.top);
      }
      return l >= r() && l <= t ? 1 : 2;
    }
    i.default.Component;
    let _ = function (e) {
      let t = i.default.useRef(null);
      return (
        (0, i.useLayoutEffect)(
          () => {
            let { focusAndScrollRef: r, cacheNode: n } = e,
              l = r.forceScroll ? r.scrollRef : n.scrollRef;
            if (null === l || !l.current) return;
            let a = null,
              o = r.hashFragment;
            if (o) {
              var u;
              if (
                null ===
                (a =
                  'top' === (u = o)
                    ? document.body
                    : (document.getElementById(u) ?? document.getElementsByName(u)[0] ?? null))
              ) {
                ((l.current = !1), (r.onlyHashChange = !1), (r.hashFragment = null));
                return;
              }
            } else a = t.current;
            if (null === a) return;
            let i = !1;
            ((0, p.disableSmoothScrollDuringRouteTransition)(
              () => {
                let e = document.documentElement,
                  t = null,
                  r = null,
                  n = null,
                  u = () => {
                    var r, l;
                    let a, o;
                    return (
                      null === n &&
                        ((r = e),
                        (l = t),
                        (n =
                          !Number.isFinite(
                            (o = Number.parseFloat((a = getComputedStyle(r).scrollPaddingTop))),
                          ) || o < 0
                            ? 0
                            : a.endsWith('px')
                              ? o
                              : a.endsWith('%')
                                ? (o / 100) * l
                                : 0)),
                      n
                    );
                  };
                (o || ((t = e.clientHeight), 0 !== (r = j(a, t, u)))) &&
                  (((i = !0), (l.current = !1), o)
                    ? a.scrollIntoView()
                    : 1 !== r && ((e.scrollTop = 0), 2 === j(a, t, u) && a.scrollIntoView()));
              },
              { dontForceLayout: !0, onlyHashChange: r.onlyHashChange },
            ),
              i && ((r.onlyHashChange = !1), (r.hashFragment = null)));
          },
          void 0,
        ),
        (0, u.jsx)(i.Fragment, { ref: t, children: e.children })
      );
    };
    function P({ children: e, cacheNode: t }) {
      let r = (0, i.useContext)(d.GlobalLayoutRouterContext);
      if (!r)
        throw Object.defineProperty(
          Error('invariant global layout router not mounted'),
          '__NEXT_ERROR_CODE',
          { value: 'E473', enumerable: !1, configurable: !0 },
        );
      return (0, u.jsx)(_, { focusAndScrollRef: r.focusAndScrollRef, cacheNode: t, children: e });
    }
    function O({
      tree: e,
      segmentPath: t,
      debugNameContext: r,
      cacheNode: n,
      params: l,
      url: a,
      isActive: o,
    }) {
      let s,
        f = (0, i.useContext)(d.GlobalLayoutRouterContext);
      if (((0, i.useContext)(v.NavigationPromisesContext), !f))
        throw Object.defineProperty(
          Error('invariant global layout router not mounted'),
          '__NEXT_ERROR_CODE',
          { value: 'E473', enumerable: !1, configurable: !0 },
        );
      let p = null !== n ? n : (0, i.use)(c.unresolvedThenable),
        m = null !== p.prefetchRsc ? p.prefetchRsc : p.rsc,
        h = (0, i.useDeferredValue)(p.rsc, m);
      if ((0, x.isDeferredRsc)(h)) {
        let e = (0, i.use)(h);
        (null === e && (0, i.use)(c.unresolvedThenable), (s = e));
      } else (null === h && (0, i.use)(c.unresolvedThenable), (s = h));
      let b = s;
      return (0, u.jsx)(d.LayoutRouterContext.Provider, {
        value: {
          parentTree: e,
          parentCacheNode: p,
          parentSegmentPath: t,
          parentParams: l,
          parentLoadingData: null,
          debugNameContext: r,
          url: a,
          isActive: o,
        },
        children: b,
      });
    }
    function C({ loading: e, children: t }) {
      let r = (0, i.use)(d.LayoutRouterContext);
      return null === r
        ? t
        : (0, u.jsx)(d.LayoutRouterContext.Provider, {
            value: {
              parentTree: r.parentTree,
              parentCacheNode: r.parentCacheNode,
              parentSegmentPath: r.parentSegmentPath,
              parentParams: r.parentParams,
              parentLoadingData: e,
              debugNameContext: r.debugNameContext,
              url: r.url,
              isActive: r.isActive,
            },
            children: t,
          });
    }
    function R({ name: e, loading: t, children: r }) {
      if (null !== t) {
        let n = t[0],
          l = t[1],
          a = t[2];
        return (0, u.jsx)(i.Suspense, {
          name: e,
          fallback: (0, u.jsxs)(u.Fragment, { children: [l, a, n] }),
          children: r,
        });
      }
      return (0, u.jsx)(u.Fragment, { children: r });
    }
    function S({
      parallelRouterKey: e,
      error: t,
      errorStyles: r,
      errorScripts: n,
      templateStyles: l,
      templateScripts: a,
      template: o,
      notFound: s,
      forbidden: p,
      unauthorized: v,
      segmentViewBoundaries: x,
    }) {
      let j = (0, i.useContext)(d.LayoutRouterContext);
      if (!j)
        throw Object.defineProperty(
          Error('invariant expected layout router to be mounted'),
          '__NEXT_ERROR_CODE',
          { value: 'E56', enumerable: !1, configurable: !0 },
        );
      let {
          parentTree: _,
          parentCacheNode: C,
          parentSegmentPath: T,
          parentParams: N,
          parentLoadingData: E,
          url: w,
          isActive: M,
          debugNameContext: k,
        } = j,
        F = _[0],
        B = null === T ? [e] : T.concat([F, e]),
        A = _[1][e],
        D = C.slots;
      (void 0 === A || null === D) && (0, i.use)(c.unresolvedThenable);
      let L = A[0],
        V = D[e] ?? null,
        H = (0, b.createRouterCacheKey)(L, !0),
        I = (0, y.useRouterBFCache)(A, V, H),
        U = [];
      do {
        let e = I.tree,
          i = I.cacheNode,
          c = I.stateKey,
          b = e[0],
          y = N;
        if (Array.isArray(b)) {
          let e = b[0],
            t = b[1],
            r = b[2],
            n = (0, g.getParamValueFromCacheKey)(t, r);
          null !== n && (y = { ...N, [e]: n });
        }
        let x = (function (e) {
            if ('/' === e) return '/';
            if ('string' == typeof e)
              if ('(__SLOT__)' === e) return;
              else return e + '/';
            return e[1] + '/';
          })(b),
          j = x ?? k,
          _ = void 0 === x ? void 0 : k,
          C = (0, u.jsxs)(P, {
            cacheNode: i,
            children: [
              (0, u.jsx)(f.ErrorBoundary, {
                errorComponent: t,
                errorStyles: r,
                errorScripts: n,
                children: (0, u.jsx)(R, {
                  name: _,
                  loading: E,
                  children: (0, u.jsx)(h.HTTPAccessFallbackBoundary, {
                    notFound: s,
                    forbidden: p,
                    unauthorized: v,
                    children: (0, u.jsxs)(m.RedirectBoundary, {
                      children: [
                        (0, u.jsx)(O, {
                          url: w,
                          tree: e,
                          params: y,
                          cacheNode: i,
                          segmentPath: B,
                          debugNameContext: j,
                          isActive: M && c === H,
                        }),
                        null,
                      ],
                    }),
                  }),
                }),
              }),
              null,
            ],
          }),
          S = (0, u.jsxs)(d.TemplateContext.Provider, { value: C, children: [l, a, o] }, c);
        (U.push(S), (I = I.next));
      } while (null !== I);
      return U;
    }
    ('function' == typeof r.default || ('object' == typeof r.default && null !== r.default)) &&
      void 0 === r.default.__esModule &&
      (Object.defineProperty(r.default, '__esModule', { value: !0 }),
      Object.assign(r.default, r),
      (t.exports = r.default));
  },
  11297,
  (e, t, r) => {
    'use strict';
    (Object.defineProperty(r, '__esModule', { value: !0 }),
      Object.defineProperty(r, 'default', {
        enumerable: !0,
        get: function () {
          return u;
        },
      }));
    let n = e.r(56421),
      l = e.r(24830),
      a = n._(e.r(39380)),
      o = e.r(67567);
    function u() {
      let e = (0, a.useContext)(o.TemplateContext);
      return (0, l.jsx)(l.Fragment, { children: e });
    }
    ('function' == typeof r.default || ('object' == typeof r.default && null !== r.default)) &&
      void 0 === r.default.__esModule &&
      (Object.defineProperty(r.default, '__esModule', { value: !0 }),
      Object.assign(r.default, r),
      (t.exports = r.default));
  },
  86438,
  (e, t, r) => {
    'use strict';
    (Object.defineProperty(r, '__esModule', { value: !0 }),
      Object.defineProperty(r, 'createRenderParamsFromClient', {
        enumerable: !0,
        get: function () {
          return l;
        },
      }));
    let n = new WeakMap();
    function l(e) {
      let t = n.get(e);
      if (t) return t;
      let r = Promise.resolve(e);
      return (n.set(e, r), r);
    }
    ('function' == typeof r.default || ('object' == typeof r.default && null !== r.default)) &&
      void 0 === r.default.__esModule &&
      (Object.defineProperty(r.default, '__esModule', { value: !0 }),
      Object.assign(r.default, r),
      (t.exports = r.default));
  },
  38168,
  (e, t, r) => {
    'use strict';
    (e.i(70925),
      Object.defineProperty(r, '__esModule', { value: !0 }),
      Object.defineProperty(r, 'createRenderParamsFromClient', {
        enumerable: !0,
        get: function () {
          return n;
        },
      }));
    let n = e.r(86438).createRenderParamsFromClient;
    ('function' == typeof r.default || ('object' == typeof r.default && null !== r.default)) &&
      void 0 === r.default.__esModule &&
      (Object.defineProperty(r.default, '__esModule', { value: !0 }),
      Object.assign(r.default, r),
      (t.exports = r.default));
  },
  38236,
  (e, t, r) => {
    'use strict';
    (Object.defineProperty(r, '__esModule', { value: !0 }),
      Object.defineProperty(r, 'createRenderSearchParamsFromClient', {
        enumerable: !0,
        get: function () {
          return l;
        },
      }));
    let n = new WeakMap();
    function l(e) {
      let t = n.get(e);
      if (t) return t;
      let r = Promise.resolve(e);
      return (n.set(e, r), r);
    }
    ('function' == typeof r.default || ('object' == typeof r.default && null !== r.default)) &&
      void 0 === r.default.__esModule &&
      (Object.defineProperty(r.default, '__esModule', { value: !0 }),
      Object.assign(r.default, r),
      (t.exports = r.default));
  },
  8766,
  (e, t, r) => {
    'use strict';
    (e.i(70925),
      Object.defineProperty(r, '__esModule', { value: !0 }),
      Object.defineProperty(r, 'createRenderSearchParamsFromClient', {
        enumerable: !0,
        get: function () {
          return n;
        },
      }));
    let n = e.r(38236).createRenderSearchParamsFromClient;
    ('function' == typeof r.default || ('object' == typeof r.default && null !== r.default)) &&
      void 0 === r.default.__esModule &&
      (Object.defineProperty(r.default, '__esModule', { value: !0 }),
      Object.assign(r.default, r),
      (t.exports = r.default));
  },
  46231,
  (e, t, r) => {
    'use strict';
    Object.defineProperty(r, '__esModule', { value: !0 });
    var n = {
      createClientParams: function () {
        return a.createRenderParamsFromClient;
      },
      createClientSearchParams: function () {
        return o.createRenderSearchParamsFromClient;
      },
    };
    for (var l in n) Object.defineProperty(r, l, { enumerable: !0, get: n[l] });
    let a = e.r(38168),
      o = e.r(8766);
    ('function' == typeof r.default || ('object' == typeof r.default && null !== r.default)) &&
      void 0 === r.default.__esModule &&
      (Object.defineProperty(r.default, '__esModule', { value: !0 }),
      Object.assign(r.default, r),
      (t.exports = r.default));
  },
  66791,
  (e, t, r) => {
    'use strict';
    (Object.defineProperty(r, '__esModule', { value: !0 }),
      Object.defineProperty(r, 'IconMark', {
        enumerable: !0,
        get: function () {
          return l;
        },
      }));
    let n = e.r(24830),
      l = () => ('u' > typeof window ? null : (0, n.jsx)('meta', { name: '«nxt-icon»' }));
  },
  91384,
  (e, t, r) => {
    'use strict';
    function n(e, t = {}) {
      if (t.onlyHashChange) return void e();
      let r = document.documentElement;
      if ('smooth' !== r.dataset.scrollBehavior) return void e();
      let l = r.style.scrollBehavior;
      ((r.style.scrollBehavior = 'auto'),
        t.dontForceLayout || r.getClientRects(),
        e(),
        (r.style.scrollBehavior = l));
    }
    (e.i(70925),
      Object.defineProperty(r, '__esModule', { value: !0 }),
      Object.defineProperty(r, 'disableSmoothScrollDuringRouteTransition', {
        enumerable: !0,
        get: function () {
          return n;
        },
      }));
  },
]);
