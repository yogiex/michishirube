import { Global, Module } from '@nestjs/common';
import { BulkheadModule } from '@/core/bulkhead/bulkhead.module.js';
import { InMemoryBulkheadAdapter } from './in-memory-bulkhead.adapter.js';

@Global()
@Module({
  imports: [BulkheadModule.register({ bulkhead: InMemoryBulkheadAdapter })],
  exports: [BulkheadModule],
})
export class BulkheadInfrastructureModule {}
