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
