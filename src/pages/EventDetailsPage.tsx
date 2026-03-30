import { useFetchEvents } from "@/hooks/useFetchEvents";
import { useParams } from "react-router-dom";


const EventDetailsPage = () => {
  const { slug } = useParams();
  const events = useFetchEvents()

  const event = events.find((e) => e.slug === slug);

  if (!event) return <div className="p-6">Event not found.</div>;

  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img className="h-64 w-full object-cover" src={event.poster} alt={event.title} />
      </figure>
      <div className="card-body">
        <h1 className="text-3xl font-bold">{event.title}</h1>
        <div className="flex gap-2">
          <span className="badge badge-neutral">{event.discipline}</span>
          <span className="badge badge-ghost">{event.city}</span>
        </div>
        <p>
          📅{" "}
          {new Date(event.date).toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </p>
      </div>
    </div>
  );
};

export default EventDetailsPage;
