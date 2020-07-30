import { Module } from '@nestjs/common';

// tslint:disable-next-line: nx-enforce-module-boundaries
import { ApiImplementationDatabaseModule } from '../../../database/src';
import { RegressiontTestController } from './regression-tests.controller';

@Module({
  imports: [ApiImplementationDatabaseModule],
  controllers: [RegressiontTestController],
  providers: [],
  exports: [],
})
export class ApiImplementationRegressionTestsModule {}
