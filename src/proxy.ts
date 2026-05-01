import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function proxy(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const path = request.nextUrl.pathname;

  const isProtected = path.startsWith('/dashboard') || path.startsWith('/admin');
  const isAuthPage = path.startsWith('/login') || path.startsWith('/register');

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (path.startsWith('/admin') && token) {
    try {
      const [, payloadBase64] = token.split('.');
      if (!payloadBase64) throw new Error();

      const payloadJson = atob(payloadBase64);
      const payload = JSON.parse(payloadJson);

      if (payload.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/', request.url));
      }
    } catch {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/login', '/register'],
};
