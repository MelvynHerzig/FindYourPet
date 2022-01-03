import { OmitType } from '@nestjs/mapped-types';
import { Members } from '../entities/members.entity';

export class UpdateMemberDto extends OmitType(Members, [
  'isAdmin',
  'adverts',
] as const) {}
