'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { joinGymAction, leaveGymAction } from '@/features/gyms/actions/gym';

export type MembershipStatus = 'NONE' | 'PENDING' | 'APPROVED';

type Props = {
  slug: string;
  membershipStatus: MembershipStatus;
  requiresApproval: boolean;
};

export function GymJoinButton({ slug, membershipStatus, requiresApproval }: Props) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleJoin() {
    setError(null);
    startTransition(async () => {
      const res = await joinGymAction(slug);
      if (res.error) setError(res.error);
    });
  }

  function handleLeave() {
    setError(null);
    startTransition(async () => {
      const res = await leaveGymAction(slug);
      if (res.error) setError(res.error);
    });
  }

  if (membershipStatus === 'APPROVED') {
    return (
      <div className="flex flex-col gap-1 items-end">
        <Button variant="outline" size="lg" disabled={isPending} onClick={handleLeave} className="min-w-32">
          {isPending ? 'Leaving...' : 'Leave gym'}
        </Button>
        {error && <p className="text-xs text-destructive">{error}</p>}
      </div>
    );
  }

  if (membershipStatus === 'PENDING') {
    return (
      <div className="flex flex-col gap-1 items-end">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Request pending</span>
          <Button variant="outline" size="sm" disabled={isPending} onClick={handleLeave}>
            {isPending ? 'Withdrawing...' : 'Withdraw'}
          </Button>
        </div>
        {error && <p className="text-xs text-destructive">{error}</p>}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1 items-end">
      <Button size="lg" disabled={isPending} onClick={handleJoin} className="min-w-32">
        {isPending
          ? (requiresApproval ? 'Requesting...' : 'Joining...')
          : (requiresApproval ? 'Request to join' : 'Join gym')}
      </Button>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
