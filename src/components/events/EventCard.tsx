import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin } from 'lucide-react';

interface EventCardProps {
  title: string;
  discipline: string;
  city: string;
  date: Date;
  poster: string;
}

const EventCard = ({ title, discipline, city, date, poster }: EventCardProps) => {
  return (
    <div className="cursor-pointer overflow-hidden rounded-2xl bg-card ring-1 ring-foreground/10 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <figure className="relative h-48 w-full">
        <Image
          src={poster}
          loading="eager"
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </figure>
      <div className="flex flex-col gap-3 p-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Badge variant="outline" className="w-fit">{discipline}</Badge>
        <p className="text-sm flex items-center text-muted-foreground"><MapPin className='mr-2'/> {city}</p>
        <p className="text-sm flex items-center text-muted-foreground"><Calendar className='mr-2'/> {date.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default EventCard;
