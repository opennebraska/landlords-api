import { IsNotEmpty } from 'class-validator';

export class GetLandlordPropertiesFilterDto {
  @IsNotEmpty()
  landlord: string;
}
