import { Member } from '../entities/members.entity';
import { PublicMemberDto } from './public.members.dto';
import { OmitType } from '@nestjs/swagger';

export class MemberDto extends OmitType(Member, [
  'password',
  'location',
  'isAdmin',
]) {}

export function ToMember(member): Member {
  const {
    id,
    firstname,
    name,
    email,
    password,
    street,
    NPA,
    city,
    phone,
    isAdmin,
    location,
  } = member;
  return {
    id,
    firstname,
    name,
    email,
    password,
    street,
    NPA,
    city,
    phone,
    isAdmin,
    location,
  };
}

export function ToMemberDto(member: Member): MemberDto {
  if (member !== undefined) {
    return {
      id: member.id,
      firstname: member.firstname,
      name: member.name,
      email: member.email,
      street: member.street,
      NPA: member.NPA,
      city: member.city,
      phone: member.phone,
    };
  }
  return undefined;
}

export function ToPublicMemberDto(member): PublicMemberDto {
  if (member !== undefined) {
    return {
      id: member.id,
      firstname: member.firstname,
      name: member.name,
      email: member.email,
      phone: member.phone,
    };
  }
  return undefined;
}
