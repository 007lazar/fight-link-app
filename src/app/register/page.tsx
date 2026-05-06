'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

import { registerAction } from '@/features/auth/actions/auth';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function RegisterPage() {
  const [state, action, isPending] = useActionState(registerAction, undefined);

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="flex w-full max-w-sm flex-col gap-5 rounded-xl bg-card p-6 ring-1 ring-foreground/10 shadow-2xl md:max-w-md md:p-8">
        <div className="text-center">
          <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">Create an account</h1>
          <p className="mt-1 text-sm text-muted-foreground">Join Fight Link today</p>
        </div>

        {state?.error && (
          <Alert variant="destructive">
            <AlertDescription>{state.error}</AlertDescription>
          </Alert>
        )}

        <form action={action} className="flex flex-col gap-4" id="register-form">
          <div className="space-y-1.5">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              required
              minLength={2}
              maxLength={32}
              autoComplete="name"
            />
          </div>

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
              minLength={8}
              maxLength={72}
              autoComplete="new-password"
            />
            <div className="mt-2 rounded-lg border-l-4 border-primary bg-muted/50 p-3">
              <p className="mb-2 text-xs font-medium text-foreground md:text-sm">Password requirements:</p>
              <div className="grid grid-cols-1 gap-1 text-xs text-muted-foreground md:text-sm">
                {['At least 8 characters', '1 uppercase letter', '1 lowercase letter', '1 number', '1 symbol'].map((req) => (
                  <div key={req} className="flex items-center gap-2">
                    <span className="text-primary">•</span>
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Button type="submit" className="mt-2 w-full" disabled={isPending}>
            {isPending ? <Loader2 className="size-4 animate-spin" /> : 'Register'}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
