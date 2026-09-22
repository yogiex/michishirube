'use client';

import { useQuery } from '@tanstack/react-query';
import {
  Activity,
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  Clock,
  TrendingUp,
  Users,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  mockMetrics,
  mockHealth,
  mockActivity,
  mockRoutes,
  generateMetricSeries,
} from '@/lib/mock-data';
import { formatNumber, relativeTime } from '@/lib/utils';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

export default function OverviewPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['overview'],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 300));
      return {
        metrics: mockMetrics,
        health: mockHealth,
        activity: mockActivity,
        routes: mockRoutes,
        series: generateMetricSeries(24),
      };
    },
  });

  if (isLoading || !data) {
    return <OverviewSkeleton />;
  }

  const { metrics, health, activity, routes, series } = data;
  const topRoutes = routes
    .slice(0, 5)
    .map((r, i) => ({
      path: `${r.method} ${r.path}`,
      count: 32 - i * 4,
    }));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Requests/min"
          value={formatNumber(metrics.requestsPerMin)}
          delta={metrics.requestsDelta}
          icon={TrendingUp}
        />
        <StatCard
          title="Error Rate"
          value={`${metrics.errorRate}%`}
          delta={metrics.errorDelta}
          icon={AlertTriangle}
          deltaInvert
        />
        <StatCard
          title="p95 Latency"
          value={`${metrics.p95Latency} ms`}
          delta={metrics.latencyDelta}
          icon={Clock}
          deltaInvert
        />
        <StatCard
          title="Active Tenants"
          value={`${metrics.activeTenants}/${metrics.totalTenants}`}
          icon={Users}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Requests (24 jam)</CardTitle>
            <CardDescription>Total request per jam</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={series}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="time" fontSize={11} stroke="hsl(var(--muted-foreground))" />
                <YAxis fontSize={11} stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="requests"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={false}
                />
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
              {topRoutes.map((r) => (
                <li key={r.path} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono truncate">{r.path}</span>
                    <span className="text-muted-foreground">{r.count}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{ width: `${r.count}%` }}
                    />
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
            <CardDescription>Status upstream & dependency</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {health.map((s) => (
                <li key={s.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <StatusDot status={s.status} />
                    <span className="font-medium">{s.name}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="font-mono">
                      {s.status === 'down' ? '—' : `${s.latencyMs} ms`}
                    </span>
                    <span className="font-mono">{s.endpoint}</span>
                  </div>
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
              {activity.map((a) => (
                <li key={a.id} className="flex items-start justify-between text-sm">
                  <div className="flex items-start gap-3">
                    <Activity className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <div>
                      <p className="font-medium">
                        <span className="text-primary">{a.actor}</span>{' '}
                        <span className="text-muted-foreground">{a.action}</span>{' '}
                        <span>{a.target}</span>
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {relativeTime(a.timestamp)}
                      </p>
                    </div>
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

function StatCard({
  title,
  value,
  delta,
  deltaInvert,
  icon: Icon,
}: {
  title: string;
  value: string;
  delta?: number;
  deltaInvert?: boolean;
  icon: React.ComponentType<{ className?: string }>;
}) {
  const isPositive = delta !== undefined && delta > 0;
  const isGood = deltaInvert ? !isPositive : isPositive;

  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">{title}</p>
            <p className="mt-1.5 text-2xl font-semibold tracking-tight">{value}</p>
            {delta !== undefined && (
              <div
                className={`mt-1.5 flex items-center gap-1 text-xs ${
                  isGood ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {isPositive ? (
                  <ArrowUp className="h-3 w-3" />
                ) : (
                  <ArrowDown className="h-3 w-3" />
                )}
                <span>{Math.abs(delta)}%</span>
                <span className="text-muted-foreground">vs kemarin</span>
              </div>
            )}
          </div>
          <div className="rounded-lg bg-primary/10 p-2">
            <Icon className="h-4 w-4 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StatusDot({ status }: { status: 'healthy' | 'degraded' | 'down' }) {
  const color =
    status === 'healthy'
      ? 'bg-green-500'
      : status === 'degraded'
        ? 'bg-yellow-500'
        : 'bg-red-500';
  return <span className={`h-2 w-2 shrink-0 rounded-full ${color}`} />;
}

function OverviewSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-5">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="mt-2 h-8 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <Skeleton className="h-80 lg:col-span-2" />
        <Skeleton className="h-80" />
      </div>
    </div>
  );
}
