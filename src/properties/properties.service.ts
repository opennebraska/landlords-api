import {Injectable, NotFoundException} from '@nestjs/common';
import {CreatePropertyDto} from "./dto/create.property.dto";
import {PropertiesRepository} from "./properties.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {Property} from "./property.entity";
import {MealStatus} from "./property-status.enum";
import {GetPropertiesFilterDto} from "./dto/get-properties-filter.dto";
import {User} from "../auth/user.entity";

@Injectable()
export class PropertiesService {
    constructor(
        @InjectRepository(PropertiesRepository)
        private mealRepository: PropertiesRepository
    ) {
    }

    async getMeals(filterDto: GetPropertiesFilterDto, user: User): Promise<Property[]> {
        return this.mealRepository.getMeals(filterDto, user)
    }

    async getMealById(id: number, user: User): Promise<Property> {
        const found = await this.mealRepository.findOne({where: {id, userId: user.id}})
        if (!found) {
            throw new NotFoundException(`Meal with id:${id} not found.`);
        }
        return found;
    }

    async createMeal(createMealDto: CreatePropertyDto, user: User): Promise<Property> {
        return this.mealRepository.createMeal(createMealDto, user)
    }

    async deleteMeal(id: number, user: User): Promise<void> {
        const result = await this.mealRepository.delete({id, userId: user.id})
        if (result.affected === 0) {
            throw new NotFoundException(`Meal with ID "${id}" not found.`)
        }
    }

    async updateMealStatus(id: number, status: MealStatus, user: User): Promise<Property> {
        const meal = await this.getMealById(id, user);
        await meal.save()
        return meal;
    }
}
