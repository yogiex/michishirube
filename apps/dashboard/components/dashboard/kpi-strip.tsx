'use client';

import { AlertTriangle, Clock, TrendingUp, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { MetricsSnapshot } from '@/lib/api/endpoints/metrics';
import { formatNumber } from '@/lib/utils';

export function KpiStrip({ metrics }: { readonly metrics: MetricsSnapshot }) {
  const items = [
    { title: 'Requests/min', value: formatNumber(metrics.requestsPerMin), icon: TrendingUp },
    { title: 'Error Rate', value: `${metrics.errorRate}%`, icon: AlertTriangle },
    { title: 'p95 Latency', value: `${metrics.p95Latency} ms`, icon: Clock },
    { title: 'Active Tenants', value: formatNumber(metrics.activeTenants), icon: Users },
  ] as const;

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Key performance indicators">
      {items.map(({ title, value, icon: Icon }) => (
        <Card key={title}>
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">{title}</p>
                <p className="mt-1.5 text-2xl font-semibold tracking-tight">{value}</p>
              </div>
              <div className="rounded-lg bg-primary/10 p-2">
                <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
