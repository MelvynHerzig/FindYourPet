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
  phone: string;
  adverts: AdvertsEntity[];
}

export class CreateMemberDto {
  firstname: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  street: string;
  NPA: number;
  city: string;
  phone: string;
}

export class LoginMemberDto {
  readonly email: string;
  readonly password: string;
}

export const toMemberDto = (data: MembersEntity): MemberDto => {
  const { id, firstname, name, email, street, NPA, city, phone, adverts } = data;
  return {
    id,
    firstname,
    name,
    email,
    street,
    NPA,
    city,
    phone,
    adverts,
  };
};