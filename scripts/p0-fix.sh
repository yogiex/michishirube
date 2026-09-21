#!/usr/bin/env bash
# ─────────────────────────────────────────────────────
# p0-fix.sh — Terapkan semua perbaikan P0
# ─────────────────────────────────────────────────────
set -euo pipefail

GREEN='\033[0;32m'; YELLOW='\033[1;33m'; NC='\033[0m'
step() { echo -e "${YELLOW}▶${NC} $1"; }
done_() { echo -e "${GREEN}✅${NC} $1"; }

cd "$(git rev-parse --show-toplevel 2>/dev/null || echo .)"

step "1/8: Update .prettierignore"
cat > .prettierignore << 'EOF'
node_modules
.pnpm-store
dist
build
coverage
*.tsbuildinfo
pnpm-lock.yaml
package-lock.json
yarn.lock
*.min.js
*.min.css
.env
.env.*
!.env.example
!.env.test
checkpoint-report.txt
checkpoint*.txt
.DS_Store
.idea
.vscode
EOF
done_ ".prettierignore updated"

step "2/8: Update .gitignore"
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
.pnpm-store/

# Build
dist/
build/
*.tsbuildinfo

# Coverage
coverage/
*.lcov

# Logs
*.log
logs/

# Checkpoint
checkpoint-report.txt
checkpoint*.txt
*.report.txt

# Env
.env
.env.local
.env.development
.env.production
.env.*.local
!.env.example
!.env.test

# OS
.DS_Store
Thumbs.db

# IDE
.idea/
.vscode/
*.swp
*.swo
EOF
done_ ".gitignore updated"

step "3/8: Buat .editorconfig"
cat > .editorconfig << 'EOF'
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
indent_style = space
indent_size = 2
max_line_length = 100

[*.{ts,js,mjs,cjs,tsx,jsx}]
indent_style = space
indent_size = 2
quote_type = single

[*.{json,jsonc}]
indent_style = space
indent_size = 2
insert_final_newline = true

[*.{yaml,yml}]
indent_style = space
indent_size = 2
trim_trailing_whitespace = false

[*.md]
indent_style = space
indent_size = 2
trim_trailing_whitespace = false
max_line_length = 80

[Dockerfile*]
indent_style = space
indent_size = 2

[*.sh]
indent_style = space
indent_size = 2
end_of_line = lf

[Makefile]
indent_style = tab
indent_size = 4

[.env*]
insert_final_newline = true
trim_trailing_whitespace = true
EOF
done_ ".editorconfig dibuat"

step "4/8: Buat .npmrc"
cat > .npmrc << 'EOF'
minimum-release-age=1440
lockfile=true
prefer-frozen-lockfile=true
resolution-mode=highest
strict-peer-dependencies=false
auto-install-peers=true
shamefully-hoist=false
node-linker=isolated
EOF
done_ ".npmrc dibuat"

step "5/8: Buat LICENSE"
cat > LICENSE << 'EOF'
MIT License

Copyright (c) 2026 Michishirube

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
EOF
done_ "LICENSE dibuat"

step "6/8: Buat CONTRIBUTING.md"
cat > CONTRIBUTING.md << 'EOF'
# Contributing

Terima kasih ingin berkontribusi ke **Michishirube**!

## Sebelum Mulai

1. Baca [`AGENTS.md`](AGENTS.md) — aturan kode
2. Baca [`RULES.md`](RULES.md) — clean code & error handling
3. Baca [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — arsitektur

## Setup

```bash
git clone https://github.com/<org>/michishirube.git
cd michishirube
pnpm install
cp .env.example .env.development
npx lefthook install
pnpm dev:up
pnpm start:dev
```

## Alur Kerja

1. Buat branch: `feat/<nama>`, `fix/<nama>`, atau `chore/<nama>`
2. Tulis kode sesuai `AGENTS.md` + `RULES.md`
3. Tambah test
4. Pastikan lulus:
   ```bash
   pnpm typecheck && pnpm lint && pnpm test && pnpm deps:check
   ```
5. Commit dengan **Conventional Commits**
6. Push & buat Pull Request

## Commit Convention

```
<type>(<scope>): <subject>
```

Type: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`, `perf`, `style`, `build`, `ci`

Contoh:
```
feat(auth): add JWT verification via JWKS
fix(rate-limit): handle Redis timeout gracefully
docs(architecture): add resilience section
```

## Code Review

PR akan di-review untuk:
- Kepatuhan arsitektur Hexagonal
- Type safety (tidak ada `any`)
- Error handling (RFC 7807)
- Test coverage
- Security (tidak bocorkan internal)

## Pertanyaan

Buka issue atau diskusi di GitHub.
EOF
done_ "CONTRIBUTING.md dibuat"

step "7/8: Buat scripts/dev.sh"
cat > scripts/dev.sh << 'EOF'
#!/usr/bin/env bash
set -euo pipefail

COMPOSE_BASE="deploy/docker-compose.yml"
COMPOSE_DEV="deploy/docker-compose.dev.yml"

case "${1:-help}" in
  up)
    echo "🚀 Start Redis..."
    docker compose -f "$COMPOSE_BASE" -f "$COMPOSE_DEV" up -d
    echo "⏳ Tunggu Redis ready..."
    until docker exec gateway-redis-dev redis-cli ping 2>/dev/null | grep -q PONG; do
      sleep 1
    done
    echo "✅ Redis ready"
    echo "🚀 Start gateway..."
    pnpm start:dev
    ;;
  down)
    docker compose -f "$COMPOSE_BASE" -f "$COMPOSE_DEV" down
    ;;
  reset)
    docker compose -f "$COMPOSE_BASE" -f "$COMPOSE_DEV" down -v
    docker compose -f "$COMPOSE_BASE" -f "$COMPOSE_DEV" up -d
    ;;
  logs)
    docker compose -f "$COMPOSE_BASE" -f "$COMPOSE_DEV" logs -f redis
    ;;
  status)
    docker compose -f "$COMPOSE_BASE" -f "$COMPOSE_DEV" ps
    ;;
  *)
    echo "Usage: $0 {up|down|reset|logs|status}"
    exit 1
    ;;
esac
EOF
chmod +x scripts/dev.sh
done_ "scripts/dev.sh dibuat"

step "8/8: Verifikasi"
echo ""
echo "Cek file yang dibuat:"
for f in .prettierignore .gitignore .editorconfig .npmrc LICENSE CONTRIBUTING.md scripts/dev.sh; do
  [ -f "$f" ] && echo "  ✅ $f" || echo "  ❌ $f"
done
echo ""
echo -e "${GREEN}═══════════════════════════════════════════════${NC}"
echo -e "${GREEN}  ✅ P0 FIX SELESAI${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════${NC}"
echo ""
echo "Langkah berikutnya:"
echo "  1. Update package.json (scripts + overrides)"
echo "  2. Update scripts/checkpoints.sh"
echo "  3. Update .lefthook.yml (exclude lockfiles)"
echo "  4. pnpm install"
echo "  5. pnpm typecheck && pnpm lint && pnpm test"
echo "  6. Commit"
