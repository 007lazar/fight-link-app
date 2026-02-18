interface Props {
  children: string;
  badges: string[];
}

export default function GymCard({ children, badges }: Props) {
  return (
    <>
      <div className="card bg-base-100 shadow-sm">
        <figure>
          <img
            src="https://thedesignlove.com/wp-content/uploads/2024/05/ultimate-fighting-championship-logo-Today-1024x683.jpg"
            alt="Club"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {children}
            {badges.map(b => (
              <div key={b} className="badge badge-neutral">{b}</div>
            ))}
          </h2>
          <p>
            A card component has a figure, a body part, and inside body there
            are title and actions parts
          </p>
          <div className="card-actions justify-center">
            <button
              className="btn btn-soft rounded-2xl w-80 tracking-[0.10rem]"
              onClick={() => alert("This is " + children)}
            >
              Link Up!
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
