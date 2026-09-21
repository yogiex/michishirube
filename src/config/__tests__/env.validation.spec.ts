import { validateEnv } from '../env.validation.js';

describe('env.validation', () => {
  it('applies defaults when env is empty', () => {
    const env = validateEnv({});
    expect(env.NODE_ENV).toBe('development');
    expect(env.PORT).toBe(3000);
    expect(env.SERVICE_NAME).toBe('api-gateway');
    expect(env.LOG_LEVEL).toBe('info');
    expect(env.REDIS_HOST).toBe('localhost');
    expect(env.REDIS_PORT).toBe(6379);
  });

  it('parses valid values', () => {
    const env = validateEnv({
      NODE_ENV: 'production',
      PORT: '8080',
      REDIS_PASSWORD: 'secret',
      JWKS_URI: 'https://auth.example.com/.well-known/jwks.json',
      LOG_LEVEL: 'info',
    });
    expect(env.NODE_ENV).toBe('production');
    expect(env.PORT).toBe(8080);
  });

  it('throws on invalid NODE_ENV', () => {
    expect(() => validateEnv({ NODE_ENV: 'staging' })).toThrow(
      'Invalid environment variables',
    );
  });

  it('throws on invalid PORT', () => {
    expect(() => validateEnv({ PORT: 'abc' })).toThrow(
      'Invalid environment variables',
    );
  });

  it('throws when production uses development values', () => {
    expect(() =>
      validateEnv({
        NODE_ENV: 'production',
        REDIS_PASSWORD: '',
        JWKS_URI: 'http://localhost:4001/.well-known/jwks.json',
        LOG_LEVEL: 'debug',
      }),
    ).toThrow('Production config tidak boleh pakai nilai development');
  });
});