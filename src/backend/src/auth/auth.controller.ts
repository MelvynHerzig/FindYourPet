import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService, LoginStatus, RegistrationsStatus } from './auth.service';
import { CreateMemberDto } from '../models/members/dto/create.members.dto';
import { LoginMemberDto } from '../models/members/dto/login.members.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(
    @Body() createMemberDto: CreateMemberDto,
  ): Promise<RegistrationsStatus> {
    const result: RegistrationsStatus = await this.authService.register(
      createMemberDto,
    );
    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  @Post('login')
  public async login(
    @Body() loginMemberDto: LoginMemberDto,
  ): Promise<LoginStatus> {
    return await this.authService.login(loginMemberDto);
  }
}
