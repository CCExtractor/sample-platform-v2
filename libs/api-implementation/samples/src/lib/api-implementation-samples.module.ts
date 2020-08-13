import { Module } from '@nestjs/common';

import { SamplesController } from './samples.controller'
import { SamplesService } from './services/samples.service';

@Module({
  controllers: [SamplesController],
  providers: [SamplesService],
  exports: [],
})
export class ApiImplementationSamplesModule {}
