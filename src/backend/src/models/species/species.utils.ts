import { Species } from './entities/species.entity';
import { SpeciesDto } from './dto/species.dto';

/**
 * Make a json string containing different languages
 * @param species SpeciesDto that contain all traduction
 * @return something like { "en" : "dog", "fr" : "chat", "de" : "Katze", "it" : "gatto"}
 */
function jsonStringFromSpecies(species: SpeciesDto): string {
  return JSON.stringify({
    en: species.en,
    fr: species.fr,
    de: species.de,
    it: species.it,
  });
}

/**
 * Checks if a given language abbreviation is supported
 * @param abr Abbreviation to check
 * @return True if abbreviation is supported else false
 */
function isSupportedLangAbr(abr: string): boolean {
  if (abr !== 'en' && abr !== 'fr' && abr !== 'de' && abr !== 'it') {
    return false;
  }
  return true;
}

function getSpeciesName(species: Species): string {
  return JSON.parse(species.name);
}

export { jsonStringFromSpecies, isSupportedLangAbr, getSpeciesName };
