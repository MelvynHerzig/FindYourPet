import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Member } from './entities/members.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ERROR_INVALID_CREDENTIALS,
  ERROR_INVALID_EMAIL_FORMAT,
  ERROR_INVALID_PASSWORD,
  ERROR_INVALID_PHONE_FORMAT,
  ERROR_PASSWORD_CONFIRMATION,
  ERROR_USER_ALREADY_EXIST,
  ERROR_USER_NOT_FOUND,
  ERROR_INVALID_ADDRESS,
} from '../../error/error-message';

import { Point } from 'geojson';
import { LoginMemberDto } from './dto/login.members.dto';
import axios from 'axios';
import {
  HttpResponse,
  RESPONSE_MEMBER_DELETED,
  RESPONSE_MEMBER_UPDATED,
} from '../response';

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
    try {
      return this.memberRepository.findOne(options);
    } catch (e) {
      throw new HttpException(ERROR_USER_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }
  }

  async findByPayload({ email }: any): Promise<Member> {
    try {
      return await this.findOne({ where: { email } });
    } catch (e) {
      throw new HttpException(ERROR_USER_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }
  }

  async findLocationByPayload({ email }: any): Promise<Point> {
    try {
      const member = await this.findByPayload(email);
      return member === undefined ? undefined : member.location;
    } catch (e) {
      throw new HttpException(ERROR_USER_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }
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

  async update(member: Member): Promise<HttpResponse> {
    try {
      this.verifiyInput(member, false);

      const realMember = await this.findOne({ id: member.id });

      member.password = realMember.password;
      member.isAdmin = realMember.isAdmin;
      member.location = realMember.location;

      if (member.street != realMember.street) {
        await this.setMemberLocation(member);
      }

      await this.memberRepository.update(member.id, member);
      return {
        success: true,
        message: RESPONSE_MEMBER_UPDATED,
      };
    } catch (e) {
      return {
        success: false,
        message: e,
      };
    }
  }

  async delete(memberId: string): Promise<HttpResponse> {
    try {
      await this.memberRepository.delete(memberId);
      return {
        success: true,
        message: RESPONSE_MEMBER_DELETED,
      };
    } catch (e) {
      return {
        success: false,
        message: e,
      };
    }
  }

  async setMemberLocation(member: Member) {
    // Getting geolocation
    const addr = `${member.street} ${member.NPA} ${member.city}`;

    const response = await axios
      .get(`https://api3.geo.admin.ch/rest/services/api/SearchServer`, {
        params: { searchText: addr, type: 'locations' },
      })
      .then((resp) => {
        return resp.data.results;
      });

    if (response.length === 0) {
      throw new HttpException(ERROR_INVALID_ADDRESS, HttpStatus.BAD_REQUEST);
    }

    // Preparing location
    member.location = {
      type: 'Point',
      coordinates: [response[0].attrs.lon, response[0].attrs.lat],
    };
  }

  verifiyInput(member, verifiyPassword: boolean) {
    const passwordValidation =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g;

    const emailValidation =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm;
    const swissPhoneValidation =
      /^([0][1-9][0-9](\s|)[0-9][0-9][0-9](\s|)[0-9][0-9](\s|)[0-9][0-9])$|^(([0][0]|\+)[1-9][0-9](\s|)[0-9][0-9](\s|)[0-9][0-9][0-9](\s|)[0-9][0-9](\s|)[0-9][0-9])$/gm;
    if (verifiyPassword) {
      if (member.password !== member.confirmPassword) {
        throw new HttpException(
          ERROR_PASSWORD_CONFIRMATION,
          HttpStatus.BAD_REQUEST,
        );
      }

      if (!passwordValidation.test(member.password)) {
        throw new HttpException(ERROR_INVALID_PASSWORD, HttpStatus.BAD_REQUEST);
      }
    }

    if (!emailValidation.test(member.email)) {
      throw new HttpException(
        ERROR_INVALID_EMAIL_FORMAT,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!swissPhoneValidation.test(member.phone)) {
      throw new HttpException(
        ERROR_INVALID_PHONE_FORMAT,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
