import Link from 'next/link';
import GymCard from '@/components/gyms/GymCard';
import type { GymModel } from '@/features/gyms/types';

async function getGyms(): Promise<GymModel[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gyms`, { next: { revalidate: 60 } });
  if (!res.ok) {
    throw new Error('Failed to fetch gyms');
  }
  return res.json();
}

export default async function GymsPage() {
  let gyms: GymModel[] = [];
  let error: string | null = null;

  try {
    gyms = await getGyms();
  } catch (err) {
    error = err instanceof Error ? err.message : 'Unknown error';
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg text-center">
        <h2 className="text-red-700 font-bold">Something went wrong</h2>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

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
