import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create.property.dto';
import { PropertiesRepository } from './properties.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from './property.entity';
import { GetPropertiesFilterDto } from './dto/get-properties-filter.dto';
import { User } from '../auth/user.entity';
import { GetLandlordPropertiesFilterDto } from './dto/get-landlord-properties-filter.dto';

@Injectable()
export class PropertiesService {
    constructor(
        @InjectRepository(PropertiesRepository)
        private propertyRepository: PropertiesRepository
    ) {
    }

    async getProperty(pin: string): Promise<Property> {
        return this.propertyRepository.getProperty(pin);
    }
    async getProperties(filterDto: GetPropertiesFilterDto, user: User): Promise<Property[]> {
        return this.propertyRepository.getProperties(filterDto, user)
    }

    async getLandlordProperties(filterDto: GetLandlordPropertiesFilterDto): Promise<Property[]> {
        return this.propertyRepository.getLandlordProperties(filterDto);
    }

    async getPropertyById(id: number, user: User): Promise<Property> {
        const found = await this.propertyRepository.findOne({where: {id, userId: user.id}})
        if (!found) {
            throw new NotFoundException(`Meal with id:${id} not found.`);
        }
        return found;
    }

    async createProperty(createPropertyDto: CreatePropertyDto, user: User): Promise<Property> {
        return this.propertyRepository.createProperty(createPropertyDto, user)
    }

    async deleteProperty(id: number, user: User): Promise<void> {
        const result = await this.propertyRepository.delete({id, userId: user.id})
        if (result.affected === 0) {
            throw new NotFoundException(`Meal with ID "${id}" not found.`)
        }
    }
}
