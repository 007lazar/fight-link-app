import GymGrid from "@/components/gyms/GymGrid";

export default function GymsPage() {
  return (
    
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
      <GymGrid />
    </div>
    
  );
}
