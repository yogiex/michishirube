'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { useState } from 'react';
import { ResilienceProvider } from '@/components/resilience/resilience-provider';
import { QUERY_STALE_TIME_MS, shouldRetryQuery } from '@/lib/query-policy';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: QUERY_STALE_TIME_MS,
            refetchOnWindowFocus: false,
            retry: shouldRetryQuery,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem storageKey="dashboard-theme">
        <NuqsAdapter>
          <ResilienceProvider>{children}</ResilienceProvider>
        </NuqsAdapter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
