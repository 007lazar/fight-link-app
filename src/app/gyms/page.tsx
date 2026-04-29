import Link from 'next/link';
import GymCard from '@/components/gyms/GymCard';
import type { GymModel } from '@/features/gyms/types';

async function getGyms(): Promise<GymModel[]> {
  const res = await fetch(`${process.env.API_URL}/gyms`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to fetch gyms');
  return res.json();
}

export default async function GymsPage() {
  const gyms = await getGyms();

  if (gyms.length === 0) {
    return <p className="text-center py-10 text-base-content/60">No gyms found nearby.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
      {gyms.map((g) => (
        <Link key={g.slug} href={`/gyms/${g.slug}`}>
          <GymCard
            name={g.name}
            description={g.description}
            poster={g.poster}
            badges={g.badges}
          />
        </Link>
      ))}
    </div>
  );
}
