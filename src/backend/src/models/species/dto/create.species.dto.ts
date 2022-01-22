import { SpeciesDto } from './species.dto';
import { OmitType } from '@nestjs/swagger';

export class CreateSpeciesDto extends OmitType(SpeciesDto, ['id'] as const) {}
