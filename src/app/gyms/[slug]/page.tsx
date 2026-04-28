import type { GymModel } from '@/features/gyms/types';
import Image from 'next/image';
import Link from 'next/link';

async function getGymDetails(slug: string): Promise<GymModel> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gyms/${slug}`, { next: { revalidate: 60 } });
  if (!res.ok) {
    throw new Error('Gym not found or failed to fetch');
  }
  return res.json();
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function GymDetailsPage({ params }: Props) {
  // In Next.js 15, params must be awaited
  const { slug } = await params;

  let gym: GymModel | null = null;
  let error: string | null = null;

  try {
    gym = await getGymDetails(slug);
  } catch (err) {
    error = err instanceof Error ? err.message : 'Unknown error';
  }

  if (error || !gym) {
    return (
      <div className="p-6 text-center mt-20">
        <h2 className="text-red-600 font-bold text-2xl">{error || 'Gym not found'}</h2>
        <Link href="/gyms" className="btn btn-neutral mt-4">Back to Gyms</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-base-100 shadow-xl rounded-2xl">
      <div className="flex flex-col md:flex-row gap-8">
        {gym.poster && (
          <div className="w-full md:w-1/3 aspect-[4/3] relative rounded-xl overflow-hidden shadow-lg">
            <Image src={gym.poster} alt={gym.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
          </div>
        )}
        <div className="flex-1">
          <h1 className="text-4xl font-extrabold mb-4">{gym.name}</h1>
          <div className="flex gap-2 mb-6 flex-wrap">
            {gym.badges.map((badge, idx) => (
              <span key={idx} className="badge badge-primary">{badge}</span>
            ))}
          </div>
          <p className="text-lg opacity-80 leading-relaxed mb-6">{gym.description}</p>
          <Link href="/gyms" className="btn btn-outline btn-sm">
             ← Back to Gyms
          </Link>
        </div>
      </div>
    </div>
  );
}
