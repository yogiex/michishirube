(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  'object' == typeof document ? document.currentScript : void 0,
  53119,
  (e) => {
    'use strict';
    let t;
    var r = e.i(39380);
    let n = (e) => {
        let t,
          r = new Set(),
          n = (e, n) => {
            let o = 'function' == typeof e ? e(t) : e;
            if (!Object.is(o, t)) {
              let e = t;
              ((t = (null != n ? n : 'object' != typeof o || null === o)
                ? o
                : Object.assign({}, t, o)),
                r.forEach((r) => r(t, e)));
            }
          },
          o = () => t,
          i = {
            setState: n,
            getState: o,
            getInitialState: () => u,
            subscribe: (e) => (r.add(e), () => r.delete(e)),
          },
          u = (t = e(n, o, i));
        return i;
      },
      o = (e) => {
        let t = e ? n(e) : n,
          o = (e) =>
            (function (e, t = (e) => e) {
              let n = r.default.useSyncExternalStore(
                e.subscribe,
                r.default.useCallback(() => t(e.getState()), [e, t]),
                r.default.useCallback(() => t(e.getInitialState()), [e, t]),
              );
              return (r.default.useDebugValue(n), n);
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
        r = i.z.object({ user: u }).safeParse(t);
      return r.success ? r.data.user : null;
    }
    let l = (t = (e, t) => ({
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
    e.s(['useAuth', 0, l], 53119);
  },
  43836,
  (e) => {
    'use strict';
    var t = Object.defineProperty,
      r = (e, r) => t(e, 'name', { value: r, configurable: !0 }),
      n = !!('u' > typeof window && window.document && window.document.createElement);
    function o(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
      return r(function (r) {
        if ((e?.(r), !1 === n || !r || !r.defaultPrevented)) return t?.(r);
      }, 'handleEvent');
    }
    function i(e) {
      if (!n) throw Error('Cannot access document outside of the DOM');
      return e?.ownerDocument ?? document;
    }
    function u(e) {
      return 'IFRAME' === e.tagName;
    }
    (r(o, 'composeEventHandlers'),
      r(function (e) {
        if (!n) throw Error('Cannot access window outside of the DOM');
        return e?.ownerDocument?.defaultView ?? window;
      }, 'getOwnerWindow'),
      r(i, 'getOwnerDocument'),
      r(function e(t, r = !1) {
        let { activeElement: n } = i(t);
        if (!n?.nodeName) return null;
        if (u(n) && n.contentDocument) return e(n.contentDocument.body, r);
        if (r) {
          let e = n.getAttribute('aria-activedescendant');
          if (e) {
            let t = i(n).getElementById(e);
            if (t) return t;
          }
        }
        return n;
      }, 'getActiveElement'),
      r(u, 'isFrame'),
      e.s(['composeEventHandlers', 0, o]));
  },
  99300,
  (e) => {
    'use strict';
    e.s(['IS_DEVELOPMENT', 0, !1]);
  },
  69539,
  (e) => {
    'use strict';
    var t = e.i(39380),
      r = e.i(64145),
      n = e.i(66100),
      o = e.i(17739),
      i = e.i(24830),
      u = Object.defineProperty,
      s = (e, t) => u(e, 'name', { value: t, configurable: !0 });
    function l(e) {
      let u = e + 'CollectionProvider',
        [l, a] = (0, r.createContextScope)(u),
        [c, f] = l(u, { collectionRef: { current: null }, itemMap: new Map() }),
        d = s((e) => {
          let { scope: r, children: n } = e,
            o = t.useRef(null),
            u = t.useRef(new Map()).current;
          return (0, i.jsx)(c, { scope: r, itemMap: u, collectionRef: o, children: n });
        }, 'CollectionProvider');
      d.displayName = u;
      let p = e + 'CollectionSlot',
        h = (0, o.createSlot)(p),
        m = t.forwardRef((e, t) => {
          let { scope: r, children: o } = e,
            u = f(p, r),
            s = (0, n.useComposedRefs)(t, u.collectionRef);
          return (0, i.jsx)(h, { ref: s, children: o });
        });
      m.displayName = p;
      let y = e + 'CollectionItemSlot',
        v = 'data-radix-collection-item',
        g = (0, o.createSlot)(y),
        b = t.forwardRef((e, r) => {
          let { scope: o, children: u, ...s } = e,
            l = t.useRef(null),
            a = (0, n.useComposedRefs)(r, l),
            c = f(y, o);
          return (
            t.useEffect(() => (c.itemMap.set(l, { ref: l, ...s }), () => void c.itemMap.delete(l))),
            (0, i.jsx)(g, { ...{ [v]: '' }, ref: a, children: u })
          );
        });
      function S(r) {
        let n = f(e + 'CollectionConsumer', r);
        return t.useCallback(() => {
          let e = n.collectionRef.current;
          if (!e) return [];
          let t = Array.from(e.querySelectorAll(`[${v}]`));
          return Array.from(n.itemMap.values()).sort(
            (e, r) => t.indexOf(e.ref.current) - t.indexOf(r.ref.current),
          );
        }, [n.collectionRef, n.itemMap]);
      }
      return (
        (b.displayName = y),
        s(S, 'useCollection'),
        [{ Provider: d, Slot: m, ItemSlot: b }, S, a]
      );
    }
    s(l, 'createCollection');
    var a = new WeakMap(),
      c = class e extends Map {
        static {
          s(this, 'OrderedDict');
        }
        #e;
        constructor(e) {
          (super(e), (this.#e = [...super.keys()]), a.set(this, !0));
        }
        set(e, t) {
          return (
            a.get(this) && (this.has(e) ? (this.#e[this.#e.indexOf(e)] = e) : this.#e.push(e)),
            super.set(e, t),
            this
          );
        }
        insert(e, t, r) {
          let n,
            o = this.has(t),
            i = this.#e.length,
            u = p(e),
            s = u >= 0 ? u : i + u,
            l = s < 0 || s >= i ? -1 : s;
          if (l === this.size || (o && l === this.size - 1) || -1 === l)
            return (this.set(t, r), this);
          let a = this.size + +!o;
          u < 0 && s++;
          let c = [...this.#e],
            f = !1;
          for (let e = s; e < a; e++)
            if (s === e) {
              let i = c[e];
              (c[e] === t && (i = c[e + 1]),
                o && this.delete(t),
                (n = this.get(i)),
                this.set(t, r));
            } else {
              f || c[e - 1] !== t || (f = !0);
              let r = c[f ? e : e - 1],
                o = n;
              ((n = this.get(r)), this.delete(r), this.set(r, o));
            }
          return this;
        }
        with(t, r, n) {
          let o = new e(this);
          return (o.insert(t, r, n), o);
        }
        before(e) {
          let t = this.#e.indexOf(e) - 1;
          if (!(t < 0)) return this.entryAt(t);
        }
        setBefore(e, t, r) {
          let n = this.#e.indexOf(e);
          return -1 === n ? this : this.insert(n, t, r);
        }
        after(e) {
          let t = this.#e.indexOf(e);
          if (-1 !== (t = -1 === t || t === this.size - 1 ? -1 : t + 1)) return this.entryAt(t);
        }
        setAfter(e, t, r) {
          let n = this.#e.indexOf(e);
          return -1 === n ? this : this.insert(n + 1, t, r);
        }
        first() {
          return this.entryAt(0);
        }
        last() {
          return this.entryAt(-1);
        }
        clear() {
          return ((this.#e = []), super.clear());
        }
        delete(e) {
          let t = super.delete(e);
          return (t && this.#e.splice(this.#e.indexOf(e), 1), t);
        }
        deleteAt(e) {
          let t = this.keyAt(e);
          return void 0 !== t && this.delete(t);
        }
        at(e) {
          let t = f(this.#e, e);
          if (void 0 !== t) return this.get(t);
        }
        entryAt(e) {
          let t = f(this.#e, e);
          if (void 0 !== t) return [t, this.get(t)];
        }
        indexOf(e) {
          return this.#e.indexOf(e);
        }
        keyAt(e) {
          return f(this.#e, e);
        }
        from(e, t) {
          let r = this.indexOf(e);
          if (-1 === r) return;
          let n = r + t;
          return (n < 0 && (n = 0), n >= this.size && (n = this.size - 1), this.at(n));
        }
        keyFrom(e, t) {
          let r = this.indexOf(e);
          if (-1 === r) return;
          let n = r + t;
          return (n < 0 && (n = 0), n >= this.size && (n = this.size - 1), this.keyAt(n));
        }
        find(e, t) {
          let r = 0;
          for (let n of this) {
            if (Reflect.apply(e, t, [n, r, this])) return n;
            r++;
          }
        }
        findIndex(e, t) {
          let r = 0;
          for (let n of this) {
            if (Reflect.apply(e, t, [n, r, this])) return r;
            r++;
          }
          return -1;
        }
        filter(t, r) {
          let n = [],
            o = 0;
          for (let e of this) (Reflect.apply(t, r, [e, o, this]) && n.push(e), o++);
          return new e(n);
        }
        map(t, r) {
          let n = [],
            o = 0;
          for (let e of this) (n.push([e[0], Reflect.apply(t, r, [e, o, this])]), o++);
          return new e(n);
        }
        reduce(...e) {
          let [t, r] = e,
            n = 0,
            o = r ?? this.at(0);
          for (let r of this)
            ((o = 0 === n && 1 === e.length ? r : Reflect.apply(t, this, [o, r, n, this])), n++);
          return o;
        }
        reduceRight(...e) {
          let [t, r] = e,
            n = r ?? this.at(-1);
          for (let r = this.size - 1; r >= 0; r--) {
            let o = this.at(r);
            n = r === this.size - 1 && 1 === e.length ? o : Reflect.apply(t, this, [n, o, r, this]);
          }
          return n;
        }
        toSorted(t) {
          return new e([...this.entries()].sort(t));
        }
        toReversed() {
          let t = new e();
          for (let e = this.size - 1; e >= 0; e--) {
            let r = this.keyAt(e),
              n = this.get(r);
            t.set(r, n);
          }
          return t;
        }
        toSpliced(...t) {
          let r = [...this.entries()];
          return (r.splice(...t), new e(r));
        }
        slice(t, r) {
          let n = new e(),
            o = this.size - 1;
          if (void 0 === t) return n;
          (t < 0 && (t += this.size), void 0 !== r && r > 0 && (o = r - 1));
          for (let e = t; e <= o; e++) {
            let t = this.keyAt(e),
              r = this.get(t);
            n.set(t, r);
          }
          return n;
        }
        every(e, t) {
          let r = 0;
          for (let n of this) {
            if (!Reflect.apply(e, t, [n, r, this])) return !1;
            r++;
          }
          return !0;
        }
        some(e, t) {
          let r = 0;
          for (let n of this) {
            if (Reflect.apply(e, t, [n, r, this])) return !0;
            r++;
          }
          return !1;
        }
      };
    function f(e, t) {
      if ('at' in Array.prototype) return Array.prototype.at.call(e, t);
      let r = d(e, t);
      return -1 === r ? void 0 : e[r];
    }
    function d(e, t) {
      let r = e.length,
        n = p(t),
        o = n >= 0 ? n : r + n;
      return o < 0 || o >= r ? -1 : o;
    }
    function p(e) {
      return e != e || 0 === e ? 0 : Math.trunc(e);
    }
    function h(e, t) {
      if (e === t) return !0;
      if ('object' != typeof e || 'object' != typeof t || null == e || null == t) return !1;
      let r = Object.keys(e),
        n = Object.keys(t);
      if (r.length !== n.length) return !1;
      for (let n of r) if (!Object.prototype.hasOwnProperty.call(t, n) || e[n] !== t[n]) return !1;
      return !0;
    }
    function m(e, t) {
      return !!(t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_PRECEDING);
    }
    function y(e, t) {
      return e[1].element && t[1].element ? (m(e[1].element, t[1].element) ? -1 : 1) : 0;
    }
    function v(e) {
      return new MutationObserver((t) => {
        for (let r of t) if ('childList' === r.type) return void e();
      });
    }
    (s(f, 'at'),
      s(d, 'toSafeIndex'),
      s(p, 'toSafeInteger'),
      s(function (e) {
        let u = e + 'CollectionProvider',
          [l, a] = (0, r.createContextScope)(u),
          [f, d] = l(u, {
            collectionElement: null,
            collectionRef: { current: null },
            collectionRefObject: { current: null },
            itemMap: new c(),
            setItemMap: s(() => void 0, 'setItemMap'),
          }),
          p = s(
            ({ state: e, ...t }) =>
              e ? (0, i.jsx)(g, { ...t, state: e }) : (0, i.jsx)(m, { ...t }),
            'CollectionProvider',
          );
        p.displayName = u;
        let m = s((e) => {
          let t = O();
          return (0, i.jsx)(g, { ...e, state: t });
        }, 'CollectionInit');
        m.displayName = u + 'Init';
        let g = s((e) => {
          let { scope: r, children: o, state: u } = e,
            s = t.useRef(null),
            [l, a] = t.useState(null),
            c = (0, n.useComposedRefs)(s, a),
            [d, p] = u;
          return (
            t.useEffect(() => {
              if (!l) return;
              let e = v(() => {});
              return (
                e.observe(l, { childList: !0, subtree: !0 }),
                () => {
                  e.disconnect();
                }
              );
            }, [l]),
            (0, i.jsx)(f, {
              scope: r,
              itemMap: d,
              setItemMap: p,
              collectionRef: c,
              collectionRefObject: s,
              collectionElement: l,
              children: o,
            })
          );
        }, 'CollectionProviderImpl');
        g.displayName = u + 'Impl';
        let b = e + 'CollectionSlot',
          S = (0, o.createSlot)(b),
          E = t.forwardRef((e, t) => {
            let { scope: r, children: o } = e,
              u = d(b, r),
              s = (0, n.useComposedRefs)(t, u.collectionRef);
            return (0, i.jsx)(S, { ref: s, children: o });
          });
        E.displayName = b;
        let w = e + 'CollectionItemSlot',
          C = (0, o.createSlot)(w),
          R = t.forwardRef((e, r) => {
            let { scope: o, children: u, ...s } = e,
              l = t.useRef(null),
              [a, f] = t.useState(null),
              p = (0, n.useComposedRefs)(r, l, f),
              { setItemMap: m } = d(w, o),
              v = t.useRef(s);
            h(v.current, s) || (v.current = s);
            let g = v.current;
            return (
              t.useEffect(
                () => (
                  m((e) =>
                    a
                      ? e.has(a)
                        ? e.set(a, { ...g, element: a }).toSorted(y)
                        : (e.set(a, { ...g, element: a }), e.toSorted(y))
                      : e,
                  ),
                  () => {
                    m((e) => (a && e.has(a) ? (e.delete(a), new c(e)) : e));
                  }
                ),
                [a, g, m],
              ),
              (0, i.jsx)(C, { 'data-radix-collection-item': '', ref: p, children: u })
            );
          });
        function O() {
          return t.useState(new c());
        }
        function P(t) {
          let { itemMap: r } = d(e + 'CollectionConsumer', t);
          return r;
        }
        return (
          (R.displayName = w),
          s(O, 'useInitCollection'),
          s(P, 'useCollection'),
          [
            { Provider: p, Slot: E, ItemSlot: R },
            { createCollectionScope: a, useCollection: P, useInitCollection: O },
          ]
        );
      }, 'createCollection'),
      s(h, 'shallowEqual'),
      s(m, 'isElementPreceding'),
      s(y, 'sortByDocumentPosition'),
      s(v, 'getChildListObserver'),
      e.s(['createCollection', 0, l]));
  },
  64145,
  (e) => {
    'use strict';
    var t = e.i(39380),
      r = e.i(24830),
      n = Object.defineProperty,
      o = (e, t) => n(e, 'name', { value: t, configurable: !0 });
    function i(e, n = []) {
      let s = [];
      function l(n, i) {
        let u = t.createContext(i);
        u.displayName = n + 'Context';
        let l = s.length;
        s = [...s, i];
        let a = o((n) => {
          let { scope: o, children: i, ...s } = n,
            a = o?.[e]?.[l] || u,
            c = t.useMemo(() => s, Object.values(s));
          return (0, r.jsx)(a.Provider, { value: c, children: i });
        }, 'Provider');
        function c(r, o, s = {}) {
          let { optional: a = !1 } = s,
            f = o?.[e]?.[l] || u,
            d = t.useContext(f);
          if (d) return d;
          if (void 0 !== i) return i;
          if (!a) throw Error(`\`${r}\` must be used within \`${n}\``);
        }
        return ((a.displayName = n + 'Provider'), o(c, 'useContext'), [a, c]);
      }
      o(l, 'createContext');
      let a = o(() => {
        let r = s.map((e) => t.createContext(e));
        return o(function (n) {
          let o = n?.[e] || r;
          return t.useMemo(() => ({ [`__scope${e}`]: { ...n, [e]: o } }), [n, o]);
        }, 'useScope');
      }, 'createScope');
      return ((a.scopeName = e), [l, u(a, ...n)]);
    }
    function u(...e) {
      let r = e[0];
      if (1 === e.length) return r;
      let n = o(() => {
        let n = e.map((e) => ({ useScope: e(), scopeName: e.scopeName }));
        return o(function (e) {
          let o = n.reduce((t, { useScope: r, scopeName: n }) => {
            let o = r(e)[`__scope${n}`];
            return { ...t, ...o };
          }, {});
          return t.useMemo(() => ({ [`__scope${r.scopeName}`]: o }), [o]);
        }, 'useComposedScopes');
      }, 'createScope');
      return ((n.scopeName = r.scopeName), n);
    }
    (o(function (e, n) {
      let i = t.createContext(n);
      i.displayName = e + 'Context';
      let u = o((e) => {
        let { children: n, ...o } = e,
          u = t.useMemo(() => o, Object.values(o));
        return (0, r.jsx)(i.Provider, { value: u, children: n });
      }, 'Provider');
      function s(r, o = {}) {
        let { optional: u = !1 } = o,
          l = t.useContext(i);
        if (l) return l;
        if (void 0 !== n) return n;
        if (!u) throw Error(`\`${r}\` must be used within \`${e}\``);
      }
      return ((u.displayName = e + 'Provider'), o(s, 'useContext'), [u, s]);
    }, 'createContext'),
      o(i, 'createContextScope'),
      o(u, 'composeContextScopes'),
      e.s(['createContextScope', 0, i]));
  },
  877,
  (e) => {
    'use strict';
    var t = e.i(39380),
      r = (e.i(24830), Object.defineProperty),
      n = t.createContext(void 0);
    function o(e) {
      let r = t.useContext(n);
      return e || r || 'ltr';
    }
    (r(o, 'name', { value: 'useDirection', configurable: !0 }), e.s(['useDirection', 0, o]));
  },
  32567,
  (e) => {
    'use strict';
    var t = e.i(39380),
      r = e.i(44532),
      n = Object.defineProperty,
      o = t[' useId '.trim().toString()] || (() => void 0),
      i = 0;
    function u(e) {
      let [n, u] = t.useState(o());
      return (
        (0, r.useLayoutEffect)(() => {
          e || u((e) => e ?? String(i++));
        }, [e]),
        e || (n ? `radix-${n}` : '')
      );
    }
    (n(u, 'name', { value: 'useId', configurable: !0 }), e.s(['useId', 0, u]));
  },
  97611,
  (e) => {
    'use strict';
    var t = e.i(39380),
      r = e.i(44532),
      n = Object.defineProperty,
      o = (e, t) => n(e, 'name', { value: t, configurable: !0 });
    function i(e, r) {
      return t.useReducer((e, t) => r[e][t] ?? e, e);
    }
    o(i, 'useStateMachine');
    var u = o((e) => {
      let { present: r, children: n } = e,
        o = s(r),
        i = 'function' == typeof n ? n({ present: o.isPresent }) : t.Children.only(n),
        u = a(o.ref, f(i));
      return 'function' == typeof n || o.isPresent ? t.cloneElement(i, { ref: u }) : null;
    }, 'Presence');
    function s(e) {
      let [n, u] = t.useState(),
        s = t.useRef(null),
        l = t.useRef(e),
        a = t.useRef('none'),
        f = t.useRef(void 0),
        [d, p] = i(e ? 'mounted' : 'unmounted', {
          mounted: { UNMOUNT: 'unmounted', ANIMATION_OUT: 'unmountSuspended' },
          unmountSuspended: { MOUNT: 'mounted', ANIMATION_END: 'unmounted' },
          unmounted: { MOUNT: 'mounted' },
        });
      return (
        t.useEffect(() => {
          'mounted' === d
            ? ((a.current = f.current ?? c(s.current)), (f.current = void 0))
            : (a.current = 'none');
        }, [d]),
        (0, r.useLayoutEffect)(() => {
          let t = s.current,
            r = l.current;
          if (r !== e) {
            let n = a.current,
              o = c(t);
            (e
              ? ((f.current = o), p('MOUNT'))
              : 'none' === o || t?.display === 'none'
                ? p('UNMOUNT')
                : r && n !== o
                  ? p('ANIMATION_OUT')
                  : p('UNMOUNT'),
              (l.current = e));
          }
        }, [e, p]),
        (0, r.useLayoutEffect)(() => {
          if (n) {
            let e,
              t = n.ownerDocument.defaultView ?? window,
              r = o((r) => {
                let o = c(s.current).includes(CSS.escape(r.animationName));
                if (r.target === n && o && (p('ANIMATION_END'), !l.current)) {
                  let r = n.style.animationFillMode;
                  ((n.style.animationFillMode = 'forwards'),
                    (e = t.setTimeout(() => {
                      'forwards' === n.style.animationFillMode && (n.style.animationFillMode = r);
                    })));
                }
              }, 'handleAnimationEnd'),
              i = o((e) => {
                e.target === n && (a.current = c(s.current));
              }, 'handleAnimationStart');
            return (
              n.addEventListener('animationstart', i),
              n.addEventListener('animationcancel', r),
              n.addEventListener('animationend', r),
              () => {
                (t.clearTimeout(e),
                  n.removeEventListener('animationstart', i),
                  n.removeEventListener('animationcancel', r),
                  n.removeEventListener('animationend', r));
              }
            );
          }
          p('ANIMATION_END');
        }, [n, p]),
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
    function l(e, t) {
      if ('function' == typeof e) return e(t);
      null != e && (e.current = t);
    }
    function a(...e) {
      let r = t.useRef(e);
      return (
        (r.current = e),
        t.useCallback((e) => {
          let t = r.current,
            n = !1,
            o = t.map((t) => {
              let r = l(t, e);
              return (n || 'function' != typeof r || (n = !0), r);
            });
          if (n)
            return () => {
              for (let e = 0; e < o.length; e++) {
                let r = o[e];
                'function' == typeof r ? r() : l(t[e], null);
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
    (o(s, 'usePresence'),
      o(l, 'setRef'),
      o(a, 'useStableComposedRefs'),
      o(c, 'getAnimationName'),
      o(f, 'getElementRef'),
      e.s(['Presence', 0, u]));
  },
  78238,
  (e) => {
    'use strict';
    var t = e.i(39380),
      r = e.i(60429),
      n = e.i(17739),
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
      ].reduce((e, r) => {
        let i = (0, n.createSlot)(`Primitive.${r}`),
          u = t.forwardRef((e, t) => {
            let { asChild: n, ...u } = e;
            return (
              'u' > typeof window && (window[Symbol.for('radix-ui')] = !0),
              (0, o.jsx)(n ? i : r, { ...u, ref: t })
            );
          });
        return ((u.displayName = `Primitive.${r}`), { ...e, [r]: u });
      }, {});
    function s(e, t) {
      e && r.flushSync(() => e.dispatchEvent(t));
    }
    (i(s, 'name', { value: 'dispatchDiscreteCustomEvent', configurable: !0 }),
      e.s(['Primitive', 0, u, 'dispatchDiscreteCustomEvent', 0, s]));
  },
  60065,
  (e) => {
    'use strict';
    var t = e.i(39380),
      r = e.i(43836),
      n = e.i(69539),
      o = e.i(66100),
      i = e.i(64145),
      u = e.i(32567),
      s = e.i(78238),
      l = e.i(32253),
      a = e.i(15671),
      c = e.i(877),
      f = e.i(44532),
      d = Object.defineProperty,
      p = (e, t) => d(e, 'name', { value: t, configurable: !0 }),
      h = !1;
    function m() {
      let [e, r] = t.useState(h);
      return (
        t.useEffect(() => {
          h || ((h = !0), r(!0));
        }, []),
        e
      );
    }
    p(m, 'useIsHydrated');
    var y = t[' useSyncExternalStore '.trim().toString()];
    function v() {
      return () => {};
    }
    function g() {
      return y(
        v,
        () => !0,
        () => !1,
      );
    }
    (p(v, 'subscribe'), p(g, 'useIsHydratedModern'));
    var b = 'function' == typeof y ? g : m,
      S = e.i(24830),
      E = Object.defineProperty,
      w = (e, t) => E(e, 'name', { value: t, configurable: !0 }),
      C = 'rovingFocusGroup.onEntryFocus',
      R = { bubbles: !1, cancelable: !0 },
      O = 'RovingFocusGroup',
      [P, x, j] = (0, n.createCollection)(O),
      [I, N] = (0, i.createContextScope)(O, [j]),
      [A, M] = I(O),
      k = t.forwardRef(
        w(function (e, t) {
          return (0, S.jsx)(P.Provider, {
            scope: e.__scopeRovingFocusGroup,
            children: (0, S.jsx)(P.Slot, {
              scope: e.__scopeRovingFocusGroup,
              children: (0, S.jsx)(T, { ...e, ref: t }),
            }),
          });
        }, 'RovingFocusGroup'),
      ),
      T = t.forwardRef(
        w(function (e, n) {
          let {
              __scopeRovingFocusGroup: i,
              orientation: u,
              loop: f = !1,
              dir: d,
              currentTabStopId: p,
              defaultCurrentTabStopId: h,
              onCurrentTabStopIdChange: m,
              onEntryFocus: y,
              preventScrollOnEntryFocus: v = !1,
              ...g
            } = e,
            b = t.useRef(null),
            E = (0, o.useComposedRefs)(n, b),
            w = (0, c.useDirection)(d),
            [P, j] = (0, a.useControllableState)({
              prop: p,
              defaultProp: h ?? null,
              onChange: m,
              caller: O,
            }),
            [I, N] = t.useState(!1),
            M = (0, l.useCallbackRef)(y),
            k = x(i),
            T = t.useRef(!1),
            [_, D] = t.useState(0);
          return (
            t.useEffect(() => {
              let e = b.current;
              if (e) return (e.addEventListener(C, M), () => e.removeEventListener(C, M));
            }, [M]),
            (0, S.jsx)(A, {
              scope: i,
              orientation: u,
              dir: w,
              loop: f,
              currentTabStopId: P,
              onItemFocus: t.useCallback((e) => j(e), [j]),
              onItemShiftTab: t.useCallback(() => N(!0), []),
              onFocusableItemAdd: t.useCallback(() => D((e) => e + 1), []),
              onFocusableItemRemove: t.useCallback(() => D((e) => e - 1), []),
              children: (0, S.jsx)(s.Primitive.div, {
                tabIndex: I || 0 === _ ? -1 : 0,
                'data-orientation': u,
                ...g,
                ref: E,
                style: { outline: 'none', ...e.style },
                onMouseDown: (0, r.composeEventHandlers)(e.onMouseDown, () => {
                  T.current = !0;
                }),
                onFocus: (0, r.composeEventHandlers)(e.onFocus, (e) => {
                  let t = !T.current;
                  if (e.target === e.currentTarget && t && !I) {
                    let t = new CustomEvent(C, R);
                    if ((e.currentTarget.dispatchEvent(t), !t.defaultPrevented)) {
                      let e = k().filter((e) => e.focusable);
                      U(
                        [e.find((e) => e.active), e.find((e) => e.id === P), ...e]
                          .filter(Boolean)
                          .map((e) => e.ref.current),
                        v,
                      );
                    }
                  }
                  T.current = !1;
                }),
                onBlur: (0, r.composeEventHandlers)(e.onBlur, () => N(!1)),
              }),
            })
          );
        }, 'RovingFocusGroupImpl'),
      ),
      _ = t.forwardRef(
        w(function (e, n) {
          let {
              __scopeRovingFocusGroup: o,
              focusable: i = !0,
              active: l = !1,
              tabStopId: a,
              children: c,
              ...d
            } = e,
            p = (0, u.useId)(),
            h = a || p,
            m = M('RovingFocusGroupItem', o),
            y = m.currentTabStopId === h,
            v = x(o),
            { onFocusableItemAdd: g, onFocusableItemRemove: E, currentTabStopId: w } = m,
            C = b();
          return (
            (0, f.useLayoutEffect)(() => {
              if (C && i) return (g(), () => E());
            }, [C, i, g, E]),
            t.useEffect(() => {
              if (!C && i) return (g(), () => E());
            }, [C, i, g, E]),
            (0, S.jsx)(P.ItemSlot, {
              scope: o,
              id: h,
              focusable: i,
              active: l,
              children: (0, S.jsx)(s.Primitive.span, {
                tabIndex: y ? 0 : -1,
                'data-orientation': m.orientation,
                ...d,
                ref: n,
                onMouseDown: (0, r.composeEventHandlers)(e.onMouseDown, (e) => {
                  i ? m.onItemFocus(h) : e.preventDefault();
                }),
                onFocus: (0, r.composeEventHandlers)(e.onFocus, () => m.onItemFocus(h)),
                onKeyDown: (0, r.composeEventHandlers)(e.onKeyDown, (e) => {
                  if ('Tab' === e.key && e.shiftKey) return void m.onItemShiftTab();
                  if (e.target !== e.currentTarget) return;
                  let t = F(e, m.orientation, m.dir);
                  if (void 0 !== t) {
                    if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
                    e.preventDefault();
                    let r = v()
                      .filter((e) => e.focusable)
                      .map((e) => e.ref.current);
                    if ('last' === t) r.reverse();
                    else if ('prev' === t || 'next' === t) {
                      'prev' === t && r.reverse();
                      let n = r.indexOf(e.currentTarget);
                      r = m.loop ? $(r, n + 1) : r.slice(n + 1);
                    }
                    setTimeout(() => U(r));
                  }
                }),
                children:
                  'function' == typeof c ? c({ isCurrentTabStop: y, hasTabStop: null != w }) : c,
              }),
            })
          );
        }, 'RovingFocusGroupItem'),
      ),
      D = {
        ArrowLeft: 'prev',
        ArrowUp: 'prev',
        ArrowRight: 'next',
        ArrowDown: 'next',
        PageUp: 'first',
        Home: 'first',
        PageDown: 'last',
        End: 'last',
      };
    function L(e, t) {
      return 'rtl' !== t
        ? e
        : 'ArrowLeft' === e
          ? 'ArrowRight'
          : 'ArrowRight' === e
            ? 'ArrowLeft'
            : e;
    }
    function F(e, t, r) {
      let n = L(e.key, r);
      if (
        !('vertical' === t && ['ArrowLeft', 'ArrowRight'].includes(n)) &&
        !('horizontal' === t && ['ArrowUp', 'ArrowDown'].includes(n))
      )
        return D[n];
    }
    function U(e, t = !1) {
      let r = document.activeElement;
      for (let n of e)
        if (n === r || (n.focus({ preventScroll: t }), document.activeElement !== r)) return;
    }
    function $(e, t) {
      return e.map((r, n) => e[(t + n) % e.length]);
    }
    (w(L, 'getDirectionAwareKey'),
      w(F, 'getFocusIntent'),
      w(U, 'focusFirst'),
      w($, 'wrapArray'),
      e.s(['Item', 0, _, 'Root', 0, k, 'createRovingFocusGroupScope', 0, N], 60065));
  },
  32253,
  (e) => {
    'use strict';
    var t = e.i(39380);
    function r(e) {
      let r = t.useRef(e);
      return (
        t.useEffect(() => {
          r.current = e;
        }),
        t.useMemo(
          () =>
            (...e) =>
              r.current?.(...e),
          [],
        )
      );
    }
    ((0, Object.defineProperty)(r, 'name', { value: 'useCallbackRef', configurable: !0 }),
      e.s(['useCallbackRef', 0, r]));
  },
  15671,
  (e) => {
    'use strict';
    var t = e.i(39380),
      r = e.i(99300),
      n = e.i(44532),
      o = Object.defineProperty,
      i = t[' useEffectEvent '.trim().toString()],
      u = t[' useInsertionEffect '.trim().toString()];
    function s(e) {
      if ('function' == typeof i) return i(e);
      let r = t.useRef(() => {
        throw Error('Cannot call an event handler while rendering.');
      });
      return (
        'function' == typeof u
          ? u(() => {
              r.current = e;
            })
          : (0, n.useLayoutEffect)(() => {
              r.current = e;
            }),
        t.useMemo(
          () =>
            (...e) =>
              r.current?.(...e),
          [],
        )
      );
    }
    o(s, 'name', { value: 'useEffectEvent', configurable: !0 });
    var l = Object.defineProperty,
      a = (e, t) => l(e, 'name', { value: t, configurable: !0 }),
      c = t[' useInsertionEffect '.trim().toString()] || n.useLayoutEffect;
    function f({ prop: e, defaultProp: n, onChange: o = a(() => {}, 'onChange'), caller: i }) {
      let [u, s, l] = d({ defaultProp: n, onChange: o }),
        c = void 0 !== e,
        h = c ? e : u;
      if (r.IS_DEVELOPMENT) {
        let r = t.useRef(void 0 !== e);
        t.useEffect(() => {
          let e = r.current;
          if (e !== c) {
            let t = c ? 'controlled' : 'uncontrolled';
            console.warn(
              `${i} is changing from ${e ? 'controlled' : 'uncontrolled'} to ${t}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`,
            );
          }
          r.current = c;
        }, [c, i]);
      }
      return [
        h,
        t.useCallback(
          (t) => {
            if (c) {
              let r = p(t) ? t(e) : t;
              r !== e && l.current?.(r);
            } else s(t);
          },
          [c, e, s, l],
        ),
      ];
    }
    function d({ defaultProp: e, onChange: r }) {
      let [n, o] = t.useState(e),
        i = t.useRef(n),
        u = t.useRef(r);
      return (
        c(() => {
          u.current = r;
        }, [r]),
        t.useEffect(() => {
          i.current !== n && (u.current?.(n), (i.current = n));
        }, [n, i]),
        [n, o, u]
      );
    }
    function p(e) {
      return 'function' == typeof e;
    }
    (a(f, 'useControllableState'), a(d, 'useUncontrolledState'), a(p, 'isFunction'));
    var h = Symbol('RADIX:SYNC_STATE');
    (a(function (e, n, o, i) {
      let { prop: u, defaultProp: l, onChange: a, caller: c } = n,
        f = void 0 !== u,
        d = s(a);
      if (r.IS_DEVELOPMENT) {
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
      let p = [{ ...o, state: l }];
      i && p.push(i);
      let [m, y] = t.useReducer(
          (t, r) => {
            if (r.type === h) return { ...t, state: r.state };
            let n = e(t, r);
            return (f && !Object.is(n.state, t.state) && d(n.state), n);
          },
          ...p,
        ),
        v = m.state,
        g = t.useRef(v);
      t.useEffect(() => {
        g.current !== v && ((g.current = v), f || d(v));
      }, [v, g, f]);
      let b = t.useMemo(() => (void 0 !== u ? { ...m, state: u } : m), [m, u]);
      return (
        t.useEffect(() => {
          f && !Object.is(u, m.state) && y({ type: h, state: u });
        }, [u, m.state, f]),
        [b, y]
      );
    }, 'useControllableStateReducer'),
      e.s(['useControllableState', 0, f], 15671));
  },
  44532,
  (e) => {
    'use strict';
    var t = e.i(39380),
      r = globalThis?.document ? t.useLayoutEffect : () => {};
    e.s(['useLayoutEffect', 0, r]);
  },
  14971,
  (e) => {
    'use strict';
    var t = e.i(39380),
      r = e.i(44532);
    function n(e) {
      let [n, o] = t.useState(void 0);
      return (
        (0, r.useLayoutEffect)(() => {
          if (e) {
            o({ width: e.offsetWidth, height: e.offsetHeight });
            let t = new ResizeObserver((t) => {
              let r, n;
              if (!Array.isArray(t) || !t.length) return;
              let i = t[0];
              if ('borderBoxSize' in i) {
                let e = i.borderBoxSize,
                  t = Array.isArray(e) ? e[0] : e;
                ((r = t.inlineSize), (n = t.blockSize));
              } else ((r = e.offsetWidth), (n = e.offsetHeight));
              o({ width: r, height: n });
            });
            return (t.observe(e, { box: 'border-box' }), () => t.unobserve(e));
          }
          o(void 0);
        }, [e]),
        n
      );
    }
    ((0, Object.defineProperty)(n, 'name', { value: 'useSize', configurable: !0 }),
      e.s(['useSize', 0, n]));
  },
  86304,
  (e) => {
    'use strict';
    let t = (0, e.i(32155).default)('Check', [['path', { d: 'M20 6 9 17l-5-5', key: '1gmf2c' }]]);
    e.s(['Check', 0, t], 86304);
  },
  82939,
  (e, t, r) => {
    'use strict';
    (e.i(70925), Object.defineProperty(r, '__esModule', { value: !0 }));
    var n = {
      default: function () {
        return v;
      },
      useLinkStatus: function () {
        return b;
      },
    };
    for (var o in n) Object.defineProperty(r, o, { enumerable: !0, get: n[o] });
    let i = e.r(56421),
      u = e.r(24830),
      s = i._(e.r(39380)),
      l = e.r(48057),
      a = e.r(67567),
      c = e.r(82240),
      f = e.r(10551),
      d = e.r(34945),
      p = e.r(93607),
      h = e.r(28616),
      m = e.r(31535),
      y = e.r(55451);
    function v(t) {
      var r;
      let n,
        o,
        i,
        [v, b] = (0, s.useOptimistic)(h.IDLE_LINK_STATUS),
        S = (0, s.useRef)(null),
        {
          href: E,
          as: w,
          children: C,
          prefetch: R = null,
          passHref: O,
          replace: P,
          shallow: x,
          scroll: j,
          onClick: I,
          onMouseEnter: N,
          onTouchStart: A,
          legacyBehavior: M = !1,
          onNavigate: k,
          transitionTypes: T,
          ref: _,
          unstable_dynamicOnHover: D,
          ...L
        } = t;
      ((n = C),
        M &&
          ('string' == typeof n || 'number' == typeof n) &&
          (n = (0, u.jsx)('a', { children: n })));
      let F = s.default.useContext(a.AppRouterContext),
        U = !1 !== R,
        $ = !1 === R ? 'none' : !0 === R ? 'full' : 'auto',
        z =
          'none' !== $
            ? 'auto' === $
              ? y.FetchStrategy.PPR
              : y.FetchStrategy.Full
            : y.FetchStrategy.PPR,
        B = 'string' == typeof (r = w || E) ? r : (0, l.formatUrl)(r);
      if (M) {
        if (n?.$$typeof === Symbol.for('react.lazy'))
          throw Object.defineProperty(
            Error(
              "`<Link legacyBehavior>` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's `<a>` tag.",
            ),
            '__NEXT_ERROR_CODE',
            { value: 'E863', enumerable: !1, configurable: !0 },
          );
        o = s.default.Children.only(n);
      }
      let K = M ? o && 'object' == typeof o && o.ref : _,
        H,
        G = s.default.useCallback(
          (e) => (
            null !== F && (S.current = (0, h.mountLinkInstance)(e, B, F, z, U, b, H)),
            () => {
              (S.current && ((0, h.unmountLinkForCurrentNavigation)(S.current), (S.current = null)),
                (0, h.unmountPrefetchableInstance)(e));
            }
          ),
          [U, B, F, z, b, H],
        ),
        W = {
          ref: (0, c.useMergedRef)(G, K),
          onClick(t) {
            (M || 'function' != typeof I || I(t),
              M && o.props && 'function' == typeof o.props.onClick && o.props.onClick(t),
              !F ||
                t.defaultPrevented ||
                (function (t, r, n, o, i, u, l, a = 'none') {
                  if ('u' > typeof window) {
                    let c,
                      { nodeName: f } = t.currentTarget;
                    if (
                      ('A' === f.toUpperCase() &&
                        (((c = t.currentTarget.getAttribute('target')) && '_self' !== c) ||
                          t.metaKey ||
                          t.ctrlKey ||
                          t.shiftKey ||
                          t.altKey ||
                          (t.nativeEvent && 2 === t.nativeEvent.which))) ||
                      t.currentTarget.hasAttribute('download')
                    )
                      return;
                    if (!(0, m.isLocalURL)(r)) {
                      o && (t.preventDefault(), location.replace(r));
                      return;
                    }
                    if ((t.preventDefault(), u)) {
                      let e = !1;
                      if (
                        (u({
                          preventDefault: () => {
                            e = !0;
                          },
                        }),
                        e)
                      )
                        return;
                    }
                    let { dispatchNavigateAction: d } = e.r(95599);
                    s.default.startTransition(() => {
                      d(
                        r,
                        o ? 'replace' : 'push',
                        !1 === i ? p.ScrollBehavior.NoScroll : p.ScrollBehavior.Default,
                        n.current,
                        l,
                        a,
                      );
                    });
                  }
                })(t, B, S, P, j, k, T, $));
          },
          onMouseEnter(e) {
            (M || 'function' != typeof N || N(e),
              M && o.props && 'function' == typeof o.props.onMouseEnter && o.props.onMouseEnter(e),
              F && U && (0, h.onNavigationIntent)(e.currentTarget, !0 === D));
          },
          onTouchStart: function (e) {
            (M || 'function' != typeof A || A(e),
              M && o.props && 'function' == typeof o.props.onTouchStart && o.props.onTouchStart(e),
              F && U && (0, h.onNavigationIntent)(e.currentTarget, !0 === D));
          },
        };
      return (
        (0, f.isAbsoluteUrl)(B)
          ? (W.href = B)
          : (M && !O && ('a' !== o.type || 'href' in o.props)) || (W.href = (0, d.addBasePath)(B)),
        (i = M ? s.default.cloneElement(o, W) : (0, u.jsx)('a', { ...L, ...W, children: n })),
        (0, u.jsx)(g.Provider, { value: v, children: i })
      );
    }
    let g = (0, s.createContext)(h.IDLE_LINK_STATUS),
      b = () => (0, s.useContext)(g);
    ('function' == typeof r.default || ('object' == typeof r.default && null !== r.default)) &&
      void 0 === r.default.__esModule &&
      (Object.defineProperty(r.default, '__esModule', { value: !0 }),
      Object.assign(r.default, r),
      (t.exports = r.default));
  },
  82240,
  (e, t, r) => {
    'use strict';
    (Object.defineProperty(r, '__esModule', { value: !0 }),
      Object.defineProperty(r, 'useMergedRef', {
        enumerable: !0,
        get: function () {
          return o;
        },
      }));
    let n = e.r(39380);
    function o(e, t) {
      let r = (0, n.useRef)(null),
        o = (0, n.useRef)(null);
      return (0, n.useCallback)(
        (n) => {
          if (null === n) {
            let e = r.current;
            e && ((r.current = null), e());
            let t = o.current;
            t && ((o.current = null), t());
          } else (e && (r.current = i(e, n)), t && (o.current = i(t, n)));
        },
        [e, t],
      );
    }
    function i(e, t) {
      if ('function' != typeof e)
        return (
          (e.current = t),
          () => {
            e.current = null;
          }
        );
      {
        let r = e(t);
        return 'function' == typeof r ? r : () => e(null);
      }
    }
    ('function' == typeof r.default || ('object' == typeof r.default && null !== r.default)) &&
      void 0 === r.default.__esModule &&
      (Object.defineProperty(r.default, '__esModule', { value: !0 }),
      Object.assign(r.default, r),
      (t.exports = r.default));
  },
  10551,
  (e, t, r) => {
    'use strict';
    (e.i(70925), Object.defineProperty(r, '__esModule', { value: !0 }));
    var n = {
      DecodeError: function () {
        return v;
      },
      MiddlewareNotFoundError: function () {
        return E;
      },
      MissingStaticPage: function () {
        return S;
      },
      NormalizeError: function () {
        return g;
      },
      PageNotFoundError: function () {
        return b;
      },
      SP: function () {
        return m;
      },
      ST: function () {
        return y;
      },
      WEB_VITALS: function () {
        return i;
      },
      execOnce: function () {
        return u;
      },
      getDisplayName: function () {
        return f;
      },
      getLocationOrigin: function () {
        return a;
      },
      getURL: function () {
        return c;
      },
      isAbsoluteUrl: function () {
        return l;
      },
      isResSent: function () {
        return d;
      },
      loadGetInitialProps: function () {
        return h;
      },
      normalizeRepeatedSlashes: function () {
        return p;
      },
      stringifyError: function () {
        return w;
      },
    };
    for (var o in n) Object.defineProperty(r, o, { enumerable: !0, get: n[o] });
    let i = ['CLS', 'FCP', 'FID', 'INP', 'LCP', 'TTFB'];
    function u(e) {
      let t,
        r = !1;
      return (...n) => (r || ((r = !0), (t = e(...n))), t);
    }
    let s = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/,
      l = (e) => {
        let t = e.charCodeAt(0);
        return !!((t >= 65 && t <= 90) || (t >= 97 && t <= 122)) && s.test(e);
      };
    function a() {
      let { protocol: e, hostname: t, port: r } = window.location;
      return `${e}//${t}${r ? ':' + r : ''}`;
    }
    function c() {
      let { href: e } = window.location,
        t = a();
      return e.substring(t.length);
    }
    function f(e) {
      return 'string' == typeof e ? e : e.displayName || e.name || 'Unknown';
    }
    function d(e) {
      return e.finished || e.headersSent;
    }
    function p(e) {
      let t = e.split('?');
      return (
        t[0].replace(/\\/g, '/').replace(/\/\/+/g, '/') + (t[1] ? `?${t.slice(1).join('?')}` : '')
      );
    }
    async function h(e, t) {
      let r = t.res || (t.ctx && t.ctx.res);
      if (!e.getInitialProps)
        return t.ctx && t.Component ? { pageProps: await h(t.Component, t.ctx) } : {};
      let n = await e.getInitialProps(t);
      if (r && d(r)) return n;
      if (!n)
        throw Object.defineProperty(
          Error(
            `"${f(e)}.getInitialProps()" should resolve to an object. But found "${n}" instead.`,
          ),
          '__NEXT_ERROR_CODE',
          { value: 'E1025', enumerable: !1, configurable: !0 },
        );
      return n;
    }
    let m = 'u' > typeof performance,
      y =
        m &&
        ['mark', 'measure', 'getEntriesByName'].every((e) => 'function' == typeof performance[e]);
    class v extends Error {}
    class g extends Error {}
    class b extends Error {
      constructor(e) {
        (super(),
          (this.code = 'ENOENT'),
          (this.name = 'PageNotFoundError'),
          (this.message = `Cannot find module for page: ${e}`));
      }
    }
    class S extends Error {
      constructor(e, t) {
        (super(), (this.message = `Failed to load static file for page: ${e} ${t}`));
      }
    }
    class E extends Error {
      constructor() {
        (super(), (this.code = 'ENOENT'), (this.message = 'Cannot find the middleware module'));
      }
    }
    function w(e) {
      return JSON.stringify({ message: e.message, stack: e.stack });
    }
  },
  31535,
  (e, t, r) => {
    'use strict';
    (Object.defineProperty(r, '__esModule', { value: !0 }),
      Object.defineProperty(r, 'isLocalURL', {
        enumerable: !0,
        get: function () {
          return i;
        },
      }));
    let n = e.r(10551),
      o = e.r(55996);
    function i(e) {
      if (!(0, n.isAbsoluteUrl)(e)) return !0;
      try {
        let t = (0, n.getLocationOrigin)(),
          r = new URL(e, t);
        return r.origin === t && (0, o.hasBasePath)(r.pathname);
      } catch (e) {
        return !1;
      }
    }
  },
  35453,
  (e, t, r) => {
    'use strict';
    Object.defineProperty(r, '__esModule', { value: !0 });
    var n = {
      assign: function () {
        return l;
      },
      searchParamsToUrlQuery: function () {
        return i;
      },
      urlQueryToSearchParams: function () {
        return s;
      },
    };
    for (var o in n) Object.defineProperty(r, o, { enumerable: !0, get: n[o] });
    function i(e) {
      let t = {};
      for (let [r, n] of e.entries()) {
        let e = t[r];
        void 0 === e ? (t[r] = n) : Array.isArray(e) ? e.push(n) : (t[r] = [e, n]);
      }
      return t;
    }
    function u(e) {
      return 'string' == typeof e
        ? e
        : ('number' != typeof e || isNaN(e)) && 'boolean' != typeof e
          ? ''
          : String(e);
    }
    function s(e) {
      let t = new URLSearchParams();
      for (let [r, n] of Object.entries(e))
        if (Array.isArray(n)) for (let e of n) t.append(r, u(e));
        else t.set(r, u(n));
      return t;
    }
    function l(e, ...t) {
      for (let r of t) {
        for (let t of r.keys()) e.delete(t);
        for (let [t, n] of r.entries()) e.append(t, n);
      }
      return e;
    }
  },
  48057,
  (e, t, r) => {
    'use strict';
    (e.i(70925), Object.defineProperty(r, '__esModule', { value: !0 }));
    var n = {
      formatUrl: function () {
        return s;
      },
      formatWithValidation: function () {
        return a;
      },
      urlObjectKeys: function () {
        return l;
      },
    };
    for (var o in n) Object.defineProperty(r, o, { enumerable: !0, get: n[o] });
    let i = e.r(56421)._(e.r(35453)),
      u = /https?|ftp|gopher|file/;
    function s(e) {
      let { auth: t, hostname: r } = e,
        n = e.protocol || '',
        o = e.pathname || '',
        s = e.hash || '',
        l = e.query || '',
        a = !1;
      ((t = t ? encodeURIComponent(t).replace(/%3A/i, ':') + '@' : ''),
        e.host
          ? (a = t + e.host)
          : r && ((a = t + (~r.indexOf(':') ? `[${r}]` : r)), e.port && (a += ':' + e.port)),
        l && 'object' == typeof l && (l = String(i.urlQueryToSearchParams(l))));
      let c = e.search || (l && `?${l}`) || '';
      return (
        n && !n.endsWith(':') && (n += ':'),
        e.slashes || ((!n || u.test(n)) && !1 !== a)
          ? ((a = '//' + (a || '')), o && '/' !== o[0] && (o = '/' + o))
          : a || (a = ''),
        s && '#' !== s[0] && (s = '#' + s),
        c && '?' !== c[0] && (c = '?' + c),
        (o = o.replace(/[?#]/g, encodeURIComponent)),
        (c = c.replace('#', '%23')),
        `${n}${a}${o}${c}${s}`
      );
    }
    let l = [
      'auth',
      'hash',
      'host',
      'hostname',
      'href',
      'path',
      'pathname',
      'port',
      'protocol',
      'query',
      'search',
      'slashes',
    ];
    function a(e) {
      return s(e);
    }
  },
]);
