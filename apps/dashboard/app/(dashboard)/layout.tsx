'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Shell } from '@/components/layout/shell';
import { useAuth } from '@/lib/auth';

const pageTitles: Record<string, string> = {
  '/': 'Overview',
  '/routes': 'Routes',
  '/tenants': 'Tenants',
  '/api-keys': 'API Keys',
  '/config': 'Config',
  '/metrics': 'Metrics',
  '/audit': 'Audit Log',
  '/settings': 'Settings',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const status = useAuth((state) => state.status);
  const hasRole = useAuth((state) => state.hasRole);
  const hydrate = useAuth((state) => state.hydrate);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    void hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (status === 'anonymous') router.replace('/login');
    if (status === 'authenticated' && !hasRole('admin')) void useAuth.getState().logout();
  }, [hasRole, router, status]);

  if (status !== 'authenticated' || !hasRole('admin')) return null;

  const title = pageTitles[pathname] ?? 'Michishirube';
  return <Shell title={title}>{children}</Shell>;
}
