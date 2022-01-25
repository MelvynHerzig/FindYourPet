import { OmitType } from '@nestjs/swagger';
import { UpdateSpeciesDto } from './update.species.dto';

/**
 * Class that contains all informations to create a species
 * @author Alec Berney, Teo Ferrari, Quentin Forestier, Melvyn Herzig
 */
export class CreateSpeciesDto extends OmitType(UpdateSpeciesDto, [
  'id',
] as const) {}
