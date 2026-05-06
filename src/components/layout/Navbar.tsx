'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Menu, X, Sun, Moon } from 'lucide-react';

import type { UserSession } from '@/lib/auth';
import { logoutAction } from '@/features/auth/actions/auth';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type NavBarProps = { user: UserSession };

const navLinks = [
  { href: '/gyms', label: 'Gyms' },
  { href: '/events', label: 'Events' },
  { href: '/about', label: 'About' },
];

const Navbar = ({ user }: NavBarProps) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const isDark = mounted ? theme === 'dark' : true;

  return (
    <>
      <nav className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-md">
        {/* 3-column grid: logo | center nav | right actions */}
        <div className="mx-auto flex items-center justify-between px-4 h-16 md:grid md:grid-cols-3">

          {/* Col 1: Logo — always left */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/fight_link_navbar.png"
                width={1536}
                height={1024}
                priority
                sizes="(max-width: 768px) 120px, 140px"
                style={{ height: '40px', width: 'auto' }}
                className="object-contain drop-shadow-sm transition-transform duration-300 hover:scale-105"
                alt="Fight Link"
              />
            </Link>
          </div>

          {/* Col 2: Desktop nav — centered */}
          <div className="hidden md:flex items-center justify-center gap-1">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className={buttonVariants({ variant: 'ghost' })}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Col 3: Right actions */}
          <div className="flex items-center justify-end gap-2">
            {/* Desktop: profile email + logout / login */}
            {user && (
              <Link
                href="/profile"
                className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'hidden md:inline-flex max-w-40 truncate')}
              >
                {user.email}
              </Link>
            )}
            {user ? (
              <form action={logoutAction} className="hidden md:block">
                <Button type="submit" size="sm">Logout</Button>
              </form>
            ) : (
              <Link href="/login" className={cn(buttonVariants({ size: 'sm' }), 'hidden md:inline-flex')}>
                Login
              </Link>
            )}

            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              aria-label="Toggle theme"
            >
              {mounted && (isDark ? <Sun className="size-4" /> : <Moon className="size-4" />)}
            </Button>

            {/* Hamburger — mobile only */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden" aria-modal="true">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />
          {/* Panel */}
          <div className="absolute right-0 top-0 h-full w-72 bg-background border-l border-border flex flex-col">
            <div className="flex items-center justify-between px-4 h-16 border-b border-border">
              <Link href="/" onClick={() => setDrawerOpen(false)}>
                <Image
                  src="/fight_link_navbar.png"
                  width={1536}
                  height={1024}
                  sizes="120px"
                  style={{ height: '36px', width: 'auto' }}
                  className="object-contain"
                  alt="Fight Link"
                />
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close menu"
              >
                <X className="size-5" />
              </Button>
            </div>
            <div className="flex flex-col gap-1 p-4 flex-1">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setDrawerOpen(false)}
                  className={cn(buttonVariants({ variant: 'ghost' }), 'justify-start')}
                >
                  {l.label}
                </Link>
              ))}
              {user && (
                <Link
                  href="/profile"
                  onClick={() => setDrawerOpen(false)}
                  className={cn(buttonVariants({ variant: 'ghost' }), 'justify-start')}
                >
                  Profile
                </Link>
              )}
            </div>
            {/* Auth at bottom of drawer */}
            <div className="p-4 border-t border-border">
              {user ? (
                <form action={logoutAction}>
                  <Button type="submit" className="w-full">Logout</Button>
                </form>
              ) : (
                <Link href="/login" onClick={() => setDrawerOpen(false)} className={cn(buttonVariants(), 'w-full justify-center')}>
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
