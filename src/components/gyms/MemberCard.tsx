'use client';

import { useState, useTransition } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { promoteMemberAction, demoteMemberAction } from '@/features/gyms/actions/gym';

type Props = {
  gymSlug: string;
  userId: string;
  name: string;
  email: string;
  role: 'MEMBER' | 'TRAINER';
  joinedAt: string;
  isPending?: boolean;
};

export function MemberCard({ gymSlug, userId, name, email, role, joinedAt, isPending = false }: Props) {
  const [transitioning, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handlePromote() {
    setError(null);
    startTransition(async () => {
      const res = await promoteMemberAction(gymSlug, userId);
      if (res.error) setError(res.error);
    });
  }

  function handleDemote() {
    setError(null);
    startTransition(async () => {
      const res = await demoteMemberAction(gymSlug, userId);
      if (res.error) setError(res.error);
    });
  }

  return (
    <Card size="sm">
      <CardContent className="flex flex-col gap-2 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="font-medium text-sm truncate">{name}</p>
            <p className="text-xs text-muted-foreground truncate">{email}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Joined {new Date(joinedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {isPending ? (
              <Badge variant="secondary">Pending</Badge>
            ) : (
              <>
                <Badge variant={role === 'TRAINER' ? 'default' : 'outline'}>
                  {role === 'TRAINER' ? 'Trainer' : 'Member'}
                </Badge>
                {role === 'MEMBER' ? (
                  <Button size="xs" variant="outline" disabled={transitioning} onClick={handlePromote}>
                    Make trainer
                  </Button>
                ) : (
                  <Button size="xs" variant="outline" disabled={transitioning} onClick={handleDemote}>
                    Demote
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
        {error && <p className="text-xs text-destructive">{error}</p>}
      </CardContent>
    </Card>
  );
}
