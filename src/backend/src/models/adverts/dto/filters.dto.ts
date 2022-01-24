import { PetGender } from '../entities/adverts.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsPositive, Min } from 'class-validator';

/**
 * Class that contains all filter for adverts
 * @author Berney Alec, Teo Ferrari, Quentin Forestier, Melvyn Herzig
 */
export class FilterDto {
  @ApiProperty({
    description: 'Id of the species wanted',
    type: Number,
    example: '1',
    required: false,
  })
  @IsInt()
  @IsOptional()
  // Filter by species
  speciesId: number;

  @ApiProperty({
    description: 'Gender of the pet',
    enum: PetGender,
    required: false,
  })
  @IsOptional()
  // Filter by gender
  gender: PetGender;

  @ApiProperty({
    description:
      'Minimal age of pets to find. Represented as a number of months. Should be smaller or equal to petMaxAge filter.',
    type: Number,
    example: 1,
    required: false,
  })
  @Min(0)
  @IsOptional()
  // Filter by age
  petMinAge: number;

  @ApiProperty({
    description:
      'Maximal age of pets to find. Represented as a number of months. Should be greater or equal to petMinAge filter.',
    type: Number,
    example: 5,
    required: false,
  })
  @IsPositive()
  @IsOptional()
  petMaxAge: number;

  // Filter by distance (KM)
  @ApiProperty({
    description:
      "Number of KM max between user's place and the advert's place.",
    type: Number,
    example: 10,
    required: false,
  })
  @IsPositive()
  @IsOptional()
  radius: number;
}
