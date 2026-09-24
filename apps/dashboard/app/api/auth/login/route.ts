import { NextResponse } from 'next/server';
import { z } from 'zod';
import { isSameOriginRequest } from '@/lib/auth-navigation';
import { createSessionToken, sessionCookie, type AuthUser } from '@/lib/auth-session';

const LoginSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  password: z.string().min(8).max(128),
  remember: z.boolean(),
});

function configuredCredentials(): { email: string; password: string } {
  const email = process.env.DASHBOARD_ADMIN_EMAIL;
  const password = process.env.DASHBOARD_ADMIN_PASSWORD;
  if (!email || !password || password.length < 12) {
    throw new Error('Dashboard admin credentials are not configured');
  }
  return { email: email.trim().toLowerCase(), password };
}

export async function POST(request: Request): Promise<NextResponse> {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const parsed = LoginSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid login request' }, { status: 400 });
  }

  const credentials = configuredCredentials();
  if (parsed.data.email !== credentials.email || parsed.data.password !== credentials.password) {
    return NextResponse.json({ error: 'Email atau password salah' }, { status: 401 });
  }

  const user: AuthUser = {
    userId: process.env.DASHBOARD_ADMIN_USER_ID ?? 'u_001',
    tenantId: process.env.DASHBOARD_ADMIN_TENANT_ID ?? 'acme',
    roles: ['admin'],
    email: credentials.email,
  };
  const token = await createSessionToken(user, parsed.data.remember);
  const response = NextResponse.json({ user });
  response.headers.append('Set-Cookie', sessionCookie(token, parsed.data.remember));
  response.headers.set('Cache-Control', 'no-store');
  return response;
}
