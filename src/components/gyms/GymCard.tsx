interface Props {
  name: string;
  description: string;
  poster: string;
  badges: string[];
}

export default function GymCard({ name, description, poster, badges }: Props) {
  return (
    <>
      <div className="card bg-base-100 shadow-xl h-full hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
        <figure>
          <img src={poster} alt="Club" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {name}
            {badges.map((b) => (
              <div key={b} className="badge badge-neutral">
                {`#${b}`}
              </div>
            ))}
          </h2>
          <p>{description}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-soft rounded-2xl w-80 tracking-[0.10rem]">Link Up!</button>
          </div>
        </div>
      </div>
    </>
  );
}
