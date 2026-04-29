import Image from 'next/image';

interface Props {
  name: string;
  description: string;
  poster: string;
  badges: string[];
}

export default function GymCard({ name, description, poster, badges }: Props) {
  return (
    <>
      <div
        className="card bg-base-100 shadow-xl 
                      h-full hover:shadow-2xl hover:-translate-y-1 
                      transition-all duration-300 cursor-pointer rounded-2xl"
      >
        <figure className="relative h-48 w-full">
          <Image src={poster} loading='eager' alt={name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
        </figure>
        <div className="card-body">
          <h2 className="card-title justify-center font-extrabold">{name}</h2>
          <div className="flex justify-around">
            {badges.map((b) => (
              <div key={b} className="badge badge-neutral">
                {`#${b}`}
              </div>
            ))}
          </div>
          <p>{description}</p>
          <div className="card-actions justify-center mt-2">
            <button className="btn btn-error rounded-2xl w-full max-w-xs tracking-[0.10rem]">Link Up!</button>
          </div>
        </div>
      </div>
    </>
  );
}
