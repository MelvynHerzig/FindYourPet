import { Member } from '../entities/members.entity';
import { PublicMemberDto } from './public.members.dto';
import { OmitType } from '@nestjs/swagger';

/**
 * Class that contains all informations to return for a member
 * @author Berney Alec, Teo Ferrari, Quentin Forestier, Melvyn Herzig
 */
export class MemberDto extends OmitType(Member, [
  'password',
  'location',
  'isAdmin',
]) {}

/**
 * Translate from dto to member
 * @param member memberdto to translate
 */
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

/**
 * Translate from member to dto
 * @param member member to translate
 */
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

/**
 * Translate to PublicMemberDto, remove private information
 * @param member Member to translate
 */
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
