(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  'object' == typeof document ? document.currentScript : void 0,
  64282,
  (e) => {
    'use strict';
    var t = e.i(24830),
      r = e.i(39380),
      a = e.i(80360),
      s = (e) => e instanceof Date,
      i = (e) => null == e,
      l = (e) => !i(e) && !Array.isArray(e) && 'object' == typeof e && !s(e);
    let n = /[.[\]'"]/;
    var o = (e) => e.split(n).filter(Boolean),
      u = 'u' > typeof window && void 0 !== window.HTMLElement && 'u' > typeof document;
    function d(e) {
      if (null === e || 'object' != typeof e) return e;
      if (e instanceof Date) return new Date(e);
      let t = 'u' > typeof Blob && e instanceof Blob,
        r = 'u' > typeof FileList && e instanceof FileList;
      if (u && (t || r)) return e;
      let a = Array.isArray(e);
      if (!a && e.constructor !== Object) return e;
      let s = a ? [] : Object.create(Object.getPrototypeOf(e));
      for (let t in e) Object.prototype.hasOwnProperty.call(e, t) && (s[t] = d(e[t]));
      return s;
    }
    let f = 'trigger',
      c = 'onChange',
      m = 'onSubmit',
      y = 'maxLength',
      h = 'minLength',
      p = 'pattern',
      v = 'required',
      g = 'validate',
      b = 'root',
      x = ['__proto__', 'constructor', 'prototype'],
      k = /^\w*$/;
    var w = (e) => void 0 === e,
      V = (e, t, r) => {
        if (!t || !l(e)) return r;
        let a = k.test(t) ? [t] : o(t);
        if (a.some((e) => x.includes(e))) return r;
        let s = a.reduce((e, t) => (i(e) ? void 0 : e[t]), e);
        return w(s) || s === e ? (w(e[t]) ? r : e[t]) : s;
      },
      A = (e) => 'function' == typeof e,
      _ = (e, t, r) => {
        let a = -1,
          s = k.test(t) ? [t] : o(t),
          i = s.length,
          n = i - 1;
        for (; ++a < i;) {
          let t = s[a],
            i = r;
          if (a !== n) {
            let r = e[t];
            i = l(r) || Array.isArray(r) ? r : isNaN(+s[a + 1]) ? {} : [];
          }
          if (x.includes(t)) return;
          ((e[t] = i), (e = e[t]));
        }
      };
    r.default.createContext(null).displayName = 'HookFormControlContext';
    let j = u ? r.default.useLayoutEffect : r.default.useEffect;
    var F = (e) => i(e) || 'object' != typeof e;
    let S = (e, t) => {
      let r;
      return (
        0 === t.length &&
        !Array.isArray(e) &&
        !(l((r = e.constructor && e.constructor.prototype)) && r.hasOwnProperty('isPrototypeOf'))
      );
    };
    function E(e, t, r = new WeakMap()) {
      if (e === t) return !0;
      if (F(e) || F(t)) return Object.is(e, t);
      if (s(e) && s(t)) return Object.is(e.getTime(), t.getTime());
      let a = Object.keys(e),
        i = Object.keys(t);
      if (a.length !== i.length) return !1;
      if (S(e, a) || S(t, i)) return Object.is(e, t);
      if (!a.length && Array.isArray(e) !== Array.isArray(t)) return !1;
      let n = r.get(e);
      if (n && n.has(t)) return !0;
      if (n) n.add(t);
      else {
        let a = new WeakSet();
        (a.add(t), r.set(e, a));
      }
      for (let i of a) {
        let a = e[i];
        if (!(i in t)) return !1;
        if ('ref' !== i) {
          let e = t[i];
          if (
            (s(a) && s(e)) || ((l(a) || Array.isArray(a)) && (l(e) || Array.isArray(e)))
              ? !E(a, e, r)
              : !Object.is(a, e)
          )
            return !1;
        }
      }
      return !0;
    }
    var N = (e) => 'string' == typeof e,
      O = (e) => ({
        isOnSubmit: !e || e === m,
        isOnBlur: 'onBlur' === e,
        isOnChange: e === c,
        isOnAll: 'all' === e,
        isOnTouch: 'onTouched' === e,
      }),
      C = (e, t, r) => {
        if (r) return !1;
        if (t.watchAll || t.watch.has(e)) return !0;
        for (let r of t.watch) if (e.startsWith(r) && '.' === e.charAt(r.length)) return !0;
        return !1;
      };
    let D = (e, t, r) => {
      for (let a of r || Object.keys(e)) {
        if ('_f' === a) continue;
        let s = r ? V(e, a) : e[a];
        if (s) {
          let { _f: e } = s;
          if (e) {
            if (e.refs && e.refs[0] && t(e.refs[0], e.name)) return !0;
            else if (e.ref && t(e.ref, e.name)) return !0;
            else if (D(s, t)) return !0;
          } else if ((l(s) || Array.isArray(s)) && D(s, t)) return !0;
        }
      }
    };
    var R = (e, t, r) => {
        let a = V(e, r),
          s = Array.isArray(a) ? a : [];
        return (_(s, b, t[r]), _(e, r, s), e);
      },
      T = (e) => l(e) && !Object.keys(e).length,
      L = (e) => {
        if (!u) return !1;
        let t = e ? e.ownerDocument : 0;
        return e instanceof (t && t.defaultView ? t.defaultView.HTMLElement : HTMLElement);
      },
      P = (e, t, r, a, s) =>
        t ? { ...r[e], types: { ...(r[e] && r[e].types ? r[e].types : {}), [a]: s || !0 } } : {};
    let I = { value: !1, isValid: !1 },
      M = { value: !0, isValid: !0 };
    var U = (e) => {
      if (!Array.isArray(e)) return I;
      if (e.length > 1) {
        let t = e.filter((e) => e && e.checked && !e.disabled).map((e) => e.value);
        return { value: t, isValid: !!t.length };
      }
      let t = e[0];
      return t && t.checked && !t.disabled
        ? t.attributes && 'value' in t.attributes
          ? w(t.value) || '' === t.value
            ? M
            : { value: t.value, isValid: !0 }
          : M
        : I;
    };
    let B = { isValid: !1, value: null };
    var z = (e) =>
      Array.isArray(e)
        ? e.reduce(
            (e, t) => (t && t.checked && !t.disabled ? { isValid: !0, value: t.value } : e),
            B,
          )
        : B;
    function $(e, t, r = 'validate') {
      if (N(e) || (Array.isArray(e) && e.every(N)) || ('boolean' == typeof e && !e))
        return { type: r, message: N(e) ? e : '', ref: t };
    }
    var W = (e) => (!l(e) || e instanceof RegExp ? { value: e, message: '' } : e),
      H = async (e, t, r, a, n, o) => {
        let {
            ref: u,
            refs: d,
            required: f,
            maxLength: c,
            minLength: m,
            min: b,
            max: x,
            pattern: k,
            validate: _,
            name: j,
            valueAsNumber: F,
            mount: S,
          } = e._f,
          E = V(r, j);
        if (!S || t.has(j)) return {};
        let O = d ? d[0] : u,
          C = (e) => {
            if (n && O.reportValidity) {
              let t = 'boolean' == typeof e ? '' : e || '';
              (d ? d.forEach((e) => e.setCustomValidity(t)) : O.setCustomValidity(t),
                O.reportValidity());
            }
          },
          D = {},
          R = 'radio' === u.type,
          I = 'checkbox' === u.type,
          M =
            ((F || 'file' === u.type) && w(u.value) && w(E)) ||
            (L(u) && '' === u.value) ||
            '' === E ||
            (Array.isArray(E) && !E.length),
          B = P.bind(null, j, a, D),
          H = (e, t, r, a = y, s = h) => {
            let i = e ? t : r;
            D[j] = { type: e ? a : s, message: i, ref: u, ...B(e ? a : s, i) };
          };
        if (
          o
            ? !Array.isArray(E) || !E.length
            : f &&
              ((!(R || I) && (M || i(E))) ||
                ('boolean' == typeof E && !E) ||
                (I && !U(d).isValid) ||
                (R && !z(d).isValid))
        ) {
          let { value: e, message: t } = N(f) ? { value: !!f, message: f } : W(f);
          if (e && ((D[j] = { type: v, message: t, ref: O, ...B(v, t) }), !a)) return (C(t), D);
        }
        if (!M && (!i(b) || !i(x))) {
          let e,
            t,
            r = W(x),
            l = W(b);
          if (i(E) || s(E) || isNaN(E)) {
            let a = u.valueAsDate || new Date(E),
              s = (e) => new Date(new Date().toDateString() + ' ' + e),
              i = 'time' == u.type,
              n = 'week' == u.type;
            (N(r.value) &&
              E &&
              (e = i ? s(E) > s(r.value) : n ? E > r.value : a > new Date(r.value)),
              N(l.value) &&
                E &&
                (t = i ? s(E) < s(l.value) : n ? E < l.value : a < new Date(l.value)));
          } else {
            let a = u.valueAsNumber || (E ? +E : E);
            (i(r.value) || (e = a > r.value), i(l.value) || (t = a < l.value));
          }
          if ((e || t) && (H(!!e, r.message, l.message, 'max', 'min'), !a))
            return (C(D[j].message), D);
        }
        if ((c || m) && !M && (N(E) || (o && Array.isArray(E)))) {
          let e = W(c),
            t = W(m),
            r = !i(e.value) && E.length > +e.value,
            s = !i(t.value) && E.length < +t.value;
          if ((r || s) && (H(r, e.message, t.message), !a)) return (C(D[j].message), D);
        }
        if (k && !M && N(E)) {
          let { value: e, message: t } = W(k);
          if (
            e instanceof RegExp &&
            !E.match(e) &&
            ((D[j] = { type: p, message: t, ref: u, ...B(p, t) }), !a)
          )
            return (C(t), D);
        }
        if (_) {
          if (A(_)) {
            let e = $(await _(E, r), O);
            if (e && ((D[j] = { ...e, ...B(g, e.message) }), !a)) return (C(e.message), D);
          } else if (l(_)) {
            let e = {};
            for (let t in _) {
              if (!T(e) && !a) break;
              let s = $(await _[t](E, r), O, t);
              s && ((e = { ...s, ...B(t, s.message) }), a || C(s.message), a && (D[j] = e));
            }
            if (!T(e) && ((D[j] = { ref: O, ...e }), !a)) return D;
          }
        }
        let q = D[j];
        return (C(!q || q.message), D);
      },
      q = (e) => (Array.isArray(e) ? e : [e]),
      K = (e) => (Array.isArray(e) ? e.filter(Boolean) : []);
    function Z(e, t) {
      if (N(t) && Object.prototype.hasOwnProperty.call(e, t)) return (delete e[t], e);
      let r = Array.isArray(t) ? t : k.test(t) ? [t] : o(t);
      if (r.some((e) => x.includes(String(e)))) return e;
      let a =
          1 === r.length
            ? e
            : (function (e, t) {
                let r = t.length - 1,
                  a = 0;
                for (; a < r;) {
                  if (i(e)) {
                    e = void 0;
                    break;
                  }
                  ((e = e[t[a]]), a++);
                }
                return e;
              })(e, r),
        s = r.length - 1,
        n = r[s];
      return (
        a && delete a[n],
        0 !== s &&
          ((l(a) && T(a)) ||
            (Array.isArray(a) &&
              (function (e) {
                for (let t in e) if (e.hasOwnProperty(t) && !w(e[t])) return !1;
                return !0;
              })(a))) &&
          Z(e, r.slice(0, -1)),
        e
      );
    }
    r.default.createContext(null).displayName = 'HookFormContext';
    var J = () => {
      let e = [];
      return {
        get observers() {
          return e;
        },
        next: (t) => {
          for (let r of e) r.next && r.next(t);
        },
        subscribe: (t) => (
          e.push(t),
          {
            unsubscribe: () => {
              e = e.filter((e) => e !== t);
            },
          }
        ),
        unsubscribe: () => {
          e = [];
        },
      };
    };
    let X = (e, t) =>
      null !== e && 'object' == typeof e && Object.prototype.hasOwnProperty.call(e, t);
    var G = (e, t) => {
        if (!t) return !1;
        let r = e;
        for (let a of k.test(t) ? [t] : o(t)) {
          if (!X(r, a)) return X(e, t);
          r = r[a];
        }
        return !0;
      },
      Q = (e) => L(e) && e.isConnected;
    function Y(e) {
      return Array.isArray(e) || l(e);
    }
    function ee(e) {
      return (
        Array.isArray(e) ||
        (l(e) &&
          !((e) => {
            for (let t in e) if (A(e[t])) return !0;
            return !1;
          })(e))
      );
    }
    function et(e) {
      return !!(e && '_f' in e);
    }
    function er(e) {
      return Array.isArray(e) ? !e.some((e) => !w(e)) : !Object.keys(e).length;
    }
    function ea(e, t) {
      Array.isArray(e) ? (e[t] = void 0) : delete e[t];
    }
    function es(e, t = {}, r) {
      for (let a in e) {
        let s = e[a],
          i = r && r[a];
        !ee(s) || (Array.isArray(s) && et(i))
          ? w(s) || (t[a] = !0)
          : ((t[a] = Array.isArray(s) ? [] : {}), es(s, t[a], i), er(t[a]) && ea(t, a));
      }
      return t;
    }
    function ei(e, t, r, a) {
      for (let s in (r || (r = es(t, {}, a)), e)) {
        let l = e[s],
          n = a && a[s];
        !ee(l) || (Array.isArray(l) && et(n))
          ? E(l, t[s])
            ? ea(r, s)
            : (r[s] = !0)
          : (w(t) || F(r[s])
              ? (r[s] = es(l, Array.isArray(l) ? [] : {}, n))
              : ei(l, i(t) ? {} : t[s], r[s], n),
            er(r[s]) && ea(r, s));
      }
      return r;
    }
    var el = (e, { valueAsNumber: t, valueAsDate: r, setValueAs: a }) =>
      w(e) ? e : t ? ('' === e ? NaN : e ? +e : e) : r && N(e) ? new Date(e) : a ? a(e) : e;
    function en(e) {
      let t = e.ref;
      return 'file' === t.type
        ? t.files
        : 'radio' === t.type
          ? z(e.refs).value
          : 'select-multiple' === t.type
            ? [...t.selectedOptions].map(({ value: e }) => e)
            : 'checkbox' === t.type
              ? U(e.refs).value
              : el(t.value, e);
    }
    var eo = (e) =>
      w(e)
        ? e
        : e instanceof RegExp
          ? e.source
          : l(e)
            ? e.value instanceof RegExp
              ? e.value.source
              : e.value
            : e;
    let eu = 'AsyncFunction';
    var ed = (e) => {
      if (!e || !e.validate) return !1;
      if (A(e.validate)) return e.validate.constructor.name === eu;
      if (l(e.validate)) {
        for (let t in e.validate) if (e.validate[t].constructor.name === eu) return !0;
      }
      return !1;
    };
    function ef(e, t, r) {
      let a = V(e, r);
      if ((null == a ? void 0 : a.type) || (null == a ? void 0 : a.message) || Array.isArray(a))
        return { error: a, name: r };
      let s = r.split('.');
      for (; s.length;) {
        let a = s.join('.'),
          i = V(t, a),
          l = V(e, a);
        if (i && !Array.isArray(i) && r !== a) break;
        if (l && l.type) return { name: a, error: l };
        if (l && l.root && l.root.type) return { name: `${a}.root`, error: l.root };
        s.pop();
      }
      return { name: r };
    }
    let ec = { mode: m, reValidateMode: c, shouldFocusError: !0 },
      em = 'form',
      ey = {
        submitCount: 0,
        isDirty: !1,
        isReady: !1,
        isValidating: !1,
        isSubmitted: !1,
        isSubmitting: !1,
        isSubmitSuccessful: !1,
        isValid: !1,
        touchedFields: {},
        dirtyFields: {},
        validatingFields: {},
      },
      eh = (e, t, r) => {
        if (e && 'reportValidity' in e) {
          let a = V(r, t);
          (e.setCustomValidity((a && a.message) || ''), e.reportValidity());
        }
      },
      ep = (e, t) => {
        for (let r in t.fields) {
          let a = t.fields[r];
          a && a.ref && 'reportValidity' in a.ref
            ? eh(a.ref, r, e)
            : a && a.refs && a.refs.forEach((t) => eh(t, r, e));
        }
      },
      ev = (e, t) => {
        t.shouldUseNativeValidation && ep(e, t);
        let r = {};
        for (let a in e) {
          let s = V(t.fields, a),
            i = Object.assign(e[a] || {}, { ref: s && s.refs ? s.refs[0] : s && s.ref });
          if (eg(t.names || Object.keys(e), a)) {
            let e = Object.assign({}, V(r, a));
            (_(e, 'root', i), _(r, a, e));
          } else _(r, a, i);
        }
        return r;
      },
      eg = (e, t) => {
        let r = eb(t).replace(/[.*+?^${}()|\\]/g, '\\$&');
        return e.some((e) => eb(e).match(`^${r}\\.\\d+`));
      };
    function eb(e) {
      return e.replace(/\[(\d+)]/g, '.$1').replace(/[[\]]/g, '');
    }
    function ex() {
      return (ex = Object.assign.bind()).apply(null, arguments);
    }
    function ek(e, t) {
      try {
        var r = e();
      } catch (e) {
        return t(e);
      }
      return r && r.then ? r.then(void 0, t) : r;
    }
    var ew = e.i(77829),
      eV = e.i(32155);
    let eA = (0, eV.default)('Eye', [
        [
          'path',
          {
            d: 'M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0',
            key: '1nclc0',
          },
        ],
        ['circle', { cx: '12', cy: '12', r: '3', key: '1v7zrd' }],
      ]),
      e_ = (0, eV.default)('EyeOff', [
        [
          'path',
          {
            d: 'M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49',
            key: 'ct8e1f',
          },
        ],
        ['path', { d: 'M14.084 14.158a3 3 0 0 1-4.242-4.242', key: '151rxh' }],
        [
          'path',
          {
            d: 'M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143',
            key: '13bj9a',
          },
        ],
        ['path', { d: 'm2 2 20 20', key: '1ooewy' }],
      ]),
      ej = (0, eV.default)('LoaderCircle', [
        ['path', { d: 'M21 12a9 9 0 1 1-6.219-8.56', key: '13zald' }],
      ]);
    var eF = e.i(11744),
      eS = e.i(36023),
      eE = e.i(2863),
      eN = e.i(50123),
      eO = e.i(66100),
      eC = e.i(64145),
      eD = e.i(43836),
      eR = e.i(15671),
      eT = e.i(14971),
      eL = e.i(97611),
      eP = e.i(78238),
      eI = Object.defineProperty,
      eM = (e, t) => eI(e, 'name', { value: t, configurable: !0 }),
      eU = 'Checkbox',
      [eB, ez] = (0, eC.createContextScope)(eU),
      [e$, eW] = eB(eU);
    function eH(e) {
      let {
          __scopeCheckbox: a,
          checked: s,
          children: i,
          defaultChecked: l,
          disabled: n,
          form: o,
          name: u,
          onCheckedChange: d,
          required: f,
          value: c = 'on',
          internal_do_not_use_render: m,
        } = e,
        [y, h] = (0, eR.useControllableState)({
          prop: s,
          defaultProp: l ?? !1,
          onChange: d,
          caller: eU,
        }),
        [p, v] = r.useState(null),
        [g, b] = r.useState(null),
        x = r.useRef(!1),
        [k, w] = r.useReducer((e) => e + 1, 0),
        V = !p || !!o || !!p.closest('form'),
        A = {
          checked: y,
          disabled: n,
          setChecked: h,
          control: p,
          setControl: v,
          name: u,
          form: o,
          value: c,
          hasConsumerStoppedPropagationRef: x,
          userInteractionCount: k,
          onUserInteraction: w,
          required: f,
          defaultChecked: !eG(l) && l,
          isFormControl: V,
          bubbleInput: g,
          setBubbleInput: b,
        };
      return (0, t.jsx)(e$, { scope: a, ...A, children: eX(m) ? m(A) : i });
    }
    eM(eH, 'CheckboxProvider');
    var eq = r.forwardRef(
        eM(function ({ __scopeCheckbox: e, onKeyDown: a, onClick: s, ...i }, l) {
          let {
              control: n,
              value: o,
              disabled: u,
              checked: d,
              required: f,
              setControl: c,
              setChecked: m,
              hasConsumerStoppedPropagationRef: y,
              onUserInteraction: h,
              isFormControl: p,
              bubbleInput: v,
            } = eW('CheckboxTrigger', e),
            g = (0, eO.useComposedRefs)(l, c),
            b = r.useRef(d);
          return (
            r.useEffect(() => {
              let e = n?.form;
              if (e) {
                let t = eM(() => m(b.current), 'reset');
                return (e.addEventListener('reset', t), () => e.removeEventListener('reset', t));
              }
            }, [n, m]),
            (0, t.jsx)(eP.Primitive.button, {
              type: 'button',
              role: 'checkbox',
              'aria-checked': eG(d) ? 'mixed' : d,
              'aria-required': f,
              'data-state': eQ(d),
              'data-disabled': u ? '' : void 0,
              disabled: u,
              value: o,
              ...i,
              ref: g,
              onKeyDown: (0, eD.composeEventHandlers)(a, (e) => {
                'Enter' === e.key && e.preventDefault();
              }),
              onClick: (0, eD.composeEventHandlers)(s, (e) => {
                (h(),
                  m((e) => !!eG(e) || !e),
                  v &&
                    p &&
                    ((y.current = e.isPropagationStopped()), y.current || e.stopPropagation()));
              }),
            })
          );
        }, 'CheckboxTrigger'),
      ),
      eK = r.forwardRef(
        eM(function (e, r) {
          let {
            __scopeCheckbox: a,
            name: s,
            checked: i,
            defaultChecked: l,
            required: n,
            disabled: o,
            value: u,
            onCheckedChange: d,
            form: f,
            ...c
          } = e;
          return (0, t.jsx)(eH, {
            __scopeCheckbox: a,
            checked: i,
            defaultChecked: l,
            disabled: o,
            required: n,
            onCheckedChange: d,
            name: s,
            form: f,
            value: u,
            internal_do_not_use_render: ({ isFormControl: e }) =>
              (0, t.jsxs)(t.Fragment, {
                children: [
                  (0, t.jsx)(eq, { ...c, ref: r, __scopeCheckbox: a }),
                  e && (0, t.jsx)(eJ, { __scopeCheckbox: a }),
                ],
              }),
          });
        }, 'Checkbox'),
      ),
      eZ = r.forwardRef(
        eM(function (e, r) {
          let { __scopeCheckbox: a, forceMount: s, ...i } = e,
            l = eW('CheckboxIndicator', a);
          return (0, t.jsx)(eL.Presence, {
            present: s || eG(l.checked) || !0 === l.checked,
            children: (0, t.jsx)(eP.Primitive.span, {
              'data-state': eQ(l.checked),
              'data-disabled': l.disabled ? '' : void 0,
              ...i,
              ref: r,
              style: { pointerEvents: 'none', ...e.style },
            }),
          });
        }, 'CheckboxIndicator'),
      ),
      eJ = r.forwardRef(
        eM(function ({ __scopeCheckbox: e, onClick: a, ...s }, i) {
          let {
              control: l,
              hasConsumerStoppedPropagationRef: n,
              userInteractionCount: o,
              checked: u,
              defaultChecked: d,
              required: f,
              disabled: c,
              name: m,
              value: y,
              form: h,
              bubbleInput: p,
              setBubbleInput: v,
            } = eW('CheckboxBubbleInput', e),
            g = (0, eO.useComposedRefs)(i, v),
            b = (0, eT.useSize)(l),
            x = r.useRef(!1),
            k = r.useRef(u),
            w = r.useRef(o);
          r.useEffect(() => {
            if (!p) return;
            let e = Object.getOwnPropertyDescriptor(
                window.HTMLInputElement.prototype,
                'checked',
              ).set,
              t = o !== w.current;
            w.current = o;
            let r = k.current !== u;
            k.current = u;
            let a = !(t && n.current);
            if (r && e) {
              x.current = !t;
              let r = new Event('click', { bubbles: a });
              ((p.indeterminate = eG(u)),
                e.call(p, !eG(u) && u),
                p.dispatchEvent(r),
                (x.current = !1));
            }
          }, [p, u, n, o]);
          let V = r.useRef(!eG(u) && u);
          return (0, t.jsx)(eP.Primitive.input, {
            type: 'checkbox',
            'aria-hidden': !0,
            defaultChecked: d ?? V.current,
            required: f,
            disabled: c,
            name: m,
            value: y,
            form: h,
            ...s,
            tabIndex: -1,
            ref: g,
            onClick: (0, eD.composeEventHandlers)(a, (e) => {
              x.current && e.stopPropagation();
            }),
            style: {
              ...s.style,
              ...b,
              position: 'absolute',
              pointerEvents: 'none',
              opacity: 0,
              margin: 0,
              transform: 'translateX(-100%)',
            },
          });
        }, 'CheckboxBubbleInput'),
      );
    function eX(e) {
      return 'function' == typeof e;
    }
    function eG(e) {
      return 'indeterminate' === e;
    }
    function eQ(e) {
      return eG(e) ? 'indeterminate' : e ? 'checked' : 'unchecked';
    }
    (eM(eX, 'isFunction'), eM(eG, 'isIndeterminate'), eM(eQ, 'getState'));
    var eY = e.i(86304),
      e0 = e.i(59992);
    let e1 = r.forwardRef(({ className: e, ...r }, a) =>
      (0, t.jsx)(eK, {
        ref: a,
        className: (0, e0.cn)(
          'peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
          e,
        ),
        ...r,
        children: (0, t.jsx)(eZ, {
          className: (0, e0.cn)('flex items-center justify-center text-current'),
          children: (0, t.jsx)(eY.Check, { className: 'h-4 w-4' }),
        }),
      }),
    );
    e1.displayName = eK.displayName;
    var e4 = e.i(53119),
      e2 = e.i(85092);
    let e5 = ew.z.object({
        email: ew.z
          .string()
          .trim()
          .toLowerCase()
          .min(1, 'Email wajib diisi')
          .email('Email tidak valid')
          .max(254, 'Email terlalu panjang'),
        password: ew.z
          .string()
          .min(8, 'Password minimal 8 karakter')
          .max(128, 'Password terlalu panjang'),
        remember: ew.z.boolean(),
      }),
      e6 = ew.z.object({
        user: ew.z.object({
          userId: ew.z.string().min(1).max(128),
          tenantId: ew.z.string().min(1).max(128),
          roles: ew.z.array(ew.z.string().min(1).max(64)).min(1).max(20),
          email: ew.z.string().max(254),
        }),
      });
    e.s(
      [
        'LoginForm',
        0,
        function ({ returnTo: e }) {
          let n = (0, a.useRouter)(),
            { login: c } = (0, e4.useAuth)(),
            [m, y] = (0, r.useState)(!1),
            [h, p] = (0, r.useState)(null),
            [v, x] = (0, r.useState)(!1),
            F = (function (e = {}) {
              let t,
                a,
                n,
                c,
                m = r.default.useRef(void 0),
                y = r.default.useRef(void 0),
                h = r.default.useRef(e.formControl),
                [p, v] = r.default.useState(() => ({
                  ...d(ey),
                  isLoading: A(e.defaultValues),
                  errors: e.errors || {},
                  disabled: e.disabled || !1,
                  defaultValues: A(e.defaultValues) ? void 0 : e.defaultValues,
                }));
              if (!m.current || (e.formControl && h.current !== e.formControl))
                if (((h.current = e.formControl), e.formControl))
                  ((m.current = { ...e.formControl, formState: p }),
                    e.defaultValues &&
                      !A(e.defaultValues) &&
                      e.formControl.reset(e.defaultValues, e.resetOptions));
                else {
                  let { formControl: t, ...r } = (function (e = {}) {
                    let t = { ...ec, ...e },
                      r = {
                        ...d(ey),
                        isLoading: A(t.defaultValues),
                        errors: t.errors || {},
                        disabled: t.disabled || !1,
                      },
                      a = {},
                      n =
                        ((l(t.defaultValues) || l(t.values)) && d(t.defaultValues || t.values)) ||
                        {},
                      c = t.shouldUnregister ? {} : d(n),
                      m = {
                        action: !1,
                        actionArrayLengths: new Map(),
                        mount: !1,
                        watch: !1,
                        keepIsValid: !1,
                      },
                      y = {
                        mount: new Set(),
                        disabled: new Set(),
                        unMount: new Set(),
                        array: new Set(),
                        watch: new Set(),
                        registerName: new Set(),
                      },
                      h = {},
                      p = {},
                      v = 0,
                      x = O(t.mode),
                      j = O(t.reValidateMode),
                      F = {
                        isDirty: !1,
                        dirtyFields: !1,
                        validatingFields: !1,
                        touchedFields: !1,
                        isValidating: !1,
                        isValid: !1,
                        errors: !1,
                      },
                      S = { ...F },
                      P = { ...S },
                      I = (...e) => e.some((e) => S[e] || P[e]),
                      M = { array: J(), state: J() },
                      U = 0,
                      B = 0,
                      z = 'all' === t.criteriaMode,
                      $ = (e, t) => (r) => {
                        (clearTimeout(p[e]), (p[e] = setTimeout(t, r)));
                      },
                      W = (e) => {
                        (clearTimeout(p[e]), delete p[e], delete h[e]);
                      },
                      X = (e) => {
                        W(e);
                        let t = `${e}.`;
                        for (let e of Object.keys(h)) e.startsWith(t) && W(e);
                      },
                      ee = async (e) => {
                        if (!m.keepIsValid && !t.disabled && (I('isValid') || e)) {
                          let e,
                            s = ++U;
                          (t.resolver
                            ? ((e = T((await eh()).errors)), s === U && et())
                            : (e = await eg({ fields: a, onlyCheckValid: !0, eventType: 'valid' })),
                            s === U && e !== r.isValid && M.state.next({ isValid: e }));
                        }
                      },
                      et = (e, a) => {
                        !t.disabled &&
                          I('isValidating', 'validatingFields') &&
                          ((e || y.mount).forEach((e) => {
                            e && (a ? _(r.validatingFields, e, a) : Z(r.validatingFields, e));
                          }),
                          M.state.next({
                            validatingFields: r.validatingFields,
                            isValidating: !T(r.validatingFields),
                          }));
                      },
                      er = () => {
                        r.dirtyFields = ei(n, c, void 0, a);
                      },
                      ea = (e, t) => {
                        (_(r.errors, e, t),
                          (r.errors = { ...r.errors }),
                          M.state.next({ errors: r.errors }));
                      },
                      es = (t, s, l, u) => {
                        let d = V(a, t);
                        if (d) {
                          if (
                            ((e) => {
                              let t = k.test(e) ? [e] : o(e),
                                r = c,
                                a = n;
                              for (let e = 0; e < t.length - 1; e++) {
                                let s = t[e];
                                if (
                                  ((r = i(r) ? r : r[s]),
                                  (a = i(a) ? a : a[s]),
                                  null === r && null !== a)
                                )
                                  return !0;
                              }
                              return !1;
                            })(t) ||
                            ((e) => {
                              if (!m.actionArrayLengths.size) return !1;
                              let t = k.test(e) ? [e] : o(e),
                                r = c,
                                a = '',
                                s = -1,
                                l = 0;
                              for (let e = 0; e < t.length && !i(r); e++) {
                                let i = t[e];
                                if (((a = a ? `${a}.${i}` : i), Array.isArray(r) && +i >= r.length))
                                  return -1 !== s && (e !== s || +i < l);
                                if (
                                  (m.actionArrayLengths.has(a) &&
                                    ((s = e + 1), (l = m.actionArrayLengths.get(a))),
                                  w((r = r[i])) && -1 !== s && e > s && +t[s] < l)
                                )
                                  return !0;
                              }
                              return !1;
                            })(t)
                          )
                            return;
                          let a = w(V(c, t)),
                            f = V(c, t, w(l) ? V(n, t) : l);
                          (w(f) || (u && u.defaultChecked) || s
                            ? _(c, t, s ? f : en(d._f))
                            : ek(t, f),
                            m.mount &&
                              !m.action &&
                              (ee(),
                              a &&
                                r.isDirty &&
                                I('isDirty') &&
                                (eb() || ((r.isDirty = !1), M.state.next({ ...r }))),
                              e.shouldUnregister && a && !w(V(c, t)) && C(t, y) && (m.watch = !0)));
                        }
                      },
                      eu = (e, s, i, l, o) => {
                        let u = !1,
                          d = !1,
                          f = { name: e };
                        if (!t.disabled || !0 === l) {
                          if (!i || l) {
                            let t = E(V(n, e), s);
                            if (
                              (I('isDirty') &&
                                ((d = r.isDirty),
                                (r.isDirty = f.isDirty = !t || eb()),
                                (u = d !== f.isDirty)),
                              (d = !!V(r.dirtyFields, e)),
                              t !== r.isDirty)
                            ) {
                              var m = r.dirtyFields,
                                y = ei(n, c, void 0, a);
                              for (let e in m) e in y || delete m[e];
                              Object.assign(m, y);
                            } else t ? Z(r.dirtyFields, e) : _(r.dirtyFields, e, !0);
                            ((f.dirtyFields = r.dirtyFields),
                              (u = u || (I('dirtyFields') && !t !== d)));
                          }
                          if (i) {
                            let t = V(r.touchedFields, e);
                            t ||
                              (_(r.touchedFields, e, i),
                              (f.touchedFields = r.touchedFields),
                              (u = u || (I('touchedFields') && t !== i)));
                          }
                          u && o && M.state.next(f);
                        }
                        return u ? f : {};
                      },
                      eh = async (e) => (
                        et(e, !0),
                        await t.resolver(
                          c,
                          t.context,
                          ((e, t, r, a) => {
                            let s = {};
                            for (let r of e) {
                              let e = V(t, r);
                              e && _(s, r, e._f);
                            }
                            return {
                              criteriaMode: r,
                              names: [...e],
                              fields: s,
                              shouldUseNativeValidation: a,
                            };
                          })(e || y.mount, a, t.criteriaMode, t.shouldUseNativeValidation),
                        )
                      ),
                      ep = async (e) => {
                        let t = B,
                          { errors: s } = await eh(e);
                        if (t !== B) return s;
                        if ((et(e), e)) {
                          for (let t of e) {
                            let e = V(s, t);
                            W(t);
                            let i =
                                y.array.has(t) &&
                                l(e) &&
                                !Object.keys(e).some((e) => !Number.isNaN(Number(e))),
                              n = V(a, t),
                              o = l(n) && Object.keys(n).some((e) => '_f' !== e);
                            i
                              ? R(r.errors, { [t]: e }, t)
                              : (null == e ? void 0 : e.type) ||
                                  (null == e ? void 0 : e.message) ||
                                  Array.isArray(e) ||
                                  (l(e) && o)
                                ? _(r.errors, t, e)
                                : Z(r.errors, t);
                          }
                          r.errors = { ...r.errors };
                        } else (Object.keys(h).forEach(W), (r.errors = s));
                        return s;
                      },
                      ev = async ({ name: t, eventType: a }) => {
                        if (e.validate) {
                          let s = await e.validate({
                            formValues: c,
                            formState: r,
                            name: t,
                            eventType: a,
                          });
                          if (l(s))
                            for (let e in s) {
                              let t = s[e];
                              t &&
                                eN(`${em}.${e}`, {
                                  message: N(t.message) ? t.message : '',
                                  type: t.type || g,
                                });
                            }
                          else N(s) || !s ? eN(em, { message: s || '', type: g }) : eE(em);
                          return s;
                        }
                        return !0;
                      },
                      eg = async ({
                        fields: a,
                        onlyCheckValid: s,
                        name: i,
                        eventType: l,
                        context: n = { valid: !0, runRootValidation: !1 },
                      }) => {
                        if (
                          e.validate &&
                          ((n.runRootValidation = !0), !(await ev({ name: i, eventType: l }))) &&
                          ((n.valid = !1), s)
                        )
                          return n.valid;
                        for (let i in a) {
                          let o = a[i];
                          if (o) {
                            let { _f: a, ...u } = o;
                            if (a) {
                              let i = y.array.has(a.name),
                                l = o._f && ed(o._f),
                                u = I('isValidating', 'validatingFields');
                              l && u && et([a.name], !0);
                              let d = await H(
                                o,
                                y.disabled,
                                c,
                                z,
                                t.shouldUseNativeValidation && !s,
                                i,
                              );
                              if (
                                (l && u && et([a.name]),
                                (d[a.name] && ((n.valid = !1), s)) ||
                                  (s ||
                                    (W(a.name),
                                    V(d, a.name)
                                      ? i
                                        ? R(r.errors, d, a.name)
                                        : _(r.errors, a.name, d[a.name])
                                      : Z(r.errors, a.name)),
                                  e.shouldUseNativeValidation && d[a.name]))
                              )
                                break;
                            }
                            T(u) ||
                              (await eg({
                                context: n,
                                onlyCheckValid: s,
                                fields: u,
                                name: i,
                                eventType: l,
                              }));
                          }
                        }
                        return n.valid;
                      },
                      eb = (e, t) => (e && t && _(c, e, t), !E(m.mount ? c : n, n)),
                      ex = (e, t, r) => {
                        var a, s;
                        return (
                          (a = y),
                          (s = { ...(m.mount ? c : w(t) || N(e) ? n : t) }),
                          N(e)
                            ? (r && a.watch.add(e), V(s, e, t))
                            : Array.isArray(e)
                              ? e.map((e) => (r && a.watch.add(e), V(s, e, V(t, e))))
                              : (r && (a.watchAll = !0), s)
                        );
                      },
                      ek = (e, t, r = {}, s = !1, l = !1, n = !1) => {
                        let o = V(a, e),
                          u = t;
                        if (o) {
                          let r = o._f;
                          r &&
                            (r.disabled || _(c, e, el(t, r)),
                            (u = L(r.ref) && i(t) ? '' : t),
                            'select-multiple' === r.ref.type
                              ? [...r.ref.options].forEach(
                                  (e) => (e.selected = u.includes(e.value)),
                                )
                              : r.refs
                                ? 'checkbox' === r.ref.type
                                  ? r.refs.forEach((e) => {
                                      (e.defaultChecked && e.disabled) ||
                                        (Array.isArray(u)
                                          ? (e.checked = !!u.find((t) => t === e.value))
                                          : (e.checked = u === e.value || !!u));
                                    })
                                  : r.refs.forEach((e) => (e.checked = e.value === u))
                                : 'file' === r.ref.type
                                  ? (r.ref.value = '')
                                  : ((r.ref.value = u),
                                    r.ref.type ||
                                      l ||
                                      n ||
                                      M.state.next({ name: e, values: s ? c : d(c) })));
                        }
                        ((r.shouldDirty || r.shouldTouch) &&
                          eu(
                            e,
                            o &&
                              o._f &&
                              !o._f.disabled &&
                              (o._f.valueAsNumber || o._f.valueAsDate || o._f.setValueAs)
                              ? el(t, o._f)
                              : u,
                            r.shouldTouch,
                            r.shouldDirty,
                            !l,
                          ),
                          r.shouldValidate && eF(e, { delayError: r.delayError }));
                      },
                      ew = (e, t, r, i = !1, n = !1, o = !1) => {
                        for (let u in (y.array.has(e) &&
                          M.array.next({ name: e, values: i ? c : d(c) }),
                        t)) {
                          if (!t.hasOwnProperty(u)) continue;
                          let d = t[u],
                            f = e + '.' + u,
                            c = V(a, f);
                          (y.array.has(e) || l(d) || (c && !c._f)) && !s(d)
                            ? ew(f, d, r, i, n, o)
                            : ek(f, d, r, i, n, o);
                        }
                      },
                      eV = (e, t, s, l, n = !1) => {
                        let o = V(a, e),
                          u = y.array.has(e),
                          f = l ? t : d(t),
                          h = E(V(c, e), f);
                        if ((h || _(c, e, f), u))
                          (M.array.next({ name: e, values: l ? c : d(c) }),
                            I('isDirty', 'dirtyFields') &&
                              s.shouldDirty &&
                              (er(),
                              n ||
                                M.state.next({
                                  name: e,
                                  dirtyFields: r.dirtyFields,
                                  isDirty: eb(e, f),
                                })));
                        else {
                          let t = (Array.isArray(f) && !f.length) || T(f),
                            r = !h && !n;
                          !o || o._f || i(f) || t ? ek(e, f, s, l, n, r) : ew(e, f, s, l, n, r);
                        }
                        if (!h && !n) {
                          let t = C(e, y),
                            a = l ? c : d(c);
                          if (
                            (M.state.next({
                              ...(t && r),
                              name: m.mount || t ? e : void 0,
                              values: a,
                            }),
                            !u)
                          )
                            for (let t of ((e, t) => {
                              let r = t.split('.'),
                                a = [],
                                s = r[0];
                              for (let t = 1; t < r.length; s += '.' + r[t++])
                                !isNaN(+r[t]) && e.has(s) && a.push(`${s}.${r[t]}`);
                              return a;
                            })(y.array, e))
                              M.state.next({ name: t, values: a });
                        }
                      },
                      eA = (e, t, r = {}) => eV(e, t, r, !1),
                      e_ = async (i) => {
                        m.mount = !0;
                        let n = i.target,
                          o = n.name,
                          u = !0,
                          f = V(a, o),
                          p = (e) => {
                            u = Number.isNaN(e) || (s(e) && isNaN(e.getTime())) || E(e, V(c, o, e));
                          };
                        if (f) {
                          let s,
                            m,
                            D,
                            R,
                            L = n.type
                              ? en(f._f)
                              : l((s = i)) && s.target
                                ? 'checkbox' === s.target.type
                                  ? s.target.checked
                                  : 'file' === s.target.type
                                    ? s.target.files
                                    : s.target.value
                                : s,
                            P = 'blur' === i.type || 'focusout' === i.type,
                            U =
                              !(
                                (R = f._f).mount &&
                                (R.required ||
                                  (!w(R.required) && !1 !== R.required) ||
                                  !w(R.min) ||
                                  !w(R.max) ||
                                  !w(R.maxLength) ||
                                  !w(R.minLength) ||
                                  R.pattern ||
                                  R.validate)
                              ) &&
                              !e.validate &&
                              !t.resolver &&
                              !V(r.errors, o) &&
                              !f._f.deps,
                            B =
                              U ||
                              ((g = P),
                              (b = V(r.touchedFields, o)),
                              (k = r.isSubmitted),
                              (A = j),
                              !(F = x).isOnAll &&
                                (!k && F.isOnTouch
                                  ? !(b || g)
                                  : (k ? A.isOnBlur : F.isOnBlur)
                                    ? !g
                                    : (k ? !A.isOnChange : !F.isOnChange) || g)),
                            q = C(o, y, P);
                          if ((_(c, o, d(L)), P)) {
                            if (!n || !n.readOnly) {
                              f._f.onBlur && f._f.onBlur(i);
                              let e = h[o];
                              e && e(0);
                            }
                          } else f._f.onChange && f._f.onChange(i);
                          let K = eu(o, L, P),
                            J = !T(K) || q;
                          if (
                            (P ||
                              M.state.next({
                                name: o,
                                type: i.type,
                                ...(v ? { values: d(c) } : {}),
                              }),
                            B)
                          )
                            return (
                              (!U || !r.isValid) &&
                                I('isValid') &&
                                ('onBlur' === t.mode ? P && ee() : P || ee()),
                              J && M.state.next({ name: o, ...(q ? {} : K) })
                            );
                          if (
                            (!t.resolver &&
                              e.validate &&
                              (await ev({ name: o, eventType: i.type })),
                            !P && q && M.state.next({ ...r }),
                            t.resolver)
                          ) {
                            let { errors: e } = await eh([o]);
                            if ((et([o]), p(L), !u)) {
                              T(K) || M.state.next(K);
                              return;
                            }
                            let t = ef(r.errors, a, o),
                              s = ef(e, a, t.name || o);
                            ((m = s.error), (o = s.name), (D = T(e)));
                          } else
                            (et([o], !0),
                              (m = (await H(f, y.disabled, c, z, t.shouldUseNativeValidation))[o]),
                              et([o]),
                              p(L),
                              u &&
                                (m
                                  ? (D = !1)
                                  : I('isValid') &&
                                    (D = await eg({
                                      fields: a,
                                      onlyCheckValid: !0,
                                      name: o,
                                      eventType: i.type,
                                    }))));
                          if (u) {
                            f._f.deps &&
                              (!Array.isArray(f._f.deps) || f._f.deps.length > 0) &&
                              eF(f._f.deps);
                            var g,
                              b,
                              k,
                              A,
                              F,
                              S = o,
                              N = D,
                              O = m;
                            let e = V(r.errors, S),
                              a = I('isValid') && 'boolean' == typeof N && r.isValid !== N;
                            if (
                              (t.delayError && O
                                ? ((h[S] = $(S, () => ea(S, O))), h[S](t.delayError))
                                : (W(S),
                                  O ? _(r.errors, S, O) : Z(r.errors, S),
                                  (r.errors = { ...r.errors })),
                              (O ? !E(e, O) : e) || !T(K) || a)
                            ) {
                              let e = {
                                ...K,
                                ...(a && 'boolean' == typeof N ? { isValid: N } : {}),
                                errors: r.errors,
                                name: S,
                              };
                              M.state.next(e);
                            }
                          }
                        }
                      },
                      ej = (e, t) => {
                        if (V(r.errors, t) && e.focus) return (e.focus(), 1);
                      },
                      eF = async (e, s = {}) => {
                        let i,
                          l,
                          n = q(e);
                        if (t.resolver) {
                          let t = B,
                            r = await ep(w(e) ? e : n);
                          if (((i = T(r)), (l = e ? !n.some((e) => V(r, e)) : i), t !== B))
                            return l;
                        } else
                          e
                            ? ((l = (
                                await Promise.all(
                                  n.map(async (e) => {
                                    let t = V(a, e);
                                    return await eg({
                                      fields: t && t._f ? { [e]: t } : t,
                                      eventType: f,
                                    });
                                  }),
                                )
                              ).every(Boolean)) ||
                                r.isValid) &&
                              ee()
                            : (l = i = await eg({ fields: a, name: e, eventType: f }));
                        if (s.delayError && t.delayError && N(e)) {
                          let a = V(r.errors, e);
                          a
                            ? (Z(r.errors, e), (h[e] = $(e, () => ea(e, a))), h[e](t.delayError))
                            : W(e);
                        }
                        if (s.shouldTouch)
                          for (let t of e ? n : y.mount)
                            y.array.has(t) || _(r.touchedFields, t, !0);
                        return (
                          M.state.next({
                            ...(!N(e) || (I('isValid') && i !== r.isValid) ? {} : { name: e }),
                            ...(t.resolver || !e ? { isValid: i } : {}),
                            ...(s.shouldTouch && I('touchedFields')
                              ? { touchedFields: r.touchedFields }
                              : {}),
                            errors: r.errors,
                          }),
                          s.shouldFocus && !l && D(a, ej, e ? n : y.mount),
                          l
                        );
                      },
                      eS = (e, t) => {
                        let a = t || r,
                          s = V(a.errors, e);
                        return {
                          invalid: !!s,
                          isDirty: !!V(a.dirtyFields, e),
                          error: s,
                          isValidating: !!V(a.validatingFields, e),
                          isTouched: !!V(a.touchedFields, e),
                        };
                      },
                      eE = (e) => {
                        let t = e ? q(e) : void 0;
                        t
                          ? t.forEach((e) => {
                              (X(e), Z(r.errors, e), M.state.next({ name: e, errors: r.errors }));
                            })
                          : (Object.keys(h).forEach(W),
                            (r.errors = {}),
                            M.state.next({ errors: r.errors }));
                      },
                      eN = (e, t, s) => {
                        W(e);
                        let i = (V(a, e, { _f: {} })._f || {}).ref,
                          { ref: l, message: n, type: o, types: u, ...d } = V(r.errors, e) || {};
                        (_(r.errors, e, { ...d, ...t, ref: i }),
                          M.state.next({ name: e, errors: r.errors, isValid: !1 }),
                          s && s.shouldFocus && i && i.focus && i.focus());
                      },
                      eO = (e) => {
                        var t;
                        let a = !!(null == (t = e.formState) ? void 0 : t.values);
                        a && v++;
                        let { unsubscribe: s } = M.state.subscribe({
                          next: (t) => {
                            var a, s;
                            let i, l, o, u;
                            if (
                              ((i = e.name),
                              (l = t.name),
                              (o = e.exact),
                              (!i ||
                                !l ||
                                i === l ||
                                q(i).some(
                                  (e) =>
                                    e &&
                                    (o
                                      ? e === l || e.startsWith(l + '.')
                                      : e.startsWith(l) || l.startsWith(e)),
                                )) &&
                                ((a = e.formState || S),
                                (s = e.reRenderRoot),
                                eM(t),
                                !(u = Object.keys(t).filter((e) => 'name' !== e)).length ||
                                  (s && u.length >= Object.keys(a).length) ||
                                  u.find((e) => a[e] === (!s || 'all'))))
                            ) {
                              let a = { ...c };
                              e.callback({ values: a, ...r, ...t, defaultValues: n });
                            }
                          },
                        });
                        if (!a) return s;
                        let i = !1;
                        return () => {
                          i || ((i = !0), v--, s());
                        };
                      },
                      eC = (e, s = {}) => {
                        for (let i of e ? q(e) : y.mount)
                          (y.mount.delete(i),
                            y.array.delete(i),
                            y.disabled.delete(i),
                            s.keepValue || (Z(a, i), Z(c, i)),
                            s.keepError || (X(i), Z(r.errors, i)),
                            s.keepDirty || Z(r.dirtyFields, i),
                            s.keepTouched || Z(r.touchedFields, i),
                            s.keepIsValidating || Z(r.validatingFields, i),
                            t.shouldUnregister || s.keepDefaultValue || Z(n, i));
                        (v && M.state.next({ values: d(c) }),
                          M.state.next({
                            ...r,
                            ...(s.keepDirty ? {} : { isDirty: eb() }),
                            ...(s.keepIsValidating ? {} : { isValidating: !T(r.validatingFields) }),
                          }),
                          s.keepIsValid || ee());
                      },
                      eD = ({ disabled: e, name: t }) => {
                        if (('boolean' == typeof e && m.mount) || e || y.disabled.has(t)) {
                          let r = y.disabled.has(t);
                          (e ? y.disabled.add(t) : y.disabled.delete(t),
                            !!e !== r && m.mount && !m.action && ee());
                        }
                      },
                      eR = (e, r = {}) => {
                        let s = V(a, e),
                          i = 'boolean' == typeof r.disabled || 'boolean' == typeof t.disabled,
                          l = !y.registerName.has(e) && s && s._f && !s._f.mount;
                        return (
                          (_(a, e, {
                            ...(s || {}),
                            _f: {
                              ...(s && s._f ? s._f : { ref: { name: e } }),
                              name: e,
                              mount: !0,
                              ...r,
                            },
                          }),
                          y.mount.add(e),
                          s && !l)
                            ? eD({
                                disabled: 'boolean' == typeof r.disabled ? r.disabled : t.disabled,
                                name: e,
                              })
                            : es(e, !0, r.value),
                          {
                            ...(i ? { disabled: r.disabled || t.disabled } : {}),
                            ...(t.progressive
                              ? {
                                  required: !!r.required,
                                  min: eo(r.min),
                                  max: eo(r.max),
                                  minLength: eo(r.minLength),
                                  maxLength: eo(r.maxLength),
                                  pattern: eo(r.pattern),
                                }
                              : {}),
                            name: e,
                            onChange: e_,
                            onBlur: e_,
                            ref: (i) => {
                              if (i) {
                                let t;
                                (y.registerName.add(e),
                                  eR(e, r),
                                  y.registerName.delete(e),
                                  (s = V(a, e)));
                                let l =
                                    (w(i.value) &&
                                      i.querySelectorAll &&
                                      i.querySelectorAll('input,select,textarea')[0]) ||
                                    i,
                                  o = 'radio' === (t = l).type || 'checkbox' === t.type,
                                  u = s._f.refs || [];
                                if (o ? u.find((e) => e === l) : l === s._f.ref) return;
                                let d = { ...s._f };
                                (o
                                  ? ((d.refs = [
                                      ...u.filter(Q),
                                      l,
                                      ...(Array.isArray(V(n, e)) ? [{}] : []),
                                    ]),
                                    (d.ref = { type: l.type, name: e }))
                                  : ((d.ref = l), delete d.refs),
                                  _(a, e, { _f: d }),
                                  es(e, !1, void 0, l));
                              } else {
                                let i;
                                ((s = V(a, e, {}))._f && (s._f.mount = !1),
                                  (t.shouldUnregister || r.shouldUnregister) &&
                                    ((i = y.array),
                                    !e
                                      .split('.')
                                      .some(
                                        (e, t, r) =>
                                          !isNaN(Number(e)) && i.has(r.slice(0, t).join('.')),
                                      ) || !m.action) &&
                                    y.unMount.add(e));
                              }
                            },
                          }
                        );
                      },
                      eT = () =>
                        t.shouldFocusError && !t.shouldUseNativeValidation && D(a, ej, y.mount),
                      eL = (e, s) => async (i) => {
                        let l, n;
                        i && (i.preventDefault && i.preventDefault(), i.persist && i.persist());
                        let o = d(c);
                        if ((M.state.next({ isSubmitting: !0 }), t.resolver)) {
                          let e = B,
                            { errors: t, values: a } = await eh();
                          if (e !== B) return;
                          (et(), Object.keys(h).forEach(W), (r.errors = t), (o = d(a)));
                        } else (await eg({ fields: a, eventType: 'submit' }), Z(r.errors, b));
                        if (y.disabled.size) for (let e of y.disabled) Z(o, e);
                        if (T(r.errors)) {
                          M.state.next({ errors: {} });
                          try {
                            l = await e(o, i);
                          } catch (e) {
                            n = e;
                          }
                        } else (s && (await s({ ...r.errors }, i)), eT(), setTimeout(eT));
                        if (
                          (M.state.next({
                            isSubmitted: !0,
                            isSubmitting: !1,
                            isSubmitSuccessful: T(r.errors) && !n,
                            submitCount: r.submitCount + 1,
                            errors: r.errors,
                          }),
                          n)
                        )
                          throw n;
                        return l;
                      },
                      eP = (e, s = {}) => {
                        B++;
                        let i = e ? d(e) : n,
                          l = d(i),
                          o = T(e),
                          f = a;
                        if (
                          (Object.keys(h).forEach(W), s.keepDefaultValues || (n = i), !s.keepValues)
                        ) {
                          if (s.keepDirtyValues)
                            for (let e of new Set([
                              ...y.mount,
                              ...(function e(t, r, a = '', s = []) {
                                for (let i in t) {
                                  let l = a ? `${a}.${i}` : i,
                                    n = t[i];
                                  Y(n) && Y(V(r, l)) ? e(n, r, l, s) : s.push(l);
                                }
                                return s;
                              })(ei(n, c, void 0, f), r.dirtyFields),
                            ])) {
                              let t = V(r.dirtyFields, e),
                                a = V(c, e),
                                s = V(l, e);
                              t && !w(a) ? _(l, e, a) : t || w(s) || eA(e, s);
                            }
                          else {
                            if (u && w(e))
                              for (let e of y.mount) {
                                let t = V(a, e);
                                if (t && t._f) {
                                  let e = Array.isArray(t._f.refs) ? t._f.refs[0] : t._f.ref;
                                  if (L(e)) {
                                    let t = e.closest('form');
                                    if (t) {
                                      t.reset();
                                      break;
                                    }
                                  }
                                }
                              }
                            if (s.keepFieldsRef) for (let e of y.mount) eA(e, V(l, e));
                            else a = {};
                          }
                          if (t.shouldUnregister) {
                            if (((c = s.keepDefaultValues ? d(n) : {}), s.keepFieldsRef))
                              for (let e of y.mount) _(c, e, V(l, e));
                          } else c = d(l);
                          (M.array.next({ values: { ...l } }),
                            M.state.next({ name: void 0, type: void 0, values: { ...l } }));
                        }
                        ((y = {
                          mount: s.keepDirtyValues ? y.mount : new Set(),
                          unMount: new Set(),
                          array: new Set(),
                          registerName: new Set(),
                          disabled: new Set(),
                          watch: new Set(),
                          watchAll: !1,
                          focus: '',
                        }),
                          (m.mount =
                            !S.isValid ||
                            !!s.keepIsValid ||
                            !!s.keepDirtyValues ||
                            (!t.shouldUnregister && !T(l))),
                          (m.watch = !!t.shouldUnregister),
                          (m.keepIsValid = !!s.keepIsValid),
                          (m.action = !1),
                          m.actionArrayLengths.clear(),
                          s.keepErrors || (r.errors = {}),
                          M.state.next({
                            submitCount: s.keepSubmitCount ? r.submitCount : 0,
                            isDirty:
                              !o &&
                              (s.keepDirty
                                ? r.isDirty
                                : s.keepValues
                                  ? eb()
                                  : !!(s.keepDefaultValues && !E(e, n))),
                            isSubmitted: !!s.keepIsSubmitted && r.isSubmitted,
                            dirtyFields: o
                              ? {}
                              : s.keepDirtyValues
                                ? s.keepDefaultValues && c
                                  ? ei(n, c, void 0, f)
                                  : r.dirtyFields
                                : s.keepDefaultValues && e
                                  ? ei(n, e, void 0, f)
                                  : s.keepDirty
                                    ? r.dirtyFields
                                    : s.keepValues
                                      ? ei(n, c, void 0, f)
                                      : {},
                            touchedFields: s.keepTouched ? r.touchedFields : {},
                            ...(!s.keepIsValidating && (r.isValidating || !T(r.validatingFields))
                              ? { validatingFields: {}, isValidating: !1 }
                              : null),
                            errors: s.keepErrors ? r.errors : {},
                            isSubmitSuccessful: !!s.keepIsSubmitSuccessful && r.isSubmitSuccessful,
                            isSubmitting: !1,
                            defaultValues: n,
                          }));
                      },
                      eI = (e, r) => eP(A(e) ? e(c) : e, { ...t.resetOptions, ...r }),
                      eM = (e) => {
                        let { name: t, type: a, values: s, ...i } = e;
                        r = { ...r, ...i };
                      };
                    M.state.subscribe({ next: eM });
                    let eU = {
                      control: {
                        register: eR,
                        unregister: eC,
                        getFieldState: eS,
                        handleSubmit: eL,
                        setError: eN,
                        _subscribe: eO,
                        _runSchema: eh,
                        _updateIsValidating: et,
                        _focusError: eT,
                        _getWatch: ex,
                        _getDirty: eb,
                        _setValid: ee,
                        _setFieldArray: (e, s = [], i, l, n = !0, o = !0) => {
                          if (l && i && !t.disabled) {
                            m.action = !0;
                            let t = V(a, e);
                            if (
                              (m.actionArrayLengths.has(e) ||
                                m.actionArrayLengths.set(e, Array.isArray(t) ? t.length : 0),
                              o && Array.isArray(t))
                            ) {
                              let r = i(t, l.argA, l.argB);
                              n && _(a, e, r);
                            }
                            let d = V(r.errors, e);
                            if (o && Array.isArray(d)) {
                              var u;
                              let t,
                                a = d.root,
                                s = i(d, l.argA, l.argB) || d;
                              (a && (s.root = a),
                                n && _(r.errors, e, s),
                                K((t = V((u = r.errors), e))).length ||
                                  (null == t ? void 0 : t.root) ||
                                  Z(u, e));
                            }
                            let f = V(r.touchedFields, e);
                            if (I('touchedFields') && o && Array.isArray(f)) {
                              let t = i(f, l.argA, l.argB);
                              n && _(r.touchedFields, e, t);
                            }
                            (I('dirtyFields') && er(),
                              M.state.next({
                                name: e,
                                isDirty: eb(e, s),
                                dirtyFields: r.dirtyFields,
                                errors: r.errors,
                                isValid: r.isValid,
                              }));
                          } else _(c, e, s);
                        },
                        _setDisabledField: eD,
                        _setErrors: (e) => {
                          (Object.keys(h).forEach(W),
                            (r.errors = e),
                            M.state.next({ errors: r.errors, isValid: !1 }));
                        },
                        _getFieldArray: (e) =>
                          K(V(m.mount ? c : n, e, t.shouldUnregister ? V(n, e, []) : [])),
                        _reset: eP,
                        _resetDefaultValues: () =>
                          A(t.defaultValues) &&
                          t.defaultValues().then((e) => {
                            (eI(e, t.resetOptions), M.state.next({ isLoading: !1 }));
                          }),
                        _removeUnmounted: () => {
                          for (let e of y.unMount) {
                            let t = V(a, e);
                            t &&
                              (t._f.refs ? t._f.refs.every((e) => !Q(e)) : !Q(t._f.ref)) &&
                              eC(e);
                          }
                          y.unMount = new Set();
                        },
                        _disableForm: (e) => {
                          'boolean' == typeof e &&
                            (M.state.next({ disabled: e }),
                            D(
                              a,
                              (t, r) => {
                                let s = V(a, r);
                                s &&
                                  ((t.disabled = s._f.disabled || e),
                                  Array.isArray(s._f.refs) &&
                                    s._f.refs.forEach((t) => {
                                      t.disabled = s._f.disabled || e;
                                    }));
                              },
                              0,
                            ));
                        },
                        _subjects: M,
                        _proxyFormState: S,
                        get _fields() {
                          return a;
                        },
                        get _formValues() {
                          return c;
                        },
                        get _state() {
                          return m;
                        },
                        set _state(value) {
                          m = value;
                        },
                        get _defaultValues() {
                          return n;
                        },
                        get _names() {
                          return y;
                        },
                        set _names(value) {
                          y = value;
                        },
                        get _formState() {
                          return r;
                        },
                        get _options() {
                          return t;
                        },
                        set _options(value) {
                          ((x = O((t = { ...t, ...value }).mode)),
                            (j = O(t.reValidateMode)),
                            (z = 'all' === t.criteriaMode));
                        },
                      },
                      subscribe: (e) => (
                        (m.mount = !0),
                        (P = { ...P, ...e.formState }),
                        eO({ ...e, formState: { ...F, ...e.formState } })
                      ),
                      trigger: eF,
                      register: eR,
                      handleSubmit: eL,
                      watch: (e, t) => {
                        if (A(e)) {
                          v++;
                          let { unsubscribe: r } = M.state.subscribe({
                              next: (r) => 'values' in r && e(r.values || ex(void 0, t), r),
                            }),
                            a = !1;
                          return {
                            unsubscribe: () => {
                              a || ((a = !0), v--, r());
                            },
                          };
                        }
                        return ex(e, t, !0);
                      },
                      setValue: eA,
                      setValues: (e, t = {}) => {
                        let a = A(e) ? e(c) : e;
                        if (!E(c, a)) {
                          for (let e of ((c = { ...c, ...a }), y.mount))
                            G(a, e) && eV(e, V(a, e), t, !0, !0);
                          (M.state.next({
                            ...r,
                            name: void 0,
                            type: void 0,
                            ...(v ? { values: c } : {}),
                          }),
                            t.shouldValidate && ee());
                        }
                      },
                      getValues: (e, t) => {
                        let a = { ...(m.mount ? c : n) };
                        return (
                          t &&
                            (a = (function e(t, r) {
                              let a = {};
                              for (let s in t)
                                if (t.hasOwnProperty(s)) {
                                  let i = t[s],
                                    n = r[s];
                                  if (i && l(i) && n) {
                                    let t = e(i, n);
                                    l(t) && (a[s] = t);
                                  } else t[s] && (a[s] = n);
                                }
                              return a;
                            })(t.dirtyFields ? r.dirtyFields : r.touchedFields, a)),
                          w(e) ? a : N(e) ? V(a, e) : e.map((e) => V(a, e))
                        );
                      },
                      getErrors: (e) =>
                        w(e)
                          ? { ...r.errors }
                          : N(e)
                            ? V(r.errors, e)
                            : e.map((e) => V(r.errors, e)),
                      reset: eI,
                      resetField: (e, t = {}) => {
                        V(a, e) &&
                          (Z(r.validatingFields, e),
                          w(t.defaultValue)
                            ? eA(e, d(V(n, e)))
                            : (eA(e, t.defaultValue), _(n, e, d(t.defaultValue))),
                          t.keepTouched || Z(r.touchedFields, e),
                          t.keepDirty ||
                            (Z(r.dirtyFields, e),
                            (r.isDirty = t.defaultValue ? eb(e, d(V(n, e))) : eb())),
                          t.keepError || (W(e), Z(r.errors, e), ee()),
                          M.state.next({ ...r, isValidating: !T(r.validatingFields) }));
                      },
                      resetDefaultValues: (e, t = {}) => {
                        if (((n = d(e)), !t.keepDirty)) {
                          let e = ei(n, c, void 0, a);
                          ((r.dirtyFields = e), (r.isDirty = !T(e)));
                        }
                        (t.keepIsValid || ee(), M.state.next({ ...r, defaultValues: n }));
                      },
                      clearErrors: eE,
                      unregister: eC,
                      setError: eN,
                      setFocus: (e, t = {}) => {
                        let r = V(a, e),
                          s = r && r._f;
                        if (s) {
                          let e = s.refs ? s.refs[0] : s.ref;
                          e.focus &&
                            setTimeout(() => {
                              (e.focus(), t.shouldSelect && A(e.select) && e.select());
                            });
                        }
                      },
                      getFieldState: eS,
                    };
                    return { ...eU, formControl: eU };
                  })(e);
                  m.current = { ...r, formState: p };
                }
              let x = m.current.control;
              x._options = e;
              let F = () => ({ ...x._formState, defaultValues: x._defaultValues }),
                { resyncIfNeeded: S, snapshot: P } =
                  ((t = r.default.useRef(!1)),
                  (a = r.default.useRef(!1)),
                  (n = r.default.useRef(void 0)),
                  (c = r.default.useRef(0)),
                  c.current++,
                  !a.current && F && ((a.current = !0), (n.current = d(F()))),
                  {
                    resyncIfNeeded: r.default.useCallback((e, r, s) => {
                      if (e && (t.current || (a.current && c.current > 1))) {
                        let e = r();
                        E(n.current, e) || s(e);
                      }
                      t.current = !0;
                    }, []),
                    snapshot: r.default.useCallback((e, t) => {
                      e && (n.current = d(t()));
                    }, []),
                  });
              return (
                j(() => {
                  S(!0, F, v);
                  let e = x._subscribe({
                    formState: x._proxyFormState,
                    callback: () => v({ ...x._formState, defaultValues: x._defaultValues }),
                    reRenderRoot: !0,
                  });
                  return (
                    v((e) => ({ ...e, isReady: !0 })),
                    (x._formState.isReady = !0),
                    () => {
                      (e(), P(!0, F));
                    }
                  );
                }, [x, S, P]),
                r.default.useEffect(() => x._disableForm(e.disabled), [x, e.disabled]),
                r.default.useEffect(() => {
                  (e.mode && (x._options.mode = e.mode),
                    e.reValidateMode && (x._options.reValidateMode = e.reValidateMode));
                }, [x, e.mode, e.reValidateMode]),
                r.default.useEffect(() => {
                  e.errors && (x._setErrors(e.errors), x._focusError());
                }, [x, e.errors]),
                r.default.useEffect(() => {
                  e.shouldUnregister && x._subjects.state.next({ values: x._getWatch() });
                }, [x, e.shouldUnregister]),
                r.default.useEffect(() => {
                  if (x._proxyFormState.isDirty) {
                    let e = x._getDirty();
                    e !== p.isDirty && x._subjects.state.next({ isDirty: e });
                  }
                }, [x, p.isDirty]),
                r.default.useEffect(() => {
                  var t;
                  e.values && !E(e.values, y.current)
                    ? (x._reset(e.values, { keepFieldsRef: !0, ...x._options.resetOptions }),
                      (null == (t = x._options.resetOptions) ? void 0 : t.keepIsValid) ||
                        x._setValid(),
                      (y.current = e.values),
                      v((e) => ({ ...e })))
                    : x._resetDefaultValues();
                }, [x, e.values]),
                r.default.useEffect(() => {
                  (x._state.mount || (x._setValid(), (x._state.mount = !0)),
                    x._state.watch &&
                      ((x._state.watch = !1), x._subjects.state.next({ ...x._formState })),
                    x._removeUnmounted());
                }),
                (m.current.formState = r.default.useMemo(
                  () =>
                    ((e, t, r = !0) => {
                      let a = {};
                      for (let s in e)
                        Object.defineProperty(a, s, {
                          get: () => (
                            'all' !== t._proxyFormState[s] && (t._proxyFormState[s] = !r || 'all'),
                            e[s]
                          ),
                        });
                      return a;
                    })(p, x),
                  [x, p],
                )),
                m.current
              );
            })({
              resolver: (function (e, t) {
                if ((void 0 === t && (t = {}), '_zod' in e && 'object' == typeof e._zod))
                  return function (r, a, s) {
                    try {
                      return Promise.resolve(
                        ek(
                          function () {
                            function a(e) {
                              return (
                                s.shouldUseNativeValidation && ep({}, s),
                                { errors: {}, values: t.raw ? Object.assign({}, r) : e }
                              );
                            }
                            return 'sync' === t.mode
                              ? a(e.parse(r, void 0))
                              : Promise.resolve(e.parseAsync(r, void 0)).then(a);
                          },
                          function (e) {
                            var t;
                            if (!(
                              null == e ||
                              null == (t = e._zod) ||
                              null == (t = t.traits) ||
                              !t.has('$ZodError')
                            ))
                              return {
                                values: {},
                                errors: ev(
                                  (function (e, t) {
                                    for (var r = Object.create(null); e.length;)
                                      !(function () {
                                        var a = e[0],
                                          s = a.code,
                                          i = a.message,
                                          l = a.path.join('.');
                                        if (!r[l])
                                          if ('invalid_union' === a.code && a.errors.length > 0) {
                                            var n,
                                              o,
                                              u = a.errors.reduce(function (e, t) {
                                                return t.length < e.length ? t : e;
                                              })[0];
                                            r[l] = {
                                              message:
                                                null != (n = null == u ? void 0 : u.message)
                                                  ? n
                                                  : i,
                                              type:
                                                null != (o = null == u ? void 0 : u.code) ? o : s,
                                            };
                                          } else r[l] = { message: i, type: s };
                                        if (
                                          ('invalid_union' === a.code &&
                                            a.errors.forEach(function (t) {
                                              return t.forEach(function (t) {
                                                return e.push(
                                                  ex({}, t, { path: [].concat(a.path, t.path) }),
                                                );
                                              });
                                            }),
                                          t)
                                        ) {
                                          var d = r[l].types,
                                            f = d && d[a.code];
                                          r[l] = P(
                                            l,
                                            t,
                                            r,
                                            s,
                                            f ? [].concat(f, a.message) : a.message,
                                          );
                                        }
                                        e.shift();
                                      })();
                                    return r;
                                  })(
                                    e.issues,
                                    !s.shouldUseNativeValidation && 'all' === s.criteriaMode,
                                  ),
                                  s,
                                ),
                              };
                            throw e;
                          },
                        ),
                      );
                    } catch (e) {
                      return Promise.reject(e);
                    }
                  };
                if ('_def' in e && 'object' == typeof e._def)
                  return function (r, a, s) {
                    try {
                      return Promise.resolve(
                        ek(
                          function () {
                            return Promise.resolve(
                              e['sync' === t.mode ? 'parse' : 'parseAsync'](r, void 0),
                            ).then(function (e) {
                              return (
                                s.shouldUseNativeValidation && ep({}, s),
                                { errors: {}, values: t.raw ? Object.assign({}, r) : e }
                              );
                            });
                          },
                          function (e) {
                            if (Array.isArray(null == e ? void 0 : e.issues))
                              return {
                                values: {},
                                errors: ev(
                                  (function (e, t) {
                                    for (var r = Object.create(null); e.length;) {
                                      var a = e[0],
                                        s = a.code,
                                        i = a.message,
                                        l = a.path.join('.');
                                      if (!r[l])
                                        if ('unionErrors' in a) {
                                          var n,
                                            o,
                                            u = a.unionErrors.reduce(function (e, t) {
                                              return t.errors.length < e.errors.length ? t : e;
                                            }).errors[0];
                                          r[l] = {
                                            message:
                                              null != (n = null == u ? void 0 : u.message) ? n : i,
                                            type: null != (o = null == u ? void 0 : u.code) ? o : s,
                                          };
                                        } else r[l] = { message: i, type: s };
                                      if (
                                        ('unionErrors' in a &&
                                          a.unionErrors.forEach(function (t) {
                                            return t.errors.forEach(function (t) {
                                              return e.push(t);
                                            });
                                          }),
                                        t)
                                      ) {
                                        var d = r[l].types,
                                          f = d && d[a.code];
                                        r[l] = P(
                                          l,
                                          t,
                                          r,
                                          s,
                                          f ? [].concat(f, a.message) : a.message,
                                        );
                                      }
                                      e.shift();
                                    }
                                    return r;
                                  })(
                                    e.errors,
                                    !s.shouldUseNativeValidation && 'all' === s.criteriaMode,
                                  ),
                                  s,
                                ),
                              };
                            throw e;
                          },
                        ),
                      );
                    } catch (e) {
                      return Promise.reject(e);
                    }
                  };
                throw Error('Invalid input: not a Zod schema');
              })(e5),
              defaultValues: { email: '', password: '', remember: !1 },
            });
          async function S(t) {
            let r = (function (e) {
              if (!e || !e.startsWith('/') || e.startsWith('//') || e.startsWith('/\\')) return '/';
              try {
                let t = new URL(e, 'https://dashboard.invalid');
                if ('https://dashboard.invalid' !== t.origin) return '/';
                return `${t.pathname}${t.search}${t.hash}`;
              } catch {
                return '/';
              }
            })(e);
            (x(!0), p(null));
            try {
              let e = await fetch('/api/auth/login', {
                  method: 'POST',
                  credentials: 'same-origin',
                  cache: 'no-store',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(t),
                }),
                a = await e.json();
              if (!e.ok) {
                let e =
                  'object' == typeof a && null !== a && 'error' in a && 'string' == typeof a.error
                    ? a.error
                    : 'Login gagal';
                throw Error(e);
              }
              let s = e6.safeParse(a);
              if (!s.success || !s.data.user.roles.includes('admin'))
                throw Error('Respons sesi tidak valid');
              (c(s.data.user), e2.toast.success('Welcome back, admin!'), n.replace(r), n.refresh());
            } catch (t) {
              let e = t instanceof Error ? t.message : 'Login gagal';
              (p(e), e2.toast.error(e));
            } finally {
              x(!1);
            }
          }
          let I = F.formState.errors;
          return (0, t.jsxs)('div', {
            className: 'animate-in-up',
            children: [
              (0, t.jsxs)('div', {
                className: 'mb-8',
                children: [
                  (0, t.jsx)('h1', {
                    className: 'text-2xl font-semibold tracking-tight',
                    children: 'Welcome back 👋',
                  }),
                  (0, t.jsx)('p', {
                    className: 'mt-1.5 text-sm text-muted-foreground',
                    children: 'Sign in to your admin account',
                  }),
                ],
              }),
              h &&
                (0, t.jsxs)('div', {
                  className:
                    'mb-6 flex items-start gap-3 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive',
                  children: [
                    (0, t.jsx)(eF.AlertCircle, { className: 'mt-0.5 h-4 w-4 shrink-0' }),
                    (0, t.jsx)('span', { children: h }),
                  ],
                }),
              (0, t.jsxs)('form', {
                onSubmit: F.handleSubmit(S),
                className: 'space-y-5',
                children: [
                  (0, t.jsxs)('div', {
                    className: 'space-y-2',
                    children: [
                      (0, t.jsx)(eN.Label, { htmlFor: 'email', children: 'Email' }),
                      (0, t.jsx)(eE.Input, {
                        id: 'email',
                        type: 'email',
                        placeholder: 'admin@michishirube.dev',
                        autoComplete: 'email',
                        'aria-invalid': !!I.email,
                        disabled: v,
                        ...F.register('email'),
                      }),
                      I.email &&
                        (0, t.jsx)('p', {
                          className: 'text-xs text-destructive',
                          children: I.email.message,
                        }),
                    ],
                  }),
                  (0, t.jsxs)('div', {
                    className: 'space-y-2',
                    children: [
                      (0, t.jsxs)('div', {
                        className: 'flex items-center justify-between',
                        children: [
                          (0, t.jsx)(eN.Label, { htmlFor: 'password', children: 'Password' }),
                          (0, t.jsx)('a', {
                            href: '#',
                            className: 'text-xs text-primary hover:underline',
                            tabIndex: -1,
                            children: 'Forgot password?',
                          }),
                        ],
                      }),
                      (0, t.jsxs)('div', {
                        className: 'relative',
                        children: [
                          (0, t.jsx)(eE.Input, {
                            id: 'password',
                            type: m ? 'text' : 'password',
                            placeholder: '••••••••',
                            autoComplete: 'current-password',
                            'aria-invalid': !!I.password,
                            disabled: v,
                            className: 'pr-10',
                            ...F.register('password'),
                          }),
                          (0, t.jsx)('button', {
                            type: 'button',
                            onClick: () => y((e) => !e),
                            className:
                              'absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground',
                            'aria-label': m ? 'Hide password' : 'Show password',
                            tabIndex: -1,
                            children: m
                              ? (0, t.jsx)(e_, { className: 'h-4 w-4' })
                              : (0, t.jsx)(eA, { className: 'h-4 w-4' }),
                          }),
                        ],
                      }),
                      I.password &&
                        (0, t.jsx)('p', {
                          className: 'text-xs text-destructive',
                          children: I.password.message,
                        }),
                    ],
                  }),
                  (0, t.jsxs)('div', {
                    className: 'flex items-center gap-2',
                    children: [
                      (0, t.jsx)(e1, {
                        id: 'remember',
                        disabled: v,
                        checked: F.watch('remember'),
                        onCheckedChange: (e) => F.setValue('remember', !!e),
                      }),
                      (0, t.jsx)(eN.Label, {
                        htmlFor: 'remember',
                        className: 'text-sm font-normal cursor-pointer',
                        children: 'Remember me for 30 days',
                      }),
                    ],
                  }),
                  (0, t.jsx)(eS.Button, {
                    type: 'submit',
                    className: 'w-full',
                    disabled: v,
                    children: v
                      ? (0, t.jsxs)(t.Fragment, {
                          children: [
                            (0, t.jsx)(ej, { className: 'mr-2 h-4 w-4 animate-spin' }),
                            'Signing in...',
                          ],
                        })
                      : 'Sign In',
                  }),
                ],
              }),
              (0, t.jsxs)('div', {
                className: 'my-6 flex items-center gap-3',
                children: [
                  (0, t.jsx)('div', { className: 'h-px flex-1 bg-border' }),
                  (0, t.jsx)('span', {
                    className: 'text-xs text-muted-foreground',
                    children: 'or',
                  }),
                  (0, t.jsx)('div', { className: 'h-px flex-1 bg-border' }),
                ],
              }),
              (0, t.jsx)(eS.Button, {
                type: 'button',
                variant: 'outline',
                className: 'w-full',
                disabled: v,
                onClick: () => e2.toast.info('SSO belum tersedia'),
                children: '🔑 Continue with SSO',
              }),
              (0, t.jsxs)('p', {
                className: 'mt-8 text-center text-sm text-muted-foreground',
                children: [
                  "Don't have an account?",
                  ' ',
                  (0, t.jsx)('span', {
                    className: 'font-medium text-foreground',
                    children: 'Contact administrator',
                  }),
                ],
              }),
            ],
          });
        },
        'loginSchema',
        0,
        e5,
      ],
      64282,
    );
  },
]);
