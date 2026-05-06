import { cookies } from 'next/headers';

export type UserSession = {
  id: string;
  email: string;
  role: 'USER' | 'ADMIN' | 'GYM_OWNER' | 'ORGANIZER';
} | null;

export async function getUser(): Promise<UserSession> {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) return null;

  try {
    const [, payloadBase64] = token.split('.');
    if (!payloadBase64) return null;

    // JWT uses base64url encoding: `-` instead of `+`, `_` instead of `/`,
    // and no `=` padding. atob() requires standard base64, so we normalize.
    const padding = '='.repeat((4 - (payloadBase64.length % 4)) % 4);
    const base64 = (payloadBase64 + padding).replace(/-/g, '+').replace(/_/g, '/');
    const payloadJson = atob(base64);
    const payload = JSON.parse(payloadJson);

    if (payload.exp && Date.now() >= payload.exp * 1000) {
      return null;
    }

    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  } catch {
    return null;
  }
}
