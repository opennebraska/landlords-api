import {EntityRepository, Repository} from "typeorm";
import {Meal} from "./meal.entity";
import {CreateMealDto} from "./dto/create.meal.dto";
import {GetMealsFilterDto} from "./dto/get-meals-filter.dto";
import {User} from "../auth/user.entity";

@EntityRepository(Meal)
export class MealsRepository extends Repository<Meal> {
    async createMeal(createMealDto: CreateMealDto, user: User): Promise<Meal> {
        const {digestion, feeling, hungerRatingBefore, mood, satietyRatingAfter, thinking, time, whatDidYouDrink, whatDidYouEat} = createMealDto;
        const meal = new Meal();
        meal.digestion = digestion;
        meal.feeling = feeling;
        meal.hungerRatingBefore = hungerRatingBefore;
        meal.mood = mood;
        meal.satietyRatingAfter = satietyRatingAfter;
        meal.thinking = thinking;
        meal.time = time;
        meal.whatDidYouDrink = whatDidYouDrink;
        meal.whatDidYouEat = whatDidYouEat;
        meal.user = user;
        await meal.save();

        delete meal.user;
        return meal;
    }

    async getMeals(filterDto: GetMealsFilterDto, user: User): Promise<Meal[]> {
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
