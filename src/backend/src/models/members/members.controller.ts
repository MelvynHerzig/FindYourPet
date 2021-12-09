import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersInterface } from './members.interface';
import { Observable } from 'rxjs';
import { MemberDto } from './dto/members.dto';

/**
 * Member controller
 */
@Controller('members')
export class MembersController {
  constructor(private memberService: MembersService) {}

  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<MemberDto> {
    return await this.memberService.findOne({ id: id });
  }

  @Put()
  update(@Body() member: MembersInterface) {
    return this.memberService.updateMember(member);
  }

}
