# syntax=docker/dockerfile:1.7

# ─────────────────────────────────────────────────────
# Stage: base — Node + pnpm, shared
# ─────────────────────────────────────────────────────
FROM node:24-alpine AS base
RUN corepack enable && apk add --no-cache tini
WORKDIR /app
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH

# ─────────────────────────────────────────────────────
# Stage: deps — install semua dependency (incl. dev)
# ─────────────────────────────────────────────────────
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile

# ─────────────────────────────────────────────────────
# Stage: dev — untuk development (hot reload)
# ─────────────────────────────────────────────────────
FROM base AS dev
ENV NODE_ENV=development
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 3000 9229
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["pnpm", "start:dev"]

# ─────────────────────────────────────────────────────
# Stage: build — compile TypeScript
# ─────────────────────────────────────────────────────
FROM deps AS build
COPY . .
RUN pnpm build && pnpm prune --prod

# ─────────────────────────────────────────────────────
# Stage: staging — production-like, ada tooling debug
# ─────────────────────────────────────────────────────
FROM base AS staging
ENV NODE_ENV=staging
ENV LOG_LEVEL=debug

RUN addgroup -S app && adduser -S app -G app

COPY --from=build --chown=app:app /app/node_modules ./node_modules
COPY --from=build --chown=app:app /app/dist ./dist
COPY --from=build --chown=app:app /app/package.json ./

USER app
EXPOSE 3000
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "dist/main.js"]

# ─────────────────────────────────────────────────────
# Stage: prod — minimal, secure, no shell extras
# ─────────────────────────────────────────────────────
FROM node:24-alpine AS prod
ENV NODE_ENV=production
ENV LOG_LEVEL=info

RUN apk add --no-cache tini && \
    addgroup -S app && adduser -S app -G app

WORKDIR /app

COPY --from=build --chown=app:app /app/node_modules ./node_modules
COPY --from=build --chown=app:app /app/dist ./dist
COPY --from=build --chown=app:app /app/package.json ./

USER app
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/health/live || exit 1

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "dist/main.js"]