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
import { DeleteResult, UpdateResult } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';
import { MemberDto, ToMember, ToMemberDto } from './dto/members.dto';
import {
  Action,
  CaslAbilityFactory,
} from '../../security/casl/casl-ability.factory';

/**
 * Member controller
 */
@Controller('members')
export class MembersController {
  constructor(
    private memberService: MembersService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  /******************* GET    ************************/
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
  @Put()
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Body() updatedMember: UpdateMemberDto,
    @Req() req,
  ): Promise<UpdateResult> {
    try {
      const ability = this.caslAbilityFactory.createForMember(req.user);
      const member = await this.memberService.findOne({ id: updatedMember.id });

      if (ability.can(Action.Update, member)) {
        return this.memberService.update(ToMember(member));
      }
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
    throw new UnauthorizedException();
  }
  /******************* DELETE ************************/
  @Delete(':uuid')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param('uuid') uuid: string, @Req() req): Promise<DeleteResult> {
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
