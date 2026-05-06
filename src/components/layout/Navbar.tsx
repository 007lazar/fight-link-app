'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Menu, Sun, Moon } from 'lucide-react';

import type { UserSession } from '@/lib/auth';
import { logoutAction } from '@/features/auth/actions/auth';
import { Button, buttonVariants } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
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
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const isDark = mounted ? theme === 'dark' : true;

  return (
    <nav className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-md">
      {/* 3-column grid: logo | center nav | right actions */}
      <div className="mx-auto flex items-center justify-between px-4 h-16 md:grid md:grid-cols-3">

        {/* Col 1: Logo */}
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

        {/* Col 2: Desktop nav */}
        <div className="hidden md:flex items-center justify-center gap-1">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className={buttonVariants({ variant: 'ghost' })}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* Col 3: Right actions */}
        <div className="flex items-center justify-end gap-2">
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
            onClick={() => setSheetOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </Button>
        </div>
      </div>

      {/* Mobile navigation — Sheet slides in from right */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right" className="w-72 p-0 flex flex-col">
          <SheetTitle className="sr-only">Navigation menu</SheetTitle>

          {/* Header */}
          <div className="flex items-center px-4 h-16 border-b border-border">
            <Link href="/" onClick={() => setSheetOpen(false)}>
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
          </div>

          {/* Nav links */}
          <div className="flex flex-col gap-1 p-4 flex-1">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setSheetOpen(false)}
                className={cn(buttonVariants({ variant: 'ghost' }), 'justify-start')}
              >
                {l.label}
              </Link>
            ))}
            {user && (
              <Link
                href="/profile"
                onClick={() => setSheetOpen(false)}
                className={cn(buttonVariants({ variant: 'ghost' }), 'justify-start')}
              >
                Profile
              </Link>
            )}
          </div>

          {/* Auth at bottom */}
          <div className="p-4 border-t border-border">
            {user ? (
              <form action={logoutAction}>
                <Button type="submit" className="w-full">Logout</Button>
              </form>
            ) : (
              <Link
                href="/login"
                onClick={() => setSheetOpen(false)}
                className={cn(buttonVariants(), 'w-full justify-center')}
              >
                Login
              </Link>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default Navbar;
