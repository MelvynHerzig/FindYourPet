import { PickType } from '@nestjs/mapped-types';
import { MemberDto } from './members.dto';

export class PublicMemberDto extends PickType(MemberDto, [
  'id',
  'firstname',
  'name',
  'email',
  'phone',
] as const) {}
