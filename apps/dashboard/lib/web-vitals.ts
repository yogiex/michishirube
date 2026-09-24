export type WebVitalName = 'CLS' | 'FCP' | 'LCP';

export interface WebVitalMetric {
  readonly name: WebVitalName;
  readonly value: number;
  readonly id: string;
  readonly navigationType: string;
}

export const WEB_VITALS_ENDPOINT = '/api/web-vitals';

export function serializeWebVital(metric: WebVitalMetric): string {
  return JSON.stringify(metric);
}

export function reportWebVital(
  metric: WebVitalMetric,
  send: (endpoint: string, body: Blob) => boolean,
): boolean {
  return send(
    WEB_VITALS_ENDPOINT,
    new Blob([serializeWebVital(metric)], { type: 'application/json' }),
  );
}
