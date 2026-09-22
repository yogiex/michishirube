'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Route as RouteIcon,
  Building2,
  KeyRound,
  Settings as SettingsIcon,
  BarChart3,
  ScrollText,
  Cog,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/', label: 'Overview', icon: LayoutDashboard },
  { href: '/routes', label: 'Routes', icon: RouteIcon },
  { href: '/tenants', label: 'Tenants', icon: Building2 },
  { href: '/api-keys', label: 'API Keys', icon: KeyRound },
  { href: '/config', label: 'Config', icon: Cog },
  { href: '/metrics', label: 'Metrics', icon: BarChart3 },
  { href: '/audit', label: 'Audit Log', icon: ScrollText },
  { href: '/settings', label: 'Settings', icon: SettingsIcon },
];

interface SidebarProps {
  onClose?: () => void;
}

export function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 flex-col border-r bg-background">
      <div className="flex h-16 items-center justify-between border-b px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="text-2xl">⛩️</span>
          <div className="flex flex-col leading-none">
            <span className="text-sm font-semibold">Michishirube</span>
            <span className="text-[10px] text-muted-foreground tracking-wider">
              道しるべ
            </span>
          </div>
        </Link>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto p-3">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t p-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>v0.1.0</span>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span>Healthy</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
