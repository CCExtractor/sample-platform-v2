import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { VMOrchestrationModule } from '../../../../libs/api-implementation/orchestration/src';

@Module({
  imports: [VMOrchestrationModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
