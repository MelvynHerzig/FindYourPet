import { Member } from '../entities/members.entity';
import { PickType } from '@nestjs/swagger';

/**
 * Class that contains all informations for login
 * @author Berney Alec, Teo Ferrari, Quentin Forestier, Melvyn Herzig
 */
export class LoginMemberDto extends PickType(Member, [
  'email',
  'password',
] as const) {}
