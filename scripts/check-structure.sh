#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="${PROJECT_ROOT:-$(cd "$SCRIPT_DIR/.." && pwd)}"
MAX_DEPTH="${MAX_DEPTH:-6}"
OUTPUT_FILE=""
OUTPUT_FORMAT="markdown"

if [[ -t 1 ]]; then
  C_DIM='\033[2m'; C_GREEN='\033[0;32m'; C_RED='\033[0m'
else
  C_DIM=''; C_GREEN=''; C_RED=''
fi

usage() {
  printf '%s\n' "Usage: $(basename "$0") [OPTIONS]" \
    "  -o, --output FILE    Tulis output ke file" \
    "  -f, --format FORMAT  markdown | json | tree | stats" \
    "  -d, --depth N        Maximum depth (default: 6)" \
    "  -h, --help           Show help" \
    "  -v, --version        Show version"
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    -o|--output) OUTPUT_FILE="${2:?Missing output path}"; shift 2 ;;
    -f|--format) OUTPUT_FORMAT="${2:?Missing output format}"; shift 2 ;;
    -d|--depth) MAX_DEPTH="${2:?Missing depth}"; shift 2 ;;
    -h|--help) usage; exit 0 ;;
    -v|--version) printf '%s\n' 'check-structure.sh v1.1.0'; exit 0 ;;
    *) printf 'Unknown option: %s\n' "$1" >&2; usage >&2; exit 1 ;;
  esac
done

case "$OUTPUT_FORMAT" in
  markdown|json|tree|stats) ;;
  *) printf 'Invalid format: %s\n' "$OUTPUT_FORMAT" >&2; exit 1 ;;
esac
[[ -d "$PROJECT_ROOT" ]] || { printf 'Project root not found: %s\n' "$PROJECT_ROOT" >&2; exit 1; }
cd "$PROJECT_ROOT"

count_files() {
  find "${2:-.}" -type f -name "$1" -not -path '*/node_modules/*' \
    -not -path '*/.git/*' -not -path '*/.next/*' -not -path '*/dist/*' 2>/dev/null | wc -l | tr -d ' '
}
count_dirs() { find "${2:-.}" -type d -name "$1" -not -path '*/node_modules/*' -not -path '*/.git/*' 2>/dev/null | wc -l | tr -d ' '; }
status_dir() { [[ -d "$1" ]] && printf '✅' || printf '❌'; }
status_file() { [[ -f "$1" ]] && printf '✅' || printf '❌'; }
file_size() { [[ -f "$1" ]] && du -h "$1" | cut -f1 || printf '—'; }

ROOT_DIRS=(apps apps/dashboard config deploy docs docs/ADR scripts src src/config src/core src/infrastructure src/modules src/guards src/interceptors src/middleware src/shared test .github/workflows)
ROOT_FILES=(AGENTS.md RULES.md README.md CONTRIBUTING.md LICENSE package.json pnpm-workspace.yaml pnpm-lock.yaml tsconfig.json tsconfig.build.json nest-cli.json vitest.config.ts vitest.config.int.ts vitest.config.e2e.ts commitlint.config.cjs .dependency-cruiser.cjs .editorconfig .env.example .gitignore .lefthook.yml .npmrc .oxlintrc.json .prettierrc .prettierignore)
DOCS_FILES=(docs/PRD.md docs/ARCHITECTURE.md docs/STRUCTURE.md docs/TECHSTACK.md docs/RESILIENCE.md docs/SPRINT.md docs/FRONTEND-API-CONTRACT.md docs/ADR/0002-hexagonal-over-ddd.md docs/ADR/0003-redis-as-only-state.md docs/ADR/0004-no-db-in-gateway.md docs/ADR/0005-response-envelope.md)
DASHBOARD_DIRS=(apps/dashboard/app 'apps/dashboard/app/(auth)' 'apps/dashboard/app/(dashboard)' apps/dashboard/components apps/dashboard/components/ui apps/dashboard/components/layout apps/dashboard/components/shared apps/dashboard/components/banners apps/dashboard/components/features apps/dashboard/hooks apps/dashboard/lib apps/dashboard/lib/api apps/dashboard/lib/api/endpoints apps/dashboard/lib/schemas apps/dashboard/lib/banners apps/dashboard/lib/design apps/dashboard/public apps/dashboard/types)
DASHBOARD_FILES=(apps/dashboard/package.json apps/dashboard/tsconfig.json apps/dashboard/next.config.ts apps/dashboard/next-env.d.ts apps/dashboard/middleware.ts apps/dashboard/postcss.config.mjs apps/dashboard/next.config.spec.ts)
DASHBOARD_DOCS=(apps/dashboard/AGENTS.md apps/dashboard/FRONTEND-DESIGN.md apps/dashboard/FRONTEND-PATTERNS.md apps/dashboard/FRONTEND-ERROR-HANDLING.md apps/dashboard/FRONTEND-DATA-FLOW.md apps/dashboard/FRONTEND-SECURITY.md apps/dashboard/FRONTEND-COMPONENTS.md apps/dashboard/FRONTEND-NAMING.md apps/dashboard/FRONTEND-PERFORMANCE.md)
CORE_CONTEXTS=(auth rbac tenant rate-limit routing api-key audit idempotency circuit-breaker cache bulkhead)

stat_value() {
  case "$1" in
    gateway_ts) count_files '*.ts' src ;; gateway_tests) count_files '*.spec.ts' src ;;
    dashboard_tsx) count_files '*.tsx' apps/dashboard ;; dashboard_ts) count_files '*.ts' apps/dashboard ;;
    dashboard_tests) count_files '*.spec.ts*' apps/dashboard ;; total_docs) count_files '*.md' docs ;;
    total_files) find . -type f -not -path './node_modules/*' -not -path './.git/*' -not -path './.next/*' -not -path './dist/*' | wc -l | tr -d ' ' ;;
  esac
}

generate_tree() {
  if command -v tree >/dev/null 2>&1; then
    tree -a -L "$MAX_DEPTH" -I 'node_modules|.git|.next|dist|coverage|.turbo|.vercel|*.log|*.tsbuildinfo' --dirsfirst .
  else
    find . -maxdepth "$MAX_DEPTH" -not -path './node_modules*' -not -path './.git*' -not -path './.next*' -not -path './dist*' -not -path './coverage*' -not -path './.turbo*' | sort
  fi
}

generate_markdown() {
  local ts gc gb node_version pnpm_version
  ts="$(date -u +%Y-%m-%dT%H:%M:%SZ)"; gc="$(git rev-parse --short HEAD 2>/dev/null || printf 'N/A')"; gb="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || printf 'N/A')"; node_version="$(node --version 2>/dev/null || printf 'N/A')"; pnpm_version="$(pnpm --version 2>/dev/null || printf 'N/A')"
  cat <<EOF
# Project Structure Report — Michishirube

| Field | Value |
|---|---|
| Generated | \`$ts\` |
| Project Root | \`$PROJECT_ROOT\` |
| Git Commit | \`$gc\` |
| Git Branch | \`$gb\` |
| Node | \`$node_version\` |
| pnpm | \`$pnpm_version\` |
| Max Depth | $MAX_DEPTH |

## Root Files

| File | Status | Size |
|---|---|---|
EOF
  for file in "${ROOT_FILES[@]}"; do echo "| \`$file\` | $(status_file "$file") | $(file_size "$file") |"; done
  cat <<EOF

## Documentation

| File | Status | Size |
|---|---|---|
EOF
  for file in "${DOCS_FILES[@]}" "${DASHBOARD_DOCS[@]}"; do echo "| \`$file\` | $(status_file "$file") | $(file_size "$file") |"; done
  cat <<EOF

## Dashboard Directories

| Directory | Status |
|---|---|
EOF
  for dir in "${DASHBOARD_DIRS[@]}"; do echo "| \`$dir/\` | $(status_dir "$dir") |"; done
  cat <<EOF

## Statistics

| Metric | Count |
|---|---:|
| Gateway source (.ts) | $(stat_value gateway_ts) |
| Gateway tests (.spec.ts) | $(stat_value gateway_tests) |
| Dashboard source (.tsx) | $(stat_value dashboard_tsx) |
| Dashboard source (.ts) | $(stat_value dashboard_ts) |
| Dashboard tests | $(stat_value dashboard_tests) |
| docs Markdown | $(stat_value total_docs) |
| Total files | $(stat_value total_files) |

## Directory Tree

\`\`\`
$(generate_tree)
\`\`\`
EOF
}

generate_json() {
  printf '{\n  "generated": "%s",\n  "projectRoot": "%s",\n  "git": {"commit": "%s", "branch": "%s"},\n  "stats": {"gatewayTs": %s, "gatewayTests": %s, "dashboardTsx": %s, "dashboardTs": %s, "dashboardTests": %s, "totalDocs": %s, "totalFiles": %s}\n}\n' "$(date -u +%Y-%m-%dT%H:%M:%SZ)" "$PROJECT_ROOT" "$(git rev-parse --short HEAD 2>/dev/null || printf 'N/A')" "$(git rev-parse --abbrev-ref HEAD 2>/dev/null || printf 'N/A')" "$(stat_value gateway_ts)" "$(stat_value gateway_tests)" "$(stat_value dashboard_tsx)" "$(stat_value dashboard_ts)" "$(stat_value dashboard_tests)" "$(stat_value total_docs)" "$(stat_value total_files)"
}

generate_stats() {
  printf 'Project Statistics — Michishirube\nGenerated: %s\n\nGateway:\n  Source (.ts) : %s\n  Tests         : %s\n\nDashboard:\n  Source (.tsx): %s\n  Source (.ts) : %s\n  Tests         : %s\n\nDocumentation:\n  docs/ Markdown: %s\n\nTotal files     : %s\n' "$(date -u +%Y-%m-%dT%H:%M:%SZ)" "$(stat_value gateway_ts)" "$(stat_value gateway_tests)" "$(stat_value dashboard_tsx)" "$(stat_value dashboard_ts)" "$(stat_value dashboard_tests)" "$(stat_value total_docs)" "$(stat_value total_files)"
}

render() { case "$OUTPUT_FORMAT" in markdown) generate_markdown;; json) generate_json;; tree) generate_tree;; stats) generate_stats;; esac; }
if [[ -n "$OUTPUT_FILE" ]]; then
  mkdir -p "$(dirname "$OUTPUT_FILE")"; render > "$OUTPUT_FILE"; printf 'Written: %s (%s)\n' "$OUTPUT_FILE" "$(file_size "$OUTPUT_FILE")" >&2
else render; fi
