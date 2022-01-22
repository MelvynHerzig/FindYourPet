import { OmitType } from '@nestjs/mapped-types';
import { Species } from '../entities/species.entity';
import { getSpeciesName, jsonStringFromSpecies } from '../species.utils';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ERROR_INVALID_SPECIES } from '../../../error/error-message';

export class SpeciesDto extends OmitType(Species, ['name'] as const) {
  fr: string;
  en: string;
  de: string;
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
