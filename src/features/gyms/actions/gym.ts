'use server';

import { api, ApiError } from '@/lib/api';
import { revalidatePath } from 'next/cache';

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
