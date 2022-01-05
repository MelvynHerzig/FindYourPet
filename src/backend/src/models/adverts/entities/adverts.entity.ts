import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Member } from '../../members/entities/members.entity';
import { Species } from '../../species/entities/species.entity';

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
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  imagePath: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  lastModified: Date;

  @Column()
  petAge: number;

  @Column({
    type: 'enum',
    enum: PetGender,
    default: PetGender.MALE,
  })
  petGender: PetGender;

  @Column({ nullable: true })
  memberId: string;

  @Column({ nullable: true })
  speciesId: number;
}
