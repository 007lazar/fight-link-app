import Link from 'next/link';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { Calendar, MapPin, Settings, Plus } from 'lucide-react';

import { getUser } from '@/lib/auth';
import { api } from '@/lib/api';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { GymJoinButton } from '@/components/gyms/GymJoinButton';
import { EventCancelButton } from '@/components/events/EventCancelButton';

interface MyMembership {
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  role: 'MEMBER' | 'TRAINER';
  createdAt: string;
  gym: { slug: string; name: string; poster: string; city: string | null; requiresApproval: boolean };
}

interface MyRegistration {
  status: 'REGISTERED' | 'CANCELLED' | 'WAITLISTED';
  createdAt: string;
  event: { slug: string; title: string; date: string; city: string; discipline: string };
}

export default async function DashboardPage() {
  const user = await getUser();
  if (!user) redirect('/login');

  const [memberships, registrations] = await Promise.all([
    api.get<MyMembership[]>('/users/me/memberships'),
    api.get<MyRegistration[]>('/users/me/registrations'),
  ]);

  const activeGyms = memberships.filter((m) => m.status === 'APPROVED');
  const pendingGyms = memberships.filter((m) => m.status === 'PENDING');
  const upcomingEvents = registrations.filter(
    (r) => r.status === 'REGISTERED' && new Date(r.event.date) >= new Date(),
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground text-sm mt-1">{user.email}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{user.role}</Badge>
          {(user.role === 'GYM_OWNER' || user.role === 'ADMIN') && (
            <Link href="/profile/gyms" className={buttonVariants({ size: 'sm', variant: 'outline' })}>
              <Settings className="size-4" />
              Your gyms
            </Link>
          )}
          {(user.role === 'ORGANIZER' || user.role === 'ADMIN') && (
            <Link href="/profile/events/create" className={buttonVariants({ size: 'sm', variant: 'outline' })}>
              <Plus className="size-4" />
              New event
            </Link>
          )}
        </div>
      </div>

      <Separator />

      {/* My Gyms */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">My gyms</h2>

        {activeGyms.length === 0 && pendingGyms.length === 0 && (
          <Card>
            <CardContent className="pt-4 text-sm text-muted-foreground">
              You haven&apos;t joined any gyms yet.{' '}
              <Link href="/gyms" className="underline underline-offset-4">
                Browse gyms
              </Link>
            </CardContent>
          </Card>
        )}

        {activeGyms.length > 0 && (
          <div className="grid gap-3 sm:grid-cols-2">
            {activeGyms.map(({ gym, role }) => (
              <Card key={gym.slug} className="overflow-hidden">
                <div className="flex gap-3 p-4 items-center">
                  {gym.poster && (
                    <div className="relative size-14 rounded-lg overflow-hidden shrink-0">
                      <Image src={gym.poster} alt={gym.name} fill sizes="56px" className="object-cover" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <Link href={`/gyms/${gym.slug}`} className="font-medium hover:underline truncate block">
                      {gym.name}
                    </Link>
                    {gym.city && (
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="size-3" />{gym.city}
                      </span>
                    )}
                    <Badge variant="outline" className="mt-1 text-xs">{role}</Badge>
                  </div>
                  <GymJoinButton slug={gym.slug} membershipStatus="APPROVED" requiresApproval={gym.requiresApproval} />
                </div>
              </Card>
            ))}
          </div>
        )}

        {pendingGyms.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground font-medium">Pending approval</p>
            {pendingGyms.map(({ gym }) => (
              <Card key={gym.slug}>
                <CardContent className="flex items-center justify-between gap-4 p-3">
                  <Link href={`/gyms/${gym.slug}`} className="font-medium text-sm hover:underline truncate">
                    {gym.name}
                  </Link>
                  <GymJoinButton slug={gym.slug} membershipStatus="PENDING" requiresApproval={gym.requiresApproval} />
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      <Separator />

      {/* My Events */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Upcoming events</h2>

        {upcomingEvents.length === 0 && (
          <Card>
            <CardContent className="pt-4 text-sm text-muted-foreground">
              No upcoming events.{' '}
              <Link href="/events" className="underline underline-offset-4">
                Browse events
              </Link>
            </CardContent>
          </Card>
        )}

        {upcomingEvents.length > 0 && (
          <div className="space-y-3">
            {upcomingEvents.map(({ event }) => (
              <Card key={event.slug}>
                <CardContent className="flex items-center gap-4 p-3">
                  <Calendar className="size-5 text-muted-foreground shrink-0" />
                  <div className="flex-1 min-w-0">
                    <Link href={`/events/${event.slug}`} className="font-medium hover:underline block truncate">
                      {event.title}
                    </Link>
                    <p className="text-xs text-muted-foreground">
                      {new Date(event.date).toLocaleDateString('en-GB', {
                        day: 'numeric', month: 'short', year: 'numeric',
                      })}{' · '}{event.city}
                    </p>
                  </div>
                  <Badge variant="secondary" className="shrink-0">{event.discipline}</Badge>
                  <EventCancelButton slug={event.slug} />
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
