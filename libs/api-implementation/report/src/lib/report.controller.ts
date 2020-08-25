import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  Body,
} from '@nestjs/common';

import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Controller('report')
export class ReportController {
  constructor() {}

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  async processReport(@UploadedFiles() files, @Body() body) {
    console.log(files, body);
  }
}
