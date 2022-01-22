import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsPositive } from 'class-validator';

/**
 * A pet can be either a male or a female.
 */
export enum PetGender {
  MALE = 'male',
  FEMALE = 'female',
}

/**
 * Entity to represents an adverts to trade pets.
 */
@Entity('adverts')
export class Advert {
  @IsNotEmpty()
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column()
  title: string;

  @IsNotEmpty()
  @Column()
  description: string;

  @Column({
    nullable: true,
  })
  imageId: number;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  lastModified: Date;

  @IsPositive()
  @Column()
  petAge: number;

  @IsNotEmpty()
  @Column({
    type: 'enum',
    enum: PetGender,
    default: PetGender.MALE,
  })
  petGender: PetGender;

  @Column({ nullable: true })
  memberId: string;

  @IsNotEmpty()
  @Column({ nullable: true })
  speciesId: number;
}
