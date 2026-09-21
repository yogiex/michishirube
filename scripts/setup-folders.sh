#!/usr/bin/env bash
set -euo pipefail

mkdir -p src/{config,core,infrastructure,modules,guards,middleware,interceptors,shared}
mkdir -p src/core/{tenant,routing,auth,rbac,rate-limit,idempotency,circuit-breaker,cache}
mkdir -p src/core/rate-limit/{domain,application}
mkdir -p src/core/routing/{domain,application}
mkdir -p src/core/auth/{domain,application}
mkdir -p src/core/tenant/{domain,application}
mkdir -p src/infrastructure/{redis,jwt,http,observability,config-repository}
mkdir -p src/modules/{proxy,health,metrics}
mkdir -p src/shared/{pipes,decorators,utils,types}
mkdir -p docs/ADR deploy config scripts
echo "✅ Struktur folder siap"
