import { Controller, Get } from '@nestjs/common';

import { Message } from '@new-sample-platform/api-interfaces';

import { AppService } from './app.service';

import { VMOrchestration } from '../../../../libs/api-implementation/orchestration/src/lib/orchestration'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getData(): Message {
    return this.appService.getData();
  }

  @Get('createMachine')
  createmachine() {
    const orchestration = new VMOrchestration();
    orchestration.createMachine("test");
  }
}
