import { Controller, Post, Body, Get, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { TestEntryDTO } from './dto/test-entry.dto';
import { TestEntryService } from './services/test-entry.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Controller('test-entry')
export class TestEntryController {
  constructor(private service: TestEntryService) {}

  @UseInterceptors(AnyFilesInterceptor())
  @Post()
  async createRegressionTest(@UploadedFiles() files, @Body() testEntryDTO: TestEntryDTO) {
    console.log("files", files)
    console.log("===========================")
    console.log("Payload", testEntryDTO)
    try {
    } catch (error) {
      return `Error creating the test entry`;
    }
  }

  @Get()
  async getAllTestEntries() {
    try {
      return await this.service.getAll();
    } catch (error) {
      return `Error while fetching the regression tests`;
    }
  }
}
