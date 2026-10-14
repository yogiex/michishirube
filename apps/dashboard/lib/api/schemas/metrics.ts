import { z } from 'zod';

export const MetricPointSchema = z.object({
  timestamp: z.string(),
  requests: z.number().int().nonnegative(),
  errors: z.number().int().nonnegative(),
  p95: z.number().nonnegative(),
});

export const MetricsSnapshotSchema = z.object({
  requestsPerMin: z.number().int().nonnegative(),
  errorRate: z.number().nonnegative(),
  p95Latency: z.number().nonnegative(),
  activeTenants: z.number().int().nonnegative(),
  series: z.array(MetricPointSchema),
});

export type MetricsSnapshot = z.infer<typeof MetricsSnapshotSchema>;
export type MetricPoint = z.infer<typeof MetricPointSchema>;
