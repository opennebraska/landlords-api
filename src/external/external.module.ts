import { Module } from '@nestjs/common';
import { DcgisWrapper } from './dcgis/dcgis.wrapper';

@Module({
  providers: [DcgisWrapper],
  exports: [DcgisWrapper],
})
export class ExternalModule {}
