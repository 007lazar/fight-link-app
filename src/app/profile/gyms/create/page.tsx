import { redirect } from 'next/navigation';
import { getUser } from '@/lib/auth';
import GymCreateForm from './GymCreateForm';

export default async function CreateGymPage() {
  const user = await getUser();

  if (!user) redirect('/login');
  if (user.role !== 'GYM_OWNER' && user.role !== 'ADMIN') redirect('/profile');

  return (
    <main className="min-h-screen bg-background py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Create a Gym</h1>
          <p className="text-muted-foreground mt-1">
            List your gym on FightLink. You can edit all details after publishing.
          </p>
        </div>
        <GymCreateForm />
      </div>
    </main>
  );
}
