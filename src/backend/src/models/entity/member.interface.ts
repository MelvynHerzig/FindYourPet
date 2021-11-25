import { AdvertEntity } from './advert.entity';

/**
 * Interface to implement in order to be a submittable as member entity
 */
export interface MemberInterface {
  id: number;
  firstname: string;
  name: string;
  email: string;
  password: string;
  street: string;
  NPA: number;
  city: string;
  adverts: AdvertEntity[];
}
