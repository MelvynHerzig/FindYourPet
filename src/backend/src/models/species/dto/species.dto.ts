import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Species } from '../entities/species.entity';
import { getSpeciesName, jsonStringFromSpecies } from '../species.utils';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ERROR_INVALID_SPECIES } from '../../../error/error-message';

/**
 * Class that contains all informations to return for a species
 * @author Alec Berney, Teo Ferrari, Quentin Forestier, Melvyn Herzig
 */
export class SpeciesDto extends OmitType(Species, ['name'] as const) {
  @ApiProperty({
    description: 'The name of the species in French',
    type: String,
    example: 'Chat',
  })
  fr: string;
  @ApiProperty({
    description: 'The name of the species in English',
    type: String,
    example: 'Cat',
  })
  en: string;

  @ApiProperty({
    description: 'The name of the species in Deutsch',
    type: String,
    example: 'Katze',
  })
  de: string;

  @ApiProperty({
    description: 'The name of the species in Italian',
    type: String,
    example: 'Gatto',
  })
  it: string;
}
