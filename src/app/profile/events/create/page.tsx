import { redirect } from 'next/navigation';
import { getUser } from '@/lib/auth';
import { api } from '@/lib/api';
import EventCreateForm from './EventCreateForm';

interface GymOption {
  id: string;
  name: string;
  slug: string;
}

export default async function CreateEventPage() {
  const user = await getUser();

  if (!user) redirect('/login');
  if (user.role !== 'ORGANIZER' && user.role !== 'ADMIN') redirect('/profile');

  const gyms = await api.get<GymOption[]>('/users/me/gyms').catch(() => []);

  return (
    <main className="min-h-screen bg-background py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Create an Event</h1>
          <p className="text-muted-foreground mt-1">
            List a fight card, open mat, or seminar on FightLink.
          </p>
        </div>
        <EventCreateForm gyms={gyms} />
      </div>
    </main>
  );
}
