import { OmitType } from '@nestjs/mapped-types';
import { MemberDto } from './members.dto';

export class CreateMemberDto extends OmitType(MemberDto, ['id'] as const) {
  password: string;
  confirmPassword: string;
}
