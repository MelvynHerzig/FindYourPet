import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Advert } from '../../adverts/entities/adverts.entity';

/**
 * Entity to represents a pet species of FindYourPet
 */
@Entity('species')
export class Species {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;
}
