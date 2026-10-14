#!/usr/bin/env bash
set -uo pipefail

REPORT="checkpoint.txt"
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
PROJECT_NAME=$(basename "$PWD")
GREEN='\033[0;32m'; RED='\033[0;31m'; YELLOW='\033[1;33m'; BLUE='\033[0;34m'; CYAN='\033[0;36m'; BOLD='\033[1m'; NC='\033[0m'
: > "$REPORT"

log() { printf '%b\n' "$1" | tee -a "$REPORT"; }
ok() { printf '%b\n' "${GREEN}✅${NC} $1" | tee -a "$REPORT"; }
warn() { printf '%b\n' "${YELLOW}⚠️ ${NC} $1" | tee -a "$REPORT"; }
fail() { printf '%b\n' "${RED}❌${NC} $1" | tee -a "$REPORT"; }
info() { printf '%b\n' "${BLUE}ℹ️ ${NC} $1" | tee -a "$REPORT"; }
heading() { log "${BOLD}${CYAN}$1${NC}"; }
log_section() { log ""; log "═══════════════════════════════════════════════════"; log "  $1"; log "═══════════════════════════════════════════════════"; }
get_version() { local output; output=$(eval "$1" 2>/dev/null | head -1 || true); [ -n "$output" ] && printf '%s\n' "$output" || printf 'NOT FOUND\n'; }

log_section "CHECKPOINT — $PROJECT_NAME"
log "Timestamp : $TIMESTAMP"
log "Directory : $PWD"
log "User      : $(whoami)"
log "Host      : $(hostname)"
log ""

log_section "1. ENVIRONMENT"
NODE_VER=$(get_version "node -v"); PNPM_VER=$(get_version "pnpm -v"); NPM_VER=$(get_version "npm -v"); DOCKER_VER=$(get_version "docker --version"); COMPOSE_VER=$(get_version "docker compose version"); COMPOSE_VER2=$(get_version "docker-compose --version"); GIT_VER=$(get_version "git --version")
[ "$COMPOSE_VER" = "NOT FOUND" ] && COMPOSE_VER="$COMPOSE_VER2"
heading "[Runtime]"; log "  Node    : $NODE_VER"; log "  pnpm    : $PNPM_VER"; log "  npm     : $NPM_VER"; log "  Docker  : $DOCKER_VER"; log "  Compose : $COMPOSE_VER"; log "  Git     : $GIT_VER"; log ""

log_section "2. GIT STATE"
if [ -d .git ]; then
  BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null); COMMIT=$(git rev-parse --short HEAD 2>/dev/null); MSG=$(git log -1 --pretty=%s 2>/dev/null); DIRTY=$(git status --porcelain 2>/dev/null | wc -l | tr -d ' ')
  log "  Branch      : $BRANCH"; log "  Commit      : $COMMIT"; log "  Message     : $MSG"; log "  Uncommitted : $DIRTY file(s)"; log ""; heading "[Last 5 Commits]"; git log --oneline -5 2>/dev/null | while IFS= read -r line; do log "  $line"; done
else warn "Bukan git repo"; fi
log ""

log_section "3. DOKUMENTASI WAJIB"
for file in docs/PRD.md docs/ARCHITECTURE.md docs/STRUCTURE.md docs/TECHSTACK.md docs/RESILIENCE.md docs/SPRINT.md AGENTS.md RULES.md README.md CONTRIBUTING.md LICENSE; do [ -f "$file" ] && ok "$file" || fail "$file MISSING"; done
log ""; heading "[ADR]"
if [ -d docs/ADR ]; then ADR_COUNT=$(find docs/ADR -maxdepth 1 -name '*.md' 2>/dev/null | wc -l | tr -d ' '); [ "$ADR_COUNT" -eq 0 ] && warn "docs/ADR/ kosong" || { info "$ADR_COUNT ADR files:"; find docs/ADR -maxdepth 1 -name '*.md' 2>/dev/null | sort | while IFS= read -r f; do log "  • $(basename "$f")"; done; }; else warn "docs/ADR/ tidak ada"; fi
log ""

log_section "4. STRUKTUR FOLDER"
heading "[Top-Level]"; for dir in src apps docs test scripts config deploy; do [ -d "$dir" ] && ok "$dir/" || warn "$dir/ tidak ada"; done
log ""; heading "[src/ Hexagonal]"; for dir in src/config src/core src/infrastructure src/modules src/shared src/guards src/middleware src/interceptors; do [ -d "$dir" ] && ok "$dir/" || fail "$dir/ MISSING"; done
log ""

log_section "5. CORE MODULES — Detail"
inspect_module() {
  local name="$1" path="src/core/$1" d a t m loc
  if [ ! -d "$path" ]; then printf 'MISSING|%s|0|0|0|0|0\n' "$name"; return; fi
  d=$(find "$path/domain" -name '*.ts' -not -name '*.spec.ts' 2>/dev/null | wc -l | tr -d ' '); a=$(find "$path/application" -name '*.ts' -not -name '*.spec.ts' 2>/dev/null | wc -l | tr -d ' '); t=$(find "$path" -name '*.spec.ts' 2>/dev/null | wc -l | tr -d ' '); m=$(find "$path" -maxdepth 1 -name '*.module.ts' 2>/dev/null | wc -l | tr -d ' '); loc=$(find "$path" -name '*.ts' -not -name '*.spec.ts' -exec cat {} + 2>/dev/null | wc -l | tr -d ' ')
  if [ "$d" -eq 0 ] && [ "$a" -eq 0 ] && [ "$m" -eq 0 ]; then printf 'STUB|%s|%s|%s|%s|%s|%s\n' "$name" "$d" "$a" "$t" "$m" "$loc"; elif [ "$d" -gt 0 ] && [ "$a" -gt 0 ] && [ "$m" -gt 0 ]; then printf 'DONE|%s|%s|%s|%s|%s|%s\n' "$name" "$d" "$a" "$t" "$m" "$loc"; else printf 'PARTIAL|%s|%s|%s|%s|%s|%s\n' "$name" "$d" "$a" "$t" "$m" "$loc"; fi
}
print_module() { IFS='|' read -r status name d a t m loc <<< "$1"; case "$status" in DONE) icon="✅"; color="$GREEN";; PARTIAL|STUB) icon="⚠️"; color="$YELLOW";; MISSING) icon="❌"; color="$RED";; *) icon="?"; color="$NC";; esac; printf "${color}${icon} %-15s domain:%-2s app:%-2s mod:%-2s test:%-2s loc:%-4s${NC}\n" "$name" "$d" "$a" "$m" "$t" "$loc" | tee -a "$REPORT"; }
heading "[Sprint 1 — Core Gateway]"; for mod in tenant auth rbac rate-limit routing api-key audit; do print_module "$(inspect_module "$mod")"; done
log ""; heading "[Sprint 2 — Reliability]"; for mod in idempotency circuit-breaker retry cache bulkhead; do print_module "$(inspect_module "$mod")"; done
log ""

log_section "6. INFRASTRUCTURE ADAPTER"
for dir in redis jwt rbac rate-limit config-repository security observability http grpc idempotency circuit-breaker retry cache; do path="src/infrastructure/$dir"; if [ -d "$path" ]; then COUNT=$(find "$path" -name '*.ts' -not -name '*.spec.ts' 2>/dev/null | wc -l | tr -d ' '); [ "$COUNT" -gt 0 ] && ok "infrastructure/$dir/ ($COUNT file)" || warn "infrastructure/$dir/ (stub)"; else warn "infrastructure/$dir/ tidak ada"; fi; done
log ""

log_section "7. GUARDS / MIDDLEWARE / INTERCEPTORS"
heading "[Guards]"; GUARD_COUNT=0; if [ -d src/guards ]; then find src/guards -maxdepth 1 -name '*.guard.ts' 2>/dev/null | sort | while IFS= read -r f; do log "  ✅ $(basename "$f")"; done; GUARD_COUNT=$(find src/guards -maxdepth 1 -name '*.guard.ts' 2>/dev/null | wc -l | tr -d ' '); fi; log "  Total: $GUARD_COUNT guard"; log ""
heading "[Guard Order in app.module.ts]"; if grep -q "APP_GUARD" src/app.module.ts 2>/dev/null; then grep "APP_GUARD" src/app.module.ts | nl | while IFS=$'\t' read -r num line; do GUARD=$(printf '%s\n' "$line" | grep -oE 'useClass: [A-Za-z]+' | cut -d' ' -f2); log "  $num. $GUARD"; done; else warn "Tidak ada APP_GUARD di app.module.ts"; fi
log ""; heading "[Middleware]"; MW_COUNT=0; if [ -d src/middleware ]; then find src/middleware -maxdepth 1 -name '*.middleware.ts' 2>/dev/null | sort | while IFS= read -r f; do log "  ✅ $(basename "$f")"; done; MW_COUNT=$(find src/middleware -maxdepth 1 -name '*.middleware.ts' 2>/dev/null | wc -l | tr -d ' '); fi; log "  Total: $MW_COUNT middleware"; log ""
heading "[Interceptors]"; IC_COUNT=0; if [ -d src/interceptors ]; then find src/interceptors -maxdepth 1 -name '*.interceptor.ts' 2>/dev/null | sort | while IFS= read -r f; do log "  ✅ $(basename "$f")"; done; IC_COUNT=$(find src/interceptors -maxdepth 1 -name '*.interceptor.ts' 2>/dev/null | wc -l | tr -d ' '); [ "$IC_COUNT" -eq 0 ] && warn "src/interceptors/ kosong"; fi; log "  Total: $IC_COUNT interceptor"; log ""

log_section "8. SHARED — ERROR & TYPES"
heading "[Error Framework]"; for file in src/shared/errors/error-codes.ts src/shared/errors/error-catalog.ts src/shared/errors/domain-error.ts src/shared/errors/gateway-error.ts src/shared/errors/http-exception.filter.ts; do [ -f "$file" ] && ok "$file" || fail "$file MISSING"; done
if [ -f src/shared/errors/error-codes.ts ]; then CODE_COUNT=$(grep -oE 'GW_[A-Z_]+' src/shared/errors/error-codes.ts 2>/dev/null | sort -u | wc -l | tr -d ' '); log "  Total error codes : $CODE_COUNT"; heading "[Error codes per domain]"; for prefix in AUTH RBAC TENANT VALIDATION ROUTE RATE_LIMIT QUOTA IDEMP CIRCUIT BULKHEAD UPSTREAM CACHE INTERNAL OPS RETRY; do COUNT=$(grep -oE "GW_${prefix}[A-Z_]*" src/shared/errors/error-codes.ts 2>/dev/null | sort -u | wc -l | tr -d ' '); [ "$COUNT" -gt 0 ] && log "  GW_${prefix}_* : $COUNT"; done; fi
log ""; heading "[Shared Types]"; for file in src/shared/types/result.type.ts src/shared/types/option.type.ts src/shared/types/branded.type.ts src/shared/types/repository.port.ts src/shared/types/use-case.port.ts; do [ -f "$file" ] && ok "$file" || warn "$file tidak ada"; done
log ""

log_section "9. TEST FILES"
UNIT_TESTS=$(find src test -name '*.spec.ts' 2>/dev/null | wc -l | tr -d ' '); SRC_FILES=$(find src -name '*.ts' -not -name '*.spec.ts' 2>/dev/null | wc -l | tr -d ' '); log "  Source .ts (non-test) : $SRC_FILES"; log "  Test .spec.ts         : $UNIT_TESTS"; [ "$SRC_FILES" -gt 0 ] && log "  Ratio test/source     : $((UNIT_TESTS * 100 / SRC_FILES))%"; log ""
heading "[Test per folder]"; for dir in src/core src/infrastructure src/modules src/guards src/middleware src/shared test; do [ -d "$dir" ] && log "  $dir : $(find "$dir" -name '*.spec.ts' 2>/dev/null | wc -l | tr -d ' ')"; done
log ""

log_section "10. QUALITY GATES"
if node -e "process.exit(require('./package.json').scripts.typecheck ? 0 : 1)" 2>/dev/null; then pnpm typecheck >/tmp/checkpoint-typecheck.out 2>&1 && ok "TypeScript: 0 error" || { fail "TypeScript: ada error"; head -20 /tmp/checkpoint-typecheck.out | tee -a "$REPORT"; }; else warn "Script 'typecheck' tidak ada"; fi
if node -e "process.exit(require('./package.json').scripts.lint ? 0 : 1)" 2>/dev/null; then pnpm lint >/tmp/checkpoint-lint.out 2>&1 && ok "Lint: 0 error" || { fail "Lint: ada error"; head -20 /tmp/checkpoint-lint.out | tee -a "$REPORT"; }; else warn "Script 'lint' tidak ada"; fi
if [ -f .dependency-cruiser.cjs ]; then pnpm deps:check >/tmp/checkpoint-deps.out 2>&1 && ok "Boundary: 0 violation" || { fail "Boundary: ada violation"; head -20 /tmp/checkpoint-deps.out | tee -a "$REPORT"; }; else warn ".dependency-cruiser.cjs tidak ada"; fi
log ""

log_section "11. SECURITY SCAN"
SECRET_HITS=$(grep -rEn '(JWT_SECRET|REDIS_PASSWORD|API_KEY|PRIVATE_KEY)\s*=\s*["'"'"'][^"'"'"']{8,}' src/ 2>/dev/null | grep -v '.spec.ts' | grep -v 'process.env' || true); [ -z "$SECRET_HITS" ] && ok "Tidak ada hardcoded secret" || { fail "Potensi hardcoded secret:"; printf '%s\n' "$SECRET_HITS" | head -10 | tee -a "$REPORT"; }
CONSOLE_HITS=$(grep -rn 'console\.log' src/ 2>/dev/null | grep -v '.spec.ts' || true); [ -z "$CONSOLE_HITS" ] && ok "Tidak ada console.log" || warn "$(printf '%s\n' "$CONSOLE_HITS" | wc -l | tr -d ' ') console.log ditemukan"
ANY_HITS=$(grep -rn ': any' src/ 2>/dev/null | grep -v '.spec.ts' || true); [ -z "$ANY_HITS" ] && ok "Tidak ada 'any'" || warn "$(printf '%s\n' "$ANY_HITS" | wc -l | tr -d ' ') penggunaan 'any'"
TODO_HITS=$(grep -rnE 'TODO|FIXME' src/ 2>/dev/null | grep -v '.spec.ts' || true); [ -z "$TODO_HITS" ] && ok "Tidak ada TODO/FIXME" || warn "$(printf '%s\n' "$TODO_HITS" | wc -l | tr -d ' ') TODO/FIXME ditemukan"
LARGE_FILES=$(find src -name '*.ts' -not -name '*.spec.ts' -exec wc -l {} + 2>/dev/null | awk '$1 > 200 && $2 != "total" {print $1 " " $2}' | sort -rn | head -10); [ -z "$LARGE_FILES" ] && ok "Tidak ada file > 200 baris" || { warn "File > 200 baris (top 10):"; printf '%s\n' "$LARGE_FILES" | while IFS= read -r line; do log "  $line"; done; }
ENV_COMMITTED=$(git ls-files 2>/dev/null | grep -E '^\.env(\.|$)' | grep -v '\.example$\|\.test$' || true); [ -z "$ENV_COMMITTED" ] && ok "Tidak ada .env ter-commit" || { fail ".env ter-commit:"; printf '%s\n' "$ENV_COMMITTED" | tee -a "$REPORT"; }
log ""

log_section "12. SPRINT READINESS"
check_env() { grep -q "$1" src/config/env.validation.ts 2>/dev/null && ok "$1" || fail "$1 MISSING"; }
check_error_code() { grep -q "$1" src/shared/errors/error-codes.ts 2>/dev/null && ok "$1" || fail "$1 MISSING"; }
heading "[Sprint 2.1 — Idempotency]"; check_error_code GW_IDEMP_CONFLICT; check_error_code GW_IDEMP_IN_PROGRESS; check_env IDEMPOTENCY_LOCK_TTL_SEC; check_env IDEMPOTENCY_REPLAY_TTL_SEC
heading "[Sprint 2.2 — Circuit Breaker]"; check_error_code GW_CIRCUIT_OPEN; check_env CIRCUIT_FAILURE_THRESHOLD; check_env CIRCUIT_OPEN_TIMEOUT_MS
heading "[Sprint 2.3 — Retry + Timeout]"; check_error_code GW_UPSTREAM_RETRY_EXHAUSTED; check_env RETRY_MAX_ATTEMPTS; check_env RETRY_TOTAL_TIMEOUT_MS
log ""

log_section "13. RINGKASAN"
SCORE=0; TOTAL=0
check_score() { TOTAL=$((TOTAL + 1)); [ "$1" = "true" ] && SCORE=$((SCORE + 1)); }
for file in docs/PRD.md docs/ARCHITECTURE.md docs/STRUCTURE.md docs/TECHSTACK.md docs/RESILIENCE.md AGENTS.md RULES.md CONTRIBUTING.md .dependency-cruiser.cjs .editorconfig .env.example .github/workflows/security.yml; do [ -f "$file" ] && check_score true || check_score false; done
log "  Dokumentasi & tooling : $SCORE/$TOTAL"; log "  Source files          : $SRC_FILES"; log "  Test files            : $UNIT_TESTS"; log "  Error codes           : ${CODE_COUNT:-0}"; log ""; log "Report disimpan di : $REPORT"; log "Timestamp          : $TIMESTAMP"; log ""; log "Kirim ke AI: cat $REPORT"; log ""
printf '%b\n' "${GREEN}═══════════════════════════════════════════════${NC}" "${GREEN}  ✅ CHECKPOINT SELESAI${NC}" "${GREEN}═══════════════════════════════════════════════${NC}" "  Report : ${YELLOW}$REPORT${NC}" "  Size   : $(du -h "$REPORT" 2>/dev/null | cut -f1)" ""
