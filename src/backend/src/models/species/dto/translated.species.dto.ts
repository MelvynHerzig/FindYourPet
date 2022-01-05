import { Species } from '../entities/species.entity';
import { getSpeciesName } from '../species.utils';

export class TranslatedSpeciesDto extends Species {}

export function ToTranslatedSpeciesDto(species: Species, lang: string) {
  const { id } = species;
  return {
    id,
    name: getSpeciesName(species)[lang],
  };
}
