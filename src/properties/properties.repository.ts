import {EntityRepository, Repository} from "typeorm";
import {Property} from "./property.entity";
import {CreatePropertyDto} from "./dto/create.property.dto";
import {GetPropertiesFilterDto} from "./dto/get-properties-filter.dto";
import {User} from "../auth/user.entity";

@EntityRepository(Property)
export class PropertiesRepository extends Repository<Property> {
    async createMeal(createMealDto: CreatePropertyDto, user: User): Promise<Property> {
        const {digestion, feeling, hungerRatingBefore, mood, satietyRatingAfter, thinking, time, whatDidYouDrink, whatDidYouEat} = createMealDto;
        const property = new Property();
        // meal.digestion = digestion;
        // meal.feeling = feeling;
        // meal.hungerRatingBefore = hungerRatingBefore;
        // meal.mood = mood;
        // meal.satietyRatingAfter = satietyRatingAfter;
        // meal.thinking = thinking;
        // meal.time = time;
        // meal.whatDidYouDrink = whatDidYouDrink;
        // meal.whatDidYouEat = whatDidYouEat;
        // meal.user = user;
        await property.save();

        // delete meal.user;
        return property;
    }

    async getMeals(filterDto: GetPropertiesFilterDto, user: User): Promise<Property[]> {
        const {status, search} = filterDto;
        const query = this.createQueryBuilder('properties');

        const properties = await query.getMany()
        return properties;
    }
}
