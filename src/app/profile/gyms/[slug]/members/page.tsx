import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

import { getUser } from '@/lib/auth';
import { api, ApiError } from '@/lib/api';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { MemberCard } from '@/components/gyms/MemberCard';

interface Member {
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  role: 'MEMBER' | 'TRAINER';
  createdAt: string;
  user: { id: string; name: string; email: string; avatar: string | null };
}

interface GymInfo {
  name: string;
}

export default async function GymMembersPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const user = await getUser();
  if (!user) redirect('/login');
  if (user.role !== 'GYM_OWNER' && user.role !== 'ADMIN') redirect('/profile');

  let gym: GymInfo;
  let members: Member[];
  try {
    [gym, members] = await Promise.all([
      api.get<GymInfo>(`/gyms/${slug}`),
      api.get<Member[]>(`/gyms/${slug}/members`),
    ]);
  } catch (e) {
    if (e instanceof ApiError && e.status === 403) redirect('/profile/gyms');
    throw e;
  }

  const approved = members.filter((m) => m.status === 'APPROVED');
  const pending = members.filter((m) => m.status === 'PENDING');

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{gym.name}</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {approved.length} active member{approved.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Link href="/profile/gyms" className={buttonVariants({ size: 'sm', variant: 'ghost' })}>
          <ArrowLeft className="size-4" />
          Your gyms
        </Link>
      </div>

      <Separator />

      {/* Active members */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Members</h2>
        {approved.length === 0 ? (
          <Card>
            <CardContent className="pt-4 text-sm text-muted-foreground">
              No active members yet.
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-2">
            {approved.map((m) => (
              <MemberCard
                key={m.user.id}
                gymSlug={slug}
                userId={m.user.id}
                name={m.user.name}
                email={m.user.email}
                role={m.role}
                joinedAt={m.createdAt}
              />
            ))}
          </div>
        )}
      </section>

      {/* Pending requests */}
      {pending.length > 0 && (
        <>
          <Separator />
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold">Pending</h2>
              <Badge variant="secondary">{pending.length}</Badge>
            </div>
            <div className="space-y-2">
              {pending.map((m) => (
                <MemberCard
                  key={m.user.id}
                  gymSlug={slug}
                  userId={m.user.id}
                  name={m.user.name}
                  email={m.user.email}
                  role={m.role}
                  joinedAt={m.createdAt}
                  isPending
                />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
