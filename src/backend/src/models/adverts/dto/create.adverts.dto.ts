import { OmitType } from '@nestjs/mapped-types';
import { UpdateAdvertDto } from './update.adverts.dto';

export class CreateAdvertDto extends OmitType(UpdateAdvertDto, [
  'id',
] as const) {}
