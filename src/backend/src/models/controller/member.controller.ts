import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MemberService } from '../service/member.service';
import { MemberInterface } from '../entity/member.interface';
import { Observable } from 'rxjs';

/**
 * Member controller
 */
@Controller('member')
export class MemberController {
  constructor(private memberService: MemberService) {}

  @Post()
  create(@Body() member: MemberInterface): Observable<MemberInterface> {
    return this.memberService.createMember(member);
  }

  @Get()
  findAll(): Observable<MemberInterface[]> {
    return this.memberService.findAllMember();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<MemberInterface> {
    return this.memberService.findOneMemberById(parseInt(id));
  }

  @Put()
  update(@Body() member: MemberInterface) {
    return this.memberService.updateMember(member);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.memberService.deleteMember(parseInt(id));
  }
}
