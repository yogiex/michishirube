'use client';

import { useEffect, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CopyButton } from '@/components/resilience/copy-button';

export default function DashboardError({
  error,
  reset,
}: {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
}) {
  const [requestId, setRequestId] = useState<string | null>(null);

  useEffect(() => {
    setRequestId(new URLSearchParams(window.location.search).get('requestId'));
  }, []);

  const supportDetails = [error.digest, requestId].filter(Boolean).join(' · ');

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-6">
      <div
        className="w-full max-w-lg rounded-xl border bg-background p-8 text-center shadow-sm"
        role="alert"
      >
        <h1 className="text-xl font-semibold">Halaman tidak dapat dimuat</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Data dashboard gagal dimuat. Coba lagi atau hubungi administrator jika masalah berlanjut.
        </p>
        {supportDetails && (
          <div className="mt-4 flex items-center justify-between gap-3 rounded-md bg-muted p-3 text-left">
            <p className="min-w-0 truncate font-mono text-xs text-muted-foreground">
              {supportDetails}
            </p>
            <CopyButton value={supportDetails} label="Salin detail" />
          </div>
        )}
        <Button className="mt-6" onClick={reset}>
          <RefreshCw className="mr-2 h-4 w-4" aria-hidden="true" />
          Coba lagi
        </Button>
      </div>
    </div>
  );
}
