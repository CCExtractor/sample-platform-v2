import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { STATUS_CODES } from 'http';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }
  

  @Get('/latest-linux-artifact')
  async getArtifact() {
    await this.appService.getArtifact();
    return "OK";
  }

  @Get()
  getData() {
    return this.appService.getData();
  }
}
