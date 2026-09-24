'use client';

import { Component, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';

interface FeatureErrorBoundaryProps {
  readonly children: ReactNode;
  readonly fallback?: (reset: () => void) => ReactNode;
}

interface FeatureErrorBoundaryState {
  readonly hasError: boolean;
}

const DEFAULT_FALLBACK = (reset: () => void) => (
  <div
    className="flex min-h-64 flex-col items-center justify-center gap-4 p-8 text-center"
    role="alert"
  >
    <div>
      <h2 className="text-lg font-semibold">Fitur tidak dapat dimuat</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Terjadi masalah pada bagian ini. Coba muat ulang fitur.
      </p>
    </div>
    <Button type="button" onClick={reset}>
      Coba lagi
    </Button>
  </div>
);

export class FeatureErrorBoundary extends Component<
  FeatureErrorBoundaryProps,
  FeatureErrorBoundaryState
> {
  state: FeatureErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): FeatureErrorBoundaryState {
    return { hasError: true };
  }

  private readonly reset = (): void => {
    this.setState({ hasError: false });
  };

  render(): ReactNode {
    if (!this.state.hasError) return this.props.children;

    const fallback = this.props.fallback ?? DEFAULT_FALLBACK;
    return fallback(this.reset);
  }
}
