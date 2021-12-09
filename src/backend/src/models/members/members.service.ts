import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MembersEntity } from './members.entity';
import { MembersInterface } from './members.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { CreateMemberDto, LoginMemberDto, MemberDto, toMemberDto } from "./dto/members.dto";
import bcrypt from 'bcrypt';

/**
 * Service to query members
 */
@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(MembersEntity)
    private readonly memberRepository: Repository<MembersEntity>,
  ) {}

  async findOne(options?: object): Promise<MemberDto> {
    const member = await this.memberRepository.findOne(options);
    return toMemberDto(member);
  }

  async findByPayload({ email}: any): Promise<MemberDto> {
    return await this.findOne({ where: {email}});
  }

  async findByLogin({ email, password}: LoginMemberDto): Promise<MemberDto> {
    const member = await this.memberRepository.findOne({ where: {email}});

    if (!member) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    // We should crypt here
    if (member.password !== password) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return toMemberDto(member);
  }

  async create(memberDto: CreateMemberDto): Promise<MemberDto> {
    const { firstname, name, email, password, street, NPA, city } = memberDto;

    const memberInDb = await this.memberRepository.findOne({
      where: { email },
    });

    if (memberInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const member: MembersEntity = await this.memberRepository.create({
      firstname,
      name,
      email,
      password,
      street,
      NPA,
      city,
    });
    await this.memberRepository.save(member);
    return toMemberDto(member);
  }
}
