import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateMemberDto } from '../models/members/dto/create.members.dto';
import { LoginMemberDto } from '../models/members/dto/login.members.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RegistrationsStatus } from './dto/registration.status.dto';
import { LoginStatus } from './dto/login.status.dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
/**
 * Controller for the authentification
 * @author Berney Alec, Teo Ferrari, Quentin Forestier, Melvyn Herzig
 */
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({
    description: 'The member has been successfully created',
    type: RegistrationsStatus,
  })
  @ApiBadRequestResponse({
    description: 'One or more fields are not in a valid format',
  })
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

  @ApiResponse({
    status: 201,
    description: 'The login is sucessfull',
    type: LoginStatus,
  })
  @ApiBadRequestResponse({
    description: 'Credentials are invalid',
  })
  @Post('login')
  public async login(
    @Body() loginMemberDto: LoginMemberDto,
  ): Promise<LoginStatus> {
    return await this.authService.login(loginMemberDto);
  }
}
