import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
export class AuthService {
  constructor(
    private readonly membersService: MembersService,
    private readonly jwtService: JwtService,
  ) {}

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

      await this.membersService.create(member);
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
      throw new HttpException(status, HttpStatus.BAD_REQUEST);
    }
    return status;
  }

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

  async validateUser(payload: JwtPayload): Promise<Member> {
    const member = await this.membersService.findByPayload(payload);

    if (!member) {
      throw new HttpException(ERROR_INVALID_TOKEN, HttpStatus.UNAUTHORIZED);
    }

    return member;
  }

  private _createToken({ email }: Member): any {
    const member: JwtPayload = { email };

    const accessToken = this.jwtService.sign(member);

    return {
      expiresIn: process.env.JWT_EXPIRATION,
      accessToken,
    };
  }
}
