import { Module } from '@nestjs/common';
import { UtilsModule } from '../../../util/src/lib/util.module';
import { VMOrchestrationService } from './orchestration.service';
import { VMOrchestrationController } from './orchestration.controller';
@Module({
  imports: [UtilsModule],
  controllers: [VMOrchestrationController],
  providers: [VMOrchestrationService],
})
export class VMOrchestrationModule { }
