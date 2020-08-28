import {
  Controller,
  Post,
  Body,
  Get,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { TestEntryDTO } from './dto/test-entry.dto';
import { TestEntryService } from './services/test-entry.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { XmlGenerationService } from '@new-sample-platform/api-implementation/xml';

@Controller('test-entry')
export class TestEntryController {
  constructor(
    private service: TestEntryService,
    private xmlService: XmlGenerationService
  ) {}

  @UseInterceptors(AnyFilesInterceptor())
  @Post()
  async createTestEntry(
    @UploadedFiles() files,
    @Body() testEntryDTO: TestEntryDTO
  ) {
    try {
      await this.service.create(
        testEntryDTO.category,
        testEntryDTO.command,
        testEntryDTO.sample,
        files
      );
      await this.xmlService.generateXML();
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
