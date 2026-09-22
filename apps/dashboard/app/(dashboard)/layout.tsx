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
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const title = pageTitles[pathname] ?? 'Michishirube';

  return <Shell title={title}>{children}</Shell>;
}
