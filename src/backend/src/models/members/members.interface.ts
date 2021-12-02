import { AdvertsEntity } from '../adverts/adverts.entity';

/**
 * Interface to implement in order to be a submittable as members entity
 */
export interface MembersInterface {
  id: number;
  firstname: string;
  name: string;
  email: string;
  password: string;
  street: string;
  NPA: number;
  city: string;
  adverts: AdvertsEntity[];
}
