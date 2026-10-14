(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  'object' == typeof document ? document.currentScript : void 0,
  36023,
  66100,
  17739,
  (e) => {
    'use strict';
    var t = e.i(24830),
      r = e.i(39380),
      i = Object.defineProperty,
      n = (e, t) => i(e, 'name', { value: t, configurable: !0 });
    function s(e, t) {
      if ('function' == typeof e) return e(t);
      null != e && (e.current = t);
    }
    function o(...e) {
      return (t) => {
        let r = !1,
          i = e.map((e) => {
            let i = s(e, t);
            return (r || 'function' != typeof i || (r = !0), i);
          });
        if (r)
          return () => {
            for (let t = 0; t < i.length; t++) {
              let r = i[t];
              'function' == typeof r ? r() : s(e[t], null);
            }
          };
      };
    }
    function a(...e) {
      return r.useCallback(o(...e), e);
    }
    (n(s, 'setRef'),
      n(o, 'composeRefs'),
      n(a, 'useComposedRefs'),
      e.s(['useComposedRefs', 0, a], 66100));
    var l = Object.defineProperty,
      u = (e, t) => l(e, 'name', { value: t, configurable: !0 });
    function c(e) {
      let t = r.forwardRef((t, i) => {
        let { children: n, ...s } = t,
          o = null,
          l = !1,
          u = [];
        (g(n) && 'function' == typeof O && (n = O(n._payload)),
          r.Children.forEach(n, (e) => {
            if (v(e)) {
              l = !0;
              let t = 'child' in e.props ? e.props.child : e.props.children;
              (g(t) && 'function' == typeof O && (t = O(t._payload)),
                (o = f(e, t)),
                u.push(o?.props?.children));
            } else u.push(e);
          }),
          o
            ? (o = r.cloneElement(o, void 0, u))
            : !l && 1 === r.Children.count(n) && r.isValidElement(n) && (o = n));
        let c = o ? y(o) : void 0,
          h = a(i, c);
        if (!o) {
          if (n || 0 === n) throw Error(l ? w(e) : S(e));
          return n;
        }
        let d = p(s, o.props ?? {});
        return (o.type !== r.Fragment && (d.ref = i ? h : c), r.cloneElement(o, d));
      });
      return ((t.displayName = `${e}.Slot`), t);
    }
    u(c, 'createSlot');
    var h = c('Slot'),
      d = Symbol.for('radix.slottable');
    u(function (e) {
      let t = u((e) => ('child' in e ? e.children(e.child) : e.children), 'Slottable');
      return ((t.displayName = `${e}.Slottable`), (t.__radixId = d), t);
    }, 'createSlottable');
    var f = u((e, t) => {
      if ('child' in e.props) {
        let t = e.props.child;
        return r.isValidElement(t)
          ? r.cloneElement(t, void 0, e.props.children(t.props.children))
          : null;
      }
      return r.isValidElement(t) ? t : null;
    }, 'getSlottableElementFromSlottable');
    function p(e, t) {
      let r = { ...t };
      for (let i in t) {
        let n = e[i],
          s = t[i];
        /^on[A-Z]/.test(i)
          ? n && s
            ? (r[i] = (...e) => {
                let t = s(...e);
                return (n(...e), t);
              })
            : n && (r[i] = n)
          : 'style' === i
            ? (r[i] = { ...n, ...s })
            : 'className' === i && (r[i] = [n, s].filter(Boolean).join(' '));
      }
      return { ...e, ...r };
    }
    function y(e) {
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
    function v(e) {
      return (
        r.isValidElement(e) &&
        'function' == typeof e.type &&
        '__radixId' in e.type &&
        e.type.__radixId === d
      );
    }
    (u(p, 'mergeProps'), u(y, 'getElementRef'), u(v, 'isSlottable'));
    var m = Symbol.for('react.lazy');
    function g(e) {
      return (
        null != e &&
        'object' == typeof e &&
        '$$typeof' in e &&
        e.$$typeof === m &&
        '_payload' in e &&
        b(e._payload)
      );
    }
    function b(e) {
      return 'object' == typeof e && null !== e && 'then' in e;
    }
    (u(g, 'isLazyComponent'), u(b, 'isPromiseLike'));
    var S = u(
        (e) =>
          `${e} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`,
        'createSlotError',
      ),
      w = u(
        (e) =>
          `${e} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`,
        'createSlottableError',
      ),
      O = r[' use '.trim().toString()];
    e.s(['Slot', 0, h, 'createSlot', 0, c], 17739);
    var C = e.i(94237),
      T = e.i(59992);
    let F = (0, C.cva)(
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
      E = r.forwardRef(({ className: e, variant: r, size: i, asChild: n = !1, ...s }, o) =>
        (0, t.jsx)(n ? h : 'button', {
          className: (0, T.cn)(F({ variant: r, size: i, className: e })),
          ref: o,
          ...s,
        }),
      );
    ((E.displayName = 'Button'), e.s(['Button', 0, E], 36023));
  },
  7934,
  (e) => {
    'use strict';
    var t = e.i(78356);
    e.s(['isServer', 0, () => t.isServer]);
  },
  53094,
  77288,
  (e) => {
    'use strict';
    var t = class {
      constructor() {
        ((this.listeners = new Set()), (this.subscribe = this.subscribe.bind(this)));
      }
      subscribe(e) {
        return (
          this.listeners.add(e),
          this.onSubscribe(),
          () => {
            (this.listeners.delete(e), this.onUnsubscribe());
          }
        );
      }
      hasListeners() {
        return this.listeners.size > 0;
      }
      onSubscribe() {}
      onUnsubscribe() {}
    };
    e.s(['Subscribable', 0, t], 77288);
    let r = new (class extends t {
      #e;
      #t;
      #r;
      constructor() {
        (super(),
          (this.#r = (e) => {
            if ('u' > typeof window && window.addEventListener) {
              let t = () => e();
              return (
                window.addEventListener('visibilitychange', t, !1),
                () => {
                  window.removeEventListener('visibilitychange', t);
                }
              );
            }
          }));
      }
      onSubscribe() {
        this.#t || this.setEventListener(this.#r);
      }
      onUnsubscribe() {
        this.hasListeners() || (this.#t?.(), (this.#t = void 0));
      }
      setEventListener(e) {
        ((this.#r = e),
          this.#t?.(),
          (this.#t = e((e) => {
            'boolean' == typeof e ? this.setFocused(e) : this.onFocus();
          })));
      }
      setFocused(e) {
        this.#e !== e && ((this.#e = e), this.onFocus());
      }
      onFocus() {
        let e = this.isFocused();
        this.listeners.forEach((t) => {
          t(e);
        });
      }
      isFocused() {
        return 'boolean' == typeof this.#e
          ? this.#e
          : globalThis.document?.visibilityState !== 'hidden';
      }
    })();
    e.s(['focusManager', 0, r], 53094);
  },
  70508,
  (e) => {
    'use strict';
    let t,
      r,
      i,
      n,
      s,
      o,
      a = e.i(68550).systemSetTimeoutZero,
      l =
        ((t = []),
        (r = 0),
        (i = (e) => {
          e();
        }),
        (n = (e) => {
          e();
        }),
        (s = a),
        {
          batch: (e) => {
            let o;
            r++;
            try {
              o = e();
            } finally {
              let e;
              --r ||
                ((e = t),
                (t = []),
                e.length &&
                  s(() => {
                    n(() => {
                      e.forEach((e) => {
                        i(e);
                      });
                    });
                  }));
            }
            return o;
          },
          batchCalls:
            (e) =>
            (...t) => {
              o(() => {
                e(...t);
              });
            },
          schedule: (o = (e) => {
            r
              ? t.push(e)
              : s(() => {
                  i(e);
                });
          }),
          setNotifyFunction: (e) => {
            i = e;
          },
          setBatchNotifyFunction: (e) => {
            n = e;
          },
          setScheduler: (e) => {
            s = e;
          },
        });
    e.s(['notifyManager', 0, l]);
  },
  88060,
  (e) => {
    'use strict';
    var t = e.i(77288);
    let r = new (class extends t.Subscribable {
      #i = !0;
      #t;
      #r;
      constructor() {
        (super(),
          (this.#r = (e) => {
            if ('u' > typeof window && window.addEventListener) {
              let t = () => e(!0),
                r = () => e(!1);
              return (
                window.addEventListener('online', t, !1),
                window.addEventListener('offline', r, !1),
                () => {
                  (window.removeEventListener('online', t),
                    window.removeEventListener('offline', r));
                }
              );
            }
          }));
      }
      onSubscribe() {
        this.#t || this.setEventListener(this.#r);
      }
      onUnsubscribe() {
        this.hasListeners() || (this.#t?.(), (this.#t = void 0));
      }
      setEventListener(e) {
        ((this.#r = e), this.#t?.(), (this.#t = e(this.setOnline.bind(this))));
      }
      setOnline(e) {
        this.#i !== e &&
          ((this.#i = e),
          this.listeners.forEach((t) => {
            t(e);
          }));
      }
      isOnline() {
        return this.#i;
      }
    })();
    e.s(['onlineManager', 0, r]);
  },
  40741,
  67948,
  88949,
  (e) => {
    'use strict';
    var t = e.i(78356),
      r = e.i(70508),
      i = e.i(7934),
      n = e.i(53094),
      s = e.i(88060);
    function o(e) {
      return Math.min(1e3 * 2 ** e, 3e4);
    }
    function a(e) {
      return (e ?? 'online') !== 'online' || s.onlineManager.isOnline();
    }
    var l = class extends Error {
      constructor(e) {
        (super('CancelledError'), (this.revert = e?.revert), (this.silent = e?.silent));
      }
    };
    function u(e) {
      let r,
        u,
        c,
        h = !1,
        d = 0,
        f = 'pending',
        p = new Promise((e, t) => {
          ((u = e), (c = t));
        });
      p.catch(t.noop);
      let y = () =>
          n.focusManager.isFocused() &&
          ('always' === e.networkMode || s.onlineManager.isOnline()) &&
          e.canRun(),
        v = () => a(e.networkMode) && e.canRun(),
        m = (e) => {
          'pending' === f && (r?.(), (f = 'resolved'), u(e));
        },
        g = (e) => {
          'pending' === f && (r?.(), (f = 'rejected'), c(e));
        },
        b = () =>
          new Promise((t) => {
            ((r = (e) => {
              ('pending' !== f || y()) && t(e);
            }),
              e.onPause?.());
          }).then(() => {
            ((r = void 0), 'pending' === f && e.onContinue?.());
          }),
        S = () => {
          let r;
          if ('pending' !== f) return;
          let n = 0 === d ? e.initialPromise : void 0;
          try {
            r = n ?? e.fn();
          } catch (e) {
            r = Promise.reject(e);
          }
          Promise.resolve(r)
            .then(m)
            .catch((r) => {
              if ('pending' !== f) return;
              let n = e.retry ?? 3 * !(0, i.isServer)(),
                s = e.retryDelay ?? o,
                a = 'function' == typeof s ? s(d, r) : s,
                l =
                  !0 === n ||
                  ('number' == typeof n && d < n) ||
                  ('function' == typeof n && n(d, r));
              h || !l
                ? g(r)
                : (d++,
                  e.onFail?.(d, r),
                  (0, t.sleep)(a)
                    .then(() => (y() ? void 0 : b()))
                    .then(() => {
                      h ? g(r) : S();
                    }));
            });
        };
      return {
        promise: p,
        status: () => f,
        cancel: (t) => {
          if ('pending' === f) {
            let r = new l(t);
            (g(r), e.onCancel?.(r));
          }
        },
        continue: () => (r?.(), p),
        cancelRetry: () => {
          h = !0;
        },
        continueRetry: () => {
          h = !1;
        },
        canStart: v,
        start: () => (v() ? S() : b().then(S), p),
      };
    }
    e.s(['CancelledError', 0, l, 'canFetch', 0, a, 'createRetryer', 0, u], 67948);
    var c = e.i(68550),
      h = class {
        #n;
        destroy() {
          this.clearGcTimeout();
        }
        scheduleGc() {
          (this.clearGcTimeout(),
            (0, t.isValidTimeout)(this.gcTime) &&
              (this.#n = c.timeoutManager.setTimeout(() => {
                this.optionalRemove();
              }, this.gcTime)));
        }
        updateGcTime(e) {
          this.gcTime = Math.max(this.gcTime || 0, e ?? ((0, i.isServer)() ? 1 / 0 : 3e5));
        }
        clearGcTimeout() {
          void 0 !== this.#n && (c.timeoutManager.clearTimeout(this.#n), (this.#n = void 0));
        }
      };
    function d(e, { pages: t, pageParams: r }) {
      let i = t.length - 1;
      return t.length > 0 ? e.getNextPageParam(t[i], t, r[i], r) : void 0;
    }
    function f(e, { pages: t, pageParams: r }) {
      return t.length > 0 ? e.getPreviousPageParam?.(t[0], t, r[0], r) : void 0;
    }
    e.s(['Removable', 0, h], 88949);
    var p = class extends h {
      #s;
      #o;
      #a;
      #l;
      #u;
      #c;
      #h;
      #d;
      constructor(e) {
        (super(),
          (this.#d = !1),
          (this.#h = e.defaultOptions),
          this.setOptions(e.options),
          (this.observers = []),
          (this.#u = e.client),
          (this.#l = this.#u.getQueryCache()),
          (this.queryKey = e.queryKey),
          (this.queryHash = e.queryHash),
          (this.#o = m(this.options)),
          (this.state = e.state ?? this.#o),
          this.scheduleGc());
      }
      get meta() {
        return this.options.meta;
      }
      get queryType() {
        return this.#s;
      }
      get promise() {
        return this.#c?.promise;
      }
      setOptions(e) {
        if (
          ((this.options = { ...this.#h, ...e }),
          e?._type && (this.#s = e._type),
          this.updateGcTime(this.options.gcTime),
          this.state && void 0 === this.state.data)
        ) {
          let e = m(this.options);
          void 0 !== e.data && (this.setState(v(e.data, e.dataUpdatedAt)), (this.#o = e));
        }
      }
      optionalRemove() {
        this.observers.length || 'idle' !== this.state.fetchStatus || this.#l.remove(this);
      }
      setData(e, r) {
        let i = (0, t.replaceData)(this.state.data, e, this.options);
        return (
          this.#f({ data: i, type: 'success', dataUpdatedAt: r?.updatedAt, manual: r?.manual }),
          i
        );
      }
      setState(e) {
        this.#f({ type: 'setState', state: e });
      }
      cancel(e) {
        let r = this.#c?.promise;
        return (this.#c?.cancel(e), r ? r.then(t.noop).catch(t.noop) : Promise.resolve());
      }
      destroy() {
        (super.destroy(), this.cancel({ silent: !0 }));
      }
      get resetState() {
        return this.#o;
      }
      reset() {
        (this.destroy(), this.setState(this.resetState));
      }
      isActive() {
        return this.observers.some((e) => !1 !== (0, t.resolveQueryValue)(e.options.enabled, this));
      }
      isDisabled() {
        return this.getObserversCount() > 0
          ? !this.isActive()
          : this.options.queryFn === t.skipToken || !this.isFetched();
      }
      isFetched() {
        return this.state.dataUpdateCount + this.state.errorUpdateCount > 0;
      }
      isStatic() {
        return (
          this.getObserversCount() > 0 &&
          this.observers.some(
            (e) => 'static' === (0, t.resolveQueryValue)(e.options.staleTime, this),
          )
        );
      }
      isStale() {
        return this.getObserversCount() > 0
          ? this.observers.some((e) => e.getCurrentResult().isStale)
          : void 0 === this.state.data || this.state.isInvalidated;
      }
      isStaleByTime(e = 0) {
        return (
          void 0 === this.state.data ||
          ('static' !== e &&
            (!!this.state.isInvalidated || !(0, t.timeUntilStale)(this.state.dataUpdatedAt, e)))
        );
      }
      onFocus() {
        (this.observers.find((e) => e.shouldFetchOnWindowFocus())?.refetch({ cancelRefetch: !1 }),
          this.#c?.continue());
      }
      onOnline() {
        (this.observers.find((e) => e.shouldFetchOnReconnect())?.refetch({ cancelRefetch: !1 }),
          this.#c?.continue());
      }
      addObserver(e) {
        this.observers.includes(e) ||
          (this.observers.push(e),
          this.clearGcTimeout(),
          this.#l.notify({ type: 'observerAdded', query: this, observer: e }));
      }
      removeObserver(e) {
        let t = this.observers.indexOf(e);
        -1 !== t &&
          (this.observers.splice(t, 1),
          this.observers.length ||
            (this.#c &&
              (this.#d || ('paused' === this.state.fetchStatus && 'pending' === this.state.status)
                ? this.#c.cancel({ revert: !0 })
                : this.#c.cancelRetry()),
            this.scheduleGc()),
          this.#l.notify({ type: 'observerRemoved', query: this, observer: e }));
      }
      getObserversCount() {
        return this.observers.length;
      }
      invalidate() {
        this.state.isInvalidated || this.#f({ type: 'invalidate' });
      }
      async fetch(e, r) {
        var i;
        let n;
        if ('idle' !== this.state.fetchStatus && this.#c?.status() !== 'rejected') {
          if (void 0 !== this.state.data && r?.cancelRefetch) this.cancel({ silent: !0 });
          else if (this.#c) return (this.#c.continueRetry(), this.#c.promise);
        }
        if ((e && this.setOptions(e), !this.options.queryFn)) {
          let e = this.observers.find((e) => e.options.queryFn);
          e && this.setOptions(e.options);
        }
        let s = new AbortController(),
          o = (e) => {
            Object.defineProperty(e, 'signal', {
              enumerable: !0,
              get: () => ((this.#d = !0), s.signal),
            });
          },
          a = () => {
            let e,
              i = (0, t.ensureQueryFn)(this.options, r),
              n = (o((e = { client: this.#u, queryKey: this.queryKey, meta: this.meta })), e);
            return ((this.#d = !1), this.options.persister)
              ? this.options.persister(i, n, this)
              : i(n);
          },
          c =
            (o(
              (n = {
                fetchOptions: r,
                options: this.options,
                queryKey: this.queryKey,
                client: this.#u,
                state: this.state,
                fetchFn: a,
              }),
            ),
            n);
        (('infinite' === this.#s
          ? ((i = this.options.pages),
            {
              onFetch: (e, r) => {
                let n = e.options,
                  s = e.fetchOptions?.meta?.fetchMore?.direction,
                  o = e.state.data?.pages || [],
                  a = e.state.data?.pageParams || [],
                  l = { pages: [], pageParams: [] },
                  u = 0,
                  c = async () => {
                    let r = !1,
                      c = (0, t.ensureQueryFn)(e.options, e.fetchOptions),
                      h = async (i, n, s) => {
                        let o;
                        if (r) return Promise.reject(e.signal.reason);
                        if (null == n && i.pages.length) return Promise.resolve(i);
                        let a =
                            ((o = {
                              client: e.client,
                              queryKey: e.queryKey,
                              pageParam: n,
                              direction: s ? 'backward' : 'forward',
                              meta: e.options.meta,
                            }),
                            (0, t.addConsumeAwareSignal)(
                              o,
                              () => e.signal,
                              () => (r = !0),
                            ),
                            o),
                          l = await c(a),
                          { maxPages: u } = e.options,
                          h = s ? t.addToStart : t.addToEnd;
                        return { pages: h(i.pages, l, u), pageParams: h(i.pageParams, n, u) };
                      };
                    if (s && o.length) {
                      let e = 'backward' === s,
                        t = e ? f : d,
                        r = { pages: o, pageParams: a };
                      l = await h(r, t(n, r), e);
                    } else {
                      let e = i ?? o.length;
                      do {
                        let e = 0 === u ? (a[0] ?? n.initialPageParam) : d(n, l);
                        if (u > 0 && null == e) break;
                        ((l = await h(l, e)), u++);
                      } while (u < e);
                    }
                    return l;
                  };
                e.options.persister
                  ? (e.fetchFn = () =>
                      e.options.persister?.(
                        c,
                        {
                          client: e.client,
                          queryKey: e.queryKey,
                          meta: e.options.meta,
                          signal: e.signal,
                        },
                        r,
                      ))
                  : (e.fetchFn = c);
              },
            })
          : this.options.behavior
        )?.onFetch(c, this),
          (this.#a = this.state),
          ('idle' === this.state.fetchStatus || this.state.fetchMeta !== c.fetchOptions?.meta) &&
            this.#f({ type: 'fetch', meta: c.fetchOptions?.meta }));
        let h = (this.#c = u({
          initialPromise: r?.initialPromise,
          fn: c.fetchFn,
          onCancel: (e) => {
            (e instanceof l && e.revert && this.setState({ ...this.#a, fetchStatus: 'idle' }),
              s.abort());
          },
          onFail: (e, t) => {
            this.#f({ type: 'failed', failureCount: e, error: t });
          },
          onPause: () => {
            this.#f({ type: 'pause' });
          },
          onContinue: () => {
            this.#f({ type: 'continue' });
          },
          retry: c.options.retry,
          retryDelay: c.options.retryDelay,
          networkMode: c.options.networkMode,
          canRun: () => !0,
        }));
        try {
          let e = await h.start();
          if (void 0 === e) throw Error(`${this.queryHash} data is undefined`);
          return (
            this.setData(e),
            this.#l.config.onSuccess?.(e, this),
            this.#l.config.onSettled?.(e, this.state.error, this),
            e
          );
        } catch (e) {
          if (e instanceof l) {
            if (e.silent) return this.#c.promise;
            else if (e.revert) {
              if (void 0 === this.state.data) throw e;
              return this.state.data;
            }
          }
          throw (
            this.#f({ type: 'error', error: e }),
            this.#l.config.onError?.(e, this),
            this.#l.config.onSettled?.(this.state.data, e, this),
            e
          );
        } finally {
          (this.#c === h && (this.#c = void 0), this.scheduleGc());
        }
      }
      #f(e) {
        let t = (t) => {
          switch (e.type) {
            case 'failed':
              return { ...t, fetchFailureCount: e.failureCount, fetchFailureReason: e.error };
            case 'pause':
              return { ...t, fetchStatus: 'paused' };
            case 'continue':
              return { ...t, fetchStatus: 'fetching' };
            case 'fetch':
              return { ...t, ...y(t.data, this.options), fetchMeta: e.meta ?? null };
            case 'success':
              let r = {
                ...t,
                ...v(e.data, e.dataUpdatedAt),
                dataUpdateCount: t.dataUpdateCount + 1,
                ...(!e.manual && {
                  fetchStatus: 'idle',
                  fetchFailureCount: 0,
                  fetchFailureReason: null,
                }),
              };
              return ((this.#a = e.manual ? r : void 0), r);
            case 'error':
              let i = e.error;
              return {
                ...t,
                error: i,
                errorUpdateCount: t.errorUpdateCount + 1,
                errorUpdatedAt: Date.now(),
                fetchFailureCount: t.fetchFailureCount + 1,
                fetchFailureReason: i,
                fetchStatus: 'idle',
                status: 'error',
                isInvalidated: !0,
              };
            case 'invalidate':
              return { ...t, isInvalidated: !0 };
            case 'setState':
              return { ...t, ...e.state };
          }
        };
        ((this.state = t(this.state)),
          r.notifyManager.batch(() => {
            (this.observers.slice().forEach((e) => {
              e.onQueryUpdate();
            }),
              this.#l.notify({ query: this, type: 'updated', action: e }));
          }));
      }
    };
    function y(e, t) {
      return {
        fetchFailureCount: 0,
        fetchFailureReason: null,
        fetchStatus: a(t.networkMode) ? 'fetching' : 'paused',
        ...(void 0 === e && { error: null, status: 'pending' }),
      };
    }
    function v(e, t) {
      return {
        data: e,
        dataUpdatedAt: t ?? Date.now(),
        error: null,
        isInvalidated: !1,
        status: 'success',
      };
    }
    function m(e) {
      let t = 'function' == typeof e.initialData ? e.initialData() : e.initialData,
        r = void 0 !== t,
        i = r
          ? 'function' == typeof e.initialDataUpdatedAt
            ? e.initialDataUpdatedAt()
            : e.initialDataUpdatedAt
          : 0;
      return {
        data: t,
        dataUpdateCount: 0,
        dataUpdatedAt: r ? (i ?? Date.now()) : 0,
        error: null,
        errorUpdateCount: 0,
        errorUpdatedAt: 0,
        fetchFailureCount: 0,
        fetchFailureReason: null,
        fetchMeta: null,
        isInvalidated: !1,
        status: r ? 'success' : 'pending',
        fetchStatus: 'idle',
      };
    }
    e.s(['Query', 0, p, 'fetchState', 0, y], 40741);
  },
  78356,
  68550,
  (e) => {
    'use strict';
    let t = {
        setTimeout: (e, t) => setTimeout(e, t),
        clearTimeout: (e) => clearTimeout(e),
        setInterval: (e, t) => setInterval(e, t),
        clearInterval: (e) => clearInterval(e),
      },
      r = new (class {
        #p = t;
        #y = !1;
        setTimeoutProvider(e) {
          this.#p = e;
        }
        setTimeout(e, t) {
          return this.#p.setTimeout(e, t);
        }
        clearTimeout(e) {
          this.#p.clearTimeout(e);
        }
        setInterval(e, t) {
          return this.#p.setInterval(e, t);
        }
        clearInterval(e) {
          this.#p.clearInterval(e);
        }
      })();
    e.s(
      [
        'systemSetTimeoutZero',
        0,
        function (e) {
          setTimeout(e, 0);
        },
        'timeoutManager',
        0,
        r,
      ],
      68550,
    );
    let i = 'u' < typeof window || 'Deno' in globalThis;
    function n(e, t) {
      return (t?.queryKeyHashFn || s)(e);
    }
    function s(e) {
      return JSON.stringify(e, (e, t) =>
        u(t)
          ? Object.keys(t)
              .sort()
              .reduce((e, r) => ((e[r] = t[r]), e), {})
          : t,
      );
    }
    function o(e, t) {
      if (e === t) return !0;
      if (typeof e != typeof t) return !1;
      if (e && t && 'object' == typeof e && 'object' == typeof t) {
        if (Array.isArray(e) && Array.isArray(t)) {
          if (t.length > e.length) return !1;
          for (let r = 0; r < t.length; r++) if (!o(e[r], t[r])) return !1;
          return !0;
        }
        for (let r of Object.keys(t)) if (!o(e[r], t[r])) return !1;
        return !0;
      }
      return !1;
    }
    let a = Object.prototype.hasOwnProperty;
    function l(e) {
      return Array.isArray(e) && e.length === Object.keys(e).length;
    }
    function u(e) {
      if (!c(e)) return !1;
      let t = Object.getPrototypeOf(e),
        r = t?.constructor;
      if (void 0 === r) return !0;
      if ('function' != typeof r) return !1;
      let i = r.prototype;
      return !!c(i) && !!i.hasOwnProperty('isPrototypeOf') && t === Object.prototype;
    }
    function c(e) {
      return '[object Object]' === Object.prototype.toString.call(e);
    }
    let h = Symbol();
    e.s(
      [
        'addConsumeAwareSignal',
        0,
        function (e, t, r) {
          let i,
            n = !1;
          return (
            Object.defineProperty(e, 'signal', {
              enumerable: !0,
              get: () => (
                (i ??= t()),
                n || ((n = !0), i.aborted ? r() : i.addEventListener('abort', r, { once: !0 })),
                i
              ),
            }),
            e
          );
        },
        'addToEnd',
        0,
        function (e, t, r = 0) {
          let i = [...e, t];
          return r && i.length > r ? i.slice(1) : i;
        },
        'addToStart',
        0,
        function (e, t, r = 0) {
          let i = [t, ...e];
          return r && i.length > r ? i.slice(0, -1) : i;
        },
        'ensureQueryFn',
        0,
        function (e, t) {
          return !e.queryFn && t?.initialPromise
            ? () => t.initialPromise
            : e.queryFn && e.queryFn !== h
              ? e.queryFn
              : () => Promise.reject(Error(`Missing queryFn: '${e.queryHash}'`));
        },
        'functionalUpdate',
        0,
        function (e, t) {
          return 'function' == typeof e ? e(t) : e;
        },
        'hashKey',
        0,
        s,
        'hashQueryKeyByOptions',
        0,
        n,
        'isServer',
        0,
        i,
        'isValidTimeout',
        0,
        function (e) {
          return 'number' == typeof e && e >= 0 && e !== 1 / 0;
        },
        'matchMutation',
        0,
        function (e, t) {
          let { exact: r, status: i, predicate: n, mutationKey: a } = e;
          if (a) {
            if (!t.options.mutationKey) return !1;
            if (r) {
              if (s(t.options.mutationKey) !== s(a)) return !1;
            } else if (!o(t.options.mutationKey, a)) return !1;
          }
          return (!i || t.state.status === i) && (!n || !!n(t));
        },
        'matchQuery',
        0,
        function (e, t) {
          let {
            type: r = 'all',
            exact: i,
            fetchStatus: s,
            predicate: a,
            queryKey: l,
            stale: u,
          } = e;
          if (l) {
            if (i) {
              if (t.queryHash !== n(l, t.options)) return !1;
            } else if (!o(t.queryKey, l)) return !1;
          }
          if ('all' !== r) {
            let e = t.isActive();
            if (('active' === r && !e) || ('inactive' === r && e)) return !1;
          }
          return (
            ('boolean' != typeof u || t.isStale() === u) &&
            (!s || s === t.state.fetchStatus) &&
            (!a || !!a(t))
          );
        },
        'noop',
        0,
        function () {},
        'partialMatchKey',
        0,
        o,
        'replaceData',
        0,
        function (e, t, r) {
          return 'function' == typeof r.structuralSharing
            ? r.structuralSharing(e, t)
            : !1 !== r.structuralSharing
              ? (function e(t, r, i = 0) {
                  if (t === r) return t;
                  if (i > 500) return r;
                  let n = l(t) && l(r);
                  if (!n && !(u(t) && u(r))) return r;
                  let s = (n ? t : Object.keys(t)).length,
                    o = n ? r : Object.keys(r),
                    c = o.length,
                    h = n ? Array(c) : {},
                    d = 0;
                  for (let l = 0; l < c; l++) {
                    let u = n ? l : o[l],
                      c = t[u],
                      f = r[u];
                    if (c === f) {
                      ((h[u] = c), (n ? l < s : a.call(t, u)) && d++);
                      continue;
                    }
                    if (null === c || null === f || 'object' != typeof c || 'object' != typeof f) {
                      h[u] = f;
                      continue;
                    }
                    let p = e(c, f, i + 1);
                    ((h[u] = p), p === c && d++);
                  }
                  return s === c && d === s ? t : h;
                })(e, t)
              : t;
        },
        'resolveQueryValue',
        0,
        function (e, t) {
          return 'function' == typeof e ? e(t) : e;
        },
        'shallowEqualObjects',
        0,
        function (e, t) {
          if (!t || Object.keys(e).length !== Object.keys(t).length) return !1;
          for (let r in e) if (e[r] !== t[r]) return !1;
          return !0;
        },
        'shouldThrowError',
        0,
        function (e, t) {
          return 'function' == typeof e ? e(...t) : !!e;
        },
        'skipToken',
        0,
        h,
        'sleep',
        0,
        function (e) {
          return new Promise((t) => {
            r.setTimeout(t, e);
          });
        },
        'timeUntilStale',
        0,
        function (e, t) {
          return Math.max(e + (t || 0) - Date.now(), 0);
        },
      ],
      78356,
    );
  },
  50955,
  (e) => {
    'use strict';
    var t = e.i(39380),
      r = e.i(24830);
    let i = t.createContext(void 0);
    e.s([
      'QueryClientProvider',
      0,
      ({ client: e, children: n }) => (
        t.useEffect(
          () => (
            e.mount(),
            () => {
              e.unmount();
            }
          ),
          [e],
        ),
        (0, r.jsx)(i.Provider, { value: e, children: n })
      ),
      'useQueryClient',
      0,
      (e) => {
        let r = t.useContext(i);
        if (e) return e;
        if (!r) throw Error('No QueryClient set, use QueryClientProvider to set one');
        return r;
      },
    ]);
  },
  94237,
  (e) => {
    'use strict';
    var t = e.i(7284);
    let r = (e) => ('boolean' == typeof e ? `${e}` : 0 === e ? '0' : e),
      i = t.clsx;
    e.s([
      'cva',
      0,
      (e, t) => (n) => {
        var s;
        if ((null == t ? void 0 : t.variants) == null)
          return i(e, null == n ? void 0 : n.class, null == n ? void 0 : n.className);
        let { variants: o, defaultVariants: a } = t,
          l = Object.keys(o).map((e) => {
            let t = null == n ? void 0 : n[e],
              i = null == a ? void 0 : a[e];
            if (null === t) return null;
            let s = r(t) || r(i);
            return o[e][s];
          }),
          u =
            n &&
            Object.entries(n).reduce((e, t) => {
              let [r, i] = t;
              return (void 0 === i || (e[r] = i), e);
            }, {});
        return i(
          e,
          l,
          null == t || null == (s = t.compoundVariants)
            ? void 0
            : s.reduce((e, t) => {
                let { class: r, className: i, ...n } = t;
                return Object.entries(n).every((e) => {
                  let [t, r] = e;
                  return Array.isArray(r) ? r.includes({ ...a, ...u }[t]) : { ...a, ...u }[t] === r;
                })
                  ? [...e, r, i]
                  : e;
              }, []),
          null == n ? void 0 : n.class,
          null == n ? void 0 : n.className,
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
    var i = {
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
    let n = (0, t.forwardRef)(
      (
        {
          color: e = 'currentColor',
          size: n = 24,
          strokeWidth: s = 2,
          absoluteStrokeWidth: o,
          className: a = '',
          children: l,
          iconNode: u,
          ...c
        },
        h,
      ) =>
        (0, t.createElement)(
          'svg',
          {
            ref: h,
            ...i,
            width: n,
            height: n,
            stroke: e,
            strokeWidth: o ? (24 * Number(s)) / Number(n) : s,
            className: r('lucide', a),
            ...c,
          },
          [...u.map(([e, r]) => (0, t.createElement)(e, r)), ...(Array.isArray(l) ? l : [l])],
        ),
    );
    e.s(
      [
        'default',
        0,
        (e, i) => {
          let s = (0, t.forwardRef)(({ className: s, ...o }, a) =>
            (0, t.createElement)(n, {
              ref: a,
              iconNode: i,
              className: r(`lucide-${e.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()}`, s),
              ...o,
            }),
          );
          return ((s.displayName = `${e}`), s);
        },
      ],
      32155,
    );
  },
]);
