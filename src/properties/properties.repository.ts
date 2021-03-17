import { EntityRepository, Repository } from 'typeorm';
import { Property } from './property.entity';
import { CreatePropertyDto } from './dto/create.property.dto';
import { GetPropertiesFilterDto } from './dto/get-properties-filter.dto';
import { User } from '../auth/user.entity';
import { GetLandlordPropertiesFilterDto } from './dto/get-landlord-properties-filter.dto';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const chunk = require('lodash.chunk');

@EntityRepository(Property)
export class PropertiesRepository extends Repository<Property> {
  async createProperty(
    createPropertyDto: CreatePropertyDto,
  ): Promise<Property> {
    const property = new Property(createPropertyDto);
    await property.save();
    return property;
  }

  async createBatchProperties(properties: CreatePropertyDto[]) {
    await this.createQueryBuilder('property')
      .delete()
      .execute();
    const batches = chunk(properties, 2000);
    batches.forEach(propertyBatch => {
      this.createQueryBuilder()
        .insert()
        .into(Property)
        .values(propertyBatch)
        .execute();
    });
  }

  async getProperty(pin: string): Promise<Property> {
    const query = this.createQueryBuilder(
      'property',
    ).where('property.pin = :pin', { pin });
    const property = await query.getOne();
    return property;
  }

  async getProperties(
    filterDto: GetPropertiesFilterDto,
    user: User,
  ): Promise<Property[]> {
    const { search, limit } = filterDto;
    const query = this.createQueryBuilder('property');
    if (search) {
      query.orWhere('LOWER(property.ownerName) LIKE LOWER(:search)', {
        search: `%${search}%`,
      });
      query.orWhere('LOWER(property.address2) LIKE LOWER(:search)', {
        search: `%${search}%`,
      });
      query.orWhere('LOWER(property.propertyZip) LIKE LOWER(:search)', {
        search: `%${search}%`,
      });
      query.orWhere('LOWER(property.propertyA) LIKE LOWER(:search)', {
        search: `%${search}%`,
      });
      query.orWhere('LOWER(property.propertyCity) LIKE LOWER(:search)', {
        search: `%${search}%`,
      });
    }
    if (limit) {
      query.limit(limit);
    }
    query.orderBy('property.id', 'DESC');

    const properties = await query.getMany();
    return properties;
  }

  async getLandlordProperties(
    filterDto: GetLandlordPropertiesFilterDto,
  ): Promise<Property[]> {
    const { landlord } = filterDto;
    const query = this.createQueryBuilder('property').where(
      'LOWER(property.ownerName) = LOWER(:ownerName)',
      {
        ownerName: landlord,
      },
    );
    const properties = await query.getMany();
    return properties;
  }
}
