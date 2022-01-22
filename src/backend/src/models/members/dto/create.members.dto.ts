import { MemberDto } from './members.dto';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateMemberDto extends OmitType(MemberDto, ['id'] as const) {
  @ApiProperty({
    description: 'The confirmation of the password',
    type: String,
    example: 'My1stSuperP@assword',
  })
  @IsNotEmpty()
  confirmPassword: string;
}
