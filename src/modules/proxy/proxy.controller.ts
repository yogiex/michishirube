import { All, Controller, HttpCode, Req, Res } from '@nestjs/common';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { ProxyService } from './proxy.service.js';

@Controller()
export class ProxyController {
  constructor(private readonly proxy: ProxyService) {}

  @All('/api/*')
  @HttpCode(200)
  async handle(@Req() req: FastifyRequest, @Res() reply: FastifyReply): Promise<void> {
    let body: Buffer | undefined;
    if (req.body !== undefined && req.body !== null) {
      if (Buffer.isBuffer(req.body)) {
        body = req.body;
      } else if (typeof req.body === 'string') {
        body = Buffer.from(req.body, 'utf8');
      } else {
        body = Buffer.from(JSON.stringify(req.body), 'utf8');
      }
    }

    const qIdx = req.url.indexOf('?');
    const result = await this.proxy.handle({
      method: req.method,
      path: qIdx === -1 ? req.url : req.url.slice(0, qIdx),
      query: qIdx === -1 ? '' : req.url.slice(qIdx),
      headers: req.headers,
      body,
      ip: req.ip,
    });

    for (const [key, value] of Object.entries(result.headers)) {
      reply.header(key, value);
    }

    reply.status(result.status).send(result.body);
  }
}
