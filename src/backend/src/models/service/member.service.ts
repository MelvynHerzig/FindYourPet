import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MemberEntity } from '../entity/member.entity';
import { MemberInterface } from '../entity/member.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';

/**
 * Service to query member
 */
@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(MemberEntity)
    private readonly memberRepository: Repository<MemberEntity>,
  ) {}

  createMember(member: MemberInterface): Observable<MemberInterface> {
    return from(this.memberRepository.save(member));
  }

  findAllMember(): Observable<MemberInterface[]> {
    return from(this.memberRepository.find());
  }

  findOneMemberById(id: number): Observable<MemberInterface> {
    return from(this.memberRepository.findOne(id));
  }

  updateMember(member: MemberInterface) {
    return from(this.memberRepository.update(member.id, member));
  }

  deleteMember(id: number) {
    return from(this.memberRepository.delete(id));
  }
}
