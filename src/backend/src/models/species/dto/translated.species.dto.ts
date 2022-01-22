import { Species } from '../entities/species.entity';
import { getSpeciesName } from '../species.utils';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ERROR_INVALID_SPECIES } from '../../../error/error-message';
import { ApiProperty } from '@nestjs/swagger';

export class TranslatedSpeciesDto extends Species {
  @ApiProperty({
    description: 'The name of the species translated in the specified language',
    type: String,
    example: 'Chat',
  })
  name: string;
}

export function ToTranslatedSpeciesDto(species: Species, lang: string) {
  try {
    const { id } = species;
    return {
      id,
      name: lang !== undefined ? getSpeciesName(species)[lang] : species.name,
    };
  } catch (e) {
    throw new HttpException(ERROR_INVALID_SPECIES, HttpStatus.BAD_REQUEST);
  }
}
