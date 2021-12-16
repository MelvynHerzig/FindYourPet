import { Controller, Request, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService, LoginStatus, RegistrationsStatus } from './auth.service';
import { CreateMemberDto, LoginMemberDto } from '../models/members/dto/members.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

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
    @Body() loginUserDto: LoginMemberDto,
  ): Promise<LoginStatus> {
    return await this.authService.login(loginUserDto);
  }
}
