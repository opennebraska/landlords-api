import { ZillowWrapper } from './zillow.wrapper';
import { Module } from '@nestjs/common';

@Module({
  providers: [ZillowWrapper],
  exports: [ZillowWrapper],
})
export class ZillowModule {}
