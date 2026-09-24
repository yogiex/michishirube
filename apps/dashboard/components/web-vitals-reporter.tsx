'use client';

import { useEffect } from 'react';
import { reportWebVital, type WebVitalMetric, type WebVitalName } from '@/lib/web-vitals';

interface LayoutShiftEntry extends PerformanceEntry {
  readonly hadRecentInput: boolean;
  readonly value: number;
}

interface VitalObserverProps {
  readonly type: 'largest-contentful-paint' | 'layout-shift';
  readonly onMetric: (metric: WebVitalMetric) => void;
  readonly isFinal?: (entry: PerformanceEntry) => boolean;
}

function VitalObserver({ type, onMetric, isFinal }: VitalObserverProps) {
  useEffect(() => {
    if (typeof PerformanceObserver === 'undefined') return;

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const entry = entries.find((item) => isFinal?.(item) ?? true);
      if (!entry) return;

      if (type === 'layout-shift') {
        const value = entries.reduce((total, item) => {
          const shift = item as LayoutShiftEntry;
          return shift.hadRecentInput ? total : total + shift.value;
        }, 0);
        onMetric({ name: 'CLS', value, id: 'layout-shift', navigationType: 'navigate' });
        return;
      }

      onMetric({
        name: 'LCP',
        value: entry.startTime,
        id: entry.toString(),
        navigationType: 'navigate',
      });
    });

    observer.observe({ type, buffered: true });
    return () => observer.disconnect();
  }, [isFinal, onMetric, type]);

  return null;
}

export function WebVitalsReporter() {
  useEffect(() => {
    let lastPaint: WebVitalMetric | undefined;
    const send = (metric: WebVitalMetric): void => {
      if ('sendBeacon' in navigator) {
        reportWebVital(metric, navigator.sendBeacon.bind(navigator));
        return;
      }
      void fetch('/api/web-vitals', {
        method: 'POST',
        body: JSON.stringify(metric),
        headers: { 'content-type': 'application/json' },
        keepalive: true,
      });
    };

    const observer = new PerformanceObserver((list) => {
      const entry = list.getEntries().findLast((item) => item.name === 'first-contentful-paint');
      if (!entry) return;
      lastPaint = {
        name: 'FCP',
        value: entry.startTime,
        id: entry.name,
        navigationType: 'navigate',
      };
      observer.disconnect();
    });
    observer.observe({ type: 'paint', buffered: true });

    return () => {
      observer.disconnect();
      if (lastPaint) send(lastPaint);
    };
  }, []);

  const onMetric = (name: WebVitalName) => {
    return (metric: WebVitalMetric): void => {
      if (name === 'CLS' && metric.value === 0) return;
      void fetch('/api/web-vitals', {
        method: 'POST',
        body: JSON.stringify(metric),
        headers: { 'content-type': 'application/json' },
        keepalive: true,
      });
    };
  };

  return (
    <>
      <VitalObserver type="largest-contentful-paint" onMetric={onMetric('LCP')} />
      <VitalObserver type="layout-shift" onMetric={onMetric('CLS')} />
    </>
  );
}
