import { Module, Global } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import type { IncomingMessage } from 'node:http';

@Global()
@Module({
  imports: [
    PinoLoggerModule.forRootAsync({
      imports: [],
      providers: [],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const isDev = config.get<string>('app.env') !== 'production';
        return {
          pinoHttp: {
            level: config.get<string>('app.logLevel') ?? 'info',
            genReqId: (req: IncomingMessage) => (req.id as string) ?? 'unknown',
            customProps: (req: IncomingMessage) => ({
              tenantId: (req as { tenantId?: string }).tenantId,
              userId: (req as { user?: { id?: string } }).user?.id,
            }),
            redact: {
              paths: [
                'req.headers.authorization',
                'req.headers.cookie',
                'req.body.password',
                'req.body.token',
                'req.body.secret',
                'req.body.apiKey',
                'res.headers["set-cookie"]',
              ],
              censor: '[REDACTED]',
            },
            transport: isDev
              ? { target: 'pino-pretty', options: { singleLine: true, colorize: true } }
              : undefined,
          },
        };
      },
    }),
  ],
})
export class LoggerModule {}
