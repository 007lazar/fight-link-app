'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="container mx-auto px-4 py-20 flex flex-col items-center gap-4 text-center">
      <h2 className="text-2xl font-bold">Failed to load event</h2>
      <p className="text-base-content/60">{error.message}</p>
      <button className="btn btn-neutral" onClick={reset}>Try again</button>
    </div>
  );
}
