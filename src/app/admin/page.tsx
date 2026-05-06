import { getUser } from '@/lib/auth';
import { Badge } from '@/components/ui/badge';

export default async function AdminPage() {
  const user = await getUser();

  return (
    <div className="p-6 mt-10">
      <h1 className="text-3xl font-bold mb-4 text-red-600">Admin Control Panel</h1>
      <p className="text-xl">Super Secret Admin Area!</p>
      <div className="mt-6 p-4 bg-card rounded-lg ring-1 ring-foreground/10 shadow">
        <h2 className="text-xl font-semibold">Admin Details</h2>
        <ul className="mt-2 space-y-2">
          <li><strong>Admin Email:</strong> {user?.email}</li>
          <li><strong>Role Status:</strong> Verified <Badge variant="destructive">{user?.role}</Badge></li>
        </ul>
      </div>
    </div>
  );
}
