import { SpeciesDto } from './species.dto';
import { OmitType } from '@nestjs/swagger';

/**
 * Class that contains all informations to create a species
 * @author Alec Berney, Teo Ferrari, Quentin Forestier, Melvyn Herzig
 */
export class CreateSpeciesDto extends OmitType(SpeciesDto, ['id'] as const) {}
