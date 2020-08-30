import { Controller, Get } from '@nestjs/common';
import { TestRunService } from './services/test-run.service';

@Controller('test-run')
export class TestRunController {
  constructor(private service: TestRunService) {}

  @Get()
  async getAllTestRuns() {
    try {
      return await this.service.getAll();
    } catch (error) {
      return `Error while fetching the regression tests`;
    }
  }
}
