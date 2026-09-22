'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus, Search } from 'lucide-react';
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
import { mockTenants } from '@/lib/mock-data';
import { formatNumber } from '@/lib/utils';

const tierColors = {
  free: 'secondary',
  pro: 'default',
  enterprise: 'outline',
} as const;

const statusConfig = {
  active: { color: 'bg-green-500', label: 'Active' },
  suspended: { color: 'bg-yellow-500', label: 'Suspended' },
  inactive: { color: 'bg-gray-400', label: 'Inactive' },
};

export default function TenantsPage() {
  const [search, setSearch] = useState('');

  const { data: tenants = [], isLoading } = useQuery({
    queryKey: ['tenants'],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 300));
      return mockTenants;
    },
  });

  const filtered = tenants.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.slug.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Tenants</h2>
          <p className="text-sm text-muted-foreground">
            Kelola tenant dan tier mereka
          </p>
        </div>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          New Tenant
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search tenants..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tenant</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Requests</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((t) => {
                  const status = statusConfig[t.status];
                  return (
                    <TableRow key={t.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{t.name}</p>
                          <p className="text-xs text-muted-foreground font-mono">
                            {t.slug}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={tierColors[t.tier]}>{t.tier}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className={`h-2 w-2 rounded-full ${status.color}`} />
                          <span className="text-xs">{status.label}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-mono text-xs">
                        {formatNumber(t.requests)}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
