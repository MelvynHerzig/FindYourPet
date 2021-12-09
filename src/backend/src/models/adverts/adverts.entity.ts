import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MembersEntity } from '../members/members.entity';
import { SpeciesEntity } from '../species/species.entity';

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
export class AdvertsEntity {
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

  @ManyToOne(() => MembersEntity, (member) => member.adverts)
  member: MembersEntity;

  @Column({ nullable: true })
  speciesId: number;

  @ManyToOne(() => SpeciesEntity, (species) => species.adverts)
  species: SpeciesEntity;
}
