import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateMealDto} from "./dto/create.meal.dto";
import {MealsRepository} from "./meals.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {Meal} from "./meal.entity";
import {MealStatus} from "./meal-status.enum";
import {GetMealsFilterDto} from "./dto/get-meals-filter.dto";
import {User} from "../auth/user.entity";

@Injectable()
export class MealsService {
    constructor(
        @InjectRepository(MealsRepository)
        private mealRepository: MealsRepository
    ) {
    }

    async getMeals(filterDto: GetMealsFilterDto, user: User): Promise<Meal[]> {
        return this.mealRepository.getMeals(filterDto, user)
    }

    async getMealById(id: number, user: User): Promise<Meal> {
        const found = await this.mealRepository.findOne({where: {id, userId: user.id}})
        if (!found) {
            throw new NotFoundException(`Meal with id:${id} not found.`);
        }
        return found;
    }

    async createMeal(createMealDto: CreateMealDto, user: User): Promise<Meal> {
        return this.mealRepository.createMeal(createMealDto, user)
    }

    async deleteMeal(id: number, user: User): Promise<void> {
        const result = await this.mealRepository.delete({id, userId: user.id})
        if (result.affected === 0) {
            throw new NotFoundException(`Meal with ID "${id}" not found.`)
        }
    }

    async updateMealStatus(id: number, status: MealStatus, user: User): Promise<Meal> {
        const meal = await this.getMealById(id, user);
        await meal.save()
        return meal;
    }
}
