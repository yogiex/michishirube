import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { loadConfig } from './configuration.js';
import { validateEnv } from './env.validation.js';

const envFiles: Record<string, string> = {
  development: '.env.development',
  test: '.env.test',
  production: '.env.production',
};
const selected = envFiles[process.env.NODE_ENV ?? 'development'] ?? '.env';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: [selected, '.env'],
      validate: validateEnv,
      load: [loadConfig],
      expandVariables: true,
    }),
  ],
})
export class ConfigModule {}
