import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Entity to represents a pet species of FindYourPet
 * @author Alec Berney, Teo Ferrari, Quentin Forestier, Melvyn Herzig
 */
@Entity('species')
export class Species {
  @ApiProperty({
    description: 'Id of the species',
    type: Number,
    example: 1,
  })
  @IsNotEmpty()
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ unique: true })
  name: string;
}
