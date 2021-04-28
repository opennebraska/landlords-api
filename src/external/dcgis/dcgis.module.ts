import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertiesRepository } from '../../properties/properties.repository';
import { DcgisPropertyWrapper } from './dcgis-property-wrapper.service';

@Module({
  imports: [TypeOrmModule.forFeature([PropertiesRepository])],
  providers: [DcgisPropertyWrapper],
  exports: [DcgisPropertyWrapper],
})
export class DcgisModule {}
