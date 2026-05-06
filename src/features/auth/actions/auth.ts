'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  maxAge: 60 * 60 * 24 * 7, // 7 days
  path: '/',
};

export async function loginAction(prevState: unknown, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    const res = await fetch(`${process.env.API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      const msg = data.message;
      return { error: Array.isArray(msg) ? msg.join(', ') : msg || 'Login failed' };
    }

    const cookieStore = await cookies();
    cookieStore.set('token', data.access_token, COOKIE_OPTIONS);
  } catch {
    return { error: 'Network error — please try again.' };
  }

  redirect('/');
}

export async function registerAction(prevState: unknown, formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const role = (formData.get('role') as string) || 'USER';

  try {
    const res = await fetch(`${process.env.API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role }),
    });

    const data = await res.json();

    if (!res.ok) {
      const msg = data.message;
      return { error: Array.isArray(msg) ? msg.join(', ') : msg || 'Registration failed' };
    }

    const cookieStore = await cookies();
    cookieStore.set('token', data.access_token, COOKIE_OPTIONS);
  } catch {
    return { error: 'Network error — please try again.' };
  }

  redirect('/');
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('token');
  redirect('/');
}
