'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { cancelEventRegistrationAction } from '@/features/events/actions/event';

export function EventCancelButton({ slug }: { slug: string }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleCancel() {
    setError(null);
    startTransition(async () => {
      const res = await cancelEventRegistrationAction(slug);
      if (res.error) setError(res.error);
    });
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <Button size="sm" variant="outline" disabled={isPending} onClick={handleCancel}>
        {isPending ? 'Cancelling...' : 'Cancel'}
      </Button>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
