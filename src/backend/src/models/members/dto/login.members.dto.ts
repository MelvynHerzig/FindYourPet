import { Member } from '../entities/members.entity';
import { PickType } from '@nestjs/swagger';

export class LoginMemberDto extends PickType(Member, [
  'email',
  'password',
] as const) {}
