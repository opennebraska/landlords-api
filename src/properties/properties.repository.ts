import { EntityRepository, Repository } from 'typeorm';
import { Property } from './property.entity';
import { CreatePropertyDto } from './dto/create.property.dto';
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
    const batches = chunk(properties, 2000);
    batches.forEach(propertyBatch => {
      this.createQueryBuilder()
        .insert()
        .into(Property)
        .values(propertyBatch)
        .execute();
    });
  }

  async deleteAllProperties() {
    await this.createQueryBuilder('property')
      .delete()
      .execute();
  }

  async getProperty(pin: string): Promise<Property> {
    const query = this.createQueryBuilder(
      'property',
    ).where('property.pin = :pin', { pin });
    const property = await query.getOne();
    return property;
  }

  async getProperties(search: string, limit: number): Promise<Property[]> {
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

  async getLandlordProperties(landlord: string): Promise<Property[]> {
    const query = this.createQueryBuilder('property').where(
      'LOWER(property.ownerName) LIKE LOWER(:ownerName)',
      {
        ownerName: `${landlord}`,
      },
    );
    const properties = await query.getMany();
    return properties;
  }
}
