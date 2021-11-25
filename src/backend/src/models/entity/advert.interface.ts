import { MemberEntity } from './member.entity';
import { PetGender } from './advert.entity';
import { RaceEntity } from './race.entity';

/**
 * Interface to implement in order to be a submittable as advert entity
 */
export interface AdvertInterface {
  id: number;
  title: string;
  description: string;
  imagePath: string;
  lastModified: Date;
  petAge: number;
  petGender: PetGender;
  member: MemberEntity;
  race: RaceEntity;
}
