import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../auth/user.entity";

@Entity()
export class Meal extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("timestamp")
    time: string;

    @Column()
    hungerRatingBefore: number;

    @Column()
    whatDidYouEat: string;

    @Column()
    whatDidYouDrink: string;

    @Column()
    satietyRatingAfter: number;

    @Column()
    thinking: string;

    @Column()
    feeling: string;

    @Column()
    digestion: string;

    @Column()
    mood: string;

    @ManyToOne(type => User, user => user.meals, {eager: false})
    user: User

    @Column()
    userId: number;
}
