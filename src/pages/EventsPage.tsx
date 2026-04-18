import EventCard from "@/components/events/EventCard";
import Carousel from "@/components/home/Carousel";
import { useFetchEvents } from "@/hooks/useFetchEvents";
import { Link } from "react-router-dom";

const EventsPage = () => {
  const events = useFetchEvents();
  return (
    <>
      <Carousel />
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 mt-30">
        {events.length > 0 ? (
          events.map((e) => (
          <Link key={e.slug} to={`/events/${e.slug}`} className="block">
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
          <p className="text-white">No events found</p>
        )}
      </div>
    </>
  );
};

export default EventsPage;
