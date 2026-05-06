'use client';

import { useActionState, useState } from 'react';
import Link from 'next/link';
import { Loader2, Dumbbell, Building2 } from 'lucide-react';

import { registerAction } from '@/features/auth/actions/auth';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Role = 'USER' | 'GYM_OWNER';

const ROLES: { value: Role; icon: React.ReactNode; title: string; description: string }[] = [
  {
    value: 'USER',
    icon: <Dumbbell className="size-6" />,
    title: 'Athlete / Hobbyist',
    description: 'Find gyms, follow events, book classes.',
  },
  {
    value: 'GYM_OWNER',
    icon: <Building2 className="size-6" />,
    title: 'Gym Owner',
    description: 'List your gym, manage members and schedule.',
  },
];

export default function RegisterPage() {
  const [state, action, isPending] = useActionState(registerAction, undefined);
  const [role, setRole] = useState<Role>('USER');

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-10">
      <div className="flex w-full max-w-md flex-col gap-6 rounded-xl bg-card p-6 ring-1 ring-foreground/10 shadow-2xl md:p-8">
        <div className="text-center">
          <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">Create an account</h1>
          <p className="mt-1 text-sm text-muted-foreground">Join FightLink today</p>
        </div>

        {state?.error && (
          <Alert variant="destructive">
            <AlertDescription>{state.error}</AlertDescription>
          </Alert>
        )}

        <form action={action} className="flex flex-col gap-5">
          {/* Role selector */}
          <div className="space-y-2">
            <Label>I am a…</Label>
            <div className="grid grid-cols-2 gap-3">
              {ROLES.map(({ value, icon, title, description }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRole(value)}
                  className={[
                    'flex flex-col items-center gap-2 rounded-lg border-2 p-4 text-center transition-colors',
                    role === value
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-border text-muted-foreground hover:border-primary/50',
                  ].join(' ')}
                >
                  {icon}
                  <span className="text-sm font-semibold leading-tight">{title}</span>
                  <span className="text-xs leading-tight opacity-80">{description}</span>
                </button>
              ))}
            </div>
            <input type="hidden" name="role" value={role} readOnly />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="name">Full name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Marko Petrovic"
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
            <ul className="mt-1.5 space-y-0.5 text-xs text-muted-foreground">
              {['8+ characters', '1 uppercase', '1 lowercase', '1 number', '1 symbol'].map((req) => (
                <li key={req} className="flex items-center gap-1.5">
                  <span className="text-primary">•</span>
                  {req}
                </li>
              ))}
            </ul>
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? <Loader2 className="size-4 animate-spin" /> : 'Create account'}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
