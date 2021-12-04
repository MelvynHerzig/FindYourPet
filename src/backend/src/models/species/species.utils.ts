
/**
 * Make a json string containing different languages
 * @param en English translation
 * @param fr French translation
 * @param de German translation
 * @param it Italian translation
 * @return something like { "en" : "dog", "fr" : "chat", "de" : "Katze", "it" : "gatto"}
 */
function jsonStringFromSpecies(
  en: string,
  fr: string,
  de: string,
  it: string,
): string {
  return JSON.stringify({ en: en, fr: fr, de: de, it: it });
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

export { jsonStringFromSpecies, isSupportedLangAbr };
