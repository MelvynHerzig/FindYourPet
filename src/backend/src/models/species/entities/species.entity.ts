import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

/**
 * Entity to represents a pet species of FindYourPet
 */
@Entity('species')
export class Species {
  @IsNotEmpty()
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ unique: true })
  name: string;
}
