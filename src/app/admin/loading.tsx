export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl space-y-6">
      <div className="skeleton h-10 w-1/4 rounded-lg" />
      <div className="skeleton h-48 w-full rounded-2xl" />
      <div className="skeleton h-48 w-full rounded-2xl" />
    </div>
  );
}
