import { beforeAll, describe, expect, it } from 'vitest';
import { createSessionToken, verifySessionToken, type AuthUser } from './auth-session';

const admin: AuthUser = {
  userId: 'u_001',
  tenantId: 'acme',
  roles: ['admin'],
  email: 'admin@example.com',
};

beforeAll(() => {
  process.env.DASHBOARD_SESSION_SECRET = 'test-secret-that-is-at-least-32-characters-long';
});

describe('dashboard session', () => {
  it('round trips a signed administrator session', async () => {
    const token = await createSessionToken(admin);
    await expect(verifySessionToken(token)).resolves.toEqual(admin);
  });

  it('rejects a modified signature', async () => {
    const token = await createSessionToken(admin);
    const replacement = token.endsWith('A') ? 'B' : 'A';
    const modified = `${token.slice(0, -1)}${replacement}`;
    await expect(verifySessionToken(modified)).resolves.toBeNull();
  });

  it('rejects non-admin sessions', async () => {
    await expect(createSessionToken({ ...admin, roles: ['user'] })).rejects.toThrow(
      'Invalid dashboard administrator',
    );
  });
});
