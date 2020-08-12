import { Module } from '@nestjs/common';

import { SamplesController } from './samples.controller'

@Module({
  controllers: [SamplesController],
  providers: [],
  exports: [],
})
export class ApiImplementationSamplesModule {}
