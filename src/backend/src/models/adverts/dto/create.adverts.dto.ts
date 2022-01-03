import { Adverts } from '../entities/adverts.entity';
import { OmitType } from '@nestjs/mapped-types';

export class CreateAdvertsDto extends OmitType(Adverts, [
  'id',
  'lastModified',
] as const) {}
