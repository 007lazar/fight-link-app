'use server';

import { redirect } from 'next/navigation';
import { api, ApiError } from '@/lib/api';
import { revalidatePath } from 'next/cache';

export async function createGymAction(
  _prev: unknown,
  formData: FormData,
): Promise<{ error: string } | undefined> {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const poster = formData.get('poster') as string;
  const city = (formData.get('city') as string) || undefined;
  const address = (formData.get('address') as string) || undefined;
  const phone = (formData.get('phone') as string) || undefined;
  const instagram = (formData.get('instagram') as string) || undefined;
  const website = (formData.get('website') as string) || undefined;
  const badgesRaw = formData.get('badges') as string;
  const badges: string[] = badgesRaw ? JSON.parse(badgesRaw) : [];
  const requiresApproval = formData.get('requiresApproval') === 'true';

  let gym: { slug: string };
  try {
    gym = await api.post<{ slug: string }>('/gyms', {
      name, description, poster, city, address, phone, instagram, website, badges, requiresApproval,
    });
  } catch (e) {
    if (e instanceof ApiError) return { error: e.message };
    throw e;
  }
  redirect(`/gyms/${gym.slug}`);
}

export async function joinGymAction(slug: string): Promise<{ error?: string }> {
  try {
    await api.post(`/gyms/${slug}/join`);
    revalidatePath(`/gyms/${slug}`);
    return {};
  } catch (e) {
    if (e instanceof ApiError) return { error: e.message };
    return { error: 'Something went wrong' };
  }
}

export async function leaveGymAction(slug: string): Promise<{ error?: string }> {
  try {
    await api.delete(`/gyms/${slug}/members/me`);
    revalidatePath(`/gyms/${slug}`);
    revalidatePath('/profile');
    return {};
  } catch (e) {
    if (e instanceof ApiError) return { error: e.message };
    return { error: 'Something went wrong' };
  }
}

export async function approveMemberAction(gymSlug: string, userId: string): Promise<{ error?: string }> {
  try {
    await api.patch(`/gyms/${gymSlug}/members/${userId}`, { status: 'APPROVED' });
    revalidatePath('/profile/gyms');
    return {};
  } catch (e) {
    if (e instanceof ApiError) return { error: e.message };
    return { error: 'Something went wrong' };
  }
}

export async function rejectMemberAction(gymSlug: string, userId: string): Promise<{ error?: string }> {
  try {
    await api.patch(`/gyms/${gymSlug}/members/${userId}`, { status: 'REJECTED' });
    revalidatePath('/profile/gyms');
    return {};
  } catch (e) {
    if (e instanceof ApiError) return { error: e.message };
    return { error: 'Something went wrong' };
  }
}

export async function promoteMemberAction(gymSlug: string, userId: string): Promise<{ error?: string }> {
  try {
    await api.patch(`/gyms/${gymSlug}/members/${userId}`, { role: 'TRAINER' });
    revalidatePath(`/profile/gyms/${gymSlug}/members`);
    return {};
  } catch (e) {
    if (e instanceof ApiError) return { error: e.message };
    return { error: 'Something went wrong' };
  }
}

export async function demoteMemberAction(gymSlug: string, userId: string): Promise<{ error?: string }> {
  try {
    await api.patch(`/gyms/${gymSlug}/members/${userId}`, { role: 'MEMBER' });
    revalidatePath(`/profile/gyms/${gymSlug}/members`);
    return {};
  } catch (e) {
    if (e instanceof ApiError) return { error: e.message };
    return { error: 'Something went wrong' };
  }
}
