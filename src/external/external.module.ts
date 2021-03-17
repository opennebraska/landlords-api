import { Module } from '@nestjs/common';
import { DcgisWrapper } from './dcgis/dcgis.wrapper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertiesRepository } from '../properties/properties.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PropertiesRepository])],
  providers: [DcgisWrapper],
  exports: [DcgisWrapper],
})
export class ExternalModule {}
