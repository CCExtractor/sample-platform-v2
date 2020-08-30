import { Module } from '@nestjs/common';
import { ApiImplementationDatabaseModule } from '@new-sample-platform/api-implementation/database';
import { TestRunController } from './test-run.controller';
import { TestRunService } from './services/test-run.service';

@Module({
  imports: [ApiImplementationDatabaseModule],
  controllers: [TestRunController],
  providers: [TestRunService],
  exports: [],
})
export class ApiImplementationTestRunModule {}
