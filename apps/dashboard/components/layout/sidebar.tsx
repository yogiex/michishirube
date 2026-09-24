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

const navGroups = [
  {
    label: 'Workspace',
    items: [{ href: '/', label: 'Overview', icon: LayoutDashboard }],
  },
  {
    label: 'Manage',
    items: [
      { href: '/routes', label: 'Routes', icon: RouteIcon },
      { href: '/tenants', label: 'Tenants', icon: Building2 },
      { href: '/api-keys', label: 'API Keys', icon: KeyRound },
      { href: '/config', label: 'Config', icon: Cog },
    ],
  },
  {
    label: 'Observe',
    items: [
      { href: '/metrics', label: 'Metrics', icon: BarChart3 },
      { href: '/audit', label: 'Audit Log', icon: ScrollText },
    ],
  },
  {
    label: 'System',
    items: [{ href: '/settings', label: 'Settings', icon: SettingsIcon }],
  },
] as const;

interface SidebarProps {
  onClose?: () => void;
}

export function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-[240px] flex-col border-r bg-background" aria-label="Dashboard">
      <div className="flex h-14 shrink-0 items-center justify-between border-b px-4">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="text-2xl">⛩️</span>
          <div className="flex flex-col leading-none">
            <span className="text-sm font-semibold">Michishirube</span>
            <span className="text-[10px] text-muted-foreground tracking-wider">道しるべ</span>
          </div>
        </Link>
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="lg:hidden"
            aria-label="Close navigation"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </Button>
        )}
      </div>

      <nav aria-label="Dashboard navigation" className="flex-1 overflow-y-auto px-3 py-4">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-5 last:mb-0">
            <h2 className="mb-1 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {group.label}
            </h2>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const isActive =
                  item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
                const Icon = item.icon;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      aria-current={isActive ? 'page' : undefined}
                      className={cn(
                        'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
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
