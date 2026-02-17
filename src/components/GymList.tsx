import GymCard from "./GymCard";

export default function GymList() {
	const gyms = [
		"Teogenes MMA",
		"Thunder Top Team",
		"Kimura BJJ",
		"Secutor MMA"
	]

  return (
    <>
      <h1 className="gym-list"></h1>
      {gyms.map(gym => (
				<GymCard key={gym} title={gym} />
			))}
    </>
  );
}
