'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

import { loginAction } from '@/features/auth/actions/auth';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  const [state, action, isPending] = useActionState(loginAction, undefined);

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="flex w-full max-w-sm flex-col gap-5 rounded-xl bg-card p-6 ring-1 ring-foreground/10 shadow-2xl md:max-w-md md:p-8">
        <div className="text-center">
          <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">Welcome back</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to your Fight Link account</p>
        </div>

        {state?.error && (
          <Alert variant="destructive">
            <AlertDescription>{state.error}</AlertDescription>
          </Alert>
        )}

        <form action={action} className="flex flex-col gap-4" id="login-form">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              maxLength={254}
              autoComplete="email"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              maxLength={72}
              autoComplete="current-password"
            />
          </div>

          <Button type="submit" className="mt-2 w-full" disabled={isPending}>
            {isPending ? <Loader2 className="size-4 animate-spin" /> : 'Sign In'}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="font-medium text-primary hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
