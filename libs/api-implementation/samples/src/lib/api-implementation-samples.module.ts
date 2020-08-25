import { Module } from '@nestjs/common';

import { SamplesController } from './samples.controller';
import { SamplesService } from './services/samples.service';
import { ApiImplementationDatabaseModule } from '@new-sample-platform/api-implementation/database';

@Module({
  imports: [ApiImplementationDatabaseModule],
  controllers: [SamplesController],
  providers: [SamplesService],
  exports: [],
})
export class ApiImplementationSamplesModule {}
