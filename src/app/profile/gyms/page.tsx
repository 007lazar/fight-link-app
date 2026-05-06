import Link from 'next/link';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { MapPin, ArrowLeft, ShieldCheck, Users, Plus } from 'lucide-react';

import { getUser } from '@/lib/auth';
import { api } from '@/lib/api';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { MemberRequestCard } from '@/components/gyms/MemberRequestCard';

interface OwnedGym {
  slug: string;
  name: string;
  poster: string;
  city: string | null;
  verified: boolean;
}

interface PendingRequest {
  createdAt: string;
  gym: { slug: string; name: string };
  user: { id: string; name: string; email: string };
}

export default async function OwnerDashboardPage() {
  const user = await getUser();
  if (!user) redirect('/login');
  if (user.role !== 'GYM_OWNER' && user.role !== 'ADMIN') redirect('/profile');

  const [gyms, requests] = await Promise.all([
    api.get<OwnedGym[]>('/users/me/gyms'),
    api.get<PendingRequest[]>('/users/me/gym-requests'),
  ]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your gyms</h1>
          <p className="text-muted-foreground text-sm mt-1">{gyms.length} gym{gyms.length !== 1 ? 's' : ''}</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/profile/gyms/create" className={buttonVariants({ size: 'sm' })}>
            <Plus className="size-4" />
            New gym
          </Link>
          <Link href="/profile" className={buttonVariants({ size: 'sm', variant: 'ghost' })}>
            <ArrowLeft className="size-4" />
            Profile
          </Link>
        </div>
      </div>

      <Separator />

      {/* Owned gyms */}
      <section className="space-y-4">
        {gyms.length === 0 ? (
          <Card>
            <CardContent className="pt-4 text-sm text-muted-foreground">
              You don&apos;t own any gyms yet.
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {gyms.map((gym) => (
              <Card key={gym.slug} className="overflow-hidden">
                <div className="flex gap-3 p-4 items-center">
                  {gym.poster && (
                    <div className="relative size-14 rounded-lg overflow-hidden shrink-0">
                      <Image src={gym.poster} alt={gym.name} fill sizes="56px" className="object-cover" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <Link href={`/gyms/${gym.slug}`} className="font-medium hover:underline truncate">
                        {gym.name}
                      </Link>
                      {gym.verified && <ShieldCheck className="size-4 text-primary shrink-0" />}
                    </div>
                    {gym.city && (
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="size-3" />{gym.city}
                      </span>
                    )}
                    <Link
                      href={`/profile/gyms/${gym.slug}/members`}
                      className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 mt-1 w-fit"
                    >
                      <Users className="size-3" />Members
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      <Separator />

      {/* Pending member requests */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">Pending requests</h2>
          {requests.length > 0 && (
            <Badge variant="default">{requests.length}</Badge>
          )}
        </div>

        {requests.length === 0 ? (
          <Card>
            <CardContent className="pt-4 text-sm text-muted-foreground">
              No pending membership requests.
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {requests.map((req) => (
              <MemberRequestCard
                key={`${req.gym.slug}-${req.user.id}`}
                gymSlug={req.gym.slug}
                gymName={req.gym.name}
                userId={req.user.id}
                userName={req.user.name}
                userEmail={req.user.email}
                requestedAt={req.createdAt}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
