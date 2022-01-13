import { PickType } from '@nestjs/mapped-types';
import { Member } from '../entities/members.entity';

export class LoginMemberDto extends PickType(Member, [
  'email',
  'password',
] as const) {
  readonly email: string;
  readonly password: string;
}
