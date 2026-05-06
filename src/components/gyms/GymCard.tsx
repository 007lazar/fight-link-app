import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Props {
  name: string;
  description: string;
  poster: string;
  badges: string[];
}

export default function GymCard({ name, description, poster, badges }: Props) {
  return (
    <div className="h-full cursor-pointer overflow-hidden rounded-2xl bg-card ring-1 ring-foreground/10 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <figure className="relative h-48 w-full">
        <Image
          src={poster}
          loading="eager"
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </figure>
      <div className="flex flex-col gap-3 p-4">
        <h2 className="text-center font-extrabold">{name}</h2>
        <div className="flex flex-wrap justify-around gap-2">
          {badges.map((b) => (
            <Badge key={b} variant="outline">{`#${b}`}</Badge>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
        <Button variant="destructive" className="mt-2 w-full max-w-xs self-center rounded-2xl tracking-[0.10rem]">
          Link Up!
        </Button>
      </div>
    </div>
  );
}
