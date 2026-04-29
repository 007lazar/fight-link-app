import Image from 'next/image';
import Link from 'next/link';
import type { EventModel } from '@/features/events/types';

async function getEventDetails(slug: string): Promise<EventModel> {
  const res = await fetch(`${process.env.API_URL}/events/${slug}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Event not found or failed to fetch');
  return res.json();
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function EventDetailsPage({ params }: Props) {
  const { slug } = await params;
  const event = await getEventDetails(slug);

  return (
    <div className="card bg-base-100 shadow-xl max-w-4xl mx-auto mt-10">
      <figure className="relative h-64 w-full">
        <Image
          src={event.poster}
          alt={event.title}
          loading="eager"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </figure>
      <div className="card-body">
        <h1 className="text-3xl font-bold">{event.title}</h1>
        <div className="flex gap-2">
          <span className="badge badge-neutral">{event.discipline}</span>
          <span className="badge badge-ghost">{event.city}</span>
        </div>
        <p className="mt-4">
          {new Date(event.date).toLocaleString('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short',
          })}
        </p>
        <div className="mt-6">
          <Link href="/events" className="btn btn-outline btn-sm">← Back to Events</Link>
        </div>
      </div>
    </div>
  );
}
