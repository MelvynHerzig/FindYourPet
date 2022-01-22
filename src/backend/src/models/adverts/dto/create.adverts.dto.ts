import { UpdateAdvertDto } from './update.adverts.dto';
import { OmitType } from '@nestjs/swagger';

export class CreateAdvertDto extends OmitType(UpdateAdvertDto, [
  'id',
] as const) {}
