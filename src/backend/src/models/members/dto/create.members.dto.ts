import { MemberDto } from './members.dto';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

/**
 * Class that contains all informations to create a member
 * @author Berney Alec, Teo Ferrari, Quentin Forestier, Melvyn Herzig
 */
export class CreateMemberDto extends OmitType(MemberDto, ['id'] as const) {
  @ApiProperty({
    description: 'The confirmation of the password',
    type: String,
    example: 'My1stSuperP@assword',
  })
  @IsNotEmpty()
  confirmPassword: string;
}
