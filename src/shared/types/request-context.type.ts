export interface AuthenticatedUser {
  readonly userId: string;
  readonly tenantId: string;
  readonly roles: readonly string[];
  readonly scopes: readonly string[];
  readonly expiresAt: Date;
}

declare global {
  namespace Express {
    interface Request {
      id?: string;
      requestId?: string;
      tenantId?: string;
    }
  }
}
