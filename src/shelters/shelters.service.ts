import { Injectable, NotFoundException } from '@nestjs/common';
import { SheltersRepository } from './shelters.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Shelter } from './shelter.entity';
import { GetSheltersFilterDto } from './dto/get-shelters-filter.dto';
import { User } from '../auth/user.entity';

@Injectable()
export class SheltersService {
  constructor(
    @InjectRepository(SheltersRepository)
    private sheltersRepository: SheltersRepository,
  ) {}

  async getShelters(filterDto: GetSheltersFilterDto): Promise<Shelter[]> {
    return this.sheltersRepository.getShelters(filterDto);
  }
}
