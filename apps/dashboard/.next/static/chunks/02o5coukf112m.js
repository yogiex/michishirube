(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  'object' == typeof document ? document.currentScript : void 0,
  96113,
  (e) => {
    'use strict';
    var t,
      n = e.i(39380),
      r = e.i(43836),
      o = e.i(78238),
      i = e.i(66100),
      a = e.i(32253),
      l = e.i(24830),
      c = Object.defineProperty,
      u = (e, t) => c(e, 'name', { value: t, configurable: !0 }),
      s = 'dismissableLayer.update',
      f = n.createContext({
        layers: new Set(),
        layersWithOutsidePointerEventsDisabled: new Set(),
        branches: new Set(),
        dismissableSurfaces: new Set(),
      }),
      d = n.forwardRef(
        u(function (e, c) {
          let {
              disableOutsidePointerEvents: d = !1,
              deferPointerDownOutside: p = !1,
              onEscapeKeyDown: m,
              onPointerDownOutside: y,
              onFocusOutside: w,
              onInteractOutside: b,
              onDismiss: x,
              ...E
            } = e,
            C = n.useContext(f),
            [S, R] = n.useState(null),
            L = S?.ownerDocument ?? globalThis?.document,
            [, A] = n.useState({}),
            P = (0, i.useComposedRefs)(c, R),
            O = Array.from(C.layers),
            [k] = [...C.layersWithOutsidePointerEventsDisabled].slice(-1),
            T = k ? O.indexOf(k) : -1,
            D = S ? O.indexOf(S) : -1,
            M = C.layersWithOutsidePointerEventsDisabled.size > 0,
            F = D >= T,
            N = n.useRef(!1),
            W = h(
              (e) => {
                (y?.(e), b?.(e), e.defaultPrevented || x?.());
              },
              {
                ownerDocument: L,
                deferPointerDownOutside: p,
                isDeferredPointerDownOutsideRef: N,
                dismissableSurfaces: C.dismissableSurfaces,
                shouldHandlePointerDownOutside: n.useCallback(
                  (e) => {
                    if (!(e instanceof Node)) return !1;
                    let t = [...C.branches].some((t) => t.contains(e));
                    return F && !t;
                  },
                  [C.branches, F],
                ),
              },
            ),
            j = v((e) => {
              if (p && N.current) return;
              let t = e.target;
              ![...C.branches].some((e) => e.contains(t)) &&
                (w?.(e), b?.(e), e.defaultPrevented || x?.());
            }, L),
            I = !!S && D === O.length - 1,
            H = (0, a.useCallbackRef)((e) => {
              'Escape' === e.key && (m?.(e), !e.defaultPrevented && x && (e.preventDefault(), x()));
            });
          return (
            n.useEffect(() => {
              if (I)
                return (
                  L.addEventListener('keydown', H, { capture: !0 }),
                  () => L.removeEventListener('keydown', H, { capture: !0 })
                );
            }, [L, I, H]),
            n.useEffect(() => {
              if (S)
                return (
                  d &&
                    (0 === C.layersWithOutsidePointerEventsDisabled.size &&
                      ((t = L.body.style.pointerEvents), (L.body.style.pointerEvents = 'none')),
                    C.layersWithOutsidePointerEventsDisabled.add(S)),
                  C.layers.add(S),
                  g(),
                  () => {
                    d &&
                      (C.layersWithOutsidePointerEventsDisabled.delete(S),
                      0 === C.layersWithOutsidePointerEventsDisabled.size &&
                        (L.body.style.pointerEvents = t));
                  }
                );
            }, [S, L, d, C]),
            n.useEffect(
              () => () => {
                S && (C.layers.delete(S), C.layersWithOutsidePointerEventsDisabled.delete(S), g());
              },
              [S, C],
            ),
            n.useEffect(() => {
              let e = u(() => A({}), 'handleUpdate');
              return (document.addEventListener(s, e), () => document.removeEventListener(s, e));
            }, []),
            (0, l.jsx)(o.Primitive.div, {
              ...E,
              ref: P,
              style: { pointerEvents: M ? (F ? 'auto' : 'none') : void 0, ...e.style },
              onFocusCapture: (0, r.composeEventHandlers)(e.onFocusCapture, j.onFocusCapture),
              onBlurCapture: (0, r.composeEventHandlers)(e.onBlurCapture, j.onBlurCapture),
              onPointerDownCapture: (0, r.composeEventHandlers)(
                e.onPointerDownCapture,
                W.onPointerDownCapture,
              ),
            })
          );
        }, 'DismissableLayer'),
      );
    function p() {
      let e = n.useContext(f),
        [t, r] = n.useState(null);
      return (
        n.useEffect(() => {
          if (t)
            return (
              e.dismissableSurfaces.add(t),
              () => {
                e.dismissableSurfaces.delete(t);
              }
            );
        }, [t, e.dismissableSurfaces]),
        r
      );
    }
    u(p, 'useDismissableLayerSurface');
    var m = u(() => !0, 'IS_TRUE');
    function h(e, t) {
      let {
          ownerDocument: r = globalThis?.document,
          deferPointerDownOutside: o = !1,
          isDeferredPointerDownOutsideRef: i,
          dismissableSurfaces: l,
          shouldHandlePointerDownOutside: c = m,
        } = t,
        s = (0, a.useCallbackRef)(e),
        f = n.useRef(!1),
        d = n.useRef(!1),
        p = n.useRef(new Map()),
        h = n.useRef(() => {});
      return (
        n.useEffect(() => {
          function e() {
            ((d.current = !1), (i.current = !1), p.current.clear());
          }
          function t() {
            return Array.from(p.current.values()).some(Boolean);
          }
          function n(e) {
            if (!d.current) return;
            let t = e.target;
            ((t instanceof Node && [...l].some((e) => e.contains(t))) || p.current.set(e.type, !0),
              'click' === e.type &&
                window.setTimeout(() => {
                  d.current && h.current();
                }, 0));
          }
          function a(e) {
            d.current && p.current.set(e.type, !1);
          }
          (u(e, 'resetOutsideInteraction'),
            u(t, 'isOutsideInteractionIntercepted'),
            u(n, 'handleInteractionCapture'),
            u(a, 'handleInteractionBubble'));
          let m = u((n) => {
              if (n.target && !f.current) {
                let a = function () {
                  r.removeEventListener('click', h.current);
                  let n = t();
                  (e(), n || y('dismissableLayer.pointerDownOutside', s, l, { discrete: !0 }));
                };
                if ((u(a, 'handleAndDispatchPointerDownOutsideEvent'), !c(n.target))) {
                  (r.removeEventListener('click', h.current), e(), (f.current = !1));
                  return;
                }
                let l = { originalEvent: n };
                ((d.current = !0),
                  (i.current = o && 0 === n.button),
                  p.current.clear(),
                  o && 0 === n.button
                    ? (r.removeEventListener('click', h.current),
                      (h.current = a),
                      r.addEventListener('click', h.current, { once: !0 }))
                    : a());
              } else (r.removeEventListener('click', h.current), e());
              f.current = !1;
            }, 'handlePointerDown'),
            v = ['pointerup', 'mousedown', 'mouseup', 'touchstart', 'touchend', 'click'];
          for (let e of v) (r.addEventListener(e, n, !0), r.addEventListener(e, a));
          let g = window.setTimeout(() => {
            r.addEventListener('pointerdown', m);
          }, 0);
          return () => {
            for (let e of (window.clearTimeout(g),
            r.removeEventListener('pointerdown', m),
            r.removeEventListener('click', h.current),
            v))
              (r.removeEventListener(e, n, !0), r.removeEventListener(e, a));
          };
        }, [r, s, o, i, l, c]),
        { onPointerDownCapture: u(() => (f.current = !0), 'onPointerDownCapture') }
      );
    }
    function v(e, t = globalThis?.document) {
      let r = (0, a.useCallbackRef)(e),
        o = n.useRef(!1);
      return (
        n.useEffect(() => {
          let e = u((e) => {
            e.target &&
              !o.current &&
              y('dismissableLayer.focusOutside', r, { originalEvent: e }, { discrete: !1 });
          }, 'handleFocus');
          return (t.addEventListener('focusin', e), () => t.removeEventListener('focusin', e));
        }, [t, r]),
        {
          onFocusCapture: u(() => (o.current = !0), 'onFocusCapture'),
          onBlurCapture: u(() => (o.current = !1), 'onBlurCapture'),
        }
      );
    }
    function g() {
      let e = new CustomEvent(s);
      document.dispatchEvent(e);
    }
    function y(e, t, n, { discrete: r }) {
      let i = n.originalEvent.target,
        a = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
      (t && i.addEventListener(e, t, { once: !0 }),
        r ? (0, o.dispatchDiscreteCustomEvent)(i, a) : i.dispatchEvent(a));
    }
    (u(h, 'usePointerDownOutside'),
      u(v, 'useFocusOutside'),
      u(g, 'dispatchUpdate'),
      u(y, 'handleAndDispatchCustomEvent'),
      e.s(['DismissableLayer', 0, d, 'useDismissableLayerSurface', 0, p]));
  },
  14408,
  (e) => {
    'use strict';
    var t = e.i(39380),
      n = Object.defineProperty,
      r = (e, t) => n(e, 'name', { value: t, configurable: !0 }),
      o = 0,
      i = null;
    function a() {
      t.useEffect(() => {
        i || (i = { start: l(), end: l() });
        let { start: e, end: t } = i;
        return (
          document.body.firstElementChild !== e &&
            document.body.insertAdjacentElement('afterbegin', e),
          document.body.lastElementChild !== t &&
            document.body.insertAdjacentElement('beforeend', t),
          o++,
          () => {
            (1 === o && (i?.start.remove(), i?.end.remove(), (i = null)), (o = Math.max(0, o - 1)));
          }
        );
      }, []);
    }
    function l() {
      let e = document.createElement('span');
      return (
        e.setAttribute('data-radix-focus-guard', ''),
        (e.tabIndex = 0),
        (e.style.outline = 'none'),
        (e.style.opacity = '0'),
        (e.style.position = 'fixed'),
        (e.style.pointerEvents = 'none'),
        e
      );
    }
    (r(function (e) {
      return (a(), e.children);
    }, 'FocusGuards'),
      r(a, 'useFocusGuards'),
      r(l, 'createFocusGuard'),
      e.s(['useFocusGuards', 0, a]));
  },
  49032,
  (e) => {
    'use strict';
    var t = e.i(39380),
      n = e.i(66100),
      r = e.i(78238),
      o = e.i(32253),
      i = e.i(24830),
      a = Object.defineProperty,
      l = (e, t) => a(e, 'name', { value: t, configurable: !0 }),
      c = 'focusScope.autoFocusOnMount',
      u = 'focusScope.autoFocusOnUnmount',
      s = { bubbles: !1, cancelable: !0 },
      f = t.forwardRef(
        l(function (e, a) {
          let {
              loop: f = !1,
              trapped: h = !1,
              onMountAutoFocus: v,
              onUnmountAutoFocus: g,
              ...b
            } = e,
            [x, C] = t.useState(null),
            S = (0, o.useCallbackRef)(v),
            R = (0, o.useCallbackRef)(g),
            L = t.useRef(null),
            A = (0, n.useComposedRefs)(a, C),
            P = t.useRef({
              paused: !1,
              pause() {
                this.paused = !0;
              },
              resume() {
                this.paused = !1;
              },
            }).current;
          (t.useEffect(() => {
            if (h) {
              let e = function (e) {
                  if (P.paused || !x) return;
                  let t = e.target;
                  x.contains(t) ? (L.current = t) : y(L.current, { select: !0 });
                },
                t = function (e) {
                  if (P.paused || !x) return;
                  let t = e.relatedTarget;
                  null !== t && (x.contains(t) || y(L.current, { select: !0 }));
                },
                n = function (e) {
                  if (document.activeElement === document.body)
                    for (let t of e) t.removedNodes.length > 0 && y(x);
                };
              (l(e, 'handleFocusIn'),
                l(t, 'handleFocusOut'),
                l(n, 'handleMutations'),
                document.addEventListener('focusin', e),
                document.addEventListener('focusout', t));
              let r = new MutationObserver(n);
              return (
                x && r.observe(x, { childList: !0, subtree: !0 }),
                () => {
                  (document.removeEventListener('focusin', e),
                    document.removeEventListener('focusout', t),
                    r.disconnect());
                }
              );
            }
          }, [h, x, P.paused]),
            t.useEffect(() => {
              if (x) {
                w.add(P);
                let e = document.activeElement;
                if (!x.contains(e)) {
                  let t = new CustomEvent(c, s);
                  (x.addEventListener(c, S),
                    x.dispatchEvent(t),
                    t.defaultPrevented ||
                      (d(E(m(x)), { select: !0 }), document.activeElement === e && y(x)));
                }
                return () => {
                  (x.removeEventListener(c, S),
                    setTimeout(() => {
                      let t = new CustomEvent(u, s);
                      (x.addEventListener(u, R),
                        x.dispatchEvent(t),
                        t.defaultPrevented || y(e ?? document.body, { select: !0 }),
                        x.removeEventListener(u, R),
                        w.remove(P));
                    }, 0));
                };
              }
            }, [x, S, R, P]));
          let O = t.useCallback(
            (e) => {
              if ((!f && !h) || P.paused) return;
              let t = 'Tab' === e.key && !e.altKey && !e.ctrlKey && !e.metaKey,
                n = document.activeElement;
              if (t && n) {
                let t = e.currentTarget,
                  [r, o] = p(t);
                r && o
                  ? e.shiftKey || n !== o
                    ? e.shiftKey && n === r && (e.preventDefault(), f && y(o, { select: !0 }))
                    : (e.preventDefault(), f && y(r, { select: !0 }))
                  : n === t && e.preventDefault();
              }
            },
            [f, h, P.paused],
          );
          return (0, i.jsx)(r.Primitive.div, { tabIndex: -1, ...b, ref: A, onKeyDown: O });
        }, 'FocusScope'),
      );
    function d(e, { select: t = !1 } = {}) {
      let n = document.activeElement;
      for (let r of e) if ((y(r, { select: t }), document.activeElement !== n)) return;
    }
    function p(e) {
      let t = m(e);
      return [h(t, e), h(t.reverse(), e)];
    }
    function m(e) {
      let t = [],
        n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
          acceptNode: l((e) => {
            let t = 'INPUT' === e.tagName && 'hidden' === e.type;
            return e.disabled || e.hidden || t
              ? NodeFilter.FILTER_SKIP
              : e.tabIndex >= 0
                ? NodeFilter.FILTER_ACCEPT
                : NodeFilter.FILTER_SKIP;
          }, 'acceptNode'),
        });
      for (; n.nextNode();) t.push(n.currentNode);
      return t;
    }
    function h(e, t) {
      let n =
        'function' == typeof t.checkVisibility && t.checkVisibility({ checkVisibilityCSS: !0 });
      for (let r of e)
        if (!(n ? !r.checkVisibility({ checkVisibilityCSS: !0 }) : v(r, { upTo: t }))) return r;
    }
    function v(e, { upTo: t }) {
      if ('hidden' === getComputedStyle(e).visibility) return !0;
      for (; e && (void 0 === t || e !== t);) {
        if ('none' === getComputedStyle(e).display) return !0;
        e = e.parentElement;
      }
      return !1;
    }
    function g(e) {
      return e instanceof HTMLInputElement && 'select' in e;
    }
    function y(e, { select: t = !1 } = {}) {
      if (e && e.focus) {
        let n = document.activeElement;
        (e.focus({ preventScroll: !0 }), e !== n && g(e) && t && e.select());
      }
    }
    (l(d, 'focusFirst'),
      l(p, 'getTabbableEdges'),
      l(m, 'getTabbableCandidates'),
      l(h, 'findVisible'),
      l(v, 'isHidden'),
      l(g, 'isSelectableInput'),
      l(y, 'focus'));
    var w = b();
    function b() {
      let e = [];
      return {
        add(t) {
          let n = e[0];
          (t !== n && n?.pause(), (e = x(e, t)).unshift(t));
        },
        remove(t) {
          ((e = x(e, t)), e[0]?.resume());
        },
      };
    }
    function x(e, t) {
      let n = [...e],
        r = n.indexOf(t);
      return (-1 !== r && n.splice(r, 1), n);
    }
    function E(e) {
      return e.filter((e) => 'A' !== e.tagName);
    }
    (l(b, 'createFocusScopesStack'),
      l(x, 'arrayRemove'),
      l(E, 'removeLinks'),
      e.s(['FocusScope', 0, f]));
  },
  12534,
  (e) => {
    'use strict';
    let t;
    var n = e.i(39380);
    let r = ['top', 'right', 'bottom', 'left'],
      o = Math.min,
      i = Math.max,
      a = Math.round,
      l = Math.floor,
      c = (e) => ({ x: e, y: e }),
      u = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
    function s(e, t) {
      return 'function' == typeof e ? e(t) : e;
    }
    function f(e) {
      return e.split('-')[0];
    }
    function d(e) {
      return e.split('-')[1];
    }
    function p(e) {
      return 'x' === e ? 'y' : 'x';
    }
    function m(e) {
      return 'y' === e ? 'height' : 'width';
    }
    function h(e) {
      let t = e[0];
      return 't' === t || 'b' === t ? 'y' : 'x';
    }
    function v(e) {
      return e.includes('start') ? e.replace('start', 'end') : e.replace('end', 'start');
    }
    let g = ['left', 'right'],
      y = ['right', 'left'],
      w = ['top', 'bottom'],
      b = ['bottom', 'top'];
    function x(e) {
      let t = f(e);
      return u[t] + e.slice(t.length);
    }
    function E(e) {
      var t, n, r, o;
      return 'number' != typeof e
        ? {
            top: null != (t = e.top) ? t : 0,
            right: null != (n = e.right) ? n : 0,
            bottom: null != (r = e.bottom) ? r : 0,
            left: null != (o = e.left) ? o : 0,
          }
        : { top: e, right: e, bottom: e, left: e };
    }
    function C(e) {
      let { x: t, y: n, width: r, height: o } = e;
      return { width: r, height: o, top: n, left: t, right: t + r, bottom: n + o, x: t, y: n };
    }
    function S(e, t, n) {
      let r,
        { reference: o, floating: i } = e,
        a = h(t),
        l = p(h(t)),
        c = m(l),
        u = f(t),
        s = o.x + o.width / 2 - i.width / 2,
        v = o.y + o.height / 2 - i.height / 2,
        g = o[c] / 2 - i[c] / 2;
      switch (u) {
        case 'top':
          r = { x: s, y: o.y - i.height };
          break;
        case 'bottom':
          r = { x: s, y: o.y + o.height };
          break;
        case 'right':
          r = { x: o.x + o.width, y: v };
          break;
        case 'left':
          r = { x: o.x - i.width, y: v };
          break;
        default:
          r = { x: o.x, y: o.y };
      }
      let y = d(t);
      return (y && (r[l] += g * ('end' === y ? 1 : -1) * (n && 'y' === a ? -1 : 1)), r);
    }
    async function R(e, t) {
      var n;
      void 0 === t && (t = {});
      let { x: r, y: o, platform: i, rects: a, elements: l, strategy: c } = e,
        {
          boundary: u = 'clippingAncestors',
          rootBoundary: f = 'viewport',
          elementContext: d = 'floating',
          altBoundary: p = !1,
          padding: m = 0,
        } = s(t, e),
        h = E(m),
        v = l[p ? ('floating' === d ? 'reference' : 'floating') : d],
        g = C(
          await i.getClippingRect({
            element:
              null == (n = await (null == i.isElement ? void 0 : i.isElement(v))) || n
                ? v
                : v.contextElement ||
                  (await (null == i.getDocumentElement
                    ? void 0
                    : i.getDocumentElement(l.floating))),
            boundary: u,
            rootBoundary: f,
            strategy: c,
          }),
        ),
        y =
          'floating' === d
            ? { x: r, y: o, width: a.floating.width, height: a.floating.height }
            : a.reference,
        w = await (null == i.getOffsetParent ? void 0 : i.getOffsetParent(l.floating)),
        b = ((await (null == i.isElement ? void 0 : i.isElement(w))) &&
          (await (null == i.getScale ? void 0 : i.getScale(w)))) || { x: 1, y: 1 },
        x = C(
          i.convertOffsetParentRelativeRectToViewportRelativeRect
            ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
                elements: l,
                rect: y,
                offsetParent: w,
                strategy: c,
              })
            : y,
        );
      return {
        top: (g.top - x.top + h.top) / b.y,
        bottom: (x.bottom - g.bottom + h.bottom) / b.y,
        left: (g.left - x.left + h.left) / b.x,
        right: (x.right - g.right + h.right) / b.x,
      };
    }
    let L = async (e, t, n) => {
      let {
          placement: r = 'bottom',
          strategy: o = 'absolute',
          middleware: i = [],
          platform: a,
        } = n,
        l = a.detectOverflow ? a : { ...a, detectOverflow: R },
        c = await (null == a.isRTL ? void 0 : a.isRTL(t)),
        u = await a.getElementRects({ reference: e, floating: t, strategy: o }),
        { x: s, y: f } = S(u, r, c),
        d = r,
        p = 0,
        m = {};
      for (let n = 0; n < i.length; n++) {
        let h = i[n];
        if (!h) continue;
        let { name: v, fn: g } = h,
          {
            x: y,
            y: w,
            data: b,
            reset: x,
          } = await g({
            x: s,
            y: f,
            initialPlacement: r,
            placement: d,
            strategy: o,
            middlewareData: m,
            rects: u,
            platform: l,
            elements: { reference: e, floating: t },
          });
        ((s = null != y ? y : s),
          (f = null != w ? w : f),
          (m[v] = { ...m[v], ...b }),
          x &&
            p < 50 &&
            (p++,
            'object' == typeof x &&
              (x.placement && (d = x.placement),
              x.rects &&
                (u =
                  !0 === x.rects
                    ? await a.getElementRects({ reference: e, floating: t, strategy: o })
                    : x.rects),
              ({ x: s, y: f } = S(u, d, c))),
            (n = -1)));
      }
      return { x: s, y: f, placement: d, strategy: o, middlewareData: m };
    };
    function A(e, t) {
      return {
        top: e.top - t.height,
        right: e.right - t.width,
        bottom: e.bottom - t.height,
        left: e.left - t.width,
      };
    }
    function P(e) {
      return r.some((t) => e[t] >= 0);
    }
    let O = new Set(['left', 'top']);
    async function k(e, t) {
      let { placement: n, platform: r, elements: o } = e,
        i = await (null == r.isRTL ? void 0 : r.isRTL(o.floating)),
        a = f(n),
        l = d(n),
        c = 'y' === h(n),
        u = O.has(a) ? -1 : 1,
        p = i && c ? -1 : 1,
        m = s(t, e),
        {
          mainAxis: v,
          crossAxis: g,
          alignmentAxis: y,
        } = 'number' == typeof m
          ? { mainAxis: m, crossAxis: 0, alignmentAxis: null }
          : {
              mainAxis: m.mainAxis || 0,
              crossAxis: m.crossAxis || 0,
              alignmentAxis: m.alignmentAxis,
            };
      return (
        l && 'number' == typeof y && (g = 'end' === l ? -1 * y : y),
        c ? { x: g * p, y: v * u } : { x: v * u, y: g * p }
      );
    }
    function T() {
      return 'u' > typeof window;
    }
    function D(e) {
      return N(e) ? (e.nodeName || '').toLowerCase() : '#document';
    }
    function M(e) {
      var t;
      return (null == e || null == (t = e.ownerDocument) ? void 0 : t.defaultView) || window;
    }
    function F(e) {
      var t;
      return null == (t = (N(e) ? e.ownerDocument : e.document) || window.document)
        ? void 0
        : t.documentElement;
    }
    function N(e) {
      return !!T() && (e instanceof Node || e instanceof M(e).Node);
    }
    function W(e) {
      return !!T() && (e instanceof Element || e instanceof M(e).Element);
    }
    function j(e) {
      return !!T() && (e instanceof HTMLElement || e instanceof M(e).HTMLElement);
    }
    function I(e) {
      return (
        !(!T() || 'u' < typeof ShadowRoot) &&
        (e instanceof ShadowRoot || e instanceof M(e).ShadowRoot)
      );
    }
    function H(e) {
      let { overflow: t, overflowX: n, overflowY: r, display: o } = Y(e);
      return (
        /auto|scroll|overlay|hidden|clip/.test(t + r + n) && 'inline' !== o && 'contents' !== o
      );
    }
    function B(e) {
      try {
        if (e.matches(':popover-open')) return !0;
      } catch (e) {}
      try {
        return e.matches(':modal');
      } catch (e) {
        return !1;
      }
    }
    let _ = /transform|translate|scale|rotate|perspective|filter/,
      V = /paint|layout|strict|content/,
      z = (e) => !!e && 'none' !== e;
    function $(e) {
      let t = W(e) ? Y(e) : e;
      return (
        z(t.transform) ||
        z(t.translate) ||
        z(t.scale) ||
        z(t.rotate) ||
        z(t.perspective) ||
        (!K() && (z(t.backdropFilter) || z(t.filter))) ||
        _.test(t.willChange || '') ||
        V.test(t.contain || '')
      );
    }
    function K() {
      return (
        null == t &&
          (t = 'u' > typeof CSS && CSS.supports && CSS.supports('-webkit-backdrop-filter', 'none')),
        t
      );
    }
    function X(e) {
      return /^(html|body|#document)$/.test(D(e));
    }
    function Y(e) {
      return M(e).getComputedStyle(e);
    }
    function U(e) {
      return W(e)
        ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop }
        : { scrollLeft: e.scrollX, scrollTop: e.scrollY };
    }
    function G(e) {
      if ('html' === D(e)) return e;
      let t = e.assignedSlot || e.parentNode || (I(e) && e.host) || F(e);
      return I(t) ? t.host : t;
    }
    function Z(e, t, n) {
      var r;
      (void 0 === t && (t = []), void 0 === n && (n = !0));
      let o = (function e(t) {
          let n = G(t);
          return X(n) ? (t.ownerDocument || t).body : j(n) && H(n) ? n : e(n);
        })(e),
        i = o === (null == (r = e.ownerDocument) ? void 0 : r.body),
        a = M(o);
      if (!i) return t.concat(o, Z(o, [], n));
      {
        let e = q(a);
        return t.concat(a, a.visualViewport || [], H(o) ? o : [], e && n ? Z(e) : []);
      }
    }
    function q(e) {
      return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
    }
    function J(e) {
      let t = Y(e),
        n = parseFloat(t.width) || 0,
        r = parseFloat(t.height) || 0,
        o = j(e),
        i = o ? e.offsetWidth : n,
        l = o ? e.offsetHeight : r,
        c = a(n) !== i || a(r) !== l;
      return (c && ((n = i), (r = l)), { width: n, height: r, $: c });
    }
    function Q(e) {
      return W(e) ? e : e.contextElement;
    }
    function ee(e) {
      let t = Q(e);
      if (!j(t)) return c(1);
      let n = t.getBoundingClientRect(),
        { width: r, height: o, $: i } = J(t),
        l = (i ? a(n.width) : n.width) / r,
        u = (i ? a(n.height) : n.height) / o;
      return (
        (l && Number.isFinite(l)) || (l = 1),
        (u && Number.isFinite(u)) || (u = 1),
        { x: l, y: u }
      );
    }
    let et = c(0);
    function en(e) {
      let t = M(e);
      return K() && t.visualViewport
        ? { x: t.visualViewport.offsetLeft, y: t.visualViewport.offsetTop }
        : et;
    }
    function er(e, t, n, r) {
      var o;
      (void 0 === t && (t = !1), void 0 === n && (n = !1));
      let i = e.getBoundingClientRect(),
        a = Q(e),
        l = c(1);
      t && (r ? W(r) && (l = ee(r)) : (l = ee(e)));
      let u = (void 0 === (o = n) && (o = !1), r && o && r === M(a)) ? en(a) : c(0),
        s = (i.left + u.x) / l.x,
        f = (i.top + u.y) / l.y,
        d = i.width / l.x,
        p = i.height / l.y;
      if (a && r) {
        let e = M(a),
          t = W(r) ? M(r) : r,
          n = e,
          o = q(n);
        for (; o && t !== n;) {
          let e = ee(o),
            t = o.getBoundingClientRect(),
            r = Y(o),
            i = t.left + (o.clientLeft + parseFloat(r.paddingLeft)) * e.x,
            a = t.top + (o.clientTop + parseFloat(r.paddingTop)) * e.y;
          ((s *= e.x), (f *= e.y), (d *= e.x), (p *= e.y), (s += i), (f += a), (o = q((n = M(o)))));
        }
      }
      return C({ width: d, height: p, x: s, y: f });
    }
    function eo(e, t) {
      let n = U(e).scrollLeft;
      return t ? t.left + n : er(F(e)).left + n;
    }
    function ei(e, t) {
      let n = e.getBoundingClientRect();
      return { x: n.left + t.scrollLeft - eo(e, n), y: n.top + t.scrollTop };
    }
    function ea(e, t, n) {
      var r;
      let o;
      if ('viewport' === t || 'layoutViewport' === t)
        o = (function (e, t, n) {
          void 0 === n && (n = 'viewport');
          let r = 'layoutViewport' === n,
            o = M(e),
            i = F(e),
            a = o.visualViewport,
            l = i.clientWidth,
            c = i.clientHeight,
            u = 0,
            s = 0;
          if (a) {
            let e = !K() || 'fixed' === t;
            r
              ? e || ((u = -a.offsetLeft), (s = -a.offsetTop))
              : ((l = a.width), (c = a.height), e && ((u = a.offsetLeft), (s = a.offsetTop)));
          }
          if (0 >= eo(i)) {
            let e = i.ownerDocument,
              t = e.body,
              n = getComputedStyle(t),
              r =
                ('CSS1Compat' === e.compatMode &&
                  parseFloat(n.marginLeft) + parseFloat(n.marginRight)) ||
                0,
              o = Math.abs(i.clientWidth - t.clientWidth - r),
              a = 'stable both-edges' === getComputedStyle(i).scrollbarGutter ? o / 2 : o;
            a <= 25 && (l -= a);
          }
          return { width: l, height: c, x: u, y: s };
        })(e, n, t);
      else if ('document' === t) {
        let t, n, a, l, c, u;
        ((t = U((r = F(e)))),
          (n = r.ownerDocument.body),
          (a = i(r.scrollWidth, r.clientWidth, n.scrollWidth, n.clientWidth)),
          (l = i(r.scrollHeight, r.clientHeight, n.scrollHeight, n.clientHeight)),
          (c = -t.scrollLeft + eo(r)),
          (u = -t.scrollTop),
          'rtl' === Y(n).direction && (c += i(r.clientWidth, n.clientWidth) - a),
          (o = { width: a, height: l, x: c, y: u }));
      } else if (W(t)) {
        let e, r, i, a, l, c;
        ((r = (e = er(t, !0, 'fixed' === n)).top + t.clientTop),
          (i = e.left + t.clientLeft),
          (a = ee(t)),
          (l = t.clientWidth * a.x),
          (c = t.clientHeight * a.y),
          (o = { width: l, height: c, x: i * a.x, y: r * a.y }));
      } else {
        let n = en(e);
        o = { x: t.x - n.x, y: t.y - n.y, width: t.width, height: t.height };
      }
      return C(o);
    }
    function el(e) {
      return 'static' === Y(e).position;
    }
    function ec(e, t) {
      if (!j(e) || 'fixed' === Y(e).position) return null;
      if (t) return t(e);
      let n = e.offsetParent;
      return (F(e) === n && (n = n.ownerDocument.body), n);
    }
    function eu(e, t) {
      var n;
      let r = M(e);
      if (B(e)) return r;
      if (!j(e)) {
        let t = G(e);
        for (; t && !X(t);) {
          if (W(t) && !el(t)) return t;
          t = G(t);
        }
        return r;
      }
      let o = ec(e, t);
      for (; o && ((n = o), /^(table|td|th)$/.test(D(n))) && el(o);) o = ec(o, t);
      return o && X(o) && el(o) && !$(o)
        ? r
        : o ||
            (function (e) {
              let t = G(e);
              for (; j(t) && !X(t);) {
                if ($(t)) return t;
                if (B(t)) break;
                t = G(t);
              }
              return null;
            })(e) ||
            r;
    }
    let es = async function (e) {
        let t = this.getOffsetParent || eu,
          n = this.getDimensions,
          r = await n(e.floating);
        return {
          reference: (function (e, t, n) {
            let r = j(t),
              o = F(t),
              i = 'fixed' === n,
              a = er(e, !0, i, t),
              l = { scrollLeft: 0, scrollTop: 0 },
              u = c(0);
            if ((r || !i) && (('body' !== D(t) || H(o)) && (l = U(t)), r)) {
              let e = er(t, !0, i, t);
              ((u.x = e.x + t.clientLeft), (u.y = e.y + t.clientTop));
            }
            !r && o && (u.x = eo(o));
            let s = !o || r || i ? c(0) : ei(o, l);
            return {
              x: a.left + l.scrollLeft - u.x - s.x,
              y: a.top + l.scrollTop - u.y - s.y,
              width: a.width,
              height: a.height,
            };
          })(e.reference, await t(e.floating), e.strategy),
          floating: { x: 0, y: 0, width: r.width, height: r.height },
        };
      },
      ef = {
        convertOffsetParentRelativeRectToViewportRelativeRect: function (e) {
          let { elements: t, rect: n, offsetParent: r, strategy: o } = e,
            i = 'fixed' === o,
            a = F(r),
            l = !!t && B(t.floating);
          if (r === a || (l && i)) return n;
          let u = { scrollLeft: 0, scrollTop: 0 },
            s = c(1),
            f = c(0),
            d = j(r);
          if ((d || !i) && (('body' !== D(r) || H(a)) && (u = U(r)), d)) {
            let e = er(r);
            ((s = ee(r)), (f.x = e.x + r.clientLeft), (f.y = e.y + r.clientTop));
          }
          let p = !a || d || i ? c(0) : ei(a, u);
          return {
            width: n.width * s.x,
            height: n.height * s.y,
            x: n.x * s.x - u.scrollLeft * s.x + f.x + p.x,
            y: n.y * s.y - u.scrollTop * s.y + f.y + p.y,
          };
        },
        getDocumentElement: F,
        getClippingRect: function (e) {
          let { element: t, boundary: n, rootBoundary: r, strategy: a } = e,
            l = [
              ...('clippingAncestors' === n
                ? B(t)
                  ? []
                  : (function (e, t) {
                      let n = t.get(e);
                      if (n) return n;
                      let r = Z(e, [], !1).filter((e) => W(e) && 'body' !== D(e)),
                        o = null,
                        i = 'fixed' === Y(e).position,
                        a = i ? G(e) : e;
                      for (; W(a) && !X(a);) {
                        let e = Y(a),
                          t = $(a),
                          n = o ? o.position : i ? 'fixed' : '';
                        (t || ('fixed' !== n && ('absolute' !== n || 'static' !== e.position))
                          ? (o = e)
                          : (r = r.filter((e) => e !== a)),
                          (a = G(a)));
                      }
                      return (t.set(e, r), r);
                    })(t, this._c)
                : [].concat(n)),
              r,
            ],
            c = ea(t, l[0], a),
            u = c.top,
            s = c.right,
            f = c.bottom,
            d = c.left;
          for (let e = 1; e < l.length; e++) {
            let n = ea(t, l[e], a);
            ((u = i(n.top, u)), (s = o(n.right, s)), (f = o(n.bottom, f)), (d = i(n.left, d)));
          }
          return { width: s - d, height: f - u, x: d, y: u };
        },
        getOffsetParent: eu,
        getElementRects: es,
        getClientRects: function (e) {
          return e.getClientRects ? Array.from(e.getClientRects()) : [];
        },
        getDimensions: function (e) {
          let { width: t, height: n } = J(e);
          return { width: t, height: n };
        },
        getScale: ee,
        isElement: W,
        isRTL: function (e) {
          return 'rtl' === Y(e).direction;
        },
      };
    function ed(e, t) {
      return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
    }
    let ep = (e) => ({
      name: 'arrow',
      options: e,
      async fn(t) {
        let { x: n, y: r, placement: a, rects: l, platform: c, elements: u, middlewareData: f } = t,
          { element: v, padding: g = 0 } = s(e, t) || {};
        if (null == v) return {};
        let y = E(g),
          w = { x: n, y: r },
          b = p(h(a)),
          x = m(b),
          C = await c.getDimensions(v),
          S = 'y' === b,
          R = S ? 'clientHeight' : 'clientWidth',
          L = l.reference[x] + l.reference[b] - w[b] - l.floating[x],
          A = w[b] - l.reference[b],
          P = await (null == c.getOffsetParent ? void 0 : c.getOffsetParent(v)),
          O = P ? P[R] : 0;
        (O && (await (null == c.isElement ? void 0 : c.isElement(P)))) ||
          (O = u.floating[R] || l.floating[x]);
        let k = O / 2 - C[x] / 2 - 1,
          T = o(y[S ? 'top' : 'left'], k),
          D = o(y[S ? 'bottom' : 'right'], k),
          M = O - C[x] - D,
          F = O / 2 - C[x] / 2 + (L / 2 - A / 2),
          N = i(T, o(F, M)),
          W =
            !f.arrow &&
            null != d(a) &&
            F !== N &&
            l.reference[x] / 2 - (F < T ? T : D) - C[x] / 2 < 0,
          j = W ? (F < T ? F - T : F - M) : 0;
        return {
          [b]: w[b] + j,
          data: { [b]: N, centerOffset: F - N - j, ...(W && { alignmentOffset: j }) },
          reset: W,
        };
      },
    });
    var em = e.i(60429),
      eh = 'u' > typeof document ? n.useLayoutEffect : function () {};
    function ev(e, t) {
      let n, r, o;
      if (e === t) return !0;
      if (typeof e != typeof t) return !1;
      if ('function' == typeof e && e.toString() === t.toString()) return !0;
      if (e && t && 'object' == typeof e) {
        if (Array.isArray(e)) {
          if ((n = e.length) !== t.length) return !1;
          for (r = n; 0 != r--;) if (!ev(e[r], t[r])) return !1;
          return !0;
        }
        if ((n = (o = Object.keys(e)).length) !== Object.keys(t).length) return !1;
        for (r = n; 0 != r--;) if (!{}.hasOwnProperty.call(t, o[r])) return !1;
        for (r = n; 0 != r--;) {
          let n = o[r];
          if (('_owner' !== n || !e.$$typeof) && !ev(e[n], t[n])) return !1;
        }
        return !0;
      }
      return e != e && t != t;
    }
    function eg(e) {
      return 'u' < typeof window
        ? 1
        : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
    }
    function ey(e, t) {
      let n = eg(e);
      return Math.round(t * n) / n;
    }
    function ew(e) {
      let t = n.useRef(e);
      return (
        eh(() => {
          t.current = e;
        }),
        t
      );
    }
    var eb = e.i(78238),
      ex = e.i(24830),
      eE = Object.defineProperty,
      eC = n.forwardRef(
        eE(
          function (e, t) {
            let { children: n, width: r = 10, height: o = 5, ...i } = e;
            return (0, ex.jsx)(eb.Primitive.svg, {
              ...i,
              ref: t,
              width: r,
              height: o,
              viewBox: '0 0 30 10',
              preserveAspectRatio: 'none',
              children: e.asChild ? n : (0, ex.jsx)('polygon', { points: '0,0 30,0 15,10' }),
            });
          },
          'name',
          { value: 'Arrow', configurable: !0 },
        ),
      ),
      eS = e.i(66100),
      eR = e.i(64145),
      eL = e.i(32253),
      eA = e.i(44532),
      eP = e.i(14971),
      eO = Object.defineProperty,
      ek = (e, t) => eO(e, 'name', { value: t, configurable: !0 }),
      eT = 'Popper',
      [eD, eM] = (0, eR.createContextScope)(eT),
      [eF, eN] = eD(eT),
      eW = ek((e) => {
        let { __scopePopper: t, children: r } = e,
          [o, i] = n.useState(null),
          [a, l] = n.useState(void 0);
        return (0, ex.jsx)(eF, {
          scope: t,
          anchor: o,
          onAnchorChange: i,
          placementState: a,
          setPlacementState: l,
          children: r,
        });
      }, 'Popper'),
      ej = n.forwardRef(
        ek(function (e, t) {
          let { __scopePopper: r, virtualRef: o, ...i } = e,
            a = eN('PopperAnchor', r),
            l = n.useRef(null),
            c = a.onAnchorChange,
            u = n.useCallback(
              (e) => {
                ((l.current = e), e && c(e));
              },
              [c],
            ),
            s = (0, eS.useComposedRefs)(t, u),
            f = n.useRef(null);
          n.useEffect(() => {
            if (!o) return;
            let e = f.current;
            ((f.current = o.current), e !== f.current && c(f.current));
          });
          let d = a.placementState && eX(a.placementState),
            p = d?.[0],
            m = d?.[1];
          return o
            ? null
            : (0, ex.jsx)(eb.Primitive.div, {
                'data-radix-popper-side': p,
                'data-radix-popper-align': m,
                ...i,
                ref: s,
              });
        }, 'PopperAnchor'),
      ),
      eI = 'PopperContent',
      [eH, eB] = eD(eI),
      e_ = n.forwardRef(
        ek(function (e, t) {
          var r, a, c, u, E, C, S, R, T, D, N, W, j;
          let I,
            H,
            B,
            _,
            V,
            z,
            {
              __scopePopper: $,
              side: K = 'bottom',
              sideOffset: X = 0,
              align: Y = 'center',
              alignOffset: U = 0,
              arrowPadding: G = 0,
              avoidCollisions: q = !0,
              collisionBoundary: J = [],
              collisionPadding: ee = 0,
              sticky: et = 'partial',
              hideWhenDetached: en = !1,
              updatePositionStrategy: eo = 'optimized',
              onPlaced: ei,
              ...ea
            } = e,
            el = eN(eI, $),
            [ec, eu] = n.useState(null),
            es = (0, eS.useComposedRefs)(t, eu),
            [eE, eC] = n.useState(null),
            eR = (0, eP.useSize)(eE),
            eO = eR?.width ?? 0,
            eT = eR?.height ?? 0,
            eD = 'number' == typeof ee ? ee : { top: 0, right: 0, bottom: 0, left: 0, ...ee },
            eM = Array.isArray(J) ? J : [J],
            eF = eM.length > 0,
            eW = { padding: eD, boundary: eM.filter(e$), altBoundary: eF },
            {
              refs: ej,
              floatingStyles: eB,
              placement: e_,
              isPositioned: eV,
              middlewareData: ez,
            } = (function (e) {
              void 0 === e && (e = {});
              let {
                  placement: t = 'bottom',
                  strategy: r = 'absolute',
                  middleware: o = [],
                  platform: i,
                  elements: { reference: a, floating: l } = {},
                  transform: c = !0,
                  whileElementsMounted: u,
                  open: s,
                } = e,
                [f, d] = n.useState({
                  x: 0,
                  y: 0,
                  strategy: r,
                  placement: t,
                  middlewareData: {},
                  isPositioned: !1,
                }),
                [p, m] = n.useState(o);
              ev(p, o) || m(o);
              let [h, v] = n.useState(null),
                [g, y] = n.useState(null),
                w = n.useCallback((e) => {
                  e !== C.current && ((C.current = e), v(e));
                }, []),
                b = n.useCallback((e) => {
                  e !== S.current && ((S.current = e), y(e));
                }, []),
                x = a || h,
                E = l || g,
                C = n.useRef(null),
                S = n.useRef(null),
                R = n.useRef(f),
                A = null != u,
                P = ew(u),
                O = ew(i),
                k = ew(s),
                T = n.useCallback(() => {
                  var e, n;
                  let o, i, a;
                  if (!C.current || !S.current) return;
                  let l = { placement: t, strategy: r, middleware: p };
                  (O.current && (l.platform = O.current),
                    ((e = C.current),
                    (n = S.current),
                    (o = new Map()),
                    (i = null != l ? l : {}),
                    (a = { ...ef, ...i.platform, _c: o }),
                    L(e, n, { ...i, platform: a })).then((e) => {
                      let t = { ...e, isPositioned: !1 !== k.current };
                      D.current &&
                        !ev(R.current, t) &&
                        ((R.current = t),
                        em.flushSync(() => {
                          d(t);
                        }));
                    }));
                }, [p, t, r, O, k]);
              eh(() => {
                !1 === s &&
                  R.current.isPositioned &&
                  ((R.current.isPositioned = !1), d((e) => ({ ...e, isPositioned: !1 })));
              }, [s]);
              let D = n.useRef(!1);
              (eh(
                () => (
                  (D.current = !0),
                  () => {
                    D.current = !1;
                  }
                ),
                [],
              ),
                eh(() => {
                  if ((x && (C.current = x), E && (S.current = E), x && E)) {
                    if (P.current) return P.current(x, E, T);
                    T();
                  }
                }, [x, E, T, P, A]));
              let M = n.useMemo(
                  () => ({ reference: C, floating: S, setReference: w, setFloating: b }),
                  [w, b],
                ),
                F = n.useMemo(() => ({ reference: x, floating: E }), [x, E]),
                N = n.useMemo(() => {
                  let e = { position: r, left: 0, top: 0 };
                  if (!F.floating) return e;
                  let t = ey(F.floating, f.x),
                    n = ey(F.floating, f.y);
                  return c
                    ? {
                        ...e,
                        transform: 'translate(' + t + 'px, ' + n + 'px)',
                        ...(eg(F.floating) >= 1.5 && { willChange: 'transform' }),
                      }
                    : { position: r, left: t, top: n };
                }, [r, c, F.floating, f.x, f.y]);
              return n.useMemo(
                () => ({ ...f, update: T, refs: M, elements: F, floatingStyles: N }),
                [f, T, M, F, N],
              );
            })({
              strategy: 'fixed',
              placement: K + ('center' !== Y ? '-' + Y : ''),
              whileElementsMounted: ek(
                (...e) =>
                  (function (e, t, n, r) {
                    let a;
                    void 0 === r && (r = {});
                    let {
                        ancestorScroll: c = !0,
                        ancestorResize: u = !0,
                        elementResize: s = 'function' == typeof ResizeObserver,
                        layoutShift: f = 'function' == typeof IntersectionObserver,
                        animationFrame: d = !1,
                      } = r,
                      p = Q(e),
                      m = c || u ? [...(p ? Z(p) : []), ...(t ? Z(t) : [])] : [];
                    m.forEach((e) => {
                      (c && e.addEventListener('scroll', n), u && e.addEventListener('resize', n));
                    });
                    let h =
                        p && f
                          ? (function (e, t, n) {
                              let r,
                                a = null,
                                c = F(e);
                              function u() {
                                var e;
                                (clearTimeout(r), null == (e = a) || e.disconnect(), (a = null));
                              }
                              function s(n, f) {
                                (void 0 === n && (n = !1), void 0 === f && (f = 1), u());
                                let d = e.getBoundingClientRect(),
                                  { left: p, top: m, width: h, height: v } = d;
                                if ((n || t(), !h || !v)) return;
                                let g = {
                                    rootMargin:
                                      -l(m) +
                                      'px ' +
                                      -l(c.clientWidth - (p + h)) +
                                      'px ' +
                                      -l(c.clientHeight - (m + v)) +
                                      'px ' +
                                      -l(p) +
                                      'px',
                                    threshold: i(0, o(1, f)) || 1,
                                  },
                                  y = !0;
                                function w(t) {
                                  let n = t[0].intersectionRatio;
                                  if (!ed(d, e.getBoundingClientRect())) return s();
                                  if (n !== f) {
                                    if (!y) return s();
                                    n
                                      ? s(!1, n)
                                      : (r = setTimeout(() => {
                                          s(!1, 1e-7);
                                        }, 1e3));
                                  }
                                  y = !1;
                                }
                                try {
                                  a = new IntersectionObserver(w, { ...g, root: c.ownerDocument });
                                } catch (e) {
                                  a = new IntersectionObserver(w, g);
                                }
                                a.observe(e);
                              }
                              let f = M(e),
                                d = () => s(n);
                              return (
                                f.addEventListener('resize', d),
                                s(!0),
                                () => {
                                  (f.removeEventListener('resize', d), u());
                                }
                              );
                            })(p, n, u)
                          : null,
                      v = -1,
                      g = null;
                    s &&
                      ((g = new ResizeObserver((e) => {
                        let [r] = e;
                        (r &&
                          r.target === p &&
                          g &&
                          t &&
                          (g.unobserve(t),
                          cancelAnimationFrame(v),
                          (v = requestAnimationFrame(() => {
                            var e;
                            null == (e = g) || e.observe(t);
                          }))),
                          n());
                      })),
                      p && !d && g.observe(p),
                      t && g.observe(t));
                    let y = d ? er(e) : null;
                    return (
                      d &&
                        (function t() {
                          let r = er(e);
                          (y && !ed(y, r) && n(), (y = r), (a = requestAnimationFrame(t)));
                        })(),
                      n(),
                      () => {
                        var e;
                        (m.forEach((e) => {
                          (c && e.removeEventListener('scroll', n),
                            u && e.removeEventListener('resize', n));
                        }),
                          null == h || h(),
                          null == (e = g) || e.disconnect(),
                          (g = null),
                          d && cancelAnimationFrame(a));
                      }
                    );
                  })(...e, { animationFrame: 'always' === eo }),
                'whileElementsMounted',
              ),
              elements: { reference: el.anchor },
              middleware: [
                {
                  name: (I = {
                    name: 'offset',
                    options: (a = r = { mainAxis: X + eT, alignmentAxis: U }),
                    async fn(e) {
                      var t, n;
                      let { x: r, y: o, placement: i, middlewareData: l } = e,
                        c = await k(e, a);
                      return i === (null == (t = l.offset) ? void 0 : t.placement) &&
                        null != (n = l.arrow) &&
                        n.alignmentOffset
                        ? {}
                        : { x: r + c.x, y: o + c.y, data: { ...c, placement: i } };
                    },
                  }).name,
                  fn: I.fn,
                  options: [r, void 0],
                },
                q && {
                  name: (H = {
                    name: 'shift',
                    options:
                      (E = u =
                        {
                          mainAxis: !0,
                          crossAxis: !1,
                          limiter:
                            'partial' === et
                              ? {
                                  fn: ((c = void 0),
                                  {
                                    options: (c = {}),
                                    fn(e) {
                                      var t, n, r, o;
                                      let {
                                          x: i,
                                          y: a,
                                          placement: l,
                                          rects: u,
                                          middlewareData: d,
                                        } = e,
                                        {
                                          offset: m = 0,
                                          mainAxis: v = !0,
                                          crossAxis: g = !0,
                                        } = s(c, e),
                                        y = { x: i, y: a },
                                        w = h(l),
                                        b = p(w),
                                        x = y[b],
                                        E = y[w],
                                        C = s(m, e),
                                        S =
                                          'number' == typeof C
                                            ? { mainAxis: C, crossAxis: 0 }
                                            : {
                                                mainAxis: null != (t = C.mainAxis) ? t : 0,
                                                crossAxis: null != (n = C.crossAxis) ? n : 0,
                                              };
                                      if (v) {
                                        let e = 'y' === b ? 'height' : 'width',
                                          t = u.reference[b] - u.floating[e] + S.mainAxis,
                                          n = u.reference[b] + u.reference[e] - S.mainAxis;
                                        x < t ? (x = t) : x > n && (x = n);
                                      }
                                      if (g) {
                                        let e = 'y' === b ? 'width' : 'height',
                                          t = O.has(f(l)),
                                          n =
                                            u.reference[w] -
                                            u.floating[e] +
                                            ((t && (null == (r = d.offset) ? void 0 : r[w])) || 0) +
                                            (t ? 0 : S.crossAxis),
                                          i =
                                            u.reference[w] +
                                            u.reference[e] +
                                            (t
                                              ? 0
                                              : (null == (o = d.offset) ? void 0 : o[w]) || 0) -
                                            (t ? S.crossAxis : 0);
                                        E < n ? (E = n) : E > i && (E = i);
                                      }
                                      return { [b]: x, [w]: E };
                                    },
                                  }).fn,
                                  options: [void 0, void 0],
                                }
                              : void 0,
                          ...eW,
                        }),
                    async fn(e) {
                      let { x: t, y: n, placement: r, platform: a } = e,
                        {
                          mainAxis: l = !0,
                          crossAxis: c = !1,
                          limiter: u = {
                            fn: (e) => {
                              let { x: t, y: n } = e;
                              return { x: t, y: n };
                            },
                          },
                          ...f
                        } = s(E, e),
                        d = { x: t, y: n },
                        m = await a.detectOverflow(e, f),
                        v = h(r),
                        g = p(v),
                        y = d[g],
                        w = d[v],
                        b = (e, t) =>
                          i(
                            t + m['y' === e ? 'top' : 'left'],
                            o(t, t - m['y' === e ? 'bottom' : 'right']),
                          );
                      (l && (y = b(g, y)), c && (w = b(v, w)));
                      let x = u.fn({ ...e, [g]: y, [v]: w });
                      return {
                        ...x,
                        data: { x: x.x - t, y: x.y - n, enabled: { [g]: l, [v]: c } },
                      };
                    },
                  }).name,
                  fn: H.fn,
                  options: [u, void 0],
                },
                q && {
                  name: (B = {
                    name: 'flip',
                    options: (S = C = { ...eW }),
                    async fn(e) {
                      var t, n, r, o, i, a, l, c;
                      let u,
                        E,
                        C,
                        {
                          placement: R,
                          middlewareData: L,
                          rects: A,
                          initialPlacement: P,
                          platform: O,
                          elements: k,
                        } = e,
                        {
                          mainAxis: T = !0,
                          crossAxis: D = !0,
                          fallbackPlacements: M,
                          fallbackStrategy: F = 'bestFit',
                          fallbackAxisSideDirection: N = 'none',
                          flipAlignment: W = !0,
                          ...j
                        } = s(S, e);
                      if (null != (t = L.arrow) && t.alignmentOffset) return {};
                      let I = f(R),
                        H = h(P),
                        B = f(P) === P,
                        _ = await (null == O.isRTL ? void 0 : O.isRTL(k.floating)),
                        V = M || (B || !W ? [x(P)] : ((u = x(P)), [v(P), u, v(u)])),
                        z = 'none' !== N;
                      !M &&
                        z &&
                        V.push(
                          ...((E = d(P)),
                          (C = (function (e, t, n) {
                            switch (e) {
                              case 'top':
                              case 'bottom':
                                if (n) return t ? y : g;
                                return t ? g : y;
                              case 'left':
                              case 'right':
                                return t ? w : b;
                              default:
                                return [];
                            }
                          })(f(P), 'start' === N, _)),
                          E && ((C = C.map((e) => e + '-' + E)), W && (C = C.concat(C.map(v)))),
                          C),
                        );
                      let $ = [P, ...V],
                        K = await O.detectOverflow(e, j),
                        X = [],
                        Y = (null == (n = L.flip) ? void 0 : n.overflows) || [];
                      if ((T && X.push(K[I]), D)) {
                        let e,
                          t,
                          n,
                          r,
                          o =
                            ((a = R),
                            (l = A),
                            void 0 === (c = _) && (c = !1),
                            (e = d(a)),
                            (n = m((t = p(h(a))))),
                            (r =
                              'x' === t
                                ? e === (c ? 'end' : 'start')
                                  ? 'right'
                                  : 'left'
                                : 'start' === e
                                  ? 'bottom'
                                  : 'top'),
                            l.reference[n] > l.floating[n] && (r = x(r)),
                            [r, x(r)]);
                        X.push(K[o[0]], K[o[1]]);
                      }
                      if (((Y = [...Y, { placement: R, overflows: X }]), !X.every((e) => e <= 0))) {
                        let e = ((null == (r = L.flip) ? void 0 : r.index) || 0) + 1,
                          t = $[e];
                        if (
                          t &&
                          ('alignment' !== D ||
                            H === h(t) ||
                            Y.every((e) => h(e.placement) !== H || e.overflows[0] > 0))
                        )
                          return { data: { index: e, overflows: Y }, reset: { placement: t } };
                        let n =
                          null ==
                          (o = Y.filter((e) => e.overflows[0] <= 0).sort(
                            (e, t) => e.overflows[1] - t.overflows[1],
                          )[0])
                            ? void 0
                            : o.placement;
                        if (!n)
                          switch (F) {
                            case 'bestFit': {
                              let e =
                                null ==
                                (i = Y.filter((e) => {
                                  if (z) {
                                    let t = h(e.placement);
                                    return t === H || 'y' === t;
                                  }
                                  return !0;
                                })
                                  .map((e) => [
                                    e.placement,
                                    e.overflows.filter((e) => e > 0).reduce((e, t) => e + t, 0),
                                  ])
                                  .sort((e, t) => e[1] - t[1])[0])
                                  ? void 0
                                  : i[0];
                              e && (n = e);
                              break;
                            }
                            case 'initialPlacement':
                              n = P;
                          }
                        if (R !== n) return { reset: { placement: n } };
                      }
                      return {};
                    },
                  }).name,
                  fn: B.fn,
                  options: [C, void 0],
                },
                {
                  name: (_ = {
                    name: 'size',
                    options:
                      (T = R =
                        {
                          ...eW,
                          apply: ek(
                            ({ elements: e, rects: t, availableWidth: n, availableHeight: r }) => {
                              let { width: o, height: i } = t.reference,
                                a = e.floating.style;
                              (a.setProperty('--radix-popper-available-width', `${n}px`),
                                a.setProperty('--radix-popper-available-height', `${r}px`),
                                a.setProperty('--radix-popper-anchor-width', `${o}px`),
                                a.setProperty('--radix-popper-anchor-height', `${i}px`));
                            },
                            'apply',
                          ),
                        }),
                    async fn(e) {
                      let t,
                        n,
                        { placement: r, rects: a, platform: l, elements: c } = e,
                        { apply: u = () => {}, ...p } = s(T, e),
                        m = await l.detectOverflow(e, p),
                        v = f(r),
                        g = d(r),
                        y = 'y' === h(r),
                        { width: w, height: b } = a.floating;
                      'top' === v || 'bottom' === v
                        ? ((t = v),
                          (n =
                            g ===
                            ((await (null == l.isRTL ? void 0 : l.isRTL(c.floating)))
                              ? 'start'
                              : 'end')
                              ? 'left'
                              : 'right'))
                        : ((n = v), (t = 'end' === g ? 'top' : 'bottom'));
                      let x = b - m.top - m.bottom,
                        E = w - m.left - m.right,
                        C = o(b - m[t], x),
                        S = o(w - m[n], E),
                        R = e.middlewareData.shift,
                        L = !R,
                        A = C,
                        P = S;
                      (null != R && R.enabled.x && (P = E),
                        null != R && R.enabled.y && (A = x),
                        L &&
                          !g &&
                          (y ? (P = w - 2 * i(m.left, m.right)) : (A = b - 2 * i(m.top, m.bottom))),
                        await u({ ...e, availableWidth: P, availableHeight: A }));
                      let O = await l.getDimensions(c.floating);
                      return w !== O.width || b !== O.height ? { reset: { rects: !0 } } : {};
                    },
                  }).name,
                  fn: _.fn,
                  options: [R, void 0],
                },
                eE && {
                  name: (V = {
                    name: 'arrow',
                    options: (N = D = { element: eE, padding: G }),
                    fn(e) {
                      let { element: t, padding: n } = 'function' == typeof N ? N(e) : N;
                      return t && {}.hasOwnProperty.call(t, 'current')
                        ? null != t.current
                          ? ep({ element: t.current, padding: n }).fn(e)
                          : {}
                        : t
                          ? ep({ element: t, padding: n }).fn(e)
                          : {};
                    },
                  }).name,
                  fn: V.fn,
                  options: [D, void 0],
                },
                eK({ arrowWidth: eO, arrowHeight: eT }),
                en && {
                  name: (z = {
                    name: 'hide',
                    options:
                      (j = W =
                        {
                          strategy: 'referenceHidden',
                          ...eW,
                          boundary: eF ? eW.boundary : void 0,
                        }),
                    async fn(e) {
                      let { rects: t, platform: n } = e,
                        { strategy: r = 'referenceHidden', ...o } = s(j, e);
                      switch (r) {
                        case 'referenceHidden': {
                          let r = A(
                            await n.detectOverflow(e, { ...o, elementContext: 'reference' }),
                            t.reference,
                          );
                          return { data: { referenceHiddenOffsets: r, referenceHidden: P(r) } };
                        }
                        case 'escaped': {
                          let r = A(
                            await n.detectOverflow(e, { ...o, altBoundary: !0 }),
                            t.floating,
                          );
                          return { data: { escapedOffsets: r, escaped: P(r) } };
                        }
                        default:
                          return {};
                      }
                    },
                  }).name,
                  fn: z.fn,
                  options: [W, void 0],
                },
              ],
            }),
            eY = el.setPlacementState;
          (0, eA.useLayoutEffect)(
            () => (
              eY(e_),
              () => {
                eY(void 0);
              }
            ),
            [e_, eY],
          );
          let [eU, eG] = eX(e_),
            eZ = (0, eL.useCallbackRef)(ei);
          (0, eA.useLayoutEffect)(() => {
            eV && eZ?.();
          }, [eV, eZ]);
          let eq = ez.arrow?.x,
            eJ = ez.arrow?.y,
            eQ = ez.arrow?.centerOffset !== 0,
            [e0, e1] = n.useState();
          return (
            (0, eA.useLayoutEffect)(() => {
              ec && e1(window.getComputedStyle(ec).zIndex);
            }, [ec]),
            (0, ex.jsx)('div', {
              ref: ej.setFloating,
              'data-radix-popper-content-wrapper': '',
              style: {
                ...eB,
                transform: eV ? eB.transform : 'translate(0, -200%)',
                minWidth: 'max-content',
                zIndex: e0,
                '--radix-popper-transform-origin': [
                  ez.transformOrigin?.x,
                  ez.transformOrigin?.y,
                ].join(' '),
                ...(ez.hide?.referenceHidden && { visibility: 'hidden', pointerEvents: 'none' }),
              },
              dir: e.dir,
              children: (0, ex.jsx)(eH, {
                scope: $,
                placedSide: eU,
                placedAlign: eG,
                onArrowChange: eC,
                arrowX: eq,
                arrowY: eJ,
                shouldHideArrow: eQ,
                children: (0, ex.jsx)(eb.Primitive.div, {
                  'data-side': eU,
                  'data-align': eG,
                  ...ea,
                  ref: es,
                  style: { ...ea.style, animation: eV ? ea.style?.animation : 'none' },
                }),
              }),
            })
          );
        }, 'PopperContent'),
      ),
      eV = { top: 'bottom', right: 'left', bottom: 'top', left: 'right' },
      ez = n.forwardRef(
        ek(function (e, t) {
          let { __scopePopper: n, ...r } = e,
            o = eB('PopperArrow', n),
            i = eV[o.placedSide];
          return (0, ex.jsx)('span', {
            ref: o.onArrowChange,
            style: {
              position: 'absolute',
              left: o.arrowX,
              top: o.arrowY,
              [i]: 0,
              transformOrigin: { top: '', right: '0 0', bottom: 'center 0', left: '100% 0' }[
                o.placedSide
              ],
              transform: {
                top: 'translateY(100%)',
                right: 'translateY(50%) rotate(90deg) translateX(-50%)',
                bottom: 'rotate(180deg)',
                left: 'translateY(50%) rotate(-90deg) translateX(50%)',
              }[o.placedSide],
              visibility: o.shouldHideArrow ? 'hidden' : void 0,
            },
            children: (0, ex.jsx)(eC, { ...r, ref: t, style: { ...r.style, display: 'block' } }),
          });
        }, 'PopperArrow'),
      );
    function e$(e) {
      return null !== e;
    }
    ek(e$, 'isNotNull');
    var eK = ek(
      (e) => ({
        name: 'transformOrigin',
        options: e,
        fn(t) {
          let { placement: n, rects: r, middlewareData: o } = t,
            i = o.arrow?.centerOffset !== 0,
            a = i ? 0 : e.arrowWidth,
            l = i ? 0 : e.arrowHeight,
            [c, u] = eX(n),
            s = { start: '0%', center: '50%', end: '100%' }[u],
            f = (o.arrow?.x ?? 0) + a / 2,
            d = (o.arrow?.y ?? 0) + l / 2,
            p = '',
            m = '';
          return (
            'bottom' === c
              ? ((p = i ? s : `${f}px`), (m = `${-l}px`))
              : 'top' === c
                ? ((p = i ? s : `${f}px`), (m = `${r.floating.height + l}px`))
                : 'right' === c
                  ? ((p = `${-l}px`), (m = i ? s : `${d}px`))
                  : 'left' === c && ((p = `${r.floating.width + l}px`), (m = i ? s : `${d}px`)),
            { data: { x: p, y: m } }
          );
        },
      }),
      'transformOrigin',
    );
    function eX(e) {
      let [t, n = 'center'] = e.split('-');
      return [t, n];
    }
    (ek(eX, 'getSideAndAlignFromPlacement'),
      e.s(
        [
          'Anchor',
          0,
          ej,
          'Arrow',
          0,
          ez,
          'Content',
          0,
          e_,
          'Root',
          0,
          eW,
          'createPopperScope',
          0,
          eM,
        ],
        12534,
      ));
  },
  21738,
  (e) => {
    'use strict';
    var t = e.i(39380),
      n = e.i(60429),
      r = e.i(78238),
      o = e.i(44532),
      i = e.i(24830),
      a = Object.defineProperty,
      l = t.forwardRef(
        a(
          function (e, a) {
            let { container: l, ...c } = e,
              [u, s] = t.useState(!1);
            (0, o.useLayoutEffect)(() => s(!0), []);
            let f = l || (u && globalThis?.document?.body);
            return f ? n.createPortal((0, i.jsx)(r.Primitive.div, { ...c, ref: a }), f) : null;
          },
          'name',
          { value: 'Portal', configurable: !0 },
        ),
      );
    e.s(['Portal', 0, l]);
  },
  73772,
  (e) => {
    'use strict';
    var t = new WeakMap(),
      n = new WeakMap(),
      r = {},
      o = 0,
      i = function (e) {
        return e && (e.host || i(e.parentNode));
      },
      a = function (e, a, l, c) {
        var u = (Array.isArray(e) ? e : [e])
          .map(function (e) {
            if (a.contains(e)) return e;
            var t = i(e);
            return t && a.contains(t)
              ? t
              : (console.error('aria-hidden', e, 'in not contained inside', a, '. Doing nothing'),
                null);
          })
          .filter(function (e) {
            return !!e;
          });
        r[l] || (r[l] = new WeakMap());
        var s = r[l],
          f = [],
          d = new Set(),
          p = new Set(u),
          m = function (e) {
            !e || d.has(e) || (d.add(e), m(e.parentNode));
          };
        u.forEach(m);
        var h = function (e) {
          !e ||
            p.has(e) ||
            Array.prototype.forEach.call(e.children, function (e) {
              if (d.has(e)) h(e);
              else
                try {
                  var r = e.getAttribute(c),
                    o = null !== r && 'false' !== r,
                    i = (t.get(e) || 0) + 1,
                    a = (s.get(e) || 0) + 1;
                  (t.set(e, i),
                    s.set(e, a),
                    f.push(e),
                    1 === i && o && n.set(e, !0),
                    1 === a && e.setAttribute(l, 'true'),
                    o || e.setAttribute(c, 'true'));
                } catch (t) {
                  console.error('aria-hidden: cannot operate on ', e, t);
                }
            });
        };
        return (
          h(a),
          d.clear(),
          o++,
          function () {
            (f.forEach(function (e) {
              var r = t.get(e) - 1,
                o = s.get(e) - 1;
              (t.set(e, r),
                s.set(e, o),
                r || (n.has(e) || e.removeAttribute(c), n.delete(e)),
                o || e.removeAttribute(l));
            }),
              --o || ((t = new WeakMap()), (t = new WeakMap()), (n = new WeakMap()), (r = {})));
          }
        );
      };
    e.s([
      'hideOthers',
      0,
      function (e, t, n) {
        void 0 === n && (n = 'data-aria-hidden');
        var r = Array.from(Array.isArray(e) ? e : [e]),
          o =
            t || ('u' < typeof document ? null : (Array.isArray(e) ? e[0] : e).ownerDocument.body);
        return o
          ? (r.push.apply(r, Array.from(o.querySelectorAll('[aria-live], script'))),
            a(r, o, n, 'aria-hidden'))
          : function () {
              return null;
            };
      },
    ]);
  },
  60072,
  (e) => {
    'use strict';
    let t = (0, e.i(32155).default)('KeyRound', [
      [
        'path',
        {
          d: 'M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z',
          key: '1s6t7t',
        },
      ],
      ['circle', { cx: '16.5', cy: '7.5', r: '.5', fill: 'currentColor', key: 'w0ekpg' }],
    ]);
    e.s(['KeyRound', 0, t], 60072);
  },
  44040,
  (e) => {
    'use strict';
    let t = (0, e.i(32155).default)('X', [
      ['path', { d: 'M18 6 6 18', key: '1bl5f8' }],
      ['path', { d: 'm6 6 12 12', key: 'd8bk6v' }],
    ]);
    e.s(['X', 0, t], 44040);
  },
  15588,
  (e) => {
    'use strict';
    var t,
      n,
      r,
      o,
      i,
      a,
      l,
      c = function () {
        return (c =
          Object.assign ||
          function (e) {
            for (var t, n = 1, r = arguments.length; n < r; n++)
              for (var o in (t = arguments[n]))
                Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
            return e;
          }).apply(this, arguments);
      };
    function u(e, t) {
      var n = {};
      for (var r in e)
        Object.prototype.hasOwnProperty.call(e, r) && 0 > t.indexOf(r) && (n[r] = e[r]);
      if (null != e && 'function' == typeof Object.getOwnPropertySymbols)
        for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
          0 > t.indexOf(r[o]) &&
            Object.prototype.propertyIsEnumerable.call(e, r[o]) &&
            (n[r[o]] = e[r[o]]);
      return n;
    }
    var s = ('function' == typeof SuppressedError && SuppressedError, e.i(39380)),
      f = 'right-scroll-bar-position',
      d = 'width-before-scroll-bar';
    function p(e, t) {
      return ('function' == typeof e ? e(t) : e && (e.current = t), e);
    }
    var m = 'u' > typeof window ? s.useLayoutEffect : s.useEffect,
      h = new WeakMap(),
      v =
        (void 0 === t && (t = {}),
        ((void 0 === n &&
          (n = function (e) {
            return e;
          }),
        (r = []),
        (o = !1),
        (i = {
          read: function () {
            if (o)
              throw Error(
                'Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.',
              );
            return r.length ? r[r.length - 1] : null;
          },
          useMedium: function (e) {
            var t = n(e, o);
            return (
              r.push(t),
              function () {
                r = r.filter(function (e) {
                  return e !== t;
                });
              }
            );
          },
          assignSyncMedium: function (e) {
            for (o = !0; r.length;) {
              var t = r;
              ((r = []), t.forEach(e));
            }
            r = {
              push: function (t) {
                return e(t);
              },
              filter: function () {
                return r;
              },
            };
          },
          assignMedium: function (e) {
            o = !0;
            var t = [];
            if (r.length) {
              var n = r;
              ((r = []), n.forEach(e), (t = r));
            }
            var i = function () {
                var n = t;
                ((t = []), n.forEach(e));
              },
              a = function () {
                return Promise.resolve().then(i);
              };
            (a(),
              (r = {
                push: function (e) {
                  (t.push(e), a());
                },
                filter: function (e) {
                  return ((t = t.filter(e)), r);
                },
              }));
          },
        })).options = c({ async: !0, ssr: !1 }, t)),
        i),
      g = function () {},
      y = s.forwardRef(function (e, t) {
        var n,
          r,
          o,
          i,
          a = s.useRef(null),
          l = s.useState({ onScrollCapture: g, onWheelCapture: g, onTouchMoveCapture: g }),
          f = l[0],
          d = l[1],
          y = e.forwardProps,
          w = e.children,
          b = e.className,
          x = e.removeScrollBar,
          E = e.enabled,
          C = e.shards,
          S = e.sideCar,
          R = e.noRelative,
          L = e.noIsolation,
          A = e.inert,
          P = e.allowPinchZoom,
          O = e.as,
          k = e.gapMode,
          T = u(e, [
            'forwardProps',
            'children',
            'className',
            'removeScrollBar',
            'enabled',
            'shards',
            'sideCar',
            'noRelative',
            'noIsolation',
            'inert',
            'allowPinchZoom',
            'as',
            'gapMode',
          ]),
          D =
            ((n = [a, t]),
            (r = function (e) {
              return n.forEach(function (t) {
                return p(t, e);
              });
            }),
            ((o = (0, s.useState)(function () {
              return {
                value: null,
                callback: r,
                facade: {
                  get current() {
                    return o.value;
                  },
                  set current(value) {
                    var e = o.value;
                    e !== value && ((o.value = value), o.callback(value, e));
                  },
                },
              };
            })[0]).callback = r),
            (i = o.facade),
            m(
              function () {
                var e = h.get(i);
                if (e) {
                  var t = new Set(e),
                    r = new Set(n),
                    o = i.current;
                  (t.forEach(function (e) {
                    r.has(e) || p(e, null);
                  }),
                    r.forEach(function (e) {
                      t.has(e) || p(e, o);
                    }));
                }
                h.set(i, n);
              },
              [n],
            ),
            i),
          M = c(c({}, T), f);
        return s.createElement(
          s.Fragment,
          null,
          E &&
            s.createElement(S, {
              sideCar: v,
              removeScrollBar: x,
              shards: C,
              noRelative: R,
              noIsolation: L,
              inert: A,
              setCallbacks: d,
              allowPinchZoom: !!P,
              lockRef: a,
              gapMode: k,
            }),
          y
            ? s.cloneElement(s.Children.only(w), c(c({}, M), { ref: D }))
            : s.createElement(void 0 === O ? 'div' : O, c({}, M, { className: b, ref: D }), w),
        );
      });
    ((y.defaultProps = { enabled: !0, removeScrollBar: !0, inert: !1 }),
      (y.classNames = { fullWidth: d, zeroRight: f }));
    var w = function (e) {
      var t = e.sideCar,
        n = u(e, ['sideCar']);
      if (!t) throw Error('Sidecar: please provide `sideCar` property to import the right car');
      var r = t.read();
      if (!r) throw Error('Sidecar medium not found');
      return s.createElement(r, c({}, n));
    };
    w.isSideCarExport = !0;
    var b = function () {
        var e = 0,
          t = null;
        return {
          add: function (n) {
            if (
              0 == e &&
              (t = (function () {
                if (!document) return null;
                var e = document.createElement('style');
                e.type = 'text/css';
                var t = l || ('u' > typeof __webpack_nonce__ ? __webpack_nonce__ : void 0);
                return (t && e.setAttribute('nonce', t), e);
              })())
            ) {
              var r, o;
              ((r = t).styleSheet
                ? (r.styleSheet.cssText = n)
                : r.appendChild(document.createTextNode(n)),
                (o = t),
                (document.head || document.getElementsByTagName('head')[0]).appendChild(o));
            }
            e++;
          },
          remove: function () {
            --e || !t || (t.parentNode && t.parentNode.removeChild(t), (t = null));
          },
        };
      },
      x = function () {
        var e = b();
        return function (t, n) {
          s.useEffect(
            function () {
              return (
                e.add(t),
                function () {
                  e.remove();
                }
              );
            },
            [t && n],
          );
        };
      },
      E = function () {
        var e = x();
        return function (t) {
          return (e(t.styles, t.dynamic), null);
        };
      },
      C = { left: 0, top: 0, right: 0, gap: 0 },
      S = function (e) {
        return parseInt(e || '', 10) || 0;
      },
      R = function (e) {
        var t = window.getComputedStyle(document.body),
          n = t['padding' === e ? 'paddingLeft' : 'marginLeft'],
          r = t['padding' === e ? 'paddingTop' : 'marginTop'],
          o = t['padding' === e ? 'paddingRight' : 'marginRight'];
        return [S(n), S(r), S(o)];
      },
      L = function (e) {
        if ((void 0 === e && (e = 'margin'), 'u' < typeof window)) return C;
        var t = R(e),
          n = document.documentElement.clientWidth,
          r = window.innerWidth;
        return { left: t[0], top: t[1], right: t[2], gap: Math.max(0, r - n + t[2] - t[0]) };
      },
      A = E(),
      P = 'data-scroll-locked',
      O = function (e, t, n, r) {
        var o = e.left,
          i = e.top,
          a = e.right,
          l = e.gap;
        return (
          void 0 === n && (n = 'margin'),
          '\n  .'
            .concat('with-scroll-bars-hidden', ' {\n   overflow: hidden ')
            .concat(r, ';\n   padding-right: ')
            .concat(l, 'px ')
            .concat(r, ';\n  }\n  body[')
            .concat(P, '] {\n    overflow: hidden ')
            .concat(r, ';\n    overscroll-behavior: contain;\n    ')
            .concat(
              [
                t && 'position: relative '.concat(r, ';'),
                'margin' === n &&
                  '\n    padding-left: '
                    .concat(o, 'px;\n    padding-top: ')
                    .concat(i, 'px;\n    padding-right: ')
                    .concat(a, 'px;\n    margin-left:0;\n    margin-top:0;\n    margin-right: ')
                    .concat(l, 'px ')
                    .concat(r, ';\n    '),
                'padding' === n && 'padding-right: '.concat(l, 'px ').concat(r, ';'),
              ]
                .filter(Boolean)
                .join(''),
              '\n  }\n  \n  .',
            )
            .concat(f, ' {\n    right: ')
            .concat(l, 'px ')
            .concat(r, ';\n  }\n  \n  .')
            .concat(d, ' {\n    margin-right: ')
            .concat(l, 'px ')
            .concat(r, ';\n  }\n  \n  .')
            .concat(f, ' .')
            .concat(f, ' {\n    right: 0 ')
            .concat(r, ';\n  }\n  \n  .')
            .concat(d, ' .')
            .concat(d, ' {\n    margin-right: 0 ')
            .concat(r, ';\n  }\n  \n  body[')
            .concat(P, '] {\n    ')
            .concat('--removed-body-scroll-bar-size', ': ')
            .concat(l, 'px;\n  }\n')
        );
      },
      k = function () {
        var e = parseInt(document.body.getAttribute(P) || '0', 10);
        return isFinite(e) ? e : 0;
      },
      T = function () {
        s.useEffect(function () {
          return (
            document.body.setAttribute(P, (k() + 1).toString()),
            function () {
              var e = k() - 1;
              e <= 0
                ? document.body.removeAttribute(P)
                : document.body.setAttribute(P, e.toString());
            }
          );
        }, []);
      },
      D = function (e) {
        var t = e.noRelative,
          n = e.noImportant,
          r = e.gapMode,
          o = void 0 === r ? 'margin' : r;
        T();
        var i = s.useMemo(
          function () {
            return L(o);
          },
          [o],
        );
        return s.createElement(A, { styles: O(i, !t, o, n ? '' : '!important') });
      },
      M = !1;
    if ('u' > typeof window)
      try {
        var F = Object.defineProperty({}, 'passive', {
          get: function () {
            return ((M = !0), !0);
          },
        });
        (window.addEventListener('test', F, F), window.removeEventListener('test', F, F));
      } catch (e) {
        M = !1;
      }
    var N = !!M && { passive: !1 },
      W = function (e, t) {
        if (!(e instanceof Element)) return !1;
        var n = window.getComputedStyle(e);
        return (
          'hidden' !== n[t] &&
          (n.overflowY !== n.overflowX || 'TEXTAREA' === e.tagName || 'visible' !== n[t])
        );
      },
      j = function (e, t) {
        var n = t.ownerDocument,
          r = t;
        do {
          if (('u' > typeof ShadowRoot && r instanceof ShadowRoot && (r = r.host), I(e, r))) {
            var o = H(e, r);
            if (o[1] > o[2]) return !0;
          }
          r = r.parentNode;
        } while (r && r !== n.body);
        return !1;
      },
      I = function (e, t) {
        return 'v' === e ? W(t, 'overflowY') : W(t, 'overflowX');
      },
      H = function (e, t) {
        return 'v' === e
          ? [t.scrollTop, t.scrollHeight, t.clientHeight]
          : [t.scrollLeft, t.scrollWidth, t.clientWidth];
      },
      B = function (e, t, n, r, o) {
        var i,
          a = ((i = window.getComputedStyle(t).direction), 'h' === e && 'rtl' === i ? -1 : 1),
          l = a * r,
          c = n.target,
          u = t.contains(c),
          s = !1,
          f = l > 0,
          d = 0,
          p = 0;
        do {
          if (!c) break;
          var m = H(e, c),
            h = m[0],
            v = m[1] - m[2] - a * h;
          (h || v) && I(e, c) && ((d += v), (p += h));
          var g = c.parentNode;
          c = g && g.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? g.host : g;
        } while ((!u && c !== document.body) || (u && (t.contains(c) || t === c)));
        return (
          f && ((o && 1 > Math.abs(d)) || (!o && l > d))
            ? (s = !0)
            : !f && ((o && 1 > Math.abs(p)) || (!o && -l > p)) && (s = !0),
          s
        );
      },
      _ = function (e) {
        return 'changedTouches' in e
          ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY]
          : [0, 0];
      },
      V = function (e) {
        return [e.deltaX, e.deltaY];
      },
      z = function (e) {
        return e && 'current' in e ? e.current : e;
      },
      $ = 0,
      K = [];
    let X =
      ((a = function (e) {
        var t = s.useRef([]),
          n = s.useRef([0, 0]),
          r = s.useRef(),
          o = s.useState($++)[0],
          i = s.useState(E)[0],
          a = s.useRef(e);
        (s.useEffect(
          function () {
            a.current = e;
          },
          [e],
        ),
          s.useEffect(
            function () {
              if (e.inert) {
                document.body.classList.add('block-interactivity-'.concat(o));
                var t = (function (e, t, n) {
                  if (n || 2 == arguments.length)
                    for (var r, o = 0, i = t.length; o < i; o++)
                      (!r && o in t) ||
                        (r || (r = Array.prototype.slice.call(t, 0, o)), (r[o] = t[o]));
                  return e.concat(r || Array.prototype.slice.call(t));
                })([e.lockRef.current], (e.shards || []).map(z), !0).filter(Boolean);
                return (
                  t.forEach(function (e) {
                    return e.classList.add('allow-interactivity-'.concat(o));
                  }),
                  function () {
                    (document.body.classList.remove('block-interactivity-'.concat(o)),
                      t.forEach(function (e) {
                        return e.classList.remove('allow-interactivity-'.concat(o));
                      }));
                  }
                );
              }
            },
            [e.inert, e.lockRef.current, e.shards],
          ));
        var l = s.useCallback(function (e, t) {
            if (('touches' in e && 2 === e.touches.length) || ('wheel' === e.type && e.ctrlKey))
              return !a.current.allowPinchZoom;
            var o,
              i = _(e),
              l = n.current,
              c = 'deltaX' in e ? e.deltaX : l[0] - i[0],
              u = 'deltaY' in e ? e.deltaY : l[1] - i[1],
              s = e.target,
              f = Math.abs(c) > Math.abs(u) ? 'h' : 'v';
            if ('touches' in e && 'h' === f && 'range' === s.type) return !1;
            var d = window.getSelection(),
              p = d && d.anchorNode;
            if (p && (p === s || p.contains(s))) return !1;
            var m = j(f, s);
            if (!m) return !0;
            if ((m ? (o = f) : ((o = 'v' === f ? 'h' : 'v'), (m = j(f, s))), !m)) return !1;
            if ((!r.current && 'changedTouches' in e && (c || u) && (r.current = o), !o)) return !0;
            var h = r.current || o;
            return B(h, t, e, 'h' === h ? c : u, !0);
          }, []),
          c = s.useCallback(function (e) {
            if (K.length && K[K.length - 1] === i) {
              var n = 'deltaY' in e ? V(e) : _(e),
                r = t.current.filter(function (t) {
                  var r;
                  return (
                    t.name === e.type &&
                    (t.target === e.target || e.target === t.shadowParent) &&
                    ((r = t.delta), r[0] === n[0] && r[1] === n[1])
                  );
                })[0];
              if (r && r.should) {
                e.cancelable && e.preventDefault();
                return;
              }
              if (!r) {
                var o = (a.current.shards || [])
                  .map(z)
                  .filter(Boolean)
                  .filter(function (t) {
                    return t.contains(e.target);
                  });
                (o.length > 0 ? l(e, o[0]) : !a.current.noIsolation) &&
                  e.cancelable &&
                  e.preventDefault();
              }
            }
          }, []),
          u = s.useCallback(function (e, n, r, o) {
            var i = {
              name: e,
              delta: n,
              target: r,
              should: o,
              shadowParent: (function (e) {
                for (var t = null; null !== e;)
                  (e instanceof ShadowRoot && ((t = e.host), (e = e.host)), (e = e.parentNode));
                return t;
              })(r),
            };
            (t.current.push(i),
              setTimeout(function () {
                t.current = t.current.filter(function (e) {
                  return e !== i;
                });
              }, 1));
          }, []),
          f = s.useCallback(function (e) {
            ((n.current = _(e)), (r.current = void 0));
          }, []),
          d = s.useCallback(function (t) {
            u(t.type, V(t), t.target, l(t, e.lockRef.current));
          }, []),
          p = s.useCallback(function (t) {
            u(t.type, _(t), t.target, l(t, e.lockRef.current));
          }, []);
        s.useEffect(function () {
          return (
            K.push(i),
            e.setCallbacks({ onScrollCapture: d, onWheelCapture: d, onTouchMoveCapture: p }),
            document.addEventListener('wheel', c, N),
            document.addEventListener('touchmove', c, N),
            document.addEventListener('touchstart', f, N),
            function () {
              ((K = K.filter(function (e) {
                return e !== i;
              })),
                document.removeEventListener('wheel', c, N),
                document.removeEventListener('touchmove', c, N),
                document.removeEventListener('touchstart', f, N));
            }
          );
        }, []);
        var m = e.removeScrollBar,
          h = e.inert;
        return s.createElement(
          s.Fragment,
          null,
          h
            ? s.createElement(i, {
                styles: '\n  .block-interactivity-'
                  .concat(o, ' {pointer-events: none;}\n  .allow-interactivity-')
                  .concat(o, ' {pointer-events: all;}\n'),
              })
            : null,
          m ? s.createElement(D, { noRelative: e.noRelative, gapMode: e.gapMode }) : null,
        );
      }),
      v.useMedium(a),
      w);
    var Y = s.forwardRef(function (e, t) {
      return s.createElement(y, c({}, e, { ref: t, sideCar: X }));
    });
    ((Y.classNames = y.classNames), e.s(['RemoveScroll', 0, Y], 15588));
  },
]);
