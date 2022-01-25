import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Put,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { MembersService } from './members.service';
import { UpdateMemberDto } from './dto/update.members.dto';
import { AuthGuard } from '@nestjs/passport';
import { MemberDto, ToMember, ToMemberDto } from './dto/members.dto';
import {
  Action,
  CaslAbilityFactory,
} from '../../security/casl/casl-ability.factory';
import { HttpResponse } from '../response';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

/**
 * Member controller
 * @author Alec Berney, Teo Ferrari, Quentin Forestier, Melvyn Herzig
 */
@ApiTags('members')
@Controller('members')
export class MembersController {
  constructor(
    private memberService: MembersService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  /******************* GET    ************************/
  @ApiParam({
    name: 'email',
    description: 'Email of the user to retrieve',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Specified user is returned',
    type: MemberDto,
  })
  @ApiBadRequestResponse({
    description: 'The email is invalid',
  })
  @ApiUnauthorizedResponse({
    description: 'Jwt is missing or action is not granted',
  })
  @ApiBearerAuth()
  @Get('email/:email')
  @UseGuards(AuthGuard('jwt'))
  async findOneByEmail(
    @Param('email') email: string,
    @Req() req,
  ): Promise<MemberDto> {
    try {
      const ability = this.caslAbilityFactory.createForMember(req.user);
      const member = await this.memberService.findOne({ email: email });

      if (ability.can(Action.Read, member)) return ToMemberDto(member);
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
    throw new UnauthorizedException();
  }

  /******************* PUT    ************************/
  @ApiBody({
    description: 'Information about the member to update',
    required: true,
    type: UpdateMemberDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Informations about the update',
    type: HttpResponse,
  })
  @ApiBadRequestResponse({
    description: 'The body is invalid',
  })
  @ApiUnauthorizedResponse({
    description: 'Jwt is missing or action is not granted',
  })
  @ApiBearerAuth()
  @Put()
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Body() updatedMember: UpdateMemberDto,
    @Req() req,
  ): Promise<HttpResponse> {
    try {
      const ability = this.caslAbilityFactory.createForMember(req.user);
      const member = await this.memberService.findOne({ id: updatedMember.id });

      if (ability.can(Action.Update, member)) {
        return this.memberService.update(ToMember(updatedMember));
      }
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
    throw new UnauthorizedException();
  }
  /******************* DELETE ************************/
  @ApiParam({
    name: 'uuid',
    description: 'UUID of the user to delete',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Status about the deletion',
    type: MemberDto,
  })
  @ApiBadRequestResponse({
    description: 'The uuid is invalid',
  })
  @ApiUnauthorizedResponse({
    description: 'Jwt is missing or action is not granted',
  })
  @ApiBearerAuth()
  @Delete(':uuid')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param('uuid') uuid: string, @Req() req): Promise<HttpResponse> {
    try {
      const ability = this.caslAbilityFactory.createForMember(req.user);
      const member = await this.memberService.findOne({ id: uuid });

      if (ability.can(Action.Delete, member)) {
        return this.memberService.delete(uuid);
      }
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
    throw new UnauthorizedException();
  }
}
