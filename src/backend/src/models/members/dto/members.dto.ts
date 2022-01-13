import { Member } from '../entities/members.entity';
import { OmitType } from '@nestjs/mapped-types';
import { UpdateMemberDto } from './update.members.dto';
import { BeforeInsert, Column } from 'typeorm';
import { PublicMemberDto } from './public.members.dto';

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

export function ToPublicMemberDto(member): PublicMemberDto {
  return {
    id: member.id,
    firstname: member.firstname,
    name: member.name,
    email: member.email,
    phone: member.phone,
  };
}
