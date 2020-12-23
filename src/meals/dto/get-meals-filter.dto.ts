import { MealStatus} from "../meal-status.enum";
import {IsIn, IsNotEmpty, IsOptional} from "class-validator";

export class GetMealsFilterDto {
    @IsOptional()
    @IsIn([MealStatus.OPEN, MealStatus.IN_PROGRESS, MealStatus.DONE])
    status: MealStatus;

    @IsOptional()
    @IsNotEmpty()
    search: string;
}
