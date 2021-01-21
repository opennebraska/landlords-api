import { ShelterStatus } from "../shelter-status.enum";
import {IsIn, IsNotEmpty, IsOptional} from "class-validator";
import {ArgsType, Field} from "@nestjs/graphql";

@ArgsType()
export class GetSheltersFilterDto {
    @IsOptional()
    @IsIn([ShelterStatus.FULL, ShelterStatus.SPACE_AVAILABLE])
    @Field({ nullable: true })
    status: ShelterStatus;

    @IsOptional()
    @IsNotEmpty()
    @Field({ nullable: true })
    search: string;

    @IsOptional()
    @IsNotEmpty()
    @Field({ nullable: true })
    limit: number;
}
