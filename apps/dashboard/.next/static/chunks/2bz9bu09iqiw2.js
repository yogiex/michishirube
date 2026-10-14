(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  'object' == typeof document ? document.currentScript : void 0,
  18609,
  (e) => {
    'use strict';
    var t = e.i(24830),
      n = e.i(39380),
      r = e.i(84151),
      o = e.i(46799),
      a = e.i(60072),
      l = e.i(68281),
      s = e.i(36023),
      i = e.i(2863),
      d = e.i(54815),
      c = e.i(6773),
      u = e.i(40720),
      p = e.i(43836),
      f = e.i(66100),
      m = e.i(64145),
      h = e.i(32567),
      x = e.i(15671),
      g = e.i(96113),
      v = e.i(49032),
      y = e.i(21738),
      b = e.i(97611),
      j = e.i(78238),
      w = e.i(14408),
      C = e.i(44532),
      S = e.i(15588),
      R = e.i(73772),
      P = e.i(17739),
      N = Object.defineProperty,
      k = (e, t) => N(e, 'name', { value: t, configurable: !0 }),
      D = 'Dialog',
      [T, I] = (0, m.createContextScope)(D),
      [E, H] = T(D),
      O = k((e) => {
        let {
            __scopeDialog: r,
            children: o,
            open: a,
            defaultOpen: l,
            onOpenChange: s,
            modal: i = !0,
          } = e,
          d = n.useRef(null),
          c = n.useRef(null),
          [u, p] = (0, x.useControllableState)({
            prop: a,
            defaultProp: l ?? !1,
            onChange: s,
            caller: D,
          }),
          [f, m] = n.useState(0),
          [g, v] = n.useState(0);
        return (0, t.jsx)(E, {
          scope: r,
          triggerRef: d,
          contentRef: c,
          contentId: (0, h.useId)(),
          titleId: (0, h.useId)(),
          descriptionId: (0, h.useId)(),
          titlePresent: f > 0,
          descriptionPresent: g > 0,
          setTitleCount: m,
          setDescriptionCount: v,
          open: u,
          onOpenChange: p,
          onOpenToggle: n.useCallback(() => p((e) => !e), [p]),
          modal: i,
          children: o,
        });
      }, 'Dialog'),
      M = n.forwardRef(
        k(function (e, n) {
          let { __scopeDialog: r, ...o } = e,
            a = H('DialogTrigger', r),
            l = (0, f.useComposedRefs)(n, a.triggerRef);
          return (0, t.jsx)(j.Primitive.button, {
            type: 'button',
            'aria-haspopup': 'dialog',
            'aria-expanded': a.open,
            'aria-controls': a.open ? a.contentId : void 0,
            'data-state': $(a.open),
            ...o,
            ref: l,
            onClick: (0, p.composeEventHandlers)(e.onClick, a.onOpenToggle),
          });
        }, 'DialogTrigger'),
      ),
      L = 'DialogPortal',
      [F, A] = T(L, { forceMount: void 0 }),
      _ = k((e) => {
        let { __scopeDialog: r, forceMount: o, children: a, container: l } = e,
          s = H(L, r);
        return (0, t.jsx)(F, {
          scope: r,
          forceMount: o,
          children: n.Children.map(a, (e) =>
            (0, t.jsx)(b.Presence, {
              present: o || s.open,
              children: (0, t.jsx)(y.Portal, { asChild: !0, container: l, children: e }),
            }),
          ),
        });
      }, 'DialogPortal'),
      K = 'DialogOverlay',
      B = n.forwardRef(
        k(function (e, n) {
          let r = A(K, e.__scopeDialog),
            { forceMount: o = r.forceMount, ...a } = e,
            l = H(K, e.__scopeDialog);
          return l.modal
            ? (0, t.jsx)(b.Presence, {
                present: o || l.open,
                children: (0, t.jsx)(V, { ...a, ref: n }),
              })
            : null;
        }, 'DialogOverlay'),
      ),
      z = (0, P.createSlot)('DialogOverlay.RemoveScroll'),
      V = n.forwardRef(
        k(function (e, n) {
          let { __scopeDialog: r, ...o } = e,
            a = H(K, r),
            l = (0, g.useDismissableLayerSurface)(),
            s = (0, f.useComposedRefs)(n, l);
          return (0, t.jsx)(S.RemoveScroll, {
            as: z,
            allowPinchZoom: !0,
            shards: [a.contentRef],
            children: (0, t.jsx)(j.Primitive.div, {
              'data-state': $(a.open),
              ...o,
              ref: s,
              style: { pointerEvents: 'auto', ...o.style },
            }),
          });
        }, 'DialogOverlayImpl'),
      ),
      U = 'DialogContent',
      W = n.forwardRef(
        k(function (e, n) {
          let r = A(U, e.__scopeDialog),
            { forceMount: o = r.forceMount, ...a } = e,
            l = H(U, e.__scopeDialog);
          return (0, t.jsx)(b.Presence, {
            present: o || l.open,
            children: l.modal ? (0, t.jsx)(q, { ...a, ref: n }) : (0, t.jsx)(G, { ...a, ref: n }),
          });
        }, 'DialogContent'),
      ),
      q = n.forwardRef(
        k(function (e, r) {
          let o = H(U, e.__scopeDialog),
            a = n.useRef(null),
            l = (0, f.useComposedRefs)(r, o.contentRef, a);
          return (
            n.useEffect(() => {
              let e = a.current;
              if (e) return (0, R.hideOthers)(e);
            }, []),
            (0, t.jsx)(X, {
              ...e,
              ref: l,
              trapFocus: o.open,
              disableOutsidePointerEvents: o.open,
              onCloseAutoFocus: (0, p.composeEventHandlers)(e.onCloseAutoFocus, (e) => {
                (e.preventDefault(), o.triggerRef.current?.focus());
              }),
              onPointerDownOutside: (0, p.composeEventHandlers)(e.onPointerDownOutside, (e) => {
                let t = e.detail.originalEvent,
                  n = 0 === t.button && !0 === t.ctrlKey;
                (2 === t.button || n) && e.preventDefault();
              }),
              onFocusOutside: (0, p.composeEventHandlers)(e.onFocusOutside, (e) =>
                e.preventDefault(),
              ),
            })
          );
        }, 'DialogContentModal'),
      ),
      G = n.forwardRef(
        k(function (e, r) {
          let o = H(U, e.__scopeDialog),
            a = n.useRef(!1),
            l = n.useRef(!1);
          return (0, t.jsx)(X, {
            ...e,
            ref: r,
            trapFocus: !1,
            disableOutsidePointerEvents: !1,
            onCloseAutoFocus: (t) => {
              (e.onCloseAutoFocus?.(t),
                t.defaultPrevented ||
                  (a.current || o.triggerRef.current?.focus(), t.preventDefault()),
                (a.current = !1),
                (l.current = !1));
            },
            onInteractOutside: (t) => {
              (e.onInteractOutside?.(t),
                t.defaultPrevented ||
                  ((a.current = !0),
                  'pointerdown' === t.detail.originalEvent.type && (l.current = !0)));
              let n = t.target;
              (o.triggerRef.current?.contains(n) && t.preventDefault(),
                'focusin' === t.detail.originalEvent.type && l.current && t.preventDefault());
            },
          });
        }, 'DialogContentNonModal'),
      ),
      X = n.forwardRef(
        k(function (e, n) {
          let { __scopeDialog: r, trapFocus: o, onOpenAutoFocus: a, onCloseAutoFocus: l, ...s } = e,
            i = H(U, r);
          return (
            (0, w.useFocusGuards)(),
            (0, t.jsx)(t.Fragment, {
              children: (0, t.jsx)(v.FocusScope, {
                asChild: !0,
                loop: !0,
                trapped: o,
                onMountAutoFocus: a,
                onUnmountAutoFocus: l,
                children: (0, t.jsx)(g.DismissableLayer, {
                  role: 'dialog',
                  id: i.contentId,
                  'aria-describedby': i.descriptionPresent ? i.descriptionId : void 0,
                  'aria-labelledby': i.titlePresent ? i.titleId : void 0,
                  'data-state': $(i.open),
                  ...s,
                  ref: n,
                  deferPointerDownOutside: !0,
                  onDismiss: () => i.onOpenChange(!1),
                }),
              }),
            })
          );
        }, 'DialogContentImpl'),
      ),
      Y = n.forwardRef(
        k(function (e, n) {
          let { __scopeDialog: r, ...o } = e,
            a = H('DialogTitle', r),
            { setTitleCount: l } = a;
          return (
            (0, C.useLayoutEffect)(() => (l((e) => e + 1), () => l((e) => e - 1)), [l]),
            (0, t.jsx)(j.Primitive.h2, { id: a.titleId, ...o, ref: n })
          );
        }, 'DialogTitle'),
      ),
      Z = n.forwardRef(
        k(function (e, n) {
          let { __scopeDialog: r, ...o } = e,
            a = H('DialogDescription', r),
            { setDescriptionCount: l } = a;
          return (
            (0, C.useLayoutEffect)(() => (l((e) => e + 1), () => l((e) => e - 1)), [l]),
            (0, t.jsx)(j.Primitive.p, { id: a.descriptionId, ...o, ref: n })
          );
        }, 'DialogDescription'),
      ),
      Q = n.forwardRef(
        k(function (e, n) {
          let { __scopeDialog: r, ...o } = e,
            a = H('DialogClose', r);
          return (0, t.jsx)(j.Primitive.button, {
            type: 'button',
            ...o,
            ref: n,
            onClick: (0, p.composeEventHandlers)(e.onClick, () => a.onOpenChange(!1)),
          });
        }, 'DialogClose'),
      );
    function $(e) {
      return e ? 'open' : 'closed';
    }
    k($, 'getState');
    var J = e.i(44040),
      ee = e.i(59992);
    let et = n.forwardRef(({ className: e, ...n }, r) =>
      (0, t.jsx)(B, {
        ref: r,
        className: (0, ee.cn)(
          'fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          e,
        ),
        ...n,
      }),
    );
    et.displayName = B.displayName;
    let en = n.forwardRef(({ className: e, children: n, ...r }, o) =>
      (0, t.jsxs)(_, {
        children: [
          (0, t.jsx)(et, {}),
          (0, t.jsxs)(W, {
            ref: o,
            className: (0, ee.cn)(
              'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
              e,
            ),
            ...r,
            children: [
              n,
              (0, t.jsxs)(Q, {
                className:
                  'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground',
                children: [
                  (0, t.jsx)(J.X, { className: 'h-4 w-4' }),
                  (0, t.jsx)('span', { className: 'sr-only', children: 'Close' }),
                ],
              }),
            ],
          }),
        ],
      }),
    );
    en.displayName = W.displayName;
    let er = ({ className: e, ...n }) =>
      (0, t.jsx)('div', {
        className: (0, ee.cn)('flex flex-col space-y-1.5 text-center sm:text-left', e),
        ...n,
      });
    er.displayName = 'DialogHeader';
    let eo = ({ className: e, ...n }) =>
      (0, t.jsx)('div', {
        className: (0, ee.cn)('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', e),
        ...n,
      });
    eo.displayName = 'DialogFooter';
    let ea = n.forwardRef(({ className: e, ...n }, r) =>
      (0, t.jsx)(Y, {
        ref: r,
        className: (0, ee.cn)('text-lg font-semibold leading-none tracking-tight', e),
        ...n,
      }),
    );
    ea.displayName = Y.displayName;
    let el = n.forwardRef(({ className: e, ...n }, r) =>
      (0, t.jsx)(Z, { ref: r, className: (0, ee.cn)('text-sm text-muted-foreground', e), ...n }),
    );
    el.displayName = Z.displayName;
    var es = e.i(50123),
      ei = e.i(60429);
    function ed(e, [t, n]) {
      return Math.min(n, Math.max(t, e));
    }
    (0, Object.defineProperty)(ed, 'name', { value: 'clamp', configurable: !0 });
    var ec = e.i(69539),
      eu = e.i(877),
      ep = e.i(12534),
      ef = e.i(32253);
    function em(e) {
      let t = n.useRef({ value: e, previous: e });
      return n.useMemo(
        () => (
          t.current.value !== e && ((t.current.previous = t.current.value), (t.current.value = e)),
          t.current.previous
        ),
        [e],
      );
    }
    (0, Object.defineProperty)(em, 'name', { value: 'usePrevious', configurable: !0 });
    var eh = Object.freeze({
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
      ex = Object.defineProperty,
      eg = (e, t) => ex(e, 'name', { value: t, configurable: !0 }),
      ev = [' ', 'Enter', 'ArrowUp', 'ArrowDown'],
      ey = [' ', 'Enter'],
      eb = 'Select',
      [ej, ew, eC] = (0, ec.createCollection)(eb),
      [eS, eR] = (0, m.createContextScope)(eb, [eC, ep.createPopperScope]),
      eP = (0, ep.createPopperScope)(),
      [eN, ek] = eS(eb),
      [eD, eT] = eS(eb);
    function eI(e) {
      let {
          __scopeSelect: r,
          children: o,
          open: a,
          defaultOpen: l,
          onOpenChange: s,
          value: i,
          defaultValue: d,
          onValueChange: c,
          dir: u,
          name: p,
          autoComplete: f,
          disabled: m,
          required: g,
          form: v,
          internal_do_not_use_render: y,
        } = e,
        b = eP(r),
        [j, w] = n.useState(null),
        [C, S] = n.useState(null),
        [R, P] = n.useState(!1),
        N = (0, eu.useDirection)(u),
        [k, D] = (0, x.useControllableState)({
          prop: a,
          defaultProp: l ?? !1,
          onChange: s,
          caller: eb,
        }),
        [T, I] = (0, x.useControllableState)({ prop: i, defaultProp: d, onChange: c, caller: eb }),
        E = n.useRef(null),
        H = n.useRef(T);
      n.useEffect(() => {
        let e = v ? j?.ownerDocument.getElementById(v) : j?.form;
        if (e instanceof HTMLFormElement) {
          let t = eg(() => I(H.current), 'reset');
          return (e.addEventListener('reset', t), () => e.removeEventListener('reset', t));
        }
      }, [v, j, I]);
      let O = !j || !!v || !!j.closest('form'),
        [M, L] = n.useState(new Set()),
        F = (0, h.useId)(),
        A = Array.from(M)
          .map((e) => e.props.value)
          .join(';'),
        _ = n.useCallback((e) => {
          L((t) => new Set(t).add(e));
        }, []),
        K = n.useCallback((e) => {
          L((t) => {
            let n = new Set(t);
            return (n.delete(e), n);
          });
        }, []),
        B = {
          required: g,
          trigger: j,
          onTriggerChange: w,
          valueNode: C,
          onValueNodeChange: S,
          valueNodeHasChildren: R,
          onValueNodeHasChildrenChange: P,
          contentId: F,
          value: T,
          onValueChange: I,
          open: k,
          onOpenChange: D,
          dir: N,
          triggerPointerDownPosRef: E,
          disabled: m,
          name: p,
          autoComplete: f,
          form: v,
          nativeOptions: M,
          nativeSelectKey: A,
          isFormControl: O,
        };
      return (0, t.jsx)(ep.Root, {
        ...b,
        children: (0, t.jsx)(eN, {
          scope: r,
          ...B,
          children: (0, t.jsx)(ej.Provider, {
            scope: r,
            children: (0, t.jsx)(eD, {
              scope: r,
              onNativeOptionAdd: _,
              onNativeOptionRemove: K,
              children: e9(y) ? y(B) : o,
            }),
          }),
        }),
      });
    }
    eg(eI, 'SelectProvider');
    var eE = eg((e) => {
        let { __scopeSelect: n, children: r, ...o } = e;
        return (0, t.jsx)(eI, {
          __scopeSelect: n,
          ...o,
          internal_do_not_use_render: ({ isFormControl: e }) =>
            (0, t.jsxs)(t.Fragment, {
              children: [r, e ? (0, t.jsx)(e8, { __scopeSelect: n }) : null],
            }),
        });
      }, 'Select'),
      eH = n.forwardRef(
        eg(function (e, r) {
          let { __scopeSelect: o, disabled: a = !1, ...l } = e,
            s = eP(o),
            i = ek('SelectTrigger', o),
            d = i.disabled || a,
            c = (0, f.useComposedRefs)(r, i.onTriggerChange),
            u = ew(o),
            m = n.useRef('touch'),
            [h, x, g] = te((e) => {
              let t = u().filter((e) => !e.disabled),
                n = t.find((e) => e.value === i.value),
                r = tt(t, e, n);
              void 0 !== r && i.onValueChange(r.value);
            }),
            v = eg((e) => {
              (d || (i.onOpenChange(!0), g()),
                e &&
                  (i.triggerPointerDownPosRef.current = {
                    x: Math.round(e.pageX),
                    y: Math.round(e.pageY),
                  }));
            }, 'handleOpen');
          return (0, t.jsx)(ep.Anchor, {
            asChild: !0,
            ...s,
            children: (0, t.jsx)(j.Primitive.button, {
              type: 'button',
              role: 'combobox',
              'aria-controls': i.open ? i.contentId : void 0,
              'aria-expanded': i.open,
              'aria-required': i.required,
              'aria-autocomplete': 'none',
              dir: i.dir,
              'data-state': i.open ? 'open' : 'closed',
              disabled: d,
              'data-disabled': d ? '' : void 0,
              'data-placeholder': e7(i.value) ? '' : void 0,
              ...l,
              ref: c,
              onClick: (0, p.composeEventHandlers)(l.onClick, (e) => {
                (e.currentTarget.focus(), 'mouse' !== m.current && v(e));
              }),
              onPointerDown: (0, p.composeEventHandlers)(l.onPointerDown, (e) => {
                m.current = e.pointerType;
                let t = e.target;
                (t.hasPointerCapture(e.pointerId) && t.releasePointerCapture(e.pointerId),
                  0 === e.button &&
                    !1 === e.ctrlKey &&
                    'mouse' === e.pointerType &&
                    (v(e), e.preventDefault()));
              }),
              onKeyDown: (0, p.composeEventHandlers)(l.onKeyDown, (e) => {
                let t = '' !== h.current;
                (e.ctrlKey || e.altKey || e.metaKey || 1 !== e.key.length || x(e.key),
                  (!t || ' ' !== e.key) && ev.includes(e.key) && (v(), e.preventDefault()));
              }),
            }),
          });
        }, 'SelectTrigger'),
      ),
      eO = n.forwardRef(
        eg(function (e, r) {
          let {
              __scopeSelect: o,
              className: a,
              style: l,
              children: s,
              placeholder: i = '',
              ...d
            } = e,
            c = ek('SelectValue', o),
            { onValueNodeHasChildrenChange: u } = c,
            p = void 0 !== s,
            m = (0, f.useComposedRefs)(r, c.onValueNodeChange);
          (0, C.useLayoutEffect)(() => {
            u(p);
          }, [u, p]);
          let h = e7(c.value);
          return (0, t.jsx)(j.Primitive.span, {
            ...d,
            asChild: !h && d.asChild,
            ref: m,
            style: { pointerEvents: 'none' },
            children: (0, t.jsx)(n.Fragment, { children: h ? i : s }, h ? 'placeholder' : 'value'),
          });
        }, 'SelectValue'),
      ),
      eM = n.forwardRef(
        eg(function (e, n) {
          let { __scopeSelect: r, children: o, ...a } = e;
          return (0, t.jsx)(j.Primitive.span, {
            'aria-hidden': !0,
            ...a,
            ref: n,
            children: o || '▼',
          });
        }, 'SelectIcon'),
      ),
      [eL, eF] = eS('SelectPortal', { forceMount: void 0 }),
      eA = eg((e) => {
        let { __scopeSelect: n, forceMount: r, ...o } = e;
        return (0, t.jsx)(eL, {
          scope: e.__scopeSelect,
          forceMount: r,
          children: (0, t.jsx)(y.Portal, { asChild: !0, ...o }),
        });
      }, 'SelectPortal'),
      e_ = 'SelectContent',
      eK = n.forwardRef(
        eg(function (e, r) {
          let o = eF(e_, e.__scopeSelect),
            { forceMount: a = o.forceMount, ...l } = e,
            s = ek(e_, e.__scopeSelect),
            [i, d] = n.useState();
          return (
            (0, C.useLayoutEffect)(() => {
              d(new DocumentFragment());
            }, []),
            (0, t.jsx)(b.Presence, {
              present: a || s.open,
              children: ({ present: e }) =>
                e ? (0, t.jsx)(eW, { ...l, ref: r }) : (0, t.jsx)(eB, { ...l, fragment: i }),
            })
          );
        }, 'SelectContent'),
      ),
      eB = n.forwardRef(
        eg(function (e, n) {
          let { __scopeSelect: r, children: o, fragment: a } = e;
          return a
            ? ei.createPortal(
                (0, t.jsx)(ez, {
                  scope: r,
                  children: (0, t.jsx)(ej.Slot, {
                    scope: r,
                    children: (0, t.jsx)('div', { ref: n, children: o }),
                  }),
                }),
                a,
              )
            : null;
        }, 'SelectContentFragment'),
      ),
      [ez, eV] = eS(e_),
      eU = (0, P.createSlot)('SelectContent.RemoveScroll'),
      eW = n.forwardRef(
        eg(function (e, r) {
          let { __scopeSelect: o } = e,
            {
              position: a = 'item-aligned',
              onCloseAutoFocus: l,
              onEscapeKeyDown: s,
              onPointerDownOutside: i,
              side: d,
              sideOffset: c,
              align: u,
              alignOffset: m,
              arrowPadding: h,
              collisionBoundary: x,
              collisionPadding: y,
              sticky: b,
              hideWhenDetached: j,
              avoidCollisions: C,
              ...P
            } = e,
            N = ek(e_, o),
            [k, D] = n.useState(null),
            [T, I] = n.useState(null),
            E = (0, f.useComposedRefs)(r, D),
            [H, O] = n.useState(null),
            [M, L] = n.useState(null),
            F = ew(o),
            [A, _] = n.useState(!1),
            K = n.useRef(!1);
          (n.useEffect(() => {
            if (k) return (0, R.hideOthers)(k);
          }, [k]),
            (0, w.useFocusGuards)());
          let B = n.useCallback(
              (e) => {
                let [t, ...n] = F().map((e) => e.ref.current),
                  [r] = n.slice(-1),
                  o = document.activeElement;
                for (let n of e)
                  if (
                    n === o ||
                    (n?.scrollIntoView({ block: 'nearest' }),
                    n === t && T && (T.scrollTop = 0),
                    n === r && T && (T.scrollTop = T.scrollHeight),
                    n?.focus(),
                    document.activeElement !== o)
                  )
                    return;
              },
              [F, T],
            ),
            z = n.useCallback(() => B([H, k]), [B, H, k]);
          n.useEffect(() => {
            A && z();
          }, [A, z]);
          let { onOpenChange: V, triggerPointerDownPosRef: U } = N;
          (n.useEffect(() => {
            if (k) {
              let e = { x: 0, y: 0 },
                t = eg((t) => {
                  e = {
                    x: Math.abs(Math.round(t.pageX) - (U.current?.x ?? 0)),
                    y: Math.abs(Math.round(t.pageY) - (U.current?.y ?? 0)),
                  };
                }, 'handlePointerMove'),
                n = eg((n) => {
                  (e.x <= 10 && e.y <= 10
                    ? n.preventDefault()
                    : n.composedPath().includes(k) || V(!1),
                    document.removeEventListener('pointermove', t),
                    (U.current = null));
                }, 'handlePointerUp');
              return (
                null !== U.current &&
                  (document.addEventListener('pointermove', t),
                  document.addEventListener('pointerup', n, { capture: !0, once: !0 })),
                () => {
                  (document.removeEventListener('pointermove', t),
                    document.removeEventListener('pointerup', n, { capture: !0 }));
                }
              );
            }
          }, [k, V, U]),
            n.useEffect(() => {
              let e = eg(() => V(!1), 'close');
              return (
                window.addEventListener('blur', e),
                window.addEventListener('resize', e),
                () => {
                  (window.removeEventListener('blur', e), window.removeEventListener('resize', e));
                }
              );
            }, [V]));
          let [W, q] = te((e) => {
              let t = F().filter((e) => !e.disabled),
                n = t.find((e) => e.ref.current === document.activeElement),
                r = tt(t, e, n);
              r && setTimeout(() => r.ref.current?.focus());
            }),
            G = n.useCallback(
              (e, t, n) => {
                let r = !K.current && !n;
                ((void 0 !== N.value && N.value === t) || r) && (O(e), r && (K.current = !0));
              },
              [N.value],
            ),
            X = n.useCallback(() => k?.focus(), [k]),
            Y = n.useCallback(
              (e, t, n) => {
                let r = !K.current && !n;
                ((void 0 !== N.value && N.value === t) || r) && L(e);
              },
              [N.value],
            ),
            Z = 'popper' === a ? eG : eq;
          return (0, t.jsx)(ez, {
            scope: o,
            content: k,
            viewport: T,
            onViewportChange: I,
            itemRefCallback: G,
            selectedItem: H,
            onItemLeave: X,
            itemTextRefCallback: Y,
            focusSelectedItem: z,
            selectedItemText: M,
            position: a,
            isPositioned: A,
            searchRef: W,
            children: (0, t.jsx)(S.RemoveScroll, {
              as: eU,
              allowPinchZoom: !0,
              children: (0, t.jsx)(v.FocusScope, {
                asChild: !0,
                trapped: N.open,
                onMountAutoFocus: (e) => {
                  e.preventDefault();
                },
                onUnmountAutoFocus: (0, p.composeEventHandlers)(l, (e) => {
                  (N.trigger?.focus({ preventScroll: !0 }), e.preventDefault());
                }),
                children: (0, t.jsx)(g.DismissableLayer, {
                  asChild: !0,
                  disableOutsidePointerEvents: !0,
                  onEscapeKeyDown: s,
                  onPointerDownOutside: i,
                  onFocusOutside: (e) => e.preventDefault(),
                  onDismiss: () => N.onOpenChange(!1),
                  children: (0, t.jsx)(Z, {
                    role: 'listbox',
                    id: N.contentId,
                    'data-state': N.open ? 'open' : 'closed',
                    dir: N.dir,
                    onContextMenu: (e) => e.preventDefault(),
                    ...P,
                    ...(Z === eG
                      ? {
                          side: d,
                          sideOffset: c,
                          align: u,
                          alignOffset: m,
                          arrowPadding: h,
                          collisionBoundary: x,
                          collisionPadding: y,
                          sticky: b,
                          hideWhenDetached: j,
                          avoidCollisions: C,
                        }
                      : {}),
                    onPlaced: () => _(!0),
                    ref: E,
                    style: {
                      display: 'flex',
                      flexDirection: 'column',
                      outline: 'none',
                      ...P.style,
                    },
                    onKeyDown: (0, p.composeEventHandlers)(P.onKeyDown, (e) => {
                      let t = e.ctrlKey || e.altKey || e.metaKey;
                      if (
                        ('Tab' === e.key && e.preventDefault(),
                        t || 1 !== e.key.length || q(e.key),
                        ['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(e.key))
                      ) {
                        let t = F()
                          .filter((e) => !e.disabled)
                          .map((e) => e.ref.current);
                        if (
                          (['ArrowUp', 'End'].includes(e.key) && (t = t.slice().reverse()),
                          ['ArrowUp', 'ArrowDown'].includes(e.key))
                        ) {
                          let n = e.target,
                            r = t.indexOf(n);
                          t = t.slice(r + 1);
                        }
                        (setTimeout(() => B(t)), e.preventDefault());
                      }
                    }),
                  }),
                }),
              }),
            }),
          });
        }, 'SelectContentImpl'),
      ),
      eq = n.forwardRef(
        eg(function (e, r) {
          let { __scopeSelect: o, onPlaced: a, ...l } = e,
            s = ek(e_, o),
            i = eV(e_, o),
            [d, c] = n.useState(null),
            [u, p] = n.useState(null),
            m = (0, f.useComposedRefs)(r, p),
            h = ew(o),
            x = n.useRef(!1),
            g = n.useRef(!0),
            { viewport: v, selectedItem: y, selectedItemText: b, focusSelectedItem: w } = i,
            S = n.useCallback(() => {
              if (s.trigger && s.valueNode && d && u && v && y && b) {
                let e = s.trigger.getBoundingClientRect(),
                  t = u.getBoundingClientRect(),
                  n = s.valueNode.getBoundingClientRect(),
                  r = b.getBoundingClientRect();
                if ('rtl' !== s.dir) {
                  let o = r.left - t.left,
                    a = n.left - o,
                    l = e.left - a,
                    s = e.width + l,
                    i = Math.max(s, t.width),
                    c = ed(a, [10, Math.max(10, window.innerWidth - 10 - i)]);
                  ((d.style.minWidth = s + 'px'), (d.style.left = c + 'px'));
                } else {
                  let o = t.right - r.right,
                    a = window.innerWidth - n.right - o,
                    l = window.innerWidth - e.right - a,
                    s = e.width + l,
                    i = Math.max(s, t.width),
                    c = ed(a, [10, Math.max(10, window.innerWidth - 10 - i)]);
                  ((d.style.minWidth = s + 'px'), (d.style.right = c + 'px'));
                }
                let o = h(),
                  l = window.innerHeight - 20,
                  i = v.scrollHeight,
                  c = window.getComputedStyle(u),
                  p = parseInt(c.borderTopWidth, 10),
                  f = parseInt(c.paddingTop, 10),
                  m = parseInt(c.borderBottomWidth, 10),
                  g = p + f + i + parseInt(c.paddingBottom, 10) + m,
                  j = Math.min(5 * y.offsetHeight, g),
                  w = window.getComputedStyle(v),
                  C = parseInt(w.paddingTop, 10),
                  S = parseInt(w.paddingBottom, 10),
                  R = e.top + e.height / 2 - 10,
                  P = y.offsetHeight / 2,
                  N = p + f + (y.offsetTop + P);
                if (N <= R) {
                  let e = o.length > 0 && y === o[o.length - 1].ref.current;
                  d.style.bottom = '0px';
                  let t = Math.max(
                    l - R,
                    P + (e ? S : 0) + (u.clientHeight - v.offsetTop - v.offsetHeight) + m,
                  );
                  d.style.height = N + t + 'px';
                } else {
                  let e = o.length > 0 && y === o[0].ref.current;
                  d.style.top = '0px';
                  let t = Math.max(R, p + v.offsetTop + (e ? C : 0) + P);
                  ((d.style.height = t + (g - N) + 'px'), (v.scrollTop = N - R + v.offsetTop));
                }
                ((d.style.margin = '10px 0'),
                  (d.style.minHeight = j + 'px'),
                  (d.style.maxHeight = l + 'px'),
                  a?.(),
                  requestAnimationFrame(() => (x.current = !0)));
              }
            }, [h, s.trigger, s.valueNode, d, u, v, y, b, s.dir, a]);
          (0, C.useLayoutEffect)(() => S(), [S]);
          let [R, P] = n.useState();
          (0, C.useLayoutEffect)(() => {
            u && P(window.getComputedStyle(u).zIndex);
          }, [u]);
          let N = n.useCallback(
            (e) => {
              e && !0 === g.current && (S(), w?.(), (g.current = !1));
            },
            [S, w],
          );
          return (0, t.jsx)(eX, {
            scope: o,
            contentWrapper: d,
            shouldExpandOnScrollRef: x,
            onScrollButtonChange: N,
            children: (0, t.jsx)('div', {
              ref: c,
              style: { display: 'flex', flexDirection: 'column', position: 'fixed', zIndex: R },
              children: (0, t.jsx)(j.Primitive.div, {
                ...l,
                ref: m,
                style: { boxSizing: 'border-box', maxHeight: '100%', ...l.style },
              }),
            }),
          });
        }, 'SelectItemAlignedPosition'),
      ),
      eG = n.forwardRef(
        eg(function (e, n) {
          let { __scopeSelect: r, align: o = 'start', collisionPadding: a = 10, ...l } = e,
            s = eP(r);
          return (0, t.jsx)(ep.Content, {
            ...s,
            ...l,
            ref: n,
            align: o,
            collisionPadding: a,
            style: {
              boxSizing: 'border-box',
              ...l.style,
              '--radix-select-content-transform-origin': 'var(--radix-popper-transform-origin)',
              '--radix-select-content-available-width': 'var(--radix-popper-available-width)',
              '--radix-select-content-available-height': 'var(--radix-popper-available-height)',
              '--radix-select-trigger-width': 'var(--radix-popper-anchor-width)',
              '--radix-select-trigger-height': 'var(--radix-popper-anchor-height)',
            },
          });
        }, 'SelectPopperPosition'),
      ),
      [eX, eY] = eS(e_, {}),
      eZ = 'SelectViewport',
      eQ = n.forwardRef(
        eg(function (e, r) {
          let { __scopeSelect: o, nonce: a, ...l } = e,
            s = eV(eZ, o),
            i = eY(eZ, o),
            d = (0, f.useComposedRefs)(r, s.onViewportChange),
            c = n.useRef(0);
          return (0, t.jsxs)(t.Fragment, {
            children: [
              (0, t.jsx)('style', {
                dangerouslySetInnerHTML: {
                  __html:
                    '[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}',
                },
                nonce: a,
              }),
              (0, t.jsx)(ej.Slot, {
                scope: o,
                children: (0, t.jsx)(j.Primitive.div, {
                  'data-radix-select-viewport': '',
                  role: 'presentation',
                  ...l,
                  ref: d,
                  style: { position: 'relative', flex: 1, overflow: 'hidden auto', ...l.style },
                  onScroll: (0, p.composeEventHandlers)(l.onScroll, (e) => {
                    let t = e.currentTarget,
                      { contentWrapper: n, shouldExpandOnScrollRef: r } = i;
                    if (r?.current && n) {
                      let e = Math.abs(c.current - t.scrollTop);
                      if (e > 0) {
                        let r = window.innerHeight - 20,
                          o = Math.max(parseFloat(n.style.minHeight), parseFloat(n.style.height));
                        if (o < r) {
                          let a = o + e,
                            l = Math.min(r, a),
                            s = a - l;
                          ((n.style.height = l + 'px'),
                            '0px' === n.style.bottom &&
                              ((t.scrollTop = s > 0 ? s : 0),
                              (n.style.justifyContent = 'flex-end')));
                        }
                      }
                    }
                    c.current = t.scrollTop;
                  }),
                }),
              }),
            ],
          });
        }, 'SelectViewport'),
      ),
      [e$, eJ] = eS('SelectGroup'),
      e0 = 'SelectItem',
      [e1, e2] = eS(e0),
      e4 = n.forwardRef(
        eg(function (e, r) {
          let { __scopeSelect: o, value: a, disabled: l = !1, textValue: s, ...i } = e,
            d = ek(e0, o),
            c = eV(e0, o),
            u = d.value === a,
            [m, x] = n.useState(s ?? ''),
            [g, v] = n.useState(!1),
            y = (0, ef.useCallbackRef)((e) => c.itemRefCallback?.(e, a, l)),
            b = (0, f.useComposedRefs)(r, y),
            w = (0, h.useId)(),
            C = n.useRef('touch'),
            S = eg(() => {
              l || (d.onValueChange(a), d.onOpenChange(!1));
            }, 'handleSelect');
          return (0, t.jsx)(e1, {
            scope: o,
            value: a,
            disabled: l,
            textId: w,
            isSelected: u,
            onItemTextChange: n.useCallback((e) => {
              x((t) => t || (e?.textContent ?? '').trim());
            }, []),
            children: (0, t.jsx)(ej.ItemSlot, {
              scope: o,
              value: a,
              disabled: l,
              textValue: m,
              children: (0, t.jsx)(j.Primitive.div, {
                role: 'option',
                'aria-labelledby': w,
                'data-highlighted': g ? '' : void 0,
                'aria-selected': u && g,
                'data-state': u ? 'checked' : 'unchecked',
                'aria-disabled': l || void 0,
                'data-disabled': l ? '' : void 0,
                tabIndex: l ? void 0 : -1,
                ...i,
                ref: b,
                onFocus: (0, p.composeEventHandlers)(i.onFocus, () => v(!0)),
                onBlur: (0, p.composeEventHandlers)(i.onBlur, () => v(!1)),
                onClick: (0, p.composeEventHandlers)(i.onClick, () => {
                  'mouse' !== C.current && S();
                }),
                onPointerUp: (0, p.composeEventHandlers)(i.onPointerUp, () => {
                  'mouse' === C.current && S();
                }),
                onPointerDown: (0, p.composeEventHandlers)(i.onPointerDown, (e) => {
                  C.current = e.pointerType;
                }),
                onPointerMove: (0, p.composeEventHandlers)(i.onPointerMove, (e) => {
                  ((C.current = e.pointerType),
                    l
                      ? c.onItemLeave?.()
                      : 'mouse' === C.current && e.currentTarget.focus({ preventScroll: !0 }));
                }),
                onPointerLeave: (0, p.composeEventHandlers)(i.onPointerLeave, (e) => {
                  e.currentTarget === document.activeElement && c.onItemLeave?.();
                }),
                onKeyDown: (0, p.composeEventHandlers)(i.onKeyDown, (e) => {
                  l ||
                    e.target !== e.currentTarget ||
                    ((c.searchRef?.current === '' || ' ' !== e.key) &&
                      (ey.includes(e.key) && S(), ' ' === e.key && e.preventDefault()));
                }),
              }),
            }),
          });
        }, 'SelectItem'),
      ),
      e5 = 'SelectItemText',
      e3 = n.forwardRef(
        eg(function (e, r) {
          let { __scopeSelect: o, className: a, style: l, ...s } = e,
            i = ek(e5, o),
            d = eV(e5, o),
            c = e2(e5, o),
            u = eT(e5, o),
            [p, m] = n.useState(null),
            h = (0, ef.useCallbackRef)((e) => d.itemTextRefCallback?.(e, c.value, c.disabled)),
            x = (0, f.useComposedRefs)(r, m, c.onItemTextChange, h),
            g = p?.textContent,
            v = n.useMemo(
              () =>
                (0, t.jsx)(
                  'option',
                  { value: c.value, disabled: c.disabled, children: g },
                  c.value,
                ),
              [c.disabled, c.value, g],
            ),
            { onNativeOptionAdd: y, onNativeOptionRemove: b } = u;
          return (
            (0, C.useLayoutEffect)(() => (y(v), () => b(v)), [y, b, v]),
            (0, t.jsxs)(t.Fragment, {
              children: [
                (0, t.jsx)(j.Primitive.span, { id: c.textId, ...s, ref: x }),
                c.isSelected && i.valueNode && !i.valueNodeHasChildren && !e7(i.value)
                  ? ei.createPortal(s.children, i.valueNode)
                  : null,
              ],
            })
          );
        }, 'SelectItemText'),
      ),
      e6 = n.forwardRef(
        eg(function (e, n) {
          let { __scopeSelect: r, ...o } = e;
          return e2('SelectItemIndicator', r).isSelected
            ? (0, t.jsx)(j.Primitive.span, { 'aria-hidden': !0, ...o, ref: n })
            : null;
        }, 'SelectItemIndicator'),
      ),
      e8 = n.forwardRef(
        eg(function ({ __scopeSelect: e, ...r }, o) {
          let a = ek('SelectBubbleInput', e),
            {
              value: l,
              onValueChange: s,
              required: i,
              disabled: d,
              name: c,
              autoComplete: u,
              form: p,
            } = a,
            { nativeOptions: m, nativeSelectKey: h } = a,
            x = n.useRef(null),
            g = (0, f.useComposedRefs)(o, x),
            v = l ?? '',
            y = em(v),
            b = Array.from(m).some((e) => (e.props.value ?? '') === '');
          return (
            n.useEffect(() => {
              let e = x.current;
              if (!e) return;
              let t = Object.getOwnPropertyDescriptor(
                window.HTMLSelectElement.prototype,
                'value',
              ).set;
              if (y !== v && t) {
                let n = new Event('change', { bubbles: !0 });
                (t.call(e, v), e.dispatchEvent(n));
              }
            }, [y, v]),
            (0, t.jsxs)(
              j.Primitive.select,
              {
                'aria-hidden': !0,
                required: i,
                tabIndex: -1,
                name: c,
                autoComplete: u,
                disabled: d,
                form: p,
                onChange: (e) => s(e.target.value),
                ...r,
                style: { ...eh, ...r.style },
                ref: g,
                defaultValue: v,
                children: [e7(l) && !b ? (0, t.jsx)('option', { value: '' }) : null, Array.from(m)],
              },
              h,
            )
          );
        }, 'SelectBubbleInput'),
      );
    function e9(e) {
      return 'function' == typeof e;
    }
    function e7(e) {
      return '' === e || void 0 === e;
    }
    function te(e) {
      let t = (0, ef.useCallbackRef)(e),
        r = n.useRef(''),
        o = n.useRef(0),
        a = n.useCallback(
          (e) => {
            t(r.current + e);
          },
          [t],
        ),
        l = n.useCallback(() => {
          ((r.current = ''), window.clearTimeout(o.current));
        }, []);
      return (n.useEffect(() => () => window.clearTimeout(o.current), []), [r, a, l]);
    }
    function tt(e, t, n) {
      let r = t.length > 1 && Array.from(t).every((e) => e === t[0]) ? t[0] : t,
        o = n ? e.indexOf(n) : -1,
        a = tn(e, Math.max(o, 0));
      1 === r.length && (a = a.filter((e) => e !== n));
      let l = a.find((e) => e.textValue.toLowerCase().startsWith(r.toLowerCase()));
      return l !== n ? l : void 0;
    }
    function tn(e, t) {
      return e.map((n, r) => e[(t + r) % e.length]);
    }
    (eg(e9, 'isFunction'),
      eg(e7, 'shouldShowPlaceholder'),
      eg(te, 'useTypeaheadSearch'),
      eg(tt, 'findNextItem'),
      eg(tn, 'wrapArray'));
    var tr = e.i(86304);
    let to = (0, e.i(32155).default)('ChevronDown', [
        ['path', { d: 'm6 9 6 6 6-6', key: 'qrunsl' }],
      ]),
      ta = n.forwardRef(({ className: e, children: n, ...r }, o) =>
        (0, t.jsxs)(eH, {
          ref: o,
          className: (0, ee.cn)(
            'flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
            e,
          ),
          ...r,
          children: [
            n,
            (0, t.jsx)(eM, {
              asChild: !0,
              children: (0, t.jsx)(to, { className: 'h-4 w-4 opacity-50' }),
            }),
          ],
        }),
      );
    ta.displayName = eH.displayName;
    let tl = n.forwardRef(({ className: e, children: n, position: r = 'popper', ...o }, a) =>
      (0, t.jsx)(eA, {
        children: (0, t.jsx)(eK, {
          ref: a,
          className: (0, ee.cn)(
            'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
            'popper' === r &&
              'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
            e,
          ),
          position: r,
          ...o,
          children: (0, t.jsx)(eQ, {
            className: (0, ee.cn)(
              'p-1',
              'popper' === r &&
                'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
            ),
            children: n,
          }),
        }),
      }),
    );
    tl.displayName = eK.displayName;
    let ts = n.forwardRef(({ className: e, children: n, ...r }, o) =>
      (0, t.jsxs)(e4, {
        ref: o,
        className: (0, ee.cn)(
          'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
          e,
        ),
        ...r,
        children: [
          (0, t.jsx)('span', {
            className: 'absolute right-2 flex h-3.5 w-3.5 items-center justify-center',
            children: (0, t.jsx)(e6, { children: (0, t.jsx)(tr.Check, { className: 'h-4 w-4' }) }),
          }),
          (0, t.jsx)(e3, { children: n }),
        ],
      }),
    );
    ts.displayName = e4.displayName;
    var ti = e.i(93265),
      td = e.i(85092);
    e.s(
      [
        'default',
        0,
        function () {
          let [e, p] = (0, n.useState)(''),
            [f, m] = (0, n.useState)(!1),
            [h, x] = (0, n.useState)(null),
            { data: g = [], isLoading: v } = (0, r.useQuery)({
              queryKey: ['api-keys'],
              queryFn: async () => (await new Promise((e) => setTimeout(e, 300)), ti.mockApiKeys),
            }),
            y = g.filter((t) => t.name.toLowerCase().includes(e.toLowerCase()));
          return (0, t.jsxs)('div', {
            className: 'space-y-6',
            children: [
              (0, t.jsxs)('div', {
                className: 'flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between',
                children: [
                  (0, t.jsxs)('div', {
                    children: [
                      (0, t.jsx)('h2', {
                        className: 'text-2xl font-semibold tracking-tight',
                        children: 'API Keys',
                      }),
                      (0, t.jsx)('p', {
                        className: 'text-sm text-muted-foreground',
                        children: 'Issue dan revoke API key untuk partner',
                      }),
                    ],
                  }),
                  (0, t.jsxs)(O, {
                    open: f,
                    onOpenChange: (e) => {
                      (m(e), e || x(null));
                    },
                    children: [
                      (0, t.jsx)(M, {
                        asChild: !0,
                        children: (0, t.jsxs)(s.Button, {
                          size: 'sm',
                          children: [
                            (0, t.jsx)(o.Plus, { className: 'mr-2 h-4 w-4' }),
                            'Issue New Key',
                          ],
                        }),
                      }),
                      (0, t.jsx)(en, {
                        children: h
                          ? (0, t.jsxs)(t.Fragment, {
                              children: [
                                (0, t.jsxs)(er, {
                                  children: [
                                    (0, t.jsx)(ea, { children: 'API Key Created' }),
                                    (0, t.jsx)(el, {
                                      children:
                                        'Simpan key ini sekarang. Tidak akan ditampilkan lagi.',
                                    }),
                                  ],
                                }),
                                (0, t.jsx)('div', {
                                  className: 'space-y-4 py-4',
                                  children: (0, t.jsxs)('div', {
                                    className:
                                      'flex items-center gap-2 rounded-lg border bg-muted/30 p-3',
                                    children: [
                                      (0, t.jsx)('code', {
                                        className: 'flex-1 break-all text-xs font-mono',
                                        children: h,
                                      }),
                                      (0, t.jsx)(s.Button, {
                                        variant: 'ghost',
                                        size: 'sm',
                                        onClick: () => {
                                          (navigator.clipboard.writeText(h),
                                            td.toast.success('Copied to clipboard'));
                                        },
                                        children: 'Copy',
                                      }),
                                    ],
                                  }),
                                }),
                                (0, t.jsx)(eo, {
                                  children: (0, t.jsx)(s.Button, {
                                    onClick: () => m(!1),
                                    children: 'Saya sudah menyimpan key',
                                  }),
                                }),
                              ],
                            })
                          : (0, t.jsxs)(t.Fragment, {
                              children: [
                                (0, t.jsxs)(er, {
                                  children: [
                                    (0, t.jsx)(ea, { children: 'Issue New API Key' }),
                                    (0, t.jsx)(el, {
                                      children: 'Key hanya akan ditampilkan sekali setelah dibuat.',
                                    }),
                                  ],
                                }),
                                (0, t.jsxs)('div', {
                                  className: 'space-y-4 py-4',
                                  children: [
                                    (0, t.jsxs)('div', {
                                      className: 'space-y-2',
                                      children: [
                                        (0, t.jsx)(es.Label, { children: 'Name' }),
                                        (0, t.jsx)(i.Input, { placeholder: 'partner-acme-2026' }),
                                      ],
                                    }),
                                    (0, t.jsxs)('div', {
                                      className: 'space-y-2',
                                      children: [
                                        (0, t.jsx)(es.Label, { children: 'Tenant' }),
                                        (0, t.jsxs)(eE, {
                                          children: [
                                            (0, t.jsx)(ta, {
                                              children: (0, t.jsx)(eO, {
                                                placeholder: 'Pilih tenant',
                                              }),
                                            }),
                                            (0, t.jsx)(tl, {
                                              children: ti.mockTenants.map((e) =>
                                                (0, t.jsx)(
                                                  ts,
                                                  { value: e.id, children: e.name },
                                                  e.id,
                                                ),
                                              ),
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                (0, t.jsxs)(eo, {
                                  children: [
                                    (0, t.jsx)(s.Button, {
                                      variant: 'outline',
                                      onClick: () => m(!1),
                                      children: 'Cancel',
                                    }),
                                    (0, t.jsx)(s.Button, {
                                      onClick: function () {
                                        (x(`msh_sk_${Math.random().toString(36).slice(2, 34)}`),
                                          td.toast.success('API key berhasil dibuat'));
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
              (0, t.jsxs)('div', {
                className: 'relative max-w-sm',
                children: [
                  (0, t.jsx)(l.Search, {
                    className:
                      'absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground',
                  }),
                  (0, t.jsx)(i.Input, {
                    placeholder: 'Search keys...',
                    value: e,
                    onChange: (e) => p(e.target.value),
                    className: 'pl-9',
                  }),
                ],
              }),
              (0, t.jsx)(d.Card, {
                children: (0, t.jsx)(d.CardContent, {
                  className: 'p-0',
                  children: (0, t.jsxs)(u.Table, {
                    children: [
                      (0, t.jsx)(u.TableHeader, {
                        children: (0, t.jsxs)(u.TableRow, {
                          children: [
                            (0, t.jsx)(u.TableHead, { children: 'Name' }),
                            (0, t.jsx)(u.TableHead, { children: 'Tenant' }),
                            (0, t.jsx)(u.TableHead, { children: 'Scopes' }),
                            (0, t.jsx)(u.TableHead, { children: 'Status' }),
                            (0, t.jsx)(u.TableHead, { className: 'text-right', children: 'Usage' }),
                            (0, t.jsx)(u.TableHead, {
                              className: 'text-right',
                              children: 'Last Used',
                            }),
                          ],
                        }),
                      }),
                      (0, t.jsx)(u.TableBody, {
                        children: v
                          ? (0, t.jsx)(u.TableRow, {
                              children: (0, t.jsx)(u.TableCell, {
                                colSpan: 6,
                                className: 'text-center py-8 text-muted-foreground',
                                children: 'Loading...',
                              }),
                            })
                          : y.map((e) =>
                              (0, t.jsxs)(
                                u.TableRow,
                                {
                                  children: [
                                    (0, t.jsx)(u.TableCell, {
                                      children: (0, t.jsxs)('div', {
                                        className: 'flex items-center gap-2',
                                        children: [
                                          (0, t.jsx)(a.KeyRound, {
                                            className: 'h-4 w-4 text-muted-foreground',
                                          }),
                                          (0, t.jsx)('span', {
                                            className: 'font-medium text-sm',
                                            children: e.name,
                                          }),
                                        ],
                                      }),
                                    }),
                                    (0, t.jsx)(u.TableCell, {
                                      className: 'text-sm font-mono',
                                      children: e.tenantId,
                                    }),
                                    (0, t.jsx)(u.TableCell, {
                                      children: (0, t.jsxs)('div', {
                                        className: 'flex flex-wrap gap-1',
                                        children: [
                                          e.scopes
                                            .slice(0, 2)
                                            .map((e) =>
                                              (0, t.jsx)(
                                                c.Badge,
                                                {
                                                  variant: 'secondary',
                                                  className: 'text-xs',
                                                  children: e,
                                                },
                                                e,
                                              ),
                                            ),
                                          e.scopes.length > 2 &&
                                            (0, t.jsxs)(c.Badge, {
                                              variant: 'secondary',
                                              className: 'text-xs',
                                              children: ['+', e.scopes.length - 2],
                                            }),
                                        ],
                                      }),
                                    }),
                                    (0, t.jsx)(u.TableCell, {
                                      children: (0, t.jsx)(c.Badge, {
                                        variant: 'active' === e.status ? 'default' : 'secondary',
                                        children: e.status,
                                      }),
                                    }),
                                    (0, t.jsx)(u.TableCell, {
                                      className: 'text-right font-mono text-xs',
                                      children: (0, ee.formatNumber)(e.usageCount),
                                    }),
                                    (0, t.jsx)(u.TableCell, {
                                      className: 'text-right text-xs text-muted-foreground',
                                      children: e.lastUsedAt
                                        ? (0, ee.relativeTime)(e.lastUsedAt)
                                        : '—',
                                    }),
                                  ],
                                },
                                e.id,
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
      18609,
    );
  },
]);
