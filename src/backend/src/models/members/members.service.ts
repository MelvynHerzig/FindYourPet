import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MembersEntity } from './members.entity';
import { MembersInterface } from './members.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';

/**
 * Service to query members
 */
@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(MembersEntity)
    private readonly memberRepository: Repository<MembersEntity>,
  ) {}

  createMember(member: MembersInterface): Observable<MembersInterface> {
    return from(this.memberRepository.save(member));
  }

  findAllMember(): Observable<MembersInterface[]> {
    return from(this.memberRepository.find());
  }

  findOneMemberById(id: number): Observable<MembersInterface> {
    return from(this.memberRepository.findOne(id));
  }

  updateMember(member: MembersInterface) {
    return from(this.memberRepository.update(member.id, member));
  }

  deleteMember(id: number) {
    return from(this.memberRepository.delete(id));
  }
}
