'use server';

import { redirect } from 'next/navigation';
import { api, ApiError } from '@/lib/api';
import { revalidatePath } from 'next/cache';

export async function createEventAction(
  _prev: unknown,
  formData: FormData,
): Promise<{ error: string } | undefined> {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const discipline = formData.get('discipline') as string;
  const city = formData.get('city') as string;
  const dateRaw = formData.get('date') as string;
  const poster = formData.get('poster') as string;
  const address = (formData.get('address') as string) || undefined;
  const capacityRaw = formData.get('capacity') as string;
  const capacity = capacityRaw ? parseInt(capacityRaw, 10) : undefined;
  const deadlineRaw = formData.get('registrationDeadline') as string;
  const registrationDeadline = deadlineRaw ? new Date(deadlineRaw).toISOString() : undefined;
  const gymId = (formData.get('gymId') as string) || undefined;

  if (!discipline) return { error: 'Please select a discipline.' };
  if (!dateRaw) return { error: 'Please select an event date and time.' };

  const date = new Date(dateRaw).toISOString();

  let event: { slug: string };
  try {
    event = await api.post<{ slug: string }>('/events', {
      title, description, discipline, city, date, poster, address, capacity, registrationDeadline, gymId,
    });
  } catch (e) {
    if (e instanceof ApiError) return { error: e.message };
    throw e;
  }
  redirect(`/events/${event.slug}`);
}

export async function registerEventAction(slug: string): Promise<{ error?: string; alreadyRegistered?: boolean }> {
  try {
    await api.post(`/events/${slug}/register`);
    revalidatePath(`/events/${slug}`);
    revalidatePath('/profile');
    return {};
  } catch (e) {
    if (e instanceof ApiError) {
      if (e.status === 409) return { alreadyRegistered: true };
      return { error: e.message };
    }
    return { error: 'Something went wrong' };
  }
}

export async function cancelEventRegistrationAction(slug: string): Promise<{ error?: string }> {
  try {
    await api.delete(`/events/${slug}/register`);
    revalidatePath(`/events/${slug}`);
    revalidatePath('/profile');
    return {};
  } catch (e) {
    if (e instanceof ApiError) return { error: e.message };
    return { error: 'Something went wrong' };
  }
}
