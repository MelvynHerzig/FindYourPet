import { OmitType } from '@nestjs/mapped-types';
import { UpdateAdvertDto } from './update.adverts.dto';
import { IsEmail } from 'class-validator';

export class CreateAdvertDto extends OmitType(UpdateAdvertDto, [
  'id',
] as const) {}
