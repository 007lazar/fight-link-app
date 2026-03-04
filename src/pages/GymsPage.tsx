import GymCard from "@/components/gyms/GymCard";
import type { GymModel } from "@/models/gym.model";
import { fetchGyms } from "api/gymsApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function GymsPage() {
  const [gyms, setGyms] = useState<GymModel[]>([]);

  useEffect(() => {
    async function loadGyms() {
      try {
        const data = await fetchGyms();
        setGyms(data);
      } catch (error) {
        console.log(error);
      }
    }

    loadGyms();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
      {gyms.map((g: GymModel) => (
        <Link key={g.slug} to={`/gyms/${g.slug}`}>
          <GymCard name={g.name} description={g.description} poster={g.poster} badges={g.badges} />
        </Link>
      ))}
    </div>
  );
}
