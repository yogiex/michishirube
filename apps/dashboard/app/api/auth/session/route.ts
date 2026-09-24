import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { SESSION_COOKIE_NAME, verifySessionToken } from '@/lib/auth-session';

export async function GET(): Promise<NextResponse> {
  const cookieStore = await cookies();
  const user = await verifySessionToken(cookieStore.get(SESSION_COOKIE_NAME)?.value);
  if (user === null) {
    return NextResponse.json(
      { user: null },
      { status: 401, headers: { 'Cache-Control': 'no-store' } },
    );
  }
  return NextResponse.json({ user }, { headers: { 'Cache-Control': 'no-store' } });
}
