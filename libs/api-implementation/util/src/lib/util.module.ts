import { Module } from '@nestjs/common';
import { VMService } from './vm.impl';

@Module({
  controllers: [],
  providers: [VMService],
})
export class UtilsModule { }
