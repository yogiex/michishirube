export interface ApiKeyHashService {
  generatePlaintext(): string;
  hash(plaintextKey: string): Promise<string>;
  verify(keyHash: string, plaintextKey: string): Promise<boolean>;
  indexHash(plaintextKey: string): string;
  displayPrefix(plaintextKey: string): string;
  isValidFormat(plaintextKey: string): boolean;
}
