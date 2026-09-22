'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Plus, Search, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { mockRoutes } from '@/lib/mock-data';
import type { Route } from '@/types';

export default function RoutesPage() {
  const [search, setSearch] = useState('');

  const { data: routes = [], isLoading } = useQuery({
    queryKey: ['routes'],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 300));
      return mockRoutes;
    },
  });

  const filtered = routes.filter(
    (r) =>
      r.path.toLowerCase().includes(search.toLowerCase()) ||
      r.upstream.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Routes</h2>
          <p className="text-sm text-muted-foreground">
            Kelola routing request ke upstream service
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Reload Config
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Route
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search routes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Path</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Upstream</TableHead>
                <TableHead>Auth</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Tidak ada route ditemukan
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((route) => (
                  <RouteRow key={route.id} route={route} />
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function RouteRow({ route }: { route: Route }) {
  return (
    <TableRow>
      <TableCell className="font-mono text-xs">{route.path}</TableCell>
      <TableCell>
        <Badge variant="outline" className="font-mono">
          {route.method}
        </Badge>
      </TableCell>
      <TableCell className="text-sm">{route.upstream}</TableCell>
      <TableCell>
        {route.requireAuth ? (
          <Badge variant="secondary">Required</Badge>
        ) : (
          <span className="text-xs text-muted-foreground">Public</span>
        )}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <span
            className={`h-2 w-2 rounded-full ${
              route.enabled ? 'bg-green-500' : 'bg-gray-400'
            }`}
          />
          <span className="text-xs">{route.enabled ? 'Enabled' : 'Disabled'}</span>
        </div>
      </TableCell>
      <TableCell className="text-right">
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/routes/${route.id}`}>Edit</Link>
        </Button>
      </TableCell>
    </TableRow>
  );
}
