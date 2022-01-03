import { Members } from '../entities/members.entity';
import { OmitType } from '@nestjs/mapped-types';

export class CreateMemberDto extends OmitType(Members, [
  'id',
  'isAdmin',
  'adverts',
] as const) {
  confirmPassword: string;
}
