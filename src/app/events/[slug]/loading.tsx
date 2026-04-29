export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl space-y-6">
      <div className="skeleton h-72 w-full rounded-2xl" />
      <div className="skeleton h-8 w-1/2 rounded-lg" />
      <div className="skeleton h-4 w-full rounded" />
      <div className="skeleton h-4 w-3/4 rounded" />
    </div>
  );
}
