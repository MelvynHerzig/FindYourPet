import { Members } from '../entities/members.entity';
import { PickType } from '@nestjs/mapped-types';

export class AdvertsMemberDto extends PickType(Members, [
  'id',
  'firstname',
  'name',
  'email',
  'phone',
] as const) {}
