'use client';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Activity } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { KpiStrip } from '@/components/dashboard/kpi-strip';
import { ErrorState } from '@/components/resilience/error-state';
import { showErrorToast } from '@/components/resilience/error-toast';
import { getOverview } from '@/lib/api/endpoints/overview';
import { formatNumber, relativeTime } from '@/lib/utils';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export const overviewQueryKey = ['overview'] as const;

export function OverviewContent() {
  const query = useQuery({
    queryKey: overviewQueryKey,
    queryFn: async ({ signal }) => {
      const result = await getOverview({ signal });
      if (!result.ok) throw result.error;
      return result.data;
    },
  });

  useEffect(() => {
    if (!query.error) return;
    showErrorToast(query.error, { onRetry: () => void query.refetch() });
  }, [query.error, query.refetch]);

  if (query.isPending) return <OverviewSkeleton />;
  if (query.isError) return <ErrorState error={query.error} onRetry={() => void query.refetch()} />;

  const { metrics, health, activity, topRoutes } = query.data;
  const maxRequests = Math.max(...topRoutes.map((route) => route.requests), 1);

  return (
    <div className="space-y-6">
      <KpiStrip metrics={metrics} />
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Requests (24 jam)</CardTitle>
            <CardDescription>Total request per jam</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={metrics.series.map((point) => ({ ...point }))}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="timestamp" fontSize={11} stroke="hsl(var(--muted-foreground))" />
                <YAxis fontSize={11} stroke="hsl(var(--muted-foreground))" />
                <Tooltip />
                <Line type="monotone" dataKey="requests" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top Routes</CardTitle>
            <CardDescription>Berdasarkan jumlah request</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {topRoutes.map((route) => (
                <li key={`${route.method} ${route.path}`} className="space-y-1.5">
                  <div className="flex items-center justify-between gap-3 text-xs">
                    <span className="truncate font-mono">{route.method} {route.path}</span>
                    <span>{formatNumber(route.requests)}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className="h-full bg-primary" style={{ width: `${(route.requests / maxRequests) * 100}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Service Health</CardTitle>
            <CardDescription>Status upstream dan dependency</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {health.map((service) => (
                <li key={service.name} className="flex items-center justify-between gap-4 text-sm">
                  <span className="font-medium">{service.name}</span>
                  <span className="text-xs text-muted-foreground">{service.status} · {service.latencyMs} ms</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Perubahan konfigurasi terakhir</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {activity.map((entry) => (
                <li key={entry.id} className="flex items-start gap-3 text-sm">
                  <Activity className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                  <div>
                    <p><span className="text-primary">{entry.actor}</span> {entry.action} {entry.target}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{relativeTime(entry.timestamp)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function OverviewSkeleton() {
  return (
    <div className="space-y-6" aria-label="Memuat overview" role="status">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index}><CardContent className="p-5"><Skeleton className="h-3 w-20" /><Skeleton className="mt-2 h-8 w-24" /></CardContent></Card>
        ))}
      </div>
      <Skeleton className="h-80" />
    </div>
  );
}
