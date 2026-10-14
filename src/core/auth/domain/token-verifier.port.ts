import type { Principal } from './principal.entity.js';

export const TOKEN_VERIFIER = Symbol('TOKEN_VERIFIER');

export interface TokenVerifierPort {
  verify(token: string): Promise<Principal>;
}
