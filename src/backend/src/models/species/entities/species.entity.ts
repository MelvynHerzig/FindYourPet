import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Adverts } from '../../adverts/entities/adverts.entity';
import { Exclude } from 'class-transformer';

/**
 * Entity to represents a pet species of FindYourPet
 */
@Entity('species')
export class Species {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Exclude()
  @OneToMany(() => Adverts, (advert) => advert.species)
  adverts: Adverts[];
}
