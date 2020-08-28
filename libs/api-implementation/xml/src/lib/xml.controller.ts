import {
  Controller,
  Get,
} from '@nestjs/common';
import { XmlGenerationService } from './services/xml-generation.service';

@Controller('xml')
export class XMLController {
  constructor(private service: XmlGenerationService) {}

  @Get()
  getAllSampleNames() {
    try {
      this.service.generateXML();
    } catch (error) {
      return 'Error while fetching sample names';
    }
  }
}
