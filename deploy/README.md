# Docker — Michishirube

Panduan menjalankan Michishirube dengan Docker Compose.

---

## Port Map (Uncommon Ports)

Semua port digeser ke range **73xx** untuk menghindari konflik dengan tools development umum (Next.js di 3000, Redis lokal di 6379, dll).

### Gateway

| Service  | Container |     Host | Deskripsi                    |
| -------- | --------: | -------: | ---------------------------- |
| HTTP API |      7300 | **7300** | Endpoint utama gateway       |
| Debugger |      9229 | **7329** | Node.js inspector (dev only) |
| Metrics  |      9464 | **7301** | Prometheus exporter          |

### Redis

| Service         | Container |     Host | Deskripsi                                    |
| --------------- | --------: | -------: | -------------------------------------------- |
| Redis           |      6379 | **7380** | State store (rate limit, idempotency, cache) |
| Redis Commander |      8081 | **7381** | Web UI untuk inspeksi Redis (dev only)       |

### PgBouncer & PostgreSQL

| Service    | Container |     Host | Deskripsi                          |
| ---------- | --------: | -------: | ---------------------------------- |
| PgBouncer  |      5432 | **7382** | Connection pooler (untuk upstream) |
| PostgreSQL |      5432 | **7383** | Database (untuk upstream)          |

### Observability

| Service    | Container |     Host | Deskripsi                   |
| ---------- | --------: | -------: | --------------------------- |
| Prometheus |      9090 | **7390** | Metrics collection & query  |
| Grafana    |      3000 | **7391** | Dashboard visualisasi       |
| Jaeger UI  |     16686 | **7392** | Tracing UI                  |
| OTel gRPC  |      4317 | **7317** | OpenTelemetry gRPC receiver |
| OTel HTTP  |      4318 | **7318** | OpenTelemetry HTTP receiver |

---

## Quick Start

### 1. Setup

```bash
cd deploy
cp .env.docker.example .env.docker
```

Edit `.env.docker` jika perlu (misal ganti password).

### 2. Development

```bash
# Dari root project
pnpm dev:up

# Atau manual
cd deploy
docker compose --env-file .env.docker \
  -f docker-compose.yml \
  -f docker-compose.dev.yml up -d
```

**Yang akan jalan:**

- Gateway (dev mode, hot reload) di http://localhost:**7300**
- Redis di localhost:**7380**
- Redis Commander di http://localhost:**7381**

**Verifikasi:**

```bash
curl http://localhost:7300/health/live
# -> {"status":"ok","timestamp":"..."}

# Buka Redis Commander
xdg-open http://localhost:7381  # Linux
open http://localhost:7381       # macOS
```

### 3. Development + Monitoring

```bash
cd deploy
docker compose --env-file .env.docker \
  -f docker-compose.yml \
  -f docker-compose.dev.yml \
  --profile monitoring up -d
```

Tambahan yang jalan:

- Prometheus di http://localhost:**7390**
- Grafana di http://localhost:**7391** (admin / lihat `GRAFANA_PASSWORD`)

### 4. Development + Full Stack (Monitoring + Tracing + DB)

```bash
cd deploy
docker compose --env-file .env.docker \
  -f docker-compose.yml \
  -f docker-compose.dev.yml \
  --profile monitoring \
  --profile tracing \
  --profile pg up -d
```

Semua service jalan termasuk PostgreSQL, PgBouncer, dan Jaeger.

### 5. Staging

```bash
cd deploy
docker compose --env-file .env.docker \
  -f docker-compose.yml \
  -f docker-compose.staging.yml \
  --profile monitoring up -d
```

### 6. Production

```bash
cd deploy
export GATEWAY_TAG=v1.0.0
docker compose --env-file .env.docker \
  -f docker-compose.yml \
  -f docker-compose.prod.yml \
  --profile monitoring up -d
```

**Karakteristik production:**

- 3 replica gateway (rolling update, zero-downtime)
- Port gateway hanya bind ke `127.0.0.1` (di belakang Nginx)
- Read-only filesystem + cap_drop ALL
- Redis tidak expose ke host
- Log rotation ketat

---

## Stop

```bash
# Stop semua (data tetap)
pnpm dev:down

# Stop + hapus volume (reset total)
cd deploy
docker compose --env-file .env.docker \
  -f docker-compose.yml \
  -f docker-compose.dev.yml down -v
```

---

## Common Commands

```bash
# Lihat status
docker compose --env-file deploy/.env.docker \
  -f deploy/docker-compose.yml \
  -f deploy/docker-compose.dev.yml ps

# Lihat log
docker compose ... logs -f gateway
docker compose ... logs -f redis

# Masuk ke container
docker compose ... exec gateway sh
docker compose ... exec redis sh

# Restart satu service
docker compose ... restart gateway

# Rebuild gateway
docker compose ... build --no-cache gateway
docker compose ... up -d gateway
```

---

## Struktur File

```
deploy/
  docker-compose.yml              # Base (shared config)
  docker-compose.dev.yml          # Dev override (hot reload)
  docker-compose.staging.yml      # Staging override
  docker-compose.prod.yml         # Prod override (hardened)
  .env.docker.example             # Template env docker
  .dockerignore                   # File yang di-skip saat build
  Dockerfile                      # Multi-stage (base/deps/dev/build/staging/prod)
  README.md                       # Dokumen ini
  prometheus/
    prometheus.yml                # Konfigurasi scrape
  grafana/
    provisioning/
      datasources/
        prometheus.yml            # Auto-provision datasource
```

---

## Profiles

Service dikelompokkan dengan **profiles** agar tidak semua jalan sekaligus:

| Profile      | Service                 | Kapan Dipakai           |
| ------------ | ----------------------- | ----------------------- |
| (default)    | `gateway`, `redis`      | Selalu jalan            |
| `monitoring` | `prometheus`, `grafana` | Butuh metrics/dashboard |
| `tracing`    | `jaeger`                | Butuh tracing           |
| `pg`         | `postgres`, `pgbouncer` | Butuh DB untuk upstream |

Aktifkan dengan `--profile <nama>`. Bisa gabung: `--profile monitoring --profile tracing`.

---

## Environment Variables

Semua variable ada di `.env.docker`. Copy dari `.env.docker.example`.

**Wajib di-set sebelum production:**

| Variable            | Deskripsi                    |
| ------------------- | ---------------------------- |
| `GATEWAY_TAG`       | Tag image (mis. `v1.0.0`)    |
| `REDIS_PASSWORD`    | Password Redis (min 32 char) |
| `POSTGRES_PASSWORD` | Password PostgreSQL          |
| `GRAFANA_PASSWORD`  | Password admin Grafana       |

**Port (opsional, ada default):**
Semua port di tabel atas bisa di-override via `.env.docker` jika range 73xx bentrok.

---

## URL Akses Cepat

| Service         | URL                                |
| --------------- | ---------------------------------- |
| Gateway API     | http://localhost:7300              |
| Health Check    | http://localhost:7300/health/live  |
| Readiness       | http://localhost:7300/health/ready |
| Redis Commander | http://localhost:7381              |
| Prometheus      | http://localhost:7390              |
| Grafana         | http://localhost:7391              |
| Jaeger          | http://localhost:7392              |

---

## Troubleshooting

| Masalah                           | Solusi                                        |
| --------------------------------- | --------------------------------------------- |
| Port bentrok                      | Edit `.env.docker`, ganti port (mis. 7400)    |
| `permission denied` Docker socket | `sudo usermod -aG docker $USER`, logout/login |
| Gateway crash loop                | `docker compose ... logs gateway`             |
| Redis connection refused          | Cek `REDIS_PASSWORD` sama di gateway & redis  |
| Volume corrupt                    | `docker compose ... down -v` lalu up ulang    |
| Image terlalu besar               | Cek apakah pakai target `prod` (bukan `dev`)  |

---

## Cleanup

```bash
# Hapus container + network
docker compose ... down

# Hapus container + volume + network
docker compose ... down -v

# Hapus image dangling
docker image prune -f

# Hapus build cache > 7 hari
docker builder prune -f --filter "until=168h"

# Nuclear (hati-hati!)
docker system prune -a --volumes
```

---

## Resource Usage (Estimasi)

| Environment                      | Total RAM | Total Disk | Replica |
| -------------------------------- | --------: | ---------: | ------: |
| Dev (gateway + redis + redis-ui) |   ~600 MB |    ~400 MB |       1 |
| Dev + monitoring                 |   ~1.2 GB |    ~800 MB |       1 |
| Dev + full stack                 |   ~1.8 GB |    ~1.2 GB |       1 |
| Staging                          |   ~800 MB |    ~500 MB |       1 |
| Prod (3 replica + redis)         |   ~2.4 GB |    ~600 MB |       3 |

---

## Referensi

- [`docs/ARCHITECTURE.md`](../docs/ARCHITECTURE.md) — arsitektur sistem
- [`docs/RESILIENCE.md`](../docs/RESILIENCE.md) — resilience & SPOF
- [`deploy/Dockerfile`](Dockerfile) — multi-stage build
