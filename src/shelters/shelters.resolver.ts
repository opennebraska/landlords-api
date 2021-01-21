
import { Shelter } from './shelter.entity';

import { SheltersService } from './shelters.service';
import { Resolver, Mutation, Args, Query, ResolveField, Parent } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import {GetSheltersFilterDto} from "./dto/get-shelters-filter.dto";

@Resolver(of => Shelter)
export class ShelterResolver {
    constructor(
        @Inject(SheltersService) private sheltersService: SheltersService,
    ) { }
    @Query(returns => [Shelter])
    async shelter(@Args() filterDto: GetSheltersFilterDto): Promise<Shelter[]> {
        return await this.sheltersService.getShelters(filterDto);
    }

}
