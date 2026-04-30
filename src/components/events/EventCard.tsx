import Image from 'next/image';

interface EventCardProps {
  title: string;
  discipline: string;
  city: string;
  date: Date;
  poster: string;
}

const EventCard = ({ title, discipline, city, date, poster }: EventCardProps) => {
  return (
    <div className="card rounded-2xl bg-base-100 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
      <figure className="relative h-48 w-full">
        <Image src={poster} loading='eager' alt={title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-2xl">{title}</h2>
        <div className="badge badge-neutral">{discipline}</div>
        <p>📍 {city}</p>
        <p>
          📅{' '}
          {date.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default EventCard;
