import { SpeciesDto } from './species.dto';
import { PickType } from '@nestjs/swagger';

/**
 * Class that contains all informations to update a species
 * @author Alec Berney, Teo Ferrari, Quentin Forestier, Melvyn Herzig
 */
export class UpdateSpeciesDto extends PickType(SpeciesDto, [
  'id',
  'fr',
  'en',
  'de',
  'it',
]) {}
