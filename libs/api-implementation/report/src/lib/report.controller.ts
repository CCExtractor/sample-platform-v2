import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  Body,
} from '@nestjs/common';

import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ReportService } from './services/report.service';

@Controller('report')
export class ReportController {
  constructor(private service: ReportService) {}

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  async processReport(@UploadedFiles() files: any[], @Body() body) {
    try {
      const githubNumberPlaceholder = 42;

      if (body.type === 'upload') {
        const isSuccess = await this.service.fileIsCorrect(
          files[0],
          body.test_id
        );
        await this.service.createResult(
          Number(body.test_id),
          isSuccess,
          githubNumberPlaceholder
        );
      } else if (body.type === 'finish') {
        await this.service.updateResult(
          Number(body.test_id),
          Number(body.runTime),
          Number(body.exitCode),
          githubNumberPlaceholder
        );
      }
    } catch (error) {
      return 'Error while processing the report';
    }
  }
}
