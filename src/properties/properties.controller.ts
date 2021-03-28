import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { Property } from './property.entity';
import { PropertyImageResponse } from './dto/property-image.response';

@Controller('properties')
export class PropertiesController {
  constructor(private propertiesService: PropertiesService) {}

  @Get('/:pin')
  getProperty(@Param('pin') pin: string): Promise<Property> {
    return this.propertiesService.getProperty(pin);
  }

  @Get()
  getProperties(
    @Query('search') search: string,
    @Query('limit') limit = 2000,
  ): Promise<Property[]> {
    return this.propertiesService.getProperties(search, limit);
  }

  @Post('/refresh')
  refreshProperties(@Body('code') code: string): Promise<void> {
    const refreshKey = process.env.REFRESH_KEY || 'magic_key';
    console.log(`code = ${code}`);
    if (refreshKey === code) {
      return this.propertiesService.replacePropertiesViaApi();
    }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:pin/image')
  async getPropertyImage(
    @Param('pin') pin: string,
  ): Promise<PropertyImageResponse> {
    const property = await this.propertiesService.getProperty(pin);
    const {
      addressLA: address,
      propertyCity: city,
      propertyZip: zip,
    } = property;
    return new PropertyImageResponse(
      await this.propertiesService.getPropertyImage(address, city, zip),
    );
  }
}
