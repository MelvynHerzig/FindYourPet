import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Species } from '../entities/species.entity';
import { getSpeciesName, jsonStringFromSpecies } from '../species.utils';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ERROR_INVALID_SPECIES } from '../../../error/error-message';

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

export function ToSpeciesDto(species: Species): SpeciesDto {
  try {
    const { id } = species;
    const names = getSpeciesName(species);
    return {
      id,
      fr: names['fr'],
      en: names['en'],
      de: names['de'],
      it: names['it'],
    };
  } catch (e) {
    throw new HttpException(ERROR_INVALID_SPECIES, HttpStatus.BAD_REQUEST);
  }
}

export function ToSpecies(species: SpeciesDto): Species {
  return {
    id: species.id,
    name: jsonStringFromSpecies(species),
  };
}
