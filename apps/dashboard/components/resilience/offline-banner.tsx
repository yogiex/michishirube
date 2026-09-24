'use client';

import { CloudOff } from 'lucide-react';
import { useOnlineStatus } from '@/hooks/use-online-status';

export function OfflineBanner() {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      className="flex min-h-10 items-center justify-center gap-2 bg-amber-500 px-4 py-2 text-sm font-medium text-white"
      role="status"
      aria-live="polite"
    >
      <CloudOff className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span>Anda sedang offline. Perubahan belum dapat disinkronkan.</span>
    </div>
  );
}
