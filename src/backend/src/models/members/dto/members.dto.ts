import { AdvertsEntity } from '../../adverts/adverts.entity';
import { MembersEntity } from '../members.entity';

export class MemberDto {
  id: string;
  firstname: string;
  name: string;
  email: string;
  street: string;
  NPA: number;
  city: string;
  adverts: AdvertsEntity[];
}

export class CreateMemberDto {
  firstname: string;
  name: string;
  email: string;
  password: string;
  street: string;
  NPA: number;
  city: string;
}

export class LoginMemberDto {
  readonly email: string;
  readonly password: string;
}

export const toMemberDto = (data: MembersEntity): MemberDto => {
  const { id, firstname, name, email, street, NPA, city, adverts } = data;
  return {
    id,
    firstname,
    name,
    email,
    street,
    NPA,
    city,
    adverts,
  };
};
