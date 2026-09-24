'use client';

import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CopyButton } from '@/components/resilience/copy-button';
import { ApiError } from '@/lib/api/client';

interface ErrorStateProps {
  readonly error: unknown;
  readonly onRetry: () => void;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  const requestId = error instanceof ApiError ? error.problem?.requestId : undefined;
  const digest = error instanceof Error && 'digest' in error ? error.digest : undefined;
  const supportId = requestId ?? (typeof digest === 'string' ? digest : undefined);

  return (
    <div className="flex min-h-80 flex-col items-center justify-center gap-4 p-8 text-center" role="alert">
      <AlertCircle className="h-8 w-8 text-destructive" aria-hidden="true" />
      <div>
        <h2 className="text-lg font-semibold">Data overview tidak dapat dimuat</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Periksa koneksi Anda lalu coba muat ulang data.
        </p>
      </div>
      {supportId && (
        <div className="flex max-w-full items-center justify-between gap-3 rounded-md bg-muted p-3 text-left">
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">Request ID</p>
            <p className="truncate font-mono text-xs">{supportId}</p>
          </div>
          <CopyButton value={supportId} label="Salin" />
        </div>
      )}
      <Button type="button" onClick={onRetry}>
        <RefreshCw className="mr-2 h-4 w-4" aria-hidden="true" />
        Coba lagi
      </Button>
    </div>
  );
}
