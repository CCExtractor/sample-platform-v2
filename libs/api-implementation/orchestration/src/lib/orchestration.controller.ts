import { Controller, Get, Post, Param, InternalServerErrorException } from '@nestjs/common';
import { VMOrchestrationService } from './orchestration.service';
import { CreateMachineDTO } from './dto/create-machine.dto'

@Controller('machine')
export class VMOrchestrationController {
  constructor(private orchestrationService : VMOrchestrationService) {}
  
  @Post('create/:name')
  async createMachine(createMachine: CreateMachineDTO) {
    try {
      await this.orchestrationService.createMachine(name)
      return `Machine ${name} successfuly created`
    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException()
    }
  }
}
