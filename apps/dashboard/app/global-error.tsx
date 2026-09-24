'use client';

import { Button } from '@/components/ui/button';
import { CopyButton } from '@/components/resilience/copy-button';

export default function GlobalError({
  error,
  reset,
}: {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
}) {
  const detail = error.digest ?? 'Digest tidak tersedia';

  return (
    <html lang="id">
      <body className="flex min-h-screen items-center justify-center bg-white p-6 text-slate-950">
        <main
          className="w-full max-w-lg rounded-xl border border-slate-200 p-8 text-center shadow-sm"
          role="alert"
        >
          <h1 className="text-xl font-semibold">Terjadi kesalahan aplikasi</h1>
          <p className="mt-2 text-sm text-slate-600">
            Dashboard tidak dapat dilanjutkan. Coba lagi atau hubungi administrator.
          </p>
          <div className="mt-4 flex items-center justify-between gap-3 rounded-md bg-slate-100 p-3 text-left">
            <p className="min-w-0 truncate font-mono text-xs text-slate-600">Ref: {detail}</p>
            <CopyButton value={detail} label="Salin referensi" />
          </div>
          <Button className="mt-6" onClick={reset}>
            Coba lagi
          </Button>
        </main>
      </body>
    </html>
  );
}
