(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  'object' == typeof document ? document.currentScript : void 0,
  2863,
  (e) => {
    'use strict';
    var t = e.i(24830),
      n = e.i(39380),
      r = e.i(59992);
    let o = n.forwardRef(({ className: e, type: n, ...o }, i) =>
      (0, t.jsx)('input', {
        type: n,
        className: (0, r.cn)(
          'flex h-9 w-full rounded-[4px] border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive',
          e,
        ),
        ref: i,
        ...o,
      }),
    );
    ((o.displayName = 'Input'), e.s(['Input', 0, o]));
  },
  50123,
  (e) => {
    'use strict';
    var t = e.i(24830),
      n = e.i(39380),
      r = e.i(78238),
      o = Object.defineProperty,
      i = n.forwardRef(
        o(
          function (e, n) {
            return (0, t.jsx)(r.Primitive.label, {
              ...e,
              ref: n,
              onMouseDown: (t) => {
                t.target.closest('button, input, select, textarea') ||
                  (e.onMouseDown?.(t), !t.defaultPrevented && t.detail > 1 && t.preventDefault());
              },
            });
          },
          'name',
          { value: 'Label', configurable: !0 },
        ),
      ),
      u = e.i(94237),
      s = e.i(59992);
    let a = (0, u.cva)(
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      ),
      l = n.forwardRef(({ className: e, ...n }, r) =>
        (0, t.jsx)(i, { ref: r, className: (0, s.cn)(a(), e), ...n }),
      );
    ((l.displayName = i.displayName), e.s(['Label', 0, l], 50123));
  },
  53119,
  (e) => {
    'use strict';
    let t;
    var n = e.i(39380);
    let r = (e) => {
        let t,
          n = new Set(),
          r = (e, r) => {
            let o = 'function' == typeof e ? e(t) : e;
            if (!Object.is(o, t)) {
              let e = t;
              ((t = (null != r ? r : 'object' != typeof o || null === o)
                ? o
                : Object.assign({}, t, o)),
                n.forEach((n) => n(t, e)));
            }
          },
          o = () => t,
          i = {
            setState: r,
            getState: o,
            getInitialState: () => u,
            subscribe: (e) => (n.add(e), () => n.delete(e)),
          },
          u = (t = e(r, o, i));
        return i;
      },
      o = (e) => {
        let t = e ? r(e) : r,
          o = (e) =>
            (function (e, t = (e) => e) {
              let r = n.default.useSyncExternalStore(
                e.subscribe,
                n.default.useCallback(() => t(e.getState()), [e, t]),
                n.default.useCallback(() => t(e.getInitialState()), [e, t]),
              );
              return (n.default.useDebugValue(r), r);
            })(t, e);
        return (Object.assign(o, t), o);
      };
    var i = e.i(77829);
    let u = i.z.object({
      userId: i.z.string().min(1).max(128),
      tenantId: i.z.string().min(1).max(128),
      roles: i.z.array(i.z.string().min(1).max(64)).min(1).max(20),
      email: i.z.string().max(254),
    });
    async function s() {
      let e = await fetch('/api/auth/session', { credentials: 'same-origin', cache: 'no-store' });
      if (!e.ok) return null;
      let t = await e.json(),
        n = i.z.object({ user: u }).safeParse(t);
      return n.success ? n.data.user : null;
    }
    let a = (t = (e, t) => ({
      user: null,
      status: 'checking',
      hasRole: (e) => t().user?.roles.includes(e) === !0,
      hydrate: async () => {
        try {
          let t = await s();
          e({ user: t, status: t ? 'authenticated' : 'anonymous' });
        } catch {
          e({ user: null, status: 'anonymous' });
        }
      },
      login: (t) => e({ user: t, status: 'authenticated' }),
      logout: async () => {
        try {
          await fetch('/api/auth/logout', {
            method: 'POST',
            credentials: 'same-origin',
            cache: 'no-store',
          });
        } finally {
          e({ user: null, status: 'anonymous' });
        }
      },
    }))
      ? o(t)
      : o;
    e.s(['useAuth', 0, a], 53119);
  },
  43836,
  (e) => {
    'use strict';
    var t = Object.defineProperty,
      n = (e, n) => t(e, 'name', { value: n, configurable: !0 }),
      r = !!('u' > typeof window && window.document && window.document.createElement);
    function o(e, t, { checkForDefaultPrevented: r = !0 } = {}) {
      return n(function (n) {
        if ((e?.(n), !1 === r || !n || !n.defaultPrevented)) return t?.(n);
      }, 'handleEvent');
    }
    function i(e) {
      if (!r) throw Error('Cannot access document outside of the DOM');
      return e?.ownerDocument ?? document;
    }
    function u(e) {
      return 'IFRAME' === e.tagName;
    }
    (n(o, 'composeEventHandlers'),
      n(function (e) {
        if (!r) throw Error('Cannot access window outside of the DOM');
        return e?.ownerDocument?.defaultView ?? window;
      }, 'getOwnerWindow'),
      n(i, 'getOwnerDocument'),
      n(function e(t, n = !1) {
        let { activeElement: r } = i(t);
        if (!r?.nodeName) return null;
        if (u(r) && r.contentDocument) return e(r.contentDocument.body, n);
        if (n) {
          let e = r.getAttribute('aria-activedescendant');
          if (e) {
            let t = i(r).getElementById(e);
            if (t) return t;
          }
        }
        return r;
      }, 'getActiveElement'),
      n(u, 'isFrame'),
      e.s(['composeEventHandlers', 0, o]));
  },
  99300,
  (e) => {
    'use strict';
    e.s(['IS_DEVELOPMENT', 0, !1]);
  },
  64145,
  (e) => {
    'use strict';
    var t = e.i(39380),
      n = e.i(24830),
      r = Object.defineProperty,
      o = (e, t) => r(e, 'name', { value: t, configurable: !0 });
    function i(e, r = []) {
      let s = [];
      function a(r, i) {
        let u = t.createContext(i);
        u.displayName = r + 'Context';
        let a = s.length;
        s = [...s, i];
        let l = o((r) => {
          let { scope: o, children: i, ...s } = r,
            l = o?.[e]?.[a] || u,
            c = t.useMemo(() => s, Object.values(s));
          return (0, n.jsx)(l.Provider, { value: c, children: i });
        }, 'Provider');
        function c(n, o, s = {}) {
          let { optional: l = !1 } = s,
            f = o?.[e]?.[a] || u,
            d = t.useContext(f);
          if (d) return d;
          if (void 0 !== i) return i;
          if (!l) throw Error(`\`${n}\` must be used within \`${r}\``);
        }
        return ((l.displayName = r + 'Provider'), o(c, 'useContext'), [l, c]);
      }
      o(a, 'createContext');
      let l = o(() => {
        let n = s.map((e) => t.createContext(e));
        return o(function (r) {
          let o = r?.[e] || n;
          return t.useMemo(() => ({ [`__scope${e}`]: { ...r, [e]: o } }), [r, o]);
        }, 'useScope');
      }, 'createScope');
      return ((l.scopeName = e), [a, u(l, ...r)]);
    }
    function u(...e) {
      let n = e[0];
      if (1 === e.length) return n;
      let r = o(() => {
        let r = e.map((e) => ({ useScope: e(), scopeName: e.scopeName }));
        return o(function (e) {
          let o = r.reduce((t, { useScope: n, scopeName: r }) => {
            let o = n(e)[`__scope${r}`];
            return { ...t, ...o };
          }, {});
          return t.useMemo(() => ({ [`__scope${n.scopeName}`]: o }), [o]);
        }, 'useComposedScopes');
      }, 'createScope');
      return ((r.scopeName = n.scopeName), r);
    }
    (o(function (e, r) {
      let i = t.createContext(r);
      i.displayName = e + 'Context';
      let u = o((e) => {
        let { children: r, ...o } = e,
          u = t.useMemo(() => o, Object.values(o));
        return (0, n.jsx)(i.Provider, { value: u, children: r });
      }, 'Provider');
      function s(n, o = {}) {
        let { optional: u = !1 } = o,
          a = t.useContext(i);
        if (a) return a;
        if (void 0 !== r) return r;
        if (!u) throw Error(`\`${n}\` must be used within \`${e}\``);
      }
      return ((u.displayName = e + 'Provider'), o(s, 'useContext'), [u, s]);
    }, 'createContext'),
      o(i, 'createContextScope'),
      o(u, 'composeContextScopes'),
      e.s(['createContextScope', 0, i]));
  },
  97611,
  (e) => {
    'use strict';
    var t = e.i(39380),
      n = e.i(44532),
      r = Object.defineProperty,
      o = (e, t) => r(e, 'name', { value: t, configurable: !0 });
    function i(e, n) {
      return t.useReducer((e, t) => n[e][t] ?? e, e);
    }
    o(i, 'useStateMachine');
    var u = o((e) => {
      let { present: n, children: r } = e,
        o = s(n),
        i = 'function' == typeof r ? r({ present: o.isPresent }) : t.Children.only(r),
        u = l(o.ref, f(i));
      return 'function' == typeof r || o.isPresent ? t.cloneElement(i, { ref: u }) : null;
    }, 'Presence');
    function s(e) {
      let [r, u] = t.useState(),
        s = t.useRef(null),
        a = t.useRef(e),
        l = t.useRef('none'),
        f = t.useRef(void 0),
        [d, m] = i(e ? 'mounted' : 'unmounted', {
          mounted: { UNMOUNT: 'unmounted', ANIMATION_OUT: 'unmountSuspended' },
          unmountSuspended: { MOUNT: 'mounted', ANIMATION_END: 'unmounted' },
          unmounted: { MOUNT: 'mounted' },
        });
      return (
        t.useEffect(() => {
          'mounted' === d
            ? ((l.current = f.current ?? c(s.current)), (f.current = void 0))
            : (l.current = 'none');
        }, [d]),
        (0, n.useLayoutEffect)(() => {
          let t = s.current,
            n = a.current;
          if (n !== e) {
            let r = l.current,
              o = c(t);
            (e
              ? ((f.current = o), m('MOUNT'))
              : 'none' === o || t?.display === 'none'
                ? m('UNMOUNT')
                : n && r !== o
                  ? m('ANIMATION_OUT')
                  : m('UNMOUNT'),
              (a.current = e));
          }
        }, [e, m]),
        (0, n.useLayoutEffect)(() => {
          if (r) {
            let e,
              t = r.ownerDocument.defaultView ?? window,
              n = o((n) => {
                let o = c(s.current).includes(CSS.escape(n.animationName));
                if (n.target === r && o && (m('ANIMATION_END'), !a.current)) {
                  let n = r.style.animationFillMode;
                  ((r.style.animationFillMode = 'forwards'),
                    (e = t.setTimeout(() => {
                      'forwards' === r.style.animationFillMode && (r.style.animationFillMode = n);
                    })));
                }
              }, 'handleAnimationEnd'),
              i = o((e) => {
                e.target === r && (l.current = c(s.current));
              }, 'handleAnimationStart');
            return (
              r.addEventListener('animationstart', i),
              r.addEventListener('animationcancel', n),
              r.addEventListener('animationend', n),
              () => {
                (t.clearTimeout(e),
                  r.removeEventListener('animationstart', i),
                  r.removeEventListener('animationcancel', n),
                  r.removeEventListener('animationend', n));
              }
            );
          }
          m('ANIMATION_END');
        }, [r, m]),
        {
          isPresent: ['mounted', 'unmountSuspended'].includes(d),
          ref: t.useCallback((e) => {
            if (e) {
              let t = getComputedStyle(e);
              ((s.current = t), (f.current = c(t)));
            } else s.current = null;
            u(e);
          }, []),
        }
      );
    }
    function a(e, t) {
      if ('function' == typeof e) return e(t);
      null != e && (e.current = t);
    }
    function l(...e) {
      let n = t.useRef(e);
      return (
        (n.current = e),
        t.useCallback((e) => {
          let t = n.current,
            r = !1,
            o = t.map((t) => {
              let n = a(t, e);
              return (r || 'function' != typeof n || (r = !0), n);
            });
          if (r)
            return () => {
              for (let e = 0; e < o.length; e++) {
                let n = o[e];
                'function' == typeof n ? n() : a(t[e], null);
              }
            };
        }, [])
      );
    }
    function c(e) {
      return e?.animationName || 'none';
    }
    function f(e) {
      let t = Object.getOwnPropertyDescriptor(e.props, 'ref')?.get,
        n = t && 'isReactWarning' in t && t.isReactWarning;
      return n
        ? e.ref
        : (n =
              (t = Object.getOwnPropertyDescriptor(e, 'ref')?.get) &&
              'isReactWarning' in t &&
              t.isReactWarning)
          ? e.props.ref
          : e.props.ref || e.ref;
    }
    (o(s, 'usePresence'),
      o(a, 'setRef'),
      o(l, 'useStableComposedRefs'),
      o(c, 'getAnimationName'),
      o(f, 'getElementRef'),
      e.s(['Presence', 0, u]));
  },
  78238,
  (e) => {
    'use strict';
    var t = e.i(39380),
      n = e.i(60429),
      r = e.i(17739),
      o = e.i(24830),
      i = Object.defineProperty,
      u = [
        'a',
        'button',
        'div',
        'form',
        'h2',
        'h3',
        'img',
        'input',
        'label',
        'li',
        'nav',
        'ol',
        'p',
        'select',
        'span',
        'svg',
        'ul',
      ].reduce((e, n) => {
        let i = (0, r.createSlot)(`Primitive.${n}`),
          u = t.forwardRef((e, t) => {
            let { asChild: r, ...u } = e;
            return (
              'u' > typeof window && (window[Symbol.for('radix-ui')] = !0),
              (0, o.jsx)(r ? i : n, { ...u, ref: t })
            );
          });
        return ((u.displayName = `Primitive.${n}`), { ...e, [n]: u });
      }, {});
    function s(e, t) {
      e && n.flushSync(() => e.dispatchEvent(t));
    }
    (i(s, 'name', { value: 'dispatchDiscreteCustomEvent', configurable: !0 }),
      e.s(['Primitive', 0, u, 'dispatchDiscreteCustomEvent', 0, s]));
  },
  15671,
  (e) => {
    'use strict';
    var t = e.i(39380),
      n = e.i(99300),
      r = e.i(44532),
      o = Object.defineProperty,
      i = t[' useEffectEvent '.trim().toString()],
      u = t[' useInsertionEffect '.trim().toString()];
    function s(e) {
      if ('function' == typeof i) return i(e);
      let n = t.useRef(() => {
        throw Error('Cannot call an event handler while rendering.');
      });
      return (
        'function' == typeof u
          ? u(() => {
              n.current = e;
            })
          : (0, r.useLayoutEffect)(() => {
              n.current = e;
            }),
        t.useMemo(
          () =>
            (...e) =>
              n.current?.(...e),
          [],
        )
      );
    }
    o(s, 'name', { value: 'useEffectEvent', configurable: !0 });
    var a = Object.defineProperty,
      l = (e, t) => a(e, 'name', { value: t, configurable: !0 }),
      c = t[' useInsertionEffect '.trim().toString()] || r.useLayoutEffect;
    function f({ prop: e, defaultProp: r, onChange: o = l(() => {}, 'onChange'), caller: i }) {
      let [u, s, a] = d({ defaultProp: r, onChange: o }),
        c = void 0 !== e,
        p = c ? e : u;
      if (n.IS_DEVELOPMENT) {
        let n = t.useRef(void 0 !== e);
        t.useEffect(() => {
          let e = n.current;
          if (e !== c) {
            let t = c ? 'controlled' : 'uncontrolled';
            console.warn(
              `${i} is changing from ${e ? 'controlled' : 'uncontrolled'} to ${t}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`,
            );
          }
          n.current = c;
        }, [c, i]);
      }
      return [
        p,
        t.useCallback(
          (t) => {
            if (c) {
              let n = m(t) ? t(e) : t;
              n !== e && a.current?.(n);
            } else s(t);
          },
          [c, e, s, a],
        ),
      ];
    }
    function d({ defaultProp: e, onChange: n }) {
      let [r, o] = t.useState(e),
        i = t.useRef(r),
        u = t.useRef(n);
      return (
        c(() => {
          u.current = n;
        }, [n]),
        t.useEffect(() => {
          i.current !== r && (u.current?.(r), (i.current = r));
        }, [r, i]),
        [r, o, u]
      );
    }
    function m(e) {
      return 'function' == typeof e;
    }
    (l(f, 'useControllableState'), l(d, 'useUncontrolledState'), l(m, 'isFunction'));
    var p = Symbol('RADIX:SYNC_STATE');
    (l(function (e, r, o, i) {
      let { prop: u, defaultProp: a, onChange: l, caller: c } = r,
        f = void 0 !== u,
        d = s(l);
      if (n.IS_DEVELOPMENT) {
        let e = t.useRef(void 0 !== u);
        t.useEffect(() => {
          let t = e.current;
          if (t !== f) {
            let e = f ? 'controlled' : 'uncontrolled';
            console.warn(
              `${c} is changing from ${t ? 'controlled' : 'uncontrolled'} to ${e}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`,
            );
          }
          e.current = f;
        }, [f, c]);
      }
      let m = [{ ...o, state: a }];
      i && m.push(i);
      let [v, b] = t.useReducer(
          (t, n) => {
            if (n.type === p) return { ...t, state: n.state };
            let r = e(t, n);
            return (f && !Object.is(r.state, t.state) && d(r.state), r);
          },
          ...m,
        ),
        g = v.state,
        y = t.useRef(g);
      t.useEffect(() => {
        y.current !== g && ((y.current = g), f || d(g));
      }, [g, y, f]);
      let h = t.useMemo(() => (void 0 !== u ? { ...v, state: u } : v), [v, u]);
      return (
        t.useEffect(() => {
          f && !Object.is(u, v.state) && b({ type: p, state: u });
        }, [u, v.state, f]),
        [h, b]
      );
    }, 'useControllableStateReducer'),
      e.s(['useControllableState', 0, f], 15671));
  },
  44532,
  (e) => {
    'use strict';
    var t = e.i(39380),
      n = globalThis?.document ? t.useLayoutEffect : () => {};
    e.s(['useLayoutEffect', 0, n]);
  },
  14971,
  (e) => {
    'use strict';
    var t = e.i(39380),
      n = e.i(44532);
    function r(e) {
      let [r, o] = t.useState(void 0);
      return (
        (0, n.useLayoutEffect)(() => {
          if (e) {
            o({ width: e.offsetWidth, height: e.offsetHeight });
            let t = new ResizeObserver((t) => {
              let n, r;
              if (!Array.isArray(t) || !t.length) return;
              let i = t[0];
              if ('borderBoxSize' in i) {
                let e = i.borderBoxSize,
                  t = Array.isArray(e) ? e[0] : e;
                ((n = t.inlineSize), (r = t.blockSize));
              } else ((n = e.offsetWidth), (r = e.offsetHeight));
              o({ width: n, height: r });
            });
            return (t.observe(e, { box: 'border-box' }), () => t.unobserve(e));
          }
          o(void 0);
        }, [e]),
        r
      );
    }
    ((0, Object.defineProperty)(r, 'name', { value: 'useSize', configurable: !0 }),
      e.s(['useSize', 0, r]));
  },
  86304,
  (e) => {
    'use strict';
    let t = (0, e.i(32155).default)('Check', [['path', { d: 'M20 6 9 17l-5-5', key: '1gmf2c' }]]);
    e.s(['Check', 0, t], 86304);
  },
  11744,
  (e) => {
    'use strict';
    let t = (0, e.i(32155).default)('CircleAlert', [
      ['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
      ['line', { x1: '12', x2: '12', y1: '8', y2: '12', key: '1pkeuh' }],
      ['line', { x1: '12', x2: '12.01', y1: '16', y2: '16', key: '4dfq90' }],
    ]);
    e.s(['AlertCircle', 0, t], 11744);
  },
]);
