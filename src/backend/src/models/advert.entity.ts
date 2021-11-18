import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Member } from './member.entity';

/**
 * Enum corresponding to most common families of pets.
 */
export enum PetRace {
  CAT = 'cat',
  DOG = 'dog',
  BIRD = 'bird',
  REPTILE = 'reptile',
  HORSE = 'horse',
  FISH = 'fish',
  RABBIT = 'rabbit',
  POULTRY = 'poultry',
  HAMSTER = 'hamster',
  GUINEAPIG = 'guinea pig',
  FERRET = 'ferret',
  OTHER = 'other',
}

/**
 * A pet can be either a male or a female.
 */
export enum PetGender {
  MALE = 'male',
  FEMALE = 'female',
}

/**
 * Entity to represents an advert to trade pets.
 */
@Entity()
export class Advert {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  imagePath: string;

  @Column({ type: 'timestamptz' })
  lastModified: Date;

  @Column()
  petAge: number;

  @Column({
    type: 'enum',
    enum: PetRace,
    default: PetRace.OTHER,
  })
  petRage: PetRace;

  @Column({
    type: 'enum',
    enum: PetGender,
    default: PetGender.MALE,
  })
  petGender: PetGender;

  @ManyToOne(() => Member, (member) => member.adverts)
  member: Member;
}
