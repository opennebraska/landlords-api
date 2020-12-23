import {BadRequestException, PipeTransform} from "@nestjs/common";
import {MealStatus} from "../meal-status.enum";

export class MealStatusValidationPipe implements PipeTransform {
    readonly allowedStatus = [
        MealStatus.OPEN,
        MealStatus.IN_PROGRESS,
        MealStatus.DONE
    ]
    transform(value: any): any {
        value = value.toUpperCase();
        if(!this.isStatusValid(value)){
            throw new BadRequestException(`"${value}" is an invalid status.`)
        }
        return value;
    }

    private isStatusValid(status: any){
        const index = this.allowedStatus.indexOf(status);
        return index !== -1
    }
}
