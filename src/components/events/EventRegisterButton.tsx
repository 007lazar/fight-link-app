'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { registerEventAction, cancelEventRegistrationAction } from '@/features/events/actions/event';

type Props = {
  slug: string;
  initialRegistered?: boolean;
};

export function EventRegisterButton({ slug, initialRegistered = false }: Props) {
  const [isPending, startTransition] = useTransition();
  const [registered, setRegistered] = useState(initialRegistered);
  const [error, setError] = useState<string | null>(null);

  function handleRegister() {
    setError(null);
    startTransition(async () => {
      const res = await registerEventAction(slug);
      if (res.alreadyRegistered) {
        setRegistered(true);
      } else if (res.error) {
        setError(res.error);
      } else {
        setRegistered(true);
      }
    });
  }

  function handleCancel() {
    setError(null);
    startTransition(async () => {
      const res = await cancelEventRegistrationAction(slug);
      if (res.error) {
        setError(res.error);
      } else {
        setRegistered(false);
      }
    });
  }

  return (
    <div className="flex flex-col gap-2">
      {registered ? (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <span className="text-sm text-muted-foreground">You are registered for this event.</span>
          <Button variant="destructive" size="sm" disabled={isPending} onClick={handleCancel}>
            {isPending ? 'Cancelling...' : 'Cancel registration'}
          </Button>
        </div>
      ) : (
        <Button size="lg" disabled={isPending} onClick={handleRegister} className="w-fit">
          {isPending ? 'Registering...' : 'Register'}
        </Button>
      )}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
