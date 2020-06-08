import { Module } from '@nestjs/common';
import { VMService } from './vm.service';

@Module({
  controllers: [],
  providers: [VMService],
})
export class UtilsModule {}