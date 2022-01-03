import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MembersService } from './members.service';
import { Members } from './entities/members.entity';
import { UpdateMemberDto } from './dto/update.members.dto';
import { UpdateResult } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';
import {
  CheckPolicies,
  PoliciesGuard,
} from '../../security/policy/policy.guard';
import {
  ReadMembersPolicyhandler,
  UpdateMembersPolicyhandler,
} from '../../security/policy/handler/members.policyhandler';

/**
 * Member controller
 */
@Controller('members')
export class MembersController {
  constructor(private memberService: MembersService) {}

  /******************* GET    ************************/
  @Get('/:id')
  @UseGuards(AuthGuard('jwt'), PoliciesGuard)
  @CheckPolicies(new ReadMembersPolicyhandler())
  async findOne(@Param('id') id: string): Promise<Members> {
    const member: Members = await this.memberService.findOne({ id: id });
    return new Members(member);
  }

  /******************* POST   ************************/

  /******************* PUT    ************************/
  @Put()
  @UseGuards(AuthGuard('jwt'), PoliciesGuard)
  @CheckPolicies(new UpdateMembersPolicyhandler())
  update(@Body() member: UpdateMemberDto): Promise<UpdateResult> {
    return this.memberService.updateMember(member);
  }
  /******************* DELETE ************************/
}
