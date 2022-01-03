import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService, LoginStatus, RegistrationsStatus } from './auth.service';
import { ERROR_PASSWORD_CONFIRMATION } from '../error/error-message';
import { CreateMemberDto } from '../models/members/dto/create.members.dto';
import { LoginMemberDto } from '../models/members/dto/login.members.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(
    @Body() createMemberDto: CreateMemberDto,
  ): Promise<RegistrationsStatus> {
    if (createMemberDto.password !== createMemberDto.confirmPassword) {
      throw new HttpException(
        ERROR_PASSWORD_CONFIRMATION,
        HttpStatus.BAD_REQUEST,
      );
    }

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
