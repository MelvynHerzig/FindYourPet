import { Advert, PetGender } from '../entities/adverts.entity';
import { OmitType } from '@nestjs/swagger';

export class UpdateAdvertDto extends OmitType(Advert, [
  'lastModified',
] as const) {}
