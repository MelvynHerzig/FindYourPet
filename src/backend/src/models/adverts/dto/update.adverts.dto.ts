import { Adverts } from '../entities/adverts.entity';
import { OmitType } from '@nestjs/mapped-types';

export class UpdateAdvertsDto extends OmitType(Adverts, [
  'lastModified',
  'member',
  'species',
] as const) {}
