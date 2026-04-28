import type { EventModel } from '@/features/events/types';
import Link from 'next/link';

async function getEventDetails(slug: string): Promise<EventModel> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${slug}`, { next: { revalidate: 60 } });
  if (!res.ok) {
    throw new Error('Event not found or failed to fetch');
  }
  return res.json();
}

type Props = {
  params: Promise<{ slug: string }>;
};

import Image from 'next/image';

export default async function EventDetailsPage({ params }: Props) {
  // In Next.js 15, params must be awaited
  const { slug } = await params;

  let event: EventModel | null = null;
  let error: string | null = null;

  try {
    event = await getEventDetails(slug);
  } catch (err) {
    error = err instanceof Error ? err.message : 'Unknown error';
  }

  if (error || !event) {
    return (
      <div className="p-6 text-center mt-20">
        <h2 className="text-red-600 font-bold text-2xl">{error || 'Event not found'}</h2>
        <Link href="/events" className="btn btn-neutral mt-4">Back to Events</Link>
      </div>
    );
  }

  return (
    <div className="card bg-base-100 shadow-xl max-w-4xl mx-auto mt-10">
      <figure className="relative h-64 w-full">
        <Image src={event.poster} alt={event.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
      </figure>
      <div className="card-body">
        <h1 className="text-3xl font-bold">{event.title}</h1>
        <div className="flex gap-2">
          <span className="badge badge-neutral">{event.discipline}</span>
          <span className="badge badge-ghost">{event.city}</span>
        </div>
        <p className="mt-4">
          📅{' '}
          {new Date(event.date).toLocaleString('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short',
          })}
        </p>
        <div className="mt-6">
           <Link href="/events" className="btn btn-outline btn-sm">
             ← Back to Events
           </Link>
        </div>
      </div>
    </div>
  );
}
