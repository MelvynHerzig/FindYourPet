import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsInt, IsNotEmpty, IsPositive, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
  @ApiProperty({
    description: 'Id of the advert',
    type: Number,
    example: 1,
  })
  @IsNotEmpty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Title of the advert',
    type: String,
    example: 'Baby cat of 3 months',
  })
  @IsNotEmpty()
  @Column()
  title: string;

  @ApiProperty({
    description: 'Description of the advert',
    type: String,
    example: 'The kitten is black with a white head',
  })
  @IsNotEmpty()
  @Column()
  description: string;

  @Column({
    nullable: true,
  })
  imageId: number;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  lastModified: Date;

  @ApiProperty({
    description: 'Age, as month, of the pet of the advert',
    type: Number,
    example: 3,
  })
  @Min(0)
  @Column()
  petAge: number;

  @ApiProperty({
    description: 'Gender of the pet of the advert',
    enum: PetGender,
  })
  @IsNotEmpty()
  @Column({
    type: 'enum',
    enum: PetGender,
    default: PetGender.MALE,
  })
  petGender: PetGender;

  @Column({ nullable: true })
  memberId: string;

  @ApiProperty({
    description: "Species'id of the pet",
    type: Number,
    example: 1,
  })
  @IsNotEmpty()
  @Column({ nullable: true })
  speciesId: number;
}
