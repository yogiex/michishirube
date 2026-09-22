'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus, KeyRound, Search } from 'lucide-react';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockApiKeys, mockTenants } from '@/lib/mock-data';
import { formatNumber, relativeTime } from '@/lib/utils';
import { toast } from 'sonner';

export default function ApiKeysPage() {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [newKey, setNewKey] = useState<string | null>(null);

  const { data: keys = [], isLoading } = useQuery({
    queryKey: ['api-keys'],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 300));
      return mockApiKeys;
    },
  });

  const filtered = keys.filter((k) =>
    k.name.toLowerCase().includes(search.toLowerCase()),
  );

  function handleCreate() {
    const key = `msh_sk_${Math.random().toString(36).slice(2, 34)}`;
    setNewKey(key);
    toast.success('API key berhasil dibuat');
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">API Keys</h2>
          <p className="text-sm text-muted-foreground">
            Issue dan revoke API key untuk partner
          </p>
        </div>

        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) setNewKey(null); }}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Issue New Key
            </Button>
          </DialogTrigger>
          <DialogContent>
            {!newKey ? (
              <>
                <DialogHeader>
                  <DialogTitle>Issue New API Key</DialogTitle>
                  <DialogDescription>
                    Key hanya akan ditampilkan sekali setelah dibuat.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input placeholder="partner-acme-2026" />
                  </div>
                  <div className="space-y-2">
                    <Label>Tenant</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih tenant" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockTenants.map((t) => (
                          <SelectItem key={t.id} value={t.id}>
                            {t.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreate}>Issue Key</Button>
                </DialogFooter>
              </>
            ) : (
              <>
                <DialogHeader>
                  <DialogTitle>API Key Created</DialogTitle>
                  <DialogDescription>
                    Simpan key ini sekarang. Tidak akan ditampilkan lagi.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="flex items-center gap-2 rounded-lg border bg-muted/30 p-3">
                    <code className="flex-1 break-all text-xs font-mono">
                      {newKey}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText(newKey);
                        toast.success('Copied to clipboard');
                      }}
                    >
                      Copy
                    </Button>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={() => setOpen(false)}>
                    Saya sudah menyimpan key
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search keys..."
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
                <TableHead>Name</TableHead>
                <TableHead>Tenant</TableHead>
                <TableHead>Scopes</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Usage</TableHead>
                <TableHead className="text-right">Last Used</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((k) => (
                  <TableRow key={k.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <KeyRound className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium text-sm">{k.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm font-mono">{k.tenantId}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {k.scopes.slice(0, 2).map((s) => (
                          <Badge key={s} variant="secondary" className="text-xs">
                            {s}
                          </Badge>
                        ))}
                        {k.scopes.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{k.scopes.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={k.status === 'active' ? 'default' : 'secondary'}
                      >
                        {k.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-mono text-xs">
                      {formatNumber(k.usageCount)}
                    </TableCell>
                    <TableCell className="text-right text-xs text-muted-foreground">
                      {k.lastUsedAt ? relativeTime(k.lastUsedAt) : '—'}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
