import { describe, expect, it, vi } from 'vitest';
import { serializeWebVital, WEB_VITALS_ENDPOINT, reportWebVital } from './web-vitals';

const metric = {
  name: 'LCP',
  value: 1234.5,
  id: 'metric-1',
  navigationType: 'navigate',
} as const;

describe('web vitals reporting', () => {
  it('serializes a bounded metric payload', () => {
    expect(JSON.parse(serializeWebVital(metric))).toEqual(metric);
  });

  it('reports JSON to the fixed collection endpoint', async () => {
    const send = vi.fn<(endpoint: string, body: Blob) => boolean>(() => true);
    expect(reportWebVital(metric, send)).toBe(true);
    expect(send).toHaveBeenCalledOnce();
    const [endpoint, body] = send.mock.calls[0] ?? [];
    expect(endpoint).toBe(WEB_VITALS_ENDPOINT);
    expect(body).toBeInstanceOf(Blob);
    expect(await body.text()).toBe(serializeWebVital(metric));
  });
});
