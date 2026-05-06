import Link from 'next/link';
import EventCard from '@/components/events/EventCard';
import Carousel from '@/components/home/Carousel';
import type { EventModel } from '@/features/events/types';

async function getEvents(): Promise<EventModel[]> {
  const res = await fetch(`${process.env.API_URL}/events`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to fetch events');
  return res.json();
}

export default async function EventsPage() {
  const events = await getEvents();

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
