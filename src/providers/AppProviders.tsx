'use client';

import { type ReactNode } from 'react';
import Navbar from '@/components/layout/Navbar';
import type { UserSession } from '@/lib/auth';
import { ThemeProvider } from 'next-themes';

type Props = {
  children: ReactNode;
  user: UserSession;
};

export function AppProviders({ children, user }: Props) {
  return (
    <ThemeProvider attribute={['class', 'data-theme']} defaultTheme="dark" enableSystem={false}>
      <div className="min-h-screen transition-colors duration-300 text-foreground" style={{ background: 'var(--page-bg)' }}>
        <Navbar user={user} />
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
      </div>
    </ThemeProvider>
  );
}
