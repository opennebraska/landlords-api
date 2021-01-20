import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Shelter extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("timestamp")
    time: string;

    @Column({nullable: true})
    location: string;

    @Column({nullable: true})
    phone: string;

    @Column({nullable: true})
    rating: string;

    @Column({nullable: true})
    availableCapacity: number;

    @Column({nullable: true})
    totalCapacity: number;

    @Column({default: false})
    allowsIntoxication: boolean;

    @Column({default: false})
    allowsNarcotics: boolean;

    @Column({default: false})
    allowsSingleMale: boolean;

    @Column({default: false})
    allowsFamilyMale: boolean;

    @Column({default: false})
    allowsFemale: boolean;

    @Column({default: false})
    allowsChildren: boolean;

}
