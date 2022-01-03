import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { Members } from './entities/members.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMemberDto } from './dto/create.members.dto';
import {
  ERROR_INVALID_CREDENTIALS,
  ERROR_USER_ALREADY_EXIST,
  ERROR_USER_NOT_FOUND,
} from '../../error/error-message';

import { Point } from 'geojson';
import { LoginMemberDto } from './dto/login.members.dto';
import { UpdateMemberDto } from './dto/update.members.dto';

// Need to use bcrypt like that, otherwise not working...
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcryptjs');

/**
 * Service to query members
 */
@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Members)
    private readonly memberRepository: Repository<Members>,
  ) {}

  async findOne(options?: object): Promise<Members> {
    return this.memberRepository.findOne(options);
  }

  async findByPayload({ email }: any): Promise<Members> {
    return await this.findOne({ where: { email } });
  }

  async findLocationByPayload({ email }: any): Promise<Point> {
    return (await this.findByPayload(email)).location;
  }

  async findByLogin({ email, password }: LoginMemberDto): Promise<Members> {
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

  async create(memberDto: CreateMemberDto): Promise<Members> {
    const { email } = memberDto;

    const memberInDb = await this.memberRepository.findOne({
      where: { email },
    });

    if (memberInDb) {
      throw new HttpException(ERROR_USER_ALREADY_EXIST, HttpStatus.BAD_REQUEST);
    }

    const member: Members = await this.memberRepository.create(memberDto);

    member.isAdmin = false;
    await this.memberRepository.save(member);
    return member;
  }

  updateMember(member: UpdateMemberDto): Promise<UpdateResult> {
    return this.memberRepository.update(member.id, member);
  }
}
