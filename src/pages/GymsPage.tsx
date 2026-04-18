import GymCard from "@/components/gyms/GymCard";
import { useFetchGyms } from "@/hooks/useFetchGyms";
import type { GymModel } from "@/models/gym.model";
import { Link } from "react-router-dom";

export default function GymsPage() {
  const { gyms, isLoading, error } = useFetchGyms();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-100">
        <p className="text-gray-500 animate-pulse">Loading gyms...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg text-center">
        <h2 className="text-red-700 font-bold">Something went wrong</h2>
        <p className="text-red-600">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (gyms.length === 0) {
    return <p className="text-center py-10">No gyms found nearby.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
      {gyms.map((g: GymModel) => (
        <Link key={g.slug} to={`/gyms/${g.slug}`}>
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
