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

@Injectable()
export class PropertiesService {
  private readonly logger = new Logger(PropertiesService.name);
  constructor(
    @InjectRepository(PropertiesRepository)
    private propertyRepository: PropertiesRepository,
  ) {}

  static convertPropertyJsonToEntity(
    property: Record<string, unknown>,
  ): CreatePropertyDto {
    return new CreatePropertyDto({
      id: null,
      time: new Date(),
      objectId: property.OBJECTID,
      pin: property.PIN,
      ownerName: property.OWNER_NAME,
      address1: property.ADDRESS1,
      address2: property.ADDRESS2,
      ownerCity: property.OWNER_CITY,
      ownerState: property.OWNER_STAT,
      ownerZip: property.OWNER_ZIP,
      propertyA: property.PROPERTY_A,
      house: property.HOUSE,
      streetDirection: property.STREET_DIR,
      streetName: property.STREET_NAM,
      streetType: property.STREET_TYP,
      apartment: property.APARTMENT,
      propertyCity: property.PROP_CITY,
      propertyZip: property.PROP_ZIP,
      secTwnRn: property.SEC_TWN_RN,
      additionN: property.ADDITION_N,
      block: property.BLOCK,
      lot: property.LOT,
      legal1: property.LEGAL1,
      legal2: property.LEGAL2,
      legal3: property.LEGAL3,
      legal4: property.LEGAL4,
      dcaaccType: property.DCAACCTYPE,
      class: null,
      quality: property.QUALITY,
      condition: property.CONDITION,
      sqFeet: property.SQ_FEET,
      assessor: property.ASSESSOR,
      treasurer: property.TREASURER,
      xCoord: property.X_COORD,
      yCoord: property.Y_COORD,
      addressLA: property.ADDRESS_LA,
      taxDist: property.TAX_DIST,
      shapeArea: property.SHAPESTArea,
      violationCount: null,
      openViolationCount: null,
      userId: null,
    });
  }

  async getProperty(pin: string): Promise<Property> {
    return this.propertyRepository.getProperty(pin);
  }
  async getProperties(
    filterDto: GetPropertiesFilterDto,
    user: User,
  ): Promise<Property[]> {
    return this.propertyRepository.getProperties(filterDto, user);
  }

  async getLandlordProperties(
    filterDto: GetLandlordPropertiesFilterDto,
  ): Promise<Property[]> {
    return this.propertyRepository.getLandlordProperties(filterDto);
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
    user: User,
  ): Promise<Property> {
    return this.propertyRepository.createProperty(createPropertyDto, user);
  }

  async replacePropertyData(): Promise<void> {
    const CSV_URL =
      'https://opendata.arcgis.com/datasets/9e021941e38b42a2971ef68f4a14cfa7_38.csv?outSR=%7B%22latestWkid%22%3A26852%2C%22wkid%22%3A102704%7D';
    this.logger.log('Starting replacePropertyData');
    const { data: csvString } = await axios.get(CSV_URL);
    this.logger.log(`Got the csv string | ${this.getHeapUsed()}`);
    const propertiesJson = await csv({
      output: 'json',
    }).fromString(csvString);
    const numberOfProperties = propertiesJson.length;
    this.logger.log(
      `Properties retrieved and converted to json (${numberOfProperties}), heap MB: ${this.getHeapUsed()}`,
    );
    const batchSize = 500;
    for (let i = 0; i < numberOfProperties; i += batchSize) {
      const batch = propertiesJson.slice(i, i + batchSize);
      await this.createBatchProperties(
        batch.map(PropertiesService.convertPropertyJsonToEntity),
      );
    }
    const startTime = new Date();
    this.logger.log(
      `${startTime}: Finished inserting ${numberOfProperties} properties. heap MB: ${this.getHeapUsed()}`,
    );
    const endTime = new Date();
    this.logger.log(
      `${endTime}: We did it! Check the database. heap MB: ${this.getHeapUsed()}`,
    );
    this.logger.log(
      `With batch size ${batchSize}, this took ${(endTime.getTime() -
        startTime.getTime()) /
        1000} seconds.`,
    );
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
