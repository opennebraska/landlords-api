import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import { Field, Int, ObjectType } from '@nestjs/graphql';
import {Resident} from "./residents.entity";
@Entity()
@ObjectType()
export class Shelter extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    @Column("timestamp")
    @Field()
    time: string;

    @Column({nullable: true})
    @Field({ nullable: true })
    name: string;

    @Column({nullable: true})
    @Field({ nullable: true })
    location: string;

    @Column({nullable: true})
    @Field({ nullable: true })
    phone: string;

    @Column({nullable: true})
    @Field({ nullable: true })
    availableCapacity: number;

    @Column({nullable: true})
    @Field({ nullable: true, description: "Total amount of residents the shelter can accept" })
    totalCapacity: number;

    @Column({default: false})
    @Field({ nullable: true })
    allowsIntoxication: boolean;

    @Column({default: false})
    @Field({ nullable: true })
    allowsNarcotics: boolean;

    @Column({default: false})
    @Field({ nullable: true })
    allowsSingleMale: boolean;

    @Column({default: false})
    @Field({ nullable: true })
    allowsFamilyMale: boolean;

    @Column({default: false})
    @Field({ nullable: true })
    allowsFemale: boolean;

    @Column({default: false})
    @Field({ nullable: true })
    allowsChildren: boolean;

    @Field(type => [Resident])
    residents: Resident[]
}
