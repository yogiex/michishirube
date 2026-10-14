module.exports = [
  44588,
  (a) => {
    'use strict';
    let b;
    var c,
      d,
      e,
      f = a.i(68508),
      g = a.i(91385),
      h = a.i(20965),
      i = a.i(98076),
      j = a.i(3515),
      k = a.i(36965),
      l = a.i(30337),
      m = a.i(39263),
      n = class extends m.Removable {
        #a;
        #b;
        #c;
        #d;
        constructor(a) {
          (super(),
            (this.#a = a.client),
            (this.mutationId = a.mutationId),
            (this.#c = a.mutationCache),
            (this.#b = []),
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
          this.#b.includes(a) ||
            (this.#b.push(a),
            this.clearGcTimeout(),
            this.#c.notify({ type: 'observerAdded', mutation: this, observer: a }));
        }
        removeObserver(a) {
          ((this.#b = this.#b.filter((b) => b !== a)),
            this.scheduleGc(),
            this.#c.notify({ type: 'observerRemoved', mutation: this, observer: a }));
        }
        optionalRemove() {
          this.#b.length ||
            ('pending' === this.state.status ? this.scheduleGc() : this.#c.remove(this));
        }
        continue() {
          return (
            this.#d?.continue() ??
            ('pending' === this.state.status
              ? this.execute(this.state.variables)
              : Promise.resolve())
          );
        }
        async execute(a) {
          let b = () => {
              this.#e({ type: 'continue' });
            },
            c = { client: this.#a, meta: this.options.meta, mutationKey: this.options.mutationKey },
            d = (this.#d = (0, l.createRetryer)({
              fn: () =>
                this.options.mutationFn
                  ? this.options.mutationFn(a, c)
                  : Promise.reject(Error('No mutationFn found')),
              onFail: (a, b) => {
                this.#e({ type: 'failed', failureCount: a, error: b });
              },
              onPause: () => {
                this.#e({ type: 'pause' });
              },
              onContinue: b,
              retry: this.options.retry ?? 0,
              retryDelay: this.options.retryDelay,
              networkMode: this.options.networkMode,
              canRun: () => this.#c.canRun(this),
            })),
            e = 'pending' === this.state.status,
            f = !d.canStart();
          try {
            if (e) b();
            else {
              (this.#e({ type: 'pending', variables: a, isPaused: f }),
                this.#c.config.onMutate && (await this.#c.config.onMutate(a, this, c)));
              let b = await this.options.onMutate?.(a, c);
              b !== this.state.context &&
                this.#e({ type: 'pending', context: b, variables: a, isPaused: f });
            }
            let g = await d.start();
            return (
              await this.#c.config.onSuccess?.(g, a, this.state.context, this, c),
              await this.options.onSuccess?.(g, a, this.state.context, c),
              await this.#c.config.onSettled?.(
                g,
                null,
                this.state.variables,
                this.state.context,
                this,
                c,
              ),
              await this.options.onSettled?.(g, null, a, this.state.context, c),
              this.#e({ type: 'success', data: g }),
              g
            );
          } catch (b) {
            try {
              await this.#c.config.onError?.(b, a, this.state.context, this, c);
            } catch (a) {
              Promise.reject(a);
            }
            try {
              await this.options.onError?.(b, a, this.state.context, c);
            } catch (a) {
              Promise.reject(a);
            }
            try {
              await this.#c.config.onSettled?.(
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
            throw (this.#e({ type: 'error', error: b }), b);
          } finally {
            (this.#d === d && (this.#d = void 0), this.#c.runNext(this));
          }
        }
        #e(a) {
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
            i.notifyManager.batch(() => {
              (this.#b.forEach((b) => {
                b.onMutationUpdate(a);
              }),
                this.#c.notify({ mutation: this, type: 'updated', action: a }));
            }));
        }
      },
      o = class extends k.Subscribable {
        #f;
        #g;
        #h;
        constructor(a = {}) {
          (super(), (this.config = a), (this.#f = new Set()), (this.#g = new Map()), (this.#h = 0));
        }
        build(a, b, c) {
          let d = new n({
            client: a,
            mutationCache: this,
            mutationId: ++this.#h,
            options: a.defaultMutationOptions(b),
            state: c,
          });
          return (this.add(d), d);
        }
        add(a) {
          this.#f.add(a);
          let b = p(a);
          if ('string' == typeof b) {
            let c = this.#g.get(b);
            c ? c.push(a) : this.#g.set(b, [a]);
          }
          this.notify({ type: 'added', mutation: a });
        }
        remove(a) {
          if (this.#f.delete(a)) {
            let b = p(a);
            if ('string' == typeof b) {
              let c = this.#g.get(b);
              if (c)
                if (c.length > 1) {
                  let b = c.indexOf(a);
                  -1 !== b && c.splice(b, 1);
                } else c[0] === a && this.#g.delete(b);
            }
          }
          this.notify({ type: 'removed', mutation: a });
        }
        canRun(a) {
          let b = p(a);
          if ('string' != typeof b) return !0;
          {
            let c = this.#g.get(b)?.find((a) => 'pending' === a.state.status);
            return !c || c === a;
          }
        }
        runNext(a) {
          let b = p(a);
          return 'string' == typeof b
            ? (this.#g
                .get(b)
                ?.find((b) => b !== a && b.state.isPaused)
                ?.continue() ?? Promise.resolve())
            : Promise.resolve();
        }
        clear() {
          i.notifyManager.batch(() => {
            (this.#f.forEach((a) => {
              this.notify({ type: 'removed', mutation: a });
            }),
              this.#f.clear(),
              this.#g.clear());
          });
        }
        getAll() {
          return Array.from(this.#f);
        }
        find(a) {
          let b = { exact: !0, ...a };
          return this.getAll().find((a) => (0, g.matchMutation)(b, a));
        }
        findAll(a = {}) {
          return this.getAll().filter((b) => (0, g.matchMutation)(a, b));
        }
        notify(a) {
          i.notifyManager.batch(() => {
            this.listeners.forEach((b) => {
              b(a);
            });
          });
        }
        resumePausedMutations() {
          let a = this.getAll().filter((a) => a.state.isPaused);
          return i.notifyManager.batch(() => Promise.all(a.map((a) => a.continue().catch(g.noop))));
        }
      };
    function p(a) {
      return a.options.scope?.id;
    }
    var q = k,
      r = a.i(69617),
      s = class extends q.Subscribable {
        #i;
        constructor(a = {}) {
          (super(), (this.config = a), (this.#i = new Map()));
        }
        build(a, b, c) {
          let d = b.queryKey,
            e = b.queryHash ?? (0, g.hashQueryKeyByOptions)(d, b),
            f = this.get(e);
          return (
            f ||
              ((f = new r.Query({
                client: a,
                queryKey: d,
                queryHash: e,
                options: a.defaultQueryOptions(b),
                state: c,
                defaultOptions: a.getQueryDefaults(d),
              })),
              this.add(f)),
            f
          );
        }
        add(a) {
          this.#i.has(a.queryHash) ||
            (this.#i.set(a.queryHash, a), this.notify({ type: 'added', query: a }));
        }
        remove(a) {
          this.#i.get(a.queryHash) === a &&
            (a.destroy(), this.#i.delete(a.queryHash), this.notify({ type: 'removed', query: a }));
        }
        clear() {
          i.notifyManager.batch(() => {
            this.getAll().forEach((a) => {
              this.remove(a);
            });
          });
        }
        get(a) {
          return this.#i.get(a);
        }
        getAll() {
          return [...this.#i.values()];
        }
        find(a) {
          let b = { exact: !0, ...a };
          return this.getAll().find((a) => (0, g.matchQuery)(b, a));
        }
        findAll(a = {}) {
          let b = this.getAll();
          return Object.keys(a).length > 0 ? b.filter((b) => (0, g.matchQuery)(a, b)) : b;
        }
        notify(a) {
          i.notifyManager.batch(() => {
            this.listeners.forEach((b) => {
              b(a);
            });
          });
        }
        onFocus() {
          i.notifyManager.batch(() => {
            this.getAll().forEach((a) => {
              a.onFocus();
            });
          });
        }
        onOnline() {
          i.notifyManager.batch(() => {
            this.getAll().forEach((a) => {
              a.onOnline();
            });
          });
        }
      },
      t = class {
        #j;
        #c;
        #k;
        #l;
        #m;
        #n;
        #o;
        #p;
        constructor(a = {}) {
          ((this.#j = a.queryCache || new s()),
            (this.#c = a.mutationCache || new o()),
            (this.#k = a.defaultOptions || {}),
            (this.#l = new Map()),
            (this.#m = new Map()),
            (this.#n = 0));
        }
        mount() {
          (this.#n++,
            1 === this.#n &&
              ((this.#o = h.focusManager.subscribe(async (a) => {
                a && (await this.resumePausedMutations(), this.#j.onFocus());
              })),
              (this.#p = j.onlineManager.subscribe(async (a) => {
                a && (await this.resumePausedMutations(), this.#j.onOnline());
              }))));
        }
        unmount() {
          (this.#n--,
            0 === this.#n && (this.#o?.(), (this.#o = void 0), this.#p?.(), (this.#p = void 0)));
        }
        isFetching(a) {
          return this.#j.findAll({ ...a, fetchStatus: 'fetching' }).length;
        }
        isMutating(a) {
          return this.#c.findAll({ ...a, status: 'pending' }).length;
        }
        getQueryData(a) {
          let b = this.defaultQueryOptions({ queryKey: a });
          return this.#j.get(b.queryHash)?.state.data;
        }
        ensureQueryData(a) {
          let b = this.defaultQueryOptions(a),
            c = this.#j.build(this, b),
            d = c.state.data;
          return void 0 === d
            ? this.fetchQuery(a)
            : (a.revalidateIfStale &&
                c.isStaleByTime((0, g.resolveQueryValue)(b.staleTime, c)) &&
                this.prefetchQuery(b),
              Promise.resolve(d));
        }
        getQueriesData(a) {
          return this.#j.findAll(a).map(({ queryKey: a, state: b }) => [a, b.data]);
        }
        setQueryData(a, b, c) {
          let d = this.defaultQueryOptions({ queryKey: a }),
            e = this.#j.get(d.queryHash)?.state.data,
            f = (0, g.functionalUpdate)(b, e);
          if (void 0 !== f) return this.#j.build(this, d).setData(f, { ...c, manual: !0 });
        }
        setQueriesData(a, b, c) {
          return i.notifyManager.batch(() =>
            this.#j.findAll(a).map(({ queryKey: a }) => [a, this.setQueryData(a, b, c)]),
          );
        }
        getQueryState(a) {
          let b = this.defaultQueryOptions({ queryKey: a });
          return this.#j.get(b.queryHash)?.state;
        }
        removeQueries(a) {
          let b = this.#j;
          i.notifyManager.batch(() => {
            b.findAll(a).forEach((a) => {
              b.remove(a);
            });
          });
        }
        resetQueries(a, b) {
          let c = this.#j;
          return i.notifyManager.batch(() => {
            let d = c.findAll(a),
              e = new Set(d);
            return (
              d.forEach((a) => {
                a.reset();
              }),
              this.refetchQueries({ type: 'active', predicate: (a) => e.has(a) }, b)
            );
          });
        }
        cancelQueries(a, b = {}) {
          let c = { revert: !0, ...b };
          return Promise.all(
            i.notifyManager.batch(() => this.#j.findAll(a).map((a) => a.cancel(c))),
          )
            .then(g.noop)
            .catch(g.noop);
        }
        invalidateQueries(a, b = {}) {
          return i.notifyManager.batch(() =>
            (this.#j.findAll(a).forEach((a) => {
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
            i.notifyManager.batch(() =>
              this.#j
                .findAll(a)
                .filter((a) => !a.isDisabled() && !a.isStatic())
                .map((a) => {
                  let b = a.fetch(void 0, c);
                  return (
                    c.throwOnError || (b = b.catch(g.noop)),
                    'paused' === a.state.fetchStatus ? Promise.resolve() : b
                  );
                }),
            ),
          ).then(g.noop);
        }
        async query(a) {
          let b = this.defaultQueryOptions(a);
          void 0 === b.retry && (b.retry = !1);
          let c = this.#j.build(this, b),
            d = c.isStaleByTime((0, g.resolveQueryValue)(b.staleTime, c))
              ? await c.fetch(b)
              : c.state.data,
            e = b.select;
          return e ? e(d) : d;
        }
        fetchQuery(a) {
          let b = this.defaultQueryOptions(a);
          void 0 === b.retry && (b.retry = !1);
          let c = this.#j.build(this, b);
          return c.isStaleByTime((0, g.resolveQueryValue)(b.staleTime, c))
            ? c.fetch(b)
            : Promise.resolve(c.state.data);
        }
        prefetchQuery(a) {
          return this.fetchQuery(a).then(g.noop).catch(g.noop);
        }
        infiniteQuery(a) {
          return ((a._type = 'infinite'), this.query(a));
        }
        fetchInfiniteQuery(a) {
          return ((a._type = 'infinite'), this.fetchQuery(a));
        }
        prefetchInfiniteQuery(a) {
          return this.fetchInfiniteQuery(a).then(g.noop).catch(g.noop);
        }
        ensureInfiniteQueryData(a) {
          return ((a._type = 'infinite'), this.ensureQueryData(a));
        }
        resumePausedMutations() {
          return j.onlineManager.isOnline() ? this.#c.resumePausedMutations() : Promise.resolve();
        }
        getQueryCache() {
          return this.#j;
        }
        getMutationCache() {
          return this.#c;
        }
        getDefaultOptions() {
          return this.#k;
        }
        setDefaultOptions(a) {
          this.#k = a;
        }
        setQueryDefaults(a, b) {
          this.#l.set((0, g.hashKey)(a), { queryKey: a, defaultOptions: b });
        }
        getQueryDefaults(a) {
          let b = [...this.#l.values()],
            c = {};
          return (
            b.forEach((b) => {
              (0, g.partialMatchKey)(a, b.queryKey) && Object.assign(c, b.defaultOptions);
            }),
            c
          );
        }
        setMutationDefaults(a, b) {
          this.#m.set((0, g.hashKey)(a), { mutationKey: a, defaultOptions: b });
        }
        getMutationDefaults(a) {
          let b = [...this.#m.values()],
            c = {};
          return (
            b.forEach((b) => {
              (0, g.partialMatchKey)(a, b.mutationKey) && Object.assign(c, b.defaultOptions);
            }),
            c
          );
        }
        defaultQueryOptions(a) {
          if (a._defaulted) return a;
          let b = {
            ...this.#k.queries,
            ...this.getQueryDefaults(a.queryKey),
            ...a,
            _defaulted: !0,
          };
          return (
            b.queryHash || (b.queryHash = (0, g.hashQueryKeyByOptions)(b.queryKey, b)),
            void 0 === b.refetchOnReconnect && (b.refetchOnReconnect = 'always' !== b.networkMode),
            void 0 === b.throwOnError && (b.throwOnError = !!b.suspense),
            !b.networkMode && b.persister && (b.networkMode = 'offlineFirst'),
            b.queryFn === g.skipToken && (b.enabled = !1),
            b
          );
        }
        defaultMutationOptions(a) {
          return a?._defaulted
            ? a
            : {
                ...this.#k.mutations,
                ...(a?.mutationKey && this.getMutationDefaults(a.mutationKey)),
                ...a,
                _defaulted: !0,
              };
        }
        clear() {
          (this.#j.clear(), this.#c.clear());
        }
      },
      u = a.i(73304),
      v = a.i(79478),
      w = a.i(48326);
    let x = {
      303: 'Multiple adapter contexts detected. This might happen in monorepos.',
      404: 'nuqs requires an adapter to work with your framework.',
      409: 'Multiple versions of the library are loaded. This may lead to unexpected behavior. Currently using `%s`, but `%s` (via the %s adapter) was about to load on top.',
      414: 'Max safe URL length exceeded. Some browsers may not be able to accept this URL. Consider limiting the amount of state stored in the URL.',
      429: 'URL update rate-limited by the browser. Consider increasing `throttleMs` for key(s) `%s`. %O',
      500: "Empty search params cache. Search params can't be accessed in Layouts.",
      501: 'Search params cache already populated. Have you called `parse` twice?',
      502: '`processUrlSearchParams` threw while processing key(s) `%s`. %O',
    };
    function y(a) {
      return `[nuqs] ${x[a]}
  See https://nuqs.dev/NUQS-${a}`;
    }
    let z = '2.10.1',
      A = {};
    function B(a, b) {
      let c = Symbol.for(`nuqs.${z}.${a}`),
        d = globalThis;
      if (null != d[c]) return d[c];
      let e = Object.isExtensible(d) ? d : A;
      return (e[c] ??= b());
    }
    let C =
      ((c = w.createContext),
      (d = () => {
        let a = (0, w.createContext)({
          useAdapter() {
            throw Error(y(404));
          },
        });
        return ((a.displayName = 'NuqsAdapterContext'), a);
      }),
      (b = B('adapter-context', () => new WeakMap())).has(c) || b.set(c, d()),
      b.get(c));
    function D(a) {}
    function E(a, b, c) {
      let d = setTimeout(function () {
        (a(), c.removeEventListener('abort', e));
      }, b);
      function e() {
        (clearTimeout(d), c.removeEventListener('abort', e));
      }
      c.addEventListener('abort', e);
    }
    function F() {
      let a = Promise;
      if (Promise.hasOwnProperty('withResolvers')) return Promise.withResolvers();
      let b = () => {},
        c = () => {};
      return {
        promise: new a((a, d) => {
          ((b = a), (c = d));
        }),
        resolve: b,
        reject: c,
      };
    }
    function G() {
      return new URLSearchParams(location.search);
    }
    var H = class {
      updateMap = new Map();
      options = { history: 'replace', scroll: !1, shallow: !0 };
      timeMs = 50;
      transitions = new Set();
      resolvers = null;
      controller = null;
      lastFlushedAt = 0;
      resetQueueOnNextPush = !1;
      push({ key: a, query: b, options: c }, d = 50) {
        (this.resetQueueOnNextPush && (this.reset(), (this.resetQueueOnNextPush = !1)),
          D(7, a, b, c),
          this.updateMap.set(a, b),
          'push' === c.history && (this.options.history = 'push'),
          c.scroll && (this.options.scroll = !0),
          !1 === c.shallow && (this.options.shallow = !1),
          c.startTransition && this.transitions.add(c.startTransition),
          (!Number.isFinite(this.timeMs) || d > this.timeMs) && (this.timeMs = d));
      }
      getQueuedQuery(a) {
        return this.updateMap.get(a);
      }
      getPendingPromise({ getSearchParamsSnapshot: a = G }) {
        return this.resolvers?.promise ?? Promise.resolve(a());
      }
      flush({ getSearchParamsSnapshot: a = G, rateLimitFactor: b = 1, ...c }, d) {
        if (((this.controller ??= new AbortController()), !Number.isFinite(this.timeMs)))
          return (D(8), Promise.resolve(a()));
        if (this.resolvers) return this.resolvers.promise;
        this.resolvers = F();
        let e = () => {
            this.lastFlushedAt = performance.now();
            let [b, e] = this.applyPendingUpdates(
              {
                ...c,
                autoResetQueueOnUpdate: c.autoResetQueueOnUpdate ?? !0,
                getSearchParamsSnapshot: a,
              },
              d,
            );
            (null === e
              ? (this.resolvers.resolve(b), (this.resetQueueOnNextPush = !0))
              : this.resolvers.reject(b),
              (this.resolvers = null));
          },
          f = () => {
            let a = performance.now() - this.lastFlushedAt,
              c = this.timeMs,
              d = b * Math.max(0, c - a);
            (D(9, d, c, b), 0 === d ? e() : E(e, d, this.controller.signal));
          };
        return (E(f, 0, this.controller.signal), this.resolvers.promise);
      }
      abort() {
        return (
          this.controller?.abort(),
          (this.controller = new AbortController()),
          this.resolvers?.resolve(new URLSearchParams()),
          (this.resolvers = null),
          this.reset()
        );
      }
      reset() {
        let a = Array.from(this.updateMap.keys());
        return (
          D(10, JSON.stringify(Object.fromEntries(this.updateMap))),
          this.updateMap.clear(),
          this.transitions.clear(),
          (this.options = { history: 'replace', scroll: !1, shallow: !0 }),
          (this.timeMs = 50),
          a
        );
      }
      applyPendingUpdates(a, b) {
        let { updateUrl: c, getSearchParamsSnapshot: d } = a,
          e = d();
        if ((D(11, this.updateMap.size, e.toString()), 0 === this.updateMap.size)) return [e, null];
        let f = Array.from(this.updateMap.entries()),
          g = { ...this.options },
          h = Array.from(this.transitions);
        for (let [b, c] of (a.autoResetQueueOnUpdate && this.reset(), D(12, f, g), f))
          null === c
            ? e.delete(b)
            : (e = (function (a, b, c) {
                if ('string' == typeof c) a.set(b, c);
                else {
                  for (let d of (a.delete(b), c)) a.append(b, d);
                  a.has(b) || a.set(b, '');
                }
                return a;
              })(e, b, c));
        if (b)
          try {
            e = b(e);
          } catch (a) {
            return (
              console.error(y(502), f.map(([a]) => a).join(), a),
              (this.resetQueueOnNextPush = !0),
              [e, a]
            );
          }
        try {
          return (
            !(function (a, b) {
              let c = b;
              for (let b = a.length - 1; b >= 0; b--) {
                let d = a[b];
                if (!d) continue;
                let e = c;
                c = () => d(e);
              }
              c();
            })(h, () => c(e, g)),
            [e, null]
          );
        } catch (a) {
          return (console.error(y(429), f.map(([a]) => a).join(), a), [e, a]);
        }
      }
    };
    let I = B('throttle-queue', () => new H());
    var J = class {
        resolvers = F();
        controller = new AbortController();
        queuedValue = void 0;
        abort() {
          (this.controller.abort(), (this.queuedValue = void 0));
        }
        push(a, b, c) {
          return (
            (this.queuedValue = a),
            this.controller.abort(),
            (this.controller = new AbortController()),
            E(
              () => {
                let b = this.resolvers;
                try {
                  D(13, a);
                  let d = c(a);
                  (D(14, this.queuedValue),
                    (this.queuedValue = void 0),
                    (this.resolvers = F()),
                    d.then((a) => b.resolve(a)).catch((a) => b.reject(a)));
                } catch (a) {
                  ((this.queuedValue = void 0), b.reject(a));
                }
              },
              b,
              this.controller.signal,
            ),
            this.resolvers.promise
          );
        }
      },
      K = class {
        throttleQueue;
        queues = new Map();
        queuedQuerySync = (function () {
          let a = new Map();
          return {
            on(b, c) {
              let d = a.get(b) || [];
              return (d.push(c), a.set(b, d), () => this.off(b, c));
            },
            off(b, c) {
              let d = a.get(b);
              d &&
                a.set(
                  b,
                  d.filter((a) => a !== c),
                );
            },
            emit(b, c) {
              a.get(b)?.forEach((a) => a(c));
            },
          };
        })();
        constructor(a = new H()) {
          this.throttleQueue = a;
        }
        push(a, b, c, d) {
          if (!Number.isFinite(b)) return Promise.resolve((c.getSearchParamsSnapshot ?? G)());
          let e = a.key,
            f = this.queues.get(e);
          (f || (D(15, e), (f = new J()), this.queues.set(e, f)), D(17, a));
          let g = () => (
              this.throttleQueue.push(a),
              this.throttleQueue.flush(c, d).finally(() => {
                (this.queues.get(e)?.queuedValue === void 0 && (D(16, e), this.queues.delete(e)),
                  this.queuedQuerySync.emit(e));
              })
            ),
            h = f.push(a, b, g);
          return (this.queuedQuerySync.emit(e), h);
        }
        abort(a) {
          let b = this.queues.get(a);
          return b
            ? (D(18, a, b.queuedValue?.query),
              this.queues.delete(a),
              b.abort(),
              this.queuedQuerySync.emit(a),
              (a) => (a.then(b.resolvers.resolve, b.resolvers.reject), a))
            : (a) => a;
        }
        abortAll() {
          for (let [a, b] of this.queues.entries())
            (D(18, a, b.queuedValue?.query),
              b.abort(),
              b.resolvers.resolve(new URLSearchParams()),
              this.queuedQuerySync.emit(a));
          this.queues.clear();
        }
        getQueuedQuery(a) {
          let b = this.queues.get(a)?.queuedValue?.query;
          return void 0 !== b ? b : this.throttleQueue.getQueuedQuery(a);
        }
      };
    let L = B('debounce-controller', () => new K(I)),
      M = B('queue-reset', () => ({ mutex: 0 }));
    function N(a = 1) {
      M.mutex = a;
    }
    function O() {
      (D(19), L.abortAll(), I.abort().forEach((a) => L.queuedQuerySync.emit(a)));
    }
    var P = a.i(62965);
    function Q() {
      (N(0), O());
    }
    function R() {
      let a = (0, P.usePathname)(),
        b = (0, w.useRef)(a);
      return (
        b.current !== a && ((b.current = a), I.reset()),
        (0, w.useEffect)(
          () => (
            !(function () {
              var a;
              if (
                ((a = 'next/app'),
                'u' < typeof history ||
                  (history.nuqs?.version && '2.10.1' !== history.nuqs.version
                    ? (console.error(y(409), history.nuqs.version, z, a), !0)
                    : !!history.nuqs?.adapters?.includes(a)))
              )
                return;
              let b = history.replaceState,
                c = history.pushState;
              ((history.replaceState = function (a, c, d) {
                return b.call(history, a, '__nuqs__' === c ? '' : c, d);
              }),
                (history.pushState = function (a, b, d) {
                  return (
                    '__nuqs__' !== b &&
                      (function (a = O) {
                        ((M.mutex = Math.max(0, M.mutex - 1)), M.mutex > 0 || a());
                      })(() => {
                        queueMicrotask(O);
                      }),
                    c.call(history, a, '__nuqs__' === b ? '' : b, d)
                  );
                }),
                (history.nuqs = history.nuqs ?? { version: '2.10.1', adapters: [] }),
                history.nuqs.adapters.push('next/app'));
            })(),
            window.addEventListener('popstate', Q),
            () => window.removeEventListener('popstate', Q)
          ),
          [],
        ),
        null
      );
    }
    let S =
      ((e = function () {
        let a = (0, P.useRouter)(),
          b = (0, P.usePathname)(),
          [c, d] = (0, w.useOptimistic)((0, P.useSearchParams)() ?? new URLSearchParams());
        return {
          searchParams: c,
          pathname: b,
          updateUrl: (0, w.useCallback)((b, c) => {
            (0, w.startTransition)(() => {
              c.shallow || d(b);
              let e = (function (a) {
                let { origin: b, pathname: c, hash: d } = location;
                return (
                  b +
                  c +
                  (function (a) {
                    if (0 === a.size) return '';
                    let b = [];
                    for (let [c, d] of a.entries()) {
                      let a = c
                        .replace(/#/g, '%23')
                        .replace(/&/g, '%26')
                        .replace(/\+/g, '%2B')
                        .replace(/=/g, '%3D')
                        .replace(/\?/g, '%3F');
                      b.push(
                        `${a}=${d
                          .replace(/%/g, '%25')
                          .replace(/\+/g, '%2B')
                          .replace(/ /g, '+')
                          .replace(/#/g, '%23')
                          .replace(/&/g, '%26')
                          .replace(/"/g, '%22')
                          .replace(/'/g, '%27')
                          .replace(/`/g, '%60')
                          .replace(/</g, '%3C')
                          .replace(/>/g, '%3E')
                          .replace(/[\x00-\x1F]/g, (a) => encodeURIComponent(a))}`,
                      );
                    }
                    return '?' + b.join('&');
                  })(a) +
                  d
                );
              })(b);
              D(20, 'next/app', e);
              let f = 'push' === c.history ? history.pushState : history.replaceState;
              (N(0),
                f.call(history, null, '__nuqs__', e),
                c.scroll && window.scrollTo(0, 0),
                c.shallow || a.replace(e, { scroll: !1 }));
            });
          }, []),
          rateLimitFactor: 3,
          autoResetQueueOnUpdate: !1,
        };
      }),
      ({ children: a, defaultOptions: b, processUrlSearchParams: c, ...d }) =>
        (0, w.createElement)(
          C.Provider,
          { ...d, value: { useAdapter: e, defaultOptions: b, processUrlSearchParams: c } },
          a,
        ));
    function T({ children: a, ...b }) {
      return (0, w.createElement)(S, {
        ...b,
        children: [
          (0, w.createElement)(w.Suspense, {
            key: 'nuqs-adapter-suspense-navspy',
            children: (0, w.createElement)(R),
          }),
          a,
        ],
      });
    }
    var U = w,
      V = a.i(48741);
    class W extends U.Component {
      state = { hasError: !1 };
      static getDerivedStateFromError() {
        return { hasError: !0 };
      }
      reset = () => {
        this.setState({ hasError: !1 });
      };
      render() {
        return this.state.hasError
          ? (
              this.props.fallback ??
              ((a) =>
                (0, f.jsxs)('div', {
                  className:
                    'flex min-h-64 flex-col items-center justify-center gap-4 p-8 text-center',
                  role: 'alert',
                  children: [
                    (0, f.jsxs)('div', {
                      children: [
                        (0, f.jsx)('h2', {
                          className: 'text-lg font-semibold',
                          children: 'Fitur tidak dapat dimuat',
                        }),
                        (0, f.jsx)('p', {
                          className: 'mt-1 text-sm text-muted-foreground',
                          children: 'Terjadi masalah pada bagian ini. Coba muat ulang fitur.',
                        }),
                      ],
                    }),
                    (0, f.jsx)(V.Button, { type: 'button', onClick: a, children: 'Coba lagi' }),
                  ],
                }))
            )(this.reset)
          : this.props.children;
      }
    }
    let X = (0, a.i(10641).default)('CloudOff', [
      ['path', { d: 'm2 2 20 20', key: '1ooewy' }],
      ['path', { d: 'M5.782 5.782A7 7 0 0 0 9 19h8.5a4.5 4.5 0 0 0 1.307-.193', key: 'yfwify' }],
      [
        'path',
        { d: 'M21.532 16.5A4.5 4.5 0 0 0 17.5 10h-1.79A7.008 7.008 0 0 0 10 5.07', key: 'jlfiyv' },
      ],
    ]);
    function Y() {
      return !(function () {
        let [a, b] = (0, w.useState)(!0);
        return (
          (0, w.useEffect)(() => {
            let a = () => b(window.navigator.onLine);
            return (
              a(),
              window.addEventListener('online', a),
              window.addEventListener('offline', a),
              () => {
                (window.removeEventListener('online', a), window.removeEventListener('offline', a));
              }
            );
          }, []),
          a
        );
      })()
        ? (0, f.jsxs)('div', {
            className:
              'flex min-h-10 items-center justify-center gap-2 bg-amber-500 px-4 py-2 text-sm font-medium text-white',
            role: 'status',
            'aria-live': 'polite',
            children: [
              (0, f.jsx)(X, { className: 'h-4 w-4 shrink-0', 'aria-hidden': 'true' }),
              (0, f.jsx)('span', {
                children: 'Anda sedang offline. Perubahan belum dapat disinkronkan.',
              }),
            ],
          })
        : null;
    }
    function Z({ children: a }) {
      return (0, f.jsxs)(W, { children: [(0, f.jsx)(Y, {}), a] });
    }
    let $ = new Set([408, 425, 429, 500, 502, 503, 504]);
    function _(a, b) {
      if (a >= 1) return !1;
      let c = (function (a) {
        if ('object' != typeof a || null === a || !('status' in a)) return;
        let b = a.status;
        return 'number' == typeof b ? b : void 0;
      })(b);
      return void 0 !== c ? $.has(c) : a < 1;
    }
    a.s(
      [
        'Providers',
        0,
        function ({ children: a }) {
          let [b] = (0, w.useState)(
            () =>
              new t({
                defaultOptions: { queries: { staleTime: 3e4, refetchOnWindowFocus: !1, retry: _ } },
              }),
          );
          return (0, f.jsx)(u.QueryClientProvider, {
            client: b,
            children: (0, f.jsx)(v.ThemeProvider, {
              attribute: 'data-theme',
              defaultTheme: 'system',
              enableSystem: !0,
              storageKey: 'dashboard-theme',
              children: (0, f.jsx)(T, { children: (0, f.jsx)(Z, { children: a }) }),
            }),
          });
        },
      ],
      44588,
    );
  },
  6258,
  (a) => {
    'use strict';
    var b = a.i(68508),
      c = a.i(79478),
      d = a.i(86435);
    a.s([
      'Toaster',
      0,
      ({ ...a }) => {
        let { theme: e = 'system' } = (0, c.useTheme)();
        return (0, b.jsx)(d.Toaster, {
          theme: e,
          className: 'toaster group',
          toastOptions: {
            classNames: {
              toast:
                'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
              description: 'group-[.toast]:text-muted-foreground',
              actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
              cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
            },
          },
          ...a,
        });
      },
    ]);
  },
  53748,
  (a) => {
    'use strict';
    var b = a.i(68508),
      c = a.i(48326);
    function d({ type: a, onMetric: b, isFinal: e }) {
      return (
        (0, c.useEffect)(() => {
          if ('u' < typeof PerformanceObserver) return;
          let c = new PerformanceObserver((c) => {
            let d = c.getEntries(),
              f = d.find((a) => e?.(a) ?? !0);
            if (f) {
              if ('layout-shift' === a)
                return void b({
                  name: 'CLS',
                  value: d.reduce((a, b) => (b.hadRecentInput ? a : a + b.value), 0),
                  id: 'layout-shift',
                  navigationType: 'navigate',
                });
              b({ name: 'LCP', value: f.startTime, id: f.toString(), navigationType: 'navigate' });
            }
          });
          return (c.observe({ type: a, buffered: !0 }), () => c.disconnect());
        }, [e, b, a]),
        null
      );
    }
    a.s(
      [
        'WebVitalsReporter',
        0,
        function () {
          (0, c.useEffect)(() => {
            let a,
              b = new PerformanceObserver((c) => {
                let d = c.getEntries().findLast((a) => 'first-contentful-paint' === a.name);
                d &&
                  ((a = {
                    name: 'FCP',
                    value: d.startTime,
                    id: d.name,
                    navigationType: 'navigate',
                  }),
                  b.disconnect());
              });
            return (
              b.observe({ type: 'paint', buffered: !0 }),
              () => {
                var c, d;
                (b.disconnect(),
                  a &&
                    ((c = a),
                    'sendBeacon' in navigator
                      ? ((d = c),
                        navigator.sendBeacon.bind(navigator)(
                          '/api/web-vitals',
                          new Blob([JSON.stringify(d)], { type: 'application/json' }),
                        ))
                      : fetch('/api/web-vitals', {
                          method: 'POST',
                          body: JSON.stringify(c),
                          headers: { 'content-type': 'application/json' },
                          keepalive: !0,
                        })));
              }
            );
          }, []);
          let a = (a) => (b) => {
            ('CLS' !== a || 0 !== b.value) &&
              fetch('/api/web-vitals', {
                method: 'POST',
                body: JSON.stringify(b),
                headers: { 'content-type': 'application/json' },
                keepalive: !0,
              });
          };
          return (0, b.jsxs)(b.Fragment, {
            children: [
              (0, b.jsx)(d, { type: 'largest-contentful-paint', onMetric: a('LCP') }),
              (0, b.jsx)(d, { type: 'layout-shift', onMetric: a('CLS') }),
            ],
          });
        },
      ],
      53748,
    );
  },
];

//# sourceMappingURL=apps_dashboard_1oa5gik._.js.map
