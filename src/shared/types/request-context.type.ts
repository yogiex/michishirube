declare global {
  namespace Express {
    interface Request {
      /** X-Request-ID yang dipakai sepanjang request */
      id?: string;
      requestId?: string;
      /** Tenant ter-resolve (prioritas: JWT claim → subdomain → header) */
      tenantId?: string;
      /** Principal ter-autentikasi */
      user?: { id?: string };
    }
  }
}

export {};