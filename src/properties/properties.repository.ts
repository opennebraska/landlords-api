import {EntityRepository, Repository} from "typeorm";
import {Property} from "./property.entity";
import {CreatePropertyDto} from "./dto/create.property.dto";
import {GetPropertiesFilterDto} from "./dto/get-properties-filter.dto";
import {User} from "../auth/user.entity";

@EntityRepository(Property)
export class PropertiesRepository extends Repository<Property> {
    async createMeal(createMealDto: CreatePropertyDto, user: User): Promise<Property> {
        const {digestion, feeling, hungerRatingBefore, mood, satietyRatingAfter, thinking, time, whatDidYouDrink, whatDidYouEat} = createMealDto;
        const meal = new Property();
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
        await meal.save();

        // delete meal.user;
        return meal;
    }

    async getMeals(filterDto: GetPropertiesFilterDto, user: User): Promise<Property[]> {
        const {status, search} = filterDto;
        const query = this.createQueryBuilder('meal');

        query.where('meal.userId = :userId', {userId: user.id})

        if (status) {
            query.andWhere('meal.status = :status', {status})
        }
        if (search) {
            query.andWhere('meal.title LIKE :search or meal.description LIKE :search', {search: `%${search}%`})
        }
        const meals = await query.getMany()
        return meals.reverse();
    }
}
