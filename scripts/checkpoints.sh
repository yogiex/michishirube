#!/usr/bin/env bash
# ─────────────────────────────────────────────────────
# checkpoints.sh — Evaluasi kesehatan project Michishirube
# Output: checkpoint-report.txt (siap dikirim ke AI)
# ─────────────────────────────────────────────────────

set -uo pipefail

# ─── Config ──────────────────────────────────────────
REPORT="checkpoint-report.txt"
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
PROJECT_NAME=$(basename "$PWD")

# ─── Warna ───────────────────────────────────────────
GREEN='\033[0;32m'; RED='\033[0;31m'; YELLOW='\033[1;33m'
BLUE='\033[0;34m'; NC='\033[0m'

ok()   { echo -e "${GREEN}✅${NC} $1"; }
fail() { echo -e "${RED}❌${NC} $1"; }
warn() { echo -e "${YELLOW}⚠️${NC}  $1"; }
info() { echo -e "${BLUE}ℹ️${NC}  $1"; }

: > "$REPORT"
log() { echo "$1" | tee -a "$REPORT"; }
log_section() {
  echo "" | tee -a "$REPORT"
  echo "═══════════════════════════════════════════════════" | tee -a "$REPORT"
  echo "  $1" | tee -a "$REPORT"
  echo "═══════════════════════════════════════════════════" | tee -a "$REPORT"
}

# ─────────────────────────────────────────────────────
log_section "CHECKPOINT REPORT — $PROJECT_NAME"
log "Timestamp : $TIMESTAMP"
log "Directory : $PWD"
log "User      : $(whoami)"
log "Host      : $(hostname)"
log ""

# ─────────────────────────────────────────────────────
log_section "1. ENVIRONMENT"
# ─────────────────────────────────────────────────────
log "[Runtime]"
log "  Node    : $(node -v 2>/dev/null || echo 'NOT FOUND')"
log "  pnpm    : $(pnpm -v 2>/dev/null || echo 'NOT FOUND')"
log "  npm     : $(npm -v 2>/dev/null || echo 'NOT FOUND')"
log "  Docker  : $(docker --version 2>/dev/null || echo 'NOT FOUND')"
log "  Compose : $(docker compose version 2>/dev/null | head -1 || docker-compose --version 2>/dev/null | head -1 || echo 'NOT FOUND')"
log "  Git     : $(git --version 2>/dev/null || echo 'NOT FOUND')"
log ""
log "[Git Status]"
if [ -d .git ]; then
  log "  Branch  : $(git rev-parse --abbrev-ref HEAD 2>/dev/null)"
  log "  Commit  : $(git rev-parse --short HEAD 2>/dev/null)"
  log "  Message : $(git log -1 --pretty=%s 2>/dev/null)"
  log "  Dirty   : $(git status --porcelain 2>/dev/null | wc -l) file(s) belum di-commit"
else
  log "  (bukan git repo)"
fi
log ""
log "[Node Modules]"
if [ -d node_modules ]; then
  SIZE=$(du -sh node_modules 2>/dev/null | cut -f1)
  ok "node_modules ada ($SIZE)"
else
  fail "node_modules tidak ada — jalankan: pnpm install"
fi

# ─────────────────────────────────────────────────────
log_section "2. STRUKTUR FOLDER"
# ─────────────────────────────────────────────────────
log "[Folder Wajib]"
for dir in docs src test scripts config deploy; do
  [ -d "$dir" ] && ok "$dir/" || warn "$dir/ tidak ada"
done
log ""
log "[Folder src/ — Hexagonal]"
for dir in \
  src/config src/core src/infrastructure src/modules src/shared \
  src/guards src/middleware src/interceptors; do
  [ -d "$dir" ] && ok "$dir/" || warn "$dir/ tidak ada"
done
log ""
log "[Folder Dokumentasi]"
for file in \
  docs/PRD.md docs/ARCHITECTURE.md docs/STRUCTURE.md \
  docs/TECHSTACK.md docs/RESILIENCE.md \
  AGENTS.md RULES.md README.md; do
  [ -f "$file" ] && ok "$file" || warn "$file tidak ada"
done
log ""
log "[File Config Root]"
for file in \
  package.json tsconfig.json tsconfig.build.json nest-cli.json \
  .env.example .env.development .env.test \
  .gitignore .prettierrc .prettierignore .editorconfig \
  .dependency-cruiser.cjs .oxlintrc.json \
  .lefthook.yml commitlint.config.cjs \
  vitest.config.ts vitest.config.e2e.ts \
  pnpm-workspace.yaml LICENSE CONTRIBUTING.md; do
  [ -f "$file" ] && ok "$file" || warn "$file tidak ada"
done
log ""
log "[Deploy Files]"
for file in \
  deploy/Dockerfile deploy/docker-compose.yml \
  deploy/docker-compose.dev.yml deploy/docker-compose.staging.yml \
  deploy/docker-compose.prod.yml deploy/.dockerignore; do
  [ -f "$file" ] && ok "$file" || warn "$file tidak ada"
done

# ─────────────────────────────────────────────────────
log_section "3. STRUKTUR FILE (TREE)"
# ─────────────────────────────────────────────────────
if command -v tree >/dev/null 2>&1; then
  log "[tree output]"
  tree -a -I 'node_modules|dist|.git|coverage|.next|.turbo|*.tsbuildinfo|checkpoint-report.txt' \
    -L 5 --dirsfirst --charset=ascii >> "$REPORT" 2>&1
else
  log "(tree tidak terinstall — pakai find)"
  find . -type d \( -name node_modules -o -name dist -o -name .git -o -name coverage \) -prune -o -print 2>/dev/null | sort >> "$REPORT"
fi

# ─────────────────────────────────────────────────────
log_section "4. DEPENDENCY"
# ─────────────────────────────────────────────────────
if [ -f package.json ]; then
  log "[Dependencies]"
  node -e "
    const p = require('./package.json');
    const deps = Object.keys(p.dependencies || {});
    const dev = Object.keys(p.devDependencies || {});
    console.log('  Prod (' + deps.length + '):');
    deps.forEach(d => console.log('    - ' + d + '@' + p.dependencies[d]));
    console.log('');
    console.log('  Dev (' + dev.length + '):');
    dev.forEach(d => console.log('    - ' + d + '@' + p.devDependencies[d]));
  " 2>&1 | tee -a "$REPORT"
fi

# ─────────────────────────────────────────────────────
log_section "5. TYPECHECK"
# ─────────────────────────────────────────────────────
if [ -f tsconfig.json ] && node -e "require('./package.json').scripts.typecheck" 2>/dev/null; then
  TYPECHECK_OUT=$(pnpm typecheck 2>&1)
  if [ $? -eq 0 ]; then
    ok "TypeScript: 0 error"
    log "✅ TypeScript: 0 error"
  else
    fail "TypeScript: ada error"
    log "❌ TypeScript errors:"
    echo "$TYPECHECK_OUT" | head -30 >> "$REPORT"
  fi
else
  warn "Script 'typecheck' tidak ada di package.json"
  log "⚠️  Script 'typecheck' tidak ada"
fi

# ─────────────────────────────────────────────────────
log_section "6. LINT"
# ─────────────────────────────────────────────────────
if node -e "require('./package.json').scripts.lint" 2>/dev/null; then
  LINT_OUT=$(pnpm lint 2>&1)
  if [ $? -eq 0 ]; then
    ok "Lint: 0 error"
    log "✅ Lint: 0 error"
  else
    fail "Lint: ada error"
    log "❌ Lint errors:"
    echo "$LINT_OUT" | head -30 >> "$REPORT"
  fi
else
  warn "Script 'lint' tidak ada di package.json"
fi

# ─────────────────────────────────────────────────────
log_section "7. TEST"
# ─────────────────────────────────────────────────────
if [ -f vitest.config.ts ]; then
  TEST_OUT=$(pnpm test 2>&1)
  TEST_CODE=$?
  log "[Output]"
  echo "$TEST_OUT" | tail -40 >> "$REPORT"
  log ""
  if [ $TEST_CODE -eq 0 ]; then
    ok "Test: lulus"
    log "✅ Test: lulus"
  else
    fail "Test: gagal"
    log "❌ Test: gagal"
  fi
else
  warn "vitest.config.ts tidak ada — skip"
fi

# ─────────────────────────────────────────────────────
log_section "8. COVERAGE"
# ─────────────────────────────────────────────────────
if [ -f vitest.config.ts ]; then
  pnpm test:cov 2>&1 | tail -30 >> "$REPORT"
fi

# ─────────────────────────────────────────────────────
log_section "9. DEPENDENCY BOUNDARY (HEXAGONAL)"
# ─────────────────────────────────────────────────────
if [ -f .dependency-cruiser.cjs ]; then
  DEPS_OUT=$(pnpm deps:check 2>&1)
  if [ $? -eq 0 ]; then
    ok "Boundary: 0 violation"
    log "✅ Boundary: 0 violation"
  else
    fail "Boundary: ada violation"
    log "❌ Boundary violations:"
    echo "$DEPS_OUT" | head -30 >> "$REPORT"
  fi
else
  warn ".dependency-cruiser.cjs tidak ada — skip"
fi

# ─────────────────────────────────────────────────────
log_section "10. SECURITY AUDIT"
# ─────────────────────────────────────────────────────
log "[Hardcoded Secrets Scan]"
SECRET_HITS=$(grep -rEn '(JWT_SECRET|REDIS_PASSWORD|API_KEY|PRIVATE_KEY)\s*=\s*["'"'"'][^"'"'"']{8,}' src/ 2>/dev/null | grep -v '.spec.ts' | grep -v 'process.env' || true)
if [ -z "$SECRET_HITS" ]; then
  ok "Tidak ada hardcoded secret di src/"
  log "✅ Tidak ada hardcoded secret"
else
  fail "Potensi hardcoded secret:"
  log "❌ Potensi hardcoded secret:"
  echo "$SECRET_HITS" | head -10 >> "$REPORT"
fi
log ""

log "[console.log Scan]"
CONSOLE_HITS=$(grep -rn 'console\.log' src/ 2>/dev/null | grep -v '.spec.ts' || true)
if [ -z "$CONSOLE_HITS" ]; then
  ok "Tidak ada console.log di src/"
  log "✅ Tidak ada console.log"
else
  warn "Ada console.log:"
  log "⚠️ console.log ditemukan:"
  echo "$CONSOLE_HITS" | head -10 >> "$REPORT"
fi
log ""

log "[any Usage Scan]"
ANY_HITS=$(grep -rn ': any' src/ 2>/dev/null | grep -v '.spec.ts' | wc -l)
if [ "$ANY_HITS" -eq 0 ]; then
  ok "Tidak ada 'any' di src/"
  log "✅ Tidak ada 'any'"
else
  warn "$ANY_HITS penggunaan 'any'"
  log "⚠️ $ANY_HITS penggunaan 'any'"
fi
log ""

log "[Dependency Vulnerability Audit]"
AUDIT_OUT=$(pnpm audit --audit-level=moderate 2>&1 | head -40)
log "$AUDIT_OUT"

# ─────────────────────────────────────────────────────
log_section "11. DOCKER"
# ─────────────────────────────────────────────────────
if [ -f deploy/docker-compose.dev.yml ]; then
  log "[Container Status]"
  docker compose -f deploy/docker-compose.yml -f deploy/docker-compose.dev.yml ps 2>&1 | tee -a "$REPORT" || log "  (docker tidak jalan atau tidak ada container)"
  log ""
  log "[Docker System]"
  docker system df 2>&1 | tee -a "$REPORT" || true
else
  warn "deploy/docker-compose.dev.yml tidak ada — skip"
fi

# ─────────────────────────────────────────────────────
log_section "12. FILE COUNT & SIZE"
# ─────────────────────────────────────────────────────
log "[Source Files]"
TS_COUNT=$(find src -name '*.ts' -not -name '*.spec.ts' 2>/dev/null | wc -l)
TEST_COUNT=$(find src test -name '*.spec.ts' 2>/dev/null | wc -l)
log "  Source .ts : $TS_COUNT"
log "  Test .spec : $TEST_COUNT"
log ""
log "[Lines of Code]"
TOTAL=$(find src -name '*.ts' -not -name '*.spec.ts' -exec cat {} + 2>/dev/null | wc -l)
log "  Total LOC (src, non-test): $TOTAL"
log ""
log "[File Terbesar di src/]"
find src -name '*.ts' -exec wc -l {} + 2>/dev/null | sort -rn | head -10 >> "$REPORT"

# ─────────────────────────────────────────────────────
log_section "13. GIT HISTORY"
# ─────────────────────────────────────────────────────
if [ -d .git ]; then
  log "[Last 10 Commits]"
  git log --oneline -10 2>/dev/null | tee -a "$REPORT"
  log ""
  log "[Uncommitted Files]"
  git status --porcelain 2>/dev/null | head -20 | tee -a "$REPORT"
fi

# ─────────────────────────────────────────────────────
log_section "RINGKASAN"
# ─────────────────────────────────────────────────────
log "Semua hasil di atas tersimpan di: $REPORT"
log ""
log "Cara kirim ke AI:"
log "  cat $REPORT"
log ""
log "Selesai: $TIMESTAMP"

echo ""
echo -e "${GREEN}═══════════════════════════════════════════════${NC}"
echo -e "${GREEN}  ✅ CHECKPOINT SELESAI${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════${NC}"
echo -e "  Laporan: ${YELLOW}$REPORT${NC}"
echo -e "  Ukuran : $(du -h $REPORT | cut -f1)"
echo -e ""
echo -e "  Kirim ke AI: ${BLUE}cat $REPORT${NC}"
echo -e ""
