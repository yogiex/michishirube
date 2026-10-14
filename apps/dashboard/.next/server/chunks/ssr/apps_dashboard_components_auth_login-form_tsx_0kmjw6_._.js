module.exports = [
  53763,
  (a) => {
    'use strict';
    var b = a.i(68508),
      c = a.i(48326),
      d = a.i(62965),
      e = (a) => a instanceof Date,
      f = (a) => null == a,
      g = (a) => !f(a) && !Array.isArray(a) && 'object' == typeof a && !e(a);
    let h = /[.[\]'"]/;
    var i = (a) => a.split(h).filter(Boolean);
    function j(a) {
      if (null === a || 'object' != typeof a) return a;
      if (a instanceof Date) return new Date(a);
      ('u' > typeof Blob && Blob, 'u' > typeof FileList && FileList);
      let b = Array.isArray(a);
      if (!b && a.constructor !== Object) return a;
      let c = b ? [] : Object.create(Object.getPrototypeOf(a));
      for (let b in a) Object.prototype.hasOwnProperty.call(a, b) && (c[b] = j(a[b]));
      return c;
    }
    let k = 'trigger',
      l = 'onChange',
      m = 'onSubmit',
      n = 'maxLength',
      o = 'minLength',
      p = 'pattern',
      q = 'required',
      r = 'validate',
      s = 'root',
      t = ['__proto__', 'constructor', 'prototype'],
      u = /^\w*$/;
    var v = (a) => void 0 === a,
      w = (a, b, c) => {
        if (!b || !g(a)) return c;
        let d = u.test(b) ? [b] : i(b);
        if (d.some((a) => t.includes(a))) return c;
        let e = d.reduce((a, b) => (f(a) ? void 0 : a[b]), a);
        return v(e) || e === a ? (v(a[b]) ? c : a[b]) : e;
      },
      x = (a) => 'function' == typeof a,
      y = (a, b, c) => {
        let d = -1,
          e = u.test(b) ? [b] : i(b),
          f = e.length,
          h = f - 1;
        for (; ++d < f;) {
          let b = e[d],
            f = c;
          if (d !== h) {
            let c = a[b];
            f = g(c) || Array.isArray(c) ? c : isNaN(+e[d + 1]) ? {} : [];
          }
          if (t.includes(b)) return;
          ((a[b] = f), (a = a[b]));
        }
      };
    c.default.createContext(null).displayName = 'HookFormControlContext';
    let z = c.default.useEffect;
    var A = (a) => f(a) || 'object' != typeof a;
    let B = (a, b) => {
      let c;
      return (
        0 === b.length &&
        !Array.isArray(a) &&
        !(g((c = a.constructor && a.constructor.prototype)) && c.hasOwnProperty('isPrototypeOf'))
      );
    };
    function C(a, b, c = new WeakMap()) {
      if (a === b) return !0;
      if (A(a) || A(b)) return Object.is(a, b);
      if (e(a) && e(b)) return Object.is(a.getTime(), b.getTime());
      let d = Object.keys(a),
        f = Object.keys(b);
      if (d.length !== f.length) return !1;
      if (B(a, d) || B(b, f)) return Object.is(a, b);
      if (!d.length && Array.isArray(a) !== Array.isArray(b)) return !1;
      let h = c.get(a);
      if (h && h.has(b)) return !0;
      if (h) h.add(b);
      else {
        let d = new WeakSet();
        (d.add(b), c.set(a, d));
      }
      for (let f of d) {
        let d = a[f];
        if (!(f in b)) return !1;
        if ('ref' !== f) {
          let a = b[f];
          if (
            (e(d) && e(a)) || ((g(d) || Array.isArray(d)) && (g(a) || Array.isArray(a)))
              ? !C(d, a, c)
              : !Object.is(d, a)
          )
            return !1;
        }
      }
      return !0;
    }
    var D = (a) => 'string' == typeof a,
      E = (a) => ({
        isOnSubmit: !a || a === m,
        isOnBlur: 'onBlur' === a,
        isOnChange: a === l,
        isOnAll: 'all' === a,
        isOnTouch: 'onTouched' === a,
      }),
      F = (a, b, c) => {
        if (c) return !1;
        if (b.watchAll || b.watch.has(a)) return !0;
        for (let c of b.watch) if (a.startsWith(c) && '.' === a.charAt(c.length)) return !0;
        return !1;
      };
    let G = (a, b, c) => {
      for (let d of c || Object.keys(a)) {
        if ('_f' === d) continue;
        let e = c ? w(a, d) : a[d];
        if (e) {
          let { _f: a } = e;
          if (a) {
            if (a.refs && a.refs[0] && b(a.refs[0], a.name)) return !0;
            else if (a.ref && b(a.ref, a.name)) return !0;
            else if (G(e, b)) return !0;
          } else if ((g(e) || Array.isArray(e)) && G(e, b)) return !0;
        }
      }
    };
    var H = (a, b, c) => {
        let d = w(a, c),
          e = Array.isArray(d) ? d : [];
        return (y(e, s, b[c]), y(a, c, e), a);
      },
      I = (a) => g(a) && !Object.keys(a).length,
      J = (a, b, c, d, e) =>
        b ? { ...c[a], types: { ...(c[a] && c[a].types ? c[a].types : {}), [d]: e || !0 } } : {};
    let K = { value: !1, isValid: !1 },
      L = { value: !0, isValid: !0 };
    var M = (a) => {
      if (!Array.isArray(a)) return K;
      if (a.length > 1) {
        let b = a.filter((a) => a && a.checked && !a.disabled).map((a) => a.value);
        return { value: b, isValid: !!b.length };
      }
      let b = a[0];
      return b && b.checked && !b.disabled
        ? b.attributes && 'value' in b.attributes
          ? v(b.value) || '' === b.value
            ? L
            : { value: b.value, isValid: !0 }
          : L
        : K;
    };
    let N = { isValid: !1, value: null };
    var O = (a) =>
      Array.isArray(a)
        ? a.reduce(
            (a, b) => (b && b.checked && !b.disabled ? { isValid: !0, value: b.value } : a),
            N,
          )
        : N;
    function P(a, b, c = 'validate') {
      if (D(a) || (Array.isArray(a) && a.every(D)) || ('boolean' == typeof a && !a))
        return { type: c, message: D(a) ? a : '', ref: b };
    }
    var Q = (a) => (!g(a) || a instanceof RegExp ? { value: a, message: '' } : a),
      R = async (a, b, c, d, h, i) => {
        let {
            ref: j,
            refs: k,
            required: l,
            maxLength: m,
            minLength: s,
            min: t,
            max: u,
            pattern: y,
            validate: z,
            name: A,
            valueAsNumber: B,
            mount: C,
          } = a._f,
          E = w(c, A);
        if (!C || b.has(A)) return {};
        let F = k ? k[0] : j,
          G = (a) => {
            if (h && F.reportValidity) {
              let b = 'boolean' == typeof a ? '' : a || '';
              (k ? k.forEach((a) => a.setCustomValidity(b)) : F.setCustomValidity(b),
                F.reportValidity());
            }
          },
          H = {},
          K = 'radio' === j.type,
          L = 'checkbox' === j.type,
          N =
            ((B || 'file' === j.type) && v(j.value) && v(E)) ||
            '' === E ||
            (Array.isArray(E) && !E.length),
          R = J.bind(null, A, d, H),
          S = (a, b, c, d = n, e = o) => {
            let f = a ? b : c;
            H[A] = { type: a ? d : e, message: f, ref: j, ...R(a ? d : e, f) };
          };
        if (
          i
            ? !Array.isArray(E) || !E.length
            : l &&
              ((!(K || L) && (N || f(E))) ||
                ('boolean' == typeof E && !E) ||
                (L && !M(k).isValid) ||
                (K && !O(k).isValid))
        ) {
          let { value: a, message: b } = D(l) ? { value: !!l, message: l } : Q(l);
          if (a && ((H[A] = { type: q, message: b, ref: F, ...R(q, b) }), !d)) return (G(b), H);
        }
        if (!N && (!f(t) || !f(u))) {
          let a,
            b,
            c = Q(u),
            g = Q(t);
          if (f(E) || e(E) || isNaN(E)) {
            let d = j.valueAsDate || new Date(E),
              e = (a) => new Date(new Date().toDateString() + ' ' + a),
              f = 'time' == j.type,
              h = 'week' == j.type;
            (D(c.value) &&
              E &&
              (a = f ? e(E) > e(c.value) : h ? E > c.value : d > new Date(c.value)),
              D(g.value) &&
                E &&
                (b = f ? e(E) < e(g.value) : h ? E < g.value : d < new Date(g.value)));
          } else {
            let d = j.valueAsNumber || (E ? +E : E);
            (f(c.value) || (a = d > c.value), f(g.value) || (b = d < g.value));
          }
          if ((a || b) && (S(!!a, c.message, g.message, 'max', 'min'), !d))
            return (G(H[A].message), H);
        }
        if ((m || s) && !N && (D(E) || (i && Array.isArray(E)))) {
          let a = Q(m),
            b = Q(s),
            c = !f(a.value) && E.length > +a.value,
            e = !f(b.value) && E.length < +b.value;
          if ((c || e) && (S(c, a.message, b.message), !d)) return (G(H[A].message), H);
        }
        if (y && !N && D(E)) {
          let { value: a, message: b } = Q(y);
          if (
            a instanceof RegExp &&
            !E.match(a) &&
            ((H[A] = { type: p, message: b, ref: j, ...R(p, b) }), !d)
          )
            return (G(b), H);
        }
        if (z) {
          if (x(z)) {
            let a = P(await z(E, c), F);
            if (a && ((H[A] = { ...a, ...R(r, a.message) }), !d)) return (G(a.message), H);
          } else if (g(z)) {
            let a = {};
            for (let b in z) {
              if (!I(a) && !d) break;
              let e = P(await z[b](E, c), F, b);
              e && ((a = { ...e, ...R(b, e.message) }), d || G(e.message), d && (H[A] = a));
            }
            if (!I(a) && ((H[A] = { ref: F, ...a }), !d)) return H;
          }
        }
        let T = H[A];
        return (G(!T || T.message), H);
      },
      S = (a) => (Array.isArray(a) ? a : [a]),
      T = (a) => (Array.isArray(a) ? a.filter(Boolean) : []);
    function U(a, b) {
      if (D(b) && Object.prototype.hasOwnProperty.call(a, b)) return (delete a[b], a);
      let c = Array.isArray(b) ? b : u.test(b) ? [b] : i(b);
      if (c.some((a) => t.includes(String(a)))) return a;
      let d =
          1 === c.length
            ? a
            : (function (a, b) {
                let c = b.length - 1,
                  d = 0;
                for (; d < c;) {
                  if (f(a)) {
                    a = void 0;
                    break;
                  }
                  ((a = a[b[d]]), d++);
                }
                return a;
              })(a, c),
        e = c.length - 1,
        h = c[e];
      return (
        d && delete d[h],
        0 !== e &&
          ((g(d) && I(d)) ||
            (Array.isArray(d) &&
              (function (a) {
                for (let b in a) if (a.hasOwnProperty(b) && !v(a[b])) return !1;
                return !0;
              })(d))) &&
          U(a, c.slice(0, -1)),
        a
      );
    }
    c.default.createContext(null).displayName = 'HookFormContext';
    var V = () => {
      let a = [];
      return {
        get observers() {
          return a;
        },
        next: (b) => {
          for (let c of a) c.next && c.next(b);
        },
        subscribe: (b) => (
          a.push(b),
          {
            unsubscribe: () => {
              a = a.filter((a) => a !== b);
            },
          }
        ),
        unsubscribe: () => {
          a = [];
        },
      };
    };
    let W = (a, b) =>
      null !== a && 'object' == typeof a && Object.prototype.hasOwnProperty.call(a, b);
    var X = (a, b) => {
        if (!b) return !1;
        let c = a;
        for (let d of u.test(b) ? [b] : i(b)) {
          if (!W(c, d)) return W(a, b);
          c = c[d];
        }
        return !0;
      },
      Y = (a) => !1;
    function Z(a) {
      return Array.isArray(a) || g(a);
    }
    function $(a) {
      return (
        Array.isArray(a) ||
        (g(a) &&
          !((a) => {
            for (let b in a) if (x(a[b])) return !0;
            return !1;
          })(a))
      );
    }
    function _(a) {
      return !!(a && '_f' in a);
    }
    function aa(a) {
      return Array.isArray(a) ? !a.some((a) => !v(a)) : !Object.keys(a).length;
    }
    function ab(a, b) {
      Array.isArray(a) ? (a[b] = void 0) : delete a[b];
    }
    function ac(a, b = {}, c) {
      for (let d in a) {
        let e = a[d],
          f = c && c[d];
        !$(e) || (Array.isArray(e) && _(f))
          ? v(e) || (b[d] = !0)
          : ((b[d] = Array.isArray(e) ? [] : {}), ac(e, b[d], f), aa(b[d]) && ab(b, d));
      }
      return b;
    }
    function ad(a, b, c, d) {
      for (let e in (c || (c = ac(b, {}, d)), a)) {
        let g = a[e],
          h = d && d[e];
        !$(g) || (Array.isArray(g) && _(h))
          ? C(g, b[e])
            ? ab(c, e)
            : (c[e] = !0)
          : (v(b) || A(c[e])
              ? (c[e] = ac(g, Array.isArray(g) ? [] : {}, h))
              : ad(g, f(b) ? {} : b[e], c[e], h),
            aa(c[e]) && ab(c, e));
      }
      return c;
    }
    var ae = (a, { valueAsNumber: b, valueAsDate: c, setValueAs: d }) =>
      v(a) ? a : b ? ('' === a ? NaN : a ? +a : a) : c && D(a) ? new Date(a) : d ? d(a) : a;
    function af(a) {
      let b = a.ref;
      return 'file' === b.type
        ? b.files
        : 'radio' === b.type
          ? O(a.refs).value
          : 'select-multiple' === b.type
            ? [...b.selectedOptions].map(({ value: a }) => a)
            : 'checkbox' === b.type
              ? M(a.refs).value
              : ae(b.value, a);
    }
    var ag = (a) =>
      v(a)
        ? a
        : a instanceof RegExp
          ? a.source
          : g(a)
            ? a.value instanceof RegExp
              ? a.value.source
              : a.value
            : a;
    let ah = 'AsyncFunction';
    var ai = (a) => {
      if (!a || !a.validate) return !1;
      if (x(a.validate)) return a.validate.constructor.name === ah;
      if (g(a.validate)) {
        for (let b in a.validate) if (a.validate[b].constructor.name === ah) return !0;
      }
      return !1;
    };
    function aj(a, b, c) {
      let d = w(a, c);
      if ((null == d ? void 0 : d.type) || (null == d ? void 0 : d.message) || Array.isArray(d))
        return { error: d, name: c };
      let e = c.split('.');
      for (; e.length;) {
        let d = e.join('.'),
          f = w(b, d),
          g = w(a, d);
        if (f && !Array.isArray(f) && c !== d) break;
        if (g && g.type) return { name: d, error: g };
        if (g && g.root && g.root.type) return { name: `${d}.root`, error: g.root };
        e.pop();
      }
      return { name: c };
    }
    let ak = { mode: m, reValidateMode: l, shouldFocusError: !0 },
      al = 'form',
      am = {
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
      an = (a, b, c) => {
        if (a && 'reportValidity' in a) {
          let d = w(c, b);
          (a.setCustomValidity((d && d.message) || ''), a.reportValidity());
        }
      },
      ao = (a, b) => {
        for (let c in b.fields) {
          let d = b.fields[c];
          d && d.ref && 'reportValidity' in d.ref
            ? an(d.ref, c, a)
            : d && d.refs && d.refs.forEach((b) => an(b, c, a));
        }
      },
      ap = (a, b) => {
        b.shouldUseNativeValidation && ao(a, b);
        let c = {};
        for (let d in a) {
          let e = w(b.fields, d),
            f = Object.assign(a[d] || {}, { ref: e && e.refs ? e.refs[0] : e && e.ref });
          if (aq(b.names || Object.keys(a), d)) {
            let a = Object.assign({}, w(c, d));
            (y(a, 'root', f), y(c, d, a));
          } else y(c, d, f);
        }
        return c;
      },
      aq = (a, b) => {
        let c = ar(b).replace(/[.*+?^${}()|\\]/g, '\\$&');
        return a.some((a) => ar(a).match(`^${c}\\.\\d+`));
      };
    function ar(a) {
      return a.replace(/\[(\d+)]/g, '.$1').replace(/[[\]]/g, '');
    }
    function as() {
      return (as = Object.assign.bind()).apply(null, arguments);
    }
    function at(a, b) {
      try {
        var c = a();
      } catch (a) {
        return b(a);
      }
      return c && c.then ? c.then(void 0, b) : c;
    }
    var au = a.i(12670),
      av = a.i(10641);
    let aw = (0, av.default)('Eye', [
        [
          'path',
          {
            d: 'M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0',
            key: '1nclc0',
          },
        ],
        ['circle', { cx: '12', cy: '12', r: '3', key: '1v7zrd' }],
      ]),
      ax = (0, av.default)('EyeOff', [
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
      ay = (0, av.default)('LoaderCircle', [
        ['path', { d: 'M21 12a9 9 0 1 1-6.219-8.56', key: '13zald' }],
      ]);
    var az = a.i(78585),
      aA = a.i(48741),
      aB = a.i(75414),
      aC = a.i(88878),
      aD = a.i(21831),
      aE = a.i(91321),
      aF = a.i(96265),
      aG = a.i(41151),
      aH = a.i(77483),
      aI = a.i(18920),
      aJ = a.i(36102),
      aK = Object.defineProperty,
      aL = (a, b) => aK(a, 'name', { value: b, configurable: !0 }),
      aM = 'Checkbox',
      [aN, aO] = (0, aE.createContextScope)(aM),
      [aP, aQ] = aN(aM);
    function aR(a) {
      let {
          __scopeCheckbox: d,
          checked: e,
          children: f,
          defaultChecked: g,
          disabled: h,
          form: i,
          name: j,
          onCheckedChange: k,
          required: l,
          value: m = 'on',
          internal_do_not_use_render: n,
        } = a,
        [o, p] = (0, aG.useControllableState)({
          prop: e,
          defaultProp: g ?? !1,
          onChange: k,
          caller: aM,
        }),
        [q, r] = c.useState(null),
        [s, t] = c.useState(null),
        u = c.useRef(!1),
        [v, w] = c.useReducer((a) => a + 1, 0),
        x = !q || !!i || !!q.closest('form'),
        y = {
          checked: o,
          disabled: h,
          setChecked: p,
          control: q,
          setControl: r,
          name: j,
          form: i,
          value: m,
          hasConsumerStoppedPropagationRef: u,
          userInteractionCount: v,
          onUserInteraction: w,
          required: l,
          defaultChecked: !aX(g) && g,
          isFormControl: x,
          bubbleInput: s,
          setBubbleInput: t,
        };
      return (0, b.jsx)(aP, { scope: d, ...y, children: aW(n) ? n(y) : f });
    }
    aL(aR, 'CheckboxProvider');
    var aS = c.forwardRef(
        aL(function ({ __scopeCheckbox: a, onKeyDown: d, onClick: e, ...f }, g) {
          let {
              control: h,
              value: i,
              disabled: j,
              checked: k,
              required: l,
              setControl: m,
              setChecked: n,
              hasConsumerStoppedPropagationRef: o,
              onUserInteraction: p,
              isFormControl: q,
              bubbleInput: r,
            } = aQ('CheckboxTrigger', a),
            s = (0, aD.useComposedRefs)(g, m),
            t = c.useRef(k);
          return (
            c.useEffect(() => {
              let a = h?.form;
              if (a) {
                let b = aL(() => n(t.current), 'reset');
                return (a.addEventListener('reset', b), () => a.removeEventListener('reset', b));
              }
            }, [h, n]),
            (0, b.jsx)(aJ.Primitive.button, {
              type: 'button',
              role: 'checkbox',
              'aria-checked': aX(k) ? 'mixed' : k,
              'aria-required': l,
              'data-state': aY(k),
              'data-disabled': j ? '' : void 0,
              disabled: j,
              value: i,
              ...f,
              ref: s,
              onKeyDown: (0, aF.composeEventHandlers)(d, (a) => {
                'Enter' === a.key && a.preventDefault();
              }),
              onClick: (0, aF.composeEventHandlers)(e, (a) => {
                (p(),
                  n((a) => !!aX(a) || !a),
                  r &&
                    q &&
                    ((o.current = a.isPropagationStopped()), o.current || a.stopPropagation()));
              }),
            })
          );
        }, 'CheckboxTrigger'),
      ),
      aT = c.forwardRef(
        aL(function (a, c) {
          let {
            __scopeCheckbox: d,
            name: e,
            checked: f,
            defaultChecked: g,
            required: h,
            disabled: i,
            value: j,
            onCheckedChange: k,
            form: l,
            ...m
          } = a;
          return (0, b.jsx)(aR, {
            __scopeCheckbox: d,
            checked: f,
            defaultChecked: g,
            disabled: i,
            required: h,
            onCheckedChange: k,
            name: e,
            form: l,
            value: j,
            internal_do_not_use_render: ({ isFormControl: a }) =>
              (0, b.jsxs)(b.Fragment, {
                children: [
                  (0, b.jsx)(aS, { ...m, ref: c, __scopeCheckbox: d }),
                  a && (0, b.jsx)(aV, { __scopeCheckbox: d }),
                ],
              }),
          });
        }, 'Checkbox'),
      ),
      aU = c.forwardRef(
        aL(function (a, c) {
          let { __scopeCheckbox: d, forceMount: e, ...f } = a,
            g = aQ('CheckboxIndicator', d);
          return (0, b.jsx)(aI.Presence, {
            present: e || aX(g.checked) || !0 === g.checked,
            children: (0, b.jsx)(aJ.Primitive.span, {
              'data-state': aY(g.checked),
              'data-disabled': g.disabled ? '' : void 0,
              ...f,
              ref: c,
              style: { pointerEvents: 'none', ...a.style },
            }),
          });
        }, 'CheckboxIndicator'),
      ),
      aV = c.forwardRef(
        aL(function ({ __scopeCheckbox: a, onClick: d, ...e }, f) {
          let {
              control: g,
              hasConsumerStoppedPropagationRef: h,
              userInteractionCount: i,
              checked: j,
              defaultChecked: k,
              required: l,
              disabled: m,
              name: n,
              value: o,
              form: p,
              bubbleInput: q,
              setBubbleInput: r,
            } = aQ('CheckboxBubbleInput', a),
            s = (0, aD.useComposedRefs)(f, r),
            t = (0, aH.useSize)(g),
            u = c.useRef(!1),
            v = c.useRef(j),
            w = c.useRef(i);
          c.useEffect(() => {
            if (!q) return;
            let a = Object.getOwnPropertyDescriptor(
                window.HTMLInputElement.prototype,
                'checked',
              ).set,
              b = i !== w.current;
            w.current = i;
            let c = v.current !== j;
            v.current = j;
            let d = !(b && h.current);
            if (c && a) {
              u.current = !b;
              let c = new Event('click', { bubbles: d });
              ((q.indeterminate = aX(j)),
                a.call(q, !aX(j) && j),
                q.dispatchEvent(c),
                (u.current = !1));
            }
          }, [q, j, h, i]);
          let x = c.useRef(!aX(j) && j);
          return (0, b.jsx)(aJ.Primitive.input, {
            type: 'checkbox',
            'aria-hidden': !0,
            defaultChecked: k ?? x.current,
            required: l,
            disabled: m,
            name: n,
            value: o,
            form: p,
            ...e,
            tabIndex: -1,
            ref: s,
            onClick: (0, aF.composeEventHandlers)(d, (a) => {
              u.current && a.stopPropagation();
            }),
            style: {
              ...e.style,
              ...t,
              position: 'absolute',
              pointerEvents: 'none',
              opacity: 0,
              margin: 0,
              transform: 'translateX(-100%)',
            },
          });
        }, 'CheckboxBubbleInput'),
      );
    function aW(a) {
      return 'function' == typeof a;
    }
    function aX(a) {
      return 'indeterminate' === a;
    }
    function aY(a) {
      return aX(a) ? 'indeterminate' : a ? 'checked' : 'unchecked';
    }
    (aL(aW, 'isFunction'), aL(aX, 'isIndeterminate'), aL(aY, 'getState'));
    var aZ = a.i(67406),
      a$ = a.i(35147);
    let a_ = c.forwardRef(({ className: a, ...c }, d) =>
      (0, b.jsx)(aT, {
        ref: d,
        className: (0, a$.cn)(
          'peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
          a,
        ),
        ...c,
        children: (0, b.jsx)(aU, {
          className: (0, a$.cn)('flex items-center justify-center text-current'),
          children: (0, b.jsx)(aZ.Check, { className: 'h-4 w-4' }),
        }),
      }),
    );
    a_.displayName = aT.displayName;
    var a0 = a.i(20434),
      a1 = a.i(86435);
    let a2 = au.z.object({
        email: au.z
          .string()
          .trim()
          .toLowerCase()
          .min(1, 'Email wajib diisi')
          .email('Email tidak valid')
          .max(254, 'Email terlalu panjang'),
        password: au.z
          .string()
          .min(8, 'Password minimal 8 karakter')
          .max(128, 'Password terlalu panjang'),
        remember: au.z.boolean(),
      }),
      a3 = au.z.object({
        user: au.z.object({
          userId: au.z.string().min(1).max(128),
          tenantId: au.z.string().min(1).max(128),
          roles: au.z.array(au.z.string().min(1).max(64)).min(1).max(20),
          email: au.z.string().max(254),
        }),
      });
    a.s(
      [
        'LoginForm',
        0,
        function ({ returnTo: a }) {
          let h = (0, d.useRouter)(),
            { login: l } = (0, a0.useAuth)(),
            [m, n] = (0, c.useState)(!1),
            [o, p] = (0, c.useState)(null),
            [q, t] = (0, c.useState)(!1),
            A = (function (a = {}) {
              let b,
                d,
                h,
                l,
                m = c.default.useRef(void 0),
                n = c.default.useRef(void 0),
                o = c.default.useRef(a.formControl),
                [p, q] = c.default.useState(() => ({
                  ...j(am),
                  isLoading: x(a.defaultValues),
                  errors: a.errors || {},
                  disabled: a.disabled || !1,
                  defaultValues: x(a.defaultValues) ? void 0 : a.defaultValues,
                }));
              if (!m.current || (a.formControl && o.current !== a.formControl))
                if (((o.current = a.formControl), a.formControl))
                  ((m.current = { ...a.formControl, formState: p }),
                    a.defaultValues &&
                      !x(a.defaultValues) &&
                      a.formControl.reset(a.defaultValues, a.resetOptions));
                else {
                  let { formControl: b, ...c } = (function (a = {}) {
                    let b = { ...ak, ...a },
                      c = {
                        ...j(am),
                        isLoading: x(b.defaultValues),
                        errors: b.errors || {},
                        disabled: b.disabled || !1,
                      },
                      d = {},
                      h =
                        ((g(b.defaultValues) || g(b.values)) && j(b.defaultValues || b.values)) ||
                        {},
                      l = b.shouldUnregister ? {} : j(h),
                      m = {
                        action: !1,
                        actionArrayLengths: new Map(),
                        mount: !1,
                        watch: !1,
                        keepIsValid: !1,
                      },
                      n = {
                        mount: new Set(),
                        disabled: new Set(),
                        unMount: new Set(),
                        array: new Set(),
                        watch: new Set(),
                        registerName: new Set(),
                      },
                      o = {},
                      p = {},
                      q = 0,
                      t = E(b.mode),
                      z = E(b.reValidateMode),
                      A = {
                        isDirty: !1,
                        dirtyFields: !1,
                        validatingFields: !1,
                        touchedFields: !1,
                        isValidating: !1,
                        isValid: !1,
                        errors: !1,
                      },
                      B = { ...A },
                      J = { ...B },
                      K = (...a) => a.some((a) => B[a] || J[a]),
                      L = { array: V(), state: V() },
                      M = 0,
                      N = 0,
                      O = 'all' === b.criteriaMode,
                      P = (a, b) => (c) => {
                        (clearTimeout(p[a]), (p[a] = setTimeout(b, c)));
                      },
                      Q = (a) => {
                        (clearTimeout(p[a]), delete p[a], delete o[a]);
                      },
                      W = (a) => {
                        Q(a);
                        let b = `${a}.`;
                        for (let a of Object.keys(o)) a.startsWith(b) && Q(a);
                      },
                      $ = async (a) => {
                        if (!m.keepIsValid && !b.disabled && (K('isValid') || a)) {
                          let a,
                            e = ++M;
                          (b.resolver
                            ? ((a = I((await an()).errors)), e === M && _())
                            : (a = await aq({ fields: d, onlyCheckValid: !0, eventType: 'valid' })),
                            e === M && a !== c.isValid && L.state.next({ isValid: a }));
                        }
                      },
                      _ = (a, d) => {
                        !b.disabled &&
                          K('isValidating', 'validatingFields') &&
                          ((a || n.mount).forEach((a) => {
                            a && (d ? y(c.validatingFields, a, d) : U(c.validatingFields, a));
                          }),
                          L.state.next({
                            validatingFields: c.validatingFields,
                            isValidating: !I(c.validatingFields),
                          }));
                      },
                      aa = () => {
                        c.dirtyFields = ad(h, l, void 0, d);
                      },
                      ab = (a, b) => {
                        (y(c.errors, a, b),
                          (c.errors = { ...c.errors }),
                          L.state.next({ errors: c.errors }));
                      },
                      ac = (b, e, g, j) => {
                        let k = w(d, b);
                        if (k) {
                          if (
                            ((a) => {
                              let b = u.test(a) ? [a] : i(a),
                                c = l,
                                d = h;
                              for (let a = 0; a < b.length - 1; a++) {
                                let e = b[a];
                                if (
                                  ((c = f(c) ? c : c[e]),
                                  (d = f(d) ? d : d[e]),
                                  null === c && null !== d)
                                )
                                  return !0;
                              }
                              return !1;
                            })(b) ||
                            ((a) => {
                              if (!m.actionArrayLengths.size) return !1;
                              let b = u.test(a) ? [a] : i(a),
                                c = l,
                                d = '',
                                e = -1,
                                g = 0;
                              for (let a = 0; a < b.length && !f(c); a++) {
                                let f = b[a];
                                if (((d = d ? `${d}.${f}` : f), Array.isArray(c) && +f >= c.length))
                                  return -1 !== e && (a !== e || +f < g);
                                if (
                                  (m.actionArrayLengths.has(d) &&
                                    ((e = a + 1), (g = m.actionArrayLengths.get(d))),
                                  v((c = c[f])) && -1 !== e && a > e && +b[e] < g)
                                )
                                  return !0;
                              }
                              return !1;
                            })(b)
                          )
                            return;
                          let d = v(w(l, b)),
                            o = w(l, b, v(g) ? w(h, b) : g);
                          (v(o) || (j && j.defaultChecked) || e
                            ? y(l, b, e ? o : af(k._f))
                            : at(b, o),
                            m.mount &&
                              !m.action &&
                              ($(),
                              d &&
                                c.isDirty &&
                                K('isDirty') &&
                                (ar() || ((c.isDirty = !1), L.state.next({ ...c }))),
                              a.shouldUnregister && d && !v(w(l, b)) && F(b, n) && (m.watch = !0)));
                        }
                      },
                      ah = (a, e, f, g, i) => {
                        let j = !1,
                          k = !1,
                          m = { name: a };
                        if (!b.disabled || !0 === g) {
                          if (!f || g) {
                            let b = C(w(h, a), e);
                            if (
                              (K('isDirty') &&
                                ((k = c.isDirty),
                                (c.isDirty = m.isDirty = !b || ar()),
                                (j = k !== m.isDirty)),
                              (k = !!w(c.dirtyFields, a)),
                              b !== c.isDirty)
                            ) {
                              var n = c.dirtyFields,
                                o = ad(h, l, void 0, d);
                              for (let a in n) a in o || delete n[a];
                              Object.assign(n, o);
                            } else b ? U(c.dirtyFields, a) : y(c.dirtyFields, a, !0);
                            ((m.dirtyFields = c.dirtyFields),
                              (j = j || (K('dirtyFields') && !b !== k)));
                          }
                          if (f) {
                            let b = w(c.touchedFields, a);
                            b ||
                              (y(c.touchedFields, a, f),
                              (m.touchedFields = c.touchedFields),
                              (j = j || (K('touchedFields') && b !== f)));
                          }
                          j && i && L.state.next(m);
                        }
                        return j ? m : {};
                      },
                      an = async (a) => (
                        _(a, !0),
                        await b.resolver(
                          l,
                          b.context,
                          ((a, b, c, d) => {
                            let e = {};
                            for (let c of a) {
                              let a = w(b, c);
                              a && y(e, c, a._f);
                            }
                            return {
                              criteriaMode: c,
                              names: [...a],
                              fields: e,
                              shouldUseNativeValidation: d,
                            };
                          })(a || n.mount, d, b.criteriaMode, b.shouldUseNativeValidation),
                        )
                      ),
                      ao = async (a) => {
                        let b = N,
                          { errors: e } = await an(a);
                        if (b !== N) return e;
                        if ((_(a), a)) {
                          for (let b of a) {
                            let a = w(e, b);
                            Q(b);
                            let f =
                                n.array.has(b) &&
                                g(a) &&
                                !Object.keys(a).some((a) => !Number.isNaN(Number(a))),
                              h = w(d, b),
                              i = g(h) && Object.keys(h).some((a) => '_f' !== a);
                            f
                              ? H(c.errors, { [b]: a }, b)
                              : (null == a ? void 0 : a.type) ||
                                  (null == a ? void 0 : a.message) ||
                                  Array.isArray(a) ||
                                  (g(a) && i)
                                ? y(c.errors, b, a)
                                : U(c.errors, b);
                          }
                          c.errors = { ...c.errors };
                        } else (Object.keys(o).forEach(Q), (c.errors = e));
                        return e;
                      },
                      ap = async ({ name: b, eventType: d }) => {
                        if (a.validate) {
                          let e = await a.validate({
                            formValues: l,
                            formState: c,
                            name: b,
                            eventType: d,
                          });
                          if (g(e))
                            for (let a in e) {
                              let b = e[a];
                              b &&
                                aC(`${al}.${a}`, {
                                  message: D(b.message) ? b.message : '',
                                  type: b.type || r,
                                });
                            }
                          else D(e) || !e ? aC(al, { message: e || '', type: r }) : aB(al);
                          return e;
                        }
                        return !0;
                      },
                      aq = async ({
                        fields: d,
                        onlyCheckValid: e,
                        name: f,
                        eventType: g,
                        context: h = { valid: !0, runRootValidation: !1 },
                      }) => {
                        if (
                          a.validate &&
                          ((h.runRootValidation = !0), !(await ap({ name: f, eventType: g }))) &&
                          ((h.valid = !1), e)
                        )
                          return h.valid;
                        for (let f in d) {
                          let i = d[f];
                          if (i) {
                            let { _f: d, ...j } = i;
                            if (d) {
                              let f = n.array.has(d.name),
                                g = i._f && ai(i._f),
                                j = K('isValidating', 'validatingFields');
                              g && j && _([d.name], !0);
                              let k = await R(
                                i,
                                n.disabled,
                                l,
                                O,
                                b.shouldUseNativeValidation && !e,
                                f,
                              );
                              if (
                                (g && j && _([d.name]),
                                (k[d.name] && ((h.valid = !1), e)) ||
                                  (e ||
                                    (Q(d.name),
                                    w(k, d.name)
                                      ? f
                                        ? H(c.errors, k, d.name)
                                        : y(c.errors, d.name, k[d.name])
                                      : U(c.errors, d.name)),
                                  a.shouldUseNativeValidation && k[d.name]))
                              )
                                break;
                            }
                            I(j) ||
                              (await aq({
                                context: h,
                                onlyCheckValid: e,
                                fields: j,
                                name: f,
                                eventType: g,
                              }));
                          }
                        }
                        return h.valid;
                      },
                      ar = (a, b) => (a && b && y(l, a, b), !C(m.mount ? l : h, h)),
                      as = (a, b, c) => {
                        var d, e;
                        return (
                          (d = n),
                          (e = { ...(m.mount ? l : v(b) || D(a) ? h : b) }),
                          D(a)
                            ? (c && d.watch.add(a), w(e, a, b))
                            : Array.isArray(a)
                              ? a.map((a) => (c && d.watch.add(a), w(e, a, w(b, a))))
                              : (c && (d.watchAll = !0), e)
                        );
                      },
                      at = (a, b, c = {}, e = !1, f = !1, g = !1) => {
                        let h = w(d, a),
                          i = b;
                        if (h) {
                          let c = h._f;
                          c &&
                            (c.disabled || y(l, a, ae(b, c)),
                            c.ref,
                            (i = b),
                            'select-multiple' === c.ref.type
                              ? [...c.ref.options].forEach(
                                  (a) => (a.selected = i.includes(a.value)),
                                )
                              : c.refs
                                ? 'checkbox' === c.ref.type
                                  ? c.refs.forEach((a) => {
                                      (a.defaultChecked && a.disabled) ||
                                        (Array.isArray(i)
                                          ? (a.checked = !!i.find((b) => b === a.value))
                                          : (a.checked = i === a.value || !!i));
                                    })
                                  : c.refs.forEach((a) => (a.checked = a.value === i))
                                : 'file' === c.ref.type
                                  ? (c.ref.value = '')
                                  : ((c.ref.value = i),
                                    c.ref.type ||
                                      f ||
                                      g ||
                                      L.state.next({ name: a, values: e ? l : j(l) })));
                        }
                        ((c.shouldDirty || c.shouldTouch) &&
                          ah(
                            a,
                            h &&
                              h._f &&
                              !h._f.disabled &&
                              (h._f.valueAsNumber || h._f.valueAsDate || h._f.setValueAs)
                              ? ae(b, h._f)
                              : i,
                            c.shouldTouch,
                            c.shouldDirty,
                            !f,
                          ),
                          c.shouldValidate && az(a, { delayError: c.delayError }));
                      },
                      au = (a, b, c, f = !1, h = !1, i = !1) => {
                        for (let k in (n.array.has(a) &&
                          L.array.next({ name: a, values: f ? l : j(l) }),
                        b)) {
                          if (!b.hasOwnProperty(k)) continue;
                          let j = b[k],
                            l = a + '.' + k,
                            m = w(d, l);
                          (n.array.has(a) || g(j) || (m && !m._f)) && !e(j)
                            ? au(l, j, c, f, h, i)
                            : at(l, j, c, f, h, i);
                        }
                      },
                      av = (a, b, e, g, h = !1) => {
                        let i = w(d, a),
                          k = n.array.has(a),
                          o = g ? b : j(b),
                          p = C(w(l, a), o);
                        if ((p || y(l, a, o), k))
                          (L.array.next({ name: a, values: g ? l : j(l) }),
                            K('isDirty', 'dirtyFields') &&
                              e.shouldDirty &&
                              (aa(),
                              h ||
                                L.state.next({
                                  name: a,
                                  dirtyFields: c.dirtyFields,
                                  isDirty: ar(a, o),
                                })));
                        else {
                          let b = (Array.isArray(o) && !o.length) || I(o),
                            c = !p && !h;
                          !i || i._f || f(o) || b ? at(a, o, e, g, h, c) : au(a, o, e, g, h, c);
                        }
                        if (!p && !h) {
                          let b = F(a, n),
                            d = g ? l : j(l);
                          if (
                            (L.state.next({
                              ...(b && c),
                              name: m.mount || b ? a : void 0,
                              values: d,
                            }),
                            !k)
                          )
                            for (let b of ((a, b) => {
                              let c = b.split('.'),
                                d = [],
                                e = c[0];
                              for (let b = 1; b < c.length; e += '.' + c[b++])
                                !isNaN(+c[b]) && a.has(e) && d.push(`${e}.${c[b]}`);
                              return d;
                            })(n.array, a))
                              L.state.next({ name: b, values: d });
                        }
                      },
                      aw = (a, b, c = {}) => av(a, b, c, !1),
                      ax = async (f) => {
                        m.mount = !0;
                        let h = f.target,
                          i = h.name,
                          k = !0,
                          p = w(d, i),
                          r = (a) => {
                            k = Number.isNaN(a) || (e(a) && isNaN(a.getTime())) || C(a, w(l, i, a));
                          };
                        if (p) {
                          let e,
                            m,
                            H,
                            J,
                            M = h.type
                              ? af(p._f)
                              : g((e = f)) && e.target
                                ? 'checkbox' === e.target.type
                                  ? e.target.checked
                                  : 'file' === e.target.type
                                    ? e.target.files
                                    : e.target.value
                                : e,
                            N = 'blur' === f.type || 'focusout' === f.type,
                            S =
                              !(
                                (J = p._f).mount &&
                                (J.required ||
                                  (!v(J.required) && !1 !== J.required) ||
                                  !v(J.min) ||
                                  !v(J.max) ||
                                  !v(J.maxLength) ||
                                  !v(J.minLength) ||
                                  J.pattern ||
                                  J.validate)
                              ) &&
                              !a.validate &&
                              !b.resolver &&
                              !w(c.errors, i) &&
                              !p._f.deps,
                            T =
                              S ||
                              ((s = N),
                              (u = w(c.touchedFields, i)),
                              (x = c.isSubmitted),
                              (A = z),
                              !(B = t).isOnAll &&
                                (!x && B.isOnTouch
                                  ? !(u || s)
                                  : (x ? A.isOnBlur : B.isOnBlur)
                                    ? !s
                                    : (x ? !A.isOnChange : !B.isOnChange) || s)),
                            V = F(i, n, N);
                          if ((y(l, i, j(M)), N)) {
                            if (!h || !h.readOnly) {
                              p._f.onBlur && p._f.onBlur(f);
                              let a = o[i];
                              a && a(0);
                            }
                          } else p._f.onChange && p._f.onChange(f);
                          let W = ah(i, M, N),
                            X = !I(W) || V;
                          if (
                            (N ||
                              L.state.next({
                                name: i,
                                type: f.type,
                                ...(q ? { values: j(l) } : {}),
                              }),
                            T)
                          )
                            return (
                              (!S || !c.isValid) &&
                                K('isValid') &&
                                ('onBlur' === b.mode ? N && $() : N || $()),
                              X && L.state.next({ name: i, ...(V ? {} : W) })
                            );
                          if (
                            (!b.resolver &&
                              a.validate &&
                              (await ap({ name: i, eventType: f.type })),
                            !N && V && L.state.next({ ...c }),
                            b.resolver)
                          ) {
                            let { errors: a } = await an([i]);
                            if ((_([i]), r(M), !k)) {
                              I(W) || L.state.next(W);
                              return;
                            }
                            let b = aj(c.errors, d, i),
                              e = aj(a, d, b.name || i);
                            ((m = e.error), (i = e.name), (H = I(a)));
                          } else
                            (_([i], !0),
                              (m = (await R(p, n.disabled, l, O, b.shouldUseNativeValidation))[i]),
                              _([i]),
                              r(M),
                              k &&
                                (m
                                  ? (H = !1)
                                  : K('isValid') &&
                                    (H = await aq({
                                      fields: d,
                                      onlyCheckValid: !0,
                                      name: i,
                                      eventType: f.type,
                                    }))));
                          if (k) {
                            p._f.deps &&
                              (!Array.isArray(p._f.deps) || p._f.deps.length > 0) &&
                              az(p._f.deps);
                            var s,
                              u,
                              x,
                              A,
                              B,
                              D = i,
                              E = H,
                              G = m;
                            let a = w(c.errors, D),
                              d = K('isValid') && 'boolean' == typeof E && c.isValid !== E;
                            if (
                              (b.delayError && G
                                ? ((o[D] = P(D, () => ab(D, G))), o[D](b.delayError))
                                : (Q(D),
                                  G ? y(c.errors, D, G) : U(c.errors, D),
                                  (c.errors = { ...c.errors })),
                              (G ? !C(a, G) : a) || !I(W) || d)
                            ) {
                              let a = {
                                ...W,
                                ...(d && 'boolean' == typeof E ? { isValid: E } : {}),
                                errors: c.errors,
                                name: D,
                              };
                              L.state.next(a);
                            }
                          }
                        }
                      },
                      ay = (a, b) => {
                        if (w(c.errors, b) && a.focus) return (a.focus(), 1);
                      },
                      az = async (a, e = {}) => {
                        let f,
                          g,
                          h = S(a);
                        if (b.resolver) {
                          let b = N,
                            c = await ao(v(a) ? a : h);
                          if (((f = I(c)), (g = a ? !h.some((a) => w(c, a)) : f), b !== N))
                            return g;
                        } else
                          a
                            ? ((g = (
                                await Promise.all(
                                  h.map(async (a) => {
                                    let b = w(d, a);
                                    return await aq({
                                      fields: b && b._f ? { [a]: b } : b,
                                      eventType: k,
                                    });
                                  }),
                                )
                              ).every(Boolean)) ||
                                c.isValid) &&
                              $()
                            : (g = f = await aq({ fields: d, name: a, eventType: k }));
                        if (e.delayError && b.delayError && D(a)) {
                          let d = w(c.errors, a);
                          d
                            ? (U(c.errors, a), (o[a] = P(a, () => ab(a, d))), o[a](b.delayError))
                            : Q(a);
                        }
                        if (e.shouldTouch)
                          for (let b of a ? h : n.mount)
                            n.array.has(b) || y(c.touchedFields, b, !0);
                        return (
                          L.state.next({
                            ...(!D(a) || (K('isValid') && f !== c.isValid) ? {} : { name: a }),
                            ...(b.resolver || !a ? { isValid: f } : {}),
                            ...(e.shouldTouch && K('touchedFields')
                              ? { touchedFields: c.touchedFields }
                              : {}),
                            errors: c.errors,
                          }),
                          e.shouldFocus && !g && G(d, ay, a ? h : n.mount),
                          g
                        );
                      },
                      aA = (a, b) => {
                        let d = b || c,
                          e = w(d.errors, a);
                        return {
                          invalid: !!e,
                          isDirty: !!w(d.dirtyFields, a),
                          error: e,
                          isValidating: !!w(d.validatingFields, a),
                          isTouched: !!w(d.touchedFields, a),
                        };
                      },
                      aB = (a) => {
                        let b = a ? S(a) : void 0;
                        b
                          ? b.forEach((a) => {
                              (W(a), U(c.errors, a), L.state.next({ name: a, errors: c.errors }));
                            })
                          : (Object.keys(o).forEach(Q),
                            (c.errors = {}),
                            L.state.next({ errors: c.errors }));
                      },
                      aC = (a, b, e) => {
                        Q(a);
                        let f = (w(d, a, { _f: {} })._f || {}).ref,
                          { ref: g, message: h, type: i, types: j, ...k } = w(c.errors, a) || {};
                        (y(c.errors, a, { ...k, ...b, ref: f }),
                          L.state.next({ name: a, errors: c.errors, isValid: !1 }),
                          e && e.shouldFocus && f && f.focus && f.focus());
                      },
                      aD = (a) => {
                        var b;
                        let d = !!(null == (b = a.formState) ? void 0 : b.values);
                        d && q++;
                        let { unsubscribe: e } = L.state.subscribe({
                          next: (b) => {
                            var d, e;
                            let f, g, i, j;
                            if (
                              ((f = a.name),
                              (g = b.name),
                              (i = a.exact),
                              (!f ||
                                !g ||
                                f === g ||
                                S(f).some(
                                  (a) =>
                                    a &&
                                    (i
                                      ? a === g || a.startsWith(g + '.')
                                      : a.startsWith(g) || g.startsWith(a)),
                                )) &&
                                ((d = a.formState || B),
                                (e = a.reRenderRoot),
                                aL(b),
                                !(j = Object.keys(b).filter((a) => 'name' !== a)).length ||
                                  (e && j.length >= Object.keys(d).length) ||
                                  j.find((a) => d[a] === (!e || 'all'))))
                            ) {
                              let d = { ...l };
                              a.callback({ values: d, ...c, ...b, defaultValues: h });
                            }
                          },
                        });
                        if (!d) return e;
                        let f = !1;
                        return () => {
                          f || ((f = !0), q--, e());
                        };
                      },
                      aE = (a, e = {}) => {
                        for (let f of a ? S(a) : n.mount)
                          (n.mount.delete(f),
                            n.array.delete(f),
                            n.disabled.delete(f),
                            e.keepValue || (U(d, f), U(l, f)),
                            e.keepError || (W(f), U(c.errors, f)),
                            e.keepDirty || U(c.dirtyFields, f),
                            e.keepTouched || U(c.touchedFields, f),
                            e.keepIsValidating || U(c.validatingFields, f),
                            b.shouldUnregister || e.keepDefaultValue || U(h, f));
                        (q && L.state.next({ values: j(l) }),
                          L.state.next({
                            ...c,
                            ...(e.keepDirty ? {} : { isDirty: ar() }),
                            ...(e.keepIsValidating ? {} : { isValidating: !I(c.validatingFields) }),
                          }),
                          e.keepIsValid || $());
                      },
                      aF = ({ disabled: a, name: b }) => {
                        if (('boolean' == typeof a && m.mount) || a || n.disabled.has(b)) {
                          let c = n.disabled.has(b);
                          (a ? n.disabled.add(b) : n.disabled.delete(b),
                            !!a !== c && m.mount && !m.action && $());
                        }
                      },
                      aG = (a, c = {}) => {
                        let e = w(d, a),
                          f = 'boolean' == typeof c.disabled || 'boolean' == typeof b.disabled,
                          g = !n.registerName.has(a) && e && e._f && !e._f.mount;
                        return (
                          (y(d, a, {
                            ...(e || {}),
                            _f: {
                              ...(e && e._f ? e._f : { ref: { name: a } }),
                              name: a,
                              mount: !0,
                              ...c,
                            },
                          }),
                          n.mount.add(a),
                          e && !g)
                            ? aF({
                                disabled: 'boolean' == typeof c.disabled ? c.disabled : b.disabled,
                                name: a,
                              })
                            : ac(a, !0, c.value),
                          {
                            ...(f ? { disabled: c.disabled || b.disabled } : {}),
                            ...(b.progressive
                              ? {
                                  required: !!c.required,
                                  min: ag(c.min),
                                  max: ag(c.max),
                                  minLength: ag(c.minLength),
                                  maxLength: ag(c.maxLength),
                                  pattern: ag(c.pattern),
                                }
                              : {}),
                            name: a,
                            onChange: ax,
                            onBlur: ax,
                            ref: (f) => {
                              if (f) {
                                let b;
                                (n.registerName.add(a),
                                  aG(a, c),
                                  n.registerName.delete(a),
                                  (e = w(d, a)));
                                let g =
                                    (v(f.value) &&
                                      f.querySelectorAll &&
                                      f.querySelectorAll('input,select,textarea')[0]) ||
                                    f,
                                  i = 'radio' === (b = g).type || 'checkbox' === b.type,
                                  j = e._f.refs || [];
                                if (i ? j.find((a) => a === g) : g === e._f.ref) return;
                                let k = { ...e._f };
                                (i
                                  ? ((k.refs = [
                                      ...j.filter(Y),
                                      g,
                                      ...(Array.isArray(w(h, a)) ? [{}] : []),
                                    ]),
                                    (k.ref = { type: g.type, name: a }))
                                  : ((k.ref = g), delete k.refs),
                                  y(d, a, { _f: k }),
                                  ac(a, !1, void 0, g));
                              } else {
                                let f;
                                ((e = w(d, a, {}))._f && (e._f.mount = !1),
                                  (b.shouldUnregister || c.shouldUnregister) &&
                                    ((f = n.array),
                                    !a
                                      .split('.')
                                      .some(
                                        (a, b, c) =>
                                          !isNaN(Number(a)) && f.has(c.slice(0, b).join('.')),
                                      ) || !m.action) &&
                                    n.unMount.add(a));
                              }
                            },
                          }
                        );
                      },
                      aH = () =>
                        b.shouldFocusError && !b.shouldUseNativeValidation && G(d, ay, n.mount),
                      aI = (a, e) => async (f) => {
                        let g, h;
                        f && (f.preventDefault && f.preventDefault(), f.persist && f.persist());
                        let i = j(l);
                        if ((L.state.next({ isSubmitting: !0 }), b.resolver)) {
                          let a = N,
                            { errors: b, values: d } = await an();
                          if (a !== N) return;
                          (_(), Object.keys(o).forEach(Q), (c.errors = b), (i = j(d)));
                        } else (await aq({ fields: d, eventType: 'submit' }), U(c.errors, s));
                        if (n.disabled.size) for (let a of n.disabled) U(i, a);
                        if (I(c.errors)) {
                          L.state.next({ errors: {} });
                          try {
                            g = await a(i, f);
                          } catch (a) {
                            h = a;
                          }
                        } else (e && (await e({ ...c.errors }, f)), aH(), setTimeout(aH));
                        if (
                          (L.state.next({
                            isSubmitted: !0,
                            isSubmitting: !1,
                            isSubmitSuccessful: I(c.errors) && !h,
                            submitCount: c.submitCount + 1,
                            errors: c.errors,
                          }),
                          h)
                        )
                          throw h;
                        return g;
                      },
                      aJ = (a, e = {}) => {
                        N++;
                        let f = a ? j(a) : h,
                          g = j(f),
                          i = I(a),
                          k = d;
                        if (
                          (Object.keys(o).forEach(Q), e.keepDefaultValues || (h = f), !e.keepValues)
                        ) {
                          if (e.keepDirtyValues)
                            for (let a of new Set([
                              ...n.mount,
                              ...(function a(b, c, d = '', e = []) {
                                for (let f in b) {
                                  let g = d ? `${d}.${f}` : f,
                                    h = b[f];
                                  Z(h) && Z(w(c, g)) ? a(h, c, g, e) : e.push(g);
                                }
                                return e;
                              })(ad(h, l, void 0, k), c.dirtyFields),
                            ])) {
                              let b = w(c.dirtyFields, a),
                                d = w(l, a),
                                e = w(g, a);
                              b && !v(d) ? y(g, a, d) : b || v(e) || aw(a, e);
                            }
                          else if (e.keepFieldsRef) for (let a of n.mount) aw(a, w(g, a));
                          else d = {};
                          if (b.shouldUnregister) {
                            if (((l = e.keepDefaultValues ? j(h) : {}), e.keepFieldsRef))
                              for (let a of n.mount) y(l, a, w(g, a));
                          } else l = j(g);
                          (L.array.next({ values: { ...g } }),
                            L.state.next({ name: void 0, type: void 0, values: { ...g } }));
                        }
                        ((n = {
                          mount: e.keepDirtyValues ? n.mount : new Set(),
                          unMount: new Set(),
                          array: new Set(),
                          registerName: new Set(),
                          disabled: new Set(),
                          watch: new Set(),
                          watchAll: !1,
                          focus: '',
                        }),
                          (m.mount =
                            !B.isValid ||
                            !!e.keepIsValid ||
                            !!e.keepDirtyValues ||
                            (!b.shouldUnregister && !I(g))),
                          (m.watch = !!b.shouldUnregister),
                          (m.keepIsValid = !!e.keepIsValid),
                          (m.action = !1),
                          m.actionArrayLengths.clear(),
                          e.keepErrors || (c.errors = {}),
                          L.state.next({
                            submitCount: e.keepSubmitCount ? c.submitCount : 0,
                            isDirty:
                              !i &&
                              (e.keepDirty
                                ? c.isDirty
                                : e.keepValues
                                  ? ar()
                                  : !!(e.keepDefaultValues && !C(a, h))),
                            isSubmitted: !!e.keepIsSubmitted && c.isSubmitted,
                            dirtyFields: i
                              ? {}
                              : e.keepDirtyValues
                                ? e.keepDefaultValues && l
                                  ? ad(h, l, void 0, k)
                                  : c.dirtyFields
                                : e.keepDefaultValues && a
                                  ? ad(h, a, void 0, k)
                                  : e.keepDirty
                                    ? c.dirtyFields
                                    : e.keepValues
                                      ? ad(h, l, void 0, k)
                                      : {},
                            touchedFields: e.keepTouched ? c.touchedFields : {},
                            ...(!e.keepIsValidating && (c.isValidating || !I(c.validatingFields))
                              ? { validatingFields: {}, isValidating: !1 }
                              : null),
                            errors: e.keepErrors ? c.errors : {},
                            isSubmitSuccessful: !!e.keepIsSubmitSuccessful && c.isSubmitSuccessful,
                            isSubmitting: !1,
                            defaultValues: h,
                          }));
                      },
                      aK = (a, c) => aJ(x(a) ? a(l) : a, { ...b.resetOptions, ...c }),
                      aL = (a) => {
                        let { name: b, type: d, values: e, ...f } = a;
                        c = { ...c, ...f };
                      };
                    L.state.subscribe({ next: aL });
                    let aM = {
                      control: {
                        register: aG,
                        unregister: aE,
                        getFieldState: aA,
                        handleSubmit: aI,
                        setError: aC,
                        _subscribe: aD,
                        _runSchema: an,
                        _updateIsValidating: _,
                        _focusError: aH,
                        _getWatch: as,
                        _getDirty: ar,
                        _setValid: $,
                        _setFieldArray: (a, e = [], f, g, h = !0, i = !0) => {
                          if (g && f && !b.disabled) {
                            m.action = !0;
                            let b = w(d, a);
                            if (
                              (m.actionArrayLengths.has(a) ||
                                m.actionArrayLengths.set(a, Array.isArray(b) ? b.length : 0),
                              i && Array.isArray(b))
                            ) {
                              let c = f(b, g.argA, g.argB);
                              h && y(d, a, c);
                            }
                            let k = w(c.errors, a);
                            if (i && Array.isArray(k)) {
                              var j;
                              let b,
                                d = k.root,
                                e = f(k, g.argA, g.argB) || k;
                              (d && (e.root = d),
                                h && y(c.errors, a, e),
                                T((b = w((j = c.errors), a))).length ||
                                  (null == b ? void 0 : b.root) ||
                                  U(j, a));
                            }
                            let l = w(c.touchedFields, a);
                            if (K('touchedFields') && i && Array.isArray(l)) {
                              let b = f(l, g.argA, g.argB);
                              h && y(c.touchedFields, a, b);
                            }
                            (K('dirtyFields') && aa(),
                              L.state.next({
                                name: a,
                                isDirty: ar(a, e),
                                dirtyFields: c.dirtyFields,
                                errors: c.errors,
                                isValid: c.isValid,
                              }));
                          } else y(l, a, e);
                        },
                        _setDisabledField: aF,
                        _setErrors: (a) => {
                          (Object.keys(o).forEach(Q),
                            (c.errors = a),
                            L.state.next({ errors: c.errors, isValid: !1 }));
                        },
                        _getFieldArray: (a) =>
                          T(w(m.mount ? l : h, a, b.shouldUnregister ? w(h, a, []) : [])),
                        _reset: aJ,
                        _resetDefaultValues: () =>
                          x(b.defaultValues) &&
                          b.defaultValues().then((a) => {
                            (aK(a, b.resetOptions), L.state.next({ isLoading: !1 }));
                          }),
                        _removeUnmounted: () => {
                          for (let a of n.unMount) {
                            let b = w(d, a);
                            b &&
                              (b._f.refs ? b._f.refs.every((a) => !Y(a)) : !Y(b._f.ref)) &&
                              aE(a);
                          }
                          n.unMount = new Set();
                        },
                        _disableForm: (a) => {
                          'boolean' == typeof a &&
                            (L.state.next({ disabled: a }),
                            G(
                              d,
                              (b, c) => {
                                let e = w(d, c);
                                e &&
                                  ((b.disabled = e._f.disabled || a),
                                  Array.isArray(e._f.refs) &&
                                    e._f.refs.forEach((b) => {
                                      b.disabled = e._f.disabled || a;
                                    }));
                              },
                              0,
                            ));
                        },
                        _subjects: L,
                        _proxyFormState: B,
                        get _fields() {
                          return d;
                        },
                        get _formValues() {
                          return l;
                        },
                        get _state() {
                          return m;
                        },
                        set _state(value) {
                          m = value;
                        },
                        get _defaultValues() {
                          return h;
                        },
                        get _names() {
                          return n;
                        },
                        set _names(value) {
                          n = value;
                        },
                        get _formState() {
                          return c;
                        },
                        get _options() {
                          return b;
                        },
                        set _options(value) {
                          ((t = E((b = { ...b, ...value }).mode)),
                            (z = E(b.reValidateMode)),
                            (O = 'all' === b.criteriaMode));
                        },
                      },
                      subscribe: (a) => (
                        (m.mount = !0),
                        (J = { ...J, ...a.formState }),
                        aD({ ...a, formState: { ...A, ...a.formState } })
                      ),
                      trigger: az,
                      register: aG,
                      handleSubmit: aI,
                      watch: (a, b) => {
                        if (x(a)) {
                          q++;
                          let { unsubscribe: c } = L.state.subscribe({
                              next: (c) => 'values' in c && a(c.values || as(void 0, b), c),
                            }),
                            d = !1;
                          return {
                            unsubscribe: () => {
                              d || ((d = !0), q--, c());
                            },
                          };
                        }
                        return as(a, b, !0);
                      },
                      setValue: aw,
                      setValues: (a, b = {}) => {
                        let d = x(a) ? a(l) : a;
                        if (!C(l, d)) {
                          for (let a of ((l = { ...l, ...d }), n.mount))
                            X(d, a) && av(a, w(d, a), b, !0, !0);
                          (L.state.next({
                            ...c,
                            name: void 0,
                            type: void 0,
                            ...(q ? { values: l } : {}),
                          }),
                            b.shouldValidate && $());
                        }
                      },
                      getValues: (a, b) => {
                        let d = { ...(m.mount ? l : h) };
                        return (
                          b &&
                            (d = (function a(b, c) {
                              let d = {};
                              for (let e in b)
                                if (b.hasOwnProperty(e)) {
                                  let f = b[e],
                                    h = c[e];
                                  if (f && g(f) && h) {
                                    let b = a(f, h);
                                    g(b) && (d[e] = b);
                                  } else b[e] && (d[e] = h);
                                }
                              return d;
                            })(b.dirtyFields ? c.dirtyFields : c.touchedFields, d)),
                          v(a) ? d : D(a) ? w(d, a) : a.map((a) => w(d, a))
                        );
                      },
                      getErrors: (a) =>
                        v(a)
                          ? { ...c.errors }
                          : D(a)
                            ? w(c.errors, a)
                            : a.map((a) => w(c.errors, a)),
                      reset: aK,
                      resetField: (a, b = {}) => {
                        w(d, a) &&
                          (U(c.validatingFields, a),
                          v(b.defaultValue)
                            ? aw(a, j(w(h, a)))
                            : (aw(a, b.defaultValue), y(h, a, j(b.defaultValue))),
                          b.keepTouched || U(c.touchedFields, a),
                          b.keepDirty ||
                            (U(c.dirtyFields, a),
                            (c.isDirty = b.defaultValue ? ar(a, j(w(h, a))) : ar())),
                          b.keepError || (Q(a), U(c.errors, a), $()),
                          L.state.next({ ...c, isValidating: !I(c.validatingFields) }));
                      },
                      resetDefaultValues: (a, b = {}) => {
                        if (((h = j(a)), !b.keepDirty)) {
                          let a = ad(h, l, void 0, d);
                          ((c.dirtyFields = a), (c.isDirty = !I(a)));
                        }
                        (b.keepIsValid || $(), L.state.next({ ...c, defaultValues: h }));
                      },
                      clearErrors: aB,
                      unregister: aE,
                      setError: aC,
                      setFocus: (a, b = {}) => {
                        let c = w(d, a),
                          e = c && c._f;
                        if (e) {
                          let a = e.refs ? e.refs[0] : e.ref;
                          a.focus &&
                            setTimeout(() => {
                              (a.focus(), b.shouldSelect && x(a.select) && a.select());
                            });
                        }
                      },
                      getFieldState: aA,
                    };
                    return { ...aM, formControl: aM };
                  })(a);
                  m.current = { ...c, formState: p };
                }
              let t = m.current.control;
              t._options = a;
              let A = () => ({ ...t._formState, defaultValues: t._defaultValues }),
                { resyncIfNeeded: B, snapshot: J } =
                  ((b = c.default.useRef(!1)),
                  (d = c.default.useRef(!1)),
                  (h = c.default.useRef(void 0)),
                  (l = c.default.useRef(0)),
                  l.current++,
                  !d.current && A && ((d.current = !0), (h.current = j(A()))),
                  {
                    resyncIfNeeded: c.default.useCallback((a, c, e) => {
                      if (a && (b.current || (d.current && l.current > 1))) {
                        let a = c();
                        C(h.current, a) || e(a);
                      }
                      b.current = !0;
                    }, []),
                    snapshot: c.default.useCallback((a, b) => {
                      a && (h.current = j(b()));
                    }, []),
                  });
              return (
                z(() => {
                  B(!0, A, q);
                  let a = t._subscribe({
                    formState: t._proxyFormState,
                    callback: () => q({ ...t._formState, defaultValues: t._defaultValues }),
                    reRenderRoot: !0,
                  });
                  return (
                    q((a) => ({ ...a, isReady: !0 })),
                    (t._formState.isReady = !0),
                    () => {
                      (a(), J(!0, A));
                    }
                  );
                }, [t, B, J]),
                c.default.useEffect(() => t._disableForm(a.disabled), [t, a.disabled]),
                c.default.useEffect(() => {
                  (a.mode && (t._options.mode = a.mode),
                    a.reValidateMode && (t._options.reValidateMode = a.reValidateMode));
                }, [t, a.mode, a.reValidateMode]),
                c.default.useEffect(() => {
                  a.errors && (t._setErrors(a.errors), t._focusError());
                }, [t, a.errors]),
                c.default.useEffect(() => {
                  a.shouldUnregister && t._subjects.state.next({ values: t._getWatch() });
                }, [t, a.shouldUnregister]),
                c.default.useEffect(() => {
                  if (t._proxyFormState.isDirty) {
                    let a = t._getDirty();
                    a !== p.isDirty && t._subjects.state.next({ isDirty: a });
                  }
                }, [t, p.isDirty]),
                c.default.useEffect(() => {
                  var b;
                  a.values && !C(a.values, n.current)
                    ? (t._reset(a.values, { keepFieldsRef: !0, ...t._options.resetOptions }),
                      (null == (b = t._options.resetOptions) ? void 0 : b.keepIsValid) ||
                        t._setValid(),
                      (n.current = a.values),
                      q((a) => ({ ...a })))
                    : t._resetDefaultValues();
                }, [t, a.values]),
                c.default.useEffect(() => {
                  (t._state.mount || (t._setValid(), (t._state.mount = !0)),
                    t._state.watch &&
                      ((t._state.watch = !1), t._subjects.state.next({ ...t._formState })),
                    t._removeUnmounted());
                }),
                (m.current.formState = c.default.useMemo(
                  () =>
                    ((a, b, c = !0) => {
                      let d = {};
                      for (let e in a)
                        Object.defineProperty(d, e, {
                          get: () => (
                            'all' !== b._proxyFormState[e] && (b._proxyFormState[e] = !c || 'all'),
                            a[e]
                          ),
                        });
                      return d;
                    })(p, t),
                  [t, p],
                )),
                m.current
              );
            })({
              resolver: (function (a, b) {
                if ((void 0 === b && (b = {}), '_zod' in a && 'object' == typeof a._zod))
                  return function (c, d, e) {
                    try {
                      return Promise.resolve(
                        at(
                          function () {
                            function d(a) {
                              return (
                                e.shouldUseNativeValidation && ao({}, e),
                                { errors: {}, values: b.raw ? Object.assign({}, c) : a }
                              );
                            }
                            return 'sync' === b.mode
                              ? d(a.parse(c, void 0))
                              : Promise.resolve(a.parseAsync(c, void 0)).then(d);
                          },
                          function (a) {
                            var b;
                            if (!(
                              null == a ||
                              null == (b = a._zod) ||
                              null == (b = b.traits) ||
                              !b.has('$ZodError')
                            ))
                              return {
                                values: {},
                                errors: ap(
                                  (function (a, b) {
                                    for (var c = Object.create(null); a.length;)
                                      !(function () {
                                        var d = a[0],
                                          e = d.code,
                                          f = d.message,
                                          g = d.path.join('.');
                                        if (!c[g])
                                          if ('invalid_union' === d.code && d.errors.length > 0) {
                                            var h,
                                              i,
                                              j = d.errors.reduce(function (a, b) {
                                                return b.length < a.length ? b : a;
                                              })[0];
                                            c[g] = {
                                              message:
                                                null != (h = null == j ? void 0 : j.message)
                                                  ? h
                                                  : f,
                                              type:
                                                null != (i = null == j ? void 0 : j.code) ? i : e,
                                            };
                                          } else c[g] = { message: f, type: e };
                                        if (
                                          ('invalid_union' === d.code &&
                                            d.errors.forEach(function (b) {
                                              return b.forEach(function (b) {
                                                return a.push(
                                                  as({}, b, { path: [].concat(d.path, b.path) }),
                                                );
                                              });
                                            }),
                                          b)
                                        ) {
                                          var k = c[g].types,
                                            l = k && k[d.code];
                                          c[g] = J(
                                            g,
                                            b,
                                            c,
                                            e,
                                            l ? [].concat(l, d.message) : d.message,
                                          );
                                        }
                                        a.shift();
                                      })();
                                    return c;
                                  })(
                                    a.issues,
                                    !e.shouldUseNativeValidation && 'all' === e.criteriaMode,
                                  ),
                                  e,
                                ),
                              };
                            throw a;
                          },
                        ),
                      );
                    } catch (a) {
                      return Promise.reject(a);
                    }
                  };
                if ('_def' in a && 'object' == typeof a._def)
                  return function (c, d, e) {
                    try {
                      return Promise.resolve(
                        at(
                          function () {
                            return Promise.resolve(
                              a['sync' === b.mode ? 'parse' : 'parseAsync'](c, void 0),
                            ).then(function (a) {
                              return (
                                e.shouldUseNativeValidation && ao({}, e),
                                { errors: {}, values: b.raw ? Object.assign({}, c) : a }
                              );
                            });
                          },
                          function (a) {
                            if (Array.isArray(null == a ? void 0 : a.issues))
                              return {
                                values: {},
                                errors: ap(
                                  (function (a, b) {
                                    for (var c = Object.create(null); a.length;) {
                                      var d = a[0],
                                        e = d.code,
                                        f = d.message,
                                        g = d.path.join('.');
                                      if (!c[g])
                                        if ('unionErrors' in d) {
                                          var h,
                                            i,
                                            j = d.unionErrors.reduce(function (a, b) {
                                              return b.errors.length < a.errors.length ? b : a;
                                            }).errors[0];
                                          c[g] = {
                                            message:
                                              null != (h = null == j ? void 0 : j.message) ? h : f,
                                            type: null != (i = null == j ? void 0 : j.code) ? i : e,
                                          };
                                        } else c[g] = { message: f, type: e };
                                      if (
                                        ('unionErrors' in d &&
                                          d.unionErrors.forEach(function (b) {
                                            return b.errors.forEach(function (b) {
                                              return a.push(b);
                                            });
                                          }),
                                        b)
                                      ) {
                                        var k = c[g].types,
                                          l = k && k[d.code];
                                        c[g] = J(
                                          g,
                                          b,
                                          c,
                                          e,
                                          l ? [].concat(l, d.message) : d.message,
                                        );
                                      }
                                      a.shift();
                                    }
                                    return c;
                                  })(
                                    a.errors,
                                    !e.shouldUseNativeValidation && 'all' === e.criteriaMode,
                                  ),
                                  e,
                                ),
                              };
                            throw a;
                          },
                        ),
                      );
                    } catch (a) {
                      return Promise.reject(a);
                    }
                  };
                throw Error('Invalid input: not a Zod schema');
              })(a2),
              defaultValues: { email: '', password: '', remember: !1 },
            });
          async function B(b) {
            let c = (function (a) {
              if (!a || !a.startsWith('/') || a.startsWith('//') || a.startsWith('/\\')) return '/';
              try {
                let b = new URL(a, 'https://dashboard.invalid');
                if ('https://dashboard.invalid' !== b.origin) return '/';
                return `${b.pathname}${b.search}${b.hash}`;
              } catch {
                return '/';
              }
            })(a);
            (t(!0), p(null));
            try {
              let a = await fetch('/api/auth/login', {
                  method: 'POST',
                  credentials: 'same-origin',
                  cache: 'no-store',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(b),
                }),
                d = await a.json();
              if (!a.ok) {
                let a =
                  'object' == typeof d && null !== d && 'error' in d && 'string' == typeof d.error
                    ? d.error
                    : 'Login gagal';
                throw Error(a);
              }
              let e = a3.safeParse(d);
              if (!e.success || !e.data.user.roles.includes('admin'))
                throw Error('Respons sesi tidak valid');
              (l(e.data.user), a1.toast.success('Welcome back, admin!'), h.replace(c), h.refresh());
            } catch (b) {
              let a = b instanceof Error ? b.message : 'Login gagal';
              (p(a), a1.toast.error(a));
            } finally {
              t(!1);
            }
          }
          let K = A.formState.errors;
          return (0, b.jsxs)('div', {
            className: 'animate-in-up',
            children: [
              (0, b.jsxs)('div', {
                className: 'mb-8',
                children: [
                  (0, b.jsx)('h1', {
                    className: 'text-2xl font-semibold tracking-tight',
                    children: 'Welcome back 👋',
                  }),
                  (0, b.jsx)('p', {
                    className: 'mt-1.5 text-sm text-muted-foreground',
                    children: 'Sign in to your admin account',
                  }),
                ],
              }),
              o &&
                (0, b.jsxs)('div', {
                  className:
                    'mb-6 flex items-start gap-3 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive',
                  children: [
                    (0, b.jsx)(az.AlertCircle, { className: 'mt-0.5 h-4 w-4 shrink-0' }),
                    (0, b.jsx)('span', { children: o }),
                  ],
                }),
              (0, b.jsxs)('form', {
                onSubmit: A.handleSubmit(B),
                className: 'space-y-5',
                children: [
                  (0, b.jsxs)('div', {
                    className: 'space-y-2',
                    children: [
                      (0, b.jsx)(aC.Label, { htmlFor: 'email', children: 'Email' }),
                      (0, b.jsx)(aB.Input, {
                        id: 'email',
                        type: 'email',
                        placeholder: 'admin@michishirube.dev',
                        autoComplete: 'email',
                        'aria-invalid': !!K.email,
                        disabled: q,
                        ...A.register('email'),
                      }),
                      K.email &&
                        (0, b.jsx)('p', {
                          className: 'text-xs text-destructive',
                          children: K.email.message,
                        }),
                    ],
                  }),
                  (0, b.jsxs)('div', {
                    className: 'space-y-2',
                    children: [
                      (0, b.jsxs)('div', {
                        className: 'flex items-center justify-between',
                        children: [
                          (0, b.jsx)(aC.Label, { htmlFor: 'password', children: 'Password' }),
                          (0, b.jsx)('a', {
                            href: '#',
                            className: 'text-xs text-primary hover:underline',
                            tabIndex: -1,
                            children: 'Forgot password?',
                          }),
                        ],
                      }),
                      (0, b.jsxs)('div', {
                        className: 'relative',
                        children: [
                          (0, b.jsx)(aB.Input, {
                            id: 'password',
                            type: m ? 'text' : 'password',
                            placeholder: '••••••••',
                            autoComplete: 'current-password',
                            'aria-invalid': !!K.password,
                            disabled: q,
                            className: 'pr-10',
                            ...A.register('password'),
                          }),
                          (0, b.jsx)('button', {
                            type: 'button',
                            onClick: () => n((a) => !a),
                            className:
                              'absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground',
                            'aria-label': m ? 'Hide password' : 'Show password',
                            tabIndex: -1,
                            children: m
                              ? (0, b.jsx)(ax, { className: 'h-4 w-4' })
                              : (0, b.jsx)(aw, { className: 'h-4 w-4' }),
                          }),
                        ],
                      }),
                      K.password &&
                        (0, b.jsx)('p', {
                          className: 'text-xs text-destructive',
                          children: K.password.message,
                        }),
                    ],
                  }),
                  (0, b.jsxs)('div', {
                    className: 'flex items-center gap-2',
                    children: [
                      (0, b.jsx)(a_, {
                        id: 'remember',
                        disabled: q,
                        checked: A.watch('remember'),
                        onCheckedChange: (a) => A.setValue('remember', !!a),
                      }),
                      (0, b.jsx)(aC.Label, {
                        htmlFor: 'remember',
                        className: 'text-sm font-normal cursor-pointer',
                        children: 'Remember me for 30 days',
                      }),
                    ],
                  }),
                  (0, b.jsx)(aA.Button, {
                    type: 'submit',
                    className: 'w-full',
                    disabled: q,
                    children: q
                      ? (0, b.jsxs)(b.Fragment, {
                          children: [
                            (0, b.jsx)(ay, { className: 'mr-2 h-4 w-4 animate-spin' }),
                            'Signing in...',
                          ],
                        })
                      : 'Sign In',
                  }),
                ],
              }),
              (0, b.jsxs)('div', {
                className: 'my-6 flex items-center gap-3',
                children: [
                  (0, b.jsx)('div', { className: 'h-px flex-1 bg-border' }),
                  (0, b.jsx)('span', {
                    className: 'text-xs text-muted-foreground',
                    children: 'or',
                  }),
                  (0, b.jsx)('div', { className: 'h-px flex-1 bg-border' }),
                ],
              }),
              (0, b.jsx)(aA.Button, {
                type: 'button',
                variant: 'outline',
                className: 'w-full',
                disabled: q,
                onClick: () => a1.toast.info('SSO belum tersedia'),
                children: '🔑 Continue with SSO',
              }),
              (0, b.jsxs)('p', {
                className: 'mt-8 text-center text-sm text-muted-foreground',
                children: [
                  "Don't have an account?",
                  ' ',
                  (0, b.jsx)('span', {
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
        a2,
      ],
      53763,
    );
  },
];

//# sourceMappingURL=apps_dashboard_components_auth_login-form_tsx_0kmjw6_._.js.map
