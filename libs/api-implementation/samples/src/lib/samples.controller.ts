import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SamplesService } from './services/samples.service';

@Controller('samples')
export class SamplesController {
  constructor(private service: SamplesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file) {
    try {
      this.service.writeToBucket(file);
    } catch (error) {
      return 'Error while writing the file to the bucket';
    }
    return 200;
  }

  @Get()
  getAllSampleNames() {
    try {
      return this.service.getAllSampleNames();
    } catch (error) {
      return 'Error while fetching sample names';
    }
  }
}
