import Link from 'next/link';
import EventCard from '@/components/events/EventCard';
import Carousel from '@/components/home/Carousel';
import type { EventModel } from '@/features/events/types';

async function getEvents(): Promise<EventModel[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`, { next: { revalidate: 60 } });
  if (!res.ok) {
    throw new Error('Failed to fetch events');
  }
  return res.json();
}

export default async function EventsPage() {
  let events: EventModel[] = [];
  let error: string | null = null;

  try {
    events = await getEvents();
  } catch (err) {
    error = err instanceof Error ? err.message : 'Unknown error';
  }

  if (error) {
    return (
      <>
        <Carousel />
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg text-center mt-30">
          <h2 className="text-red-700 font-bold">Something went wrong</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Carousel />
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 mt-30">
        {events.length > 0 ? (
          events.map((e) => (
            <Link key={e.slug} href={`/events/${e.slug}`} className="block">
              <EventCard
                title={e.title}
                discipline={e.discipline}
                city={e.city}
                date={new Date(e.date)}
                poster={e.poster}
              />
            </Link>
          ))
        ) : (
          <p className="text-white mt-10 text-center col-span-full">No events found</p>
        )}
      </div>
    </>
  );
}
