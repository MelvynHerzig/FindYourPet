import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
