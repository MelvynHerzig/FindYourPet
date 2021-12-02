import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AdvertsEntity } from '../adverts/adverts.entity';

/**
 * Entity to represents a pet species of FindYourPet
 */
@Entity('species')
export class SpeciesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => AdvertsEntity, (advert) => advert.species)
  adverts: AdvertsEntity[];
}
