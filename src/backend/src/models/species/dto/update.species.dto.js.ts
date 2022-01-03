import { Species } from '../entities/species.entity';
import { OmitType } from '@nestjs/mapped-types';

export class UpdateSpeciesDto extends OmitType(Species, ['adverts'] as const) {}
