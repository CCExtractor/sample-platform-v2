import { Module, HttpModule } from '@nestjs/common';

import { AppController } from './app.controller';
//TODO: fix the naming so that prefix import will work
import { VMOrchestrationModule } from '../../../../libs/api-implementation/orchestration/src';
import { ApiImplementationRegressionTestsModule } from '@new-sample-platform/api-implementation/regression-tests';
import { ApiImplementationDatabaseModule } from '@new-sample-platform/api-implementation/database';
import { ApiImplementationSamplesModule } from '@new-sample-platform/api-implementation/samples';
import { ApiImplementationReportModule } from '@new-sample-platform/api-implementation/report';
import { ApiImplementationTestEntryModule } from '@new-sample-platform/api-implementation/test-entry';
import { ApiImplementationXmlModule } from '@new-sample-platform/api-implementation/xml';
import { ApiImplementationTestRunModule } from '@new-sample-platform/api-implementation/test-run';
import { HttpAdapterHost } from '@nestjs/core';

@Module({
  imports: [
    HttpAdapterHost,
    VMOrchestrationModule,
    ApiImplementationTestRunModule,
    ApiImplementationXmlModule,
    ApiImplementationTestEntryModule,
    ApiImplementationReportModule,
    ApiImplementationRegressionTestsModule,
    ApiImplementationDatabaseModule,
    ApiImplementationSamplesModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
