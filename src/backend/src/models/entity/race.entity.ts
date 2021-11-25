import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AdvertEntity } from './advert.entity';

/**
 * Entity to represents a pet race of FindYourPet
 */
@Entity('race')
export class RaceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => AdvertEntity, (advert) => advert.race)
  adverts: AdvertEntity[];
}
