import { PropertiesService } from '../properties/properties.service';
import { Controller, Get, Query } from '@nestjs/common';
import { Property } from '../properties/property.entity';

@Controller('landlords')
export class LandlordsController {
  constructor(private propertiesService: PropertiesService) {}

  @Get()
  getLandlordProperties(
    @Query('search') landlord: string,
  ): Promise<Property[]> {
    return this.propertiesService.getLandlordProperties(landlord);
  }
}
