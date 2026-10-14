module.exports = [
  81911,
  (a) => {
    'use strict';
    var b = a.i(68508),
      c = a.i(48326),
      d = a.i(7104),
      e = a.i(72031),
      f = a.i(22372),
      g = a.i(44198),
      h = a.i(48741),
      i = a.i(75414),
      j = a.i(60301),
      k = a.i(45614),
      l = a.i(86458),
      m = a.i(96265),
      n = a.i(21831),
      o = a.i(91321),
      p = a.i(35163),
      q = a.i(41151),
      r = a.i(55595),
      s = a.i(89923),
      t = a.i(85851),
      u = a.i(18920),
      v = a.i(36102),
      w = a.i(92182),
      x = a.i(67683),
      y = a.i(10859),
      z = a.i(16164),
      A = a.i(76692),
      B = Object.defineProperty,
      C = (a, b) => B(a, 'name', { value: b, configurable: !0 }),
      D = 'Dialog',
      [E, F] = (0, o.createContextScope)(D),
      [G, H] = E(D),
      I = C((a) => {
        let {
            __scopeDialog: d,
            children: e,
            open: f,
            defaultOpen: g,
            onOpenChange: h,
            modal: i = !0,
          } = a,
          j = c.useRef(null),
          k = c.useRef(null),
          [l, m] = (0, q.useControllableState)({
            prop: f,
            defaultProp: g ?? !1,
            onChange: h,
            caller: D,
          }),
          [n, o] = c.useState(0),
          [r, s] = c.useState(0);
        return (0, b.jsx)(G, {
          scope: d,
          triggerRef: j,
          contentRef: k,
          contentId: (0, p.useId)(),
          titleId: (0, p.useId)(),
          descriptionId: (0, p.useId)(),
          titlePresent: n > 0,
          descriptionPresent: r > 0,
          setTitleCount: o,
          setDescriptionCount: s,
          open: l,
          onOpenChange: m,
          onOpenToggle: c.useCallback(() => m((a) => !a), [m]),
          modal: i,
          children: e,
        });
      }, 'Dialog'),
      J = c.forwardRef(
        C(function (a, c) {
          let { __scopeDialog: d, ...e } = a,
            f = H('DialogTrigger', d),
            g = (0, n.useComposedRefs)(c, f.triggerRef);
          return (0, b.jsx)(v.Primitive.button, {
            type: 'button',
            'aria-haspopup': 'dialog',
            'aria-expanded': f.open,
            'aria-controls': f.open ? f.contentId : void 0,
            'data-state': $(f.open),
            ...e,
            ref: g,
            onClick: (0, m.composeEventHandlers)(a.onClick, f.onOpenToggle),
          });
        }, 'DialogTrigger'),
      ),
      K = 'DialogPortal',
      [L, M] = E(K, { forceMount: void 0 }),
      N = C((a) => {
        let { __scopeDialog: d, forceMount: e, children: f, container: g } = a,
          h = H(K, d);
        return (0, b.jsx)(L, {
          scope: d,
          forceMount: e,
          children: c.Children.map(f, (a) =>
            (0, b.jsx)(u.Presence, {
              present: e || h.open,
              children: (0, b.jsx)(t.Portal, { asChild: !0, container: g, children: a }),
            }),
          ),
        });
      }, 'DialogPortal'),
      O = 'DialogOverlay',
      P = c.forwardRef(
        C(function (a, c) {
          let d = M(O, a.__scopeDialog),
            { forceMount: e = d.forceMount, ...f } = a,
            g = H(O, a.__scopeDialog);
          return g.modal
            ? (0, b.jsx)(u.Presence, {
                present: e || g.open,
                children: (0, b.jsx)(R, { ...f, ref: c }),
              })
            : null;
        }, 'DialogOverlay'),
      ),
      Q = (0, A.createSlot)('DialogOverlay.RemoveScroll'),
      R = c.forwardRef(
        C(function (a, c) {
          let { __scopeDialog: d, ...e } = a,
            f = H(O, d),
            g = (0, r.useDismissableLayerSurface)(),
            h = (0, n.useComposedRefs)(c, g);
          return (0, b.jsx)(y.RemoveScroll, {
            as: Q,
            allowPinchZoom: !0,
            shards: [f.contentRef],
            children: (0, b.jsx)(v.Primitive.div, {
              'data-state': $(f.open),
              ...e,
              ref: h,
              style: { pointerEvents: 'auto', ...e.style },
            }),
          });
        }, 'DialogOverlayImpl'),
      ),
      S = 'DialogContent',
      T = c.forwardRef(
        C(function (a, c) {
          let d = M(S, a.__scopeDialog),
            { forceMount: e = d.forceMount, ...f } = a,
            g = H(S, a.__scopeDialog);
          return (0, b.jsx)(u.Presence, {
            present: e || g.open,
            children: g.modal ? (0, b.jsx)(U, { ...f, ref: c }) : (0, b.jsx)(V, { ...f, ref: c }),
          });
        }, 'DialogContent'),
      ),
      U = c.forwardRef(
        C(function (a, d) {
          let e = H(S, a.__scopeDialog),
            f = c.useRef(null),
            g = (0, n.useComposedRefs)(d, e.contentRef, f);
          return (
            c.useEffect(() => {
              let a = f.current;
              if (a) return (0, z.hideOthers)(a);
            }, []),
            (0, b.jsx)(W, {
              ...a,
              ref: g,
              trapFocus: e.open,
              disableOutsidePointerEvents: e.open,
              onCloseAutoFocus: (0, m.composeEventHandlers)(a.onCloseAutoFocus, (a) => {
                (a.preventDefault(), e.triggerRef.current?.focus());
              }),
              onPointerDownOutside: (0, m.composeEventHandlers)(a.onPointerDownOutside, (a) => {
                let b = a.detail.originalEvent,
                  c = 0 === b.button && !0 === b.ctrlKey;
                (2 === b.button || c) && a.preventDefault();
              }),
              onFocusOutside: (0, m.composeEventHandlers)(a.onFocusOutside, (a) =>
                a.preventDefault(),
              ),
            })
          );
        }, 'DialogContentModal'),
      ),
      V = c.forwardRef(
        C(function (a, d) {
          let e = H(S, a.__scopeDialog),
            f = c.useRef(!1),
            g = c.useRef(!1);
          return (0, b.jsx)(W, {
            ...a,
            ref: d,
            trapFocus: !1,
            disableOutsidePointerEvents: !1,
            onCloseAutoFocus: (b) => {
              (a.onCloseAutoFocus?.(b),
                b.defaultPrevented ||
                  (f.current || e.triggerRef.current?.focus(), b.preventDefault()),
                (f.current = !1),
                (g.current = !1));
            },
            onInteractOutside: (b) => {
              (a.onInteractOutside?.(b),
                b.defaultPrevented ||
                  ((f.current = !0),
                  'pointerdown' === b.detail.originalEvent.type && (g.current = !0)));
              let c = b.target;
              (e.triggerRef.current?.contains(c) && b.preventDefault(),
                'focusin' === b.detail.originalEvent.type && g.current && b.preventDefault());
            },
          });
        }, 'DialogContentNonModal'),
      ),
      W = c.forwardRef(
        C(function (a, c) {
          let { __scopeDialog: d, trapFocus: e, onOpenAutoFocus: f, onCloseAutoFocus: g, ...h } = a,
            i = H(S, d);
          return (
            (0, w.useFocusGuards)(),
            (0, b.jsx)(b.Fragment, {
              children: (0, b.jsx)(s.FocusScope, {
                asChild: !0,
                loop: !0,
                trapped: e,
                onMountAutoFocus: f,
                onUnmountAutoFocus: g,
                children: (0, b.jsx)(r.DismissableLayer, {
                  role: 'dialog',
                  id: i.contentId,
                  'aria-describedby': i.descriptionPresent ? i.descriptionId : void 0,
                  'aria-labelledby': i.titlePresent ? i.titleId : void 0,
                  'data-state': $(i.open),
                  ...h,
                  ref: c,
                  deferPointerDownOutside: !0,
                  onDismiss: () => i.onOpenChange(!1),
                }),
              }),
            })
          );
        }, 'DialogContentImpl'),
      ),
      X = c.forwardRef(
        C(function (a, c) {
          let { __scopeDialog: d, ...e } = a,
            f = H('DialogTitle', d),
            { setTitleCount: g } = f;
          return (
            (0, x.useLayoutEffect)(() => (g((a) => a + 1), () => g((a) => a - 1)), [g]),
            (0, b.jsx)(v.Primitive.h2, { id: f.titleId, ...e, ref: c })
          );
        }, 'DialogTitle'),
      ),
      Y = c.forwardRef(
        C(function (a, c) {
          let { __scopeDialog: d, ...e } = a,
            f = H('DialogDescription', d),
            { setDescriptionCount: g } = f;
          return (
            (0, x.useLayoutEffect)(() => (g((a) => a + 1), () => g((a) => a - 1)), [g]),
            (0, b.jsx)(v.Primitive.p, { id: f.descriptionId, ...e, ref: c })
          );
        }, 'DialogDescription'),
      ),
      Z = c.forwardRef(
        C(function (a, c) {
          let { __scopeDialog: d, ...e } = a,
            f = H('DialogClose', d);
          return (0, b.jsx)(v.Primitive.button, {
            type: 'button',
            ...e,
            ref: c,
            onClick: (0, m.composeEventHandlers)(a.onClick, () => f.onOpenChange(!1)),
          });
        }, 'DialogClose'),
      );
    function $(a) {
      return a ? 'open' : 'closed';
    }
    C($, 'getState');
    var _ = a.i(18580),
      aa = a.i(35147);
    let ab = c.forwardRef(({ className: a, ...c }, d) =>
      (0, b.jsx)(P, {
        ref: d,
        className: (0, aa.cn)(
          'fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          a,
        ),
        ...c,
      }),
    );
    ab.displayName = P.displayName;
    let ac = c.forwardRef(({ className: a, children: c, ...d }, e) =>
      (0, b.jsxs)(N, {
        children: [
          (0, b.jsx)(ab, {}),
          (0, b.jsxs)(T, {
            ref: e,
            className: (0, aa.cn)(
              'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
              a,
            ),
            ...d,
            children: [
              c,
              (0, b.jsxs)(Z, {
                className:
                  'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground',
                children: [
                  (0, b.jsx)(_.X, { className: 'h-4 w-4' }),
                  (0, b.jsx)('span', { className: 'sr-only', children: 'Close' }),
                ],
              }),
            ],
          }),
        ],
      }),
    );
    ac.displayName = T.displayName;
    let ad = ({ className: a, ...c }) =>
      (0, b.jsx)('div', {
        className: (0, aa.cn)('flex flex-col space-y-1.5 text-center sm:text-left', a),
        ...c,
      });
    ad.displayName = 'DialogHeader';
    let ae = ({ className: a, ...c }) =>
      (0, b.jsx)('div', {
        className: (0, aa.cn)('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', a),
        ...c,
      });
    ae.displayName = 'DialogFooter';
    let af = c.forwardRef(({ className: a, ...c }, d) =>
      (0, b.jsx)(X, {
        ref: d,
        className: (0, aa.cn)('text-lg font-semibold leading-none tracking-tight', a),
        ...c,
      }),
    );
    af.displayName = X.displayName;
    let ag = c.forwardRef(({ className: a, ...c }, d) =>
      (0, b.jsx)(Y, { ref: d, className: (0, aa.cn)('text-sm text-muted-foreground', a), ...c }),
    );
    ag.displayName = Y.displayName;
    var ah = a.i(88878),
      ai = a.i(41890);
    function aj(a, [b, c]) {
      return Math.min(c, Math.max(b, a));
    }
    (0, Object.defineProperty)(aj, 'name', { value: 'clamp', configurable: !0 });
    var ak = a.i(91222),
      al = a.i(33877),
      am = a.i(68953),
      an = a.i(33387);
    function ao(a) {
      let b = c.useRef({ value: a, previous: a });
      return c.useMemo(
        () => (
          b.current.value !== a && ((b.current.previous = b.current.value), (b.current.value = a)),
          b.current.previous
        ),
        [a],
      );
    }
    (0, Object.defineProperty)(ao, 'name', { value: 'usePrevious', configurable: !0 });
    var ap = Object.freeze({
        position: 'absolute',
        border: 0,
        width: 1,
        height: 1,
        padding: 0,
        margin: -1,
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        wordWrap: 'normal',
      }),
      aq = Object.defineProperty,
      ar = (a, b) => aq(a, 'name', { value: b, configurable: !0 }),
      as = [' ', 'Enter', 'ArrowUp', 'ArrowDown'],
      at = [' ', 'Enter'],
      au = 'Select',
      [av, aw, ax] = (0, ak.createCollection)(au),
      [ay, az] = (0, o.createContextScope)(au, [ax, am.createPopperScope]),
      aA = (0, am.createPopperScope)(),
      [aB, aC] = ay(au),
      [aD, aE] = ay(au);
    function aF(a) {
      let {
          __scopeSelect: d,
          children: e,
          open: f,
          defaultOpen: g,
          onOpenChange: h,
          value: i,
          defaultValue: j,
          onValueChange: k,
          dir: l,
          name: m,
          autoComplete: n,
          disabled: o,
          required: r,
          form: s,
          internal_do_not_use_render: t,
        } = a,
        u = aA(d),
        [v, w] = c.useState(null),
        [x, y] = c.useState(null),
        [z, A] = c.useState(!1),
        B = (0, al.useDirection)(l),
        [C, D] = (0, q.useControllableState)({
          prop: f,
          defaultProp: g ?? !1,
          onChange: h,
          caller: au,
        }),
        [E, F] = (0, q.useControllableState)({ prop: i, defaultProp: j, onChange: k, caller: au }),
        G = c.useRef(null),
        H = c.useRef(E);
      c.useEffect(() => {
        let a = s ? v?.ownerDocument.getElementById(s) : v?.form;
        if (a instanceof HTMLFormElement) {
          let b = ar(() => F(H.current), 'reset');
          return (a.addEventListener('reset', b), () => a.removeEventListener('reset', b));
        }
      }, [s, v, F]);
      let I = !v || !!s || !!v.closest('form'),
        [J, K] = c.useState(new Set()),
        L = (0, p.useId)(),
        M = Array.from(J)
          .map((a) => a.props.value)
          .join(';'),
        N = c.useCallback((a) => {
          K((b) => new Set(b).add(a));
        }, []),
        O = c.useCallback((a) => {
          K((b) => {
            let c = new Set(b);
            return (c.delete(a), c);
          });
        }, []),
        P = {
          required: r,
          trigger: v,
          onTriggerChange: w,
          valueNode: x,
          onValueNodeChange: y,
          valueNodeHasChildren: z,
          onValueNodeHasChildrenChange: A,
          contentId: L,
          value: E,
          onValueChange: F,
          open: C,
          onOpenChange: D,
          dir: B,
          triggerPointerDownPosRef: G,
          disabled: o,
          name: m,
          autoComplete: n,
          form: s,
          nativeOptions: J,
          nativeSelectKey: M,
          isFormControl: I,
        };
      return (0, b.jsx)(am.Root, {
        ...u,
        children: (0, b.jsx)(aB, {
          scope: d,
          ...P,
          children: (0, b.jsx)(av.Provider, {
            scope: d,
            children: (0, b.jsx)(aD, {
              scope: d,
              onNativeOptionAdd: N,
              onNativeOptionRemove: O,
              children: a8(t) ? t(P) : e,
            }),
          }),
        }),
      });
    }
    ar(aF, 'SelectProvider');
    var aG = ar((a) => {
        let { __scopeSelect: c, children: d, ...e } = a;
        return (0, b.jsx)(aF, {
          __scopeSelect: c,
          ...e,
          internal_do_not_use_render: ({ isFormControl: a }) =>
            (0, b.jsxs)(b.Fragment, {
              children: [d, a ? (0, b.jsx)(a7, { __scopeSelect: c }) : null],
            }),
        });
      }, 'Select'),
      aH = c.forwardRef(
        ar(function (a, d) {
          let { __scopeSelect: e, disabled: f = !1, ...g } = a,
            h = aA(e),
            i = aC('SelectTrigger', e),
            j = i.disabled || f,
            k = (0, n.useComposedRefs)(d, i.onTriggerChange),
            l = aw(e),
            o = c.useRef('touch'),
            [p, q, r] = ba((a) => {
              let b = l().filter((a) => !a.disabled),
                c = b.find((a) => a.value === i.value),
                d = bb(b, a, c);
              void 0 !== d && i.onValueChange(d.value);
            }),
            s = ar((a) => {
              (j || (i.onOpenChange(!0), r()),
                a &&
                  (i.triggerPointerDownPosRef.current = {
                    x: Math.round(a.pageX),
                    y: Math.round(a.pageY),
                  }));
            }, 'handleOpen');
          return (0, b.jsx)(am.Anchor, {
            asChild: !0,
            ...h,
            children: (0, b.jsx)(v.Primitive.button, {
              type: 'button',
              role: 'combobox',
              'aria-controls': i.open ? i.contentId : void 0,
              'aria-expanded': i.open,
              'aria-required': i.required,
              'aria-autocomplete': 'none',
              dir: i.dir,
              'data-state': i.open ? 'open' : 'closed',
              disabled: j,
              'data-disabled': j ? '' : void 0,
              'data-placeholder': a9(i.value) ? '' : void 0,
              ...g,
              ref: k,
              onClick: (0, m.composeEventHandlers)(g.onClick, (a) => {
                (a.currentTarget.focus(), 'mouse' !== o.current && s(a));
              }),
              onPointerDown: (0, m.composeEventHandlers)(g.onPointerDown, (a) => {
                o.current = a.pointerType;
                let b = a.target;
                (b.hasPointerCapture(a.pointerId) && b.releasePointerCapture(a.pointerId),
                  0 === a.button &&
                    !1 === a.ctrlKey &&
                    'mouse' === a.pointerType &&
                    (s(a), a.preventDefault()));
              }),
              onKeyDown: (0, m.composeEventHandlers)(g.onKeyDown, (a) => {
                let b = '' !== p.current;
                (a.ctrlKey || a.altKey || a.metaKey || 1 !== a.key.length || q(a.key),
                  (!b || ' ' !== a.key) && as.includes(a.key) && (s(), a.preventDefault()));
              }),
            }),
          });
        }, 'SelectTrigger'),
      ),
      aI = c.forwardRef(
        ar(function (a, d) {
          let {
              __scopeSelect: e,
              className: f,
              style: g,
              children: h,
              placeholder: i = '',
              ...j
            } = a,
            k = aC('SelectValue', e),
            { onValueNodeHasChildrenChange: l } = k,
            m = void 0 !== h,
            o = (0, n.useComposedRefs)(d, k.onValueNodeChange);
          (0, x.useLayoutEffect)(() => {
            l(m);
          }, [l, m]);
          let p = a9(k.value);
          return (0, b.jsx)(v.Primitive.span, {
            ...j,
            asChild: !p && j.asChild,
            ref: o,
            style: { pointerEvents: 'none' },
            children: (0, b.jsx)(c.Fragment, { children: p ? i : h }, p ? 'placeholder' : 'value'),
          });
        }, 'SelectValue'),
      ),
      aJ = c.forwardRef(
        ar(function (a, c) {
          let { __scopeSelect: d, children: e, ...f } = a;
          return (0, b.jsx)(v.Primitive.span, {
            'aria-hidden': !0,
            ...f,
            ref: c,
            children: e || '▼',
          });
        }, 'SelectIcon'),
      ),
      [aK, aL] = ay('SelectPortal', { forceMount: void 0 }),
      aM = ar((a) => {
        let { __scopeSelect: c, forceMount: d, ...e } = a;
        return (0, b.jsx)(aK, {
          scope: a.__scopeSelect,
          forceMount: d,
          children: (0, b.jsx)(t.Portal, { asChild: !0, ...e }),
        });
      }, 'SelectPortal'),
      aN = 'SelectContent',
      aO = c.forwardRef(
        ar(function (a, d) {
          let e = aL(aN, a.__scopeSelect),
            { forceMount: f = e.forceMount, ...g } = a,
            h = aC(aN, a.__scopeSelect),
            [i, j] = c.useState();
          return (
            (0, x.useLayoutEffect)(() => {
              j(new DocumentFragment());
            }, []),
            (0, b.jsx)(u.Presence, {
              present: f || h.open,
              children: ({ present: a }) =>
                a ? (0, b.jsx)(aT, { ...g, ref: d }) : (0, b.jsx)(aP, { ...g, fragment: i }),
            })
          );
        }, 'SelectContent'),
      ),
      aP = c.forwardRef(
        ar(function (a, c) {
          let { __scopeSelect: d, children: e, fragment: f } = a;
          return f
            ? ai.createPortal(
                (0, b.jsx)(aQ, {
                  scope: d,
                  children: (0, b.jsx)(av.Slot, {
                    scope: d,
                    children: (0, b.jsx)('div', { ref: c, children: e }),
                  }),
                }),
                f,
              )
            : null;
        }, 'SelectContentFragment'),
      ),
      [aQ, aR] = ay(aN),
      aS = (0, A.createSlot)('SelectContent.RemoveScroll'),
      aT = c.forwardRef(
        ar(function (a, d) {
          let { __scopeSelect: e } = a,
            {
              position: f = 'item-aligned',
              onCloseAutoFocus: g,
              onEscapeKeyDown: h,
              onPointerDownOutside: i,
              side: j,
              sideOffset: k,
              align: l,
              alignOffset: o,
              arrowPadding: p,
              collisionBoundary: q,
              collisionPadding: t,
              sticky: u,
              hideWhenDetached: v,
              avoidCollisions: x,
              ...A
            } = a,
            B = aC(aN, e),
            [C, D] = c.useState(null),
            [E, F] = c.useState(null),
            G = (0, n.useComposedRefs)(d, D),
            [H, I] = c.useState(null),
            [J, K] = c.useState(null),
            L = aw(e),
            [M, N] = c.useState(!1),
            O = c.useRef(!1);
          (c.useEffect(() => {
            if (C) return (0, z.hideOthers)(C);
          }, [C]),
            (0, w.useFocusGuards)());
          let P = c.useCallback(
              (a) => {
                let [b, ...c] = L().map((a) => a.ref.current),
                  [d] = c.slice(-1),
                  e = document.activeElement;
                for (let c of a)
                  if (
                    c === e ||
                    (c?.scrollIntoView({ block: 'nearest' }),
                    c === b && E && (E.scrollTop = 0),
                    c === d && E && (E.scrollTop = E.scrollHeight),
                    c?.focus(),
                    document.activeElement !== e)
                  )
                    return;
              },
              [L, E],
            ),
            Q = c.useCallback(() => P([H, C]), [P, H, C]);
          c.useEffect(() => {
            M && Q();
          }, [M, Q]);
          let { onOpenChange: R, triggerPointerDownPosRef: S } = B;
          (c.useEffect(() => {
            if (C) {
              let a = { x: 0, y: 0 },
                b = ar((b) => {
                  a = {
                    x: Math.abs(Math.round(b.pageX) - (S.current?.x ?? 0)),
                    y: Math.abs(Math.round(b.pageY) - (S.current?.y ?? 0)),
                  };
                }, 'handlePointerMove'),
                c = ar((c) => {
                  (a.x <= 10 && a.y <= 10
                    ? c.preventDefault()
                    : c.composedPath().includes(C) || R(!1),
                    document.removeEventListener('pointermove', b),
                    (S.current = null));
                }, 'handlePointerUp');
              return (
                null !== S.current &&
                  (document.addEventListener('pointermove', b),
                  document.addEventListener('pointerup', c, { capture: !0, once: !0 })),
                () => {
                  (document.removeEventListener('pointermove', b),
                    document.removeEventListener('pointerup', c, { capture: !0 }));
                }
              );
            }
          }, [C, R, S]),
            c.useEffect(() => {
              let a = ar(() => R(!1), 'close');
              return (
                window.addEventListener('blur', a),
                window.addEventListener('resize', a),
                () => {
                  (window.removeEventListener('blur', a), window.removeEventListener('resize', a));
                }
              );
            }, [R]));
          let [T, U] = ba((a) => {
              let b = L().filter((a) => !a.disabled),
                c = b.find((a) => a.ref.current === document.activeElement),
                d = bb(b, a, c);
              d && setTimeout(() => d.ref.current?.focus());
            }),
            V = c.useCallback(
              (a, b, c) => {
                let d = !O.current && !c;
                ((void 0 !== B.value && B.value === b) || d) && (I(a), d && (O.current = !0));
              },
              [B.value],
            ),
            W = c.useCallback(() => C?.focus(), [C]),
            X = c.useCallback(
              (a, b, c) => {
                let d = !O.current && !c;
                ((void 0 !== B.value && B.value === b) || d) && K(a);
              },
              [B.value],
            ),
            Y = 'popper' === f ? aV : aU;
          return (0, b.jsx)(aQ, {
            scope: e,
            content: C,
            viewport: E,
            onViewportChange: F,
            itemRefCallback: V,
            selectedItem: H,
            onItemLeave: W,
            itemTextRefCallback: X,
            focusSelectedItem: Q,
            selectedItemText: J,
            position: f,
            isPositioned: M,
            searchRef: T,
            children: (0, b.jsx)(y.RemoveScroll, {
              as: aS,
              allowPinchZoom: !0,
              children: (0, b.jsx)(s.FocusScope, {
                asChild: !0,
                trapped: B.open,
                onMountAutoFocus: (a) => {
                  a.preventDefault();
                },
                onUnmountAutoFocus: (0, m.composeEventHandlers)(g, (a) => {
                  (B.trigger?.focus({ preventScroll: !0 }), a.preventDefault());
                }),
                children: (0, b.jsx)(r.DismissableLayer, {
                  asChild: !0,
                  disableOutsidePointerEvents: !0,
                  onEscapeKeyDown: h,
                  onPointerDownOutside: i,
                  onFocusOutside: (a) => a.preventDefault(),
                  onDismiss: () => B.onOpenChange(!1),
                  children: (0, b.jsx)(Y, {
                    role: 'listbox',
                    id: B.contentId,
                    'data-state': B.open ? 'open' : 'closed',
                    dir: B.dir,
                    onContextMenu: (a) => a.preventDefault(),
                    ...A,
                    ...(Y === aV
                      ? {
                          side: j,
                          sideOffset: k,
                          align: l,
                          alignOffset: o,
                          arrowPadding: p,
                          collisionBoundary: q,
                          collisionPadding: t,
                          sticky: u,
                          hideWhenDetached: v,
                          avoidCollisions: x,
                        }
                      : {}),
                    onPlaced: () => N(!0),
                    ref: G,
                    style: {
                      display: 'flex',
                      flexDirection: 'column',
                      outline: 'none',
                      ...A.style,
                    },
                    onKeyDown: (0, m.composeEventHandlers)(A.onKeyDown, (a) => {
                      let b = a.ctrlKey || a.altKey || a.metaKey;
                      if (
                        ('Tab' === a.key && a.preventDefault(),
                        b || 1 !== a.key.length || U(a.key),
                        ['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(a.key))
                      ) {
                        let b = L()
                          .filter((a) => !a.disabled)
                          .map((a) => a.ref.current);
                        if (
                          (['ArrowUp', 'End'].includes(a.key) && (b = b.slice().reverse()),
                          ['ArrowUp', 'ArrowDown'].includes(a.key))
                        ) {
                          let c = a.target,
                            d = b.indexOf(c);
                          b = b.slice(d + 1);
                        }
                        (setTimeout(() => P(b)), a.preventDefault());
                      }
                    }),
                  }),
                }),
              }),
            }),
          });
        }, 'SelectContentImpl'),
      ),
      aU = c.forwardRef(
        ar(function (a, d) {
          let { __scopeSelect: e, onPlaced: f, ...g } = a,
            h = aC(aN, e),
            i = aR(aN, e),
            [j, k] = c.useState(null),
            [l, m] = c.useState(null),
            o = (0, n.useComposedRefs)(d, m),
            p = aw(e),
            q = c.useRef(!1),
            r = c.useRef(!0),
            { viewport: s, selectedItem: t, selectedItemText: u, focusSelectedItem: w } = i,
            y = c.useCallback(() => {
              if (h.trigger && h.valueNode && j && l && s && t && u) {
                let a = h.trigger.getBoundingClientRect(),
                  b = l.getBoundingClientRect(),
                  c = h.valueNode.getBoundingClientRect(),
                  d = u.getBoundingClientRect();
                if ('rtl' !== h.dir) {
                  let e = d.left - b.left,
                    f = c.left - e,
                    g = a.left - f,
                    h = a.width + g,
                    i = Math.max(h, b.width),
                    k = aj(f, [10, Math.max(10, window.innerWidth - 10 - i)]);
                  ((j.style.minWidth = h + 'px'), (j.style.left = k + 'px'));
                } else {
                  let e = b.right - d.right,
                    f = window.innerWidth - c.right - e,
                    g = window.innerWidth - a.right - f,
                    h = a.width + g,
                    i = Math.max(h, b.width),
                    k = aj(f, [10, Math.max(10, window.innerWidth - 10 - i)]);
                  ((j.style.minWidth = h + 'px'), (j.style.right = k + 'px'));
                }
                let e = p(),
                  g = window.innerHeight - 20,
                  i = s.scrollHeight,
                  k = window.getComputedStyle(l),
                  m = parseInt(k.borderTopWidth, 10),
                  n = parseInt(k.paddingTop, 10),
                  o = parseInt(k.borderBottomWidth, 10),
                  r = m + n + i + parseInt(k.paddingBottom, 10) + o,
                  v = Math.min(5 * t.offsetHeight, r),
                  w = window.getComputedStyle(s),
                  x = parseInt(w.paddingTop, 10),
                  y = parseInt(w.paddingBottom, 10),
                  z = a.top + a.height / 2 - 10,
                  A = t.offsetHeight / 2,
                  B = m + n + (t.offsetTop + A);
                if (B <= z) {
                  let a = e.length > 0 && t === e[e.length - 1].ref.current;
                  j.style.bottom = '0px';
                  let b = Math.max(
                    g - z,
                    A + (a ? y : 0) + (l.clientHeight - s.offsetTop - s.offsetHeight) + o,
                  );
                  j.style.height = B + b + 'px';
                } else {
                  let a = e.length > 0 && t === e[0].ref.current;
                  j.style.top = '0px';
                  let b = Math.max(z, m + s.offsetTop + (a ? x : 0) + A);
                  ((j.style.height = b + (r - B) + 'px'), (s.scrollTop = B - z + s.offsetTop));
                }
                ((j.style.margin = '10px 0'),
                  (j.style.minHeight = v + 'px'),
                  (j.style.maxHeight = g + 'px'),
                  f?.(),
                  requestAnimationFrame(() => (q.current = !0)));
              }
            }, [p, h.trigger, h.valueNode, j, l, s, t, u, h.dir, f]);
          (0, x.useLayoutEffect)(() => y(), [y]);
          let [z, A] = c.useState();
          (0, x.useLayoutEffect)(() => {
            l && A(window.getComputedStyle(l).zIndex);
          }, [l]);
          let B = c.useCallback(
            (a) => {
              a && !0 === r.current && (y(), w?.(), (r.current = !1));
            },
            [y, w],
          );
          return (0, b.jsx)(aW, {
            scope: e,
            contentWrapper: j,
            shouldExpandOnScrollRef: q,
            onScrollButtonChange: B,
            children: (0, b.jsx)('div', {
              ref: k,
              style: { display: 'flex', flexDirection: 'column', position: 'fixed', zIndex: z },
              children: (0, b.jsx)(v.Primitive.div, {
                ...g,
                ref: o,
                style: { boxSizing: 'border-box', maxHeight: '100%', ...g.style },
              }),
            }),
          });
        }, 'SelectItemAlignedPosition'),
      ),
      aV = c.forwardRef(
        ar(function (a, c) {
          let { __scopeSelect: d, align: e = 'start', collisionPadding: f = 10, ...g } = a,
            h = aA(d);
          return (0, b.jsx)(am.Content, {
            ...h,
            ...g,
            ref: c,
            align: e,
            collisionPadding: f,
            style: {
              boxSizing: 'border-box',
              ...g.style,
              '--radix-select-content-transform-origin': 'var(--radix-popper-transform-origin)',
              '--radix-select-content-available-width': 'var(--radix-popper-available-width)',
              '--radix-select-content-available-height': 'var(--radix-popper-available-height)',
              '--radix-select-trigger-width': 'var(--radix-popper-anchor-width)',
              '--radix-select-trigger-height': 'var(--radix-popper-anchor-height)',
            },
          });
        }, 'SelectPopperPosition'),
      ),
      [aW, aX] = ay(aN, {}),
      aY = 'SelectViewport',
      aZ = c.forwardRef(
        ar(function (a, d) {
          let { __scopeSelect: e, nonce: f, ...g } = a,
            h = aR(aY, e),
            i = aX(aY, e),
            j = (0, n.useComposedRefs)(d, h.onViewportChange),
            k = c.useRef(0);
          return (0, b.jsxs)(b.Fragment, {
            children: [
              (0, b.jsx)('style', {
                dangerouslySetInnerHTML: {
                  __html:
                    '[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}',
                },
                nonce: f,
              }),
              (0, b.jsx)(av.Slot, {
                scope: e,
                children: (0, b.jsx)(v.Primitive.div, {
                  'data-radix-select-viewport': '',
                  role: 'presentation',
                  ...g,
                  ref: j,
                  style: { position: 'relative', flex: 1, overflow: 'hidden auto', ...g.style },
                  onScroll: (0, m.composeEventHandlers)(g.onScroll, (a) => {
                    let b = a.currentTarget,
                      { contentWrapper: c, shouldExpandOnScrollRef: d } = i;
                    if (d?.current && c) {
                      let a = Math.abs(k.current - b.scrollTop);
                      if (a > 0) {
                        let d = window.innerHeight - 20,
                          e = Math.max(parseFloat(c.style.minHeight), parseFloat(c.style.height));
                        if (e < d) {
                          let f = e + a,
                            g = Math.min(d, f),
                            h = f - g;
                          ((c.style.height = g + 'px'),
                            '0px' === c.style.bottom &&
                              ((b.scrollTop = h > 0 ? h : 0),
                              (c.style.justifyContent = 'flex-end')));
                        }
                      }
                    }
                    k.current = b.scrollTop;
                  }),
                }),
              }),
            ],
          });
        }, 'SelectViewport'),
      ),
      [a$, a_] = ay('SelectGroup'),
      a0 = 'SelectItem',
      [a1, a2] = ay(a0),
      a3 = c.forwardRef(
        ar(function (a, d) {
          let { __scopeSelect: e, value: f, disabled: g = !1, textValue: h, ...i } = a,
            j = aC(a0, e),
            k = aR(a0, e),
            l = j.value === f,
            [o, q] = c.useState(h ?? ''),
            [r, s] = c.useState(!1),
            t = (0, an.useCallbackRef)((a) => k.itemRefCallback?.(a, f, g)),
            u = (0, n.useComposedRefs)(d, t),
            w = (0, p.useId)(),
            x = c.useRef('touch'),
            y = ar(() => {
              g || (j.onValueChange(f), j.onOpenChange(!1));
            }, 'handleSelect');
          return (0, b.jsx)(a1, {
            scope: e,
            value: f,
            disabled: g,
            textId: w,
            isSelected: l,
            onItemTextChange: c.useCallback((a) => {
              q((b) => b || (a?.textContent ?? '').trim());
            }, []),
            children: (0, b.jsx)(av.ItemSlot, {
              scope: e,
              value: f,
              disabled: g,
              textValue: o,
              children: (0, b.jsx)(v.Primitive.div, {
                role: 'option',
                'aria-labelledby': w,
                'data-highlighted': r ? '' : void 0,
                'aria-selected': l && r,
                'data-state': l ? 'checked' : 'unchecked',
                'aria-disabled': g || void 0,
                'data-disabled': g ? '' : void 0,
                tabIndex: g ? void 0 : -1,
                ...i,
                ref: u,
                onFocus: (0, m.composeEventHandlers)(i.onFocus, () => s(!0)),
                onBlur: (0, m.composeEventHandlers)(i.onBlur, () => s(!1)),
                onClick: (0, m.composeEventHandlers)(i.onClick, () => {
                  'mouse' !== x.current && y();
                }),
                onPointerUp: (0, m.composeEventHandlers)(i.onPointerUp, () => {
                  'mouse' === x.current && y();
                }),
                onPointerDown: (0, m.composeEventHandlers)(i.onPointerDown, (a) => {
                  x.current = a.pointerType;
                }),
                onPointerMove: (0, m.composeEventHandlers)(i.onPointerMove, (a) => {
                  ((x.current = a.pointerType),
                    g
                      ? k.onItemLeave?.()
                      : 'mouse' === x.current && a.currentTarget.focus({ preventScroll: !0 }));
                }),
                onPointerLeave: (0, m.composeEventHandlers)(i.onPointerLeave, (a) => {
                  a.currentTarget === document.activeElement && k.onItemLeave?.();
                }),
                onKeyDown: (0, m.composeEventHandlers)(i.onKeyDown, (a) => {
                  g ||
                    a.target !== a.currentTarget ||
                    ((k.searchRef?.current === '' || ' ' !== a.key) &&
                      (at.includes(a.key) && y(), ' ' === a.key && a.preventDefault()));
                }),
              }),
            }),
          });
        }, 'SelectItem'),
      ),
      a4 = 'SelectItemText',
      a5 = c.forwardRef(
        ar(function (a, d) {
          let { __scopeSelect: e, className: f, style: g, ...h } = a,
            i = aC(a4, e),
            j = aR(a4, e),
            k = a2(a4, e),
            l = aE(a4, e),
            [m, o] = c.useState(null),
            p = (0, an.useCallbackRef)((a) => j.itemTextRefCallback?.(a, k.value, k.disabled)),
            q = (0, n.useComposedRefs)(d, o, k.onItemTextChange, p),
            r = m?.textContent,
            s = c.useMemo(
              () =>
                (0, b.jsx)(
                  'option',
                  { value: k.value, disabled: k.disabled, children: r },
                  k.value,
                ),
              [k.disabled, k.value, r],
            ),
            { onNativeOptionAdd: t, onNativeOptionRemove: u } = l;
          return (
            (0, x.useLayoutEffect)(() => (t(s), () => u(s)), [t, u, s]),
            (0, b.jsxs)(b.Fragment, {
              children: [
                (0, b.jsx)(v.Primitive.span, { id: k.textId, ...h, ref: q }),
                k.isSelected && i.valueNode && !i.valueNodeHasChildren && !a9(i.value)
                  ? ai.createPortal(h.children, i.valueNode)
                  : null,
              ],
            })
          );
        }, 'SelectItemText'),
      ),
      a6 = c.forwardRef(
        ar(function (a, c) {
          let { __scopeSelect: d, ...e } = a;
          return a2('SelectItemIndicator', d).isSelected
            ? (0, b.jsx)(v.Primitive.span, { 'aria-hidden': !0, ...e, ref: c })
            : null;
        }, 'SelectItemIndicator'),
      ),
      a7 = c.forwardRef(
        ar(function ({ __scopeSelect: a, ...d }, e) {
          let f = aC('SelectBubbleInput', a),
            {
              value: g,
              onValueChange: h,
              required: i,
              disabled: j,
              name: k,
              autoComplete: l,
              form: m,
            } = f,
            { nativeOptions: o, nativeSelectKey: p } = f,
            q = c.useRef(null),
            r = (0, n.useComposedRefs)(e, q),
            s = g ?? '',
            t = ao(s),
            u = Array.from(o).some((a) => (a.props.value ?? '') === '');
          return (
            c.useEffect(() => {
              let a = q.current;
              if (!a) return;
              let b = Object.getOwnPropertyDescriptor(
                window.HTMLSelectElement.prototype,
                'value',
              ).set;
              if (t !== s && b) {
                let c = new Event('change', { bubbles: !0 });
                (b.call(a, s), a.dispatchEvent(c));
              }
            }, [t, s]),
            (0, b.jsxs)(
              v.Primitive.select,
              {
                'aria-hidden': !0,
                required: i,
                tabIndex: -1,
                name: k,
                autoComplete: l,
                disabled: j,
                form: m,
                onChange: (a) => h(a.target.value),
                ...d,
                style: { ...ap, ...d.style },
                ref: r,
                defaultValue: s,
                children: [a9(g) && !u ? (0, b.jsx)('option', { value: '' }) : null, Array.from(o)],
              },
              p,
            )
          );
        }, 'SelectBubbleInput'),
      );
    function a8(a) {
      return 'function' == typeof a;
    }
    function a9(a) {
      return '' === a || void 0 === a;
    }
    function ba(a) {
      let b = (0, an.useCallbackRef)(a),
        d = c.useRef(''),
        e = c.useRef(0),
        f = c.useCallback(
          (a) => {
            b(d.current + a);
          },
          [b],
        ),
        g = c.useCallback(() => {
          ((d.current = ''), window.clearTimeout(e.current));
        }, []);
      return (c.useEffect(() => () => window.clearTimeout(e.current), []), [d, f, g]);
    }
    function bb(a, b, c) {
      let d = b.length > 1 && Array.from(b).every((a) => a === b[0]) ? b[0] : b,
        e = c ? a.indexOf(c) : -1,
        f = bc(a, Math.max(e, 0));
      1 === d.length && (f = f.filter((a) => a !== c));
      let g = f.find((a) => a.textValue.toLowerCase().startsWith(d.toLowerCase()));
      return g !== c ? g : void 0;
    }
    function bc(a, b) {
      return a.map((c, d) => a[(b + d) % a.length]);
    }
    (ar(a8, 'isFunction'),
      ar(a9, 'shouldShowPlaceholder'),
      ar(ba, 'useTypeaheadSearch'),
      ar(bb, 'findNextItem'),
      ar(bc, 'wrapArray'));
    var bd = a.i(67406);
    let be = (0, a.i(10641).default)('ChevronDown', [
        ['path', { d: 'm6 9 6 6 6-6', key: 'qrunsl' }],
      ]),
      bf = c.forwardRef(({ className: a, children: c, ...d }, e) =>
        (0, b.jsxs)(aH, {
          ref: e,
          className: (0, aa.cn)(
            'flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
            a,
          ),
          ...d,
          children: [
            c,
            (0, b.jsx)(aJ, {
              asChild: !0,
              children: (0, b.jsx)(be, { className: 'h-4 w-4 opacity-50' }),
            }),
          ],
        }),
      );
    bf.displayName = aH.displayName;
    let bg = c.forwardRef(({ className: a, children: c, position: d = 'popper', ...e }, f) =>
      (0, b.jsx)(aM, {
        children: (0, b.jsx)(aO, {
          ref: f,
          className: (0, aa.cn)(
            'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
            'popper' === d &&
              'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
            a,
          ),
          position: d,
          ...e,
          children: (0, b.jsx)(aZ, {
            className: (0, aa.cn)(
              'p-1',
              'popper' === d &&
                'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
            ),
            children: c,
          }),
        }),
      }),
    );
    bg.displayName = aO.displayName;
    let bh = c.forwardRef(({ className: a, children: c, ...d }, e) =>
      (0, b.jsxs)(a3, {
        ref: e,
        className: (0, aa.cn)(
          'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
          a,
        ),
        ...d,
        children: [
          (0, b.jsx)('span', {
            className: 'absolute right-2 flex h-3.5 w-3.5 items-center justify-center',
            children: (0, b.jsx)(a6, { children: (0, b.jsx)(bd.Check, { className: 'h-4 w-4' }) }),
          }),
          (0, b.jsx)(a5, { children: c }),
        ],
      }),
    );
    bh.displayName = a3.displayName;
    var bi = a.i(2768),
      bj = a.i(86435);
    a.s(
      [
        'default',
        0,
        function () {
          let [a, m] = (0, c.useState)(''),
            [n, o] = (0, c.useState)(!1),
            [p, q] = (0, c.useState)(null),
            { data: r = [], isLoading: s } = (0, d.useQuery)({
              queryKey: ['api-keys'],
              queryFn: async () => (await new Promise((a) => setTimeout(a, 300)), bi.mockApiKeys),
            }),
            t = r.filter((b) => b.name.toLowerCase().includes(a.toLowerCase()));
          return (0, b.jsxs)('div', {
            className: 'space-y-6',
            children: [
              (0, b.jsxs)('div', {
                className: 'flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between',
                children: [
                  (0, b.jsxs)('div', {
                    children: [
                      (0, b.jsx)('h2', {
                        className: 'text-2xl font-semibold tracking-tight',
                        children: 'API Keys',
                      }),
                      (0, b.jsx)('p', {
                        className: 'text-sm text-muted-foreground',
                        children: 'Issue dan revoke API key untuk partner',
                      }),
                    ],
                  }),
                  (0, b.jsxs)(I, {
                    open: n,
                    onOpenChange: (a) => {
                      (o(a), a || q(null));
                    },
                    children: [
                      (0, b.jsx)(J, {
                        asChild: !0,
                        children: (0, b.jsxs)(h.Button, {
                          size: 'sm',
                          children: [
                            (0, b.jsx)(e.Plus, { className: 'mr-2 h-4 w-4' }),
                            'Issue New Key',
                          ],
                        }),
                      }),
                      (0, b.jsx)(ac, {
                        children: p
                          ? (0, b.jsxs)(b.Fragment, {
                              children: [
                                (0, b.jsxs)(ad, {
                                  children: [
                                    (0, b.jsx)(af, { children: 'API Key Created' }),
                                    (0, b.jsx)(ag, {
                                      children:
                                        'Simpan key ini sekarang. Tidak akan ditampilkan lagi.',
                                    }),
                                  ],
                                }),
                                (0, b.jsx)('div', {
                                  className: 'space-y-4 py-4',
                                  children: (0, b.jsxs)('div', {
                                    className:
                                      'flex items-center gap-2 rounded-lg border bg-muted/30 p-3',
                                    children: [
                                      (0, b.jsx)('code', {
                                        className: 'flex-1 break-all text-xs font-mono',
                                        children: p,
                                      }),
                                      (0, b.jsx)(h.Button, {
                                        variant: 'ghost',
                                        size: 'sm',
                                        onClick: () => {
                                          (navigator.clipboard.writeText(p),
                                            bj.toast.success('Copied to clipboard'));
                                        },
                                        children: 'Copy',
                                      }),
                                    ],
                                  }),
                                }),
                                (0, b.jsx)(ae, {
                                  children: (0, b.jsx)(h.Button, {
                                    onClick: () => o(!1),
                                    children: 'Saya sudah menyimpan key',
                                  }),
                                }),
                              ],
                            })
                          : (0, b.jsxs)(b.Fragment, {
                              children: [
                                (0, b.jsxs)(ad, {
                                  children: [
                                    (0, b.jsx)(af, { children: 'Issue New API Key' }),
                                    (0, b.jsx)(ag, {
                                      children: 'Key hanya akan ditampilkan sekali setelah dibuat.',
                                    }),
                                  ],
                                }),
                                (0, b.jsxs)('div', {
                                  className: 'space-y-4 py-4',
                                  children: [
                                    (0, b.jsxs)('div', {
                                      className: 'space-y-2',
                                      children: [
                                        (0, b.jsx)(ah.Label, { children: 'Name' }),
                                        (0, b.jsx)(i.Input, { placeholder: 'partner-acme-2026' }),
                                      ],
                                    }),
                                    (0, b.jsxs)('div', {
                                      className: 'space-y-2',
                                      children: [
                                        (0, b.jsx)(ah.Label, { children: 'Tenant' }),
                                        (0, b.jsxs)(aG, {
                                          children: [
                                            (0, b.jsx)(bf, {
                                              children: (0, b.jsx)(aI, {
                                                placeholder: 'Pilih tenant',
                                              }),
                                            }),
                                            (0, b.jsx)(bg, {
                                              children: bi.mockTenants.map((a) =>
                                                (0, b.jsx)(
                                                  bh,
                                                  { value: a.id, children: a.name },
                                                  a.id,
                                                ),
                                              ),
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                (0, b.jsxs)(ae, {
                                  children: [
                                    (0, b.jsx)(h.Button, {
                                      variant: 'outline',
                                      onClick: () => o(!1),
                                      children: 'Cancel',
                                    }),
                                    (0, b.jsx)(h.Button, {
                                      onClick: function () {
                                        (q(`msh_sk_${Math.random().toString(36).slice(2, 34)}`),
                                          bj.toast.success('API key berhasil dibuat'));
                                      },
                                      children: 'Issue Key',
                                    }),
                                  ],
                                }),
                              ],
                            }),
                      }),
                    ],
                  }),
                ],
              }),
              (0, b.jsxs)('div', {
                className: 'relative max-w-sm',
                children: [
                  (0, b.jsx)(g.Search, {
                    className:
                      'absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground',
                  }),
                  (0, b.jsx)(i.Input, {
                    placeholder: 'Search keys...',
                    value: a,
                    onChange: (a) => m(a.target.value),
                    className: 'pl-9',
                  }),
                ],
              }),
              (0, b.jsx)(j.Card, {
                children: (0, b.jsx)(j.CardContent, {
                  className: 'p-0',
                  children: (0, b.jsxs)(l.Table, {
                    children: [
                      (0, b.jsx)(l.TableHeader, {
                        children: (0, b.jsxs)(l.TableRow, {
                          children: [
                            (0, b.jsx)(l.TableHead, { children: 'Name' }),
                            (0, b.jsx)(l.TableHead, { children: 'Tenant' }),
                            (0, b.jsx)(l.TableHead, { children: 'Scopes' }),
                            (0, b.jsx)(l.TableHead, { children: 'Status' }),
                            (0, b.jsx)(l.TableHead, { className: 'text-right', children: 'Usage' }),
                            (0, b.jsx)(l.TableHead, {
                              className: 'text-right',
                              children: 'Last Used',
                            }),
                          ],
                        }),
                      }),
                      (0, b.jsx)(l.TableBody, {
                        children: s
                          ? (0, b.jsx)(l.TableRow, {
                              children: (0, b.jsx)(l.TableCell, {
                                colSpan: 6,
                                className: 'text-center py-8 text-muted-foreground',
                                children: 'Loading...',
                              }),
                            })
                          : t.map((a) =>
                              (0, b.jsxs)(
                                l.TableRow,
                                {
                                  children: [
                                    (0, b.jsx)(l.TableCell, {
                                      children: (0, b.jsxs)('div', {
                                        className: 'flex items-center gap-2',
                                        children: [
                                          (0, b.jsx)(f.KeyRound, {
                                            className: 'h-4 w-4 text-muted-foreground',
                                          }),
                                          (0, b.jsx)('span', {
                                            className: 'font-medium text-sm',
                                            children: a.name,
                                          }),
                                        ],
                                      }),
                                    }),
                                    (0, b.jsx)(l.TableCell, {
                                      className: 'text-sm font-mono',
                                      children: a.tenantId,
                                    }),
                                    (0, b.jsx)(l.TableCell, {
                                      children: (0, b.jsxs)('div', {
                                        className: 'flex flex-wrap gap-1',
                                        children: [
                                          a.scopes.slice(0, 2).map((a) =>
                                            (0, b.jsx)(
                                              k.Badge,
                                              {
                                                variant: 'secondary',
                                                className: 'text-xs',
                                                children: a,
                                              },
                                              a,
                                            ),
                                          ),
                                          a.scopes.length > 2 &&
                                            (0, b.jsxs)(k.Badge, {
                                              variant: 'secondary',
                                              className: 'text-xs',
                                              children: ['+', a.scopes.length - 2],
                                            }),
                                        ],
                                      }),
                                    }),
                                    (0, b.jsx)(l.TableCell, {
                                      children: (0, b.jsx)(k.Badge, {
                                        variant: 'active' === a.status ? 'default' : 'secondary',
                                        children: a.status,
                                      }),
                                    }),
                                    (0, b.jsx)(l.TableCell, {
                                      className: 'text-right font-mono text-xs',
                                      children: (0, aa.formatNumber)(a.usageCount),
                                    }),
                                    (0, b.jsx)(l.TableCell, {
                                      className: 'text-right text-xs text-muted-foreground',
                                      children: a.lastUsedAt
                                        ? (0, aa.relativeTime)(a.lastUsedAt)
                                        : '—',
                                    }),
                                  ],
                                },
                                a.id,
                              ),
                            ),
                      }),
                    ],
                  }),
                }),
              }),
            ],
          });
        },
      ],
      81911,
    );
  },
];

//# sourceMappingURL=apps_dashboard_app_%28dashboard%29_api-keys_page_tsx_17lpbfm._.js.map
