export default function GymCard({ title }: { title: string }) {
  return (
    <>
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
          <img
            src="https://thedesignlove.com/wp-content/uploads/2024/05/ultimate-fighting-championship-logo-Today-1024x683.jpg"
            alt="Club"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {title}
            <div className="badge badge-neutral">#MMA</div>
          </h2>
          <p>
            A card component has a figure, a body part, and inside body there
            are title and actions parts
          </p>
          <div className="card-actions justify-end">
            <button className="btn btn-soft">View</button>
          </div>
        </div>
      </div>
    </>
  );
}
