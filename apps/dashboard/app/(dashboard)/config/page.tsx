'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Save, Download } from 'lucide-react';

export default function ConfigPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Config</h2>
          <p className="text-sm text-muted-foreground">
            Edit konfigurasi YAML gateway
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Reload
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-sm font-mono">
                config/routes.yaml
              </CardTitle>
              <CardDescription className="text-xs">
                Hot reload · auto-save
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <pre className="overflow-x-auto p-4 text-xs font-mono leading-relaxed">
{`routes:
  - id: r_001
    path: /api/v1/orders
    method: GET
    upstream: http://order-svc.internal
    enabled: true
    requireAuth: true
    rateLimit:
      limit: 100
      window: 60
    roles: [admin, user]

  - id: r_002
    path: /api/v1/orders
    method: POST
    upstream: http://order-svc.internal
    enabled: true
    requireAuth: true
    requireIdempotency: true`}
          </pre>
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground">
        Editor YAML interaktif akan ditambahkan setelah Admin API siap.
      </p>
    </div>
  );
}
