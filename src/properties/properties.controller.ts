import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { GetPropertiesFilterDto } from './dto/get-properties-filter.dto';
import { Property } from './property.entity';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { GetLandlordPropertiesFilterDto } from './dto/get-landlord-properties-filter.dto';

@Controller('properties')
export class PropertiesController {
  constructor(private propertiesService: PropertiesService) {}

  @Get('/:pin')
  getProperty(@Param('pin') pin: string): Promise<Property> {
    return this.propertiesService.getProperty(pin);
  }

  @Get('/landlord/:landlord')
  getLandlordProperties(
    @Param(ValidationPipe) filterDto: GetLandlordPropertiesFilterDto,
  ): Promise<Property[]> {
    return this.propertiesService.getLandlordProperties(filterDto);
  }

  @Get()
  getProperties(
    @Query(ValidationPipe) filterDto: GetPropertiesFilterDto,
    @GetUser() user: User,
  ): Promise<Property[]> {
    return this.propertiesService.getProperties(filterDto, user);
  }

  @Post('/refresh')
  refreshProperties(@Body('code') code: string): Promise<void> {
    const refreshKey = process.env.REFRESH_KEY || 'magic_key';
    if (refreshKey === code) {
      return this.propertiesService.replacePropertyData();
    }
  }
}
