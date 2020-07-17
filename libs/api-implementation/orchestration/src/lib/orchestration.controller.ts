import { Controller, Post, Body } from '@nestjs/common';
import { VMOrchestrationService } from './services/orchestration.service';
import { CreateMachineDTO } from './dto/create-machine.dto';

@Controller('machine')
export class VMOrchestrationController {
  constructor(private orchestrationService: VMOrchestrationService) {}

  @Post('create')
  async createMachine(@Body() createMachineDTO: CreateMachineDTO) {
    await this.orchestrationService.createMachine(createMachineDTO.name);
    return `Machine ${createMachineDTO.name} successfuly created`;
  }
}
