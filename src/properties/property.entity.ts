import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CreatePropertyDto } from './dto/create.property.dto';

@Entity()
export class Property extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  time: Date;

  @Column({ nullable: true })
  objectId: number;

  @Column({ nullable: true })
  pin: string;

  @Column({ nullable: true })
  ownerName: string;

  @Column({ nullable: true })
  address1: string;

  @Column({ nullable: true })
  address2: string;

  @Column({ nullable: true })
  ownerCity: string;

  @Column({ nullable: true })
  ownerState: string;

  @Column({ nullable: true })
  ownerZip: string;

  @Column({ nullable: true })
  propertyA: string;

  @Column({ nullable: true })
  house: string;

  @Column({ nullable: true })
  streetDirection: string;

  @Column({ nullable: true })
  streetName: string;

  @Column({ nullable: true })
  streetType: string;

  @Column({ nullable: true })
  apartment: string;

  @Column({ nullable: true })
  propertyCity: string;

  @Column({ nullable: true })
  propertyZip: string;

  @Column({ nullable: true })
  secTwnRn: string;

  @Column({ nullable: true })
  additionN: string;

  @Column({ nullable: true })
  block: string;

  @Column({ nullable: true })
  lot: string;

  @Column({ nullable: true })
  legal1: string;

  @Column({ nullable: true })
  legal2: string;

  @Column({ nullable: true })
  legal3: string;

  @Column({ nullable: true })
  legal4: string;

  @Column({ nullable: true })
  dcaaccType: string;

  @Column({ nullable: true })
  class: string;

  @Column({ nullable: true })
  quality: string;

  @Column({ nullable: true })
  condition: string;

  @Column({ nullable: true })
  sqFeet: string;

  @Column({ nullable: true })
  assessor: string;

  @Column({ nullable: true })
  treasurer: string;

  @Column({ nullable: true })
  xCoord: string;

  @Column({ nullable: true })
  yCoord: string;

  @Column({ nullable: true })
  addressLA: string;

  @Column({ nullable: true })
  taxDist: string;

  @Column({ nullable: true })
  shapeLength: string;

  @Column({ nullable: true })
  shapeArea: string;

  @Column({ nullable: true })
  violationCount: string;

  @Column({ nullable: true })
  openViolationCount: string;

  // @ManyToOne(type => User, user => user.meals, {eager: false})
  // user: User

  @Column({ nullable: true })
  userId: number;

  constructor(input: CreatePropertyDto) {
    super();
    Object.assign(this, input);
  }
}
