import { FastifyAdapter } from '@nestjs/platform-fastify';
import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import type { Server } from 'node:http';
import { AppModule } from '@/app.module.js';
import { GlobalExceptionFilter } from '@/shared/errors/index.js';
import {
  removeFixtureDir,
  writeRoutesFixture,
  writeTenantsFixture,
  type RouteFixture,
} from './routes-fixture.helper.js';

export interface TestApp {
  readonly app: INestApplication;
  readonly close: () => Promise<void>;
  readonly routesFile: string;
  readonly tenantsFile: string;
}

function defaultRoutes(upstreamUrl: string): readonly RouteFixture[] {
  return [
    {
      id: 'default-get',
      path: '/default',
      method: 'GET',
      upstream: `${upstreamUrl}/get`,
      enabled: true,
      requireAuth: false,
      requireIdempotency: false,
      roles: [],
      timeoutMs: 5000,
    },
    {
      id: 'default-post',
      path: '/default',
      method: 'POST',
      upstream: `${upstreamUrl}/post`,
      enabled: true,
      requireAuth: false,
      requireIdempotency: false,
      roles: [],
      timeoutMs: 5000,
    },
  ];
}

export async function createTestApp(options: {
  readonly upstreamUrl: string;
  readonly routes?: readonly RouteFixture[];
  readonly extraEnv?: Readonly<Record<string, string>>;
}): Promise<TestApp> {
  const routes = [...defaultRoutes(options.upstreamUrl), ...(options.routes ?? [])];
  const routesFile = await writeRoutesFixture(routes);
  const tenantsFile = await writeTenantsFixture([
    { id: 'test-tenant', slug: 'test-tenant', name: 'Test Tenant', status: 'active', tier: 'free' },
  ]);
  process.env.ROUTES_FILE = routesFile;
  process.env.TENANTS_FILE = tenantsFile;
  process.env.NODE_ENV = 'test';
  Object.assign(process.env, options.extraEnv);

  const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
  const app = moduleRef.createNestApplication(new FastifyAdapter());
  app.useGlobalFilters(new GlobalExceptionFilter());
  await app.init();
  await app.getHttpAdapter().getInstance().ready();

  return {
    app,
    routesFile,
    tenantsFile,
    close: async () => {
      await app.close();
      await removeFixtureDir(routesFile.slice(0, routesFile.lastIndexOf('/')));
      await removeFixtureDir(tenantsFile.slice(0, tenantsFile.lastIndexOf('/')));
    },
  };
}

export function getHttpTarget(app: TestApp): Server {
  return app.app.getHttpServer();
}
