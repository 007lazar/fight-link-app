import { cookies } from 'next/headers';

export type UserSession = {
  id: string;
  email: string;
  role: 'USER' | 'ADMIN' | 'GYM_OWNER';
} | null;

export async function getUser(): Promise<UserSession> {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) return null;

  try {
    const [, payloadBase64] = token.split('.');
    if (!payloadBase64) return null;
    
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);
    
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      return null;
    }

    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  } catch (e) {
    return null;
  }
}
