import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  Body,
  Query,
} from '@nestjs/common';

import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ReportService } from './services/report.service';

@Controller('report')
export class ReportController {
  constructor(private service: ReportService) {}

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  async processReport(
    @UploadedFiles() files: any[],
    @Query() query,
    @Body() body
  ) {
    try {
      if (body.type === 'upload') {
        const isSuccess = await this.service.fileIsCorrect(
          files[0],
          body.test_id
        );
        await this.service.createResult(
          Number(body.test_id),
          isSuccess,
          query.id,
          query.type
        );
      } else if (body.type === 'finish') {
        await this.service.updateResult(
          Number(body.test_id),
          Number(body.runTime),
          Number(body.exitCode),
          query.id
        );
      }
    } catch (error) {
      return 'Error while processing the report';
    }
  }
}
