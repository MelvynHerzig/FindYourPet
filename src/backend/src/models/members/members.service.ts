import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Member } from './entities/members.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ERROR_INVALID_CREDENTIALS,
  ERROR_USER_ALREADY_EXIST,
  ERROR_USER_NOT_FOUND,
} from '../../error/error-message';

import { Point } from 'geojson';
import { LoginMemberDto } from './dto/login.members.dto';

// Need to use bcrypt like that, otherwise not working...
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcryptjs');

/**
 * Service to query members
 */
@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}

  async findOne(options?: object): Promise<Member> {
    return this.memberRepository.findOne(options);
  }

  async findByPayload({ email }: any): Promise<Member> {
    return await this.findOne({ where: { email } });
  }

  async findLocationByPayload({ email }: any): Promise<Point> {
    const member = await this.findByPayload(email);
    return member === undefined ? undefined : member.location;
  }

  async findByLogin({ email, password }: LoginMemberDto): Promise<Member> {
    const member = await this.memberRepository.findOne({ where: { email } });

    if (!member) {
      throw new HttpException(ERROR_USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const doesPasswordMatch = bcrypt.compareSync(password, member.password);

    if (doesPasswordMatch) {
      return member;
    }

    throw new HttpException(ERROR_INVALID_CREDENTIALS, HttpStatus.UNAUTHORIZED);
  }

  async create(members: Member): Promise<Member> {
    const { email } = members;

    const memberInDb = await this.memberRepository.findOne({
      where: { email },
    });
    if (memberInDb) {
      throw new HttpException(ERROR_USER_ALREADY_EXIST, HttpStatus.BAD_REQUEST);
    }

    const member: Member = await this.memberRepository.create(members);
    member.password = bcrypt.hashSync(member.password, 10);
    member.isAdmin = false;
    await this.memberRepository.save(member);

    return member;
  }

  async update(member: Member): Promise<UpdateResult> {
    const realMember = await this.findByPayload({ email: member.email });

    member.password = realMember.password;
    member.isAdmin = realMember.isAdmin;
    member.location = realMember.location;

    return this.memberRepository.update(member.id, member);
  }

  async delete(memberId: string): Promise<DeleteResult> {
    return this.memberRepository.delete(memberId);
  }
}
