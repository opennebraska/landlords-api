import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Resident {
  @Field()
  name: string;

  @Field()
  sex: string;
}
