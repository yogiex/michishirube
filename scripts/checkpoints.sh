#!/usr/bin/env bash
# ─────────────────────────────────────────────────────
# checkpoint.sh — Status checkpoint project Michishirube
# Fokus: Sprint progress + kesiapan sprint berikutnya
# Output: checkpoint.txt
# ─────────────────────────────────────────────────────

set -uo pipefail

REPORT="checkpoint.txt"
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
PROJECT_NAME=$(basename "$PWD")

# ─── Warna ───────────────────────────────────────────
GREEN='\033[0;32m'; RED='\033[0;31m'; YELLOW='\033[1;33m'
BLUE='\033[0;34m'; CYAN='\033[0;36m'; NC='\033[0m'

# ─── Report init ─────────────────────────────────────
: > "$REPORT"

# ─── Output helpers — SEMUA masuk report ─────────────
log()    { echo -e "$1" | tee -a "$REPORT"; }
ok()     { echo -e "${GREEN}✅${NC} $1" | tee -a "$REPORT"; }
warn()   { echo -e "${YELLOW}⚠️ ${NC} $1" | tee -a "$REPORT"; }
fail()   { echo -e "${RED}❌${NC} $1" | tee -a "$REPORT"; }
info()   { echo -e "${BLUE}ℹ️ ${NC} $1" | tee -a "$REPORT"; }

log_section() {
  echo "" | tee -a "$REPORT"
  echo "═══════════════════════════════════════════════════" | tee -a "$REPORT"
  echo "  $1" | tee -a "$REPORT"
  echo "═══════════════════════════════════════════════════" | tee -a "$REPORT"
}

# ─── Helper: ambil versi tool, strip ANSI, fallback ──
get_version() {
  local cmd="$1"
  local output
  output=$(eval "$cmd" 2>/dev/null | head -1 || true)
  if [ -z "$output" ]; then
    echo "NOT FOUND"
  else
    echo "$output" | sed 's/\x1b\[[0-9;]*m//g'
  fi
}

# ─────────────────────────────────────────────────────
log_section "CHECKPOINT — $PROJECT_NAME"
log "Timestamp : $TIMESTAMP"
log "Directory : $PWD"
log "User      : $(whoami)"
log ""

# ─────────────────────────────────────────────────────
log_section "1. ENVIRONMENT"
# ─────────────────────────────────────────────────────
NODE_VER=$(get_version "node -v")
PNPM_VER=$(get_version "pnpm -v")
NPM_VER=$(get_version "npm -v")
DOCKER_VER=$(get_version "docker --version")
COMPOSE_VER=$(get_version "docker compose version")
COMPOSE_VER2=$(get_version "docker-compose --version")
REDIS_CLI_VER=$(get_version "redis-cli --version")
GIT_VER=$(get_version "git --version")

# Fallback compose
if [ "$COMPOSE_VER" = "NOT FOUND" ] && [ "$COMPOSE_VER2" != "NOT FOUND" ]; then
  COMPOSE_VER="$COMPOSE_VER2"
fi

log "[Runtime]"
log "  Node        : $NODE_VER"
log "  pnpm        : $PNPM_VER"
log "  npm         : $NPM_VER"
log "  Docker      : $DOCKER_VER"
log "  Compose     : $COMPOSE_VER"
log "  Redis CLI   : $REDIS_CLI_VER"
log "  Git         : $GIT_VER"
log ""

log "[Redis Connectivity]"
if [ "$REDIS_CLI_VER" != "NOT FOUND" ]; then
  REDIS_HOST="${REDIS_HOST:-localhost}"
  REDIS_PORT="${REDIS_PORT:-7380}"
  if redis-cli -h "$REDIS_HOST" -p "$REDIS_PORT" ping 2>/dev/null | grep -q PONG; then
    ok "Redis reachable di $REDIS_HOST:$REDIS_PORT"
    KEY_COUNT=$(redis-cli -h "$REDIS_HOST" -p "$REDIS_PORT" dbsize 2>/dev/null || echo "?")
    log "    DB size     : $KEY_COUNT keys"
    GW_KEYS=$(redis-cli -h "$REDIS_HOST" -p "$REDIS_PORT" --scan --pattern 'gw:*' 2>/dev/null | wc -l | tr -d ' ')
    log "    gw:* keys   : $GW_KEYS keys"
  else
    warn "Redis tidak reachable di $REDIS_HOST:$REDIS_PORT"
  fi
else
  warn "redis-cli tidak terinstall — skip Redis check"
fi
log ""

# ─────────────────────────────────────────────────────
log_section "2. GIT STATE"
# ─────────────────────────────────────────────────────
if [ -d .git ]; then
  log "  Branch      : $(git rev-parse --abbrev-ref HEAD 2>/dev/null)"
  log "  Commit      : $(git rev-parse --short HEAD 2>/dev/null)"
  log "  Message     : $(git log -1 --pretty=%s 2>/dev/null)"
  DIRTY=$(git status --porcelain 2>/dev/null | wc -l | tr -d ' ')
  log "  Uncommitted : $DIRTY file(s)"
  log ""
  log "[Last 5 Commits]"
  git log --oneline -5 2>/dev/null | while read -r line; do
    log "  $line"
  done
else
  warn "Bukan git repo"
fi
log ""

# ─────────────────────────────────────────────────────
log_section "3. DOKUMENTASI WAJIB"
# ─────────────────────────────────────────────────────
for file in \
  docs/PRD.md docs/ARCHITECTURE.md docs/STRUCTURE.md \
  docs/TECHSTACK.md docs/RESILIENCE.md \
  AGENTS.md RULES.md README.md CONTRIBUTING.md LICENSE; do
  if [ -f "$file" ]; then
    ok "$file"
  else
    fail "$file MISSING"
  fi
done
log ""
log "[ADR]"
if [ -d docs/ADR ]; then
  ADR_COUNT=$(find docs/ADR -maxdepth 1 -name '*.md' 2>/dev/null | wc -l | tr -d ' ')
  if [ "$ADR_COUNT" -eq 0 ]; then
    warn "docs/ADR/ kosong"
  else
    find docs/ADR -maxdepth 1 -name '*.md' 2>/dev/null | sort | while read -r f; do
      log "  - $(basename "$f")"
    done
  fi
else
  warn "docs/ADR/ tidak ada"
fi
log ""

# ─────────────────────────────────────────────────────
log_section "4. STRUKTUR FOLDER"
# ─────────────────────────────────────────────────────
log "[Top-Level]"
for dir in src apps docs test scripts config deploy; do
  if [ -d "$dir" ]; then
    ok "$dir/"
  else
    warn "$dir/ tidak ada"
  fi
done
log ""
log "[src/ Hexagonal]"
for dir in \
  src/config src/core src/infrastructure src/modules src/shared \
  src/guards src/middleware src/interceptors; do
  if [ -d "$dir" ]; then
    ok "$dir/"
  else
    fail "$dir/ MISSING"
  fi
done
log ""

# ─────────────────────────────────────────────────────
log_section "5. SPRINT PROGRESS — CORE MODULES"
# ─────────────────────────────────────────────────────
check_core_module() {
  local name="$1"
  local path="src/core/$name"

  if [ ! -d "$path" ]; then
    echo "MISSING|$name|0|0|0"
    return
  fi

  local d a t m
  d=$(find "$path/domain" -name '*.ts' -not -name '*.spec.ts' 2>/dev/null | wc -l | tr -d ' ')
  a=$(find "$path/application" -name '*.ts' -not -name '*.spec.ts' 2>/dev/null | wc -l | tr -d ' ')
  t=$(find "$path" -name '*.spec.ts' 2>/dev/null | wc -l | tr -d ' ')
  m=$(find "$path" -maxdepth 1 -name '*.module.ts' 2>/dev/null | wc -l | tr -d ' ')

  if [ "$d" -eq 0 ] && [ "$a" -eq 0 ] && [ "$m" -eq 0 ]; then
    echo "STUB|$name|$d|$a|$t"
  elif [ "$d" -gt 0 ] && [ "$a" -gt 0 ] && [ "$m" -gt 0 ]; then
    echo "DONE|$name|$d|$a|$t"
  else
    echo "PARTIAL|$name|$d|$a|$t"
  fi
}

print_module_status() {
  local result="$1"
  local status name d a t
  status=$(echo "$result" | cut -d'|' -f1)
  name=$(echo "$result" | cut -d'|' -f2)
  d=$(echo "$result" | cut -d'|' -f3)
  a=$(echo "$result" | cut -d'|' -f4)
  t=$(echo "$result" | cut -d'|' -f5)

  local icon color
  case "$status" in
    DONE)    icon="✅"; color="$GREEN" ;;
    PARTIAL) icon="⚠️ "; color="$YELLOW" ;;
    STUB)    icon="🟡"; color="$YELLOW" ;;
    MISSING) icon="❌"; color="$RED" ;;
    *)       icon="?";  color="$NC" ;;
  esac

  echo -e "${color}${icon} ${name} — domain:${d} app:${a} test:${t}${NC}" | tee -a "$REPORT"
}

log "Format: ICON | module | domain | app | tests"
log ""
log "[Sprint 1 — Core Gateway]"
for mod in tenant auth rbac rate-limit routing api-key audit; do
  print_module_status "$(check_core_module "$mod")"
done
log ""
log "[Sprint 2 — Reliability]"
for mod in idempotency circuit-breaker cache; do
  print_module_status "$(check_core_module "$mod")"
done
log ""

# ─────────────────────────────────────────────────────
log_section "6. INFRASTRUCTURE ADAPTER"
# ─────────────────────────────────────────────────────
for dir in redis jwt rbac rate-limit config-repository security observability http grpc; do
  if [ -d "src/infrastructure/$dir" ]; then
    FILE_COUNT=$(find "src/infrastructure/$dir" -name '*.ts' -not -name '*.spec.ts' 2>/dev/null | wc -l | tr -d ' ')
    if [ "$FILE_COUNT" -gt 0 ]; then
      ok "infrastructure/$dir/ ($FILE_COUNT file)"
    else
      warn "infrastructure/$dir/ (stub, 0 file)"
    fi
  else
    warn "infrastructure/$dir/ tidak ada"
  fi
done
log ""

# ─────────────────────────────────────────────────────
log_section "7. GUARDS, MIDDLEWARE, INTERCEPTORS"
# ─────────────────────────────────────────────────────
log "[Guards]"
GUARD_COUNT=0
if [ -d src/guards ]; then
  GUARD_COUNT=$(find src/guards -maxdepth 1 -name '*.guard.ts' 2>/dev/null | wc -l | tr -d ' ')
  if [ "$GUARD_COUNT" -gt 0 ]; then
    find src/guards -maxdepth 1 -name '*.guard.ts' 2>/dev/null | sort | while read -r f; do
      log "  ✅ $(basename "$f")"
    done
  fi
fi
log "  Total: $GUARD_COUNT guard"
log ""

log "[Middleware]"
MW_COUNT=0
if [ -d src/middleware ]; then
  MW_COUNT=$(find src/middleware -maxdepth 1 -name '*.middleware.ts' 2>/dev/null | wc -l | tr -d ' ')
  if [ "$MW_COUNT" -gt 0 ]; then
    find src/middleware -maxdepth 1 -name '*.middleware.ts' 2>/dev/null | sort | while read -r f; do
      log "  ✅ $(basename "$f")"
    done
  fi
fi
log "  Total: $MW_COUNT middleware"
log ""

log "[Interceptors]"
IC_COUNT=0
if [ -d src/interceptors ]; then
  IC_COUNT=$(find src/interceptors -maxdepth 1 -name '*.interceptor.ts' 2>/dev/null | wc -l | tr -d ' ')
  if [ "$IC_COUNT" -eq 0 ]; then
    warn "src/interceptors/ kosong — Sprint 2 (idempotency) butuh ini"
  else
    find src/interceptors -maxdepth 1 -name '*.interceptor.ts' 2>/dev/null | sort | while read -r f; do
      log "  ✅ $(basename "$f")"
    done
  fi
fi
log "  Total: $IC_COUNT interceptor"
log ""

# ─────────────────────────────────────────────────────
log_section "8. SHARED — ERROR & TYPES"
# ─────────────────────────────────────────────────────
log "[Error Framework]"
for file in \
  src/shared/errors/error-codes.ts \
  src/shared/errors/error-catalog.ts \
  src/shared/errors/domain-error.ts \
  src/shared/errors/gateway-error.ts \
  src/shared/errors/http-exception.filter.ts; do
  if [ -f "$file" ]; then
    ok "$file"
  else
    fail "$file MISSING"
  fi
done
log ""

if [ -f src/shared/errors/error-codes.ts ]; then
  CODE_COUNT=$(grep -oE 'GW_[A-Z_]+' src/shared/errors/error-codes.ts 2>/dev/null | sort -u | wc -l | tr -d ' ')
  log "  Total error codes : $CODE_COUNT"
fi
log ""

log "[Shared Types]"
for file in \
  src/shared/types/result.type.ts \
  src/shared/types/option.type.ts \
  src/shared/types/branded.type.ts \
  src/shared/types/repository.port.ts \
  src/shared/types/use-case.port.ts; do
  if [ -f "$file" ]; then
    ok "$file"
  else
    warn "$file tidak ada"
  fi
done
log ""

# ─────────────────────────────────────────────────────
log_section "9. TEST FILES"
# ─────────────────────────────────────────────────────
UNIT_TESTS=$(find src test -name '*.spec.ts' 2>/dev/null | wc -l | tr -d ' ')
SRC_FILES=$(find src -name '*.ts' -not -name '*.spec.ts' 2>/dev/null | wc -l | tr -d ' ')
log "  Source .ts (non-test) : $SRC_FILES"
log "  Test .spec.ts         : $UNIT_TESTS"
if [ "$SRC_FILES" -gt 0 ]; then
  RATIO=$((UNIT_TESTS * 100 / SRC_FILES))
  log "  Ratio test/source     : ${RATIO}%"
fi
log ""
log "[Test per folder]"
for dir in \
  src/core src/infrastructure src/modules \
  src/guards src/middleware src/shared \
  test/unit test/functional test/security test/e2e; do
  if [ -d "$dir" ]; then
    COUNT=$(find "$dir" -name '*.spec.ts' 2>/dev/null | wc -l | tr -d ' ')
    log "  $dir : $COUNT test file"
  fi
done
log ""

# ─────────────────────────────────────────────────────
log_section "10. QUALITY GATES"
# ─────────────────────────────────────────────────────

log "[Typecheck]"
if node -e "process.exit(require('./package.json').scripts.typecheck ? 0 : 1)" 2>/dev/null; then
  if pnpm typecheck >/tmp/tc.out 2>&1; then
    ok "TypeScript: 0 error"
  else
    fail "TypeScript: ada error"
    log "─── 20 baris pertama ───"
    head -20 /tmp/tc.out | tee -a "$REPORT"
  fi
else
  warn "Script 'typecheck' tidak ada"
fi
log ""

log "[Lint]"
if node -e "process.exit(require('./package.json').scripts.lint ? 0 : 1)" 2>/dev/null; then
  if pnpm lint >/tmp/lint.out 2>&1; then
    ok "Lint: 0 error"
  else
    fail "Lint: ada error"
    log "─── 20 baris pertama ───"
    head -20 /tmp/lint.out | tee -a "$REPORT"
  fi
else
  warn "Script 'lint' tidak ada"
fi
log ""

log "[Dependency Boundary]"
if [ -f .dependency-cruiser.cjs ]; then
  if pnpm deps:check >/tmp/deps.out 2>&1; then
    ok "Boundary: 0 violation"
  else
    fail "Boundary: ada violation"
    log "─── 20 baris pertama ───"
    head -20 /tmp/deps.out | tee -a "$REPORT"
  fi
else
  warn ".dependency-cruiser.cjs tidak ada"
fi
log ""

log "[Test]"
log "  (jalankan manual: pnpm test)"
[ -f vitest.config.ts ] && log "  vitest.config.ts     : ✅ ada"
[ -f vitest.config.e2e.ts ] && log "  vitest.config.e2e.ts : ✅ ada"
log ""

# ─────────────────────────────────────────────────────
log_section "11. SECURITY SCAN"
# ─────────────────────────────────────────────────────
log "[Hardcoded Secrets]"
SECRET_HITS=$(grep -rEn '(JWT_SECRET|REDIS_PASSWORD|API_KEY|PRIVATE_KEY)\s*=\s*["'"'"'][^"'"'"']{8,}' src/ 2>/dev/null | grep -v '.spec.ts' | grep -v 'process.env' || true)
if [ -z "$SECRET_HITS" ]; then
  ok "Tidak ada hardcoded secret di src/"
else
  fail "Potensi hardcoded secret:"
  echo "$SECRET_HITS" | head -10 | tee -a "$REPORT"
fi
log ""

log "[console.log]"
CONSOLE_HITS=$(grep -rn 'console\.log' src/ 2>/dev/null | grep -v '.spec.ts' || true)
if [ -z "$CONSOLE_HITS" ]; then
  ok "Tidak ada console.log di src/"
else
  CONSOLE_COUNT=$(printf '%s\n' "$CONSOLE_HITS" | wc -l | tr -d ' ')
  warn "$CONSOLE_COUNT console.log ditemukan"
  echo "$CONSOLE_HITS" | head -5 | tee -a "$REPORT"
fi
log ""

log "['any' usage]"
ANY_HITS=$(grep -rn ': any' src/ 2>/dev/null | grep -v '.spec.ts' || true)
if [ -z "$ANY_HITS" ]; then
  ok "Tidak ada 'any' di src/"
else
  ANY_COUNT=$(printf '%s\n' "$ANY_HITS" | wc -l | tr -d ' ')
  warn "$ANY_COUNT penggunaan 'any'"
  echo "$ANY_HITS" | head -5 | tee -a "$REPORT"
fi
log ""

# ─────────────────────────────────────────────────────
log_section "12. SPRINT 2.1 — IDEMPOTENCY READINESS"
# ─────────────────────────────────────────────────────
log "1. Folder core/idempotency/"
if [ -d src/core/idempotency ]; then
  SUBDIRS=$(find src/core/idempotency -mindepth 1 -maxdepth 1 -type d 2>/dev/null | wc -l | tr -d ' ')
  FILES=$(find src/core/idempotency -name '*.ts' 2>/dev/null | wc -l | tr -d ' ')
  if [ "$FILES" -eq 0 ]; then
    log "   🟡 folder ada, $SUBDIRS subfolder, 0 file (stub)"
  else
    log "   ✅ folder ada, $SUBDIRS subfolder, $FILES file"
  fi
else
  log "   ❌ folder tidak ada"
fi
log ""

log "2. Folder src/interceptors/"
if [ -d src/interceptors ]; then
  FILES=$(find src/interceptors -name '*.ts' 2>/dev/null | wc -l | tr -d ' ')
  if [ "$FILES" -eq 0 ]; then
    log "   🟡 kosong (siap diisi)"
  else
    log "   ✅ $FILES file"
  fi
else
  log "   ❌ folder tidak ada"
fi
log ""

log "3. Error codes Idempotency"
for code in GW_IDEMP_INVALID_KEY GW_IDEMP_IN_PROGRESS GW_IDEMP_CONFLICT GW_IDEMP_STORE_UNAVAILABLE; do
  if grep -q "$code" src/shared/errors/error-codes.ts 2>/dev/null; then
    log "   ✅ $code"
  else
    log "   ❌ $code (perlu ditambah)"
  fi
done
log ""

log "4. Shared constants — headers"
if [ -f src/shared/constants/headers.ts ]; then
  log "   ✅ src/shared/constants/headers.ts"
  if grep -q "IDEMPOTENCY_KEY" src/shared/constants/headers.ts 2>/dev/null; then
    log "   ✅ IDEMPOTENCY_KEY constant ada"
  else
    log "   ❌ IDEMPOTENCY_KEY constant belum ada"
  fi
else
  log "   ❌ src/shared/constants/headers.ts tidak ada"
fi
log ""

log "5. Redis module"
if [ -f src/infrastructure/redis/redis.module.ts ]; then
  log "   ✅ redis.module.ts ada"
  if grep -q "REDIS_CLIENT" src/infrastructure/redis/redis.constants.ts 2>/dev/null; then
    log "   ✅ REDIS_CLIENT symbol ada"
  fi
fi
log ""

log "6. Config env"
if [ -f src/config/env.validation.ts ]; then
  log "   ✅ env.validation.ts ada"
  for env in IDEMPOTENCY_LOCK_TTL_SEC IDEMPOTENCY_REPLAY_TTL_SEC; do
    if grep -q "$env" src/config/env.validation.ts 2>/dev/null; then
      log "   ✅ $env"
    else
      log "   ❌ $env (perlu ditambah)"
    fi
  done
fi
log ""

log "7. Test fixtures JWT"
if [ -f test/fixtures/jwt.fixture.ts ]; then
  log "   ✅ test/fixtures/jwt.fixture.ts"
else
  log "   ⚠️  tidak ada (opsional untuk idempotency)"
fi
log ""

# ─────────────────────────────────────────────────────
log_section "13. RINGKASAN"
# ─────────────────────────────────────────────────────
log "Report disimpan di : $REPORT"
log "Timestamp          : $TIMESTAMP"
log ""
log "Cara kirim ke AI:"
log "  cat $REPORT"
log ""
log "Command berikutnya yang mungkin berguna:"
log "  pnpm test          → jalankan semua test"
log "  pnpm test:cov      → coverage report"
log "  pnpm deps:check    → boundary check"
log "  pnpm dev:up        → nyalakan Redis"
log ""

echo ""
echo -e "${GREEN}═══════════════════════════════════════════════${NC}"
echo -e "${GREEN}  ✅ CHECKPOINT SELESAI${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════${NC}"
echo -e "  Report : ${YELLOW}$REPORT${NC}"
echo -e "  Size   : $(du -h "$REPORT" 2>/dev/null | cut -f1)"
echo ""
echo -e "  Kirim ke AI: ${BLUE}cat $REPORT${NC}"
echo ""