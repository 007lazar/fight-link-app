import GymCard from "./GymCard";

export default function GymGrid() { 

  return (
    <>
      <h1 className="gym-list"></h1>
      <GymCard badges={["#MMA", "#BJJ"]}>
		Teogenes MMA
	  </GymCard>
      <GymCard badges={["#BJJ"]}>
		Kimura BJJ
	  </GymCard>
      <GymCard badges={["#MMA", "#BJJ", "#MuyThai"]}>
		Thunder Top Team
	  </GymCard>
    </>
  );
}
