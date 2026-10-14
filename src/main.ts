import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module.js';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
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
  const nodeEnv = config.get<string>('app.env') ?? process.env.NODE_ENV ?? 'development';

  const swaggerEnabledRaw = process.env.SWAGGER_ENABLED;
  const swaggerEnabled =
    swaggerEnabledRaw === undefined
      ? nodeEnv !== 'production'
      : swaggerEnabledRaw === 'true' || swaggerEnabledRaw === '1';

  if (swaggerEnabled) {
    const document = SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('API Gateway')
        .setDescription(
          'Internal administrator documentation. Restricted to authorized admins. No secrets or environment values are exposed.',
        )
        .setVersion('0.1.0')
        .addBearerAuth()
        .build(),
    );
    SwaggerModule.setup('docs', app, document);
  }

  const port = config.get<number>('app.port') ?? 3000;

  await app.listen(port, '0.0.0.0');
  app.get(Logger).log(`🚀 API Gateway listening on :${port}`);
}

void bootstrap();
