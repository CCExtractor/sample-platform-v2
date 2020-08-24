import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';

import { 
  FilesInterceptor,
} from '@nestjs/platform-express';

@Controller('report')
export class ReportController {
  constructor() { }

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async processReport(@UploadedFiles() files) {
    console.log(files)
  }
}

