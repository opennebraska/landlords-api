import {Shelter} from './shelter.entity';

import {SheltersService} from './shelters.service';
import {Resolver, Mutation, Args, Query, ResolveField, Parent} from '@nestjs/graphql';
import {Inject} from '@nestjs/common';
import {GetSheltersFilterDto} from "./dto/get-shelters-filter.dto";
import * as residents from './mockResidents.json';

@Resolver(of => Shelter)
export class ShelterResolver {
    constructor(
        @Inject(SheltersService) private sheltersService: SheltersService,
    ) {
    }

    @Query(returns => [Shelter])
    async shelter(@Args() filterDto: GetSheltersFilterDto): Promise<Shelter[]> {
        return await this.sheltersService.getShelters(filterDto);
    }

    @ResolveField()
    async residents(@Parent() shelter: Shelter, @Args("namePartial", {nullable: true}) namePartial?: string) {
        const {id} = shelter;
        let shelterResidents = residents.filter(resident => resident.shelterId == id)
        if (namePartial) {
            shelterResidents = shelterResidents.filter(resident => resident.name.toLowerCase().includes(namePartial.toLowerCase()));
        }
        return shelterResidents
    }
}
