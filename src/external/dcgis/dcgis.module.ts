import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertiesRepository } from '../../properties/properties.repository';
import { DcgisWrapper } from './dcgis.wrapper';

@Module({
  imports: [TypeOrmModule.forFeature([PropertiesRepository])],
  providers: [DcgisWrapper],
  exports: [DcgisWrapper],
})
export class DcgisModule {}
