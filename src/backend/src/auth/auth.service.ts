import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MembersService } from '../models/members/members.service';
import { JwtService } from '@nestjs/jwt';
import {
  CreateMemberDto,
  LoginMemberDto,
  MemberDto,
} from '../models/members/dto/members.dto';
import { JwtPayload } from './jwt.strategy';

export interface RegistrationsStatus {
  success: boolean;
  message: string;
}

export interface LoginStatus {
  email;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly membersService: MembersService,
    private readonly jwtService: JwtService,
  ) { }

  async register(memberDto: CreateMemberDto): Promise<RegistrationsStatus> {
    let status: RegistrationsStatus = {
      success: true,
      message: 'member registered',
    };
    try {
      await this.membersService.create(memberDto);
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }
    return status;
  }

  async login(loginMemberDto: LoginMemberDto): Promise<LoginStatus> {
    const member = await this.membersService.findByLogin(loginMemberDto);

    const token = this._createToken(member);

    return {
      email: member.email,
      ...token,
    };
  }

  async validateUser(payload: JwtPayload): Promise<MemberDto> {
    const member = await this.membersService.findByPayload(payload);

    if (!member) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    return member;
  }

  private _createToken({ email }: MemberDto): any {
    const member: JwtPayload = { email };

    const accessToken = this.jwtService.sign(member);

    return {
      expiresIn: process.env.JWT_EXPIRATION,
      accessToken,
    };
  }
}
