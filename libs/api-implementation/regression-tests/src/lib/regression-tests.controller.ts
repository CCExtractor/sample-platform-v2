import { Controller, Post } from '@nestjs/common';

@Controller('regression-test')
export class RegressiontTestController {
  constructor() {}

  @Post('create')
  async createMachine() {
    try {

    } catch (error) {
      return `Error while creating the machine`
    }
  }
}
