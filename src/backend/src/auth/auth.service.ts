import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { MembersService } from '../models/members/members.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt.strategy';
import { ERROR_INVALID_TOKEN } from '../error/error-message';
import { LoginMemberDto } from '../models/members/dto/login.members.dto';
import { Member } from '../models/members/entities/members.entity';
import { CreateMemberDto } from '../models/members/dto/create.members.dto';
import { ToMember } from '../models/members/dto/members.dto';
import { RegistrationsStatus } from './dto/registration.status.dto';
import { LoginStatus } from './dto/login.status.dto';

@Injectable()
/**
 * Service that contains the logic for the authentification
 * @author Berney Alec, Teo Ferrari, Quentin Forestier, Melvyn Herzig
 */
export class AuthService {
  constructor(
    @Inject(forwardRef(() => MembersService))
    private readonly membersService: MembersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Use the memberService to verify and create a new member
   * @param createMemberDto All needed information to create the member
   * @return RegistrationsStatus Status about the registration
   */
  async register(
    createMemberDto: CreateMemberDto,
  ): Promise<RegistrationsStatus> {
    let status: RegistrationsStatus = {
      success: true,
      message: 'member registered',
    };
    try {
      this.membersService.verifiyInput(createMemberDto, true);

      const member = ToMember(createMemberDto);

      await this.membersService.setMemberLocation(member);

      await this.membersService.create({ ...member, isAdmin: false });
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
      throw new HttpException(status, HttpStatus.BAD_REQUEST);
    }
    return status;
  }

  /**
   * Use the member service to check if login information are correct
   * @param loginMemberDto Information required for login
   * @return LoginStatus Status about the login
   */
  async login(loginMemberDto: LoginMemberDto): Promise<LoginStatus> {
    const member = await this.membersService.findByLogin(loginMemberDto);

    const token = this._createToken(member);

    return {
      id: member.id,
      email: member.email,
      accessToken: token.accessToken,
      expiresIn: token.expiresIn,
    };
  }

  /**
   * Validate if user exist with memberService
   * @param payload Payload in the JwtToken
   */
  async validateUser(payload: JwtPayload): Promise<Member> {
    const member = await this.membersService.findByPayload(payload);

    if (!member) {
      throw new HttpException(ERROR_INVALID_TOKEN, HttpStatus.UNAUTHORIZED);
    }

    return member;
  }

  /**
   * Create a token to authentifie next calls
   * @param email email of the member
   */
  private _createToken({ email }: Member): any {
    const member: JwtPayload = { email };

    const accessToken = this.jwtService.sign(member);

    return {
      expiresIn: process.env.JWT_EXPIRATION,
      accessToken,
    };
  }
}
