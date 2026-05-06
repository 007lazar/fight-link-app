import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

type Payload = { sub?: string; email?: string; role?: string; exp?: number };

function decodeToken(token: string | undefined): Payload | null {
  if (!token) return null;
  try {
    const [, payloadBase64] = token.split('.');
    if (!payloadBase64) return null;
    // JWT uses base64url: `-`→`+`, `_`→`/`, no padding — normalize for atob()
    const padding = '='.repeat((4 - (payloadBase64.length % 4)) % 4);
    const base64 = (payloadBase64 + padding).replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(atob(base64)) as Payload;
    if (payload.exp && Date.now() >= payload.exp * 1000) return null;
    return payload;
  } catch {
    return null;
  }
}

export default function proxy(request: NextRequest) {
  const rawToken = request.cookies.get('token')?.value;
  const payload = decodeToken(rawToken);
  const path = request.nextUrl.pathname;

  const isProtected = path.startsWith('/profile') || path.startsWith('/admin');
  const isAuthPage = path.startsWith('/login') || path.startsWith('/register');
  const staleCookie = !!rawToken && !payload;

  if (isProtected && !payload) {
    const res = NextResponse.redirect(new URL('/login', request.url));
    if (staleCookie) res.cookies.delete('token');
    return res;
  }

  if (isAuthPage && payload) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (path.startsWith('/admin') && payload?.role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const res = NextResponse.next();
  if (staleCookie) res.cookies.delete('token');
  return res;
}

export const config = {
  matcher: ['/profile/:path*', '/admin/:path*', '/login', '/register'],
};
