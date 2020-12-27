import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {PropertiesService} from "./properties.service";
import {CreatePropertyDto} from "./dto/create.property.dto";
import {MealStatusValidationPipe} from "./pipes/meal-status-validation.pipe";
import {GetPropertiesFilterDto} from "./dto/get-properties-filter.dto";
import {Property} from "./property.entity";
import {MealStatus} from "./property-status.enum";
import {AuthGuard} from "@nestjs/passport";
import {GetUser} from "../auth/get-user.decorator";
import {User} from "../auth/user.entity";

@Controller('properties')
// @UseGuards(AuthGuard())
export class PropertiesController {
    constructor(private propertiesService: PropertiesService) {
    }

    @Get()
    getMeals(
        @Query(ValidationPipe) filterDto: GetPropertiesFilterDto,
        @GetUser() user: User
    ): Promise<Property[]> {
        return this.propertiesService.getMeals(filterDto, user)
    }

    // @Get('/:id')
    // getMealById(
    //     @Param('id', ParseIntPipe) id: number,
    //     @GetUser() user: User
    // ): Promise<Meal> {
    //     return this.mealsService.getMealById(id, user);
    // }

    // @Post()
    // @UsePipes(ValidationPipe)
    // createMeal(
    //     @Body() createMealDto: CreatePropertyDto,
    //     @GetUser() user: User,
    // ): Promise<Meal> {
    //     return this.mealsService.createMeal(createMealDto, user);
    // }

    // @Delete('/:id')
    // deleteMealById(
    //     @Param('id', ParseIntPipe) id: number,
    //     @GetUser() user: User,
    // ): Promise<void> {
    //     return this.mealsService.deleteMeal(id, user);
    // }

    // @Patch('/:id/status')
    // updateMealById(
    //     @Param('id', ParseIntPipe) id: number,
    //     @Body('status', MealStatusValidationPipe) status: MealStatus,
    //     @GetUser() user: User,
    // ): Promise<Meal> {
    //     return this.mealsService.updateMealStatus(id, status, user)
    // }
}
