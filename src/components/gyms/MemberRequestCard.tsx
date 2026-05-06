'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { approveMemberAction, rejectMemberAction } from '@/features/gyms/actions/gym';

type Props = {
  gymSlug: string;
  gymName: string;
  userId: string;
  userName: string;
  userEmail: string;
  requestedAt: string;
};

export function MemberRequestCard({ gymSlug, gymName, userId, userName, userEmail, requestedAt }: Props) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleApprove() {
    setError(null);
    startTransition(async () => {
      const res = await approveMemberAction(gymSlug, userId);
      if (res.error) setError(res.error);
    });
  }

  function handleReject() {
    setError(null);
    startTransition(async () => {
      const res = await rejectMemberAction(gymSlug, userId);
      if (res.error) setError(res.error);
    });
  }

  return (
    <Card>
      <CardContent className="flex flex-col gap-2 p-3">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="font-medium text-sm truncate">{userName}</p>
            <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {gymName} · {new Date(requestedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <Button size="sm" disabled={isPending} onClick={handleApprove}>
              Approve
            </Button>
            <Button size="sm" variant="outline" disabled={isPending} onClick={handleReject}>
              Reject
            </Button>
          </div>
        </div>
        {error && <p className="text-xs text-destructive">{error}</p>}
      </CardContent>
    </Card>
  );
}
