import { PickType } from '@nestjs/swagger';
import { MemberDto } from './members.dto';

/**
 * Class that contains all public informations to return for a member
 * @author Berney Alec, Teo Ferrari, Quentin Forestier, Melvyn Herzig
 */
export class PublicMemberDto extends PickType(MemberDto, [
  'id',
  'firstname',
  'name',
  'email',
  'phone',
] as const) {}
