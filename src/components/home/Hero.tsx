'use client';

import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import Card3d from './Card3d';

const disciplines = ['MMA', 'BJJ', 'Boxing', 'Muay Thai', 'Kickboxing', 'Wrestling', 'Judo', 'Karate', 'Taekwondo', 'Sambo'];

const Hero = () => {
  return (
    <div className="flex flex-col gap-20 py-8 lg:py-16">
      {/* Main hero row */}
      <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">

        {/* Text side */}
        <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
          <span className="mb-5 inline-flex items-center rounded-full border border-border bg-muted px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Serbia &amp; Balkans
          </span>

          <h1 className="text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl xl:text-7xl">
            Find Your<br />
            <span className="text-primary">Fight Community</span>
          </h1>

          <p className="mt-6 max-w-md text-lg text-muted-foreground">
            Discover gyms, register for events, and connect with martial artists across Serbia — all in one place.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
            <Link href="/gyms" className={buttonVariants({ size: 'lg' })}>
              Explore Gyms
            </Link>
            <Link href="/events" className={buttonVariants({ variant: 'outline', size: 'lg' })}>
              View Events
            </Link>
          </div>
        </div>

        {/* Image side */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm lg:max-w-none">
            <Card3d />
          </div>
        </div>
      </div>

      {/* Discipline strip */}
      <div className="flex flex-col items-center gap-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          All disciplines welcome
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {disciplines.map((d) => (
            <span
              key={d}
              className="rounded-full border border-border bg-muted px-4 py-1.5 text-sm font-medium text-muted-foreground"
            >
              {d}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
