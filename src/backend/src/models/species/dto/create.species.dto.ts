import { Species } from '../entities/species.entity';
import { PickType } from '@nestjs/mapped-types';

export class CreateSpeciesDto extends PickType(Species, ['name'] as const) {}
