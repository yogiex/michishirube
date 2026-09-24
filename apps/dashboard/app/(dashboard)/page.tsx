import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { cookies } from 'next/headers';
import { OverviewContent, overviewQueryKey } from '@/components/dashboard/overview-content';
import { getOverview } from '@/lib/api/endpoints/overview';
import { shouldRetryQuery } from '@/lib/query-policy';

export default async function OverviewPage() {
  const cookieHeader = (await cookies()).toString();
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: shouldRetryQuery, staleTime: 30_000 } },
  });

  await queryClient.prefetchQuery({
    queryKey: overviewQueryKey,
    queryFn: async ({ signal }) => {
      const result = await getOverview({
        signal,
        ...(cookieHeader ? { headers: { cookie: cookieHeader } } : {}),
      });
      if (!result.ok) throw result.error;
      return result.data;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <OverviewContent />
    </HydrationBoundary>
  );
}
