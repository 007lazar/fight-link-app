interface EventCardProps {
  title: string;
  discipline: string;
  city: string;
  date: Date;
  poster: string;
}

const EventCard = ({ title, discipline, city, date, poster }: EventCardProps) => {
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
      <figure>
        <img className="h-48 w-full object-cover" src={poster} alt={title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-2xl">{title}</h2>
        <div className="badge badge-neutral">{discipline}</div>
        <p>📍 {city}</p>
        <p>
          📅{" "}
          {date.toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </p>
      </div>
    </div>
  );
};

export default EventCard;
