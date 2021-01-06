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
        const {status, search} = filterDto;
        const query = this.createQueryBuilder('property');
        if (filterDto.limit) {
            query.limit(filterDto.limit)
        }
        query.orderBy('property.id', "DESC")

        const properties = await query.getMany()
        return properties;
    }
}
