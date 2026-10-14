module.exports = [
  41567,
  (a) => {
    'use strict';
    a.s(['OverviewContent', () => c, 'overviewQueryKey', () => d]);
    var b = a.i(62293);
    let c = (0, b.registerClientReference)(
        function () {
          throw Error(
            "Attempted to call OverviewContent() from the server but OverviewContent is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
          );
        },
        '[project]/apps/dashboard/components/dashboard/overview-content.tsx',
        'OverviewContent',
      ),
      d = (0, b.registerClientReference)(
        function () {
          throw Error(
            "Attempted to call overviewQueryKey() from the server but overviewQueryKey is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
          );
        },
        '[project]/apps/dashboard/components/dashboard/overview-content.tsx',
        'overviewQueryKey',
      );
  },
  1677,
  (a) => {
    'use strict';
    var b = a.i(41567);
    a.n(b);
  },
  93084,
  (a) => {
    'use strict';
    let b, c, d, f, g, h, i, j;
    (a.s(
      [
        '$ZodAsyncError',
        () => bC,
        '$ZodEncodeError',
        () => bD,
        '$brand',
        () => bB,
        '$constructor',
        () => bA,
        'NEVER',
        () => bx,
        'config',
        () => bF,
        'globalConfig',
        () => bE,
      ],
      12963,
    ),
      a.s(
        [
          'BIGINT_FORMAT_RANGES',
          () => aV,
          'CONSTANT_CATCH',
          () => bv,
          'Class',
          () => bm,
          'NUMBER_FORMAT_RANGES',
          () => aU,
          'aborted',
          () => a3,
          'allowsEval',
          () => aH,
          'assert',
          () => ag,
          'assertEqual',
          () => ab,
          'assertIs',
          () => ae,
          'assertNever',
          () => af,
          'assertNotEqual',
          () => ac,
          'assignProp',
          () => as,
          'attachSchema',
          () => a7,
          'base64ToUint8Array',
          () => bg,
          'base64urlToUint8Array',
          () => bi,
          'cached',
          () => al,
          'captureStackTrace',
          () => aF,
          'cleanEnum',
          () => bf,
          'cleanRegex',
          () => an,
          'clone',
          () => aP,
          'cloneDef',
          () => az,
          'codePointLength',
          () => bb,
          'constantCatch',
          () => bw,
          'createTransparentProxy',
          () => aR,
          'defineLazy',
          () => aq,
          'defineLazyInternal',
          () => bt,
          'derived',
          () => bq,
          'esc',
          () => aD,
          'escapeRegex',
          () => aO,
          'explicitlyAborted',
          () => a4,
          'extend',
          () => aZ,
          'finalizeIssue',
          () => a8,
          'floatSafeRemainder',
          () => ao,
          'getElementAtPath',
          () => aA,
          'getEnumValues',
          () => ah,
          'getLengthableOrigin',
          () => bc,
          'getParsedType',
          () => aL,
          'getSizableOrigin',
          () => a9,
          'hexToUint8Array',
          () => bk,
          'hide',
          () => bp,
          'installLazyProp',
          () => bu,
          'isObject',
          () => aG,
          'isPlainObject',
          () => aI,
          'issue',
          () => be,
          'joinValues',
          () => ai,
          'jsonStringifyReplacer',
          () => aj,
          'members',
          () => bn,
          'merge',
          () => a0,
          'mergeDefs',
          () => ay,
          'normalizeParams',
          () => aQ,
          'nullish',
          () => am,
          'numKeys',
          () => aK,
          'objectClone',
          () => ar,
          'omit',
          () => aY,
          'optionalKeys',
          () => aT,
          'own',
          () => bo,
          'parsedType',
          () => bd,
          'partial',
          () => a1,
          'pick',
          () => aW,
          'prefixIssues',
          () => a5,
          'primitiveTypes',
          () => aN,
          'promiseAllObject',
          () => aB,
          'propertyKeyTypes',
          () => aM,
          'randomString',
          () => aC,
          'rawShape',
          () => at,
          'required',
          () => a2,
          'safeExtend',
          () => a_,
          'shallowClone',
          () => aJ,
          'slugify',
          () => aE,
          'stringifyPrimitive',
          () => aS,
          'toZod',
          () => ad,
          'uint8ArrayToBase64',
          () => bh,
          'uint8ArrayToBase64url',
          () => bj,
          'uint8ArrayToHex',
          () => bl,
          'unwrapMessage',
          () => a6,
        ],
        18130,
      ));
    var k,
      l,
      m,
      n = a.i(30545);
    let o = {
        setTimeout: (a, b) => setTimeout(a, b),
        clearTimeout: (a) => clearTimeout(a),
        setInterval: (a, b) => setInterval(a, b),
        clearInterval: (a) => clearInterval(a),
      },
      p = new (class {
        #a = o;
        #b = !1;
        setTimeoutProvider(a) {
          this.#a = a;
        }
        setTimeout(a, b) {
          return this.#a.setTimeout(a, b);
        }
        clearTimeout(a) {
          this.#a.clearTimeout(a);
        }
        setInterval(a, b) {
          return this.#a.setInterval(a, b);
        }
        clearInterval(a) {
          this.#a.clearInterval(a);
        }
      })();
    function q() {}
    function r(a, b) {
      return 'function' == typeof a ? a(b) : a;
    }
    function s(a, b) {
      let { type: c = 'all', exact: d, fetchStatus: f, predicate: g, queryKey: h, stale: i } = a;
      if (h) {
        if (d) {
          if (b.queryHash !== u(h, b.options)) return !1;
        } else if (!w(b.queryKey, h)) return !1;
      }
      if ('all' !== c) {
        let a = b.isActive();
        if (('active' === c && !a) || ('inactive' === c && a)) return !1;
      }
      return (
        ('boolean' != typeof i || b.isStale() === i) &&
        (!f || f === b.state.fetchStatus) &&
        (!g || !!g(b))
      );
    }
    function t(a, b) {
      let { exact: c, status: d, predicate: f, mutationKey: g } = a;
      if (g) {
        if (!b.options.mutationKey) return !1;
        if (c) {
          if (v(b.options.mutationKey) !== v(g)) return !1;
        } else if (!w(b.options.mutationKey, g)) return !1;
      }
      return (!d || b.state.status === d) && (!f || !!f(b));
    }
    function u(a, b) {
      return (b?.queryKeyHashFn || v)(a);
    }
    function v(a) {
      return JSON.stringify(a, (a, b) =>
        z(b)
          ? Object.keys(b)
              .sort()
              .reduce((a, c) => ((a[c] = b[c]), a), {})
          : b,
      );
    }
    function w(a, b) {
      if (a === b) return !0;
      if (typeof a != typeof b) return !1;
      if (a && b && 'object' == typeof a && 'object' == typeof b) {
        if (Array.isArray(a) && Array.isArray(b)) {
          if (b.length > a.length) return !1;
          for (let c = 0; c < b.length; c++) if (!w(a[c], b[c])) return !1;
          return !0;
        }
        for (let c of Object.keys(b)) if (!w(a[c], b[c])) return !1;
        return !0;
      }
      return !1;
    }
    let x = Object.prototype.hasOwnProperty;
    function y(a) {
      return Array.isArray(a) && a.length === Object.keys(a).length;
    }
    function z(a) {
      if (!A(a)) return !1;
      let b = Object.getPrototypeOf(a),
        c = b?.constructor;
      if (void 0 === c) return !0;
      if ('function' != typeof c) return !1;
      let d = c.prototype;
      return !!A(d) && !!d.hasOwnProperty('isPrototypeOf') && b === Object.prototype;
    }
    function A(a) {
      return '[object Object]' === Object.prototype.toString.call(a);
    }
    function B(a, b, c = 0) {
      let d = [...a, b];
      return c && d.length > c ? d.slice(1) : d;
    }
    function C(a, b, c = 0) {
      let d = [b, ...a];
      return c && d.length > c ? d.slice(0, -1) : d;
    }
    let D = Symbol();
    function E(a, b) {
      return !a.queryFn && b?.initialPromise
        ? () => b.initialPromise
        : a.queryFn && a.queryFn !== D
          ? a.queryFn
          : () => Promise.reject(Error(`Missing queryFn: '${a.queryHash}'`));
    }
    function F(a) {
      return a.state.isPaused;
    }
    function G(a) {
      return 'success' === a.state.status;
    }
    var H = a.i(10368),
      I = class {
        constructor() {
          ((this.listeners = new Set()), (this.subscribe = this.subscribe.bind(this)));
        }
        subscribe(a) {
          return (
            this.listeners.add(a),
            this.onSubscribe(),
            () => {
              (this.listeners.delete(a), this.onUnsubscribe());
            }
          );
        }
        hasListeners() {
          return this.listeners.size > 0;
        }
        onSubscribe() {}
        onUnsubscribe() {}
      };
    let J = new (class extends I {
        #c;
        #d;
        #e;
        constructor() {
          (super(), (this.#e = (a) => {}));
        }
        onSubscribe() {
          this.#d || this.setEventListener(this.#e);
        }
        onUnsubscribe() {
          this.hasListeners() || (this.#d?.(), (this.#d = void 0));
        }
        setEventListener(a) {
          ((this.#e = a),
            this.#d?.(),
            (this.#d = a((a) => {
              'boolean' == typeof a ? this.setFocused(a) : this.onFocus();
            })));
        }
        setFocused(a) {
          this.#c !== a && ((this.#c = a), this.onFocus());
        }
        onFocus() {
          let a = this.isFocused();
          this.listeners.forEach((b) => {
            b(a);
          });
        }
        isFocused() {
          return 'boolean' == typeof this.#c
            ? this.#c
            : globalThis.document?.visibilityState !== 'hidden';
        }
      })(),
      K =
        ((d = []),
        (f = 0),
        (g = (a) => {
          a();
        }),
        (h = (a) => {
          a();
        }),
        (i = function (a) {
          setTimeout(a, 0);
        }),
        {
          batch: (a) => {
            let b;
            f++;
            try {
              b = a();
            } finally {
              let a;
              --f ||
                ((a = d),
                (d = []),
                a.length &&
                  i(() => {
                    h(() => {
                      a.forEach((a) => {
                        g(a);
                      });
                    });
                  }));
            }
            return b;
          },
          batchCalls:
            (a) =>
            (...b) => {
              j(() => {
                a(...b);
              });
            },
          schedule: (j = (a) => {
            f
              ? d.push(a)
              : i(() => {
                  g(a);
                });
          }),
          setNotifyFunction: (a) => {
            g = a;
          },
          setBatchNotifyFunction: (a) => {
            h = a;
          },
          setScheduler: (a) => {
            i = a;
          },
        }),
      L = new (class extends I {
        #f = !0;
        #d;
        #e;
        constructor() {
          (super(), (this.#e = (a) => {}));
        }
        onSubscribe() {
          this.#d || this.setEventListener(this.#e);
        }
        onUnsubscribe() {
          this.hasListeners() || (this.#d?.(), (this.#d = void 0));
        }
        setEventListener(a) {
          ((this.#e = a), this.#d?.(), (this.#d = a(this.setOnline.bind(this))));
        }
        setOnline(a) {
          this.#f !== a &&
            ((this.#f = a),
            this.listeners.forEach((b) => {
              b(a);
            }));
        }
        isOnline() {
          return this.#f;
        }
      })();
    function M(a) {
      return Math.min(1e3 * 2 ** a, 3e4);
    }
    function N(a) {
      return (a ?? 'online') !== 'online' || L.isOnline();
    }
    var O = class extends Error {
      constructor(a) {
        (super('CancelledError'), (this.revert = a?.revert), (this.silent = a?.silent));
      }
    };
    function P(a) {
      let b,
        c,
        d,
        f = !1,
        g = 0,
        h = 'pending',
        i = new Promise((a, b) => {
          ((c = a), (d = b));
        });
      i.catch(q);
      let j = () => J.isFocused() && ('always' === a.networkMode || L.isOnline()) && a.canRun(),
        k = () => N(a.networkMode) && a.canRun(),
        l = (a) => {
          'pending' === h && (b?.(), (h = 'resolved'), c(a));
        },
        m = (a) => {
          'pending' === h && (b?.(), (h = 'rejected'), d(a));
        },
        n = () =>
          new Promise((c) => {
            ((b = (a) => {
              ('pending' !== h || j()) && c(a);
            }),
              a.onPause?.());
          }).then(() => {
            ((b = void 0), 'pending' === h && a.onContinue?.());
          }),
        o = () => {
          let b;
          if ('pending' !== h) return;
          let c = 0 === g ? a.initialPromise : void 0;
          try {
            b = c ?? a.fn();
          } catch (a) {
            b = Promise.reject(a);
          }
          Promise.resolve(b)
            .then(l)
            .catch((b) => {
              if ('pending' !== h) return;
              let c = a.retry ?? 0,
                d = a.retryDelay ?? M,
                i = 'function' == typeof d ? d(g, b) : d,
                k =
                  !0 === c ||
                  ('number' == typeof c && g < c) ||
                  ('function' == typeof c && c(g, b));
              f || !k
                ? m(b)
                : (g++,
                  a.onFail?.(g, b),
                  new Promise((a) => {
                    p.setTimeout(a, i);
                  })
                    .then(() => (j() ? void 0 : n()))
                    .then(() => {
                      f ? m(b) : o();
                    }));
            });
        };
      return {
        promise: i,
        status: () => h,
        cancel: (b) => {
          if ('pending' === h) {
            let c = new O(b);
            (m(c), a.onCancel?.(c));
          }
        },
        continue: () => (b?.(), i),
        cancelRetry: () => {
          f = !0;
        },
        continueRetry: () => {
          f = !1;
        },
        canStart: k,
        start: () => (k() ? o() : n().then(o), i),
      };
    }
    var Q = class {
        #g;
        destroy() {
          this.clearGcTimeout();
        }
        scheduleGc() {
          var a;
          (this.clearGcTimeout(),
            'number' == typeof (a = this.gcTime) &&
              a >= 0 &&
              a !== 1 / 0 &&
              (this.#g = p.setTimeout(() => {
                this.optionalRemove();
              }, this.gcTime)));
        }
        updateGcTime(a) {
          this.gcTime = Math.max(this.gcTime || 0, a ?? 1 / 0);
        }
        clearGcTimeout() {
          void 0 !== this.#g && (p.clearTimeout(this.#g), (this.#g = void 0));
        }
      },
      R = class extends Q {
        #h;
        #i;
        #j;
        #k;
        constructor(a) {
          (super(),
            (this.#h = a.client),
            (this.mutationId = a.mutationId),
            (this.#j = a.mutationCache),
            (this.#i = []),
            (this.state = a.state || {
              context: void 0,
              data: void 0,
              error: null,
              failureCount: 0,
              failureReason: null,
              isPaused: !1,
              status: 'idle',
              variables: void 0,
              submittedAt: 0,
            }),
            this.setOptions(a.options),
            this.scheduleGc());
        }
        setOptions(a) {
          ((this.options = a), this.updateGcTime(this.options.gcTime));
        }
        get meta() {
          return this.options.meta;
        }
        addObserver(a) {
          this.#i.includes(a) ||
            (this.#i.push(a),
            this.clearGcTimeout(),
            this.#j.notify({ type: 'observerAdded', mutation: this, observer: a }));
        }
        removeObserver(a) {
          ((this.#i = this.#i.filter((b) => b !== a)),
            this.scheduleGc(),
            this.#j.notify({ type: 'observerRemoved', mutation: this, observer: a }));
        }
        optionalRemove() {
          this.#i.length ||
            ('pending' === this.state.status ? this.scheduleGc() : this.#j.remove(this));
        }
        continue() {
          return (
            this.#k?.continue() ??
            ('pending' === this.state.status
              ? this.execute(this.state.variables)
              : Promise.resolve())
          );
        }
        async execute(a) {
          let b = () => {
              this.#l({ type: 'continue' });
            },
            c = { client: this.#h, meta: this.options.meta, mutationKey: this.options.mutationKey },
            d = (this.#k = P({
              fn: () =>
                this.options.mutationFn
                  ? this.options.mutationFn(a, c)
                  : Promise.reject(Error('No mutationFn found')),
              onFail: (a, b) => {
                this.#l({ type: 'failed', failureCount: a, error: b });
              },
              onPause: () => {
                this.#l({ type: 'pause' });
              },
              onContinue: b,
              retry: this.options.retry ?? 0,
              retryDelay: this.options.retryDelay,
              networkMode: this.options.networkMode,
              canRun: () => this.#j.canRun(this),
            })),
            f = 'pending' === this.state.status,
            g = !d.canStart();
          try {
            if (f) b();
            else {
              (this.#l({ type: 'pending', variables: a, isPaused: g }),
                this.#j.config.onMutate && (await this.#j.config.onMutate(a, this, c)));
              let b = await this.options.onMutate?.(a, c);
              b !== this.state.context &&
                this.#l({ type: 'pending', context: b, variables: a, isPaused: g });
            }
            let h = await d.start();
            return (
              await this.#j.config.onSuccess?.(h, a, this.state.context, this, c),
              await this.options.onSuccess?.(h, a, this.state.context, c),
              await this.#j.config.onSettled?.(
                h,
                null,
                this.state.variables,
                this.state.context,
                this,
                c,
              ),
              await this.options.onSettled?.(h, null, a, this.state.context, c),
              this.#l({ type: 'success', data: h }),
              h
            );
          } catch (b) {
            try {
              await this.#j.config.onError?.(b, a, this.state.context, this, c);
            } catch (a) {
              Promise.reject(a);
            }
            try {
              await this.options.onError?.(b, a, this.state.context, c);
            } catch (a) {
              Promise.reject(a);
            }
            try {
              await this.#j.config.onSettled?.(
                void 0,
                b,
                this.state.variables,
                this.state.context,
                this,
                c,
              );
            } catch (a) {
              Promise.reject(a);
            }
            try {
              await this.options.onSettled?.(void 0, b, a, this.state.context, c);
            } catch (a) {
              Promise.reject(a);
            }
            throw (this.#l({ type: 'error', error: b }), b);
          } finally {
            (this.#k === d && (this.#k = void 0), this.#j.runNext(this));
          }
        }
        #l(a) {
          ((this.state = ((b) => {
            switch (a.type) {
              case 'failed':
                return { ...b, failureCount: a.failureCount, failureReason: a.error };
              case 'pause':
                return { ...b, isPaused: !0 };
              case 'continue':
                return { ...b, isPaused: !1 };
              case 'pending':
                return {
                  ...b,
                  context: a.context,
                  data: void 0,
                  failureCount: 0,
                  failureReason: null,
                  error: null,
                  isPaused: a.isPaused,
                  status: 'pending',
                  variables: a.variables,
                  submittedAt: Date.now(),
                };
              case 'success':
                return {
                  ...b,
                  data: a.data,
                  failureCount: 0,
                  failureReason: null,
                  error: null,
                  status: 'success',
                  isPaused: !1,
                };
              case 'error':
                return {
                  ...b,
                  data: void 0,
                  error: a.error,
                  failureCount: b.failureCount + 1,
                  failureReason: a.error,
                  isPaused: !1,
                  status: 'error',
                };
            }
          })(this.state)),
            K.batch(() => {
              (this.#i.forEach((b) => {
                b.onMutationUpdate(a);
              }),
                this.#j.notify({ mutation: this, type: 'updated', action: a }));
            }));
        }
      },
      S = class extends I {
        #m;
        #n;
        #o;
        constructor(a = {}) {
          (super(), (this.config = a), (this.#m = new Set()), (this.#n = new Map()), (this.#o = 0));
        }
        build(a, b, c) {
          let d = new R({
            client: a,
            mutationCache: this,
            mutationId: ++this.#o,
            options: a.defaultMutationOptions(b),
            state: c,
          });
          return (this.add(d), d);
        }
        add(a) {
          this.#m.add(a);
          let b = T(a);
          if ('string' == typeof b) {
            let c = this.#n.get(b);
            c ? c.push(a) : this.#n.set(b, [a]);
          }
          this.notify({ type: 'added', mutation: a });
        }
        remove(a) {
          if (this.#m.delete(a)) {
            let b = T(a);
            if ('string' == typeof b) {
              let c = this.#n.get(b);
              if (c)
                if (c.length > 1) {
                  let b = c.indexOf(a);
                  -1 !== b && c.splice(b, 1);
                } else c[0] === a && this.#n.delete(b);
            }
          }
          this.notify({ type: 'removed', mutation: a });
        }
        canRun(a) {
          let b = T(a);
          if ('string' != typeof b) return !0;
          {
            let c = this.#n.get(b)?.find((a) => 'pending' === a.state.status);
            return !c || c === a;
          }
        }
        runNext(a) {
          let b = T(a);
          return 'string' == typeof b
            ? (this.#n
                .get(b)
                ?.find((b) => b !== a && b.state.isPaused)
                ?.continue() ?? Promise.resolve())
            : Promise.resolve();
        }
        clear() {
          K.batch(() => {
            (this.#m.forEach((a) => {
              this.notify({ type: 'removed', mutation: a });
            }),
              this.#m.clear(),
              this.#n.clear());
          });
        }
        getAll() {
          return Array.from(this.#m);
        }
        find(a) {
          let b = { exact: !0, ...a };
          return this.getAll().find((a) => t(b, a));
        }
        findAll(a = {}) {
          return this.getAll().filter((b) => t(a, b));
        }
        notify(a) {
          K.batch(() => {
            this.listeners.forEach((b) => {
              b(a);
            });
          });
        }
        resumePausedMutations() {
          let a = this.getAll().filter((a) => a.state.isPaused);
          return K.batch(() => Promise.all(a.map((a) => a.continue().catch(q))));
        }
      };
    function T(a) {
      return a.options.scope?.id;
    }
    function U(a, { pages: b, pageParams: c }) {
      let d = b.length - 1;
      return b.length > 0 ? a.getNextPageParam(b[d], b, c[d], c) : void 0;
    }
    function V(a, { pages: b, pageParams: c }) {
      return b.length > 0 ? a.getPreviousPageParam?.(b[0], b, c[0], c) : void 0;
    }
    var W = class extends Q {
      #p;
      #q;
      #r;
      #s;
      #h;
      #k;
      #t;
      #u;
      constructor(a) {
        (super(),
          (this.#u = !1),
          (this.#t = a.defaultOptions),
          this.setOptions(a.options),
          (this.observers = []),
          (this.#h = a.client),
          (this.#s = this.#h.getQueryCache()),
          (this.queryKey = a.queryKey),
          (this.queryHash = a.queryHash),
          (this.#q = Y(this.options)),
          (this.state = a.state ?? this.#q),
          this.scheduleGc());
      }
      get meta() {
        return this.options.meta;
      }
      get queryType() {
        return this.#p;
      }
      get promise() {
        return this.#k?.promise;
      }
      setOptions(a) {
        if (
          ((this.options = { ...this.#t, ...a }),
          a?._type && (this.#p = a._type),
          this.updateGcTime(this.options.gcTime),
          this.state && void 0 === this.state.data)
        ) {
          let a = Y(this.options);
          void 0 !== a.data && (this.setState(X(a.data, a.dataUpdatedAt)), (this.#q = a));
        }
      }
      optionalRemove() {
        this.observers.length || 'idle' !== this.state.fetchStatus || this.#s.remove(this);
      }
      setData(a, b) {
        var c, d;
        let f =
          ((c = this.state.data),
          'function' == typeof (d = this.options).structuralSharing
            ? d.structuralSharing(c, a)
            : !1 !== d.structuralSharing
              ? (function a(b, c, d = 0) {
                  if (b === c) return b;
                  if (d > 500) return c;
                  let f = y(b) && y(c);
                  if (!f && !(z(b) && z(c))) return c;
                  let g = (f ? b : Object.keys(b)).length,
                    h = f ? c : Object.keys(c),
                    i = h.length,
                    j = f ? Array(i) : {},
                    k = 0;
                  for (let l = 0; l < i; l++) {
                    let i = f ? l : h[l],
                      m = b[i],
                      n = c[i];
                    if (m === n) {
                      ((j[i] = m), (f ? l < g : x.call(b, i)) && k++);
                      continue;
                    }
                    if (null === m || null === n || 'object' != typeof m || 'object' != typeof n) {
                      j[i] = n;
                      continue;
                    }
                    let o = a(m, n, d + 1);
                    ((j[i] = o), o === m && k++);
                  }
                  return g === i && k === g ? b : j;
                })(c, a)
              : a);
        return (
          this.#l({ data: f, type: 'success', dataUpdatedAt: b?.updatedAt, manual: b?.manual }),
          f
        );
      }
      setState(a) {
        this.#l({ type: 'setState', state: a });
      }
      cancel(a) {
        let b = this.#k?.promise;
        return (this.#k?.cancel(a), b ? b.then(q).catch(q) : Promise.resolve());
      }
      destroy() {
        (super.destroy(), this.cancel({ silent: !0 }));
      }
      get resetState() {
        return this.#q;
      }
      reset() {
        (this.destroy(), this.setState(this.resetState));
      }
      isActive() {
        return this.observers.some((a) => !1 !== r(a.options.enabled, this));
      }
      isDisabled() {
        return this.getObserversCount() > 0
          ? !this.isActive()
          : this.options.queryFn === D || !this.isFetched();
      }
      isFetched() {
        return this.state.dataUpdateCount + this.state.errorUpdateCount > 0;
      }
      isStatic() {
        return (
          this.getObserversCount() > 0 &&
          this.observers.some((a) => 'static' === r(a.options.staleTime, this))
        );
      }
      isStale() {
        return this.getObserversCount() > 0
          ? this.observers.some((a) => a.getCurrentResult().isStale)
          : void 0 === this.state.data || this.state.isInvalidated;
      }
      isStaleByTime(a = 0) {
        return (
          void 0 === this.state.data ||
          ('static' !== a &&
            (!!this.state.isInvalidated ||
              !Math.max(this.state.dataUpdatedAt + (a || 0) - Date.now(), 0)))
        );
      }
      onFocus() {
        (this.observers.find((a) => a.shouldFetchOnWindowFocus())?.refetch({ cancelRefetch: !1 }),
          this.#k?.continue());
      }
      onOnline() {
        (this.observers.find((a) => a.shouldFetchOnReconnect())?.refetch({ cancelRefetch: !1 }),
          this.#k?.continue());
      }
      addObserver(a) {
        this.observers.includes(a) ||
          (this.observers.push(a),
          this.clearGcTimeout(),
          this.#s.notify({ type: 'observerAdded', query: this, observer: a }));
      }
      removeObserver(a) {
        let b = this.observers.indexOf(a);
        -1 !== b &&
          (this.observers.splice(b, 1),
          this.observers.length ||
            (this.#k &&
              (this.#u || ('paused' === this.state.fetchStatus && 'pending' === this.state.status)
                ? this.#k.cancel({ revert: !0 })
                : this.#k.cancelRetry()),
            this.scheduleGc()),
          this.#s.notify({ type: 'observerRemoved', query: this, observer: a }));
      }
      getObserversCount() {
        return this.observers.length;
      }
      invalidate() {
        this.state.isInvalidated || this.#l({ type: 'invalidate' });
      }
      async fetch(a, b) {
        var c;
        let d;
        if ('idle' !== this.state.fetchStatus && this.#k?.status() !== 'rejected') {
          if (void 0 !== this.state.data && b?.cancelRefetch) this.cancel({ silent: !0 });
          else if (this.#k) return (this.#k.continueRetry(), this.#k.promise);
        }
        if ((a && this.setOptions(a), !this.options.queryFn)) {
          let a = this.observers.find((a) => a.options.queryFn);
          a && this.setOptions(a.options);
        }
        let f = new AbortController(),
          g = (a) => {
            Object.defineProperty(a, 'signal', {
              enumerable: !0,
              get: () => ((this.#u = !0), f.signal),
            });
          },
          h = () => {
            let a,
              c = E(this.options, b),
              d = (g((a = { client: this.#h, queryKey: this.queryKey, meta: this.meta })), a);
            return ((this.#u = !1), this.options.persister)
              ? this.options.persister(c, d, this)
              : c(d);
          },
          i =
            (g(
              (d = {
                fetchOptions: b,
                options: this.options,
                queryKey: this.queryKey,
                client: this.#h,
                state: this.state,
                fetchFn: h,
              }),
            ),
            d);
        (('infinite' === this.#p
          ? ((c = this.options.pages),
            {
              onFetch: (a, b) => {
                let d = a.options,
                  f = a.fetchOptions?.meta?.fetchMore?.direction,
                  g = a.state.data?.pages || [],
                  h = a.state.data?.pageParams || [],
                  i = { pages: [], pageParams: [] },
                  j = 0,
                  k = async () => {
                    let b = !1,
                      k = E(a.options, a.fetchOptions),
                      l = async (c, d, f) => {
                        if (b) return Promise.reject(a.signal.reason);
                        if (null == d && c.pages.length) return Promise.resolve(c);
                        let g = (() => {
                            var c, g;
                            let h,
                              i,
                              j = {
                                client: a.client,
                                queryKey: a.queryKey,
                                pageParam: d,
                                direction: f ? 'backward' : 'forward',
                                meta: a.options.meta,
                              };
                            return (
                              (c = () => a.signal),
                              (g = () => (b = !0)),
                              (i = !1),
                              Object.defineProperty(j, 'signal', {
                                enumerable: !0,
                                get: () => (
                                  (h ??= c()),
                                  i ||
                                    ((i = !0),
                                    h.aborted ? g() : h.addEventListener('abort', g, { once: !0 })),
                                  h
                                ),
                              }),
                              j
                            );
                          })(),
                          h = await k(g),
                          { maxPages: i } = a.options,
                          j = f ? C : B;
                        return { pages: j(c.pages, h, i), pageParams: j(c.pageParams, d, i) };
                      };
                    if (f && g.length) {
                      let a = 'backward' === f,
                        b = a ? V : U,
                        c = { pages: g, pageParams: h };
                      i = await l(c, b(d, c), a);
                    } else {
                      let a = c ?? g.length;
                      do {
                        let a = 0 === j ? (h[0] ?? d.initialPageParam) : U(d, i);
                        if (j > 0 && null == a) break;
                        ((i = await l(i, a)), j++);
                      } while (j < a);
                    }
                    return i;
                  };
                a.options.persister
                  ? (a.fetchFn = () =>
                      a.options.persister?.(
                        k,
                        {
                          client: a.client,
                          queryKey: a.queryKey,
                          meta: a.options.meta,
                          signal: a.signal,
                        },
                        b,
                      ))
                  : (a.fetchFn = k);
              },
            })
          : this.options.behavior
        )?.onFetch(i, this),
          (this.#r = this.state),
          ('idle' === this.state.fetchStatus || this.state.fetchMeta !== i.fetchOptions?.meta) &&
            this.#l({ type: 'fetch', meta: i.fetchOptions?.meta }));
        let j = (this.#k = P({
          initialPromise: b?.initialPromise,
          fn: i.fetchFn,
          onCancel: (a) => {
            (a instanceof O && a.revert && this.setState({ ...this.#r, fetchStatus: 'idle' }),
              f.abort());
          },
          onFail: (a, b) => {
            this.#l({ type: 'failed', failureCount: a, error: b });
          },
          onPause: () => {
            this.#l({ type: 'pause' });
          },
          onContinue: () => {
            this.#l({ type: 'continue' });
          },
          retry: i.options.retry,
          retryDelay: i.options.retryDelay,
          networkMode: i.options.networkMode,
          canRun: () => !0,
        }));
        try {
          let a = await j.start();
          if (void 0 === a) throw Error(`${this.queryHash} data is undefined`);
          return (
            this.setData(a),
            this.#s.config.onSuccess?.(a, this),
            this.#s.config.onSettled?.(a, this.state.error, this),
            a
          );
        } catch (a) {
          if (a instanceof O) {
            if (a.silent) return this.#k.promise;
            else if (a.revert) {
              if (void 0 === this.state.data) throw a;
              return this.state.data;
            }
          }
          throw (
            this.#l({ type: 'error', error: a }),
            this.#s.config.onError?.(a, this),
            this.#s.config.onSettled?.(this.state.data, a, this),
            a
          );
        } finally {
          (this.#k === j && (this.#k = void 0), this.scheduleGc());
        }
      }
      #l(a) {
        let b = (b) => {
          switch (a.type) {
            case 'failed':
              return { ...b, fetchFailureCount: a.failureCount, fetchFailureReason: a.error };
            case 'pause':
              return { ...b, fetchStatus: 'paused' };
            case 'continue':
              return { ...b, fetchStatus: 'fetching' };
            case 'fetch':
              var c;
              return {
                ...b,
                ...((c = b.data),
                {
                  fetchFailureCount: 0,
                  fetchFailureReason: null,
                  fetchStatus: N(this.options.networkMode) ? 'fetching' : 'paused',
                  ...(void 0 === c && { error: null, status: 'pending' }),
                }),
                fetchMeta: a.meta ?? null,
              };
            case 'success':
              let d = {
                ...b,
                ...X(a.data, a.dataUpdatedAt),
                dataUpdateCount: b.dataUpdateCount + 1,
                ...(!a.manual && {
                  fetchStatus: 'idle',
                  fetchFailureCount: 0,
                  fetchFailureReason: null,
                }),
              };
              return ((this.#r = a.manual ? d : void 0), d);
            case 'error':
              let f = a.error;
              return {
                ...b,
                error: f,
                errorUpdateCount: b.errorUpdateCount + 1,
                errorUpdatedAt: Date.now(),
                fetchFailureCount: b.fetchFailureCount + 1,
                fetchFailureReason: f,
                fetchStatus: 'idle',
                status: 'error',
                isInvalidated: !0,
              };
            case 'invalidate':
              return { ...b, isInvalidated: !0 };
            case 'setState':
              return { ...b, ...a.state };
          }
        };
        ((this.state = b(this.state)),
          K.batch(() => {
            (this.observers.slice().forEach((a) => {
              a.onQueryUpdate();
            }),
              this.#s.notify({ query: this, type: 'updated', action: a }));
          }));
      }
    };
    function X(a, b) {
      return {
        data: a,
        dataUpdatedAt: b ?? Date.now(),
        error: null,
        isInvalidated: !1,
        status: 'success',
      };
    }
    function Y(a) {
      let b = 'function' == typeof a.initialData ? a.initialData() : a.initialData,
        c = void 0 !== b,
        d = c
          ? 'function' == typeof a.initialDataUpdatedAt
            ? a.initialDataUpdatedAt()
            : a.initialDataUpdatedAt
          : 0;
      return {
        data: b,
        dataUpdateCount: 0,
        dataUpdatedAt: c ? (d ?? Date.now()) : 0,
        error: null,
        errorUpdateCount: 0,
        errorUpdatedAt: 0,
        fetchFailureCount: 0,
        fetchFailureReason: null,
        fetchMeta: null,
        isInvalidated: !1,
        status: c ? 'success' : 'pending',
        fetchStatus: 'idle',
      };
    }
    var Z = class extends I {
        #v;
        constructor(a = {}) {
          (super(), (this.config = a), (this.#v = new Map()));
        }
        build(a, b, c) {
          let d = b.queryKey,
            f = b.queryHash ?? u(d, b),
            g = this.get(f);
          return (
            g ||
              ((g = new W({
                client: a,
                queryKey: d,
                queryHash: f,
                options: a.defaultQueryOptions(b),
                state: c,
                defaultOptions: a.getQueryDefaults(d),
              })),
              this.add(g)),
            g
          );
        }
        add(a) {
          this.#v.has(a.queryHash) ||
            (this.#v.set(a.queryHash, a), this.notify({ type: 'added', query: a }));
        }
        remove(a) {
          this.#v.get(a.queryHash) === a &&
            (a.destroy(), this.#v.delete(a.queryHash), this.notify({ type: 'removed', query: a }));
        }
        clear() {
          K.batch(() => {
            this.getAll().forEach((a) => {
              this.remove(a);
            });
          });
        }
        get(a) {
          return this.#v.get(a);
        }
        getAll() {
          return [...this.#v.values()];
        }
        find(a) {
          let b = { exact: !0, ...a };
          return this.getAll().find((a) => s(b, a));
        }
        findAll(a = {}) {
          let b = this.getAll();
          return Object.keys(a).length > 0 ? b.filter((b) => s(a, b)) : b;
        }
        notify(a) {
          K.batch(() => {
            this.listeners.forEach((b) => {
              b(a);
            });
          });
        }
        onFocus() {
          K.batch(() => {
            this.getAll().forEach((a) => {
              a.onFocus();
            });
          });
        }
        onOnline() {
          K.batch(() => {
            this.getAll().forEach((a) => {
              a.onOnline();
            });
          });
        }
      },
      $ = class {
        #w;
        #j;
        #t;
        #x;
        #y;
        #z;
        #A;
        #B;
        constructor(a = {}) {
          ((this.#w = a.queryCache || new Z()),
            (this.#j = a.mutationCache || new S()),
            (this.#t = a.defaultOptions || {}),
            (this.#x = new Map()),
            (this.#y = new Map()),
            (this.#z = 0));
        }
        mount() {
          (this.#z++,
            1 === this.#z &&
              ((this.#A = J.subscribe(async (a) => {
                a && (await this.resumePausedMutations(), this.#w.onFocus());
              })),
              (this.#B = L.subscribe(async (a) => {
                a && (await this.resumePausedMutations(), this.#w.onOnline());
              }))));
        }
        unmount() {
          (this.#z--,
            0 === this.#z && (this.#A?.(), (this.#A = void 0), this.#B?.(), (this.#B = void 0)));
        }
        isFetching(a) {
          return this.#w.findAll({ ...a, fetchStatus: 'fetching' }).length;
        }
        isMutating(a) {
          return this.#j.findAll({ ...a, status: 'pending' }).length;
        }
        getQueryData(a) {
          let b = this.defaultQueryOptions({ queryKey: a });
          return this.#w.get(b.queryHash)?.state.data;
        }
        ensureQueryData(a) {
          let b = this.defaultQueryOptions(a),
            c = this.#w.build(this, b),
            d = c.state.data;
          return void 0 === d
            ? this.fetchQuery(a)
            : (a.revalidateIfStale && c.isStaleByTime(r(b.staleTime, c)) && this.prefetchQuery(b),
              Promise.resolve(d));
        }
        getQueriesData(a) {
          return this.#w.findAll(a).map(({ queryKey: a, state: b }) => [a, b.data]);
        }
        setQueryData(a, b, c) {
          let d = this.defaultQueryOptions({ queryKey: a }),
            f = this.#w.get(d.queryHash)?.state.data,
            g = 'function' == typeof b ? b(f) : b;
          if (void 0 !== g) return this.#w.build(this, d).setData(g, { ...c, manual: !0 });
        }
        setQueriesData(a, b, c) {
          return K.batch(() =>
            this.#w.findAll(a).map(({ queryKey: a }) => [a, this.setQueryData(a, b, c)]),
          );
        }
        getQueryState(a) {
          let b = this.defaultQueryOptions({ queryKey: a });
          return this.#w.get(b.queryHash)?.state;
        }
        removeQueries(a) {
          let b = this.#w;
          K.batch(() => {
            b.findAll(a).forEach((a) => {
              b.remove(a);
            });
          });
        }
        resetQueries(a, b) {
          let c = this.#w;
          return K.batch(() => {
            let d = c.findAll(a),
              f = new Set(d);
            return (
              d.forEach((a) => {
                a.reset();
              }),
              this.refetchQueries({ type: 'active', predicate: (a) => f.has(a) }, b)
            );
          });
        }
        cancelQueries(a, b = {}) {
          let c = { revert: !0, ...b };
          return Promise.all(K.batch(() => this.#w.findAll(a).map((a) => a.cancel(c))))
            .then(q)
            .catch(q);
        }
        invalidateQueries(a, b = {}) {
          return K.batch(() =>
            (this.#w.findAll(a).forEach((a) => {
              a.invalidate();
            }),
            a?.refetchType === 'none')
              ? Promise.resolve()
              : this.refetchQueries({ ...a, type: a?.refetchType ?? a?.type ?? 'active' }, b),
          );
        }
        refetchQueries(a, b = {}) {
          let c = { ...b, cancelRefetch: b.cancelRefetch ?? !0 };
          return Promise.all(
            K.batch(() =>
              this.#w
                .findAll(a)
                .filter((a) => !a.isDisabled() && !a.isStatic())
                .map((a) => {
                  let b = a.fetch(void 0, c);
                  return (
                    c.throwOnError || (b = b.catch(q)),
                    'paused' === a.state.fetchStatus ? Promise.resolve() : b
                  );
                }),
            ),
          ).then(q);
        }
        async query(a) {
          let b = this.defaultQueryOptions(a);
          void 0 === b.retry && (b.retry = !1);
          let c = this.#w.build(this, b),
            d = c.isStaleByTime(r(b.staleTime, c)) ? await c.fetch(b) : c.state.data,
            f = b.select;
          return f ? f(d) : d;
        }
        fetchQuery(a) {
          let b = this.defaultQueryOptions(a);
          void 0 === b.retry && (b.retry = !1);
          let c = this.#w.build(this, b);
          return c.isStaleByTime(r(b.staleTime, c)) ? c.fetch(b) : Promise.resolve(c.state.data);
        }
        prefetchQuery(a) {
          return this.fetchQuery(a).then(q).catch(q);
        }
        infiniteQuery(a) {
          return ((a._type = 'infinite'), this.query(a));
        }
        fetchInfiniteQuery(a) {
          return ((a._type = 'infinite'), this.fetchQuery(a));
        }
        prefetchInfiniteQuery(a) {
          return this.fetchInfiniteQuery(a).then(q).catch(q);
        }
        ensureInfiniteQueryData(a) {
          return ((a._type = 'infinite'), this.ensureQueryData(a));
        }
        resumePausedMutations() {
          return L.isOnline() ? this.#j.resumePausedMutations() : Promise.resolve();
        }
        getQueryCache() {
          return this.#w;
        }
        getMutationCache() {
          return this.#j;
        }
        getDefaultOptions() {
          return this.#t;
        }
        setDefaultOptions(a) {
          this.#t = a;
        }
        setQueryDefaults(a, b) {
          this.#x.set(v(a), { queryKey: a, defaultOptions: b });
        }
        getQueryDefaults(a) {
          let b = [...this.#x.values()],
            c = {};
          return (
            b.forEach((b) => {
              w(a, b.queryKey) && Object.assign(c, b.defaultOptions);
            }),
            c
          );
        }
        setMutationDefaults(a, b) {
          this.#y.set(v(a), { mutationKey: a, defaultOptions: b });
        }
        getMutationDefaults(a) {
          let b = [...this.#y.values()],
            c = {};
          return (
            b.forEach((b) => {
              w(a, b.mutationKey) && Object.assign(c, b.defaultOptions);
            }),
            c
          );
        }
        defaultQueryOptions(a) {
          if (a._defaulted) return a;
          let b = {
            ...this.#t.queries,
            ...this.getQueryDefaults(a.queryKey),
            ...a,
            _defaulted: !0,
          };
          return (
            b.queryHash || (b.queryHash = u(b.queryKey, b)),
            void 0 === b.refetchOnReconnect && (b.refetchOnReconnect = 'always' !== b.networkMode),
            void 0 === b.throwOnError && (b.throwOnError = !!b.suspense),
            !b.networkMode && b.persister && (b.networkMode = 'offlineFirst'),
            b.queryFn === D && (b.enabled = !1),
            b
          );
        }
        defaultMutationOptions(a) {
          return a?._defaulted
            ? a
            : {
                ...this.#t.mutations,
                ...(a?.mutationKey && this.getMutationDefaults(a.mutationKey)),
                ...a,
                _defaulted: !0,
              };
        }
        clear() {
          (this.#w.clear(), this.#j.clear());
        }
      },
      _ = a.i(62360),
      aa = a.i(1677);
    function ab(a) {
      return a;
    }
    function ac(a) {
      return a;
    }
    function ad() {
      return (a) => a;
    }
    function ae(a) {}
    function af(a) {
      throw Error('Unexpected value in exhaustive check');
    }
    function ag(a) {}
    function ah(a) {
      let b = Object.values(a).filter((a) => 'number' == typeof a);
      return Object.entries(a)
        .filter(([a, c]) => -1 === b.indexOf(+a))
        .map(([a, b]) => b);
    }
    function ai(a, b = '|') {
      return a.map((a) => aS(a)).join(b);
    }
    function aj(a, b) {
      return 'bigint' == typeof b ? b.toString() : b;
    }
    (a.s([], 72533), a.i(72533), a.s([], 22579), a.i(22579));
    class ak {
      constructor(a) {
        ((this._getter = a), (this._value = void 0));
      }
      get value() {
        let a = this._getter;
        return (void 0 !== a && ((this._value = a()), (this._getter = void 0)), this._value);
      }
    }
    function al(a) {
      return new ak(a);
    }
    function am(a) {
      return null == a;
    }
    function an(a) {
      let b = +!!a.startsWith('^'),
        c = a.endsWith('$') ? a.length - 1 : a.length;
      return a.slice(b, c);
    }
    function ao(a, b) {
      let c = a / b,
        d = Math.round(c),
        f = 4 * Number.EPSILON * Math.max(Math.abs(c), 1);
      return Math.abs(c - d) < f ? 0 : c - d;
    }
    let ap = Symbol('evaluating');
    function aq(a, b, c) {
      let d;
      Object.defineProperty(a, b, {
        get() {
          if (d !== ap) return (void 0 === d && ((d = ap), (d = c())), d);
        },
        set(c) {
          Object.defineProperty(a, b, { value: c });
        },
        configurable: !0,
      });
    }
    function ar(a) {
      return Object.create(Object.getPrototypeOf(a), Object.getOwnPropertyDescriptors(a));
    }
    function as(a, b, c) {
      Object.defineProperty(a, b, { value: c, writable: !0, enumerable: !0, configurable: !0 });
    }
    function at(a) {
      let b = Object.getOwnPropertyDescriptor(a, 'shape');
      return b?.get ? b.get.raw : b?.value;
    }
    function au(a) {
      return at(a._zod.def) ?? a._zod.def.shape;
    }
    function av(a, b, c) {
      Object.defineProperty(a, b, {
        get() {
          let a = c();
          return (as(this, b, a), a);
        },
        enumerable: !0,
        configurable: !0,
      });
    }
    function aw(a, b, c) {
      b in a ? as(a, b, c) : (a[b] = c);
    }
    function ax(a, b, c, d) {
      let f = au(b);
      for (let g of c) {
        let c = Object.getOwnPropertyDescriptor(f, g);
        c.enumerable &&
          (c.get
            ? av(a, g, () => {
                let a = b._zod.def.shape[g];
                return d ? d(a, g) : a;
              })
            : aw(a, g, d ? d(c.value, g) : c.value));
      }
    }
    function ay(...a) {
      let b = {};
      for (let c of a) Object.assign(b, Object.getOwnPropertyDescriptors(c));
      return Object.defineProperties({}, b);
    }
    function az(a) {
      return ay(a._zod.def);
    }
    function aA(a, b) {
      return b ? b.reduce((a, b) => a?.[b], a) : a;
    }
    function aB(a) {
      let b = Object.keys(a);
      return Promise.all(b.map((b) => a[b])).then((a) => {
        let c = {};
        for (let d = 0; d < b.length; d++) c[b[d]] = a[d];
        return c;
      });
    }
    function aC(a = 10) {
      let b = 'abcdefghijklmnopqrstuvwxyz',
        c = '';
      for (let d = 0; d < a; d++) c += b[Math.floor(Math.random() * b.length)];
      return c;
    }
    function aD(a) {
      return JSON.stringify(a);
    }
    function aE(a) {
      return a
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }
    let aF = 'captureStackTrace' in Error ? Error.captureStackTrace : (...a) => {};
    function aG(a) {
      return 'object' == typeof a && null !== a && !Array.isArray(a);
    }
    let aH = al(() => {
      if (bE.jitless || ('u' > typeof navigator && navigator?.userAgent?.includes('Cloudflare')))
        return !1;
      try {
        return (Function(''), !0);
      } catch (a) {
        return !1;
      }
    });
    function aI(a) {
      if (!1 === aG(a)) return !1;
      let b = a.constructor;
      if (void 0 === b || 'function' != typeof b) return !0;
      let c = b.prototype;
      return !1 !== aG(c) && !1 !== Object.prototype.hasOwnProperty.call(c, 'isPrototypeOf');
    }
    function aJ(a) {
      return aI(a)
        ? { ...a }
        : Array.isArray(a)
          ? [...a]
          : a instanceof Map
            ? new Map(a)
            : a instanceof Set
              ? new Set(a)
              : a;
    }
    function aK(a) {
      let b = 0;
      for (let c in a) Object.prototype.hasOwnProperty.call(a, c) && b++;
      return b;
    }
    let aL = (a) => {
        let b = typeof a;
        switch (b) {
          case 'undefined':
            return 'undefined';
          case 'string':
            return 'string';
          case 'number':
            return Number.isNaN(a) ? 'nan' : 'number';
          case 'boolean':
            return 'boolean';
          case 'function':
            return 'function';
          case 'bigint':
            return 'bigint';
          case 'symbol':
            return 'symbol';
          case 'object':
            if (Array.isArray(a)) return 'array';
            if (null === a) return 'null';
            if (a.then && 'function' == typeof a.then && a.catch && 'function' == typeof a.catch)
              return 'promise';
            if ('u' > typeof Map && a instanceof Map) return 'map';
            if ('u' > typeof Set && a instanceof Set) return 'set';
            if ('u' > typeof Date && a instanceof Date) return 'date';
            if ('u' > typeof File && a instanceof File) return 'file';
            return 'object';
          default:
            throw Error(`Unknown data type: ${b}`);
        }
      },
      aM = new Set(['string', 'number', 'symbol']),
      aN = new Set(['string', 'number', 'bigint', 'boolean', 'symbol', 'undefined']);
    function aO(a) {
      return a.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    function aP(a, b, c) {
      let d = new a._zod.constr(b ?? a._zod.def);
      return ((!b || c?.parent) && (d._zod.parent = a), d);
    }
    function aQ(a) {
      if (!a) return {};
      if ('string' == typeof a) return { error: () => a };
      if (a?.message !== void 0) {
        if (a?.error !== void 0) throw Error('Cannot specify both `message` and `error` params');
        a.error = a.message;
      }
      return (delete a.message, 'string' == typeof a.error) ? { ...a, error: () => a.error } : a;
    }
    function aR(a) {
      let b;
      return new Proxy(
        {},
        {
          get: (c, d, f) => (b ?? (b = a()), Reflect.get(b, d, f)),
          set: (c, d, f, g) => (b ?? (b = a()), Reflect.set(b, d, f, g)),
          has: (c, d) => (b ?? (b = a()), Reflect.has(b, d)),
          deleteProperty: (c, d) => (b ?? (b = a()), Reflect.deleteProperty(b, d)),
          ownKeys: (c) => (b ?? (b = a()), Reflect.ownKeys(b)),
          getOwnPropertyDescriptor: (c, d) => (
            b ?? (b = a()),
            Reflect.getOwnPropertyDescriptor(b, d)
          ),
          defineProperty: (c, d, f) => (b ?? (b = a()), Reflect.defineProperty(b, d, f)),
        },
      );
    }
    function aS(a) {
      return 'bigint' == typeof a ? a.toString() + 'n' : 'string' == typeof a ? `"${a}"` : `${a}`;
    }
    function aT(a) {
      return Object.keys(a).filter(
        (b) => void 0 !== a[b]._zod.optin && 'optional' === a[b]._zod.optout,
      );
    }
    let aU = {
        safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
        int32: [-0x80000000, 0x7fffffff],
        uint32: [0, 0xffffffff],
        float32: [-34028234663852886e22, 34028234663852886e22],
        float64: [-Number.MAX_VALUE, Number.MAX_VALUE],
      },
      aV = {
        int64: [BigInt('-9223372036854775808'), BigInt('9223372036854775807')],
        uint64: [BigInt(0), BigInt('18446744073709551615')],
      };
    function aW(a, b) {
      let c = a._zod.def,
        d = c.checks;
      if (d && d.length > 0)
        throw Error('.pick() cannot be used on object schemas containing refinements');
      let f = {};
      return (ax(f, a, aX(a, b)), aP(a, ay(c, { shape: f, checks: [] })));
    }
    function aX(a, b) {
      let c = au(a),
        d = [];
      for (let a of Reflect.ownKeys(b)) {
        if (!Object.getOwnPropertyDescriptor(c, a)?.enumerable)
          throw Error(`Unrecognized key: "${String(a)}"`);
        b[a] && d.push(a);
      }
      return d;
    }
    function aY(a, b) {
      let c = a._zod.def,
        d = c.checks;
      if (d && d.length > 0)
        throw Error('.omit() cannot be used on object schemas containing refinements');
      let f = new Set(aX(a, b)),
        g = {};
      return (
        ax(
          g,
          a,
          Reflect.ownKeys(au(a)).filter((a) => !f.has(a)),
        ),
        aP(a, ay(c, { shape: g, checks: [] }))
      );
    }
    function aZ(a, b) {
      if (!aI(b)) throw Error('Invalid input to extend: expected a plain object');
      let c = a._zod.def.checks;
      if (c && c.length > 0) {
        let c = au(a);
        for (let a of Reflect.ownKeys(b))
          if (void 0 !== Object.getOwnPropertyDescriptor(c, a))
            throw Error(
              'Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.',
            );
      }
      return aP(a, ay(a._zod.def, { shape: a$(a, b) }));
    }
    function a$(a, b) {
      let c = {};
      ax(c, a, Reflect.ownKeys(au(a)));
      for (let a of Reflect.ownKeys(b)) {
        let d = Object.getOwnPropertyDescriptor(b, a);
        d.enumerable && (d.get ? av(c, a, () => b[a]) : aw(c, a, d.value));
      }
      return c;
    }
    function a_(a, b) {
      if (!aI(b)) throw Error('Invalid input to safeExtend: expected a plain object');
      return aP(a, ay(a._zod.def, { shape: a$(a, b) }));
    }
    function a0(a, b) {
      if (!b?._zod?.def)
        throw Error(
          'Invalid input to merge: expected an object schema. To merge a plain shape, use `.extend()`.',
        );
      if (a._zod.def.checks?.length)
        throw Error(
          '.merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.',
        );
      let c = {};
      (ax(c, a, Reflect.ownKeys(au(a))), ax(c, b, Reflect.ownKeys(au(b))));
      let d = ay(a._zod.def, {
        shape: c,
        get catchall() {
          return b._zod.def.catchall;
        },
        checks: b._zod.def.checks ?? [],
      });
      return aP(a, d);
    }
    function a1(a, b, c, d = 'partial') {
      let f = b._zod.def.checks;
      if (f && f.length > 0)
        throw Error(`.${d}() cannot be used on object schemas containing refinements`);
      let g = c ? new Set(aX(b, c)) : void 0,
        h = {};
      return (
        ax(
          h,
          b,
          Reflect.ownKeys(au(b)),
          a && ((b, c) => (g && !g.has(c) ? b : new a({ type: 'optional', innerType: b }))),
        ),
        aP(b, ay(b._zod.def, { shape: h, checks: [] }))
      );
    }
    function a2(a, b, c) {
      let d = c ? new Set(aX(b, c)) : void 0,
        f = {};
      return (
        ax(f, b, Reflect.ownKeys(au(b)), (b, c) =>
          d && !d.has(c) ? b : new a({ type: 'nonoptional', innerType: b }),
        ),
        aP(b, ay(b._zod.def, { shape: f }))
      );
    }
    function a3(a, b = 0) {
      if (!0 === a.aborted) return !0;
      for (let c = b; c < a.issues.length; c++) if (a.issues[c]?.continue !== !0) return !0;
      return !1;
    }
    function a4(a, b = 0) {
      if (!0 === a.aborted) return !0;
      for (let c = b; c < a.issues.length; c++) if (a.issues[c]?.continue === !1) return !0;
      return !1;
    }
    function a5(a, b) {
      return b.map((b) => (b.path ?? (b.path = []), b.path.unshift(a), b));
    }
    function a6(a) {
      return 'string' == typeof a ? a : a?.message;
    }
    function a7(a, b, c) {
      var d;
      for (let f = b; f < a.length; f++) (d = a[f]).schema ?? (d.schema = c);
    }
    function a8(a, b, c) {
      let d = a.inst?._zod?.traits;
      d?.has('$ZodType') &&
        (d.has('$ZodCheck') ? (a.schema ?? (a.schema = a.inst)) : (a.schema = a.inst));
      let f = a.schema !== a.inst ? a.schema?._zod.def?.error : void 0,
        g = a.message
          ? a.message
          : (a6(a.inst?._zod.def?.error?.(a)) ??
            a6(f?.(a)) ??
            a6(b?.error?.(a)) ??
            a6(c.customError?.(a)) ??
            a6(c.localeError?.(a)) ??
            'Invalid input'),
        h = {};
      for (let b of Object.keys(a))
        'inst' !== b &&
          'schema' !== b &&
          'continue' !== b &&
          'input' !== b &&
          '__proto__' !== b &&
          (h[b] = a[b]);
      return (h.path ?? (h.path = []), (h.message = g), b?.reportInput && (h.input = a.input), h);
    }
    function a9(a) {
      return a instanceof Set
        ? 'set'
        : a instanceof Map
          ? 'map'
          : a instanceof File
            ? 'file'
            : 'unknown';
    }
    let ba = /[\uD800-\uDBFF]/;
    function bb(a) {
      let b = a.length;
      if (!ba.test(a)) return b;
      let c = b;
      for (let d = 0; d < b - 1; d++)
        (64512 & a.charCodeAt(d)) == 55296 && (64512 & a.charCodeAt(d + 1)) == 56320 && (c--, d++);
      return c;
    }
    function bc(a) {
      return Array.isArray(a) ? 'array' : 'string' == typeof a ? 'string' : 'unknown';
    }
    function bd(a) {
      let b = typeof a;
      switch (b) {
        case 'number':
          return Number.isNaN(a) ? 'nan' : 'number';
        case 'object':
          if (null === a) return 'null';
          if (Array.isArray(a)) return 'array';
          if (
            a &&
            Object.getPrototypeOf(a) !== Object.prototype &&
            'constructor' in a &&
            a.constructor
          )
            return a.constructor.name;
      }
      return b;
    }
    function be(...a) {
      let [b, c, d] = a;
      return 'string' == typeof b ? { message: b, code: 'custom', input: c, inst: d } : { ...b };
    }
    function bf(a) {
      return Object.entries(a)
        .filter(([a, b]) => Number.isNaN(Number.parseInt(a, 10)))
        .map((a) => a[1]);
    }
    function bg(a) {
      let b = atob(a),
        c = new Uint8Array(b.length);
      for (let a = 0; a < b.length; a++) c[a] = b.charCodeAt(a);
      return c;
    }
    function bh(a) {
      let b = '';
      for (let c = 0; c < a.length; c++) b += String.fromCharCode(a[c]);
      return btoa(b);
    }
    function bi(a) {
      let b = a.replace(/-/g, '+').replace(/_/g, '/'),
        c = '='.repeat((4 - (b.length % 4)) % 4);
      return bg(b + c);
    }
    function bj(a) {
      return bh(a).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    }
    function bk(a) {
      let b = a.replace(/^0x/, '');
      if (b.length % 2 != 0) throw Error('Invalid hex string length');
      let c = new Uint8Array(b.length / 2);
      for (let a = 0; a < b.length; a += 2) c[a / 2] = Number.parseInt(b.slice(a, a + 2), 16);
      return c;
    }
    function bl(a) {
      return Array.from(a)
        .map((a) => a.toString(16).padStart(2, '0'))
        .join('');
    }
    class bm {
      constructor(...a) {}
    }
    function bn(a, b) {
      for (let c in b) {
        let d = Object.getOwnPropertyDescriptor(b, c);
        d.get
          ? Object.defineProperty(a, c, { ...d, enumerable: !1 })
          : (function (a, b, c) {
              Object.defineProperty(a, b, {
                configurable: !0,
                get() {
                  return this == null ? c : bo(this, b, c.bind(this));
                },
                set(a) {
                  bo(this, b, a);
                },
              });
            })(a, c, d.value);
      }
    }
    function bo(a, b, c, d = !0) {
      return (
        Object.defineProperty(a, b, { configurable: !0, writable: !0, enumerable: d, value: c }),
        c
      );
    }
    function bp(a, b, c) {
      return bo(a, b, c, !1);
    }
    function bq(a, b) {
      for (let c in a) {
        let d = a[c];
        Object.defineProperty(b, c, {
          configurable: !0,
          enumerable: !0,
          get() {
            return bo(this, c, d(this));
          },
          set(a) {
            bo(this, c, a);
          },
        });
      }
      return b;
    }
    let br = !1,
      bs = {
        configurable: !0,
        get() {
          br = !0;
        },
      };
    function bt(a, c, d) {
      let f = Object.getPrototypeOf(a._zod);
      if (c in f && b !== a._zod) {
        b = void 0;
        return;
      }
      ((b = a._zod),
        Object.defineProperty(f, c, {
          configurable: !0,
          get() {
            Object.defineProperty(this, c, bs);
            let a = br;
            br = !1;
            try {
              let b = d(this);
              return (
                br
                  ? delete this[c]
                  : Object.defineProperty(this, c, { configurable: !0, writable: !0, value: b }),
                (br = br || a),
                b
              );
            } catch (b) {
              throw (delete this[c], (br = br || a), b);
            }
          },
          set(a) {
            Object.defineProperty(this, c, { configurable: !0, writable: !0, value: a });
          },
        }));
    }
    function bu(a, b, c, d) {
      let f,
        g = b in (f = Object.getPrototypeOf(a)) ? void 0 : f;
      g &&
        Object.defineProperty(g, b, {
          configurable: !0,
          get() {
            let a = { configurable: !0, writable: !0, enumerable: d, value: void 0 };
            return (
              Object.defineProperty(this, b, a),
              (a.value = c(this)),
              Object.defineProperty(this, b, a),
              a.value
            );
          },
          set(a) {
            Object.defineProperty(this, b, {
              configurable: !0,
              writable: !0,
              enumerable: d,
              value: a,
            });
          },
        });
    }
    let bv = '~constantCatch';
    function bw(a) {
      let b = () => a;
      return ((b[bv] = !0), b);
    }
    let bx = Object.freeze({ status: 'aborted' }),
      by = { value: void 0, enumerable: !1 },
      bz = 'captureStackTrace' in Error ? Error : null;
    function bA(a, b, c, d) {
      function f(a) {
        ((this.def = a), (this.constr = k), (this.traits = new Set()));
      }
      f.prototype = {};
      let g = c && new WeakSet();
      function h(d, h) {
        if (d._zod) {
          if (d._zod.traits.has(a)) return;
        } else {
          by.value = new f(h);
          try {
            Object.defineProperty(d, '_zod', by);
          } finally {
            by.value = void 0;
          }
        }
        if ((d._zod.traits.add(a), b(d, h), g)) {
          let a = Object.getPrototypeOf(d),
            b = d._zod.constr.prototype,
            f = a;
          for (; f && f !== b;) f = Object.getPrototypeOf(f);
          let h = f ?? a;
          g.has(h) || (g.add(h), bn(h, c));
        }
        let i = k.prototype;
        for (let a in i)
          Object.prototype.hasOwnProperty.call(i, a) && (a in d || (d[a] = i[a].bind(d)));
      }
      let i = d?.Parent ?? Object;
      class j extends i {}
      function k(a) {
        let b = d?.Parent
          ? (function (a) {
              let b = bz;
              if (b) {
                let c = b.stackTraceLimit;
                if ('number' == typeof c) {
                  try {
                    b.stackTraceLimit = 0;
                  } catch {
                    return ((bz = null), new a());
                  }
                  try {
                    return new a();
                  } finally {
                    b.stackTraceLimit = c;
                  }
                }
              }
              return new a();
            })(j)
          : this;
        h(b, a);
        let c = b._zod.deferred;
        if (c) {
          for (let a of c) a();
          b._zod.deferred = void 0;
        }
        let f = globalThis.__zod_globalConfig?.postProcessor;
        return (f && f(b), b);
      }
      return (
        Object.defineProperty(j, 'name', { value: a }),
        Object.defineProperty(k, 'init', { value: h }),
        Object.defineProperty(k, Symbol.hasInstance, {
          value: (b) => (!!d?.Parent && b instanceof d.Parent) || b?._zod?.traits?.has(a),
        }),
        Object.defineProperty(k, 'name', { value: a }),
        k
      );
    }
    let bB = Symbol('zod_brand');
    class bC extends Error {
      constructor() {
        super('Encountered Promise during synchronous parse. Use .parseAsync() instead.');
      }
    }
    class bD extends Error {
      constructor(a) {
        (super(`Encountered unidirectional transform during encode: ${a}`),
          (this.name = 'ZodEncodeError'));
      }
    }
    (k = globalThis).__zod_globalConfig ?? (k.__zod_globalConfig = {});
    let bE = globalThis.__zod_globalConfig;
    function bF(a) {
      return (a && Object.assign(bE, a), bE);
    }
    a.i(12963);
    let bG = {
        get: function () {
          let a = this._zod;
          return (a.message ?? (a.message = JSON.stringify(a.def, aj, 2)), a.message);
        },
        set: function (a) {
          this._zod.message = a;
        },
        enumerable: !0,
        configurable: !0,
      },
      bH = { value: void 0, enumerable: !1 },
      bI = new WeakSet([Object.prototype, Error.prototype]),
      bJ = (a, b) => {
        ((a.name = '$ZodError'),
          (bH.value = b),
          Object.defineProperty(a, 'issues', bH),
          (bH.value = void 0),
          Object.defineProperty(a, 'message', bG));
        let c = Object.getPrototypeOf(a);
        bI.has(c) ||
          (bI.add(c),
          Object.defineProperty(c, 'toString', {
            configurable: !0,
            enumerable: !1,
            get() {
              let a = () => this.message;
              return (
                Object.defineProperty(this, 'toString', {
                  value: a,
                  configurable: !0,
                  writable: !0,
                }),
                a
              );
            },
            set(a) {
              Object.defineProperty(this, 'toString', { value: a, configurable: !0, writable: !0 });
            },
          }));
      },
      bK = bA('$ZodError', bJ),
      bL = bA('$ZodError', bJ, void 0, { Parent: Error });
    function bM(a, b = (a) => a.message) {
      let c = {},
        d = [];
      for (let h of a.issues)
        if (h.path.length > 0) {
          var f, g;
          ((f = h.path[0]),
          (g = () => []),
          !Object.prototype.hasOwnProperty.call(c, f) &&
            ('__proto__' === f
              ? Object.defineProperty(c, f, {
                  value: g(),
                  writable: !0,
                  enumerable: !0,
                  configurable: !0,
                })
              : (c[f] = g())),
          c[f]).push(b(h));
        } else d.push(b(h));
      return { formErrors: d, fieldErrors: c };
    }
    function bN(a, b = (a) => a.message) {
      let c = { _errors: [] },
        d = (a, f = []) => {
          for (let g of a.issues)
            if ('invalid_union' === g.code && g.errors.length)
              g.errors.map((a) => d({ issues: a }, [...f, ...g.path]));
            else if ('invalid_key' === g.code) d({ issues: g.issues }, [...f, ...g.path]);
            else if ('invalid_element' === g.code) d({ issues: g.issues }, [...f, ...g.path]);
            else {
              let a = [...f, ...g.path];
              if (0 === a.length) c._errors.push(b(g));
              else {
                let d = c,
                  f = 0;
                for (; f < a.length;) {
                  let c = a[f],
                    h = f === a.length - 1;
                  if ('_errors' === c) {
                    (h && d._errors.push(b(g)), f++);
                    continue;
                  }
                  Object.prototype.hasOwnProperty.call(d, c) ||
                    Object.defineProperty(d, c, {
                      value: { _errors: [] },
                      enumerable: !0,
                      writable: !0,
                      configurable: !0,
                    });
                  let i = d[c];
                  (h && i._errors.push(b(g)), (d = i), f++);
                }
              }
            }
        };
      return (d(a), c);
    }
    function bO(a, b = (a) => a.message) {
      let c = { errors: [] },
        d = (a, f = []) => {
          var g;
          for (let h of a.issues)
            if ('invalid_union' === h.code && h.errors.length)
              h.errors.map((a) => d({ issues: a }, [...f, ...h.path]));
            else if ('invalid_key' === h.code) d({ issues: h.issues }, [...f, ...h.path]);
            else if ('invalid_element' === h.code) d({ issues: h.issues }, [...f, ...h.path]);
            else {
              let a = [...f, ...h.path];
              if (0 === a.length) {
                c.errors.push(b(h));
                continue;
              }
              let d = c,
                i = 0;
              for (; i < a.length;) {
                let c = a[i],
                  f = i === a.length - 1;
                ('string' == typeof c
                  ? (d.properties ?? (d.properties = {}),
                    Object.prototype.hasOwnProperty.call(d.properties, c) ||
                      Object.defineProperty(d.properties, c, {
                        value: { errors: [] },
                        enumerable: !0,
                        writable: !0,
                        configurable: !0,
                      }),
                    (d = d.properties[c]))
                  : (d.items ?? (d.items = []),
                    (g = d.items)[c] ?? (g[c] = { errors: [] }),
                    (d = d.items[c])),
                  f && d.errors.push(b(h)),
                  i++);
              }
            }
        };
      return (d(a), c);
    }
    function bP(a) {
      let b = [];
      for (let c of a.map((a) => ('object' == typeof a ? a.key : a)))
        'number' == typeof c
          ? b.push(`[${c}]`)
          : 'symbol' == typeof c
            ? b.push(`[${JSON.stringify(String(c))}]`)
            : /[^\w$]/.test(c)
              ? b.push(`[${JSON.stringify(c)}]`)
              : (b.length && b.push('.'), b.push(c));
      return b.join('');
    }
    function bQ(a) {
      let b = [];
      for (let c of [...a.issues].sort((a, b) => (a.path ?? []).length - (b.path ?? []).length))
        (b.push(`✖ ${c.message}`), c.path?.length && b.push(`  → at ${bP(c.path)}`));
      return b.join('\n');
    }
    function bR(a, b) {
      return { callee: b?.callee ?? a, Err: b?.Err };
    }
    a.s(
      [
        '$ZodError',
        0,
        bK,
        '$ZodRealError',
        0,
        bL,
        'flattenError',
        0,
        bM,
        'formatError',
        0,
        bN,
        'prettifyError',
        0,
        bQ,
        'toDotPath',
        0,
        bP,
        'treeifyError',
        0,
        bO,
      ],
      76747,
    );
    let bS = (a) => {
        let b = (c, d, f, g) => {
          let h = f ? { ...f, async: !1 } : { async: !1 },
            i = c._zod.run({ value: d, issues: [] }, h);
          if (i instanceof Promise) throw new bC();
          if (i.issues.length) {
            let c = new (g?.Err ?? a)(i.issues.map((a) => a8(a, h, bF())));
            throw (aF(c, g?.callee ?? b), c);
          }
          return i.value;
        };
        return b;
      },
      bT = bS(bL),
      bU = (a) => {
        let b = async (c, d, f, g) => {
          let h = f ? { ...f, async: !0 } : { async: !0 },
            i = c._zod.run({ value: d, issues: [] }, h);
          if ((i instanceof Promise && (i = await i), i.issues.length)) {
            let c = new (g?.Err ?? a)(i.issues.map((a) => a8(a, h, bF())));
            throw (aF(c, g?.callee ?? b), c);
          }
          return i.value;
        };
        return b;
      },
      bV = bU(bL),
      bW = (a) => (b, c, d) => {
        let f = d ? { ...d, async: !1 } : { async: !1 },
          g = b._zod.run({ value: c, issues: [] }, f);
        if (g instanceof Promise) throw new bC();
        return g.issues.length ? bY(a, g.issues, f) : { success: !0, data: g.value };
      },
      bX = bW(bL);
    function bY(a, b, c) {
      let d;
      return {
        success: !1,
        get error() {
          return (d || ((d = new a(b.map((a) => a8(a, c, bF())))), (b = void 0), (c = void 0)), d);
        },
        set error(e) {
          ((d = e), (b = void 0), (c = void 0));
        },
      };
    }
    let bZ = (a) => async (b, c, d) => {
        let f = d ? { ...d, async: !0 } : { async: !0 },
          g = b._zod.run({ value: c, issues: [] }, f);
        return (
          g instanceof Promise && (g = await g),
          g.issues.length ? bY(a, g.issues, f) : { success: !0, data: g.value }
        );
      },
      b$ = bZ(bL),
      b_ = Symbol.for('zod.compile.invalid'),
      b0 = Symbol.for('zod.compile.fallback'),
      b1 = (a, b, c) => {
        let d = a._zod.bag.validator;
        if (void 0 !== d) {
          if (d(b) !== b_) return !0;
          if (!0 === d.definite && void 0 === c) return !1;
        }
        var f = a,
          g = b,
          h = c;
        let i,
          j = h ? { ...h, async: !1, abortEarly: !0 } : { async: !1, abortEarly: !0 },
          k = f._zod.bag.fallbackRun;
        if (
          (k
            ? ((j[b0] = !0), (i = k({ value: g, issues: [] }, j)))
            : (i = f._zod.run({ value: g, issues: [] }, j)),
          i instanceof Promise)
        )
          throw new bC();
        return 0 === i.issues.length;
      },
      b2 = async (a, b, c) => {
        let d = c ? { ...c, async: !0, abortEarly: !0 } : { async: !0, abortEarly: !0 },
          f = a._zod.run({ value: b, issues: [] }, d);
        return (f instanceof Promise && (f = await f), 0 === f.issues.length);
      },
      b3 = (a) => {
        let b = bS(a),
          c = (a, d, f, g) =>
            b(a, d, f ? { ...f, direction: 'backward' } : { direction: 'backward' }, bR(c, g));
        return c;
      },
      b4 = b3(bL),
      b5 = (a) => {
        let b = bS(a),
          c = (a, d, f, g) => b(a, d, f, bR(c, g));
        return c;
      },
      b6 = b5(bL),
      b7 = (a) => {
        let b = bU(a),
          c = async (a, d, f, g) => {
            let h = f ? { ...f, direction: 'backward' } : { direction: 'backward' };
            return await b(a, d, h, bR(c, g));
          };
        return c;
      },
      b8 = b7(bL),
      b9 = (a) => {
        let b = bU(a),
          c = async (a, d, f, g) => await b(a, d, f, bR(c, g));
        return c;
      },
      ca = b9(bL),
      cb = (a) => (b, c, d) => {
        let f = d ? { ...d, direction: 'backward' } : { direction: 'backward' };
        return bW(a)(b, c, f);
      },
      cc = cb(bL),
      cd = (a) => (b, c, d) => bW(a)(b, c, d),
      ce = cd(bL),
      cf = (a) => async (b, c, d) => {
        let f = d ? { ...d, direction: 'backward' } : { direction: 'backward' };
        return bZ(a)(b, c, f);
      },
      cg = cf(bL),
      ch = (a) => async (b, c, d) => bZ(a)(b, c, d),
      ci = ch(bL);
    (a.s(
      [
        '_decode',
        0,
        b5,
        '_decodeAsync',
        0,
        b9,
        '_encode',
        0,
        b3,
        '_encodeAsync',
        0,
        b7,
        '_parse',
        0,
        bS,
        '_parseAsync',
        0,
        bU,
        '_safeDecode',
        0,
        cd,
        '_safeDecodeAsync',
        0,
        ch,
        '_safeEncode',
        0,
        cb,
        '_safeEncodeAsync',
        0,
        cf,
        '_safeParse',
        0,
        bW,
        '_safeParseAsync',
        0,
        bZ,
        'decode',
        0,
        b6,
        'decodeAsync',
        0,
        ca,
        'encode',
        0,
        b4,
        'encodeAsync',
        0,
        b8,
        'parse',
        0,
        bT,
        'parseAsync',
        0,
        bV,
        'safeDecode',
        0,
        ce,
        'safeDecodeAsync',
        0,
        ci,
        'safeEncode',
        0,
        cc,
        'safeEncodeAsync',
        0,
        cg,
        'safeParse',
        0,
        bX,
        'safeParseAsync',
        0,
        b$,
        'validate',
        0,
        b1,
        'validateAsync',
        0,
        b2,
      ],
      13735,
    ),
      a.i(13735),
      a.i(76747));
    let cj = /^[cC][0-9a-z]{6,}$/,
      ck = /^[0-9a-z]+$/,
      cl = /^[0-7][0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{25}$/,
      cm = /^[0-9a-vA-V]{20}$/,
      cn = /^[A-Za-z0-9]{27}$/,
      co = /^[a-zA-Z0-9_-]{21}$/;
    function cp(a) {
      return RegExp(`^[a-zA-Z0-9_-]{${a}}$`);
    }
    let cq =
        /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/,
      cr = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/,
      cs = (a) =>
        a
          ? RegExp(
              `^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${a}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`,
            )
          : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/,
      ct = cs(4),
      cu = cs(6),
      cv = cs(7),
      cw =
        /^(?:[A-Za-z0-9_'+\-]+\.)*[A-Za-z0-9_'+\-]*[A-Za-z0-9_+-]@(?:[A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/,
      cx = /^[^\s@"]{1,64}@[^\s@]{1,255}$/u;
    function cy() {
      return RegExp(
        '^(?=[\\s\\S]*[\\p{Extended_Pictographic}\\p{Regional_Indicator}\\u20E3])[\\p{Extended_Pictographic}\\p{Emoji_Component}]+$',
        'u',
      );
    }
    let cz =
        /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
      cA =
        /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/,
      cB = (a) => {
        let b = aO(a ?? ':');
        return RegExp(`^(?:[0-9A-F]{2}${b}){5}[0-9A-F]{2}$|^(?:[0-9a-f]{2}${b}){5}[0-9a-f]{2}$`);
      },
      cC =
        /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/,
      cD =
        /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
      cE = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/,
      cF = /^(?:[A-Za-z0-9_-]{4})*(?:[A-Za-z0-9_-]{2,3})?$/,
      cG =
        /^(?=.{1,253}\.?$)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[-0-9a-zA-Z]{0,61}[0-9a-zA-Z])?)*\.?$/,
      cH = /^(?=.{1,253}$)([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,63}$/,
      cI = /^https?$/,
      cJ = /^\+[1-9]\d{6,14}$/,
      cK = /^\d(?:[ -]?\d){11,18}$/,
      cL =
        /^(?:AED|AFN|ALL|AMD|AOA|ARS|AUD|AWG|AZN|BAM|BBD|BDT|BHD|BIF|BMD|BND|BOB|BOV|BRL|BSD|BTN|BWP|BYN|BZD|CAD|CDF|CHE|CHF|CHW|CLF|CLP|CNY|COP|COU|CRC|CUP|CVE|CZK|DJF|DKK|DOP|DZD|EGP|ERN|ETB|EUR|FJD|FKP|GBP|GEL|GHS|GIP|GMD|GNF|GTQ|GYD|HKD|HNL|HTG|HUF|IDR|ILS|INR|IQD|IRR|ISK|JMD|JOD|JPY|KES|KGS|KHR|KMF|KPW|KRW|KWD|KYD|KZT|LAK|LBP|LKR|LRD|LSL|LYD|MAD|MDL|MGA|MKD|MMK|MNT|MOP|MRU|MUR|MVR|MWK|MXN|MXV|MYR|MZN|NAD|NGN|NIO|NOK|NPR|NZD|OMR|PAB|PEN|PGK|PHP|PKR|PLN|PYG|QAR|RON|RSD|RUB|RWF|SAR|SBD|SCR|SDG|SEK|SGD|SHP|SLE|SOS|SRD|SSP|STN|SVC|SYP|SZL|THB|TJS|TMT|TND|TOP|TRY|TTD|TWD|TZS|UAH|UGX|USD|USN|UYI|UYU|UYW|UZS|VED|VES|VND|VUV|WST|XAD|XAF|XAG|XAU|XBA|XBB|XBC|XBD|XCD|XCG|XDR|XOF|XPD|XPF|XPT|XSU|XTS|XUA|XXX|YER|ZAR|ZMW|ZWG)$/,
      cM = /^[A-Z]{2}(?!00|01|99)\d{2}[A-Z0-9]{11,30}$/,
      cN =
        '(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))',
      cO = RegExp(`^${cN}$`);
    function cP(a) {
      let b = '(?:[01]\\d|2[0-3]):[0-5]\\d';
      return 'number' == typeof a.precision
        ? -1 === a.precision
          ? `${b}`
          : 0 === a.precision
            ? `${b}:[0-5]\\d`
            : `${b}:[0-5]\\d\\.\\d{${a.precision}}`
        : a.seconds
          ? `${b}:[0-5]\\d(?:\\.\\d+)?`
          : `${b}(?::[0-5]\\d(?:\\.\\d+)?)?`;
    }
    function cQ(a) {
      return RegExp(`^${cP(a)}$`);
    }
    function cR(a) {
      let b = ['Z'];
      a.offset && b.push('([+-](?:[01]\\d|2[0-3]):[0-5]\\d)');
      let c = `${cP({ precision: a.precision, seconds: !0 })}(?:${b.join('|')})`,
        d = a.local ? `${c}|${cP({ precision: a.precision })}` : c;
      return RegExp(`^${cN}T(?:${d})$`);
    }
    let cS = /^[\s\S]{0,}$/,
      cT = (a) => {
        let b = a ? `[\\s\\S]{${a?.minimum ?? 0},${a?.maximum ?? ''}}` : '[\\s\\S]*';
        return RegExp(`^${b}$`);
      },
      cU = /^-?\d+n?$/,
      cV = /^-?\d+$/,
      cW = /^-?\d+(?:\.\d+)?$/,
      cX = /^(?:true|false)$/i,
      cY = /^null$/i,
      cZ = /^undefined$/i,
      c$ = /^[^A-Z]*$/,
      c_ = /^[^a-z]*$/,
      c0 = /^[0-9a-fA-F]*$/;
    function c1(a, b) {
      return RegExp(`^[A-Za-z0-9+/]{${a}}${b}$`);
    }
    function c2(a) {
      return RegExp(`^[A-Za-z0-9_-]{${a}}$`);
    }
    let c3 = c1(22, '=='),
      c4 = c2(22),
      c5 = c1(27, '='),
      c6 = c2(27),
      c7 = c1(43, '='),
      c8 = c2(43),
      c9 = c1(64, ''),
      da = c2(64),
      db = c1(86, '=='),
      dc = c2(86);
    a.s(
      [
        'anyString',
        0,
        cS,
        'base64',
        0,
        cE,
        'base64url',
        0,
        cF,
        'bigint',
        0,
        cU,
        'boolean',
        0,
        cX,
        'browserEmail',
        0,
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        'cidrv4',
        0,
        cC,
        'cidrv6',
        0,
        cD,
        'creditCard',
        0,
        cK,
        'cuid',
        0,
        cj,
        'cuid2',
        0,
        ck,
        'currencyCode',
        0,
        cL,
        'date',
        0,
        cO,
        'datetime',
        0,
        cR,
        'domain',
        0,
        cH,
        'duration',
        0,
        cq,
        'e164',
        0,
        cJ,
        'email',
        0,
        cw,
        'emoji',
        0,
        cy,
        'extendedDuration',
        0,
        /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/,
        'guid',
        0,
        cr,
        'hex',
        0,
        c0,
        'hostname',
        0,
        cG,
        'html5Email',
        0,
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        'httpProtocol',
        0,
        cI,
        'iban',
        0,
        cM,
        'idnEmail',
        0,
        cx,
        'integer',
        0,
        cV,
        'ipv4',
        0,
        cz,
        'ipv6',
        0,
        cA,
        'ksuid',
        0,
        cn,
        'lowercase',
        0,
        c$,
        'mac',
        0,
        cB,
        'md5_base64',
        0,
        c3,
        'md5_base64url',
        0,
        c4,
        'md5_hex',
        0,
        /^[0-9a-fA-F]{32}$/,
        'nanoid',
        0,
        co,
        'nanoidOfLength',
        0,
        cp,
        'null',
        0,
        cY,
        'number',
        0,
        cW,
        'rfc5322Email',
        0,
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'sha1_base64',
        0,
        c5,
        'sha1_base64url',
        0,
        c6,
        'sha1_hex',
        0,
        /^[0-9a-fA-F]{40}$/,
        'sha256_base64',
        0,
        c7,
        'sha256_base64url',
        0,
        c8,
        'sha256_hex',
        0,
        /^[0-9a-fA-F]{64}$/,
        'sha384_base64',
        0,
        c9,
        'sha384_base64url',
        0,
        da,
        'sha384_hex',
        0,
        /^[0-9a-fA-F]{96}$/,
        'sha512_base64',
        0,
        db,
        'sha512_base64url',
        0,
        dc,
        'sha512_hex',
        0,
        /^[0-9a-fA-F]{128}$/,
        'string',
        0,
        cT,
        'time',
        0,
        cQ,
        'ulid',
        0,
        cl,
        'undefined',
        0,
        cZ,
        'unicodeEmail',
        0,
        cx,
        'uppercase',
        0,
        c_,
        'uuid',
        0,
        cs,
        'uuid4',
        0,
        ct,
        'uuid6',
        0,
        cu,
        'uuid7',
        0,
        cv,
        'xid',
        0,
        cm,
      ],
      56218,
    );
    let dd = bA('$ZodCheck', (a, b) => {
        var c;
        (a._zod ?? (a._zod = {}), (a._zod.def = b), (c = a._zod).onattach ?? (c.onattach = []));
      }),
      de = (a) => {
        let b = a.value;
        return !am(b) && void 0 !== b.size;
      },
      df = (a) => {
        let b = a.value;
        return !am(b) && void 0 !== b.length;
      },
      dg = { number: 'number', bigint: 'bigint', object: 'date' },
      dh = bA('$ZodCheckLessThan', (a, b) => {
        dd.init(a, b);
        let c = dg[typeof b.value];
        a._zod.check = (d) => {
          (b.inclusive ? d.value <= b.value : d.value < b.value) ||
            d.issues.push({
              origin: dg[typeof d.value] ?? c,
              code: 'too_big',
              maximum: 'object' == typeof b.value ? b.value.getTime() : b.value,
              input: d.value,
              inclusive: b.inclusive,
              inst: a,
              continue: !b.abort,
            });
        };
      }),
      di = bA('$ZodCheckGreaterThan', (a, b) => {
        dd.init(a, b);
        let c = dg[typeof b.value];
        a._zod.check = (d) => {
          (b.inclusive ? d.value >= b.value : d.value > b.value) ||
            d.issues.push({
              origin: dg[typeof d.value] ?? c,
              code: 'too_small',
              minimum: 'object' == typeof b.value ? b.value.getTime() : b.value,
              input: d.value,
              inclusive: b.inclusive,
              inst: a,
              continue: !b.abort,
            });
        };
      }),
      dj = bA('$ZodCheckMultipleOf', (a, b) => {
        (dd.init(a, b),
          (a._zod.check = (c) => {
            if (typeof c.value != typeof b.value)
              throw Error('Cannot mix number and bigint in multiple_of check.');
            ('bigint' == typeof c.value
              ? b.value !== BigInt(0) && c.value % b.value === BigInt(0)
              : 0 === ao(c.value, b.value)) ||
              c.issues.push({
                origin: typeof c.value,
                code: 'not_multiple_of',
                divisor: b.value,
                input: c.value,
                inst: a,
                continue: !b.abort,
              });
          }));
      }),
      dk = bA('$ZodCheckNumberFormat', (a, b) => {
        (dd.init(a, b), (b.format = b.format || 'float64'));
        let c = b.format?.includes('int'),
          d = c ? 'int' : 'number',
          [f, g] = aU[b.format];
        a._zod.check = (h) => {
          let i = h.value;
          if (c) {
            if (!Number.isInteger(i))
              return void h.issues.push({
                expected: d,
                format: b.format,
                code: 'invalid_type',
                continue: !1,
                input: i,
                inst: a,
              });
            if (!Number.isSafeInteger(i))
              return void (i > 0
                ? h.issues.push({
                    input: i,
                    code: 'too_big',
                    maximum: Number.MAX_SAFE_INTEGER,
                    note: 'Integers must be within the safe integer range.',
                    inst: a,
                    origin: d,
                    inclusive: !0,
                    continue: !b.abort,
                  })
                : h.issues.push({
                    input: i,
                    code: 'too_small',
                    minimum: Number.MIN_SAFE_INTEGER,
                    note: 'Integers must be within the safe integer range.',
                    inst: a,
                    origin: d,
                    inclusive: !0,
                    continue: !b.abort,
                  }));
          }
          (i < f &&
            h.issues.push({
              origin: 'number',
              input: i,
              code: 'too_small',
              minimum: f,
              inclusive: !0,
              inst: a,
              continue: !b.abort,
            }),
            i > g &&
              h.issues.push({
                origin: 'number',
                input: i,
                code: 'too_big',
                maximum: g,
                inclusive: !0,
                inst: a,
                continue: !b.abort,
              }));
        };
      }),
      dl = bA('$ZodCheckBigIntFormat', (a, b) => {
        dd.init(a, b);
        let [c, d] = aV[b.format];
        a._zod.check = (f) => {
          let g = f.value;
          (g < c &&
            f.issues.push({
              origin: 'bigint',
              input: g,
              code: 'too_small',
              minimum: c,
              inclusive: !0,
              inst: a,
              continue: !b.abort,
            }),
            g > d &&
              f.issues.push({
                origin: 'bigint',
                input: g,
                code: 'too_big',
                maximum: d,
                inclusive: !0,
                inst: a,
                continue: !b.abort,
              }));
        };
      }),
      dm = bA('$ZodCheckMaxSize', (a, b) => {
        var c;
        (dd.init(a, b),
          (c = a._zod.def).when ?? (c.when = de),
          (a._zod.check = (c) => {
            let d = c.value;
            d.size <= b.maximum ||
              c.issues.push({
                origin: a9(d),
                code: 'too_big',
                maximum: b.maximum,
                inclusive: !0,
                input: d,
                inst: a,
                continue: !b.abort,
              });
          }));
      }),
      dn = bA('$ZodCheckMinSize', (a, b) => {
        var c;
        (dd.init(a, b),
          (c = a._zod.def).when ?? (c.when = de),
          (a._zod.check = (c) => {
            let d = c.value;
            d.size >= b.minimum ||
              c.issues.push({
                origin: a9(d),
                code: 'too_small',
                minimum: b.minimum,
                inclusive: !0,
                input: d,
                inst: a,
                continue: !b.abort,
              });
          }));
      }),
      dp = bA('$ZodCheckSizeEquals', (a, b) => {
        var c;
        (dd.init(a, b),
          (c = a._zod.def).when ?? (c.when = de),
          (a._zod.check = (c) => {
            let d = c.value,
              f = d.size;
            if (f === b.size) return;
            let g = f > b.size;
            c.issues.push({
              origin: a9(d),
              ...(g
                ? { code: 'too_big', maximum: b.size }
                : { code: 'too_small', minimum: b.size }),
              inclusive: !0,
              exact: !0,
              input: c.value,
              inst: a,
              continue: !b.abort,
            });
          }));
      }),
      dq = bA('$ZodCheckMaxLength', (a, b) => {
        var c;
        (dd.init(a, b),
          (c = a._zod.def).when ?? (c.when = df),
          (a._zod.check = (c) => {
            let d = c.value,
              f = d.length;
            if (('string' == typeof d && f > b.maximum ? bb(d) : f) <= b.maximum) return;
            let g = bc(d);
            c.issues.push({
              origin: g,
              code: 'too_big',
              maximum: b.maximum,
              inclusive: !0,
              input: d,
              inst: a,
              continue: !b.abort,
            });
          }));
      }),
      dr = bA('$ZodCheckMinLength', (a, b) => {
        var c;
        (dd.init(a, b),
          (c = a._zod.def).when ?? (c.when = df),
          (a._zod.check = (c) => {
            let d = c.value,
              f = d.length;
            if (
              ('string' == typeof d && f >= b.minimum && f < 2 * b.minimum ? bb(d) : f) >= b.minimum
            )
              return;
            let g = bc(d);
            c.issues.push({
              origin: g,
              code: 'too_small',
              minimum: b.minimum,
              inclusive: !0,
              input: d,
              inst: a,
              continue: !b.abort,
            });
          }));
      }),
      ds = bA('$ZodCheckLengthEquals', (a, b) => {
        var c;
        (dd.init(a, b),
          (c = a._zod.def).when ?? (c.when = df),
          (a._zod.check = (c) => {
            let d = c.value,
              f = d.length,
              g = 'string' == typeof d && f >= b.length && f <= 2 * b.length ? bb(d) : f;
            if (g === b.length) return;
            let h = bc(d),
              i = g > b.length;
            c.issues.push({
              origin: h,
              ...(i
                ? { code: 'too_big', maximum: b.length }
                : { code: 'too_small', minimum: b.length }),
              inclusive: !0,
              exact: !0,
              input: c.value,
              inst: a,
              continue: !b.abort,
            });
          }));
      }),
      dt = bA('$ZodCheckStringFormat', (a, b) => {
        var c, d;
        (dd.init(a, b),
          b.pattern
            ? ((c = a._zod).check ??
              (c.check = (c) => {
                ((b.pattern.lastIndex = 0),
                  b.pattern.test(c.value) ||
                    c.issues.push({
                      origin: 'string',
                      code: 'invalid_format',
                      format: b.format,
                      input: c.value,
                      ...(b.pattern ? { pattern: b.pattern.toString() } : {}),
                      inst: a,
                      continue: !b.abort,
                    }));
              }))
            : ((d = a._zod).check ?? (d.check = () => {})));
      }),
      du = bA('$ZodCheckRegex', (a, b) => {
        (dt.init(a, b),
          (a._zod.check = (c) => {
            ((b.pattern.lastIndex = 0),
              b.pattern.test(c.value) ||
                c.issues.push({
                  origin: 'string',
                  code: 'invalid_format',
                  format: 'regex',
                  input: c.value,
                  pattern: b.pattern.toString(),
                  inst: a,
                  continue: !b.abort,
                }));
          }));
      }),
      dv = bA('$ZodCheckLowerCase', (a, b) => {
        (b.pattern ?? (b.pattern = c$), dt.init(a, b));
      }),
      dw = bA('$ZodCheckUpperCase', (a, b) => {
        (b.pattern ?? (b.pattern = c_), dt.init(a, b));
      }),
      dx = bA('$ZodCheckIncludes', (a, b) => {
        dd.init(a, b);
        let c = aO(b.includes),
          d = new RegExp('number' == typeof b.position ? `^.{${b.position},}${c}` : c);
        ((b.pattern = d),
          (a._zod.check = (c) => {
            c.value.includes(b.includes, b.position) ||
              c.issues.push({
                origin: 'string',
                code: 'invalid_format',
                format: 'includes',
                includes: b.includes,
                input: c.value,
                inst: a,
                continue: !b.abort,
              });
          }));
      }),
      dy = bA('$ZodCheckStartsWith', (a, b) => {
        dd.init(a, b);
        let c = RegExp(`^${aO(b.prefix)}.*`);
        (b.pattern ?? (b.pattern = c),
          (a._zod.check = (c) => {
            c.value.startsWith(b.prefix) ||
              c.issues.push({
                origin: 'string',
                code: 'invalid_format',
                format: 'starts_with',
                prefix: b.prefix,
                input: c.value,
                inst: a,
                continue: !b.abort,
              });
          }));
      }),
      dz = bA('$ZodCheckEndsWith', (a, b) => {
        dd.init(a, b);
        let c = RegExp(`.*${aO(b.suffix)}$`);
        (b.pattern ?? (b.pattern = c),
          (a._zod.check = (c) => {
            c.value.endsWith(b.suffix) ||
              c.issues.push({
                origin: 'string',
                code: 'invalid_format',
                format: 'ends_with',
                suffix: b.suffix,
                input: c.value,
                inst: a,
                continue: !b.abort,
              });
          }));
      });
    function dA(a, b, c) {
      a.issues.length && b.issues.push(...a5(c, a.issues));
    }
    let dB = bA('$ZodCheckProperty', (a, b) => {
        (dd.init(a, b),
          (a._zod.check = (a) => {
            let c = b.schema._zod.run({ value: a.value[b.property], issues: [] }, {});
            if (c instanceof Promise) return c.then((c) => dA(c, a, b.property));
            dA(c, a, b.property);
          }));
      }),
      dC = bA('$ZodCheckProperties', (a, b) => {
        let c;
        (dd.init(a, b),
          bp(a, Symbol.iterator, function* () {
            yield a;
          }),
          (a._zod.check = (d) => {
            let f;
            if (null == d.value)
              return void d.issues.push({
                expected: 'object',
                code: 'invalid_type',
                input: d.value,
                inst: a,
              });
            c ?? (c = Reflect.ownKeys(b.shape).map((a) => [a, b.shape[a]]));
            let g = d.value;
            for (let [a, b] of c) {
              let c = b._zod.run({ value: g[a], issues: [] }, {});
              c instanceof Promise
                ? (f ?? (f = []), f.push(c.then((b) => dA(b, d, a))))
                : dA(c, d, a);
            }
            if (f) return Promise.all(f).then(() => void 0);
          }));
      }),
      dD = bA('$ZodCheckMimeType', (a, b) => {
        dd.init(a, b);
        let c = new Set(b.mime);
        a._zod.check = (d) => {
          c.has(d.value.type) ||
            d.issues.push({
              code: 'invalid_value',
              values: b.mime,
              input: d.value.type,
              inst: a,
              continue: !b.abort,
            });
        };
      }),
      dE = bA('$ZodCheckOverwrite', (a, b) => {
        (dd.init(a, b),
          (a._zod.check = (a) => {
            a.value = b.tx(a.value);
          }));
      });
    a.s(
      [
        '$ZodCheck',
        0,
        dd,
        '$ZodCheckBigIntFormat',
        0,
        dl,
        '$ZodCheckEndsWith',
        0,
        dz,
        '$ZodCheckGreaterThan',
        0,
        di,
        '$ZodCheckIncludes',
        0,
        dx,
        '$ZodCheckLengthEquals',
        0,
        ds,
        '$ZodCheckLessThan',
        0,
        dh,
        '$ZodCheckLowerCase',
        0,
        dv,
        '$ZodCheckMaxLength',
        0,
        dq,
        '$ZodCheckMaxSize',
        0,
        dm,
        '$ZodCheckMimeType',
        0,
        dD,
        '$ZodCheckMinLength',
        0,
        dr,
        '$ZodCheckMinSize',
        0,
        dn,
        '$ZodCheckMultipleOf',
        0,
        dj,
        '$ZodCheckNumberFormat',
        0,
        dk,
        '$ZodCheckOverwrite',
        0,
        dE,
        '$ZodCheckProperties',
        0,
        dC,
        '$ZodCheckProperty',
        0,
        dB,
        '$ZodCheckRegex',
        0,
        du,
        '$ZodCheckSizeEquals',
        0,
        dp,
        '$ZodCheckStartsWith',
        0,
        dy,
        '$ZodCheckStringFormat',
        0,
        dt,
        '$ZodCheckUpperCase',
        0,
        dw,
      ],
      72144,
    );
    class dF {
      constructor(a = [], b = {}) {
        ((this.content = []), (this.indent = 0), (this.args = a), (this.closed = b));
      }
      indented(a) {
        this.indent += 1;
        try {
          a(this);
        } finally {
          this.indent -= 1;
        }
      }
      write(a) {
        if ('function' == typeof a) {
          (a(this, { execution: 'sync' }), a(this, { execution: 'async' }));
          return;
        }
        let b = a.split('\n').filter((a) => a),
          c = Math.min(...b.map((a) => a.length - a.trimStart().length));
        for (let a of b.map((a) => a.slice(c)).map((a) => ' '.repeat(2 * this.indent) + a))
          this.content.push(a);
      }
      compile() {
        let a = Function,
          b = this?.content ?? [''];
        return new a(
          ...Object.keys(this.closed),
          `return function (${this.args.join(', ')}) {
${b.join('\n')}
};`,
        )(...Object.values(this.closed));
      }
    }
    a.s(['Doc', 0, dF], 57192);
    let dG = { major: 4, minor: 6, patch: 5 };
    a.s(['version', 0, dG], 903);
    let dH = bA(
        '$ZodType',
        (a, b) => {
          var c;
          (a ?? (a = {}), (a._zod.def = b), (a._zod.bag = a._zod.bag || {}), (a._zod.version = dG));
          let d = a._zod.def.checks,
            f = a._zod.traits.has('$ZodCheck') ? [a, ...(d ?? [])] : d?.length ? [...d] : [];
          for (let b of f) for (let c of b._zod.onattach) c(a);
          if (0 === f.length)
            ((c = a._zod).deferred ?? (c.deferred = []),
              a._zod.deferred?.push(() => {
                a._zod.run = a._zod.parse;
              }));
          else {
            let b = (b, c, d) => {
                let f;
                if (b.memo) return b;
                let g = a3(b);
                for (let h of c) {
                  if (h._zod.def.when) {
                    if (a4(b) || !h._zod.def.when(b)) continue;
                  } else if (g) continue;
                  let c = b.issues.length,
                    i = h._zod.check(b);
                  if (i instanceof Promise && d?.async === !1) throw new bC();
                  if (f || i instanceof Promise)
                    f = (f ?? Promise.resolve()).then(async () => {
                      (await i, b.issues.length !== c && (a7(b.issues, c, a), g || (g = a3(b, c))));
                    });
                  else {
                    if (b.issues.length === c) continue;
                    (a7(b.issues, c, a), g || (g = a3(b, c)));
                  }
                }
                return f ? f.then(() => b) : b;
              },
              c = (c, d, g) => {
                if (a3(c)) return ((c.aborted = !0), c);
                let h = b(d, f, g);
                if (h instanceof Promise) {
                  if (!1 === g.async) throw new bC();
                  return h.then((b) => a._zod.parse(b, g));
                }
                return a._zod.parse(h, g);
              };
            a._zod.run = (d, g) => {
              if (g.skipChecks) return a._zod.parse(d, g);
              if ('backward' === g.direction) {
                let b = a._zod.parse({ value: d.value, issues: [] }, { ...g, skipChecks: !0 });
                return b instanceof Promise ? b.then((a) => c(a, d, g)) : c(b, d, g);
              }
              let h = a._zod.parse(d, g);
              if (h instanceof Promise) {
                if (!1 === g.async) throw new bC();
                return h.then((a) => b(a, f, g));
              }
              return b(h, f, g);
            };
          }
        },
        {
          get '~standard'() {
            return bp(this, '~standard', dK(this));
          },
          set '~standard'(value) {
            bo(this, '~standard', value);
          },
        },
      ),
      dI = (a, b) =>
        a.issues.length ? { issues: a.issues.map((a) => a8(a, b, bF())) } : { value: a.value };
    async function dJ(a, b) {
      let c = { async: !0 };
      return dI(await a._zod.run({ value: b, issues: [] }, c), c);
    }
    function dK(a) {
      return {
        validate: (b) => {
          let c = { async: !1 };
          try {
            let d = a._zod.run({ value: b, issues: [] }, c);
            if (!(d instanceof Promise)) return dI(d, c);
          } catch (a) {}
          return dJ(a, b);
        },
        vendor: 'zod',
        version: 1,
      };
    }
    let dL = bA('$ZodString', (a, b) => {
        (dH.init(a, b),
          (a._zod.pattern = b.pattern ?? cS),
          (a._zod.parse = (c, d) => {
            if (b.coerce)
              try {
                c.value = String(c.value);
              } catch (a) {}
            return (
              'string' == typeof c.value ||
                c.issues.push({
                  expected: 'string',
                  code: 'invalid_type',
                  input: c.value,
                  inst: a,
                }),
              c
            );
          }));
      }),
      dM = bA('$ZodStringFormat', (a, b) => {
        (dt.init(a, b), dL.init(a, b));
      }),
      dN = bA('$ZodGUID', (a, b) => {
        (b.pattern ?? (b.pattern = cr), dM.init(a, b));
      }),
      dO = bA('$ZodUUID', (a, b) => {
        if (b.version) {
          let a = { v1: 1, v2: 2, v3: 3, v4: 4, v5: 5, v6: 6, v7: 7, v8: 8 }[b.version];
          if (void 0 === a) throw Error(`Invalid UUID version: "${b.version}"`);
          b.pattern ?? (b.pattern = cs(a));
        } else b.pattern ?? (b.pattern = cs());
        dM.init(a, b);
      }),
      dP = bA('$ZodEmail', (a, b) => {
        (b.pattern ?? (b.pattern = cw), dM.init(a, b));
      });
    function dQ(a) {
      try {
        if ('u' > typeof URL && 'function' == typeof URL.canParse) return URL.canParse(a);
        return (new URL(a), !0);
      } catch {
        return !1;
      }
    }
    function dR(a, b) {
      return 'normalize' in b || 'hostname' in b || 'protocol' in b ? dS(a, b) : dQ(a) || 2;
    }
    function dS(a, b) {
      if (!b.normalize && b.protocol?.source === cI.source && !/^https?:\/\//i.test(a)) return 1;
      try {
        if ('u' > typeof URL) {
          let b = URL;
          if ('function' == typeof b.parse) return b.parse(a) ?? 2;
        }
        return new URL(a);
      } catch {
        return 2;
      }
    }
    let dT = /[\t\n\r]/g;
    function dU(a) {
      return a.replace(dT, '');
    }
    function dV(a, b) {
      return ((b.lastIndex = 0), b.test(a.hostname));
    }
    function dW(a, b) {
      return (
        (b.lastIndex = 0),
        b.test(a.protocol.endsWith(':') ? a.protocol.slice(0, -1) : a.protocol)
      );
    }
    let dX = bA('$ZodURL', (a, b) => {
        (dM.init(a, b),
          (a._zod.check = (c) => {
            try {
              let d = c.value.trim(),
                f = dR(d, b);
              if (1 === f)
                return void c.issues.push({
                  code: 'invalid_format',
                  format: 'url',
                  note: 'Invalid URL format',
                  input: c.value,
                  inst: a,
                  continue: !b.abort,
                });
              if (2 === f)
                return void c.issues.push({
                  code: 'invalid_format',
                  format: 'url',
                  input: c.value,
                  inst: a,
                  continue: !b.abort,
                });
              if (!0 === f) {
                c.value = dU(d);
                return;
              }
              (b.hostname &&
                !dV(f, b.hostname) &&
                c.issues.push({
                  code: 'invalid_format',
                  format: 'url',
                  note: 'Invalid hostname',
                  pattern: b.hostname.source,
                  input: c.value,
                  inst: a,
                  continue: !b.abort,
                }),
                b.protocol &&
                  !dW(f, b.protocol) &&
                  c.issues.push({
                    code: 'invalid_format',
                    format: 'url',
                    note: 'Invalid protocol',
                    pattern: b.protocol.source,
                    input: c.value,
                    inst: a,
                    continue: !b.abort,
                  }),
                (c.value = b.normalize ? f.href : dU(d)));
              return;
            } catch (d) {
              c.issues.push({
                code: 'invalid_format',
                format: 'url',
                input: c.value,
                inst: a,
                continue: !b.abort,
              });
            }
          }));
      }),
      dY = bA('$ZodEmoji', (a, b) => {
        (b.pattern ?? (b.pattern = cy()), dM.init(a, b));
      }),
      dZ = bA('$ZodNanoID', (a, b) => {
        if (void 0 !== b.length && (!Number.isInteger(b.length) || b.length < 1))
          throw Error(`Invalid nanoid length: ${b.length}`);
        (b.pattern ?? (b.pattern = void 0 === b.length ? co : cp(b.length)), dM.init(a, b));
      }),
      d$ = bA('$ZodCUID', (a, b) => {
        (b.pattern ?? (b.pattern = cj), dM.init(a, b));
      }),
      d_ = bA('$ZodCUID2', (a, b) => {
        (b.pattern ?? (b.pattern = ck), dM.init(a, b));
      }),
      d0 = bA('$ZodULID', (a, b) => {
        (b.pattern ?? (b.pattern = cl), dM.init(a, b));
      }),
      d1 = bA('$ZodXID', (a, b) => {
        (b.pattern ?? (b.pattern = cm), dM.init(a, b));
      }),
      d2 = bA('$ZodKSUID', (a, b) => {
        (b.pattern ?? (b.pattern = cn), dM.init(a, b));
      }),
      d3 = bA('$ZodISODateTime', (a, b) => {
        (b.pattern ?? (b.pattern = cR(b)), dM.init(a, b));
      }),
      d4 = bA('$ZodISODate', (a, b) => {
        (b.pattern ?? (b.pattern = cO), dM.init(a, b));
      }),
      d5 = bA('$ZodISOTime', (a, b) => {
        (b.pattern ?? (b.pattern = cQ(b)), dM.init(a, b));
      }),
      d6 = bA('$ZodISODuration', (a, b) => {
        (b.pattern ?? (b.pattern = cq), dM.init(a, b));
      }),
      d7 = bA('$ZodIPv4', (a, b) => {
        (b.pattern ?? (b.pattern = cz), dM.init(a, b));
      }),
      d8 = /^[0-9a-fA-F:.]+$/;
    function d9(a) {
      return !!d8.test(a) && dQ(`http://[${a}]`);
    }
    let ea = bA('$ZodIPv6', (a, b) => {
        (b.pattern ?? (b.pattern = cA),
          dM.init(a, b),
          (a._zod.check = (c) => {
            d9(c.value) ||
              c.issues.push({
                code: 'invalid_format',
                format: 'ipv6',
                input: c.value,
                inst: a,
                continue: !b.abort,
              });
          }));
      }),
      eb = bA('$ZodMAC', (a, b) => {
        (b.pattern ?? (b.pattern = cB(b.delimiter)), dM.init(a, b));
      }),
      ec = bA('$ZodCIDRv4', (a, b) => {
        (b.pattern ?? (b.pattern = cC), dM.init(a, b));
      });
    function ed(a) {
      let b = a.split('/');
      if (2 !== b.length) return !1;
      let [c, d] = b;
      if (!d) return !1;
      let f = Number(d);
      return `${f}` === d && !(f < 0) && !(f > 128) && d9(c);
    }
    let ee = bA('$ZodCIDRv6', (a, b) => {
      (b.pattern ?? (b.pattern = cD),
        dM.init(a, b),
        (a._zod.check = (c) => {
          ed(c.value) ||
            c.issues.push({
              code: 'invalid_format',
              format: 'cidrv6',
              input: c.value,
              inst: a,
              continue: !b.abort,
            });
        }));
    });
    function ef(a) {
      if ('' === a) return !0;
      if (/\s/.test(a) || a.length % 4 != 0) return !1;
      try {
        return (atob(a), !0);
      } catch {
        return !1;
      }
    }
    let eg = /^[0-9a-zA-Z+/]*={0,2}$/,
      eh = bA('$ZodBase64', (a, b) => {
        (b.pattern ?? (b.pattern = eg),
          dM.init(a, b),
          (a._zod.check = (c) => {
            ef(c.value) ||
              c.issues.push({
                code: 'invalid_format',
                format: 'base64',
                input: c.value,
                inst: a,
                continue: !b.abort,
              });
          }));
      }),
      ei = /^[A-Za-z0-9_-]*$/;
    function ej(a) {
      if (!ei.test(a)) return !1;
      let b = a.replace(/[-_]/g, (a) => ('-' === a ? '+' : '/'));
      return ef(b.padEnd(4 * Math.ceil(b.length / 4), '='));
    }
    let ek = bA('$ZodBase64URL', (a, b) => {
        (b.pattern ?? (b.pattern = ei),
          dM.init(a, b),
          (a._zod.check = (c) => {
            ej(c.value) ||
              c.issues.push({
                code: 'invalid_format',
                format: 'base64url',
                input: c.value,
                inst: a,
                continue: !b.abort,
              });
          }));
      }),
      el = bA('$ZodE164', (a, b) => {
        (b.pattern ?? (b.pattern = cJ), dM.init(a, b));
      }),
      em = /[- ]/g;
    function en(a) {
      return (
        !!cK.test(a) &&
        (function (a) {
          let b = a.length,
            c = 1,
            d = 0;
          for (; b;) {
            let f = a.charCodeAt(--b) - 48;
            ((c ^= 1), (d += c ? [0, 2, 4, 6, 8, 1, 3, 5, 7, 9][f] : f));
          }
          return d % 10 == 0;
        })(a.replace(em, ''))
      );
    }
    let eo = bA('$ZodCreditCard', (a, b) => {
      (b.pattern ?? (b.pattern = cK),
        dM.init(a, b),
        (a._zod.check = (c) => {
          en(c.value) ||
            c.issues.push({
              code: 'invalid_format',
              format: 'credit_card',
              input: c.value,
              inst: a,
              continue: !b.abort,
            });
        }));
    });
    function ep(a) {
      return (
        !!cM.test(a) &&
        (function (a) {
          let b = 0,
            c = a.length;
          for (let d = 4; d < c; d++) {
            let c = a.charCodeAt(d);
            b = (c >= 65 ? 100 * b + (c - 55) : 10 * b + (c - 48)) % 97;
          }
          for (let c = 0; c < 4; c++) {
            let d = a.charCodeAt(c);
            b = (d >= 65 ? 100 * b + (d - 55) : 10 * b + (d - 48)) % 97;
          }
          return 1 === b;
        })(a)
      );
    }
    let eq = bA('$ZodIBAN', (a, b) => {
      (b.pattern ?? (b.pattern = cM),
        dM.init(a, b),
        (a._zod.check = (c) => {
          ep(c.value) ||
            c.issues.push({
              code: 'invalid_format',
              format: 'iban',
              input: c.value,
              inst: a,
              continue: !b.abort,
            });
        }));
    });
    function er(a, b = null) {
      try {
        let c = a.split('.');
        if (3 !== c.length) return !1;
        let [d] = c;
        if (!d) return !1;
        let f = JSON.parse(atob(d));
        if (('typ' in f && f?.typ !== 'JWT') || !f.alg || (b && (!('alg' in f) || f.alg !== b)))
          return !1;
        return !0;
      } catch {
        return !1;
      }
    }
    let es = bA('$ZodJWT', (a, b) => {
        (dM.init(a, b),
          (a._zod.check = (c) => {
            er(c.value, b.alg) ||
              c.issues.push({
                code: 'invalid_format',
                format: 'jwt',
                input: c.value,
                inst: a,
                continue: !b.abort,
              });
          }));
      }),
      et = bA('$ZodCustomStringFormat', (a, b) => {
        (dM.init(a, b),
          (a._zod.check = (c) => {
            b.fn(c.value) ||
              c.issues.push({
                code: 'invalid_format',
                format: b.format,
                input: c.value,
                inst: a,
                continue: !b.abort,
              });
          }));
      }),
      eu = bA('$ZodNumber', (a, b) => {
        (dH.init(a, b),
          (a._zod.pattern = cW),
          (a._zod.parse = (c, d) => {
            if (b.coerce)
              try {
                c.value = Number(c.value);
              } catch (a) {}
            let f = c.value;
            if ('number' == typeof f && !Number.isNaN(f) && Number.isFinite(f)) return c;
            let g =
              'number' == typeof f
                ? Number.isNaN(f)
                  ? 'NaN'
                  : Number.isFinite(f)
                    ? void 0
                    : String(f)
                : void 0;
            return (
              c.issues.push({
                expected: 'number',
                code: 'invalid_type',
                input: f,
                inst: a,
                ...(g ? { received: g } : {}),
              }),
              c
            );
          }));
      }),
      ev = bA('$ZodNumberFormat', (a, b) => {
        (dk.init(a, b), eu.init(a, b));
      }),
      ew = bA('$ZodBoolean', (a, b) => {
        (dH.init(a, b),
          (a._zod.pattern = cX),
          (a._zod.parse = (c, d) => {
            if (b.coerce)
              try {
                c.value = !!c.value;
              } catch (a) {}
            let f = c.value;
            return (
              'boolean' == typeof f ||
                c.issues.push({ expected: 'boolean', code: 'invalid_type', input: f, inst: a }),
              c
            );
          }));
      }),
      ex = bA('$ZodBigInt', (a, b) => {
        (dH.init(a, b),
          (a._zod.pattern = cU),
          (a._zod.parse = (c, d) => {
            if (b.coerce)
              try {
                c.value = BigInt(c.value);
              } catch (a) {}
            return (
              'bigint' == typeof c.value ||
                c.issues.push({
                  expected: 'bigint',
                  code: 'invalid_type',
                  input: c.value,
                  inst: a,
                }),
              c
            );
          }));
      }),
      ey = bA('$ZodBigIntFormat', (a, b) => {
        (dl.init(a, b), ex.init(a, b));
      }),
      ez = bA('$ZodSymbol', (a, b) => {
        (dH.init(a, b),
          (a._zod.parse = (b, c) => {
            let d = b.value;
            return (
              'symbol' == typeof d ||
                b.issues.push({ expected: 'symbol', code: 'invalid_type', input: d, inst: a }),
              b
            );
          }));
      }),
      eA = bA('$ZodUndefined', (a, b) => {
        (dH.init(a, b),
          (a._zod.pattern = cZ),
          (a._zod.values = new Set([void 0])),
          (a._zod.parse = (b, c) => {
            let d = b.value;
            return (
              void 0 === d ||
                b.issues.push({ expected: 'undefined', code: 'invalid_type', input: d, inst: a }),
              b
            );
          }));
      }),
      eB = bA('$ZodNull', (a, b) => {
        (dH.init(a, b),
          (a._zod.pattern = cY),
          (a._zod.values = new Set([null])),
          (a._zod.parse = (b, c) => {
            let d = b.value;
            return (
              null === d ||
                b.issues.push({ expected: 'null', code: 'invalid_type', input: d, inst: a }),
              b
            );
          }));
      }),
      eC = bA('$ZodAny', (a, b) => {
        (dH.init(a, b), (a._zod.parse = (a) => a));
      }),
      eD = bA('$ZodUnknown', (a, b) => {
        (dH.init(a, b), (a._zod.parse = (a) => a));
      }),
      eE = bA('$ZodNever', (a, b) => {
        (dH.init(a, b),
          (a._zod.parse = (b, c) => (
            b.issues.push({ expected: 'never', code: 'invalid_type', input: b.value, inst: a }),
            b
          )));
      }),
      eF = bA('$ZodVoid', (a, b) => {
        (dH.init(a, b),
          (a._zod.parse = (b, c) => {
            let d = b.value;
            return (
              void 0 === d ||
                b.issues.push({ expected: 'void', code: 'invalid_type', input: d, inst: a }),
              b
            );
          }));
      }),
      eG = bA('$ZodDate', (a, b) => {
        (dH.init(a, b),
          (a._zod.parse = (c, d) => {
            if (b.coerce)
              try {
                c.value = new Date(c.value);
              } catch (a) {}
            let f = c.value,
              g = f instanceof Date;
            return (
              (g && !Number.isNaN(f.getTime())) ||
                c.issues.push({
                  expected: 'date',
                  code: 'invalid_type',
                  input: f,
                  ...(g ? { received: 'Invalid Date' } : {}),
                  inst: a,
                }),
              c
            );
          }));
      });
    function eH(a, b, c) {
      (a.issues.length && b.issues.push(...a5(c, a.issues)), (b.value[c] = a.value));
    }
    let eI = bA('$ZodArray', (a, b) => {
      dH.init(a, b);
      let c = bE.memoizer;
      (c?.attach(a),
        (a._zod.parse = (d, f) => {
          let g = d.value;
          if (!Array.isArray(g))
            return (
              d.issues.push({ expected: 'array', code: 'invalid_type', input: g, inst: a }),
              d
            );
          d.value = c ? c.alloc(a, d, Array(g.length), f) : Array(g.length);
          let h = [],
            i = f?.abortEarly;
          for (let a = 0; a < g.length; a++) {
            let c = g[a],
              j = b.element._zod.run({ value: c, issues: [] }, f);
            if (j instanceof Promise) h.push(j.then((b) => eH(b, d, a)));
            else if ((eH(j, d, a), i && 0 !== j.issues.length && a3(j))) break;
          }
          return h.length ? Promise.all(h).then(() => d) : d;
        }));
    });
    function eJ(a, b, c, d, f, g) {
      let h = c in d,
        i = 'optional' === g;
      if (h || !i || 'optional' !== f) {
        if (a.issues.length) {
          if (void 0 !== f && i && !h) return;
          b.issues.push(...a5(c, a.issues));
        }
        if (!h && void 0 === f) {
          a.issues.length ||
            b.issues.push({
              code: 'invalid_type',
              expected: 'nonoptional',
              input: void 0,
              path: [c],
            });
          return;
        }
        void 0 === a.value
          ? (h || ('defaulted' === f && !i)) && (b.value[c] = void 0)
          : (b.value[c] = a.value);
      }
    }
    let eK = [];
    function eL(a) {
      let b = Object.keys(a.shape),
        c = Object.getOwnPropertySymbols(a.shape),
        d = c.length ? c : eK,
        f = d.length ? [...b, ...d] : b;
      for (let b of f)
        if (!a.shape?.[b]?._zod?.traits?.has('$ZodType'))
          throw Error(`Invalid element at key "${String(b)}": expected a Zod schema`);
      let g = aT(a.shape);
      return {
        ...a,
        allKeys: f,
        symbolKeys: d,
        keySet: new Set(b),
        numKeys: b.length,
        optionalKeys: new Set(g),
      };
    }
    function eM(a, b, c, d, f, g, h) {
      let i = [],
        j = f.keySet,
        k = f.catchall._zod,
        l = k.def.type,
        m = k.optin,
        n = k.optout,
        o = 0;
      for (let f in b) {
        if (h && c.issues.length !== o) {
          if (a3(c, o)) break;
          o = c.issues.length;
        }
        if (j.has(f)) continue;
        if ('__proto__' === f) {
          'never' === l && i.push(f);
          continue;
        }
        if ('never' === l) {
          i.push(f);
          continue;
        }
        let g = k.run({ value: b[f], issues: [] }, d);
        g instanceof Promise ? a.push(g.then((a) => eJ(a, c, f, b, m, n))) : eJ(g, c, f, b, m, n);
      }
      return (i.length &&
        c.issues.push({ code: 'unrecognized_keys', keys: i, input: b, inst: g, continue: !0 }),
      a.length)
        ? Promise.all(a).then(() => c)
        : c;
    }
    let eN = bA('$ZodObject', (a, b) => {
        let c;
        dH.init(a, b);
        let d = Object.getOwnPropertyDescriptor(b, 'shape'),
          f = d?.get ? d.get.raw : (b.shape ?? {});
        if (f) {
          let a = () => {
            let c = { ...f };
            return (Object.defineProperty(b, 'shape', { value: c }), (a.raw = c), c);
          };
          ((a.raw = f), Object.defineProperty(b, 'shape', { get: a }));
        }
        let g = al(() => eL(b));
        bt(a, 'propValues', (a) => {
          let b = a.def.shape,
            c = {};
          for (let a in b) {
            let d = b[a]._zod;
            if (d.values) {
              for (let b of (Object.prototype.hasOwnProperty.call(c, a) || as(c, a, new Set()),
              d.values))
                c[a].add(b);
              void 0 !== d.optin && c[a].add(void 0);
            }
          }
          return c;
        });
        let h = b.catchall,
          i = bE.memoizer;
        (i?.attach(a),
          (a._zod.parse = (b, d) => {
            c ?? (c = g.value);
            let f = b.value;
            if (!aG(f))
              return (
                b.issues.push({ expected: 'object', code: 'invalid_type', input: f, inst: a }),
                b
              );
            b.value = i ? i.alloc(a, b, {}, d) : {};
            let j = [],
              k = c.shape,
              l = d?.abortEarly,
              m = b.issues.length;
            for (let a of c.allKeys) {
              if (l && b.issues.length !== m) {
                if (a3(b, m)) break;
                m = b.issues.length;
              }
              if ('__proto__' === a) continue;
              let c = k[a],
                g = c._zod.optin,
                h = c._zod.optout,
                i = c._zod.run({ value: f[a], issues: [] }, d);
              i instanceof Promise
                ? j.push(i.then((c) => eJ(c, b, a, f, g, h)))
                : eJ(i, b, a, f, g, h);
            }
            return h
              ? eM(j, f, b, d, g.value, a, !0 === l)
              : j.length
                ? Promise.all(j).then(() => b)
                : b;
          }));
      }),
      eO = bA('$ZodObjectJIT', (a, b) => {
        let c, d;
        eN.init(a, b);
        let f = a._zod.parse,
          g = al(() => eL(b)),
          h = bE.memoizer,
          i = !bE.jitless,
          j = i && aH.value,
          k = b.catchall;
        a._zod.parse = (l, m) => {
          d ?? (d = g.value);
          let n = l.value;
          return aG(n)
            ? i && j && m?.async === !1 && !0 !== m.jitless
              ? (c ||
                  (c = ((b) => {
                    let c = g.value,
                      d = c.symbolKeys,
                      f = new dF(['payload', 'ctx'], { shape: b, inst: a, memo: h, syms: d }),
                      i = (a) => `shape[${a}]._zod.run({ value: input[${a}], issues: [] }, ctx)`,
                      j = (a, b) => `
          let ${a}_ab = false;
          for (let i = 0; i < ${a}.issues.length; i++) {
            const iss = ${a}.issues[i];
            iss.path = iss.path ? [${b}, ...iss.path] : [${b}];
            payload.issues.push(iss);
            if (iss.continue !== true) ${a}_ab = true;
          }
          if (${a}_ab && ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }`;
                    f.write('const input = payload.value;');
                    let k = Object.create(null),
                      l = 0;
                    for (let a of c.allKeys) k[a] = `key_${l++}`;
                    for (let a of (f.write(
                      h
                        ? 'const newResult = memo.alloc(inst, payload, {}, ctx);'
                        : 'const newResult = {};',
                    ),
                    c.allKeys)) {
                      if ('__proto__' === a) continue;
                      let c = k[a],
                        g = 'symbol' == typeof a ? `syms[${d.indexOf(a)}]` : aD(a),
                        h = `${g} in input`,
                        l = b[a],
                        m = l?._zod?.optin,
                        n = void 0 !== m,
                        o = l?._zod?.optout === 'optional';
                      if ((f.write(`const ${c} = ${i(g)};`), n && o)) {
                        let a =
                          'optional' === m
                            ? `${c}_present`
                            : `${c}.value !== undefined || ${c}_present`;
                        f.write(`
        const ${c}_present = ${h};
        if (!${c}.issues.length || ${c}_present) {
          if (${c}.issues.length) {${j(c, g)}
          }

          if (${a}) {
            newResult[${g}] = ${c}.value;
          }
        }

      `);
                      } else
                        n
                          ? (f.write(`
        if (${c}.issues.length) {${j(c, g)}
        }
      `),
                            'defaulted' === m
                              ? f.write(`newResult[${g}] = ${c}.value;`)
                              : f.write(`
        if (${c}.value !== undefined || ${h}) {
          newResult[${g}] = ${c}.value;
        }
      `))
                          : f.write(`
        const ${c}_present = ${h};
        if (${c}.issues.length) {${j(c, g)}
        }
        if (!${c}_present && !${c}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${g}]
          });
          if (ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }
        }

        if (${c}_present) {
          newResult[${g}] = ${c}.value;
        }

      `);
                    }
                    return (
                      f.write('payload.value = newResult;'),
                      f.write('return payload;'),
                      f.compile()
                    );
                  })(b.shape)),
                (l = c(l, m)),
                k)
                ? eM([], n, l, m, d, a, m?.abortEarly === !0)
                : l
              : f(l, m)
            : (l.issues.push({ expected: 'object', code: 'invalid_type', input: n, inst: a }), l);
        };
      });
    function eP(a, b, c, d) {
      for (let c of a) if (0 === c.issues.length) return ((b.value = c.value), b);
      let f = a.filter((a) => !a3(a));
      return 1 === f.length
        ? ((b.value = f[0].value), f[0])
        : (b.issues.push({
            code: 'invalid_union',
            input: b.value,
            inst: c,
            errors: a.map((a) => a.issues.map((a) => a8(a, d, bF()))),
          }),
          b);
    }
    let eQ = bA('$ZodUnion', (a, b) => {
      (dH.init(a, b),
        bt(a, 'optin', (a) =>
          a.def.options.some((a) => 'defaulted' === a._zod.optin)
            ? 'defaulted'
            : a.def.options.some((a) => void 0 !== a._zod.optin)
              ? 'optional'
              : void 0,
        ),
        bt(a, 'optout', (a) =>
          a.def.options.some((a) => 'optional' === a._zod.optout) ? 'optional' : void 0,
        ),
        bt(a, 'values', (a) => {
          if (a.def.options.every((a) => a._zod.values))
            return new Set(a.def.options.flatMap((a) => Array.from(a._zod.values)));
        }),
        bt(a, 'pattern', (a) => {
          if (a.def.options.every((a) => a._zod.pattern)) {
            let b = a.def.options.map((a) => a._zod.pattern);
            return RegExp(`^(${b.map((a) => an(a.source)).join('|')})$`);
          }
        }));
      let c = 1 === b.options.length ? b.options[0]._zod.run : null;
      a._zod.parse = (d, f) => {
        if (c) return c(d, f);
        let g = !1,
          h = [];
        for (let a of b.options) {
          let b = a._zod.run({ value: d.value, issues: [] }, f);
          if (b instanceof Promise) (h.push(b), (g = !0));
          else {
            if (0 === b.issues.length) return b;
            h.push(b);
          }
        }
        return g ? Promise.all(h).then((b) => eP(b, d, a, f)) : eP(h, d, a, f);
      };
    });
    function eR(a, b, c, d) {
      let f = [];
      for (let b = 0; b < a.length; b++) 0 === a[b].issues.length && f.push(b);
      return (
        1 === f.length
          ? (b.value = a[f[0]].value)
          : 0 === f.length
            ? b.issues.push({
                code: 'invalid_union',
                input: b.value,
                inst: c,
                errors: a.map((a) => a.issues.map((a) => a8(a, d, bF()))),
              })
            : b.issues.push({
                code: 'invalid_union',
                input: b.value,
                inst: c,
                errors: [],
                inclusive: !1,
                matches: f,
              }),
        b
      );
    }
    let eS = bA('$ZodXor', (a, b) => {
      (eQ.init(a, b), (b.inclusive = !1));
      let c = 1 === b.options.length ? b.options[0]._zod.run : null;
      a._zod.parse = (d, f) => {
        if (c) return c(d, f);
        let g = !1,
          h = [];
        for (let a of b.options) {
          let b = a._zod.run({ value: d.value, issues: [] }, f);
          b instanceof Promise ? (h.push(b), (g = !0)) : h.push(b);
        }
        return g ? Promise.all(h).then((b) => eR(b, d, a, f)) : eR(h, d, a, f);
      };
    });
    function eT(a, b) {
      let c = a._zod,
        d = c.bag.optionsMap;
      d || ((d = eU(c.def)), (c.bag.optionsMap = d));
      let f = d.get(b);
      if (null === f) throw Error(`Ambiguous discriminator value "${String(b)}"`);
      return f;
    }
    function eU(a) {
      let b = new Map();
      for (let c of a.options) {
        let d = c._zod.propValues?.[a.discriminator];
        if (!d || 0 === d.size)
          throw Error(`Invalid discriminated union option at index "${a.options.indexOf(c)}"`);
        for (let a of d)
          if (b.has(a)) {
            if (void 0 !== a) throw Error(`Duplicate discriminator value "${String(a)}"`);
            b.set(a, null);
          } else b.set(a, c);
      }
      return b;
    }
    let eV = bA('$ZodDiscriminatedUnion', (a, b) => {
        ((b.inclusive = !1), eQ.init(a, b));
        let c = a._zod.parse;
        (bt(a, 'propValues', (a) => {
          let b = {},
            c = 0;
          for (let d of a.def.options) {
            let f = d._zod.propValues;
            if (!f || 0 === Object.keys(f).length)
              throw Error(
                `Invalid discriminated union option at index "${a.def.options.indexOf(d)}"`,
              );
            for (let [d, g] of (f[a.def.discriminator]?.has(void 0) && c++, Object.entries(f)))
              for (let a of (Object.prototype.hasOwnProperty.call(b, d) || as(b, d, new Set()), g))
                b[d].add(a);
          }
          return (!a.def.unionFallback && c > 1 && b[a.def.discriminator]?.delete(void 0), b);
        }),
          b.options.forEach((a, c) => {
            let d = at(a._zod.def);
            if (d && !Object.prototype.hasOwnProperty.call(d, b.discriminator))
              throw Error(`Invalid discriminated union option at index "${c}"`);
          }));
        let d = al(() => eU(b));
        a._zod.parse = (f, g) => {
          let h = f.value;
          if (!aG(h))
            return (
              f.issues.push({ code: 'invalid_type', expected: 'object', input: h, inst: a }),
              f
            );
          let i = h?.[b.discriminator],
            j = d.value.get(i);
          return j && (void 0 !== i || 'backward' !== g.direction)
            ? j._zod.run(f, g)
            : b.unionFallback || 'backward' === g.direction
              ? c(f, g)
              : (f.issues.push({
                  code: 'invalid_union',
                  errors: [],
                  note: 'No matching discriminator',
                  discriminator: b.discriminator,
                  options: Array.from(d.value.keys()).filter((a) => null !== d.value.get(a)),
                  input: h,
                  path: [b.discriminator],
                  inst: a,
                }),
                f);
        };
      }),
      eW = bA('$ZodIntersection', (a, b) => {
        (dH.init(a, b),
          (a._zod.parse = (a, c) => {
            let d = a.value,
              f = b.left._zod.run({ value: d, issues: [] }, c),
              g = b.right._zod.run({ value: d, issues: [] }, c);
            return f instanceof Promise || g instanceof Promise
              ? Promise.all([f, g]).then(([b, c]) => eY(a, b, c))
              : eY(a, f, g);
          }));
      });
    function eX(a, b) {
      if (a === b || (a instanceof Date && b instanceof Date && +a == +b))
        return { valid: !0, data: a };
      if (aI(a) && aI(b)) {
        let c = Object.keys(b),
          d = Object.keys(a).filter((a) => -1 !== c.indexOf(a)),
          f = { ...a, ...b };
        for (let c of (Object.prototype.hasOwnProperty.call(f, '__proto__') && delete f.__proto__,
        d)) {
          if ('__proto__' === c) continue;
          let d = eX(a[c], b[c]);
          if (!d.valid) return { valid: !1, mergeErrorPath: [c, ...d.mergeErrorPath] };
          f[c] = d.data;
        }
        return { valid: !0, data: f };
      }
      if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) return { valid: !1, mergeErrorPath: [] };
        let c = [];
        for (let d = 0; d < a.length; d++) {
          let f = eX(a[d], b[d]);
          if (!f.valid) return { valid: !1, mergeErrorPath: [d, ...f.mergeErrorPath] };
          c.push(f.data);
        }
        return { valid: !0, data: c };
      }
      return { valid: !1, mergeErrorPath: [] };
    }
    function eY(a, b, c) {
      let d,
        f = new Map(),
        g = new Map(),
        h = (a, b) => {
          let c;
          if ('unrecognized_keys' !== a.code || a.path?.length)
            if ('invalid_key' !== a.code || 'record' !== a.origin || a.path?.length !== 1)
              return !1;
            else {
              let b = String(a.path[0]);
              (g.has(b) || g.set(b, a), (c = [b]));
            }
          else (d ?? (d = a), (c = a.keys));
          for (let a of c) (f.has(a) || f.set(a, {}), (f.get(a)[b] = !0));
          return !0;
        };
      for (let c of b.issues) h(c, 'l') || a.issues.push(c);
      for (let b of c.issues) h(b, 'r') || a.issues.push(b);
      let i = [...f].filter(([, a]) => a.l && a.r).map(([a]) => a);
      if (i.length) {
        let b = d ? i.filter((a) => d.keys.includes(a)) : [];
        for (let c of (b.length && a.issues.push({ ...d, keys: b }), i))
          !b.includes(c) && g.has(c) && a.issues.push(g.get(c));
      }
      let j = eX(b.value, c.value);
      if (!j.valid) {
        if (a3(a)) return a;
        throw Error(`Unmergable intersection. Error path: ${JSON.stringify(j.mergeErrorPath)}`);
      }
      return ((a.value = j.data), a);
    }
    let eZ = bA('$ZodTuple', (a, b) => {
      dH.init(a, b);
      let c = b.items,
        d = bE.memoizer;
      (d?.attach(a),
        (a._zod.parse = (f, g) => {
          let h = f.value;
          if (!Array.isArray(h))
            return (
              f.issues.push({ input: h, inst: a, expected: 'tuple', code: 'invalid_type' }),
              f
            );
          f.value = d ? d.alloc(a, f, [], g) : [];
          let i = [],
            j = e$(c, 'optin'),
            k = e$(c, 'optout');
          if (!b.rest) {
            if (h.length < j)
              return (
                f.issues.push({
                  code: 'too_small',
                  minimum: j,
                  inclusive: !0,
                  input: h,
                  inst: a,
                  origin: 'array',
                }),
                f
              );
            h.length > c.length &&
              f.issues.push({
                code: 'too_big',
                maximum: c.length,
                inclusive: !0,
                input: h,
                inst: a,
                origin: 'array',
              });
          }
          let l = Array(c.length),
            m = b.rest ? g?.abortEarly : void 0,
            n = !1;
          for (let a = 0; a < c.length; a++) {
            let b = c[a]._zod.run({ value: h[a], issues: [] }, g);
            b instanceof Promise
              ? i.push(
                  b.then((b) => {
                    l[a] = b;
                  }),
                )
              : ((l[a] = b), m && !n && b.issues.length && (n = a3(b)));
          }
          if (b.rest && !n) {
            let a = c.length - 1,
              d = h.slice(c.length),
              j = f.issues.length;
            for (let c of d) {
              if (m && f.issues.length !== j) {
                if (a3(f, j)) break;
                j = f.issues.length;
              }
              a++;
              let d = b.rest._zod.run({ value: c, issues: [] }, g);
              d instanceof Promise ? i.push(d.then((b) => e_(b, f, a))) : e_(d, f, a);
            }
          }
          return i.length ? Promise.all(i).then(() => e0(l, f, c, h, k)) : e0(l, f, c, h, k);
        }));
    });
    function e$(a, b) {
      for (let c = a.length - 1; c >= 0; c--)
        if (!('optin' === b ? void 0 !== a[c]._zod.optin : 'optional' === a[c]._zod.optout))
          return c + 1;
      return 0;
    }
    function e_(a, b, c) {
      (a.issues.length && b.issues.push(...a5(c, a.issues)), (b.value[c] = a.value));
    }
    function e0(a, b, c, d, f) {
      for (let g = 0; g < c.length; g++) {
        let h = a[g],
          i = g < d.length;
        if (!i && g >= f && 'optional' === c[g]._zod.optin) {
          b.value.length = g;
          break;
        }
        if (h.issues.length) {
          if (!i && g >= f) {
            b.value.length = g;
            break;
          }
          b.issues.push(...a5(g, h.issues));
        }
        b.value[g] = h.value;
      }
      for (let a = b.value.length - 1; a >= d.length; a--)
        if ('optional' === c[a]._zod.optout && void 0 === b.value[a]) b.value.length = a;
        else break;
      return b;
    }
    let e1 = bA('$ZodRecord', (a, b) => {
        dH.init(a, b);
        let c = bE.memoizer;
        (c?.attach(a),
          (a._zod.parse = (d, f) => {
            let g = d.value;
            if (!aI(g))
              return (
                d.issues.push({ expected: 'record', code: 'invalid_type', input: g, inst: a }),
                d
              );
            let h = [],
              i = b.keyType._zod.values;
            if (i && !b.partial) {
              let j;
              d.value = c ? c.alloc(a, d, {}, f) : {};
              let k = new Set();
              for (let c of i)
                if ('string' == typeof c || 'number' == typeof c || 'symbol' == typeof c) {
                  if ((k.add('number' == typeof c ? c.toString() : c), '__proto__' === c)) continue;
                  let i = b.keyType._zod.run({ value: c, issues: [] }, f);
                  if (i instanceof Promise)
                    throw Error('Async schemas not supported in object keys currently');
                  if (i.issues.length) {
                    d.issues.push({
                      code: 'invalid_key',
                      origin: 'record',
                      issues: i.issues.map((a) => a8(a, f, bF())),
                      input: c,
                      path: [c],
                      inst: a,
                    });
                    continue;
                  }
                  let j = i.value;
                  if ('__proto__' === j) continue;
                  let l = b.valueType._zod.run({ value: g[c], issues: [] }, f);
                  l instanceof Promise
                    ? h.push(
                        l.then((a) => {
                          (a.issues.length && d.issues.push(...a5(c, a.issues)),
                            (d.value[j] = a.value));
                        }),
                      )
                    : (l.issues.length && d.issues.push(...a5(c, l.issues)),
                      (d.value[j] = l.value));
                }
              for (let a in g)
                if (!k.has(a))
                  if ('loose' === b.mode) {
                    if ('__proto__' === a) continue;
                    d.value[a] = g[a];
                  } else (j = j ?? []).push(a);
              j &&
                j.length > 0 &&
                d.issues.push({
                  code: 'unrecognized_keys',
                  input: g,
                  inst: a,
                  keys: j,
                  continue: !0,
                });
            } else {
              let j;
              for (let k of ((d.value = c ? c.alloc(a, d, {}, f) : {}), Reflect.ownKeys(g))) {
                if ('__proto__' === k || !Object.prototype.propertyIsEnumerable.call(g, k))
                  continue;
                let c = b.keyType._zod.run({ value: k, issues: [] }, f);
                if (c instanceof Promise)
                  throw Error('Async schemas not supported in object keys currently');
                if ('string' == typeof k && cW.test(k) && c.issues.length) {
                  let a = b.keyType._zod.run({ value: Number(k), issues: [] }, f);
                  if (a instanceof Promise)
                    throw Error('Async schemas not supported in object keys currently');
                  0 === a.issues.length && (c = a);
                }
                if (c.issues.length) {
                  'loose' === b.mode
                    ? (d.value[k] = g[k])
                    : i
                      ? (j = j ?? []).push(k)
                      : d.issues.push({
                          code: 'invalid_key',
                          origin: 'record',
                          issues: c.issues.map((a) => a8(a, f, bF())),
                          input: k,
                          path: [k],
                          inst: a,
                        });
                  continue;
                }
                let l = c.value;
                if ('__proto__' === l) continue;
                let m = b.valueType._zod.run({ value: g[k], issues: [] }, f);
                m instanceof Promise
                  ? h.push(
                      m.then((a) => {
                        (a.issues.length && d.issues.push(...a5(k, a.issues)),
                          (d.value[l] = a.value));
                      }),
                    )
                  : (m.issues.length && d.issues.push(...a5(k, m.issues)), (d.value[l] = m.value));
              }
              j &&
                j.length > 0 &&
                d.issues.push({
                  code: 'unrecognized_keys',
                  input: g,
                  inst: a,
                  keys: j,
                  continue: !0,
                });
            }
            return h.length ? Promise.all(h).then(() => d) : d;
          }));
      }),
      e2 = bA('$ZodMap', (a, b) => {
        dH.init(a, b);
        let c = bE.memoizer;
        (c?.attach(a),
          (a._zod.parse = (d, f) => {
            let g = d.value;
            if (!(g instanceof Map))
              return (
                d.issues.push({ expected: 'map', code: 'invalid_type', input: g, inst: a }),
                d
              );
            let h = [];
            d.value = c ? c.alloc(a, d, new Map(), f) : new Map();
            let i = f?.abortEarly,
              j = d.issues.length;
            for (let [c, k] of g) {
              if (i && d.issues.length !== j) {
                if (a3(d, j)) break;
                j = d.issues.length;
              }
              let l = b.keyType._zod.run({ value: c, issues: [] }, f),
                m = b.valueType._zod.run({ value: k, issues: [] }, f);
              l instanceof Promise || m instanceof Promise
                ? h.push(
                    Promise.all([l, m]).then(([b, h]) => {
                      e3(b, h, d, c, g, a, f);
                    }),
                  )
                : e3(l, m, d, c, g, a, f);
            }
            return h.length ? Promise.all(h).then(() => d) : d;
          }));
      });
    function e3(a, b, c, d, f, g, h) {
      (a.issues.length &&
        (aM.has(typeof d)
          ? c.issues.push(...a5(d, a.issues))
          : c.issues.push({
              code: 'invalid_key',
              origin: 'map',
              input: f,
              inst: g,
              issues: a.issues.map((a) => a8(a, h, bF())),
            })),
        b.issues.length &&
          (aM.has(typeof d)
            ? c.issues.push(...a5(d, b.issues))
            : c.issues.push({
                origin: 'map',
                code: 'invalid_element',
                input: f,
                inst: g,
                key: d,
                issues: b.issues.map((a) => a8(a, h, bF())),
              })),
        c.value.set(a.value, b.value));
    }
    let e4 = bA('$ZodSet', (a, b) => {
      dH.init(a, b);
      let c = bE.memoizer;
      (c?.attach(a),
        (a._zod.parse = (d, f) => {
          let g = d.value;
          if (!(g instanceof Set))
            return (d.issues.push({ input: g, inst: a, expected: 'set', code: 'invalid_type' }), d);
          let h = [];
          d.value = c ? c.alloc(a, d, new Set(), f) : new Set();
          let i = f?.abortEarly,
            j = d.issues.length;
          for (let a of g) {
            if (i && d.issues.length !== j) {
              if (a3(d, j)) break;
              j = d.issues.length;
            }
            let c = b.valueType._zod.run({ value: a, issues: [] }, f);
            c instanceof Promise ? h.push(c.then((a) => e5(a, d))) : e5(c, d);
          }
          return h.length ? Promise.all(h).then(() => d) : d;
        }));
    });
    function e5(a, b) {
      (a.issues.length && b.issues.push(...a.issues), b.value.add(a.value));
    }
    let e6 = bA('$ZodEnum', (a, b) => {
        dH.init(a, b);
        let c = ah(b.entries),
          d = new Set(c);
        ((a._zod.values = d),
          bt(a, 'pattern', (a) => {
            let b = ah(a.def.entries).filter((a) => aM.has(typeof a));
            return new RegExp(
              b.length ? `^(${b.map((a) => aO(a.toString())).join('|')})$` : '^[^\\s\\S]$',
            );
          }),
          (a._zod.parse = (b, f) => {
            let g = b.value;
            return (
              d.has(g) || b.issues.push({ code: 'invalid_value', values: c, input: g, inst: a }),
              b
            );
          }));
      }),
      e7 = bA('$ZodLiteral', (a, b) => {
        dH.init(a, b);
        let c = new Set(b.values);
        ((a._zod.values = c),
          bt(a, 'pattern', (a) => {
            let b = a.def.values;
            return new RegExp(
              b.length
                ? `^(${b.map((a) => ('string' == typeof a ? aO(a) : a ? aO(a.toString()) : String(a))).join('|')})$`
                : '^[^\\s\\S]$',
            );
          }),
          (a._zod.parse = (d, f) => {
            let g = d.value;
            return (
              c.has(g) ||
                d.issues.push({ code: 'invalid_value', values: b.values, input: g, inst: a }),
              d
            );
          }));
      }),
      e8 = bA('$ZodFile', (a, b) => {
        (dH.init(a, b),
          (a._zod.parse = (b, c) => {
            let d = b.value;
            return (
              d instanceof File ||
                b.issues.push({ expected: 'file', code: 'invalid_type', input: d, inst: a }),
              b
            );
          }));
      }),
      e9 = bA('$ZodTransform', (a, b) => {
        (dH.init(a, b),
          (a._zod.optin = 'optional'),
          bE.memoizer?.guard(a),
          (a._zod.parse = (c, d) => {
            if ('backward' === d.direction) throw new bD(a.constructor.name);
            let f = b.transform(c.value, c);
            if (d.async)
              return (f instanceof Promise ? f : Promise.resolve(f)).then(
                (a) => ((c.value = a), c),
              );
            if (f instanceof Promise) throw new bC();
            return ((c.value = f), c);
          }));
      });
    function fa(a, b) {
      return ((a.value = b.issues.length ? void 0 : b.value), a);
    }
    let fb = bA('$ZodOptional', (a, b) => {
        (dH.init(a, b),
          bt(a, 'optin', (a) =>
            'defaulted' === a.def.innerType._zod.optin ? 'defaulted' : 'optional',
          ),
          (a._zod.optout = 'optional'),
          bt(a, 'values', (a) => {
            let b = a.def.innerType._zod.values;
            return b ? new Set([...b, void 0]) : void 0;
          }),
          bt(a, 'pattern', (a) => {
            let b = a.def.innerType._zod.pattern;
            return b ? RegExp(`^(${an(b.source)})?$`) : void 0;
          }),
          (a._zod.parse = (a, c) => {
            if (void 0 === a.value) {
              if ('defaulted' !== b.innerType._zod.optin) return a;
              let d = b.innerType._zod.run({ value: a.value, issues: [] }, c);
              return d instanceof Promise ? d.then((b) => fa(a, b)) : fa(a, d);
            }
            return b.innerType._zod.run(a, c);
          }));
      }),
      fc = bA('$ZodExactOptional', (a, b) => {
        (fb.init(a, b),
          bt(a, 'values', (a) => a.def.innerType._zod.values),
          bt(a, 'pattern', (a) => a.def.innerType._zod.pattern),
          (a._zod.parse = (a, c) => b.innerType._zod.run(a, c)));
      }),
      fd = bA('$ZodNullable', (a, b) => {
        (dH.init(a, b),
          bt(a, 'optin', (a) => a.def.innerType._zod.optin),
          bt(a, 'optout', (a) => a.def.innerType._zod.optout),
          bt(a, 'pattern', (a) => {
            let b = a.def.innerType._zod.pattern;
            return b ? RegExp(`^(${an(b.source)}|null)$`) : void 0;
          }),
          bt(a, 'values', (a) =>
            a.def.innerType._zod.values ? new Set([...a.def.innerType._zod.values, null]) : void 0,
          ),
          (a._zod.parse = (a, c) => (null === a.value ? a : b.innerType._zod.run(a, c))));
      }),
      fe = bA('$ZodDefault', (a, b) => {
        (dH.init(a, b),
          (a._zod.optin = 'defaulted'),
          bt(a, 'values', (a) => a.def.innerType._zod.values),
          (a._zod.parse = (a, c) => {
            if ('backward' === c.direction) return b.innerType._zod.run(a, c);
            if (void 0 === a.value) return ((a.value = b.defaultValue), a);
            let d = b.innerType._zod.run(a, c);
            return d instanceof Promise ? d.then((a) => ff(a, b)) : ff(d, b);
          }));
      });
    function ff(a, b) {
      return (void 0 === a.value && (a.value = b.defaultValue), a);
    }
    let fg = bA('$ZodPrefault', (a, b) => {
        (dH.init(a, b),
          (a._zod.optin = 'defaulted'),
          bt(a, 'values', (a) => a.def.innerType._zod.values),
          (a._zod.parse = (a, c) => (
            'backward' === c.direction || (void 0 === a.value && (a.value = b.defaultValue)),
            b.innerType._zod.run(a, c)
          )));
      }),
      fh = bA('$ZodNonOptional', (a, b) => {
        (dH.init(a, b),
          bt(a, 'values', (a) => {
            let b = a.def.innerType._zod.values;
            return b ? new Set([...b].filter((a) => void 0 !== a)) : void 0;
          }),
          (a._zod.parse = (c, d) => {
            let f = b.innerType._zod.run(c, d);
            return f instanceof Promise ? f.then((b) => fi(b, a)) : fi(f, a);
          }));
      });
    function fi(a, b) {
      return (
        a.issues.length ||
          void 0 !== a.value ||
          a.issues.push({ code: 'invalid_type', expected: 'nonoptional', input: a.value, inst: b }),
        a
      );
    }
    let fj = bA('$ZodSuccess', (a, b) => {
      (dH.init(a, b),
        (a._zod.parse = (a, c) => {
          if ('backward' === c.direction) throw new bD('ZodSuccess');
          let d = b.innerType._zod.run(a, c);
          return d instanceof Promise
            ? d.then((b) => ((a.value = 0 === b.issues.length), a))
            : ((a.value = 0 === d.issues.length), a);
        }));
    });
    function fk(a, b, c, d) {
      return (
        b.issues.length
          ? (a.value = c.catchValue({
              ...b,
              value: a.value,
              error: { issues: b.issues.map((a) => a8(a, d, bF())) },
              input: a.value,
            }))
          : ((a.value = b.value), b.memo && (a.memo = !0)),
        a
      );
    }
    let fl = bA('$ZodCatch', (a, b) => {
        (dH.init(a, b),
          bt(a, 'optin', (a) =>
            'defaulted' === a.def.innerType._zod.optin ? 'defaulted' : 'optional',
          ),
          bt(a, 'optout', (a) => a.def.innerType._zod.optout),
          bt(a, 'values', (a) => a.def.innerType._zod.values),
          (a._zod.parse = (a, c) => {
            if ('backward' === c.direction) return b.innerType._zod.run(a, c);
            let d = b.innerType._zod.run({ value: a.value, issues: [] }, c);
            return d instanceof Promise ? d.then((d) => fk(a, d, b, c)) : fk(a, d, b, c);
          }));
      }),
      fm = bA('$ZodNaN', (a, b) => {
        (dH.init(a, b),
          (a._zod.parse = (b, c) => (
            ('number' == typeof b.value && Number.isNaN(b.value)) ||
              b.issues.push({ input: b.value, inst: a, expected: 'nan', code: 'invalid_type' }),
            b
          )));
      }),
      fn = bA('$ZodPipe', (a, b) => {
        (dH.init(a, b),
          bt(a, 'values', (a) => a.def.in._zod.values),
          bt(a, 'optin', (a) => a.def.in._zod.optin),
          bt(a, 'optout', (a) => a.def.out._zod.optout),
          bt(a, 'propValues', (a) => a.def.in._zod.propValues),
          (a._zod.parse = (a, c) => {
            if ('backward' === c.direction) {
              let d = b.out._zod.run(a, c);
              return d instanceof Promise ? d.then((a) => fo(a, b.in, c)) : fo(d, b.in, c);
            }
            let d = b.in._zod.run(a, c);
            return d instanceof Promise ? d.then((a) => fo(a, b.out, c)) : fo(d, b.out, c);
          }));
      });
    function fo(a, b, c) {
      return a.issues.some((a) => 'unrecognized_keys' !== a.code)
        ? ((a.aborted = !0), a)
        : b._zod.run({ value: a.value, issues: a.issues }, c);
    }
    let fp = bA('$ZodCodec', (a, b) => {
      (dH.init(a, b),
        bt(a, 'values', (a) => a.def.in._zod.values),
        bt(a, 'optin', (a) => a.def.in._zod.optin),
        bt(a, 'optout', (a) => a.def.out._zod.optout),
        bt(a, 'propValues', (a) => a.def.in._zod.propValues),
        (a._zod.parse = (a, c) => {
          if ('forward' === (c.direction || 'forward')) {
            let d = b.in._zod.run(a, c);
            return d instanceof Promise ? d.then((a) => fq(a, b, c)) : fq(d, b, c);
          }
          {
            let d = b.out._zod.run(a, c);
            return d instanceof Promise ? d.then((a) => fq(a, b, c)) : fq(d, b, c);
          }
        }));
    });
    function fq(a, b, c) {
      if (a.issues.length) return ((a.aborted = !0), a);
      if ('forward' === (c.direction || 'forward')) {
        let d = b.transform(a.value, a);
        return d instanceof Promise ? d.then((d) => fr(a, d, b.out, c)) : fr(a, d, b.out, c);
      }
      {
        let d = b.reverseTransform(a.value, a);
        return d instanceof Promise ? d.then((d) => fr(a, d, b.in, c)) : fr(a, d, b.in, c);
      }
    }
    function fr(a, b, c, d) {
      return a.issues.length
        ? ((a.aborted = !0), a)
        : c._zod.run({ value: b, issues: a.issues }, d);
    }
    let fs = bA('$ZodPreprocess', (a, b) => {
        fn.init(a, b);
      }),
      ft = bA('$ZodReadonly', (a, b) => {
        (dH.init(a, b),
          bt(a, 'propValues', (a) => a.def.innerType._zod.propValues),
          bt(a, 'values', (a) => a.def.innerType._zod.values),
          bt(a, 'optin', (a) => a.def.innerType?._zod?.optin),
          bt(a, 'optout', (a) => a.def.innerType?._zod?.optout),
          (a._zod.parse = (a, c) => {
            if ('backward' === c.direction) return b.innerType._zod.run(a, c);
            let d = b.innerType._zod.run(a, c);
            return d instanceof Promise ? d.then(fu) : fu(d);
          }));
      });
    function fu(a) {
      return (a.memo || (a.value = Object.freeze(a.value)), a);
    }
    let fv = bA('$ZodTemplateLiteral', (a, b) => {
        dH.init(a, b);
        let c = [];
        for (let a of b.parts)
          if ('object' == typeof a && null !== a) {
            let b = (function a(b) {
              let c = b._zod.def,
                d = b._zod.pattern?.source,
                f = c.innerType ?? b._zod.innerType;
              if (f) {
                let b = f._zod.pattern?.source,
                  c = a(f);
                return d && b && c && c !== b ? d.replace(an(b), () => an(c)) : d;
              }
              if (c.options) {
                let b = c.options.map(a);
                if (b.every(Boolean)) return `^(${b.map((a) => an(a)).join('|')})$`;
              }
              return (function (a) {
                let b,
                  c,
                  d = a._zod.def,
                  f = d.pattern,
                  g = !!d.format?.includes('int');
                for (let a of d.checks ?? []) {
                  let d = a._zod.def;
                  (d.pattern && (f = d.pattern), g || (g = !!d.format?.includes('int')));
                  let h = d.minimum ?? d.length,
                    i = d.maximum ?? d.length;
                  (void 0 !== h && (void 0 === b || h > b) && (b = h),
                    void 0 !== i && (void 0 === c || i < c) && (c = i));
                }
                if (f) return f.source;
                if (void 0 !== b && void 0 !== c && b > c) return '(?!)';
                if (void 0 !== b || void 0 !== c) return cT({ minimum: b, maximum: c }).source;
                let h = a._zod.pattern;
                return (g && h === cW ? cV : h)?.source;
              })(b);
            })(a);
            if (!b)
              throw Error(
                `Invalid template literal part, no pattern found: ${[...a._zod.traits].shift()}`,
              );
            c.push(an(b));
          } else if (null === a || aN.has(typeof a)) c.push(aO(`${a}`));
          else throw Error(`Invalid template literal part: ${a}`);
        ((a._zod.pattern = RegExp(`^${c.join('')}$`)),
          (a._zod.parse = (c, d) => (
            'string' != typeof c.value
              ? c.issues.push({ input: c.value, inst: a, expected: 'string', code: 'invalid_type' })
              : ((a._zod.pattern.lastIndex = 0),
                a._zod.pattern.test(c.value) ||
                  c.issues.push({
                    input: c.value,
                    inst: a,
                    code: 'invalid_format',
                    format: b.format ?? 'template_literal',
                    pattern: a._zod.pattern.source,
                  })),
            c
          )));
      }),
      fw = bA(
        '$ZodFunction',
        (a, b) => (
          dH.init(a, b),
          Object.defineProperty(a, '_def', { value: b }),
          (a._zod.def = b),
          (a.implement = (b) => {
            if ('function' != typeof b) throw Error('implement() must be called with a function');
            return Object.defineProperty(
              function (...c) {
                let d = Reflect.apply(b, this, a._def.input ? bT(a._def.input, c) : c);
                return a._def.output ? bT(a._def.output, d) : d;
              },
              '_zod',
              { value: a._zod, enumerable: !1 },
            );
          }),
          (a.implementAsync = (b) => {
            if ('function' != typeof b)
              throw Error('implementAsync() must be called with a function');
            return Object.defineProperty(
              async function (...c) {
                let d = a._def.input ? await bV(a._def.input, c) : c,
                  f = await Reflect.apply(b, this, d);
                return a._def.output ? await bV(a._def.output, f) : f;
              },
              '_zod',
              { value: a._zod, enumerable: !1 },
            );
          }),
          (a._zod.parse = (b, c) => (
            'function' != typeof b.value
              ? b.issues.push({
                  code: 'invalid_type',
                  expected: 'function',
                  input: b.value,
                  inst: a,
                })
              : a._def.output && 'promise' === a._def.output._zod.def.type
                ? (b.value = a.implementAsync(b.value))
                : (b.value = a.implement(b.value)),
            b
          )),
          (a.input = (...b) => {
            let c = a.constructor;
            return new c(
              Array.isArray(b[0])
                ? {
                    type: 'function',
                    input: new eZ({ type: 'tuple', items: b[0], rest: b[1] }),
                    output: a._def.output,
                  }
                : { type: 'function', input: b[0], output: a._def.output },
            );
          }),
          (a.output = (b) =>
            new a.constructor({ type: 'function', input: a._def.input, output: b })),
          a
        ),
      ),
      fx = bA('$ZodPromise', (a, b) => {
        (dH.init(a, b),
          (a._zod.parse = (a, c) =>
            Promise.resolve(a.value).then((a) =>
              b.innerType._zod.run({ value: a, issues: [] }, c),
            )));
      }),
      fy = bA('$ZodLazy', (a, b) => {
        (dH.init(a, b),
          aq(
            a._zod,
            'innerType',
            () => (b._cachedInner || (b._cachedInner = b.getter()), b._cachedInner),
          ),
          bt(a, 'pattern', (a) => a.innerType?._zod?.pattern),
          bt(a, 'propValues', (a) => a.innerType?._zod?.propValues),
          bt(a, 'optin', (a) => a.innerType?._zod?.optin ?? void 0),
          bt(a, 'optout', (a) => a.innerType?._zod?.optout ?? void 0),
          (a._zod.parse = (b, c) => a._zod.innerType._zod.run(b, c)));
      }),
      fz = bA('$ZodCustom', (a, b) => {
        (dd.init(a, b),
          dH.init(a, b),
          (a._zod.parse = (a, b) => a),
          (a._zod.check = (c) => {
            let d = c.value,
              f = b.fn(d);
            if (f instanceof Promise) return f.then((b) => fA(b, c, d, a));
            fA(f, c, d, a);
          }));
      });
    function fA(a, b, c, d) {
      if (!a) {
        let a = {
          code: 'custom',
          input: c,
          inst: d,
          path: [...(d._zod.def.path ?? [])],
          continue: !d._zod.def.abort,
        };
        (d._zod.def.params && (a.params = d._zod.def.params), b.issues.push(be(a)));
      }
    }
    (a.s(
      [
        '$ZodAny',
        0,
        eC,
        '$ZodArray',
        0,
        eI,
        '$ZodBase64',
        0,
        eh,
        '$ZodBase64URL',
        0,
        ek,
        '$ZodBigInt',
        0,
        ex,
        '$ZodBigIntFormat',
        0,
        ey,
        '$ZodBoolean',
        0,
        ew,
        '$ZodCIDRv4',
        0,
        ec,
        '$ZodCIDRv6',
        0,
        ee,
        '$ZodCUID',
        0,
        d$,
        '$ZodCUID2',
        0,
        d_,
        '$ZodCatch',
        0,
        fl,
        '$ZodCodec',
        0,
        fp,
        '$ZodCreditCard',
        0,
        eo,
        '$ZodCustom',
        0,
        fz,
        '$ZodCustomStringFormat',
        0,
        et,
        '$ZodDate',
        0,
        eG,
        '$ZodDefault',
        0,
        fe,
        '$ZodDiscriminatedUnion',
        0,
        eV,
        '$ZodE164',
        0,
        el,
        '$ZodEmail',
        0,
        dP,
        '$ZodEmoji',
        0,
        dY,
        '$ZodEnum',
        0,
        e6,
        '$ZodExactOptional',
        0,
        fc,
        '$ZodFile',
        0,
        e8,
        '$ZodFunction',
        0,
        fw,
        '$ZodGUID',
        0,
        dN,
        '$ZodIBAN',
        0,
        eq,
        '$ZodIPv4',
        0,
        d7,
        '$ZodIPv6',
        0,
        ea,
        '$ZodISODate',
        0,
        d4,
        '$ZodISODateTime',
        0,
        d3,
        '$ZodISODuration',
        0,
        d6,
        '$ZodISOTime',
        0,
        d5,
        '$ZodIntersection',
        0,
        eW,
        '$ZodJWT',
        0,
        es,
        '$ZodKSUID',
        0,
        d2,
        '$ZodLazy',
        0,
        fy,
        '$ZodLiteral',
        0,
        e7,
        '$ZodMAC',
        0,
        eb,
        '$ZodMap',
        0,
        e2,
        '$ZodNaN',
        0,
        fm,
        '$ZodNanoID',
        0,
        dZ,
        '$ZodNever',
        0,
        eE,
        '$ZodNonOptional',
        0,
        fh,
        '$ZodNull',
        0,
        eB,
        '$ZodNullable',
        0,
        fd,
        '$ZodNumber',
        0,
        eu,
        '$ZodNumberFormat',
        0,
        ev,
        '$ZodObject',
        0,
        eN,
        '$ZodObjectJIT',
        0,
        eO,
        '$ZodOptional',
        0,
        fb,
        '$ZodPipe',
        0,
        fn,
        '$ZodPrefault',
        0,
        fg,
        '$ZodPreprocess',
        0,
        fs,
        '$ZodPromise',
        0,
        fx,
        '$ZodReadonly',
        0,
        ft,
        '$ZodRecord',
        0,
        e1,
        '$ZodSet',
        0,
        e4,
        '$ZodString',
        0,
        dL,
        '$ZodStringFormat',
        0,
        dM,
        '$ZodSuccess',
        0,
        fj,
        '$ZodSymbol',
        0,
        ez,
        '$ZodTemplateLiteral',
        0,
        fv,
        '$ZodTransform',
        0,
        e9,
        '$ZodTuple',
        0,
        eZ,
        '$ZodType',
        0,
        dH,
        '$ZodULID',
        0,
        d0,
        '$ZodURL',
        0,
        dX,
        '$ZodUUID',
        0,
        dO,
        '$ZodUndefined',
        0,
        eA,
        '$ZodUnion',
        0,
        eQ,
        '$ZodUnknown',
        0,
        eD,
        '$ZodVoid',
        0,
        eF,
        '$ZodXID',
        0,
        d1,
        '$ZodXor',
        0,
        eS,
        'URL_BAD_FORMAT',
        0,
        1,
        'URL_UNPARSEABLE',
        0,
        2,
        'base64Charset',
        0,
        eg,
        'base64urlCharset',
        0,
        ei,
        'canParseURL',
        0,
        dQ,
        'getDiscriminatedOption',
        0,
        eT,
        'isValidBase64',
        0,
        ef,
        'isValidBase64URL',
        0,
        ej,
        'isValidCIDRv6',
        0,
        ed,
        'isValidCreditCard',
        0,
        en,
        'isValidIBAN',
        0,
        ep,
        'isValidIPv6',
        0,
        d9,
        'isValidJWT',
        0,
        er,
        'mergeValues',
        0,
        eX,
        'parseURLObject',
        0,
        dS,
        'standardProps',
        0,
        dK,
        'stripTabAndNewline',
        0,
        dU,
        'urlHostnameOk',
        0,
        dV,
        'urlProtocolOk',
        0,
        dW,
        'validateURL',
        0,
        dR,
      ],
      2297,
    ),
      a.i(2297),
      a.s(
        [
          '$ZodAny',
          0,
          eC,
          '$ZodArray',
          0,
          eI,
          '$ZodBase64',
          0,
          eh,
          '$ZodBase64URL',
          0,
          ek,
          '$ZodBigInt',
          0,
          ex,
          '$ZodBigIntFormat',
          0,
          ey,
          '$ZodBoolean',
          0,
          ew,
          '$ZodCIDRv4',
          0,
          ec,
          '$ZodCIDRv6',
          0,
          ee,
          '$ZodCUID',
          0,
          d$,
          '$ZodCUID2',
          0,
          d_,
          '$ZodCatch',
          0,
          fl,
          '$ZodCodec',
          0,
          fp,
          '$ZodCreditCard',
          0,
          eo,
          '$ZodCustom',
          0,
          fz,
          '$ZodCustomStringFormat',
          0,
          et,
          '$ZodDate',
          0,
          eG,
          '$ZodDefault',
          0,
          fe,
          '$ZodDiscriminatedUnion',
          0,
          eV,
          '$ZodE164',
          0,
          el,
          '$ZodEmail',
          0,
          dP,
          '$ZodEmoji',
          0,
          dY,
          '$ZodEnum',
          0,
          e6,
          '$ZodExactOptional',
          0,
          fc,
          '$ZodFile',
          0,
          e8,
          '$ZodFunction',
          0,
          fw,
          '$ZodGUID',
          0,
          dN,
          '$ZodIBAN',
          0,
          eq,
          '$ZodIPv4',
          0,
          d7,
          '$ZodIPv6',
          0,
          ea,
          '$ZodISODate',
          0,
          d4,
          '$ZodISODateTime',
          0,
          d3,
          '$ZodISODuration',
          0,
          d6,
          '$ZodISOTime',
          0,
          d5,
          '$ZodIntersection',
          0,
          eW,
          '$ZodJWT',
          0,
          es,
          '$ZodKSUID',
          0,
          d2,
          '$ZodLazy',
          0,
          fy,
          '$ZodLiteral',
          0,
          e7,
          '$ZodMAC',
          0,
          eb,
          '$ZodMap',
          0,
          e2,
          '$ZodNaN',
          0,
          fm,
          '$ZodNanoID',
          0,
          dZ,
          '$ZodNever',
          0,
          eE,
          '$ZodNonOptional',
          0,
          fh,
          '$ZodNull',
          0,
          eB,
          '$ZodNullable',
          0,
          fd,
          '$ZodNumber',
          0,
          eu,
          '$ZodNumberFormat',
          0,
          ev,
          '$ZodObject',
          0,
          eN,
          '$ZodObjectJIT',
          0,
          eO,
          '$ZodOptional',
          0,
          fb,
          '$ZodPipe',
          0,
          fn,
          '$ZodPrefault',
          0,
          fg,
          '$ZodPreprocess',
          0,
          fs,
          '$ZodPromise',
          0,
          fx,
          '$ZodReadonly',
          0,
          ft,
          '$ZodRecord',
          0,
          e1,
          '$ZodSet',
          0,
          e4,
          '$ZodString',
          0,
          dL,
          '$ZodStringFormat',
          0,
          dM,
          '$ZodSuccess',
          0,
          fj,
          '$ZodSymbol',
          0,
          ez,
          '$ZodTemplateLiteral',
          0,
          fv,
          '$ZodTransform',
          0,
          e9,
          '$ZodTuple',
          0,
          eZ,
          '$ZodType',
          0,
          dH,
          '$ZodULID',
          0,
          d0,
          '$ZodURL',
          0,
          dX,
          '$ZodUUID',
          0,
          dO,
          '$ZodUndefined',
          0,
          eA,
          '$ZodUnion',
          0,
          eQ,
          '$ZodUnknown',
          0,
          eD,
          '$ZodVoid',
          0,
          eF,
          '$ZodXID',
          0,
          d1,
          '$ZodXor',
          0,
          eS,
          'URL_BAD_FORMAT',
          0,
          1,
          'URL_UNPARSEABLE',
          0,
          2,
          'base64Charset',
          0,
          eg,
          'base64urlCharset',
          0,
          ei,
          'canParseURL',
          0,
          dQ,
          'clone',
          0,
          aP,
          'getDiscriminatedOption',
          0,
          eT,
          'isValidBase64',
          0,
          ef,
          'isValidBase64URL',
          0,
          ej,
          'isValidCIDRv6',
          0,
          ed,
          'isValidCreditCard',
          0,
          en,
          'isValidIBAN',
          0,
          ep,
          'isValidIPv6',
          0,
          d9,
          'isValidJWT',
          0,
          er,
          'mergeValues',
          0,
          eX,
          'parseURLObject',
          0,
          dS,
          'standardProps',
          0,
          dK,
          'stripTabAndNewline',
          0,
          dU,
          'urlHostnameOk',
          0,
          dV,
          'urlProtocolOk',
          0,
          dW,
          'validateURL',
          0,
          dR,
        ],
        1995,
      ),
      a.i(1995));
    class fB extends Error {
      constructor() {
        (super('Cannot parse a reference cycle that closes through a transform'),
          (this.name = 'ZodCyclicError'));
      }
    }
    let fC = '~memo',
      fD = [];
    function fE(a) {
      return null !== a && 'object' == typeof a;
    }
    function fF(a) {
      return a.map((a) => (a.path ? { ...a, path: a.path.slice() } : { ...a }));
    }
    let fG = new WeakMap();
    function fH(a, b, c) {
      var d, f;
      let g = fG.get(a);
      if (void 0 !== g) return 2 * !!g;
      if (b.has(a)) return 2;
      b.add(a);
      let h = 0,
        i = (a) => {
          if (2 !== h && a?._zod) {
            let d = fH(a, b, c);
            d > h && (h = d);
          }
        },
        j = (a) => {
          a > h && (h = a);
        },
        k = a._zod.def;
      switch (k.type) {
        case 'object': {
          let a = at(k);
          (j(
            a
              ? ((a, d) => {
                  let f = 0;
                  for (let g of Reflect.ownKeys(a)) {
                    let h = Object.getOwnPropertyDescriptor(a, g);
                    if (d && !h.enumerable) continue;
                    let i = h.get ? 1 : h.value?._zod ? fH(h.value, b, c) : 0;
                    i > f && (f = i);
                  }
                  return f;
                })(a, !0)
              : 1,
          ),
            i(k.catchall));
          break;
        }
        case 'array':
          i(k.element);
          break;
        case 'tuple':
          for (let a of k.items) i(a);
          i(k.rest);
          break;
        case 'record':
        case 'map':
          (i(k.keyType), i(k.valueType));
          break;
        case 'set':
          i(k.valueType);
          break;
        case 'union':
          for (let a of k.options) i(a);
          break;
        case 'intersection':
          (i(k.left), i(k.right));
          break;
        case 'optional':
        case 'nullable':
        case 'default':
        case 'prefault':
        case 'catch':
        case 'readonly':
        case 'nonoptional':
        case 'promise':
        case 'success':
          i(k.innerType);
          break;
        case 'pipe':
          (i(k.in), i(k.out));
          break;
        case 'function':
          (i(k.input), i(k.output));
          break;
        case 'lazy': {
          let d = k._cachedInner ?? (c ? a._zod.innerType : void 0);
          j(d ? fH(d, b, !1) : 1);
          break;
        }
        case 'template_literal':
        case 'string':
        case 'number':
        case 'int':
        case 'boolean':
        case 'bigint':
        case 'symbol':
        case 'undefined':
        case 'null':
        case 'void':
        case 'never':
        case 'any':
        case 'unknown':
        case 'date':
        case 'nan':
        case 'enum':
        case 'literal':
        case 'file':
        case 'transform':
        case 'custom':
          break;
        default:
          for (let a in k) {
            let b = Object.getOwnPropertyDescriptor(k, a);
            if (!b || b.get) continue;
            let c = b.value;
            if (c && 'object' == typeof c) {
              if (c._zod) i(c);
              else if (Array.isArray(c)) for (let a of c) i(a);
            }
          }
      }
      return (b.delete(a), (d = a), 1 !== (f = h) && fG.set(d, 2 === f), f);
    }
    function fI(a) {
      return 0 !== fH(a, new Set(), !0);
    }
    let fJ = [],
      fK = {
        alloc(a, b, d) {
          let f = c;
          if (!f) return d;
          c = void 0;
          let g = { value: d, issues: null };
          return (f.set(b.value, g), fJ.push(g), d);
        },
        guard(a) {
          var b;
          ((b = a._zod).deferred ?? (b.deferred = []),
            a._zod.deferred.push(() => {
              let b = a._zod.parse,
                c = (a, c) => {
                  if ('backward' !== c.direction && fM(c, a.value)) throw new fB();
                  return b(a, c);
                };
              ((a._zod.parse = c), a._zod.run === b && (a._zod.run = c));
            }));
        },
        attach(a) {
          var b;
          let d,
            f,
            g,
            h = !1;
          ((b = a._zod).deferred ?? (b.deferred = []),
            a._zod.deferred.push(() => {
              let b = a._zod.parse,
                i = (j, k) => {
                  let l;
                  if (void 0 === d) {
                    let c = fH(a, new Set(), !1);
                    if (0 === c)
                      return ((a._zod.parse = b), a._zod.run === i && (a._zod.run = b), b(j, k));
                    2 === c || h ? (d = !0) : (h = !0);
                  }
                  let m = j.value;
                  if (!fE(m)) return b(j, k);
                  let n = k[fC];
                  if (
                    (n || ((n = { buckets: new WeakMap(), backEdges: void 0 }), (k[fC] = n)),
                    f === k)
                  )
                    l = g;
                  else {
                    var o;
                    let b;
                    ((b = (o = n).buckets.get(a)) || ((b = new WeakMap()), o.buckets.set(a, b)),
                      (l = b),
                      (f = k),
                      (g = l));
                  }
                  let p = l.get(m);
                  if (p)
                    return (
                      (j.value = p.value),
                      p.issues
                        ? p.issues.length && j.issues.push(...fF(p.issues))
                        : ((j.memo = !0),
                          n.backEdges ?? (n.backEdges = new WeakSet()),
                          n.backEdges.add(p.value)),
                      j
                    );
                  c = l;
                  let q = fJ.length,
                    r = b(j, k);
                  c = void 0;
                  let s = fJ.length > q ? fJ.pop() : void 0;
                  return r instanceof Promise
                    ? r.then((a) => (s && (s.issues = a.issues.length ? fF(a.issues) : fD), a))
                    : (s && (s.issues = r.issues.length ? fF(r.issues) : fD), r);
                };
              ((a._zod.parse = i), a._zod.run === b && (a._zod.run = i));
            }));
        },
      };
    function fL() {
      return fK;
    }
    function fM(a, b) {
      let c = a[fC]?.backEdges;
      return void 0 !== c && fE(b) && c.has(b);
    }
    (a.s(
      [
        '$ZodCyclicError',
        0,
        fB,
        'isBackEdge',
        0,
        fM,
        'isRecursiveSchema',
        0,
        fI,
        'memoizer',
        0,
        fL,
      ],
      92129,
    ),
      a.i(92129),
      a.i(72144),
      a.i(903));
    var fN = a.i(18130),
      fO = a.i(56218);
    function fP(a, b, c, d) {
      let f = Math.abs(a),
        g = f % 10,
        h = f % 100;
      return h >= 11 && h <= 19 ? d : 1 === g ? b : g >= 2 && g <= 4 ? c : d;
    }
    function fQ() {
      return {
        localeError: (() => {
          let a = {
              string: { unit: 'characters', verb: 'to have' },
              file: { unit: 'bytes', verb: 'to have' },
              array: { unit: 'items', verb: 'to have' },
              set: { unit: 'items', verb: 'to have' },
              map: { unit: 'entries', verb: 'to have' },
            },
            b = {
              regex: 'input',
              email: 'email address',
              url: 'URL',
              emoji: 'emoji',
              uuid: 'UUID',
              uuidv4: 'UUIDv4',
              uuidv6: 'UUIDv6',
              nanoid: 'nanoid',
              guid: 'GUID',
              cuid: 'cuid',
              cuid2: 'cuid2',
              ulid: 'ULID',
              xid: 'XID',
              ksuid: 'KSUID',
              datetime: 'ISO datetime',
              date: 'ISO date',
              time: 'ISO time',
              duration: 'ISO duration',
              ipv4: 'IPv4 address',
              ipv6: 'IPv6 address',
              mac: 'MAC address',
              cidrv4: 'IPv4 range',
              cidrv6: 'IPv6 range',
              base64: 'base64-encoded string',
              base64url: 'base64url-encoded string',
              json_string: 'JSON string',
              e164: 'E.164 number',
              currency_code: 'currency code',
              credit_card: 'credit card number',
              iban: 'IBAN',
              jwt: 'JWT',
              template_literal: 'input',
            },
            c = { nan: 'NaN' };
          function d(a, b) {
            return 'number' !== a || 'number' != typeof b || Number.isFinite(b)
              ? (c[a] ?? a)
              : String(b);
          }
          return (c) => {
            switch (c.code) {
              case 'invalid_type': {
                let a = d(c.expected),
                  b = d(bd(c.input), c.input);
                return `Invalid input: expected ${a}, received ${b}`;
              }
              case 'invalid_value':
                if (1 === c.values.length) return `Invalid input: expected ${aS(c.values[0])}`;
                return `Invalid option: expected one of ${ai(c.values, '|')}`;
              case 'too_big': {
                let b = c.exact ? 'exactly ' : c.inclusive ? '<=' : '<',
                  d = a[c.origin] ?? null;
                if (d)
                  return `Too big: expected ${c.origin ?? 'value'} to have ${b}${c.maximum.toString()} ${d.unit ?? 'elements'}`;
                return `Too big: expected ${c.origin ?? 'value'} to be ${b}${c.maximum.toString()}`;
              }
              case 'too_small': {
                let b = c.exact ? 'exactly ' : c.inclusive ? '>=' : '>',
                  d = a[c.origin] ?? null;
                if (d)
                  return `Too small: expected ${c.origin} to have ${b}${c.minimum.toString()} ${d.unit}`;
                return `Too small: expected ${c.origin} to be ${b}${c.minimum.toString()}`;
              }
              case 'invalid_format':
                if ('starts_with' === c.format)
                  return `Invalid string: must start with "${c.prefix}"`;
                if ('ends_with' === c.format) return `Invalid string: must end with "${c.suffix}"`;
                if ('includes' === c.format) return `Invalid string: must include "${c.includes}"`;
                if ('regex' === c.format) return `Invalid string: must match pattern ${c.pattern}`;
                return `Invalid ${b[c.format] ?? c.format}`;
              case 'not_multiple_of':
                return `Invalid number: must be a multiple of ${c.divisor}`;
              case 'unrecognized_keys':
                return `Unrecognized key${c.keys.length > 1 ? 's' : ''}: ${ai(c.keys, ', ')}`;
              case 'invalid_key':
                return `Invalid key in ${c.origin}`;
              case 'invalid_union':
                if (c.options && Array.isArray(c.options) && c.options.length > 0) {
                  let a = c.options.map((a) => `'${a}'`).join(' | ');
                  return `Invalid discriminator value. Expected ${a}`;
                }
                if (!1 === c.inclusive) return 'Invalid input: more than one option matched';
                return 'Invalid input';
              case 'invalid_element':
                return `Invalid value in ${c.origin}`;
              default:
                return 'Invalid input';
            }
          };
        })(),
      };
    }
    function fR(a, b, c) {
      return 1 === Math.abs(a) ? b : c;
    }
    function fS(a) {
      if (!a) return '';
      let b = a[a.length - 1];
      return a + (['ա', 'ե', 'ը', 'ի', 'ո', 'ու', 'օ'].includes(b) ? 'ն' : 'ը');
    }
    function fT() {
      let a, b, c;
      return {
        localeError:
          ((a = {
            string: { unit: 'តួអក្សរ', verb: 'គួរមាន' },
            file: { unit: 'បៃ', verb: 'គួរមាន' },
            array: { unit: 'ធាតុ', verb: 'គួរមាន' },
            set: { unit: 'ធាតុ', verb: 'គួរមាន' },
            map: { unit: 'ធាតុ', verb: 'គួរមាន' },
          }),
          (b = {
            regex: 'ទិន្នន័យបញ្ចូល',
            email: 'អាសយដ្ឋានអ៊ីមែល',
            url: 'URL',
            emoji: 'សញ្ញាអារម្មណ៍',
            uuid: 'UUID',
            uuidv4: 'UUIDv4',
            uuidv6: 'UUIDv6',
            nanoid: 'nanoid',
            guid: 'GUID',
            cuid: 'cuid',
            cuid2: 'cuid2',
            ulid: 'ULID',
            xid: 'XID',
            ksuid: 'KSUID',
            datetime: 'កាលបរិច្ឆេទ និងម៉ោង ISO',
            date: 'កាលបរិច្ឆេទ ISO',
            time: 'ម៉ោង ISO',
            duration: 'រយៈពេល ISO',
            ipv4: 'អាសយដ្ឋាន IPv4',
            ipv6: 'អាសយដ្ឋាន IPv6',
            mac: 'អាសយដ្ឋាន MAC',
            cidrv4: 'ដែនអាសយដ្ឋាន IPv4',
            cidrv6: 'ដែនអាសយដ្ឋាន IPv6',
            base64: 'ខ្សែអក្សរអ៊ិកូដ base64',
            base64url: 'ខ្សែអក្សរអ៊ិកូដ base64url',
            json_string: 'ខ្សែអក្សរ JSON',
            e164: 'លេខ E.164',
            credit_card: 'លេខប័ណ្ណឥណទាន',
            currency_code: 'កូដរូបិយប័ណ្ណ',
            iban: 'IBAN',
            jwt: 'JWT',
            template_literal: 'ទិន្នន័យបញ្ចូល',
          }),
          (c = { nan: 'NaN', number: 'លេខ', array: 'អារេ (Array)', null: 'គ្មានតម្លៃ (null)' }),
          (d) => {
            switch (d.code) {
              case 'invalid_type': {
                let a = c[d.expected] ?? d.expected,
                  b = bd(d.input),
                  f = c[b] ?? b;
                if (/^[A-Z]/.test(d.expected))
                  return `ទិន្នន័យបញ្ចូលមិនត្រឹមត្រូវ៖ ត្រូវការ instanceof ${d.expected} ប៉ុន្តែទទួលបាន ${f}`;
                return `ទិន្នន័យបញ្ចូលមិនត្រឹមត្រូវ៖ ត្រូវការ ${a} ប៉ុន្តែទទួលបាន ${f}`;
              }
              case 'invalid_value':
                if (1 === d.values.length)
                  return `ទិន្នន័យបញ្ចូលមិនត្រឹមត្រូវ៖ ត្រូវការ ${aS(d.values[0])}`;
                return `ជម្រើសមិនត្រឹមត្រូវ៖ ត្រូវជាមួយក្នុងចំណោម ${ai(d.values, '|')}`;
              case 'too_big': {
                let b = d.inclusive ? '<=' : '<',
                  c = a[d.origin] ?? null;
                if (c)
                  return `ធំពេក៖ ត្រូវការ ${d.origin ?? 'តម្លៃ'} ${b} ${d.maximum.toString()} ${c.unit ?? 'ធាតុ'}`;
                return `ធំពេក៖ ត្រូវការ ${d.origin ?? 'តម្លៃ'} ${b} ${d.maximum.toString()}`;
              }
              case 'too_small': {
                let b = d.inclusive ? '>=' : '>',
                  c = a[d.origin] ?? null;
                if (c) return `តូចពេក៖ ត្រូវការ ${d.origin} ${b} ${d.minimum.toString()} ${c.unit}`;
                return `តូចពេក៖ ត្រូវការ ${d.origin} ${b} ${d.minimum.toString()}`;
              }
              case 'invalid_format':
                if ('starts_with' === d.format)
                  return `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវចាប់ផ្តើមដោយ "${d.prefix}"`;
                if ('ends_with' === d.format)
                  return `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវបញ្ចប់ដោយ "${d.suffix}"`;
                if ('includes' === d.format)
                  return `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវមាន "${d.includes}"`;
                if ('regex' === d.format)
                  return `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវតែផ្គូផ្គងនឹងទម្រង់ដែលបានកំណត់ ${d.pattern}`;
                return `មិនត្រឹមត្រូវ៖ ${b[d.format] ?? d.format}`;
              case 'not_multiple_of':
                return `លេខមិនត្រឹមត្រូវ៖ ត្រូវតែជាពហុគុណនៃ ${d.divisor}`;
              case 'unrecognized_keys':
                return `រកឃើញសោមិនស្គាល់៖ ${ai(d.keys, ', ')}`;
              case 'invalid_key':
                return `សោមិនត្រឹមត្រូវនៅក្នុង ${d.origin}`;
              case 'invalid_union':
              default:
                return 'ទិន្នន័យមិនត្រឹមត្រូវ';
              case 'invalid_element':
                return `ទិន្នន័យមិនត្រឹមត្រូវនៅក្នុង ${d.origin}`;
            }
          }),
      };
    }
    (a.s([], 48676), a.i(48676));
    let fU = (a) => a.charAt(0).toUpperCase() + a.slice(1);
    function fV(a) {
      let b = Math.abs(a),
        c = b % 10,
        d = b % 100;
      return (d >= 11 && d <= 19) || 0 === c ? 'many' : 1 === c ? 'one' : 'few';
    }
    function fW(a, b, c, d) {
      let f = Math.abs(a),
        g = f % 10,
        h = f % 100;
      return h >= 11 && h <= 19 ? d : 1 === g ? b : g >= 2 && g <= 4 ? c : d;
    }
    function fX() {
      let a, b, c;
      return {
        localeError:
          ((a = {
            string: { unit: 'символів', verb: 'матиме' },
            file: { unit: 'байтів', verb: 'матиме' },
            array: { unit: 'елементів', verb: 'матиме' },
            set: { unit: 'елементів', verb: 'матиме' },
            map: { unit: 'елементів', verb: 'матиме' },
          }),
          (b = {
            regex: 'вхідні дані',
            email: 'адреса електронної пошти',
            url: 'URL',
            emoji: 'емодзі',
            uuid: 'UUID',
            uuidv4: 'UUIDv4',
            uuidv6: 'UUIDv6',
            nanoid: 'nanoid',
            guid: 'GUID',
            cuid: 'cuid',
            cuid2: 'cuid2',
            ulid: 'ULID',
            xid: 'XID',
            ksuid: 'KSUID',
            datetime: 'дата та час ISO',
            date: 'дата ISO',
            time: 'час ISO',
            duration: 'тривалість ISO',
            ipv4: 'адреса IPv4',
            ipv6: 'адреса IPv6',
            mac: 'адреса MAC',
            cidrv4: 'діапазон IPv4',
            cidrv6: 'діапазон IPv6',
            base64: 'рядок у кодуванні base64',
            base64url: 'рядок у кодуванні base64url',
            json_string: 'рядок JSON',
            e164: 'номер E.164',
            credit_card: 'номер кредитної картки',
            currency_code: 'код валюти',
            iban: 'IBAN',
            jwt: 'JWT',
            template_literal: 'вхідні дані',
          }),
          (c = { nan: 'NaN', number: 'число', array: 'масив' }),
          (d) => {
            switch (d.code) {
              case 'invalid_type': {
                let a = c[d.expected] ?? d.expected,
                  b = bd(d.input),
                  f = c[b] ?? b;
                if (/^[A-Z]/.test(d.expected))
                  return `Неправильні вхідні дані: очікується instanceof ${d.expected}, отримано ${f}`;
                return `Неправильні вхідні дані: очікується ${a}, отримано ${f}`;
              }
              case 'invalid_value':
                if (1 === d.values.length)
                  return `Неправильні вхідні дані: очікується ${aS(d.values[0])}`;
                return `Неправильна опція: очікується одне з ${ai(d.values, '|')}`;
              case 'too_big': {
                let b = d.inclusive ? '<=' : '<',
                  c = a[d.origin] ?? null;
                if (c)
                  return `Занадто велике: очікується, що ${d.origin ?? 'значення'} ${c.verb} ${b}${d.maximum.toString()} ${c.unit ?? 'елементів'}`;
                return `Занадто велике: очікується, що ${d.origin ?? 'значення'} буде ${b}${d.maximum.toString()}`;
              }
              case 'too_small': {
                let b = d.inclusive ? '>=' : '>',
                  c = a[d.origin] ?? null;
                if (c)
                  return `Занадто мале: очікується, що ${d.origin} ${c.verb} ${b}${d.minimum.toString()} ${c.unit}`;
                return `Занадто мале: очікується, що ${d.origin} буде ${b}${d.minimum.toString()}`;
              }
              case 'invalid_format':
                if ('starts_with' === d.format)
                  return `Неправильний рядок: повинен починатися з "${d.prefix}"`;
                if ('ends_with' === d.format)
                  return `Неправильний рядок: повинен закінчуватися на "${d.suffix}"`;
                if ('includes' === d.format)
                  return `Неправильний рядок: повинен містити "${d.includes}"`;
                if ('regex' === d.format)
                  return `Неправильний рядок: повинен відповідати шаблону ${d.pattern}`;
                return `Неправильний ${b[d.format] ?? d.format}`;
              case 'not_multiple_of':
                return `Неправильне число: повинно бути кратним ${d.divisor}`;
              case 'unrecognized_keys':
                return `Нерозпізнаний ключ${d.keys.length > 1 ? 'і' : ''}: ${ai(d.keys, ', ')}`;
              case 'invalid_key':
                return `Неправильний ключ у ${d.origin}`;
              case 'invalid_union':
              default:
                return 'Неправильні вхідні дані';
              case 'invalid_element':
                return `Неправильне значення у ${d.origin}`;
            }
          }),
      };
    }
    a.s(
      [
        'ar',
        0,
        function () {
          let a, b, c;
          return {
            localeError:
              ((a = {
                string: { unit: 'حرف', verb: 'أن يحوي' },
                file: { unit: 'بايت', verb: 'أن يحوي' },
                array: { unit: 'عنصر', verb: 'أن يحوي' },
                set: { unit: 'عنصر', verb: 'أن يحوي' },
                map: { unit: 'عنصر', verb: 'أن يحوي' },
              }),
              (b = {
                regex: 'مدخل',
                email: 'بريد إلكتروني',
                url: 'رابط',
                emoji: 'إيموجي',
                uuid: 'UUID',
                uuidv4: 'UUIDv4',
                uuidv6: 'UUIDv6',
                nanoid: 'nanoid',
                guid: 'GUID',
                cuid: 'cuid',
                cuid2: 'cuid2',
                ulid: 'ULID',
                xid: 'XID',
                ksuid: 'KSUID',
                datetime: 'تاريخ ووقت بمعيار ISO',
                date: 'تاريخ بمعيار ISO',
                time: 'وقت بمعيار ISO',
                duration: 'مدة بمعيار ISO',
                ipv4: 'عنوان IPv4',
                ipv6: 'عنوان IPv6',
                mac: 'عنوان MAC',
                cidrv4: 'مدى عناوين بصيغة IPv4',
                cidrv6: 'مدى عناوين بصيغة IPv6',
                base64: 'نَص بترميز base64-encoded',
                base64url: 'نَص بترميز base64url-encoded',
                json_string: 'نَص على هيئة JSON',
                e164: 'رقم هاتف بمعيار E.164',
                credit_card: 'رقم بطاقة الائتمان',
                currency_code: 'رمز العملة',
                iban: 'IBAN',
                jwt: 'JWT',
                template_literal: 'مدخل',
              }),
              (c = { nan: 'NaN' }),
              (d) => {
                switch (d.code) {
                  case 'invalid_type': {
                    let a = c[d.expected] ?? d.expected,
                      b = bd(d.input),
                      f = c[b] ?? b;
                    if (/^[A-Z]/.test(d.expected))
                      return `مدخلات غير مقبولة: يفترض إدخال instanceof ${d.expected}، ولكن تم إدخال ${f}`;
                    return `مدخلات غير مقبولة: يفترض إدخال ${a}، ولكن تم إدخال ${f}`;
                  }
                  case 'invalid_value':
                    if (1 === d.values.length)
                      return `مدخلات غير مقبولة: يفترض إدخال ${aS(d.values[0])}`;
                    return `اختيار غير مقبول: يتوقع انتقاء أحد هذه الخيارات: ${ai(d.values, '|')}`;
                  case 'too_big': {
                    let b = d.inclusive ? '<=' : '<',
                      c = a[d.origin] ?? null;
                    if (c)
                      return ` أكبر من اللازم: يفترض أن تكون ${d.origin ?? 'القيمة'} ${b} ${d.maximum.toString()} ${c.unit ?? 'عنصر'}`;
                    return `أكبر من اللازم: يفترض أن تكون ${d.origin ?? 'القيمة'} ${b} ${d.maximum.toString()}`;
                  }
                  case 'too_small': {
                    let b = d.inclusive ? '>=' : '>',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `أصغر من اللازم: يفترض لـ ${d.origin} أن يكون ${b} ${d.minimum.toString()} ${c.unit}`;
                    return `أصغر من اللازم: يفترض لـ ${d.origin} أن يكون ${b} ${d.minimum.toString()}`;
                  }
                  case 'invalid_format':
                    if ('starts_with' === d.format)
                      return `نَص غير مقبول: يجب أن يبدأ بـ "${d.prefix}"`;
                    if ('ends_with' === d.format)
                      return `نَص غير مقبول: يجب أن ينتهي بـ "${d.suffix}"`;
                    if ('includes' === d.format)
                      return `نَص غير مقبول: يجب أن يتضمَّن "${d.includes}"`;
                    if ('regex' === d.format)
                      return `نَص غير مقبول: يجب أن يطابق النمط ${d.pattern}`;
                    return `${b[d.format] ?? d.format} غير مقبول`;
                  case 'not_multiple_of':
                    return `رقم غير مقبول: يجب أن يكون من مضاعفات ${d.divisor}`;
                  case 'unrecognized_keys':
                    return `معرف${d.keys.length > 1 ? 'ات' : ''} غريب${d.keys.length > 1 ? 'ة' : ''}: ${ai(d.keys, '، ')}`;
                  case 'invalid_key':
                    return `معرف غير مقبول في ${d.origin}`;
                  case 'invalid_union':
                  default:
                    return 'مدخل غير مقبول';
                  case 'invalid_element':
                    return `مدخل غير مقبول في ${d.origin}`;
                }
              }),
          };
        },
        'az',
        0,
        function () {
          let a, b, c;
          return {
            localeError:
              ((a = {
                string: { unit: 'simvol', verb: 'olmalıdır' },
                file: { unit: 'bayt', verb: 'olmalıdır' },
                array: { unit: 'element', verb: 'olmalıdır' },
                set: { unit: 'element', verb: 'olmalıdır' },
                map: { unit: 'element', verb: 'olmalıdır' },
              }),
              (b = {
                regex: 'input',
                email: 'email address',
                url: 'URL',
                emoji: 'emoji',
                uuid: 'UUID',
                uuidv4: 'UUIDv4',
                uuidv6: 'UUIDv6',
                nanoid: 'nanoid',
                guid: 'GUID',
                cuid: 'cuid',
                cuid2: 'cuid2',
                ulid: 'ULID',
                xid: 'XID',
                ksuid: 'KSUID',
                datetime: 'ISO datetime',
                date: 'ISO date',
                time: 'ISO time',
                duration: 'ISO duration',
                ipv4: 'IPv4 address',
                ipv6: 'IPv6 address',
                mac: 'MAC address',
                cidrv4: 'IPv4 range',
                cidrv6: 'IPv6 range',
                base64: 'base64-encoded string',
                base64url: 'base64url-encoded string',
                json_string: 'JSON string',
                e164: 'E.164 number',
                credit_card: 'kredit kartı nömrəsi',
                currency_code: 'valyuta kodu',
                iban: 'IBAN',
                jwt: 'JWT',
                template_literal: 'input',
              }),
              (c = { nan: 'NaN' }),
              (d) => {
                switch (d.code) {
                  case 'invalid_type': {
                    let a = c[d.expected] ?? d.expected,
                      b = bd(d.input),
                      f = c[b] ?? b;
                    if (/^[A-Z]/.test(d.expected))
                      return `Yanlış dəyər: g\xf6zlənilən instanceof ${d.expected}, daxil olan ${f}`;
                    return `Yanlış dəyər: g\xf6zlənilən ${a}, daxil olan ${f}`;
                  }
                  case 'invalid_value':
                    if (1 === d.values.length)
                      return `Yanlış dəyər: g\xf6zlənilən ${aS(d.values[0])}`;
                    return `Yanlış se\xe7im: aşağıdakılardan biri olmalıdır: ${ai(d.values, '|')}`;
                  case 'too_big': {
                    let b = d.inclusive ? '<=' : '<',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `\xc7ox b\xf6y\xfck: g\xf6zlənilən ${d.origin ?? 'dəyər'} ${b}${d.maximum.toString()} ${c.unit ?? 'element'}`;
                    return `\xc7ox b\xf6y\xfck: g\xf6zlənilən ${d.origin ?? 'dəyər'} ${b}${d.maximum.toString()}`;
                  }
                  case 'too_small': {
                    let b = d.inclusive ? '>=' : '>',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `\xc7ox ki\xe7ik: g\xf6zlənilən ${d.origin} ${b}${d.minimum.toString()} ${c.unit}`;
                    return `\xc7ox ki\xe7ik: g\xf6zlənilən ${d.origin} ${b}${d.minimum.toString()}`;
                  }
                  case 'invalid_format':
                    if ('starts_with' === d.format)
                      return `Yanlış mətn: "${d.prefix}" ilə başlamalıdır`;
                    if ('ends_with' === d.format)
                      return `Yanlış mətn: "${d.suffix}" ilə bitməlidir`;
                    if ('includes' === d.format)
                      return `Yanlış mətn: "${d.includes}" daxil olmalıdır`;
                    if ('regex' === d.format)
                      return `Yanlış mətn: ${d.pattern} şablonuna uyğun olmalıdır`;
                    return `Yanlış ${b[d.format] ?? d.format}`;
                  case 'not_multiple_of':
                    return `Yanlış ədəd: ${d.divisor} ilə b\xf6l\xfcnə bilən olmalıdır`;
                  case 'unrecognized_keys':
                    return `Tanınmayan a\xe7ar${d.keys.length > 1 ? 'lar' : ''}: ${ai(d.keys, ', ')}`;
                  case 'invalid_key':
                    return `${d.origin} daxilində yanlış a\xe7ar`;
                  case 'invalid_union':
                  default:
                    return 'Yanlış dəyər';
                  case 'invalid_element':
                    return `${d.origin} daxilində yanlış dəyər`;
                }
              }),
          };
        },
        'be',
        0,
        function () {
          let a, b, c;
          return {
            localeError:
              ((a = {
                string: { unit: { one: 'сімвал', few: 'сімвалы', many: 'сімвалаў' }, verb: 'мець' },
                array: {
                  unit: { one: 'элемент', few: 'элементы', many: 'элементаў' },
                  verb: 'мець',
                },
                set: { unit: { one: 'элемент', few: 'элементы', many: 'элементаў' }, verb: 'мець' },
                map: { unit: { one: 'элемент', few: 'элементы', many: 'элементаў' }, verb: 'мець' },
                file: { unit: { one: 'байт', few: 'байты', many: 'байтаў' }, verb: 'мець' },
              }),
              (b = {
                regex: 'увод',
                email: 'email адрас',
                url: 'URL',
                emoji: 'эмодзі',
                uuid: 'UUID',
                uuidv4: 'UUIDv4',
                uuidv6: 'UUIDv6',
                nanoid: 'nanoid',
                guid: 'GUID',
                cuid: 'cuid',
                cuid2: 'cuid2',
                ulid: 'ULID',
                xid: 'XID',
                ksuid: 'KSUID',
                datetime: 'ISO дата і час',
                date: 'ISO дата',
                time: 'ISO час',
                duration: 'ISO працягласць',
                ipv4: 'IPv4 адрас',
                ipv6: 'IPv6 адрас',
                mac: 'MAC адрас',
                cidrv4: 'IPv4 дыяпазон',
                cidrv6: 'IPv6 дыяпазон',
                base64: 'радок у фармаце base64',
                base64url: 'радок у фармаце base64url',
                json_string: 'JSON радок',
                e164: 'нумар E.164',
                credit_card: 'нумар крэдытнай карты',
                currency_code: 'код валюты',
                iban: 'IBAN',
                jwt: 'JWT',
                template_literal: 'увод',
              }),
              (c = { nan: 'NaN', number: 'лік', array: 'масіў' }),
              (d) => {
                switch (d.code) {
                  case 'invalid_type': {
                    let a = c[d.expected] ?? d.expected,
                      b = bd(d.input),
                      f = c[b] ?? b;
                    if (/^[A-Z]/.test(d.expected))
                      return `Няправільны ўвод: чакаўся instanceof ${d.expected}, атрымана ${f}`;
                    return `Няправільны ўвод: чакаўся ${a}, атрымана ${f}`;
                  }
                  case 'invalid_value':
                    if (1 === d.values.length)
                      return `Няправільны ўвод: чакалася ${aS(d.values[0])}`;
                    return `Няправільны варыянт: чакаўся адзін з ${ai(d.values, '|')}`;
                  case 'too_big': {
                    let b = d.inclusive ? '<=' : '<',
                      c = a[d.origin] ?? null;
                    if (c) {
                      let a = fP(Number(d.maximum), c.unit.one, c.unit.few, c.unit.many);
                      return `Занадта вялікі: чакалася, што ${d.origin ?? 'значэнне'} павінна ${c.verb} ${b}${d.maximum.toString()} ${a}`;
                    }
                    return `Занадта вялікі: чакалася, што ${d.origin ?? 'значэнне'} павінна быць ${b}${d.maximum.toString()}`;
                  }
                  case 'too_small': {
                    let b = d.inclusive ? '>=' : '>',
                      c = a[d.origin] ?? null;
                    if (c) {
                      let a = fP(Number(d.minimum), c.unit.one, c.unit.few, c.unit.many);
                      return `Занадта малы: чакалася, што ${d.origin} павінна ${c.verb} ${b}${d.minimum.toString()} ${a}`;
                    }
                    return `Занадта малы: чакалася, што ${d.origin} павінна быць ${b}${d.minimum.toString()}`;
                  }
                  case 'invalid_format':
                    if ('starts_with' === d.format)
                      return `Няправільны радок: павінен пачынацца з "${d.prefix}"`;
                    if ('ends_with' === d.format)
                      return `Няправільны радок: павінен заканчвацца на "${d.suffix}"`;
                    if ('includes' === d.format)
                      return `Няправільны радок: павінен змяшчаць "${d.includes}"`;
                    if ('regex' === d.format)
                      return `Няправільны радок: павінен адпавядаць шаблону ${d.pattern}`;
                    return `Няправільны ${b[d.format] ?? d.format}`;
                  case 'not_multiple_of':
                    return `Няправільны лік: павінен быць кратным ${d.divisor}`;
                  case 'unrecognized_keys':
                    return `Нераспазнаны ${d.keys.length > 1 ? 'ключы' : 'ключ'}: ${ai(d.keys, ', ')}`;
                  case 'invalid_key':
                    return `Няправільны ключ у ${d.origin}`;
                  case 'invalid_union':
                  default:
                    return 'Няправільны ўвод';
                  case 'invalid_element':
                    return `Няправільнае значэнне ў ${d.origin}`;
                }
              }),
          };
        },
        'bg',
        0,
        function () {
          let a, b, c;
          return {
            localeError:
              ((a = {
                string: { unit: 'символа', verb: 'да съдържа' },
                file: { unit: 'байта', verb: 'да съдържа' },
                array: { unit: 'елемента', verb: 'да съдържа' },
                set: { unit: 'елемента', verb: 'да съдържа' },
                map: { unit: 'елемента', verb: 'да съдържа' },
              }),
              (b = {
                regex: 'вход',
                email: 'имейл адрес',
                url: 'URL',
                emoji: 'емоджи',
                uuid: 'UUID',
                uuidv4: 'UUIDv4',
                uuidv6: 'UUIDv6',
                nanoid: 'nanoid',
                guid: 'GUID',
                cuid: 'cuid',
                cuid2: 'cuid2',
                ulid: 'ULID',
                xid: 'XID',
                ksuid: 'KSUID',
                datetime: 'ISO време',
                date: 'ISO дата',
                time: 'ISO време',
                duration: 'ISO продължителност',
                ipv4: 'IPv4 адрес',
                ipv6: 'IPv6 адрес',
                mac: 'MAC адрес',
                cidrv4: 'IPv4 диапазон',
                cidrv6: 'IPv6 диапазон',
                base64: 'base64-кодиран низ',
                base64url: 'base64url-кодиран низ',
                json_string: 'JSON низ',
                e164: 'E.164 номер',
                credit_card: 'номер на кредитна карта',
                currency_code: 'код на валута',
                iban: 'IBAN',
                jwt: 'JWT',
                template_literal: 'вход',
              }),
              (c = { nan: 'NaN', number: 'число', array: 'масив' }),
              (d) => {
                switch (d.code) {
                  case 'invalid_type': {
                    let a = c[d.expected] ?? d.expected,
                      b = bd(d.input),
                      f = c[b] ?? b;
                    if (/^[A-Z]/.test(d.expected))
                      return `Невалиден вход: очакван instanceof ${d.expected}, получен ${f}`;
                    return `Невалиден вход: очакван ${a}, получен ${f}`;
                  }
                  case 'invalid_value':
                    if (1 === d.values.length) return `Невалиден вход: очакван ${aS(d.values[0])}`;
                    return `Невалидна опция: очаквано едно от ${ai(d.values, '|')}`;
                  case 'too_big': {
                    let b = d.inclusive ? '<=' : '<',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `Твърде голямо: очаква се ${d.origin ?? 'стойност'} да съдържа ${b}${d.maximum.toString()} ${c.unit ?? 'елемента'}`;
                    return `Твърде голямо: очаква се ${d.origin ?? 'стойност'} да бъде ${b}${d.maximum.toString()}`;
                  }
                  case 'too_small': {
                    let b = d.inclusive ? '>=' : '>',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `Твърде малко: очаква се ${d.origin} да съдържа ${b}${d.minimum.toString()} ${c.unit}`;
                    return `Твърде малко: очаква се ${d.origin} да бъде ${b}${d.minimum.toString()}`;
                  }
                  case 'invalid_format': {
                    if ('starts_with' === d.format)
                      return `Невалиден низ: трябва да започва с "${d.prefix}"`;
                    if ('ends_with' === d.format)
                      return `Невалиден низ: трябва да завършва с "${d.suffix}"`;
                    if ('includes' === d.format)
                      return `Невалиден низ: трябва да включва "${d.includes}"`;
                    if ('regex' === d.format)
                      return `Невалиден низ: трябва да съвпада с ${d.pattern}`;
                    let a = 'Невалиден';
                    return (
                      'emoji' === d.format && (a = 'Невалидно'),
                      'datetime' === d.format && (a = 'Невалидно'),
                      'date' === d.format && (a = 'Невалидна'),
                      'time' === d.format && (a = 'Невалидно'),
                      'duration' === d.format && (a = 'Невалидна'),
                      `${a} ${b[d.format] ?? d.format}`
                    );
                  }
                  case 'not_multiple_of':
                    return `Невалидно число: трябва да бъде кратно на ${d.divisor}`;
                  case 'unrecognized_keys':
                    return `Неразпознат${d.keys.length > 1 ? 'и' : ''} ключ${d.keys.length > 1 ? 'ове' : ''}: ${ai(d.keys, ', ')}`;
                  case 'invalid_key':
                    return `Невалиден ключ в ${d.origin}`;
                  case 'invalid_union':
                  default:
                    return 'Невалиден вход';
                  case 'invalid_element':
                    return `Невалидна стойност в ${d.origin}`;
                }
              }),
          };
        },
        'bn',
        0,
        function () {
          let a, b, c;
          return {
            localeError:
              ((a = {
                string: { unit: 'অক্ষর', verb: 'থাকতে হবে' },
                file: { unit: 'বাইট', verb: 'থাকতে হবে' },
                array: { unit: 'আইটেম', verb: 'থাকতে হবে' },
                set: { unit: 'আইটেম', verb: 'থাকতে হবে' },
                map: { unit: 'এন্ট্রি', verb: 'থাকতে হবে' },
              }),
              (b = {
                regex: 'ইনপুট',
                email: 'ইমেইল ঠিকানা',
                url: 'URL',
                emoji: 'ইমোজি',
                uuid: 'UUID',
                uuidv4: 'UUIDv4',
                uuidv6: 'UUIDv6',
                nanoid: 'nanoid',
                guid: 'GUID',
                cuid: 'cuid',
                cuid2: 'cuid2',
                ulid: 'ULID',
                xid: 'XID',
                ksuid: 'KSUID',
                datetime: 'ISO তারিখ ও সময়',
                date: 'ISO তারিখ',
                time: 'ISO সময়',
                duration: 'ISO সময়কাল',
                ipv4: 'IPv4 ঠিকানা',
                ipv6: 'IPv6 ঠিকানা',
                mac: 'MAC ঠিকানা',
                cidrv4: 'IPv4 রেঞ্জ',
                cidrv6: 'IPv6 রেঞ্জ',
                base64: 'base64-এনকোডেড স্ট্রিং',
                base64url: 'base64url-এনকোডেড স্ট্রিং',
                json_string: 'JSON স্ট্রিং',
                e164: 'E.164 নম্বর',
                credit_card: 'ক্রেডিট কার্ড নম্বর',
                currency_code: 'মুদ্রা কোড',
                iban: 'IBAN',
                jwt: 'JWT',
                template_literal: 'ইনপুট',
              }),
              (c = { nan: 'NaN' }),
              (d) => {
                switch (d.code) {
                  case 'invalid_type': {
                    let a = c[d.expected] ?? d.expected,
                      b = bd(d.input),
                      f = c[b] ?? b;
                    return `অবৈধ ইনপুট: প্রত্যাশিত ${a}, প্রাপ্ত ${f}`;
                  }
                  case 'invalid_value':
                    if (1 === d.values.length) return `অবৈধ ইনপুট: প্রত্যাশিত ${aS(d.values[0])}`;
                    return `অবৈধ অপশন: ${ai(d.values, ' | ')} এর মধ্যে একটি প্রত্যাশিত`;
                  case 'too_big': {
                    let b = d.inclusive ? '<=' : '<',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `অনেক বড়: ${d.origin ?? 'মান'} ${b}${d.maximum.toString()} ${c.unit ?? 'এলিমেন্ট'} হতে হবে`;
                    return `অনেক বড়: ${d.origin ?? 'মান'} ${b}${d.maximum.toString()} হতে হবে`;
                  }
                  case 'too_small': {
                    let b = d.inclusive ? '>=' : '>',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `অনেক ছোট: ${d.origin} ${b}${d.minimum.toString()} ${c.unit} হতে হবে`;
                    return `অনেক ছোট: ${d.origin} ${b}${d.minimum.toString()} হতে হবে`;
                  }
                  case 'invalid_format':
                    if ('starts_with' === d.format)
                      return `অবৈধ স্ট্রিং: "${d.prefix}" দিয়ে শুরু হতে হবে`;
                    if ('ends_with' === d.format)
                      return `অবৈধ স্ট্রিং: "${d.suffix}" দিয়ে শেষ হতে হবে`;
                    if ('includes' === d.format)
                      return `অবৈধ স্ট্রিং: "${d.includes}" অন্তর্ভুক্ত থাকতে হবে`;
                    if ('regex' === d.format)
                      return `অবৈধ স্ট্রিং: ${d.pattern} প্যাটার্ন মিলতে হবে`;
                    return `অবৈধ ${b[d.format] ?? d.format}`;
                  case 'not_multiple_of':
                    return `অবৈধ নম্বর: ${d.divisor} এর গুণিতক হতে হবে`;
                  case 'unrecognized_keys':
                    return `অচেনা কী${d.keys.length > 1 ? 'গুলো' : ''}: ${ai(d.keys, ', ')}`;
                  case 'invalid_key':
                    return `${d.origin} এ অবৈধ কী`;
                  case 'invalid_union':
                    if (d.options && Array.isArray(d.options) && d.options.length > 0) {
                      let a = d.options.map((a) => `'${a}'`).join(' | ');
                      return `অবৈধ ডিসক্রিমিনেটর মান। প্রত্যাশিত ${a}`;
                    }
                    return 'অবৈধ ইনপুট';
                  case 'invalid_element':
                    return `${d.origin} এ অবৈধ মান`;
                  default:
                    return 'অবৈধ ইনপুট';
                }
              }),
          };
        },
        'ca',
        0,
        function () {
          let a, b, c;
          return {
            localeError:
              ((a = {
                string: { unit: 'caràcters', verb: 'contenir' },
                file: { unit: 'bytes', verb: 'contenir' },
                array: { unit: 'elements', verb: 'contenir' },
                set: { unit: 'elements', verb: 'contenir' },
                map: { unit: 'elements', verb: 'contenir' },
              }),
              (b = {
                regex: 'entrada',
                email: 'adreça electrònica',
                url: 'URL',
                emoji: 'emoji',
                uuid: 'UUID',
                uuidv4: 'UUIDv4',
                uuidv6: 'UUIDv6',
                nanoid: 'nanoid',
                guid: 'GUID',
                cuid: 'cuid',
                cuid2: 'cuid2',
                ulid: 'ULID',
                xid: 'XID',
                ksuid: 'KSUID',
                datetime: 'data i hora ISO',
                date: 'data ISO',
                time: 'hora ISO',
                duration: 'durada ISO',
                ipv4: 'adreça IPv4',
                ipv6: 'adreça IPv6',
                mac: 'adreça MAC',
                cidrv4: 'rang IPv4',
                cidrv6: 'rang IPv6',
                base64: 'cadena codificada en base64',
                base64url: 'cadena codificada en base64url',
                json_string: 'cadena JSON',
                e164: 'número E.164',
                credit_card: 'número de targeta de crèdit',
                currency_code: 'codi de moneda',
                iban: 'IBAN',
                jwt: 'JWT',
                template_literal: 'entrada',
              }),
              (c = { nan: 'NaN' }),
              (d) => {
                switch (d.code) {
                  case 'invalid_type': {
                    let a = c[d.expected] ?? d.expected,
                      b = bd(d.input),
                      f = c[b] ?? b;
                    if (/^[A-Z]/.test(d.expected))
                      return `Tipus inv\xe0lid: s'esperava instanceof ${d.expected}, s'ha rebut ${f}`;
                    return `Tipus inv\xe0lid: s'esperava ${a}, s'ha rebut ${f}`;
                  }
                  case 'invalid_value':
                    if (1 === d.values.length)
                      return `Valor inv\xe0lid: s'esperava ${aS(d.values[0])}`;
                    return `Opci\xf3 inv\xe0lida: s'esperava una de ${ai(d.values, ' o ')}`;
                  case 'too_big': {
                    let b = d.inclusive ? 'com a màxim' : 'menys de',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `Massa gran: s'esperava que ${d.origin ?? 'el valor'} contingu\xe9s ${b} ${d.maximum.toString()} ${c.unit ?? 'elements'}`;
                    return `Massa gran: s'esperava que ${d.origin ?? 'el valor'} fos ${b} ${d.maximum.toString()}`;
                  }
                  case 'too_small': {
                    let b = d.inclusive ? 'com a mínim' : 'més de',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `Massa petit: s'esperava que ${d.origin} contingu\xe9s ${b} ${d.minimum.toString()} ${c.unit}`;
                    return `Massa petit: s'esperava que ${d.origin} fos ${b} ${d.minimum.toString()}`;
                  }
                  case 'invalid_format':
                    if ('starts_with' === d.format)
                      return `Format inv\xe0lid: ha de comen\xe7ar amb "${d.prefix}"`;
                    if ('ends_with' === d.format)
                      return `Format inv\xe0lid: ha d'acabar amb "${d.suffix}"`;
                    if ('includes' === d.format)
                      return `Format inv\xe0lid: ha d'incloure "${d.includes}"`;
                    if ('regex' === d.format)
                      return `Format inv\xe0lid: ha de coincidir amb el patr\xf3 ${d.pattern}`;
                    return `Format inv\xe0lid per a ${b[d.format] ?? d.format}`;
                  case 'not_multiple_of':
                    return `N\xfamero inv\xe0lid: ha de ser m\xfaltiple de ${d.divisor}`;
                  case 'unrecognized_keys':
                    return `Clau${d.keys.length > 1 ? 's' : ''} no reconeguda${d.keys.length > 1 ? 's' : ''}: ${ai(d.keys, ', ')}`;
                  case 'invalid_key':
                    return `Clau inv\xe0lida a ${d.origin}`;
                  case 'invalid_union':
                  default:
                    return 'Entrada invàlida';
                  case 'invalid_element':
                    return `Element inv\xe0lid a ${d.origin}`;
                }
              }),
          };
        },
        'ckb',
        0,
        function () {
          let a, b, c;
          return {
            localeError:
              ((a = {
                string: { unit: 'پیت', verb: 'بێت' },
                file: { unit: 'بایت', verb: 'بێت' },
                array: { unit: 'دانە', verb: 'بێت' },
                set: { unit: 'دانە', verb: 'بێت' },
                map: { unit: 'دانە', verb: 'بێت' },
              }),
              (b = {
                regex: 'regex',
                email: 'ئیمەیڵ',
                url: 'بەستەر (URL)',
                emoji: 'ئیمۆجی',
                uuid: 'UUID',
                uuidv4: 'UUIDv4',
                uuidv6: 'UUIDv6',
                nanoid: 'nanoid',
                guid: 'GUID',
                cuid: 'cuid',
                cuid2: 'cuid2',
                ulid: 'ULID',
                xid: 'XID',
                ksuid: 'KSUID',
                datetime: 'ڕێکەوت و کات',
                date: 'ڕێکەوت',
                time: 'کات',
                duration: 'ماوە',
                ipv4: 'ناونیشانی IPv4',
                ipv6: 'ناونیشانی IPv6',
                mac: 'ناونیشانی MAC',
                cidrv4: 'مەودای IPv4',
                cidrv6: 'مەودای IPv6',
                base64: 'دەقی base64',
                base64url: 'دەقی base64url',
                json_string: 'دەقی JSON',
                e164: 'ژمارەی E.164',
                credit_card: 'ژمارەی کارتی کرێدیت',
                currency_code: 'کۆدی دراو',
                iban: 'IBAN',
                jwt: 'JWT',
                template_literal: 'تێکردە',
              }),
              (c = {
                nan: 'NaN',
                string: 'نووسین',
                number: 'ژمارە',
                boolean: 'boolean',
                array: 'array',
                object: 'object',
                date: 'ڕێکەوت',
                integer: 'ژمارە',
                float: 'ژمارە',
                null: 'null',
                undefined: 'undefined',
                function: 'function',
                symbol: 'symbol',
                unknown: 'unknown',
                promise: 'promise',
                void: 'void',
                never: 'never',
                map: 'map',
                set: 'set',
              }),
              (d) => {
                switch (d.code) {
                  case 'invalid_type': {
                    let a = c[d.expected] ?? d.expected,
                      b = bd(d.input),
                      f = c[b] ?? b,
                      g = ['ا', 'و', 'ۆ', 'وو', 'ە', 'ی', 'ێ'].some((a) => f.endsWith(a))
                        ? 'یە'
                        : 'ە',
                      h = /^[a-zA-Z]+$/.test(f);
                    if ('null' === b || 'undefined' === b) return 'داواکراوە';
                    return `چاوەڕوانکراوە ${a} بێت، بەڵام ${f}${h ? '' : g}`;
                  }
                  case 'invalid_value':
                    if (1 === d.values.length)
                      return `بەهاکە نادرووستە: چاوەڕوانکراوە ${aS(d.values[0])} بێت`;
                    return `هەڵبژاردەی نادروست: چاوەڕوانکراوە یەکێک بێت لە ${ai(d.values, '|')}`;
                  case 'too_big': {
                    let b = a[d.origin] ?? null;
                    if (b)
                      return `پێویستە بە لایەنی زۆرەوە ${d.maximum.toString()} ${b.unit} ${b.verb}`;
                    return `پێویستە بە لایەنی زۆرەوە ${d.maximum.toString()} بێت`;
                  }
                  case 'too_small': {
                    let b = a[d.origin] ?? null;
                    if (b)
                      return `پێویستە بە لایەنی کەمەوە ${d.minimum.toString()} ${b.unit} ${b.verb}`;
                    return `پێویستە بە لایەنی کەمەوە ${d.minimum.toString()} بێت`;
                  }
                  case 'invalid_format':
                    if ('starts_with' === d.format)
                      return `دەقی نادروست: پێویستە دەستپێبکات بە "${d.prefix}"`;
                    if ('ends_with' === d.format)
                      return `دەقی نادروست: پێویستە کۆتاییبێت بە "${d.suffix}"`;
                    if ('includes' === d.format)
                      return `دەقی نادروست: پێویستە "${d.includes}" لەخۆبگرێت`;
                    if ('regex' === d.format)
                      return `دەقی نادروست: پێویستە لەگەڵ پاتێرنی ${d.pattern} بگونجێت`;
                    return `بەهای ${b[d.format] ?? d.format} نادروستە`;
                  case 'not_multiple_of':
                    return `ژمارەی نادروست: دەبێت چەند هێندە بێت بۆ ${d.divisor}`;
                  case 'unrecognized_keys':
                    return `کلیلی نەناسراو: ${ai(d.keys, ', ')}`;
                  case 'invalid_key':
                    return `کلیلی نادروست لە ${d.origin}`;
                  case 'invalid_union':
                    if (d.options && Array.isArray(d.options) && d.options.length > 0) {
                      let a = d.options.map((a) => `'${a}'`).join(' | ');
                      return `بەهای نەناسراو هەیە. بەهای چاوەڕوانکراو: ${a}`;
                    }
                    return 'یەکگرتنی نادروست';
                  case 'invalid_element':
                    return `${d.origin} بەهاکە نادروستە`;
                  default:
                    return 'تێکردەی نادروست';
                }
              }),
          };
        },
        'cs',
        0,
        function () {
          let a, b, c;
          return {
            localeError:
              ((a = {
                string: { unit: 'znaků', verb: 'mít' },
                file: { unit: 'bajtů', verb: 'mít' },
                array: { unit: 'prvků', verb: 'mít' },
                set: { unit: 'prvků', verb: 'mít' },
                map: { unit: 'prvků', verb: 'mít' },
              }),
              (b = {
                regex: 'regulární výraz',
                email: 'e-mailová adresa',
                url: 'URL',
                emoji: 'emoji',
                uuid: 'UUID',
                uuidv4: 'UUIDv4',
                uuidv6: 'UUIDv6',
                nanoid: 'nanoid',
                guid: 'GUID',
                cuid: 'cuid',
                cuid2: 'cuid2',
                ulid: 'ULID',
                xid: 'XID',
                ksuid: 'KSUID',
                datetime: 'datum a čas ve formátu ISO',
                date: 'datum ve formátu ISO',
                time: 'čas ve formátu ISO',
                duration: 'doba trvání ISO',
                ipv4: 'IPv4 adresa',
                ipv6: 'IPv6 adresa',
                mac: 'MAC adresa',
                cidrv4: 'rozsah IPv4',
                cidrv6: 'rozsah IPv6',
                base64: 'řetězec zakódovaný ve formátu base64',
                base64url: 'řetězec zakódovaný ve formátu base64url',
                json_string: 'řetězec ve formátu JSON',
                e164: 'číslo E.164',
                credit_card: 'číslo kreditní karty',
                currency_code: 'kód měny',
                iban: 'IBAN',
                jwt: 'JWT',
                template_literal: 'vstup',
              }),
              (c = {
                nan: 'NaN',
                number: 'číslo',
                string: 'řetězec',
                function: 'funkce',
                array: 'pole',
              }),
              (d) => {
                switch (d.code) {
                  case 'invalid_type': {
                    let a = c[d.expected] ?? d.expected,
                      b = bd(d.input),
                      f = c[b] ?? b;
                    if (/^[A-Z]/.test(d.expected))
                      return `Neplatn\xfd vstup: oček\xe1v\xe1no instanceof ${d.expected}, obdrženo ${f}`;
                    return `Neplatn\xfd vstup: oček\xe1v\xe1no ${a}, obdrženo ${f}`;
                  }
                  case 'invalid_value':
                    if (1 === d.values.length)
                      return `Neplatn\xfd vstup: oček\xe1v\xe1no ${aS(d.values[0])}`;
                    return `Neplatn\xe1 možnost: oček\xe1v\xe1na jedna z hodnot ${ai(d.values, '|')}`;
                  case 'too_big': {
                    let b = d.inclusive ? '<=' : '<',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `Hodnota je př\xedliš velk\xe1: ${d.origin ?? 'hodnota'} mus\xed m\xedt ${b}${d.maximum.toString()} ${c.unit ?? 'prvků'}`;
                    return `Hodnota je př\xedliš velk\xe1: ${d.origin ?? 'hodnota'} mus\xed b\xfdt ${b}${d.maximum.toString()}`;
                  }
                  case 'too_small': {
                    let b = d.inclusive ? '>=' : '>',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `Hodnota je př\xedliš mal\xe1: ${d.origin ?? 'hodnota'} mus\xed m\xedt ${b}${d.minimum.toString()} ${c.unit ?? 'prvků'}`;
                    return `Hodnota je př\xedliš mal\xe1: ${d.origin ?? 'hodnota'} mus\xed b\xfdt ${b}${d.minimum.toString()}`;
                  }
                  case 'invalid_format':
                    if ('starts_with' === d.format)
                      return `Neplatn\xfd řetězec: mus\xed zač\xednat na "${d.prefix}"`;
                    if ('ends_with' === d.format)
                      return `Neplatn\xfd řetězec: mus\xed končit na "${d.suffix}"`;
                    if ('includes' === d.format)
                      return `Neplatn\xfd řetězec: mus\xed obsahovat "${d.includes}"`;
                    if ('regex' === d.format)
                      return `Neplatn\xfd řetězec: mus\xed odpov\xeddat vzoru ${d.pattern}`;
                    return `Neplatn\xfd form\xe1t ${b[d.format] ?? d.format}`;
                  case 'not_multiple_of':
                    return `Neplatn\xe9 č\xedslo: mus\xed b\xfdt n\xe1sobkem ${d.divisor}`;
                  case 'unrecognized_keys':
                    return `Nezn\xe1m\xe9 kl\xedče: ${ai(d.keys, ', ')}`;
                  case 'invalid_key':
                    return `Neplatn\xfd kl\xedč v ${d.origin}`;
                  case 'invalid_union':
                  default:
                    return 'Neplatný vstup';
                  case 'invalid_element':
                    return `Neplatn\xe1 hodnota v ${d.origin}`;
                }
              }),
          };
        },
        'da',
        0,
        function () {
          let a, b, c;
          return {
            localeError:
              ((a = {
                string: { unit: 'tegn', verb: 'havde' },
                file: { unit: 'bytes', verb: 'havde' },
                array: { unit: 'elementer', verb: 'indeholdt' },
                set: { unit: 'elementer', verb: 'indeholdt' },
                map: { unit: 'elementer', verb: 'indeholdt' },
              }),
              (b = {
                regex: 'input',
                email: 'e-mailadresse',
                url: 'URL',
                emoji: 'emoji',
                uuid: 'UUID',
                uuidv4: 'UUIDv4',
                uuidv6: 'UUIDv6',
                nanoid: 'nanoid',
                guid: 'GUID',
                cuid: 'cuid',
                cuid2: 'cuid2',
                ulid: 'ULID',
                xid: 'XID',
                ksuid: 'KSUID',
                datetime: 'ISO dato- og klokkeslæt',
                date: 'ISO-dato',
                time: 'ISO-klokkeslæt',
                duration: 'ISO-varighed',
                ipv4: 'IPv4-adresse',
                ipv6: 'IPv6-adresse',
                mac: 'MAC-adresse',
                cidrv4: 'IPv4-spektrum',
                cidrv6: 'IPv6-spektrum',
                base64: 'base64-kodet streng',
                base64url: 'base64url-kodet streng',
                json_string: 'JSON-streng',
                e164: 'E.164-nummer',
                credit_card: 'kreditkortnummer',
                currency_code: 'valutakode',
                iban: 'IBAN',
                jwt: 'JWT',
                template_literal: 'input',
              }),
              (c = {
                nan: 'NaN',
                string: 'streng',
                number: 'tal',
                boolean: 'boolean',
                array: 'liste',
                object: 'objekt',
                set: 'sæt',
                file: 'fil',
              }),
              (d) => {
                switch (d.code) {
                  case 'invalid_type': {
                    let a = c[d.expected] ?? d.expected,
                      b = bd(d.input),
                      f = c[b] ?? b;
                    if (/^[A-Z]/.test(d.expected))
                      return `Ugyldigt input: forventede instanceof ${d.expected}, fik ${f}`;
                    return `Ugyldigt input: forventede ${a}, fik ${f}`;
                  }
                  case 'invalid_value':
                    if (1 === d.values.length)
                      return `Ugyldig v\xe6rdi: forventede ${aS(d.values[0])}`;
                    return `Ugyldigt valg: forventede en af f\xf8lgende ${ai(d.values, '|')}`;
                  case 'too_big': {
                    let b = d.inclusive ? '<=' : '<',
                      f = a[d.origin] ?? null,
                      g = c[d.origin] ?? d.origin;
                    if (f)
                      return `For stor: forventede ${g ?? 'value'} ${f.verb} ${b} ${d.maximum.toString()} ${f.unit ?? 'elementer'}`;
                    return `For stor: forventede ${g ?? 'value'} havde ${b} ${d.maximum.toString()}`;
                  }
                  case 'too_small': {
                    let b = d.inclusive ? '>=' : '>',
                      f = a[d.origin] ?? null,
                      g = c[d.origin] ?? d.origin;
                    if (f)
                      return `For lille: forventede ${g} ${f.verb} ${b} ${d.minimum.toString()} ${f.unit}`;
                    return `For lille: forventede ${g} havde ${b} ${d.minimum.toString()}`;
                  }
                  case 'invalid_format':
                    if ('starts_with' === d.format)
                      return `Ugyldig streng: skal starte med "${d.prefix}"`;
                    if ('ends_with' === d.format)
                      return `Ugyldig streng: skal ende med "${d.suffix}"`;
                    if ('includes' === d.format)
                      return `Ugyldig streng: skal indeholde "${d.includes}"`;
                    if ('regex' === d.format)
                      return `Ugyldig streng: skal matche m\xf8nsteret ${d.pattern}`;
                    return `Ugyldig ${b[d.format] ?? d.format}`;
                  case 'not_multiple_of':
                    return `Ugyldigt tal: skal v\xe6re deleligt med ${d.divisor}`;
                  case 'unrecognized_keys':
                    return `${d.keys.length > 1 ? 'Ukendte nøgler' : 'Ukendt nøgle'}: ${ai(d.keys, ', ')}`;
                  case 'invalid_key':
                    return `Ugyldig n\xf8gle i ${d.origin}`;
                  case 'invalid_union':
                    return 'Ugyldigt input: matcher ingen af de tilladte typer';
                  case 'invalid_element':
                    return `Ugyldig v\xe6rdi i ${d.origin}`;
                  default:
                    return 'Ugyldigt input';
                }
              }),
          };
        },
        'de',
        0,
        function () {
          let a, b, c;
          return {
            localeError:
              ((a = {
                string: { unit: 'Zeichen', verb: 'zu haben' },
                file: { unit: 'Bytes', verb: 'zu haben' },
                array: { unit: 'Elemente', verb: 'zu haben' },
                set: { unit: 'Elemente', verb: 'zu haben' },
                map: { unit: 'Elemente', verb: 'zu haben' },
              }),
              (b = {
                regex: 'Eingabe',
                email: 'E-Mail-Adresse',
                url: 'URL',
                emoji: 'Emoji',
                uuid: 'UUID',
                uuidv4: 'UUIDv4',
                uuidv6: 'UUIDv6',
                nanoid: 'nanoid',
                guid: 'GUID',
                cuid: 'cuid',
                cuid2: 'cuid2',
                ulid: 'ULID',
                xid: 'XID',
                ksuid: 'KSUID',
                datetime: 'ISO-Datum und -Uhrzeit',
                date: 'ISO-Datum',
                time: 'ISO-Uhrzeit',
                duration: 'ISO-Dauer',
                ipv4: 'IPv4-Adresse',
                ipv6: 'IPv6-Adresse',
                mac: 'MAC-Adresse',
                cidrv4: 'IPv4-Bereich',
                cidrv6: 'IPv6-Bereich',
                base64: 'Base64-codierter String',
                base64url: 'Base64-URL-codierter String',
                json_string: 'JSON-String',
                e164: 'E.164-Nummer',
                credit_card: 'Kreditkartennummer',
                currency_code: 'Währungscode',
                iban: 'IBAN',
                jwt: 'JWT',
                template_literal: 'Eingabe',
              }),
              (c = { nan: 'NaN', number: 'Zahl', array: 'Array' }),
              (d) => {
                switch (d.code) {
                  case 'invalid_type': {
                    let a = c[d.expected] ?? d.expected,
                      b = bd(d.input),
                      f = c[b] ?? b;
                    if (/^[A-Z]/.test(d.expected))
                      return `Ung\xfcltige Eingabe: erwartet instanceof ${d.expected}, erhalten ${f}`;
                    return `Ung\xfcltige Eingabe: erwartet ${a}, erhalten ${f}`;
                  }
                  case 'invalid_value':
                    if (1 === d.values.length)
                      return `Ung\xfcltige Eingabe: erwartet ${aS(d.values[0])}`;
                    return `Ung\xfcltige Option: erwartet eine von ${ai(d.values, '|')}`;
                  case 'too_big': {
                    let b = d.inclusive ? '<=' : '<',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `Zu gro\xdf: erwartet, dass ${d.origin ?? 'Wert'} ${b}${d.maximum.toString()} ${c.unit ?? 'Elemente'} hat`;
                    return `Zu gro\xdf: erwartet, dass ${d.origin ?? 'Wert'} ${b}${d.maximum.toString()} ist`;
                  }
                  case 'too_small': {
                    let b = d.inclusive ? '>=' : '>',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `Zu klein: erwartet, dass ${d.origin} ${b}${d.minimum.toString()} ${c.unit} hat`;
                    return `Zu klein: erwartet, dass ${d.origin} ${b}${d.minimum.toString()} ist`;
                  }
                  case 'invalid_format':
                    if ('starts_with' === d.format)
                      return `Ung\xfcltiger String: muss mit "${d.prefix}" beginnen`;
                    if ('ends_with' === d.format)
                      return `Ung\xfcltiger String: muss mit "${d.suffix}" enden`;
                    if ('includes' === d.format)
                      return `Ung\xfcltiger String: muss "${d.includes}" enthalten`;
                    if ('regex' === d.format)
                      return `Ung\xfcltiger String: muss dem Muster ${d.pattern} entsprechen`;
                    return `Ung\xfcltig: ${b[d.format] ?? d.format}`;
                  case 'not_multiple_of':
                    return `Ung\xfcltige Zahl: muss ein Vielfaches von ${d.divisor} sein`;
                  case 'unrecognized_keys':
                    return `${d.keys.length > 1 ? 'Unbekannte Schlüssel' : 'Unbekannter Schlüssel'}: ${ai(d.keys, ', ')}`;
                  case 'invalid_key':
                    return `Ung\xfcltiger Schl\xfcssel in ${d.origin}`;
                  case 'invalid_union':
                  default:
                    return 'Ungültige Eingabe';
                  case 'invalid_element':
                    return `Ung\xfcltiger Wert in ${d.origin}`;
                }
              }),
          };
        },
        'el',
        0,
        function () {
          let a, b, c;
          return {
            localeError:
              ((a = {
                string: { unit: 'χαρακτήρες', verb: 'να έχει' },
                file: { unit: 'bytes', verb: 'να έχει' },
                array: { unit: 'στοιχεία', verb: 'να έχει' },
                set: { unit: 'στοιχεία', verb: 'να έχει' },
                map: { unit: 'καταχωρήσεις', verb: 'να έχει' },
              }),
              (b = {
                regex: 'είσοδος',
                email: 'διεύθυνση email',
                url: 'URL',
                emoji: 'emoji',
                uuid: 'UUID',
                uuidv4: 'UUIDv4',
                uuidv6: 'UUIDv6',
                nanoid: 'nanoid',
                guid: 'GUID',
                cuid: 'cuid',
                cuid2: 'cuid2',
                ulid: 'ULID',
                xid: 'XID',
                ksuid: 'KSUID',
                datetime: 'ISO ημερομηνία και ώρα',
                date: 'ISO ημερομηνία',
                time: 'ISO ώρα',
                duration: 'ISO διάρκεια',
                ipv4: 'διεύθυνση IPv4',
                ipv6: 'διεύθυνση IPv6',
                mac: 'διεύθυνση MAC',
                cidrv4: 'εύρος IPv4',
                cidrv6: 'εύρος IPv6',
                base64: 'συμβολοσειρά κωδικοποιημένη σε base64',
                base64url: 'συμβολοσειρά κωδικοποιημένη σε base64url',
                json_string: 'συμβολοσειρά JSON',
                e164: 'αριθμός E.164',
                credit_card: 'αριθμός πιστωτικής κάρτας',
                currency_code: 'κωδικός νομίσματος',
                iban: 'IBAN',
                jwt: 'JWT',
                template_literal: 'είσοδος',
              }),
              (c = { nan: 'NaN' }),
              (d) => {
                switch (d.code) {
                  case 'invalid_type': {
                    let a = c[d.expected] ?? d.expected,
                      b = bd(d.input),
                      f = c[b] ?? b;
                    if ('string' == typeof d.expected && /^[A-Z]/.test(d.expected))
                      return `Μη έγκυρη είσοδος: αναμενόταν instanceof ${d.expected}, λήφθηκε ${f}`;
                    return `Μη έγκυρη είσοδος: αναμενόταν ${a}, λήφθηκε ${f}`;
                  }
                  case 'invalid_value':
                    if (1 === d.values.length)
                      return `Μη έγκυρη είσοδος: αναμενόταν ${aS(d.values[0])}`;
                    return `Μη έγκυρη επιλογή: αναμενόταν ένα από ${ai(d.values, '|')}`;
                  case 'too_big': {
                    let b = d.inclusive ? '<=' : '<',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `Πολύ μεγάλο: αναμενόταν ${d.origin ?? 'τιμή'} να έχει ${b}${d.maximum.toString()} ${c.unit ?? 'στοιχεία'}`;
                    return `Πολύ μεγάλο: αναμενόταν ${d.origin ?? 'τιμή'} να είναι ${b}${d.maximum.toString()}`;
                  }
                  case 'too_small': {
                    let b = d.inclusive ? '>=' : '>',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `Πολύ μικρό: αναμενόταν ${d.origin} να έχει ${b}${d.minimum.toString()} ${c.unit}`;
                    return `Πολύ μικρό: αναμενόταν ${d.origin} να είναι ${b}${d.minimum.toString()}`;
                  }
                  case 'invalid_format':
                    if ('starts_with' === d.format)
                      return `Μη έγκυρη συμβολοσειρά: πρέπει να ξεκινά με "${d.prefix}"`;
                    if ('ends_with' === d.format)
                      return `Μη έγκυρη συμβολοσειρά: πρέπει να τελειώνει με "${d.suffix}"`;
                    if ('includes' === d.format)
                      return `Μη έγκυρη συμβολοσειρά: πρέπει να περιέχει "${d.includes}"`;
                    if ('regex' === d.format)
                      return `Μη έγκυρη συμβολοσειρά: πρέπει να ταιριάζει με το μοτίβο ${d.pattern}`;
                    return `Μη έγκυρο: ${b[d.format] ?? d.format}`;
                  case 'not_multiple_of':
                    return `Μη έγκυρος αριθμός: πρέπει να είναι πολλαπλάσιο του ${d.divisor}`;
                  case 'unrecognized_keys':
                    return `Άγνωστ${d.keys.length > 1 ? 'α' : 'ο'} κλειδ${d.keys.length > 1 ? 'ιά' : 'ί'}: ${ai(d.keys, ', ')}`;
                  case 'invalid_key':
                    return `Μη έγκυρο κλειδί στο ${d.origin}`;
                  case 'invalid_union':
                  default:
                    return 'Μη έγκυρη είσοδος';
                  case 'invalid_element':
                    return `Μη έγκυρη τιμή στο ${d.origin}`;
                }
              }),
          };
        },
        'en',
        0,
        fQ,
        'eo',
        0,
        function () {
          let a, b, c;
          return {
            localeError:
              ((a = {
                string: { unit: 'karaktrojn', verb: 'havi' },
                file: { unit: 'bajtojn', verb: 'havi' },
                array: { unit: 'elementojn', verb: 'havi' },
                set: { unit: 'elementojn', verb: 'havi' },
                map: { unit: 'elementojn', verb: 'havi' },
              }),
              (b = {
                regex: 'enigo',
                email: 'retadreso',
                url: 'URL',
                emoji: 'emoĝio',
                uuid: 'UUID',
                uuidv4: 'UUIDv4',
                uuidv6: 'UUIDv6',
                nanoid: 'nanoid',
                guid: 'GUID',
                cuid: 'cuid',
                cuid2: 'cuid2',
                ulid: 'ULID',
                xid: 'XID',
                ksuid: 'KSUID',
                datetime: 'ISO-datotempo',
                date: 'ISO-dato',
                time: 'ISO-tempo',
                duration: 'ISO-daŭro',
                ipv4: 'IPv4-adreso',
                ipv6: 'IPv6-adreso',
                mac: 'MAC-adreso',
                cidrv4: 'IPv4-rango',
                cidrv6: 'IPv6-rango',
                base64: '64-ume kodita karaktraro',
                base64url: 'URL-64-ume kodita karaktraro',
                json_string: 'JSON-karaktraro',
                e164: 'E.164-nombro',
                credit_card: 'kreditkarta numero',
                currency_code: 'valuta kodo',
                iban: 'IBAN',
                jwt: 'JWT',
                template_literal: 'enigo',
              }),
              (c = { nan: 'NaN', number: 'nombro', array: 'tabelo', null: 'senvalora' }),
              (d) => {
                switch (d.code) {
                  case 'invalid_type': {
                    let a = c[d.expected] ?? d.expected,
                      b = bd(d.input),
                      f = c[b] ?? b;
                    if (/^[A-Z]/.test(d.expected))
                      return `Nevalida enigo: atendiĝis instanceof ${d.expected}, riceviĝis ${f}`;
                    return `Nevalida enigo: atendiĝis ${a}, riceviĝis ${f}`;
                  }
                  case 'invalid_value':
                    if (1 === d.values.length)
                      return `Nevalida enigo: atendiĝis ${aS(d.values[0])}`;
                    return `Nevalida opcio: atendiĝis unu el ${ai(d.values, '|')}`;
                  case 'too_big': {
                    let b = d.inclusive ? '<=' : '<',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `Tro granda: atendiĝis ke ${d.origin ?? 'valoro'} havu ${b}${d.maximum.toString()} ${c.unit ?? 'elementojn'}`;
                    return `Tro granda: atendiĝis ke ${d.origin ?? 'valoro'} havu ${b}${d.maximum.toString()}`;
                  }
                  case 'too_small': {
                    let b = d.inclusive ? '>=' : '>',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `Tro malgranda: atendiĝis ke ${d.origin} havu ${b}${d.minimum.toString()} ${c.unit}`;
                    return `Tro malgranda: atendiĝis ke ${d.origin} estu ${b}${d.minimum.toString()}`;
                  }
                  case 'invalid_format':
                    if ('starts_with' === d.format)
                      return `Nevalida karaktraro: devas komenciĝi per "${d.prefix}"`;
                    if ('ends_with' === d.format)
                      return `Nevalida karaktraro: devas finiĝi per "${d.suffix}"`;
                    if ('includes' === d.format)
                      return `Nevalida karaktraro: devas inkluzivi "${d.includes}"`;
                    if ('regex' === d.format)
                      return `Nevalida karaktraro: devas kongrui kun la modelo ${d.pattern}`;
                    return `Nevalida ${b[d.format] ?? d.format}`;
                  case 'not_multiple_of':
                    return `Nevalida nombro: devas esti oblo de ${d.divisor}`;
                  case 'unrecognized_keys':
                    return `Nekonata${d.keys.length > 1 ? 'j' : ''} ŝlosilo${d.keys.length > 1 ? 'j' : ''}: ${ai(d.keys, ', ')}`;
                  case 'invalid_key':
                    return `Nevalida ŝlosilo en ${d.origin}`;
                  case 'invalid_union':
                  default:
                    return 'Nevalida enigo';
                  case 'invalid_element':
                    return `Nevalida valoro en ${d.origin}`;
                }
              }),
          };
        },
        'es',
        0,
        function () {
          let a, b, c;
          return {
            localeError:
              ((a = {
                string: { unit: 'caracteres', verb: 'tener' },
                file: { unit: 'bytes', verb: 'tener' },
                array: { unit: 'elementos', verb: 'tener' },
                set: { unit: 'elementos', verb: 'tener' },
              }),
              (b = {
                regex: 'entrada',
                email: 'dirección de correo electrónico',
                url: 'URL',
                emoji: 'emoji',
                uuid: 'UUID',
                uuidv4: 'UUIDv4',
                uuidv6: 'UUIDv6',
                nanoid: 'nanoid',
                guid: 'GUID',
                cuid: 'cuid',
                cuid2: 'cuid2',
                ulid: 'ULID',
                xid: 'XID',
                ksuid: 'KSUID',
                datetime: 'fecha y hora ISO',
                date: 'fecha ISO',
                time: 'hora ISO',
                duration: 'duración ISO',
                ipv4: 'dirección IPv4',
                ipv6: 'dirección IPv6',
                mac: 'dirección MAC',
                cidrv4: 'rango IPv4',
                cidrv6: 'rango IPv6',
                base64: 'cadena codificada en base64',
                base64url: 'URL codificada en base64',
                json_string: 'cadena JSON',
                e164: 'número E.164',
                credit_card: 'número de tarjeta de crédito',
                currency_code: 'código de moneda',
                iban: 'IBAN',
                jwt: 'JWT',
                template_literal: 'entrada',
              }),
              (c = {
                nan: 'NaN',
                string: 'texto',
                number: 'número',
                boolean: 'booleano',
                array: 'arreglo',
                object: 'objeto',
                set: 'conjunto',
                file: 'archivo',
                date: 'fecha',
                bigint: 'número grande',
                symbol: 'símbolo',
                undefined: 'indefinido',
                null: 'nulo',
                function: 'función',
                map: 'mapa',
                record: 'registro',
                tuple: 'tupla',
                enum: 'enumeración',
                union: 'unión',
                literal: 'literal',
                promise: 'promesa',
                void: 'vacío',
                never: 'nunca',
                unknown: 'desconocido',
                any: 'cualquiera',
              }),
              (d) => {
                switch (d.code) {
                  case 'invalid_type': {
                    let a = c[d.expected] ?? d.expected,
                      b = bd(d.input),
                      f = c[b] ?? b;
                    if (/^[A-Z]/.test(d.expected))
                      return `Entrada inv\xe1lida: se esperaba instanceof ${d.expected}, recibido ${f}`;
                    return `Entrada inv\xe1lida: se esperaba ${a}, recibido ${f}`;
                  }
                  case 'invalid_value':
                    if (1 === d.values.length)
                      return `Entrada inv\xe1lida: se esperaba ${aS(d.values[0])}`;
                    return `Opci\xf3n inv\xe1lida: se esperaba una de ${ai(d.values, '|')}`;
                  case 'too_big': {
                    let b = d.inclusive ? '<=' : '<',
                      f = a[d.origin] ?? null,
                      g = c[d.origin] ?? d.origin;
                    if (f)
                      return `Demasiado grande: se esperaba que ${g ?? 'valor'} tuviera ${b}${d.maximum.toString()} ${f.unit ?? 'elementos'}`;
                    return `Demasiado grande: se esperaba que ${g ?? 'valor'} fuera ${b}${d.maximum.toString()}`;
                  }
                  case 'too_small': {
                    let b = d.inclusive ? '>=' : '>',
                      f = a[d.origin] ?? null,
                      g = c[d.origin] ?? d.origin;
                    if (f)
                      return `Demasiado peque\xf1o: se esperaba que ${g} tuviera ${b}${d.minimum.toString()} ${f.unit}`;
                    return `Demasiado peque\xf1o: se esperaba que ${g} fuera ${b}${d.minimum.toString()}`;
                  }
                  case 'invalid_format':
                    if ('starts_with' === d.format)
                      return `Cadena inv\xe1lida: debe comenzar con "${d.prefix}"`;
                    if ('ends_with' === d.format)
                      return `Cadena inv\xe1lida: debe terminar en "${d.suffix}"`;
                    if ('includes' === d.format)
                      return `Cadena inv\xe1lida: debe incluir "${d.includes}"`;
                    if ('regex' === d.format)
                      return `Cadena inv\xe1lida: debe coincidir con el patr\xf3n ${d.pattern}`;
                    return `Inv\xe1lido ${b[d.format] ?? d.format}`;
                  case 'not_multiple_of':
                    return `N\xfamero inv\xe1lido: debe ser m\xfaltiplo de ${d.divisor}`;
                  case 'unrecognized_keys':
                    return `Llave${d.keys.length > 1 ? 's' : ''} desconocida${d.keys.length > 1 ? 's' : ''}: ${ai(d.keys, ', ')}`;
                  case 'invalid_key':
                    return `Llave inv\xe1lida en ${c[d.origin] ?? d.origin}`;
                  case 'invalid_union':
                  default:
                    return 'Entrada inválida';
                  case 'invalid_element':
                    return `Valor inv\xe1lido en ${c[d.origin] ?? d.origin}`;
                }
              }),
          };
        },
        'fa',
        0,
        function () {
          let a, b, c;
          return {
            localeError:
              ((a = {
                string: { unit: 'کاراکتر', verb: 'داشته باشد' },
                file: { unit: 'بایت', verb: 'داشته باشد' },
                array: { unit: 'آیتم', verb: 'داشته باشد' },
                set: { unit: 'آیتم', verb: 'داشته باشد' },
                map: { unit: 'آیتم', verb: 'داشته باشد' },
              }),
              (b = {
                regex: 'ورودی',
                email: 'آدرس ایمیل',
                url: 'URL',
                emoji: 'ایموجی',
                uuid: 'UUID',
                uuidv4: 'UUIDv4',
                uuidv6: 'UUIDv6',
                nanoid: 'nanoid',
                guid: 'GUID',
                cuid: 'cuid',
                cuid2: 'cuid2',
                ulid: 'ULID',
                xid: 'XID',
                ksuid: 'KSUID',
                datetime: 'تاریخ و زمان ایزو',
                date: 'تاریخ ایزو',
                time: 'زمان ایزو',
                duration: 'مدت زمان ایزو',
                ipv4: 'IPv4 آدرس',
                ipv6: 'IPv6 آدرس',
                mac: 'MAC آدرس',
                cidrv4: 'IPv4 دامنه',
                cidrv6: 'IPv6 دامنه',
                base64: 'base64-encoded رشته',
                base64url: 'base64url-encoded رشته',
                json_string: 'JSON رشته',
                e164: 'E.164 عدد',
                credit_card: 'شماره کارت اعتباری',
                currency_code: 'کد ارز',
                iban: 'IBAN',
                jwt: 'JWT',
                template_literal: 'ورودی',
              }),
              (c = { nan: 'NaN', number: 'عدد', array: 'آرایه' }),
              (d) => {
                switch (d.code) {
                  case 'invalid_type': {
                    let a = c[d.expected] ?? d.expected,
                      b = bd(d.input),
                      f = c[b] ?? b;
                    if (/^[A-Z]/.test(d.expected))
                      return `ورودی نامعتبر: می‌بایست instanceof ${d.expected} می‌بود، ${f} دریافت شد`;
                    return `ورودی نامعتبر: می‌بایست ${a} می‌بود، ${f} دریافت شد`;
                  }
                  case 'invalid_value':
                    if (1 === d.values.length)
                      return `ورودی نامعتبر: می‌بایست ${aS(d.values[0])} می‌بود`;
                    return `گزینه نامعتبر: می‌بایست یکی از ${ai(d.values, '|')} می‌بود`;
                  case 'too_big': {
                    let b = d.inclusive ? '<=' : '<',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `خیلی بزرگ: ${d.origin ?? 'مقدار'} باید ${b}${d.maximum.toString()} ${c.unit ?? 'عنصر'} باشد`;
                    return `خیلی بزرگ: ${d.origin ?? 'مقدار'} باید ${b}${d.maximum.toString()} باشد`;
                  }
                  case 'too_small': {
                    let b = d.inclusive ? '>=' : '>',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `خیلی کوچک: ${d.origin} باید ${b}${d.minimum.toString()} ${c.unit} باشد`;
                    return `خیلی کوچک: ${d.origin} باید ${b}${d.minimum.toString()} باشد`;
                  }
                  case 'invalid_format':
                    if ('starts_with' === d.format)
                      return `رشته نامعتبر: باید با "${d.prefix}" شروع شود`;
                    if ('ends_with' === d.format)
                      return `رشته نامعتبر: باید با "${d.suffix}" تمام شود`;
                    if ('includes' === d.format)
                      return `رشته نامعتبر: باید شامل "${d.includes}" باشد`;
                    if ('regex' === d.format)
                      return `رشته نامعتبر: باید با الگوی ${d.pattern} مطابقت داشته باشد`;
                    return `${b[d.format] ?? d.format} نامعتبر`;
                  case 'not_multiple_of':
                    return `عدد نامعتبر: باید مضرب ${d.divisor} باشد`;
                  case 'unrecognized_keys':
                    return `کلید${d.keys.length > 1 ? 'های' : ''} ناشناس: ${ai(d.keys, ', ')}`;
                  case 'invalid_key':
                    return `کلید ناشناس در ${d.origin}`;
                  case 'invalid_union':
                  default:
                    return 'ورودی نامعتبر';
                  case 'invalid_element':
                    return `مقدار نامعتبر در ${d.origin}`;
                }
              }),
          };
        },
        'fi',
        0,
        function () {
          let a, b, c;
          return {
            localeError:
              ((a = {
                string: { unit: 'merkkiä', subject: 'merkkijonon' },
                file: { unit: 'tavua', subject: 'tiedoston' },
                array: { unit: 'alkiota', subject: 'listan' },
                set: { unit: 'alkiota', subject: 'joukon' },
                map: { unit: 'alkiota', subject: 'kuvauksen' },
                number: { unit: '', subject: 'luvun' },
                bigint: { unit: '', subject: 'suuren kokonaisluvun' },
                int: { unit: '', subject: 'kokonaisluvun' },
                date: { unit: '', subject: 'päivämäärän' },
              }),
              (b = {
                regex: 'säännöllinen lauseke',
                email: 'sähköpostiosoite',
                url: 'URL-osoite',
                emoji: 'emoji',
                uuid: 'UUID',
                uuidv4: 'UUIDv4',
                uuidv6: 'UUIDv6',
                nanoid: 'nanoid',
                guid: 'GUID',
                cuid: 'cuid',
                cuid2: 'cuid2',
                ulid: 'ULID',
                xid: 'XID',
                ksuid: 'KSUID',
                datetime: 'ISO-aikaleima',
                date: 'ISO-päivämäärä',
                time: 'ISO-aika',
                duration: 'ISO-kesto',
                ipv4: 'IPv4-osoite',
                ipv6: 'IPv6-osoite',
                mac: 'MAC-osoite',
                cidrv4: 'IPv4-alue',
                cidrv6: 'IPv6-alue',
                base64: 'base64-koodattu merkkijono',
                base64url: 'base64url-koodattu merkkijono',
                json_string: 'JSON-merkkijono',
                e164: 'E.164-luku',
                credit_card: 'luottokortin numero',
                currency_code: 'valuuttakoodi',
                iban: 'IBAN',
                jwt: 'JWT',
                template_literal: 'templaattimerkkijono',
              }),
              (c = { nan: 'NaN' }),
              (d) => {
                switch (d.code) {
                  case 'invalid_type': {
                    let a = c[d.expected] ?? d.expected,
                      b = bd(d.input),
                      f = c[b] ?? b;
                    if (/^[A-Z]/.test(d.expected))
                      return `Virheellinen tyyppi: odotettiin instanceof ${d.expected}, oli ${f}`;
                    return `Virheellinen tyyppi: odotettiin ${a}, oli ${f}`;
                  }
                  case 'invalid_value':
                    if (1 === d.values.length)
                      return `Virheellinen sy\xf6te: t\xe4ytyy olla ${aS(d.values[0])}`;
                    return `Virheellinen valinta: t\xe4ytyy olla yksi seuraavista: ${ai(d.values, '|')}`;
                  case 'too_big': {
                    let b = d.inclusive ? '<=' : '<',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `Liian suuri: ${c.subject} t\xe4ytyy olla ${b}${d.maximum.toString()} ${c.unit}`.trim();
                    return `Liian suuri: arvon t\xe4ytyy olla ${b}${d.maximum.toString()}`;
                  }
                  case 'too_small': {
                    let b = d.inclusive ? '>=' : '>',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `Liian pieni: ${c.subject} t\xe4ytyy olla ${b}${d.minimum.toString()} ${c.unit}`.trim();
                    return `Liian pieni: arvon t\xe4ytyy olla ${b}${d.minimum.toString()}`;
                  }
                  case 'invalid_format':
                    if ('starts_with' === d.format)
                      return `Virheellinen sy\xf6te: t\xe4ytyy alkaa "${d.prefix}"`;
                    if ('ends_with' === d.format)
                      return `Virheellinen sy\xf6te: t\xe4ytyy loppua "${d.suffix}"`;
                    if ('includes' === d.format)
                      return `Virheellinen sy\xf6te: t\xe4ytyy sis\xe4lt\xe4\xe4 "${d.includes}"`;
                    if ('regex' === d.format)
                      return `Virheellinen sy\xf6te: t\xe4ytyy vastata s\xe4\xe4nn\xf6llist\xe4 lauseketta ${d.pattern}`;
                    return `Virheellinen ${b[d.format] ?? d.format}`;
                  case 'not_multiple_of':
                    return `Virheellinen luku: t\xe4ytyy olla luvun ${d.divisor} monikerta`;
                  case 'unrecognized_keys':
                    return `${d.keys.length > 1 ? 'Tuntemattomat avaimet' : 'Tuntematon avain'}: ${ai(d.keys, ', ')}`;
                  case 'invalid_key':
                    return 'Virheellinen avain tietueessa';
                  case 'invalid_union':
                    return 'Virheellinen unioni';
                  case 'invalid_element':
                    return 'Virheellinen arvo joukossa';
                  default:
                    return 'Virheellinen syöte';
                }
              }),
          };
        },
        'fr',
        0,
        function () {
          let a, b, c;
          return {
            localeError:
              ((a = {
                string: { unit: 'caractères', verb: 'avoir' },
                file: { unit: 'octets', verb: 'avoir' },
                array: { unit: 'éléments', verb: 'avoir' },
                set: { unit: 'éléments', verb: 'avoir' },
              }),
              (b = {
                regex: 'expression régulière',
                email: 'adresse e-mail',
                url: 'URL',
                emoji: 'emoji',
                uuid: 'UUID',
                uuidv4: 'UUIDv4',
                uuidv6: 'UUIDv6',
                nanoid: 'nanoid',
                guid: 'GUID',
                cuid: 'cuid',
                cuid2: 'cuid2',
                ulid: 'ULID',
                xid: 'XID',
                ksuid: 'KSUID',
                datetime: 'date et heure ISO',
                date: 'date ISO',
                time: 'heure ISO',
                duration: 'durée ISO',
                ipv4: 'adresse IPv4',
                ipv6: 'adresse IPv6',
                mac: 'adresse MAC',
                cidrv4: 'plage IPv4',
                cidrv6: 'plage IPv6',
                base64: 'chaîne de caractères encodée en base64',
                base64url: 'chaîne de caractères encodée en base64url',
                json_string: 'chaîne de caractères JSON',
                e164: 'numéro au format E.164',
                credit_card: 'numéro de carte de crédit',
                currency_code: 'code de devise',
                iban: 'IBAN',
                jwt: 'JWT',
                template_literal: 'entrée',
              }),
              (c = {
                string: 'chaîne de caractères',
                number: 'nombre',
                int: 'entier',
                boolean: 'booléen',
                bigint: 'grand entier',
                symbol: 'symbole',
                undefined: 'indéfini',
                null: 'null',
                never: 'jamais',
                void: 'vide',
                date: 'date',
                array: 'tableau',
                object: 'objet',
                tuple: 'tuple',
                record: 'record',
                map: 'map',
                set: 'ensemble',
                file: 'fichier',
                nonoptional: 'non optionnel',
                nan: 'NaN',
                function: 'fonction',
              }),
              (d) => {
                switch (d.code) {
                  case 'invalid_type': {
                    let a = c[d.expected] ?? d.expected,
                      b = bd(d.input),
                      f = c[b] ?? b;
                    if (/^[A-Z]/.test(d.expected))
                      return `Entr\xe9e invalide : instance de ${d.expected} attendu, ${f} re\xe7u`;
                    return `Entr\xe9e invalide : ${a} attendu, ${f} re\xe7u`;
                  }
                  case 'invalid_value':
                    if (1 === d.values.length)
                      return `Entr\xe9e invalide : ${aS(d.values[0])} attendu`;
                    return `Option invalide : une valeur parmi ${ai(d.values, '|')} attendue`;
                  case 'too_big': {
                    let b = d.inclusive ? '<=' : '<',
                      f = a[d.origin] ?? null;
                    if (f)
                      return `Trop grand : ${c[d.origin] ?? 'valeur'} doit ${f.verb} ${b}${d.maximum.toString()} ${f.unit ?? 'élément(s)'}`;
                    return `Trop grand : ${c[d.origin] ?? 'valeur'} doit \xeatre ${b}${d.maximum.toString()}`;
                  }
                  case 'too_small': {
                    let b = d.inclusive ? '>=' : '>',
                      f = a[d.origin] ?? null;
                    if (f)
                      return `Trop petit : ${c[d.origin] ?? 'valeur'} doit ${f.verb} ${b}${d.minimum.toString()} ${f.unit}`;
                    return `Trop petit : ${c[d.origin] ?? 'valeur'} doit \xeatre ${b}${d.minimum.toString()}`;
                  }
                  case 'invalid_format':
                    if ('starts_with' === d.format)
                      return `Cha\xeene de caract\xe8res invalide : doit commencer par "${d.prefix}"`;
                    if ('ends_with' === d.format)
                      return `Cha\xeene de caract\xe8res invalide : doit se terminer par "${d.suffix}"`;
                    if ('includes' === d.format)
                      return `Cha\xeene de caract\xe8res invalide : doit inclure "${d.includes}"`;
                    if ('regex' === d.format)
                      return `Cha\xeene de caract\xe8res invalide : doit correspondre au motif ${d.pattern}`;
                    return `${b[d.format] ?? d.format} invalide`;
                  case 'not_multiple_of':
                    return `Nombre invalide : doit \xeatre un multiple de ${d.divisor}`;
                  case 'unrecognized_keys':
                    return `Cl\xe9${d.keys.length > 1 ? 's' : ''} non reconnue${d.keys.length > 1 ? 's' : ''} : ${ai(d.keys, ', ')}`;
                  case 'invalid_key':
                    return `Cl\xe9 invalide dans ${d.origin}`;
                  case 'invalid_union':
                  default:
                    return 'Entrée invalide';
                  case 'invalid_element':
                    return `Valeur invalide dans ${d.origin}`;
                }
              }),
          };
        },
        'frCA',
        0,
        function () {
          let a, b, c;
          return {
            localeError:
              ((a = {
                string: { unit: 'caractères', verb: 'avoir' },
                file: { unit: 'octets', verb: 'avoir' },
                array: { unit: 'éléments', verb: 'avoir' },
                set: { unit: 'éléments', verb: 'avoir' },
                map: { unit: 'éléments', verb: 'avoir' },
              }),
              (b = {
                regex: 'entrée',
                email: 'adresse courriel',
                url: 'URL',
                emoji: 'emoji',
                uuid: 'UUID',
                uuidv4: 'UUIDv4',
                uuidv6: 'UUIDv6',
                nanoid: 'nanoid',
                guid: 'GUID',
                cuid: 'cuid',
                cuid2: 'cuid2',
                ulid: 'ULID',
                xid: 'XID',
                ksuid: 'KSUID',
                datetime: 'date-heure ISO',
                date: 'date ISO',
                time: 'heure ISO',
                duration: 'durée ISO',
                ipv4: 'adresse IPv4',
                ipv6: 'adresse IPv6',
                mac: 'adresse MAC',
                cidrv4: 'plage IPv4',
                cidrv6: 'plage IPv6',
                base64: 'chaîne encodée en base64',
                base64url: 'chaîne encodée en base64url',
                json_string: 'chaîne JSON',
                e164: 'numéro E.164',
                credit_card: 'numéro de carte de crédit',
                currency_code: 'code de devise',
                iban: 'IBAN',
                jwt: 'JWT',
                template_literal: 'entrée',
              }),
              (c = { nan: 'NaN' }),
              (d) => {
                switch (d.code) {
                  case 'invalid_type': {
                    let a = c[d.expected] ?? d.expected,
                      b = bd(d.input),
                      f = c[b] ?? b;
                    if (/^[A-Z]/.test(d.expected))
                      return `Entr\xe9e invalide : attendu instanceof ${d.expected}, re\xe7u ${f}`;
                    return `Entr\xe9e invalide : attendu ${a}, re\xe7u ${f}`;
                  }
                  case 'invalid_value':
                    if (1 === d.values.length)
                      return `Entr\xe9e invalide : attendu ${aS(d.values[0])}`;
                    return `Option invalide : attendu l'une des valeurs suivantes ${ai(d.values, '|')}`;
                  case 'too_big': {
                    let b = d.inclusive ? '≤' : '<',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `Trop grand : attendu que ${d.origin ?? 'la valeur'} ait ${b}${d.maximum.toString()} ${c.unit}`;
                    return `Trop grand : attendu que ${d.origin ?? 'la valeur'} soit ${b}${d.maximum.toString()}`;
                  }
                  case 'too_small': {
                    let b = d.inclusive ? '≥' : '>',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `Trop petit : attendu que ${d.origin} ait ${b}${d.minimum.toString()} ${c.unit}`;
                    return `Trop petit : attendu que ${d.origin} soit ${b}${d.minimum.toString()}`;
                  }
                  case 'invalid_format':
                    if ('starts_with' === d.format)
                      return `Cha\xeene invalide : doit commencer par "${d.prefix}"`;
                    if ('ends_with' === d.format)
                      return `Cha\xeene invalide : doit se terminer par "${d.suffix}"`;
                    if ('includes' === d.format)
                      return `Cha\xeene invalide : doit inclure "${d.includes}"`;
                    if ('regex' === d.format)
                      return `Cha\xeene invalide : doit correspondre au motif ${d.pattern}`;
                    return `${b[d.format] ?? d.format} invalide`;
                  case 'not_multiple_of':
                    return `Nombre invalide : doit \xeatre un multiple de ${d.divisor}`;
                  case 'unrecognized_keys':
                    return `Cl\xe9${d.keys.length > 1 ? 's' : ''} non reconnue${d.keys.length > 1 ? 's' : ''} : ${ai(d.keys, ', ')}`;
                  case 'invalid_key':
                    return `Cl\xe9 invalide dans ${d.origin}`;
                  case 'invalid_union':
                  default:
                    return 'Entrée invalide';
                  case 'invalid_element':
                    return `Valeur invalide dans ${d.origin}`;
                }
              }),
          };
        },
        'gu',
        0,
        function () {
          let a, b, c;
          return {
            localeError:
              ((a = {
                string: { unit: 'અક્ષર', verb: 'હોવા જોઈએ' },
                file: { unit: 'બાયટ', verb: 'હોવા જોઈએ' },
                array: { unit: 'આઇટમ', verb: 'હોવા જોઈએ' },
                set: { unit: 'આઇટમ', verb: 'હોવા જોઈએ' },
                map: { unit: 'એન્ટ્રી', verb: 'હોવા જોઈએ' },
              }),
              (b = {
                regex: 'ઇનપુટ',
                email: 'ઈમેઇલ એડ્રેસ',
                url: 'URL',
                emoji: 'ઇમોજી',
                uuid: 'UUID',
                uuidv4: 'UUIDv4',
                uuidv6: 'UUIDv6',
                nanoid: 'nanoid',
                guid: 'GUID',
                cuid: 'cuid',
                cuid2: 'cuid2',
                ulid: 'ULID',
                xid: 'XID',
                ksuid: 'KSUID',
                datetime: 'ISO તારીખ અને સમય',
                date: 'ISO તારીખ',
                time: 'ISO સમય',
                duration: 'ISO અવધિ',
                ipv4: 'IPv4 એડ્રેસ',
                ipv6: 'IPv6 એડ્રેસ',
                mac: 'MAC એડ્રેસ',
                cidrv4: 'IPv4 શ્રેણી',
                cidrv6: 'IPv6 શ્રેણી',
                base64: 'base64-એન્કોડેડ સ્ટ્રિંગ',
                base64url: 'base64url-એન્કોડેડ સ્ટ્રિંગ',
                json_string: 'JSON સ્ટ્રિંગ',
                e164: 'E.164 નંબર',
                credit_card: 'ક્રેડિટ કાર્ડ નંબર',
                currency_code: 'ચલણ કોડ',
                iban: 'IBAN',
                jwt: 'JWT',
                template_literal: 'ઇનપુટ',
              }),
              (c = { nan: 'NaN' }),
              (d) => {
                switch (d.code) {
                  case 'invalid_type': {
                    let a = c[d.expected] ?? d.expected,
                      b = bd(d.input),
                      f = c[b] ?? b;
                    return `અમાન્ય ઇનપુટ: અપેક્ષિત ${a}, પ્રાપ્ત ${f}`;
                  }
                  case 'invalid_value':
                    if (1 === d.values.length) return `અમાન્ય ઇનપુટ: અપેક્ષિત ${aS(d.values[0])}`;
                    return `અમાન્ય વિકલ્પ: ${ai(d.values, ' | ')} માધ્યમથી એક અપેક્ષિત`;
                  case 'too_big': {
                    let b = d.inclusive ? '<=' : '<',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `ખૂબ મોટું: ${d.origin ?? 'મૂલ્ય'} ${b}${d.maximum.toString()} ${c.unit ?? 'એલિમેન્ટ'} હોવા જોઈએ`;
                    return `ખૂબ મોટું: ${d.origin ?? 'મૂલ્ય'} ${b}${d.maximum.toString()} હોવું જોઈએ`;
                  }
                  case 'too_small': {
                    let b = d.inclusive ? '>=' : '>',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `ખૂબ નાનું: ${d.origin} ${b}${d.minimum.toString()} ${c.unit} હોવા જોઈએ`;
                    return `ખૂબ નાનું: ${d.origin} ${b}${d.minimum.toString()} હોવું જોઈએ`;
                  }
                  case 'invalid_format':
                    if ('starts_with' === d.format)
                      return `અમાન્ય સ્ટ્રિંગ: "${d.prefix}" થી શરૂ થવું જોઈએ`;
                    if ('ends_with' === d.format)
                      return `અમાન્ય સ્ટ્રિંગ: "${d.suffix}" પર સમાપ્ત થવું જોઈએ`;
                    if ('includes' === d.format)
                      return `અમાન્ય સ્ટ્રિંગ: "${d.includes}" શામેલ હોવું જોઈએ`;
                    if ('regex' === d.format)
                      return `અમાન્ય સ્ટ્રિંગ: પેટર્ન ${d.pattern} સાથે મેળ ખાવું જોઈએ`;
                    return `અમાન્ય ${b[d.format] ?? d.format}`;
                  case 'not_multiple_of':
                    return `અમાન્ય નંબર: ${d.divisor} નો ગુણાંક હોવો જોઈએ`;
                  case 'unrecognized_keys':
                    return `ઓળખી શકાતા નહીં તે કી${d.keys.length > 1 ? 'ઓ' : ''}: ${ai(d.keys, ', ')}`;
                  case 'invalid_key':
                    return `${d.origin} માં અમાન્ય કી`;
                  case 'invalid_union':
                    if (d.options && Array.isArray(d.options) && d.options.length > 0) {
                      let a = d.options.map((a) => `'${a}'`).join(' | ');
                      return `અમાન્ય ડિસ્ક્રિમિનેટર મૂલ્ય. અપેક્ષિત ${a}`;
                    }
                    return 'અમાન્ય ઇનપુટ';
                  case 'invalid_element':
                    return `${d.origin} માં અમાન્ય મૂલ્ય`;
                  default:
                    return 'અમાન્ય ઇનપુટ';
                }
              }),
          };
        },
        'he',
        0,
        function () {
          let a, b, c, d, f, g, h, i, j;
          return {
            localeError:
              ((a = {
                string: { label: 'מחרוזת', gender: 'f' },
                number: { label: 'מספר', gender: 'm' },
                boolean: { label: 'ערך בוליאני', gender: 'm' },
                bigint: { label: 'BigInt', gender: 'm' },
                date: { label: 'תאריך', gender: 'm' },
                array: { label: 'מערך', gender: 'm' },
                object: { label: 'אובייקט', gender: 'm' },
                null: { label: 'ערך ריק (null)', gender: 'm' },
                undefined: { label: 'ערך לא מוגדר (undefined)', gender: 'm' },
                symbol: { label: 'סימבול (Symbol)', gender: 'm' },
                function: { label: 'פונקציה', gender: 'f' },
                map: { label: 'מפה (Map)', gender: 'f' },
                set: { label: 'קבוצה (Set)', gender: 'f' },
                file: { label: 'קובץ', gender: 'm' },
                promise: { label: 'Promise', gender: 'm' },
                NaN: { label: 'NaN', gender: 'm' },
                unknown: { label: 'ערך לא ידוע', gender: 'm' },
                value: { label: 'ערך', gender: 'm' },
              }),
              (b = {
                string: { unit: 'תווים', shortLabel: 'קצר', longLabel: 'ארוך' },
                file: { unit: 'בייטים', shortLabel: 'קטן', longLabel: 'גדול' },
                array: { unit: 'פריטים', shortLabel: 'קטן', longLabel: 'גדול' },
                set: { unit: 'פריטים', shortLabel: 'קטן', longLabel: 'גדול' },
                number: { unit: '', shortLabel: 'קטן', longLabel: 'גדול' },
              }),
              (c = (b) => (b ? a[b] : void 0)),
              (d = (b) => {
                let d = c(b);
                return d ? d.label : (b ?? a.unknown.label);
              }),
              (f = (a) => `ה${d(a)}`),
              (g = (a) => {
                let b = c(a);
                return 'f' === (b?.gender ?? 'm') ? 'צריכה להיות' : 'צריך להיות';
              }),
              (h = (a) => (a ? (b[a] ?? null) : null)),
              (i = {
                regex: { label: 'קלט', gender: 'm' },
                email: { label: 'כתובת אימייל', gender: 'f' },
                url: { label: 'כתובת רשת', gender: 'f' },
                emoji: { label: "אימוג'י", gender: 'm' },
                uuid: { label: 'UUID', gender: 'm' },
                uuidv4: { label: 'UUIDv4', gender: 'm' },
                uuidv6: { label: 'UUIDv6', gender: 'm' },
                nanoid: { label: 'nanoid', gender: 'm' },
                guid: { label: 'GUID', gender: 'm' },
                cuid: { label: 'cuid', gender: 'm' },
                cuid2: { label: 'cuid2', gender: 'm' },
                ulid: { label: 'ULID', gender: 'm' },
                xid: { label: 'XID', gender: 'm' },
                ksuid: { label: 'KSUID', gender: 'm' },
                datetime: { label: 'תאריך וזמן ISO', gender: 'm' },
                date: { label: 'תאריך ISO', gender: 'm' },
                time: { label: 'זמן ISO', gender: 'm' },
                duration: { label: 'משך זמן ISO', gender: 'm' },
                ipv4: { label: 'כתובת IPv4', gender: 'f' },
                ipv6: { label: 'כתובת IPv6', gender: 'f' },
                mac: { label: 'כתובת MAC', gender: 'f' },
                cidrv4: { label: 'טווח IPv4', gender: 'm' },
                cidrv6: { label: 'טווח IPv6', gender: 'm' },
                base64: { label: 'מחרוזת בבסיס 64', gender: 'f' },
                base64url: { label: 'מחרוזת בבסיס 64 לכתובות רשת', gender: 'f' },
                json_string: { label: 'מחרוזת JSON', gender: 'f' },
                e164: { label: 'מספר E.164', gender: 'm' },
                credit_card: { label: 'מספר כרטיס אשראי', gender: 'm' },
                currency_code: { label: 'קוד מטבע', gender: 'm' },
                iban: { label: 'IBAN', gender: 'm' },
                jwt: { label: 'JWT', gender: 'm' },
                template_literal: { label: 'קלט', gender: 'm' },
                ends_with: { label: 'קלט', gender: 'm' },
                includes: { label: 'קלט', gender: 'm' },
                lowercase: { label: 'קלט', gender: 'm' },
                starts_with: { label: 'קלט', gender: 'm' },
                uppercase: { label: 'קלט', gender: 'm' },
              }),
              (j = { nan: 'NaN' }),
              (b) => {
                switch (b.code) {
                  case 'invalid_type': {
                    let c = b.expected,
                      f = j[c ?? ''] ?? d(c),
                      g = bd(b.input),
                      h = j[g] ?? a[g]?.label ?? g;
                    if (/^[A-Z]/.test(b.expected))
                      return `קלט לא תקין: צריך להיות instanceof ${b.expected}, התקבל ${h}`;
                    return `קלט לא תקין: צריך להיות ${f}, התקבל ${h}`;
                  }
                  case 'invalid_value': {
                    if (1 === b.values.length)
                      return `ערך לא תקין: הערך חייב להיות ${aS(b.values[0])}`;
                    let a = b.values.map((a) => aS(a));
                    if (2 === b.values.length)
                      return `ערך לא תקין: האפשרויות המתאימות הן ${a[0]} או ${a[1]}`;
                    let c = a[a.length - 1],
                      d = a.slice(0, -1).join(', ');
                    return `ערך לא תקין: האפשרויות המתאימות הן ${d} או ${c}`;
                  }
                  case 'too_big': {
                    let a = h(b.origin),
                      c = f(b.origin ?? 'value');
                    if ('string' === b.origin)
                      return `${a?.longLabel ?? 'ארוך'} מדי: ${c} צריכה להכיל ${b.maximum.toString()} ${a?.unit ?? ''} ${b.inclusive ? 'או פחות' : 'לכל היותר'}`.trim();
                    if ('number' === b.origin) {
                      let a = b.inclusive ? `קטן או שווה ל-${b.maximum}` : `קטן מ-${b.maximum}`;
                      return `גדול מדי: ${c} צריך להיות ${a}`;
                    }
                    if ('array' === b.origin || 'set' === b.origin) {
                      let d = 'set' === b.origin ? 'צריכה' : 'צריך',
                        f = b.inclusive
                          ? `${b.maximum} ${a?.unit ?? ''} או פחות`
                          : `פחות מ-${b.maximum} ${a?.unit ?? ''}`;
                      return `גדול מדי: ${c} ${d} להכיל ${f}`.trim();
                    }
                    let d = b.inclusive ? '<=' : '<',
                      i = g(b.origin ?? 'value');
                    if (a?.unit)
                      return `${a.longLabel} מדי: ${c} ${i} ${d}${b.maximum.toString()} ${a.unit}`;
                    return `${a?.longLabel ?? 'גדול'} מדי: ${c} ${i} ${d}${b.maximum.toString()}`;
                  }
                  case 'too_small': {
                    let a = h(b.origin),
                      c = f(b.origin ?? 'value');
                    if ('string' === b.origin)
                      return `${a?.shortLabel ?? 'קצר'} מדי: ${c} צריכה להכיל ${b.minimum.toString()} ${a?.unit ?? ''} ${b.inclusive ? 'או יותר' : 'לפחות'}`.trim();
                    if ('number' === b.origin) {
                      let a = b.inclusive ? `גדול או שווה ל-${b.minimum}` : `גדול מ-${b.minimum}`;
                      return `קטן מדי: ${c} צריך להיות ${a}`;
                    }
                    if ('array' === b.origin || 'set' === b.origin) {
                      let d = 'set' === b.origin ? 'צריכה' : 'צריך';
                      if (1 === b.minimum && b.inclusive) {
                        let a = (b.origin, 'לפחות פריט אחד');
                        return `קטן מדי: ${c} ${d} להכיל ${a}`;
                      }
                      let f = b.inclusive
                        ? `${b.minimum} ${a?.unit ?? ''} או יותר`
                        : `יותר מ-${b.minimum} ${a?.unit ?? ''}`;
                      return `קטן מדי: ${c} ${d} להכיל ${f}`.trim();
                    }
                    let d = b.inclusive ? '>=' : '>',
                      i = g(b.origin ?? 'value');
                    if (a?.unit)
                      return `${a.shortLabel} מדי: ${c} ${i} ${d}${b.minimum.toString()} ${a.unit}`;
                    return `${a?.shortLabel ?? 'קטן'} מדי: ${c} ${i} ${d}${b.minimum.toString()}`;
                  }
                  case 'invalid_format': {
                    if ('starts_with' === b.format) return `המחרוזת חייבת להתחיל ב "${b.prefix}"`;
                    if ('ends_with' === b.format) return `המחרוזת חייבת להסתיים ב "${b.suffix}"`;
                    if ('includes' === b.format) return `המחרוזת חייבת לכלול "${b.includes}"`;
                    if ('regex' === b.format) return `המחרוזת חייבת להתאים לתבנית ${b.pattern}`;
                    let a = i[b.format],
                      c = a?.label ?? b.format,
                      d = a?.gender ?? 'm';
                    return `${c} לא ${'f' === d ? 'תקינה' : 'תקין'}`;
                  }
                  case 'not_multiple_of':
                    return `מספר לא תקין: חייב להיות מכפלה של ${b.divisor}`;
                  case 'unrecognized_keys':
                    return `מפתח${b.keys.length > 1 ? 'ות' : ''} לא מזוה${b.keys.length > 1 ? 'ים' : 'ה'}: ${ai(b.keys, ', ')}`;
                  case 'invalid_key':
                    return 'שדה לא תקין באובייקט';
                  case 'invalid_union':
                  default:
                    return 'קלט לא תקין';
                  case 'invalid_element': {
                    let a = f(b.origin ?? 'array');
                    return `ערך לא תקין ב${a}`;
                  }
                }
              }),
          };
        },
        'hi',
        0,
        function () {
          let a, b, c;
          return {
            localeError:
              ((a = {
                string: { unit: 'अक्षर', verb: 'रखने के लिए' },
                file: { unit: 'बाइट्स', verb: 'रखने के लिए' },
                array: { unit: 'तत्व', verb: 'रखने के लिए' },
                set: { unit: 'तत्व', verb: 'रखने के लिए' },
                map: { unit: 'प्रविष्टियाँ', verb: 'रखने के लिए' },
              }),
              (b = {
                regex: 'इनपुट',
                email: 'ईमेल पता',
                url: 'URL',
                emoji: 'इमोजी',
                uuid: 'UUID',
                uuidv4: 'UUIDv4',
                uuidv6: 'UUIDv6',
                nanoid: 'nanoid',
                guid: 'GUID',
                cuid: 'cuid',
                cuid2: 'cuid2',
                ulid: 'ULID',
                xid: 'XID',
                ksuid: 'KSUID',
                datetime: 'ISO तिथि और समय',
                date: 'ISO तिथि',
                time: 'ISO समय',
                duration: 'ISO अवधि',
                ipv4: 'IPv4 पता',
                ipv6: 'IPv6 पता',
                mac: 'MAC पता',
                cidrv4: 'IPv4 श्रेणी',
                cidrv6: 'IPv6 श्रेणी',
                base64: 'Base64-एन्कोडेड स्ट्रिंग',
                base64url: 'Base64URL-एन्कोडेड स्ट्रिंग',
                json_string: 'JSON स्ट्रिंग',
                e164: 'E.164 संख्या',
                credit_card: 'क्रेडिट कार्ड संख्या',
                currency_code: 'मुद्रा कोड',
                iban: 'IBAN',
                jwt: 'JWT',
                template_literal: 'इनपुट',
              }),
              (c = { nan: 'NaN' }),
              (d) => {
                switch (d.code) {
                  case 'invalid_type': {
                    let a = c[d.expected] ?? d.expected,
                      b = bd(d.input),
                      f = c[b] ?? b;
                    return `अमान्य इनपुट: अपेक्षित ${a}, प्राप्त ${f}`;
                  }
                  case 'invalid_value':
                    if (1 === d.values.length) return `अमान्य इनपुट: अपेक्षित ${aS(d.values[0])}`;
                    return `अमान्य विकल्प: अपेक्षित मानों में से एक ${ai(d.values, '|')}`;
                  case 'too_big': {
                    let b = d.inclusive ? '<=' : '<',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `बहुत बड़ा: अपेक्षित था कि ${d.origin ?? 'मान'} में ${b}${d.maximum} ${c.unit} हों`;
                    return `बहुत बड़ा: अपेक्षित था कि ${d.origin ?? 'मान'} ${b}${d.maximum} हो`;
                  }
                  case 'too_small': {
                    let b = d.inclusive ? '>=' : '>',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `बहुत छोटा: अपेक्षित था कि ${d.origin} में ${b}${d.minimum} ${c.unit} हों`;
                    return `बहुत छोटा: अपेक्षित था कि ${d.origin} ${b}${d.minimum} हो`;
                  }
                  case 'invalid_format':
                    if ('starts_with' === d.format)
                      return `अमान्य स्ट्रिंग: "${d.prefix}" से शुरू होना चाहिए`;
                    if ('ends_with' === d.format)
                      return `अमान्य स्ट्रिंग: "${d.suffix}" पर समाप्त होना चाहिए`;
                    if ('includes' === d.format)
                      return `अमान्य स्ट्रिंग: इसमें "${d.includes}" शामिल होना चाहिए`;
                    if ('regex' === d.format)
                      return `अमान्य स्ट्रिंग: पैटर्न ${d.pattern} से मेल खाना चाहिए`;
                    return `अमान्य ${b[d.format] ?? d.format}`;
                  case 'not_multiple_of':
                    return `अमान्य संख्या: यह ${d.divisor} का गुणज होना चाहिए`;
                  case 'unrecognized_keys':
                    return `अपरिचित कुंजी${d.keys.length > 1 ? 'याँ' : ''}: ${ai(d.keys, ', ')}`;
                  case 'invalid_key':
                    return `अमान्य कुंजी: ${d.origin} में`;
                  case 'invalid_union':
                    if (d.options && Array.isArray(d.options) && d.options.length > 0) {
                      let a = d.options.map((a) => `'${a}'`).join(' | ');
                      return `अमान्य डिस्क्रिमिनेटर मान: अपेक्षित ${a}`;
                    }
                    return 'अमान्य इनपुट';
                  case 'invalid_element':
                    return `अमान्य मान: ${d.origin} में`;
                  default:
                    return 'अमान्य इनपुट';
                }
              }),
          };
        },
        'hr',
        0,
        function () {
          let a, b, c;
          return {
            localeError:
              ((a = {
                string: { unit: 'znakova', verb: 'imati' },
                file: { unit: 'bajtova', verb: 'imati' },
                array: { unit: 'stavki', verb: 'imati' },
                set: { unit: 'stavki', verb: 'imati' },
              }),
              (b = {
                regex: 'unos',
                email: 'email adresa',
                url: 'URL',
                emoji: 'emoji',
                uuid: 'UUID',
                uuidv4: 'UUIDv4',
                uuidv6: 'UUIDv6',
                nanoid: 'nanoid',
                guid: 'GUID',
                cuid: 'cuid',
                cuid2: 'cuid2',
                ulid: 'ULID',
                xid: 'XID',
                ksuid: 'KSUID',
                datetime: 'ISO datum i vrijeme',
                date: 'ISO datum',
                time: 'ISO vrijeme',
                duration: 'ISO trajanje',
                ipv4: 'IPv4 adresa',
                ipv6: 'IPv6 adresa',
                mac: 'MAC adresa',
                cidrv4: 'IPv4 raspon',
                cidrv6: 'IPv6 raspon',
                base64: 'base64 kodirani tekst',
                base64url: 'base64url kodirani tekst',
                json_string: 'JSON tekst',
                e164: 'E.164 broj',
                credit_card: 'broj kreditne kartice',
                currency_code: 'kod valute',
                iban: 'IBAN',
                jwt: 'JWT',
                template_literal: 'unos',
              }),
              (c = {
                nan: 'NaN',
                string: 'tekst',
                number: 'broj',
                boolean: 'boolean',
                array: 'niz',
                object: 'objekt',
                set: 'skup',
                file: 'datoteka',
                date: 'datum',
                bigint: 'bigint',
                symbol: 'simbol',
                undefined: 'undefined',
                null: 'null',
                function: 'funkcija',
                map: 'mapa',
              }),
              (d) => {
                switch (d.code) {
                  case 'invalid_type': {
                    let a = c[d.expected] ?? d.expected,
                      b = bd(d.input),
                      f = c[b] ?? b;
                    if (/^[A-Z]/.test(d.expected))
                      return `Neispravan unos: očekuje se instanceof ${d.expected}, a primljeno je ${f}`;
                    return `Neispravan unos: očekuje se ${a}, a primljeno je ${f}`;
                  }
                  case 'invalid_value':
                    if (1 === d.values.length)
                      return `Neispravna vrijednost: očekivano ${aS(d.values[0])}`;
                    return `Neispravna opcija: očekivano jedno od ${ai(d.values, '|')}`;
                  case 'too_big': {
                    let b = d.inclusive ? '<=' : '<',
                      f = a[d.origin] ?? null,
                      g = c[d.origin] ?? d.origin;
                    if (f)
                      return `Preveliko: očekivano da ${g ?? 'vrijednost'} ima ${b}${d.maximum.toString()} ${f.unit ?? 'elemenata'}`;
                    return `Preveliko: očekivano da ${g ?? 'vrijednost'} bude ${b}${d.maximum.toString()}`;
                  }
                  case 'too_small': {
                    let b = d.inclusive ? '>=' : '>',
                      f = a[d.origin] ?? null,
                      g = c[d.origin] ?? d.origin;
                    if (f)
                      return `Premalo: očekivano da ${g} ima ${b}${d.minimum.toString()} ${f.unit}`;
                    return `Premalo: očekivano da ${g} bude ${b}${d.minimum.toString()}`;
                  }
                  case 'invalid_format':
                    if ('starts_with' === d.format)
                      return `Neispravan tekst: mora započinjati s "${d.prefix}"`;
                    if ('ends_with' === d.format)
                      return `Neispravan tekst: mora završavati s "${d.suffix}"`;
                    if ('includes' === d.format)
                      return `Neispravan tekst: mora sadržavati "${d.includes}"`;
                    if ('regex' === d.format)
                      return `Neispravan tekst: mora odgovarati uzorku ${d.pattern}`;
                    return `Neispravna ${b[d.format] ?? d.format}`;
                  case 'not_multiple_of':
                    return `Neispravan broj: mora biti višekratnik od ${d.divisor}`;
                  case 'unrecognized_keys':
                    return `Neprepoznat${d.keys.length > 1 ? 'i ključevi' : ' ključ'}: ${ai(d.keys, ', ')}`;
                  case 'invalid_key':
                    return `Neispravan ključ u ${c[d.origin] ?? d.origin}`;
                  case 'invalid_union':
                  default:
                    return 'Neispravan unos';
                  case 'invalid_element':
                    return `Neispravna vrijednost u ${c[d.origin] ?? d.origin}`;
                }
              }),
          };
        },
        'hu',
        0,
        function () {
          let a, b, c;
          return {
            localeError:
              ((a = {
                string: { unit: 'karakter', verb: 'legyen' },
                file: { unit: 'byte', verb: 'legyen' },
                array: { unit: 'elem', verb: 'legyen' },
                set: { unit: 'elem', verb: 'legyen' },
                map: { unit: 'elem', verb: 'legyen' },
              }),
              (b = {
                regex: 'bemenet',
                email: 'email cím',
                url: 'URL',
                emoji: 'emoji',
                uuid: 'UUID',
                uuidv4: 'UUIDv4',
                uuidv6: 'UUIDv6',
                nanoid: 'nanoid',
                guid: 'GUID',
                cuid: 'cuid',
                cuid2: 'cuid2',
                ulid: 'ULID',
                xid: 'XID',
                ksuid: 'KSUID',
                datetime: 'ISO időbélyeg',
                date: 'ISO dátum',
                time: 'ISO idő',
                duration: 'ISO időintervallum',
                ipv4: 'IPv4 cím',
                ipv6: 'IPv6 cím',
                mac: 'MAC cím',
                cidrv4: 'IPv4 tartomány',
                cidrv6: 'IPv6 tartomány',
                base64: 'base64-kódolt string',
                base64url: 'base64url-kódolt string',
                json_string: 'JSON string',
                e164: 'E.164 szám',
                credit_card: 'hitelkártyaszám',
                currency_code: 'pénznemkód',
                iban: 'IBAN',
                jwt: 'JWT',
                template_literal: 'bemenet',
              }),
              (c = { nan: 'NaN', number: 'szám', array: 'tömb' }),
              (d) => {
                switch (d.code) {
                  case 'invalid_type': {
                    let a = c[d.expected] ?? d.expected,
                      b = bd(d.input),
                      f = c[b] ?? b;
                    if (/^[A-Z]/.test(d.expected))
                      return `\xc9rv\xe9nytelen bemenet: a v\xe1rt \xe9rt\xe9k instanceof ${d.expected}, a kapott \xe9rt\xe9k ${f}`;
                    return `\xc9rv\xe9nytelen bemenet: a v\xe1rt \xe9rt\xe9k ${a}, a kapott \xe9rt\xe9k ${f}`;
                  }
                  case 'invalid_value':
                    if (1 === d.values.length)
                      return `\xc9rv\xe9nytelen bemenet: a v\xe1rt \xe9rt\xe9k ${aS(d.values[0])}`;
                    return `\xc9rv\xe9nytelen opci\xf3: valamelyik \xe9rt\xe9k v\xe1rt ${ai(d.values, '|')}`;
                  case 'too_big': {
                    let b = d.inclusive ? '<=' : '<',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `T\xfal nagy: ${d.origin ?? 'érték'} m\xe9rete t\xfal nagy ${b}${d.maximum.toString()} ${c.unit ?? 'elem'}`;
                    return `T\xfal nagy: a bemeneti \xe9rt\xe9k ${d.origin ?? 'érték'} t\xfal nagy: ${b}${d.maximum.toString()}`;
                  }
                  case 'too_small': {
                    let b = d.inclusive ? '>=' : '>',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `T\xfal kicsi: a bemeneti \xe9rt\xe9k ${d.origin} m\xe9rete t\xfal kicsi ${b}${d.minimum.toString()} ${c.unit}`;
                    return `T\xfal kicsi: a bemeneti \xe9rt\xe9k ${d.origin} t\xfal kicsi ${b}${d.minimum.toString()}`;
                  }
                  case 'invalid_format':
                    if ('starts_with' === d.format)
                      return `\xc9rv\xe9nytelen string: "${d.prefix}" \xe9rt\xe9kkel kell kezdődnie`;
                    if ('ends_with' === d.format)
                      return `\xc9rv\xe9nytelen string: "${d.suffix}" \xe9rt\xe9kkel kell v\xe9gződnie`;
                    if ('includes' === d.format)
                      return `\xc9rv\xe9nytelen string: "${d.includes}" \xe9rt\xe9ket kell tartalmaznia`;
                    if ('regex' === d.format)
                      return `\xc9rv\xe9nytelen string: ${d.pattern} mint\xe1nak kell megfelelnie`;
                    return `\xc9rv\xe9nytelen ${b[d.format] ?? d.format}`;
                  case 'not_multiple_of':
                    return `\xc9rv\xe9nytelen sz\xe1m: ${d.divisor} t\xf6bbsz\xf6r\xf6s\xe9nek kell lennie`;
                  case 'unrecognized_keys':
                    return `Ismeretlen kulcs${d.keys.length > 1 ? 's' : ''}: ${ai(d.keys, ', ')}`;
                  case 'invalid_key':
                    return `\xc9rv\xe9nytelen kulcs ${d.origin}`;
                  case 'invalid_union':
                  default:
                    return 'Érvénytelen bemenet';
                  case 'invalid_element':
                    return `\xc9rv\xe9nytelen \xe9rt\xe9k: ${d.origin}`;
                }
              }),
          };
        },
        'hy',
        0,
        function () {
          let a, b, c;
          return {
            localeError:
              ((a = {
                string: { unit: { one: 'նշան', many: 'նշաններ' }, verb: 'ունենալ' },
                file: { unit: { one: 'բայթ', many: 'բայթեր' }, verb: 'ունենալ' },
                array: { unit: { one: 'տարր', many: 'տարրեր' }, verb: 'ունենալ' },
                set: { unit: { one: 'տարր', many: 'տարրեր' }, verb: 'ունենալ' },
                map: { unit: { one: 'տարր', many: 'տարրեր' }, verb: 'ունենալ' },
              }),
              (b = {
                regex: 'մուտք',
                email: 'էլ. հասցե',
                url: 'URL',
                emoji: 'էմոջի',
                uuid: 'UUID',
                uuidv4: 'UUIDv4',
                uuidv6: 'UUIDv6',
                nanoid: 'nanoid',
                guid: 'GUID',
                cuid: 'cuid',
                cuid2: 'cuid2',
                ulid: 'ULID',
                xid: 'XID',
                ksuid: 'KSUID',
                datetime: 'ISO ամսաթիվ և ժամ',
                date: 'ISO ամսաթիվ',
                time: 'ISO ժամ',
                duration: 'ISO տևողություն',
                ipv4: 'IPv4 հասցե',
                ipv6: 'IPv6 հասցե',
                mac: 'MAC հասցե',
                cidrv4: 'IPv4 միջակայք',
                cidrv6: 'IPv6 միջակայք',
                base64: 'base64 ձևաչափով տող',
                base64url: 'base64url ձևաչափով տող',
                json_string: 'JSON տող',
                e164: 'E.164 համար',
                credit_card: 'կրեդիտ քարտի համար',
                currency_code: 'արժույթի կոդ',
                iban: 'IBAN',
                jwt: 'JWT',
                template_literal: 'մուտք',
              }),
              (c = { nan: 'NaN', number: 'թիվ', array: 'զանգված' }),
              (d) => {
                switch (d.code) {
                  case 'invalid_type': {
                    let a = c[d.expected] ?? d.expected,
                      b = bd(d.input),
                      f = c[b] ?? b;
                    if (/^[A-Z]/.test(d.expected))
                      return `Սխալ մուտքագրում․ սպասվում էր instanceof ${d.expected}, ստացվել է ${f}`;
                    return `Սխալ մուտքագրում․ սպասվում էր ${a}, ստացվել է ${f}`;
                  }
                  case 'invalid_value':
                    if (1 === d.values.length)
                      return `Սխալ մուտքագրում․ սպասվում էր ${aS(d.values[1])}`;
                    return `Սխալ տարբերակ․ սպասվում էր հետևյալներից մեկը՝ ${ai(d.values, '|')}`;
                  case 'too_big': {
                    let b = d.inclusive ? '<=' : '<',
                      c = a[d.origin] ?? null;
                    if (c) {
                      let a = fR(Number(d.maximum), c.unit.one, c.unit.many);
                      return `Չափազանց մեծ արժեք․ սպասվում է, որ ${fS(d.origin ?? 'արժեք')} կունենա ${b}${d.maximum.toString()} ${a}`;
                    }
                    return `Չափազանց մեծ արժեք․ սպասվում է, որ ${fS(d.origin ?? 'արժեք')} լինի ${b}${d.maximum.toString()}`;
                  }
                  case 'too_small': {
                    let b = d.inclusive ? '>=' : '>',
                      c = a[d.origin] ?? null;
                    if (c) {
                      let a = fR(Number(d.minimum), c.unit.one, c.unit.many);
                      return `Չափազանց փոքր արժեք․ սպասվում է, որ ${fS(d.origin)} կունենա ${b}${d.minimum.toString()} ${a}`;
                    }
                    return `Չափազանց փոքր արժեք․ սպասվում է, որ ${fS(d.origin)} լինի ${b}${d.minimum.toString()}`;
                  }
                  case 'invalid_format':
                    if ('starts_with' === d.format)
                      return `Սխալ տող․ պետք է սկսվի "${d.prefix}"-ով`;
                    if ('ends_with' === d.format)
                      return `Սխալ տող․ պետք է ավարտվի "${d.suffix}"-ով`;
                    if ('includes' === d.format)
                      return `Սխալ տող․ պետք է պարունակի "${d.includes}"`;
                    if ('regex' === d.format)
                      return `Սխալ տող․ պետք է համապատասխանի ${d.pattern} ձևաչափին`;
                    return `Սխալ ${b[d.format] ?? d.format}`;
                  case 'not_multiple_of':
                    return `Սխալ թիվ․ պետք է բազմապատիկ լինի ${d.divisor}-ի`;
                  case 'unrecognized_keys':
                    return `Չճանաչված բանալի${d.keys.length > 1 ? 'ներ' : ''}. ${ai(d.keys, ', ')}`;
                  case 'invalid_key':
                    return `Սխալ բանալի ${fS(d.origin)}-ում`;
                  case 'invalid_union':
                  default:
                    return 'Սխալ մուտքագրում';
                  case 'invalid_element':
                    return `Սխալ արժեք ${fS(d.origin)}-ում`;
                }
              }),
          };
        },
        'id',
        0,
        function () {
          let a, b, c;
          return {
            localeError:
              ((a = {
                string: { unit: 'karakter', verb: 'memiliki' },
                file: { unit: 'byte', verb: 'memiliki' },
                array: { unit: 'item', verb: 'memiliki' },
                set: { unit: 'item', verb: 'memiliki' },
                map: { unit: 'item', verb: 'memiliki' },
              }),
              (b = {
                regex: 'input',
                email: 'alamat email',
                url: 'URL',
                emoji: 'emoji',
                uuid: 'UUID',
                uuidv4: 'UUIDv4',
                uuidv6: 'UUIDv6',
                nanoid: 'nanoid',
                guid: 'GUID',
                cuid: 'cuid',
                cuid2: 'cuid2',
                ulid: 'ULID',
                xid: 'XID',
                ksuid: 'KSUID',
                datetime: 'tanggal dan waktu format ISO',
                date: 'tanggal format ISO',
                time: 'jam format ISO',
                duration: 'durasi format ISO',
                ipv4: 'alamat IPv4',
                ipv6: 'alamat IPv6',
                mac: 'alamat MAC',
                cidrv4: 'rentang alamat IPv4',
                cidrv6: 'rentang alamat IPv6',
                base64: 'string dengan enkode base64',
                base64url: 'string dengan enkode base64url',
                json_string: 'string JSON',
                e164: 'angka E.164',
                credit_card: 'nomor kartu kredit',
                currency_code: 'kode mata uang',
                iban: 'IBAN',
                jwt: 'JWT',
                template_literal: 'input',
              }),
              (c = { nan: 'NaN' }),
              (d) => {
                switch (d.code) {
                  case 'invalid_type': {
                    let a = c[d.expected] ?? d.expected,
                      b = bd(d.input),
                      f = c[b] ?? b;
                    if (/^[A-Z]/.test(d.expected))
                      return `Input tidak valid: diharapkan instanceof ${d.expected}, diterima ${f}`;
                    return `Input tidak valid: diharapkan ${a}, diterima ${f}`;
                  }
                  case 'invalid_value':
                    if (1 === d.values.length)
                      return `Input tidak valid: diharapkan ${aS(d.values[0])}`;
                    return `Pilihan tidak valid: diharapkan salah satu dari ${ai(d.values, '|')}`;
                  case 'too_big': {
                    let b = d.inclusive ? '<=' : '<',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `Terlalu besar: diharapkan ${d.origin ?? 'value'} memiliki ${b}${d.maximum.toString()} ${c.unit ?? 'elemen'}`;
                    return `Terlalu besar: diharapkan ${d.origin ?? 'value'} menjadi ${b}${d.maximum.toString()}`;
                  }
                  case 'too_small': {
                    let b = d.inclusive ? '>=' : '>',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `Terlalu kecil: diharapkan ${d.origin} memiliki ${b}${d.minimum.toString()} ${c.unit}`;
                    return `Terlalu kecil: diharapkan ${d.origin} menjadi ${b}${d.minimum.toString()}`;
                  }
                  case 'invalid_format':
                    if ('starts_with' === d.format)
                      return `String tidak valid: harus dimulai dengan "${d.prefix}"`;
                    if ('ends_with' === d.format)
                      return `String tidak valid: harus berakhir dengan "${d.suffix}"`;
                    if ('includes' === d.format)
                      return `String tidak valid: harus menyertakan "${d.includes}"`;
                    if ('regex' === d.format)
                      return `String tidak valid: harus sesuai pola ${d.pattern}`;
                    return `${b[d.format] ?? d.format} tidak valid`;
                  case 'not_multiple_of':
                    return `Angka tidak valid: harus kelipatan dari ${d.divisor}`;
                  case 'unrecognized_keys':
                    return `Kunci tidak dikenali ${d.keys.length > 1 ? 's' : ''}: ${ai(d.keys, ', ')}`;
                  case 'invalid_key':
                    return `Kunci tidak valid di ${d.origin}`;
                  case 'invalid_union':
                  default:
                    return 'Input tidak valid';
                  case 'invalid_element':
                    return `Nilai tidak valid di ${d.origin}`;
                }
              }),
          };
        },
        'is',
        0,
        function () {
          let a, b, c;
          return {
            localeError:
              ((a = {
                string: { unit: 'stafi', verb: 'að hafa' },
                file: { unit: 'bæti', verb: 'að hafa' },
                array: { unit: 'hluti', verb: 'að hafa' },
                set: { unit: 'hluti', verb: 'að hafa' },
                map: { unit: 'hluti', verb: 'að hafa' },
              }),
              (b = {
                regex: 'gildi',
                email: 'netfang',
                url: 'vefslóð',
                emoji: 'emoji',
                uuid: 'UUID',
                uuidv4: 'UUIDv4',
                uuidv6: 'UUIDv6',
                nanoid: 'nanoid',
                guid: 'GUID',
                cuid: 'cuid',
                cuid2: 'cuid2',
                ulid: 'ULID',
                xid: 'XID',
                ksuid: 'KSUID',
                datetime: 'ISO dagsetning og tími',
                date: 'ISO dagsetning',
                time: 'ISO tími',
                duration: 'ISO tímalengd',
                ipv4: 'IPv4 address',
                ipv6: 'IPv6 address',
                mac: 'MAC address',
                cidrv4: 'IPv4 range',
                cidrv6: 'IPv6 range',
                base64: 'base64-encoded strengur',
                base64url: 'base64url-encoded strengur',
                json_string: 'JSON strengur',
                e164: 'E.164 tölugildi',
                credit_card: 'kreditkortanúmer',
                currency_code: 'gjaldmiðilskóði',
                iban: 'IBAN',
                jwt: 'JWT',
                template_literal: 'gildi',
              }),
              (c = { nan: 'NaN', number: 'númer', array: 'fylki' }),
              (d) => {
                switch (d.code) {
                  case 'invalid_type': {
                    let a = c[d.expected] ?? d.expected,
                      b = bd(d.input),
                      f = c[b] ?? b;
                    if (/^[A-Z]/.test(d.expected))
                      return `Rangt gildi: \xde\xfa sl\xf3st inn ${f} \xfear sem \xe1 a\xf0 vera instanceof ${d.expected}`;
                    return `Rangt gildi: \xde\xfa sl\xf3st inn ${f} \xfear sem \xe1 a\xf0 vera ${a}`;
                  }
                  case 'invalid_value':
                    if (1 === d.values.length)
                      return `Rangt gildi: gert r\xe1\xf0 fyrir ${aS(d.values[0])}`;
                    return `\xd3gilt val: m\xe1 vera eitt af eftirfarandi ${ai(d.values, '|')}`;
                  case 'too_big': {
                    let b = d.inclusive ? '<=' : '<',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `Of st\xf3rt: gert er r\xe1\xf0 fyrir a\xf0 ${d.origin ?? 'gildi'} hafi ${b}${d.maximum.toString()} ${c.unit ?? 'hluti'}`;
                    return `Of st\xf3rt: gert er r\xe1\xf0 fyrir a\xf0 ${d.origin ?? 'gildi'} s\xe9 ${b}${d.maximum.toString()}`;
                  }
                  case 'too_small': {
                    let b = d.inclusive ? '>=' : '>',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `Of l\xedti\xf0: gert er r\xe1\xf0 fyrir a\xf0 ${d.origin} hafi ${b}${d.minimum.toString()} ${c.unit}`;
                    return `Of l\xedti\xf0: gert er r\xe1\xf0 fyrir a\xf0 ${d.origin} s\xe9 ${b}${d.minimum.toString()}`;
                  }
                  case 'invalid_format':
                    if ('starts_with' === d.format)
                      return `\xd3gildur strengur: ver\xf0ur a\xf0 byrja \xe1 "${d.prefix}"`;
                    if ('ends_with' === d.format)
                      return `\xd3gildur strengur: ver\xf0ur a\xf0 enda \xe1 "${d.suffix}"`;
                    if ('includes' === d.format)
                      return `\xd3gildur strengur: ver\xf0ur a\xf0 innihalda "${d.includes}"`;
                    if ('regex' === d.format)
                      return `\xd3gildur strengur: ver\xf0ur a\xf0 fylgja mynstri ${d.pattern}`;
                    return `Rangt ${b[d.format] ?? d.format}`;
                  case 'not_multiple_of':
                    return `R\xf6ng tala: ver\xf0ur a\xf0 vera margfeldi af ${d.divisor}`;
                  case 'unrecognized_keys':
                    return `\xd3\xfeekkt ${d.keys.length > 1 ? 'ir lyklar' : 'ur lykill'}: ${ai(d.keys, ', ')}`;
                  case 'invalid_key':
                    return `Rangur lykill \xed ${d.origin}`;
                  case 'invalid_union':
                  default:
                    return 'Rangt gildi';
                  case 'invalid_element':
                    return `Rangt gildi \xed ${d.origin}`;
                }
              }),
          };
        },
        'it',
        0,
        function () {
          let a, b, c;
          return {
            localeError:
              ((a = {
                string: { unit: 'caratteri', verb: 'avere' },
                file: { unit: 'byte', verb: 'avere' },
                array: { unit: 'elementi', verb: 'avere' },
                set: { unit: 'elementi', verb: 'avere' },
                map: { unit: 'elementi', verb: 'avere' },
              }),
              (b = {
                regex: 'input',
                email: 'indirizzo email',
                url: 'URL',
                emoji: 'emoji',
                uuid: 'UUID',
                uuidv4: 'UUIDv4',
                uuidv6: 'UUIDv6',
                nanoid: 'nanoid',
                guid: 'GUID',
                cuid: 'cuid',
                cuid2: 'cuid2',
                ulid: 'ULID',
                xid: 'XID',
                ksuid: 'KSUID',
                datetime: 'data e ora ISO',
                date: 'data ISO',
                time: 'ora ISO',
                duration: 'durata ISO',
                ipv4: 'indirizzo IPv4',
                ipv6: 'indirizzo IPv6',
                mac: 'indirizzo MAC',
                cidrv4: 'intervallo IPv4',
                cidrv6: 'intervallo IPv6',
                base64: 'stringa codificata in base64',
                base64url: 'URL codificata in base64',
                json_string: 'stringa JSON',
                e164: 'numero E.164',
                credit_card: 'numero di carta di credito',
                currency_code: 'codice valuta',
                iban: 'IBAN',
                jwt: 'JWT',
                template_literal: 'input',
              }),
              (c = { nan: 'NaN', number: 'numero', array: 'vettore' }),
              (d) => {
                switch (d.code) {
                  case 'invalid_type': {
                    let a = c[d.expected] ?? d.expected,
                      b = bd(d.input),
                      f = c[b] ?? b;
                    if (/^[A-Z]/.test(d.expected))
                      return `Input non valido: atteso instanceof ${d.expected}, ricevuto ${f}`;
                    return `Input non valido: atteso ${a}, ricevuto ${f}`;
                  }
                  case 'invalid_value':
                    if (1 === d.values.length) return `Input non valido: atteso ${aS(d.values[0])}`;
                    return `Opzione non valida: atteso uno tra ${ai(d.values, '|')}`;
                  case 'too_big': {
                    let b = d.inclusive ? '<=' : '<',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `Troppo grande: ${d.origin ?? 'valore'} deve avere ${b}${d.maximum.toString()} ${c.unit ?? 'elementi'}`;
                    return `Troppo grande: ${d.origin ?? 'valore'} deve essere ${b}${d.maximum.toString()}`;
                  }
                  case 'too_small': {
                    let b = d.inclusive ? '>=' : '>',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `Troppo piccolo: ${d.origin} deve avere ${b}${d.minimum.toString()} ${c.unit}`;
                    return `Troppo piccolo: ${d.origin} deve essere ${b}${d.minimum.toString()}`;
                  }
                  case 'invalid_format':
                    if ('starts_with' === d.format)
                      return `Stringa non valida: deve iniziare con "${d.prefix}"`;
                    if ('ends_with' === d.format)
                      return `Stringa non valida: deve terminare con "${d.suffix}"`;
                    if ('includes' === d.format)
                      return `Stringa non valida: deve includere "${d.includes}"`;
                    if ('regex' === d.format)
                      return `Stringa non valida: deve corrispondere al pattern ${d.pattern}`;
                    return `Input non valido: ${b[d.format] ?? d.format}`;
                  case 'not_multiple_of':
                    return `Numero non valido: deve essere un multiplo di ${d.divisor}`;
                  case 'unrecognized_keys':
                    return `Chiav${d.keys.length > 1 ? 'i' : 'e'} non riconosciut${d.keys.length > 1 ? 'e' : 'a'}: ${ai(d.keys, ', ')}`;
                  case 'invalid_key':
                    return `Chiave non valida in ${d.origin}`;
                  case 'invalid_union':
                  default:
                    return 'Input non valido';
                  case 'invalid_element':
                    return `Valore non valido in ${d.origin}`;
                }
              }),
          };
        },
        'ja',
        0,
        function () {
          let a, b, c;
          return {
            localeError:
              ((a = {
                string: { unit: '文字', verb: 'である' },
                file: { unit: 'バイト', verb: 'である' },
                array: { unit: '要素', verb: 'である' },
                set: { unit: '要素', verb: 'である' },
                map: { unit: '要素', verb: 'である' },
              }),
              (b = {
                regex: '入力値',
                email: 'メールアドレス',
                url: 'URL',
                emoji: '絵文字',
                uuid: 'UUID',
                uuidv4: 'UUIDv4',
                uuidv6: 'UUIDv6',
                nanoid: 'nanoid',
                guid: 'GUID',
                cuid: 'cuid',
                cuid2: 'cuid2',
                ulid: 'ULID',
                xid: 'XID',
                ksuid: 'KSUID',
                datetime: 'ISO日時',
                date: 'ISO日付',
                time: 'ISO時刻',
                duration: 'ISO期間',
                ipv4: 'IPv4アドレス',
                ipv6: 'IPv6アドレス',
                mac: 'MACアドレス',
                cidrv4: 'IPv4範囲',
                cidrv6: 'IPv6範囲',
                base64: 'base64エンコード文字列',
                base64url: 'base64urlエンコード文字列',
                json_string: 'JSON文字列',
                e164: 'E.164番号',
                credit_card: 'クレジットカード番号',
                currency_code: '通貨コード',
                iban: 'IBAN',
                jwt: 'JWT',
                template_literal: '入力値',
              }),
              (c = { nan: 'NaN', number: '数値', array: '配列' }),
              (d) => {
                switch (d.code) {
                  case 'invalid_type': {
                    let a = c[d.expected] ?? d.expected,
                      b = bd(d.input),
                      f = c[b] ?? b;
                    if (/^[A-Z]/.test(d.expected))
                      return `無効な入力: instanceof ${d.expected}が期待されましたが、${f}が入力されました`;
                    return `無効な入力: ${a}が期待されましたが、${f}が入力されました`;
                  }
                  case 'invalid_value':
                    if (1 === d.values.length)
                      return `無効な入力: ${aS(d.values[0])}が期待されました`;
                    return `無効な選択: ${ai(d.values, '、')}のいずれかである必要があります`;
                  case 'too_big': {
                    let b = d.inclusive ? '以下である' : 'より小さい',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `大きすぎる値: ${d.origin ?? '値'}は${d.maximum.toString()}${c.unit ?? '要素'}${b}必要があります`;
                    return `大きすぎる値: ${d.origin ?? '値'}は${d.maximum.toString()}${b}必要があります`;
                  }
                  case 'too_small': {
                    let b = d.inclusive ? '以上である' : 'より大きい',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `小さすぎる値: ${d.origin}は${d.minimum.toString()}${c.unit}${b}必要があります`;
                    return `小さすぎる値: ${d.origin}は${d.minimum.toString()}${b}必要があります`;
                  }
                  case 'invalid_format':
                    if ('starts_with' === d.format)
                      return `無効な文字列: "${d.prefix}"で始まる必要があります`;
                    if ('ends_with' === d.format)
                      return `無効な文字列: "${d.suffix}"で終わる必要があります`;
                    if ('includes' === d.format)
                      return `無効な文字列: "${d.includes}"を含む必要があります`;
                    if ('regex' === d.format)
                      return `無効な文字列: パターン${d.pattern}に一致する必要があります`;
                    return `無効な${b[d.format] ?? d.format}`;
                  case 'not_multiple_of':
                    return `無効な数値: ${d.divisor}の倍数である必要があります`;
                  case 'unrecognized_keys':
                    return `認識されていないキー${d.keys.length > 1 ? '群' : ''}: ${ai(d.keys, '、')}`;
                  case 'invalid_key':
                    return `${d.origin}内の無効なキー`;
                  case 'invalid_union':
                  default:
                    return '無効な入力';
                  case 'invalid_element':
                    return `${d.origin}内の無効な値`;
                }
              }),
          };
        },
        'ka',
        0,
        function () {
          let a, b, c;
          return {
            localeError:
              ((a = {
                string: { unit: 'სიმბოლო', verb: 'უნდა შეიცავდეს' },
                file: { unit: 'ბაიტი', verb: 'უნდა შეიცავდეს' },
                array: { unit: 'ელემენტი', verb: 'უნდა შეიცავდეს' },
                set: { unit: 'ელემენტი', verb: 'უნდა შეიცავდეს' },
                map: { unit: 'ელემენტი', verb: 'უნდა შეიცავდეს' },
              }),
              (b = {
                regex: 'შეყვანა',
                email: 'ელ-ფოსტის მისამართი',
                url: 'URL',
                emoji: 'ემოჯი',
                uuid: 'UUID',
                uuidv4: 'UUIDv4',
                uuidv6: 'UUIDv6',
                nanoid: 'nanoid',
                guid: 'GUID',
                cuid: 'cuid',
                cuid2: 'cuid2',
                ulid: 'ULID',
                xid: 'XID',
                ksuid: 'KSUID',
                datetime: 'თარიღი-დრო',
                date: 'თარიღი',
                time: 'დრო',
                duration: 'ხანგრძლივობა',
                ipv4: 'IPv4 მისამართი',
                ipv6: 'IPv6 მისამართი',
                mac: 'MAC მისამართი',
                cidrv4: 'IPv4 დიაპაზონი',
                cidrv6: 'IPv6 დიაპაზონი',
                base64: 'base64-კოდირებული ველი',
                base64url: 'base64url-კოდირებული ველი',
                json_string: 'JSON ველი',
                e164: 'E.164 ნომერი',
                credit_card: 'საკრედიტო ბარათის ნომერი',
                currency_code: 'ვალუტის კოდი',
                iban: 'IBAN',
                jwt: 'JWT',
                template_literal: 'შეყვანა',
              }),
              (c = {
                nan: 'NaN',
                number: 'რიცხვი',
                string: 'ველი',
                boolean: 'ბულეანი',
                function: 'ფუნქცია',
                array: 'მასივი',
              }),
              (d) => {
                switch (d.code) {
                  case 'invalid_type': {
                    let a = c[d.expected] ?? d.expected,
                      b = bd(d.input),
                      f = c[b] ?? b;
                    if (/^[A-Z]/.test(d.expected))
                      return `არასწორი შეყვანა: მოსალოდნელი instanceof ${d.expected}, მიღებული ${f}`;
                    return `არასწორი შეყვანა: მოსალოდნელი ${a}, მიღებული ${f}`;
                  }
                  case 'invalid_value':
                    if (1 === d.values.length)
                      return `არასწორი შეყვანა: მოსალოდნელი ${aS(d.values[0])}`;
                    return `არასწორი ვარიანტი: მოსალოდნელია ერთ-ერთი ${ai(d.values, '|')}-დან`;
                  case 'too_big': {
                    let b = d.inclusive ? '<=' : '<',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `ზედმეტად დიდი: მოსალოდნელი ${d.origin ?? 'მნიშვნელობა'} ${c.verb} ${b}${d.maximum.toString()} ${c.unit}`;
                    return `ზედმეტად დიდი: მოსალოდნელი ${d.origin ?? 'მნიშვნელობა'} იყოს ${b}${d.maximum.toString()}`;
                  }
                  case 'too_small': {
                    let b = d.inclusive ? '>=' : '>',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `ზედმეტად პატარა: მოსალოდნელი ${d.origin} ${c.verb} ${b}${d.minimum.toString()} ${c.unit}`;
                    return `ზედმეტად პატარა: მოსალოდნელი ${d.origin} იყოს ${b}${d.minimum.toString()}`;
                  }
                  case 'invalid_format':
                    if ('starts_with' === d.format)
                      return `არასწორი ველი: უნდა იწყებოდეს "${d.prefix}"-ით`;
                    if ('ends_with' === d.format)
                      return `არასწორი ველი: უნდა მთავრდებოდეს "${d.suffix}"-ით`;
                    if ('includes' === d.format)
                      return `არასწორი ველი: უნდა შეიცავდეს "${d.includes}"-ს`;
                    if ('regex' === d.format)
                      return `არასწორი ველი: უნდა შეესაბამებოდეს შაბლონს ${d.pattern}`;
                    return `არასწორი ${b[d.format] ?? d.format}`;
                  case 'not_multiple_of':
                    return `არასწორი რიცხვი: უნდა იყოს ${d.divisor}-ის ჯერადი`;
                  case 'unrecognized_keys':
                    return `უცნობი გასაღებ${d.keys.length > 1 ? 'ები' : 'ი'}: ${ai(d.keys, ', ')}`;
                  case 'invalid_key':
                    return `არასწორი გასაღები ${d.origin}-ში`;
                  case 'invalid_union':
                  default:
                    return 'არასწორი შეყვანა';
                  case 'invalid_element':
                    return `არასწორი მნიშვნელობა ${d.origin}-ში`;
                }
              }),
          };
        },
        'kh',
        0,
        function () {
          return fT();
        },
        'km',
        0,
        fT,
        'kn',
        0,
        function () {
          let a, b, c;
          return {
            localeError:
              ((a = {
                string: { unit: 'ಅಕ್ಷರಗಳು', verb: 'ಹೊಂದಲು' },
                file: { unit: 'ಬೈಟ್‌ಗಳು', verb: 'ಹೊಂದಲು' },
                array: { unit: 'ವಸ್ತುಗಳು', verb: 'ಹೊಂದಲು' },
                set: { unit: 'ವಸ್ತುಗಳು', verb: 'ಹೊಂದಲು' },
                map: { unit: 'entries', verb: 'ಹೊಂದಲು' },
              }),
              (b = {
                regex: 'ಇನ್ಪುಟ್',
                email: 'email ವಿಳಾಸ',
                url: 'URL',
                emoji: 'emoji',
                uuid: 'UUID',
                uuidv4: 'UUIDv4',
                uuidv6: 'UUIDv6',
                nanoid: 'nanoid',
                guid: 'GUID',
                cuid: 'cuid',
                cuid2: 'cuid2',
                ulid: 'ULID',
                xid: 'XID',
                ksuid: 'KSUID',
                datetime: 'ISO ದಿನಾಂಕದ ಸಮಯ',
                date: 'ISO ದಿನಾಂಕ',
                time: 'ISO ಸಮಯ',
                duration: 'ISO ಅವಧಿ',
                ipv4: 'IPv4 ವಿಳಾಸ',
                ipv6: 'IPv6 ವಿಳಾಸ',
                mac: 'MAC ವಿಳಾಸ',
                cidrv4: 'IPv4 ವ್ಯಾಪ್ತಿಯ',
                cidrv6: 'IPv6 ವ್ಯಾಪ್ತಿಯ',
                base64: 'base64-encodedಸ್ಟ್ರಿಂಗ್',
                base64url: 'base64url-encodedಸ್ಟ್ರಿಂಗ್',
                json_string: 'JSONಸ್ಟ್ರಿಂಗ್',
                e164: 'E.164 ಸಂಖ್ಯೆ',
                credit_card: 'ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್ ಸಂಖ್ಯೆ',
                currency_code: 'ಕರೆನ್ಸಿ ಕೋಡ್',
                iban: 'IBAN',
                jwt: 'JWT',
                template_literal: 'ಇನ್ಪುಟ್',
              }),
              (c = { nan: 'NaN' }),
              (d) => {
                switch (d.code) {
                  case 'invalid_type': {
                    let a = c[d.expected] ?? d.expected,
                      b = bd(d.input),
                      f = c[b] ?? b;
                    return `ಅಮಾನ್ಯ ಇನ್‌ಪುಟ್: ನಿರೀಕ್ಷಿಸಲಾಗಿದೆ ${a}, ಸ್ವೀಕರಿಸಿದನು ${f}`;
                  }
                  case 'invalid_value':
                    if (1 === d.values.length)
                      return `ಅಮಾನ್ಯ ಇನ್‌ಪುಟ್: ನಿರೀಕ್ಷಿಸಲಾಗಿದೆ ${aS(d.values[0])}`;
                    return `ಅಮಾನ್ಯ ಆಯ್ಕೆ: ಇವುಗಳಲ್ಲಿ ಒಂದನ್ನು ನಿರೀಕ್ಷಿಸಲಾಗಿದೆ ${ai(d.values, '|')}`;
                  case 'too_big': {
                    let b = d.inclusive ? '<=' : '<',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `ತುಂಬಾ ದೊಡ್ಡದು: ನಿರೀಕ್ಷಿಸಲಾಗಿದೆ ${d.origin ?? 'value'} ಹೊಂದಲು ${b}${d.maximum.toString()} ${c.unit ?? 'ಅಂಶಗಳು'}`;
                    return `ತುಂಬಾ ದೊಡ್ಡದು: ನಿರೀಕ್ಷಿಸಲಾಗಿದೆ ${d.origin ?? 'value'} ಎಂದು ${b}${d.maximum.toString()}`;
                  }
                  case 'too_small': {
                    let b = d.inclusive ? '>=' : '>',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `ತುಂಬಾ ಚಿಕ್ಕದು: ನಿರೀಕ್ಷಿಸಲಾಗಿದೆ ${d.origin} ಹೊಂದಲು ${b}${d.minimum.toString()} ${c.unit}`;
                    return `ತುಂಬಾ ಚಿಕ್ಕದು: ನಿರೀಕ್ಷಿಸಲಾಗಿದೆ ${d.origin} ಎಂದು ${b}${d.minimum.toString()}`;
                  }
                  case 'invalid_format':
                    if ('starts_with' === d.format)
                      return `ಅಮಾನ್ಯವಾದ ಸ್ಟ್ರಿಂಗ್: ಇದರೊಂದಿಗೆ ಪ್ರಾರಂಭಿಸಬೇಕು "${d.prefix}"`;
                    if ('ends_with' === d.format)
                      return `ಅಮಾನ್ಯವಾದ ಸ್ಟ್ರಿಂಗ್: ಇದರೊಂದಿಗೆ ಕೊನೆಗೊಳ್ಳಬೇಕು "${d.suffix}"`;
                    if ('includes' === d.format)
                      return `ಅಮಾನ್ಯ ಸ್ಟ್ರಿಂಗ್: ಒಳಗೊಂಡಿರಬೇಕು "${d.includes}"`;
                    if ('regex' === d.format)
                      return `ಅಮಾನ್ಯವಾದ ಸ್ಟ್ರಿಂಗ್: ಮಾದರಿಗೆ ಹೊಂದಿಕೆಯಾಗಬೇಕು ${d.pattern}`;
                    return `ಅಮಾನ್ಯ ${b[d.format] ?? d.format}`;
                  case 'not_multiple_of':
                    return `ಅಮಾನ್ಯ ಸಂಖ್ಯೆ: ಬಹುಸಂಖ್ಯೆಯಾಗಿರಬೇಕು ${d.divisor}`;
                  case 'unrecognized_keys':
                    return `ಗುರುತಿಸಲಾಗದ ಕೀ ${d.keys.length > 1 ? 's' : ''}: ${ai(d.keys, ', ')}`;
                  case 'invalid_key':
                    return `ಅಮಾನ್ಯವಾದ ಕೀ ಇನ್ ${d.origin}`;
                  case 'invalid_union':
                    if (d.options && Array.isArray(d.options) && d.options.length > 0) {
                      let a = d.options.map((a) => `'${a}'`).join(' | ');
                      return `ಅಮಾನ್ಯ ತಾರತಮ್ಯ ಮೌಲ್ಯ. ನಿರೀಕ್ಷಿಸಲಾಗಿದೆ ${a}`;
                    }
                    return 'ಅಮಾನ್ಯ ಇನ್‌ಪುಟ್';
                  case 'invalid_element':
                    return `ರಲ್ಲಿ ಅಮಾನ್ಯ ಮೌಲ್ಯ ${d.origin}`;
                  default:
                    return 'ಅಮಾನ್ಯ ಇನ್‌ಪುಟ್';
                }
              }),
          };
        },
        'ko',
        0,
        function () {
          let a, b, c;
          return {
            localeError:
              ((a = {
                string: { unit: '문자', verb: 'to have' },
                file: { unit: '바이트', verb: 'to have' },
                array: { unit: '개', verb: 'to have' },
                set: { unit: '개', verb: 'to have' },
                map: { unit: '개', verb: 'to have' },
              }),
              (b = {
                regex: '입력',
                email: '이메일 주소',
                url: 'URL',
                emoji: '이모지',
                uuid: 'UUID',
                uuidv4: 'UUIDv4',
                uuidv6: 'UUIDv6',
                nanoid: 'nanoid',
                guid: 'GUID',
                cuid: 'cuid',
                cuid2: 'cuid2',
                ulid: 'ULID',
                xid: 'XID',
                ksuid: 'KSUID',
                datetime: 'ISO 날짜시간',
                date: 'ISO 날짜',
                time: 'ISO 시간',
                duration: 'ISO 기간',
                ipv4: 'IPv4 주소',
                ipv6: 'IPv6 주소',
                mac: 'MAC 주소',
                cidrv4: 'IPv4 범위',
                cidrv6: 'IPv6 범위',
                base64: 'base64 인코딩 문자열',
                base64url: 'base64url 인코딩 문자열',
                json_string: 'JSON 문자열',
                e164: 'E.164 번호',
                credit_card: '신용카드 번호',
                currency_code: '통화 코드',
                iban: 'IBAN',
                jwt: 'JWT',
                template_literal: '입력',
              }),
              (c = { nan: 'NaN' }),
              (d) => {
                switch (d.code) {
                  case 'invalid_type': {
                    let a = c[d.expected] ?? d.expected,
                      b = bd(d.input),
                      f = c[b] ?? b;
                    if (/^[A-Z]/.test(d.expected))
                      return `잘못된 입력: 예상 타입은 instanceof ${d.expected}, 받은 타입은 ${f}입니다`;
                    return `잘못된 입력: 예상 타입은 ${a}, 받은 타입은 ${f}입니다`;
                  }
                  case 'invalid_value':
                    if (1 === d.values.length)
                      return `잘못된 입력: 값은 ${aS(d.values[0])} 이어야 합니다`;
                    return `잘못된 옵션: ${ai(d.values, '또는 ')} 중 하나여야 합니다`;
                  case 'too_big': {
                    let b = d.inclusive ? '이하' : '미만',
                      c = '미만' === b ? '이어야 합니다' : '여야 합니다',
                      f = a[d.origin] ?? null,
                      g = f?.unit ?? '요소';
                    if (f)
                      return `${d.origin ?? '값'}이 너무 큽니다: ${d.maximum.toString()}${g} ${b}${c}`;
                    return `${d.origin ?? '값'}이 너무 큽니다: ${d.maximum.toString()} ${b}${c}`;
                  }
                  case 'too_small': {
                    let b = d.inclusive ? '이상' : '초과',
                      c = '이상' === b ? '이어야 합니다' : '여야 합니다',
                      f = a[d.origin] ?? null,
                      g = f?.unit ?? '요소';
                    if (f)
                      return `${d.origin ?? '값'}이 너무 작습니다: ${d.minimum.toString()}${g} ${b}${c}`;
                    return `${d.origin ?? '값'}이 너무 작습니다: ${d.minimum.toString()} ${b}${c}`;
                  }
                  case 'invalid_format':
                    if ('starts_with' === d.format)
                      return `잘못된 문자열: "${d.prefix}"(으)로 시작해야 합니다`;
                    if ('ends_with' === d.format)
                      return `잘못된 문자열: "${d.suffix}"(으)로 끝나야 합니다`;
                    if ('includes' === d.format)
                      return `잘못된 문자열: "${d.includes}"을(를) 포함해야 합니다`;
                    if ('regex' === d.format)
                      return `잘못된 문자열: 정규식 ${d.pattern} 패턴과 일치해야 합니다`;
                    return `잘못된 ${b[d.format] ?? d.format}`;
                  case 'not_multiple_of':
                    return `잘못된 숫자: ${d.divisor}의 배수여야 합니다`;
                  case 'unrecognized_keys':
                    return `인식할 수 없는 키: ${ai(d.keys, ', ')}`;
                  case 'invalid_key':
                    return `잘못된 키: ${d.origin}`;
                  case 'invalid_union':
                  default:
                    return '잘못된 입력';
                  case 'invalid_element':
                    return `잘못된 값: ${d.origin}`;
                }
              }),
          };
        },
        'lt',
        0,
        function () {
          return {
            localeError: (() => {
              let a = {
                string: {
                  unit: { one: 'simbolis', few: 'simboliai', many: 'simbolių' },
                  verb: {
                    smaller: {
                      inclusive: 'turi būti ne ilgesnė kaip',
                      notInclusive: 'turi būti trumpesnė kaip',
                    },
                    bigger: {
                      inclusive: 'turi būti ne trumpesnė kaip',
                      notInclusive: 'turi būti ilgesnė kaip',
                    },
                  },
                },
                file: {
                  unit: { one: 'baitas', few: 'baitai', many: 'baitų' },
                  verb: {
                    smaller: {
                      inclusive: 'turi būti ne didesnis kaip',
                      notInclusive: 'turi būti mažesnis kaip',
                    },
                    bigger: {
                      inclusive: 'turi būti ne mažesnis kaip',
                      notInclusive: 'turi būti didesnis kaip',
                    },
                  },
                },
                array: {
                  unit: { one: 'elementą', few: 'elementus', many: 'elementų' },
                  verb: {
                    smaller: {
                      inclusive: 'turi turėti ne daugiau kaip',
                      notInclusive: 'turi turėti mažiau kaip',
                    },
                    bigger: {
                      inclusive: 'turi turėti ne mažiau kaip',
                      notInclusive: 'turi turėti daugiau kaip',
                    },
                  },
                },
                set: {
                  unit: { one: 'elementą', few: 'elementus', many: 'elementų' },
                  verb: {
                    smaller: {
                      inclusive: 'turi turėti ne daugiau kaip',
                      notInclusive: 'turi turėti mažiau kaip',
                    },
                    bigger: {
                      inclusive: 'turi turėti ne mažiau kaip',
                      notInclusive: 'turi turėti daugiau kaip',
                    },
                  },
                },
              };
              function b(b, c, d, f) {
                let g = a[b] ?? null;
                return null === g
                  ? g
                  : { unit: g.unit[c], verb: g.verb[f][d ? 'inclusive' : 'notInclusive'] };
              }
              let c = {
                  regex: 'įvestis',
                  email: 'el. pašto adresas',
                  url: 'URL',
                  emoji: 'jaustukas',
                  uuid: 'UUID',
                  uuidv4: 'UUIDv4',
                  uuidv6: 'UUIDv6',
                  nanoid: 'nanoid',
                  guid: 'GUID',
                  cuid: 'cuid',
                  cuid2: 'cuid2',
                  ulid: 'ULID',
                  xid: 'XID',
                  ksuid: 'KSUID',
                  datetime: 'ISO data ir laikas',
                  date: 'ISO data',
                  time: 'ISO laikas',
                  duration: 'ISO trukmė',
                  ipv4: 'IPv4 adresas',
                  ipv6: 'IPv6 adresas',
                  mac: 'MAC adresas',
                  cidrv4: 'IPv4 tinklo prefiksas (CIDR)',
                  cidrv6: 'IPv6 tinklo prefiksas (CIDR)',
                  base64: 'base64 užkoduota eilutė',
                  base64url: 'base64url užkoduota eilutė',
                  json_string: 'JSON eilutė',
                  e164: 'E.164 numeris',
                  credit_card: 'kredito kortelės numeris',
                  currency_code: 'valiutos kodas',
                  iban: 'IBAN',
                  jwt: 'JWT',
                  template_literal: 'įvestis',
                },
                d = {
                  nan: 'NaN',
                  number: 'skaičius',
                  bigint: 'sveikasis skaičius',
                  string: 'eilutė',
                  boolean: 'loginė reikšmė',
                  undefined: 'neapibrėžta reikšmė',
                  function: 'funkcija',
                  symbol: 'simbolis',
                  array: 'masyvas',
                  object: 'objektas',
                  null: 'nulinė reikšmė',
                };
              return (a) => {
                switch (a.code) {
                  case 'invalid_type': {
                    let b = d[a.expected] ?? a.expected,
                      c = bd(a.input),
                      f = d[c] ?? c;
                    if (/^[A-Z]/.test(a.expected))
                      return `Gautas tipas ${f}, o tikėtasi - instanceof ${a.expected}`;
                    return `Gautas tipas ${f}, o tikėtasi - ${b}`;
                  }
                  case 'invalid_value':
                    if (1 === a.values.length) return `Privalo būti ${aS(a.values[0])}`;
                    return `Privalo būti vienas iš ${ai(a.values, '|')} pasirinkimų`;
                  case 'too_big': {
                    let c = d[a.origin] ?? a.origin,
                      f = b(a.origin, fV(Number(a.maximum)), a.inclusive ?? !1, 'smaller');
                    if (f?.verb)
                      return `${fU(c ?? a.origin ?? 'reikšmė')} ${f.verb} ${a.maximum.toString()} ${f.unit ?? 'elementų'}`;
                    let g = a.inclusive ? 'ne didesnis kaip' : 'mažesnis kaip';
                    return `${fU(c ?? a.origin ?? 'reikšmė')} turi būti ${g} ${a.maximum.toString()} ${f?.unit}`;
                  }
                  case 'too_small': {
                    let c = d[a.origin] ?? a.origin,
                      f = b(a.origin, fV(Number(a.minimum)), a.inclusive ?? !1, 'bigger');
                    if (f?.verb)
                      return `${fU(c ?? a.origin ?? 'reikšmė')} ${f.verb} ${a.minimum.toString()} ${f.unit ?? 'elementų'}`;
                    let g = a.inclusive ? 'ne mažesnis kaip' : 'didesnis kaip';
                    return `${fU(c ?? a.origin ?? 'reikšmė')} turi būti ${g} ${a.minimum.toString()} ${f?.unit}`;
                  }
                  case 'invalid_format':
                    if ('starts_with' === a.format) return `Eilutė privalo prasidėti "${a.prefix}"`;
                    if ('ends_with' === a.format) return `Eilutė privalo pasibaigti "${a.suffix}"`;
                    if ('includes' === a.format) return `Eilutė privalo įtraukti "${a.includes}"`;
                    if ('regex' === a.format) return `Eilutė privalo atitikti ${a.pattern}`;
                    return `Neteisingas ${c[a.format] ?? a.format}`;
                  case 'not_multiple_of':
                    return `Skaičius privalo būti ${a.divisor} kartotinis.`;
                  case 'unrecognized_keys':
                    return `Neatpažint${a.keys.length > 1 ? 'i' : 'as'} rakt${a.keys.length > 1 ? 'ai' : 'as'}: ${ai(a.keys, ', ')}`;
                  case 'invalid_key':
                    return 'Rastas klaidingas raktas';
                  case 'invalid_union':
                  default:
                    return 'Klaidinga įvestis';
                  case 'invalid_element': {
                    let b = d[a.origin] ?? a.origin;
                    return `${fU(b ?? a.origin ?? 'reikšmė')} turi klaidingą įvestį`;
                  }
                }
              };
            })(),
          };
        },
        'mk',
        0,
        function () {
          let a, b, c;
          return {
            localeError:
              ((a = {
                string: { unit: 'знаци', verb: 'да имаат' },
                file: { unit: 'бајти', verb: 'да имаат' },
                array: { unit: 'ставки', verb: 'да имаат' },
                set: { unit: 'ставки', verb: 'да имаат' },
                map: { unit: 'ставки', verb: 'да имаат' },
              }),
              (b = {
                regex: 'внес',
                email: 'адреса на е-пошта',
                url: 'URL',
                emoji: 'емоџи',
                uuid: 'UUID',
                uuidv4: 'UUIDv4',
                uuidv6: 'UUIDv6',
                nanoid: 'nanoid',
                guid: 'GUID',
                cuid: 'cuid',
                cuid2: 'cuid2',
                ulid: 'ULID',
                xid: 'XID',
                ksuid: 'KSUID',
                datetime: 'ISO датум и време',
                date: 'ISO датум',
                time: 'ISO време',
                duration: 'ISO времетраење',
                ipv4: 'IPv4 адреса',
                ipv6: 'IPv6 адреса',
                mac: 'MAC адреса',
                cidrv4: 'IPv4 опсег',
                cidrv6: 'IPv6 опсег',
                base64: 'base64-енкодирана низа',
                base64url: 'base64url-енкодирана низа',
                json_string: 'JSON низа',
                e164: 'E.164 број',
                credit_card: 'број на кредитна картичка',
                currency_code: 'код на валута',
                iban: 'IBAN',
                jwt: 'JWT',
                template_literal: 'внес',
              }),
              (c = { nan: 'NaN', number: 'број', array: 'низа' }),
              (d) => {
                switch (d.code) {
                  case 'invalid_type': {
                    let a = c[d.expected] ?? d.expected,
                      b = bd(d.input),
                      f = c[b] ?? b;
                    if (/^[A-Z]/.test(d.expected))
                      return `Грешен внес: се очекува instanceof ${d.expected}, примено ${f}`;
                    return `Грешен внес: се очекува ${a}, примено ${f}`;
                  }
                  case 'invalid_value':
                    if (1 === d.values.length) return `Invalid input: expected ${aS(d.values[0])}`;
                    return `Грешана опција: се очекува една ${ai(d.values, '|')}`;
                  case 'too_big': {
                    let b = d.inclusive ? '<=' : '<',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `Премногу голем: се очекува ${d.origin ?? 'вредноста'} да има ${b}${d.maximum.toString()} ${c.unit ?? 'елементи'}`;
                    return `Премногу голем: се очекува ${d.origin ?? 'вредноста'} да биде ${b}${d.maximum.toString()}`;
                  }
                  case 'too_small': {
                    let b = d.inclusive ? '>=' : '>',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `Премногу мал: се очекува ${d.origin} да има ${b}${d.minimum.toString()} ${c.unit}`;
                    return `Премногу мал: се очекува ${d.origin} да биде ${b}${d.minimum.toString()}`;
                  }
                  case 'invalid_format':
                    if ('starts_with' === d.format)
                      return `Неважечка низа: мора да започнува со "${d.prefix}"`;
                    if ('ends_with' === d.format)
                      return `Неважечка низа: мора да завршува со "${d.suffix}"`;
                    if ('includes' === d.format)
                      return `Неважечка низа: мора да вклучува "${d.includes}"`;
                    if ('regex' === d.format)
                      return `Неважечка низа: мора да одгоара на патернот ${d.pattern}`;
                    return `Invalid ${b[d.format] ?? d.format}`;
                  case 'not_multiple_of':
                    return `Грешен број: мора да биде делив со ${d.divisor}`;
                  case 'unrecognized_keys':
                    return `${d.keys.length > 1 ? 'Непрепознаени клучеви' : 'Непрепознаен клуч'}: ${ai(d.keys, ', ')}`;
                  case 'invalid_key':
                    return `Грешен клуч во ${d.origin}`;
                  case 'invalid_union':
                  default:
                    return 'Грешен внес';
                  case 'invalid_element':
                    return `Грешна вредност во ${d.origin}`;
                }
              }),
          };
        },
        'ms',
        0,
        function () {
          let a, b, c;
          return {
            localeError:
              ((a = {
                string: { unit: 'aksara', verb: 'mempunyai' },
                file: { unit: 'bait', verb: 'mempunyai' },
                array: { unit: 'elemen', verb: 'mempunyai' },
                set: { unit: 'elemen', verb: 'mempunyai' },
                map: { unit: 'elemen', verb: 'mempunyai' },
              }),
              (b = {
                regex: 'input',
                email: 'alamat e-mel',
                url: 'URL',
                emoji: 'emoji',
                uuid: 'UUID',
                uuidv4: 'UUIDv4',
                uuidv6: 'UUIDv6',
                nanoid: 'nanoid',
                guid: 'GUID',
                cuid: 'cuid',
                cuid2: 'cuid2',
                ulid: 'ULID',
                xid: 'XID',
                ksuid: 'KSUID',
                datetime: 'tarikh masa ISO',
                date: 'tarikh ISO',
                time: 'masa ISO',
                duration: 'tempoh ISO',
                ipv4: 'alamat IPv4',
                ipv6: 'alamat IPv6',
                mac: 'alamat MAC',
                cidrv4: 'julat IPv4',
                cidrv6: 'julat IPv6',
                base64: 'string dikodkan base64',
                base64url: 'string dikodkan base64url',
                json_string: 'string JSON',
                e164: 'nombor E.164',
                credit_card: 'nombor kad kredit',
                currency_code: 'kod mata wang',
                iban: 'IBAN',
                jwt: 'JWT',
                template_literal: 'input',
              }),
              (c = { nan: 'NaN', number: 'nombor' }),
              (d) => {
                switch (d.code) {
                  case 'invalid_type': {
                    let a = c[d.expected] ?? d.expected,
                      b = bd(d.input),
                      f = c[b] ?? b;
                    if (/^[A-Z]/.test(d.expected))
                      return `Input tidak sah: dijangka instanceof ${d.expected}, diterima ${f}`;
                    return `Input tidak sah: dijangka ${a}, diterima ${f}`;
                  }
                  case 'invalid_value':
                    if (1 === d.values.length)
                      return `Input tidak sah: dijangka ${aS(d.values[0])}`;
                    return `Pilihan tidak sah: dijangka salah satu daripada ${ai(d.values, '|')}`;
                  case 'too_big': {
                    let b = d.inclusive ? '<=' : '<',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `Terlalu besar: dijangka ${d.origin ?? 'nilai'} ${c.verb} ${b}${d.maximum.toString()} ${c.unit ?? 'elemen'}`;
                    return `Terlalu besar: dijangka ${d.origin ?? 'nilai'} adalah ${b}${d.maximum.toString()}`;
                  }
                  case 'too_small': {
                    let b = d.inclusive ? '>=' : '>',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `Terlalu kecil: dijangka ${d.origin} ${c.verb} ${b}${d.minimum.toString()} ${c.unit}`;
                    return `Terlalu kecil: dijangka ${d.origin} adalah ${b}${d.minimum.toString()}`;
                  }
                  case 'invalid_format':
                    if ('starts_with' === d.format)
                      return `String tidak sah: mesti bermula dengan "${d.prefix}"`;
                    if ('ends_with' === d.format)
                      return `String tidak sah: mesti berakhir dengan "${d.suffix}"`;
                    if ('includes' === d.format)
                      return `String tidak sah: mesti mengandungi "${d.includes}"`;
                    if ('regex' === d.format)
                      return `String tidak sah: mesti sepadan dengan corak ${d.pattern}`;
                    return `${b[d.format] ?? d.format} tidak sah`;
                  case 'not_multiple_of':
                    return `Nombor tidak sah: perlu gandaan ${d.divisor}`;
                  case 'unrecognized_keys':
                    return `Kunci tidak dikenali: ${ai(d.keys, ', ')}`;
                  case 'invalid_key':
                    return `Kunci tidak sah dalam ${d.origin}`;
                  case 'invalid_union':
                  default:
                    return 'Input tidak sah';
                  case 'invalid_element':
                    return `Nilai tidak sah dalam ${d.origin}`;
                }
              }),
          };
        },
        'ne',
        0,
        function () {
          let a, b, c;
          return {
            localeError:
              ((a = {
                string: { unit: 'अक्षर', verb: 'हुनुपर्छ' },
                file: { unit: 'बाइट', verb: 'हुनुपर्छ' },
                array: { unit: 'तत्व', verb: 'हुनुपर्छ' },
                set: { unit: 'तत्व', verb: 'हुनुपर्छ' },
                map: { unit: 'प्रविष्टि', verb: 'हुनुपर्छ' },
              }),
              (b = {
                regex: 'इनपुट',
                email: 'इमेल ठेगाना',
                url: 'URL',
                emoji: 'इमोजी',
                uuid: 'UUID',
                uuidv4: 'UUIDv4',
                uuidv6: 'UUIDv6',
                nanoid: 'nanoid',
                guid: 'GUID',
                cuid: 'cuid',
                cuid2: 'cuid2',
                ulid: 'ULID',
                xid: 'XID',
                ksuid: 'KSUID',
                datetime: 'ISO मिति र समय',
                date: 'ISO मिति',
                time: 'ISO समय',
                duration: 'ISO अवधि',
                ipv4: 'IPv4 ठेगाना',
                ipv6: 'IPv6 ठेगाना',
                mac: 'MAC ठेगाना',
                cidrv4: 'IPv4 दायरा',
                cidrv6: 'IPv6 दायरा',
                base64: 'base64-इन्कोड गरिएको स्ट्रिङ',
                base64url: 'base64url-इन्कोड गरिएको स्ट्रिङ',
                json_string: 'JSON स्ट्रिङ',
                e164: 'E.164 नम्बर',
                credit_card: 'क्रेडिट कार्ड नम्बर',
                currency_code: 'मुद्रा कोड',
                iban: 'IBAN',
                jwt: 'JWT',
                template_literal: 'इनपुट',
              }),
              (c = { nan: 'NaN' }),
              (d) => {
                switch (d.code) {
                  case 'invalid_type': {
                    let a = c[d.expected] ?? d.expected,
                      b = bd(d.input),
                      f = c[b] ?? b;
                    return `अमान्य इनपुट: अपेक्षित ${a}, प्राप्त ${f}`;
                  }
                  case 'invalid_value':
                    if (1 === d.values.length) return `अमान्य इनपुट: अपेक्षित ${aS(d.values[0])}`;
                    return `अमान्य विकल्प: अपेक्षित मानहरू मध्ये एक ${ai(d.values, '|')}`;
                  case 'too_big': {
                    let b = d.inclusive ? '<=' : '<',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `धेरै ठूलो: ${d.origin ?? 'मान'} मा ${b}${d.maximum.toString()} ${c.unit} ${c.verb}`;
                    return `धेरै ठूलो: ${d.origin ?? 'मान'} ${b}${d.maximum.toString()} हुनुपर्छ`;
                  }
                  case 'too_small': {
                    let b = d.inclusive ? '>=' : '>',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `धेरै सानो: ${d.origin} मा ${b}${d.minimum.toString()} ${c.unit} ${c.verb}`;
                    return `धेरै सानो: ${d.origin} ${b}${d.minimum.toString()} हुनुपर्छ`;
                  }
                  case 'invalid_format':
                    if ('starts_with' === d.format)
                      return `अमान्य स्ट्रिङ: "${d.prefix}" बाट सुरु हुनुपर्छ`;
                    if ('ends_with' === d.format)
                      return `अमान्य स्ट्रिङ: "${d.suffix}" मा समाप्त हुनुपर्छ`;
                    if ('includes' === d.format)
                      return `अमान्य स्ट्रिङ: "${d.includes}" समावेश हुनुपर्छ`;
                    if ('regex' === d.format)
                      return `अमान्य स्ट्रिङ: ढाँचा ${d.pattern} सँग मेल खानुपर्छ`;
                    return `अमान्य ${b[d.format] ?? d.format}`;
                  case 'not_multiple_of':
                    return `अमान्य संख्या: ${d.divisor} को गुणज हुनुपर्छ`;
                  case 'unrecognized_keys':
                    return `अपरिचित कुञ्जी${d.keys.length > 1 ? 'हरू' : ''}: ${ai(d.keys, ', ')}`;
                  case 'invalid_key':
                    return `अमान्य कुञ्जी: ${d.origin} मा`;
                  case 'invalid_union':
                    if (d.options && Array.isArray(d.options) && d.options.length > 0) {
                      let a = d.options.map((a) => `'${a}'`).join(' | ');
                      return `अमान्य डिस्क्रिमिनेटर मान: अपेक्षित ${a}`;
                    }
                    return 'अमान्य इनपुट';
                  case 'invalid_element':
                    return `अमान्य मान: ${d.origin} मा`;
                  default:
                    return 'अमान्य इनपुट';
                }
              }),
          };
        },
        'nl',
        0,
        function () {
          let a, b, c;
          return {
            localeError:
              ((a = {
                string: { unit: 'tekens', verb: 'heeft' },
                file: { unit: 'bytes', verb: 'heeft' },
                array: { unit: 'elementen', verb: 'heeft' },
                set: { unit: 'elementen', verb: 'heeft' },
                map: { unit: 'elementen', verb: 'heeft' },
              }),
              (b = {
                regex: 'invoer',
                email: 'emailadres',
                url: 'URL',
                emoji: 'emoji',
                uuid: 'UUID',
                uuidv4: 'UUIDv4',
                uuidv6: 'UUIDv6',
                nanoid: 'nanoid',
                guid: 'GUID',
                cuid: 'cuid',
                cuid2: 'cuid2',
                ulid: 'ULID',
                xid: 'XID',
                ksuid: 'KSUID',
                datetime: 'ISO datum en tijd',
                date: 'ISO datum',
                time: 'ISO tijd',
                duration: 'ISO duur',
                ipv4: 'IPv4-adres',
                ipv6: 'IPv6-adres',
                mac: 'MAC-adres',
                cidrv4: 'IPv4-bereik',
                cidrv6: 'IPv6-bereik',
                base64: 'base64-gecodeerde tekst',
                base64url: 'base64 URL-gecodeerde tekst',
                json_string: 'JSON string',
                e164: 'E.164-nummer',
                credit_card: 'creditcardnummer',
                currency_code: 'valutacode',
                iban: 'IBAN',
                jwt: 'JWT',
                template_literal: 'invoer',
              }),
              (c = { nan: 'NaN', number: 'getal' }),
              (d) => {
                switch (d.code) {
                  case 'invalid_type': {
                    let a = c[d.expected] ?? d.expected,
                      b = bd(d.input),
                      f = c[b] ?? b;
                    if (/^[A-Z]/.test(d.expected))
                      return `Ongeldige invoer: verwacht instanceof ${d.expected}, ontving ${f}`;
                    return `Ongeldige invoer: verwacht ${a}, ontving ${f}`;
                  }
                  case 'invalid_value':
                    if (1 === d.values.length)
                      return `Ongeldige invoer: verwacht ${aS(d.values[0])}`;
                    return `Ongeldige optie: verwacht \xe9\xe9n van ${ai(d.values, '|')}`;
                  case 'too_big': {
                    let b = d.inclusive ? '<=' : '<',
                      c = a[d.origin] ?? null,
                      f = 'date' === d.origin ? 'laat' : 'string' === d.origin ? 'lang' : 'groot';
                    if (c)
                      return `Te ${f}: verwacht dat ${d.origin ?? 'waarde'} ${b}${d.maximum.toString()} ${c.unit ?? 'elementen'} ${c.verb}`;
                    return `Te ${f}: verwacht dat ${d.origin ?? 'waarde'} ${b}${d.maximum.toString()} is`;
                  }
                  case 'too_small': {
                    let b = d.inclusive ? '>=' : '>',
                      c = a[d.origin] ?? null,
                      f = 'date' === d.origin ? 'vroeg' : 'string' === d.origin ? 'kort' : 'klein';
                    if (c)
                      return `Te ${f}: verwacht dat ${d.origin} ${b}${d.minimum.toString()} ${c.unit} ${c.verb}`;
                    return `Te ${f}: verwacht dat ${d.origin} ${b}${d.minimum.toString()} is`;
                  }
                  case 'invalid_format':
                    if ('starts_with' === d.format)
                      return `Ongeldige tekst: moet met "${d.prefix}" beginnen`;
                    if ('ends_with' === d.format)
                      return `Ongeldige tekst: moet op "${d.suffix}" eindigen`;
                    if ('includes' === d.format)
                      return `Ongeldige tekst: moet "${d.includes}" bevatten`;
                    if ('regex' === d.format)
                      return `Ongeldige tekst: moet overeenkomen met patroon ${d.pattern}`;
                    return `Ongeldig: ${b[d.format] ?? d.format}`;
                  case 'not_multiple_of':
                    return `Ongeldig getal: moet een veelvoud van ${d.divisor} zijn`;
                  case 'unrecognized_keys':
                    return `Onbekende key${d.keys.length > 1 ? 's' : ''}: ${ai(d.keys, ', ')}`;
                  case 'invalid_key':
                    return `Ongeldige key in ${d.origin}`;
                  case 'invalid_union':
                  default:
                    return 'Ongeldige invoer';
                  case 'invalid_element':
                    return `Ongeldige waarde in ${d.origin}`;
                }
              }),
          };
        },
        'nn',
        0,
        function () {
          let a, b, c;
          return {
            localeError:
              ((a = {
                string: { unit: 'teikn', verb: 'å ha' },
                file: { unit: 'bytes', verb: 'å ha' },
                array: { unit: 'element', verb: 'å innehalde' },
                set: { unit: 'element', verb: 'å innehalde' },
                map: { unit: 'element', verb: 'å innehalde' },
              }),
              (b = {
                regex: 'input',
                email: 'e-postadresse',
                url: 'URL',
                emoji: 'emoji',
                uuid: 'UUID',
                uuidv4: 'UUIDv4',
                uuidv6: 'UUIDv6',
                nanoid: 'nanoid',
                guid: 'GUID',
                cuid: 'cuid',
                cuid2: 'cuid2',
                ulid: 'ULID',
                xid: 'XID',
                ksuid: 'KSUID',
                datetime: 'ISO dato- og klokkeslett',
                date: 'ISO-dato',
                time: 'ISO-klokkeslett',
                duration: 'ISO-varigheit',
                ipv4: 'IPv4-adresse',
                ipv6: 'IPv6-adresse',
                mac: 'MAC-adresse',
                cidrv4: 'IPv4-spekter',
                cidrv6: 'IPv6-spekter',
                base64: 'base64-enkoda streng',
                base64url: 'base64url-enkoda streng',
                json_string: 'JSON-streng',
                e164: 'E.164-nummer',
                credit_card: 'kredittkortnummer',
                currency_code: 'valutakode',
                iban: 'IBAN',
                jwt: 'JWT',
                template_literal: 'input',
              }),
              (c = { nan: 'NaN', number: 'tal', array: 'liste' }),
              (d) => {
                switch (d.code) {
                  case 'invalid_type': {
                    let a = c[d.expected] ?? d.expected,
                      b = bd(d.input),
                      f = c[b] ?? b;
                    if (/^[A-Z]/.test(d.expected))
                      return `Ugyldig input: forventa instanceof ${d.expected}, fekk ${f}`;
                    return `Ugyldig input: forventa ${a}, fekk ${f}`;
                  }
                  case 'invalid_value':
                    if (1 === d.values.length) return `Ugyldig verdi: forventa ${aS(d.values[0])}`;
                    return `Ugyldig val: forventa eitt av ${ai(d.values, '|')}`;
                  case 'too_big': {
                    let b = d.inclusive ? '<=' : '<',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `For stor(t): forventa ${d.origin ?? 'value'} til \xe5 ha ${b}${d.maximum.toString()} ${c.unit ?? 'element'}`;
                    return `For stor(t): forventa ${d.origin ?? 'value'} til \xe5 ha ${b}${d.maximum.toString()}`;
                  }
                  case 'too_small': {
                    let b = d.inclusive ? '>=' : '>',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `For lite(n): forventa ${d.origin} til \xe5 ha ${b}${d.minimum.toString()} ${c.unit}`;
                    return `For lite(n): forventa ${d.origin} til \xe5 ha ${b}${d.minimum.toString()}`;
                  }
                  case 'invalid_format':
                    if ('starts_with' === d.format)
                      return `Ugyldig streng: m\xe5 starte med "${d.prefix}"`;
                    if ('ends_with' === d.format)
                      return `Ugyldig streng: m\xe5 slutte med "${d.suffix}"`;
                    if ('includes' === d.format)
                      return `Ugyldig streng: m\xe5 innehalde "${d.includes}"`;
                    if ('regex' === d.format)
                      return `Ugyldig streng: m\xe5 matche m\xf8nsteret ${d.pattern}`;
                    return `Ugyldig ${b[d.format] ?? d.format}`;
                  case 'not_multiple_of':
                    return `Ugyldig tal: m\xe5 vere eit multiplum av ${d.divisor}`;
                  case 'unrecognized_keys':
                    return `${d.keys.length > 1 ? 'Ukjende nøklar' : 'Ukjend nøkkel'}: ${ai(d.keys, ', ')}`;
                  case 'invalid_key':
                    return `Ugyldig n\xf8kkel i ${d.origin}`;
                  case 'invalid_union':
                  default:
                    return 'Ugyldig input';
                  case 'invalid_element':
                    return `Ugyldig verdi i ${d.origin}`;
                }
              }),
          };
        },
        'no',
        0,
        function () {
          let a, b, c;
          return {
            localeError:
              ((a = {
                string: { unit: 'tegn', verb: 'å ha' },
                file: { unit: 'bytes', verb: 'å ha' },
                array: { unit: 'elementer', verb: 'å inneholde' },
                set: { unit: 'elementer', verb: 'å inneholde' },
                map: { unit: 'elementer', verb: 'å inneholde' },
              }),
              (b = {
                regex: 'input',
                email: 'e-postadresse',
                url: 'URL',
                emoji: 'emoji',
                uuid: 'UUID',
                uuidv4: 'UUIDv4',
                uuidv6: 'UUIDv6',
                nanoid: 'nanoid',
                guid: 'GUID',
                cuid: 'cuid',
                cuid2: 'cuid2',
                ulid: 'ULID',
                xid: 'XID',
                ksuid: 'KSUID',
                datetime: 'ISO dato- og klokkeslett',
                date: 'ISO-dato',
                time: 'ISO-klokkeslett',
                duration: 'ISO-varighet',
                ipv4: 'IPv4-adresse',
                ipv6: 'IPv6-adresse',
                mac: 'MAC-adresse',
                cidrv4: 'IPv4-spekter',
                cidrv6: 'IPv6-spekter',
                base64: 'base64-enkodet streng',
                base64url: 'base64url-enkodet streng',
                json_string: 'JSON-streng',
                e164: 'E.164-nummer',
                credit_card: 'kredittkortnummer',
                currency_code: 'valutakode',
                iban: 'IBAN',
                jwt: 'JWT',
                template_literal: 'input',
              }),
              (c = { nan: 'NaN', number: 'tall', array: 'liste' }),
              (d) => {
                switch (d.code) {
                  case 'invalid_type': {
                    let a = c[d.expected] ?? d.expected,
                      b = bd(d.input),
                      f = c[b] ?? b;
                    if (/^[A-Z]/.test(d.expected))
                      return `Ugyldig input: forventet instanceof ${d.expected}, fikk ${f}`;
                    return `Ugyldig input: forventet ${a}, fikk ${f}`;
                  }
                  case 'invalid_value':
                    if (1 === d.values.length) return `Ugyldig verdi: forventet ${aS(d.values[0])}`;
                    return `Ugyldig valg: forventet en av ${ai(d.values, '|')}`;
                  case 'too_big': {
                    let b = d.inclusive ? '<=' : '<',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `For stor(t): forventet ${d.origin ?? 'value'} til \xe5 ha ${b}${d.maximum.toString()} ${c.unit ?? 'elementer'}`;
                    return `For stor(t): forventet ${d.origin ?? 'value'} til \xe5 ha ${b}${d.maximum.toString()}`;
                  }
                  case 'too_small': {
                    let b = d.inclusive ? '>=' : '>',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `For lite(n): forventet ${d.origin} til \xe5 ha ${b}${d.minimum.toString()} ${c.unit}`;
                    return `For lite(n): forventet ${d.origin} til \xe5 ha ${b}${d.minimum.toString()}`;
                  }
                  case 'invalid_format':
                    if ('starts_with' === d.format)
                      return `Ugyldig streng: m\xe5 starte med "${d.prefix}"`;
                    if ('ends_with' === d.format)
                      return `Ugyldig streng: m\xe5 ende med "${d.suffix}"`;
                    if ('includes' === d.format)
                      return `Ugyldig streng: m\xe5 inneholde "${d.includes}"`;
                    if ('regex' === d.format)
                      return `Ugyldig streng: m\xe5 matche m\xf8nsteret ${d.pattern}`;
                    return `Ugyldig ${b[d.format] ?? d.format}`;
                  case 'not_multiple_of':
                    return `Ugyldig tall: m\xe5 v\xe6re et multiplum av ${d.divisor}`;
                  case 'unrecognized_keys':
                    return `${d.keys.length > 1 ? 'Ukjente nøkler' : 'Ukjent nøkkel'}: ${ai(d.keys, ', ')}`;
                  case 'invalid_key':
                    return `Ugyldig n\xf8kkel i ${d.origin}`;
                  case 'invalid_union':
                  default:
                    return 'Ugyldig input';
                  case 'invalid_element':
                    return `Ugyldig verdi i ${d.origin}`;
                }
              }),
          };
        },
        'ota',
        0,
        function () {
          let a, b, c;
          return {
            localeError:
              ((a = {
                string: { unit: 'harf', verb: 'olmalıdır' },
                file: { unit: 'bayt', verb: 'olmalıdır' },
                array: { unit: 'unsur', verb: 'olmalıdır' },
                set: { unit: 'unsur', verb: 'olmalıdır' },
                map: { unit: 'unsur', verb: 'olmalıdır' },
              }),
              (b = {
                regex: 'giren',
                email: 'epostagâh',
                url: 'URL',
                emoji: 'emoji',
                uuid: 'UUID',
                uuidv4: 'UUIDv4',
                uuidv6: 'UUIDv6',
                nanoid: 'nanoid',
                guid: 'GUID',
                cuid: 'cuid',
                cuid2: 'cuid2',
                ulid: 'ULID',
                xid: 'XID',
                ksuid: 'KSUID',
                datetime: 'ISO hengâmı',
                date: 'ISO tarihi',
                time: 'ISO zamanı',
                duration: 'ISO müddeti',
                ipv4: 'IPv4 nişânı',
                ipv6: 'IPv6 nişânı',
                mac: 'MAC nişânı',
                cidrv4: 'IPv4 menzili',
                cidrv6: 'IPv6 menzili',
                base64: 'base64-şifreli metin',
                base64url: 'base64url-şifreli metin',
                json_string: 'JSON metin',
                e164: 'E.164 sayısı',
                credit_card: "i'tibâr kartı numarası",
                currency_code: 'para birimi kodu',
                iban: 'IBAN',
                jwt: 'JWT',
                template_literal: 'giren',
              }),
              (c = { nan: 'NaN', number: 'numara', array: 'saf', null: 'gayb' }),
              (d) => {
                switch (d.code) {
                  case 'invalid_type': {
                    let a = c[d.expected] ?? d.expected,
                      b = bd(d.input),
                      f = c[b] ?? b;
                    if (/^[A-Z]/.test(d.expected))
                      return `F\xe2sit giren: umulan instanceof ${d.expected}, alınan ${f}`;
                    return `F\xe2sit giren: umulan ${a}, alınan ${f}`;
                  }
                  case 'invalid_value':
                    if (1 === d.values.length) return `F\xe2sit giren: umulan ${aS(d.values[0])}`;
                    return `F\xe2sit tercih: m\xfbteberler ${ai(d.values, '|')}`;
                  case 'too_big': {
                    let b = d.inclusive ? '<=' : '<',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `Fazla b\xfcy\xfck: ${d.origin ?? 'value'}, ${b}${d.maximum.toString()} ${c.unit ?? 'elements'} sahip olmalıydı.`;
                    return `Fazla b\xfcy\xfck: ${d.origin ?? 'value'}, ${b}${d.maximum.toString()} olmalıydı.`;
                  }
                  case 'too_small': {
                    let b = d.inclusive ? '>=' : '>',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `Fazla k\xfc\xe7\xfck: ${d.origin}, ${b}${d.minimum.toString()} ${c.unit} sahip olmalıydı.`;
                    return `Fazla k\xfc\xe7\xfck: ${d.origin}, ${b}${d.minimum.toString()} olmalıydı.`;
                  }
                  case 'invalid_format':
                    if ('starts_with' === d.format)
                      return `F\xe2sit metin: "${d.prefix}" ile başlamalı.`;
                    if ('ends_with' === d.format)
                      return `F\xe2sit metin: "${d.suffix}" ile bitmeli.`;
                    if ('includes' === d.format)
                      return `F\xe2sit metin: "${d.includes}" ihtiv\xe2 etmeli.`;
                    if ('regex' === d.format) return `F\xe2sit metin: ${d.pattern} nakşına uymalı.`;
                    return `F\xe2sit ${b[d.format] ?? d.format}`;
                  case 'not_multiple_of':
                    return `F\xe2sit sayı: ${d.divisor} katı olmalıydı.`;
                  case 'unrecognized_keys':
                    return `Tanınmayan anahtar ${d.keys.length > 1 ? 's' : ''}: ${ai(d.keys, ', ')}`;
                  case 'invalid_key':
                    return `${d.origin} i\xe7in tanınmayan anahtar var.`;
                  case 'invalid_union':
                    return 'Giren tanınamadı.';
                  case 'invalid_element':
                    return `${d.origin} i\xe7in tanınmayan kıymet var.`;
                  default:
                    return 'Kıymet tanınamadı.';
                }
              }),
          };
        },
        'pl',
        0,
        function () {
          let a, b, c;
          return {
            localeError:
              ((a = {
                string: { unit: 'znaków', verb: 'mieć' },
                file: { unit: 'bajtów', verb: 'mieć' },
                array: { unit: 'elementów', verb: 'mieć' },
                set: { unit: 'elementów', verb: 'mieć' },
                map: { unit: 'elementów', verb: 'mieć' },
              }),
              (b = {
                regex: 'wyrażenie',
                email: 'adres email',
                url: 'URL',
                emoji: 'emoji',
                uuid: 'UUID',
                uuidv4: 'UUIDv4',
                uuidv6: 'UUIDv6',
                nanoid: 'nanoid',
                guid: 'GUID',
                cuid: 'cuid',
                cuid2: 'cuid2',
                ulid: 'ULID',
                xid: 'XID',
                ksuid: 'KSUID',
                datetime: 'data i godzina w formacie ISO',
                date: 'data w formacie ISO',
                time: 'godzina w formacie ISO',
                duration: 'czas trwania ISO',
                ipv4: 'adres IPv4',
                ipv6: 'adres IPv6',
                mac: 'adres MAC',
                cidrv4: 'zakres IPv4',
                cidrv6: 'zakres IPv6',
                base64: 'ciąg znaków zakodowany w formacie base64',
                base64url: 'ciąg znaków zakodowany w formacie base64url',
                json_string: 'ciąg znaków w formacie JSON',
                e164: 'liczba E.164',
                credit_card: 'numer karty kredytowej',
                currency_code: 'kod waluty',
                iban: 'IBAN',
                jwt: 'JWT',
                template_literal: 'wejście',
              }),
              (c = { nan: 'NaN', number: 'liczba', array: 'tablica' }),
              (d) => {
                switch (d.code) {
                  case 'invalid_type': {
                    let a = c[d.expected] ?? d.expected,
                      b = bd(d.input),
                      f = c[b] ?? b;
                    if (/^[A-Z]/.test(d.expected))
                      return `Nieprawidłowe dane wejściowe: oczekiwano instanceof ${d.expected}, otrzymano ${f}`;
                    return `Nieprawidłowe dane wejściowe: oczekiwano ${a}, otrzymano ${f}`;
                  }
                  case 'invalid_value':
                    if (1 === d.values.length)
                      return `Nieprawidłowe dane wejściowe: oczekiwano ${aS(d.values[0])}`;
                    return `Nieprawidłowa opcja: oczekiwano jednej z wartości ${ai(d.values, '|')}`;
                  case 'too_big': {
                    let b = d.inclusive ? '<=' : '<',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `Za duża wartość: oczekiwano, że ${d.origin ?? 'wartość'} będzie mieć ${b}${d.maximum.toString()} ${c.unit ?? 'elementów'}`;
                    return `Zbyt duż(y/a/e): oczekiwano, że ${d.origin ?? 'wartość'} będzie wynosić ${b}${d.maximum.toString()}`;
                  }
                  case 'too_small': {
                    let b = d.inclusive ? '>=' : '>',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `Za mała wartość: oczekiwano, że ${d.origin ?? 'wartość'} będzie mieć ${b}${d.minimum.toString()} ${c.unit ?? 'elementów'}`;
                    return `Zbyt mał(y/a/e): oczekiwano, że ${d.origin ?? 'wartość'} będzie wynosić ${b}${d.minimum.toString()}`;
                  }
                  case 'invalid_format':
                    if ('starts_with' === d.format)
                      return `Nieprawidłowy ciąg znak\xf3w: musi zaczynać się od "${d.prefix}"`;
                    if ('ends_with' === d.format)
                      return `Nieprawidłowy ciąg znak\xf3w: musi kończyć się na "${d.suffix}"`;
                    if ('includes' === d.format)
                      return `Nieprawidłowy ciąg znak\xf3w: musi zawierać "${d.includes}"`;
                    if ('regex' === d.format)
                      return `Nieprawidłowy ciąg znak\xf3w: musi odpowiadać wzorcowi ${d.pattern}`;
                    return `Nieprawidłow(y/a/e) ${b[d.format] ?? d.format}`;
                  case 'not_multiple_of':
                    return `Nieprawidłowa liczba: musi być wielokrotnością ${d.divisor}`;
                  case 'unrecognized_keys':
                    return `Nierozpoznane klucze${d.keys.length > 1 ? 's' : ''}: ${ai(d.keys, ', ')}`;
                  case 'invalid_key':
                    return `Nieprawidłowy klucz w ${d.origin}`;
                  case 'invalid_union':
                  default:
                    return 'Nieprawidłowe dane wejściowe';
                  case 'invalid_element':
                    return `Nieprawidłowa wartość w ${d.origin}`;
                }
              }),
          };
        },
        'ps',
        0,
        function () {
          let a, b, c;
          return {
            localeError:
              ((a = {
                string: { unit: 'توکي', verb: 'ولري' },
                file: { unit: 'بایټس', verb: 'ولري' },
                array: { unit: 'توکي', verb: 'ولري' },
                set: { unit: 'توکي', verb: 'ولري' },
                map: { unit: 'توکي', verb: 'ولري' },
              }),
              (b = {
                regex: 'ورودي',
                email: 'بریښنالیک',
                url: 'یو آر ال',
                emoji: 'ایموجي',
                uuid: 'UUID',
                uuidv4: 'UUIDv4',
                uuidv6: 'UUIDv6',
                nanoid: 'nanoid',
                guid: 'GUID',
                cuid: 'cuid',
                cuid2: 'cuid2',
                ulid: 'ULID',
                xid: 'XID',
                ksuid: 'KSUID',
                datetime: 'نیټه او وخت',
                date: 'نېټه',
                time: 'وخت',
                duration: 'موده',
                ipv4: 'د IPv4 پته',
                ipv6: 'د IPv6 پته',
                mac: 'د MAC پته',
                cidrv4: 'د IPv4 ساحه',
                cidrv6: 'د IPv6 ساحه',
                base64: 'base64-encoded متن',
                base64url: 'base64url-encoded متن',
                json_string: 'JSON متن',
                e164: 'د E.164 شمېره',
                credit_card: 'د کریډیټ کارت شمیره',
                currency_code: 'د اسعارو کوډ',
                iban: 'IBAN',
                jwt: 'JWT',
                template_literal: 'ورودي',
              }),
              (c = { nan: 'NaN', number: 'عدد', array: 'ارې' }),
              (d) => {
                switch (d.code) {
                  case 'invalid_type': {
                    let a = c[d.expected] ?? d.expected,
                      b = bd(d.input),
                      f = c[b] ?? b;
                    if (/^[A-Z]/.test(d.expected))
                      return `ناسم ورودي: باید instanceof ${d.expected} وای, مګر ${f} ترلاسه شو`;
                    return `ناسم ورودي: باید ${a} وای, مګر ${f} ترلاسه شو`;
                  }
                  case 'invalid_value':
                    if (1 === d.values.length) return `ناسم ورودي: باید ${aS(d.values[0])} وای`;
                    return `ناسم انتخاب: باید یو له ${ai(d.values, '|')} څخه وای`;
                  case 'too_big': {
                    let b = d.inclusive ? '<=' : '<',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `ډیر لوی: ${d.origin ?? 'ارزښت'} باید ${b}${d.maximum.toString()} ${c.unit ?? 'عنصرونه'} ولري`;
                    return `ډیر لوی: ${d.origin ?? 'ارزښت'} باید ${b}${d.maximum.toString()} وي`;
                  }
                  case 'too_small': {
                    let b = d.inclusive ? '>=' : '>',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `ډیر کوچنی: ${d.origin} باید ${b}${d.minimum.toString()} ${c.unit} ولري`;
                    return `ډیر کوچنی: ${d.origin} باید ${b}${d.minimum.toString()} وي`;
                  }
                  case 'invalid_format':
                    if ('starts_with' === d.format)
                      return `ناسم متن: باید د "${d.prefix}" سره پیل شي`;
                    if ('ends_with' === d.format)
                      return `ناسم متن: باید د "${d.suffix}" سره پای ته ورسيږي`;
                    if ('includes' === d.format) return `ناسم متن: باید "${d.includes}" ولري`;
                    if ('regex' === d.format)
                      return `ناسم متن: باید د ${d.pattern} سره مطابقت ولري`;
                    return `${b[d.format] ?? d.format} ناسم دی`;
                  case 'not_multiple_of':
                    return `ناسم عدد: باید د ${d.divisor} مضرب وي`;
                  case 'unrecognized_keys':
                    return `ناسم ${d.keys.length > 1 ? 'کلیډونه' : 'کلیډ'}: ${ai(d.keys, ', ')}`;
                  case 'invalid_key':
                    return `ناسم کلیډ په ${d.origin} کې`;
                  case 'invalid_union':
                  default:
                    return 'ناسمه ورودي';
                  case 'invalid_element':
                    return `ناسم عنصر په ${d.origin} کې`;
                }
              }),
          };
        },
        'pt',
        0,
        function () {
          return {
            localeError: (() => {
              let a = {
                  string: { unit: 'caracteres' },
                  file: { unit: 'bytes' },
                  array: { unit: 'elementos' },
                  set: { unit: 'elementos' },
                  map: { unit: 'entradas' },
                },
                b = {
                  regex: 'a entrada',
                  email: 'o endereço de e-mail',
                  url: 'o URL',
                  emoji: 'o emoji',
                  uuid: 'o UUID',
                  uuidv4: 'o UUIDv4',
                  uuidv6: 'o UUIDv6',
                  nanoid: 'o nanoid',
                  guid: 'o GUID',
                  cuid: 'o cuid',
                  cuid2: 'o cuid2',
                  ulid: 'o ULID',
                  xid: 'o XID',
                  ksuid: 'o KSUID',
                  datetime: 'a data e hora ISO',
                  date: 'a data ISO',
                  time: 'a hora ISO',
                  duration: 'a duração ISO',
                  ipv4: 'o endereço IPv4',
                  ipv6: 'o endereço IPv6',
                  mac: 'o endereço MAC',
                  cidrv4: 'o intervalo de endereços IPv4',
                  cidrv6: 'o intervalo de endereços IPv6',
                  base64: 'o texto codificado em base64',
                  base64url: 'o texto codificado em base64url',
                  json_string: 'o texto JSON',
                  e164: 'o número E.164',
                  credit_card: 'o número de cartão de crédito',
                  currency_code: 'o código de moeda',
                  iban: 'o IBAN',
                  jwt: 'o JWT',
                  template_literal: 'a entrada',
                },
                c = { definite: 'o', indefinite: 'um' },
                d = { definite: 'a', indefinite: 'uma' },
                f = {
                  string: { name: 'texto', articles: c },
                  number: { name: 'número', articles: c },
                  int: { name: 'número inteiro', articles: c },
                  boolean: { name: 'valor booleano', articles: c },
                  bigint: { name: 'número bigint', articles: c },
                  symbol: { name: 'símbolo', articles: c },
                  undefined: { name: 'valor "undefined"', articles: c },
                  null: { name: 'valor "nulo"', articles: c },
                  never: { name: 'valor "never"', articles: c },
                  void: { name: 'valor "void"', articles: c },
                  date: { name: 'data', articles: d },
                  array: { name: 'vetor', articles: c },
                  object: { name: 'objeto', articles: c },
                  tuple: { name: 'tuplo', articles: c },
                  record: { name: 'registo', articles: c },
                  map: { name: 'mapa', articles: c },
                  set: { name: 'conjunto', articles: c },
                  file: { name: 'ficheiro', articles: c },
                  nonoptional: { name: 'valor não opcional', articles: c },
                  nan: { name: 'valor "NaN"', articles: c },
                  function: { name: 'função', articles: d },
                };
              function g(a, b) {
                let d = f[a] ?? { name: `valor "${a}"`, articles: c };
                return `${d.articles[b]} ${d.name}`;
              }
              return (c) => {
                switch (c.code) {
                  case 'invalid_type': {
                    let a = g(c.expected, 'indefinite'),
                      b = g(bd(c.input), 'indefinite');
                    return `Entrada inv\xe1lida: esperava ${a}, recebeu ${b}`;
                  }
                  case 'invalid_value':
                    if (1 === c.values.length)
                      return `Entrada inv\xe1lida: esperava ${aS(c.values[0])}`;
                    return `Op\xe7\xe3o inv\xe1lida: esperava uma das seguintes op\xe7\xf5es: ${ai(c.values, '|')}`;
                  case 'too_big': {
                    let b = c.inclusive ? '<=' : '<',
                      d = a[c.origin] ?? null;
                    if (d)
                      return `Demasiado grande: esperava que ${g(c.origin, 'definite')} tivesse ${b} ${c.maximum.toString()} ${d.unit ?? 'elementos'}`;
                    return `Demasiado grande: esperava que ${g(c.origin, 'definite')} fosse ${b} ${c.maximum.toString()}`;
                  }
                  case 'too_small': {
                    let b = c.inclusive ? '>=' : '>',
                      d = a[c.origin] ?? null;
                    if (d)
                      return `Demasiado pequeno: esperava que ${g(c.origin, 'definite')} tivesse ${b} ${c.minimum.toString()} ${d.unit ?? 'elementos'}`;
                    return `Demasiado pequeno: esperava que ${g(c.origin, 'definite')} fosse ${b} ${c.minimum.toString()}`;
                  }
                  case 'invalid_format':
                    if ('starts_with' === c.format)
                      return `Texto inv\xe1lido: deve come\xe7ar por "${c.prefix}"`;
                    if ('ends_with' === c.format)
                      return `Texto inv\xe1lido: deve terminar em "${c.suffix}"`;
                    if ('includes' === c.format)
                      return `Texto inv\xe1lido: deve incluir "${c.includes}"`;
                    if ('regex' === c.format)
                      return `Texto inv\xe1lido: deve corresponder ao padr\xe3o ${c.pattern}`;
                    return `Formato d${b[c.format] ?? c.format} inv\xe1lido`;
                  case 'not_multiple_of':
                    return `N\xfamero inv\xe1lido: deve ser m\xfaltiplo de ${c.divisor}`;
                  case 'unrecognized_keys': {
                    let a = c.keys.length > 1 ? 's' : '';
                    return `Chave${a} inv\xe1lida${a}: ${ai(c.keys, ', ')}`;
                  }
                  case 'invalid_key':
                  case 'invalid_element':
                    return `Entrada inv\xe1lida n${g(c.origin, 'definite')}`;
                  case 'invalid_union':
                    if (c.options && Array.isArray(c.options) && c.options.length > 0) {
                      let a = c.options.map((a) => `'${a}'`).join(' | ');
                      return `Valor de discrimina\xe7\xe3o inv\xe1lido. Esperava ${a}`;
                    }
                    return 'Entrada inválida';
                  default:
                    return 'Entrada inválida';
                }
              };
            })(),
          };
        },
        'ptBR',
        0,
        function () {
          return {
            localeError: (() => {
              let a = {
                  string: { unit: 'caracteres' },
                  file: { unit: 'bytes' },
                  array: { unit: 'elementos' },
                  set: { unit: 'elementos' },
                  map: { unit: 'entradas' },
                },
                b = {
                  regex: 'a entrada',
                  email: 'o endereço de e-mail',
                  url: 'o URL',
                  emoji: 'o emoji',
                  uuid: 'o UUID',
                  uuidv4: 'o UUIDv4',
                  uuidv6: 'o UUIDv6',
                  nanoid: 'o nanoid',
                  guid: 'o GUID',
                  cuid: 'o cuid',
                  cuid2: 'o cuid2',
                  ulid: 'o ULID',
                  xid: 'o XID',
                  ksuid: 'o KSUID',
                  datetime: 'a data e hora ISO',
                  date: 'a data ISO',
                  time: 'a hora ISO',
                  duration: 'a duração ISO',
                  ipv4: 'o endereço IPv4',
                  ipv6: 'o endereço IPv6',
                  mac: 'o endereço MAC',
                  cidrv4: 'a faixa de endereços IPv4',
                  cidrv6: 'a faixa de endereços IPv6',
                  base64: 'o texto codificado em base64',
                  base64url: 'o texto codificado em base64url',
                  json_string: 'o texto JSON',
                  e164: 'o número E.164',
                  credit_card: 'o número de cartão de crédito',
                  currency_code: 'o código de moeda',
                  iban: 'o IBAN',
                  jwt: 'o JWT',
                  template_literal: 'a entrada',
                },
                c = { definite: 'o', indefinite: 'um' },
                d = { definite: 'a', indefinite: 'uma' },
                f = {
                  string: { name: 'texto', articles: c },
                  number: { name: 'número', articles: c },
                  int: { name: 'número inteiro', articles: c },
                  boolean: { name: 'valor booleano', articles: c },
                  bigint: { name: 'número bigint', articles: c },
                  symbol: { name: 'símbolo', articles: c },
                  undefined: { name: 'valor "undefined"', articles: c },
                  null: { name: 'valor "nulo"', articles: c },
                  never: { name: 'valor "never"', articles: c },
                  void: { name: 'valor "void"', articles: c },
                  date: { name: 'data', articles: d },
                  array: { name: 'vetor', articles: c },
                  object: { name: 'objeto', articles: c },
                  tuple: { name: 'tupla', articles: d },
                  record: { name: 'registro', articles: c },
                  map: { name: 'mapa', articles: c },
                  set: { name: 'conjunto', articles: c },
                  file: { name: 'arquivo', articles: c },
                  nonoptional: { name: 'valor não opcional', articles: c },
                  nan: { name: 'valor "NaN"', articles: c },
                  function: { name: 'função', articles: d },
                };
              function g(a, b) {
                let d = f[a] ?? { name: `valor "${a}"`, articles: c };
                return `${d.articles[b]} ${d.name}`;
              }
              return (c) => {
                switch (c.code) {
                  case 'invalid_type': {
                    let a = g(c.expected, 'indefinite'),
                      b = g(bd(c.input), 'indefinite');
                    return `Entrada inv\xe1lida: esperava ${a}, recebeu ${b}`;
                  }
                  case 'invalid_value':
                    if (1 === c.values.length)
                      return `Entrada inv\xe1lida: esperava ${aS(c.values[0])}`;
                    return `Op\xe7\xe3o inv\xe1lida: esperava uma das seguintes op\xe7\xf5es: ${ai(c.values, '|')}`;
                  case 'too_big': {
                    let b = c.inclusive ? '<=' : '<',
                      d = a[c.origin] ?? null;
                    if (d)
                      return `Grande demais: esperava que ${g(c.origin, 'definite')} tivesse ${b} ${c.maximum.toString()} ${d.unit ?? 'elementos'}`;
                    return `Grande demais: esperava que ${g(c.origin, 'definite')} fosse ${b} ${c.maximum.toString()}`;
                  }
                  case 'too_small': {
                    let b = c.inclusive ? '>=' : '>',
                      d = a[c.origin] ?? null;
                    if (d)
                      return `Pequeno demais: esperava que ${g(c.origin, 'definite')} tivesse ${b} ${c.minimum.toString()} ${d.unit ?? 'elementos'}`;
                    return `Pequeno demais: esperava que ${g(c.origin, 'definite')} fosse ${b} ${c.minimum.toString()}`;
                  }
                  case 'invalid_format':
                    if ('starts_with' === c.format)
                      return `Texto inv\xe1lido: deve come\xe7ar com "${c.prefix}"`;
                    if ('ends_with' === c.format)
                      return `Texto inv\xe1lido: deve terminar com "${c.suffix}"`;
                    if ('includes' === c.format)
                      return `Texto inv\xe1lido: deve incluir "${c.includes}"`;
                    if ('regex' === c.format)
                      return `Texto inv\xe1lido: deve corresponder ao padr\xe3o ${c.pattern}`;
                    return `Formato d${b[c.format] ?? c.format} inv\xe1lido`;
                  case 'not_multiple_of':
                    return `N\xfamero inv\xe1lido: deve ser m\xfaltiplo de ${c.divisor}`;
                  case 'unrecognized_keys': {
                    let a = c.keys.length > 1 ? 's' : '';
                    return `Chave${a} inv\xe1lida${a}: ${ai(c.keys, ', ')}`;
                  }
                  case 'invalid_key':
                  case 'invalid_element':
                    return `Entrada inv\xe1lida n${g(c.origin, 'definite')}`;
                  case 'invalid_union':
                    if (c.options && Array.isArray(c.options) && c.options.length > 0) {
                      let a = c.options.map((a) => `'${a}'`).join(' | ');
                      return `Valor de discrimina\xe7\xe3o inv\xe1lido. Esperava ${a}`;
                    }
                    return 'Entrada inválida';
                  default:
                    return 'Entrada inválida';
                }
              };
            })(),
          };
        },
        'ro',
        0,
        function () {
          let a, b, c;
          return {
            localeError:
              ((a = {
                string: { unit: 'caractere', verb: 'să aibă' },
                file: { unit: 'octeți', verb: 'să aibă' },
                array: { unit: 'elemente', verb: 'să aibă' },
                set: { unit: 'elemente', verb: 'să aibă' },
                map: { unit: 'intrări', verb: 'să aibă' },
              }),
              (b = {
                regex: 'intrare',
                email: 'adresă de email',
                url: 'URL',
                emoji: 'emoji',
                uuid: 'UUID',
                uuidv4: 'UUIDv4',
                uuidv6: 'UUIDv6',
                nanoid: 'nanoid',
                guid: 'GUID',
                cuid: 'cuid',
                cuid2: 'cuid2',
                ulid: 'ULID',
                xid: 'XID',
                ksuid: 'KSUID',
                datetime: 'dată și oră ISO',
                date: 'dată ISO',
                time: 'oră ISO',
                duration: 'durată ISO',
                ipv4: 'adresă IPv4',
                ipv6: 'adresă IPv6',
                mac: 'adresă MAC',
                cidrv4: 'interval IPv4',
                cidrv6: 'interval IPv6',
                base64: 'șir codat base64',
                base64url: 'șir codat base64url',
                json_string: 'șir JSON',
                e164: 'număr E.164',
                credit_card: 'număr de card de credit',
                currency_code: 'cod valutar',
                iban: 'IBAN',
                jwt: 'JWT',
                template_literal: 'intrare',
              }),
              (c = {
                nan: 'NaN',
                string: 'șir',
                number: 'număr',
                boolean: 'boolean',
                function: 'funcție',
                array: 'matrice',
                object: 'obiect',
                undefined: 'nedefinit',
                symbol: 'simbol',
                bigint: 'număr mare',
                void: 'void',
                never: 'never',
                map: 'hartă',
                set: 'set',
              }),
              (d) => {
                switch (d.code) {
                  case 'invalid_type': {
                    let a = c[d.expected] ?? d.expected,
                      b = bd(d.input),
                      f = c[b] ?? b;
                    return `Intrare invalidă: așteptat ${a}, primit ${f}`;
                  }
                  case 'invalid_value':
                    if (1 === d.values.length)
                      return `Intrare invalidă: așteptat ${aS(d.values[0])}`;
                    return `Opțiune invalidă: așteptat una dintre ${ai(d.values, '|')}`;
                  case 'too_big': {
                    let b = d.inclusive ? '<=' : '<',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `Prea mare: așteptat ca ${d.origin ?? 'valoarea'} ${c.verb} ${b}${d.maximum.toString()} ${c.unit ?? 'elemente'}`;
                    return `Prea mare: așteptat ca ${d.origin ?? 'valoarea'} să fie ${b}${d.maximum.toString()}`;
                  }
                  case 'too_small': {
                    let b = d.inclusive ? '>=' : '>',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `Prea mic: așteptat ca ${d.origin} ${c.verb} ${b}${d.minimum.toString()} ${c.unit}`;
                    return `Prea mic: așteptat ca ${d.origin} să fie ${b}${d.minimum.toString()}`;
                  }
                  case 'invalid_format':
                    if ('starts_with' === d.format)
                      return `Șir invalid: trebuie să \xeenceapă cu "${d.prefix}"`;
                    if ('ends_with' === d.format)
                      return `Șir invalid: trebuie să se termine cu "${d.suffix}"`;
                    if ('includes' === d.format)
                      return `Șir invalid: trebuie să includă "${d.includes}"`;
                    if ('regex' === d.format)
                      return `Șir invalid: trebuie să se potrivească cu modelul ${d.pattern}`;
                    return `Format invalid: ${b[d.format] ?? d.format}`;
                  case 'not_multiple_of':
                    return `Număr invalid: trebuie să fie multiplu de ${d.divisor}`;
                  case 'unrecognized_keys':
                    return `Chei nerecunoscute: ${ai(d.keys, ', ')}`;
                  case 'invalid_key':
                    return `Cheie invalidă \xeen ${d.origin}`;
                  case 'invalid_union':
                  default:
                    return 'Intrare invalidă';
                  case 'invalid_element':
                    return `Valoare invalidă \xeen ${d.origin}`;
                }
              }),
          };
        },
        'ru',
        0,
        function () {
          let a, b, c;
          return {
            localeError:
              ((a = {
                string: {
                  unit: { one: 'символ', few: 'символа', many: 'символов' },
                  verb: 'иметь',
                },
                file: { unit: { one: 'байт', few: 'байта', many: 'байт' }, verb: 'иметь' },
                array: {
                  unit: { one: 'элемент', few: 'элемента', many: 'элементов' },
                  verb: 'иметь',
                },
                set: {
                  unit: { one: 'элемент', few: 'элемента', many: 'элементов' },
                  verb: 'иметь',
                },
                map: {
                  unit: { one: 'элемент', few: 'элемента', many: 'элементов' },
                  verb: 'иметь',
                },
              }),
              (b = {
                regex: 'ввод',
                email: 'email адрес',
                url: 'URL',
                emoji: 'эмодзи',
                uuid: 'UUID',
                uuidv4: 'UUIDv4',
                uuidv6: 'UUIDv6',
                nanoid: 'nanoid',
                guid: 'GUID',
                cuid: 'cuid',
                cuid2: 'cuid2',
                ulid: 'ULID',
                xid: 'XID',
                ksuid: 'KSUID',
                datetime: 'ISO дата и время',
                date: 'ISO дата',
                time: 'ISO время',
                duration: 'ISO длительность',
                ipv4: 'IPv4 адрес',
                ipv6: 'IPv6 адрес',
                mac: 'MAC адрес',
                cidrv4: 'IPv4 диапазон',
                cidrv6: 'IPv6 диапазон',
                base64: 'строка в формате base64',
                base64url: 'строка в формате base64url',
                json_string: 'JSON строка',
                e164: 'номер E.164',
                credit_card: 'номер кредитной карты',
                currency_code: 'код валюты',
                iban: 'IBAN',
                jwt: 'JWT',
                template_literal: 'ввод',
              }),
              (c = { nan: 'NaN', number: 'число', array: 'массив' }),
              (d) => {
                switch (d.code) {
                  case 'invalid_type': {
                    let a = c[d.expected] ?? d.expected,
                      b = bd(d.input),
                      f = c[b] ?? b;
                    if (/^[A-Z]/.test(d.expected))
                      return `Неверный ввод: ожидалось instanceof ${d.expected}, получено ${f}`;
                    return `Неверный ввод: ожидалось ${a}, получено ${f}`;
                  }
                  case 'invalid_value':
                    if (1 === d.values.length) return `Неверный ввод: ожидалось ${aS(d.values[0])}`;
                    return `Неверный вариант: ожидалось одно из ${ai(d.values, '|')}`;
                  case 'too_big': {
                    let b = d.inclusive ? '<=' : '<',
                      c = a[d.origin] ?? null;
                    if (c) {
                      let a = fW(Number(d.maximum), c.unit.one, c.unit.few, c.unit.many);
                      return `Слишком большое значение: ожидалось, что ${d.origin ?? 'значение'} будет иметь ${b}${d.maximum.toString()} ${a}`;
                    }
                    return `Слишком большое значение: ожидалось, что ${d.origin ?? 'значение'} будет ${b}${d.maximum.toString()}`;
                  }
                  case 'too_small': {
                    let b = d.inclusive ? '>=' : '>',
                      c = a[d.origin] ?? null;
                    if (c) {
                      let a = fW(Number(d.minimum), c.unit.one, c.unit.few, c.unit.many);
                      return `Слишком маленькое значение: ожидалось, что ${d.origin} будет иметь ${b}${d.minimum.toString()} ${a}`;
                    }
                    return `Слишком маленькое значение: ожидалось, что ${d.origin} будет ${b}${d.minimum.toString()}`;
                  }
                  case 'invalid_format':
                    if ('starts_with' === d.format)
                      return `Неверная строка: должна начинаться с "${d.prefix}"`;
                    if ('ends_with' === d.format)
                      return `Неверная строка: должна заканчиваться на "${d.suffix}"`;
                    if ('includes' === d.format)
                      return `Неверная строка: должна содержать "${d.includes}"`;
                    if ('regex' === d.format)
                      return `Неверная строка: должна соответствовать шаблону ${d.pattern}`;
                    return `Неверный ${b[d.format] ?? d.format}`;
                  case 'not_multiple_of':
                    return `Неверное число: должно быть кратным ${d.divisor}`;
                  case 'unrecognized_keys':
                    return `Нераспознанн${d.keys.length > 1 ? 'ые' : 'ый'} ключ${d.keys.length > 1 ? 'и' : ''}: ${ai(d.keys, ', ')}`;
                  case 'invalid_key':
                    return `Неверный ключ в ${d.origin}`;
                  case 'invalid_union':
                  default:
                    return 'Неверные входные данные';
                  case 'invalid_element':
                    return `Неверное значение в ${d.origin}`;
                }
              }),
          };
        },
        'sk',
        0,
        function () {
          let a, b, c;
          return {
            localeError:
              ((a = {
                string: { unit: 'znakov', verb: 'mať' },
                file: { unit: 'bajtov', verb: 'mať' },
                array: { unit: 'prvkov', verb: 'mať' },
                set: { unit: 'prvkov', verb: 'mať' },
                map: { unit: 'položiek', verb: 'mať' },
              }),
              (b = {
                regex: 'regulárny výraz',
                email: 'e-mailová adresa',
                url: 'URL',
                emoji: 'emoji',
                uuid: 'UUID',
                uuidv4: 'UUIDv4',
                uuidv6: 'UUIDv6',
                nanoid: 'nanoid',
                guid: 'GUID',
                cuid: 'cuid',
                cuid2: 'cuid2',
                ulid: 'ULID',
                xid: 'XID',
                ksuid: 'KSUID',
                datetime: 'dátum a čas vo formáte ISO',
                date: 'dátum vo formáte ISO',
                time: 'čas vo formáte ISO',
                duration: 'doba trvania ISO',
                ipv4: 'IPv4 adresa',
                ipv6: 'IPv6 adresa',
                mac: 'MAC adresa',
                cidrv4: 'rozsah IPv4',
                cidrv6: 'rozsah IPv6',
                base64: 'reťazec zakódovaný vo formáte base64',
                base64url: 'reťazec zakódovaný vo formáte base64url',
                json_string: 'reťazec vo formáte JSON',
                e164: 'číslo E.164',
                credit_card: 'číslo kreditnej karty',
                currency_code: 'kód meny',
                iban: 'IBAN',
                jwt: 'JWT',
                template_literal: 'vstup',
              }),
              (c = {
                nan: 'NaN',
                number: 'číslo',
                string: 'reťazec',
                function: 'funkcia',
                array: 'pole',
              }),
              (d) => {
                switch (d.code) {
                  case 'invalid_type': {
                    let a = c[d.expected] ?? d.expected,
                      b = bd(d.input),
                      f = c[b] ?? b;
                    if (/^[A-Z]/.test(d.expected))
                      return `Neplatn\xfd vstup: očak\xe1van\xe9 instanceof ${d.expected}, obdržan\xe9 ${f}`;
                    return `Neplatn\xfd vstup: očak\xe1van\xe9 ${a}, obdržan\xe9 ${f}`;
                  }
                  case 'invalid_value':
                    if (1 === d.values.length)
                      return `Neplatn\xfd vstup: očak\xe1van\xe9 ${aS(d.values[0])}`;
                    return `Neplatn\xfd vstup: očak\xe1van\xe1 jedna z hodn\xf4t ${ai(d.values, '|')}`;
                  case 'too_big': {
                    let b = d.inclusive ? '<=' : '<',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `Hodnota je pr\xedliš veľk\xe1: ${d.origin ?? 'hodnota'} mus\xed mať ${b}${d.maximum.toString()} ${c.unit ?? 'prvkov'}`;
                    return `Hodnota je pr\xedliš veľk\xe1: ${d.origin ?? 'hodnota'} mus\xed byť ${b}${d.maximum.toString()}`;
                  }
                  case 'too_small': {
                    let b = d.inclusive ? '>=' : '>',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `Hodnota je pr\xedliš mal\xe1: ${d.origin ?? 'hodnota'} mus\xed mať ${b}${d.minimum.toString()} ${c.unit ?? 'prvkov'}`;
                    return `Hodnota je pr\xedliš mal\xe1: ${d.origin ?? 'hodnota'} mus\xed byť ${b}${d.minimum.toString()}`;
                  }
                  case 'invalid_format':
                    if ('starts_with' === d.format)
                      return `Neplatn\xfd reťazec: mus\xed zač\xednať na "${d.prefix}"`;
                    if ('ends_with' === d.format)
                      return `Neplatn\xfd reťazec: mus\xed končiť na "${d.suffix}"`;
                    if ('includes' === d.format)
                      return `Neplatn\xfd reťazec: mus\xed obsahovať "${d.includes}"`;
                    if ('regex' === d.format)
                      return `Neplatn\xfd reťazec: mus\xed zodpovedať vzoru ${d.pattern}`;
                    return `Neplatn\xfd form\xe1t ${b[d.format] ?? d.format}`;
                  case 'not_multiple_of':
                    return `Neplatn\xe9 č\xedslo: mus\xed byť n\xe1sobkom ${d.divisor}`;
                  case 'unrecognized_keys':
                    return `Nezn\xe1me kl\xfače: ${ai(d.keys, ', ')}`;
                  case 'invalid_key':
                    return `Neplatn\xfd kl\xfač v ${d.origin}`;
                  case 'invalid_union':
                  default:
                    return 'Neplatný vstup';
                  case 'invalid_element':
                    return `Neplatn\xe1 hodnota v ${d.origin}`;
                }
              }),
          };
        },
        'sl',
        0,
        function () {
          let a, b, c;
          return {
            localeError:
              ((a = {
                string: { unit: 'znakov', verb: 'imeti' },
                file: { unit: 'bajtov', verb: 'imeti' },
                array: { unit: 'elementov', verb: 'imeti' },
                set: { unit: 'elementov', verb: 'imeti' },
                map: { unit: 'elementov', verb: 'imeti' },
              }),
              (b = {
                regex: 'vnos',
                email: 'e-poštni naslov',
                url: 'URL',
                emoji: 'emoji',
                uuid: 'UUID',
                uuidv4: 'UUIDv4',
                uuidv6: 'UUIDv6',
                nanoid: 'nanoid',
                guid: 'GUID',
                cuid: 'cuid',
                cuid2: 'cuid2',
                ulid: 'ULID',
                xid: 'XID',
                ksuid: 'KSUID',
                datetime: 'ISO datum in čas',
                date: 'ISO datum',
                time: 'ISO čas',
                duration: 'ISO trajanje',
                ipv4: 'IPv4 naslov',
                ipv6: 'IPv6 naslov',
                mac: 'MAC naslov',
                cidrv4: 'obseg IPv4',
                cidrv6: 'obseg IPv6',
                base64: 'base64 kodiran niz',
                base64url: 'base64url kodiran niz',
                json_string: 'JSON niz',
                e164: 'E.164 številka',
                credit_card: 'številka kreditne kartice',
                currency_code: 'koda valute',
                iban: 'IBAN',
                jwt: 'JWT',
                template_literal: 'vnos',
              }),
              (c = { nan: 'NaN', number: 'število', array: 'tabela' }),
              (d) => {
                switch (d.code) {
                  case 'invalid_type': {
                    let a = c[d.expected] ?? d.expected,
                      b = bd(d.input),
                      f = c[b] ?? b;
                    if (/^[A-Z]/.test(d.expected))
                      return `Neveljaven vnos: pričakovano instanceof ${d.expected}, prejeto ${f}`;
                    return `Neveljaven vnos: pričakovano ${a}, prejeto ${f}`;
                  }
                  case 'invalid_value':
                    if (1 === d.values.length)
                      return `Neveljaven vnos: pričakovano ${aS(d.values[0])}`;
                    return `Neveljavna možnost: pričakovano eno izmed ${ai(d.values, '|')}`;
                  case 'too_big': {
                    let b = d.inclusive ? '<=' : '<',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `Preveliko: pričakovano, da bo ${d.origin ?? 'vrednost'} imelo ${b}${d.maximum.toString()} ${c.unit ?? 'elementov'}`;
                    return `Preveliko: pričakovano, da bo ${d.origin ?? 'vrednost'} ${b}${d.maximum.toString()}`;
                  }
                  case 'too_small': {
                    let b = d.inclusive ? '>=' : '>',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `Premajhno: pričakovano, da bo ${d.origin} imelo ${b}${d.minimum.toString()} ${c.unit}`;
                    return `Premajhno: pričakovano, da bo ${d.origin} ${b}${d.minimum.toString()}`;
                  }
                  case 'invalid_format':
                    if ('starts_with' === d.format)
                      return `Neveljaven niz: mora se začeti z "${d.prefix}"`;
                    if ('ends_with' === d.format)
                      return `Neveljaven niz: mora se končati z "${d.suffix}"`;
                    if ('includes' === d.format)
                      return `Neveljaven niz: mora vsebovati "${d.includes}"`;
                    if ('regex' === d.format)
                      return `Neveljaven niz: mora ustrezati vzorcu ${d.pattern}`;
                    return `Neveljaven ${b[d.format] ?? d.format}`;
                  case 'not_multiple_of':
                    return `Neveljavno število: mora biti večkratnik ${d.divisor}`;
                  case 'unrecognized_keys':
                    return `Neprepoznan${d.keys.length > 1 ? 'i ključi' : ' ključ'}: ${ai(d.keys, ', ')}`;
                  case 'invalid_key':
                    return `Neveljaven ključ v ${d.origin}`;
                  case 'invalid_union':
                  default:
                    return 'Neveljaven vnos';
                  case 'invalid_element':
                    return `Neveljavna vrednost v ${d.origin}`;
                }
              }),
          };
        },
        'sv',
        0,
        function () {
          let a, b, c;
          return {
            localeError:
              ((a = {
                string: { unit: 'tecken', verb: 'att ha' },
                file: { unit: 'bytes', verb: 'att ha' },
                array: { unit: 'objekt', verb: 'att innehålla' },
                set: { unit: 'objekt', verb: 'att innehålla' },
                map: { unit: 'objekt', verb: 'att innehålla' },
              }),
              (b = {
                regex: 'reguljärt uttryck',
                email: 'e-postadress',
                url: 'URL',
                emoji: 'emoji',
                uuid: 'UUID',
                uuidv4: 'UUIDv4',
                uuidv6: 'UUIDv6',
                nanoid: 'nanoid',
                guid: 'GUID',
                cuid: 'cuid',
                cuid2: 'cuid2',
                ulid: 'ULID',
                xid: 'XID',
                ksuid: 'KSUID',
                datetime: 'ISO-datum och tid',
                date: 'ISO-datum',
                time: 'ISO-tid',
                duration: 'ISO-varaktighet',
                ipv4: 'IPv4-adress',
                ipv6: 'IPv6-adress',
                mac: 'MAC-adress',
                cidrv4: 'IPv4-spektrum',
                cidrv6: 'IPv6-spektrum',
                base64: 'base64-kodad sträng',
                base64url: 'base64url-kodad sträng',
                json_string: 'JSON-sträng',
                e164: 'E.164-nummer',
                credit_card: 'kreditkortsnummer',
                currency_code: 'valutakod',
                iban: 'IBAN',
                jwt: 'JWT',
                template_literal: 'mall-literal',
              }),
              (c = { nan: 'NaN', number: 'antal', array: 'lista' }),
              (d) => {
                switch (d.code) {
                  case 'invalid_type': {
                    let a = c[d.expected] ?? d.expected,
                      b = bd(d.input),
                      f = c[b] ?? b;
                    if (/^[A-Z]/.test(d.expected))
                      return `Ogiltig inmatning: f\xf6rv\xe4ntat instanceof ${d.expected}, fick ${f}`;
                    return `Ogiltig inmatning: f\xf6rv\xe4ntat ${a}, fick ${f}`;
                  }
                  case 'invalid_value':
                    if (1 === d.values.length)
                      return `Ogiltig inmatning: f\xf6rv\xe4ntat ${aS(d.values[0])}`;
                    return `Ogiltigt val: f\xf6rv\xe4ntade en av ${ai(d.values, '|')}`;
                  case 'too_big': {
                    let b = d.inclusive ? '<=' : '<',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `F\xf6r stor(t): f\xf6rv\xe4ntade ${d.origin ?? 'värdet'} att ha ${b}${d.maximum.toString()} ${c.unit ?? 'element'}`;
                    return `F\xf6r stor(t): f\xf6rv\xe4ntat ${d.origin ?? 'värdet'} att ha ${b}${d.maximum.toString()}`;
                  }
                  case 'too_small': {
                    let b = d.inclusive ? '>=' : '>',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `F\xf6r lite(t): f\xf6rv\xe4ntade ${d.origin ?? 'värdet'} att ha ${b}${d.minimum.toString()} ${c.unit}`;
                    return `F\xf6r lite(t): f\xf6rv\xe4ntade ${d.origin ?? 'värdet'} att ha ${b}${d.minimum.toString()}`;
                  }
                  case 'invalid_format':
                    if ('starts_with' === d.format)
                      return `Ogiltig str\xe4ng: m\xe5ste b\xf6rja med "${d.prefix}"`;
                    if ('ends_with' === d.format)
                      return `Ogiltig str\xe4ng: m\xe5ste sluta med "${d.suffix}"`;
                    if ('includes' === d.format)
                      return `Ogiltig str\xe4ng: m\xe5ste inneh\xe5lla "${d.includes}"`;
                    if ('regex' === d.format)
                      return `Ogiltig str\xe4ng: m\xe5ste matcha m\xf6nstret "${d.pattern}"`;
                    return `Ogiltig(t) ${b[d.format] ?? d.format}`;
                  case 'not_multiple_of':
                    return `Ogiltigt tal: m\xe5ste vara en multipel av ${d.divisor}`;
                  case 'unrecognized_keys':
                    return `${d.keys.length > 1 ? 'Okända nycklar' : 'Okänd nyckel'}: ${ai(d.keys, ', ')}`;
                  case 'invalid_key':
                    return `Ogiltig nyckel i ${d.origin ?? 'värdet'}`;
                  case 'invalid_union':
                  default:
                    return 'Ogiltig input';
                  case 'invalid_element':
                    return `Ogiltigt v\xe4rde i ${d.origin ?? 'värdet'}`;
                }
              }),
          };
        },
        'ta',
        0,
        function () {
          let a, b, c;
          return {
            localeError:
              ((a = {
                string: { unit: 'எழுத்துக்கள்', verb: 'கொண்டிருக்க வேண்டும்' },
                file: { unit: 'பைட்டுகள்', verb: 'கொண்டிருக்க வேண்டும்' },
                array: { unit: 'உறுப்புகள்', verb: 'கொண்டிருக்க வேண்டும்' },
                set: { unit: 'உறுப்புகள்', verb: 'கொண்டிருக்க வேண்டும்' },
                map: { unit: 'உறுப்புகள்', verb: 'கொண்டிருக்க வேண்டும்' },
              }),
              (b = {
                regex: 'உள்ளீடு',
                email: 'மின்னஞ்சல் முகவரி',
                url: 'URL',
                emoji: 'emoji',
                uuid: 'UUID',
                uuidv4: 'UUIDv4',
                uuidv6: 'UUIDv6',
                nanoid: 'nanoid',
                guid: 'GUID',
                cuid: 'cuid',
                cuid2: 'cuid2',
                ulid: 'ULID',
                xid: 'XID',
                ksuid: 'KSUID',
                datetime: 'ISO தேதி நேரம்',
                date: 'ISO தேதி',
                time: 'ISO நேரம்',
                duration: 'ISO கால அளவு',
                ipv4: 'IPv4 முகவரி',
                ipv6: 'IPv6 முகவரி',
                mac: 'MAC முகவரி',
                cidrv4: 'IPv4 வரம்பு',
                cidrv6: 'IPv6 வரம்பு',
                base64: 'base64-encoded சரம்',
                base64url: 'base64url-encoded சரம்',
                json_string: 'JSON சரம்',
                e164: 'E.164 எண்',
                credit_card: 'கடன் அட்டை எண்',
                currency_code: 'நாணயக் குறியீடு',
                iban: 'IBAN',
                jwt: 'JWT',
                template_literal: 'input',
              }),
              (c = { nan: 'NaN', number: 'எண்', array: 'அணி', null: 'வெறுமை' }),
              (d) => {
                switch (d.code) {
                  case 'invalid_type': {
                    let a = c[d.expected] ?? d.expected,
                      b = bd(d.input),
                      f = c[b] ?? b;
                    if (/^[A-Z]/.test(d.expected))
                      return `தவறான உள்ளீடு: எதிர்பார்க்கப்பட்டது instanceof ${d.expected}, பெறப்பட்டது ${f}`;
                    return `தவறான உள்ளீடு: எதிர்பார்க்கப்பட்டது ${a}, பெறப்பட்டது ${f}`;
                  }
                  case 'invalid_value':
                    if (1 === d.values.length)
                      return `தவறான உள்ளீடு: எதிர்பார்க்கப்பட்டது ${aS(d.values[0])}`;
                    return `தவறான விருப்பம்: எதிர்பார்க்கப்பட்டது ${ai(d.values, '|')} இல் ஒன்று`;
                  case 'too_big': {
                    let b = d.inclusive ? '<=' : '<',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `மிக பெரியது: எதிர்பார்க்கப்பட்டது ${d.origin ?? 'மதிப்பு'} ${b}${d.maximum.toString()} ${c.unit ?? 'உறுப்புகள்'} ஆக இருக்க வேண்டும்`;
                    return `மிக பெரியது: எதிர்பார்க்கப்பட்டது ${d.origin ?? 'மதிப்பு'} ${b}${d.maximum.toString()} ஆக இருக்க வேண்டும்`;
                  }
                  case 'too_small': {
                    let b = d.inclusive ? '>=' : '>',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `மிகச் சிறியது: எதிர்பார்க்கப்பட்டது ${d.origin} ${b}${d.minimum.toString()} ${c.unit} ஆக இருக்க வேண்டும்`;
                    return `மிகச் சிறியது: எதிர்பார்க்கப்பட்டது ${d.origin} ${b}${d.minimum.toString()} ஆக இருக்க வேண்டும்`;
                  }
                  case 'invalid_format':
                    if ('starts_with' === d.format)
                      return `தவறான சரம்: "${d.prefix}" இல் தொடங்க வேண்டும்`;
                    if ('ends_with' === d.format)
                      return `தவறான சரம்: "${d.suffix}" இல் முடிவடைய வேண்டும்`;
                    if ('includes' === d.format)
                      return `தவறான சரம்: "${d.includes}" ஐ உள்ளடக்க வேண்டும்`;
                    if ('regex' === d.format)
                      return `தவறான சரம்: ${d.pattern} முறைபாட்டுடன் பொருந்த வேண்டும்`;
                    return `தவறான ${b[d.format] ?? d.format}`;
                  case 'not_multiple_of':
                    return `தவறான எண்: ${d.divisor} இன் பலமாக இருக்க வேண்டும்`;
                  case 'unrecognized_keys':
                    return `அடையாளம் தெரியாத விசை${d.keys.length > 1 ? 'கள்' : ''}: ${ai(d.keys, ', ')}`;
                  case 'invalid_key':
                    return `${d.origin} இல் தவறான விசை`;
                  case 'invalid_union':
                  default:
                    return 'தவறான உள்ளீடு';
                  case 'invalid_element':
                    return `${d.origin} இல் தவறான மதிப்பு`;
                }
              }),
          };
        },
        'tg',
        0,
        function () {
          let a, b, c;
          return {
            localeError:
              ((a = {
                string: { unit: 'аломат', verb: 'дошта бошад' },
                file: { unit: 'байт', verb: 'дошта бошад' },
                array: { unit: 'унсур', verb: 'дошта бошад' },
                set: { unit: 'унсур', verb: 'дошта бошад' },
                map: { unit: 'сабт', verb: 'дошта бошад' },
              }),
              (b = {
                regex: 'вуруд',
                email: 'суроғаи email',
                url: 'URL',
                emoji: 'эмоҷи',
                uuid: 'UUID',
                uuidv4: 'UUIDv4',
                uuidv6: 'UUIDv6',
                nanoid: 'nanoid',
                guid: 'GUID',
                cuid: 'cuid',
                cuid2: 'cuid2',
                ulid: 'ULID',
                xid: 'XID',
                ksuid: 'KSUID',
                datetime: 'санаву вақти ISO',
                date: 'санаи ISO',
                time: 'вақти ISO',
                duration: 'давомнокии ISO',
                ipv4: 'суроғаи IPv4',
                ipv6: 'суроғаи IPv6',
                mac: 'суроғаи MAC',
                cidrv4: 'маҳдудаи IPv4',
                cidrv6: 'маҳдудаи IPv6',
                base64: 'сатри дар формати base64',
                base64url: 'сатри дар формати base64url',
                json_string: 'сатри JSON',
                e164: 'рақами E.164',
                credit_card: 'рақами корти кредитӣ',
                currency_code: 'рамзи асъор',
                iban: 'IBAN',
                jwt: 'JWT',
                template_literal: 'вуруд',
              }),
              (c = {
                nan: 'NaN',
                number: 'рақам',
                string: 'сатр',
                array: 'массив',
                object: 'объект',
                date: 'сана',
              }),
              (d) => {
                switch (d.code) {
                  case 'invalid_type': {
                    let a = c[d.expected] ?? d.expected,
                      b = bd(d.input),
                      f = c[b] ?? b;
                    return `Вуруди нодуруст: ${a} интизор мерафт, ${f} гирифта шуд`;
                  }
                  case 'invalid_value':
                    if (1 === d.values.length)
                      return `Вуруди нодуруст: ${aS(d.values[0])} интизор мерафт`;
                    return `Интихоби нодуруст: яке аз ${ai(d.values, '|')} интизор мерафт`;
                  case 'too_big': {
                    let b = d.inclusive ? '<=' : '<',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `Хеле калон: ${d.origin ?? 'қимат'} бояд ${b}${d.maximum.toString()} ${c.unit} ${c.verb}`;
                    return `Хеле калон: ${d.origin ?? 'қимат'} бояд ${b}${d.maximum.toString()} бошад`;
                  }
                  case 'too_small': {
                    let b = d.inclusive ? '>=' : '>',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `Хеле хурд: ${d.origin} бояд ${b}${d.minimum.toString()} ${c.unit} ${c.verb}`;
                    return `Хеле хурд: ${d.origin} бояд ${b}${d.minimum.toString()} бошад`;
                  }
                  case 'invalid_format':
                    if ('starts_with' === d.format)
                      return `Сатри нодуруст: бояд бо "${d.prefix}" оғоз шавад`;
                    if ('ends_with' === d.format)
                      return `Сатри нодуруст: бояд бо "${d.suffix}" анҷом ёбад`;
                    if ('includes' === d.format)
                      return `Сатри нодуруст: бояд "${d.includes}"-ро дар бар гирад`;
                    if ('regex' === d.format)
                      return `Сатри нодуруст: бояд ба намунаи ${d.pattern} мувофиқат кунад`;
                    return `${b[d.format] ?? d.format}-и нодуруст`;
                  case 'not_multiple_of':
                    return `Рақами нодуруст: бояд ба ${d.divisor} бе бақия тақсим шавад`;
                  case 'unrecognized_keys':
                    return `Калид${d.keys.length > 1 ? 'ҳои' : 'и'} номаълум: ${ai(d.keys, ', ')}`;
                  case 'invalid_key':
                    return `Калиди нодуруст дар ${d.origin}`;
                  case 'invalid_union':
                    if (d.options && Array.isArray(d.options) && d.options.length > 0) {
                      let a = d.options.map((a) => `'${a}'`).join(' | ');
                      return `Қимати нодурусти дискриминатор: ${a} интизор мерафт`;
                    }
                    return 'Вуруди нодуруст';
                  case 'invalid_element':
                    return `Қимати нодуруст дар ${d.origin}`;
                  default:
                    return 'Вуруди нодуруст';
                }
              }),
          };
        },
        'th',
        0,
        function () {
          let a, b, c;
          return {
            localeError:
              ((a = {
                string: { unit: 'ตัวอักษร', verb: 'ควรมี' },
                file: { unit: 'ไบต์', verb: 'ควรมี' },
                array: { unit: 'รายการ', verb: 'ควรมี' },
                set: { unit: 'รายการ', verb: 'ควรมี' },
                map: { unit: 'รายการ', verb: 'ควรมี' },
              }),
              (b = {
                regex: 'ข้อมูลที่ป้อน',
                email: 'ที่อยู่อีเมล',
                url: 'URL',
                emoji: 'อิโมจิ',
                uuid: 'UUID',
                uuidv4: 'UUIDv4',
                uuidv6: 'UUIDv6',
                nanoid: 'nanoid',
                guid: 'GUID',
                cuid: 'cuid',
                cuid2: 'cuid2',
                ulid: 'ULID',
                xid: 'XID',
                ksuid: 'KSUID',
                datetime: 'วันที่เวลาแบบ ISO',
                date: 'วันที่แบบ ISO',
                time: 'เวลาแบบ ISO',
                duration: 'ช่วงเวลาแบบ ISO',
                ipv4: 'ที่อยู่ IPv4',
                ipv6: 'ที่อยู่ IPv6',
                mac: 'ที่อยู่ MAC',
                cidrv4: 'ช่วง IP แบบ IPv4',
                cidrv6: 'ช่วง IP แบบ IPv6',
                base64: 'ข้อความแบบ Base64',
                base64url: 'ข้อความแบบ Base64 สำหรับ URL',
                json_string: 'ข้อความแบบ JSON',
                e164: 'เบอร์โทรศัพท์ระหว่างประเทศ (E.164)',
                credit_card: 'หมายเลขบัตรเครดิต',
                currency_code: 'รหัสสกุลเงิน',
                iban: 'IBAN',
                jwt: 'โทเคน JWT',
                template_literal: 'ข้อมูลที่ป้อน',
              }),
              (c = {
                nan: 'NaN',
                number: 'ตัวเลข',
                array: 'อาร์เรย์ (Array)',
                null: 'ไม่มีค่า (null)',
              }),
              (d) => {
                switch (d.code) {
                  case 'invalid_type': {
                    let a = c[d.expected] ?? d.expected,
                      b = bd(d.input),
                      f = c[b] ?? b;
                    if (/^[A-Z]/.test(d.expected))
                      return `ประเภทข้อมูลไม่ถูกต้อง: ควรเป็น instanceof ${d.expected} แต่ได้รับ ${f}`;
                    return `ประเภทข้อมูลไม่ถูกต้อง: ควรเป็น ${a} แต่ได้รับ ${f}`;
                  }
                  case 'invalid_value':
                    if (1 === d.values.length) return `ค่าไม่ถูกต้อง: ควรเป็น ${aS(d.values[0])}`;
                    return `ตัวเลือกไม่ถูกต้อง: ควรเป็นหนึ่งใน ${ai(d.values, '|')}`;
                  case 'too_big': {
                    let b = d.inclusive ? 'ไม่เกิน' : 'น้อยกว่า',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `เกินกำหนด: ${d.origin ?? 'ค่า'} ควรมี${b} ${d.maximum.toString()} ${c.unit ?? 'รายการ'}`;
                    return `เกินกำหนด: ${d.origin ?? 'ค่า'} ควรมี${b} ${d.maximum.toString()}`;
                  }
                  case 'too_small': {
                    let b = d.inclusive ? 'อย่างน้อย' : 'มากกว่า',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `น้อยกว่ากำหนด: ${d.origin} ควรมี${b} ${d.minimum.toString()} ${c.unit}`;
                    return `น้อยกว่ากำหนด: ${d.origin} ควรมี${b} ${d.minimum.toString()}`;
                  }
                  case 'invalid_format':
                    if ('starts_with' === d.format)
                      return `รูปแบบไม่ถูกต้อง: ข้อความต้องขึ้นต้นด้วย "${d.prefix}"`;
                    if ('ends_with' === d.format)
                      return `รูปแบบไม่ถูกต้อง: ข้อความต้องลงท้ายด้วย "${d.suffix}"`;
                    if ('includes' === d.format)
                      return `รูปแบบไม่ถูกต้อง: ข้อความต้องมี "${d.includes}" อยู่ในข้อความ`;
                    if ('regex' === d.format)
                      return `รูปแบบไม่ถูกต้อง: ต้องตรงกับรูปแบบที่กำหนด ${d.pattern}`;
                    return `รูปแบบไม่ถูกต้อง: ${b[d.format] ?? d.format}`;
                  case 'not_multiple_of':
                    return `ตัวเลขไม่ถูกต้อง: ต้องเป็นจำนวนที่หารด้วย ${d.divisor} ได้ลงตัว`;
                  case 'unrecognized_keys':
                    return `พบคีย์ที่ไม่รู้จัก: ${ai(d.keys, ', ')}`;
                  case 'invalid_key':
                    return `คีย์ไม่ถูกต้องใน ${d.origin}`;
                  case 'invalid_union':
                    return 'ข้อมูลไม่ถูกต้อง: ไม่ตรงกับรูปแบบยูเนียนที่กำหนดไว้';
                  case 'invalid_element':
                    return `ข้อมูลไม่ถูกต้องใน ${d.origin}`;
                  default:
                    return 'ข้อมูลไม่ถูกต้อง';
                }
              }),
          };
        },
        'tk',
        0,
        function () {
          let a, b, c;
          return {
            localeError:
              ((a = {
                string: { unit: 'simwol', verb: 'bolmaly' },
                file: { unit: 'baýt', verb: 'bolmaly' },
                array: { unit: 'elementler', verb: 'bolmaly' },
                set: { unit: 'elementler', verb: 'bolmaly' },
                map: { unit: 'elementler', verb: 'bolmaly' },
              }),
              (b = {
                regex: 'giriş',
                email: 'e-poçta salgysy',
                url: 'URL',
                emoji: 'emoji',
                uuid: 'UUID',
                uuidv4: 'UUIDv4',
                uuidv6: 'UUIDv6',
                nanoid: 'nanoid',
                guid: 'GUID',
                cuid: 'cuid',
                cuid2: 'cuid2',
                ulid: 'ULID',
                xid: 'XID',
                ksuid: 'KSUID',
                datetime: 'ISO sene we wagt',
                date: 'ISO sene',
                time: 'ISO wagt',
                duration: 'ISO wagt aralygy',
                ipv4: 'IPv4 salgysy',
                ipv6: 'IPv6 salgysy',
                mac: 'MAC salgysy',
                cidrv4: 'IPv4 aralygy',
                cidrv6: 'IPv6 aralygy',
                base64: 'base64 bilen şifrlenen setir',
                base64url: 'base64url bilen şifrlenen setir',
                json_string: 'JSON setiri',
                e164: 'E.164 nomeri',
                credit_card: 'kredit kartynyň nomeri',
                currency_code: 'walýuta kody',
                iban: 'IBAN',
                jwt: 'JWT',
                template_literal: 'şablon',
              }),
              (c = { nan: 'NaN' }),
              (d) => {
                switch (d.code) {
                  case 'invalid_type': {
                    let a = c[d.expected] ?? d.expected,
                      b = bd(d.input),
                      f = c[b] ?? b;
                    return `N\xe4dogry baha: garaşylan ${a} \xfderine ${f} alyndy`;
                  }
                  case 'invalid_value':
                    if (1 === d.values.length) return `N\xe4dogry baha: ${aS(d.values[0])} bolmaly`;
                    return `N\xe4dogry sa\xfdlaw: aşakdakylardan biri bolmaly: ${ai(d.values, '|')}`;
                  case 'too_big': {
                    let b = d.inclusive ? '<=' : '<',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `Has uly: garaşyl\xfdan ${d.origin ?? 'baha'} ${b} ${d.maximum.toString()} ${c.unit ?? 'element'}`;
                    return `Has uly: garaşyl\xfdan ${d.origin ?? 'baha'} ${b} ${d.maximum.toString()}`;
                  }
                  case 'too_small': {
                    let b = d.inclusive ? '>=' : '>',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `Has ki\xe7i: garaşyl\xfdan ${d.origin} ${b} ${d.minimum.toString()} ${c.unit}`;
                    return `Has ki\xe7i: garaşyl\xfdan ${d.origin} ${b} ${d.minimum.toString()}`;
                  }
                  case 'invalid_format':
                    if ('starts_with' === d.format)
                      return `N\xe4dogry setir: "${d.prefix}" bilen başlamaly`;
                    if ('ends_with' === d.format)
                      return `N\xe4dogry setir: "${d.suffix}" bilen gutarmaly`;
                    if ('includes' === d.format)
                      return `N\xe4dogry setir: "${d.includes}" saklamaly`;
                    if ('regex' === d.format)
                      return `N\xe4dogry setir: ${d.pattern} nusga la\xfdyk bolmaly`;
                    return `N\xe4dogry ${b[d.format] ?? d.format}`;
                  case 'not_multiple_of':
                    return `N\xe4dogry san: ${d.divisor} bilen galyndysyz b\xf6l\xfcnmeli`;
                  case 'unrecognized_keys':
                    return `Tanalma\xfdan a\xe7ar${d.keys.length > 1 ? 'lar' : ''}: ${ai(d.keys, ', ')}`;
                  case 'invalid_key':
                    return `${d.origin} i\xe7inde n\xe4dogry a\xe7ar`;
                  case 'invalid_union':
                  default:
                    return 'Nädogry baha';
                  case 'invalid_element':
                    return `${d.origin} i\xe7inde n\xe4dogry baha`;
                }
              }),
          };
        },
        'tr',
        0,
        function () {
          let a, b, c;
          return {
            localeError:
              ((a = {
                string: { unit: 'karakter', verb: 'olmalı' },
                file: { unit: 'bayt', verb: 'olmalı' },
                array: { unit: 'öğe', verb: 'olmalı' },
                set: { unit: 'öğe', verb: 'olmalı' },
                map: { unit: 'öğe', verb: 'olmalı' },
              }),
              (b = {
                regex: 'girdi',
                email: 'e-posta adresi',
                url: 'URL',
                emoji: 'emoji',
                uuid: 'UUID',
                uuidv4: 'UUIDv4',
                uuidv6: 'UUIDv6',
                nanoid: 'nanoid',
                guid: 'GUID',
                cuid: 'cuid',
                cuid2: 'cuid2',
                ulid: 'ULID',
                xid: 'XID',
                ksuid: 'KSUID',
                datetime: 'ISO tarih ve saat',
                date: 'ISO tarih',
                time: 'ISO saat',
                duration: 'ISO süre',
                ipv4: 'IPv4 adresi',
                ipv6: 'IPv6 adresi',
                mac: 'MAC adresi',
                cidrv4: 'IPv4 aralığı',
                cidrv6: 'IPv6 aralığı',
                base64: 'base64 ile şifrelenmiş metin',
                base64url: 'base64url ile şifrelenmiş metin',
                json_string: 'JSON dizesi',
                e164: 'E.164 sayısı',
                credit_card: 'kredi kartı numarası',
                currency_code: 'para birimi kodu',
                iban: 'IBAN',
                jwt: 'JWT',
                template_literal: 'Şablon dizesi',
              }),
              (c = { nan: 'NaN' }),
              (d) => {
                switch (d.code) {
                  case 'invalid_type': {
                    let a = c[d.expected] ?? d.expected,
                      b = bd(d.input),
                      f = c[b] ?? b;
                    if (/^[A-Z]/.test(d.expected))
                      return `Ge\xe7ersiz değer: beklenen instanceof ${d.expected}, alınan ${f}`;
                    return `Ge\xe7ersiz değer: beklenen ${a}, alınan ${f}`;
                  }
                  case 'invalid_value':
                    if (1 === d.values.length)
                      return `Ge\xe7ersiz değer: beklenen ${aS(d.values[0])}`;
                    return `Ge\xe7ersiz se\xe7enek: aşağıdakilerden biri olmalı: ${ai(d.values, '|')}`;
                  case 'too_big': {
                    let b = d.inclusive ? '<=' : '<',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `\xc7ok b\xfcy\xfck: beklenen ${d.origin ?? 'değer'} ${b}${d.maximum.toString()} ${c.unit ?? 'öğe'}`;
                    return `\xc7ok b\xfcy\xfck: beklenen ${d.origin ?? 'değer'} ${b}${d.maximum.toString()}`;
                  }
                  case 'too_small': {
                    let b = d.inclusive ? '>=' : '>',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `\xc7ok k\xfc\xe7\xfck: beklenen ${d.origin} ${b}${d.minimum.toString()} ${c.unit}`;
                    return `\xc7ok k\xfc\xe7\xfck: beklenen ${d.origin} ${b}${d.minimum.toString()}`;
                  }
                  case 'invalid_format':
                    if ('starts_with' === d.format)
                      return `Ge\xe7ersiz metin: "${d.prefix}" ile başlamalı`;
                    if ('ends_with' === d.format)
                      return `Ge\xe7ersiz metin: "${d.suffix}" ile bitmeli`;
                    if ('includes' === d.format)
                      return `Ge\xe7ersiz metin: "${d.includes}" i\xe7ermeli`;
                    if ('regex' === d.format)
                      return `Ge\xe7ersiz metin: ${d.pattern} desenine uymalı`;
                    return `Ge\xe7ersiz ${b[d.format] ?? d.format}`;
                  case 'not_multiple_of':
                    return `Ge\xe7ersiz sayı: ${d.divisor} ile tam b\xf6l\xfcnebilmeli`;
                  case 'unrecognized_keys':
                    return `Tanınmayan anahtar${d.keys.length > 1 ? 'lar' : ''}: ${ai(d.keys, ', ')}`;
                  case 'invalid_key':
                    return `${d.origin} i\xe7inde ge\xe7ersiz anahtar`;
                  case 'invalid_union':
                  default:
                    return 'Geçersiz değer';
                  case 'invalid_element':
                    return `${d.origin} i\xe7inde ge\xe7ersiz değer`;
                }
              }),
          };
        },
        'ua',
        0,
        function () {
          return fX();
        },
        'uk',
        0,
        fX,
        'ur',
        0,
        function () {
          let a, b, c;
          return {
            localeError:
              ((a = {
                string: { unit: 'حروف', verb: 'ہونا' },
                file: { unit: 'بائٹس', verb: 'ہونا' },
                array: { unit: 'آئٹمز', verb: 'ہونا' },
                set: { unit: 'آئٹمز', verb: 'ہونا' },
                map: { unit: 'آئٹمز', verb: 'ہونا' },
              }),
              (b = {
                regex: 'ان پٹ',
                email: 'ای میل ایڈریس',
                url: 'یو آر ایل',
                emoji: 'ایموجی',
                uuid: 'یو یو آئی ڈی',
                uuidv4: 'یو یو آئی ڈی وی 4',
                uuidv6: 'یو یو آئی ڈی وی 6',
                nanoid: 'نینو آئی ڈی',
                guid: 'جی یو آئی ڈی',
                cuid: 'سی یو آئی ڈی',
                cuid2: 'سی یو آئی ڈی 2',
                ulid: 'یو ایل آئی ڈی',
                xid: 'ایکس آئی ڈی',
                ksuid: 'کے ایس یو آئی ڈی',
                datetime: 'آئی ایس او ڈیٹ ٹائم',
                date: 'آئی ایس او تاریخ',
                time: 'آئی ایس او وقت',
                duration: 'آئی ایس او مدت',
                ipv4: 'آئی پی وی 4 ایڈریس',
                ipv6: 'آئی پی وی 6 ایڈریس',
                mac: 'ایم اے سی ایڈریس',
                cidrv4: 'آئی پی وی 4 رینج',
                cidrv6: 'آئی پی وی 6 رینج',
                base64: 'بیس 64 ان کوڈڈ سٹرنگ',
                base64url: 'بیس 64 یو آر ایل ان کوڈڈ سٹرنگ',
                json_string: 'جے ایس او این سٹرنگ',
                e164: 'ای 164 نمبر',
                credit_card: 'کریڈٹ کارڈ نمبر',
                currency_code: 'کرنسی کوڈ',
                iban: 'IBAN',
                jwt: 'جے ڈبلیو ٹی',
                template_literal: 'ان پٹ',
              }),
              (c = { nan: 'NaN', number: 'نمبر', array: 'آرے', null: 'نل' }),
              (d) => {
                switch (d.code) {
                  case 'invalid_type': {
                    let a = c[d.expected] ?? d.expected,
                      b = bd(d.input),
                      f = c[b] ?? b;
                    if (/^[A-Z]/.test(d.expected))
                      return `غلط ان پٹ: instanceof ${d.expected} متوقع تھا، ${f} موصول ہوا`;
                    return `غلط ان پٹ: ${a} متوقع تھا، ${f} موصول ہوا`;
                  }
                  case 'invalid_value':
                    if (1 === d.values.length) return `غلط ان پٹ: ${aS(d.values[0])} متوقع تھا`;
                    return `غلط آپشن: ${ai(d.values, '|')} میں سے ایک متوقع تھا`;
                  case 'too_big': {
                    let b = d.inclusive ? '<=' : '<',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `بہت بڑا: ${d.origin ?? 'ویلیو'} کے ${b}${d.maximum.toString()} ${c.unit ?? 'عناصر'} ہونے متوقع تھے`;
                    return `بہت بڑا: ${d.origin ?? 'ویلیو'} کا ${b}${d.maximum.toString()} ہونا متوقع تھا`;
                  }
                  case 'too_small': {
                    let b = d.inclusive ? '>=' : '>',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `بہت چھوٹا: ${d.origin} کے ${b}${d.minimum.toString()} ${c.unit} ہونے متوقع تھے`;
                    return `بہت چھوٹا: ${d.origin} کا ${b}${d.minimum.toString()} ہونا متوقع تھا`;
                  }
                  case 'invalid_format':
                    if ('starts_with' === d.format)
                      return `غلط سٹرنگ: "${d.prefix}" سے شروع ہونا چاہیے`;
                    if ('ends_with' === d.format)
                      return `غلط سٹرنگ: "${d.suffix}" پر ختم ہونا چاہیے`;
                    if ('includes' === d.format)
                      return `غلط سٹرنگ: "${d.includes}" شامل ہونا چاہیے`;
                    if ('regex' === d.format)
                      return `غلط سٹرنگ: پیٹرن ${d.pattern} سے میچ ہونا چاہیے`;
                    return `غلط ${b[d.format] ?? d.format}`;
                  case 'not_multiple_of':
                    return `غلط نمبر: ${d.divisor} کا مضاعف ہونا چاہیے`;
                  case 'unrecognized_keys':
                    return `غیر تسلیم شدہ کی${d.keys.length > 1 ? 'ز' : ''}: ${ai(d.keys, '، ')}`;
                  case 'invalid_key':
                    return `${d.origin} میں غلط کی`;
                  case 'invalid_union':
                  default:
                    return 'غلط ان پٹ';
                  case 'invalid_element':
                    return `${d.origin} میں غلط ویلیو`;
                }
              }),
          };
        },
        'uz',
        0,
        function () {
          let a, b, c;
          return {
            localeError:
              ((a = {
                string: { unit: 'belgi', verb: 'bo‘lishi kerak' },
                file: { unit: 'bayt', verb: 'bo‘lishi kerak' },
                array: { unit: 'element', verb: 'bo‘lishi kerak' },
                set: { unit: 'element', verb: 'bo‘lishi kerak' },
                map: { unit: 'yozuv', verb: 'bo‘lishi kerak' },
              }),
              (b = {
                regex: 'kirish',
                email: 'elektron pochta manzili',
                url: 'URL',
                emoji: 'emoji',
                uuid: 'UUID',
                uuidv4: 'UUIDv4',
                uuidv6: 'UUIDv6',
                nanoid: 'nanoid',
                guid: 'GUID',
                cuid: 'cuid',
                cuid2: 'cuid2',
                ulid: 'ULID',
                xid: 'XID',
                ksuid: 'KSUID',
                datetime: 'ISO sana va vaqti',
                date: 'ISO sana',
                time: 'ISO vaqt',
                duration: 'ISO davomiylik',
                ipv4: 'IPv4 manzil',
                ipv6: 'IPv6 manzil',
                mac: 'MAC manzil',
                cidrv4: 'IPv4 diapazon',
                cidrv6: 'IPv6 diapazon',
                base64: 'base64 kodlangan satr',
                base64url: 'base64url kodlangan satr',
                json_string: 'JSON satr',
                e164: 'E.164 raqam',
                credit_card: 'kredit karta raqami',
                currency_code: 'valyuta kodi',
                iban: 'IBAN',
                jwt: 'JWT',
                template_literal: 'kirish',
              }),
              (c = { nan: 'NaN', number: 'raqam', array: 'massiv' }),
              (d) => {
                switch (d.code) {
                  case 'invalid_type': {
                    let a = c[d.expected] ?? d.expected,
                      b = bd(d.input),
                      f = c[b] ?? b;
                    if (/^[A-Z]/.test(d.expected))
                      return `Noto‘g‘ri kirish: kutilgan instanceof ${d.expected}, qabul qilingan ${f}`;
                    return `Noto‘g‘ri kirish: kutilgan ${a}, qabul qilingan ${f}`;
                  }
                  case 'invalid_value':
                    if (1 === d.values.length)
                      return `Noto‘g‘ri kirish: kutilgan ${aS(d.values[0])}`;
                    return `Noto‘g‘ri variant: quyidagilardan biri kutilgan ${ai(d.values, '|')}`;
                  case 'too_big': {
                    let b = d.inclusive ? '<=' : '<',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `Juda katta: kutilgan ${d.origin ?? 'qiymat'} ${b}${d.maximum.toString()} ${c.unit} ${c.verb}`;
                    return `Juda katta: kutilgan ${d.origin ?? 'qiymat'} ${b}${d.maximum.toString()}`;
                  }
                  case 'too_small': {
                    let b = d.inclusive ? '>=' : '>',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `Juda kichik: kutilgan ${d.origin} ${b}${d.minimum.toString()} ${c.unit} ${c.verb}`;
                    return `Juda kichik: kutilgan ${d.origin} ${b}${d.minimum.toString()}`;
                  }
                  case 'invalid_format':
                    if ('starts_with' === d.format)
                      return `Noto‘g‘ri satr: "${d.prefix}" bilan boshlanishi kerak`;
                    if ('ends_with' === d.format)
                      return `Noto‘g‘ri satr: "${d.suffix}" bilan tugashi kerak`;
                    if ('includes' === d.format)
                      return `Noto‘g‘ri satr: "${d.includes}" ni o‘z ichiga olishi kerak`;
                    if ('regex' === d.format)
                      return `Noto‘g‘ri satr: ${d.pattern} shabloniga mos kelishi kerak`;
                    return `Noto‘g‘ri ${b[d.format] ?? d.format}`;
                  case 'not_multiple_of':
                    return `Noto‘g‘ri raqam: ${d.divisor} ning karralisi bo‘lishi kerak`;
                  case 'unrecognized_keys':
                    return `Noma’lum kalit${d.keys.length > 1 ? 'lar' : ''}: ${ai(d.keys, ', ')}`;
                  case 'invalid_key':
                    return `${d.origin} dagi kalit noto‘g‘ri`;
                  case 'invalid_union':
                  default:
                    return 'Noto‘g‘ri kirish';
                  case 'invalid_element':
                    return `${d.origin} da noto‘g‘ri qiymat`;
                }
              }),
          };
        },
        'vi',
        0,
        function () {
          let a, b, c;
          return {
            localeError:
              ((a = {
                string: { unit: 'ký tự', verb: 'có' },
                file: { unit: 'byte', verb: 'có' },
                array: { unit: 'phần tử', verb: 'có' },
                set: { unit: 'phần tử', verb: 'có' },
                map: { unit: 'phần tử', verb: 'có' },
              }),
              (b = {
                regex: 'đầu vào',
                email: 'địa chỉ email',
                url: 'URL',
                emoji: 'emoji',
                uuid: 'UUID',
                uuidv4: 'UUIDv4',
                uuidv6: 'UUIDv6',
                nanoid: 'nanoid',
                guid: 'GUID',
                cuid: 'cuid',
                cuid2: 'cuid2',
                ulid: 'ULID',
                xid: 'XID',
                ksuid: 'KSUID',
                datetime: 'ngày giờ ISO',
                date: 'ngày ISO',
                time: 'giờ ISO',
                duration: 'khoảng thời gian ISO',
                ipv4: 'địa chỉ IPv4',
                ipv6: 'địa chỉ IPv6',
                mac: 'địa chỉ MAC',
                cidrv4: 'dải IPv4',
                cidrv6: 'dải IPv6',
                base64: 'chuỗi mã hóa base64',
                base64url: 'chuỗi mã hóa base64url',
                json_string: 'chuỗi JSON',
                e164: 'số E.164',
                credit_card: 'số thẻ tín dụng',
                currency_code: 'mã tiền tệ',
                iban: 'IBAN',
                jwt: 'JWT',
                template_literal: 'đầu vào',
              }),
              (c = { nan: 'NaN', number: 'số', array: 'mảng' }),
              (d) => {
                switch (d.code) {
                  case 'invalid_type': {
                    let a = c[d.expected] ?? d.expected,
                      b = bd(d.input),
                      f = c[b] ?? b;
                    if (/^[A-Z]/.test(d.expected))
                      return `Đầu v\xe0o kh\xf4ng hợp lệ: mong đợi instanceof ${d.expected}, nhận được ${f}`;
                    return `Đầu v\xe0o kh\xf4ng hợp lệ: mong đợi ${a}, nhận được ${f}`;
                  }
                  case 'invalid_value':
                    if (1 === d.values.length)
                      return `Đầu v\xe0o kh\xf4ng hợp lệ: mong đợi ${aS(d.values[0])}`;
                    return `T\xf9y chọn kh\xf4ng hợp lệ: mong đợi một trong c\xe1c gi\xe1 trị ${ai(d.values, '|')}`;
                  case 'too_big': {
                    let b = d.inclusive ? '<=' : '<',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `Qu\xe1 lớn: mong đợi ${d.origin ?? 'giá trị'} ${c.verb} ${b}${d.maximum.toString()} ${c.unit ?? 'phần tử'}`;
                    return `Qu\xe1 lớn: mong đợi ${d.origin ?? 'giá trị'} ${b}${d.maximum.toString()}`;
                  }
                  case 'too_small': {
                    let b = d.inclusive ? '>=' : '>',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `Qu\xe1 nhỏ: mong đợi ${d.origin} ${c.verb} ${b}${d.minimum.toString()} ${c.unit}`;
                    return `Qu\xe1 nhỏ: mong đợi ${d.origin} ${b}${d.minimum.toString()}`;
                  }
                  case 'invalid_format':
                    if ('starts_with' === d.format)
                      return `Chuỗi kh\xf4ng hợp lệ: phải bắt đầu bằng "${d.prefix}"`;
                    if ('ends_with' === d.format)
                      return `Chuỗi kh\xf4ng hợp lệ: phải kết th\xfac bằng "${d.suffix}"`;
                    if ('includes' === d.format)
                      return `Chuỗi kh\xf4ng hợp lệ: phải bao gồm "${d.includes}"`;
                    if ('regex' === d.format)
                      return `Chuỗi kh\xf4ng hợp lệ: phải khớp với mẫu ${d.pattern}`;
                    return `${b[d.format] ?? d.format} kh\xf4ng hợp lệ`;
                  case 'not_multiple_of':
                    return `Số kh\xf4ng hợp lệ: phải l\xe0 bội số của ${d.divisor}`;
                  case 'unrecognized_keys':
                    return `Kh\xf3a kh\xf4ng được nhận dạng: ${ai(d.keys, ', ')}`;
                  case 'invalid_key':
                    return `Kh\xf3a kh\xf4ng hợp lệ trong ${d.origin}`;
                  case 'invalid_union':
                  default:
                    return 'Đầu vào không hợp lệ';
                  case 'invalid_element':
                    return `Gi\xe1 trị kh\xf4ng hợp lệ trong ${d.origin}`;
                }
              }),
          };
        },
        'yo',
        0,
        function () {
          let a, b, c;
          return {
            localeError:
              ((a = {
                string: { unit: 'àmi', verb: 'ní' },
                file: { unit: 'bytes', verb: 'ní' },
                array: { unit: 'nkan', verb: 'ní' },
                set: { unit: 'nkan', verb: 'ní' },
                map: { unit: 'nkan', verb: 'ní' },
              }),
              (b = {
                regex: 'ẹ̀rọ ìbáwọlé',
                email: 'àdírẹ́sì ìmẹ́lì',
                url: 'URL',
                emoji: 'emoji',
                uuid: 'UUID',
                uuidv4: 'UUIDv4',
                uuidv6: 'UUIDv6',
                nanoid: 'nanoid',
                guid: 'GUID',
                cuid: 'cuid',
                cuid2: 'cuid2',
                ulid: 'ULID',
                xid: 'XID',
                ksuid: 'KSUID',
                datetime: 'àkókò ISO',
                date: 'ọjọ́ ISO',
                time: 'àkókò ISO',
                duration: 'àkókò tó pé ISO',
                ipv4: 'àdírẹ́sì IPv4',
                ipv6: 'àdírẹ́sì IPv6',
                mac: 'àdírẹ́sì MAC',
                cidrv4: 'àgbègbè IPv4',
                cidrv6: 'àgbègbè IPv6',
                base64: 'ọ̀rọ̀ tí a kọ́ ní base64',
                base64url: 'ọ̀rọ̀ base64url',
                json_string: 'ọ̀rọ̀ JSON',
                e164: 'nọ́mbà E.164',
                credit_card: 'nọmba kaadi gbese',
                currency_code: 'koodu owó',
                iban: 'IBAN',
                jwt: 'JWT',
                template_literal: 'ẹ̀rọ ìbáwọlé',
              }),
              (c = { nan: 'NaN', number: 'nọ́mbà', array: 'akopọ' }),
              (d) => {
                switch (d.code) {
                  case 'invalid_type': {
                    let a = c[d.expected] ?? d.expected,
                      b = bd(d.input),
                      f = c[b] ?? b;
                    if (/^[A-Z]/.test(d.expected))
                      return `\xccb\xe1wọl\xe9 aṣ\xecṣe: a n\xed l\xe1ti fi instanceof ${d.expected}, \xe0mọ̀ a r\xed ${f}`;
                    return `\xccb\xe1wọl\xe9 aṣ\xecṣe: a n\xed l\xe1ti fi ${a}, \xe0mọ̀ a r\xed ${f}`;
                  }
                  case 'invalid_value':
                    if (1 === d.values.length)
                      return `\xccb\xe1wọl\xe9 aṣ\xecṣe: a n\xed l\xe1ti fi ${aS(d.values[0])}`;
                    return `\xc0ṣ\xe0y\xe0n aṣ\xecṣe: yan ọ̀kan l\xe1ra ${ai(d.values, '|')}`;
                  case 'too_big': {
                    let b = d.inclusive ? '<=' : '<',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `T\xf3 pọ̀ j\xf9: a n\xed l\xe1ti jẹ́ p\xe9 ${d.origin ?? 'iye'} ${c.verb} ${b}${d.maximum} ${c.unit}`;
                    return `T\xf3 pọ̀ j\xf9: a n\xed l\xe1ti jẹ́ ${b}${d.maximum}`;
                  }
                  case 'too_small': {
                    let b = d.inclusive ? '>=' : '>',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `K\xe9r\xe9 ju: a n\xed l\xe1ti jẹ́ p\xe9 ${d.origin} ${c.verb} ${b}${d.minimum} ${c.unit}`;
                    return `K\xe9r\xe9 ju: a n\xed l\xe1ti jẹ́ ${b}${d.minimum}`;
                  }
                  case 'invalid_format':
                    if ('starts_with' === d.format)
                      return `Ọ̀rọ̀ aṣ\xecṣe: gbọ́dọ̀ bẹ̀rẹ̀ pẹ̀l\xfa "${d.prefix}"`;
                    if ('ends_with' === d.format)
                      return `Ọ̀rọ̀ aṣ\xecṣe: gbọ́dọ̀ par\xed pẹ̀l\xfa "${d.suffix}"`;
                    if ('includes' === d.format) return `Ọ̀rọ̀ aṣ\xecṣe: gbọ́dọ̀ n\xed "${d.includes}"`;
                    if ('regex' === d.format)
                      return `Ọ̀rọ̀ aṣ\xecṣe: gbọ́dọ̀ b\xe1 \xe0pẹẹrẹ mu ${d.pattern}`;
                    return `Aṣ\xecṣe: ${b[d.format] ?? d.format}`;
                  case 'not_multiple_of':
                    return `Nọ́mb\xe0 aṣ\xecṣe: gbọ́dọ̀ jẹ́ \xe8y\xe0 p\xedp\xedn ti ${d.divisor}`;
                  case 'unrecognized_keys':
                    return `Bọt\xecn\xec \xe0\xecmọ̀: ${ai(d.keys, ', ')}`;
                  case 'invalid_key':
                    return `Bọt\xecn\xec aṣ\xecṣe n\xedn\xfa ${d.origin}`;
                  case 'invalid_union':
                  default:
                    return 'Ìbáwọlé aṣìṣe';
                  case 'invalid_element':
                    return `Iye aṣ\xecṣe n\xedn\xfa ${d.origin}`;
                }
              }),
          };
        },
        'zhCN',
        0,
        function () {
          let a, b, c;
          return {
            localeError:
              ((a = {
                string: { unit: '字符', verb: '包含' },
                file: { unit: '字节', verb: '包含' },
                array: { unit: '项', verb: '包含' },
                set: { unit: '项', verb: '包含' },
                map: { unit: '项', verb: '包含' },
              }),
              (b = {
                regex: '输入',
                email: '电子邮件',
                url: 'URL',
                emoji: '表情符号',
                uuid: 'UUID',
                uuidv4: 'UUIDv4',
                uuidv6: 'UUIDv6',
                nanoid: 'nanoid',
                guid: 'GUID',
                cuid: 'cuid',
                cuid2: 'cuid2',
                ulid: 'ULID',
                xid: 'XID',
                ksuid: 'KSUID',
                datetime: 'ISO日期时间',
                date: 'ISO日期',
                time: 'ISO时间',
                duration: 'ISO时长',
                ipv4: 'IPv4地址',
                ipv6: 'IPv6地址',
                mac: 'MAC地址',
                cidrv4: 'IPv4网段',
                cidrv6: 'IPv6网段',
                base64: 'base64编码字符串',
                base64url: 'base64url编码字符串',
                json_string: 'JSON字符串',
                e164: 'E.164号码',
                credit_card: '信用卡号',
                currency_code: '货币代码',
                iban: 'IBAN',
                jwt: 'JWT',
                template_literal: '输入',
              }),
              (c = { nan: 'NaN', number: '数字', array: '数组', null: '空值(null)' }),
              (d) => {
                switch (d.code) {
                  case 'invalid_type': {
                    let a = c[d.expected] ?? d.expected,
                      b = bd(d.input),
                      f = c[b] ?? b;
                    if (/^[A-Z]/.test(d.expected))
                      return `无效输入：期望 instanceof ${d.expected}，实际接收 ${f}`;
                    return `无效输入：期望 ${a}，实际接收 ${f}`;
                  }
                  case 'invalid_value':
                    if (1 === d.values.length) return `无效输入：期望 ${aS(d.values[0])}`;
                    return `无效选项：期望以下之一 ${ai(d.values, '|')}`;
                  case 'too_big': {
                    let b = d.inclusive ? '<=' : '<',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `数值过大：期望 ${d.origin ?? '值'} ${b}${d.maximum.toString()} ${c.unit ?? '个元素'}`;
                    return `数值过大：期望 ${d.origin ?? '值'} ${b}${d.maximum.toString()}`;
                  }
                  case 'too_small': {
                    let b = d.inclusive ? '>=' : '>',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `数值过小：期望 ${d.origin} ${b}${d.minimum.toString()} ${c.unit}`;
                    return `数值过小：期望 ${d.origin} ${b}${d.minimum.toString()}`;
                  }
                  case 'invalid_format':
                    if ('starts_with' === d.format) return `无效字符串：必须以 "${d.prefix}" 开头`;
                    if ('ends_with' === d.format) return `无效字符串：必须以 "${d.suffix}" 结尾`;
                    if ('includes' === d.format) return `无效字符串：必须包含 "${d.includes}"`;
                    if ('regex' === d.format) return `无效字符串：必须满足正则表达式 ${d.pattern}`;
                    return `无效${b[d.format] ?? d.format}`;
                  case 'not_multiple_of':
                    return `无效数字：必须是 ${d.divisor} 的倍数`;
                  case 'unrecognized_keys':
                    return `出现未知的键(key): ${ai(d.keys, ', ')}`;
                  case 'invalid_key':
                    return `${d.origin} 中的键(key)无效`;
                  case 'invalid_union':
                  default:
                    return '无效输入';
                  case 'invalid_element':
                    return `${d.origin} 中包含无效值(value)`;
                }
              }),
          };
        },
        'zhTW',
        0,
        function () {
          let a, b, c;
          return {
            localeError:
              ((a = {
                string: { unit: '字元', verb: '擁有' },
                file: { unit: '位元組', verb: '擁有' },
                array: { unit: '項目', verb: '擁有' },
                set: { unit: '項目', verb: '擁有' },
                map: { unit: '項目', verb: '擁有' },
              }),
              (b = {
                regex: '輸入',
                email: '郵件地址',
                url: 'URL',
                emoji: 'emoji',
                uuid: 'UUID',
                uuidv4: 'UUIDv4',
                uuidv6: 'UUIDv6',
                nanoid: 'nanoid',
                guid: 'GUID',
                cuid: 'cuid',
                cuid2: 'cuid2',
                ulid: 'ULID',
                xid: 'XID',
                ksuid: 'KSUID',
                datetime: 'ISO 日期時間',
                date: 'ISO 日期',
                time: 'ISO 時間',
                duration: 'ISO 期間',
                ipv4: 'IPv4 位址',
                ipv6: 'IPv6 位址',
                mac: 'MAC 位址',
                cidrv4: 'IPv4 範圍',
                cidrv6: 'IPv6 範圍',
                base64: 'base64 編碼字串',
                base64url: 'base64url 編碼字串',
                json_string: 'JSON 字串',
                e164: 'E.164 數值',
                credit_card: '信用卡號',
                currency_code: '貨幣代碼',
                iban: 'IBAN',
                jwt: 'JWT',
                template_literal: '輸入',
              }),
              (c = { nan: 'NaN' }),
              (d) => {
                switch (d.code) {
                  case 'invalid_type': {
                    let a = c[d.expected] ?? d.expected,
                      b = bd(d.input),
                      f = c[b] ?? b;
                    if (/^[A-Z]/.test(d.expected))
                      return `無效的輸入值：預期為 instanceof ${d.expected}，但收到 ${f}`;
                    return `無效的輸入值：預期為 ${a}，但收到 ${f}`;
                  }
                  case 'invalid_value':
                    if (1 === d.values.length) return `無效的輸入值：預期為 ${aS(d.values[0])}`;
                    return `無效的選項：預期為以下其中之一 ${ai(d.values, '|')}`;
                  case 'too_big': {
                    let b = d.inclusive ? '<=' : '<',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `數值過大：預期 ${d.origin ?? '值'} 應為 ${b}${d.maximum.toString()} ${c.unit ?? '個元素'}`;
                    return `數值過大：預期 ${d.origin ?? '值'} 應為 ${b}${d.maximum.toString()}`;
                  }
                  case 'too_small': {
                    let b = d.inclusive ? '>=' : '>',
                      c = a[d.origin] ?? null;
                    if (c)
                      return `數值過小：預期 ${d.origin} 應為 ${b}${d.minimum.toString()} ${c.unit}`;
                    return `數值過小：預期 ${d.origin} 應為 ${b}${d.minimum.toString()}`;
                  }
                  case 'invalid_format':
                    if ('starts_with' === d.format) return `無效的字串：必須以 "${d.prefix}" 開頭`;
                    if ('ends_with' === d.format) return `無效的字串：必須以 "${d.suffix}" 結尾`;
                    if ('includes' === d.format) return `無效的字串：必須包含 "${d.includes}"`;
                    if ('regex' === d.format) return `無效的字串：必須符合格式 ${d.pattern}`;
                    return `無效的 ${b[d.format] ?? d.format}`;
                  case 'not_multiple_of':
                    return `無效的數字：必須為 ${d.divisor} 的倍數`;
                  case 'unrecognized_keys':
                    return `無法識別的鍵值${d.keys.length > 1 ? '們' : ''}：${ai(d.keys, '、')}`;
                  case 'invalid_key':
                    return `${d.origin} 中有無效的鍵值`;
                  case 'invalid_union':
                  default:
                    return '無效的輸入值';
                  case 'invalid_element':
                    return `${d.origin} 中有無效的值`;
                }
              }),
          };
        },
      ],
      8879,
    );
    var fY = a.i(8879);
    let fZ = Symbol('ZodOutput'),
      f$ = Symbol('ZodInput');
    class f_ {
      constructor() {
        ((this._map = new WeakMap()), (this._idmap = new Map()));
      }
      add(a, ...b) {
        let c = b[0];
        return (
          this._map.set(a, c),
          c && 'object' == typeof c && 'id' in c && this._idmap.set(c.id, a),
          this
        );
      }
      clear() {
        return ((this._map = new WeakMap()), (this._idmap = new Map()), this);
      }
      remove(a) {
        let b = this._map.get(a);
        return (
          b && 'object' == typeof b && 'id' in b && this._idmap.delete(b.id),
          this._map.delete(a),
          this
        );
      }
      get(a) {
        let b = a._zod.parent;
        if (b) {
          let c = { ...(this.get(b) ?? {}) };
          delete c.id;
          let d = { ...c, ...this._map.get(a) };
          return Object.keys(d).length ? d : void 0;
        }
        return this._map.get(a);
      }
      has(a) {
        return this._map.has(a);
      }
    }
    function f0() {
      return new f_();
    }
    (l = globalThis).__zod_globalRegistry ?? (l.__zod_globalRegistry = f0());
    let f1 = globalThis.__zod_globalRegistry;
    (a.s(
      [
        '$ZodRegistry',
        0,
        f_,
        '$input',
        0,
        f$,
        '$output',
        0,
        fZ,
        'globalRegistry',
        0,
        f1,
        'registry',
        0,
        f0,
      ],
      98783,
    ),
      a.i(98783),
      a.i(57192));
    let f2 = Symbol.for('zod.compile.invalid'),
      f3 = Symbol.for('zod.compile.fallback');
    class f4 extends Error {
      constructor(a = 'z.compile does not support async refinements, transforms, or checks') {
        (super(a), (this.name = 'ZodCompileAsyncError'));
      }
    }
    class f5 extends Error {
      constructor(a, b = !0) {
        (super(`z.compile does not support ${a}; this schema must use the runtime parser`),
          (this.name = 'ZodCompileUnsupportedError'),
          (this.islandable = b));
      }
    }
    function f6(a, b) {
      try {
        let b = f8(a),
          c = f7(a, b);
        return (
          (c._zod.bag.validator = (function (a, b) {
            try {
              return f8(a, { assertOnly: !0 });
            } catch {
              return b;
            }
          })(a, b)),
          c
        );
      } catch (c) {
        if (b?.strict) throw c;
        return a;
      }
    }
    function f7(a, b) {
      if (fI(a)) throw new f5('a schema whose subtree contains a reference cycle');
      let c = aP(a),
        d = a._zod.run,
        f = d.__originalRun ?? d,
        g = (a, c) => {
          if (
            c?.async ||
            c?.direction === 'backward' ||
            c?.skipChecks ||
            c?.[f3] ||
            (c && fM(c, a.value))
          )
            return f(a, c);
          let d = b(a.value);
          return d !== f2 ? ((a.value = d), a) : (c && (c[f3] = !0), f(a, c));
        };
      return (
        (g.__originalRun = f),
        (c._zod.bag.fallbackRun = f),
        (c._zod.bag.validator = b),
        (c._zod.run = g),
        d.__originalRun ||
          (function (a, b, c) {
            if ('function' == typeof b.safeParse) {
              let d = b.safeParse;
              a.safeParse = (a, b) => {
                let f = c(a);
                return f !== f2 ? { success: !0, data: f } : d(a, b);
              };
            }
            if ('function' == typeof b.parse) {
              let d = b.parse;
              a.parse = (a, b) => {
                let f = c(a);
                return f !== f2 ? f : d(a, b);
              };
            }
          })(c, a, b),
        c
      );
    }
    function f8(a, b) {
      let c,
        d = !0;
      try {
        d = fI(a);
      } catch {}
      if (d) throw new f5('a schema whose subtree contains a reference cycle');
      let f = { constants: new Map(), constantCounter: 0, varCounter: 0, definite: !0 },
        g = new dF(['input']),
        h = gn(g, f, a, 'input', !b?.assertOnly);
      g.write(null === h ? 'return true;' : `return ${h};`);
      let i = ['INVALID', ...f.constants.keys()],
        j = [f2, ...f.constants.values()],
        k = g.content.join('\n'),
        l = b?.debug
          ? i.length > 0
            ? `// Constants: ${i.join(', ')}
${k}`
            : k
          : '',
        m = Function,
        n = `return (input) => {
${k}
}`;
      try {
        c = new m(...i, n)(...j);
      } catch (a) {
        throw new f5(`this schema (generated code failed to evaluate: ${a.message})`);
      }
      return (b?.debug && (c.code = l), (c.definite = f.definite), c);
    }
    function f9(a, b) {
      for (let [c, d] of a.constants) if (d === b) return c;
      let c = `c${a.constantCounter++}`;
      return (a.constants.set(c, b), c);
    }
    function ga(a, b) {
      return ((a.definite = !1), f9(a, b));
    }
    function gb(a) {
      return `v${a.varCounter++}`;
    }
    function gc(a, b) {
      let c = a._zod.run({ value: b, issues: [] }, {});
      return c && 'function' == typeof c.then ? f2 : 0 === c.issues.length ? c.value : f2;
    }
    function gd(a, b, c, d, f = !0) {
      let g = a.content.length,
        h = b.constants.size,
        i = b.constantCounter,
        j = b.varCounter;
      try {
        return gn(a, b, c, d, f);
      } catch (q) {
        var k, l, m, n;
        let f, o, p;
        if (!(q instanceof f5) || !q.islandable) throw q;
        if (((a.content.length = g), b.constants.size > h))
          for (let a of Array.from(b.constants.keys()).slice(h)) b.constants.delete(a);
        return (
          (b.constantCounter = i),
          (b.varCounter = j),
          (k = a),
          (l = b),
          (m = c),
          (n = d),
          (l.definite = !1),
          (f = f9(l, m)),
          (o = f9(l, gc)),
          (p = gb(l)),
          k.write(`const ${p} = ${o}(${f}, ${n});`),
          k.write(`if (${p} === INVALID) return INVALID;`),
          p
        );
      }
    }
    let ge = new Set([
      'max_size',
      'min_size',
      'size_equals',
      'max_length',
      'min_length',
      'length_equals',
    ]);
    function gf(a, b, c, d) {
      let f = f9(b, bb),
        g = gb(b);
      return (
        a.write(`const ${g} = typeof ${c} === "string" && ${d} ? ${f}(${c}) : ${c}.length;`),
        g
      );
    }
    function gg(a, b) {
      if ('number' != typeof a || !Number.isFinite(a))
        throw new f5(`${b} bound of type ${typeof a}`);
      return `${a}`;
    }
    function gh(a, b) {
      if ('bigint' == typeof b) return `${b}n`;
      if ('number' == typeof b) {
        if (Number.isNaN(b)) throw new f5('comparison check with NaN bound');
        return `${b}`;
      }
      if (b instanceof Date) {
        if (Number.isNaN(b.getTime())) throw new f5('comparison check with Invalid Date bound');
        return f9(a, b);
      }
      throw new f5(`comparison check bound of type ${typeof b}`);
    }
    function gi(a, b, c) {
      let d = b.format;
      switch (d) {
        case 'safeint':
          a.write(`if (!Number.isSafeInteger(${c})) return INVALID;`);
          break;
        case 'int32':
          a.write(
            `if (!Number.isInteger(${c}) || ${c} < -2147483648 || ${c} > 2147483647) return INVALID;`,
          );
          break;
        case 'uint32':
          a.write(`if (!Number.isInteger(${c}) || ${c} < 0 || ${c} > 4294967295) return INVALID;`);
          break;
        case 'float32':
          a.write(
            `if (!Number.isFinite(${c}) || ${c} < -3.4028234663852886e38 || ${c} > 3.4028234663852886e38) return INVALID;`,
          );
          break;
        case 'float64':
          a.write(`if (!Number.isFinite(${c})) return INVALID;`);
          break;
        default:
          throw new f5(`number format ${d}`);
      }
    }
    function gj() {
      throw new bC();
    }
    function gk(a) {
      this.issues.push(a);
    }
    let gl = new Set([
      'cidrv4',
      'cuid',
      'cuid2',
      'date',
      'datetime',
      'duration',
      'e164',
      'email',
      'emoji',
      'ends_with',
      'guid',
      'includes',
      'ipv4',
      'ksuid',
      'lowercase',
      'mac',
      'nanoid',
      'regex',
      'starts_with',
      'time',
      'ulid',
      'uppercase',
      'uuid',
      'xid',
    ]);
    function gm(a, b, c, d, f = !0) {
      let g = c.format;
      if ('base64' === g) {
        let c = f9(b, ef);
        return (a.write(`if (!${c}(${d})) return INVALID;`), d);
      }
      if ('base64url' === g) {
        let c = f9(b, ej);
        return (a.write(`if (!${c}(${d})) return INVALID;`), d);
      }
      if ('jwt' === g) {
        let f = f9(b, er),
          g = f9(b, c.alg ?? null);
        return (a.write(`if (!${f}(${d}, ${g})) return INVALID;`), d);
      }
      if ('ipv6' === g) {
        let c = f9(b, d9);
        return (a.write(`if (!${c}(${d})) return INVALID;`), d);
      }
      if ('cidrv6' === g) {
        let c = f9(b, ed);
        return (a.write(`if (!${c}(${d})) return INVALID;`), d);
      }
      if ('credit_card' === g) {
        let c = f9(b, en);
        return (a.write(`if (!${c}(${d})) return INVALID;`), d);
      }
      if ('iban' === g) {
        let c = f9(b, ep);
        return (a.write(`if (!${c}(${d})) return INVALID;`), d);
      }
      if (
        'url' === g ||
        'httpurl' === g ||
        c.normalize ||
        void 0 !== c.hostname ||
        void 0 !== c.protocol
      ) {
        let g = f9(b, dR),
          h = f9(b, c),
          i = gb(b),
          j = gb(b);
        if (
          (a.write(`const ${i} = ${d}.trim();`),
          a.write(`const ${j} = ${g}(${i}, ${h});`),
          a.write(`if (typeof ${j} === "number") return INVALID;`),
          void 0 !== c.hostname)
        ) {
          let c = f9(b, dV);
          a.write(`if (!${c}(${j}, ${h}.hostname)) return INVALID;`);
        }
        if (void 0 !== c.protocol) {
          let c = f9(b, dW);
          a.write(`if (!${c}(${j}, ${h}.protocol)) return INVALID;`);
        }
        if (!f) return null;
        let k = gb(b),
          l = c.normalize ? `${j}.href` : `${f9(b, dU)}(${i})`;
        return (a.write(`const ${k} = ${l};`), k);
      }
      let h = c.fn;
      if (h) {
        if (gt(h)) throw new f5(`async string format ${g}`);
        let c = f9(b, h);
        return (a.write(`if (!${c}(${d})) return INVALID;`), d);
      }
      if (gl.has(g) && c.pattern) {
        let f = f9(b, c.pattern);
        return (
          a.write(`${f}.lastIndex = 0;`),
          a.write(`if (!${f}.test(${d})) return INVALID;`),
          d
        );
      }
      let i = c.format;
      switch (i) {
        case 'regex':
          throw new f5('regex format without a pattern');
        case 'lowercase':
          a.write(`if (${d} !== ${d}.toLowerCase()) return INVALID;`);
          break;
        case 'uppercase':
          a.write(`if (${d} !== ${d}.toUpperCase()) return INVALID;`);
          break;
        case 'includes':
          a.write(`if (!${d}.includes(${aD(c.includes)})) return INVALID;`);
          break;
        case 'starts_with': {
          let b = c.prefix;
          a.write(`if (${d}.slice(0, ${b.length}) !== ${aD(b)}) return INVALID;`);
          break;
        }
        case 'ends_with': {
          let b = c.suffix;
          a.write(`if (${d}.slice(-${b.length}) !== ${aD(b)}) return INVALID;`);
          break;
        }
        default:
          throw new f5(`string format ${i}`);
      }
      return d;
    }
    function gn(a, b, c, d, f = !0) {
      var g,
        h,
        i,
        j,
        k,
        l,
        m,
        n,
        o,
        p,
        q,
        r,
        s,
        t,
        u,
        v,
        w,
        x,
        y,
        z,
        A,
        B,
        C,
        D,
        E,
        F,
        G,
        H,
        I,
        J,
        K,
        L,
        M,
        N,
        O,
        P,
        Q,
        R,
        S;
      let T,
        U = c._zod.def,
        V = U.type;
      if (U.coerce) throw new f5(`coercion (z.coerce.${V}())`);
      let W = f || !!U.checks?.length;
      switch (V) {
        case 'string':
          T = (function (a, b, c, d, f = !0) {
            a.write(`if (typeof ${d} !== "string") return INVALID;`);
            let g = c._zod.def;
            return void 0 === g.format ? d : gm(a, b, g, d, f);
          })(a, b, c, d, W);
          break;
        case 'number':
          let X;
          ((g = a),
            (h = c),
            (i = d),
            g.write(`if (typeof ${i} !== "number" || !Number.isFinite(${i})) return INVALID;`),
            'number_format' === (X = h._zod.def).check &&
              X.format &&
              gi(g, { format: X.format }, i),
            (T = i));
          break;
        case 'boolean':
          ((j = a), (k = d), j.write(`if (typeof ${k} !== "boolean") return INVALID;`), (T = k));
          break;
        case 'bigint':
          T = (function (a, b, c) {
            a.write(`if (typeof ${c} !== "bigint") return INVALID;`);
            let d = b._zod.def;
            if (d.format)
              switch (d.format) {
                case 'int64':
                  a.write(
                    `if (${c} < -9223372036854775808n || ${c} > 9223372036854775807n) return INVALID;`,
                  );
                  break;
                case 'uint64':
                  a.write(`if (${c} < 0n || ${c} > 18446744073709551615n) return INVALID;`);
              }
            return c;
          })(a, c, d);
          break;
        case 'symbol':
          ((l = a), (m = d), l.write(`if (typeof ${m} !== "symbol") return INVALID;`), (T = m));
          break;
        case 'undefined':
          ((n = a), (o = d), n.write(`if (${o} !== undefined) return INVALID;`), (T = o));
          break;
        case 'null':
          ((p = a), (q = d), p.write(`if (${q} !== null) return INVALID;`), (T = q));
          break;
        case 'any':
        case 'unknown':
          T = d;
          break;
        case 'never':
          (a.write('return INVALID;'), (T = d));
          break;
        case 'void':
          ((r = a), (s = d), r.write(`if (${s} !== undefined) return INVALID;`), (T = s));
          break;
        case 'nan':
          ((t = a),
            (u = d),
            t.write(`if (typeof ${u} !== "number" || !Number.isNaN(${u})) return INVALID;`),
            (T = u));
          break;
        case 'date':
          ((v = a),
            (w = d),
            v.write(`if (!(${w} instanceof Date) || Number.isNaN(${w}.getTime())) return INVALID;`),
            (T = w));
          break;
        case 'object':
          T = (function (a, b, c, d, f = !0) {
            let g = c._zod.def;
            a.write(
              `if (typeof ${d} !== "object" || ${d} === null || Array.isArray(${d})) return INVALID;`,
            );
            let h = g.shape,
              i = Object.keys(h),
              j = Object.getOwnPropertySymbols(h),
              k = j.length ? [...i, ...j] : i,
              l = (a) => ('symbol' == typeof a ? f9(b, a) : aD(a));
            if (i.includes('__proto__')) throw new f5('object shape key "__proto__"');
            let m = new Map();
            for (let c of k) {
              let g = h[c],
                i = l(c),
                j = gb(b);
              if ((a.write(`const ${j} = ${d}[${i}];`), void 0 !== g._zod.optin)) {
                let f = gb(b);
                (a.write(`let ${f} = (() => {`),
                  a.indented((a) => {
                    let c = gd(a, b, g, j);
                    a.write(`return ${c};`);
                  }),
                  a.write('})();'),
                  'optional' === g._zod.optout
                    ? (a.write(`if (${f} === INVALID) {`),
                      a.indented((a) => {
                        (a.write(`if (${i} in ${d}) return INVALID;`),
                          a.write(`${f} = undefined;`));
                      }),
                      a.write('}'))
                    : a.write(`if (${f} === INVALID) return INVALID;`),
                  m.set(c, f));
              } else {
                var n;
                void 0 === (n = g)._zod.optin &&
                  (function a(b) {
                    if (b._zod.def.coerce) return !0;
                    let c = b._zod.def;
                    switch (c.type) {
                      case 'any':
                      case 'unknown':
                      case 'undefined':
                      case 'void':
                      case 'default':
                      case 'prefault':
                      case 'transform':
                      case 'custom':
                      case 'lazy':
                      case 'catch':
                      default:
                        return !0;
                      case 'string':
                      case 'number':
                      case 'boolean':
                      case 'bigint':
                      case 'symbol':
                      case 'null':
                      case 'never':
                      case 'nan':
                      case 'date':
                      case 'object':
                      case 'array':
                      case 'tuple':
                      case 'record':
                      case 'map':
                      case 'set':
                      case 'file':
                      case 'template_literal':
                        return !1;
                      case 'nonoptional':
                        return !!c.innerType && a(c.innerType);
                      case 'literal':
                        return !!c.values?.includes(void 0);
                      case 'enum':
                        return !!b._zod.values?.has(void 0);
                      case 'optional':
                      case 'nullable':
                      case 'readonly':
                      case 'success':
                        return !c.innerType || a(c.innerType);
                      case 'union':
                        return !c.options || c.options.some(a);
                      case 'intersection':
                        if (!c.left || !c.right) return !0;
                        return a(c.left) && a(c.right);
                      case 'pipe':
                        return !c.in || a(c.in);
                    }
                  })(n) &&
                  a.write(`if (!(${i} in ${d})) return INVALID;`);
                let h = gd(a, b, g, j, f);
                null !== h && m.set(c, h);
              }
            }
            let o = g.catchall,
              p = 'none';
            if (o) {
              let b = o._zod.def.type;
              if ('never' === b) {
                let b = i.map((a) => `k !== ${aD(a)}`).join(' && ') || 'true';
                (a.write(`for (const k in ${d}) {`),
                  a.indented((a) => {
                    a.write(`if (${b}) return INVALID;`);
                  }),
                  a.write('}'));
              } else
                p =
                  ('unknown' !== b && 'any' !== b) || o._zod.def.checks?.length
                    ? 'schema'
                    : 'passthrough';
            }
            let q = gb(b),
              r = k.some((a) => gp(h[a]) || go(h[a]));
            if (!f) {
              if ('schema' === p) {
                let c = i.length > 0 ? f9(b, new Set(i)) : null;
                (a.write(`for (const k in ${d}) {`),
                  a.indented((a) => {
                    (a.write('if (k === "__proto__") continue;'),
                      c && a.write(`if (${c}.has(k)) continue;`));
                    let f = gb(b);
                    (a.write(`const ${f} = ${d}[k];`), gd(a, b, o, f, !1));
                  }),
                  a.write('}'));
              }
              return null;
            }
            if (r)
              for (let b of (a.write(`const ${q} = {};`), k)) {
                let c = l(b),
                  f = m.get(b);
                go(h[b])
                  ? a.write(`if (${c} in ${d}) ${q}[${c}] = ${f};`)
                  : gp(h[b])
                    ? a.write(`if (${f} !== undefined || ${c} in ${d}) ${q}[${c}] = ${f};`)
                    : a.write(`${q}[${c}] = ${f};`);
              }
            else {
              let b = k
                .map((a) => `${'symbol' == typeof a ? `[${l(a)}]` : aD(a)}: ${m.get(a)}`)
                .join(', ');
              a.write(`const ${q} = { ${b} };`);
            }
            if ('none' !== p) {
              let c = i.length > 0 ? f9(b, new Set(i)) : null;
              (a.write(`for (const k in ${d}) {`),
                a.indented((a) => {
                  if (
                    (a.write('if (k === "__proto__") continue;'),
                    c && a.write(`if (${c}.has(k)) continue;`),
                    'passthrough' === p)
                  )
                    a.write(`${q}[k] = ${d}[k];`);
                  else {
                    let c = gb(b);
                    a.write(`const ${c} = ${d}[k];`);
                    let f = gd(a, b, o, c);
                    a.write(`${q}[k] = ${f};`);
                  }
                }),
                a.write('}'));
            }
            return q;
          })(a, b, c, d, W);
          break;
        case 'optional':
          T = (function (a, b, c, d, f = !0) {
            var g;
            let h = c._zod.def;
            if (((g = c), g._zod.traits?.has('$ZodExactOptional') === !0))
              return gn(a, b, h.innerType, d, f);
            if ('defaulted' === h.innerType._zod.optin) {
              let c = gb(b),
                f = gb(b);
              return (
                a.write(`let ${c};`),
                a.write(`if (${d} === undefined) {`),
                a.indented((a) => {
                  (a.write(`const ${f} = (() => {`),
                    a.indented((a) => {
                      let c = gn(a, b, h.innerType, d);
                      a.write(`return ${c};`);
                    }),
                    a.write('})();'),
                    a.write(`if (${f} !== INVALID) ${c} = ${f};`));
                }),
                a.write('} else {'),
                a.indented((a) => {
                  let f = gn(a, b, h.innerType, d);
                  a.write(`${c} = ${f};`);
                }),
                a.write('}'),
                c
              );
            }
            let i = f ? gb(b) : null;
            return (
              i && a.write(`let ${i};`),
              a.write(`if (${d} !== undefined) {`),
              a.indented((a) => {
                let c = gn(a, b, h.innerType, d, f);
                i && null !== c && a.write(`${i} = ${c};`);
              }),
              a.write('}'),
              i
            );
          })(a, b, c, d, W);
          break;
        case 'nullable':
          T = (function (a, b, c, d, f = !0) {
            let g = c._zod.def,
              h = f ? gb(b) : null;
            return (
              h && a.write(`let ${h} = null;`),
              a.write(`if (${d} !== null) {`),
              a.indented((a) => {
                let c = gn(a, b, g.innerType, d, f);
                h && null !== c && a.write(`${h} = ${c};`);
              }),
              a.write('}'),
              h
            );
          })(a, b, c, d, W);
          break;
        case 'array':
          T = (function (a, b, c, d, f = !0) {
            let g = c._zod.def;
            a.write(`if (!Array.isArray(${d})) return INVALID;`);
            let h = f ? gb(b) : null,
              i = gb(b),
              j = gb(b);
            return (
              h && a.write(`const ${h} = new Array(${d}.length);`),
              a.write(`for (let ${i} = 0; ${i} < ${d}.length; ${i}++) {`),
              a.indented((a) => {
                a.write(`const ${j} = ${d}[${i}];`);
                let c = gd(a, b, g.element, j, f);
                h && null !== c && a.write(`${h}[${i}] = ${c};`);
              }),
              a.write('}'),
              h
            );
          })(a, b, c, d, W);
          break;
        case 'literal':
          T = (function (a, b, c, d) {
            let f = c._zod.def.values;
            if (1 !== f.length) {
              let c = f9(b, new Set(f));
              return (a.write(`if (!${c}.has(${d})) return INVALID;`), d);
            }
            let g = f[0];
            if ('number' == typeof g && Number.isNaN(g)) {
              let c = f9(b, new Set(f));
              return (a.write(`if (!${c}.has(${d})) return INVALID;`), d);
            }
            if ('string' == typeof g) a.write(`if (${d} !== ${aD(g)}) return INVALID;`);
            else if ('number' == typeof g || 'boolean' == typeof g)
              a.write(`if (${d} !== ${g}) return INVALID;`);
            else if (null === g) a.write(`if (${d} !== null) return INVALID;`);
            else if (void 0 === g) a.write(`if (${d} !== undefined) return INVALID;`);
            else if ('bigint' == typeof g) a.write(`if (${d} !== ${g}n) return INVALID;`);
            else throw new f5(`literal type ${typeof g}`);
            return d;
          })(a, b, c, d);
          break;
        case 'enum':
          T = (function (a, b, c, d) {
            let f = c._zod.values;
            if (!f) throw new f5('enum schema without enumerated values');
            let g = f9(b, f);
            return (a.write(`if (!${g}.has(${d})) return INVALID;`), d);
          })(a, b, c, d);
          break;
        case 'readonly': {
          let f = gq(a, b, c, d),
            g = gb(b);
          (a.write(`const ${g} = Object.freeze(${f});`), (T = g));
          break;
        }
        case 'success':
          (gq(a, b, c, d), (T = 'true'));
          break;
        case 'default':
        case 'prefault':
          T = (function (a, b, c, d) {
            let f = c._zod.def,
              g = Object.getOwnPropertyDescriptor(c._zod.def, 'defaultValue')
                ? () => c._zod.def.defaultValue
                : void 0;
            if ('prefault' === c._zod.def.type) {
              if (!g) return gn(a, b, f.innerType, d);
              let c = f9(b, g),
                h = gb(b);
              return (
                a.write(`let ${h} = ${d};`),
                a.write(`if (${d} === undefined) ${h} = ${c}();`),
                gn(a, b, f.innerType, h)
              );
            }
            let h = gb(b);
            if (g) {
              let c = f9(b, g),
                i = f9(b, aJ);
              (a.write(`let ${h};`),
                a.write(`if (${d} === undefined) {`),
                a.indented((a) => {
                  a.write(`${h} = ${i}(${c}());`);
                }),
                a.write('} else {'),
                a.indented((a) => {
                  let g = gn(a, b, f.innerType, d);
                  a.write(`${h} = ${g} === undefined ? ${i}(${c}()) : ${g};`);
                }),
                a.write('}'));
            } else
              (a.write(`let ${h};`),
                a.write(`if (${d} !== undefined) {`),
                a.indented((a) => {
                  let c = gn(a, b, f.innerType, d);
                  a.write(`${h} = ${c};`);
                }),
                a.write('}'));
            return h;
          })(a, b, c, d);
          break;
        case 'nonoptional':
          let Y, Z;
          ((x = a),
            (y = b),
            (z = c),
            (A = d),
            (Y = gn(x, y, z._zod.def.innerType, A)),
            (Z = gb(y)),
            x.write(`const ${Z} = ${Y};`),
            x.write(`if (${Z} === undefined) return INVALID;`),
            (T = Z));
          break;
        case 'tuple':
          T = (function (a, b, c, d) {
            let f = c._zod.def,
              g = f.items,
              h = f.rest;
            a.write(`if (!Array.isArray(${d})) return INVALID;`);
            let i = gr(g, 'optin'),
              j = gr(g, 'optout');
            h
              ? a.write(`if (${d}.length < ${i}) return INVALID;`)
              : a.write(`if (${d}.length < ${i} || ${d}.length > ${g.length}) return INVALID;`);
            let k = gb(b);
            a.write(`const ${k} = [];`);
            for (let c = 0; c < g.length; c++) {
              let f = g[c];
              if (c >= j)
                (a.write(`if (${k}.length === ${c}) {`),
                  a.indented((a) => {
                    (a.write(`if (${c} < ${d}.length) {`),
                      a.indented((a) => {
                        let g = gb(b);
                        a.write(`const ${g} = ${d}[${c}];`);
                        let h = gd(a, b, f, g);
                        a.write(`${k}[${c}] = ${h};`);
                      }),
                      a.write('} else {'),
                      a.indented((a) => {
                        if (go(f)) return void a.write(`${k}.length = ${c};`);
                        let d = gb(b),
                          g = gb(b);
                        (a.write(`const ${d} = undefined;`),
                          a.write(`const ${g} = (() => {`),
                          a.indented((a) => {
                            let c = gd(a, b, f, d);
                            a.write(`return ${c};`);
                          }),
                          a.write('})();'),
                          a.write(
                            `if (${g} === INVALID || ${g} === undefined) ${k}.length = ${c};`,
                          ),
                          a.write(`else ${k}[${c}] = ${g};`));
                      }),
                      a.write('}'));
                  }),
                  a.write('}'));
              else {
                let g = gb(b);
                a.write(`const ${g} = ${d}[${c}];`);
                let h = gd(a, b, f, g);
                a.write(`${k}[${c}] = ${h};`);
              }
            }
            if (h) {
              let c = gb(b),
                f = gb(b);
              (a.write(`for (let ${c} = ${g.length}; ${c} < ${d}.length; ${c}++) {`),
                a.indented((a) => {
                  a.write(`const ${f} = ${d}[${c}];`);
                  let g = gd(a, b, h, f);
                  a.write(`${k}[${c}] = ${g};`);
                }),
                a.write('}'));
            }
            return k;
          })(a, b, c, d);
          break;
        case 'union':
          T = (function (a, b, c, d) {
            let f = c._zod.def,
              g = f.options;
            if (f.discriminator)
              return (function (a, b, c, d) {
                if (c.unionFallback) throw new f5('discriminated union with unionFallback');
                if (0 === c.options.length) return (a.write('return INVALID;'), d);
                let f = gb(b),
                  g = gb(b);
                (a.write(`const ${f} = ${d}?.[${aD(c.discriminator)}];`), a.write(`let ${g};`));
                let h = !0,
                  i = new Set();
                for (let j of c.options) {
                  let k = j._zod.propValues?.[c.discriminator];
                  if (!k || 0 === k.size)
                    throw new f5('discriminated union option without static discriminator values');
                  for (let a of k) {
                    if (i.has(a)) throw new f5(`duplicate discriminator value ${String(a)}`);
                    i.add(a);
                  }
                  let l = Array.from(k, (a) =>
                      (function (a, b, c) {
                        if ('string' == typeof c) return `${b} === ${aD(c)}`;
                        if ('number' == typeof c)
                          return Number.isNaN(c) ? `Number.isNaN(${b})` : `${b} === ${c}`;
                        if ('boolean' == typeof c) return `${b} === ${c}`;
                        if (null === c) return `${b} === null`;
                        if (void 0 === c) return `${b} === undefined`;
                        if ('bigint' == typeof c) return `${b} === ${c}n`;
                        if ('symbol' == typeof c) {
                          let d = f9(a, c);
                          return `${b} === ${d}`;
                        }
                        throw new f5(`literal discriminator value ${String(c)}`);
                      })(b, f, a),
                    ),
                    m = h ? 'if' : 'else if';
                  (a.write(`${m} (${l.join(' || ')}) {`),
                    a.indented((a) => {
                      let c = gn(a, b, j, d);
                      a.write(`${g} = ${c};`);
                    }),
                    a.write('}'),
                    (h = !1));
                }
                return (a.write('else { return INVALID; }'), g);
              })(a, b, f, d);
            if (!1 === f.inclusive) throw new f5('exclusive unions (z.xor)');
            if (0 === g.length) return (a.write('return INVALID;'), d);
            if (1 === g.length) return gn(a, b, g[0], d);
            if (g.every((a) => 'literal' === a._zod.def.type && !a._zod.def.checks?.length)) {
              let c = f9(b, new Set(g.flatMap((a) => a._zod.def.values)));
              return (a.write(`if (!${c}.has(${d})) return INVALID;`), d);
            }
            let h = gb(b);
            a.write(`let ${h};`);
            for (let c = 0; c < g.length; c++) {
              let f = g[c];
              (0 === c
                ? a.write(`${h} = (() => {`)
                : a.write(`if (${h} === INVALID) ${h} = (() => {`),
                a.indented((a) => {
                  let c = gn(a, b, f, d);
                  a.write(`return ${c};`);
                }),
                a.write('})();'));
            }
            return (a.write(`if (${h} === INVALID) return INVALID;`), h);
          })(a, b, c, d);
          break;
        case 'intersection':
          let $, _, aa, ab, ac;
          ((B = a),
            (C = b),
            (D = c),
            (E = d),
            ($ = D._zod.def),
            (C.definite = !1),
            (_ = gd(B, C, $.left, E)),
            (aa = gd(B, C, $.right, E)),
            (ab = f9(C, eX)),
            (ac = gb(C)),
            B.write(`const ${ac} = ${ab}(${_}, ${aa});`),
            B.write(`if (!${ac}.valid) return INVALID;`),
            (T = `${ac}.data`));
          break;
        case 'record':
          T = (function (a, b, c, d) {
            let f = c._zod.def,
              g = f9(b, aI);
            a.write(`if (!${g}(${d})) return INVALID;`);
            let h = gb(b),
              i = gb(b),
              j = gb(b);
            a.write(`const ${h} = {};`);
            let k = f.partial ? void 0 : f.keyType._zod.values;
            if (k) {
              let c = [];
              for (let g of k) {
                var l, m;
                if ('string' != typeof g && 'number' != typeof g && 'symbol' != typeof g)
                  throw new f5(`record key value ${String(g)}`);
                let i = 'number' == typeof g ? g.toString() : g;
                if ('__proto__' === i) throw new f5('record key "__proto__"');
                c.push(i);
                let j = f9(b, g),
                  k = gn(a, b, f.keyType, j),
                  n = gb(b);
                a.write(
                  `const ${n} = ${d}[${((l = b), 'string' == typeof (m = i) ? aD(m) : f9(l, m))}];`,
                );
                let o = gd(a, b, f.valueType, n);
                a.write(`${h}[${k}] = ${o};`);
              }
              let g = f9(b, new Set(c));
              return (
                a.write(`for (const ${i} in ${d}) {`),
                a.indented((a) => {
                  (a.write(`if (${g}.has(${i})) continue;`),
                    'loose' === f.mode
                      ? a.write(`if (${i} !== "__proto__") ${h}[${i}] = ${d}[${i}];`)
                      : a.write('return INVALID;'));
                }),
                a.write('}'),
                h
              );
            }
            let n = f.keyType._zod.def;
            if (!(
              'string' === n.type &&
              void 0 === n.format &&
              !n.coerce &&
              (n.checks?.length ?? 0) === 0
            )) {
              let c = 'loose' === f.mode,
                g = f8(f.keyType);
              !1 === g.definite && (b.definite = !1);
              let j = f9(b, g),
                k = f9(b, cW),
                l = gb(b);
              return (
                gs(a, b, d, i, (a) => {
                  (a.write(`let ${l} = ${j}(${i});`),
                    a.write(
                      `if (${l} === INVALID && typeof ${i} === "string" && ${k}.test(${i})) ${l} = ${j}(Number(${i}));`,
                    ),
                    c
                      ? a.write(`if (${l} === INVALID) { ${h}[${i}] = ${d}[${i}]; continue; }`)
                      : a.write(`if (${l} === INVALID) return INVALID;`),
                    a.write(`if (${l} === "__proto__") continue;`));
                  let g = gb(b);
                  a.write(`const ${g} = ${d}[${i}];`);
                  let m = gd(a, b, f.valueType, g);
                  a.write(`${h}[${l}] = ${m};`);
                }),
                h
              );
            }
            return (
              gs(
                a,
                b,
                d,
                i,
                (a) => {
                  a.write(`const ${j} = ${d}[${i}];`);
                  let c = gd(a, b, f.valueType, j);
                  a.write(`${h}[${i}] = ${c};`);
                },
                'return INVALID;',
              ),
              h
            );
          })(a, b, c, d);
          break;
        case 'map':
          let ad, ae, af, ag;
          ((F = a),
            (G = b),
            (H = c),
            (I = d),
            (ad = H._zod.def),
            F.write(`if (!(${I} instanceof Map)) return INVALID;`),
            (ae = gb(G)),
            (af = gb(G)),
            (ag = gb(G)),
            F.write(`const ${ae} = new Map();`),
            F.write(`for (const [${af}, ${ag}] of ${I}) {`),
            F.indented((a) => {
              let b = gn(a, G, ad.keyType, af),
                c = gn(a, G, ad.valueType, ag);
              a.write(`${ae}.set(${b}, ${c});`);
            }),
            F.write('}'),
            (T = ae));
          break;
        case 'set':
          let ah, ai, aj;
          ((J = a),
            (K = b),
            (L = c),
            (M = d),
            (ah = L._zod.def),
            J.write(`if (!(${M} instanceof Set)) return INVALID;`),
            (ai = gb(K)),
            (aj = gb(K)),
            J.write(`const ${ai} = new Set();`),
            J.write(`for (const ${aj} of ${M}) {`),
            J.indented((a) => {
              let b = gn(a, K, ah.valueType, aj);
              a.write(`${ai}.add(${b});`);
            }),
            J.write('}'),
            (T = ai));
          break;
        case 'file':
          ((N = a), (O = d), N.write(`if (!(${O} instanceof File)) return INVALID;`), (T = O));
          break;
        case 'template_literal':
          T = (function (a, b, c, d) {
            a.write(`if (typeof ${d} !== "string") return INVALID;`);
            let f = c._zod.pattern;
            if (f) {
              let c = f9(b, f);
              (a.write(`${c}.lastIndex = 0;`), a.write(`if (!${c}.test(${d})) return INVALID;`));
            }
            return d;
          })(a, b, c, d);
          break;
        case 'lazy':
          let ak, al, am;
          ((P = a),
            (Q = b),
            (R = c),
            (S = d),
            (ak = ga(Q, R._zod.def.getter)),
            (al = f9(Q, { parser: null })),
            P.write(`if (!${al}.parser) {`),
            P.indented((a) => {
              (a.write(`const inner = ${ak}();`),
                a.write(`${al}.parser = function(input) {`),
                a.indented((a) => {
                  (a.write('const result = inner._zod.run({ value: input, issues: [] }, {});'),
                    a.write('return result.issues.length === 0 ? result.value : INVALID;'));
                }),
                a.write('};'));
            }),
            P.write('}'),
            (am = gb(Q)),
            P.write(`const ${am} = ${al}.parser(${S});`),
            P.write(`if (${am} === INVALID) return INVALID;`),
            (T = am));
          break;
        case 'pipe':
          T = (function (a, b, c, d) {
            let f = c._zod.def,
              g = gn(a, b, f.in, d);
            if (!f.transform) return gn(a, b, f.out, g);
            {
              if (gt(f.transform))
                throw new f4('z.compile: async transforms in pipes are not supported');
              let c = f.transform,
                d = ga(b, (a) => {
                  let b = { value: a, issues: [], addIssue: gk },
                    d = c(a, b);
                  return d instanceof Promise ? f2 : 0 === b.issues.length ? d : f2;
                }),
                h = gb(b);
              return (
                a.write(`const ${h} = ${d}(${g});`),
                a.write(`if (${h} === INVALID) return INVALID;`),
                gn(a, b, f.out, h)
              );
            }
          })(a, b, c, d);
          break;
        case 'custom':
          T = (function (a, b, c, d) {
            let f = c._zod.def;
            if (f.fn) {
              if (gt(f.fn)) throw new f4('z.compile: async custom predicates are not supported');
              let c = ga(b, f.fn),
                g = f9(b, gj),
                h = gb(b);
              (a.write(`const ${h} = ${c}(${d});`),
                a.write(`if (${h} instanceof Promise) ${g}();`),
                a.write(`if (!${h}) return INVALID;`));
            } else throw new f5('custom schema without a predicate function');
            return d;
          })(a, b, c, d);
          break;
        case 'transform':
          T = (function (a, b, c, d) {
            let f = c._zod.def;
            if (f.transform) {
              if (gt(f.transform)) throw new f4('z.compile: async transforms are not supported');
              let c = f.transform,
                g = ga(b, (a) => {
                  let b = { value: a, issues: [], addIssue: gk },
                    d = c(a, b);
                  return d instanceof Promise ? f2 : 0 === b.issues.length ? d : f2;
                }),
                h = gb(b);
              return (
                a.write(`const ${h} = ${g}(${d});`),
                a.write(`if (${h} === INVALID) return INVALID;`),
                h
              );
            }
            return d;
          })(a, b, c, d);
          break;
        case 'catch':
          T = (function (a, b, c, d) {
            let f = c._zod.def;
            if (!f.catchValue[bv])
              throw new f5('catch with a callback (only a constant catch value compiles)', !1);
            let g = gb(b);
            (a.write(`let ${g} = (() => {`),
              a.indented((a) => {
                let c = gd(a, b, f.innerType, d);
                a.write(`return ${c};`);
              }),
              a.write('})();'));
            let h = f9(b, f.innerType),
              i = ga(b, f.catchValue),
              j = f9(b, gu);
            return (
              a.write(`if (${g} === INVALID) {`),
              a.indented((a) => {
                (a.write(`${g} = ${j}(${h}, ${i}, ${d});`),
                  a.write(`if (${g} === INVALID) return INVALID;`));
              }),
              a.write('}'),
              g
            );
          })(a, b, c, d);
          break;
        default:
          throw new f5(`schema type ${V}`);
      }
      return null === T
        ? null
        : (function (a, b, c, d) {
            let f = c._zod.def.checks;
            if (!f || 0 === f.length) return d;
            let g = d;
            for (let c of f) {
              let d = c._zod.def;
              if (d.when && !ge.has(d.check)) throw new f5('check with a custom "when" condition');
              switch (d.check) {
                case 'greater_than':
                  !(function (a, b, c, d) {
                    let f = c.inclusive ? '<' : '<=';
                    a.write(`if (${d} ${f} ${gh(b, c.value)}) return INVALID;`);
                  })(a, b, d, g);
                  break;
                case 'less_than':
                  !(function (a, b, c, d) {
                    let f = c.inclusive ? '>' : '>=';
                    a.write(`if (${d} ${f} ${gh(b, c.value)}) return INVALID;`);
                  })(a, b, d, g);
                  break;
                case 'multiple_of':
                  !(function (a, b, c, d) {
                    if ('bigint' == typeof c.value) {
                      if (c.value === BigInt(0))
                        throw new f5('multiple_of check with a zero divisor');
                      a.write(`if (${d} % ${c.value}n !== 0n) return INVALID;`);
                    } else {
                      let f = f9(b, ao);
                      a.write(
                        `if (${f}(${d}, ${gg(c.value, 'multiple_of')}) !== 0) return INVALID;`,
                      );
                    }
                  })(a, b, d, g);
                  break;
                case 'number_format':
                  gi(a, d, g);
                  break;
                case 'min_length': {
                  let c = gg(d.minimum, 'min_length'),
                    f = gf(a, b, g, `${g}.length >= ${c} && ${g}.length < ${2 * d.minimum}`);
                  a.write(`if (${f} < ${c}) return INVALID;`);
                  break;
                }
                case 'max_length': {
                  let c = gg(d.maximum, 'max_length'),
                    f = gf(a, b, g, `${g}.length > ${c}`);
                  a.write(`if (${f} > ${c}) return INVALID;`);
                  break;
                }
                case 'length_equals': {
                  let c = gg(d.length, 'length_equals'),
                    f = gf(a, b, g, `${g}.length >= ${c} && ${g}.length <= ${2 * d.length}`);
                  a.write(`if (${f} !== ${c}) return INVALID;`);
                  break;
                }
                case 'min_size':
                  a.write(`if (${g}.size < ${gg(d.minimum, 'min_size')}) return INVALID;`);
                  break;
                case 'max_size':
                  a.write(`if (${g}.size > ${gg(d.maximum, 'max_size')}) return INVALID;`);
                  break;
                case 'size_equals':
                  a.write(`if (${g}.size !== ${gg(d.size, 'size_equals')}) return INVALID;`);
                  break;
                case 'string_format':
                  g = gm(a, b, d, g);
                  break;
                case 'custom':
                  g = (function (a, b, c, d) {
                    let f = c._zod.def;
                    if (f.fn) {
                      if (gt(f.fn))
                        throw new f4('z.compile: async .refine() predicates are not supported');
                      let c = ga(b, f.fn),
                        g = f9(b, gj),
                        h = gb(b);
                      return (
                        a.write(`const ${h} = ${c}(${d});`),
                        a.write(`if (${h} instanceof Promise) ${g}();`),
                        a.write(`if (!${h}) return INVALID;`),
                        d
                      );
                    }
                    if (c._zod.check) {
                      if (gt(c._zod.check))
                        throw new f4(
                          'z.compile: async .superRefine() / check functions are not supported',
                        );
                      let f = c._zod.check,
                        g = ga(b, (a) => {
                          let b = { value: a, issues: [], addIssue: gk };
                          return (
                            f(b) instanceof Promise && gj(),
                            0 === b.issues.length ? b.value : f2
                          );
                        }),
                        h = gb(b);
                      return (
                        a.write(`const ${h} = ${g}(${d});`),
                        a.write(`if (${h} === INVALID) return INVALID;`),
                        h
                      );
                    }
                    throw new f5('custom check without a predicate or check function');
                  })(a, b, c, g);
                  break;
                case 'bigint_format':
                  !(function (a, b, c) {
                    let d = b.format;
                    if (d)
                      switch (d) {
                        case 'int64':
                          a.write(
                            `if (${c} < -9223372036854775808n || ${c} > 9223372036854775807n) return INVALID;`,
                          );
                          break;
                        case 'uint64':
                          a.write(`if (${c} < 0n || ${c} > 18446744073709551615n) return INVALID;`);
                          break;
                        default:
                          throw new f5(`bigint format ${d}`);
                      }
                  })(a, d, g);
                  break;
                case 'mime_type':
                  !(function (a, b, c, d) {
                    let f = c.mime;
                    if (f && f.length > 0) {
                      let c = f9(b, new Set(f));
                      a.write(`if (!${c}.has(${d}.type)) return INVALID;`);
                    }
                  })(a, b, d, g);
                  break;
                case 'property':
                  !(function (a, b, c, d) {
                    let f = `${d}[${JSON.stringify(c.property)}]`;
                    gn(a, b, c.schema, f);
                  })(a, b, d, g);
                  break;
                case 'properties':
                  !(function (a, b, c, d) {
                    if (c.when) throw new f5('check with a custom "when" condition');
                    a.write(`if (${d} == null) return INVALID;`);
                    let f = c.shape;
                    for (let c of Reflect.ownKeys(f)) {
                      let g = 'symbol' == typeof c ? f9(b, c) : aD(c),
                        h = gb(b);
                      (a.write(`const ${h} = ${d}[${g}];`), gd(a, b, f[c], h, !1));
                    }
                  })(a, b, d, g);
                  break;
                case 'overwrite': {
                  let d = gb(b);
                  ((function (a, b, c, d, f) {
                    let g = c._zod.def.tx;
                    if (!g) throw new f5('overwrite check without a transform function');
                    if (gt(g))
                      throw new f4('z.compile: async overwrite transforms are not supported');
                    let h = f9(b, g);
                    a.write(`const ${f} = ${h}(${d});`);
                  })(a, b, c, g, d),
                    (g = d));
                  break;
                }
                default:
                  throw new f5(`check type ${d.check}`);
              }
            }
            return g;
          })(a, b, c, T);
    }
    function go(a) {
      return 'optional' === a._zod.optin && 'optional' === a._zod.optout;
    }
    function gp(a) {
      return (
        ('defaulted' !== a._zod.optin || 'optional' === a._zod.optout) &&
        (function a(b) {
          let c = b._zod.def;
          switch (c.type) {
            case 'string':
            case 'number':
            case 'boolean':
            case 'bigint':
            case 'symbol':
            case 'null':
            case 'nan':
            case 'date':
            case 'object':
            case 'array':
            case 'tuple':
            case 'record':
            case 'map':
            case 'set':
            case 'file':
            case 'template_literal':
            case 'never':
            case 'success':
              return !1;
            case 'literal':
              return !!c.values?.includes(void 0);
            case 'enum':
              return !!b._zod.values?.has(void 0);
            case 'optional':
            default:
              return !0;
            case 'nullable':
            case 'readonly':
            case 'nonoptional':
              return !c.innerType || a(c.innerType);
            case 'union':
              return !c.options || c.options.some(a);
            case 'intersection':
              return !c.left || !c.right || a(c.left) || a(c.right);
            case 'pipe':
              return !c.out || a(c.out);
          }
        })(a)
      );
    }
    function gq(a, b, c, d) {
      return gn(a, b, c._zod.def.innerType, d);
    }
    function gr(a, b) {
      for (let c = a.length - 1; c >= 0; c--)
        if (!('optin' === b ? void 0 !== a[c]._zod.optin : 'optional' === a[c]._zod.optout))
          return c + 1;
      return 0;
    }
    function gs(a, b, c, d, f, g) {
      let h = f9(b, Object.prototype.propertyIsEnumerable),
        i = gb(b),
        j = gb(b),
        k = gb(b);
      (a.write(`const ${i} = Object.getOwnPropertySymbols(${c});`),
        a.write(`const ${j} = Object.getOwnPropertyNames(${c});`),
        a.write(`for (let ${k} = 0; ${k} < ${j}.length; ${k}++) {`),
        a.indented((a) => {
          (a.write(`const ${d} = ${j}[${k}];`),
            a.write(`if (${d} === "__proto__" || !${h}.call(${c}, ${d})) continue;`),
            f(a));
        }),
        a.write('}'),
        a.write(`for (let ${k} = 0; ${k} < ${i}.length; ${k}++) {`),
        a.indented((a) => {
          (a.write(`const ${d} = ${i}[${k}];`),
            a.write(`if (!${h}.call(${c}, ${d})) continue;`),
            g ? a.write(g) : f(a));
        }),
        a.write('}'));
    }
    function gt(a) {
      return (
        'function' == typeof a &&
        ('AsyncFunction' === a.constructor.name || 'AsyncFunction' === a[Symbol.toStringTag])
      );
    }
    function gu(a, b, c) {
      let d = a._zod.run({ value: c, issues: [] }, {});
      return d && 'function' == typeof d.then ? f2 : 0 === d.issues.length ? d.value : b();
    }
    function gv(a) {
      return (a.checks && (a.checks = [...a.checks]), a);
    }
    function gw(a, b) {
      return new a(gv({ type: 'string', ...aQ(b) }));
    }
    function gx(a, b) {
      return new a(gv({ type: 'string', coerce: !0, ...aQ(b) }));
    }
    function gy(a, b) {
      return new a({
        type: 'string',
        format: 'email',
        check: 'string_format',
        abort: !1,
        ...aQ(b),
      });
    }
    function gz(a, b) {
      return new a({ type: 'string', format: 'guid', check: 'string_format', abort: !1, ...aQ(b) });
    }
    function gA(a, b) {
      return new a({ type: 'string', format: 'uuid', check: 'string_format', abort: !1, ...aQ(b) });
    }
    function gB(a, b) {
      return new a({
        type: 'string',
        format: 'uuid',
        check: 'string_format',
        abort: !1,
        version: 'v4',
        ...aQ(b),
      });
    }
    function gC(a, b) {
      return new a({
        type: 'string',
        format: 'uuid',
        check: 'string_format',
        abort: !1,
        version: 'v6',
        ...aQ(b),
      });
    }
    function gD(a, b) {
      return new a({
        type: 'string',
        format: 'uuid',
        check: 'string_format',
        abort: !1,
        version: 'v7',
        ...aQ(b),
      });
    }
    function gE(a, b) {
      return new a({ type: 'string', format: 'url', check: 'string_format', abort: !1, ...aQ(b) });
    }
    function gF(a, b) {
      return new a({
        type: 'string',
        format: 'emoji',
        check: 'string_format',
        abort: !1,
        ...aQ(b),
      });
    }
    function gG(a, b) {
      return new a({
        type: 'string',
        format: 'nanoid',
        check: 'string_format',
        abort: !1,
        ...aQ(b),
      });
    }
    function gH(a, b) {
      return new a({ type: 'string', format: 'cuid', check: 'string_format', abort: !1, ...aQ(b) });
    }
    function gI(a, b) {
      return new a({
        type: 'string',
        format: 'cuid2',
        check: 'string_format',
        abort: !1,
        ...aQ(b),
      });
    }
    function gJ(a, b) {
      return new a({ type: 'string', format: 'ulid', check: 'string_format', abort: !1, ...aQ(b) });
    }
    function gK(a, b) {
      return new a({ type: 'string', format: 'xid', check: 'string_format', abort: !1, ...aQ(b) });
    }
    function gL(a, b) {
      return new a({
        type: 'string',
        format: 'ksuid',
        check: 'string_format',
        abort: !1,
        ...aQ(b),
      });
    }
    function gM(a, b) {
      return new a({ type: 'string', format: 'ipv4', check: 'string_format', abort: !1, ...aQ(b) });
    }
    function gN(a, b) {
      return new a({ type: 'string', format: 'ipv6', check: 'string_format', abort: !1, ...aQ(b) });
    }
    function gO(a, b) {
      return new a({ type: 'string', format: 'mac', check: 'string_format', abort: !1, ...aQ(b) });
    }
    function gP(a, b) {
      return new a({
        type: 'string',
        format: 'cidrv4',
        check: 'string_format',
        abort: !1,
        ...aQ(b),
      });
    }
    function gQ(a, b) {
      return new a({
        type: 'string',
        format: 'cidrv6',
        check: 'string_format',
        abort: !1,
        ...aQ(b),
      });
    }
    function gR(a, b) {
      return new a({
        type: 'string',
        format: 'base64',
        check: 'string_format',
        abort: !1,
        ...aQ(b),
      });
    }
    function gS(a, b) {
      return new a({
        type: 'string',
        format: 'base64url',
        check: 'string_format',
        abort: !1,
        ...aQ(b),
      });
    }
    function gT(a, b) {
      return new a({ type: 'string', format: 'e164', check: 'string_format', abort: !1, ...aQ(b) });
    }
    function gU(a, b) {
      return new a({
        type: 'string',
        format: 'credit_card',
        check: 'string_format',
        abort: !1,
        ...aQ(b),
      });
    }
    function gV(a, b) {
      return new a({ type: 'string', format: 'iban', check: 'string_format', abort: !1, ...aQ(b) });
    }
    function gW(a, b) {
      return new a({ type: 'string', format: 'jwt', check: 'string_format', abort: !1, ...aQ(b) });
    }
    (a.s(
      [
        'INVALID',
        0,
        f2,
        'ZodCompileAsyncError',
        0,
        f4,
        'ZodCompileUnsupportedError',
        0,
        f5,
        'compile',
        0,
        f6,
        'compileFn',
        0,
        f8,
        'withParser',
        0,
        f7,
      ],
      25003,
    ),
      a.i(25003));
    let gX = { Any: null, Minute: -1, Second: 0, Millisecond: 3, Microsecond: 6 };
    function gY(a, b) {
      return new a({
        type: 'string',
        format: 'datetime',
        check: 'string_format',
        offset: !1,
        local: !1,
        precision: null,
        ...aQ(b),
      });
    }
    function gZ(a, b) {
      return new a({ type: 'string', format: 'date', check: 'string_format', ...aQ(b) });
    }
    function g$(a, b) {
      return new a({
        type: 'string',
        format: 'time',
        check: 'string_format',
        precision: null,
        ...aQ(b),
      });
    }
    function g_(a, b) {
      return new a({ type: 'string', format: 'duration', check: 'string_format', ...aQ(b) });
    }
    function g0(a, b) {
      return new a(gv({ type: 'number', checks: [], ...aQ(b) }));
    }
    function g1(a, b) {
      return new a(gv({ type: 'number', coerce: !0, checks: [], ...aQ(b) }));
    }
    function g2(a, b) {
      return new a({
        type: 'number',
        check: 'number_format',
        abort: !1,
        format: 'safeint',
        ...aQ(b),
      });
    }
    function g3(a, b) {
      return new a({
        type: 'number',
        check: 'number_format',
        abort: !1,
        format: 'float32',
        ...aQ(b),
      });
    }
    function g4(a, b) {
      return new a({
        type: 'number',
        check: 'number_format',
        abort: !1,
        format: 'float64',
        ...aQ(b),
      });
    }
    function g5(a, b) {
      return new a({
        type: 'number',
        check: 'number_format',
        abort: !1,
        format: 'int32',
        ...aQ(b),
      });
    }
    function g6(a, b) {
      return new a({
        type: 'number',
        check: 'number_format',
        abort: !1,
        format: 'uint32',
        ...aQ(b),
      });
    }
    function g7(a, b) {
      return new a({ type: 'boolean', ...aQ(b) });
    }
    function g8(a, b) {
      return new a({ type: 'boolean', coerce: !0, ...aQ(b) });
    }
    function g9(a, b) {
      return new a({ type: 'bigint', ...aQ(b) });
    }
    function ha(a, b) {
      return new a({ type: 'bigint', coerce: !0, ...aQ(b) });
    }
    function hb(a, b) {
      return new a({
        type: 'bigint',
        check: 'bigint_format',
        abort: !1,
        format: 'int64',
        ...aQ(b),
      });
    }
    function hc(a, b) {
      return new a({
        type: 'bigint',
        check: 'bigint_format',
        abort: !1,
        format: 'uint64',
        ...aQ(b),
      });
    }
    function hd(a, b) {
      return new a({ type: 'symbol', ...aQ(b) });
    }
    function he(a, b) {
      return new a({ type: 'undefined', ...aQ(b) });
    }
    function hf(a, b) {
      return new a({ type: 'null', ...aQ(b) });
    }
    function hg(a) {
      return new a({ type: 'any' });
    }
    function hh(a) {
      return new a({ type: 'unknown' });
    }
    function hi(a, b) {
      return new a({ type: 'never', ...aQ(b) });
    }
    function hj(a, b) {
      return new a({ type: 'void', ...aQ(b) });
    }
    function hk(a, b) {
      return new a({ type: 'date', ...aQ(b) });
    }
    function hl(a, b) {
      return new a({ type: 'date', coerce: !0, ...aQ(b) });
    }
    function hm(a, b) {
      return new a({ type: 'nan', ...aQ(b) });
    }
    function hn(a, b) {
      return new dh({ check: 'less_than', ...aQ(b), value: a, inclusive: !1 });
    }
    function ho(a, b) {
      return new dh({ check: 'less_than', ...aQ(b), value: a, inclusive: !0 });
    }
    function hp(a, b) {
      return new di({ check: 'greater_than', ...aQ(b), value: a, inclusive: !1 });
    }
    function hq(a, b) {
      return new di({ check: 'greater_than', ...aQ(b), value: a, inclusive: !0 });
    }
    function hr(a) {
      return hp(0, a);
    }
    function hs(a) {
      return hn(0, a);
    }
    function ht(a) {
      return ho(0, a);
    }
    function hu(a) {
      return hq(0, a);
    }
    function hv(a, b) {
      return new dj({ check: 'multiple_of', ...aQ(b), value: a });
    }
    function hw(a, b) {
      return new dm({ check: 'max_size', ...aQ(b), maximum: a });
    }
    function hx(a, b) {
      return new dn({ check: 'min_size', ...aQ(b), minimum: a });
    }
    function hy(a, b) {
      return new dp({ check: 'size_equals', ...aQ(b), size: a });
    }
    function hz(a, b) {
      return new dq({ check: 'max_length', ...aQ(b), maximum: a });
    }
    function hA(a, b) {
      return new dr({ check: 'min_length', ...aQ(b), minimum: a });
    }
    function hB(a, b) {
      return new ds({ check: 'length_equals', ...aQ(b), length: a });
    }
    function hC(a, b) {
      return new du({ check: 'string_format', format: 'regex', ...aQ(b), pattern: a });
    }
    function hD(a) {
      return new dv({ check: 'string_format', format: 'lowercase', ...aQ(a) });
    }
    function hE(a) {
      return new dw({ check: 'string_format', format: 'uppercase', ...aQ(a) });
    }
    function hF(a, b) {
      return new dx({ check: 'string_format', format: 'includes', ...aQ(b), includes: a });
    }
    function hG(a, b) {
      return new dy({ check: 'string_format', format: 'starts_with', ...aQ(b), prefix: a });
    }
    function hH(a, b) {
      return new dz({ check: 'string_format', format: 'ends_with', ...aQ(b), suffix: a });
    }
    function hI(a, b, c) {
      return new dB({ check: 'property', property: a, schema: b, ...aQ(c) });
    }
    function hJ(a, b) {
      return new dC({ check: 'properties', shape: a, ...aQ(b) });
    }
    function hK(a, b) {
      return new dD({ check: 'mime_type', mime: a, ...aQ(b) });
    }
    function hL(a) {
      return new dE({ check: 'overwrite', tx: a });
    }
    function hM(a) {
      return hL((b) => b.normalize(a));
    }
    function hN() {
      return hL((a) => a.trim());
    }
    function hO() {
      return hL((a) => a.toLowerCase());
    }
    function hP() {
      return hL((a) => a.toUpperCase());
    }
    function hQ() {
      return hL((a) => aE(a));
    }
    function hR(a, b, c) {
      return new a({ type: 'array', element: b, ...aQ(c) });
    }
    function hS(a, b, c) {
      return new a({ type: 'union', options: b, ...aQ(c) });
    }
    function hT(a, b, c) {
      return new a({ type: 'union', options: b, inclusive: !1, ...aQ(c) });
    }
    function hU(a, b, c, d) {
      return new a({ type: 'union', options: c, discriminator: b, ...aQ(d) });
    }
    function hV(a, b, c) {
      return new a({ type: 'intersection', left: b, right: c });
    }
    function hW(a, b, c, d) {
      let f = c instanceof dH,
        g = f ? d : c;
      return new a({ type: 'tuple', items: b, rest: f ? c : null, ...aQ(g) });
    }
    function hX(a, b, c, d) {
      return new a({ type: 'record', keyType: b, valueType: c, ...aQ(d) });
    }
    function hY(a, b, c, d) {
      return new a({ type: 'map', keyType: b, valueType: c, ...aQ(d) });
    }
    function hZ(a, b, c) {
      return new a({ type: 'set', valueType: b, ...aQ(c) });
    }
    function h$(a, b, c) {
      return new a({
        type: 'enum',
        entries: Array.isArray(b) ? Object.fromEntries(b.map((a) => [a, a])) : b,
        ...aQ(c),
      });
    }
    function h_(a, b, c) {
      return new a({ type: 'enum', entries: b, ...aQ(c) });
    }
    function h0(a, b, c) {
      return new a({ type: 'literal', values: Array.isArray(b) ? b : [b], ...aQ(c) });
    }
    function h1(a, b) {
      return new a({ type: 'file', ...aQ(b) });
    }
    function h2(a, b) {
      return new a({ type: 'transform', transform: b });
    }
    function h3(a, b) {
      return new a({ type: 'optional', innerType: b });
    }
    function h4(a, b) {
      return new a({ type: 'nullable', innerType: b });
    }
    function h5(a, b, c) {
      return new a({
        type: 'default',
        innerType: b,
        get defaultValue() {
          return 'function' == typeof c ? c() : aJ(c);
        },
      });
    }
    function h6(a, b, c) {
      return new a({ type: 'nonoptional', innerType: b, ...aQ(c) });
    }
    function h7(a, b) {
      return new a({ type: 'success', innerType: b });
    }
    function h8(a, b, c) {
      return new a({ type: 'catch', innerType: b, catchValue: 'function' == typeof c ? c : bw(c) });
    }
    function h9(a, b, c) {
      return new a({ type: 'pipe', in: b, out: c });
    }
    function ia(a, b) {
      return new a({ type: 'readonly', innerType: b });
    }
    function ib(a, b, c) {
      return new a({ type: 'template_literal', parts: b, ...aQ(c) });
    }
    function ic(a, b) {
      return new a({ type: 'lazy', getter: b });
    }
    function id(a, b) {
      return new a({ type: 'promise', innerType: b });
    }
    function ie(a, b, c) {
      let d = aQ(c);
      return (d.abort ?? (d.abort = !0), new a({ type: 'custom', check: 'custom', fn: b, ...d }));
    }
    function ig(a, b, c) {
      return new a({ type: 'custom', check: 'custom', fn: b, ...aQ(c) });
    }
    function ih(a, b) {
      let c = ii(
        (b) => (
          (b.addIssue = (a) => {
            'string' == typeof a
              ? b.issues.push(be(a, b.value, c._zod.def))
              : (a.fatal && (a.continue = !1),
                a.code ?? (a.code = 'custom'),
                'input' in a || (a.input = b.value),
                a.inst ?? (a.inst = c),
                a.continue ?? (a.continue = !c._zod.def.abort),
                b.issues.push(be(a)));
          }),
          a(b.value, b)
        ),
        b,
      );
      return c;
    }
    function ii(a, b) {
      let c = new dd({ check: 'custom', ...aQ(b) });
      return ((c._zod.check = a), c);
    }
    function ij(a) {
      let b = new dd({ check: 'describe' });
      return (
        (b._zod.onattach = [
          (b) => {
            let c = f1.get(b) ?? {};
            f1.add(b, { ...c, description: a });
          },
        ]),
        (b._zod.check = () => {}),
        b
      );
    }
    function ik(a) {
      let b = new dd({ check: 'meta' });
      return (
        (b._zod.onattach = [
          (b) => {
            let c = f1.get(b) ?? {};
            f1.add(b, { ...c, ...a });
          },
        ]),
        (b._zod.check = () => {}),
        b
      );
    }
    function il(a, b) {
      let c = aQ(b),
        d = c.truthy ?? ['true', '1', 'yes', 'on', 'y', 'enabled'],
        f = c.falsy ?? ['false', '0', 'no', 'off', 'n', 'disabled'];
      'sensitive' !== c.case &&
        ((d = d.map((a) => ('string' == typeof a ? a.toLowerCase() : a))),
        (f = f.map((a) => ('string' == typeof a ? a.toLowerCase() : a))));
      let g = new Set(d),
        h = new Set(f),
        i = a.Codec ?? fp,
        j = a.Boolean ?? ew,
        k = new i({
          type: 'pipe',
          in: new (a.String ?? dL)({ type: 'string', error: c.error }),
          out: new j({ type: 'boolean', error: c.error }),
          transform: (a, b) => {
            let d = a;
            return (
              'sensitive' !== c.case && (d = d.toLowerCase()),
              !!g.has(d) ||
                (!h.has(d) &&
                  (b.issues.push({
                    code: 'invalid_value',
                    expected: 'stringbool',
                    values: [...g, ...h],
                    input: b.value,
                    inst: k,
                    continue: !1,
                  }),
                  {}))
            );
          },
          reverseTransform: (a, b) => (!0 === a ? d[0] || 'true' : f[0] || 'false'),
          error: c.error,
        });
      return (
        (k._zod.bag.truthy = d),
        (k._zod.bag.falsy = f),
        (k._zod.bag.case = c.case ?? 'insensitive'),
        k
      );
    }
    function im(a, b, c, d = {}) {
      let f = {
        check: 'string_format',
        type: 'string',
        format: b,
        fn: 'function' == typeof c ? c : (a) => c.test(a),
        ...aQ(d),
      };
      return (c instanceof RegExp && (f.pattern = c), new a(f));
    }
    function io(a, ...b) {
      for (let c of b)
        for (let b of Reflect.ownKeys(c))
          Object.prototype.propertyIsEnumerable.call(c, b) && as(a, b, c[b]);
      return a;
    }
    function ip(a) {
      let b = a?.target ?? 'draft-2020-12';
      return (
        'draft-4' === b && (b = 'draft-04'),
        'draft-7' === b && (b = 'draft-07'),
        {
          processors: a.processors ?? {},
          metadataRegistry: a?.metadata ?? f1,
          target: b,
          unrepresentable: a?.unrepresentable ?? 'throw',
          override: a?.override ?? (() => {}),
          io: a?.io ?? 'output',
          counter: 0,
          seen: new Map(),
          sharedDefsExtractedFor: void 0,
          sharedEmitDoneFor: void 0,
          cycles: a?.cycles ?? 'ref',
          reused: a?.reused ?? 'inline',
          intersections: [],
          deferred: [],
          external: a?.external ?? void 0,
        }
      );
    }
    function iq(a, b, c, d, f) {
      let g =
        'function' == typeof b.unrepresentable
          ? b.unrepresentable({ zodSchema: a, path: d.path, message: f })
          : b.unrepresentable;
      if ('any' === g) return !1;
      if (void 0 === g || 'throw' === g) throw Error(f);
      return (Object.assign(c, g), !0);
    }
    function ir(a, b, c = { path: [], schemaPath: [] }) {
      var d;
      let f = a._zod.def,
        g = b.seen.get(a);
      if (g) return (g.count++, c.schemaPath.includes(a) && (g.cycle = c.path), g.schema);
      let h = { schema: {}, count: 1, cycle: void 0, path: c.path };
      (b.seen.set(a, h), (b.sharedDefsExtractedFor = void 0), (b.sharedEmitDoneFor = void 0));
      let i = a._zod.toJSONSchema?.();
      if (i) h.schema = i;
      else {
        let d = { ...c, schemaPath: [...c.schemaPath, a], path: c.path };
        if (a._zod.processJSONSchema) a._zod.processJSONSchema(b, h.schema, d);
        else {
          let c = h.schema,
            g = b.processors[f.type];
          if (!g) throw Error(`[toJSONSchema]: Non-representable type encountered: ${f.type}`);
          g(a, b, c, d);
        }
        let g = a._zod.parent;
        g && (h.ref || (h.ref = g), ir(g, b, d), (b.seen.get(g).isParent = !0));
      }
      let j = b.metadataRegistry.get(a);
      return (
        j && io(h.schema, j),
        'input' === b.io &&
          (function a(b, c) {
            let d = c ?? { seen: new Set() };
            if (d.seen.has(b)) return !1;
            d.seen.add(b);
            let f = b._zod.def;
            if ('transform' === f.type) return !0;
            if ('array' === f.type) return a(f.element, d);
            if ('set' === f.type) return a(f.valueType, d);
            if ('lazy' === f.type) return a(f.getter(), d);
            if (
              'promise' === f.type ||
              'optional' === f.type ||
              'nonoptional' === f.type ||
              'nullable' === f.type ||
              'readonly' === f.type ||
              'default' === f.type ||
              'prefault' === f.type ||
              'catch' === f.type
            )
              return a(f.innerType, d);
            if ('intersection' === f.type) return a(f.left, d) || a(f.right, d);
            if ('record' === f.type || 'map' === f.type)
              return a(f.keyType, d) || a(f.valueType, d);
            if ('pipe' === f.type)
              return !!b._zod.traits.has('$ZodCodec') || a(f.in, d) || a(f.out, d);
            if ('object' === f.type) {
              for (let b in f.shape) if (a(f.shape[b], d)) return !0;
              return !1;
            }
            if ('union' === f.type) {
              for (let b of f.options) if (a(b, d)) return !0;
              return !1;
            }
            if ('tuple' === f.type) {
              for (let b of f.items) if (a(b, d)) return !0;
              if (f.rest && a(f.rest, d)) return !0;
            }
            return !1;
          })(a) &&
          (delete h.schema.examples, delete h.schema.default),
        'input' === b.io &&
          '_prefault' in h.schema &&
          ((d = h.schema).default ?? (d.default = h.schema._prefault)),
        delete h.schema._prefault,
        b.seen.get(a).schema
      );
    }
    function is(a) {
      return a.replace(/~/g, '~0').replace(/\//g, '~1');
    }
    function it(a, b) {
      let c = a.seen.get(b);
      if (!c) throw Error('Unprocessed schema. This is a bug in Zod.');
      if (a.external && a.sharedDefsExtractedFor === a.external) return;
      let d = new Map();
      for (let b of a.seen.entries()) {
        let c = a.metadataRegistry.get(b[0])?.id;
        if (c) {
          let a = d.get(c);
          if (a && a !== b[0])
            throw Error(
              `Duplicate schema id "${c}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`,
            );
          d.set(c, b[0]);
        }
      }
      let f = (b) => {
        if (b[1].schema.$ref) return;
        let d = b[1],
          { ref: f, defId: g } = ((b) => {
            let d = 'draft-2020-12' === a.target ? '$defs' : 'definitions';
            if (a.external) {
              let c = a.external.registry.get(b[0])?.id,
                f = a.external.uri ?? ((a) => a);
              if (c) return { ref: f(c) };
              let g = b[1].defId ?? b[1].schema.id ?? `schema${a.counter++}`;
              return ((b[1].defId = g), { defId: g, ref: `${f('__shared')}#/${d}/${is(g)}` });
            }
            let f = `#/${d}/`;
            if (b[1] === c && !b[1].schema.id) return { ref: '#' };
            let g = b[1].schema.id ?? `__schema${a.counter++}`;
            return { defId: g, ref: f + is(g) };
          })(b);
        ((d.def = { ...d.schema }), g && (d.defId = g));
        let h = d.schema;
        for (let a in h) delete h[a];
        h.$ref = f;
      };
      if ('throw' === a.cycles)
        for (let b of a.seen.entries()) {
          let a = b[1];
          if (a.cycle)
            throw Error(`Cycle detected: #/${a.cycle?.join('/')}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
        }
      for (let c of a.seen.entries()) {
        let d = c[1];
        if (b === c[0]) {
          f(c);
          continue;
        }
        if (a.external) {
          let d = a.external.registry.get(c[0])?.id;
          if (b !== c[0] && d) {
            f(c);
            continue;
          }
        }
        if (a.metadataRegistry.get(c[0])?.id || d.cycle) {
          f(c);
          continue;
        }
        d.count > 1 && 'ref' === a.reused && f(c);
      }
      a.external && (a.sharedDefsExtractedFor = a.external);
    }
    (a.s(
      [
        'TimePrecision',
        0,
        gX,
        '_any',
        0,
        hg,
        '_array',
        0,
        hR,
        '_base64',
        0,
        gR,
        '_base64url',
        0,
        gS,
        '_bigint',
        0,
        g9,
        '_boolean',
        0,
        g7,
        '_catch',
        0,
        h8,
        '_check',
        0,
        ii,
        '_cidrv4',
        0,
        gP,
        '_cidrv6',
        0,
        gQ,
        '_coercedBigint',
        0,
        ha,
        '_coercedBoolean',
        0,
        g8,
        '_coercedDate',
        0,
        hl,
        '_coercedNumber',
        0,
        g1,
        '_coercedString',
        0,
        gx,
        '_creditCard',
        0,
        gU,
        '_cuid',
        0,
        gH,
        '_cuid2',
        0,
        gI,
        '_custom',
        0,
        ie,
        '_date',
        0,
        hk,
        '_default',
        0,
        h5,
        '_discriminatedUnion',
        0,
        hU,
        '_e164',
        0,
        gT,
        '_email',
        0,
        gy,
        '_emoji',
        0,
        gF,
        '_endsWith',
        0,
        hH,
        '_enum',
        0,
        h$,
        '_file',
        0,
        h1,
        '_float32',
        0,
        g3,
        '_float64',
        0,
        g4,
        '_gt',
        0,
        hp,
        '_gte',
        0,
        hq,
        '_guid',
        0,
        gz,
        '_iban',
        0,
        gV,
        '_includes',
        0,
        hF,
        '_int',
        0,
        g2,
        '_int32',
        0,
        g5,
        '_int64',
        0,
        hb,
        '_intersection',
        0,
        hV,
        '_ipv4',
        0,
        gM,
        '_ipv6',
        0,
        gN,
        '_isoDate',
        0,
        gZ,
        '_isoDateTime',
        0,
        gY,
        '_isoDuration',
        0,
        g_,
        '_isoTime',
        0,
        g$,
        '_jwt',
        0,
        gW,
        '_ksuid',
        0,
        gL,
        '_lazy',
        0,
        ic,
        '_length',
        0,
        hB,
        '_literal',
        0,
        h0,
        '_lowercase',
        0,
        hD,
        '_lt',
        0,
        hn,
        '_lte',
        0,
        ho,
        '_mac',
        0,
        gO,
        '_map',
        0,
        hY,
        '_max',
        0,
        ho,
        '_maxLength',
        0,
        hz,
        '_maxSize',
        0,
        hw,
        '_mime',
        0,
        hK,
        '_min',
        0,
        hq,
        '_minLength',
        0,
        hA,
        '_minSize',
        0,
        hx,
        '_multipleOf',
        0,
        hv,
        '_nan',
        0,
        hm,
        '_nanoid',
        0,
        gG,
        '_nativeEnum',
        0,
        h_,
        '_negative',
        0,
        hs,
        '_never',
        0,
        hi,
        '_nonnegative',
        0,
        hu,
        '_nonoptional',
        0,
        h6,
        '_nonpositive',
        0,
        ht,
        '_normalize',
        0,
        hM,
        '_null',
        0,
        hf,
        '_nullable',
        0,
        h4,
        '_number',
        0,
        g0,
        '_optional',
        0,
        h3,
        '_overwrite',
        0,
        hL,
        '_pipe',
        0,
        h9,
        '_positive',
        0,
        hr,
        '_promise',
        0,
        id,
        '_properties',
        0,
        hJ,
        '_property',
        0,
        hI,
        '_readonly',
        0,
        ia,
        '_record',
        0,
        hX,
        '_refine',
        0,
        ig,
        '_regex',
        0,
        hC,
        '_set',
        0,
        hZ,
        '_size',
        0,
        hy,
        '_slugify',
        0,
        hQ,
        '_startsWith',
        0,
        hG,
        '_string',
        0,
        gw,
        '_stringFormat',
        0,
        im,
        '_stringbool',
        0,
        il,
        '_success',
        0,
        h7,
        '_superRefine',
        0,
        ih,
        '_symbol',
        0,
        hd,
        '_templateLiteral',
        0,
        ib,
        '_toLowerCase',
        0,
        hO,
        '_toUpperCase',
        0,
        hP,
        '_transform',
        0,
        h2,
        '_trim',
        0,
        hN,
        '_tuple',
        0,
        hW,
        '_uint32',
        0,
        g6,
        '_uint64',
        0,
        hc,
        '_ulid',
        0,
        gJ,
        '_undefined',
        0,
        he,
        '_union',
        0,
        hS,
        '_unknown',
        0,
        hh,
        '_uppercase',
        0,
        hE,
        '_url',
        0,
        gE,
        '_uuid',
        0,
        gA,
        '_uuidv4',
        0,
        gB,
        '_uuidv6',
        0,
        gC,
        '_uuidv7',
        0,
        gD,
        '_void',
        0,
        hj,
        '_xid',
        0,
        gK,
        '_xor',
        0,
        hT,
        'describe',
        0,
        ij,
        'meta',
        0,
        ik,
      ],
      22860,
    ),
      a.i(22860));
    let iu = new Set(['type', 'properties', 'required', 'additionalProperties']),
      iv = ['oneOf', 'anyOf'];
    function iw(a) {
      let b = a.additionalProperties;
      return void 0 === b || !1 === b || 'object' != typeof b || null === b
        ? null
        : Object.keys(b).length
          ? b
          : null;
    }
    function ix(a) {
      let b = [];
      for (let c of a) {
        if ('object' != typeof c || 'object' !== c.type) return null;
        for (let a in c) if (!iu.has(a)) return null;
        b.push(c);
      }
      let c = {},
        d = new Set();
      for (let a of b) {
        for (let d in a.properties) {
          if (Object.prototype.hasOwnProperty.call(c, d)) continue;
          let a = [];
          for (let c of b) {
            let b = c.properties?.[d] ?? iw(c);
            null != b && (a.some((a) => JSON.stringify(a) === JSON.stringify(b)) || a.push(b));
          }
          as(c, d, 1 === a.length ? a[0] : (ix(a) ?? { allOf: a }));
        }
        for (let b of a.required ?? []) d.add(b);
      }
      let f = { type: 'object', properties: c };
      if ((d.size && (f.required = [...d]), b.every((a) => !1 === a.additionalProperties)))
        f.additionalProperties = !1;
      else {
        let a = [];
        for (let c of b) {
          let b = iw(c);
          b && !a.some((a) => JSON.stringify(a) === JSON.stringify(b)) && a.push(b);
        }
        1 === a.length
          ? (f.additionalProperties = a[0])
          : a.length > 1 && (f.additionalProperties = { allOf: a });
      }
      return f;
    }
    function iy(a, b) {
      let c = a.seen.get(b);
      if (!c) throw Error('Unprocessed schema. This is a bug in Zod.');
      let d = (b) => {
        let c = a.seen.get(b);
        if (null === c.ref) return;
        let f = c.def ?? c.schema,
          g = { ...f },
          h = c.ref;
        if (((c.ref = null), h)) {
          d(h);
          let c = a.seen.get(h),
            i = c.schema;
          if (
            (i.$ref &&
            ('draft-07' === a.target || 'draft-04' === a.target || 'openapi-3.0' === a.target)
              ? ((f.allOf = f.allOf ?? []), f.allOf.push(i))
              : io(f, i),
            io(f, g),
            b._zod.parent === h)
          )
            for (let a in f) '$ref' !== a && 'allOf' !== a && (a in g || delete f[a]);
          if (i.$ref && c.def)
            for (let a in f)
              '$ref' !== a &&
                'allOf' !== a &&
                a in c.def &&
                JSON.stringify(f[a]) === JSON.stringify(c.def[a]) &&
                delete f[a];
        }
        let i = b._zod.parent;
        if (i && i !== h) {
          d(i);
          let b = a.seen.get(i);
          if (b?.schema.$ref && ((f.$ref = b.schema.$ref), b.def))
            for (let a in f)
              '$ref' !== a &&
                'allOf' !== a &&
                a in b.def &&
                JSON.stringify(f[a]) === JSON.stringify(b.def[a]) &&
                delete f[a];
        }
        a.override({ zodSchema: b, jsonSchema: f, path: c.path ?? [] });
      };
      if (!a.external || a.sharedEmitDoneFor !== a.external) {
        for (let b of [...a.seen.entries()].reverse()) d(b[0]);
        if ('openapi-3.0' !== a.target)
          for (let b of a.seen.entries())
            !(function a(b) {
              let c = b.anyOf;
              if (!Array.isArray(c) || 0 === c.length || void 0 !== b.type) return;
              let d = [];
              for (let b of c) {
                if (!b || 'object' != typeof b) return;
                a(b);
                let c = Object.keys(b);
                if (1 !== c.length || 'type' !== c[0]) return;
                let f = b.type;
                for (let a of Array.isArray(f) ? f : [f]) {
                  if ('string' != typeof a) return;
                  d.includes(a) || d.push(a);
                }
              }
              (delete b.anyOf, (b.type = 1 === d.length ? d[0] : d));
            })(b[1].def ?? b[1].schema);
        for (let b of a.deferred) b();
        if (a.intersections.length) {
          let b = new Map();
          for (let c of a.seen.values())
            for (let a of [c.schema, c.def]) {
              let c = a?.allOf;
              if (!Array.isArray(c)) continue;
              let d = b.get(c);
              d ? d.push(a) : b.set(c, [a]);
            }
          for (let c of a.intersections)
            for (let a of b.get(c) ?? [])
              !(function (a) {
                let b = a.allOf;
                if (!Array.isArray(b) || b.length < 2) return;
                for (let b of iu) if (b in a) return;
                let c = b.filter((a) => iv.some((b) => Array.isArray(a[b]))),
                  d = null;
                if (c.length) {
                  let a = c[0],
                    f = iv.find((b) => Array.isArray(a[b]));
                  if (1 !== Object.keys(a).length) return;
                  let g = b.filter((b) => b !== a),
                    h = a[f].map((a) => ix([...g, a]));
                  if (h.some((a) => !a)) return;
                  d = { [f]: h };
                } else d = ix(b);
                d && (delete a.allOf, io(a, d));
              })(a);
        }
      }
      let f = {};
      if (
        ('draft-2020-12' === a.target
          ? (f.$schema = 'https://json-schema.org/draft/2020-12/schema')
          : 'draft-07' === a.target
            ? (f.$schema = 'http://json-schema.org/draft-07/schema#')
            : 'draft-04' === a.target
              ? (f.$schema = 'http://json-schema.org/draft-04/schema#')
              : a.target,
        a.external?.uri)
      ) {
        let c = a.external.registry.get(b)?.id;
        if (!c) throw Error('Schema is missing an `id` property');
        f.$id = a.external.uri(c);
      }
      io(f, c.defId ? c.schema : (c.def ?? c.schema));
      let g = a.metadataRegistry.get(b)?.id;
      void 0 !== g && f.id === g && delete f.id;
      let h = a.external?.defs ?? {};
      if (!a.external || a.sharedEmitDoneFor !== a.external)
        for (let b of a.seen.entries()) {
          let a = b[1];
          a.def && a.defId && (a.def.id === a.defId && delete a.def.id, as(h, a.defId, a.def));
        }
      (a.external && (a.sharedEmitDoneFor = a.external),
        a.external ||
          (Object.keys(h).length > 0 &&
            ('draft-2020-12' === a.target ? (f.$defs = h) : (f.definitions = h))));
      try {
        let c = JSON.parse(JSON.stringify(f));
        return (
          Object.defineProperty(c, '~standard', {
            value: {
              ...b['~standard'],
              jsonSchema: {
                input: iA(b, 'input', a.processors),
                output: iA(b, 'output', a.processors),
              },
            },
            enumerable: !1,
            writable: !1,
          }),
          c
        );
      } catch (a) {
        throw Error('Error converting schema to JSON.');
      }
    }
    let iz =
        (a, b = {}) =>
        (c) => {
          let d = ip({ ...c, processors: b });
          return (ir(a, d), it(d, a), iy(d, a));
        },
      iA =
        (a, b, c = {}) =>
        (d) => {
          let { libraryOptions: f, target: g } = d ?? {},
            h = ip({ ...(f ?? {}), target: g, io: b, processors: c });
          return (ir(a, h), it(h, a), iy(h, a));
        };
    (a.s(
      [
        'createStandardJSONSchemaMethod',
        0,
        iA,
        'createToJSONSchemaMethod',
        0,
        iz,
        'extractDefs',
        0,
        it,
        'finalize',
        0,
        iy,
        'handleUnrepresentable',
        0,
        iq,
        'initializeContext',
        0,
        ip,
        'process',
        0,
        ir,
        'processSchema',
        0,
        ir,
      ],
      3077,
    ),
      a.i(3077));
    let iB = (a, b, c) => {
        (void 0 === a[b] || c > a[b]) && (a[b] = c);
      },
      iC = (a, b, c) => {
        (void 0 === a[b] || c < a[b]) && (a[b] = c);
      },
      iD = (a, b) => {
        (iB(a, 'minimum', b), iC(a, 'maximum', b));
      },
      iE = (a, b) => {
        (a.multipleOf ?? (a.multipleOf = []), a.multipleOf.includes(b) || a.multipleOf.push(b));
      },
      iF = (a, b) => {
        (a.patterns ?? (a.patterns = new Set()), a.patterns.add(b));
      },
      iG = (a, b) => {
        a.mime = a.mime ? a.mime.filter((a) => b.includes(a)) : [...b];
      },
      iH = (a, b) => {
        ((a.format = b), b.includes('int') && (a.isInt = !0));
      },
      iI = (a, b) => iB(a, 'minimum', b.minimum),
      iJ = (a, b) => iC(a, 'maximum', b.maximum),
      iK = (a) => (b, c) => {
        iH(b, c.format);
        let [d, f] = a[c.format];
        (iB(b, 'minimum', d), iC(b, 'maximum', f));
      },
      iL = {
        greater_than: (a, b) => iB(a, b.inclusive ? 'minimum' : 'exclusiveMinimum', b.value),
        less_than: (a, b) => iC(a, b.inclusive ? 'maximum' : 'exclusiveMaximum', b.value),
        multiple_of: (a, b) => iE(a, b.value),
        number_format: iK(aU),
        bigint_format: iK(aV),
        min_length: iI,
        max_length: iJ,
        length_equals: (a, b) => iD(a, b.length),
        min_size: iI,
        max_size: iJ,
        size_equals: (a, b) => iD(a, b.size),
        string_format: (a, b) => {
          (iH(a, b.format),
            b.pattern && iF(a, b.pattern),
            ('base64' === b.format || 'base64url' === b.format) && (a.contentEncoding = b.format),
            (b.local || -1 === b.precision) && (a.laxFormat = !0));
        },
        mime_type: (a, b) => iG(a, b.mime),
      };
    function iM(a) {
      let b = {},
        c = a._zod.def;
      for (let d of a._zod.traits.has('$ZodCheck') ? [a, ...(c.checks ?? [])] : (c.checks ?? []))
        iL[d._zod.def.check]?.(b, d._zod.def);
      let d = a._zod.bag;
      for (let a of (void 0 !== d.minimum && iB(b, 'minimum', d.minimum),
      void 0 !== d.exclusiveMinimum && iB(b, 'exclusiveMinimum', d.exclusiveMinimum),
      void 0 !== d.maximum && iC(b, 'maximum', d.maximum),
      void 0 !== d.exclusiveMaximum && iC(b, 'exclusiveMaximum', d.exclusiveMaximum),
      void 0 !== d.multipleOf && iE(b, d.multipleOf),
      void 0 !== d.format &&
        (b.format ?? (b.format = d.format), d.format.includes('int') && (b.isInt = !0)),
      d.mime && iG(b, d.mime),
      d.patterns ?? []))
        iF(b, a);
      return b;
    }
    let iN = {
        guid: 'uuid',
        url: 'uri',
        datetime: 'date-time',
        json_string: 'json-string',
        regex: '',
      },
      iO = new Map([
        [eg, cE],
        [ei, cF],
      ]),
      iP = (a) => iO.get(a) ?? a,
      iQ = (a, b, c, d) => {
        c.type = 'string';
        let {
          minimum: f,
          maximum: g,
          format: h,
          patterns: i,
          contentEncoding: j,
          laxFormat: k,
        } = iM(a);
        if (
          ('number' == typeof f && (c.minLength = f),
          'number' == typeof g && (c.maxLength = g),
          h &&
            ((c.format = iN[h] ?? h),
            '' === c.format && delete c.format,
            ('time' === h || k) && delete c.format),
          j && (c.contentEncoding = j),
          i && i.size > 0)
        ) {
          let a = [...i].map(iP);
          1 === a.length
            ? (c.pattern = a[0].source)
            : a.length > 1 &&
              (c.allOf = [
                ...a.map((a) => ({
                  ...('draft-07' === b.target ||
                  'draft-04' === b.target ||
                  'openapi-3.0' === b.target
                    ? { type: 'string' }
                    : {}),
                  pattern: a.source,
                })),
              ]);
        }
      },
      iR = (a, b, c, d) => {
        let {
          minimum: f,
          maximum: g,
          multipleOf: h,
          exclusiveMaximum: i,
          exclusiveMinimum: j,
          isInt: k,
        } = iM(a);
        c.type = k ? 'integer' : 'number';
        let l = 'number' == typeof j && j >= (f ?? -1 / 0),
          m = 'number' == typeof i && i <= (g ?? 1 / 0),
          n = 'draft-04' === b.target || 'openapi-3.0' === b.target;
        if (
          (l
            ? n
              ? ((c.minimum = j), (c.exclusiveMinimum = !0))
              : (c.exclusiveMinimum = j)
            : 'number' == typeof f && (c.minimum = f),
          m
            ? n
              ? ((c.maximum = i), (c.exclusiveMaximum = !0))
              : (c.exclusiveMaximum = i)
            : 'number' == typeof g && (c.maximum = g),
          h)
        ) {
          let f = new Set();
          for (let g of h)
            Number.isFinite(g) && 0 !== g
              ? f.add(Math.abs(g))
              : iq(a, b, c, d, `A multipleOf divisor of ${g} cannot be represented in JSON Schema`);
          let [g, ...i] = f;
          (void 0 !== g && (c.multipleOf = g),
            i.length && (c.allOf = [...(c.allOf ?? []), ...i.map((a) => ({ multipleOf: a }))]));
        }
      },
      iS = (a, b, c, d) => {
        c.type = 'boolean';
      },
      iT = (a, b, c, d) => {
        iq(a, b, c, d, 'BigInt cannot be represented in JSON Schema');
      },
      iU = (a, b, c, d) => {
        iq(a, b, c, d, 'Symbols cannot be represented in JSON Schema');
      },
      iV = (a, b, c, d) => {
        'openapi-3.0' === b.target
          ? ((c.type = 'string'), (c.nullable = !0), (c.enum = [null]))
          : (c.type = 'null');
      },
      iW = (a, b, c, d) => {
        iq(a, b, c, d, 'Undefined cannot be represented in JSON Schema');
      },
      iX = (a, b, c, d) => {
        iq(a, b, c, d, 'Void cannot be represented in JSON Schema');
      },
      iY = (a, b, c, d) => {
        c.not = {};
      },
      iZ = (a, b, c, d) => {},
      i$ = (a, b, c, d) => {},
      i_ = (a, b, c, d) => {
        iq(a, b, c, d, 'Date cannot be represented in JSON Schema');
      },
      i0 = (a, b, c, d) => {
        let f = ah(a._zod.def.entries);
        if (0 === f.length) {
          c.not = {};
          return;
        }
        (f.every((a) => 'number' == typeof a) && (c.type = 'number'),
          f.every((a) => 'string' == typeof a) && (c.type = 'string'),
          (c.enum = f));
      },
      i1 = (a, b, c, d) => {
        let f = a._zod.def;
        if (0 === f.values.length) {
          c.not = {};
          return;
        }
        let g = [];
        for (let h of f.values)
          if (void 0 === h) {
            if (iq(a, b, c, d, 'Literal `undefined` cannot be represented in JSON Schema')) return;
          } else if ('bigint' == typeof h) {
            if (iq(a, b, c, d, 'BigInt literals cannot be represented in JSON Schema')) return;
            g.push(Number(h));
          } else g.push(h);
        if (0 === g.length);
        else if (1 === g.length) {
          let a = g[0];
          ((c.type = null === a ? 'null' : typeof a),
            'draft-04' === b.target || 'openapi-3.0' === b.target ? (c.enum = [a]) : (c.const = a));
        } else
          (g.every((a) => 'number' == typeof a) && (c.type = 'number'),
            g.every((a) => 'string' == typeof a) && (c.type = 'string'),
            g.every((a) => 'boolean' == typeof a) && (c.type = 'boolean'),
            g.every((a) => null === a) && (c.type = 'null'),
            (c.enum = g));
      },
      i2 = (a, b, c, d) => {
        iq(a, b, c, d, 'NaN cannot be represented in JSON Schema');
      },
      i3 = (a, b, c, d) => {
        let f = a._zod.pattern;
        if (!f) throw Error('Pattern not found in template literal');
        ((c.type = 'string'), (c.pattern = f.source));
      },
      i4 = (a, b, c, d) => {
        ((c.type = 'string'), (c.format = 'binary'), (c.contentEncoding = 'binary'));
        let { minimum: f, maximum: g, mime: h } = iM(a);
        (void 0 !== f && (c.minLength = f),
          void 0 !== g && (c.maxLength = g),
          h &&
            (0 === h.length
              ? (c.not = {})
              : 1 === h.length
                ? (c.contentMediaType = h[0])
                : (c.anyOf = h.map((a) => ({ contentMediaType: a })))));
      },
      i5 = (a, b, c, d) => {
        c.type = 'boolean';
      },
      i6 = (a, b, c, d) => {
        iq(a, b, c, d, 'Custom types cannot be represented in JSON Schema');
      },
      i7 = (a, b, c, d) => {
        iq(a, b, c, d, 'Function types cannot be represented in JSON Schema');
      },
      i8 = (a, b, c, d) => {
        iq(a, b, c, d, 'Transforms cannot be represented in JSON Schema');
      },
      i9 = (a, b, c, d) => {
        iq(a, b, c, d, 'Map cannot be represented in JSON Schema');
      },
      ja = (a, b, c, d) => {
        iq(a, b, c, d, 'Set cannot be represented in JSON Schema');
      },
      jb = (a, b, c, d) => {
        let f = a._zod.def,
          { minimum: g, maximum: h } = iM(a);
        ('number' == typeof g && (c.minItems = g),
          'number' == typeof h && (c.maxItems = h),
          (c.type = 'array'),
          (c.items = ir(f.element, b, { ...d, path: [...d.path, 'items'] })));
      };
    function jc(a) {
      let b = a._zod.def;
      return 'pipe' === b.type && b.in._zod.traits.has('$ZodTransform')
        ? jc(b.out)
        : 'catch' === b.type
          ? jc(b.innerType)
          : a._zod.optin;
    }
    let jd = (a, b, c, d) => {
        let f = a._zod.def,
          g = f.shape;
        if (
          Object.getOwnPropertySymbols(g).length &&
          iq(a, b, c, d, 'Symbol keys cannot be represented in JSON Schema')
        )
          return;
        for (let a in ((c.type = 'object'), (c.properties = {}), g))
          as(c.properties, a, ir(g[a], b, { ...d, path: [...d.path, 'properties', a] }));
        let h = [];
        for (let a of Object.keys(g)) {
          let c = f.shape[a];
          ('input' === b.io ? void 0 === jc(c) : void 0 === c._zod.optout) && h.push(a);
        }
        (h.length > 0 && (c.required = h),
          f.catchall?._zod.def.type === 'never'
            ? (c.additionalProperties = !1)
            : f.catchall
              ? f.catchall &&
                (c.additionalProperties = ir(f.catchall, b, {
                  ...d,
                  path: [...d.path, 'additionalProperties'],
                }))
              : 'output' === b.io && (c.additionalProperties = !1));
      },
      je = (a, b, c, d) => {
        let f = a._zod.def,
          g = !1 === f.inclusive,
          h = f.options.map((a, c) =>
            ir(a, b, { ...d, path: [...d.path, g ? 'oneOf' : 'anyOf', c] }),
          );
        g ? (c.oneOf = h) : (c.anyOf = h);
      },
      jf = (a, b, c, d) => {
        let f = a._zod.def,
          g = ir(f.left, b, { ...d, path: [...d.path, 'allOf', 0] }),
          h = ir(f.right, b, { ...d, path: [...d.path, 'allOf', 1] }),
          i = (a) => 'allOf' in a && 1 === Object.keys(a).length,
          j = [...(i(g) ? g.allOf : [g]), ...(i(h) ? h.allOf : [h])];
        ((c.allOf = j), b.intersections.push(j));
      },
      jg = (a, b, c, d) => {
        let f = a._zod.def;
        c.type = 'array';
        let g = 'draft-2020-12' === b.target ? 'prefixItems' : 'items',
          h =
            'draft-2020-12' === b.target || 'openapi-3.0' === b.target
              ? 'items'
              : 'additionalItems',
          i = f.items.map((a, c) => ir(a, b, { ...d, path: [...d.path, g, c] })),
          j = f.rest
            ? ir(f.rest, b, {
                ...d,
                path: [...d.path, h, ...('openapi-3.0' === b.target ? [f.items.length] : [])],
              })
            : null,
          k = f.items.length;
        for (; k > 0;) {
          let a = f.items[k - 1];
          if (!('input' === b.io ? void 0 !== jc(a) : 'optional' === a._zod.optout)) break;
          k--;
        }
        let l = f.items.length,
          m = !f.rest;
        ('draft-2020-12' === b.target
          ? ((c.prefixItems = i), m ? (c.items = !1) : j && (c.items = j))
          : 'openapi-3.0' === b.target
            ? ((c.items = { anyOf: i }), j && c.items.anyOf.push(j))
            : ((c.items = i), m ? (c.additionalItems = !1) : j && (c.additionalItems = j)),
          k > 0 && (c.minItems = k),
          m && (c.maxItems = l));
        let { minimum: n, maximum: o } = iM(a);
        ('number' == typeof n && (c.minItems = n), 'number' == typeof o && (c.maxItems = o));
      },
      jh = new WeakMap(),
      ji = (a, b, c, d) => {
        let f = a._zod.def;
        c.type = 'object';
        let g = f.keyType,
          h = iM(g).patterns;
        if ('loose' === f.mode && h && h.size > 0) {
          let a = ir(f.valueType, b, { ...d, path: [...d.path, 'patternProperties', '*'] });
          for (let b of ((c.patternProperties = {}), h)) as(c.patternProperties, iP(b).source, a);
        } else {
          if ('draft-07' === b.target || 'draft-2020-12' === b.target) {
            c.propertyNames = ir(f.keyType, b, { ...d, path: [...d.path, 'propertyNames'] });
            let g = jh.get(b);
            (g ||
              ((g = []),
              jh.set(b, g),
              b.deferred.push(() =>
                (function (a) {
                  let b = new Map();
                  for (let c of a.seen.values()) c.def && !b.has(c.schema) && b.set(c.schema, c);
                  let c = new Map();
                  for (let d of jh.get(a) ?? []) {
                    let f = a.seen.get(d),
                      g = (f?.def ?? f?.schema)?.propertyNames;
                    if (!g || !0 === g || c.has(g)) continue;
                    let h = (function a(b, c, d) {
                      if (c.$ref) {
                        if (d.has(c)) return c;
                        d.add(c);
                        let f = b.get(c)?.def;
                        if (!f) return c;
                        let g = a(b, f, d);
                        return g === f ? c : g;
                      }
                      for (let f of ['anyOf', 'oneOf']) {
                        let g = c[f];
                        if (!Array.isArray(g)) continue;
                        let h = g.map((c) => a(b, c, d));
                        h.some((a, b) => a !== g[b]) && (c = { ...c, [f]: h });
                      }
                      let f = Array.isArray(c.type) ? c.type : [c.type],
                        g =
                          !f.includes('string') && f.some((a) => 'number' === a || 'integer' === a),
                        h = c.enum ?? (void 0 !== c.const ? [c.const] : void 0);
                      if (!g && !h?.some((a) => 'number' == typeof a)) return c;
                      let {
                        minimum: i,
                        maximum: j,
                        exclusiveMinimum: k,
                        exclusiveMaximum: l,
                        multipleOf: m,
                        format: n,
                        id: o,
                        ...p
                      } = c;
                      return (
                        p.enum
                          ? (p.enum = p.enum.map((a) => ('number' == typeof a ? String(a) : a)))
                          : 'number' == typeof p.const && (p.const = String(p.const)),
                        g &&
                          ((p.type = 'string'),
                          h || (p.pattern = (f.includes('number') ? cW : cV).source)),
                        p
                      );
                    })(b, g, new Set());
                    h !== g && c.set(g, h);
                  }
                  if (c.size)
                    for (let b of a.seen.values())
                      for (let a of [b.schema, b.def]) {
                        let b = a && c.get(a.propertyNames);
                        b && (a.propertyNames = b);
                      }
                })(b),
              )),
              g.push(a));
          }
          c.additionalProperties = ir(f.valueType, b, {
            ...d,
            path: [...d.path, 'additionalProperties'],
          });
        }
        let i = g._zod.values,
          j = 'input' === b.io && void 0 !== jc(f.valueType);
        if (i && !f.partial && !j) {
          let a = [...i].filter((a) => 'string' == typeof a || 'number' == typeof a);
          a.length > 0 && (c.required = a.map(String));
        }
      },
      jj = (a, b, c, d) => {
        let f = a._zod.def,
          g = ir(f.innerType, b, d),
          h = b.seen.get(a);
        'openapi-3.0' === b.target
          ? ((h.ref = f.innerType), (c.nullable = !0))
          : (c.anyOf = [g, { type: 'null' }]);
      },
      jk = (a, b, c, d) => {
        let f = a._zod.def;
        (ir(f.innerType, b, d), (b.seen.get(a).ref = f.innerType));
      },
      jl = Symbol();
    function jm(a, b, c, d, f) {
      let g = !1,
        h = JSON.stringify(a, (a, b) => ('bigint' != typeof b ? b : ((g = !0), null)));
      return g
        ? (iq(b, c, d, f, 'BigInt defaults cannot be represented in JSON Schema'), jl)
        : JSON.parse(h);
    }
    let jn = (a, b, c, d) => {
        let f = a._zod.def;
        (ir(f.innerType, b, d), (b.seen.get(a).ref = f.innerType));
        let g = jm(f.defaultValue, a, b, c, d);
        g !== jl && (c.default = g);
      },
      jo = (a, b, c, d) => {
        let f = a._zod.def;
        if ((ir(f.innerType, b, d), (b.seen.get(a).ref = f.innerType), 'input' !== b.io)) return;
        let g = jm(f.defaultValue, a, b, c, d);
        g !== jl && (c._prefault = g);
      },
      jp = (a, b, c, d) => {
        let f,
          g = a._zod.def;
        (ir(g.innerType, b, d), (b.seen.get(a).ref = g.innerType));
        try {
          f = g.catchValue(void 0);
        } catch {
          iq(a, b, c, d, 'Dynamic catch values are not supported in JSON Schema');
          return;
        }
        c.default = f;
      },
      jq = (a, b, c, d) => {
        let f = a._zod.def,
          g = f.in._zod.traits.has('$ZodTransform'),
          h = 'input' === b.io ? (g ? f.out : f.in) : f.out;
        (ir(h, b, d), (b.seen.get(a).ref = h));
      },
      jr = (a, b, c, d) => {
        let f = a._zod.def;
        (ir(f.innerType, b, d), (b.seen.get(a).ref = f.innerType), (c.readOnly = !0));
      },
      js = (a, b, c, d) => {
        let f = a._zod.def;
        (ir(f.innerType, b, d), (b.seen.get(a).ref = f.innerType));
      },
      jt = (a, b, c, d) => {
        let f = a._zod.def;
        (ir(f.innerType, b, d), (b.seen.get(a).ref = f.innerType));
      },
      ju = (a, b, c, d) => {
        let f = a._zod.innerType;
        (ir(f, b, d), (b.seen.get(a).ref = f));
      },
      jv = {
        string: iQ,
        number: iR,
        boolean: iS,
        bigint: iT,
        symbol: iU,
        null: iV,
        undefined: iW,
        void: iX,
        never: iY,
        any: iZ,
        unknown: i$,
        date: i_,
        enum: i0,
        literal: i1,
        nan: i2,
        template_literal: i3,
        file: i4,
        success: i5,
        custom: i6,
        function: i7,
        transform: i8,
        map: i9,
        set: ja,
        array: jb,
        object: jd,
        union: je,
        intersection: jf,
        tuple: jg,
        record: ji,
        nullable: jj,
        nonoptional: jk,
        default: jn,
        prefault: jo,
        catch: jp,
        pipe: jq,
        readonly: jr,
        promise: js,
        optional: jt,
        lazy: ju,
      };
    function jw(a, b) {
      if ('_idmap' in a) {
        let c = ip({ ...b, processors: jv }),
          d = {};
        for (let b of a._idmap.entries()) {
          let [a, d] = b;
          ir(d, c);
        }
        let f = {};
        for (let g of ((c.external = { registry: a, uri: b?.uri, defs: d }), a._idmap.entries())) {
          let [a, b] = g;
          (it(c, b), as(f, a, iy(c, b)));
        }
        return (
          Object.keys(d).length > 0 &&
            (f.__shared = { ['draft-2020-12' === c.target ? '$defs' : 'definitions']: d }),
          { schemas: f }
        );
      }
      let c = ip({ ...b, processors: jv });
      return (ir(a, c), it(c, a), iy(c, a));
    }
    a.s([], 3569);
    var jx = a.i(3569);
    a.s(
      [
        '$ZodAny',
        0,
        eC,
        '$ZodArray',
        0,
        eI,
        '$ZodAsyncError',
        0,
        bC,
        '$ZodBase64',
        0,
        eh,
        '$ZodBase64URL',
        0,
        ek,
        '$ZodBigInt',
        0,
        ex,
        '$ZodBigIntFormat',
        0,
        ey,
        '$ZodBoolean',
        0,
        ew,
        '$ZodCIDRv4',
        0,
        ec,
        '$ZodCIDRv6',
        0,
        ee,
        '$ZodCUID',
        0,
        d$,
        '$ZodCUID2',
        0,
        d_,
        '$ZodCatch',
        0,
        fl,
        '$ZodCheck',
        0,
        dd,
        '$ZodCheckBigIntFormat',
        0,
        dl,
        '$ZodCheckEndsWith',
        0,
        dz,
        '$ZodCheckGreaterThan',
        0,
        di,
        '$ZodCheckIncludes',
        0,
        dx,
        '$ZodCheckLengthEquals',
        0,
        ds,
        '$ZodCheckLessThan',
        0,
        dh,
        '$ZodCheckLowerCase',
        0,
        dv,
        '$ZodCheckMaxLength',
        0,
        dq,
        '$ZodCheckMaxSize',
        0,
        dm,
        '$ZodCheckMimeType',
        0,
        dD,
        '$ZodCheckMinLength',
        0,
        dr,
        '$ZodCheckMinSize',
        0,
        dn,
        '$ZodCheckMultipleOf',
        0,
        dj,
        '$ZodCheckNumberFormat',
        0,
        dk,
        '$ZodCheckOverwrite',
        0,
        dE,
        '$ZodCheckProperties',
        0,
        dC,
        '$ZodCheckProperty',
        0,
        dB,
        '$ZodCheckRegex',
        0,
        du,
        '$ZodCheckSizeEquals',
        0,
        dp,
        '$ZodCheckStartsWith',
        0,
        dy,
        '$ZodCheckStringFormat',
        0,
        dt,
        '$ZodCheckUpperCase',
        0,
        dw,
        '$ZodCodec',
        0,
        fp,
        '$ZodCreditCard',
        0,
        eo,
        '$ZodCustom',
        0,
        fz,
        '$ZodCustomStringFormat',
        0,
        et,
        '$ZodCyclicError',
        0,
        fB,
        '$ZodDate',
        0,
        eG,
        '$ZodDefault',
        0,
        fe,
        '$ZodDiscriminatedUnion',
        0,
        eV,
        '$ZodE164',
        0,
        el,
        '$ZodEmail',
        0,
        dP,
        '$ZodEmoji',
        0,
        dY,
        '$ZodEncodeError',
        0,
        bD,
        '$ZodEnum',
        0,
        e6,
        '$ZodError',
        0,
        bK,
        '$ZodExactOptional',
        0,
        fc,
        '$ZodFile',
        0,
        e8,
        '$ZodFunction',
        0,
        fw,
        '$ZodGUID',
        0,
        dN,
        '$ZodIBAN',
        0,
        eq,
        '$ZodIPv4',
        0,
        d7,
        '$ZodIPv6',
        0,
        ea,
        '$ZodISODate',
        0,
        d4,
        '$ZodISODateTime',
        0,
        d3,
        '$ZodISODuration',
        0,
        d6,
        '$ZodISOTime',
        0,
        d5,
        '$ZodIntersection',
        0,
        eW,
        '$ZodJWT',
        0,
        es,
        '$ZodKSUID',
        0,
        d2,
        '$ZodLazy',
        0,
        fy,
        '$ZodLiteral',
        0,
        e7,
        '$ZodMAC',
        0,
        eb,
        '$ZodMap',
        0,
        e2,
        '$ZodNaN',
        0,
        fm,
        '$ZodNanoID',
        0,
        dZ,
        '$ZodNever',
        0,
        eE,
        '$ZodNonOptional',
        0,
        fh,
        '$ZodNull',
        0,
        eB,
        '$ZodNullable',
        0,
        fd,
        '$ZodNumber',
        0,
        eu,
        '$ZodNumberFormat',
        0,
        ev,
        '$ZodObject',
        0,
        eN,
        '$ZodObjectJIT',
        0,
        eO,
        '$ZodOptional',
        0,
        fb,
        '$ZodPipe',
        0,
        fn,
        '$ZodPrefault',
        0,
        fg,
        '$ZodPreprocess',
        0,
        fs,
        '$ZodPromise',
        0,
        fx,
        '$ZodReadonly',
        0,
        ft,
        '$ZodRealError',
        0,
        bL,
        '$ZodRecord',
        0,
        e1,
        '$ZodRegistry',
        0,
        f_,
        '$ZodSet',
        0,
        e4,
        '$ZodString',
        0,
        dL,
        '$ZodStringFormat',
        0,
        dM,
        '$ZodSuccess',
        0,
        fj,
        '$ZodSymbol',
        0,
        ez,
        '$ZodTemplateLiteral',
        0,
        fv,
        '$ZodTransform',
        0,
        e9,
        '$ZodTuple',
        0,
        eZ,
        '$ZodType',
        0,
        dH,
        '$ZodULID',
        0,
        d0,
        '$ZodURL',
        0,
        dX,
        '$ZodUUID',
        0,
        dO,
        '$ZodUndefined',
        0,
        eA,
        '$ZodUnion',
        0,
        eQ,
        '$ZodUnknown',
        0,
        eD,
        '$ZodVoid',
        0,
        eF,
        '$ZodXID',
        0,
        d1,
        '$ZodXor',
        0,
        eS,
        '$brand',
        0,
        bB,
        '$constructor',
        0,
        bA,
        '$input',
        0,
        f$,
        '$output',
        0,
        fZ,
        'Doc',
        0,
        dF,
        'INVALID',
        0,
        f2,
        'JSONSchema',
        0,
        jx,
        'JSONSchemaGenerator',
        0,
        class {
          get metadataRegistry() {
            return this.ctx.metadataRegistry;
          }
          get target() {
            return this.ctx.target;
          }
          get unrepresentable() {
            return this.ctx.unrepresentable;
          }
          get override() {
            return this.ctx.override;
          }
          get io() {
            return this.ctx.io;
          }
          get counter() {
            return this.ctx.counter;
          }
          set counter(a) {
            this.ctx.counter = a;
          }
          get seen() {
            return this.ctx.seen;
          }
          constructor(a) {
            let b = a?.target ?? 'draft-2020-12';
            ('draft-4' === b && (b = 'draft-04'),
              'draft-7' === b && (b = 'draft-07'),
              (this.ctx = ip({
                processors: jv,
                target: b,
                ...(a?.metadata && { metadata: a.metadata }),
                ...(a?.unrepresentable && { unrepresentable: a.unrepresentable }),
                ...(a?.override && { override: a.override }),
                ...(a?.io && { io: a.io }),
              })));
          }
          process(a, b = { path: [], schemaPath: [] }) {
            return ir(a, this.ctx, b);
          }
          emit(a, b) {
            (b &&
              (b.cycles && (this.ctx.cycles = b.cycles),
              b.reused && (this.ctx.reused = b.reused),
              b.external && (this.ctx.external = b.external)),
              (this.ctx.sharedDefsExtractedFor = void 0),
              (this.ctx.sharedEmitDoneFor = void 0),
              it(this.ctx, a));
            let { '~standard': c, ...d } = iy(this.ctx, a);
            return d;
          }
        },
        'NEVER',
        0,
        bx,
        'TimePrecision',
        0,
        gX,
        'URL_BAD_FORMAT',
        0,
        1,
        'URL_UNPARSEABLE',
        0,
        2,
        'ZodCompileAsyncError',
        0,
        f4,
        'ZodCompileUnsupportedError',
        0,
        f5,
        '_any',
        0,
        hg,
        '_array',
        0,
        hR,
        '_base64',
        0,
        gR,
        '_base64url',
        0,
        gS,
        '_bigint',
        0,
        g9,
        '_boolean',
        0,
        g7,
        '_catch',
        0,
        h8,
        '_check',
        0,
        ii,
        '_cidrv4',
        0,
        gP,
        '_cidrv6',
        0,
        gQ,
        '_coercedBigint',
        0,
        ha,
        '_coercedBoolean',
        0,
        g8,
        '_coercedDate',
        0,
        hl,
        '_coercedNumber',
        0,
        g1,
        '_coercedString',
        0,
        gx,
        '_creditCard',
        0,
        gU,
        '_cuid',
        0,
        gH,
        '_cuid2',
        0,
        gI,
        '_custom',
        0,
        ie,
        '_date',
        0,
        hk,
        '_decode',
        0,
        b5,
        '_decodeAsync',
        0,
        b9,
        '_default',
        0,
        h5,
        '_discriminatedUnion',
        0,
        hU,
        '_e164',
        0,
        gT,
        '_email',
        0,
        gy,
        '_emoji',
        0,
        gF,
        '_encode',
        0,
        b3,
        '_encodeAsync',
        0,
        b7,
        '_endsWith',
        0,
        hH,
        '_enum',
        0,
        h$,
        '_file',
        0,
        h1,
        '_float32',
        0,
        g3,
        '_float64',
        0,
        g4,
        '_gt',
        0,
        hp,
        '_gte',
        0,
        hq,
        '_guid',
        0,
        gz,
        '_iban',
        0,
        gV,
        '_includes',
        0,
        hF,
        '_int',
        0,
        g2,
        '_int32',
        0,
        g5,
        '_int64',
        0,
        hb,
        '_intersection',
        0,
        hV,
        '_ipv4',
        0,
        gM,
        '_ipv6',
        0,
        gN,
        '_isoDate',
        0,
        gZ,
        '_isoDateTime',
        0,
        gY,
        '_isoDuration',
        0,
        g_,
        '_isoTime',
        0,
        g$,
        '_jwt',
        0,
        gW,
        '_ksuid',
        0,
        gL,
        '_lazy',
        0,
        ic,
        '_length',
        0,
        hB,
        '_literal',
        0,
        h0,
        '_lowercase',
        0,
        hD,
        '_lt',
        0,
        hn,
        '_lte',
        0,
        ho,
        '_mac',
        0,
        gO,
        '_map',
        0,
        hY,
        '_max',
        0,
        ho,
        '_maxLength',
        0,
        hz,
        '_maxSize',
        0,
        hw,
        '_mime',
        0,
        hK,
        '_min',
        0,
        hq,
        '_minLength',
        0,
        hA,
        '_minSize',
        0,
        hx,
        '_multipleOf',
        0,
        hv,
        '_nan',
        0,
        hm,
        '_nanoid',
        0,
        gG,
        '_nativeEnum',
        0,
        h_,
        '_negative',
        0,
        hs,
        '_never',
        0,
        hi,
        '_nonnegative',
        0,
        hu,
        '_nonoptional',
        0,
        h6,
        '_nonpositive',
        0,
        ht,
        '_normalize',
        0,
        hM,
        '_null',
        0,
        hf,
        '_nullable',
        0,
        h4,
        '_number',
        0,
        g0,
        '_optional',
        0,
        h3,
        '_overwrite',
        0,
        hL,
        '_parse',
        0,
        bS,
        '_parseAsync',
        0,
        bU,
        '_pipe',
        0,
        h9,
        '_positive',
        0,
        hr,
        '_promise',
        0,
        id,
        '_properties',
        0,
        hJ,
        '_property',
        0,
        hI,
        '_readonly',
        0,
        ia,
        '_record',
        0,
        hX,
        '_refine',
        0,
        ig,
        '_regex',
        0,
        hC,
        '_safeDecode',
        0,
        cd,
        '_safeDecodeAsync',
        0,
        ch,
        '_safeEncode',
        0,
        cb,
        '_safeEncodeAsync',
        0,
        cf,
        '_safeParse',
        0,
        bW,
        '_safeParseAsync',
        0,
        bZ,
        '_set',
        0,
        hZ,
        '_size',
        0,
        hy,
        '_slugify',
        0,
        hQ,
        '_startsWith',
        0,
        hG,
        '_string',
        0,
        gw,
        '_stringFormat',
        0,
        im,
        '_stringbool',
        0,
        il,
        '_success',
        0,
        h7,
        '_superRefine',
        0,
        ih,
        '_symbol',
        0,
        hd,
        '_templateLiteral',
        0,
        ib,
        '_toLowerCase',
        0,
        hO,
        '_toUpperCase',
        0,
        hP,
        '_transform',
        0,
        h2,
        '_trim',
        0,
        hN,
        '_tuple',
        0,
        hW,
        '_uint32',
        0,
        g6,
        '_uint64',
        0,
        hc,
        '_ulid',
        0,
        gJ,
        '_undefined',
        0,
        he,
        '_union',
        0,
        hS,
        '_unknown',
        0,
        hh,
        '_uppercase',
        0,
        hE,
        '_url',
        0,
        gE,
        '_uuid',
        0,
        gA,
        '_uuidv4',
        0,
        gB,
        '_uuidv6',
        0,
        gC,
        '_uuidv7',
        0,
        gD,
        '_void',
        0,
        hj,
        '_xid',
        0,
        gK,
        '_xor',
        0,
        hT,
        'base64Charset',
        0,
        eg,
        'base64urlCharset',
        0,
        ei,
        'canParseURL',
        0,
        dQ,
        'clone',
        0,
        aP,
        'compile',
        0,
        f6,
        'compileFn',
        0,
        f8,
        'config',
        0,
        bF,
        'createStandardJSONSchemaMethod',
        0,
        iA,
        'createToJSONSchemaMethod',
        0,
        iz,
        'decode',
        0,
        b6,
        'decodeAsync',
        0,
        ca,
        'describe',
        0,
        ij,
        'encode',
        0,
        b4,
        'encodeAsync',
        0,
        b8,
        'extractDefs',
        0,
        it,
        'finalize',
        0,
        iy,
        'flattenError',
        0,
        bM,
        'formatError',
        0,
        bN,
        'getDiscriminatedOption',
        0,
        eT,
        'globalConfig',
        0,
        bE,
        'globalRegistry',
        0,
        f1,
        'handleUnrepresentable',
        0,
        iq,
        'initializeContext',
        0,
        ip,
        'isBackEdge',
        0,
        fM,
        'isRecursiveSchema',
        0,
        fI,
        'isValidBase64',
        0,
        ef,
        'isValidBase64URL',
        0,
        ej,
        'isValidCIDRv6',
        0,
        ed,
        'isValidCreditCard',
        0,
        en,
        'isValidIBAN',
        0,
        ep,
        'isValidIPv6',
        0,
        d9,
        'isValidJWT',
        0,
        er,
        'locales',
        0,
        fY,
        'memoizer',
        0,
        fL,
        'mergeValues',
        0,
        eX,
        'meta',
        0,
        ik,
        'parse',
        0,
        bT,
        'parseAsync',
        0,
        bV,
        'parseURLObject',
        0,
        dS,
        'prettifyError',
        0,
        bQ,
        'process',
        0,
        ir,
        'processSchema',
        0,
        ir,
        'regexes',
        0,
        fO,
        'registry',
        0,
        f0,
        'safeDecode',
        0,
        ce,
        'safeDecodeAsync',
        0,
        ci,
        'safeEncode',
        0,
        cc,
        'safeEncodeAsync',
        0,
        cg,
        'safeParse',
        0,
        bX,
        'safeParseAsync',
        0,
        b$,
        'standardProps',
        0,
        dK,
        'stripTabAndNewline',
        0,
        dU,
        'toDotPath',
        0,
        bP,
        'toJSONSchema',
        0,
        jw,
        'toZod',
        0,
        ad,
        'treeifyError',
        0,
        bO,
        'urlHostnameOk',
        0,
        dV,
        'urlProtocolOk',
        0,
        dW,
        'util',
        0,
        fN,
        'validate',
        0,
        b1,
        'validateAsync',
        0,
        b2,
        'validateURL',
        0,
        dR,
        'version',
        0,
        dG,
        'withParser',
        0,
        f7,
      ],
      97796,
    );
    var jy = a.i(97796),
      jz = fO,
      jA = fN;
    let jB = new WeakSet([Object.prototype, Error.prototype]);
    function jC(a, b, c) {
      Object.defineProperty(a, b, {
        configurable: !0,
        enumerable: !1,
        get() {
          let a = c(this);
          return (Object.defineProperty(this, b, { value: a, configurable: !0, writable: !0 }), a);
        },
        set(a) {
          Object.defineProperty(this, b, { value: a, configurable: !0, writable: !0 });
        },
      });
    }
    let jD = (a, b) => {
        (bK.init(a, b), (a.name = 'ZodError'));
        let c = Object.getPrototypeOf(a);
        jB.has(c) ||
          (jB.add(c),
          jC(c, 'format', (a) => (b) => bN(a, b)),
          jC(c, 'flatten', (a) => (b) => bM(a, b)),
          jC(c, 'addIssue', (a) => (b) => {
            (a.issues.push(b), (a.message = JSON.stringify(a.issues, aj, 2)));
          }),
          jC(c, 'addIssues', (a) => (b) => {
            (a.issues.push(...b), (a.message = JSON.stringify(a.issues, aj, 2)));
          }),
          Object.defineProperty(c, 'isEmpty', {
            configurable: !0,
            enumerable: !1,
            get() {
              return 0 === this.issues.length;
            },
          }));
      },
      jE = bA('ZodError', jD),
      jF = bA('ZodError', jD, void 0, { Parent: Error });
    a.s(['ZodError', 0, jE, 'ZodRealError', 0, jF], 53741);
    let jG = bS(jF),
      jH = bU(jF),
      jI = bW(jF),
      jJ = bZ(jF),
      jK = b3(jF),
      jL = b5(jF),
      jM = b7(jF),
      jN = b9(jF),
      jO = cb(jF),
      jP = cd(jF),
      jQ = cf(jF),
      jR = ch(jF);
    function jS() {
      bE.memoizer || bF({ memoizer: fL() });
    }
    a.s(
      [
        'decode',
        0,
        jL,
        'decodeAsync',
        0,
        jN,
        'encode',
        0,
        jK,
        'encodeAsync',
        0,
        jM,
        'parse',
        0,
        jG,
        'parseAsync',
        0,
        jH,
        'safeDecode',
        0,
        jP,
        'safeDecodeAsync',
        0,
        jR,
        'safeEncode',
        0,
        jO,
        'safeEncodeAsync',
        0,
        jQ,
        'safeParse',
        0,
        jI,
        'safeParseAsync',
        0,
        jJ,
      ],
      57186,
    );
    let jT = bA(
        'ZodType',
        (a, b) => (bE.localeError || bF(fQ()), dH.init(a, b), (a.def = b), (a.type = b.type), a),
        {
          check(...a) {
            let b = this.def;
            return this.clone(
              jA.mergeDefs(b, {
                checks: [
                  ...(b.checks ?? []),
                  ...a.map((a) =>
                    'function' == typeof a
                      ? { _zod: { check: a, def: { check: 'custom' }, onattach: [] } }
                      : a,
                  ),
                ],
              }),
              { parent: !0 },
            );
          },
          with(...a) {
            return this.check(...a);
          },
          clone(a, b) {
            return aP(this, a, b);
          },
          brand() {
            return this;
          },
          register(a, b) {
            return (a.add(this, b), this);
          },
          refine(a, b) {
            return this.check(mt(a, b));
          },
          superRefine(a, b) {
            return this.check(mu(a, b));
          },
          overwrite(a) {
            return this.check(hL(a));
          },
          optional() {
            return lU(this);
          },
          exactOptional() {
            return lW(this);
          },
          nullable() {
            return lY(this);
          },
          nullish() {
            return lU(lY(this));
          },
          nonoptional(a) {
            return l3(this, a);
          },
          array() {
            return lm(this);
          },
          or(a) {
            return lt([this, a]);
          },
          and(a) {
            return lz(this, a);
          },
          transform(a) {
            return mb(this, lS(a));
          },
          default(a) {
            return l_(this, a);
          },
          prefault(a) {
            return l1(this, a);
          },
          catch(a) {
            return l7(this, a);
          },
          pipe(a) {
            return mb(this, a);
          },
          readonly() {
            return mh(this);
          },
          describe(a) {
            let b = this.clone();
            return (f1.add(b, { description: a }), b);
          },
          meta(...a) {
            if (0 === a.length) return f1.get(this);
            let b = this.clone();
            return (f1.add(b, a[0]), b);
          },
          isOptional() {
            return this.safeParse(void 0).success;
          },
          isNullable() {
            return this.safeParse(null).success;
          },
          apply(a, ...b) {
            return 0 === b.length ? a(this) : a(this, ...b);
          },
          get '~standard'() {
            return jA.hide(this, '~standard', {
              ...dK(this),
              jsonSchema: { input: iA(this, 'input'), output: iA(this, 'output') },
            });
          },
          set '~standard'(value) {
            jA.own(this, '~standard', value);
          },
          parse: function a(b, c) {
            return jG(this, b, c, { callee: a });
          },
          parseAsync: async function a(b, c) {
            return await jH(this, b, c, { callee: a });
          },
          safeParse(a, b) {
            return jI(this, a, b);
          },
          async safeParseAsync(a, b) {
            return jJ(this, a, b);
          },
          get spa() {
            return this?.safeParseAsync;
          },
          set spa(value) {
            jA.own(this, 'spa', value);
          },
          validate(a, b) {
            return b1(this, a, b);
          },
          validateAsync(a, b) {
            return b2(this, a, b);
          },
          encode: function a(b, c) {
            return jK(this, b, c, { callee: a });
          },
          decode: function a(b, c) {
            return jL(this, b, c, { callee: a });
          },
          encodeAsync: async function a(b, c) {
            return await jM(this, b, c, { callee: a });
          },
          decodeAsync: async function a(b, c) {
            return await jN(this, b, c, { callee: a });
          },
          safeEncode(a, b) {
            return jO(this, a, b);
          },
          safeDecode(a, b) {
            return jP(this, a, b);
          },
          async safeEncodeAsync(a, b) {
            return jQ(this, a, b);
          },
          async safeDecodeAsync(a, b) {
            return jR(this, a, b);
          },
          toJSONSchema(a) {
            return iz(this, {})(a);
          },
          get description() {
            return f1.get(this)?.description;
          },
          get _def() {
            return this._zod.def;
          },
        },
      ),
      jU = bA(
        '_ZodString',
        (a, b) => {
          (dL.init(a, b), jT.init(a, b), (a._zod.processJSONSchema = (b, c, d) => iQ(a, b, c, d)));
        },
        jA.derived(
          {
            format: (a) => iM(a).format ?? null,
            minLength: (a) => iM(a).minimum ?? null,
            maxLength: (a) => iM(a).maximum ?? null,
          },
          {
            regex(...a) {
              return this.check(hC(...a));
            },
            includes(...a) {
              return this.check(hF(...a));
            },
            startsWith(...a) {
              return this.check(hG(...a));
            },
            endsWith(...a) {
              return this.check(hH(...a));
            },
            min(...a) {
              return this.check(hA(...a));
            },
            max(...a) {
              return this.check(hz(...a));
            },
            length(...a) {
              return this.check(hB(...a));
            },
            nonempty(...a) {
              return this.check(hA(1, ...a));
            },
            lowercase(a) {
              return this.check(hD(a));
            },
            uppercase(a) {
              return this.check(hE(a));
            },
            trim() {
              return this.check(hN());
            },
            normalize(...a) {
              return this.check(hM(...a));
            },
            toLowerCase() {
              return this.check(hO());
            },
            toUpperCase() {
              return this.check(hP());
            },
            slugify() {
              return this.check(hQ());
            },
          },
        ),
      ),
      jV = bA(
        'ZodString',
        (a, b) => {
          (dL.init(a, b), jU.init(a, b));
        },
        {
          email(a) {
            return this.check(gy(j0, a));
          },
          url(a) {
            return this.check(gE(j9, a));
          },
          jwt(a) {
            return this.check(gW(kK, a));
          },
          emoji(a) {
            return this.check(gF(kc, a));
          },
          guid(a) {
            return this.check(gz(j2, a));
          },
          uuid(a) {
            return this.check(gA(j4, a));
          },
          uuidv4(a) {
            return this.check(gB(j4, a));
          },
          uuidv6(a) {
            return this.check(gC(j4, a));
          },
          uuidv7(a) {
            return this.check(gD(j4, a));
          },
          nanoid(a) {
            return this.check(gG(ke, a));
          },
          cuid(a) {
            return this.check(gH(kg, a));
          },
          cuid2(a) {
            return this.check(gI(ki, a));
          },
          ulid(a) {
            return this.check(gJ(kk, a));
          },
          base64(a) {
            return this.check(gR(kA, a));
          },
          base64url(a) {
            return this.check(gS(kC, a));
          },
          xid(a) {
            return this.check(gK(km, a));
          },
          ksuid(a) {
            return this.check(gL(ko, a));
          },
          ipv4(a) {
            return this.check(gM(kq, a));
          },
          ipv6(a) {
            return this.check(gN(ku, a));
          },
          cidrv4(a) {
            return this.check(gP(kw, a));
          },
          cidrv6(a) {
            return this.check(gQ(ky, a));
          },
          e164(a) {
            return this.check(gT(kE, a));
          },
          datetime(a) {
            return this.check(gY(jY, a));
          },
          date(a) {
            return this.check(gZ(jZ, a));
          },
          time(a) {
            return this.check(g$(j$, a));
          },
          duration(a) {
            return this.check(g_(j_, a));
          },
        },
      );
    function jW(a) {
      return gw(jV, a);
    }
    let jX = bA('ZodStringFormat', (a, b) => {
        (dM.init(a, b), jU.init(a, b));
      }),
      jY = bA('ZodISODateTime', (a, b) => {
        (d3.init(a, b), jX.init(a, b));
      }),
      jZ = bA('ZodISODate', (a, b) => {
        (d4.init(a, b), jX.init(a, b));
      }),
      j$ = bA('ZodISOTime', (a, b) => {
        (d5.init(a, b), jX.init(a, b));
      }),
      j_ = bA('ZodISODuration', (a, b) => {
        (d6.init(a, b), jX.init(a, b));
      }),
      j0 = bA('ZodEmail', (a, b) => {
        (dP.init(a, b), jX.init(a, b));
      });
    function j1(a) {
      return gy(j0, a);
    }
    let j2 = bA('ZodGUID', (a, b) => {
      (dN.init(a, b), jX.init(a, b));
    });
    function j3(a) {
      return gz(j2, a);
    }
    let j4 = bA('ZodUUID', (a, b) => {
      (dO.init(a, b), jX.init(a, b));
    });
    function j5(a) {
      return gA(j4, a);
    }
    function j6(a) {
      return gB(j4, a);
    }
    function j7(a) {
      return gC(j4, a);
    }
    function j8(a) {
      return gD(j4, a);
    }
    let j9 = bA('ZodURL', (a, b) => {
      (dX.init(a, b), jX.init(a, b));
    });
    function ka(a) {
      return gE(j9, a);
    }
    function kb(a) {
      return gE(j9, { protocol: cI, hostname: cH, ...jA.normalizeParams(a) });
    }
    let kc = bA('ZodEmoji', (a, b) => {
      (dY.init(a, b), jX.init(a, b));
    });
    function kd(a) {
      return gF(kc, a);
    }
    let ke = bA('ZodNanoID', (a, b) => {
      (dZ.init(a, b), jX.init(a, b));
    });
    function kf(a) {
      return gG(ke, a);
    }
    let kg = bA('ZodCUID', (a, b) => {
      (d$.init(a, b), jX.init(a, b));
    });
    function kh(a) {
      return gH(kg, a);
    }
    let ki = bA('ZodCUID2', (a, b) => {
      (d_.init(a, b), jX.init(a, b));
    });
    function kj(a) {
      return gI(ki, a);
    }
    let kk = bA('ZodULID', (a, b) => {
      (d0.init(a, b), jX.init(a, b));
    });
    function kl(a) {
      return gJ(kk, a);
    }
    let km = bA('ZodXID', (a, b) => {
      (d1.init(a, b), jX.init(a, b));
    });
    function kn(a) {
      return gK(km, a);
    }
    let ko = bA('ZodKSUID', (a, b) => {
      (d2.init(a, b), jX.init(a, b));
    });
    function kp(a) {
      return gL(ko, a);
    }
    let kq = bA('ZodIPv4', (a, b) => {
      (d7.init(a, b), jX.init(a, b));
    });
    function kr(a) {
      return gM(kq, a);
    }
    let ks = bA('ZodMAC', (a, b) => {
      (eb.init(a, b), jX.init(a, b));
    });
    function kt(a) {
      return gO(ks, a);
    }
    let ku = bA('ZodIPv6', (a, b) => {
      (ea.init(a, b), jX.init(a, b));
    });
    function kv(a) {
      return gN(ku, a);
    }
    let kw = bA('ZodCIDRv4', (a, b) => {
      (ec.init(a, b), jX.init(a, b));
    });
    function kx(a) {
      return gP(kw, a);
    }
    let ky = bA('ZodCIDRv6', (a, b) => {
      (ee.init(a, b), jX.init(a, b));
    });
    function kz(a) {
      return gQ(ky, a);
    }
    let kA = bA('ZodBase64', (a, b) => {
      (eh.init(a, b), jX.init(a, b));
    });
    function kB(a) {
      return gR(kA, a);
    }
    let kC = bA('ZodBase64URL', (a, b) => {
      (ek.init(a, b), jX.init(a, b));
    });
    function kD(a) {
      return gS(kC, a);
    }
    let kE = bA('ZodE164', (a, b) => {
      (el.init(a, b), jX.init(a, b));
    });
    function kF(a) {
      return gT(kE, a);
    }
    let kG = bA('ZodCreditCard', (a, b) => {
      (eo.init(a, b), jX.init(a, b));
    });
    function kH(a) {
      return gU(kG, a);
    }
    let kI = bA('ZodIBAN', (a, b) => {
      (eq.init(a, b), jX.init(a, b));
    });
    function kJ(a) {
      return gV(kI, a);
    }
    let kK = bA('ZodJWT', (a, b) => {
      (es.init(a, b), jX.init(a, b));
    });
    function kL(a) {
      return gW(kK, a);
    }
    let kM = bA('ZodCustomStringFormat', (a, b) => {
      (et.init(a, b), jX.init(a, b));
    });
    function kN(a, b, c = {}) {
      return im(kM, a, b, c);
    }
    function kO(a) {
      return im(kM, 'hostname', cG, a);
    }
    function kP(a) {
      return im(kM, 'hex', c0, a);
    }
    function kQ(a) {
      return im(kM, 'currency_code', cL, a);
    }
    function kR(a, b) {
      let c = b?.enc ?? 'hex',
        d = `${a}_${c}`,
        f = jz[d];
      if (!f) throw Error(`Unrecognized hash format: ${d}`);
      return im(kM, d, f, b);
    }
    let kS = bA(
      'ZodNumber',
      (a, b) => {
        (eu.init(a, b),
          jT.init(a, b),
          (a._zod.processJSONSchema = (b, c, d) => iR(a, b, c, d)),
          (a.isFinite = !0));
      },
      jA.derived(
        {
          minValue: (a) => {
            let { minimum: b, exclusiveMinimum: c } = iM(a);
            return Math.max(b ?? -1 / 0, c ?? -1 / 0);
          },
          maxValue: (a) => {
            let { maximum: b, exclusiveMaximum: c } = iM(a);
            return Math.min(b ?? 1 / 0, c ?? 1 / 0);
          },
          isInt: (a) => {
            let { isInt: b, multipleOf: c } = iM(a);
            return !!b || !!c?.some(Number.isSafeInteger);
          },
          format: (a) => iM(a).format ?? null,
        },
        {
          gt(a, b) {
            return this.check(hp(a, b));
          },
          gte(a, b) {
            return this.check(hq(a, b));
          },
          min(a, b) {
            return this.check(hq(a, b));
          },
          lt(a, b) {
            return this.check(hn(a, b));
          },
          lte(a, b) {
            return this.check(ho(a, b));
          },
          max(a, b) {
            return this.check(ho(a, b));
          },
          int(a) {
            return this.check(kV(a));
          },
          safe(a) {
            return this.check(kV(a));
          },
          positive(a) {
            return this.check(hp(0, a));
          },
          nonnegative(a) {
            return this.check(hq(0, a));
          },
          negative(a) {
            return this.check(hn(0, a));
          },
          nonpositive(a) {
            return this.check(ho(0, a));
          },
          multipleOf(a, b) {
            return this.check(hv(a, b));
          },
          step(a, b) {
            return this.check(hv(a, b));
          },
          finite() {
            return this;
          },
        },
      ),
    );
    function kT(a) {
      return g0(kS, a);
    }
    let kU = bA('ZodNumberFormat', (a, b) => {
      (ev.init(a, b), kS.init(a, b));
    });
    function kV(a) {
      return g2(kU, a);
    }
    function kW(a) {
      return g3(kU, a);
    }
    function kX(a) {
      return g4(kU, a);
    }
    function kY(a) {
      return g5(kU, a);
    }
    function kZ(a) {
      return g6(kU, a);
    }
    let k$ = bA('ZodBoolean', (a, b) => {
      (ew.init(a, b), jT.init(a, b), (a._zod.processJSONSchema = (b, c, d) => iS(a, b, c, d)));
    });
    function k_(a) {
      return g7(k$, a);
    }
    let k0 = bA(
      'ZodBigInt',
      (a, b) => {
        (ex.init(a, b), jT.init(a, b), (a._zod.processJSONSchema = (b, c, d) => iT(a, b, c, d)));
      },
      jA.derived(
        {
          minValue: (a) => iM(a).minimum ?? null,
          maxValue: (a) => iM(a).maximum ?? null,
          format: (a) => iM(a).format ?? null,
        },
        {
          gte(a, b) {
            return this.check(hq(a, b));
          },
          min(a, b) {
            return this.check(hq(a, b));
          },
          gt(a, b) {
            return this.check(hp(a, b));
          },
          lt(a, b) {
            return this.check(hn(a, b));
          },
          lte(a, b) {
            return this.check(ho(a, b));
          },
          max(a, b) {
            return this.check(ho(a, b));
          },
          positive(a) {
            return this.check(hp(BigInt(0), a));
          },
          negative(a) {
            return this.check(hn(BigInt(0), a));
          },
          nonpositive(a) {
            return this.check(ho(BigInt(0), a));
          },
          nonnegative(a) {
            return this.check(hq(BigInt(0), a));
          },
          multipleOf(a, b) {
            return this.check(hv(a, b));
          },
        },
      ),
    );
    function k1(a) {
      return g9(k0, a);
    }
    let k2 = bA('ZodBigIntFormat', (a, b) => {
      (ey.init(a, b), k0.init(a, b));
    });
    function k3(a) {
      return hb(k2, a);
    }
    function k4(a) {
      return hc(k2, a);
    }
    let k5 = bA('ZodSymbol', (a, b) => {
      (ez.init(a, b), jT.init(a, b), (a._zod.processJSONSchema = (b, c, d) => iU(a, b, c, d)));
    });
    function k6(a) {
      return hd(k5, a);
    }
    let k7 = bA('ZodUndefined', (a, b) => {
      (eA.init(a, b), jT.init(a, b), (a._zod.processJSONSchema = (b, c, d) => iW(a, b, c, d)));
    });
    function k8(a) {
      return he(k7, a);
    }
    let k9 = bA('ZodNull', (a, b) => {
      (eB.init(a, b), jT.init(a, b), (a._zod.processJSONSchema = (b, c, d) => iV(a, b, c, d)));
    });
    function la(a) {
      return hf(k9, a);
    }
    let lb = bA('ZodAny', (a, b) => {
      (eC.init(a, b), jT.init(a, b), (a._zod.processJSONSchema = (b, c, d) => iZ(a, b, c, d)));
    });
    function lc() {
      return hg(lb);
    }
    let ld = bA('ZodUnknown', (a, b) => {
      (eD.init(a, b), jT.init(a, b), (a._zod.processJSONSchema = (b, c, d) => i$(a, b, c, d)));
    });
    function le() {
      return hh(ld);
    }
    let lf = bA('ZodNever', (a, b) => {
      (eE.init(a, b), jT.init(a, b), (a._zod.processJSONSchema = (b, c, d) => iY(a, b, c, d)));
    });
    function lg(a) {
      return hi(lf, a);
    }
    let lh = bA('ZodVoid', (a, b) => {
      (eF.init(a, b), jT.init(a, b), (a._zod.processJSONSchema = (b, c, d) => iX(a, b, c, d)));
    });
    function li(a) {
      return hj(lh, a);
    }
    let lj = bA(
      'ZodDate',
      (a, b) => {
        (eG.init(a, b),
          jT.init(a, b),
          (a._zod.processJSONSchema = (b, c, d) => i_(a, b, c, d)),
          (a.min = (b, c) => a.check(hq(b, c))),
          (a.max = (b, c) => a.check(ho(b, c))));
      },
      jA.derived(
        {
          minDate: (a) => {
            let { minimum: b } = iM(a);
            return b ? new Date(b) : null;
          },
          maxDate: (a) => {
            let { maximum: b } = iM(a);
            return b ? new Date(b) : null;
          },
        },
        {},
      ),
    );
    function lk(a) {
      return hk(lj, a);
    }
    let ll = bA(
      'ZodArray',
      (a, b) => {
        (jS(),
          eI.init(a, b),
          jT.init(a, b),
          (a._zod.processJSONSchema = (b, c, d) => jb(a, b, c, d)),
          (a.element = b.element));
      },
      {
        min(a, b) {
          return this.check(hA(a, b));
        },
        nonempty(a) {
          return this.check(hA(1, a));
        },
        max(a, b) {
          return this.check(hz(a, b));
        },
        length(a, b) {
          return this.check(hB(a, b));
        },
        unwrap() {
          return this.element;
        },
      },
    );
    function lm(a, b) {
      return hR(ll, a, b);
    }
    function ln(a) {
      return lL(Object.keys(a._zod.def.shape));
    }
    let lo = bA(
      'ZodObject',
      (a, b) => {
        (jS(),
          eO.init(a, b),
          jT.init(a, b),
          (a._zod.processJSONSchema = (b, c, d) => jd(a, b, c, d)),
          jA.installLazyProp(a, 'shape', (a) => a._zod.def.shape, !1));
      },
      {
        keyof() {
          return lL(Object.keys(this._zod.def.shape));
        },
        catchall(a) {
          return this.clone(jA.mergeDefs(this._zod.def, { catchall: a }));
        },
        passthrough() {
          return this.clone(jA.mergeDefs(this._zod.def, { catchall: le() }));
        },
        loose() {
          return this.clone(jA.mergeDefs(this._zod.def, { catchall: le() }));
        },
        strict() {
          return this.clone(jA.mergeDefs(this._zod.def, { catchall: lg() }));
        },
        strip() {
          return this.clone(jA.mergeDefs(this._zod.def, { catchall: void 0 }));
        },
        extend(a) {
          return jA.extend(this, a);
        },
        safeExtend(a) {
          return jA.safeExtend(this, a);
        },
        merge(a) {
          return jA.merge(this, a);
        },
        pick(a) {
          return jA.pick(this, a);
        },
        omit(a) {
          return jA.omit(this, a);
        },
        partial(...a) {
          return jA.partial(lT, this, a[0]);
        },
        exactPartial(...a) {
          return jA.partial(lV, this, a[0], 'exactPartial');
        },
        required(...a) {
          return jA.required(l2, this, a[0]);
        },
      },
    );
    function lp(a, b) {
      return new lo({ type: 'object', shape: a ?? {}, ...jA.normalizeParams(b) });
    }
    function lq(a, b) {
      return new lo({ type: 'object', shape: a, catchall: lg(), ...jA.normalizeParams(b) });
    }
    function lr(a, b) {
      return new lo({ type: 'object', shape: a, catchall: le(), ...jA.normalizeParams(b) });
    }
    let ls = bA('ZodUnion', (a, b) => {
      (eQ.init(a, b),
        jT.init(a, b),
        (a._zod.processJSONSchema = (b, c, d) => je(a, b, c, d)),
        (a.options = b.options));
    });
    function lt(a, b) {
      return new ls({ type: 'union', options: a, ...jA.normalizeParams(b) });
    }
    let lu = bA('ZodXor', (a, b) => {
      (ls.init(a, b),
        eS.init(a, b),
        (a._zod.processJSONSchema = (b, c, d) => je(a, b, c, d)),
        (a.options = b.options));
    });
    function lv(a, b) {
      return new lu({ type: 'union', options: a, inclusive: !1, ...jA.normalizeParams(b) });
    }
    let lw = bA('ZodDiscriminatedUnion', (a, b) => {
      (ls.init(a, b), eV.init(a, b));
    });
    function lx(a, b, c) {
      return new lw({ type: 'union', options: b, discriminator: a, ...jA.normalizeParams(c) });
    }
    let ly = bA('ZodIntersection', (a, b) => {
      (eW.init(a, b), jT.init(a, b), (a._zod.processJSONSchema = (b, c, d) => jf(a, b, c, d)));
    });
    function lz(a, b) {
      return new ly({ type: 'intersection', left: a, right: b });
    }
    let lA = bA(
      'ZodTuple',
      (a, b) => {
        (jS(),
          eZ.init(a, b),
          jT.init(a, b),
          (a._zod.processJSONSchema = (b, c, d) => jg(a, b, c, d)));
      },
      {
        rest(a) {
          return this.clone({ ...this._zod.def, rest: a });
        },
        partial() {
          let a = this._zod.def;
          if (a.checks?.length)
            throw Error('.partial() cannot be used on tuple schemas containing refinements');
          return this.clone({
            ...a,
            items: a.items.map((a) => new lT({ type: 'optional', innerType: a })),
          });
        },
      },
    );
    function lB(a, b, c) {
      let d = b instanceof dH,
        f = d ? c : b;
      return new lA({ type: 'tuple', items: a, rest: d ? b : null, ...jA.normalizeParams(f) });
    }
    let lC = bA('ZodRecord', (a, b) => {
      (jS(),
        e1.init(a, b),
        jT.init(a, b),
        (a._zod.processJSONSchema = (b, c, d) => ji(a, b, c, d)),
        (a.keyType = b.keyType),
        (a.valueType = b.valueType));
    });
    function lD(a, b, c) {
      return new lC(
        b && b._zod
          ? { type: 'record', keyType: a, valueType: b, ...jA.normalizeParams(c) }
          : { type: 'record', keyType: jW(), valueType: a, ...jA.normalizeParams(b) },
      );
    }
    function lE(a, b, c) {
      return new lC({
        type: 'record',
        keyType: a,
        valueType: b,
        ...jA.normalizeParams(c),
        partial: !0,
      });
    }
    function lF(a, b, c) {
      return new lC({
        type: 'record',
        keyType: a,
        valueType: b,
        mode: 'loose',
        ...jA.normalizeParams(c),
      });
    }
    let lG = bA('ZodMap', (a, b) => {
      (jS(),
        e2.init(a, b),
        jT.init(a, b),
        (a._zod.processJSONSchema = (b, c, d) => i9(a, b, c, d)),
        (a.keyType = b.keyType),
        (a.valueType = b.valueType),
        (a.min = (...b) => a.check(hx(...b))),
        (a.nonempty = (b) => a.check(hx(1, b))),
        (a.max = (...b) => a.check(hw(...b))),
        (a.size = (...b) => a.check(hy(...b))));
    });
    function lH(a, b, c) {
      return new lG({ type: 'map', keyType: a, valueType: b, ...jA.normalizeParams(c) });
    }
    let lI = bA('ZodSet', (a, b) => {
      (jS(),
        e4.init(a, b),
        jT.init(a, b),
        (a._zod.processJSONSchema = (b, c, d) => ja(a, b, c, d)),
        (a.min = (...b) => a.check(hx(...b))),
        (a.nonempty = (b) => a.check(hx(1, b))),
        (a.max = (...b) => a.check(hw(...b))),
        (a.size = (...b) => a.check(hy(...b))));
    });
    function lJ(a, b) {
      return new lI({ type: 'set', valueType: a, ...jA.normalizeParams(b) });
    }
    let lK = bA('ZodEnum', (a, b) => {
      (e6.init(a, b),
        jT.init(a, b),
        (a._zod.processJSONSchema = (b, c, d) => i0(a, b, c, d)),
        (a.enum = b.entries),
        (a.options = [...a._zod.values]));
      let c = new Set(Object.keys(b.entries));
      ((a.extract = (a, d) => {
        let f = {};
        for (let d of a)
          if (c.has(d)) f[d] = b.entries[d];
          else throw Error(`Key ${d} not found in enum`);
        return new lK({ ...b, checks: [], ...jA.normalizeParams(d), entries: f });
      }),
        (a.exclude = (a, d) => {
          let f = { ...b.entries };
          for (let b of a)
            if (c.has(b)) delete f[b];
            else throw Error(`Key ${b} not found in enum`);
          return new lK({ ...b, checks: [], ...jA.normalizeParams(d), entries: f });
        }));
    });
    function lL(a, b) {
      return new lK({
        type: 'enum',
        entries: Array.isArray(a) ? Object.fromEntries(a.map((a) => [a, a])) : a,
        ...jA.normalizeParams(b),
      });
    }
    function lM(a, b) {
      return new lK({ type: 'enum', entries: a, ...jA.normalizeParams(b) });
    }
    let lN = bA('ZodLiteral', (a, b) => {
      (e7.init(a, b),
        jT.init(a, b),
        (a._zod.processJSONSchema = (b, c, d) => i1(a, b, c, d)),
        (a.values = new Set(b.values)),
        Object.defineProperty(a, 'value', {
          get() {
            if (b.values.length > 1)
              throw Error(
                'This schema contains multiple valid literal values. Use `.values` instead.',
              );
            return b.values[0];
          },
        }));
    });
    function lO(a, b) {
      return new lN({
        type: 'literal',
        values: Array.isArray(a) ? a : [a],
        ...jA.normalizeParams(b),
      });
    }
    let lP = bA('ZodFile', (a, b) => {
      (e8.init(a, b),
        jT.init(a, b),
        (a._zod.processJSONSchema = (b, c, d) => i4(a, b, c, d)),
        (a.min = (b, c) => a.check(hx(b, c))),
        (a.max = (b, c) => a.check(hw(b, c))),
        (a.mime = (b, c) => a.check(hK(Array.isArray(b) ? b : [b], c))));
    });
    function lQ(a) {
      return h1(lP, a);
    }
    let lR = bA('ZodTransform', (a, b) => {
      (jS(),
        e9.init(a, b),
        jT.init(a, b),
        (a._zod.processJSONSchema = (b, c, d) => i8(a, b, c, d)),
        (a._zod.parse = (c, d) => {
          if ('backward' === d.direction) throw new bD(a.constructor.name);
          c.addIssue = (d) => {
            'string' == typeof d
              ? c.issues.push(jA.issue(d, c.value, b))
              : (d.fatal && (d.continue = !1),
                d.code ?? (d.code = 'custom'),
                'input' in d || (d.input = c.value),
                d.inst ?? (d.inst = a),
                c.issues.push(jA.issue(d)));
          };
          let f = b.transform(c.value, c);
          return f instanceof Promise ? f.then((a) => ((c.value = a), c)) : ((c.value = f), c);
        }));
    });
    function lS(a) {
      return new lR({ type: 'transform', transform: a });
    }
    let lT = bA('ZodOptional', (a, b) => {
      (fb.init(a, b),
        jT.init(a, b),
        (a._zod.processJSONSchema = (b, c, d) => jt(a, b, c, d)),
        (a.unwrap = () => a._zod.def.innerType));
    });
    function lU(a) {
      return new lT({ type: 'optional', innerType: a });
    }
    let lV = bA('ZodExactOptional', (a, b) => {
      (fc.init(a, b),
        jT.init(a, b),
        (a._zod.processJSONSchema = (b, c, d) => jt(a, b, c, d)),
        (a.unwrap = () => a._zod.def.innerType));
    });
    function lW(a) {
      return new lV({ type: 'optional', innerType: a });
    }
    let lX = bA('ZodNullable', (a, b) => {
      (fd.init(a, b),
        jT.init(a, b),
        (a._zod.processJSONSchema = (b, c, d) => jj(a, b, c, d)),
        (a.unwrap = () => a._zod.def.innerType));
    });
    function lY(a) {
      return new lX({ type: 'nullable', innerType: a });
    }
    function lZ(a) {
      return lU(lY(a));
    }
    let l$ = bA('ZodDefault', (a, b) => {
      (fe.init(a, b),
        jT.init(a, b),
        (a._zod.processJSONSchema = (b, c, d) => jn(a, b, c, d)),
        (a.unwrap = () => a._zod.def.innerType),
        (a.removeDefault = a.unwrap));
    });
    function l_(a, b) {
      return new l$({
        type: 'default',
        innerType: a,
        get defaultValue() {
          return 'function' == typeof b ? b() : jA.shallowClone(b);
        },
      });
    }
    let l0 = bA('ZodPrefault', (a, b) => {
      (fg.init(a, b),
        jT.init(a, b),
        (a._zod.processJSONSchema = (b, c, d) => jo(a, b, c, d)),
        (a.unwrap = () => a._zod.def.innerType));
    });
    function l1(a, b) {
      return new l0({
        type: 'prefault',
        innerType: a,
        get defaultValue() {
          return 'function' == typeof b ? b() : jA.shallowClone(b);
        },
      });
    }
    let l2 = bA('ZodNonOptional', (a, b) => {
      (fh.init(a, b),
        jT.init(a, b),
        (a._zod.processJSONSchema = (b, c, d) => jk(a, b, c, d)),
        (a.unwrap = () => a._zod.def.innerType));
    });
    function l3(a, b) {
      return new l2({ type: 'nonoptional', innerType: a, ...jA.normalizeParams(b) });
    }
    let l4 = bA('ZodSuccess', (a, b) => {
      (fj.init(a, b),
        jT.init(a, b),
        (a._zod.processJSONSchema = (b, c, d) => i5(a, b, c, d)),
        (a.unwrap = () => a._zod.def.innerType));
    });
    function l5(a) {
      return new l4({ type: 'success', innerType: a });
    }
    let l6 = bA('ZodCatch', (a, b) => {
      (fl.init(a, b),
        jT.init(a, b),
        (a._zod.processJSONSchema = (b, c, d) => jp(a, b, c, d)),
        (a.unwrap = () => a._zod.def.innerType),
        (a.removeCatch = a.unwrap));
    });
    function l7(a, b) {
      return new l6({
        type: 'catch',
        innerType: a,
        catchValue: 'function' == typeof b ? b : jA.constantCatch(b),
      });
    }
    let l8 = bA('ZodNaN', (a, b) => {
      (fm.init(a, b), jT.init(a, b), (a._zod.processJSONSchema = (b, c, d) => i2(a, b, c, d)));
    });
    function l9(a) {
      return hm(l8, a);
    }
    let ma = bA('ZodPipe', (a, b) => {
      (fn.init(a, b),
        jT.init(a, b),
        (a._zod.processJSONSchema = (b, c, d) => jq(a, b, c, d)),
        (a.in = b.in),
        (a.out = b.out));
    });
    function mb(a, b) {
      return new ma({ type: 'pipe', in: a, out: b });
    }
    let mc = bA('ZodCodec', (a, b) => {
      (ma.init(a, b), fp.init(a, b));
    });
    function md(a, b, c) {
      return new mc({
        type: 'pipe',
        in: a,
        out: b,
        transform: c.decode,
        reverseTransform: c.encode,
      });
    }
    function me(a) {
      let b = a._zod.def;
      return new mc({
        type: 'pipe',
        in: b.out,
        out: b.in,
        transform: b.reverseTransform,
        reverseTransform: b.transform,
      });
    }
    let mf = bA('ZodPreprocess', (a, b) => {
        (ma.init(a, b), fs.init(a, b));
      }),
      mg = bA('ZodReadonly', (a, b) => {
        (ft.init(a, b),
          jT.init(a, b),
          (a._zod.processJSONSchema = (b, c, d) => jr(a, b, c, d)),
          (a.unwrap = () => a._zod.def.innerType));
      });
    function mh(a) {
      return new mg({ type: 'readonly', innerType: a });
    }
    let mi = bA('ZodTemplateLiteral', (a, b) => {
      (fv.init(a, b), jT.init(a, b), (a._zod.processJSONSchema = (b, c, d) => i3(a, b, c, d)));
    });
    function mj(a, b) {
      return new mi({ type: 'template_literal', parts: a, ...jA.normalizeParams(b) });
    }
    let mk = bA('ZodLazy', (a, b) => {
      (fy.init(a, b),
        jT.init(a, b),
        (a._zod.processJSONSchema = (b, c, d) => ju(a, b, c, d)),
        (a.unwrap = () => a._zod.def.getter()));
    });
    function ml(a) {
      return new mk({ type: 'lazy', getter: a });
    }
    let mm = bA('ZodPromise', (a, b) => {
      (fx.init(a, b),
        jT.init(a, b),
        (a._zod.processJSONSchema = (b, c, d) => js(a, b, c, d)),
        (a.unwrap = () => a._zod.def.innerType));
    });
    function mn(a) {
      return new mm({ type: 'promise', innerType: a });
    }
    let mo = bA('ZodFunction', (a, b) => {
      (fw.init(a, b), jT.init(a, b), (a._zod.processJSONSchema = (b, c, d) => i7(a, b, c, d)));
    });
    function mp(a) {
      return new mo({
        type: 'function',
        input: Array.isArray(a?.input) ? lB(a?.input) : (a?.input ?? lm(le())),
        output: a?.output ?? le(),
      });
    }
    let mq = bA('ZodCustom', (a, b) => {
      (fz.init(a, b), jT.init(a, b), (a._zod.processJSONSchema = (b, c, d) => i6(a, b, c, d)));
    });
    function mr(a) {
      let b = new dd({ check: 'custom' });
      return ((b._zod.check = a), b);
    }
    function ms(a, b) {
      return ie(mq, a ?? (() => !0), b);
    }
    function mt(a, b = {}) {
      return ig(mq, a, b);
    }
    function mu(a, b) {
      return ih(a, b);
    }
    let mv = bA(
      'ZodInstanceOf',
      (a, b) => {
        mq.init(a, b);
      },
      {
        properties(a, b) {
          return this.check(hJ(a, b));
        },
      },
    );
    function mw(a, b = {}) {
      let c = new mv({
        type: 'custom',
        check: 'custom',
        fn: (b) => b instanceof a,
        abort: !0,
        ...jA.normalizeParams(b),
      });
      return (
        (c._zod.bag.Class = a),
        (c._zod.check = (b) => {
          b.value instanceof a ||
            b.issues.push({
              code: 'invalid_type',
              expected: a.name,
              input: b.value,
              inst: c,
              path: [...(c._zod.def.path ?? [])],
            });
        }),
        c
      );
    }
    let mx = (...a) => il({ Codec: mc, Boolean: k$, String: jV }, ...a);
    function my(a) {
      let b = ml(() => lt([jW(a), kT(), k_(), la(), lm(b), lD(jW(), b)]));
      return b;
    }
    function mz(a, b) {
      return new mf({ type: 'pipe', in: lS(a), out: b });
    }
    a.s(
      [
        'ZodAny',
        0,
        lb,
        'ZodArray',
        0,
        ll,
        'ZodBase64',
        0,
        kA,
        'ZodBase64URL',
        0,
        kC,
        'ZodBigInt',
        0,
        k0,
        'ZodBigIntFormat',
        0,
        k2,
        'ZodBoolean',
        0,
        k$,
        'ZodCIDRv4',
        0,
        kw,
        'ZodCIDRv6',
        0,
        ky,
        'ZodCUID',
        0,
        kg,
        'ZodCUID2',
        0,
        ki,
        'ZodCatch',
        0,
        l6,
        'ZodCodec',
        0,
        mc,
        'ZodCreditCard',
        0,
        kG,
        'ZodCustom',
        0,
        mq,
        'ZodCustomStringFormat',
        0,
        kM,
        'ZodDate',
        0,
        lj,
        'ZodDefault',
        0,
        l$,
        'ZodDiscriminatedUnion',
        0,
        lw,
        'ZodE164',
        0,
        kE,
        'ZodEmail',
        0,
        j0,
        'ZodEmoji',
        0,
        kc,
        'ZodEnum',
        0,
        lK,
        'ZodExactOptional',
        0,
        lV,
        'ZodFile',
        0,
        lP,
        'ZodFunction',
        0,
        mo,
        'ZodGUID',
        0,
        j2,
        'ZodIBAN',
        0,
        kI,
        'ZodIPv4',
        0,
        kq,
        'ZodIPv6',
        0,
        ku,
        'ZodISODate',
        0,
        jZ,
        'ZodISODateTime',
        0,
        jY,
        'ZodISODuration',
        0,
        j_,
        'ZodISOTime',
        0,
        j$,
        'ZodInstanceOf',
        0,
        mv,
        'ZodIntersection',
        0,
        ly,
        'ZodJWT',
        0,
        kK,
        'ZodKSUID',
        0,
        ko,
        'ZodLazy',
        0,
        mk,
        'ZodLiteral',
        0,
        lN,
        'ZodMAC',
        0,
        ks,
        'ZodMap',
        0,
        lG,
        'ZodNaN',
        0,
        l8,
        'ZodNanoID',
        0,
        ke,
        'ZodNever',
        0,
        lf,
        'ZodNonOptional',
        0,
        l2,
        'ZodNull',
        0,
        k9,
        'ZodNullable',
        0,
        lX,
        'ZodNumber',
        0,
        kS,
        'ZodNumberFormat',
        0,
        kU,
        'ZodObject',
        0,
        lo,
        'ZodOptional',
        0,
        lT,
        'ZodPipe',
        0,
        ma,
        'ZodPrefault',
        0,
        l0,
        'ZodPreprocess',
        0,
        mf,
        'ZodPromise',
        0,
        mm,
        'ZodReadonly',
        0,
        mg,
        'ZodRecord',
        0,
        lC,
        'ZodSet',
        0,
        lI,
        'ZodString',
        0,
        jV,
        'ZodStringFormat',
        0,
        jX,
        'ZodSuccess',
        0,
        l4,
        'ZodSymbol',
        0,
        k5,
        'ZodTemplateLiteral',
        0,
        mi,
        'ZodTransform',
        0,
        lR,
        'ZodTuple',
        0,
        lA,
        'ZodType',
        0,
        jT,
        'ZodULID',
        0,
        kk,
        'ZodURL',
        0,
        j9,
        'ZodUUID',
        0,
        j4,
        'ZodUndefined',
        0,
        k7,
        'ZodUnion',
        0,
        ls,
        'ZodUnknown',
        0,
        ld,
        'ZodVoid',
        0,
        lh,
        'ZodXID',
        0,
        km,
        'ZodXor',
        0,
        lu,
        '_ZodString',
        0,
        jU,
        '_default',
        0,
        l_,
        '_function',
        0,
        mp,
        'any',
        0,
        lc,
        'array',
        0,
        lm,
        'base64',
        0,
        kB,
        'base64url',
        0,
        kD,
        'bigint',
        0,
        k1,
        'boolean',
        0,
        k_,
        'catch',
        0,
        l7,
        'check',
        0,
        mr,
        'cidrv4',
        0,
        kx,
        'cidrv6',
        0,
        kz,
        'codec',
        0,
        md,
        'creditCard',
        0,
        kH,
        'cuid',
        0,
        kh,
        'cuid2',
        0,
        kj,
        'currencyCode',
        0,
        kQ,
        'custom',
        0,
        ms,
        'date',
        0,
        lk,
        'describe',
        0,
        ij,
        'discriminatedUnion',
        0,
        lx,
        'e164',
        0,
        kF,
        'email',
        0,
        j1,
        'emoji',
        0,
        kd,
        'enum',
        0,
        lL,
        'exactOptional',
        0,
        lW,
        'file',
        0,
        lQ,
        'float32',
        0,
        kW,
        'float64',
        0,
        kX,
        'function',
        0,
        mp,
        'guid',
        0,
        j3,
        'hash',
        0,
        kR,
        'hex',
        0,
        kP,
        'hostname',
        0,
        kO,
        'httpUrl',
        0,
        kb,
        'iban',
        0,
        kJ,
        'instanceof',
        0,
        mw,
        'int',
        0,
        kV,
        'int32',
        0,
        kY,
        'int64',
        0,
        k3,
        'intersection',
        0,
        lz,
        'invertCodec',
        0,
        me,
        'ipv4',
        0,
        kr,
        'ipv6',
        0,
        kv,
        'json',
        0,
        my,
        'jwt',
        0,
        kL,
        'keyof',
        0,
        ln,
        'ksuid',
        0,
        kp,
        'lazy',
        0,
        ml,
        'literal',
        0,
        lO,
        'looseObject',
        0,
        lr,
        'looseRecord',
        0,
        lF,
        'mac',
        0,
        kt,
        'map',
        0,
        lH,
        'meta',
        0,
        ik,
        'nan',
        0,
        l9,
        'nanoid',
        0,
        kf,
        'nativeEnum',
        0,
        lM,
        'never',
        0,
        lg,
        'nonoptional',
        0,
        l3,
        'null',
        0,
        la,
        'nullable',
        0,
        lY,
        'nullish',
        0,
        lZ,
        'number',
        0,
        kT,
        'object',
        0,
        lp,
        'optional',
        0,
        lU,
        'partialRecord',
        0,
        lE,
        'pipe',
        0,
        mb,
        'prefault',
        0,
        l1,
        'preprocess',
        0,
        mz,
        'promise',
        0,
        mn,
        'readonly',
        0,
        mh,
        'record',
        0,
        lD,
        'refine',
        0,
        mt,
        'set',
        0,
        lJ,
        'strictObject',
        0,
        lq,
        'string',
        0,
        jW,
        'stringFormat',
        0,
        kN,
        'stringbool',
        0,
        mx,
        'success',
        0,
        l5,
        'superRefine',
        0,
        mu,
        'symbol',
        0,
        k6,
        'templateLiteral',
        0,
        mj,
        'transform',
        0,
        lS,
        'tuple',
        0,
        lB,
        'uint32',
        0,
        kZ,
        'uint64',
        0,
        k4,
        'ulid',
        0,
        kl,
        'undefined',
        0,
        k8,
        'union',
        0,
        lt,
        'unknown',
        0,
        le,
        'url',
        0,
        ka,
        'uuid',
        0,
        j5,
        'uuidv4',
        0,
        j6,
        'uuidv6',
        0,
        j7,
        'uuidv7',
        0,
        j8,
        'void',
        0,
        li,
        'xid',
        0,
        kn,
        'xor',
        0,
        lv,
      ],
      98274,
    );
    var mA = a.i(98274);
    (a.s([], 13821),
      a.i(13821),
      a.s(
        [
          'endsWith',
          0,
          hH,
          'gt',
          0,
          hp,
          'gte',
          0,
          hq,
          'includes',
          0,
          hF,
          'length',
          0,
          hB,
          'lowercase',
          0,
          hD,
          'lt',
          0,
          hn,
          'lte',
          0,
          ho,
          'maxLength',
          0,
          hz,
          'maxSize',
          0,
          hw,
          'mime',
          0,
          hK,
          'minLength',
          0,
          hA,
          'minSize',
          0,
          hx,
          'multipleOf',
          0,
          hv,
          'negative',
          0,
          hs,
          'nonnegative',
          0,
          hu,
          'nonpositive',
          0,
          ht,
          'normalize',
          0,
          hM,
          'overwrite',
          0,
          hL,
          'positive',
          0,
          hr,
          'properties',
          0,
          hJ,
          'property',
          0,
          hI,
          'regex',
          0,
          hC,
          'size',
          0,
          hy,
          'slugify',
          0,
          hQ,
          'startsWith',
          0,
          hG,
          'toLowerCase',
          0,
          hO,
          'toUpperCase',
          0,
          hP,
          'trim',
          0,
          hN,
          'uppercase',
          0,
          hE,
        ],
        49975,
      ));
    var mB = a.i(49975);
    (a.i(53741),
      a.i(57186),
      a.s(
        [
          'decode',
          0,
          jL,
          'decodeAsync',
          0,
          jN,
          'encode',
          0,
          jK,
          'encodeAsync',
          0,
          jM,
          'parse',
          0,
          jG,
          'parseAsync',
          0,
          jH,
          'safeDecode',
          0,
          jP,
          'safeDecodeAsync',
          0,
          jR,
          'safeEncode',
          0,
          jO,
          'safeEncodeAsync',
          0,
          jQ,
          'safeParse',
          0,
          jI,
          'safeParseAsync',
          0,
          jJ,
          'validate',
          0,
          b1,
          'validateAsync',
          0,
          b2,
        ],
        67671,
      ),
      a.i(67671));
    let mC = {
      invalid_type: 'invalid_type',
      too_big: 'too_big',
      too_small: 'too_small',
      invalid_format: 'invalid_format',
      not_multiple_of: 'not_multiple_of',
      unrecognized_keys: 'unrecognized_keys',
      invalid_union: 'invalid_union',
      invalid_key: 'invalid_key',
      invalid_element: 'invalid_element',
      invalid_value: 'invalid_value',
      custom: 'custom',
    };
    function mD(a) {
      bF({ customError: a });
    }
    function mE() {
      return bF().customError;
    }
    (m || (m = {}),
      a.s(
        [
          'ZodFirstPartyTypeKind',
          0,
          m,
          'ZodIssueCode',
          0,
          mC,
          'getErrorMap',
          0,
          mE,
          'setErrorMap',
          0,
          mD,
        ],
        23216,
      ),
      a.i(23216),
      a.s(
        [
          '$brand',
          0,
          bB,
          'ZodFirstPartyTypeKind',
          0,
          m,
          'ZodIssueCode',
          0,
          mC,
          'config',
          0,
          bF,
          'getErrorMap',
          0,
          mE,
          'setErrorMap',
          0,
          mD,
        ],
        53120,
      ),
      a.i(53120));
    var jz = fO,
      jA = fN;
    function mF(a) {
      return gY(jY, a);
    }
    function mG(a) {
      return gZ(jZ, a);
    }
    function mH(a) {
      return g$(j$, a);
    }
    function mI(a) {
      return g_(j_, a);
    }
    (a.s(['date', 0, mG, 'datetime', 0, mF, 'duration', 0, mI, 'time', 0, mH], 74743),
      a.i(74743),
      a.s(
        [
          'ZodISODate',
          0,
          jZ,
          'ZodISODateTime',
          0,
          jY,
          'ZodISODuration',
          0,
          j_,
          'ZodISOTime',
          0,
          j$,
          'date',
          0,
          mG,
          'datetime',
          0,
          mF,
          'duration',
          0,
          mI,
          'time',
          0,
          mH,
        ],
        23889,
      ));
    var mJ = a.i(23889);
    let mK = { ...mA, ...mB, iso: mJ },
      mL = new Set([
        '$schema',
        '$ref',
        '$defs',
        'definitions',
        '$id',
        'id',
        '$comment',
        '$anchor',
        '$vocabulary',
        '$dynamicRef',
        '$dynamicAnchor',
        'type',
        'enum',
        'const',
        'anyOf',
        'oneOf',
        'allOf',
        'not',
        'properties',
        'required',
        'additionalProperties',
        'patternProperties',
        'propertyNames',
        'minProperties',
        'maxProperties',
        'items',
        'prefixItems',
        'additionalItems',
        'minItems',
        'maxItems',
        'uniqueItems',
        'contains',
        'minContains',
        'maxContains',
        'minLength',
        'maxLength',
        'pattern',
        'format',
        'minimum',
        'maximum',
        'exclusiveMinimum',
        'exclusiveMaximum',
        'multipleOf',
        'description',
        'default',
        'contentEncoding',
        'contentMediaType',
        'contentSchema',
        'unevaluatedItems',
        'unevaluatedProperties',
        'if',
        'then',
        'else',
        'dependentSchemas',
        'dependentRequired',
        'nullable',
        'readOnly',
      ]);
    function mM(a, b) {
      return a.map((a, c) => (c < b ? a : a.optional()));
    }
    let mN = new Set([
        'items',
        'prefixItems',
        'additionalItems',
        'additionalProperties',
        'contains',
        'propertyNames',
        'not',
        'if',
        'then',
        'else',
        'allOf',
        'anyOf',
        'oneOf',
        'unevaluatedItems',
        'unevaluatedProperties',
        'contentSchema',
      ]),
      mO = new Set([
        'properties',
        'patternProperties',
        'dependentSchemas',
        'dependencies',
        '$defs',
        'definitions',
      ]);
    function mP(a) {
      return (
        'object' == typeof a &&
        null !== a &&
        (Array.isArray(a)
          ? a.some(mP)
          : 'string' == typeof a.$ref ||
            Object.entries(a).some(([a, b]) =>
              mN.has(a)
                ? mP(b)
                : !!mO.has(a) && 'object' == typeof b && null !== b && Object.values(b).some(mP),
            ))
      );
    }
    function mQ(a) {
      return 1 === a ? 'element' : 'elements';
    }
    function mR(a, b) {
      if (!1 !== a) return void 0 === a || !0 === a ? mK.any() : mT(a, b);
    }
    let mS = /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|[+-](?:[01]\d|2[0-3]):[0-5]\d)$/;
    function mT(a, b) {
      if ('boolean' == typeof a) return a ? mK.any() : mK.never();
      let c = (function a(b, c) {
          var d, f, g, h;
          let i;
          if (void 0 !== b.not) {
            if ('object' == typeof b.not && 0 === Object.keys(b.not).length) return mK.never();
            throw Error('not is not supported in Zod (except { not: {} } for never)');
          }
          if (void 0 !== b.unevaluatedItems) throw Error('unevaluatedItems is not supported');
          if (void 0 !== b.unevaluatedProperties)
            throw Error('unevaluatedProperties is not supported');
          if (void 0 !== b.if || void 0 !== b.then || void 0 !== b.else)
            throw Error('Conditional schemas (if/then/else) are not supported');
          if (void 0 !== b.dependentSchemas || void 0 !== b.dependentRequired)
            throw Error('dependentSchemas and dependentRequired are not supported');
          if (b.$ref) {
            let a = b.$ref;
            if (c.refs.has(a)) return c.refs.get(a);
            if (c.processing.has(a))
              return mK.lazy(() => {
                if (!c.refs.has(a)) throw Error(`Circular reference not resolved: ${a}`);
                return c.refs.get(a);
              });
            c.processing.add(a);
            let d = mT(
              (function (a, b) {
                if (!a.startsWith('#'))
                  throw Error(
                    'External $ref is not supported, only local refs (#/...) are allowed',
                  );
                let c = a.slice(1).split('/').filter(Boolean);
                if (0 === c.length) return b.rootSchema;
                let d = 'draft-2020-12' === b.version ? '$defs' : 'definitions';
                if (c[0] === d) {
                  let d = void 0 === c[1] ? void 0 : c[1].replace(/~1/g, '/').replace(/~0/g, '~');
                  if (!d || !b.defs[d]) throw Error(`Reference not found: ${a}`);
                  return b.defs[d];
                }
                throw Error(`Reference not found: ${a}`);
              })(a, c),
              c,
            );
            return (c.refs.set(a, d), c.processing.delete(a), d);
          }
          if (void 0 !== b.enum) {
            let a = b.enum;
            if ('openapi-3.0' === c.version && !0 === b.nullable && 1 === a.length && null === a[0])
              return mK.null();
            if (0 === a.length) return mK.never();
            if (1 === a.length) return mK.literal(a[0]);
            if (a.every((a) => 'string' == typeof a)) return mK.enum(a);
            let d = a.map((a) => mK.literal(a));
            return d.length < 2 ? d[0] : mK.union([d[0], d[1], ...d.slice(2)]);
          }
          if (void 0 !== b.const) return mK.literal(b.const);
          let j = b.type;
          if (Array.isArray(j)) {
            let d = j.map((d) => a({ ...b, type: d }, c));
            return 0 === d.length ? mK.never() : 1 === d.length ? d[0] : mK.union(d);
          }
          if (!j) return mK.any();
          switch (j) {
            case 'string': {
              let a = mK.string();
              if (b.format) {
                let c = b.format;
                'email' === c
                  ? (a = a.check(mK.email()))
                  : 'uri' === c || 'uri-reference' === c
                    ? (a = a.check(mK.url()))
                    : 'uuid' === c || 'guid' === c
                      ? (a = a.check(mK.uuid()))
                      : 'date-time' === c
                        ? (a = a.check(mK.iso.datetime({ offset: !0 })))
                        : 'date' === c
                          ? (a = a.check(mK.iso.date()))
                          : 'time' === c
                            ? (a = a.check(mK.regex(mS)))
                            : 'duration' === c
                              ? (a = a.check(mK.iso.duration()))
                              : 'hostname' === c
                                ? (a = a.check(mK.hostname()))
                                : 'ipv4' === c
                                  ? (a = a.check(mK.ipv4()))
                                  : 'ipv6' === c
                                    ? (a = a.check(mK.ipv6()))
                                    : 'mac' === c
                                      ? (a = a.check(mK.mac()))
                                      : 'cidr' === c
                                        ? (a = a.check(mK.cidrv4()))
                                        : 'cidr-v6' === c
                                          ? (a = a.check(mK.cidrv6()))
                                          : 'base64' === c
                                            ? (a = a.check(mK.base64()))
                                            : 'base64url' === c
                                              ? (a = a.check(mK.base64url()))
                                              : 'e164' === c
                                                ? (a = a.check(mK.e164()))
                                                : 'credit_card' === c
                                                  ? (a = a.check(mK.creditCard()))
                                                  : 'iban' === c
                                                    ? (a = a.check(mK.iban()))
                                                    : 'jwt' === c
                                                      ? (a = a.check(mK.jwt()))
                                                      : 'emoji' === c
                                                        ? (a = a.check(mK.emoji()))
                                                        : 'nanoid' === c
                                                          ? (a = a.check(mK.nanoid()))
                                                          : 'cuid' === c
                                                            ? (a = a.check(mK.cuid()))
                                                            : 'cuid2' === c
                                                              ? (a = a.check(mK.cuid2()))
                                                              : 'ulid' === c
                                                                ? (a = a.check(mK.ulid()))
                                                                : 'xid' === c
                                                                  ? (a = a.check(mK.xid()))
                                                                  : 'ksuid' === c &&
                                                                    (a = a.check(mK.ksuid()));
              }
              ('number' == typeof b.minLength && (a = a.min(b.minLength)),
                'number' == typeof b.maxLength && (a = a.max(b.maxLength)),
                b.pattern && (a = a.regex(new RegExp(b.pattern))),
                (i = a));
              break;
            }
            case 'number':
            case 'integer': {
              let a = 'integer' === j ? mK.number().int() : mK.number();
              ('number' == typeof b.minimum && !0 !== b.exclusiveMinimum && (a = a.min(b.minimum)),
                'number' == typeof b.maximum && !0 !== b.exclusiveMaximum && (a = a.max(b.maximum)),
                'number' == typeof b.exclusiveMinimum
                  ? (a = a.gt(b.exclusiveMinimum))
                  : !0 === b.exclusiveMinimum &&
                    'number' == typeof b.minimum &&
                    (a = a.gt(b.minimum)),
                'number' == typeof b.exclusiveMaximum
                  ? (a = a.lt(b.exclusiveMaximum))
                  : !0 === b.exclusiveMaximum &&
                    'number' == typeof b.maximum &&
                    (a = a.lt(b.maximum)),
                'number' == typeof b.multipleOf && (a = a.multipleOf(b.multipleOf)),
                (i = a));
              break;
            }
            case 'boolean':
              i = mK.boolean();
              break;
            case 'null':
              i = mK.null();
              break;
            case 'object': {
              let a = {},
                g = b.properties || {},
                h = new Set(b.required || []),
                j =
                  'object' == typeof b.additionalProperties
                    ? mT(b.additionalProperties, c)
                    : void 0;
              for (let [b, d] of Object.entries(g)) {
                let f = mT(d, c);
                as(a, b, h.has(b) ? f : f.optional());
              }
              if (b.patternProperties) {
                let d = b.patternProperties,
                  f = Object.keys(d),
                  g = [];
                for (let a of f) {
                  let b = mT(d[a], c),
                    f = mK.string().regex(new RegExp(a));
                  g.push(mK.looseRecord(f, b));
                }
                let h = [];
                if (
                  (Object.keys(a).length > 0 && h.push(mK.object(a).passthrough()),
                  h.push(...g),
                  0 === h.length)
                )
                  i = mK.object({}).passthrough();
                else if (1 === h.length) i = h[0];
                else {
                  let a = mK.intersection(h[0], h[1]);
                  for (let b = 2; b < h.length; b++) a = mK.intersection(a, h[b]);
                  i = a;
                }
                if (!1 === b.additionalProperties) {
                  let b = Object.keys(a),
                    c = f.map((a) => new RegExp(a)),
                    d = i;
                  i = i.check((a) => {
                    if (!aI(a.value)) return;
                    let f = [];
                    for (let d of Object.keys(a.value))
                      !b.includes(d) && (c.some((a) => a.test(d)) || f.push(d));
                    f.length &&
                      a.issues.push({
                        code: 'unrecognized_keys',
                        keys: f,
                        input: a.value,
                        inst: d,
                      });
                  });
                }
              } else {
                let c = mK.object(a);
                i =
                  !1 === b.additionalProperties ? c.strict() : j ? c.catchall(j) : c.passthrough();
              }
              let k = void 0 !== b.propertyNames && !0 !== b.propertyNames,
                l = 'number' == typeof b.minProperties ? b.minProperties : void 0,
                m = 'number' == typeof b.maxProperties ? b.maxProperties : void 0;
              if (k || void 0 !== l || void 0 !== m) {
                let a;
                (k &&
                  (a = mT(
                    'object' == typeof b.propertyNames && void 0 === b.propertyNames.type
                      ? { type: 'string', ...b.propertyNames }
                      : b.propertyNames,
                    c,
                  )),
                  (d = i),
                  (f = { keySchema: a, minProperties: l, maxProperties: m }),
                  (i = mK
                    .transform((a) => a)
                    .check((a) => {
                      let b = a.value;
                      if ('object' != typeof b || null === b || Array.isArray(b)) return;
                      let c = Object.getOwnPropertyNames(b);
                      if (
                        (void 0 !== f.minProperties &&
                          c.length < f.minProperties &&
                          a.issues.push({
                            origin: 'object',
                            code: 'too_small',
                            minimum: f.minProperties,
                            inclusive: !0,
                            message: `Too small: expected object to have >=${f.minProperties} properties`,
                            input: b,
                            inst: d,
                            continue: !0,
                          }),
                        void 0 !== f.maxProperties &&
                          c.length > f.maxProperties &&
                          a.issues.push({
                            origin: 'object',
                            code: 'too_big',
                            maximum: f.maxProperties,
                            inclusive: !0,
                            message: `Too big: expected object to have <=${f.maxProperties} properties`,
                            input: b,
                            inst: d,
                            continue: !0,
                          }),
                        f.keySchema)
                      )
                        for (let b of c) {
                          let c = f.keySchema.safeParse(b);
                          c.success ||
                            a.issues.push({
                              code: 'invalid_key',
                              origin: 'record',
                              issues: c.error.issues,
                              input: b,
                              path: [b],
                              continue: !0,
                            });
                        }
                    })
                    .pipe(d)));
              }
              break;
            }
            case 'array': {
              let a = b.prefixItems,
                d = b.items;
              if (a && Array.isArray(a)) {
                let f = 'number' == typeof b.minItems ? b.minItems : 0,
                  g = mM(
                    a.map((a) => mT(a, c)),
                    f,
                  ),
                  h = Array.isArray(d) ? void 0 : mR(d, c),
                  j = mK.tuple(g);
                ((i = h ? j.rest(h) : j),
                  'number' == typeof b.minItems && (i = i.check(mK.minLength(b.minItems))),
                  'number' == typeof b.maxItems && (i = i.check(mK.maxLength(b.maxItems))));
              } else if (Array.isArray(d)) {
                let a = 'number' == typeof b.minItems ? b.minItems : 0,
                  f = mM(
                    d.map((a) => mT(a, c)),
                    a,
                  ),
                  g = mR(b.additionalItems, c),
                  h = mK.tuple(f);
                ((i = g ? h.rest(g) : h),
                  'number' == typeof b.minItems && (i = i.check(mK.minLength(b.minItems))),
                  'number' == typeof b.maxItems && (i = i.check(mK.maxLength(b.maxItems))));
              } else if (void 0 !== d) {
                let a = mT(d, c),
                  f = mK.array(a);
                ('number' == typeof b.minItems && (f = f.min(b.minItems)),
                  'number' == typeof b.maxItems && (f = f.max(b.maxItems)),
                  (i = f));
              } else i = mK.array(mK.any());
              (!0 === b.uniqueItems || void 0 !== b.contains) &&
                ((g = i),
                (h = {
                  uniqueItems: !0 === b.uniqueItems,
                  containsSchema: void 0 !== b.contains ? mT(b.contains, c) : void 0,
                  minContains: 'number' == typeof b.minContains ? b.minContains : void 0,
                  maxContains: 'number' == typeof b.maxContains ? b.maxContains : void 0,
                }),
                (i = mK
                  .transform((a) => a)
                  .check((a) => {
                    let b = a.value;
                    if (Array.isArray(b)) {
                      if (!0 === h.uniqueItems) {
                        let c = new Map();
                        for (let d = 0; d < b.length; d++) {
                          let f = (function a(b, c) {
                            if (null === b) return 'z';
                            let d = typeof b;
                            if ('object' !== d) {
                              if ('number' === d && Number.isNaN(b)) return null;
                              let a = String(b);
                              return `${d[0]}${a.length}:${a}`;
                            }
                            if (c.has(b)) return null;
                            c.add(b);
                            try {
                              if (Array.isArray(b)) {
                                let d = [];
                                for (let f of b) {
                                  let b = a(f, c);
                                  if (null === b) return null;
                                  d.push(b);
                                }
                                return `a${d.length}:[${d.join(',')}]`;
                              }
                              let d = Object.keys(b).sort(),
                                f = [];
                              for (let g of d) {
                                let d = a(b[g], c);
                                if (null === d) return null;
                                f.push(`${g.length}:${g}=${d}`);
                              }
                              return `o${f.length}:{${f.join(',')}}`;
                            } finally {
                              c.delete(b);
                            }
                          })(b[d], new Set());
                          if (null === f) continue;
                          let g = c.get(f);
                          if (void 0 === g) {
                            c.set(f, d);
                            continue;
                          }
                          a.issues.push({
                            code: 'custom',
                            message: `Array items must be unique: element at index ${d} duplicates the one at index ${g}`,
                            input: b,
                            path: [d],
                            continue: !0,
                          });
                        }
                      }
                      if (h.containsSchema) {
                        let c = h.minContains ?? 1,
                          d = void 0 !== h.maxContains ? h.maxContains + 1 : 1 / 0,
                          f = 0;
                        for (let a of b)
                          if (h.containsSchema.safeParse(a).success && ++f >= d) break;
                        (f < c &&
                          a.issues.push({
                            code: 'custom',
                            message: `Array must contain at least ${c} matching ${mQ(c)}; found ${f}`,
                            input: b,
                            continue: !0,
                          }),
                          void 0 !== h.maxContains &&
                            f > h.maxContains &&
                            a.issues.push({
                              code: 'custom',
                              message: `Array must contain at most ${h.maxContains} matching ${mQ(h.maxContains)}`,
                              input: b,
                              continue: !0,
                            }));
                      }
                    }
                  })
                  .pipe(g)));
              break;
            }
            default:
              throw Error(`Unsupported type: ${j}`);
          }
          return i;
        })(a, b),
        d = a.type || void 0 !== a.enum || void 0 !== a.const;
      if (a.anyOf && Array.isArray(a.anyOf)) {
        let f = a.anyOf.map((a) => mT(a, b)),
          g = mK.union(f);
        c = d ? mK.intersection(c, g) : g;
      }
      if (a.oneOf && Array.isArray(a.oneOf)) {
        let f = a.oneOf.map((a) => mT(a, b)),
          g = mK.xor(f);
        c = d ? mK.intersection(c, g) : g;
      }
      if (a.allOf && Array.isArray(a.allOf))
        if (0 === a.allOf.length) c = d ? c : mK.any();
        else {
          let f = d ? c : mT(a.allOf[0], b),
            g = +!d;
          for (let c = g; c < a.allOf.length; c++) f = mK.intersection(f, mT(a.allOf[c], b));
          c = f;
        }
      (!0 === a.nullable && 'openapi-3.0' === b.version && (c = mK.nullable(c)),
        !0 === a.readOnly && (c = mK.readonly(c)),
        void 0 !== a.default && (c = c.default(a.default)));
      let f = {};
      for (let b of [
        '$id',
        'id',
        '$comment',
        '$anchor',
        '$vocabulary',
        '$dynamicRef',
        '$dynamicAnchor',
      ])
        b in a && (f[b] = a[b]);
      for (let b of ['contentEncoding', 'contentMediaType', 'contentSchema'])
        b in a && (f[b] = a[b]);
      if ('object' === a.type && void 0 === a.$ref)
        for (let b of (void 0 === a.propertyNames ||
          mP(a.propertyNames) ||
          (f.propertyNames = a.propertyNames),
        ['minProperties', 'maxProperties']))
          void 0 !== a[b] && (f[b] = a[b]);
      if ('array' === a.type && void 0 === a.$ref)
        for (let b of (void 0 === a.contains || mP(a.contains) || (f.contains = a.contains),
        ['uniqueItems', 'minContains', 'maxContains']))
          void 0 !== a[b] && (f[b] = a[b]);
      for (let b of Object.keys(a)) mL.has(b) || as(f, b, a[b]);
      return (
        Object.keys(f).length > 0 && b.registry.add(c, f),
        a.description && (c = c.describe(a.description)),
        c
      );
    }
    let mU = Symbol('z.visit/resolving');
    function mV(a, b) {
      let c =
          'function' == typeof b
            ? b
            : (a, c) => {
                let d = b[a._zod.def.type];
                return d ? d(a, c) : a;
              },
        d = new Map();
      return (function a(b) {
        let f = d.get(b);
        if (f === mU) return new fy({ type: 'lazy', getter: () => d.get(b) });
        if (void 0 !== f) return f;
        d.set(b, mU);
        let g = (function (b) {
            let c = b._zod.def;
            switch (c.type) {
              case 'object': {
                let d = c.shape,
                  f = Object.keys(d),
                  g = !1,
                  h = {};
                for (let b of f) {
                  let c = a(d[b]);
                  (c !== d[b] && (g = !0), (h[b] = c));
                }
                let i = c.catchall;
                return (
                  c.catchall && (i = a(c.catchall)) !== c.catchall && (g = !0),
                  g ? aP(b, { ...c, shape: h, catchall: i }) : b
                );
              }
              case 'array': {
                let d = a(c.element);
                return d === c.element ? b : aP(b, { ...c, element: d });
              }
              case 'tuple': {
                let d = c.items,
                  f = !1,
                  g = [];
                for (let b of d) {
                  let c = a(b);
                  (c !== b && (f = !0), g.push(c));
                }
                let h = c.rest;
                return (
                  c.rest && (h = a(c.rest)) !== c.rest && (f = !0),
                  f ? aP(b, { ...c, items: g, rest: h }) : b
                );
              }
              case 'record':
              case 'map': {
                let d = a(c.keyType),
                  f = a(c.valueType);
                return d === c.keyType && f === c.valueType
                  ? b
                  : aP(b, { ...c, keyType: d, valueType: f });
              }
              case 'set': {
                let d = a(c.valueType);
                return d === c.valueType ? b : aP(b, { ...c, valueType: d });
              }
              case 'union': {
                let d = c.options,
                  f = !1,
                  g = [];
                for (let b of d) {
                  let c = a(b);
                  (c !== b && (f = !0), g.push(c));
                }
                return f ? aP(b, { ...c, options: g }) : b;
              }
              case 'intersection': {
                let d = a(c.left),
                  f = a(c.right);
                return d === c.left && f === c.right ? b : aP(b, { ...c, left: d, right: f });
              }
              case 'optional':
              case 'nullable':
              case 'default':
              case 'prefault':
              case 'catch':
              case 'readonly':
              case 'nonoptional':
              case 'promise':
              case 'success': {
                let d = a(c.innerType);
                return d === c.innerType ? b : aP(b, { ...c, innerType: d });
              }
              case 'pipe': {
                let d = a(c.in),
                  f = a(c.out);
                return d === c.in && f === c.out ? b : aP(b, { ...c, in: d, out: f });
              }
              case 'function': {
                let d = a(c.input),
                  f = a(c.output);
                return d === c.input && f === c.output ? b : aP(b, { ...c, input: d, output: f });
              }
              case 'lazy': {
                let d = c.getter,
                  { _cachedInner: f, ...g } = c;
                return aP(b, { ...g, getter: () => a(d()) });
              }
              default:
                return b;
            }
          })(b),
          h = c(g, g !== b);
        return (d.set(b, h), h);
      })(a);
    }
    function mW(a) {
      return (function (a, b) {
        if (!b?.length) return a;
        let c = a._zod.def;
        return aP(a, ay(c, { checks: [...(c.checks ?? []), ...b] }), { parent: !0 });
      })(a.out, a.checks);
    }
    a.s(
      [
        'bigint',
        0,
        function (a) {
          return ha(k0, a);
        },
        'boolean',
        0,
        function (a) {
          return g8(k$, a);
        },
        'date',
        0,
        function (a) {
          return hl(lj, a);
        },
        'number',
        0,
        function (a) {
          return g1(kS, a);
        },
        'string',
        0,
        function (a) {
          return gx(jV, a);
        },
      ],
      43945,
    );
    var mX = a.i(43945);
    a.s(
      [
        '$brand',
        0,
        bB,
        '$input',
        0,
        f$,
        '$output',
        0,
        fZ,
        'INVALID',
        0,
        f2,
        'NEVER',
        0,
        bx,
        'TimePrecision',
        0,
        gX,
        'ZodAny',
        0,
        lb,
        'ZodArray',
        0,
        ll,
        'ZodBase64',
        0,
        kA,
        'ZodBase64URL',
        0,
        kC,
        'ZodBigInt',
        0,
        k0,
        'ZodBigIntFormat',
        0,
        k2,
        'ZodBoolean',
        0,
        k$,
        'ZodCIDRv4',
        0,
        kw,
        'ZodCIDRv6',
        0,
        ky,
        'ZodCUID',
        0,
        kg,
        'ZodCUID2',
        0,
        ki,
        'ZodCatch',
        0,
        l6,
        'ZodCodec',
        0,
        mc,
        'ZodCompileAsyncError',
        0,
        f4,
        'ZodCompileUnsupportedError',
        0,
        f5,
        'ZodCreditCard',
        0,
        kG,
        'ZodCustom',
        0,
        mq,
        'ZodCustomStringFormat',
        0,
        kM,
        'ZodDate',
        0,
        lj,
        'ZodDefault',
        0,
        l$,
        'ZodDiscriminatedUnion',
        0,
        lw,
        'ZodE164',
        0,
        kE,
        'ZodEmail',
        0,
        j0,
        'ZodEmoji',
        0,
        kc,
        'ZodEnum',
        0,
        lK,
        'ZodError',
        0,
        jE,
        'ZodExactOptional',
        0,
        lV,
        'ZodFile',
        0,
        lP,
        'ZodFirstPartyTypeKind',
        0,
        m,
        'ZodFunction',
        0,
        mo,
        'ZodGUID',
        0,
        j2,
        'ZodIBAN',
        0,
        kI,
        'ZodIPv4',
        0,
        kq,
        'ZodIPv6',
        0,
        ku,
        'ZodISODate',
        0,
        jZ,
        'ZodISODateTime',
        0,
        jY,
        'ZodISODuration',
        0,
        j_,
        'ZodISOTime',
        0,
        j$,
        'ZodInstanceOf',
        0,
        mv,
        'ZodIntersection',
        0,
        ly,
        'ZodIssueCode',
        0,
        mC,
        'ZodJWT',
        0,
        kK,
        'ZodKSUID',
        0,
        ko,
        'ZodLazy',
        0,
        mk,
        'ZodLiteral',
        0,
        lN,
        'ZodMAC',
        0,
        ks,
        'ZodMap',
        0,
        lG,
        'ZodNaN',
        0,
        l8,
        'ZodNanoID',
        0,
        ke,
        'ZodNever',
        0,
        lf,
        'ZodNonOptional',
        0,
        l2,
        'ZodNull',
        0,
        k9,
        'ZodNullable',
        0,
        lX,
        'ZodNumber',
        0,
        kS,
        'ZodNumberFormat',
        0,
        kU,
        'ZodObject',
        0,
        lo,
        'ZodOptional',
        0,
        lT,
        'ZodPipe',
        0,
        ma,
        'ZodPrefault',
        0,
        l0,
        'ZodPreprocess',
        0,
        mf,
        'ZodPromise',
        0,
        mm,
        'ZodReadonly',
        0,
        mg,
        'ZodRealError',
        0,
        jF,
        'ZodRecord',
        0,
        lC,
        'ZodSet',
        0,
        lI,
        'ZodString',
        0,
        jV,
        'ZodStringFormat',
        0,
        jX,
        'ZodSuccess',
        0,
        l4,
        'ZodSymbol',
        0,
        k5,
        'ZodTemplateLiteral',
        0,
        mi,
        'ZodTransform',
        0,
        lR,
        'ZodTuple',
        0,
        lA,
        'ZodType',
        0,
        jT,
        'ZodULID',
        0,
        kk,
        'ZodURL',
        0,
        j9,
        'ZodUUID',
        0,
        j4,
        'ZodUndefined',
        0,
        k7,
        'ZodUnion',
        0,
        ls,
        'ZodUnknown',
        0,
        ld,
        'ZodVoid',
        0,
        lh,
        'ZodXID',
        0,
        km,
        'ZodXor',
        0,
        lu,
        '_ZodString',
        0,
        jU,
        '_default',
        0,
        l_,
        '_function',
        0,
        mp,
        'any',
        0,
        lc,
        'array',
        0,
        lm,
        'base64',
        0,
        kB,
        'base64url',
        0,
        kD,
        'bigint',
        0,
        k1,
        'boolean',
        0,
        k_,
        'catch',
        0,
        l7,
        'check',
        0,
        mr,
        'cidrv4',
        0,
        kx,
        'cidrv6',
        0,
        kz,
        'clone',
        0,
        aP,
        'codec',
        0,
        md,
        'coerce',
        0,
        mX,
        'compile',
        0,
        f6,
        'config',
        0,
        bF,
        'core',
        0,
        jy,
        'creditCard',
        0,
        kH,
        'cuid',
        0,
        kh,
        'cuid2',
        0,
        kj,
        'currencyCode',
        0,
        kQ,
        'custom',
        0,
        ms,
        'date',
        0,
        lk,
        'decode',
        0,
        jL,
        'decodeAsync',
        0,
        jN,
        'deepPartial',
        0,
        function (a) {
          return mV(a, {
            object: (a) => a.partial(),
            union: (a) => {
              let b = a._zod.def;
              return void 0 === b.discriminator ? a : lt(b.options);
            },
          });
        },
        'describe',
        0,
        ij,
        'discriminatedUnion',
        0,
        lx,
        'e164',
        0,
        kF,
        'email',
        0,
        j1,
        'emoji',
        0,
        kd,
        'encode',
        0,
        jK,
        'encodeAsync',
        0,
        jM,
        'endsWith',
        0,
        hH,
        'enum',
        0,
        lL,
        'exactOptional',
        0,
        lW,
        'file',
        0,
        lQ,
        'flattenError',
        0,
        bM,
        'float32',
        0,
        kW,
        'float64',
        0,
        kX,
        'formatError',
        0,
        bN,
        'fromJSONSchema',
        0,
        function (a, b) {
          var c, d;
          let f, g;
          if ('boolean' == typeof a) return a ? mK.any() : mK.never();
          try {
            f = JSON.parse(JSON.stringify(a));
          } catch {
            throw Error(
              'fromJSONSchema input is not valid JSON (possibly cyclic); use $defs/$ref for recursive schemas',
            );
          }
          let h = {
            version:
              ((c = f),
              (d = b?.defaultTarget),
              'https://json-schema.org/draft/2020-12/schema' === (g = c.$schema)
                ? 'draft-2020-12'
                : 'http://json-schema.org/draft-07/schema#' === g
                  ? 'draft-7'
                  : 'http://json-schema.org/draft-04/schema#' === g
                    ? 'draft-4'
                    : (d ?? 'draft-2020-12')),
            defs: f.$defs || f.definitions || {},
            refs: new Map(),
            processing: new Set(),
            rootSchema: f,
            registry: b?.registry ?? f1,
          };
          return mT(f, h);
        },
        'function',
        0,
        mp,
        'getDiscriminatedOption',
        0,
        eT,
        'getErrorMap',
        0,
        mE,
        'globalRegistry',
        0,
        f1,
        'gt',
        0,
        hp,
        'gte',
        0,
        hq,
        'guid',
        0,
        j3,
        'hash',
        0,
        kR,
        'hex',
        0,
        kP,
        'hostname',
        0,
        kO,
        'httpUrl',
        0,
        kb,
        'iban',
        0,
        kJ,
        'includes',
        0,
        hF,
        'input',
        0,
        function (a) {
          return mV(a, {
            pipe: (a) => {
              var b;
              return (b = a._zod.def).in._zod.traits.has('$ZodTransform') ? mW(b) : b.in;
            },
            default: (a, b) => (b ? lU(a._zod.def.innerType) : a),
            catch: (a, b) => (b ? a._zod.def.innerType : a),
          });
        },
        'instanceof',
        0,
        mw,
        'int',
        0,
        kV,
        'int32',
        0,
        kY,
        'int64',
        0,
        k3,
        'intersection',
        0,
        lz,
        'invertCodec',
        0,
        me,
        'ipv4',
        0,
        kr,
        'ipv6',
        0,
        kv,
        'iso',
        0,
        mJ,
        'json',
        0,
        my,
        'jwt',
        0,
        kL,
        'keyof',
        0,
        ln,
        'ksuid',
        0,
        kp,
        'lazy',
        0,
        ml,
        'length',
        0,
        hB,
        'literal',
        0,
        lO,
        'locales',
        0,
        fY,
        'looseObject',
        0,
        lr,
        'looseRecord',
        0,
        lF,
        'lowercase',
        0,
        hD,
        'lt',
        0,
        hn,
        'lte',
        0,
        ho,
        'mac',
        0,
        kt,
        'map',
        0,
        lH,
        'maxLength',
        0,
        hz,
        'maxSize',
        0,
        hw,
        'memoizer',
        0,
        fL,
        'meta',
        0,
        ik,
        'mime',
        0,
        hK,
        'minLength',
        0,
        hA,
        'minSize',
        0,
        hx,
        'multipleOf',
        0,
        hv,
        'nan',
        0,
        l9,
        'nanoid',
        0,
        kf,
        'nativeEnum',
        0,
        lM,
        'negative',
        0,
        hs,
        'never',
        0,
        lg,
        'nonnegative',
        0,
        hu,
        'nonoptional',
        0,
        l3,
        'nonpositive',
        0,
        ht,
        'normalize',
        0,
        hM,
        'null',
        0,
        la,
        'nullable',
        0,
        lY,
        'nullish',
        0,
        lZ,
        'number',
        0,
        kT,
        'object',
        0,
        lp,
        'optional',
        0,
        lU,
        'output',
        0,
        function (a) {
          return mV(a, {
            pipe: (a) => mW(a._zod.def),
            prefault: (a, b) => (b ? a._zod.def.innerType : a),
          });
        },
        'overwrite',
        0,
        hL,
        'parse',
        0,
        jG,
        'parseAsync',
        0,
        jH,
        'partialRecord',
        0,
        lE,
        'pipe',
        0,
        mb,
        'positive',
        0,
        hr,
        'prefault',
        0,
        l1,
        'preprocess',
        0,
        mz,
        'prettifyError',
        0,
        bQ,
        'promise',
        0,
        mn,
        'properties',
        0,
        hJ,
        'property',
        0,
        hI,
        'readonly',
        0,
        mh,
        'record',
        0,
        lD,
        'refine',
        0,
        mt,
        'regex',
        0,
        hC,
        'regexes',
        () => jz,
        'registry',
        0,
        f0,
        'safeDecode',
        0,
        jP,
        'safeDecodeAsync',
        0,
        jR,
        'safeEncode',
        0,
        jO,
        'safeEncodeAsync',
        0,
        jQ,
        'safeParse',
        0,
        jI,
        'safeParseAsync',
        0,
        jJ,
        'set',
        0,
        lJ,
        'setErrorMap',
        0,
        mD,
        'size',
        0,
        hy,
        'slugify',
        0,
        hQ,
        'startsWith',
        0,
        hG,
        'strictObject',
        0,
        lq,
        'string',
        0,
        jW,
        'stringFormat',
        0,
        kN,
        'stringbool',
        0,
        mx,
        'success',
        0,
        l5,
        'superRefine',
        0,
        mu,
        'symbol',
        0,
        k6,
        'templateLiteral',
        0,
        mj,
        'toJSONSchema',
        0,
        jw,
        'toLowerCase',
        0,
        hO,
        'toUpperCase',
        0,
        hP,
        'toZod',
        0,
        ad,
        'transform',
        0,
        lS,
        'treeifyError',
        0,
        bO,
        'trim',
        0,
        hN,
        'tuple',
        0,
        lB,
        'uint32',
        0,
        kZ,
        'uint64',
        0,
        k4,
        'ulid',
        0,
        kl,
        'undefined',
        0,
        k8,
        'union',
        0,
        lt,
        'unknown',
        0,
        le,
        'uppercase',
        0,
        hE,
        'url',
        0,
        ka,
        'util',
        () => jA,
        'uuid',
        0,
        j5,
        'uuidv4',
        0,
        j6,
        'uuidv6',
        0,
        j7,
        'uuidv7',
        0,
        j8,
        'validate',
        0,
        b1,
        'validateAsync',
        0,
        b2,
        'void',
        0,
        li,
        'withParser',
        0,
        f7,
        'xid',
        0,
        kn,
        'xor',
        0,
        lv,
      ],
      44955,
    );
    var mY = a.i(44955),
      mY = mY;
    let mZ = mY.object({ field: mY.string(), code: mY.string(), message: mY.string() }),
      m$ = mY.object({
        type: mY.string().url(),
        title: mY.string().min(1),
        status: mY.number().int().min(400).max(599),
        code: mY.string().min(1),
        detail: mY.string().optional(),
        instance: mY.string(),
        requestId: mY.string().min(1),
        tenantId: mY.string().optional(),
        timestamp: mY.iso.datetime(),
        retryable: mY.boolean(),
        retryAfter: mY.number().nonnegative().optional(),
        errors: mY.array(mZ).optional(),
        traceId: mY.string().optional(),
      });
    class m_ extends Error {
      status;
      code;
      problem;
      retryAfterSeconds;
      constructor(a, b, c, d, f, g) {
        (super(c, g),
          (this.status = a),
          (this.code = b),
          (this.problem = d),
          (this.retryAfterSeconds = f),
          (this.name = 'ApiError'));
      }
    }
    function m0(a) {
      return Number.isFinite(a) ? Math.min(3e4, Math.max(1, Math.trunc(a))) : 1e4;
    }
    async function m1(a) {
      if (a.headers.get('content-type')?.includes('application/problem+json'))
        try {
          let b = await a.json();
          return m$.safeParse(b).success ? b : void 0;
        } catch {
          return;
        }
    }
    async function m2(a, b) {
      if (204 === a.status || 205 === a.status || b?.toUpperCase() === 'HEAD') return;
      let c = a.headers.get('content-type') ?? '';
      return c.includes('application/json') || c.includes('+json')
        ? await a.json()
        : await a.text();
    }
    let m3 = (function (a = {}) {
      let b = (function (a, b = 'production') {
          var c;
          let d;
          if (void 0 === a) return 'production' === b ? '' : 'http://localhost:7300';
          try {
            d = new URL(a);
          } catch {
            throw Error('NEXT_PUBLIC_API_URL must be a valid absolute URL');
          }
          if ('' !== d.username || '' !== d.password)
            throw Error('NEXT_PUBLIC_API_URL must not include credentials');
          let f =
            'production' !== b &&
            ('localhost' === (c = d.hostname) || '127.0.0.1' === c || '[::1]' === c);
          if ('https:' !== d.protocol && !(f && 'http:' === d.protocol))
            throw Error('NEXT_PUBLIC_API_URL must use HTTPS outside local development');
          return d.toString().replace(/\/$/, '');
        })(a.baseUrl ?? process.env.NEXT_PUBLIC_API_URL),
        c = m0(a.defaultTimeoutMs ?? 1e4),
        d = a.fetcher ?? fetch,
        f = a.getToken ?? (() => null);
      async function g(a, h = {}) {
        let { body: i, token: j, timeoutMs: k = c, query: l, signal: m, ...n } = h,
          o = m0(k),
          p = new Headers(n.headers),
          q = new AbortController(),
          r = !1;
        try {
          if (m?.aborted) throw new m_(0, 'REQUEST_ABORTED', 'API request was aborted');
          let c = void 0 === j ? f() : j;
          (void 0 === i || i instanceof FormData || p.set('Content-Type', 'application/json'),
            null !== c && p.set('Authorization', `Bearer ${c}`));
          let g = () => q.abort();
          m?.addEventListener('abort', g, { once: !0 });
          let h = setTimeout(() => {
            ((r = !0), q.abort());
          }, o);
          try {
            let c = await d(
              (function (a, b, c) {
                let d = a.replace(/\/+$/, ''),
                  f = b.startsWith('/') ? b : `/${b}`,
                  g = new URL(`${d}${f}`);
                for (let [a, b] of Object.entries(c ?? {}))
                  void 0 !== b && g.searchParams.set(a, String(b));
                return g.toString();
              })(b, a, l),
              {
                ...n,
                headers: p,
                signal: q.signal,
                credentials: 'include',
                body: void 0 === i ? void 0 : i instanceof FormData ? i : JSON.stringify(i),
              },
            );
            if (!c.ok) {
              let a = await m1(c);
              throw new m_(
                c.status,
                a?.code ?? 'UNKNOWN_ERROR',
                a?.detail ?? a?.title ?? c.statusText ?? 'API request failed',
                a,
                (function (a, b) {
                  let c = a.headers.get('retry-after');
                  if (null === c) return b?.retryAfter;
                  let d = Number(c);
                  if (Number.isFinite(d) && d >= 0) return d;
                  let f = Date.parse(c);
                  return Number.isNaN(f)
                    ? b?.retryAfter
                    : Math.max(0, Math.ceil((f - Date.now()) / 1e3));
                })(c, a),
              );
            }
            return { ok: !0, data: await m2(c, n.method) };
          } finally {
            (clearTimeout(h), m?.removeEventListener('abort', g));
          }
        } catch (a) {
          var s;
          return {
            ok: !1,
            error:
              ((s = r),
              a instanceof m_
                ? a
                : s
                  ? new m_(
                      408,
                      'REQUEST_TIMEOUT',
                      `API request timed out after ${o}ms`,
                      void 0,
                      void 0,
                      { cause: a },
                    )
                  : new m_(0, 'NETWORK_ERROR', 'Unable to reach the API', void 0, void 0, {
                      cause: a,
                    })),
          };
        }
      }
      return {
        request: g,
        get: (a, b) => g(a, { ...b, method: 'GET' }),
        post: (a, b, c) => g(a, { ...c, method: 'POST', body: b }),
        put: (a, b, c) => g(a, { ...c, method: 'PUT', body: b }),
        patch: (a, b, c) => g(a, { ...c, method: 'PATCH', body: b }),
        delete: (a, b) => g(a, { ...b, method: 'DELETE' }),
      };
    })();
    var mY = mY,
      mY = mY;
    let m4 = mY.object({
        timestamp: mY.string(),
        requests: mY.number().int().nonnegative(),
        errors: mY.number().int().nonnegative(),
        p95: mY.number().nonnegative(),
      }),
      m5 = mY.object({
        requestsPerMin: mY.number().int().nonnegative(),
        errorRate: mY.number().nonnegative(),
        p95Latency: mY.number().nonnegative(),
        activeTenants: mY.number().int().nonnegative(),
        series: mY.array(m4),
      }),
      m6 = mY.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'ALL']),
      m7 = mY.object({
        name: mY.string().min(1).max(128),
        status: mY.enum(['healthy', 'degraded', 'down']),
        latencyMs: mY.number().int().nonnegative().nullable(),
      }),
      m8 = mY.object({
        id: mY.string().min(1),
        timestamp: mY.iso.datetime(),
        actor: mY.string().min(1).max(128),
        action: mY.string().min(1).max(128),
        target: mY.string().min(1).max(256),
        status: mY.enum(['success', 'warning', 'error']),
        ip: mY.string().optional(),
        details: mY.record(mY.string(), mY.unknown()).optional(),
      }),
      m9 = mY.object({
        path: mY.string().min(1).max(500),
        method: m6,
        requests: mY.number().int().nonnegative(),
      }),
      na = mY.object({
        metrics: m5,
        health: mY.array(m7),
        activity: mY.array(m8),
        topRoutes: mY.array(m9),
      });
    function nb(a) {
      return new m_(
        500,
        'GW_FRONTEND_MALFORMED_RESPONSE',
        'Endpoint overview tidak valid',
        void 0,
        void 0,
        { cause: a instanceof Error ? a : void 0 },
      );
    }
    async function nc(a) {
      let b = await m3.get('/admin/overview', a);
      if (!b || !b.ok) return b ?? { ok: !1, error: nb('API request failed') };
      let c = na.safeParse(b.data);
      return c.success ? { ok: !0, data: c.data } : { ok: !1, error: nb(c.error) };
    }
    let nd = new Set([408, 425, 429, 500, 502, 503, 504]);
    function ne(a, b) {
      if (a >= 1) return !1;
      let c = (function (a) {
        if ('object' != typeof a || null === a || !('status' in a)) return;
        let b = a.status;
        return 'number' == typeof b ? b : void 0;
      })(b);
      return void 0 !== c ? nd.has(c) : a < 1;
    }
    async function nf() {
      let a = (await (0, _.cookies)()).toString(),
        b = new $({ defaultOptions: { queries: { retry: ne, staleTime: 3e4 } } });
      return (
        await b.prefetchQuery({
          queryKey: aa.overviewQueryKey,
          queryFn: async ({ signal: b }) => {
            let c = await nc({ signal: b, ...(a ? { headers: { cookie: a } } : {}) });
            if (!c.ok) throw c.error;
            return c.data;
          },
        }),
        (0, n.jsx)(H.HydrationBoundary, {
          state: (function (a, b = {}) {
            let c =
                b.shouldDehydrateMutation ??
                a.getDefaultOptions().dehydrate?.shouldDehydrateMutation ??
                F,
              d = a
                .getMutationCache()
                .getAll()
                .flatMap((a) =>
                  c(a)
                    ? [
                        {
                          mutationKey: a.options.mutationKey,
                          state: a.state,
                          ...(a.options.scope && { scope: a.options.scope }),
                          ...(a.meta && { meta: a.meta }),
                        },
                      ]
                    : [],
                ),
              f =
                b.shouldDehydrateQuery ??
                a.getDefaultOptions().dehydrate?.shouldDehydrateQuery ??
                G,
              g = b.shouldRedactErrors ?? a.getDefaultOptions().dehydrate?.shouldRedactErrors,
              h = b.serializeData ?? a.getDefaultOptions().dehydrate?.serializeData;
            return {
              mutations: d,
              queries: a
                .getQueryCache()
                .getAll()
                .flatMap((a) => {
                  let b;
                  return f(a)
                    ? [
                        {
                          dehydratedAt: Date.now(),
                          state: {
                            ...a.state,
                            ...(void 0 !== a.state.data && {
                              data: h ? h(a.state.data) : a.state.data,
                            }),
                          },
                          queryKey: a.queryKey,
                          queryHash: a.queryHash,
                          ...('pending' === a.state.status && {
                            promise:
                              ((b = a.promise
                                ?.then(h)
                                .catch((a) =>
                                  g?.(a) === !1
                                    ? Promise.reject(a)
                                    : Promise.reject(Error('redacted')),
                                )),
                              b?.catch(q),
                              b),
                          }),
                          ...(a.meta && { meta: a.meta }),
                          ...(a.queryType && { queryType: a.queryType }),
                        },
                      ]
                    : [];
                }),
            };
          })(b),
          children: (0, n.jsx)(aa.OverviewContent, {}),
        })
      );
    }
    a.s(['default', 0, nf], 93084);
  },
  80873,
  function (a) {
    a.n(a.i(93084));
  },
  99473,
  (a) => {
    'use strict';
    a.s(['HydrationBoundary', () => b]);
    let b = (0, a.i(62293).registerClientReference)(
      function () {
        throw Error(
          "Attempted to call HydrationBoundary() from the server but HydrationBoundary is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
        );
      },
      '[project]/node_modules/.pnpm/@tanstack+react-query@5.103.2_react@19.3.0/node_modules/@tanstack/react-query/build/modern/HydrationBoundary.js',
      'HydrationBoundary',
    );
  },
  10368,
  (a) => {
    'use strict';
    var b = a.i(99473);
    a.n(b);
  },
  8984,
  (a, b, c) => {
    'use strict';
    Object.defineProperty(c, '__esModule', { value: !0 });
    var d = {
      DynamicServerError: function () {
        return h;
      },
      isDynamicServerError: function () {
        return i;
      },
    };
    for (var f in d) Object.defineProperty(c, f, { enumerable: !0, get: d[f] });
    let g = 'DYNAMIC_SERVER_USAGE';
    class h extends Error {
      constructor(a) {
        (super(`Dynamic server usage: ${a}`), (this.description = a), (this.digest = g));
      }
    }
    function i(a) {
      return (
        'object' == typeof a &&
        null !== a &&
        'digest' in a &&
        'string' == typeof a.digest &&
        a.digest === g
      );
    }
    ('function' == typeof c.default || ('object' == typeof c.default && null !== c.default)) &&
      void 0 === c.default.__esModule &&
      (Object.defineProperty(c.default, '__esModule', { value: !0 }),
      Object.assign(c.default, c),
      (b.exports = c.default));
  },
  98068,
  (a, b, c) => {
    'use strict';
    Object.defineProperty(c, '__esModule', { value: !0 });
    var d = {
      StaticGenBailoutError: function () {
        return h;
      },
      isStaticGenBailoutError: function () {
        return i;
      },
    };
    for (var f in d) Object.defineProperty(c, f, { enumerable: !0, get: d[f] });
    let g = 'NEXT_STATIC_GEN_BAILOUT';
    class h extends Error {
      constructor(...a) {
        (super(...a), (this.code = g));
      }
    }
    function i(a) {
      return 'object' == typeof a && null !== a && 'code' in a && a.code === g;
    }
    ('function' == typeof c.default || ('object' == typeof c.default && null !== c.default)) &&
      void 0 === c.default.__esModule &&
      (Object.defineProperty(c.default, '__esModule', { value: !0 }),
      Object.assign(c.default, c),
      (b.exports = c.default));
  },
  96670,
  (a, b, c) => {
    'use strict';
    (Object.defineProperty(c, '__esModule', { value: !0 }),
      Object.defineProperty(c, 'InvariantError', {
        enumerable: !0,
        get: function () {
          return d;
        },
      }));
    class d extends Error {
      constructor(a, b) {
        (super(`Invariant: ${a.endsWith('.') ? a : a + '.'} This is a bug in Next.js.`, b),
          Object.defineProperty(this, '__NEXT_ERROR_CODE', {
            value: 'E1179',
            enumerable: !1,
            configurable: !0,
          }),
          (this.name = 'InvariantError'));
      }
    }
  },
  44689,
  (a, b, c) => {
    'use strict';
    function d() {
      let a,
        b,
        c = new Promise((c, d) => {
          ((a = c), (b = d));
        });
      return { resolve: a, reject: b, promise: c };
    }
    (Object.defineProperty(c, '__esModule', { value: !0 }),
      Object.defineProperty(c, 'createPromiseWithResolvers', {
        enumerable: !0,
        get: function () {
          return d;
        },
      }));
  },
  61438,
  (a, b, c) => {
    'use strict';
    Object.defineProperty(c, '__esModule', { value: !0 });
    var d,
      f,
      g = {
        RENDER_STAGE_ADVANCE_ORDER: function () {
          return l;
        },
        RenderStage: function () {
          return k;
        },
        StagedRenderingController: function () {
          return p;
        },
        SyncIOMode: function () {
          return o;
        },
        getNextStage: function () {
          return m;
        },
        isAdvanceableRenderStage: function () {
          return n;
        },
      };
    for (var h in g) Object.defineProperty(c, h, { enumerable: !0, get: g[h] });
    let i = a.r(96670),
      j = a.r(44689);
    var k =
      (((d = {})[(d.Before = 1)] = 'Before'),
      (d[(d.ShellStatic = 11)] = 'ShellStatic'),
      (d[(d.Static = 13)] = 'Static'),
      (d[(d.ShellRuntime = 21)] = 'ShellRuntime'),
      (d[(d.Runtime = 23)] = 'Runtime'),
      (d[(d.Dynamic = 30)] = 'Dynamic'),
      (d[(d.Abandoned = 40)] = 'Abandoned'),
      d);
    let l = [11, 13, 21, 23, 30];
    function m(a) {
      return l[l.indexOf(a) + 1];
    }
    function n(a) {
      return 1 < a && a <= 30;
    }
    var o =
      (((f = {})[(f.Untracked = 1)] = 'Untracked'),
      (f[(f.AllowedInRuntimeOrDynamic = 2)] = 'AllowedInRuntimeOrDynamic'),
      (f[(f.AllowedInDynamic = 3)] = 'AllowedInDynamic'),
      f);
    class p {
      constructor({ abortSignal: a, abandonController: b, syncIO: c, finalStage: d }) {
        ((this.currentStage = 1),
          (this.syncInterruptReason = null),
          (this.triggers = { 11: r(), 13: r(), 21: r(), 23: r(), 30: r() }),
          (this.abortSignal = a),
          (this.abandonController = b),
          (this.syncIOMode = c),
          (this.finalStage = d),
          a &&
            a.addEventListener(
              'abort',
              () => {
                let { reason: b } = a;
                for (let a of Object.values(this.triggers)) {
                  var c, d;
                  ((c = a),
                    (d = b),
                    'pending' === c.state &&
                      ((c.state = 'cancelled'),
                      (c._listeners.length = 0),
                      c.promise.catch(q),
                      c._rejectPromise(d)));
                }
              },
              { once: !0 },
            ),
          b &&
            b.signal.addEventListener(
              'abort',
              () => {
                this.abandonRender();
              },
              { once: !0 },
            ));
      }
      onStage(a, b) {
        var c, d;
        ((c = this.triggers[a]), (d = b), 'pending' === c.state ? c._listeners.push(d) : d());
      }
      shouldTrackSyncInterrupt() {
        if (1 === this.syncIOMode) return !1;
        switch (this.currentStage) {
          case 1:
            return !1;
          case 11:
          case 13:
            return !0;
          case 21:
          case 23:
            switch (this.syncIOMode) {
              case 2:
                return !1;
              case 3:
                return !0;
            }
          case 30:
          case 40:
            return !1;
          default:
            return (this.currentStage, !1);
        }
      }
      syncInterruptCurrentStageWithReason(a) {
        let { currentStage: b } = this;
        if (1 !== b && 30 !== b && 40 !== b) {
          if (this.abandonController) return void this.abandonController.abort();
          if (this.abortSignal) {
            ((this.syncInterruptReason = a), (this.currentStage = 40));
            return;
          }
          ((this.syncInterruptReason = a), this.advanceStage(30));
        }
      }
      getSyncInterruptReason() {
        return this.syncInterruptReason;
      }
      getStageEndTime(a) {
        return this.triggers[m(a)].triggeredAt ?? 1 / 0;
      }
      abandonRender() {
        let { currentStage: a } = this;
        if (1 === a)
          throw Object.defineProperty(
            new i.InvariantError("A render that hasn't started yet cannot be abandoned"),
            '__NEXT_ERROR_CODE',
            { value: 'E1300', enumerable: !1, configurable: !0 },
          );
        if (30 === a || 40 === a) return;
        let b = l.indexOf(a) + 1,
          c = l.indexOf(30);
        for (let a = b; a < c; a++) this.resolveStage(l[a]);
        this.currentStage = 40;
      }
      advanceStage(a) {
        if (null !== this.finalStage && a > this.finalStage)
          throw Object.defineProperty(
            new i.InvariantError(
              `Attempted to advance to stage ${k[a]} but the render is limited to ${k[this.finalStage]}`,
            ),
            '__NEXT_ERROR_CODE',
            { value: 'E1302', enumerable: !1, configurable: !0 },
          );
        let { currentStage: b } = this;
        if (30 === b || 40 === b || a <= b) return;
        this.currentStage = a;
        let c = 1 === b ? 0 : l.indexOf(b) + 1,
          d = l.indexOf(a);
        for (let a = c; a <= d; a++) this.resolveStage(l[a]);
      }
      resolveStage(a) {
        var b = this.triggers[a];
        if ('pending' === b.state) {
          ((b.state = 'triggered'), (b.triggeredAt = performance.now() + performance.timeOrigin));
          try {
            let { _listeners: a } = b;
            for (let b = 0; b < a.length; b++) a[b]();
            a.length = 0;
          } finally {
            b._resolvePromise();
          }
        }
      }
      getStagePromise(a) {
        return this.triggers[a].promise;
      }
      waitForStage(a) {
        return this.getStagePromise(a);
      }
      delayUntilStage(a, b, c) {
        let d = this.getStagePromise(a).then(() => c);
        return (this.abortSignal && d.catch(q), d);
      }
    }
    function q() {}
    function r() {
      let { promise: a, resolve: b, reject: c } = (0, j.createPromiseWithResolvers)();
      return {
        state: 'pending',
        triggeredAt: null,
        promise: a,
        _listeners: [],
        _resolvePromise: b,
        _rejectPromise: c,
      };
    }
  },
  84282,
  (a, b, c) => {
    'use strict';
    Object.defineProperty(c, '__esModule', { value: !0 });
    var d = {
      ClientHookDynamicError: function () {
        return l;
      },
      RENDER_STAGES_BY_DATA_KIND: function () {
        return B;
      },
      applyOwnerStack: function () {
        return C;
      },
      isClientHookDynamicError: function () {
        return m;
      },
      isHangingPromiseRejectionError: function () {
        return h;
      },
      makeClientHookHangingPromise: function () {
        return w;
      },
      makeDevtoolsIOAwarePromise: function () {
        return A;
      },
      makeDynamicHangingPromise: function () {
        return o;
      },
      makeFallbackParamsHangingPromise: function () {
        return r;
      },
      makePromiseFromTrigger: function () {
        return z;
      },
      makeRuntimeHangingPromise: function () {
        return q;
      },
      makeStageHangingPromise: function () {
        return s;
      },
      makeUntrackedHangingPromise: function () {
        return p;
      },
      trackFallbackParamsAccessed: function () {
        return u;
      },
      trackRuntimeDataAccessed: function () {
        return t;
      },
    };
    for (var f in d) Object.defineProperty(c, f, { enumerable: !0, get: d[f] });
    let g = a.r(61438);
    function h(a) {
      return 'object' == typeof a && null !== a && 'digest' in a && a.digest === i;
    }
    (a.r(32319), a.r(59043));
    let i = 'HANGING_PROMISE_REJECTION';
    class j extends Error {
      constructor(a, b) {
        (super(
          `During prerendering, ${b} rejects when the prerender is complete. Typically these errors are handled by React but if you move ${b} to a different context by using \`setTimeout\`, \`after\`, or similar functions you may observe this error and you should handle it in that context. This occurred at route "${a}".`,
        ),
          (this.route = a),
          (this.expression = b),
          (this.digest = i));
      }
    }
    let k = 'CLIENT_HOOK_DYNAMIC';
    class l extends Error {
      constructor(a, b) {
        (super(`Route "${a}": Next.js encountered URL data \`${b}\` in a Client Component outside of \`<Suspense>\`.

This blocks prerendering because the value is only available at runtime.

Ways to fix this:
  - [stream] Wrap the component in \`<Suspense fallback={...}>\` so the hook value streams in after prerendering
  - [block] Set \`export const instant = false\` to allow a blocking route

Learn more: https://nextjs.org/docs/messages/blocking-prerender-client-hook`),
          (this.digest = k),
          Object.defineProperty(this, '__NEXT_ERROR_CODE', {
            value: 'E1433',
            enumerable: !1,
            configurable: !0,
          }));
      }
    }
    function m(a) {
      return 'object' == typeof a && null !== a && 'digest' in a && a.digest === k;
    }
    let n = new WeakMap();
    function o(a, b, c) {
      return x(a, new j(b, c));
    }
    function p(a, b, c) {
      return x(a, new j(b, c));
    }
    function q(a, b, c, d) {
      return (null !== d && t(d), x(a, new j(b, c)));
    }
    function r(a, b, c, d) {
      return (null !== d && u(d), x(a, new j(b, c)));
    }
    function s(a, b, c, d) {
      return (t(d), x(a, new j(b, c)));
    }
    function t(a) {
      v(a, !1);
    }
    function u(a) {
      v(a, !0);
    }
    function v(a, b) {
      if ('prerender' === a.type) {
        var c;
        null == (c = a.runtimeDataAccessed) || c.resolve(!0);
        let d = a.shouldAttemptStaticPrefetch;
        null === d || (b && a.isFallbackUpgradeable) || (d.current = !1);
      }
    }
    function w(a, b) {
      return x(a, b);
    }
    function x(a, b) {
      if (a.aborted) return Promise.reject(b);
      {
        let c = new Promise((c, d) => {
          let f = d.bind(null, b),
            g = n.get(a);
          if (g) g.push(f);
          else {
            let b = [f];
            (n.set(a, b),
              a.addEventListener(
                'abort',
                () => {
                  for (let a = 0; a < b.length; a++) b[a]();
                },
                { once: !0 },
              ));
          }
        });
        return (c.catch(y), c);
      }
    }
    function y() {}
    function z(a, b) {
      let c = a.then(() => b);
      return (c.catch(y), c);
    }
    function A(a, b, c) {
      return b.stagedRendering
        ? b.stagedRendering.delayUntilStage(c, void 0, a)
        : new Promise((b) => {
            setTimeout(() => {
              b(a);
            }, 0);
          });
    }
    let B = {
      sessionData: g.RenderStage.ShellRuntime,
      staticLinkData: g.RenderStage.Static,
      runtimeLinkData: g.RenderStage.Runtime,
    };
    function C(a) {
      return a;
    }
  },
  83966,
  (a, b, c) => {
    'use strict';
    Object.defineProperty(c, '__esModule', { value: !0 });
    var d = {
      METADATA_BOUNDARY_NAME: function () {
        return g;
      },
      OUTLET_BOUNDARY_NAME: function () {
        return i;
      },
      ROOT_LAYOUT_BOUNDARY_NAME: function () {
        return j;
      },
      VIEWPORT_BOUNDARY_NAME: function () {
        return h;
      },
    };
    for (var f in d) Object.defineProperty(c, f, { enumerable: !0, get: d[f] });
    let g = '__next_metadata_boundary__',
      h = '__next_viewport_boundary__',
      i = '__next_outlet_boundary__',
      j = '__next_root_layout_boundary__';
  },
  15086,
  (a, b, c) => {
    'use strict';
    Object.defineProperty(c, '__esModule', { value: !0 });
    var d = {
      atLeastOneTask: function () {
        return i;
      },
      scheduleImmediate: function () {
        return h;
      },
      scheduleOnNextTick: function () {
        return g;
      },
      waitAtLeastOneReactRenderTask: function () {
        return j;
      },
    };
    for (var f in d) Object.defineProperty(c, f, { enumerable: !0, get: d[f] });
    let g = (a) => {
        Promise.resolve().then(() => {
          process.nextTick(a);
        });
      },
      h = (a) => {
        setImmediate(a);
      };
    function i() {
      return new Promise((a) => h(a));
    }
    function j() {
      return new Promise((a) => setImmediate(a));
    }
  },
  19783,
  (a, b, c) => {
    'use strict';
    Object.defineProperty(c, '__esModule', { value: !0 });
    var d = {
      BailoutToCSRError: function () {
        return h;
      },
      isBailoutToCSRError: function () {
        return i;
      },
    };
    for (var f in d) Object.defineProperty(c, f, { enumerable: !0, get: d[f] });
    let g = 'BAILOUT_TO_CLIENT_SIDE_RENDERING';
    class h extends Error {
      constructor(a) {
        (super(`Bail out to client-side rendering: ${a}`), (this.reason = a), (this.digest = g));
      }
    }
    function i(a) {
      return 'object' == typeof a && null !== a && 'digest' in a && a.digest === g;
    }
  },
  52532,
  (a, b, c) => {
    'use strict';
    Object.defineProperty(c, '__esModule', { value: !0 });
    var d = {
      createDynamicBodyError: function () {
        return h;
      },
      createDynamicBodyErrorInNavigation: function () {
        return k;
      },
      createDynamicMetadataError: function () {
        return o;
      },
      createDynamicOrRuntimeBodyError: function () {
        return l;
      },
      createDynamicOrRuntimeMetadataError: function () {
        return t;
      },
      createDynamicOrRuntimeViewportError: function () {
        return s;
      },
      createDynamicViewportError: function () {
        return r;
      },
      createLinkBodyErrorInNavigation: function () {
        return j;
      },
      createLinkMetadataError: function () {
        return m;
      },
      createLinkViewportError: function () {
        return p;
      },
      createRuntimeBodyError: function () {
        return g;
      },
      createRuntimeBodyErrorInNavigation: function () {
        return i;
      },
      createRuntimeMetadataError: function () {
        return n;
      },
      createRuntimeViewportError: function () {
        return q;
      },
      logBuildDebugHint: function () {
        return u;
      },
    };
    for (var f in d) Object.defineProperty(c, f, { enumerable: !0, get: d[f] });
    function g(a) {
      return Object.defineProperty(
        Error(`Route "${a}": Next.js encountered runtime data during prerendering.

\`cookies()\`, \`headers()\`, \`params\`, or \`searchParams\` accessed outside of \`<Suspense>\` prevents the route from being prerendered, blocking the page load and leading to a slower user experience.

Ways to fix this:
  - [stream] Provide a placeholder with \`<Suspense fallback={...}>\` around the data access
  - [block] Set \`export const instant = false\` to allow a blocking route

Learn more: https://nextjs.org/docs/messages/blocking-prerender-runtime`),
        '__NEXT_ERROR_CODE',
        { value: 'E1427', enumerable: !1, configurable: !0 },
      );
    }
    function h(a) {
      return Object.defineProperty(
        Error(`Route "${a}": Next.js encountered uncached data during prerendering.

\`fetch(...)\` or \`connection()\` accessed outside of \`<Suspense>\` prevents the route from being prerendered, blocking the page load and leading to a slower user experience.

Ways to fix this:
  - [stream] Provide a placeholder with \`<Suspense fallback={...}>\` around the data access
  - [cache] Cache the data access with \`"use cache"\` (does not apply to \`connection()\`)
  - [block] Set \`export const instant = false\` to allow a blocking route

Learn more: https://nextjs.org/docs/messages/blocking-prerender-dynamic`),
        '__NEXT_ERROR_CODE',
        { value: 'E1440', enumerable: !1, configurable: !0 },
      );
    }
    function i(a) {
      return Object.defineProperty(
        Error(`Route "${a}": Next.js encountered runtime data during prerendering or a navigation.

\`cookies()\`, \`headers()\`, \`params\`, or \`searchParams\` accessed outside of \`<Suspense>\` prevents the route from being prerendered or the navigation from being instant, leading to a slower user experience.

Ways to fix this:
  - [stream] Provide a placeholder with \`<Suspense fallback={...}>\` around the data access
  - [block] Set \`export const instant = false\` to allow a blocking route

Learn more: https://nextjs.org/docs/messages/blocking-prerender-runtime`),
        '__NEXT_ERROR_CODE',
        { value: 'E1430', enumerable: !1, configurable: !0 },
      );
    }
    function j(a) {
      return Object.defineProperty(
        Error(`Route "${a}": Next.js encountered URL data during prerendering or a navigation.

\`params\` or \`searchParams\` accessed outside of \`<Suspense>\` may prevent the navigation from being instant, leading to a slower user experience.

Ways to fix this:
  - [stream] Provide a placeholder with \`<Suspense fallback={...}>\` around the data access
  - [block] Set \`export const instant = false\` to allow a blocking route

Learn more: https://nextjs.org/docs/messages/instant-shell-url-data`),
        '__NEXT_ERROR_CODE',
        { value: 'E1439', enumerable: !1, configurable: !0 },
      );
    }
    function k(a) {
      return Object.defineProperty(
        Error(`Route "${a}": Next.js encountered uncached data during prerendering or a navigation.

\`fetch(...)\` or \`connection()\` accessed outside of \`<Suspense>\` prevents the route from being prerendered or the navigation from being instant, leading to a slower user experience.

Ways to fix this:
  - [stream] Provide a placeholder with \`<Suspense fallback={...}>\` around the data access
  - [cache] Cache the data access with \`"use cache"\` (does not apply to \`connection()\`)
  - [block] Set \`export const instant = false\` to allow a blocking route

Learn more: https://nextjs.org/docs/messages/blocking-prerender-dynamic`),
        '__NEXT_ERROR_CODE',
        { value: 'E1437', enumerable: !1, configurable: !0 },
      );
    }
    function l(a) {
      return Object.defineProperty(
        Error(`Route "${a}": Next.js encountered uncached or runtime data during prerendering.

\`fetch(...)\`, \`cookies()\`, \`headers()\`, \`params\`, \`searchParams\`, or \`connection()\` accessed outside of \`<Suspense>\` prevents the route from being prerendered, blocking the page load and leading to a slower user experience.

Ways to fix this:
  - [stream] Provide a placeholder with \`<Suspense fallback={...}>\` around the data access
  - [cache] For uncached data (\`fetch\`, database calls): cache the access with \`"use cache"\` (does not apply to \`connection()\`)
  - [block] Set \`export const instant = false\` to allow a blocking route

Learn more: https://nextjs.org/docs/messages/blocking-prerender-dynamic`),
        '__NEXT_ERROR_CODE',
        { value: 'E1428', enumerable: !1, configurable: !0 },
      );
    }
    function m(a) {
      return Object.defineProperty(
        Error(`Route "${a}": Next.js encountered URL data in \`generateMetadata()\`.

This route's metadata is blocked, but the rest of its content can be prefetched. \`params\` or \`searchParams\` accessed in \`generateMetadata()\` prevent it from being prefetched.

Ways to fix this:
  - [static] Use a static metadata export instead of \`generateMetadata()\`
  - [dynamic] Render a marker component that calls \`await connection()\` inside \`<Suspense>\` on the page

Learn more: https://nextjs.org/docs/messages/blocking-prerender-metadata-runtime`),
        '__NEXT_ERROR_CODE',
        { value: 'E1429', enumerable: !1, configurable: !0 },
      );
    }
    function n(a) {
      return Object.defineProperty(
        Error(`Route "${a}": Next.js encountered runtime data in \`generateMetadata()\`.

This route's metadata is blocked, but the rest of its content can be prerendered. \`cookies()\`, \`headers()\`, \`params\`, or \`searchParams\` accessed in \`generateMetadata()\` cause it to run dynamically.

Ways to fix this:
  - [static] Use a static metadata export instead of \`generateMetadata()\`
  - [dynamic] Render a marker component that calls \`await connection()\` inside \`<Suspense>\` on the page

Learn more: https://nextjs.org/docs/messages/blocking-prerender-metadata-runtime`),
        '__NEXT_ERROR_CODE',
        { value: 'E1423', enumerable: !1, configurable: !0 },
      );
    }
    function o(a) {
      return Object.defineProperty(
        Error(`Route "${a}": Next.js encountered uncached data in \`generateMetadata()\`.

This route's metadata is blocked, but the rest of its content can be prerendered. \`fetch(...)\` or \`connection()\` accessed in \`generateMetadata()\` cause it to run dynamically.

Ways to fix this:
  - [cache] Cache the metadata with \`"use cache"\` in \`generateMetadata()\` (does not apply to \`connection()\`)
  - [dynamic] Render a marker component that calls \`await connection()\` inside \`<Suspense>\` on the page

Learn more: https://nextjs.org/docs/messages/blocking-prerender-metadata-dynamic`),
        '__NEXT_ERROR_CODE',
        { value: 'E1425', enumerable: !1, configurable: !0 },
      );
    }
    function p(a) {
      return Object.defineProperty(
        Error(`Route "${a}": Next.js encountered URL data in \`generateViewport()\`.

\`params\` or \`searchParams\` in \`generateViewport()\` prevents the page from being prerendered, leading to a slower user experience.

Ways to fix this:
  - [static] Use a static viewport export instead of \`generateViewport()\`
  - [block] Set \`export const instant = false\` to allow a blocking route

Learn more: https://nextjs.org/docs/messages/blocking-prerender-viewport-runtime`),
        '__NEXT_ERROR_CODE',
        { value: 'E1431', enumerable: !1, configurable: !0 },
      );
    }
    function q(a) {
      return Object.defineProperty(
        Error(`Route "${a}": Next.js encountered runtime data in \`generateViewport()\`.

\`cookies()\`, \`headers()\`, \`params\`, or \`searchParams\` in \`generateViewport()\` prevents the page from being prerendered, leading to a slower user experience.

Ways to fix this:
  - [static] Use a static viewport export instead of \`generateViewport()\`
  - [block] Set \`export const instant = false\` to allow a blocking route

Learn more: https://nextjs.org/docs/messages/blocking-prerender-viewport-runtime`),
        '__NEXT_ERROR_CODE',
        { value: 'E1424', enumerable: !1, configurable: !0 },
      );
    }
    function r(a) {
      return Object.defineProperty(
        Error(`Route "${a}": Next.js encountered uncached data in \`generateViewport()\`.

\`fetch(...)\` or \`connection()\` in \`generateViewport()\` prevents the page from being prerendered, leading to a slower user experience.

Ways to fix this:
  - [cache] Cache the viewport data with \`"use cache"\` in \`generateViewport()\` (does not apply to \`connection()\`)
  - [block] Set \`export const instant = false\` to allow a blocking route

Learn more: https://nextjs.org/docs/messages/blocking-prerender-viewport-dynamic`),
        '__NEXT_ERROR_CODE',
        { value: 'E1438', enumerable: !1, configurable: !0 },
      );
    }
    function s(a) {
      return Object.defineProperty(
        Error(`Route "${a}": Next.js encountered uncached or runtime data in \`generateViewport()\`.

This prevents the page from being prerendered, leading to a slower user experience. Unlike metadata, viewport cannot be streamed behind \`<Suspense>\` because it affects the initial page load.

Ways to fix this:
  - [static] Use a static viewport export instead of \`generateViewport()\`
  - [cache] For uncached data (\`fetch\`, database calls): cache the viewport with \`"use cache"\` in \`generateViewport()\` (does not apply to \`connection()\`)
  - [block] Set \`export const instant = false\` to allow a blocking route

Learn more: https://nextjs.org/docs/messages/blocking-prerender-viewport-runtime`),
        '__NEXT_ERROR_CODE',
        { value: 'E1436', enumerable: !1, configurable: !0 },
      );
    }
    function t(a) {
      return Object.defineProperty(
        Error(`Route "${a}": Next.js encountered uncached or runtime data in \`generateMetadata()\`.

This route's metadata is blocked, but the rest of its content can be prerendered.

Ways to fix this:
  - [static] Use a static metadata export instead of \`generateMetadata()\`
  - [cache] Cache the metadata with \`"use cache"\` in \`generateMetadata()\` (does not apply to \`connection()\`)
  - [dynamic] Render a marker component that calls \`await connection()\` inside \`<Suspense>\` on the page

Learn more: https://nextjs.org/docs/messages/blocking-prerender-metadata-runtime`),
        '__NEXT_ERROR_CODE',
        { value: 'E1426', enumerable: !1, configurable: !0 },
      );
    }
    function u(a) {
      console.error(`To get a more detailed stack trace and pinpoint the issue, try one of the following:
  - Start the app in development mode by running \`next dev\`, then open "${a}" in your browser to investigate the error.
  - Rerun the production build with \`next build --debug-prerender\` to generate better stack traces.`);
    }
  },
  17389,
  (a, b, c) => {
    'use strict';
    Object.defineProperty(c, '__esModule', { value: !0 });
    var d = {
      INSTANT_SLOT_MARKER_PREFIX: function () {
        return h;
      },
      INSTANT_SLOT_MARKER_SUFFIX: function () {
        return i;
      },
      INSTANT_VALIDATION_BOUNDARY_NAME: function () {
        return g;
      },
    };
    for (var f in d) Object.defineProperty(c, f, { enumerable: !0, get: d[f] });
    let g = '__next_instant_validation_boundary__',
      h = '__next_instant_slot_',
      i = '__';
  },
  22700,
  (a, b, c) => {
    'use strict';
    Object.defineProperty(c, '__esModule', { value: !0 });
    var d = {
      allRequiredBoundariesRendered: function () {
        return h;
      },
      createValidationBoundaryTracking: function () {
        return g;
      },
    };
    for (var f in d) Object.defineProperty(c, f, { enumerable: !0, get: d[f] });
    function g() {
      return { requiredIds: new Map(), renderedIds: new Set() };
    }
    function h(a) {
      for (let b of a.requiredIds.keys()) if (!a.renderedIds.has(b)) return !1;
      return !0;
    }
  },
  4076,
  (a, b, c) => {
    'use strict';
    Object.defineProperty(c, '__esModule', { value: !0 });
    var d = {
      createLinkPrefetchPartialError: function () {
        return h;
      },
      createUnrenderedSegmentError: function () {
        return g;
      },
    };
    for (var f in d) Object.defineProperty(c, f, { enumerable: !0, get: d[f] });
    function g(a, b) {
      let c = `Route "${a}": Could not validate that a segment in your UI has instant navigation.`;
      if (b.length > 0) {
        let a = 1 === b.length ? 'Dropped segment' : 'Dropped segments';
        c += `

This segment was dropped from rendering. Issues that would prevent instant navigation will go undetected.

${a}:
${b.map((a) => `  ${a}`).join('\n')}

Ways to fix this:
  - [render] Render the dropped segment
  - [ignore] Set \`export const instant = false\` to opt the dropped segment out of instant-navigation validation

Learn more: https://nextjs.org/docs/messages/instant-unrendered-segment`;
      }
      return Object.defineProperty(Error(c), '__NEXT_ERROR_CODE', {
        value: 'E1286',
        enumerable: !1,
        configurable: !0,
      });
    }
    function h(a) {
      return Object.defineProperty(
        Error(`Next.js encountered dynamic data during prefetching for "${a}".

This will lead to slower, more expensive prefetches.

Ways to fix this:
  - [upgrade] Opt into Partial Prefetching by exporting \`const prefetch = 'partial'\` from the page or layout, or by setting \`partialPrefetching: true\` in next.config to opt the whole app in
  - [disable] Remove \`prefetch={true}\` from the <Link> to use the default prefetch
  - [ignore] Set \`export const instant = false\` to opt the route out of instant-navigation validation

Learn more: https://nextjs.org/docs/messages/instant-link-prefetch-partial`),
        '__NEXT_ERROR_CODE',
        { value: 'E1435', enumerable: !1, configurable: !0 },
      );
    }
  },
  45101,
  (a, b, c) => {
    'use strict';
    Object.defineProperty(c, '__esModule', { value: !0 });
    var d,
      f,
      g,
      h = {
        DynamicHoleKind: function () {
          return ag;
        },
        Postpone: function () {
          return I;
        },
        PreludeState: function () {
          return an;
        },
        abortAndThrowOnSynchronousRequestDataAccess: function () {
          return H;
        },
        abortOnSynchronousPlatformIOAccess: function () {
          return G;
        },
        accessedDynamicData: function () {
          return Q;
        },
        annotateDynamicAccess: function () {
          return W;
        },
        consumeDynamicAccess: function () {
          return R;
        },
        createDynamicTrackingState: function () {
          return y;
        },
        createDynamicValidationState: function () {
          return z;
        },
        createHangingInputAbortSignal: function () {
          return U;
        },
        createInstantValidationState: function () {
          return ah;
        },
        createRenderInBrowserAbortSignal: function () {
          return T;
        },
        formatDynamicAPIAccesses: function () {
          return S;
        },
        getFirstDynamicReason: function () {
          return B;
        },
        getNavigationDisallowedDynamicReasons: function () {
          return as;
        },
        getStaticShellDisallowedDynamicReasons: function () {
          return ar;
        },
        isDynamicPostpone: function () {
          return L;
        },
        isPrerenderInterruptedError: function () {
          return P;
        },
        logDisallowedDynamicError: function () {
          return ao;
        },
        markCurrentScopeAsDynamic: function () {
          return C;
        },
        postponeWithTracking: function () {
          return J;
        },
        throwIfDisallowedDynamic: function () {
          return aq;
        },
        throwIfSyncIOUsed: function () {
          return ap;
        },
        throwToInterruptStaticGeneration: function () {
          return D;
        },
        trackAllowedDynamicAccess: function () {
          return af;
        },
        trackDynamicDataInDynamicRender: function () {
          return E;
        },
        trackDynamicHoleInNavigation: function () {
          return ai;
        },
        trackDynamicHoleInRuntimeShell: function () {
          return ak;
        },
        trackDynamicHoleInStaticShell: function () {
          return al;
        },
        trackThrownErrorInNavigation: function () {
          return aj;
        },
        useDynamicRouteParams: function () {
          return X;
        },
        useDynamicSearchParams: function () {
          return Y;
        },
      };
    for (var i in h) Object.defineProperty(c, i, { enumerable: !0, get: h[i] });
    let j = (d = a.r(90302)) && d.__esModule ? d : { default: d },
      k = a.r(8984),
      l = a.r(98068),
      m = a.r(32319),
      n = a.r(56704),
      o = a.r(84282),
      p = a.r(83966),
      q = a.r(15086),
      r = a.r(19783),
      s = a.r(52532),
      t = a.r(96670),
      u = a.r(17389),
      v = a.r(22700),
      w = a.r(4076),
      x = 'function' == typeof j.default.unstable_postpone;
    function y(a) {
      return {
        isDebugDynamicAccesses: a,
        dynamicAccesses: [],
        syncDynamicErrorWithStack: null,
        syncDynamicErrorWithStackPostMicrotask: !1,
      };
    }
    function z() {
      return {
        hasSuspenseAboveBody: !1,
        hasDynamicMetadata: !1,
        dynamicMetadata: null,
        hasDynamicViewport: !1,
        hasAllowedDynamic: !1,
        dynamicErrors: [],
      };
    }
    function A(a) {
      return a.syncDynamicErrorWithStackPostMicrotask ? null : a.syncDynamicErrorWithStack;
    }
    function B(a) {
      var b;
      return null == (b = a.dynamicAccesses[0]) ? void 0 : b.expression;
    }
    function C(a, b, c) {
      if (b)
        switch (b.type) {
          case 'cache':
          case 'unstable-cache':
          case 'private-cache':
            return;
        }
      if (!a.forceDynamic && !a.forceStatic) {
        if (a.dynamicShouldError)
          throw Object.defineProperty(
            new l.StaticGenBailoutError(
              `Route ${a.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`${c}\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`,
            ),
            '__NEXT_ERROR_CODE',
            { value: 'E553', enumerable: !1, configurable: !0 },
          );
        if (b)
          switch (b.type) {
            case 'prerender-ppr':
              return J(a.route, c, b.dynamicTracking);
            case 'prerender-legacy':
              b.revalidate = 0;
              let d = Object.defineProperty(
                new k.DynamicServerError(
                  `Route ${a.route} couldn't be rendered statically because it used ${c}. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`,
                ),
                '__NEXT_ERROR_CODE',
                { value: 'E550', enumerable: !1, configurable: !0 },
              );
              throw ((a.dynamicUsageDescription = c), (a.dynamicUsageStack = d.stack), d);
          }
      }
    }
    function D(a, b, c) {
      let d = Object.defineProperty(
        new k.DynamicServerError(
          `Route ${b.route} couldn't be rendered statically because it used \`${a}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`,
        ),
        '__NEXT_ERROR_CODE',
        { value: 'E558', enumerable: !1, configurable: !0 },
      );
      throw (
        (c.revalidate = 0),
        (b.dynamicUsageDescription = a),
        (b.dynamicUsageStack = d.stack),
        d
      );
    }
    function E(a) {
      switch (a.type) {
        case 'cache':
        case 'unstable-cache':
        case 'private-cache':
          return;
      }
    }
    function F(a, b, c) {
      let d = O(`Route ${a} needs to bail out of prerendering at this point because it used ${b}.`);
      c.controller.abort(d);
      let f = c.dynamicTracking;
      f &&
        f.dynamicAccesses.push({
          stack: f.isDebugDynamicAccesses ? Error().stack : void 0,
          expression: b,
        });
    }
    function G(a, b, c, d) {
      let f = d.dynamicTracking;
      (f &&
        null === f.syncDynamicErrorWithStack &&
        ((f.syncDynamicErrorWithStack = c),
        queueMicrotask(() => {
          f.syncDynamicErrorWithStackPostMicrotask = !0;
        })),
        F(a, b, d));
    }
    function H(a, b, c, d) {
      if (((0, o.trackRuntimeDataAccessed)(d), !1 === d.controller.signal.aborted)) {
        F(a, b, d);
        let f = d.dynamicTracking;
        f && null === f.syncDynamicErrorWithStack && (f.syncDynamicErrorWithStack = c);
      }
      throw O(`Route ${a} needs to bail out of prerendering at this point because it used ${b}.`);
    }
    function I({ reason: a, route: b }) {
      let c = m.workUnitAsyncStorage.getStore();
      J(b, a, c && 'prerender-ppr' === c.type ? c.dynamicTracking : null);
    }
    function J(a, b, c) {
      ((function () {
        if (!x)
          throw Object.defineProperty(
            Error(
              'Invariant: React.unstable_postpone is not defined. This suggests the wrong version of React was loaded. This is a bug in Next.js',
            ),
            '__NEXT_ERROR_CODE',
            { value: 'E224', enumerable: !1, configurable: !0 },
          );
      })(),
        c &&
          c.dynamicAccesses.push({
            stack: c.isDebugDynamicAccesses ? Error().stack : void 0,
            expression: b,
          }),
        j.default.unstable_postpone(K(a, b)));
    }
    function K(a, b) {
      return `Route ${a} needs to bail out of prerendering at this point because it used ${b}. React throws this special object to indicate where. It should not be caught by your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error`;
    }
    function L(a) {
      return 'object' == typeof a && null !== a && 'string' == typeof a.message && M(a.message);
    }
    function M(a) {
      return (
        a.includes('needs to bail out of prerendering at this point because it used') &&
        a.includes('Learn more: https://nextjs.org/docs/messages/ppr-caught-error')
      );
    }
    if (!1 === M(K('%%%', '^^^')))
      throw Object.defineProperty(
        Error(
          'Invariant: isDynamicPostpone misidentified a postpone reason. This is a bug in Next.js',
        ),
        '__NEXT_ERROR_CODE',
        { value: 'E296', enumerable: !1, configurable: !0 },
      );
    let N = 'NEXT_PRERENDER_INTERRUPTED';
    function O(a) {
      let b = Object.defineProperty(Error(a), '__NEXT_ERROR_CODE', {
        value: 'E394',
        enumerable: !1,
        configurable: !0,
      });
      return ((b.digest = N), b);
    }
    function P(a) {
      return (
        'object' == typeof a &&
        null !== a &&
        a.digest === N &&
        'name' in a &&
        'message' in a &&
        a instanceof Error
      );
    }
    function Q(a) {
      return a.length > 0;
    }
    function R(a, b) {
      return (a.dynamicAccesses.push(...b.dynamicAccesses), a.dynamicAccesses);
    }
    function S(a) {
      return a
        .filter((a) => 'string' == typeof a.stack && a.stack.length > 0)
        .map(
          ({ expression: a, stack: b }) => (
            (b = b
              .split('\n')
              .slice(4)
              .filter(
                (a) =>
                  !(
                    a.includes('node_modules/next/') ||
                    a.includes(' (<anonymous>)') ||
                    a.includes(' (node:')
                  ),
              )
              .join('\n')),
            `Dynamic API Usage Debug - ${a}:
${b}`
          ),
        );
    }
    function T() {
      let a = new AbortController();
      return (
        a.abort(
          Object.defineProperty(new r.BailoutToCSRError('Render in Browser'), '__NEXT_ERROR_CODE', {
            value: 'E721',
            enumerable: !1,
            configurable: !0,
          }),
        ),
        a.signal
      );
    }
    function U(a) {
      switch (a.type) {
        case 'prerender':
        case 'prerender-runtime':
          let b = new AbortController();
          if (a.cacheSignal)
            a.cacheSignal.inputReady().then(() => {
              b.abort();
            });
          else {
            let c = (0, m.getStagedRenderingController)(a);
            c && null !== c.finalStage
              ? c
                  .waitForStage(c.finalStage)
                  .then(() => (0, q.scheduleOnNextTick)(() => b.abort()), V)
              : (0, q.scheduleOnNextTick)(() => b.abort());
          }
          return b.signal;
        case 'prerender-client':
        case 'validation-client':
        case 'prerender-ppr':
        case 'prerender-legacy':
        case 'request':
        case 'cache':
        case 'private-cache':
        case 'unstable-cache':
        case 'generate-static-params':
          return;
      }
    }
    function V() {}
    function W(a, b) {
      let c = b.dynamicTracking;
      c &&
        c.dynamicAccesses.push({
          stack: c.isDebugDynamicAccesses ? Error().stack : void 0,
          expression: a,
        });
    }
    function X(a) {
      let b = n.workAsyncStorage.getStore(),
        c = m.workUnitAsyncStorage.getStore();
      if (b && c)
        switch (c.type) {
          case 'prerender-client': {
            let d = c.fallbackRouteParams;
            d &&
              d.size > 0 &&
              j.default.use(
                (0, o.makeClientHookHangingPromise)(
                  c.renderSignal,
                  new o.ClientHookDynamicError(b.route, a),
                ),
              );
            break;
          }
          case 'prerender':
            throw Object.defineProperty(
              new t.InvariantError(
                `\`${a}\` was called from a Server Component. Next.js should be preventing ${a} from being included in server components statically, but did not in this case.`,
              ),
              '__NEXT_ERROR_CODE',
              { value: 'E795', enumerable: !1, configurable: !0 },
            );
          case 'prerender-ppr': {
            let d = c.fallbackRouteParams;
            if (d && d.size > 0) return J(b.route, a, c.dynamicTracking);
            break;
          }
          case 'validation-client':
          case 'prerender-legacy':
          case 'request':
          case 'unstable-cache':
            break;
          case 'prerender-runtime':
            throw Object.defineProperty(
              new t.InvariantError(
                `\`${a}\` was called during a runtime prerender. Next.js should be preventing ${a} from being included in server components statically, but did not in this case.`,
              ),
              '__NEXT_ERROR_CODE',
              { value: 'E771', enumerable: !1, configurable: !0 },
            );
          case 'cache':
          case 'private-cache':
            throw Object.defineProperty(
              new t.InvariantError(
                `\`${a}\` was called inside a cache scope. Next.js should be preventing ${a} from being included in server components statically, but did not in this case.`,
              ),
              '__NEXT_ERROR_CODE',
              { value: 'E745', enumerable: !1, configurable: !0 },
            );
          case 'generate-static-params':
            throw Object.defineProperty(
              new t.InvariantError(
                `\`${a}\` was called in \`generateStaticParams\`. Next.js should be preventing ${a} from being included in server component files statically, but did not in this case.`,
              ),
              '__NEXT_ERROR_CODE',
              { value: 'E1130', enumerable: !1, configurable: !0 },
            );
        }
    }
    function Y(a) {
      let b = n.workAsyncStorage.getStore(),
        c = m.workUnitAsyncStorage.getStore();
      if (b)
        switch ((!c && (0, m.throwForMissingRequestStore)(a), c.type)) {
          case 'validation-client':
          case 'request':
            return;
          case 'prerender-client':
            j.default.use(
              (0, o.makeClientHookHangingPromise)(
                c.renderSignal,
                new o.ClientHookDynamicError(b.route, a),
              ),
            );
            break;
          case 'prerender-legacy':
          case 'prerender-ppr':
            if (b.forceStatic) return;
            throw Object.defineProperty(new r.BailoutToCSRError(a), '__NEXT_ERROR_CODE', {
              value: 'E394',
              enumerable: !1,
              configurable: !0,
            });
          case 'prerender':
          case 'prerender-runtime':
            throw Object.defineProperty(
              new t.InvariantError(
                `\`${a}\` was called from a Server Component. Next.js should be preventing ${a} from being included in server components statically, but did not in this case.`,
              ),
              '__NEXT_ERROR_CODE',
              { value: 'E795', enumerable: !1, configurable: !0 },
            );
          case 'cache':
          case 'unstable-cache':
          case 'private-cache':
            throw Object.defineProperty(
              new t.InvariantError(
                `\`${a}\` was called inside a cache scope. Next.js should be preventing ${a} from being included in server components statically, but did not in this case.`,
              ),
              '__NEXT_ERROR_CODE',
              { value: 'E745', enumerable: !1, configurable: !0 },
            );
          case 'generate-static-params':
            throw Object.defineProperty(
              new t.InvariantError(
                `\`${a}\` was called in \`generateStaticParams\`. Next.js should be preventing ${a} from being included in server component files statically, but did not in this case.`,
              ),
              '__NEXT_ERROR_CODE',
              { value: 'E1130', enumerable: !1, configurable: !0 },
            );
        }
    }
    let Z = /\n\s+at Suspense \(<anonymous>\)/,
      $ = RegExp(
        `\\n\\s+at Suspense \\(<anonymous>\\)(?:(?!\\n\\s+at (?:body|div|main|section|article|aside|header|footer|nav|form|p|span|h1|h2|h3|h4|h5|h6) \\(<anonymous>\\))[\\s\\S])*?\\n\\s+at ${p.ROOT_LAYOUT_BOUNDARY_NAME} \\([^\\n]*\\)`,
      ),
      _ = RegExp(`\\n\\s+at ${p.METADATA_BOUNDARY_NAME}[\\n\\s]`),
      aa = RegExp(`\\n\\s+at ${p.VIEWPORT_BOUNDARY_NAME}[\\n\\s]`),
      ab = RegExp(`\\n\\s+at ${p.OUTLET_BOUNDARY_NAME}[\\n\\s]`),
      ac = RegExp(`\\n\\s+at ${u.INSTANT_VALIDATION_BOUNDARY_NAME}[\\n\\s]`),
      ad = RegExp(
        `\\n\\s+at ${u.INSTANT_SLOT_MARKER_PREFIX}(\\d+)${u.INSTANT_SLOT_MARKER_SUFFIX}[\\n\\s]`,
      );
    function ae(a, b) {
      $.test(a) && (b.hasSuspenseAboveBody = !0);
    }
    function af(a, b, c, d, f) {
      let g = A(f);
      if (ab.test(c)) return void ae(c, d);
      if (_.test(c)) {
        d.hasDynamicMetadata = !0;
        return;
      }
      if (aa.test(c)) {
        d.hasDynamicViewport = !0;
        return;
      }
      if ($.test(c)) {
        ((d.hasAllowedDynamic = !0), (d.hasSuspenseAboveBody = !0));
        return;
      }
      if (Z.test(c)) {
        d.hasAllowedDynamic = !0;
        return;
      } else if (g) return void d.dynamicErrors.push(g);
      if ((0, o.isClientHookDynamicError)(a)) return void d.dynamicErrors.push(am(a, c, null));
      let h = am((0, s.createDynamicOrRuntimeBodyError)(b.route), c, null);
      d.dynamicErrors.push(h);
    }
    var ag =
      (((f = {})[(f.Link = 1)] = 'Link'),
      (f[(f.Runtime = 2)] = 'Runtime'),
      (f[(f.Dynamic = 3)] = 'Dynamic'),
      f);
    function ah(a) {
      return {
        hasDynamicMetadata: !1,
        hasAllowedClientDynamicAboveBoundary: !1,
        dynamicMetadata: null,
        hasDynamicViewport: !1,
        hasAllowedDynamic: !1,
        dynamicErrors: [],
        validationPreventingErrors: [],
        thrownErrorsOutsideBoundary: [],
        slotStacks: a,
      };
    }
    function ai(a, b, c, d, f, g, h) {
      let i = A(f);
      if (ab.test(c)) return;
      let j = (function (a, b) {
        let { slotStacks: c } = b;
        if (c.length > 1) {
          let b = ad.exec(a);
          if (b) {
            let a = c[parseInt(b[1], 10) + 1];
            if (null != a) return a;
          }
        }
        return c[0] ?? null;
      })(c, d);
      if (_.test(c)) {
        d.dynamicMetadata = am(
          1 === g
            ? (0, s.createLinkMetadataError)(b.route)
            : 2 === g
              ? (0, s.createRuntimeMetadataError)(b.route)
              : (0, s.createDynamicMetadataError)(b.route),
          c,
          j,
        );
        return;
      }
      if (aa.test(c)) {
        let a = am(
          1 === g
            ? (0, s.createLinkViewportError)(b.route)
            : 2 === g
              ? (0, s.createRuntimeViewportError)(b.route)
              : (0, s.createDynamicViewportError)(b.route),
          c,
          j,
        );
        d.dynamicErrors.push(a);
        return;
      }
      let k = ac.exec(c);
      if (k) {
        let a = Z.exec(c);
        if (a && a.index < k.index) {
          d.hasAllowedDynamic = !0;
          return;
        }
      } else if ((0, v.allRequiredBoundariesRendered)(h)) {
        ((d.hasAllowedClientDynamicAboveBoundary = !0), (d.hasAllowedDynamic = !0));
        return;
      } else {
        let a = am(
          Object.defineProperty(
            Error(
              `Route "${b.route}": Could not validate \`instant\` because a Client Component in a parent segment prevented the page from rendering.`,
            ),
            '__NEXT_ERROR_CODE',
            { value: 'E1331', enumerable: !1, configurable: !0 },
          ),
          c,
          j,
        );
        d.validationPreventingErrors.push(a);
        return;
      }
      if (i) {
        (null !== j && void 0 === i.cause && (i.cause = j()), d.dynamicErrors.push(i));
        return;
      }
      if ((0, o.isClientHookDynamicError)(a)) return void d.dynamicErrors.push(am(a, c, j));
      let l = am(
        1 === g
          ? (0, s.createLinkBodyErrorInNavigation)(b.route)
          : 2 === g
            ? (0, s.createRuntimeBodyErrorInNavigation)(b.route)
            : (0, s.createDynamicBodyErrorInNavigation)(b.route),
        c,
        j,
      );
      d.dynamicErrors.push(l);
    }
    function aj(a, b, c, d) {
      let f = ac.exec(d);
      if (f) {
        let g = Z.exec(d);
        if (g && g.index < f.index) return;
        let h = am(
          Object.defineProperty(
            Error(
              `Route "${a.route}": Could not validate \`instant\` because an error prevented the target segment from rendering.`,
              { cause: c },
            ),
            '__NEXT_ERROR_CODE',
            { value: 'E1338', enumerable: !1, configurable: !0 },
          ),
          d,
          null,
        );
        b.validationPreventingErrors.push(h);
      } else {
        let a = am(
          Object.defineProperty(
            Error(
              'An error occurred while attempting to validate instant UI. This error may be preventing the validation from completing.',
              { cause: c },
            ),
            '__NEXT_ERROR_CODE',
            { value: 'E1118', enumerable: !1, configurable: !0 },
          ),
          d,
          null,
        );
        b.thrownErrorsOutsideBoundary.push(a);
      }
    }
    function ak(a, b, c, d, f) {
      let g = A(f);
      if (ab.test(c)) return void ae(c, d);
      if (_.test(c)) {
        d.dynamicMetadata = am((0, s.createDynamicMetadataError)(b.route), c, null);
        return;
      }
      if (aa.test(c)) {
        let a = am((0, s.createDynamicViewportError)(b.route), c, null);
        d.dynamicErrors.push(a);
        return;
      }
      if ($.test(c)) {
        ((d.hasAllowedDynamic = !0), (d.hasSuspenseAboveBody = !0));
        return;
      }
      if (Z.test(c)) {
        d.hasAllowedDynamic = !0;
        return;
      } else if (g) return void d.dynamicErrors.push(g);
      if ((0, o.isClientHookDynamicError)(a)) return void d.dynamicErrors.push(am(a, c, null));
      let h = am((0, s.createDynamicBodyError)(b.route), c, null);
      d.dynamicErrors.push(h);
    }
    function al(a, b, c, d, f) {
      let g = A(f);
      if (ab.test(c)) return void ae(c, d);
      if (_.test(c)) {
        d.dynamicMetadata = am((0, s.createRuntimeMetadataError)(b.route), c, null);
        return;
      }
      if (aa.test(c)) {
        let a = am((0, s.createRuntimeViewportError)(b.route), c, null);
        d.dynamicErrors.push(a);
        return;
      }
      if ($.test(c)) {
        ((d.hasAllowedDynamic = !0), (d.hasSuspenseAboveBody = !0));
        return;
      }
      if (Z.test(c)) {
        d.hasAllowedDynamic = !0;
        return;
      } else if (g) return void d.dynamicErrors.push(g);
      if ((0, o.isClientHookDynamicError)(a)) return void d.dynamicErrors.push(am(a, c, null));
      let h = am((0, s.createRuntimeBodyError)(b.route), c, null);
      d.dynamicErrors.push(h);
    }
    function am(a, b, c) {
      return (null !== c && (a.cause = c()), (a.stack = a.name + ': ' + a.message + b), a);
    }
    var an =
      (((g = {})[(g.Full = 0)] = 'Full'),
      (g[(g.Empty = 1)] = 'Empty'),
      (g[(g.Errored = 2)] = 'Errored'),
      g);
    function ao(a, b) {
      (console.error(b), (0, s.logBuildDebugHint)(a.route));
    }
    function ap(a, b) {
      if (b.syncDynamicErrorWithStack)
        throw (ao(a, b.syncDynamicErrorWithStack), new l.StaticGenBailoutError());
    }
    function aq(a, b, c, d, f) {
      if ((ap(a, d), 0 === b && !1 === c.hasAllowedDynamic && c.hasDynamicMetadata))
        throw (
          console.error((0, s.createDynamicOrRuntimeMetadataError)(a.route).message),
          new l.StaticGenBailoutError()
        );
      if (!f && !c.hasSuspenseAboveBody && 0 !== b) {
        let d = c.dynamicErrors;
        if (d.length > 0) {
          for (let b = 0; b < d.length; b++) ao(a, d[b]);
          throw new l.StaticGenBailoutError();
        }
        if (c.hasDynamicViewport)
          throw (
            console.error((0, s.createDynamicOrRuntimeViewportError)(a.route).message),
            new l.StaticGenBailoutError()
          );
        if (1 === b)
          throw (
            console.error(
              `Route "${a.route}" did not produce a static shell and Next.js was unable to determine a reason. This is a bug in Next.js.`,
            ),
            new l.StaticGenBailoutError()
          );
      }
    }
    function ar(a, b, c, d) {
      if (
        0 === b &&
        !1 === c.hasAllowedDynamic &&
        0 === c.dynamicErrors.length &&
        c.dynamicMetadata
      )
        return [c.dynamicMetadata];
      if (d || c.hasSuspenseAboveBody) return [];
      if (0 !== b) {
        let d = c.dynamicErrors;
        if (d.length > 0) return d;
        if (1 === b)
          return [
            Object.defineProperty(
              new t.InvariantError(
                `Route "${a.route}" did not produce a static shell and Next.js was unable to determine a reason.`,
              ),
              '__NEXT_ERROR_CODE',
              { value: 'E936', enumerable: !1, configurable: !0 },
            ),
          ];
      }
      return [];
    }
    function as(a, b, c, d, f, g) {
      if (d) {
        let { missingSampleErrors: a } = d;
        if (a.length > 0) return a;
      }
      let { validationPreventingErrors: h } = c;
      if (h.length > 0) return h;
      if (0 !== b) {
        let d = c.dynamicErrors;
        if (d.length > 0) return d;
        if (
          1 === b &&
          !c.hasAllowedClientDynamicAboveBoundary &&
          (0, v.allRequiredBoundariesRendered)(f)
        )
          return Object.defineProperty(
            new t.InvariantError(
              `Route "${a.route}" failed to render during instant validation and Next.js was unable to determine a reason.`,
            ),
            '__NEXT_ERROR_CODE',
            { value: 'E1055', enumerable: !1, configurable: !0 },
          );
      } else {
        let a = c.dynamicErrors;
        if (a.length > 0) return a;
        if (!1 === c.hasAllowedDynamic && c.dynamicMetadata) return [c.dynamicMetadata];
      }
      if (!(0, v.allRequiredBoundariesRendered)(f)) {
        let { thrownErrorsOutsideBoundary: b } = c,
          d = c.slotStacks[0];
        if (0 === b.length) {
          let b = [];
          for (let [a, c] of f.requiredIds)
            if (!f.renderedIds.has(a))
              for (let a of c) {
                let c = a
                  .replace(/^\[project\][\\/]?/, '')
                  .replace(process.cwd() + '/', '')
                  .replace(process.cwd() + '\\', '');
                b.push(c);
              }
          return (b.sort(), (0, w.createUnrenderedSegmentError)(a.route, b));
        }
        if (1 === b.length) {
          let c = `Route "${a.route}": Could not validate \`instant\` because the target segment was prevented from rendering, likely due to the following error.`,
            f = null !== d ? d() : Error();
          return ((f.name = 'Error'), (f.message = c), AggregateError([f, b[0]]));
        }
        {
          let c = `Route "${a.route}": Could not validate \`instant\` because the target segment was prevented from rendering, likely due to one of the following errors.`,
            f = null !== d ? d() : Error();
          return ((f.name = 'Error'), (f.message = c), AggregateError([f, ...b]));
        }
      }
      return [];
    }
  },
  26597,
  (a, b, c) => {
    'use strict';
    (Object.defineProperty(c, '__esModule', { value: !0 }),
      Object.defineProperty(c, 'createDedupedByCallsiteServerErrorLoggerDev', {
        enumerable: !0,
        get: function () {
          return j;
        },
      }));
    let d = (function (a) {
      if (a && a.__esModule) return a;
      if (null === a || ('object' != typeof a && 'function' != typeof a)) return { default: a };
      var b = f(void 0);
      if (b && b.has(a)) return b.get(a);
      var c = { __proto__: null },
        d = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var g in a)
        if ('default' !== g && Object.prototype.hasOwnProperty.call(a, g)) {
          var h = d ? Object.getOwnPropertyDescriptor(a, g) : null;
          h && (h.get || h.set) ? Object.defineProperty(c, g, h) : (c[g] = a[g]);
        }
      return ((c.default = a), b && b.set(a, c), c);
    })(a.r(90302));
    function f(a) {
      if ('function' != typeof WeakMap) return null;
      var b = new WeakMap(),
        c = new WeakMap();
      return (f = function (a) {
        return a ? c : b;
      })(a);
    }
    let g = { current: null },
      h = 'function' == typeof d.cache ? d.cache : (a) => a,
      i = console.warn;
    function j(a) {
      return function (...b) {
        i(a(...b));
      };
    }
    h((a) => {
      try {
        i(g.current);
      } finally {
        g.current = null;
      }
    });
  },
  64436,
  (a, b, c) => {
    'use strict';
    Object.defineProperty(c, '__esModule', { value: !0 });
    var d = {
      isRequestApiAllowedInCurrentPhase: function () {
        return l;
      },
      throwForSearchParamsAccessInUseCache: function () {
        return k;
      },
      throwWithStaticGenerationBailoutErrorWithDynamicError: function () {
        return j;
      },
    };
    for (var f in d) Object.defineProperty(c, f, { enumerable: !0, get: d[f] });
    let g = a.r(98068),
      h = a.r(20635),
      i = a.r(24725);
    function j(a, b) {
      throw Object.defineProperty(
        new g.StaticGenBailoutError(
          `Route ${a} with \`dynamic = "error"\` couldn't be rendered statically because it used ${b}. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`,
        ),
        '__NEXT_ERROR_CODE',
        { value: 'E543', enumerable: !1, configurable: !0 },
      );
    }
    function k(a, b) {
      let c = Object.defineProperty(
        Error(
          `Route ${a.route} used \`searchParams\` inside "use cache". Accessing dynamic request data inside a cache scope is not supported. If you need some search params inside a cached function await \`searchParams\` outside of the cached function and pass only the required search params as arguments to the cached function. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`,
        ),
        '__NEXT_ERROR_CODE',
        { value: 'E842', enumerable: !1, configurable: !0 },
      );
      throw (Error.captureStackTrace(c, b), (a.invalidDynamicUsageError ??= c), c);
    }
    function l(a) {
      switch (a.phase) {
        case 'action':
        case 'render':
          return !0;
        case 'after': {
          let a = h.actionAsyncStorage.getStore();
          if (a && (a.isAppRoute || a.isAction)) return !0;
          let b = i.afterTaskAsyncStorage.getStore();
          if (b) return 'action' === b.rootTaskSpawnPhase;
          return !1;
        }
      }
    }
  },
  92184,
  (a, b, c) => {
    'use strict';
    (Object.defineProperty(c, '__esModule', { value: !0 }),
      Object.defineProperty(c, 'cookies', {
        enumerable: !0,
        get: function () {
          return o;
        },
      }));
    let d = a.r(95466),
      f = a.r(46842),
      g = a.r(56704),
      h = a.r(32319),
      i = a.r(45101),
      j = a.r(98068),
      k = a.r(84282),
      l = a.r(26597),
      m = a.r(64436),
      n = a.r(96670);
    function o() {
      let a = 'cookies',
        b = g.workAsyncStorage.getStore(),
        c = h.workUnitAsyncStorage.getStore();
      if (b) {
        if (c && !(0, m.isRequestApiAllowedInCurrentPhase)(c))
          throw Object.defineProperty(
            Error(
              `Route ${b.route} used \`cookies()\` inside \`after()\` while rendering. This is not supported. If you need this data inside an \`after()\` callback, use \`cookies()\` outside of the callback. See more info here: https://nextjs.org/docs/app/api-reference/functions/after`,
            ),
            '__NEXT_ERROR_CODE',
            { value: 'E1381', enumerable: !1, configurable: !0 },
          );
        if (b.forceStatic)
          return q(d.RequestCookiesAdapter.seal(new f.RequestCookies(new Headers({}))));
        if (b.dynamicShouldError)
          throw Object.defineProperty(
            new j.StaticGenBailoutError(
              `Route ${b.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`cookies()\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`,
            ),
            '__NEXT_ERROR_CODE',
            { value: 'E849', enumerable: !1, configurable: !0 },
          );
        if (c)
          switch (c.type) {
            case 'cache':
              let g = Object.defineProperty(
                Error(
                  `Route ${b.route} used \`cookies()\` inside "use cache". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use \`cookies()\` outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`,
                ),
                '__NEXT_ERROR_CODE',
                { value: 'E831', enumerable: !1, configurable: !0 },
              );
              throw (
                Error.captureStackTrace(g, o),
                (0, k.applyOwnerStack)(g),
                (b.invalidDynamicUsageError ??= g),
                g
              );
            case 'unstable-cache':
              throw Object.defineProperty(
                Error(
                  `Route ${b.route} used \`cookies()\` inside a function cached with \`unstable_cache()\`. Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use \`cookies()\` outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`,
                ),
                '__NEXT_ERROR_CODE',
                { value: 'E846', enumerable: !1, configurable: !0 },
              );
            case 'generate-static-params':
              throw Object.defineProperty(
                Error(
                  `Route ${b.route} used \`cookies()\` inside \`generateStaticParams\`. This is not supported because \`generateStaticParams\` runs at build time without an HTTP request. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context`,
                ),
                '__NEXT_ERROR_CODE',
                { value: 'E1123', enumerable: !1, configurable: !0 },
              );
            case 'prerender':
              var l = b,
                r = c;
              let h = p.get(r);
              if (h) return h;
              let s = (0, k.makeRuntimeHangingPromise)(r.renderSignal, l.route, '`cookies()`', r);
              return (p.set(r, s), s);
            case 'prerender-client':
            case 'validation-client':
              let t = '`cookies`';
              throw Object.defineProperty(
                new n.InvariantError(
                  `${t} must not be used within a Client Component. Next.js should be preventing ${t} from being included in Client Components statically, but did not in this case.`,
                ),
                '__NEXT_ERROR_CODE',
                { value: 'E1037', enumerable: !1, configurable: !0 },
              );
            case 'prerender-ppr':
              return (0, i.postponeWithTracking)(b.route, a, c.dynamicTracking);
            case 'prerender-legacy':
              return (0, i.throwToInterruptStaticGeneration)(a, b, c);
            case 'prerender-runtime': {
              let { stagedRendering: a } = c;
              if (a)
                return a.delayUntilStage(
                  k.RENDER_STAGES_BY_DATA_KIND.sessionData,
                  'cookies',
                  c.cookies,
                );
              return q(c.cookies);
            }
            case 'private-cache':
              return q(c.cookies);
            case 'request':
              let u;
              if (
                ((0, i.trackDynamicDataInDynamicRender)(c),
                (u = (0, d.areCookiesMutableInCurrentPhase)(c)
                  ? c.userspaceMutableCookies
                  : c.cookies),
                !c.asyncApiPromises)
              )
                return q(u);
              if (u === c.mutableCookies) return c.asyncApiPromises.mutableCookies;
              return c.asyncApiPromises.cookies;
          }
      }
      (0, h.throwForMissingRequestStore)(a);
    }
    let p = new WeakMap();
    function q(a) {
      let b = p.get(a);
      if (b) return b;
      let c = Promise.resolve(a);
      return (p.set(a, c), c);
    }
    (0, l.createDedupedByCallsiteServerErrorLoggerDev)(function (a, b) {
      let c = a ? `Route "${a}" ` : 'This route ';
      return Object.defineProperty(
        Error(
          `${c}used ${b}. \`cookies()\` returns a Promise and must be unwrapped with \`await\` or \`React.use()\` before accessing its properties. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`,
        ),
        '__NEXT_ERROR_CODE',
        { value: 'E830', enumerable: !1, configurable: !0 },
      );
    });
  },
  31636,
  (a, b, c) => {
    'use strict';
    Object.defineProperty(c, '__esModule', { value: !0 });
    var d = {
      HeadersAdapter: function () {
        return i;
      },
      ReadonlyHeadersError: function () {
        return h;
      },
    };
    for (var f in d) Object.defineProperty(c, f, { enumerable: !0, get: d[f] });
    let g = a.r(36545);
    class h extends Error {
      constructor() {
        (super(
          'Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers',
        ),
          Object.defineProperty(this, '__NEXT_ERROR_CODE', {
            value: 'E1176',
            enumerable: !1,
            configurable: !0,
          }));
      }
      static callable() {
        throw new h();
      }
    }
    class i extends Headers {
      constructor(a) {
        (super(),
          (this.headers = new Proxy(a, {
            get(b, c, d) {
              if ('symbol' == typeof c) return g.ReflectAdapter.get(b, c, d);
              let f = c.toLowerCase(),
                h = Object.keys(a).find((a) => a.toLowerCase() === f);
              if (void 0 !== h) return g.ReflectAdapter.get(b, h, d);
            },
            set(b, c, d, f) {
              if ('symbol' == typeof c) return g.ReflectAdapter.set(b, c, d, f);
              let h = c.toLowerCase(),
                i = Object.keys(a).find((a) => a.toLowerCase() === h);
              return g.ReflectAdapter.set(b, i ?? c, d, f);
            },
            has(b, c) {
              if ('symbol' == typeof c) return g.ReflectAdapter.has(b, c);
              let d = c.toLowerCase(),
                f = Object.keys(a).find((a) => a.toLowerCase() === d);
              return void 0 !== f && g.ReflectAdapter.has(b, f);
            },
            deleteProperty(b, c) {
              if ('symbol' == typeof c) return g.ReflectAdapter.deleteProperty(b, c);
              let d = c.toLowerCase(),
                f = Object.keys(a).find((a) => a.toLowerCase() === d);
              return void 0 === f || g.ReflectAdapter.deleteProperty(b, f);
            },
          })));
      }
      static seal(a, b) {
        let c,
          d = b && b.size > 0 ? (a) => b.has(a.toLowerCase()) : null,
          f = new Proxy(a, {
            get(a, b, d) {
              switch (b) {
                case 'append':
                case 'delete':
                case 'set':
                  return h.callable;
                case Symbol.iterator:
                  return c[Symbol.iterator];
                case 'get':
                case 'has':
                case 'getSetCookie':
                case 'keys':
                case 'values':
                case 'entries':
                case 'forEach':
                  return c[b];
                default:
                  return g.ReflectAdapter.get(a, b, d);
              }
            },
          });
        return (
          (c = d
            ? (function (a, b, c) {
                function* d() {
                  for (let b of a.entries()) c(b[0]) || (yield b);
                }
                return {
                  entries: d,
                  [Symbol.iterator]: d,
                  get: (b) => (c(b) ? null : a.get(b)),
                  has: (b) => !c(b) && a.has(b),
                  getSetCookie: () => (c('set-cookie') ? [] : a.getSetCookie()),
                  *keys() {
                    for (let b of a.keys()) c(b) || (yield b);
                  },
                  *values() {
                    for (let [, a] of d()) yield a;
                  },
                  forEach(a, c) {
                    for (let [f, g] of d()) a.call(c, g, f, b);
                  },
                };
              })(a, f, d)
            : {
                get: a.get.bind(a),
                has: a.has.bind(a),
                getSetCookie: a.getSetCookie.bind(a),
                keys: a.keys.bind(a),
                values: a.values.bind(a),
                entries: a.entries.bind(a),
                [Symbol.iterator]: a[Symbol.iterator].bind(a),
                forEach(b, c) {
                  for (let [d, g] of a.entries()) b.call(c, g, d, f);
                },
              }),
          f
        );
      }
      static fresh(a) {
        return new Proxy(a, { get: (a, b, c) => g.ReflectAdapter.get(a, b, c) });
      }
      merge(a) {
        return Array.isArray(a) ? a.join(', ') : a;
      }
      static from(a) {
        return a instanceof Headers ? a : new i(a);
      }
      append(a, b) {
        let c = this.headers[a];
        'string' == typeof c
          ? (this.headers[a] = [c, b])
          : Array.isArray(c)
            ? c.push(b)
            : (this.headers[a] = b);
      }
      delete(a) {
        delete this.headers[a];
      }
      get(a) {
        let b = this.headers[a];
        return void 0 !== b ? this.merge(b) : null;
      }
      has(a) {
        return void 0 !== this.headers[a];
      }
      set(a, b) {
        this.headers[a] = b;
      }
      forEach(a, b) {
        for (let [c, d] of this.entries()) a.call(b, d, c, this);
      }
      *entries() {
        for (let a of Object.keys(this.headers)) {
          let b = a.toLowerCase(),
            c = this.get(b);
          yield [b, c];
        }
      }
      *keys() {
        for (let a of Object.keys(this.headers)) {
          let b = a.toLowerCase();
          yield b;
        }
      }
      *values() {
        for (let a of Object.keys(this.headers)) {
          let b = this.get(a);
          yield b;
        }
      }
      [Symbol.iterator]() {
        return this.entries();
      }
    }
  },
  65855,
  (a, b, c) => {
    'use strict';
    (Object.defineProperty(c, '__esModule', { value: !0 }),
      Object.defineProperty(c, 'headers', {
        enumerable: !0,
        get: function () {
          return n;
        },
      }));
    let d = a.r(31636),
      f = a.r(56704),
      g = a.r(32319),
      h = a.r(45101),
      i = a.r(98068),
      j = a.r(84282),
      k = a.r(26597),
      l = a.r(64436),
      m = a.r(96670);
    function n() {
      let a = 'headers',
        b = f.workAsyncStorage.getStore(),
        c = g.workUnitAsyncStorage.getStore();
      if (b) {
        if (c && !(0, l.isRequestApiAllowedInCurrentPhase)(c))
          throw Object.defineProperty(
            Error(
              `Route ${b.route} used \`headers()\` inside \`after()\` while rendering. This is not supported. If you need this data inside an \`after()\` callback, use \`headers()\` outside of the callback. See more info here: https://nextjs.org/docs/app/api-reference/functions/after`,
            ),
            '__NEXT_ERROR_CODE',
            { value: 'E1378', enumerable: !1, configurable: !0 },
          );
        if (b.forceStatic) return p(d.HeadersAdapter.seal(new Headers({})));
        if (c)
          switch (c.type) {
            case 'cache': {
              let a = Object.defineProperty(
                Error(
                  `Route ${b.route} used \`headers()\` inside "use cache". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use \`headers()\` outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`,
                ),
                '__NEXT_ERROR_CODE',
                { value: 'E833', enumerable: !1, configurable: !0 },
              );
              throw (
                Error.captureStackTrace(a, n),
                (0, j.applyOwnerStack)(a),
                (b.invalidDynamicUsageError ??= a),
                a
              );
            }
            case 'unstable-cache':
              throw Object.defineProperty(
                Error(
                  `Route ${b.route} used \`headers()\` inside a function cached with \`unstable_cache()\`. Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use \`headers()\` outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`,
                ),
                '__NEXT_ERROR_CODE',
                { value: 'E838', enumerable: !1, configurable: !0 },
              );
            case 'generate-static-params':
              throw Object.defineProperty(
                Error(
                  `Route ${b.route} used \`headers()\` inside \`generateStaticParams\`. This is not supported because \`generateStaticParams\` runs at build time without an HTTP request. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context`,
                ),
                '__NEXT_ERROR_CODE',
                { value: 'E1134', enumerable: !1, configurable: !0 },
              );
          }
        if (b.dynamicShouldError)
          throw Object.defineProperty(
            new i.StaticGenBailoutError(
              `Route ${b.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`headers()\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`,
            ),
            '__NEXT_ERROR_CODE',
            { value: 'E828', enumerable: !1, configurable: !0 },
          );
        if (c)
          switch (c.type) {
            case 'prerender':
              var k = b,
                q = c;
              let f = o.get(q);
              if (f) return f;
              let g = (0, j.makeRuntimeHangingPromise)(q.renderSignal, k.route, '`headers()`', q);
              return (o.set(q, g), g);
            case 'prerender-client':
            case 'validation-client':
              let r = '`headers`';
              throw Object.defineProperty(
                new m.InvariantError(
                  `${r} must not be used within a client component. Next.js should be preventing ${r} from being included in client components statically, but did not in this case.`,
                ),
                '__NEXT_ERROR_CODE',
                { value: 'E1017', enumerable: !1, configurable: !0 },
              );
            case 'prerender-ppr':
              return (0, h.postponeWithTracking)(b.route, a, c.dynamicTracking);
            case 'prerender-legacy':
              return (0, h.throwToInterruptStaticGeneration)(a, b, c);
            case 'prerender-runtime': {
              let { stagedRendering: a } = c;
              if (a)
                return a.delayUntilStage(
                  j.RENDER_STAGES_BY_DATA_KIND.sessionData,
                  'headers',
                  c.headers,
                );
              return p(c.headers);
            }
            case 'private-cache':
              return p(c.headers);
            case 'request':
              if (((0, h.trackDynamicDataInDynamicRender)(c), c.asyncApiPromises))
                return c.asyncApiPromises.headers;
              return p(c.headers);
          }
      }
      (0, g.throwForMissingRequestStore)(a);
    }
    let o = new WeakMap();
    function p(a) {
      let b = o.get(a);
      if (b) return b;
      let c = Promise.resolve(a);
      return (o.set(a, c), c);
    }
    (0, k.createDedupedByCallsiteServerErrorLoggerDev)(function (a, b) {
      let c = a ? `Route "${a}" ` : 'This route ';
      return Object.defineProperty(
        Error(
          `${c}used ${b}. \`headers()\` returns a Promise and must be unwrapped with \`await\` or \`React.use()\` before accessing its properties. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`,
        ),
        '__NEXT_ERROR_CODE',
        { value: 'E836', enumerable: !1, configurable: !0 },
      );
    });
  },
  5050,
  (a, b, c) => {
    'use strict';
    (Object.defineProperty(c, '__esModule', { value: !0 }),
      Object.defineProperty(c, 'draftMode', {
        enumerable: !0,
        get: function () {
          return m;
        },
      }));
    let d = a.r(32319),
      f = a.r(56704),
      g = a.r(45101),
      h = a.r(26597),
      i = a.r(98068),
      j = a.r(8984),
      k = a.r(96670);
    a.r(36545);
    let l = a.r(84282);
    function m() {
      let a = 'draftMode',
        b = f.workAsyncStorage.getStore(),
        c = d.workUnitAsyncStorage.getStore();
      switch (((!b || !c) && (0, d.throwForMissingRequestStore)(a), c.type)) {
        case 'prerender-runtime': {
          let { stagedRendering: a } = c;
          if (a)
            return a.delayUntilStage(
              l.RENDER_STAGES_BY_DATA_KIND.sessionData,
              'draftMode',
              new q(c.draftMode),
            );
          return n(c.draftMode, b);
        }
        case 'request':
          return n(c.draftMode, b);
        case 'cache':
        case 'private-cache':
        case 'unstable-cache':
          let g = (0, d.getDraftModeProviderForCacheScope)(b, c);
          if (g) return n(g, b);
        case 'prerender':
        case 'prerender-ppr':
        case 'prerender-legacy':
          return n(null, b);
        case 'prerender-client':
        case 'validation-client': {
          let a = '`draftMode`';
          throw Object.defineProperty(
            new k.InvariantError(
              `${a} must not be used within a Client Component. Next.js should be preventing ${a} from being included in Client Components statically, but did not in this case.`,
            ),
            '__NEXT_ERROR_CODE',
            { value: 'E1046', enumerable: !1, configurable: !0 },
          );
        }
        case 'generate-static-params':
          throw Object.defineProperty(
            Error(
              `Route ${b.route} used \`${a}()\` inside \`generateStaticParams\`. This is not supported because \`generateStaticParams\` runs at build time without an HTTP request. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context`,
            ),
            '__NEXT_ERROR_CODE',
            { value: 'E1132', enumerable: !1, configurable: !0 },
          );
        default:
          return c;
      }
    }
    function n(a, b) {
      let c = p.get(a ?? o);
      return c || Promise.resolve(new q(a));
    }
    let o = {},
      p = new WeakMap();
    class q {
      constructor(a) {
        this._provider = a;
      }
      get isEnabled() {
        return null !== this._provider && this._provider.isEnabled;
      }
      enable() {
        (r('draftMode().enable()', this.enable),
          null !== this._provider && this._provider.enable());
      }
      disable() {
        (r('draftMode().disable()', this.disable),
          null !== this._provider && this._provider.disable());
      }
    }
    function r(a, b) {
      let c = f.workAsyncStorage.getStore(),
        h = d.workUnitAsyncStorage.getStore();
      if (c) {
        if ((null == h ? void 0 : h.phase) === 'after')
          throw Object.defineProperty(
            Error(
              `Route ${c.route} used "${a}" inside \`after()\`. The enabled status of \`draftMode()\` can be read inside \`after()\` but you cannot enable or disable \`draftMode()\`. See more info here: https://nextjs.org/docs/app/api-reference/functions/after`,
            ),
            '__NEXT_ERROR_CODE',
            { value: 'E845', enumerable: !1, configurable: !0 },
          );
        if (c.dynamicShouldError)
          throw Object.defineProperty(
            new i.StaticGenBailoutError(
              `Route ${c.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`${a}\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`,
            ),
            '__NEXT_ERROR_CODE',
            { value: 'E553', enumerable: !1, configurable: !0 },
          );
        if (h)
          switch (h.type) {
            case 'cache':
            case 'private-cache': {
              let d = Object.defineProperty(
                Error(
                  `Route ${c.route} used "${a}" inside "use cache". The enabled status of \`draftMode()\` can be read in caches but you must not enable or disable \`draftMode()\` inside a cache. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`,
                ),
                '__NEXT_ERROR_CODE',
                { value: 'E829', enumerable: !1, configurable: !0 },
              );
              throw (
                Error.captureStackTrace(d, b),
                (0, l.applyOwnerStack)(d),
                (c.invalidDynamicUsageError ??= d),
                d
              );
            }
            case 'unstable-cache':
              throw Object.defineProperty(
                Error(
                  `Route ${c.route} used "${a}" inside a function cached with \`unstable_cache()\`. The enabled status of \`draftMode()\` can be read in caches but you must not enable or disable \`draftMode()\` inside a cache. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`,
                ),
                '__NEXT_ERROR_CODE',
                { value: 'E844', enumerable: !1, configurable: !0 },
              );
            case 'prerender':
            case 'prerender-runtime': {
              let b = Object.defineProperty(
                Error(
                  `Route ${c.route} used ${a} without first calling \`await connection()\`. See more info here: https://nextjs.org/docs/messages/next-prerender-sync-headers`,
                ),
                '__NEXT_ERROR_CODE',
                { value: 'E126', enumerable: !1, configurable: !0 },
              );
              return (0, g.abortAndThrowOnSynchronousRequestDataAccess)(c.route, a, b, h);
            }
            case 'prerender-client':
            case 'validation-client':
              let d = '`draftMode`';
              throw Object.defineProperty(
                new k.InvariantError(
                  `${d} must not be used within a Client Component. Next.js should be preventing ${d} from being included in Client Components statically, but did not in this case.`,
                ),
                '__NEXT_ERROR_CODE',
                { value: 'E1046', enumerable: !1, configurable: !0 },
              );
            case 'prerender-ppr':
              return (0, g.postponeWithTracking)(c.route, a, h.dynamicTracking);
            case 'prerender-legacy':
              h.revalidate = 0;
              let f = Object.defineProperty(
                new j.DynamicServerError(
                  `Route ${c.route} couldn't be rendered statically because it used \`${a}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`,
                ),
                '__NEXT_ERROR_CODE',
                { value: 'E558', enumerable: !1, configurable: !0 },
              );
              throw ((c.dynamicUsageDescription = a), (c.dynamicUsageStack = f.stack), f);
            case 'request':
              (0, g.trackDynamicDataInDynamicRender)(h);
              break;
            case 'generate-static-params':
              throw Object.defineProperty(
                Error(
                  `Route ${c.route} used \`${a}\` inside \`generateStaticParams\`. This is not supported because \`generateStaticParams\` runs at build time without an HTTP request. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context`,
                ),
                '__NEXT_ERROR_CODE',
                { value: 'E1121', enumerable: !1, configurable: !0 },
              );
          }
      }
    }
    (0, h.createDedupedByCallsiteServerErrorLoggerDev)(function (a, b) {
      let c = a ? `Route "${a}" ` : 'This route ';
      return Object.defineProperty(
        Error(
          `${c}used ${b}. \`draftMode()\` returns a Promise and must be unwrapped with \`await\` or \`React.use()\` before accessing its properties. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`,
        ),
        '__NEXT_ERROR_CODE',
        { value: 'E835', enumerable: !1, configurable: !0 },
      );
    });
  },
  62360,
  (a, b, c) => {
    ((b.exports.cookies = a.r(92184).cookies),
      (b.exports.headers = a.r(65855).headers),
      (b.exports.draftMode = a.r(5050).draftMode));
  },
  46842,
  (a, b, c) => {
    'use strict';
    Object.defineProperty(c, '__esModule', { value: !0 });
    var d = {
      RequestCookies: function () {
        return g.RequestCookies;
      },
      ResponseCookies: function () {
        return g.ResponseCookies;
      },
      stringifyCookie: function () {
        return g.stringifyCookie;
      },
    };
    for (var f in d) Object.defineProperty(c, f, { enumerable: !0, get: d[f] });
    let g = a.r(98096);
  },
  36545,
  (a, b, c) => {
    'use strict';
    (Object.defineProperty(c, '__esModule', { value: !0 }),
      Object.defineProperty(c, 'ReflectAdapter', {
        enumerable: !0,
        get: function () {
          return d;
        },
      }));
    class d {
      static get(a, b, c) {
        let d = Reflect.get(a, b, c);
        return 'function' == typeof d ? d.bind(a) : d;
      }
      static set(a, b, c, d) {
        return Reflect.set(a, b, c, d);
      }
      static has(a, b) {
        return Reflect.has(a, b);
      }
      static deleteProperty(a, b) {
        return Reflect.deleteProperty(a, b);
      }
    }
  },
  21912,
  (a, b, c) => {
    'use strict';
    Object.defineProperty(c, '__esModule', { value: !0 });
    var d = {
      ActionDidNotRevalidate: function () {
        return g;
      },
      ActionDidRevalidateDynamicOnly: function () {
        return i;
      },
      ActionDidRevalidateStaticAndDynamic: function () {
        return h;
      },
    };
    for (var f in d) Object.defineProperty(c, f, { enumerable: !0, get: d[f] });
    let g = 0,
      h = 1,
      i = 2;
  },
  95466,
  (a, b, c) => {
    'use strict';
    Object.defineProperty(c, '__esModule', { value: !0 });
    var d = {
      MutableRequestCookiesAdapter: function () {
        return p;
      },
      ReadonlyRequestCookiesError: function () {
        return k;
      },
      RequestCookiesAdapter: function () {
        return l;
      },
      appendMutableCookies: function () {
        return o;
      },
      areCookiesMutableInCurrentPhase: function () {
        return r;
      },
      createCookiesWithMutableAccessCheck: function () {
        return q;
      },
      getModifiedCookieValues: function () {
        return n;
      },
      responseCookiesToRequestCookies: function () {
        return t;
      },
    };
    for (var f in d) Object.defineProperty(c, f, { enumerable: !0, get: d[f] });
    let g = a.r(46842),
      h = a.r(36545),
      i = a.r(56704),
      j = a.r(21912);
    class k extends Error {
      constructor() {
        (super(
          'Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#options',
        ),
          Object.defineProperty(this, '__NEXT_ERROR_CODE', {
            value: 'E1180',
            enumerable: !1,
            configurable: !0,
          }));
      }
      static callable() {
        throw new k();
      }
    }
    class l {
      static seal(a) {
        return new Proxy(a, {
          get(a, b, c) {
            switch (b) {
              case 'clear':
              case 'delete':
              case 'set':
                return k.callable;
              default:
                return h.ReflectAdapter.get(a, b, c);
            }
          },
        });
      }
      static fresh(a) {
        return new Proxy(a, { get: (a, b, c) => h.ReflectAdapter.get(a, b, c) });
      }
    }
    let m = Symbol.for('next.mutated.cookies');
    function n(a) {
      let b = a[m];
      return b && Array.isArray(b) && 0 !== b.length ? b : [];
    }
    function o(a, b) {
      let c = n(b);
      if (0 === c.length) return !1;
      let d = new g.ResponseCookies(a),
        f = d.getAll();
      for (let a of c) d.set(a);
      for (let a of f) d.set(a);
      return !0;
    }
    class p {
      static wrap(a, b) {
        let c = new g.ResponseCookies(new Headers());
        for (let b of a.getAll()) c.set(b);
        let d = [],
          f = new Set(),
          k = () => {
            let a = i.workAsyncStorage.getStore();
            if (
              (a && (a.pathWasRevalidated = j.ActionDidRevalidateStaticAndDynamic),
              (d = c.getAll().filter((a) => f.has(a.name))),
              b)
            ) {
              let a = [];
              for (let b of d) {
                let c = new g.ResponseCookies(new Headers());
                (c.set(b), a.push(c.toString()));
              }
              b(a);
            }
          },
          l = new Proxy(c, {
            get(a, b, c) {
              switch (b) {
                case m:
                  return d;
                case 'delete':
                  return function (...b) {
                    f.add('string' == typeof b[0] ? b[0] : b[0].name);
                    try {
                      return (a.delete(...b), l);
                    } finally {
                      k();
                    }
                  };
                case 'set':
                  return function (...b) {
                    f.add('string' == typeof b[0] ? b[0] : b[0].name);
                    try {
                      return (a.set(...b), l);
                    } finally {
                      k();
                    }
                  };
                default:
                  return h.ReflectAdapter.get(a, b, c);
              }
            },
          });
        return l;
      }
    }
    function q(a) {
      let b = new Proxy(a.mutableCookies, {
        get(c, d, f) {
          switch (d) {
            case 'delete':
              return function (...d) {
                return (s(a, 'cookies().delete'), c.delete(...d), b);
              };
            case 'set':
              return function (...d) {
                return (s(a, 'cookies().set'), c.set(...d), b);
              };
            default:
              return h.ReflectAdapter.get(c, d, f);
          }
        },
      });
      return b;
    }
    function r(a) {
      return 'action' === a.phase;
    }
    function s(a, b) {
      if (!r(a)) throw new k();
    }
    function t(a) {
      let b = new g.RequestCookies(new Headers());
      for (let c of a.getAll()) b.set(c);
      return b;
    }
  },
];

//# sourceMappingURL=_0qm-2v2._.js.map
