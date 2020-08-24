import { Module, HttpModule } from '@nestjs/common';
import { ReportController } from './report.controller';

import { HttpAdapterHost } from '@nestjs/core';

@Module({
  imports: [HttpAdapterHost],
  controllers: [ReportController],
  providers: [],
  exports: [],
})
export class ApiImplementationReportModule {}
