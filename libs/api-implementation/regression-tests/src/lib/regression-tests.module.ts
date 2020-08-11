import { Module } from '@nestjs/common';

// tslint:disable-next-line: nx-enforce-module-boundaries
import { ApiImplementationDatabaseModule } from '../../../database/src/lib/api-implementation-database.module';
import { RegressiontTestController } from './regression-tests.controller';
import { RegressionTestService } from './services/regression-tests.service';

@Module({
  imports: [ApiImplementationDatabaseModule],
  controllers: [RegressiontTestController],
  providers: [RegressionTestService],
  exports: [],
})
export class ApiImplementationRegressionTestsModule {}
