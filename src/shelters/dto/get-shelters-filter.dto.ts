import { ShelterStatus } from "../shelter-status.enum";
import {IsIn, IsNotEmpty, IsOptional} from "class-validator";

export class GetSheltersFilterDto {
    @IsOptional()
    @IsIn([ShelterStatus.FULL, ShelterStatus.SPACE_AVAILABLE])
    status: ShelterStatus;

    @IsOptional()
    @IsNotEmpty()
    search: string;

    @IsOptional()
    @IsNotEmpty()
    limit: number;
}
