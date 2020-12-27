import { MealStatus} from "../property-status.enum";
import {IsIn, IsNotEmpty, IsOptional} from "class-validator";

export class GetPropertiesFilterDto {
    @IsOptional()
    @IsIn([MealStatus.OPEN, MealStatus.IN_PROGRESS, MealStatus.DONE])
    status: MealStatus;

    @IsOptional()
    @IsNotEmpty()
    search: string;

    @IsOptional()
    @IsNotEmpty()
    limit: number;
}
