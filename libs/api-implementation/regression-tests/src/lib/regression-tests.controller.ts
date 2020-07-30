import { Controller, Post, Body, Get } from '@nestjs/common';
import { RegressionTestService } from './services/regression-tests.service';
import { RegressionTestDTO } from './dto/regression-test.dto';

@Controller('regression-test')
export class RegressiontTestController {
  constructor(private service: RegressionTestService) {}

  @Post()
  async createRegressionTest(@Body() regressionTestDTO: RegressionTestDTO) {
    try {
      return await this.service.create(regressionTestDTO.command)
    } catch (error) {
      return `Error creating the regression test`
    }
  }

  @Get()
  async getAllRegressionTests() {
    try {
      return await this.service.getAll()
    } catch (error) {
      return `Error while fetching the regression tests`
    }
  }
}
