import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { safeReturnTo } from '@/lib/auth-navigation';
import { SESSION_COOKIE_NAME, verifySessionToken } from '@/lib/auth-session';

const loginPath = '/login';

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const { pathname, search } = request.nextUrl;
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const user = await verifySessionToken(token);
  const destination = safeReturnTo(`${pathname}${search}`);

  if (pathname === loginPath) {
    return user === null
      ? NextResponse.next()
      : NextResponse.redirect(new URL(destination, request.url));
  }

  if (user === null || !user.roles.includes('admin')) {
    const loginUrl = new URL(loginPath, request.url);
    if (destination !== '/') loginUrl.searchParams.set('returnTo', destination);
    const response = NextResponse.redirect(loginUrl);
    response.cookies.set(SESSION_COOKIE_NAME, '', {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 0,
    });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
