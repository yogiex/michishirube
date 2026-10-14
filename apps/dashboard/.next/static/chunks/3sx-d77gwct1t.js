(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  'object' == typeof document ? document.currentScript : void 0,
  6040,
  (e) => {
    'use strict';
    let t;
    var s,
      r,
      i,
      n = e.i(24830),
      a = e.i(78356),
      o = e.i(53094),
      u = e.i(70508),
      l = e.i(88060),
      h = e.i(77288),
      c = e.i(67948),
      d = e.i(88949),
      p = class extends d.Removable {
        #e;
        #t;
        #s;
        #r;
        constructor(e) {
          (super(),
            (this.#e = e.client),
            (this.mutationId = e.mutationId),
            (this.#s = e.mutationCache),
            (this.#t = []),
            (this.state = e.state || {
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
            this.setOptions(e.options),
            this.scheduleGc());
        }
        setOptions(e) {
          ((this.options = e), this.updateGcTime(this.options.gcTime));
        }
        get meta() {
          return this.options.meta;
        }
        addObserver(e) {
          this.#t.includes(e) ||
            (this.#t.push(e),
            this.clearGcTimeout(),
            this.#s.notify({ type: 'observerAdded', mutation: this, observer: e }));
        }
        removeObserver(e) {
          ((this.#t = this.#t.filter((t) => t !== e)),
            this.scheduleGc(),
            this.#s.notify({ type: 'observerRemoved', mutation: this, observer: e }));
        }
        optionalRemove() {
          this.#t.length ||
            ('pending' === this.state.status ? this.scheduleGc() : this.#s.remove(this));
        }
        continue() {
          return (
            this.#r?.continue() ??
            ('pending' === this.state.status
              ? this.execute(this.state.variables)
              : Promise.resolve())
          );
        }
        async execute(e) {
          let t = () => {
              this.#i({ type: 'continue' });
            },
            s = { client: this.#e, meta: this.options.meta, mutationKey: this.options.mutationKey },
            r = (this.#r = (0, c.createRetryer)({
              fn: () =>
                this.options.mutationFn
                  ? this.options.mutationFn(e, s)
                  : Promise.reject(Error('No mutationFn found')),
              onFail: (e, t) => {
                this.#i({ type: 'failed', failureCount: e, error: t });
              },
              onPause: () => {
                this.#i({ type: 'pause' });
              },
              onContinue: t,
              retry: this.options.retry ?? 0,
              retryDelay: this.options.retryDelay,
              networkMode: this.options.networkMode,
              canRun: () => this.#s.canRun(this),
            })),
            i = 'pending' === this.state.status,
            n = !r.canStart();
          try {
            if (i) t();
            else {
              (this.#i({ type: 'pending', variables: e, isPaused: n }),
                this.#s.config.onMutate && (await this.#s.config.onMutate(e, this, s)));
              let t = await this.options.onMutate?.(e, s);
              t !== this.state.context &&
                this.#i({ type: 'pending', context: t, variables: e, isPaused: n });
            }
            let a = await r.start();
            return (
              await this.#s.config.onSuccess?.(a, e, this.state.context, this, s),
              await this.options.onSuccess?.(a, e, this.state.context, s),
              await this.#s.config.onSettled?.(
                a,
                null,
                this.state.variables,
                this.state.context,
                this,
                s,
              ),
              await this.options.onSettled?.(a, null, e, this.state.context, s),
              this.#i({ type: 'success', data: a }),
              a
            );
          } catch (t) {
            try {
              await this.#s.config.onError?.(t, e, this.state.context, this, s);
            } catch (e) {
              Promise.reject(e);
            }
            try {
              await this.options.onError?.(t, e, this.state.context, s);
            } catch (e) {
              Promise.reject(e);
            }
            try {
              await this.#s.config.onSettled?.(
                void 0,
                t,
                this.state.variables,
                this.state.context,
                this,
                s,
              );
            } catch (e) {
              Promise.reject(e);
            }
            try {
              await this.options.onSettled?.(void 0, t, e, this.state.context, s);
            } catch (e) {
              Promise.reject(e);
            }
            throw (this.#i({ type: 'error', error: t }), t);
          } finally {
            (this.#r === r && (this.#r = void 0), this.#s.runNext(this));
          }
        }
        #i(e) {
          ((this.state = ((t) => {
            switch (e.type) {
              case 'failed':
                return { ...t, failureCount: e.failureCount, failureReason: e.error };
              case 'pause':
                return { ...t, isPaused: !0 };
              case 'continue':
                return { ...t, isPaused: !1 };
              case 'pending':
                return {
                  ...t,
                  context: e.context,
                  data: void 0,
                  failureCount: 0,
                  failureReason: null,
                  error: null,
                  isPaused: e.isPaused,
                  status: 'pending',
                  variables: e.variables,
                  submittedAt: Date.now(),
                };
              case 'success':
                return {
                  ...t,
                  data: e.data,
                  failureCount: 0,
                  failureReason: null,
                  error: null,
                  status: 'success',
                  isPaused: !1,
                };
              case 'error':
                return {
                  ...t,
                  data: void 0,
                  error: e.error,
                  failureCount: t.failureCount + 1,
                  failureReason: e.error,
                  isPaused: !1,
                  status: 'error',
                };
            }
          })(this.state)),
            u.notifyManager.batch(() => {
              (this.#t.forEach((t) => {
                t.onMutationUpdate(e);
              }),
                this.#s.notify({ mutation: this, type: 'updated', action: e }));
            }));
        }
      },
      f = class extends h.Subscribable {
        #n;
        #a;
        #o;
        constructor(e = {}) {
          (super(), (this.config = e), (this.#n = new Set()), (this.#a = new Map()), (this.#o = 0));
        }
        build(e, t, s) {
          let r = new p({
            client: e,
            mutationCache: this,
            mutationId: ++this.#o,
            options: e.defaultMutationOptions(t),
            state: s,
          });
          return (this.add(r), r);
        }
        add(e) {
          this.#n.add(e);
          let t = y(e);
          if ('string' == typeof t) {
            let s = this.#a.get(t);
            s ? s.push(e) : this.#a.set(t, [e]);
          }
          this.notify({ type: 'added', mutation: e });
        }
        remove(e) {
          if (this.#n.delete(e)) {
            let t = y(e);
            if ('string' == typeof t) {
              let s = this.#a.get(t);
              if (s)
                if (s.length > 1) {
                  let t = s.indexOf(e);
                  -1 !== t && s.splice(t, 1);
                } else s[0] === e && this.#a.delete(t);
            }
          }
          this.notify({ type: 'removed', mutation: e });
        }
        canRun(e) {
          let t = y(e);
          if ('string' != typeof t) return !0;
          {
            let s = this.#a.get(t)?.find((e) => 'pending' === e.state.status);
            return !s || s === e;
          }
        }
        runNext(e) {
          let t = y(e);
          return 'string' == typeof t
            ? (this.#a
                .get(t)
                ?.find((t) => t !== e && t.state.isPaused)
                ?.continue() ?? Promise.resolve())
            : Promise.resolve();
        }
        clear() {
          u.notifyManager.batch(() => {
            (this.#n.forEach((e) => {
              this.notify({ type: 'removed', mutation: e });
            }),
              this.#n.clear(),
              this.#a.clear());
          });
        }
        getAll() {
          return Array.from(this.#n);
        }
        find(e) {
          let t = { exact: !0, ...e };
          return this.getAll().find((e) => (0, a.matchMutation)(t, e));
        }
        findAll(e = {}) {
          return this.getAll().filter((t) => (0, a.matchMutation)(e, t));
        }
        notify(e) {
          u.notifyManager.batch(() => {
            this.listeners.forEach((t) => {
              t(e);
            });
          });
        }
        resumePausedMutations() {
          let e = this.getAll().filter((e) => e.state.isPaused);
          return u.notifyManager.batch(() => Promise.all(e.map((e) => e.continue().catch(a.noop))));
        }
      };
    function y(e) {
      return e.options.scope?.id;
    }
    var m = h,
      g = e.i(40741),
      v = class extends m.Subscribable {
        #u;
        constructor(e = {}) {
          (super(), (this.config = e), (this.#u = new Map()));
        }
        build(e, t, s) {
          let r = t.queryKey,
            i = t.queryHash ?? (0, a.hashQueryKeyByOptions)(r, t),
            n = this.get(i);
          return (
            n ||
              ((n = new g.Query({
                client: e,
                queryKey: r,
                queryHash: i,
                options: e.defaultQueryOptions(t),
                state: s,
                defaultOptions: e.getQueryDefaults(r),
              })),
              this.add(n)),
            n
          );
        }
        add(e) {
          this.#u.has(e.queryHash) ||
            (this.#u.set(e.queryHash, e), this.notify({ type: 'added', query: e }));
        }
        remove(e) {
          this.#u.get(e.queryHash) === e &&
            (e.destroy(), this.#u.delete(e.queryHash), this.notify({ type: 'removed', query: e }));
        }
        clear() {
          u.notifyManager.batch(() => {
            this.getAll().forEach((e) => {
              this.remove(e);
            });
          });
        }
        get(e) {
          return this.#u.get(e);
        }
        getAll() {
          return [...this.#u.values()];
        }
        find(e) {
          let t = { exact: !0, ...e };
          return this.getAll().find((e) => (0, a.matchQuery)(t, e));
        }
        findAll(e = {}) {
          let t = this.getAll();
          return Object.keys(e).length > 0 ? t.filter((t) => (0, a.matchQuery)(e, t)) : t;
        }
        notify(e) {
          u.notifyManager.batch(() => {
            this.listeners.forEach((t) => {
              t(e);
            });
          });
        }
        onFocus() {
          u.notifyManager.batch(() => {
            this.getAll().forEach((e) => {
              e.onFocus();
            });
          });
        }
        onOnline() {
          u.notifyManager.batch(() => {
            this.getAll().forEach((e) => {
              e.onOnline();
            });
          });
        }
      },
      b = class {
        #l;
        #s;
        #h;
        #c;
        #d;
        #p;
        #f;
        #y;
        constructor(e = {}) {
          ((this.#l = e.queryCache || new v()),
            (this.#s = e.mutationCache || new f()),
            (this.#h = e.defaultOptions || {}),
            (this.#c = new Map()),
            (this.#d = new Map()),
            (this.#p = 0));
        }
        mount() {
          (this.#p++,
            1 === this.#p &&
              ((this.#f = o.focusManager.subscribe(async (e) => {
                e && (await this.resumePausedMutations(), this.#l.onFocus());
              })),
              (this.#y = l.onlineManager.subscribe(async (e) => {
                e && (await this.resumePausedMutations(), this.#l.onOnline());
              }))));
        }
        unmount() {
          (this.#p--,
            0 === this.#p && (this.#f?.(), (this.#f = void 0), this.#y?.(), (this.#y = void 0)));
        }
        isFetching(e) {
          return this.#l.findAll({ ...e, fetchStatus: 'fetching' }).length;
        }
        isMutating(e) {
          return this.#s.findAll({ ...e, status: 'pending' }).length;
        }
        getQueryData(e) {
          let t = this.defaultQueryOptions({ queryKey: e });
          return this.#l.get(t.queryHash)?.state.data;
        }
        ensureQueryData(e) {
          let t = this.defaultQueryOptions(e),
            s = this.#l.build(this, t),
            r = s.state.data;
          return void 0 === r
            ? this.fetchQuery(e)
            : (e.revalidateIfStale &&
                s.isStaleByTime((0, a.resolveQueryValue)(t.staleTime, s)) &&
                this.prefetchQuery(t),
              Promise.resolve(r));
        }
        getQueriesData(e) {
          return this.#l.findAll(e).map(({ queryKey: e, state: t }) => [e, t.data]);
        }
        setQueryData(e, t, s) {
          let r = this.defaultQueryOptions({ queryKey: e }),
            i = this.#l.get(r.queryHash)?.state.data,
            n = (0, a.functionalUpdate)(t, i);
          if (void 0 !== n) return this.#l.build(this, r).setData(n, { ...s, manual: !0 });
        }
        setQueriesData(e, t, s) {
          return u.notifyManager.batch(() =>
            this.#l.findAll(e).map(({ queryKey: e }) => [e, this.setQueryData(e, t, s)]),
          );
        }
        getQueryState(e) {
          let t = this.defaultQueryOptions({ queryKey: e });
          return this.#l.get(t.queryHash)?.state;
        }
        removeQueries(e) {
          let t = this.#l;
          u.notifyManager.batch(() => {
            t.findAll(e).forEach((e) => {
              t.remove(e);
            });
          });
        }
        resetQueries(e, t) {
          let s = this.#l;
          return u.notifyManager.batch(() => {
            let r = s.findAll(e),
              i = new Set(r);
            return (
              r.forEach((e) => {
                e.reset();
              }),
              this.refetchQueries({ type: 'active', predicate: (e) => i.has(e) }, t)
            );
          });
        }
        cancelQueries(e, t = {}) {
          let s = { revert: !0, ...t };
          return Promise.all(
            u.notifyManager.batch(() => this.#l.findAll(e).map((e) => e.cancel(s))),
          )
            .then(a.noop)
            .catch(a.noop);
        }
        invalidateQueries(e, t = {}) {
          return u.notifyManager.batch(() =>
            (this.#l.findAll(e).forEach((e) => {
              e.invalidate();
            }),
            e?.refetchType === 'none')
              ? Promise.resolve()
              : this.refetchQueries({ ...e, type: e?.refetchType ?? e?.type ?? 'active' }, t),
          );
        }
        refetchQueries(e, t = {}) {
          let s = { ...t, cancelRefetch: t.cancelRefetch ?? !0 };
          return Promise.all(
            u.notifyManager.batch(() =>
              this.#l
                .findAll(e)
                .filter((e) => !e.isDisabled() && !e.isStatic())
                .map((e) => {
                  let t = e.fetch(void 0, s);
                  return (
                    s.throwOnError || (t = t.catch(a.noop)),
                    'paused' === e.state.fetchStatus ? Promise.resolve() : t
                  );
                }),
            ),
          ).then(a.noop);
        }
        async query(e) {
          let t = this.defaultQueryOptions(e);
          void 0 === t.retry && (t.retry = !1);
          let s = this.#l.build(this, t),
            r = s.isStaleByTime((0, a.resolveQueryValue)(t.staleTime, s))
              ? await s.fetch(t)
              : s.state.data,
            i = t.select;
          return i ? i(r) : r;
        }
        fetchQuery(e) {
          let t = this.defaultQueryOptions(e);
          void 0 === t.retry && (t.retry = !1);
          let s = this.#l.build(this, t);
          return s.isStaleByTime((0, a.resolveQueryValue)(t.staleTime, s))
            ? s.fetch(t)
            : Promise.resolve(s.state.data);
        }
        prefetchQuery(e) {
          return this.fetchQuery(e).then(a.noop).catch(a.noop);
        }
        infiniteQuery(e) {
          return ((e._type = 'infinite'), this.query(e));
        }
        fetchInfiniteQuery(e) {
          return ((e._type = 'infinite'), this.fetchQuery(e));
        }
        prefetchInfiniteQuery(e) {
          return this.fetchInfiniteQuery(e).then(a.noop).catch(a.noop);
        }
        ensureInfiniteQueryData(e) {
          return ((e._type = 'infinite'), this.ensureQueryData(e));
        }
        resumePausedMutations() {
          return l.onlineManager.isOnline() ? this.#s.resumePausedMutations() : Promise.resolve();
        }
        getQueryCache() {
          return this.#l;
        }
        getMutationCache() {
          return this.#s;
        }
        getDefaultOptions() {
          return this.#h;
        }
        setDefaultOptions(e) {
          this.#h = e;
        }
        setQueryDefaults(e, t) {
          this.#c.set((0, a.hashKey)(e), { queryKey: e, defaultOptions: t });
        }
        getQueryDefaults(e) {
          let t = [...this.#c.values()],
            s = {};
          return (
            t.forEach((t) => {
              (0, a.partialMatchKey)(e, t.queryKey) && Object.assign(s, t.defaultOptions);
            }),
            s
          );
        }
        setMutationDefaults(e, t) {
          this.#d.set((0, a.hashKey)(e), { mutationKey: e, defaultOptions: t });
        }
        getMutationDefaults(e) {
          let t = [...this.#d.values()],
            s = {};
          return (
            t.forEach((t) => {
              (0, a.partialMatchKey)(e, t.mutationKey) && Object.assign(s, t.defaultOptions);
            }),
            s
          );
        }
        defaultQueryOptions(e) {
          if (e._defaulted) return e;
          let t = {
            ...this.#h.queries,
            ...this.getQueryDefaults(e.queryKey),
            ...e,
            _defaulted: !0,
          };
          return (
            t.queryHash || (t.queryHash = (0, a.hashQueryKeyByOptions)(t.queryKey, t)),
            void 0 === t.refetchOnReconnect && (t.refetchOnReconnect = 'always' !== t.networkMode),
            void 0 === t.throwOnError && (t.throwOnError = !!t.suspense),
            !t.networkMode && t.persister && (t.networkMode = 'offlineFirst'),
            t.queryFn === a.skipToken && (t.enabled = !1),
            t
          );
        }
        defaultMutationOptions(e) {
          return e?._defaulted
            ? e
            : {
                ...this.#h.mutations,
                ...(e?.mutationKey && this.getMutationDefaults(e.mutationKey)),
                ...e,
                _defaulted: !0,
              };
        }
        clear() {
          (this.#l.clear(), this.#s.clear());
        }
      },
      w = e.i(50955),
      q = e.i(18071),
      C = e.i(39380);
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
    function M(e) {
      return `[nuqs] ${x[e]}
  See https://nuqs.dev/NUQS-${e}`;
    }
    let O = '2.10.1',
      Q = {};
    function P(e, t) {
      let s = Symbol.for(`nuqs.${O}.${e}`),
        r = globalThis;
      if (null != r[s]) return r[s];
      let i = Object.isExtensible(r) ? r : Q;
      return (i[s] ??= t());
    }
    let S =
      ((s = C.createContext),
      (r = () => {
        let e = (0, C.createContext)({
          useAdapter() {
            throw Error(M(404));
          },
        });
        return ((e.displayName = 'NuqsAdapterContext'), e);
      }),
      (t = P('adapter-context', () => new WeakMap())).has(s) || t.set(s, r()),
      t.get(s));
    function E(e) {}
    'u' > typeof window &&
      (window.__NuqsAdapterContext && window.__NuqsAdapterContext !== S && console.error(M(303)),
      (window.__NuqsAdapterContext = S));
    let A = {
      method: 'throttle',
      timeMs: (function () {
        if ('u' < typeof window || !window.GestureEvent) return 50;
        try {
          let e = navigator.userAgent?.match(/version\/([\d\.]+) safari/i);
          return parseFloat(e[1]) >= 17 ? 120 : 320;
        } catch {
          return 320;
        }
      })(),
    };
    function j(e, t, s) {
      let r = setTimeout(function () {
        (e(), s.removeEventListener('abort', i));
      }, t);
      function i() {
        (clearTimeout(r), s.removeEventListener('abort', i));
      }
      s.addEventListener('abort', i);
    }
    function T() {
      let e = Promise;
      if (Promise.hasOwnProperty('withResolvers')) return Promise.withResolvers();
      let t = () => {},
        s = () => {};
      return {
        promise: new e((e, r) => {
          ((t = e), (s = r));
        }),
        resolve: t,
        reject: s,
      };
    }
    function R() {
      return new URLSearchParams(location.search);
    }
    var D = class {
      updateMap = new Map();
      options = { history: 'replace', scroll: !1, shallow: !0 };
      timeMs = A.timeMs;
      transitions = new Set();
      resolvers = null;
      controller = null;
      lastFlushedAt = 0;
      resetQueueOnNextPush = !1;
      push({ key: e, query: t, options: s }, r = A.timeMs) {
        (this.resetQueueOnNextPush && (this.reset(), (this.resetQueueOnNextPush = !1)),
          E(7, e, t, s),
          this.updateMap.set(e, t),
          'push' === s.history && (this.options.history = 'push'),
          s.scroll && (this.options.scroll = !0),
          !1 === s.shallow && (this.options.shallow = !1),
          s.startTransition && this.transitions.add(s.startTransition),
          (!Number.isFinite(this.timeMs) || r > this.timeMs) && (this.timeMs = r));
      }
      getQueuedQuery(e) {
        return this.updateMap.get(e);
      }
      getPendingPromise({ getSearchParamsSnapshot: e = R }) {
        return this.resolvers?.promise ?? Promise.resolve(e());
      }
      flush({ getSearchParamsSnapshot: e = R, rateLimitFactor: t = 1, ...s }, r) {
        if (((this.controller ??= new AbortController()), !Number.isFinite(this.timeMs)))
          return (E(8), Promise.resolve(e()));
        if (this.resolvers) return this.resolvers.promise;
        this.resolvers = T();
        let i = () => {
            this.lastFlushedAt = performance.now();
            let [t, i] = this.applyPendingUpdates(
              {
                ...s,
                autoResetQueueOnUpdate: s.autoResetQueueOnUpdate ?? !0,
                getSearchParamsSnapshot: e,
              },
              r,
            );
            (null === i
              ? (this.resolvers.resolve(t), (this.resetQueueOnNextPush = !0))
              : this.resolvers.reject(t),
              (this.resolvers = null));
          },
          n = () => {
            let e = performance.now() - this.lastFlushedAt,
              s = this.timeMs,
              r = t * Math.max(0, s - e);
            (E(9, r, s, t), 0 === r ? i() : j(i, r, this.controller.signal));
          };
        return (j(n, 0, this.controller.signal), this.resolvers.promise);
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
        let e = Array.from(this.updateMap.keys());
        return (
          E(10, JSON.stringify(Object.fromEntries(this.updateMap))),
          this.updateMap.clear(),
          this.transitions.clear(),
          (this.options = { history: 'replace', scroll: !1, shallow: !0 }),
          (this.timeMs = A.timeMs),
          e
        );
      }
      applyPendingUpdates(e, t) {
        let { updateUrl: s, getSearchParamsSnapshot: r } = e,
          i = r();
        if ((E(11, this.updateMap.size, i.toString()), 0 === this.updateMap.size)) return [i, null];
        let n = Array.from(this.updateMap.entries()),
          a = { ...this.options },
          o = Array.from(this.transitions);
        for (let [t, s] of (e.autoResetQueueOnUpdate && this.reset(), E(12, n, a), n))
          null === s
            ? i.delete(t)
            : (i = (function (e, t, s) {
                if ('string' == typeof s) e.set(t, s);
                else {
                  for (let r of (e.delete(t), s)) e.append(t, r);
                  e.has(t) || e.set(t, '');
                }
                return e;
              })(i, t, s));
        if (t)
          try {
            i = t(i);
          } catch (e) {
            return (
              console.error(M(502), n.map(([e]) => e).join(), e),
              (this.resetQueueOnNextPush = !0),
              [i, e]
            );
          }
        try {
          return (
            !(function (e, t) {
              let s = t;
              for (let t = e.length - 1; t >= 0; t--) {
                let r = e[t];
                if (!r) continue;
                let i = s;
                s = () => r(i);
              }
              s();
            })(o, () => s(i, a)),
            [i, null]
          );
        } catch (e) {
          return (console.error(M(429), n.map(([e]) => e).join(), e), [i, e]);
        }
      }
    };
    let k = P('throttle-queue', () => new D());
    var F = class {
        resolvers = T();
        controller = new AbortController();
        queuedValue = void 0;
        abort() {
          (this.controller.abort(), (this.queuedValue = void 0));
        }
        push(e, t, s) {
          return (
            (this.queuedValue = e),
            this.controller.abort(),
            (this.controller = new AbortController()),
            j(
              () => {
                let t = this.resolvers;
                try {
                  E(13, e);
                  let r = s(e);
                  (E(14, this.queuedValue),
                    (this.queuedValue = void 0),
                    (this.resolvers = T()),
                    r.then((e) => t.resolve(e)).catch((e) => t.reject(e)));
                } catch (e) {
                  ((this.queuedValue = void 0), t.reject(e));
                }
              },
              t,
              this.controller.signal,
            ),
            this.resolvers.promise
          );
        }
      },
      _ = class {
        throttleQueue;
        queues = new Map();
        queuedQuerySync = (function () {
          let e = new Map();
          return {
            on(t, s) {
              let r = e.get(t) || [];
              return (r.push(s), e.set(t, r), () => this.off(t, s));
            },
            off(t, s) {
              let r = e.get(t);
              r &&
                e.set(
                  t,
                  r.filter((e) => e !== s),
                );
            },
            emit(t, s) {
              e.get(t)?.forEach((e) => e(s));
            },
          };
        })();
        constructor(e = new D()) {
          this.throttleQueue = e;
        }
        push(e, t, s, r) {
          if (!Number.isFinite(t)) return Promise.resolve((s.getSearchParamsSnapshot ?? R)());
          let i = e.key,
            n = this.queues.get(i);
          (n || (E(15, i), (n = new F()), this.queues.set(i, n)), E(17, e));
          let a = () => (
              this.throttleQueue.push(e),
              this.throttleQueue.flush(s, r).finally(() => {
                (this.queues.get(i)?.queuedValue === void 0 && (E(16, i), this.queues.delete(i)),
                  this.queuedQuerySync.emit(i));
              })
            ),
            o = n.push(e, t, a);
          return (this.queuedQuerySync.emit(i), o);
        }
        abort(e) {
          let t = this.queues.get(e);
          return t
            ? (E(18, e, t.queuedValue?.query),
              this.queues.delete(e),
              t.abort(),
              this.queuedQuerySync.emit(e),
              (e) => (e.then(t.resolvers.resolve, t.resolvers.reject), e))
            : (e) => e;
        }
        abortAll() {
          for (let [e, t] of this.queues.entries())
            (E(18, e, t.queuedValue?.query),
              t.abort(),
              t.resolvers.resolve(new URLSearchParams()),
              this.queuedQuerySync.emit(e));
          this.queues.clear();
        }
        getQueuedQuery(e) {
          let t = this.queues.get(e)?.queuedValue?.query;
          return void 0 !== t ? t : this.throttleQueue.getQueuedQuery(e);
        }
      };
    let N = P('debounce-controller', () => new _(k)),
      L = P('queue-reset', () => ({ mutex: 0 }));
    function U(e = 1) {
      L.mutex = e;
    }
    function K() {
      (E(19), N.abortAll(), k.abort().forEach((e) => N.queuedQuerySync.emit(e)));
    }
    var B = e.i(80360);
    function V() {
      (U(0), K());
    }
    function I() {
      let e = (0, B.usePathname)(),
        t = (0, C.useRef)(e);
      return (
        t.current !== e && ((t.current = e), k.reset()),
        (0, C.useEffect)(
          () => (
            !(function () {
              var e;
              if (
                ((e = 'next/app'),
                'u' < typeof history ||
                  (history.nuqs?.version && '2.10.1' !== history.nuqs.version
                    ? (console.error(M(409), history.nuqs.version, O, e), !0)
                    : !!history.nuqs?.adapters?.includes(e)))
              )
                return;
              let t = history.replaceState,
                s = history.pushState;
              ((history.replaceState = function (e, s, r) {
                return t.call(history, e, '__nuqs__' === s ? '' : s, r);
              }),
                (history.pushState = function (e, t, r) {
                  return (
                    '__nuqs__' !== t &&
                      (function (e = K) {
                        ((L.mutex = Math.max(0, L.mutex - 1)), L.mutex > 0 || e());
                      })(() => {
                        queueMicrotask(K);
                      }),
                    s.call(history, e, '__nuqs__' === t ? '' : t, r)
                  );
                }),
                (history.nuqs = history.nuqs ?? { version: '2.10.1', adapters: [] }),
                history.nuqs.adapters.push('next/app'));
            })(),
            window.addEventListener('popstate', V),
            () => window.removeEventListener('popstate', V)
          ),
          [],
        ),
        null
      );
    }
    let H =
      ((i = function () {
        let e = (0, B.useRouter)(),
          t = (0, B.usePathname)(),
          [s, r] = (0, C.useOptimistic)((0, B.useSearchParams)() ?? new URLSearchParams());
        return {
          searchParams: s,
          pathname: t,
          updateUrl: (0, C.useCallback)((t, s) => {
            (0, C.startTransition)(() => {
              s.shallow || r(t);
              let i = (function (e) {
                let { origin: t, pathname: s, hash: r } = location;
                return (
                  t +
                  s +
                  (function (e) {
                    if (0 === e.size) return '';
                    let t = [];
                    for (let [s, r] of e.entries()) {
                      let e = s
                        .replace(/#/g, '%23')
                        .replace(/&/g, '%26')
                        .replace(/\+/g, '%2B')
                        .replace(/=/g, '%3D')
                        .replace(/\?/g, '%3F');
                      t.push(
                        `${e}=${r
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
                          .replace(/[\x00-\x1F]/g, (e) => encodeURIComponent(e))}`,
                      );
                    }
                    return '?' + t.join('&');
                  })(e) +
                  r
                );
              })(t);
              E(20, 'next/app', i);
              let n = 'push' === s.history ? history.pushState : history.replaceState;
              (U(0),
                n.call(history, null, '__nuqs__', i),
                s.scroll && window.scrollTo(0, 0),
                s.shallow || e.replace(i, { scroll: !1 }));
            });
          }, []),
          rateLimitFactor: 3,
          autoResetQueueOnUpdate: !1,
        };
      }),
      ({ children: e, defaultOptions: t, processUrlSearchParams: s, ...r }) =>
        (0, C.createElement)(
          S.Provider,
          { ...r, value: { useAdapter: i, defaultOptions: t, processUrlSearchParams: s } },
          e,
        ));
    function G({ children: e, ...t }) {
      return (0, C.createElement)(H, {
        ...t,
        children: [
          (0, C.createElement)(C.Suspense, {
            key: 'nuqs-adapter-suspense-navspy',
            children: (0, C.createElement)(I),
          }),
          e,
        ],
      });
    }
    var $ = C,
      J = e.i(36023);
    class z extends $.Component {
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
              ((e) =>
                (0, n.jsxs)('div', {
                  className:
                    'flex min-h-64 flex-col items-center justify-center gap-4 p-8 text-center',
                  role: 'alert',
                  children: [
                    (0, n.jsxs)('div', {
                      children: [
                        (0, n.jsx)('h2', {
                          className: 'text-lg font-semibold',
                          children: 'Fitur tidak dapat dimuat',
                        }),
                        (0, n.jsx)('p', {
                          className: 'mt-1 text-sm text-muted-foreground',
                          children: 'Terjadi masalah pada bagian ini. Coba muat ulang fitur.',
                        }),
                      ],
                    }),
                    (0, n.jsx)(J.Button, { type: 'button', onClick: e, children: 'Coba lagi' }),
                  ],
                }))
            )(this.reset)
          : this.props.children;
      }
    }
    let W = (0, e.i(32155).default)('CloudOff', [
      ['path', { d: 'm2 2 20 20', key: '1ooewy' }],
      ['path', { d: 'M5.782 5.782A7 7 0 0 0 9 19h8.5a4.5 4.5 0 0 0 1.307-.193', key: 'yfwify' }],
      [
        'path',
        { d: 'M21.532 16.5A4.5 4.5 0 0 0 17.5 10h-1.79A7.008 7.008 0 0 0 10 5.07', key: 'jlfiyv' },
      ],
    ]);
    function X() {
      return !(function () {
        let [e, t] = (0, C.useState)(!0);
        return (
          (0, C.useEffect)(() => {
            let e = () => t(window.navigator.onLine);
            return (
              e(),
              window.addEventListener('online', e),
              window.addEventListener('offline', e),
              () => {
                (window.removeEventListener('online', e), window.removeEventListener('offline', e));
              }
            );
          }, []),
          e
        );
      })()
        ? (0, n.jsxs)('div', {
            className:
              'flex min-h-10 items-center justify-center gap-2 bg-amber-500 px-4 py-2 text-sm font-medium text-white',
            role: 'status',
            'aria-live': 'polite',
            children: [
              (0, n.jsx)(W, { className: 'h-4 w-4 shrink-0', 'aria-hidden': 'true' }),
              (0, n.jsx)('span', {
                children: 'Anda sedang offline. Perubahan belum dapat disinkronkan.',
              }),
            ],
          })
        : null;
    }
    function Y({ children: e }) {
      return (0, n.jsxs)(z, { children: [(0, n.jsx)(X, {}), e] });
    }
    let Z = new Set([408, 425, 429, 500, 502, 503, 504]);
    function ee(e, t) {
      if (e >= 1) return !1;
      let s = (function (e) {
        if ('object' != typeof e || null === e || !('status' in e)) return;
        let t = e.status;
        return 'number' == typeof t ? t : void 0;
      })(t);
      return void 0 !== s ? Z.has(s) : e < 1;
    }
    e.s(
      [
        'Providers',
        0,
        function ({ children: e }) {
          let [t] = (0, C.useState)(
            () =>
              new b({
                defaultOptions: {
                  queries: { staleTime: 3e4, refetchOnWindowFocus: !1, retry: ee },
                },
              }),
          );
          return (0, n.jsx)(w.QueryClientProvider, {
            client: t,
            children: (0, n.jsx)(q.ThemeProvider, {
              attribute: 'data-theme',
              defaultTheme: 'system',
              enableSystem: !0,
              storageKey: 'dashboard-theme',
              children: (0, n.jsx)(G, { children: (0, n.jsx)(Y, { children: e }) }),
            }),
          });
        },
      ],
      6040,
    );
  },
  38787,
  (e) => {
    'use strict';
    var t = e.i(24830),
      s = e.i(18071),
      r = e.i(85092);
    e.s([
      'Toaster',
      0,
      ({ ...e }) => {
        let { theme: i = 'system' } = (0, s.useTheme)();
        return (0, t.jsx)(r.Toaster, {
          theme: i,
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
          ...e,
        });
      },
    ]);
  },
  86158,
  (e) => {
    'use strict';
    var t = e.i(24830),
      s = e.i(39380);
    function r({ type: e, onMetric: t, isFinal: i }) {
      return (
        (0, s.useEffect)(() => {
          if ('u' < typeof PerformanceObserver) return;
          let s = new PerformanceObserver((s) => {
            let r = s.getEntries(),
              n = r.find((e) => i?.(e) ?? !0);
            if (n) {
              if ('layout-shift' === e)
                return void t({
                  name: 'CLS',
                  value: r.reduce((e, t) => (t.hadRecentInput ? e : e + t.value), 0),
                  id: 'layout-shift',
                  navigationType: 'navigate',
                });
              t({ name: 'LCP', value: n.startTime, id: n.toString(), navigationType: 'navigate' });
            }
          });
          return (s.observe({ type: e, buffered: !0 }), () => s.disconnect());
        }, [i, t, e]),
        null
      );
    }
    e.s(
      [
        'WebVitalsReporter',
        0,
        function () {
          (0, s.useEffect)(() => {
            let e,
              t = new PerformanceObserver((s) => {
                let r = s.getEntries().findLast((e) => 'first-contentful-paint' === e.name);
                r &&
                  ((e = {
                    name: 'FCP',
                    value: r.startTime,
                    id: r.name,
                    navigationType: 'navigate',
                  }),
                  t.disconnect());
              });
            return (
              t.observe({ type: 'paint', buffered: !0 }),
              () => {
                var s, r;
                (t.disconnect(),
                  e &&
                    ((s = e),
                    'sendBeacon' in navigator
                      ? ((r = s),
                        navigator.sendBeacon.bind(navigator)(
                          '/api/web-vitals',
                          new Blob([JSON.stringify(r)], { type: 'application/json' }),
                        ))
                      : fetch('/api/web-vitals', {
                          method: 'POST',
                          body: JSON.stringify(s),
                          headers: { 'content-type': 'application/json' },
                          keepalive: !0,
                        })));
              }
            );
          }, []);
          let e = (e) => (t) => {
            ('CLS' !== e || 0 !== t.value) &&
              fetch('/api/web-vitals', {
                method: 'POST',
                body: JSON.stringify(t),
                headers: { 'content-type': 'application/json' },
                keepalive: !0,
              });
          };
          return (0, t.jsxs)(t.Fragment, {
            children: [
              (0, t.jsx)(r, { type: 'largest-contentful-paint', onMetric: e('LCP') }),
              (0, t.jsx)(r, { type: 'layout-shift', onMetric: e('CLS') }),
            ],
          });
        },
      ],
      86158,
    );
  },
]);
