import { Module } from '@nestjs/common';
import { UtilsModule } from '../../../util/src/lib/util.module';
import { VMOrchestrationService } from './services/orchestration.service';
import { VMOrchestrationController } from './orchestration.controller';
import { Compute } from './services/compute.service';

@Module({
  imports: [UtilsModule],
  controllers: [VMOrchestrationController],
  providers: [VMOrchestrationService, Compute],
})
  
export class VMOrchestrationModule { }
