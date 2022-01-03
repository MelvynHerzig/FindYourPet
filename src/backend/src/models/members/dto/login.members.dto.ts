import { PickType } from '@nestjs/mapped-types';
import { Members } from '../entities/members.entity';

export class LoginMemberDto extends PickType(Members, [
  'email',
  'password',
] as const) {
  readonly email: string;
  readonly password: string;
}
