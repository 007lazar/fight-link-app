import { events } from "@/data/events.mock";
import { Link } from "react-router-dom";
import EventCard from "./EventCard";

const EventGrid = () => {
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
      {events.map(e => (
        <Link key={e.slug} to={`/events/${e.slug}`} className="block">
					<EventCard
						title={e.title}
						discipline={e.discipline}
						city={e.city}
						date={new Date(e.date)}
						poster={e.poster}
					/>
        </Link>
      ))}
    </div>
  );
};

export default EventGrid;
