import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create.property.dto';
import { PropertiesRepository } from './properties.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from './property.entity';
import { GetPropertiesFilterDto } from './dto/get-properties-filter.dto';
import { User } from '../auth/user.entity';
import { GetLandlordPropertiesFilterDto } from './dto/get-landlord-properties-filter.dto';
import * as csv from 'csvtojson';
import axios from 'axios';
import { DcgisWrapper } from '../external/dcgis/dcgis.wrapper';

@Injectable()
export class PropertiesService {
  private readonly logger = new Logger(PropertiesService.name);
  constructor(
    @InjectRepository(PropertiesRepository)
    private propertyRepository: PropertiesRepository,
    private dcgisWrapper: DcgisWrapper,
  ) {}

  async getProperty(pin: string): Promise<Property> {
    return this.propertyRepository.getProperty(pin);
  }
  async getProperties(
    filterDto: GetPropertiesFilterDto,
    user: User,
  ): Promise<Property[]> {
    return this.propertyRepository.getProperties(filterDto, user);
  }

  async getLandlordProperties(landlord: string): Promise<Property[]> {
    return this.propertyRepository.getLandlordProperties(landlord);
  }

  async getPropertyById(id: number, user: User): Promise<Property> {
    const found = await this.propertyRepository.findOne({
      where: { id, userId: user.id },
    });
    if (!found) {
      throw new NotFoundException(`Meal with id:${id} not found.`);
    }
    return found;
  }

  async createProperty(
    createPropertyDto: CreatePropertyDto,
  ): Promise<Property> {
    return this.propertyRepository.createProperty(createPropertyDto);
  }

  async replacePropertiesViaApi(): Promise<void> {
    await this.dcgisWrapper.retrieveProperties();
  }

  async createBatchProperties(properties: CreatePropertyDto[]): Promise<void> {
    await this.propertyRepository.createBatchProperties(properties);
  }

  async deleteProperty(id: number, user: User): Promise<void> {
    const result = await this.propertyRepository.delete({
      id,
      userId: user.id,
    });
    if (result.affected === 0) {
      throw new NotFoundException(`Meal with ID "${id}" not found.`);
    }
  }

  getHeapUsed(): string {
    return (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
  }
}
