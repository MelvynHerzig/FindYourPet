import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MembersEntity } from './members.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { from } from 'rxjs';
import {
  CreateMemberDto,
  LoginMemberDto,
  MemberDto,
  toMemberDto,
} from './dto/members.dto';
import bcrypt from 'bcryptjs';
import { MembersInterface } from './members.interface';
import { Point } from 'geojson';

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

  async findByPayload({ email }: any): Promise<MemberDto> {
    return await this.findOne({ where: { email } });
  }

  async findByLogin({ email, password }: LoginMemberDto): Promise<MemberDto> {
    const member = await this.memberRepository.findOne({ where: { email } });

    if (!member) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    const doesPasswordMatch = bcrypt.compareSync(password, member.password);

    if (doesPasswordMatch) {
      return toMemberDto(member);
    }

    throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
  }

  async create(
    memberDto: CreateMemberDto,
    location: Point,
  ): Promise<MemberDto> {
    const { firstname, name, email, password, street, NPA, city, phone } =
      memberDto;

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
      phone,
      location,
    });

    await this.memberRepository.save(member);
    return toMemberDto(member);
  }

  updateMember(member: MembersInterface) {
    return from(this.memberRepository.update(member.id, member));
  }
}
