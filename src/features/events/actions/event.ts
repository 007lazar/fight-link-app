'use server';

import { api, ApiError } from '@/lib/api';
import { revalidatePath } from 'next/cache';

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
