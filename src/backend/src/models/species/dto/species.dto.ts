import { OmitType } from '@nestjs/mapped-types';
import { Species } from '../entities/species.entity';
import { getSpeciesName, jsonStringFromSpecies } from '../species.utils';

export class SpeciesDto extends OmitType(Species, ['name'] as const) {
  fr: string;
  en: string;
  de: string;
  it: string;
}

export function ToSpeciesDto(species: Species): SpeciesDto {
  const { id } = species;
  const names = getSpeciesName(species);
  return {
    id,
    fr: names['fr'],
    en: names['en'],
    de: names['de'],
    it: names['it'],
  };
}

export function ToSpecies(species: SpeciesDto): Species {
  return {
    id: species.id,
    name: jsonStringFromSpecies(species),
  };
}
