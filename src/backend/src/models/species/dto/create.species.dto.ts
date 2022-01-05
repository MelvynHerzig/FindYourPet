import { OmitType } from '@nestjs/mapped-types';
import { SpeciesDto } from './species.dto';

export class CreateSpeciesDto extends OmitType(SpeciesDto, ['id'] as const) {}
