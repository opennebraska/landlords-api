import {EntityRepository, Repository} from "typeorm";
import {Property} from "./property.entity";
import {CreatePropertyDto} from "./dto/create.property.dto";
import {GetPropertiesFilterDto} from "./dto/get-properties-filter.dto";
import {User} from "../auth/user.entity";

@EntityRepository(Property)
export class PropertiesRepository extends Repository<Property> {
    async createProperty(createMealDto: CreatePropertyDto, user: User): Promise<Property> {
        const property = new Property();
        await property.save();

        return property;
    }

    async getProperties(filterDto: GetPropertiesFilterDto, user: User): Promise<Property[]> {
        const {search, limit} = filterDto;
        const query = this.createQueryBuilder('property')
        if(search){
            query.orWhere("LOWER(property.ownerName) LIKE LOWER(:search)", {search: `%${search}%`})
            query.orWhere("LOWER(property.address2) LIKE LOWER(:search)", {search: `%${search}%`})
            query.orWhere("LOWER(property.propertyZip) LIKE LOWER(:search)", {search: `%${search}%`})
            query.orWhere("LOWER(property.propertyA) LIKE LOWER(:search)", {search: `%${search}%`})
            query.orWhere("LOWER(property.propertyCity) LIKE LOWER(:search)", {search: `%${search}%`})
        }
        if (limit) {
            query.limit(limit)
        }
        query.orderBy('property.id', "DESC")

        const properties = await query.getMany()
        return properties;
    }
}
