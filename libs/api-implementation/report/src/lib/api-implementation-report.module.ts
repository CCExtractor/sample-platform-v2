import { Module, HttpModule } from '@nestjs/common';
import { ReportController } from './report.controller';

import { HttpAdapterHost } from '@nestjs/core';
import { ReportService } from './services/report.service';
import { ApiImplementationDatabaseModule } from '@new-sample-platform/api-implementation/database'

@Module({
  imports: [HttpAdapterHost, ApiImplementationDatabaseModule],
  controllers: [ReportController],
  providers: [ReportService],
  exports: [],
})
export class ApiImplementationReportModule {}
