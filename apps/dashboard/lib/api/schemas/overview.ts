import { z } from 'zod';
import { MetricsSnapshotSchema as SharedMetricsSnapshotSchema, MetricPointSchema } from './metrics';

const HttpMethodSchema = z.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'ALL']);

export const MetricsSnapshotSchema = SharedMetricsSnapshotSchema;
export { MetricPointSchema };

export const ServiceHealthSchema = z.object({
  name: z.string().min(1).max(128),
  status: z.enum(['healthy', 'degraded', 'down']),
  latencyMs: z.number().int().nonnegative().nullable(),
});

export const AuditEntrySchema = z.object({
  id: z.string().min(1),
  timestamp: z.iso.datetime(),
  actor: z.string().min(1).max(128),
  action: z.string().min(1).max(128),
  target: z.string().min(1).max(256),
  status: z.enum(['success', 'warning', 'error']),
  ip: z.string().optional(),
  details: z.record(z.string(), z.unknown()).optional(),
});

export const OverviewTopRouteSchema = z.object({
  path: z.string().min(1).max(500),
  method: HttpMethodSchema,
  requests: z.number().int().nonnegative(),
});

export const OverviewSchema = z.object({
  metrics: MetricsSnapshotSchema,
  health: z.array(ServiceHealthSchema),
  activity: z.array(AuditEntrySchema),
  topRoutes: z.array(OverviewTopRouteSchema),
});

export type Overview = z.infer<typeof OverviewSchema>;
