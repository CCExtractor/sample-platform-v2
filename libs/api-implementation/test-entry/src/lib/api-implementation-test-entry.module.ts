import { Module } from '@nestjs/common';
import { ApiImplementationDatabaseModule } from '@new-sample-platform/api-implementation/database';
import { TestEntryController } from './test-entry.controller';
import { TestEntryService } from './services/test-entry.service';
import { ApiImplementationXmlModule } from '@new-sample-platform/api-implementation/xml';

@Module({
  imports: [ApiImplementationDatabaseModule, ApiImplementationXmlModule],
  controllers: [TestEntryController],
  providers: [TestEntryService],
  exports: [],
})
export class ApiImplementationTestEntryModule {}
