import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, Calendar, Users, Ticket, Clock, ArrowLeft } from 'lucide-react';

import { api, ApiError } from '@/lib/api';
import { getUser } from '@/lib/auth';
import type { EventModel } from '@/features/events/types';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { EventRegisterButton } from '@/components/events/EventRegisterButton';

interface MyRegistration {
  status: 'REGISTERED' | 'CANCELLED' | 'WAITLISTED';
  event: { slug: string };
}

async function getEvent(slug: string): Promise<EventModel> {
  try {
    return await api.get<EventModel>(`/events/${slug}`);
  } catch (e) {
    if (e instanceof ApiError && e.status === 404) notFound();
    throw e;
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
}

const statusConfig = {
  PUBLISHED: { label: 'Open for registration', variant: 'default' as const },
  DRAFT: { label: 'Coming soon', variant: 'secondary' as const },
  CANCELLED: { label: 'Cancelled', variant: 'destructive' as const },
};

type Props = { params: Promise<{ slug: string }> };

export default async function EventProfilePage({ params }: Props) {
  const { slug } = await params;
  const [event, user] = await Promise.all([getEvent(slug), getUser()]);

  const now = new Date();
  const deadlinePassed = event.registrationDeadline ? new Date(event.registrationDeadline) < now : false;
  const registrationOpen = event.status === 'PUBLISHED' && !deadlinePassed;

  let isAlreadyRegistered = false;
  if (user && registrationOpen) {
    const registrations = await api.get<MyRegistration[]>('/users/me/registrations');
    isAlreadyRegistered = registrations.some(
      (r) => r.event.slug === slug && r.status === 'REGISTERED',
    );
  }

  const { label: statusLabel, variant: statusVariant } = statusConfig[event.status];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Hero poster */}
      {event.poster && (
        <div className="relative w-full aspect-[21/9] rounded-xl overflow-hidden">
          <Image
            src={event.poster}
            alt={event.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 896px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}

      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-3xl font-bold tracking-tight">{event.title}</h1>
            <Badge variant={statusVariant}>{statusLabel}</Badge>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{event.discipline}</Badge>
            <span className="flex items-center gap-1 text-muted-foreground text-sm">
              <MapPin className="size-3.5" />{event.city}
            </span>
          </div>
        </div>

        {registrationOpen && (
          <div className="shrink-0">
            {user ? (
              <EventRegisterButton slug={slug} initialRegistered={isAlreadyRegistered} />
            ) : (
              <Link href="/login" className={buttonVariants({ size: 'lg' })}>
                Login to register
              </Link>
            )}
          </div>
        )}
        {deadlinePassed && event.status === 'PUBLISHED' && (
          <p className="text-sm text-muted-foreground shrink-0">Registration closed</p>
        )}
      </div>

      {/* Key details */}
      <Card>
        <CardContent className="pt-4">
          <ul className="space-y-2.5 text-sm">
            <li className="flex items-center gap-2">
              <Calendar className="size-4 text-muted-foreground shrink-0" />
              <span>{formatDate(event.date)}</span>
            </li>
            <li className="flex items-center gap-2">
              <Clock className="size-4 text-muted-foreground shrink-0" />
              <span>{formatTime(event.date)}</span>
            </li>
            {event.address && (
              <li className="flex items-center gap-2">
                <MapPin className="size-4 text-muted-foreground shrink-0" />
                <span>{event.address}, {event.city}</span>
              </li>
            )}
            {event.capacity !== null && (
              <li className="flex items-center gap-2">
                <Users className="size-4 text-muted-foreground shrink-0" />
                <span>Capacity: {event.capacity} spots</span>
              </li>
            )}
            {event.price !== null && (
              <li className="flex items-center gap-2">
                <Ticket className="size-4 text-muted-foreground shrink-0" />
                <span>€{parseFloat(event.price).toFixed(2)}</span>
              </li>
            )}
            {event.registrationDeadline && (
              <li className="flex items-center gap-2">
                <Clock className="size-4 text-muted-foreground shrink-0" />
                <span>Register by {formatDate(event.registrationDeadline)}</span>
              </li>
            )}
          </ul>
        </CardContent>
      </Card>

      {/* Description */}
      {event.description && (
        <>
          <Separator />
          <p className="text-muted-foreground leading-relaxed">{event.description}</p>
        </>
      )}

      {/* Back link */}
      <div className="pt-2">
        <Link href="/events" className={buttonVariants({ variant: 'ghost', size: 'sm' })}>
          <ArrowLeft className="size-4" />
          Back to events
        </Link>
      </div>
    </div>
  );
}
