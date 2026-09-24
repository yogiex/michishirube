'use client';

import { toast } from 'sonner';
import { mapApiError, type ErrorActionHandlers } from '@/lib/api/error-mapper';

export function showErrorToast(error: unknown, handlers: ErrorActionHandlers = {}): void {
  const mapped = mapApiError(error, handlers);

  if (mapped.action === 'retry' && handlers.onRetry) {
    toast.error(mapped.title, {
      description: mapped.message,
      action: { label: 'Coba lagi', onClick: handlers.onRetry },
    });
    return;
  }

  if (mapped.action === 'login' && handlers.onLogin) {
    toast.error(mapped.title, {
      description: mapped.message,
      action: { label: 'Masuk', onClick: handlers.onLogin },
    });
    return;
  }

  toast.error(mapped.title, { description: mapped.message });
}
