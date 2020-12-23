import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {MealsService} from "./meals.service";
import {CreateMealDto} from "./dto/create.meal.dto";
import {MealStatusValidationPipe} from "./pipes/meal-status-validation.pipe";
import {GetMealsFilterDto} from "./dto/get-meals-filter.dto";
import {Meal} from "./meal.entity";
import {MealStatus} from "./meal-status.enum";
import {AuthGuard} from "@nestjs/passport";
import {GetUser} from "../auth/get-user.decorator";
import {User} from "../auth/user.entity";

@Controller('meals')
@UseGuards(AuthGuard())
export class MealsController {
    constructor(private mealsService: MealsService) {
    }

    @Get()
    getMeals(
        @Query(ValidationPipe) filterDto: GetMealsFilterDto,
        @GetUser() user: User
    ): Promise<Meal[]> {
        return this.mealsService.getMeals(filterDto, user)
    }

    @Get('/:id')
    getMealById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User
    ): Promise<Meal> {
        return this.mealsService.getMealById(id, user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createMeal(
        @Body() createMealDto: CreateMealDto,
        @GetUser() user: User,
    ): Promise<Meal> {
        return this.mealsService.createMeal(createMealDto, user);
    }

    @Delete('/:id')
    deleteMealById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User,
    ): Promise<void> {
        return this.mealsService.deleteMeal(id, user);
    }

    @Patch('/:id/status')
    updateMealById(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', MealStatusValidationPipe) status: MealStatus,
        @GetUser() user: User,
    ): Promise<Meal> {
        return this.mealsService.updateMealStatus(id, status, user)
    }
}
