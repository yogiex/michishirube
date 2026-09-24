'use client';

import { AlertTriangle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface DegradationState {
  readonly message: string;
  readonly affectedServices?: readonly string[];
}

interface DegradationBannerProps {
  readonly state: DegradationState | null;
  readonly onDismiss?: () => void;
}

export function DegradationBanner({ state, onDismiss }: DegradationBannerProps) {
  if (!state) return null;

  const services = state.affectedServices?.join(', ');

  return (
    <div
      className="flex items-center gap-3 border-b border-warning/30 bg-warning/10 px-4 py-2 text-sm text-foreground"
      role="status"
      aria-live="polite"
    >
      <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600" aria-hidden="true" />
      <div className="min-w-0 flex-1">
        <p className="font-medium">Fitur tertentu mungkin tidak tersedia.</p>
        <p>{services ? `${state.message} (${services})` : state.message}</p>
      </div>
      {onDismiss && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0"
          onClick={onDismiss}
          aria-label="Tutup peringatan degradasi"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </Button>
      )}
    </div>
  );
}
