'use client';

import { useEffect, useState } from 'react';
import { Sidebar } from './sidebar';
import { Topbar } from './topbar';

interface ShellProps {
  children: React.ReactNode;
  title?: string;
}

export function Shell({ children, title }: ShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!sidebarOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setSidebarOpen(false);
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [sidebarOpen]);

  return (
    <div className="flex h-screen overflow-hidden bg-muted/30">
      <div className="hidden lg:flex lg:shrink-0">
        <Sidebar />
      </div>

      {sidebarOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 cursor-default bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close navigation overlay"
          />
          <div
            id="dashboard-navigation"
            className="fixed inset-y-0 left-0 z-50 lg:hidden animate-in-up"
            role="dialog"
            aria-modal="true"
            aria-label="Dashboard navigation"
          >
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </>
      )}

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <a
          href="#main-content"
          className="sr-only z-[60] bg-background px-4 py-2 text-sm font-medium text-foreground focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
        >
          Skip to main content
        </a>
        <Topbar
          onMenuClick={() => setSidebarOpen(true)}
          navigationOpen={sidebarOpen}
          title={title}
        />
        <main id="main-content" tabIndex={-1} className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
