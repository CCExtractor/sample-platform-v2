import { Module } from '@nestjs/common';
import { ApiImplementationDatabaseModule } from '@new-sample-platform/api-implementation/database';
import { XMLController } from './xml.controller';
import { XmlGenerationService } from './services/xml-generation.service';

@Module({
  imports: [ApiImplementationDatabaseModule],
  controllers: [XMLController],
  providers: [XmlGenerationService],
  exports: [XmlGenerationService],
})
export class ApiImplementationXmlModule {}
