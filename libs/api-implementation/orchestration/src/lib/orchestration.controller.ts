import { Controller, Get, Post, Param, InternalServerErrorException, Body } from '@nestjs/common';
import { VMOrchestrationService } from './orchestration.service';
import { CreateMachineDTO } from './dto/create-machine.dto'

@Controller('machine')
export class VMOrchestrationController {
  constructor(private orchestrationService : VMOrchestrationService) {}
  
  @Post('create')
  async createMachine(@Body() createMachineDTO: CreateMachineDTO) {
    try {
      await this.orchestrationService.createMachine(createMachineDTO.name)
      return `Machine ${createMachineDTO.name} successfuly created`
    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException()
    }
  }
}
