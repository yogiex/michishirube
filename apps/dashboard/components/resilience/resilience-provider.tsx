'use client';

import { type ReactNode } from 'react';
import { FeatureErrorBoundary } from '@/components/resilience/feature-error-boundary';
import { OfflineBanner } from '@/components/resilience/offline-banner';

export function ResilienceProvider({ children }: { readonly children: ReactNode }) {
  return (
    <FeatureErrorBoundary>
      <OfflineBanner />
      {children}
    </FeatureErrorBoundary>
  );
}
