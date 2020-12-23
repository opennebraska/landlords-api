import {IsNotEmpty} from 'class-validator'
export class CreateMealDto {
    @IsNotEmpty()
    time: string;

    @IsNotEmpty()
    hungerRatingBefore: number;

    @IsNotEmpty()
    whatDidYouEat: string;

    @IsNotEmpty()
    whatDidYouDrink: string;

    @IsNotEmpty()
    satietyRatingAfter: number;

    @IsNotEmpty()
    thinking: string;

    @IsNotEmpty()
    feeling: string;

    @IsNotEmpty()
    digestion: string;

    @IsNotEmpty()
    mood: string;
}
