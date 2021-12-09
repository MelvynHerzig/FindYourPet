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

/**
 * Member controller
 */
@Controller('members')
export class MembersController {
  constructor(private memberService: MembersService) {}
/*
  @Post()
  create(@Body() member: MembersInterface): Observable<MembersInterface> {
    return this.memberService.createMember(member);
  }

  @Get()
  findAll(): Observable<MembersInterface[]> {
    return this.memberService.findAllMember();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<MembersInterface> {
    return this.memberService.findOneMemberById(parseInt(id));
  }

  @Put()
  update(@Body() member: MembersInterface) {
    return this.memberService.updateMember(member);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.memberService.deleteMember(parseInt(id));
  }

 */
}
