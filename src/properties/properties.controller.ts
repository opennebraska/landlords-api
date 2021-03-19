import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { Property } from './property.entity';

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
    @Query('limit') limit = 25,
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
}
