import { Module } from '@nestjs/common';
import { VM } from './vm.impl';

@Module({
  controllers: [],
  providers: [VM],
})
export class UtilsModule { }
