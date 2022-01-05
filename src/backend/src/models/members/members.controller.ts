import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { MembersService } from './members.service';
import { UpdateMemberDto } from './dto/update.members.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';
import {
  CheckPolicies,
  PoliciesGuard,
} from '../../security/policy/policy.guard';
import {
  DeleteMembersPolicyhandler,
  ReadMembersPolicyhandler,
  UpdateMembersPolicyhandler,
} from '../../security/policy/handler/members.policyhandler';
import { MemberDto, ToMember, ToMemberDto } from './dto/members.dto';

/**
 * Member controller
 */
@Controller('members')
export class MembersController {
  constructor(private memberService: MembersService) {}

  /******************* GET    ************************/
  @Get('email/:email')
  @UseGuards(AuthGuard('jwt'), PoliciesGuard)
  @CheckPolicies(new ReadMembersPolicyhandler())
  async findOneByEmail(@Param('email') email: string): Promise<MemberDto> {
    return ToMemberDto(await this.memberService.findOne({ email: email }));
  }

  /******************* PUT    ************************/
  @Put()
  @UseGuards(AuthGuard('jwt'), PoliciesGuard)
  @CheckPolicies(new UpdateMembersPolicyhandler())
  async update(@Body() member: UpdateMemberDto): Promise<UpdateResult> {
    return this.memberService.update(ToMember(member));
  }
  /******************* DELETE ************************/
  @Delete(':uuid')
  @UseGuards(AuthGuard('jwt'), PoliciesGuard)
  @CheckPolicies(new DeleteMembersPolicyhandler())
  async delete(@Param('uuid') uuid: string): Promise<DeleteResult> {
    return this.memberService.delete(uuid);
  }
}
