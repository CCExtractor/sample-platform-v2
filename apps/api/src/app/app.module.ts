import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { VMOrchestrationModule } from '../../../../libs/api-implementation/orchestration/src';
import { ApiImplementationRegressionTestsModule } from '@new-sample-platform/api-implementation/regression-tests';
import { ApiImplementationDatabaseModule } from '@new-sample-platform/api-implementation/database';
import { ApiImplementationSamplesModule } from '@new-sample-platform/api-implementation/samples'

@Module({
  imports: [
    VMOrchestrationModule,
    ApiImplementationRegressionTestsModule,
    ApiImplementationDatabaseModule,
    ApiImplementationSamplesModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
