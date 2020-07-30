import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { VMOrchestrationModule } from '../../../../libs/api-implementation/orchestration/src';
import { ApiImplementationRegressionTestsModule } from '../../../../libs/api-implementation/regression-tests/src'
import { ApiImplementationDatabaseModule } from '../../../../libs/api-implementation/database/src'

@Module({
  imports: [VMOrchestrationModule, ApiImplementationRegressionTestsModule, ApiImplementationDatabaseModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
