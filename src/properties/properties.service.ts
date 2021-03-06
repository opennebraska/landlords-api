import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create.property.dto';
import { PropertiesRepository } from './properties.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from './property.entity';
import { User } from '../auth/user.entity';
import { DcgisPropertyWrapper } from '../external/dcgis/dcgis-property-wrapper.service';
import { ZillowWrapper } from '../external/zillow/zillow.wrapper';

@Injectable()
export class PropertiesService {
  private readonly logger = new Logger(PropertiesService.name);
  constructor(
    @InjectRepository(PropertiesRepository)
    private propertyRepository: PropertiesRepository,
    private dcgisWrapper: DcgisPropertyWrapper,
    private zillowWrapper: ZillowWrapper,
  ) {}

  async getProperty(pin: string): Promise<Property> {
    return this.propertyRepository.getProperty(pin);
  }
  async getProperties(search: string, limit: number): Promise<Property[]> {
    return this.propertyRepository.getProperties(search, limit);
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

  async getPropertyImage(
    address: string,
    city: string,
    zip: string,
  ): Promise<string> {
    return this.zillowWrapper.getPropertyImageUrl(address, city, zip);
  }

  getHeapUsed(): string {
    return (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
  }
}
