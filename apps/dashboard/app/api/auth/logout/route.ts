import { NextResponse } from 'next/server';
import { isSameOriginRequest } from '@/lib/auth-navigation';
import { clearSessionCookie } from '@/lib/auth-session';

export function POST(request: Request): NextResponse {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const response = NextResponse.json({ success: true });
  response.headers.append('Set-Cookie', clearSessionCookie());
  response.headers.set('Cache-Control', 'no-store');
  return response;
}
