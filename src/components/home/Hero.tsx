'use client';

import Link from 'next/link';
import Card3d from './Card3d';

const Hero = () => {
  return (
    <div className="hero rounded-2xl bg-transparent">
      <div className="hero-content w-full flex-col lg:flex-row justify-between items-center text-center lg:text-left">
        <div className="card-3d mb-8 lg:mb-0">
          <Card3d />
        </div>
        <div className="w-full lg:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">Welcome to Fight Link!</h1>
          <p className="py-4 md:py-6 text-lg">
            &quot;Discover Martial Arts Events &amp; Gyms in Serbia&quot;
          </p>
          <div className="flex justify-center lg:justify-start gap-4">
            <Link href="/gyms">
              <button className="btn btn-neutral px-8">Explore Gyms</button>
            </Link>
            <Link href="/events">
              <button className="btn btn-neutral px-8">View Events</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
