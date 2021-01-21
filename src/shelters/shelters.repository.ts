import {EntityRepository, Repository} from "typeorm";
import {Shelter} from "./shelter.entity";
import {GetSheltersFilterDto} from "./dto/get-shelters-filter.dto";
import {User} from "../auth/user.entity";

@EntityRepository(Shelter)
export class SheltersRepository extends Repository<Shelter> {
    async getShelters(filterDto: GetSheltersFilterDto): Promise<Shelter[]> {
        const {status, search} = filterDto;
        const query = this.createQueryBuilder('shelter');
        if (filterDto.limit) {
            query.limit(filterDto.limit)
        }
        if(filterDto.search){
            const lowerSearch = search.toLowerCase()
            query.andWhere('LOWER(shelter.name) LIKE :search or LOWER(shelter.location) LIKE :search', {search: `%${lowerSearch}%`})
        }

        const shelters = await query.getMany()
        return shelters;
    }
}
