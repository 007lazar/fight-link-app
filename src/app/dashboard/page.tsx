import { getUser } from '@/lib/auth';

export default async function DashboardPage() {
  const user = await getUser();

  return (
    <div className="p-6 mt-10">
      <h1 className="text-3xl font-bold mb-4">Welcome to your Dashboard</h1>
      <p className="text-xl">Hello, {user?.email}!</p>
      <div className="mt-6 p-4 bg-base-100 rounded-lg shadow">
        <h2 className="text-xl font-semibold">Your Profile Data</h2>
        <ul className="mt-2 space-y-2">
          <li><strong>ID:</strong> {user?.id}</li>
          <li><strong>Role:</strong> <span className="badge badge-primary">{user?.role}</span></li>
        </ul>
      </div>
    </div>
  );
}
