<div align="center">

# 🛣️ Michishirube

### 道しるべ — The Guidepost

_A NestJS API Gateway that guides every request to its destination._

[![NestJS](https://img.shields.io/badge/NestJS-12-E0234E?style=flat-square&logo=nestjs&logoColor=white)](https://nestjs.com)
[![Node](https://img.shields.io/badge/Node-24-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Fastify](https://img.shields.io/badge/Fastify-5-000000?style=flat-square&logo=fastify&logoColor=white)](https://fastify.dev)
[![Redis](https://img.shields.io/badge/Redis-7-DC382D?style=flat-square&logo=redis&logoColor=white)](https://redis.io)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)

[Overview](#-overview) •
[Features](#-features) •
[Architecture](#-architecture) •
[Quick Start](#-quick-start) •
[Documentation](#-documentation) •
[Contributing](#-contributing)

</div>

---

## 🗾 Overview

**Michishirube** (道しるべ) is a traditional Japanese **guidepost** — a signpost
that shows travelers the right path at every crossroad.

Just like its namesake, Michishirube acts as the **single entry point** for your
microservices: it receives every incoming request, verifies the traveler, and
guides them to the correct destination — safely, quickly, and reliably.

> **Petunjuk arah untuk setiap request Anda.**

**Built for:**

- 🏢 Multi-tenant SaaS platforms
- 🧩 Microservices architectures
- 🔐 Zero-trust internal networks
- 📈 High-traffic production systems

---

## ✨ Features

<table>
<tr>
<td width="50%" valign="top">

### 🛡️ Security

- **JWT Authentication** — RS256/ES256 via JWKS with key rotation
- **API Key** — hashed, scoped, revocable
- **RBAC** — role + scope per tenant
- **Header Sanitization** — cegah header injection
- **mTLS** — untuk komunikasi internal
- **Security Headers** — CORS, CSP, HSTS

</td>
<td width="50%" valign="top">

### ⚡ Performance

- **Dynamic Routing** — HTTP & gRPC
- **Distributed Rate Limit** — Redis sliding window (atomic Lua)
- **Idempotency Guard** — cegah duplikasi transaksi
- **Circuit Breaker** — isolasi kegagalan upstream
- **Response Caching** — kurangi beban upstream
- **Bulkhead** — batasi concurrency

</td>
</tr>
<tr>
<td width="50%" valign="top">

### 🔀 Multi-Tenant

- **Tenant Resolution** — JWT claim → subdomain → header
- **Full Isolation** — cache, rate limit, log per tenant
- **Tier-based Quota** — free / pro / enterprise
- **Scoped Policies** — per tenant, per route

</td>
<td width="50%" valign="top">

### 📊 Observability

- **Structured Logging** — Pino + correlation ID
- **Metrics** — Prometheus (`prom-client`)
- **Tracing** — OpenTelemetry + W3C context
- **Health Checks** — `/health/live`, `/health/ready`
- **Audit Trail** — setiap akses tercatat

</td>
</tr>
</table>

### 🎯 Error Handling

- **RFC 7807** compliant — `application/problem+json`
- **Stable error codes** — `GW_<DOMAIN>_<REASON>`
- **Fail-open / fail-closed** — sesuai konteks
- **Zero internal leak** — tidak bocorkan stack trace

---

## 🏗️ Architecture

```
                    ┌─────────────────────────┐
                    │   Cloudflare (WAF/CDN)  │
                    └────────────┬────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │  Nginx (TLS Termination)│
                    └────────────┬────────────┘
                                 │
              ┌──────────────────┼──────────────────┐
              ▼                  ▼                  ▼
        ┌──────────┐       ┌──────────┐       ┌──────────┐
        │ Gateway  │       │ Gateway  │       │ Gateway  │
        │  Pod 1   │       │  Pod 2   │       │  Pod N   │
        └────┬─────┘       └────┬─────┘       └────┬─────┘
             └──────────────────┼──────────────────┘
                                ▼
                        ┌───────────────┐
                        │ Redis Sentinel│
                        └───────┬───────┘
                                │
              ┌─────────────────┼─────────────────┐
              ▼                 ▼                 ▼
         [Auth Svc]       [Order Svc]       [Billing Svc]
              │                 │                 │
              └─────────────────┼─────────────────┘
                                ▼
                        [PgBouncer → PostgreSQL HA]
```

**Architectural style:** Hexagonal (Ports & Adapters) + Modular Monolith.

**Key principles:**

- 📦 **Stateless** — scale horizontal bebas
- 🔒 **No DB access** — state hanya Redis + YAML
- 🛡️ **Fail-fast & fail-safe** — timeout, retry, circuit breaker
- 🔍 **Observable by default** — log, metric, trace per request
- 🧩 **Replaceable** — adapter bisa ditukar tanpa ubah core

📖 Detail lengkap: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) & [`docs/RESILIENCE.md`](docs/RESILIENCE.md)

---

## 🛠️ Tech Stack

| Layer          | Teknologi               | Alasan                 |
| -------------- | ----------------------- | ---------------------- |
| **Runtime**    | Node.js 24 LTS          | Active LTS, ESM native |
| **Bahasa**     | TypeScript 5.6 (strict) | Type safety            |
| **Framework**  | NestJS 12 + Fastify 5   | Modular + performa     |
| **State**      | Redis 7 + ioredis       | Atomic, distributed    |
| **Auth**       | jose                    | Modern, JWKS support   |
| **Resilience** | cockatiel               | Ringan, policy-based   |
| **Validasi**   | Zod                     | Standard Schema        |
| **Logging**    | Pino                    | Tercepat, JSON native  |
| **Metrics**    | prom-client             | Standar Prometheus     |
| **Tracing**    | OpenTelemetry           | Vendor-neutral         |
| **Test**       | Vitest + supertest      | Cepat, ESM-friendly    |
| **Lint**       | oxlint + Prettier       | 10-20x lebih cepat     |
| **Boundary**   | dependency-cruiser      | Tegakkan Hexagonal     |

📖 Detail lengkap: [`docs/TECHSTACK.md`](docs/TECHSTACK.md)

---

## 🚀 Quick Start

### Prasyarat

| Tool           | Versi                |
| -------------- | -------------------- |
| Node.js        | ≥ 20.19 / 22.12 / 24 |
| pnpm           | ≥ 9                  |
| Docker         | ≥ 24                 |
| Docker Compose | ≥ 2.20               |

### Setup

```bash
# 1. Clone
git clone https://github.com/<org>/michishirube.git
cd michishirube

# 2. Install
pnpm install

# 3. Setup env
cp .env.example .env.development

# 4. Setup git hooks
npx lefthook install

# 5. Nyalakan Redis
pnpm dev:up

# 6. Jalankan gateway
pnpm start:dev
```

Gateway berjalan di **`http://localhost:3000`**.

### Verifikasi

```bash
# Liveness
curl http://localhost:3000/health/live
# → {"status":"ok","timestamp":"2026-09-21T..."}

# Readiness (cek Redis)
curl http://localhost:3000/health/ready
# → {"status":"ok","info":{"redis":{"status":"up"}}}

# Request ID header
curl -i http://localhost:3000/health/live | grep -i x-request-id
```

### Selesai?

```bash
# Stop gateway: Ctrl+C
pnpm dev:down
```

---

## 📁 Project Structure

```
michishirube/
├── docs/                          # Dokumentasi
│   ├── PRD.md                     #   Product Requirements
│   ├── ARCHITECTURE.md            #   Arsitektur sistem
│   ├── STRUCTURE.md               #   Struktur folder
│   ├── TECHSTACK.md               #   Tech stack
│   ├── RESILIENCE.md              #   Race condition, SPOF
│   └── ADR/                       #   Architecture Decision Records
│
├── src/
│   ├── config/                    # Konfigurasi & validasi env
│   ├── core/                      # Domain inti (Hexagonal core)
│   │   ├── auth/                  #   Autentikasi & otorisasi
│   │   ├── tenant/                #   Resolusi tenant
│   │   ├── routing/               #   Resolusi route
│   │   ├── rate-limit/            #   Kuota & throttling
│   │   ├── idempotency/           #   Cegah duplikasi
│   │   └── circuit-breaker/       #   Isolasi kegagalan
│   ├── infrastructure/            # Adapter (Redis, JWT, HTTP)
│   ├── modules/                   # Entry point HTTP
│   │   ├── proxy/                 #   Proxy controller
│   │   ├── health/                #   Health check
│   │   ├── metrics/               #   Prometheus exporter
│   │   └── admin/                 #   Admin API
│   ├── guards/                    # Auth, RBAC, Rate limit
│   ├── interceptors/              # Logging, Idempotency, Metrics
│   ├── middleware/                # Request ID, Tenant context
│   ├── shared/                    # Utility, Error, Decorator
│   ├── app.module.ts              # Root module
│   └── main.ts                    # Bootstrap
│
├── test/
│   ├── unit/                      # Unit test
│   ├── functional/                # Functional test
│   ├── security/                  # Security test
│   └── e2e/                       # End-to-end test
│
├── deploy/                        # Dockerfile, Compose, K8s
├── config/                        # Route & tenant config (YAML)
├── scripts/                       # Helper scripts
│
├── AGENTS.md                      # Aturan untuk AI agent
├── RULES.md                       # Aturan clean code & error
├── CONTRIBUTING.md                # Panduan kontribusi
└── README.md
```

📖 Detail lengkap: [`docs/STRUCTURE.md`](docs/STRUCTURE.md)

---

## 📜 Scripts

| Command                | Deskripsi                  |
| ---------------------- | -------------------------- |
| `pnpm start:dev`       | Development (hot reload)   |
| `pnpm start:debug`     | Development + debugger     |
| `pnpm start:prod`      | Production                 |
| `pnpm build`           | Compile TypeScript         |
| **Quality**            |                            |
| `pnpm typecheck`       | TypeScript check           |
| `pnpm lint`            | Lint (oxlint)              |
| `pnpm format`          | Format (prettier)          |
| `pnpm deps:check`      | Boundary check (Hexagonal) |
| **Testing**            |                            |
| `pnpm test`            | Semua test                 |
| `pnpm test:unit`       | Unit test                  |
| `pnpm test:functional` | Functional test            |
| `pnpm test:security`   | Security test              |
| `pnpm test:cov`        | Coverage report            |
| **Development**        |                            |
| `pnpm dev:up`          | Nyalakan Redis             |
| `pnpm dev:down`        | Matikan Redis              |
| `pnpm dev:reset`       | Reset Redis                |
| `pnpm checkpoint`      | Laporan kesehatan project  |

---

## 📚 Documentation

<table>
<tr>
<td width="50%" valign="top">

### 📘 Core Docs

- [`PRD.md`](docs/PRD.md) — Product Requirements
- [`ARCHITECTURE.md`](docs/ARCHITECTURE.md) — Arsitektur sistem
- [`STRUCTURE.md`](docs/STRUCTURE.md) — Struktur & rules
- [`TECHSTACK.md`](docs/TECHSTACK.md) — Tech stack
- [`RESILIENCE.md`](docs/RESILIENCE.md) — Resilience & SPOF

</td>
<td width="50%" valign="top">

### 🧭 Governance

- [`AGENTS.md`](AGENTS.md) — Aturan untuk AI agent
- [`RULES.md`](RULES.md) — Clean code & error handling
- [`CONTRIBUTING.md`](CONTRIBUTING.md) — Panduan kontribusi
- [`docs/ADR/`](docs/ADR/) — Architecture Decision Records
- [`LICENSE`](LICENSE) — MIT License

</td>
</tr>
</table>

---

## 🧪 Testing

| Kategori   | Lokasi                            | Coverage Target |
| ---------- | --------------------------------- | --------------- |
| Unit       | `test/unit/`, `src/**/__tests__/` | ≥ 90% (`core/`) |
| Functional | `test/functional/`                | ≥ 70%           |
| Security   | `test/security/`                  | 100% (kritis)   |
| E2E        | `test/e2e/`                       | ≥ 70%           |

```bash
pnpm test              # semua
pnpm test:cov          # dengan coverage
pnpm test:unit         # unit saja
pnpm test:security     # security saja
```

**Chaos testing** — verifikasi klaim resilience:

- Kill 1 pod → 0 downtime
- Kill Redis master → auto failover < 5s
- Concurrent idempotency → 1 success, 99 conflict

📖 Detail: [`docs/RESILIENCE.md`](docs/RESILIENCE.md)

---

## 🐳 Docker

Multi-stage build dengan 4 target: `base`, `deps`, `dev`, `build`, `staging`, `prod`.

```bash
# Development (hot reload + Redis UI)
docker compose -f deploy/docker-compose.yml \
               -f deploy/docker-compose.dev.yml up

# Staging (production-like + debug)
docker compose -f deploy/docker-compose.yml \
               -f deploy/docker-compose.staging.yml up

# Production (3 replica + monitoring)
GATEWAY_TAG=v1.0.0 \
docker compose -f deploy/docker-compose.yml \
               -f deploy/docker-compose.prod.yml up -d
```

| Environment | Ukuran Image | Replica |
| ----------- | -----------: | ------: |
| dev         |      ~350 MB |       1 |
| staging     |      ~180 MB |       1 |
| **prod**    |   **~70 MB** |  **3+** |

---

## 🔐 Environment

Semua variabel divalidasi dengan **Zod** saat startup.
Jika invalid, aplikasi **gagal start** dengan pesan jelas.

| File               | Commit? | Isi                           |
| ------------------ | ------- | ----------------------------- |
| `.env.example`     | ✅      | Template                      |
| `.env.development` | ❌      | Config lokal                  |
| `.env.test`        | ✅      | Config test (aman)            |
| `.env.production`  | ❌      | Referensi (inject via secret) |

**Production guard:** `validateEnv()` menolak production config jika:

- `REDIS_PASSWORD` kosong
- `JWKS_URI` bukan HTTPS
- `LOG_LEVEL=debug`

---

## 🚦 Roadmap

- [x] **Sprint 0** — Fondasi (config, error, health, logger)
- [ ] **Sprint 1** — Core Gateway (auth, RBAC, rate limit, routing)
- [ ] **Sprint 2** — Reliability (idempotency, circuit breaker, cache)
- [ ] **Sprint 3** — Observability (metrics, tracing, OpenAPI, admin API)
- [ ] **Sprint 4** — Advanced (gRPC, canary, multi-region)
- [ ] **Fase 5+** — API Management (portal, analytics, monetization)

---

## 🤝 Contributing

Kontribusi sangat diterima! Sebelum memulai:

1. Baca [`AGENTS.md`](AGENTS.md) dan [`RULES.md`](RULES.md)
2. Baca [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
3. Buat branch: `feat/<nama>`, `fix/<nama>`, atau `chore/<nama>`
4. Commit dengan **Conventional Commits**
5. Pastikan lulus:
   ```bash
   pnpm typecheck && pnpm lint && pnpm test && pnpm deps:check
   ```

📖 Detail lengkap: [`CONTRIBUTING.md`](CONTRIBUTING.md)

---

## 📄 License

MIT — lihat [`LICENSE`](LICENSE).

---

<div align="center">

### 道しるべ

_Menuntun setiap request ke tujuan yang tepat._

**Made with ❤️ by Platform Engineering**

[⬆️ Back to top](#-michishirube)

</div>
