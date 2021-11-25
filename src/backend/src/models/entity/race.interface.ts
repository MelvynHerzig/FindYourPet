import { AdvertEntity } from './advert.entity';

/**
 * Interface to implement in order to be a submittable as race entity
 */
export interface RaceInterface {
  id: number;
  name: string;
  adverts: AdvertEntity[];
}
