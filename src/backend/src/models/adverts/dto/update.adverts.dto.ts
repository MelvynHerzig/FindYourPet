import { Advert } from '../entities/adverts.entity';
import { OmitType } from '@nestjs/mapped-types';

export class UpdateAdvertDto extends OmitType(Advert, [
  'lastModified',
  'memberId',
] as const) {}
