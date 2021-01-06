import { MealStatus} from "../property-status.enum";
import {IsIn, IsNotEmpty, IsOptional} from "class-validator";

export class GetPropertiesFilterDto {
    @IsOptional()
    @IsNotEmpty()
    search: string;

    @IsOptional()
    @IsNotEmpty()
    limit: number;
}
