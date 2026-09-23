import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module.js';
import { GlobalExceptionFilter } from './shared/errors/index.js';

async function bootstrap(): Promise<void> {
  const adapter = new FastifyAdapter({ trustProxy: true, bodyLimit: 1_048_576 });
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, adapter, {
    bufferLogs: true,
  });

  app.useLogger(app.get(Logger));
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.enableShutdownHooks();

  // Parser catch-all: body non-JSON (text/plain, form, dll) diterima sebagai
  // Buffer alih-alih 415. Parser bawaan application/json tetap berprioritas.
  app
    .getHttpAdapter()
    .getInstance()
    .addContentTypeParser(
      '*',
      { parseAs: 'buffer' },
      (_req: unknown, body: Buffer, done: (err: Error | null, result?: Buffer) => void) => {
        done(null, body);
      },
    );

  const config = app.get(ConfigService);
  const port = config.get<number>('app.port') ?? 3000;

  await app.listen(port, '0.0.0.0');
  app.get(Logger).log(`🚀 API Gateway listening on :${port}`);
}

void bootstrap();
