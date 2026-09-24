import type { Metadata } from 'next';
import { LoginForm } from '@/components/auth/login-form';

export const metadata: Metadata = {
  title: 'Sign In',
};

interface LoginPageProps {
  readonly searchParams: Promise<{ readonly returnTo?: string | string[] }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const returnTo = typeof params.returnTo === 'string' ? params.returnTo : undefined;
  return (
    <div className="grid min-h-screen lg:grid-cols-[55%_45%]">
      <aside className="relative hidden overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-12 text-white lg:flex lg:flex-col lg:justify-between lg:p-16 kanji-watermark">
        <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />

        <div className="relative">
          <div className="flex items-center gap-3">
            <span className="text-4xl">⛩️</span>
            <div className="flex flex-col leading-none">
              <span className="text-xl font-semibold">道しるべ</span>
              <span className="text-sm text-white/60 tracking-widest">MICHISHIRUBE</span>
            </div>
          </div>

          <div className="mt-16 max-w-md">
            <h1 className="text-4xl font-bold leading-tight">
              Enterprise Multi-Tenant
              <br />
              <span className="text-blue-400">API Gateway</span>
            </h1>
            <p className="mt-4 text-base text-white/70">
              Menuntun setiap request ke tujuan yang tepat.
            </p>
          </div>

          <div className="mt-12 space-y-5">
            <Feature
              icon="🔐"
              title="Authentication & Authorization"
              description="JWT RS256 via JWKS, API Key, RBAC multi-tenant"
            />
            <Feature
              icon="⚡"
              title="Distributed Rate Limiting"
              description="Sliding window atomic di Redis, per IP/user/tenant"
            />
            <Feature
              icon="🔄"
              title="Idempotency Guard"
              description="Cegah duplikasi transaksi dengan distributed lock"
            />
            <Feature
              icon="🛡️"
              title="Circuit Breaker"
              description="Isolasi kegagalan upstream + fallback response"
            />
            <Feature
              icon="📊"
              title="Full Observability"
              description="Metrics, distributed tracing, structured logs"
            />
          </div>
        </div>

        <blockquote className="relative mt-12 max-w-md rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <p className="text-sm italic text-white/80">
            &ldquo;Menuntun setiap request ke tujuan yang tepat.&rdquo;
          </p>
          <footer className="mt-3 text-xs text-white/50">
            — 道しるべ (Michishirube)
          </footer>
        </blockquote>
      </aside>

      <main className="flex items-center justify-center bg-background p-6 lg:p-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <span className="text-3xl">⛩️</span>
            <div className="flex flex-col leading-none">
              <span className="text-lg font-semibold">Michishirube</span>
              <span className="text-xs text-muted-foreground">道しるべ</span>
            </div>
          </div>

          <LoginForm returnTo={returnTo} />

          <p className="mt-8 text-center text-xs text-muted-foreground">
            © 2026 Michishirube · v0.1.0
          </p>
        </div>
      </main>
    </div>
  );
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-lg">
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-medium">{title}</h3>
        <p className="mt-0.5 text-xs text-white/60">{description}</p>
      </div>
    </div>
  );
}
